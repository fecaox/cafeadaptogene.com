"use client";

import { useMemo, useState } from "react";
import { directoryProducts, type DirectoryProduct } from "../brand-directory-data";

const ALL = "Tous";

function unique(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "fr"));
}

function useful(value: string) {
  return value && !/^(non publié|non publiée|non applicable|non documenté)$/i.test(value);
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value || "Non documenté"}</dd>
    </div>
  );
}

function DetailLine({ label, value }: { label: string; value: string }) {
  if (!useful(value)) return null;
  return <p><b>{label}</b><span>{value}</span></p>;
}

function ProductEntry({ item }: { item: DirectoryProduct }) {
  const sourceAvailable = /^https?:\/\//.test(item.source);
  const caution = item.publicStatus !== "Actif" || item.verificationLevel !== "A";

  return (
    <article className="directory-entry" id={item.id}>
      <div className="directory-entry-head">
        <div>
          <p>{item.macroCategory} · {item.category}</p>
          <h2>{item.brand}</h2>
          <h3>{item.product}</h3>
        </div>
        <div className="directory-badges">
          {item.newEntry && <span className="directory-new">Nouvelle référence</span>}
          <span className={`level level-${item.verificationLevel.toLowerCase()}`}>Niveau {item.verificationLevel}</span>
          <span>{item.publicStatus}</span>
        </div>
      </div>

      <dl className="directory-facts">
        <Fact label="Expérience" value={item.experience} />
        <Fact label="Caféine / portion" value={item.caffeine} />
        <Fact label="Dose" value={item.dose} />
        <Fact label="Prix / portion" value={item.pricePerServing} />
      </dl>

      <div className="directory-summary">
        <p><b>Base réelle</b>{item.base}</p>
        <p><b>Actifs principaux</b>{item.actives}</p>
      </div>

      {caution && (
        <p className="directory-caution"><b>Vigilance éditoriale</b> {item.sourceState}. {item.editorialCaution ? `Risque : ${item.editorialCaution}.` : ""}</p>
      )}

      <details>
        <summary>Voir la fiche détaillée <span>＋</span></summary>
        <div className="directory-details">
          <DetailLine label="Marché" value={item.market} />
          <DetailLine label="Disponibilité France" value={item.franceAvailability} />
          <DetailLine label="Format" value={item.format} />
          <DetailLine label="Prix observé" value={item.price} />
          <DetailLine label="Conditionnement" value={[item.packWeight, item.portions].filter(useful).join(" · ")} />
          <DetailLine label="Préparation" value={item.preparation} />
          <DetailLine label="Champignons" value={item.mushrooms} />
          <DetailLine label="Partie utilisée" value={item.mushroomPart} />
          <DetailLine label="Extraction" value={item.extraction} />
          <DetailLine label="Protéines" value={item.protein} />
          <DetailLine label="Collagène" value={item.collagen} />
          <DetailLine label="Créatine" value={item.creatine} />
          <DetailLine label="MCT" value={item.mct} />
          <DetailLine label="Sucres / édulcorants" value={item.sweeteners} />
          <DetailLine label="Allergènes / régime" value={item.diet} />
          <DetailLine label="Transparence des dosages" value={item.transparency} />
          <DetailLine label="Document ou analyse de laboratoire" value={item.laboratoryProof} />
          <DetailLine label="Promesse de la marque" value={item.promise} />
          <DetailLine label="Notes de vérification" value={item.notes} />
          <DetailLine label="Statut commercial observé" value={item.commercialStatus} />
          <DetailLine label="Dernière vérification" value={item.lastVerified} />
        </div>
      </details>

      <div className="directory-source">
        <span>Source officielle</span>
        {sourceAvailable ? (
          <a href={item.source} target="_blank" rel="nofollow noopener">Consulter la page ↗</a>
        ) : (
          <b>Source primaire non retrouvée</b>
        )}
      </div>
    </article>
  );
}

export default function DirectoryExplorer() {
  const [search, setSearch] = useState("");
  const [macro, setMacro] = useState(ALL);
  const [category, setCategory] = useState(ALL);
  const [caffeine, setCaffeine] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [availability, setAvailability] = useState(ALL);
  const [sort, setSort] = useState("brand");

  const categories = useMemo(() => unique(directoryProducts.map((item) => item.category)), []);
  const caffeineLevels = useMemo(() => unique(directoryProducts.map((item) => item.caffeineLevel)), []);
  const statuses = useMemo(() => unique(directoryProducts.map((item) => item.publicStatus)), []);

  const results = useMemo(() => {
    const needle = search.trim().toLocaleLowerCase("fr");
    const filtered = directoryProducts.filter((item) => {
      const haystack = [item.brand, item.product, item.category, item.base, item.actives, item.market].join(" ").toLocaleLowerCase("fr");
      const availableInFrance = /oui|france|europe/i.test(item.franceAvailability);
      return (!needle || haystack.includes(needle))
        && (macro === ALL || item.macroCategory === macro)
        && (category === ALL || item.category === category)
        && (caffeine === ALL || item.caffeineLevel === caffeine)
        && (status === ALL || item.publicStatus === status)
        && (availability === ALL || (availability === "France" ? availableInFrance : !availableInFrance));
    });

    return filtered.sort((a, b) => {
      if (sort === "verification") return a.verificationLevel.localeCompare(b.verificationLevel) || a.brand.localeCompare(b.brand, "fr");
      if (sort === "new") return Number(b.newEntry) - Number(a.newEntry) || a.brand.localeCompare(b.brand, "fr");
      return a.brand.localeCompare(b.brand, "fr") || a.product.localeCompare(b.product, "fr");
    });
  }, [availability, caffeine, category, macro, search, sort, status]);

  function reset() {
    setSearch("");
    setMacro(ALL);
    setCategory(ALL);
    setCaffeine(ALL);
    setStatus(ALL);
    setAvailability(ALL);
    setSort("brand");
  }

  return (
    <section className="directory-explorer" id="repertoire">
      <div className="directory-toolbar">
        <label className="directory-search">
          <span>Rechercher une marque, un actif ou une catégorie</span>
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Ex. Lion’s Mane, collagène, Four Sigmatic…" />
        </label>
        <div className="directory-filter-grid">
          <label><span>Grand univers</span><select value={macro} onChange={(event) => { setMacro(event.target.value); setCategory(ALL); }}><option>{ALL}</option>{unique(directoryProducts.map((item) => item.macroCategory)).map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Catégorie</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>{ALL}</option>{categories.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Niveau de caféine</span><select value={caffeine} onChange={(event) => setCaffeine(event.target.value)}><option>{ALL}</option>{caffeineLevels.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Statut observé</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option>{ALL}</option>{statuses.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label><span>Disponibilité</span><select value={availability} onChange={(event) => setAvailability(event.target.value)}><option>{ALL}</option><option>France</option><option>Hors France / à confirmer</option></select></label>
          <label><span>Trier par</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="brand">Marque A–Z</option><option value="verification">Meilleur niveau de vérification</option><option value="new">Nouvelles références</option></select></label>
        </div>
        <div className="directory-results-count" aria-live="polite">
          <p><b>{results.length}</b> référence{results.length > 1 ? "s" : ""} affichée{results.length > 1 ? "s" : ""}</p>
          <button type="button" onClick={reset}>Réinitialiser les filtres</button>
        </div>
      </div>

      <div className="directory-list">
        {results.map((item) => <ProductEntry item={item} key={item.id} />)}
        {results.length === 0 && <div className="directory-empty"><h2>Aucun résultat exact.</h2><p>Essayez un univers plus large ou effacez une partie de la recherche.</p><button type="button" onClick={reset}>Voir toutes les références</button></div>}
      </div>
    </section>
  );
}
