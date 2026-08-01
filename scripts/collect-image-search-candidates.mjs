import fs from "node:fs/promises";
import path from "node:path";
import { directoryProducts } from "../app/brand-directory-data.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const MANIFEST = JSON.parse(await fs.readFile(path.join(ROOT, "data", "brand-image-manifest.json"), "utf8"));
const OUTPUT = "/private/tmp/cafeadaptogene-fallback-candidates";
const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130 Safari/537.36";

const reviewIds = new Set([
  "popeli-super-cafe-proteine",
  "lion-spirit-cafes-bibal-focus-criniere-de-lion",
  "purasana-mushroom-coffee",
  "ryze-mushroom-coffee",
  "london-nootropics-mush-love",
  "eightbillion-brain-mood-coffee",
  "atlas-superblend-coffee-latte",
  "organo-gourmet-black-coffee-coffee-range",
  "eight-batch-001",
  "creoffee-original",
  "day-one-functional-coffees-creatine-coffee-k-cup",
  "mareshi-drive",
  "urth-root-creatine-coffee",
  "lyfe-mushrooms-mushroom-coffee",
]);

const targets = directoryProducts.filter((item) => !MANIFEST[item.id]?.imagePath || reviewIds.has(item.id));

function decodeHtml(value = "") {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&amp;", "&")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function extension(contentType, url) {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  if (contentType.includes("avif")) return "avif";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "jpg";
  const match = url.match(/\.(jpe?g|png|webp|avif)(?:\?|$)/i);
  return match?.[1]?.toLowerCase().replace("jpeg", "jpg") ?? null;
}

function unsafe(value) {
  return /porn|xxx|rule34|hentai|booru|adult|erotic|nude|sexcam|xhamster/i.test(value);
}

async function imageSearch(item) {
  const officialHost = new URL(item.source).hostname.replace(/^www\./, "");
  const queries = [
    `"${item.brand}" "${item.product}" product packaging`,
    `site:${officialHost} "${item.product}"`,
  ];
  const results = [];
  for (const query of queries) {
    const url = `https://www.bing.com/images/search?q=${encodeURIComponent(query)}&form=HDRSC2&safeSearch=Strict`;
    const response = await fetch(url, { headers: { "user-agent": USER_AGENT, "accept-language": "fr-FR,fr;q=0.9,en;q=0.8" }, signal: AbortSignal.timeout(18000) });
    if (!response.ok) continue;
    const html = await response.text();
    for (const match of html.matchAll(/<a\s+[^>]*class=["'][^"']*iusc[^"']*["'][^>]*\sm=["']([^"']+)["']/gi)) {
      try {
        const data = JSON.parse(decodeHtml(match[1]));
        const haystack = `${data.murl ?? ""} ${data.purl ?? ""} ${data.t ?? ""} ${data.desc ?? ""}`;
        if (!data.murl || unsafe(haystack)) continue;
        const duplicate = results.some((result) => result.murl === data.murl);
        if (!duplicate) results.push({ murl: data.murl, purl: data.purl, title: data.t || data.desc || "", query });
      } catch { /* malformed result metadata */ }
    }
  }
  return results;
}

async function download(url, destinationBase) {
  const response = await fetch(url, { redirect: "follow", headers: { "user-agent": USER_AGENT, accept: "image/avif,image/webp,image/png,image/jpeg,*/*;q=0.7" }, signal: AbortSignal.timeout(18000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) throw new Error(contentType);
  const ext = extension(contentType, response.url);
  if (!ext) throw new Error(`type ${contentType}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 12_000 || bytes.length > 12_000_000) throw new Error(`size ${bytes.length}`);
  const destination = `${destinationBase}.${ext}`;
  await fs.writeFile(destination, bytes);
  return { destination, bytes: bytes.length, finalUrl: response.url };
}

await fs.rm(OUTPUT, { recursive: true, force: true });
await fs.mkdir(OUTPUT, { recursive: true });
const report = {};
for (let itemIndex = 0; itemIndex < targets.length; itemIndex += 1) {
  const item = targets[itemIndex];
  const itemDir = path.join(OUTPUT, item.id);
  await fs.mkdir(itemDir, { recursive: true });
  const results = await imageSearch(item);
  const saved = [];
  for (const result of results.slice(0, 12)) {
    if (saved.length >= 6) break;
    try {
      const file = await download(result.murl, path.join(itemDir, String(saved.length + 1).padStart(2, "0")));
      saved.push({ ...result, ...file, destination: path.basename(file.destination) });
    } catch { /* try next image candidate */ }
  }
  report[item.id] = { brand: item.brand, product: item.product, officialSource: item.source, candidates: saved };
  console.log(`${itemIndex + 1}/${targets.length} ${String(saved.length).padStart(2, "0")} candidats — ${item.brand} — ${item.product}`);
}
await fs.writeFile(path.join(OUTPUT, "report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`${targets.length} références examinées. Rapport: ${path.join(OUTPUT, "report.json")}`);
