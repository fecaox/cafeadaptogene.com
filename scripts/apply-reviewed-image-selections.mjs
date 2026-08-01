import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MANIFEST_PATH = path.join(ROOT, "data", "brand-image-manifest.json");
const REPORT_PATH = path.join(ROOT, "data", "brand-image-report.json");
const CANDIDATE_ROOT = "/private/tmp/cafeadaptogene-fallback-candidates";
const OUTPUT_DIR = path.join(ROOT, "public", "images", "directory");

// Candidate numbers were selected after visual review of the generated contact
// sheets. An absent id is intentional: no trustworthy packaging image was found.
const selections = {
  "mousse-mousse-cafe-adaptogene": 1,
  "popeli-super-cafe-proteine": 1,
  "lion-spirit-cafes-bibal-focus-criniere-de-lion": 1,
  "earthshake-functional-coffee": 3,
  "london-nootropics-mush-love": 1,
  "purasana-mushroom-coffee": 1,
  "ryze-mushroom-coffee": 2,
  "eightbillion-brain-mood-coffee": 2,
  "nueva-nueva-morning": 2,
  "atlas-superblend-coffee-latte": 5,
  "mushup-spark": 1,
  "mahogany-organics-7-mushrooms-mix-coffee": 1,
  "organo-gourmet-black-coffee-coffee-range": 1,
  "vahdam-mushroom-coffee": 1,
  "herbalife-high-protein-iced-coffee": 2,
  "creoffee-original": 1,
  "creatinecoffeee-creatinecoffee": 1,
  "day-one-functional-coffees-creatine-coffee-k-cup": 1,
  "vitacup-creatine-coffee": 1,
  "protealpes-whey-cafe-sans-sucres-ajoutes": 1,
  "lyfe-mushrooms-mushroom-coffee": 1,
  "egano-ganoderma-coffee": 1,
  "king-coffee-cappuccino-collagen": 1,
  "rytual-cafe-a-base-de-hongos": 2,
};

const rejectedIds = new Set([
  "eight-batch-001",
  "urth-root-creatine-coffee",
]);

const manifest = JSON.parse(await fs.readFile(MANIFEST_PATH, "utf8"));
const candidates = JSON.parse(await fs.readFile(path.join(CANDIDATE_ROOT, "report.json"), "utf8"));
await fs.mkdir(OUTPUT_DIR, { recursive: true });

for (const [id, candidateNumber] of Object.entries(selections)) {
  const candidate = candidates[id]?.candidates?.[candidateNumber - 1];
  if (!candidate) throw new Error(`Candidat ${candidateNumber} introuvable pour ${id}`);
  const extension = path.extname(candidate.destination).toLowerCase();
  const filename = `${id}${extension}`;
  await fs.copyFile(path.join(CANDIDATE_ROOT, id, candidate.destination), path.join(OUTPUT_DIR, filename));
  manifest[id] = {
    ...manifest[id],
    imagePath: `/images/directory/${filename}`,
    imageSource: candidate.finalUrl || candidate.murl,
    pageSource: candidate.purl || manifest[id]?.pageSource,
    status: "reviewed-search-image",
    bytes: candidate.bytes,
    note: "Visuel de packaging sélectionné après contrôle visuel manuel.",
  };
}

for (const id of rejectedIds) {
  const previousPath = manifest[id]?.imagePath;
  if (previousPath?.startsWith("/images/directory/")) {
    await fs.rm(path.join(ROOT, "public", previousPath), { force: true });
  }
  manifest[id] = {
    ...manifest[id],
    imagePath: null,
    imageSource: null,
    status: "missing",
    note: "Aucun visuel de packaging vérifiable n’a été trouvé. Le produit est encore en pré-lancement ou la marque ne publie pas de paquet identifiable.",
  };
}

const entries = Object.values(manifest);
const counts = Object.fromEntries(
  [...new Set(entries.map((entry) => entry.status))].map((status) => [status, entries.filter((entry) => entry.status === status).length]),
);
await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
await fs.writeFile(
  REPORT_PATH,
  `${JSON.stringify({
    updatedAt: "2026-08-01",
    references: entries.length,
    counts,
    missing: entries.filter((entry) => !entry.imagePath),
  }, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify({ references: entries.length, counts, missing: entries.filter((entry) => !entry.imagePath).map((entry) => entry.id) }, null, 2));
