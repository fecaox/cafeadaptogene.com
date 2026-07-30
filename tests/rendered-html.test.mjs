import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Café Adaptogène homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="fr">/i);
  assert.match(html, /Café Adaptogène — Le guide des cafés nouvelle génération/i);
  assert.match(html, /Quel café voulez-vous vraiment boire/i);
  assert.match(html, /Trois univers/i);
  assert.match(html, /Torrégral/i);
  assert.match(html, /Cafés enrichis/i);
  assert.match(html, /Trouver mon café/i);
  assert.match(html, /application\/ld\+json/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("ships the static GitHub Pages essentials", async () => {
  const root = new URL("../", import.meta.url);
  const [cname, robots, sitemap, outputHome] = await Promise.all([
    readFile(new URL("public/CNAME", root), "utf8"),
    readFile(new URL("out/robots.txt", root), "utf8"),
    readFile(new URL("out/sitemap.xml", root), "utf8"),
    readFile(new URL("out/index.html", root), "utf8"),
  ]);

  assert.equal(cname.trim(), "cafeadaptogene.com");
  assert.match(robots, /Sitemap: https:\/\/cafeadaptogene\.com\/sitemap\.xml/);
  assert.match(sitemap, /cafe-champignon/);
  assert.match(sitemap, /cafe-bdnf/);
  assert.match(sitemap, /quel-cafe-me-correspond/);
  assert.match(sitemap, /cafe-intrinsequement-fonctionnel/);
  assert.match(sitemap, /cafe-fonctionnel/);
  assert.match(sitemap, /cafe-nouvelle-generation/);
  assert.match(sitemap, /comparatif-cafe-adaptogene/);
  assert.match(outputHome, /og\.png/);
  await access(new URL("out/guide-cafe-adaptogene/index.html", root));
  await access(new URL("out/quel-cafe-me-correspond/index.html", root));
  await access(new URL("out/cafes-enrichis/index.html", root));
  await access(new URL("out/cafe-fonctionnel/index.html", root));
  await access(new URL("out/cafe-nouvelle-generation/index.html", root));
  await access(new URL("out/comparatif-cafe-adaptogene/index.html", root));
  await assert.rejects(access(new URL("app/_sites-preview/SkeletonPreview.tsx", root)));
});

test("server-renders a priority SEO article with its internal cluster", async () => {
  const response = await render("/comparatif-cafe-adaptogene/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Meilleur café adaptogène/i);
  assert.match(html, /Quel café adaptogène choisir selon votre profil/i);
  assert.match(html, /Portion/i);
  assert.match(html, /Caféine/i);
  assert.match(html, /Faire le test personnalisé/i);
  assert.match(html, /FAQPage/i);
});

test("server-renders the recommendation quiz", async () => {
  const response = await render("/quel-cafe-me-correspond/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Quel café vous/i);
  assert.match(html, /aucune marque citée pendant le test/i);
  assert.match(html, /Question[\s\S]*01[\s\S]*07/i);
  assert.match(html, /Le goût d’un véritable café/i);
});
