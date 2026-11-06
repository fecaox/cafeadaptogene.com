import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { parseCsv } from "../scripts/lib/functional-coffee-data.mjs";

const dataRoot = new URL("../public/data/", import.meta.url);

test("publie un CSV complet avec valeurs brutes, calculées et inclusion au panel", async () => {
  const csv = await readFile(new URL("barometre-cafes-fonctionnels-2027.csv", dataRoot), "utf8");
  assert.equal(csv.charCodeAt(0), 0xfeff);
  const rows = parseCsv(csv.slice(1));

  assert.equal(rows.length, 143);
  assert.deepEqual(Object.keys(rows[0]).slice(0, 6), ["id", "marque", "produit", "marche", "categorie", "univers"]);
  assert.ok("prix_portion_brut" in rows[0]);
  assert.ok("prix_central_eur" in rows[0]);
  assert.ok("cafeine_centrale_mg" in rows[0]);
  assert.ok("panel_inclus" in rows[0]);
  assert.ok("reserve_publique" in rows[0]);
  assert.ok("source_officielle" in rows[0]);

  const magicLab = rows.find((row) => row.marque === "Magic Lab");
  const cosmicBlend = rows.find((row) => row.marque === "Cosmic Blend");
  const cafeIntegral = rows.find((row) => row.marque === "Café Intégral");
  assert.equal(magicLab?.cafeine_centrale_mg, "0");
  assert.equal(cosmicBlend?.panel_inclus, "non");
  assert.match(cosmicBlend?.motifs_exclusion ?? "", /statut commercial|vérification/i);
  assert.equal(cafeIntegral?.prix_central_eur, "");
  assert.match(rows.find((row) => row.marque === "Earthshake")?.reserve_publique ?? "", /sans caféine/i);
});

test("publie un JSON versionné avec statistiques, méthode et enregistrements", async () => {
  const data = JSON.parse(await readFile(new URL("barometre-cafes-fonctionnels-2027.json", dataRoot), "utf8"));

  assert.equal(data.metadata.datasetVersion, "2027.1");
  assert.equal(data.metadata.sourceDataSha256, "988167e6b351b42e0f83711a4eac9ba1da4b60277b8377f474ba8991abfbea38");
  assert.equal(data.metadata.cutoffDate, "2026-11-06");
  assert.equal(data.metadata.canonicalUrl, "https://cafeadaptogene.com/barometre-cafes-fonctionnels-2027/");
  assert.equal(data.stats.universeProducts, 143);
  assert.equal(data.stats.panelProducts, 35);
  assert.equal(data.stats.panelBrands, 32);
  assert.equal(data.stats.priceSample, 18);
  assert.equal(data.stats.caffeineSample, 30);
  assert.equal(data.records.length, 143);
  assert.equal(data.series.ingredients.overlapping, true);
  assert.match(data.methodology.priceRule, /fourchettes/i);
  assert.match(data.metadata.license, /citation/i);
  assert.match(data.records.find((record) => record.brand === "Earthshake")?.publicCaveat ?? "", /29,5\/59 mg/i);
});

test("génère un module TypeScript léger pour le rendu statique", async () => {
  const source = await readFile(new URL("../app/barometer-data.ts", import.meta.url), "utf8");
  assert.match(source, /^\/\/ Fichier généré/m);
  assert.match(source, /export const barometer =/);
  assert.doesNotMatch(source, /"records":/);

  const { barometer } = await import("../app/barometer-data.ts");
  assert.equal(barometer.stats.panelProducts, 35);
  assert.equal(barometer.panel.length, 35);
});

test("rend quatre graphiques SVG autonomes, datés et attribués", async () => {
  const files = ["prix", "cafeine", "ingredients", "transparence"];
  const svgs = await Promise.all(files.map((name) => readFile(new URL(`barometre-cafes-fonctionnels-2027-${name}.svg`, dataRoot), "utf8")));

  for (const svg of svgs) {
    assert.match(svg, /^<svg\b/);
    assert.match(svg, /<title\b/);
    assert.match(svg, /<desc\b/);
    assert.match(svg, /Données arrêtées au 6 novembre 2026/);
    assert.match(svg, /Source : Café Adaptogène/);
    assert.match(svg, /n=\d+/);
  }
  assert.match(svgs[0], /Prix par portion/i);
  assert.match(svgs[1], /Caféine publiée/i);
  assert.match(svgs[2], /familles d’ingrédients/i);
  assert.match(svgs[3], /transparence des dosages/i);
});

test("publie une méthodologie réutilisable sans donnée privée", async () => {
  const filenames = [
    "barometre-cafes-fonctionnels-2027.csv",
    "barometre-cafes-fonctionnels-2027.json",
    "barometre-cafes-fonctionnels-2027-methodologie.md",
  ];
  const contents = await Promise.all(filenames.map((filename) => readFile(new URL(filename, dataRoot), "utf8")));
  const method = contents[2];

  assert.match(method, /35 produits et 32 marques/i);
  assert.match(method, /Sous-échantillon prix \(n=18\)/i);
  assert.match(method, /Sous-échantillon caféine \(n=30\)/i);
  assert.match(method, /ne mesure ni l’efficacité/i);
  assert.match(method, /Café Adaptogène, Baromètre français des cafés fonctionnels 2027/i);
  assert.doesNotMatch(contents.join("\n"), /fecaox@gmail\.com/i);
});
