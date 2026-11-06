import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  buildBarometer,
  detectIngredientFamilies,
  isQualifiedPanelRow,
  median,
  normalizeTransparency,
  parseCaffeineRange,
  parseEuroRange,
} from "../scripts/lib/barometer-data.mjs";
import { parseCsv } from "../scripts/lib/functional-coffee-data.mjs";

function panelRow(overrides = {}) {
  return {
    marque: "Marque test",
    produit: "Produit test",
    pays_marche: "France",
    classement: "Café aux champignons",
    macro_categorie: "2 — Cafés artificiellement enrichis",
    base_reelle: "café instantané",
    actifs_principaux: "Lion's Mane",
    disponibilite_france: "oui, vente directe en France",
    statut_commercial_actuel: "actif — page produit observée",
    statut_verification: "A",
    source_officielle: "https://example.com/produit",
    prix_par_portion_observe: "1,30 € / portion",
    cafeine_portion: "0 mg",
    cafeine_mg_min: "0",
    cafeine_mg_max: "0",
    niveau_cafeine: "sans caféine",
    champignons_standardises: "Lion's Mane",
    nombre_champignons: "1",
    proteines_g: "non publié",
    collagene_g: "non publié",
    creatine_g: "non publié",
    mct_g: "non publié",
    transparence_dosage: "élevée",
    preuve_laboratoire: "non publiée",
    date_derniere_verification: "2026-11-01",
    ...overrides,
  };
}

test("qualifie uniquement les produits disponibles, actifs, vérifiés et sourcés", () => {
  assert.equal(isQualifiedPanelRow(panelRow()), true);
  assert.equal(isQualifiedPanelRow(panelRow({ statut_verification: "B" })), true);
  assert.equal(isQualifiedPanelRow(panelRow({ disponibilite_france: "non, marché France fermé" })), false);
  assert.equal(isQualifiedPanelRow(panelRow({ statut_commercial_actuel: "épuisé — page accessible" })), false);
  assert.equal(isQualifiedPanelRow(panelRow({ statut_verification: "C" })), false);
  assert.equal(isQualifiedPanelRow(panelRow({ source_officielle: "source à confirmer" })), false);
});

test("extrait uniquement les prix en euros directement comparables", () => {
  assert.deepEqual(parseEuroRange("1,30 € / portion"), { min: 1.3, max: 1.3, midpoint: 1.3, currency: "EUR" });
  assert.deepEqual(parseEuroRange("0,76–1,49 € / portion"), { min: 0.76, max: 1.49, midpoint: 1.125, currency: "EUR" });
  assert.deepEqual(parseEuroRange("environ 1,65 € promotionnel; 2,20 € prix de référence"), { min: 1.65, max: 2.2, midpoint: 1.925, currency: "EUR" });
  assert.equal(parseEuroRange("1,00 $ / portion"), null);
  assert.equal(parseEuroRange("moins de 1 € / portion"), null);
  assert.equal(parseEuroRange("non calculable avec les données publiques"), null);
});

test("conserve la caféine nulle et rejette les comparaisons non chiffrées", () => {
  assert.deepEqual(parseCaffeineRange(panelRow()), { min: 0, max: 0, midpoint: 0, unit: "mg" });
  assert.deepEqual(parseCaffeineRange(panelRow({ cafeine_mg_min: "35", cafeine_mg_max: "48" })), { min: 35, max: 48, midpoint: 41.5, unit: "mg" });
  assert.deepEqual(parseCaffeineRange(panelRow({ cafeine_mg_min: "87", cafeine_mg_max: "" })), { min: 87, max: 87, midpoint: 87, unit: "mg" });
  assert.equal(parseCaffeineRange(panelRow({ cafeine_mg_min: "à confirmer", cafeine_mg_max: "à confirmer" })), null);
});

test("calcule la médiane sans modifier l’ordre fourni", () => {
  const odd = [9, 1, 5];
  const even = [8, 2, 6, 4];
  assert.equal(median(odd), 5);
  assert.equal(median(even), 5);
  assert.deepEqual(odd, [9, 1, 5]);
  assert.equal(median([]), null);
});

test("normalise les variantes de transparence sans inventer de niveau", () => {
  assert.equal(normalizeTransparency("élevée pour la variante contrôlée"), "Élevée");
  assert.equal(normalizeTransparency("partielle"), "Partielle");
  assert.equal(normalizeTransparency("faible"), "Faible");
  assert.equal(normalizeTransparency(""), "Non documentée");
});

test("autorise plusieurs familles d’ingrédients pour un même produit", () => {
  const families = detectIngredientFamilies(panelRow({
    classement: "Café protéiné au collagène et MCT",
    actifs_principaux: "Lion's Mane; ashwagandha; collagène; protéines; MCT; créatine",
    proteines_g: "20 g",
    collagene_g: "5 g",
    creatine_g: "3 g",
    mct_g: "2 g",
  }));

  assert.deepEqual(families, ["Champignons", "Plantes / nootropiques", "Protéines", "Collagène", "Créatine", "MCT"]);
  assert.deepEqual(detectIngredientFamilies(panelRow({
    classement: "Alternative torréfiée au café",
    macro_categorie: "3 — Pas vraiment du café, mais quand même",
    actifs_principaux: "fibres naturelles",
    nombre_champignons: "0",
    champignons_standardises: "non applicable",
  })), ["Alternative torréfiée / sans café"]);
});

test("construit un modèle public stable depuis la base réelle", async () => {
  const csv = await readFile(new URL("../data/marques-cafe-fonctionnel.csv", import.meta.url), "utf8");
  const barometer = buildBarometer(parseCsv(csv));

  assert.equal(barometer.metadata.schemaVersion, "1.0");
  assert.equal(barometer.metadata.datasetVersion, "2027.1");
  assert.equal(barometer.metadata.cutoffDate, "2026-11-06");
  assert.equal(barometer.metadata.canonicalUrl, "https://cafeadaptogene.com/barometre-cafes-fonctionnels-2027/");
  assert.equal(barometer.stats.universeProducts, 143);
  assert.equal(barometer.stats.panelProducts, 35);
  assert.equal(barometer.stats.panelBrands, 32);
  assert.equal(barometer.stats.priceSample, 18);
  assert.equal(barometer.stats.caffeineSample, 30);
  assert.equal(barometer.records.length, 143);
  assert.equal(barometer.series.ingredients.overlapping, true);
  assert.equal(barometer.series.ingredients.sampleSize, 35);
  assert.ok(barometer.findings.every((finding) => finding.includes("n=")));
  assert.equal(barometer.records.find((record) => record.brand === "Cosmic Blend")?.panelIncluded, false);
  assert.equal(barometer.records.find((record) => record.brand === "Magic Lab")?.caffeine?.midpoint, 0);
  assert.doesNotMatch(JSON.stringify(barometer), /fecaox@gmail\.com/i);
});
