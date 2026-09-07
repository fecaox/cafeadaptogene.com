import fs from "node:fs";
import path from "node:path";
import { parseCsv } from "./lib/functional-coffee-data.mjs";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "data", "marques-cafe-fonctionnel.csv");
const output = path.join(root, "data", "audits", "2026-09-08-functional-coffee-sources.md");
const rows = parseCsv(fs.readFileSync(source, "utf8"));
const sources = [...new Map(rows.map((row) => [row.source_officielle, { brand: row.marque, product: row.produit, url: row.source_officielle }])).values()];

async function inspectSource(entry) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    let response = await fetch(entry.url, { method: "HEAD", redirect: "follow", signal: controller.signal, headers: { "user-agent": "CafeAdaptogeneMarketAudit/1.0 (+https://cafeadaptogene.com/methodologie/)" } });
    if ([403, 405, 429].includes(response.status)) {
      response = await fetch(entry.url, { method: "GET", redirect: "follow", signal: controller.signal, headers: { "user-agent": "Mozilla/5.0 CafeAdaptogeneMarketAudit/1.0" } });
    }
    return { ...entry, status: response.status, finalUrl: response.url, result: response.ok ? "accessible" : "à contrôler" };
  } catch (error) {
    return { ...entry, status: 0, finalUrl: entry.url, result: error.name === "AbortError" ? "délai dépassé" : "échec réseau" };
  } finally {
    clearTimeout(timeout);
  }
}

const results = [];
for (let index = 0; index < sources.length; index += 8) {
  results.push(...await Promise.all(sources.slice(index, index + 8).map(inspectSource)));
}

const escapeCell = (value) => String(value).replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
const report = [
  "# Contrôle technique des sources officielles, 8 septembre 2026",
  "",
  "Ce contrôle vérifie l’accessibilité des pages officielles. Un statut HTTP positif ne confirme pas à lui seul la disponibilité commerciale ni l’exactitude de la fiche produit.",
  "",
  `- ${sources.length} URL officielles uniques contrôlées`,
  `- ${results.filter((item) => item.result === "accessible").length} pages accessibles`,
  `- ${results.filter((item) => item.result !== "accessible").length} pages à revoir manuellement`,
  "",
  "| Marque | Produit | HTTP | Résultat | URL finale |",
  "|---|---|---:|---|---|",
  ...results.map((item) => `| ${escapeCell(item.brand)} | ${escapeCell(item.product)} | ${item.status || "-"} | ${item.result} | ${escapeCell(item.finalUrl)} |`),
  "",
].join("\n");

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, report, "utf8");
console.log(`Audit écrit dans ${output}: ${results.filter((item) => item.result === "accessible").length}/${sources.length} pages accessibles.`);
