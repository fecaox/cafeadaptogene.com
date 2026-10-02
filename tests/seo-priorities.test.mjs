import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../app/site-data.ts", import.meta.url), "utf8");
const guidePage = await readFile(new URL("../app/[slug]/page.tsx", import.meta.url), "utf8");
const sitemap = await readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8");

test("le comparatif utilise un titre SEO court et centré sur la recherche", () => {
  assert.match(source, /title: "Meilleur café adaptogène 2026 : comparatif France"/);
});

test("la description du comparatif expose les critères utiles avant la promesse", () => {
  assert.match(
    source,
    /description: "Comparez les cafés adaptogènes vendus en France : composition, caféine, dosage, goût et prix par tasse\. Classement selon votre profil\."/,
  );
});

test("le guide café nouvelle génération promet une définition et un comparatif dans le résultat Google", () => {
  assert.match(source, /title: "Café nouvelle génération : définition et comparatif 2026"/);
  assert.match(
    source,
    /description: "Qu’est-ce qu’un café nouvelle génération \? Comparez cafés fonctionnels, adaptogènes, protéinés et alternatives : composition, caféine, goût et prix\."/,
  );
});

test("le guide café nouvelle génération transmet un lien éditorial vers l’annuaire", () => {
  assert.match(source, /label: "Comparer les références de l’annuaire", slug: "annuaire-cafes-fonctionnels"/);
});

test("le guide café nouvelle génération publie sa date de mise à jour du 24 septembre 2026", () => {
  assert.match(guidePage, /slug === "cafe-nouvelle-generation" \? "2026-09-24"/);
  assert.match(guidePage, /slug === "cafe-nouvelle-generation" \? "24 septembre 2026"/);
  assert.match(sitemap, /guide\.slug === "cafe-nouvelle-generation" \? "2026-09-24"/);
});
