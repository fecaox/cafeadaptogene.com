import fs from "node:fs/promises";
import path from "node:path";
import { directoryProducts } from "../app/brand-directory-data.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "public", "images", "directory");
const MANIFEST_PATH = path.join(ROOT, "data", "brand-image-manifest.json");
const REPORT_PATH = path.join(ROOT, "data", "brand-image-report.json");
const USER_AGENT = "Mozilla/5.0 (compatible; CafeAdaptogeneBot/1.0; +https://cafeadaptogene.com/methodologie/)";

const existingImages = {
  "torregral-torregral": "/images/products/torregral-packaging.jpg",
  "cafe-minceur-cafe-minceur": "/images/products/cafeminceur-packaging.jpg",
  "cafe-integral-cafe-integral-100": "/images/products/cafeintegral-packaging.jpg",
  "bonjour-super-cafe": "/images/products/bonjourdrink-packaging.jpg",
  "wake-wake-original": "/images/products/wake-packaging.jpg",
  "brainstoorm-mush-n-go-cafe-adaptogene": "/images/products/brainstoorm-packaging.jpg",
  "french-mush-boost-cafe": "/images/products/frenchmush-packaging.jpg",
  "cafe-des-guerriers-le-cafe-parfait": "/images/products/cafedesguerriers-packaging.jpg",
  "strate-cafe-adaptogene": "/images/products/strate-packaging.jpg",
  "cosmic-blend-cosmic-blend-coffee": "/images/products/cosmicblend-packaging.jpg",
  "cafit-cafe-proteine": "/images/products/cafit-packaging.jpg",
  "corial-collagen-coffee-original": "/images/products/corial-packaging.jpg",
};

function decodeHtml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&#x2F;", "/")
    .replaceAll("\\/", "/")
    .trim();
}

function terms(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((term) => term.length >= 3 && !["coffee", "cafe", "original", "organic", "with", "the"].includes(term));
}

function collectJsonImages(value, output = [], inProduct = false) {
  if (!value) return output;
  if (Array.isArray(value)) {
    for (const item of value) collectJsonImages(item, output, inProduct);
    return output;
  }
  if (typeof value !== "object") return output;
  const productContext = inProduct || value["@type"] === "Product" || (Array.isArray(value["@type"]) && value["@type"].includes("Product"));
  if (productContext && value.image) {
    const images = Array.isArray(value.image) ? value.image : [value.image];
    for (const image of images) {
      if (typeof image === "string") output.push({ url: image, type: "json-product", hint: value.name ?? "" });
      else if (image?.url) output.push({ url: image.url, type: "json-product", hint: value.name ?? "" });
    }
  }
  for (const child of Object.values(value)) collectJsonImages(child, output, productContext);
  return output;
}

function extractCandidates(html, pageUrl, item) {
  const candidates = [];
  const metaPattern = /<meta\s+[^>]*(?:property|name)=["']([^"']+)["'][^>]*content=["']([^"']+)["'][^>]*>|<meta\s+[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["']([^"']+)["'][^>]*>/gi;
  for (const match of html.matchAll(metaPattern)) {
    const key = (match[1] ?? match[4] ?? "").toLowerCase();
    const value = match[2] ?? match[3] ?? "";
    if (key.includes("og:image") || key.includes("twitter:image")) candidates.push({ url: value, type: key.includes("og:") ? "og" : "twitter", hint: "" });
  }

  for (const match of html.matchAll(/<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { collectJsonImages(JSON.parse(match[1]), candidates); } catch { /* malformed vendor JSON-LD */ }
  }

  for (const match of html.matchAll(/<img\s+[^>]*>/gi)) {
    const tag = match[0];
    const src = tag.match(/(?:src|data-src|data-original)=["']([^"']+)["']/i)?.[1];
    const srcset = tag.match(/(?:srcset|data-srcset)=["']([^"']+)["']/i)?.[1];
    const largestSrcset = srcset?.split(",").map((part) => part.trim().split(/\s+/)[0]).filter(Boolean).at(-1);
    const alt = tag.match(/alt=["']([^"']*)["']/i)?.[1] ?? "";
    if (largestSrcset || src) candidates.push({ url: largestSrcset ?? src, type: "img", hint: alt });
  }

  const brandTerms = terms(item.brand);
  const productTerms = terms(item.product);
  const deduped = new Map();
  for (const candidate of candidates) {
    try {
      let rawUrl = decodeHtml(candidate.url);
      if (rawUrl.startsWith("//")) rawUrl = `https:${rawUrl}`;
      const url = new URL(rawUrl, pageUrl).href;
      if (!/^https?:/.test(url) || /\.(svg|gif)(\?|$)/i.test(url)) continue;
      const searchable = `${url} ${candidate.hint}`.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      let score = candidate.type === "json-product" ? 120 : candidate.type === "og" ? 90 : candidate.type === "twitter" ? 75 : 25;
      score += brandTerms.filter((term) => searchable.includes(term)).length * 18;
      score += productTerms.filter((term) => searchable.includes(term)).length * 14;
      if (/product|produit|pack|pouch|bag|sachet|jar|tub|coffee|cafe|latte|blend/i.test(searchable)) score += 16;
      if (/logo|favicon|icon|avatar|payment|flag|trust|badge|footer|header/i.test(searchable)) score -= 100;
      if (/blog|article|recipe|lifestyle|banner|hero/i.test(searchable)) score -= 18;
      const previous = deduped.get(url);
      if (!previous || score > previous.score) deduped.set(url, { ...candidate, url, score });
    } catch { /* invalid URL */ }
  }
  return [...deduped.values()].sort((a, b) => b.score - a.score);
}

function imageExtension(contentType, url) {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("avif")) return "avif";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  const match = url.match(/\.(jpe?g|png|webp|avif)(?:\?|$)/i);
  return match ? match[1].toLowerCase().replace("jpeg", "jpg") : null;
}

async function fetchWithTimeout(url, timeout = 18000) {
  return fetch(url, {
    redirect: "follow",
    headers: { "user-agent": USER_AGENT, accept: "text/html,application/xhtml+xml,image/avif,image/webp,image/png,image/jpeg,*/*;q=0.7" },
    signal: AbortSignal.timeout(timeout),
  });
}

async function downloadCandidate(candidate, item) {
  const response = await fetchWithTimeout(candidate.url);
  if (!response.ok) throw new Error(`image HTTP ${response.status}`);
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) throw new Error(`not an image: ${contentType}`);
  const extension = imageExtension(contentType, response.url);
  if (!extension) throw new Error(`unsupported image: ${contentType}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 12_000) throw new Error(`image too small: ${bytes.length}`);
  const filename = `${item.id}.${extension}`;
  await fs.writeFile(path.join(OUTPUT_DIR, filename), bytes);
  return { imagePath: `/images/directory/${filename}`, bytes: bytes.length, finalUrl: response.url };
}

async function collectOne(item) {
  if (existingImages[item.id]) {
    return { id: item.id, brand: item.brand, product: item.product, imagePath: existingImages[item.id], imageSource: item.source, pageSource: item.source, status: "existing-reviewed", note: "Visuel déjà présent dans la sélection éditoriale." };
  }

  try {
    const response = await fetchWithTimeout(item.source);
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok) throw new Error(`page HTTP ${response.status}`);
    if (!contentType.includes("html")) throw new Error(`source non HTML: ${contentType}`);
    const html = await response.text();
    const candidates = extractCandidates(html, response.url, item);
    const errors = [];
    for (const candidate of candidates.slice(0, 12)) {
      try {
        const downloaded = await downloadCandidate(candidate, item);
        return {
          id: item.id,
          brand: item.brand,
          product: item.product,
          imagePath: downloaded.imagePath,
          imageSource: downloaded.finalUrl,
          pageSource: response.url,
          status: candidate.type === "json-product" ? "official-product-image" : "official-page-image",
          bytes: downloaded.bytes,
          note: `Candidat ${candidate.type}, score ${candidate.score}.`,
        };
      } catch (error) { errors.push(error.message); }
    }
    throw new Error(candidates.length ? errors.at(-1) ?? "aucun candidat téléchargeable" : "aucune image trouvée dans la page officielle");
  } catch (error) {
    return { id: item.id, brand: item.brand, product: item.product, imagePath: null, imageSource: null, pageSource: item.source, status: "missing", note: error.message };
  }
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
const results = [];
const queue = [...directoryProducts];
const workers = Array.from({ length: 5 }, async () => {
  while (queue.length) {
    const item = queue.shift();
    const result = await collectOne(item);
    results.push(result);
    console.log(`${results.length}/${directoryProducts.length} ${result.status.padEnd(24)} ${item.brand} — ${item.product}`);
  }
});
await Promise.all(workers);
results.sort((a, b) => directoryProducts.findIndex((item) => item.id === a.id) - directoryProducts.findIndex((item) => item.id === b.id));

const manifest = Object.fromEntries(results.map((result) => [result.id, result]));
const counts = Object.fromEntries([...new Set(results.map((result) => result.status))].map((status) => [status, results.filter((result) => result.status === status).length]));
await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
await fs.writeFile(REPORT_PATH, `${JSON.stringify({ updatedAt: "2026-08-01", references: results.length, counts, missing: results.filter((result) => !result.imagePath) }, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ references: results.length, counts }, null, 2));
