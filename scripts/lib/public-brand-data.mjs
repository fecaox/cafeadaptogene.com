import { productId } from "./functional-coffee-data.mjs";

export function macroLabel(value = "") {
  if (value.startsWith("1")) return "Univers du café";
  if (value.startsWith("2")) return "Cafés enrichis";
  return "Alternatives et dérivés";
}

export function publicStatus(value = "") {
  if (value.includes("actif —")) return "Actif";
  if (value.includes("pré-lancement")) return "Pré-lancement";
  if (value.includes("épuisé") || value.includes("rupture")) return "Indisponible ou en rupture";
  if (value.includes("non confirmé") || value.includes("SKU actuel") || value.includes("reconfirmer")) return "À confirmer";
  return "À vérifier";
}

export function buildDirectoryProducts(rows, imageManifest = {}) {
  return rows.map((row) => {
    const id = productId(row);
    const image = imageManifest[id] ?? {};
    const firstObservedAt = row.date_premiere_observation || "";

    return {
      id,
      brand: row.marque.replace(/\\+/g, "\\"),
      product: row.produit,
      market: row.pays_marche,
      format: row.format,
      category: row.classement,
      macroCategory: macroLabel(row.macro_categorie),
      base: row.base_reelle,
      actives: row.actifs_principaux,
      dose: row.dose_portion,
      caffeine: row.cafeine_portion,
      caffeineLevel: row.niveau_cafeine,
      price: row.prix_observe_2026_08_01,
      pricePerServing: row.prix_par_portion_observe,
      franceAvailability: row.disponibilite_france,
      source: row.source_officielle,
      secondarySource: row.source_secondaire,
      verificationLevel: row.statut_verification,
      commercialStatus: row.statut_commercial_actuel,
      publicStatus: publicStatus(row.statut_commercial_actuel),
      sourceState: row.etat_source_officielle,
      experience: row.experience_boisson,
      portions: row.nombre_portions,
      packWeight: row.poids_conditionnement,
      mushrooms: row.champignons_standardises,
      mushroomPart: row.partie_champignon,
      extraction: row.methode_extraction_infusion,
      protein: row.proteines_g,
      collagen: row.collagene_g,
      creatine: row.creatine_g,
      mct: row.mct_g,
      sweeteners: row.sucres_edulcorants,
      diet: row.allergenes_regime,
      preparation: row.preparation,
      transparency: row.transparence_dosage,
      laboratoryProof: row.preuve_laboratoire,
      promise: row.promesse_principale,
      editorialCaution: row.risque_editorial,
      notes: row.notes,
      lastVerified: row.date_derniere_verification,
      firstObservedAt,
      changeType: row.type_changement || "",
      changeDate: row.date_changement || "",
      changeSummary: row.resume_changement || "",
      featuredNovelty: row.selection_nouveaute === "oui",
      newEntry: Boolean(firstObservedAt),
      imagePath: image.imagePath ?? null,
      imageSource: image.imageSource ?? null,
      imagePageSource: image.pageSource ?? null,
      imageStatus: image.status ?? "missing",
    };
  });
}

export function buildMarketUpdateStats(products) {
  const latestChangeDate = products.reduce((latest, product) => product.changeDate > latest ? product.changeDate : latest, "");
  const latest = products.filter((product) => product.changeDate === latestChangeDate);
  const newReferences = latest.filter((product) => product.changeType.includes("nouvelle référence")).length;

  return {
    latestChangeDate,
    newReferences,
    verifiedChanges: latest.length - newReferences,
    availableInFrance: latest.filter((product) => /oui|france|europe/i.test(product.franceAvailability)).length,
    underWatch: latest.filter((product) => product.publicStatus !== "Actif" || product.verificationLevel === "C" || !product.featuredNovelty).length,
  };
}
