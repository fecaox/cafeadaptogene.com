import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { buildBarometer } from "./lib/barometer-data.mjs";
import { parseCsv, validateFunctionalCoffeeRows } from "./lib/functional-coffee-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const dataDirectory = path.join(root, "public", "data");
const csvPath = path.join(root, "data", "marques-cafe-fonctionnel.csv");
const basename = "barometre-cafes-fonctionnels-2027";

function csvCell(value) {
  const text = value === null || value === undefined ? "" : Array.isArray(value) ? value.join(" | ") : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function publicCsv(barometer) {
  const headers = [
    "id", "marque", "produit", "marche", "categorie", "univers", "base", "actifs_principaux",
    "disponibilite_france", "statut_commercial", "niveau_verification", "derniere_verification",
    "panel_inclus", "motifs_exclusion", "prix_portion_brut", "prix_min_eur", "prix_max_eur",
    "prix_central_eur", "cafeine_brute", "cafeine_min_mg", "cafeine_max_mg", "cafeine_centrale_mg",
    "niveau_cafeine", "transparence", "familles_ingredients", "preuve_laboratoire", "source_officielle",
  ];

  const values = barometer.records.map((record) => [
    record.id,
    record.brand,
    record.product,
    record.market,
    record.category,
    record.macroCategory,
    record.base,
    record.actives,
    record.franceAvailability,
    record.commercialStatus,
    record.verificationLevel,
    record.lastVerified,
    record.panelIncluded ? "oui" : "non",
    record.panelExclusionReasons,
    record.rawPricePerServing,
    record.price?.min,
    record.price?.max,
    record.price?.midpoint,
    record.rawCaffeine,
    record.caffeine?.min,
    record.caffeine?.max,
    record.caffeine?.midpoint,
    record.caffeineLevel,
    record.transparency,
    record.ingredientFamilies,
    record.laboratoryEvidence,
    record.source,
  ]);

  return `\ufeff${[headers, ...values].map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

function methodMarkdown(barometer) {
  const { metadata, methodology, stats } = barometer;
  return `# ${metadata.title} — méthodologie

Version du jeu de données : **${metadata.datasetVersion}**  
Données arrêtées au : **6 novembre 2026**  
Page canonique : ${metadata.canonicalUrl}

## Périmètre

L’univers recensé contient ${stats.universeProducts} produits. Les analyses principales portent sur un panel France qualifié de **${stats.panelProducts} produits et ${stats.panelBrands} marques**.

Une référence entre dans le panel si :

${methodology.panelCriteria.map((criterion) => `- ${criterion}`).join("\n")}

## Sous-échantillon prix (n=${stats.priceSample})

${methodology.priceRule}

## Sous-échantillon caféine (n=${stats.caffeineSample})

${methodology.caffeineRule}

## Ingrédients et transparence

${methodology.ingredientsRule}

${methodology.transparencyRule} Il ne mesure ni l’efficacité, ni le goût, ni la qualité générale d’un produit.

La preuve de laboratoire est publiée séparément : document consultable, analyse annoncée sans document archivé ou preuve non publiée.

## Sources et limites

${methodology.sourceRule}

Le baromètre ne démontre pas l’efficacité clinique des produits finis. Les prix sont des observations datées et peuvent évoluer. Une valeur absente reste absente ; elle n’est jamais remplacée par une estimation silencieuse.

## Citation conseillée

${metadata.attribution}

Licence d’usage : ${metadata.license}
`;
}

function xml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function short(value, limit = 54) {
  const text = String(value);
  return text.length <= limit ? text : `${text.slice(0, limit - 1)}…`;
}

function svgFrame({ title, description, subtitle, sampleSize, height, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${height}" viewBox="0 0 1200 ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${xml(title)}</title>
  <desc id="desc">${xml(description)}</desc>
  <rect width="1200" height="${height}" fill="#f7f2e8"/>
  <text x="70" y="72" fill="#183126" font-family="Arial, sans-serif" font-size="36" font-weight="700">${xml(title)}</text>
  <text x="70" y="110" fill="#4f665b" font-family="Arial, sans-serif" font-size="18">${xml(subtitle)} · n=${sampleSize}</text>
  ${body}
  <line x1="70" y1="${height - 72}" x2="1130" y2="${height - 72}" stroke="#d4c9b7"/>
  <text x="70" y="${height - 38}" fill="#5d6c64" font-family="Arial, sans-serif" font-size="16">Données arrêtées au 6 novembre 2026 · Source : Café Adaptogène</text>
</svg>
`;
}

function priceSvg(barometer) {
  const { items, sampleSize } = barometer.series.prices;
  const height = 220 + (items.length * 43);
  const max = Math.max(...items.map((item) => item.max), 1);
  const scale = 570 / max;
  const body = items.map((item, index) => {
    const y = 156 + (index * 43);
    const minX = 440 + (item.min * scale);
    const maxX = 440 + (item.max * scale);
    const middleX = 440 + (item.midpoint * scale);
    const label = short(`${item.brand} — ${item.product}`);
    const value = item.min === item.max
      ? `${item.midpoint.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €`
      : `${item.min.toLocaleString("fr-FR", { maximumFractionDigits: 2 })}–${item.max.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} €`;
    return `<text x="70" y="${y + 6}" fill="#183126" font-family="Arial, sans-serif" font-size="15">${xml(label)}</text>
  <line x1="440" y1="${y}" x2="1010" y2="${y}" stroke="#e3dacb" stroke-width="10" stroke-linecap="round"/>
  <line x1="${minX}" y1="${y}" x2="${maxX}" y2="${y}" stroke="#b7623e" stroke-width="10" stroke-linecap="round"/>
  <circle cx="${middleX}" cy="${y}" r="6" fill="#183126"/>
  <text x="1040" y="${y + 6}" fill="#183126" font-family="Arial, sans-serif" font-size="15">${xml(value)}</text>`;
  }).join("\n  ");

  return svgFrame({
    title: "Prix par portion des cafés fonctionnels",
    description: "Fourchettes et points centraux des prix en euros publiquement comparables dans le panel France qualifié.",
    subtitle: "Fourchettes observées en euros ; le point marque la valeur centrale",
    sampleSize,
    height,
    body,
  });
}

function categorySvg({ title, description, subtitle, series, color = "#b7623e" }) {
  const { items, sampleSize } = series;
  const height = 250 + (items.length * 76);
  const max = Math.max(...items.map((item) => item.count), 1);
  const body = items.map((item, index) => {
    const y = 170 + (index * 76);
    const width = (item.count / max) * 650;
    return `<text x="70" y="${y}" fill="#183126" font-family="Arial, sans-serif" font-size="19" font-weight="600">${xml(item.label)}</text>
  <rect x="390" y="${y - 22}" width="650" height="28" rx="14" fill="#e3dacb"/>
  <rect x="390" y="${y - 22}" width="${width}" height="28" rx="14" fill="${color}"/>
  <text x="1060" y="${y}" fill="#183126" font-family="Arial, sans-serif" font-size="18">${item.count} · ${item.percentage.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %</text>`;
  }).join("\n  ");

  return svgFrame({ title, description, subtitle, sampleSize, height, body });
}

const sourceText = await readFile(csvPath, "utf8");
const rows = parseCsv(sourceText);
const errors = validateFunctionalCoffeeRows(rows);
if (errors.length) throw new Error(`Base fonctionnelle invalide :\n${errors.join("\n")}`);

const barometer = buildBarometer(rows);
const pageBarometer = {
  metadata: barometer.metadata,
  methodology: barometer.methodology,
  stats: barometer.stats,
  findings: barometer.findings,
  series: barometer.series,
  panel: barometer.panel,
};

await mkdir(dataDirectory, { recursive: true });
await Promise.all([
  writeFile(path.join(dataDirectory, `${basename}.csv`), publicCsv(barometer), "utf8"),
  writeFile(path.join(dataDirectory, `${basename}.json`), `${JSON.stringify(barometer, null, 2)}\n`, "utf8"),
  writeFile(path.join(dataDirectory, `${basename}-methodologie.md`), methodMarkdown(barometer), "utf8"),
  writeFile(path.join(dataDirectory, `${basename}-prix.svg`), priceSvg(barometer), "utf8"),
  writeFile(path.join(dataDirectory, `${basename}-cafeine.svg`), categorySvg({
    title: "Caféine publiée par portion",
    description: "Répartition des références du panel France disposant d’une valeur de caféine chiffrée.",
    subtitle: "Valeurs annoncées ou publiées par les marques",
    series: barometer.series.caffeine,
  }), "utf8"),
  writeFile(path.join(dataDirectory, `${basename}-ingredients.svg`), categorySvg({
    title: "Principales familles d’ingrédients",
    description: "Présence des familles d’ingrédients dans le panel France qualifié ; une référence peut appartenir à plusieurs familles.",
    subtitle: "Catégories chevauchantes ; les pourcentages ne totalisent pas 100 %",
    series: barometer.series.ingredients,
    color: "#3e7761",
  }), "utf8"),
  writeFile(path.join(dataDirectory, `${basename}-transparence.svg`), categorySvg({
    title: "Niveau de transparence des dosages",
    description: "Répartition des niveaux de publication des informations nécessaires à la comparaison.",
    subtitle: "Ce niveau ne mesure ni efficacité, ni goût, ni qualité générale",
    series: barometer.series.transparency,
    color: "#7a5a91",
  }), "utf8"),
  writeFile(path.join(root, "app", "barometer-data.ts"), `// Fichier généré par scripts/generate-barometer-assets.mjs. Ne pas modifier manuellement.\nexport const barometer = ${JSON.stringify(pageBarometer, null, 2)} as const;\n`, "utf8"),
]);

console.log(`Generated ${barometer.stats.universeProducts} records, ${barometer.stats.panelProducts} panel products and 4 charts in ${dataDirectory}.`);
