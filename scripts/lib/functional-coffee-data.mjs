export function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];
    if (quoted) {
      if (character === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        cell += character;
      }
    } else if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(cell);
      cell = "";
    } else if (character === "\n") {
      row.push(cell.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += character;
    }
  }

  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const [headers, ...data] = rows.filter((item) => item.length > 1);
  if (!headers) return [];
  return data.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

export function productId(row) {
  return `${row.marque}-${row.produit}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function validateFunctionalCoffeeRows(rows) {
  const errors = [];
  const seen = new Set();

  rows.forEach((row, index) => {
    const label = `Ligne ${index + 2} (${row.marque || "marque absente"} / ${row.produit || "produit absent"})`;
    const id = productId(row);
    if (seen.has(id)) errors.push(`${label}: identifiant dupliqué « ${id} »`);
    seen.add(id);

    if (!/^https?:\/\//.test(row.source_officielle || "")) errors.push(`${label}: source officielle absente ou invalide`);
    if (!row.marque || !row.produit) errors.push(`${label}: marque ou produit absent`);
    if (row.selection_nouveaute && !["oui", "non"].includes(row.selection_nouveaute)) errors.push(`${label}: selection_nouveaute doit valoir oui ou non`);

    const hasNoveltySignal = Boolean(row.date_premiere_observation || row.type_changement || row.date_changement || row.resume_changement || row.selection_nouveaute === "oui");
    if (hasNoveltySignal) {
      if (!row.type_changement) errors.push(`${label}: type de changement manquant`);
      if (!row.date_changement) errors.push(`${label}: date de changement manquante`);
      if (!row.resume_changement) errors.push(`${label}: résumé de changement manquant`);
      if (!/^https?:\/\//.test(row.source_officielle || "")) errors.push(`${label}: une nouveauté exige une source officielle`);
    }
  });

  return errors;
}

