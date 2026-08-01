import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "data", "marques-cafe-fonctionnel.csv");
const TARGET = path.join(ROOT, "app", "brand-directory-data.ts");

function parseCsv(text) {
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i], next = text[i + 1];
    if (quoted) {
      if (ch === '"' && next === '"') { cell += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
    else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [headers, ...data] = rows.filter((item) => item.length > 1);
  return data.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

function macroLabel(value) {
  if (value.startsWith("1")) return "Univers du café";
  if (value.startsWith("2")) return "Cafés enrichis";
  return "Alternatives et dérivés";
}

function publicStatus(value) {
  if (value.includes("actif —")) return "Actif";
  if (value.includes("pré-lancement")) return "Pré-lancement";
  if (value.includes("épuisé") || value.includes("rupture")) return "Indisponible ou en rupture";
  if (value.includes("non confirmé") || value.includes("SKU actuel") || value.includes("reconfirmer")) return "À confirmer";
  return "À vérifier";
}

const rows = parseCsv(fs.readFileSync(SOURCE, "utf8"));
const products = rows.map((row, index) => ({
  id: `${row.marque}-${row.produit}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  brand: row.marque.replace(/\\+/g, "\\"),
  product: row.produit,
  market: row.pays_marche,
  format: row.format,
  category: row.classement,
  macroCategory: macroLabel(row.macro_categorie),
  base: row.base_reelle,
  actives: row.actifs_principaux,
  dose: row.dose_portion,
  caffeine: row.cafeine_portion,
  caffeineLevel: row.niveau_cafeine,
  price: row.prix_observe_2026_08_01,
  pricePerServing: row.prix_par_portion_observe,
  franceAvailability: row.disponibilite_france,
  source: row.source_officielle,
  secondarySource: row.source_secondaire,
  verificationLevel: row.statut_verification,
  commercialStatus: row.statut_commercial_actuel,
  publicStatus: publicStatus(row.statut_commercial_actuel),
  sourceState: row.etat_source_officielle,
  experience: row.experience_boisson,
  portions: row.nombre_portions,
  packWeight: row.poids_conditionnement,
  mushrooms: row.champignons_standardises,
  mushroomPart: row.partie_champignon,
  extraction: row.methode_extraction_infusion,
  protein: row.proteines_g,
  collagen: row.collagene_g,
  creatine: row.creatine_g,
  mct: row.mct_g,
  sweeteners: row.sucres_edulcorants,
  diet: row.allergenes_regime,
  preparation: row.preparation,
  transparency: row.transparence_dosage,
  laboratoryProof: row.preuve_laboratoire,
  promise: row.promesse_principale,
  editorialCaution: row.risque_editorial,
  notes: row.notes,
  lastVerified: row.date_derniere_verification,
  newEntry: index >= 101,
}));

const stats = {
  references: products.length,
  brands: new Set(products.map((product) => product.brand)).size,
  documentedCaffeine: products.filter((product) => product.caffeineLevel !== "non documenté").length,
  documentedServingPrice: products.filter((product) => !product.pricePerServing.startsWith("non calculable")).length,
  newReferences: products.filter((product) => product.newEntry).length,
  levelA: products.filter((product) => product.verificationLevel === "A").length,
  levelB: products.filter((product) => product.verificationLevel === "B").length,
  levelC: products.filter((product) => product.verificationLevel === "C").length,
};

const typeShape = `{
  id: string;
  brand: string;
  product: string;
  market: string;
  format: string;
  category: string;
  macroCategory: string;
  base: string;
  actives: string;
  dose: string;
  caffeine: string;
  caffeineLevel: string;
  price: string;
  pricePerServing: string;
  franceAvailability: string;
  source: string;
  secondarySource: string;
  verificationLevel: string;
  commercialStatus: string;
  publicStatus: string;
  sourceState: string;
  experience: string;
  portions: string;
  packWeight: string;
  mushrooms: string;
  mushroomPart: string;
  extraction: string;
  protein: string;
  collagen: string;
  creatine: string;
  mct: string;
  sweeteners: string;
  diet: string;
  preparation: string;
  transparency: string;
  laboratoryProof: string;
  promise: string;
  editorialCaution: string;
  notes: string;
  lastVerified: string;
  newEntry: boolean;
}`;

const output = `// Généré depuis data/marques-cafe-fonctionnel.csv par scripts/generate-public-brand-data.mjs.\n// Ne pas modifier ce fichier à la main.\n\nexport type DirectoryProduct = ${typeShape};\n\nexport const directoryProducts: DirectoryProduct[] = ${JSON.stringify(products, null, 2)};\n\nexport const directoryStats = ${JSON.stringify(stats, null, 2)} as const;\n\nexport const directoryUpdatedAt = "1er août 2026";\n`;

fs.writeFileSync(TARGET, output, "utf8");
console.log(`Generated ${TARGET} with ${products.length} references.`);
