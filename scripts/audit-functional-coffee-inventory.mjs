import fs from "node:fs";
import path from "node:path";

const csvPath = path.resolve(import.meta.dirname, "../data/marques-cafe-fonctionnel.csv");

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
  const [headers, ...data] = rows.filter((r) => r.length > 1);
  return { headers, data: data.map((r) => Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""]))) };
}

function counts(rows, field) {
  return Object.fromEntries([...new Map(rows.map((r) => [r[field], 0])).keys()].map((value) => [value, rows.filter((r) => r[field] === value).length]).sort((a, b) => b[1] - a[1]));
}

function duplicates(rows, makeKey) {
  const map = new Map();
  for (const row of rows) {
    const k = makeKey(row);
    map.set(k, (map.get(k) ?? 0) + 1);
  }
  return [...map.entries()].filter(([, n]) => n > 1);
}

const { headers, data } = parseCsv(fs.readFileSync(csvPath, "utf8"));
const required = ["marque", "produit", "source_officielle", "statut_verification", "date_derniere_verification", "statut_commercial_actuel", "priorite_seo", "risque_editorial"];
const emptyRequired = data.flatMap((row, index) => required.filter((field) => !row[field]).map((field) => ({ line: index + 2, field, brand: row.marque })));
const malformedUrls = data.filter((row) => !/^https:\/\//.test(row.source_officielle)).map((row) => row.marque);
const formulaErrors = data.filter((row) => Object.values(row).some((value) => /#REF!|#DIV\/0!|#VALUE!|#NAME\?|undefined|NaN/.test(value))).map((row) => row.marque);

const audit = {
  rows: data.length,
  brands: new Set(data.map((r) => r.marque)).size,
  columns: headers.length,
  verification: counts(data, "statut_verification"),
  macro_categories: counts(data, "macro_categorie"),
  commercial_status: counts(data, "statut_commercial_actuel"),
  priorities: counts(data, "priorite_seo"),
  caffeine_levels: counts(data, "niveau_cafeine"),
  transparency: counts(data, "transparence_dosage"),
  caffeine_documented: data.filter((r) => r.cafeine_mg_min !== "à confirmer").length,
  price_per_serving_documented: data.filter((r) => !r.prix_par_portion_observe.startsWith("non calculable")).length,
  lab_proof_documented: data.filter((r) => r.preuve_laboratoire !== "non publiée").length,
  empty_required: emptyRequired,
  malformed_urls: malformedUrls,
  formula_errors: formulaErrors,
  duplicate_brand_product: duplicates(data, (r) => `${r.marque}|||${r.produit}`),
  duplicate_sources: duplicates(data, (r) => r.source_officielle)
};

console.log(JSON.stringify(audit, null, 2));
if (emptyRequired.length || malformedUrls.length || formulaErrors.length || audit.duplicate_brand_product.length) process.exitCode = 1;
