import { productId } from "./functional-coffee-data.mjs";

const INGREDIENT_FAMILIES = [
  "Champignons",
  "Plantes / nootropiques",
  "Protéines",
  "Collagène",
  "Créatine",
  "MCT",
  "Alternative torréfiée / sans café",
];

const CAFFEINE_BANDS = ["Sans caféine", "Faible (≤ 50 mg)", "Modérée (51–100 mg)", "Élevée (> 100 mg)"];

function clean(value) {
  return String(value ?? "").trim();
}

function numeric(value) {
  const text = clean(value).replace(",", ".");
  if (!/^-?\d+(?:\.\d+)?$/.test(text)) return null;
  const number = Number(text);
  return Number.isFinite(number) ? number : null;
}

function round(value, digits = 3) {
  if (value === null || value === undefined) return null;
  const factor = 10 ** digits;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

function percentage(count, total) {
  return total ? round((count / total) * 100, 1) : 0;
}

function exclusionReasons(row) {
  const reasons = [];
  if (!/^oui\b/i.test(clean(row.disponibilite_france))) reasons.push("disponibilité France non confirmée");
  if (!/^actif\b/i.test(clean(row.statut_commercial_actuel))) reasons.push("statut commercial non actif");
  if (!["A", "B"].includes(clean(row.statut_verification))) reasons.push("niveau de vérification insuffisant");
  if (!/^https?:\/\//i.test(clean(row.source_officielle))) reasons.push("source officielle absente ou invalide");
  return reasons;
}

export function isQualifiedPanelRow(row) {
  return exclusionReasons(row).length === 0;
}

export function parseEuroRange(value) {
  const text = clean(value);
  if (!text.includes("€") || /moins de|inférieur/i.test(text)) return null;
  const euroText = text.slice(0, text.lastIndexOf("€") + 1);
  const numbers = [...euroText.matchAll(/\d+(?:[.,]\d+)?/g)]
    .map((match) => Number(match[0].replace(",", ".")))
    .filter(Number.isFinite);
  if (!numbers.length) return null;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  return { min, max, midpoint: round((min + max) / 2), currency: "EUR" };
}

export function parseCaffeineRange(row) {
  const rawMin = numeric(row.cafeine_mg_min);
  const rawMax = numeric(row.cafeine_mg_max);
  if (rawMin === null && rawMax === null) return null;
  const min = rawMin ?? rawMax;
  const max = rawMax ?? rawMin;
  const lower = Math.min(min, max);
  const upper = Math.max(min, max);
  return { min: lower, max: upper, midpoint: round((lower + upper) / 2), unit: "mg" };
}

export function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  if (sorted.length % 2) return sorted[middle];
  return round((sorted[middle - 1] + sorted[middle]) / 2);
}

export function normalizeTransparency(value) {
  const text = clean(value).toLocaleLowerCase("fr");
  if (text.startsWith("élevée") || text.startsWith("elevee")) return "Élevée";
  if (text.startsWith("partielle")) return "Partielle";
  if (text.startsWith("faible")) return "Faible";
  return "Non documentée";
}

function isPublishedQuantity(value) {
  return numeric(clean(value).replace(/\s*g$/i, "")) !== null;
}

export function detectIngredientFamilies(row) {
  const categoryText = `${clean(row.classement)} ${clean(row.actifs_principaux)} ${clean(row.base_reelle)}`.toLocaleLowerCase("fr");
  const mushroomCount = numeric(row.nombre_champignons);
  const mushroomText = clean(row.champignons_standardises).toLocaleLowerCase("fr");
  const families = [];

  if ((mushroomCount !== null && mushroomCount > 0) || (mushroomText && !/non applicable|non publi|à confirmer/.test(mushroomText))) {
    families.push("Champignons");
  }
  if (/ashwagandha|bacopa|ginseng|maca|rhodiola|th[ée]anine|tyrosine|guarana|nootrop|plante/.test(categoryText)) {
    families.push("Plantes / nootropiques");
  }
  if (isPublishedQuantity(row.proteines_g) || /prot[ée]in|whey/.test(categoryText)) families.push("Protéines");
  if (isPublishedQuantity(row.collagene_g) || /collag[èe]ne/.test(categoryText)) families.push("Collagène");
  if (isPublishedQuantity(row.creatine_g) || /cr[ée]atine/.test(categoryText)) families.push("Créatine");
  if (isPublishedQuantity(row.mct_g) || /\bmct\b/.test(categoryText)) families.push("MCT");
  if (/^3\s*[—-]/.test(clean(row.macro_categorie))) families.push("Alternative torréfiée / sans café");

  return INGREDIENT_FAMILIES.filter((family) => families.includes(family));
}

function caffeineBand(caffeine) {
  if (!caffeine) return null;
  if (caffeine.midpoint === 0) return "Sans caféine";
  if (caffeine.midpoint <= 50) return "Faible (≤ 50 mg)";
  if (caffeine.midpoint <= 100) return "Modérée (51–100 mg)";
  return "Élevée (> 100 mg)";
}

function laboratoryEvidence(value) {
  const text = clean(value);
  if (!text || /^non publi/i.test(text)) return "Non publiée";
  if (/document.*disponible|document.*consult|rapport.*(disponible|consult|archiv)|fiche technique.*examin|documents consultables/i.test(text)) {
    return "Document consultable";
  }
  return "Analyse annoncée, document non archivé";
}

function publicRecord(row) {
  const panelIncluded = isQualifiedPanelRow(row);
  const price = parseEuroRange(row.prix_par_portion_observe);
  const caffeine = parseCaffeineRange(row);
  return {
    id: productId(row),
    brand: clean(row.marque),
    product: clean(row.produit),
    market: clean(row.pays_marche),
    category: clean(row.classement),
    macroCategory: clean(row.macro_categorie),
    base: clean(row.base_reelle),
    actives: clean(row.actifs_principaux),
    franceAvailability: clean(row.disponibilite_france),
    commercialStatus: clean(row.statut_commercial_actuel),
    verificationLevel: clean(row.statut_verification),
    source: clean(row.source_officielle),
    lastVerified: clean(row.date_derniere_verification),
    rawPricePerServing: clean(row.prix_par_portion_observe),
    price,
    rawCaffeine: clean(row.cafeine_portion),
    caffeine,
    caffeineLevel: clean(row.niveau_cafeine),
    transparency: normalizeTransparency(row.transparence_dosage),
    ingredientFamilies: detectIngredientFamilies(row),
    laboratoryEvidence: laboratoryEvidence(row.preuve_laboratoire),
    panelIncluded,
    panelExclusionReasons: panelIncluded ? [] : exclusionReasons(row),
  };
}

function countSeries(labels, values, total) {
  return labels.map((label) => {
    const count = values.filter((value) => value === label).length;
    return { label, count, percentage: percentage(count, total) };
  });
}

function formatFrench(value, digits = 2) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: digits }).format(value);
}

export function buildBarometer(rows, {
  siteUrl = "https://cafeadaptogene.com",
  cutoffDate = "2026-11-06",
  datasetVersion = "2027.1",
} = {}) {
  const normalizedSiteUrl = siteUrl.replace(/\/+$/, "");
  const records = rows.map(publicRecord);
  const panel = records.filter((record) => record.panelIncluded);
  const priced = panel.filter((record) => record.price);
  const caffeinated = panel.filter((record) => record.caffeine);
  const priceMidpoints = priced.map((record) => record.price.midpoint);
  const caffeineMidpoints = caffeinated.map((record) => record.caffeine.midpoint);
  const transparencyLabels = panel.map((record) => record.transparency);
  const ingredientValues = panel.flatMap((record) => record.ingredientFamilies);
  const canonicalUrl = `${normalizedSiteUrl}/barometre-cafes-fonctionnels-2027/`;

  const stats = {
    universeProducts: records.length,
    universeBrands: new Set(records.map((record) => record.brand)).size,
    panelProducts: panel.length,
    panelBrands: new Set(panel.map((record) => record.brand)).size,
    priceSample: priced.length,
    caffeineSample: caffeinated.length,
    priceMedianEur: round(median(priceMidpoints), 2),
    priceMinEur: priced.length ? Math.min(...priced.map((record) => record.price.min)) : null,
    priceMaxEur: priced.length ? Math.max(...priced.map((record) => record.price.max)) : null,
    caffeineMedianMg: round(median(caffeineMidpoints), 1),
    transparencySample: panel.length,
  };

  const caffeineValues = caffeinated.map((record) => caffeineBand(record.caffeine));
  const transparencyOrder = ["Élevée", "Partielle", "Faible", "Non documentée"];
  const ingredientSeries = countSeries(INGREDIENT_FAMILIES, ingredientValues, panel.length)
    .filter((item) => item.count > 0);
  const transparencySeries = countSeries(transparencyOrder, transparencyLabels, panel.length)
    .filter((item) => item.count > 0);
  const topIngredient = [...ingredientSeries].sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, "fr"))[0];
  const highTransparency = transparencySeries.find((item) => item.label === "Élevée") ?? { count: 0, percentage: 0 };

  return {
    metadata: {
      schemaVersion: "1.0",
      datasetVersion,
      title: "Baromètre français des cafés fonctionnels 2027",
      publicationDate: "2026-11-06",
      cutoffDate,
      site: normalizedSiteUrl,
      canonicalUrl,
      license: "Consultation, analyse et citation autorisées avec attribution et lien vers la page canonique.",
      attribution: `Café Adaptogène, Baromètre français des cafés fonctionnels 2027, données arrêtées au ${new Intl.DateTimeFormat("fr-FR", { dateStyle: "long", timeZone: "UTC" }).format(new Date(`${cutoffDate}T12:00:00Z`))}.`,
    },
    methodology: {
      panelCriteria: [
        "Disponibilité en France commençant par « oui ».",
        "Statut commercial commençant par « actif ».",
        "Niveau de vérification A ou B.",
        "Source officielle HTTP(S) valide.",
      ],
      priceRule: "Montants en euros directement calculables. Les fourchettes conservent leurs bornes et utilisent leur point central pour la médiane. Dollars, seuils et valeurs non calculables sont exclus des agrégats.",
      caffeineRule: "Valeurs numériques publiques en milligrammes. Les fourchettes conservent leurs bornes et utilisent leur point central pour la médiane. Zéro milligramme reste une donnée valide.",
      ingredientsRule: "Familles détectées depuis les champs structurés. Elles peuvent se chevaucher et leurs pourcentages ne totalisent donc pas nécessairement 100 %.",
      transparencyRule: "Niveau de publication des dosages et informations comparables ; il ne mesure ni l’efficacité, ni le goût, ni la qualité du produit.",
      sourceRule: "Les informations proviennent des pages officielles citées et datées. Les allégations de marque ne sont pas traitées comme des mesures indépendantes.",
    },
    stats,
    findings: [
      `Le prix médian observé est de ${formatFrench(stats.priceMedianEur)} € par portion parmi les prix en euros comparables (n=${stats.priceSample}).`,
      `La caféine médiane publiée est de ${formatFrench(stats.caffeineMedianMg, 1)} mg par portion parmi les références chiffrées (n=${stats.caffeineSample}).`,
      `${topIngredient?.label ?? "Aucune famille"} est la famille la plus fréquente du panel avec ${topIngredient?.count ?? 0} références ; les familles peuvent se chevaucher (n=${stats.panelProducts}).`,
      `${highTransparency.count} références présentent une transparence de dosage élevée, soit ${formatFrench(highTransparency.percentage, 1)} % du panel (n=${stats.transparencySample}).`,
    ],
    series: {
      prices: {
        sampleSize: priced.length,
        items: priced
          .map((record) => ({ id: record.id, brand: record.brand, product: record.product, raw: record.rawPricePerServing, ...record.price }))
          .sort((a, b) => a.midpoint - b.midpoint || a.brand.localeCompare(b.brand, "fr")),
      },
      caffeine: {
        sampleSize: caffeinated.length,
        items: countSeries(CAFFEINE_BANDS, caffeineValues, caffeinated.length),
      },
      ingredients: {
        sampleSize: panel.length,
        overlapping: true,
        items: ingredientSeries,
      },
      transparency: {
        sampleSize: panel.length,
        items: transparencySeries,
      },
    },
    panel: panel.map((record) => ({
      id: record.id,
      brand: record.brand,
      product: record.product,
      category: record.category,
      rawPricePerServing: record.rawPricePerServing,
      price: record.price,
      rawCaffeine: record.rawCaffeine,
      caffeine: record.caffeine,
      transparency: record.transparency,
      ingredientFamilies: record.ingredientFamilies,
      laboratoryEvidence: record.laboratoryEvidence,
      source: record.source,
      lastVerified: record.lastVerified,
    })),
    records,
  };
}
