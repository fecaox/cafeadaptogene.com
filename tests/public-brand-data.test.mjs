import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { buildDirectoryProducts, buildMarketUpdateStats } from "../scripts/lib/public-brand-data.mjs";
import { parseCsv } from "../scripts/lib/functional-coffee-data.mjs";

test("maps dated market changes without relying on row position", async () => {
  const source = await readFile(new URL("../data/marques-cafe-fonctionnel.csv", import.meta.url), "utf8");
  const products = buildDirectoryProducts(parseCsv(source), {});
  const sunday = products.find((product) => product.id === "sunday-natural-cafe-proteine-cannelle");

  assert.ok(sunday);
  assert.equal(sunday.firstObservedAt, "2026-09-08");
  assert.equal(sunday.changeDate, "2026-09-08");
  assert.equal(sunday.changeType, "nouvelle référence documentée");
  assert.equal(sunday.featuredNovelty, true);
  assert.equal(sunday.newEntry, true);
});

test("summarises the latest dated market update", async () => {
  const source = await readFile(new URL("../data/marques-cafe-fonctionnel.csv", import.meta.url), "utf8");
  const products = buildDirectoryProducts(parseCsv(source), {});
  const stats = buildMarketUpdateStats(products);

  assert.equal(stats.latestChangeDate, "2026-09-29");
  assert.equal(stats.newReferences, 6);
  assert.ok(stats.availableInFrance >= 6);
  assert.ok(stats.underWatch >= 2);
});

test("includes the September protein and collagen coffee launches", async () => {
  const source = await readFile(new URL("../data/marques-cafe-fonctionnel.csv", import.meta.url), "utf8");
  const products = buildDirectoryProducts(parseCsv(source), {});
  const latest = products.filter((product) => product.changeDate === "2026-09-29");

  assert.equal(latest.length, 6);
  assert.deepEqual(
    new Set(latest.map((product) => product.id)),
    new Set([
      "myprotein-protein-iced-coffee",
      "try-kinoko-cafe-proteine",
      "sunday-natural-proteine-coffee-signature-roast",
      "corial-cafe-collagene-vitamine-c-cacao",
      "colco-cafe-au-collagene-250-g",
      "collacup-cafe-instantane-au-collagene",
    ]),
  );
});
