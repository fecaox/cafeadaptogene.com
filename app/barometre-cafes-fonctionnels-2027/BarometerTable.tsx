"use client";

import { useMemo, useState } from "react";

export type BarometerTableRow = {
  readonly id: string;
  readonly brand: string;
  readonly product: string;
  readonly category: string;
  readonly rawPricePerServing: string;
  readonly price: { readonly min: number; readonly max: number; readonly midpoint: number; readonly currency: string } | null;
  readonly rawCaffeine: string;
  readonly caffeine: { readonly min: number; readonly max: number; readonly midpoint: number; readonly unit: string } | null;
  readonly transparency: string;
  readonly ingredientFamilies: readonly string[];
  readonly laboratoryEvidence: string;
  readonly source: string;
  readonly lastVerified: string;
};

type SortKey = "brand" | "price" | "caffeine" | "transparency";

const transparencyRank: Record<string, number> = {
  "Élevée": 0,
  "Partielle": 1,
  "Faible": 2,
  "Non documentée": 3,
};

function compareOptionalNumber(left: number | undefined, right: number | undefined) {
  if (left === undefined && right === undefined) return 0;
  if (left === undefined) return 1;
  if (right === undefined) return -1;
  return left - right;
}

export default function BarometerTable({ rows }: { rows: readonly BarometerTableRow[] }) {
  const [sort, setSort] = useState<SortKey>("brand");
  const sortedRows = useMemo(() => [...rows].sort((left, right) => {
    if (sort === "price") return compareOptionalNumber(left.price?.midpoint, right.price?.midpoint) || left.brand.localeCompare(right.brand, "fr");
    if (sort === "caffeine") return compareOptionalNumber(left.caffeine?.midpoint, right.caffeine?.midpoint) || left.brand.localeCompare(right.brand, "fr");
    if (sort === "transparency") return (transparencyRank[left.transparency] ?? 4) - (transparencyRank[right.transparency] ?? 4) || left.brand.localeCompare(right.brand, "fr");
    return left.brand.localeCompare(right.brand, "fr") || left.product.localeCompare(right.product, "fr");
  }), [rows, sort]);

  return (
    <section className="barometer-table-section" id="tableau">
      <div className="barometer-section-heading">
        <div>
          <p className="eyebrow"><span /> Comparaison détaillée</p>
          <h2>Les {rows.length} produits du panel France.</h2>
        </div>
        <label>
          <span>Trier le tableau</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
            <option value="brand">Marque A–Z</option>
            <option value="price">Prix central croissant</option>
            <option value="caffeine">Caféine croissante</option>
            <option value="transparency">Transparence décroissante</option>
          </select>
        </label>
      </div>
      <p className="barometer-table-note" id="barometer-table-note">Les valeurs manquantes restent visibles et sont placées en fin de tri. Les prix conservent promotions, abonnements et fourchettes dans leur formulation d’origine.</p>
      <div className="barometer-table-scroll">
        <table aria-describedby="barometer-table-note">
          <thead>
            <tr>
              <th scope="col">Marque et produit</th>
              <th scope="col">Prix / portion</th>
              <th scope="col">Caféine</th>
              <th scope="col">Ingrédients</th>
              <th scope="col">Transparence</th>
              <th scope="col">Source</th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => (
              <tr key={row.id}>
                <th scope="row"><b>{row.brand}</b><span>{row.product}</span><small>{row.category}</small></th>
                <td>{row.price ? row.rawPricePerServing : <span className="barometer-missing">Non calculable</span>}</td>
                <td>{row.caffeine ? row.rawCaffeine : <span className="barometer-missing">Non chiffrée</span>}</td>
                <td>{row.ingredientFamilies.length ? row.ingredientFamilies.join(" · ") : <span className="barometer-missing">Aucune famille suivie</span>}</td>
                <td><b className={`barometer-transparency barometer-transparency-${row.transparency.toLocaleLowerCase("fr").replace(/\s+/g, "-")}`}>{row.transparency}</b><small>{row.laboratoryEvidence}</small></td>
                <td><a href={row.source} target="_blank" rel="nofollow noopener">Source officielle ↗</a><small>Vérifiée le {row.lastVerified}</small></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
