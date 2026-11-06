const CATALOG_URL = "/annuaire-cafes-fonctionnels/";

export function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function absoluteUrl(siteUrl, pathname) {
  return new URL(pathname, `${siteUrl.replace(/\/+$/, "")}/`).href;
}

function clean(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function pushLabel(lines, label, value) {
  const text = clean(value);
  if (text) lines.push(`${label} : ${text}`);
}

function guideText(guide) {
  const lines = [guide.title, guide.description, guide.intro];

  if (guide.keyPoints?.length) {
    lines.push("Points clés :", ...guide.keyPoints.map((point) => `- ${point}`));
  }

  for (const criterion of guide.criteria ?? []) {
    lines.push(`${criterion.title} : ${criterion.text}`);
  }

  for (const section of guide.sections ?? []) {
    lines.push(section.title, ...(section.paragraphs ?? []));
    if (section.bullets?.length) lines.push(...section.bullets.map((bullet) => `- ${bullet}`));
  }

  if (guide.faq?.length) {
    lines.push("Questions fréquentes :");
    for (const item of guide.faq) lines.push(`Question : ${item.question}`, `Réponse : ${item.answer}`);
  }

  return lines.filter(Boolean).join("\n\n");
}

function productText(product) {
  const lines = [`${clean(product.brand)} — ${clean(product.product)}`];
  const fields = [
    ["Marché", product.market],
    ["Format", product.format],
    ["Catégorie", product.category],
    ["Univers", product.macroCategory],
    ["Base", product.base],
    ["Actifs", product.actives],
    ["Dose", product.dose],
    ["Caféine", product.caffeine],
    ["Niveau de caféine", product.caffeineLevel],
    ["Prix", product.price],
    ["Prix par portion", product.pricePerServing],
    ["Disponibilité en France", product.franceAvailability],
    ["Statut commercial", product.commercialStatus],
    ["Statut public", product.publicStatus],
    ["État de la source", product.sourceState],
    ["Expérience", product.experience],
    ["Portions", product.portions],
    ["Poids", product.packWeight],
    ["Champignons", product.mushrooms],
    ["Partie du champignon", product.mushroomPart],
    ["Extraction", product.extraction],
    ["Protéines", product.protein],
    ["Collagène", product.collagen],
    ["Créatine", product.creatine],
    ["MCT", product.mct],
    ["Édulcorants", product.sweeteners],
    ["Régime et allergènes", product.diet],
    ["Préparation", product.preparation],
    ["Transparence", product.transparency],
    ["Preuve de laboratoire", product.laboratoryProof],
    ["Promesse de la marque", product.promise],
    ["Prudence éditoriale", product.editorialCaution],
    ["Notes", product.notes],
    ["Dernière vérification", product.lastVerified],
    ["Changement observé", product.changeSummary],
  ];

  for (const [label, value] of fields) pushLabel(lines, label, value);
  return lines.filter(Boolean).join("\n\n");
}

function datasetText(dataset) {
  const lines = [dataset.title, dataset.description];
  const stats = dataset.stats ?? {};
  if (stats.universeProducts !== undefined) lines.push(`Univers recensé : ${stats.universeProducts} produits.`);
  if (stats.panelProducts !== undefined) lines.push(`Panel France qualifié : ${stats.panelProducts} produits et ${stats.panelBrands} marques.`);
  if (stats.priceSample !== undefined) lines.push(`Sous-échantillon prix : n=${stats.priceSample}.`);
  if (stats.caffeineSample !== undefined) lines.push(`Sous-échantillon caféine : n=${stats.caffeineSample}.`);

  if (dataset.findings?.length) lines.push("Constats à citer :", ...dataset.findings.map((finding) => `- ${finding}`));

  const methodology = dataset.methodology ?? {};
  if (methodology.panelCriteria?.length) lines.push("Critères du panel :", ...methodology.panelCriteria.map((criterion) => `- ${criterion}`));
  pushLabel(lines, "Règle prix", methodology.priceRule);
  pushLabel(lines, "Règle caféine", methodology.caffeineRule);
  pushLabel(lines, "Règle ingrédients", methodology.ingredientsRule);
  pushLabel(lines, "Limite de la transparence", methodology.transparencyRule);
  pushLabel(lines, "Sources et limites", methodology.sourceRule);

  if (dataset.downloads?.length) {
    lines.push("Téléchargements :", ...dataset.downloads.map((download) => `- ${download.format} : ${download.url}`));
  }
  pushLabel(lines, "Attribution", dataset.metadata?.attribution);
  return lines.filter(Boolean).join("\n\n");
}

function isPublicSource(value) {
  const text = clean(value);
  return /^https?:\/\//i.test(text);
}

function addSource(sourceMap, source, documentId) {
  if (!isPublicSource(source.url)) return;
  const current = sourceMap.get(source.url) ?? {
    url: source.url,
    labels: new Set(),
    documentIds: new Set(),
  };
  if (clean(source.label)) current.labels.add(clean(source.label));
  current.documentIds.add(documentId);
  sourceMap.set(source.url, current);
}

function productMetadata(product) {
  return Object.fromEntries(
    Object.entries(product).filter(([key, value]) =>
      !["imagePath", "imageSource", "imagePageSource", "imageStatus"].includes(key)
      && value !== ""
      && value !== null
      && value !== undefined),
  );
}

export function buildAiAssets({ guides, products, datasets = [], siteUrl, existingSources = [] }) {
  const normalizedSiteUrl = siteUrl.replace(/\/+$/, "");
  const sourceMap = new Map();

  const guideDocuments = guides.map((guide) => {
    const id = `guide:${guide.slug}`;
    for (const source of guide.sources ?? []) addSource(sourceMap, source, id);
    const text = guideText(guide);
    const title = guide.seoTitle || guide.title;
    return {
      id,
      type: "guide",
      title,
      url: absoluteUrl(normalizedSiteUrl, `/${guide.slug}/`),
      text,
      searchText: normalizeSearchText(`${title} ${guide.description} ${text}`),
      metadata: {
        slug: guide.slug,
        description: guide.description,
        eyebrow: guide.eyebrow,
        productIds: guide.productIds ?? [],
      },
      sourceIds: [],
    };
  });

  const productDocuments = products.map((product) => {
    const id = `product:${product.id}`;
    addSource(sourceMap, { label: "Source officielle ou page observée", url: product.source }, id);
    if (isPublicSource(product.secondarySource)) {
      addSource(sourceMap, { label: "Source secondaire", url: product.secondarySource }, id);
    }
    const title = `${clean(product.brand)} — ${clean(product.product)}`;
    const text = productText(product);
    return {
      id,
      type: "product",
      title,
      url: absoluteUrl(normalizedSiteUrl, CATALOG_URL),
      text,
      searchText: normalizeSearchText(`${title} ${text}`),
      metadata: productMetadata(product),
      sourceIds: [],
    };
  });

  const datasetDocuments = datasets.map((dataset) => {
    const id = `dataset:${dataset.slug}`;
    const url = /^https?:\/\//i.test(dataset.url)
      ? dataset.url
      : absoluteUrl(normalizedSiteUrl, dataset.url);
    addSource(sourceMap, { label: "Page canonique du jeu de données", url }, id);
    const text = datasetText(dataset);
    return {
      id,
      type: "dataset",
      title: dataset.title,
      url,
      text,
      searchText: normalizeSearchText(`${dataset.title} ${dataset.description} ${text}`),
      metadata: {
        ...dataset.metadata,
        description: dataset.description,
        downloads: dataset.downloads ?? [],
        stats: dataset.stats ?? {},
      },
      sourceIds: [],
    };
  });

  const contentDocuments = [...guideDocuments, ...datasetDocuments];
  const allDocuments = [...contentDocuments, ...productDocuments];
  const existingIdsByUrl = new Map(existingSources
    .filter((source) => /^source:\d+$/.test(source.id) && isPublicSource(source.url))
    .map((source) => [source.url, source.id]));
  let nextSourceId = Math.max(0, ...[...existingIdsByUrl.values()].map((id) => Number(id.slice("source:".length)))) + 1;
  const sourceRecords = [...sourceMap.values()]
    .sort((a, b) => {
      if (!existingSources.length) {
        const aDatasetOnly = [...a.documentIds].every((id) => id.startsWith("dataset:"));
        const bDatasetOnly = [...b.documentIds].every((id) => id.startsWith("dataset:"));
        if (aDatasetOnly !== bDatasetOnly) return aDatasetOnly ? 1 : -1;
      }
      return a.url.localeCompare(b.url);
    })
    .map((source) => ({
      id: existingIdsByUrl.get(source.url) ?? `source:${String(nextSourceId++).padStart(3, "0")}`,
      label: [...source.labels].sort().join(" · ") || source.url,
      url: source.url,
      documentIds: [...source.documentIds].sort(),
    }))
    .sort((a, b) => Number(a.id.slice("source:".length)) - Number(b.id.slice("source:".length)));

  const sourceIdsByDocument = new Map();
  for (const source of sourceRecords) {
    for (const documentId of source.documentIds) {
      const ids = sourceIdsByDocument.get(documentId) ?? [];
      ids.push(source.id);
      sourceIdsByDocument.set(documentId, ids);
    }
  }
  for (const document of allDocuments) {
    document.sourceIds = sourceIdsByDocument.get(document.id) ?? [];
  }

  const header = {
    schemaVersion: "1.0",
    site: normalizedSiteUrl,
    license: "Consultation et citation avec attribution à l’URL publique correspondante.",
  };

  const content = { ...header, documents: contentDocuments };
  const catalog = { ...header, products: productDocuments };
  const sources = { ...header, sources: sourceRecords };
  const mcpData = { ...header, documents: allDocuments, sources: sourceRecords };
  const markdown = `# Café Adaptogène — accès machine

Corpus public, factuel et en lecture seule. Les pages HTML restent les sources canoniques à citer.

- MCP : ${normalizedSiteUrl}/mcp
- Guides : ${normalizedSiteUrl}/ai/content.json
- Annuaire : ${normalizedSiteUrl}/ai/catalog.json
- Sources : ${normalizedSiteUrl}/ai/sources.json
- Index MCP : ${normalizedSiteUrl}/ai/mcp-data.json
- Documentation : ${normalizedSiteUrl}/acces-agents-ia/
${datasetDocuments.length ? `- Baromètre 2027 : ${normalizedSiteUrl}/barometre-cafes-fonctionnels-2027/\n- Données du baromètre : ${normalizedSiteUrl}/data/barometre-cafes-fonctionnels-2027.json\n` : ""}

Une donnée absente reste indiquée comme non publiée. Les estimations ne sont pas des mesures du produit fini.
`;

  return { content, catalog, sources, mcpData, markdown };
}
