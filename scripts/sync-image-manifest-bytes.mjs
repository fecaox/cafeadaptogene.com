import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(root, "data", "brand-image-manifest.json");
const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));

for (const entry of Object.values(manifest)) {
  if (!entry.imagePath) {
    delete entry.bytes;
    continue;
  }

  if (!entry.imagePath.startsWith("/images/directory/")) {
    delete entry.bytes;
    continue;
  }

  const file = path.join(root, "public", entry.imagePath.replace(/^\//, ""));
  entry.bytes = (await fs.stat(file)).size;
}

await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Poids synchronisé pour ${Object.values(manifest).filter((entry) => entry.imagePath).length} images.`);
