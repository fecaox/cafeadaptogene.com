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

  assert.equal(stats.latestChangeDate, "2026-09-08");
  assert.equal(stats.newReferences, 9);
  assert.ok(stats.availableInFrance >= 8);
  assert.ok(stats.underWatch >= 1);
});
