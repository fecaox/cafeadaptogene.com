import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { directoryProducts } from "../app/brand-directory-data.ts";
import { guides, siteUrl } from "../app/site-data.ts";
import { buildAiAssets } from "./lib/ai-assets.mjs";

const outputDirectory = path.resolve(import.meta.dirname, "..", "public", "ai");
const assets = buildAiAssets({ guides, products: directoryProducts, siteUrl });

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeFile(path.join(outputDirectory, "content.json"), `${JSON.stringify(assets.content, null, 2)}\n`, "utf8"),
  writeFile(path.join(outputDirectory, "catalog.json"), `${JSON.stringify(assets.catalog, null, 2)}\n`, "utf8"),
  writeFile(path.join(outputDirectory, "sources.json"), `${JSON.stringify(assets.sources, null, 2)}\n`, "utf8"),
  writeFile(path.join(outputDirectory, "mcp-data.json"), `${JSON.stringify(assets.mcpData, null, 2)}\n`, "utf8"),
  writeFile(path.join(outputDirectory, "index.md"), assets.markdown, "utf8"),
]);

console.log(`Generated ${assets.content.documents.length} guides, ${assets.catalog.products.length} products and ${assets.sources.sources.length} sources in ${outputDirectory}.`);
