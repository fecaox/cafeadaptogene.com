import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../app/site-data.ts", import.meta.url), "utf8");

test("le comparatif utilise un titre SEO court et centré sur la recherche", () => {
  assert.match(source, /title: "Meilleur café adaptogène 2026 : comparatif France"/);
});

test("la description du comparatif expose les critères utiles avant la promesse", () => {
  assert.match(
    source,
    /description: "Comparez les cafés adaptogènes vendus en France : composition, caféine, dosage, goût et prix par tasse\. Classement selon votre profil\."/,
  );
});
