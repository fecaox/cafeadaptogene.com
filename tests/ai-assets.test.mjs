import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { barometer } from "../app/barometer-data.ts";
import { directoryProducts } from "../app/brand-directory-data.ts";
import { guides, siteUrl } from "../app/site-data.ts";
import { buildAiAssets, normalizeSearchText } from "../scripts/lib/ai-assets.mjs";

const barometerDataset = {
  slug: "barometre-cafes-fonctionnels-2027",
  title: barometer.metadata.title,
  url: barometer.metadata.canonicalUrl,
  description: "Données françaises comparables sur les prix par portion, la caféine, les ingrédients et la transparence.",
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
  ],
};

test("normalise les accents et la ponctuation pour une recherche française", () => {
  assert.equal(normalizeSearchText("  Café protéiné — Énergie !  "), "cafe proteine energie");
});

test("construit des identifiants stables et des URLs publiques absolues", () => {
  const assets = buildAiAssets({ guides, products: directoryProducts, datasets: [barometerDataset], siteUrl });

  assert.equal(assets.content.documents.length, 12);
  assert.equal(assets.catalog.products.length, 143);
  assert.equal(assets.content.documents[0].id, "guide:torregral");
  assert.equal(assets.content.documents[0].url, "https://cafeadaptogene.com/torregral/");
  assert.equal(assets.catalog.products[0].id, "product:torregral-torregral");
  assert.equal(assets.catalog.products[0].url, "https://cafeadaptogene.com/annuaire-cafes-fonctionnels/");
  assert.equal(assets.mcpData.documents.length, 155);
  const dataset = assets.content.documents.find((document) => document.id === "dataset:barometre-cafes-fonctionnels-2027");
  assert.ok(dataset);
  assert.equal(dataset.type, "dataset");
  assert.equal(dataset.url, "https://cafeadaptogene.com/barometre-cafes-fonctionnels-2027/");
  assert.match(dataset.text, /35 produits/i);
  assert.match(dataset.text, /n=18/);
  assert.match(dataset.text, /ne mesure ni l’efficacité/i);
  assert.match(dataset.text, /barometre-cafes-fonctionnels-2027\.csv/);
  assert.equal(dataset.metadata.datasetVersion, "2027.1");
  const legacySource = assets.sources.sources.find((source) => source.url === "https://cafedesguerriers.fr/");
  const datasetSource = assets.sources.sources.find((source) => source.url === "https://cafeadaptogene.com/barometre-cafes-fonctionnels-2027/");
  assert.equal(legacySource?.id, "source:010");
  assert.equal(datasetSource?.id, "source:148");
});

test("conserve les limites éditoriales utiles aux agents", () => {
  const assets = buildAiAssets({ guides, products: directoryProducts, datasets: [barometerDataset], siteUrl });
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

test("conserve les identifiants déjà publiés quand une nouvelle source apparaît", () => {
  const base = buildAiAssets({
    siteUrl: "https://example.com",
    guides: [{
      slug: "guide-a", eyebrow: "Guide", title: "Guide A", description: "Description", intro: "Introduction",
      color: "sage", icon: "A", keyPoints: [], criteria: [], faq: [],
      sources: [{ label: "Source B", url: "https://example.org/b" }],
    }],
    products: [{
      id: "produit-c", brand: "Marque", product: "Produit", source: "https://example.org/c",
      secondarySource: "non publiée", editorialCaution: "faible", notes: "", lastVerified: "2026-01-01",
    }],
    datasets: [{
      slug: "dataset-a", title: "Dataset", url: "https://example.org/a", description: "Données",
      findings: [], methodology: {}, stats: {}, metadata: {}, downloads: [],
    }],
  });
  assert.deepEqual(base.sources.sources.map(({ id, url }) => ({ id, url })), [
    { id: "source:001", url: "https://example.org/b" },
    { id: "source:002", url: "https://example.org/c" },
    { id: "source:003", url: "https://example.org/a" },
  ]);

  const rebuilt = buildAiAssets({
    siteUrl: "https://example.com",
    guides: [{
      slug: "guide-a", eyebrow: "Guide", title: "Guide A", description: "Description", intro: "Introduction",
      color: "sage", icon: "A", keyPoints: [], criteria: [], faq: [],
      sources: [
        { label: "Source AA", url: "https://example.org/aa" },
        { label: "Source B", url: "https://example.org/b" },
      ],
    }],
    products: [{
      id: "produit-c", brand: "Marque", product: "Produit", source: "https://example.org/c",
      secondarySource: "non publiée", editorialCaution: "faible", notes: "", lastVerified: "2026-01-01",
    }],
    datasets: [{
      slug: "dataset-a", title: "Dataset", url: "https://example.org/a", description: "Données",
      findings: [], methodology: {}, stats: {}, metadata: {}, downloads: [],
    }],
    existingSources: base.sources.sources,
  });

  assert.equal(rebuilt.sources.sources.find((source) => source.url === "https://example.org/b")?.id, "source:001");
  assert.equal(rebuilt.sources.sources.find((source) => source.url === "https://example.org/c")?.id, "source:002");
  assert.equal(rebuilt.sources.sources.find((source) => source.url === "https://example.org/a")?.id, "source:003");
  assert.equal(rebuilt.sources.sources.find((source) => source.url === "https://example.org/aa")?.id, "source:004");
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

  assert.equal(JSON.parse(content).documents.length, 12);
  assert.equal(JSON.parse(catalog).products.length, 143);
  assert.ok(JSON.parse(sources).sources.length > 10);
  assert.equal(JSON.parse(mcpData).documents.length, 155);
  assert.ok(JSON.parse(mcpData).documents.some((document) => document.id === "dataset:barometre-cafes-fonctionnels-2027"));
  assert.match(markdown, /https:\/\/cafeadaptogene\.com\/mcp/);
  assert.match(markdown, /https:\/\/cafeadaptogene\.com\/barometre-cafes-fonctionnels-2027\//);
  assert.match(markdown, /https:\/\/cafeadaptogene\.com\/data\/barometre-cafes-fonctionnels-2027\.json/);
});
