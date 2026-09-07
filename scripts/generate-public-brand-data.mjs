import fs from "node:fs";
import path from "node:path";
import { parseCsv } from "./lib/functional-coffee-data.mjs";
import { buildDirectoryProducts, buildMarketUpdateStats } from "./lib/public-brand-data.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE = path.join(ROOT, "data", "marques-cafe-fonctionnel.csv");
const TARGET = path.join(ROOT, "app", "brand-directory-data.ts");
const IMAGE_MANIFEST = path.join(ROOT, "data", "brand-image-manifest.json");

const rows = parseCsv(fs.readFileSync(SOURCE, "utf8"));
const imageManifest = fs.existsSync(IMAGE_MANIFEST) ? JSON.parse(fs.readFileSync(IMAGE_MANIFEST, "utf8")) : {};
const products = buildDirectoryProducts(rows, imageManifest);
const marketUpdateStats = buildMarketUpdateStats(products);

const stats = {
  references: products.length,
  brands: new Set(products.map((product) => product.brand)).size,
  documentedCaffeine: products.filter((product) => product.caffeineLevel !== "non documenté").length,
  documentedServingPrice: products.filter((product) => !product.pricePerServing.startsWith("non calculable")).length,
  newReferences: products.filter((product) => product.newEntry).length,
  levelA: products.filter((product) => product.verificationLevel === "A").length,
  levelB: products.filter((product) => product.verificationLevel === "B").length,
  levelC: products.filter((product) => product.verificationLevel === "C").length,
  packagingImages: products.filter((product) => product.imagePath).length,
  packagingImagesMissing: products.filter((product) => !product.imagePath).length,
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
  firstObservedAt: string;
  changeType: string;
  changeDate: string;
  changeSummary: string;
  featuredNovelty: boolean;
  newEntry: boolean;
  imagePath: string | null;
  imageSource: string | null;
  imagePageSource: string | null;
  imageStatus: string;
}`;

const output = `// Généré depuis data/marques-cafe-fonctionnel.csv par scripts/generate-public-brand-data.mjs.\n// Ne pas modifier ce fichier à la main.\n\nexport type DirectoryProduct = ${typeShape};\n\nexport const directoryProducts: DirectoryProduct[] = ${JSON.stringify(products, null, 2)};\n\nexport const directoryStats = ${JSON.stringify(stats, null, 2)} as const;\n\nexport const marketUpdateStats = ${JSON.stringify(marketUpdateStats, null, 2)} as const;\n\nexport const directoryUpdatedAt = "8 septembre 2026";\n`;

fs.writeFileSync(TARGET, output, "utf8");
console.log(`Generated ${TARGET} with ${products.length} references.`);
