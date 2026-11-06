import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { assertEditionSource } from "../scripts/lib/barometer-release.mjs";

test("fige l’édition 2027 sur l’empreinte de sa source", async () => {
  const [sourceText, manifestText] = await Promise.all([
    readFile(new URL("../data/marques-cafe-fonctionnel.csv", import.meta.url), "utf8"),
    readFile(new URL("../data/barometre-cafes-fonctionnels-2027.release.json", import.meta.url), "utf8"),
  ]);
  const manifest = JSON.parse(manifestText);

  const digest = assertEditionSource(sourceText, manifest);
  assert.equal(digest, manifest.sourceDataSha256);
  assert.throws(
    () => assertEditionSource(`${sourceText}\n`, manifest),
    /édition 2027.*source a changé/i,
  );
});
