import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { barometer } from "../app/barometer-data.ts";
import { directoryProducts } from "../app/brand-directory-data.ts";
import { guides, siteUrl } from "../app/site-data.ts";
import { buildAiAssets } from "./lib/ai-assets.mjs";

const outputDirectory = path.resolve(import.meta.dirname, "..", "public", "ai");
const sourceRegistryPath = path.join(outputDirectory, "sources.json");

async function readSourceRegistry() {
  try {
    const registry = JSON.parse(await readFile(sourceRegistryPath, "utf8"));
    return Array.isArray(registry.sources) ? registry.sources : [];
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}
const barometerDataset = {
  slug: "barometre-cafes-fonctionnels-2027",
  title: barometer.metadata.title,
  url: barometer.metadata.canonicalUrl,
  description: "Données françaises comparables sur les prix par portion, la caféine, les ingrédients et la transparence des cafés fonctionnels.",
  findings: barometer.findings,
  methodology: barometer.methodology,
  stats: barometer.stats,
  metadata: {
    datasetVersion: barometer.metadata.datasetVersion,
    cutoffDate: barometer.metadata.cutoffDate,
    attribution: barometer.metadata.attribution,
  },
  downloads: [
    { format: "CSV", url: `${siteUrl}/data/barometre-cafes-fonctionnels-2027.csv` },
    { format: "JSON", url: `${siteUrl}/data/barometre-cafes-fonctionnels-2027.json` },
    { format: "Méthodologie", url: `${siteUrl}/data/barometre-cafes-fonctionnels-2027-methodologie.md` },
  ],
};
const existingSources = await readSourceRegistry();
const assets = buildAiAssets({ guides, products: directoryProducts, datasets: [barometerDataset], siteUrl, existingSources });

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeFile(path.join(outputDirectory, "content.json"), `${JSON.stringify(assets.content, null, 2)}\n`, "utf8"),
  writeFile(path.join(outputDirectory, "catalog.json"), `${JSON.stringify(assets.catalog, null, 2)}\n`, "utf8"),
  writeFile(path.join(outputDirectory, "sources.json"), `${JSON.stringify(assets.sources, null, 2)}\n`, "utf8"),
  writeFile(path.join(outputDirectory, "mcp-data.json"), `${JSON.stringify(assets.mcpData, null, 2)}\n`, "utf8"),
  writeFile(path.join(outputDirectory, "index.md"), assets.markdown, "utf8"),
]);

console.log(`Generated ${assets.content.documents.length} content documents, ${assets.catalog.products.length} products and ${assets.sources.sources.length} sources in ${outputDirectory}.`);
