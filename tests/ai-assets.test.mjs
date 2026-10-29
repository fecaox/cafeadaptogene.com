import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { directoryProducts } from "../app/brand-directory-data.ts";
import { guides, siteUrl } from "../app/site-data.ts";
import { buildAiAssets, normalizeSearchText } from "../scripts/lib/ai-assets.mjs";

test("normalise les accents et la ponctuation pour une recherche française", () => {
  assert.equal(normalizeSearchText("  Café protéiné — Énergie !  "), "cafe proteine energie");
});

test("construit des identifiants stables et des URLs publiques absolues", () => {
  const assets = buildAiAssets({ guides, products: directoryProducts, siteUrl });

  assert.equal(assets.content.documents.length, 11);
  assert.equal(assets.catalog.products.length, 143);
  assert.equal(assets.content.documents[0].id, "guide:torregral");
  assert.equal(assets.content.documents[0].url, "https://cafeadaptogene.com/torregral/");
  assert.equal(assets.catalog.products[0].id, "product:torregral-torregral");
  assert.equal(assets.catalog.products[0].url, "https://cafeadaptogene.com/annuaire-cafes-fonctionnels/");
  assert.equal(assets.mcpData.documents.length, 154);
});

test("conserve les limites éditoriales utiles aux agents", () => {
  const assets = buildAiAssets({ guides, products: directoryProducts, siteUrl });
  const torr = assets.catalog.products.find((product) => product.id === "product:torregral-torregral");

  assert.ok(torr);
  assert.match(torr.text, /produit fini non analysé/i);
  assert.match(torr.text, /faible à moyen/i);
  assert.equal(torr.metadata.lastVerified, "2026-08-25");
  assert.doesNotMatch(JSON.stringify(assets), /fecaox@gmail\.com/i);
});

test("déduplique les sources tout en reliant chaque document", () => {
  const duplicateUrl = "https://example.org/source";
  const assets = buildAiAssets({
    siteUrl: "https://example.com",
    guides: [
      {
        slug: "guide-a",
        eyebrow: "Guide",
        title: "Guide A",
        description: "Description",
        intro: "Introduction",
        color: "sage",
        icon: "A",
        keyPoints: [],
        criteria: [],
        faq: [],
        sources: [
          { label: "Source A", url: duplicateUrl },
          { label: "Même source", url: duplicateUrl },
        ],
      },
    ],
    products: [
      {
        id: "produit-a",
        brand: "Marque",
        product: "Produit",
        source: duplicateUrl,
        secondarySource: "non publiée",
        editorialCaution: "élevé",
        notes: "Donnée à confirmer.",
        lastVerified: "2026-01-01",
      },
    ],
  });

  assert.equal(assets.sources.sources.length, 1);
  assert.deepEqual(assets.sources.sources[0].documentIds, ["guide:guide-a", "product:produit-a"]);
  assert.equal(assets.sources.sources[0].url, duplicateUrl);
});

test("publie les cinq ressources machine déterministes", async () => {
  const root = new URL("../public/ai/", import.meta.url);
  const [content, catalog, sources, mcpData, markdown] = await Promise.all([
    readFile(new URL("content.json", root), "utf8"),
    readFile(new URL("catalog.json", root), "utf8"),
    readFile(new URL("sources.json", root), "utf8"),
    readFile(new URL("mcp-data.json", root), "utf8"),
    readFile(new URL("index.md", root), "utf8"),
  ]);

  assert.equal(JSON.parse(content).documents.length, 11);
  assert.equal(JSON.parse(catalog).products.length, 143);
  assert.ok(JSON.parse(sources).sources.length > 10);
  assert.equal(JSON.parse(mcpData).documents.length, 154);
  assert.match(markdown, /https:\/\/cafeadaptogene\.com\/mcp/);
});
