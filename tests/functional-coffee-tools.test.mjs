import assert from "node:assert/strict";
import test from "node:test";

async function loadTools() {
  try {
    return await import("../scripts/lib/functional-coffee-data.mjs");
  } catch {
    return null;
  }
}

test("parses quoted functional coffee CSV rows", async () => {
  const tools = await loadTools();
  assert.equal(typeof tools?.parseCsv, "function");
  const rows = tools.parseCsv('"marque","produit","notes"\n"Café Test","Focus, Plus","Dose ""claire"""\n');
  assert.deepEqual(rows, [{ marque: "Café Test", produit: "Focus, Plus", notes: 'Dose "claire"' }]);
});

test("finds duplicate product identifiers and incomplete novelty records", async () => {
  const tools = await loadTools();
  assert.equal(typeof tools?.validateFunctionalCoffeeRows, "function");
  const rows = [
    { marque: "Alpha", produit: "Focus", source_officielle: "https://alpha.test", date_premiere_observation: "2026-09-08", type_changement: "nouvelle référence documentée", date_changement: "2026-09-08", resume_changement: "Ajoutée.", selection_nouveaute: "oui" },
    { marque: "Alpha", produit: "Focus", source_officielle: "", date_premiere_observation: "2026-09-08", type_changement: "", date_changement: "", resume_changement: "", selection_nouveaute: "peut-être" },
  ];
  const errors = tools.validateFunctionalCoffeeRows(rows);
  assert.ok(errors.some((error) => error.includes("identifiant dupliqué")));
  assert.ok(errors.some((error) => error.includes("source officielle")));
  assert.ok(errors.some((error) => error.includes("type de changement")));
  assert.ok(errors.some((error) => error.includes("selection_nouveaute")));
});
