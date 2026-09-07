import fs from "node:fs";
import path from "node:path";
import { parseCsv, validateFunctionalCoffeeRows } from "./lib/functional-coffee-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "data", "marques-cafe-fonctionnel.csv");
const rows = parseCsv(fs.readFileSync(source, "utf8"));
const errors = validateFunctionalCoffeeRows(rows);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`${rows.length} références valides, aucun identifiant dupliqué.`);
}

