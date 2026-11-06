import type { Metadata } from "next";
import Link from "next/link";
import { barometer } from "../barometer-data";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { siteUrl } from "../site-data";
import BarometerTable from "./BarometerTable";

const dataBase = "/data/barometre-cafes-fonctionnels-2027";
const formatNumber = (value: number, digits = 2) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: digits }).format(value);
const pageDescription = `Prix par tasse, caféine, ingrédients et transparence : le baromètre 2027 analyse ${barometer.stats.panelProducts} produits disponibles en France et publie ses données CSV/JSON.`;

export const metadata: Metadata = {
  title: "Baromètre français des cafés fonctionnels 2027",
  description: pageDescription,
  alternates: { canonical: "/barometre-cafes-fonctionnels-2027/" },
  openGraph: {
    title: "Baromètre français des cafés fonctionnels 2027",
    description: "Un panel France qualifié, une méthode publique et des données téléchargeables pour comprendre le marché.",
    url: `${siteUrl}/barometre-cafes-fonctionnels-2027/`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Baromètre français des cafés fonctionnels 2027" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baromètre français des cafés fonctionnels 2027",
    description: "Prix, caféine, ingrédients et transparence sur un panel France sourcé.",
    images: ["/og.png"],
  },
};

function BarSeries({ items, sampleSize, overlap = false }: {
  items: readonly { readonly label: string; readonly count: number; readonly percentage: number }[];
  sampleSize: number;
  overlap?: boolean;
}) {
  const max = Math.max(...items.map((item) => item.count), 1);
  return (
    <ul className="barometer-bars" aria-label={`Répartition sur un échantillon de ${sampleSize} références${overlap ? ", avec catégories chevauchantes" : ""}`}>
      {items.map((item) => (
        <li key={item.label}>
          <span>{item.label}</span>
          <i aria-hidden="true"><b style={{ width: `${(item.count / max) * 100}%` }} /></i>
          <strong>{item.count} <small>{formatNumber(item.percentage, 1)} %</small></strong>
        </li>
      ))}
    </ul>
  );
}

function DownloadCard({ href, format, title, detail }: { href: string; format: string; title: string; detail: string }) {
  return (
    <a className="barometer-download" href={href} download>
      <span>{format}</span>
      <h3>{title}</h3>
      <p>{detail}</p>
      <b>Télécharger ↓</b>
    </a>
  );
}

export default function BarometerPage() {
  const { metadata: dataset, methodology, stats, findings, series, panel } = barometer;
  const maximumPrice = Math.max(...series.prices.items.map((item) => item.max), 1);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dataset",
        "@id": `${dataset.canonicalUrl}#dataset`,
        name: dataset.title,
        description: pageDescription,
        url: dataset.canonicalUrl,
        version: dataset.datasetVersion,
        datePublished: dataset.publicationDate,
        dateModified: dataset.cutoffDate,
        inLanguage: "fr-FR",
        isAccessibleForFree: true,
        creator: { "@type": "Organization", "@id": `${siteUrl}/#organization`, name: "Café Adaptogène", url: siteUrl },
        spatialCoverage: { "@type": "Place", name: "France" },
        license: dataset.license,
        measurementTechnique: "Relevé de pages officielles, normalisation par portion et panel France qualifié",
        variableMeasured: [
          { "@type": "PropertyValue", name: "Prix par portion", unitText: "EUR" },
          { "@type": "PropertyValue", name: "Caféine par portion", unitText: "mg" },
          { "@type": "PropertyValue", name: "Familles d’ingrédients" },
          { "@type": "PropertyValue", name: "Transparence des dosages" },
        ],
        distribution: [
          { "@type": "DataDownload", name: "Jeu de données CSV", encodingFormat: "text/csv", contentUrl: `${siteUrl}${dataBase}.csv` },
          { "@type": "DataDownload", name: "Jeu de données JSON", encodingFormat: "application/json", contentUrl: `${siteUrl}${dataBase}.json` },
        ],
      },
      {
        "@type": "Article",
        headline: dataset.title,
        description: pageDescription,
        mainEntityOfPage: dataset.canonicalUrl,
        datePublished: dataset.publicationDate,
        dateModified: dataset.cutoffDate,
        author: { "@id": `${siteUrl}/#organization` },
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "fr-FR",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader compact />
      <main className="barometer-page">
        <div className="article-breadcrumb"><Link href="/">Accueil</Link><span>→</span><b>Baromètre 2027</b></div>

        <header className="barometer-hero">
          <div>
            <p className="eyebrow light"><span /> Étude de marché · édition 2027</p>
            <h1>Baromètre français des cafés fonctionnels 2027.</h1>
            <p>Prix par tasse, caféine, ingrédients et transparence : une photographie sourcée du marché accessible en France, avec méthode et données ouvertes.</p>
            <div className="barometer-actions">
              <a className="button button-light" href="#resultats">Voir les résultats <span>↓</span></a>
              <a className="text-link light-link" href={`${dataBase}.csv`} download>Télécharger le CSV ↗</a>
            </div>
          </div>
          <div className="barometer-edition">
            <span>ÉDITION</span><b>2027</b><small>Données arrêtées au 6 novembre 2026</small>
          </div>
        </header>

        <section className="barometer-scoreboard" aria-label="Périmètre du baromètre">
          <div><strong>{stats.universeProducts}</strong><span>références recensées</span><small>univers téléchargeable complet</small></div>
          <div><strong>{stats.panelProducts}</strong><span>produits dans le panel France</span><small>actifs, disponibles et sourcés</small></div>
          <div><strong>{stats.panelBrands}</strong><span>marques dans le panel</span><small>aucun bonus commercial</small></div>
          <div><strong>{stats.priceSample} / {stats.caffeineSample}</strong><span>prix / caféines chiffrés</span><small>sous-échantillons distincts</small></div>
        </section>

        <section className="barometer-cite" id="resultats">
          <div>
            <p className="eyebrow"><span /> À citer</p>
            <h2>Quatre constats, avec leur dénominateur.</h2>
            <p>Ces chiffres décrivent les informations publiées, pas l’efficacité des produits finis.</p>
          </div>
          <ol>{findings.map((finding, index) => <li key={finding}><span>{String(index + 1).padStart(2, "0")}</span><p>{finding}</p></li>)}</ol>
        </section>

        <section className="barometer-analysis barometer-price-section">
          <div className="barometer-section-heading">
            <div><p className="eyebrow"><span /> Prix par tasse</p><h2>Une médiane de {formatNumber(stats.priceMedianEur)} €.</h2></div>
            <p>Calculée sur les prix en euros directement comparables (n={stats.priceSample}). Les points centraux servent à la médiane ; promotions et fourchettes restent visibles.</p>
          </div>
          <div className="barometer-price-layout">
            <ul className="barometer-price-chart" aria-label={`Comparaison des prix par portion pour ${series.prices.sampleSize} références`}>
              {series.prices.items.map((item) => (
                <li key={item.id}>
                  <span>{item.brand}<small>{item.product}</small></span>
                  <i aria-hidden="true"><b style={{ width: `${(item.midpoint / maximumPrice) * 100}%` }} /></i>
                  <strong>{item.raw}</strong>
                </li>
              ))}
            </ul>
            <aside>
              <span>Plage observée</span>
              <b>{formatNumber(stats.priceMinEur)} à {formatNumber(stats.priceMaxEur)} €</b>
              <p>Un prix non calculable ou exprimé dans une autre devise reste dans le fichier complet, mais pas dans cet agrégat.</p>
              <a href={`${dataBase}-prix.svg`} download>Graphique SVG ↗</a>
            </aside>
          </div>
        </section>

        <section className="barometer-analysis barometer-two-columns">
          <div>
            <p className="eyebrow"><span /> Caféine par portion</p>
            <h2>{formatNumber(stats.caffeineMedianMg, 1)} mg de médiane publiée.</h2>
            <p>Répartition des produits qui publient une valeur numérique (n={series.caffeine.sampleSize}). Zéro milligramme compte comme une donnée ; « moins qu’un café » ne suffit pas.</p>
            <BarSeries items={series.caffeine.items} sampleSize={series.caffeine.sampleSize} />
            <a className="text-link" href={`${dataBase}-cafeine.svg`} download>Télécharger le graphique ↗</a>
          </div>
          <div>
            <p className="eyebrow"><span /> Transparence</p>
            <h2>Publier un dosage n’est pas prouver un effet.</h2>
            <p>Le niveau indique si portion, actifs et caféine sont assez documentés pour comparer (n={series.transparency.sampleSize}). La preuve de laboratoire est traitée séparément.</p>
            <BarSeries items={series.transparency.items} sampleSize={series.transparency.sampleSize} />
            <a className="text-link" href={`${dataBase}-transparence.svg`} download>Télécharger le graphique ↗</a>
          </div>
        </section>

        <section className="barometer-analysis barometer-ingredients">
          <div className="barometer-section-heading">
            <div><p className="eyebrow"><span /> Composition du marché</p><h2>Les ingrédients s’additionnent, les catégories se chevauchent.</h2></div>
            <p>Un café peut associer champignons, plantes, protéines ou MCT. Ces familles peuvent se chevaucher : leurs pourcentages ne totalisent donc pas nécessairement 100 % (n={series.ingredients.sampleSize}).</p>
          </div>
          <BarSeries items={series.ingredients.items} sampleSize={series.ingredients.sampleSize} overlap />
          <a className="text-link" href={`${dataBase}-ingredients.svg`} download>Télécharger le graphique ↗</a>
        </section>

        <BarometerTable rows={panel} />

        <section className="barometer-method" id="methodologie">
          <header><p className="eyebrow light"><span /> Méthodologie</p><h2>Exhaustif dans l’univers, strict dans les calculs.</h2><p>Le fichier complet conserve les {stats.universeProducts} références. Le panel de synthèse applique quatre règles publiques et reproductibles.</p></header>
          <div>
            <ol>{methodology.panelCriteria.map((criterion, index) => <li key={criterion}><span>{index + 1}</span><p>{criterion}</p></li>)}</ol>
            <details open><summary>Prix par portion</summary><p>{methodology.priceRule}</p></details>
            <details><summary>Caféine</summary><p>{methodology.caffeineRule}</p></details>
            <details><summary>Ingrédients</summary><p>{methodology.ingredientsRule}</p></details>
            <details><summary>Transparence et sources</summary><p>{methodology.transparencyRule} {methodology.sourceRule}</p></details>
          </div>
        </section>

        <section className="barometer-data" id="donnees">
          <header>
            <p className="eyebrow"><span /> Presse, blogs et agents IA</p>
            <h2>Les données derrière chaque phrase.</h2>
            <p>Réutilisez les fichiers avec l’attribution ci-dessous et conservez le lien vers la page canonique.</p>
          </header>
          <div className="barometer-download-grid">
            <DownloadCard href={`${dataBase}.csv`} format="CSV" title="Base complète" detail={`${stats.universeProducts} lignes, valeurs brutes et champs calculés.`} />
            <DownloadCard href={`${dataBase}.json`} format="JSON" title="Données structurées" detail="Métadonnées, méthode, séries et enregistrements." />
            <DownloadCard href={`${dataBase}-methodologie.md`} format="MD" title="Méthodologie" detail="Critères, règles de calcul, limites et citation." />
            <DownloadCard href={`${dataBase}-prix.svg`} format="SVG" title="Graphiques" detail="Prix, caféine, ingrédients et transparence en SVG." />
          </div>
          <blockquote><span>Citation conseillée</span>{dataset.attribution}</blockquote>
          <p className="barometer-correction">Une donnée à corriger ? Écrivez à <a href="mailto:bonjour@cafeadaptogene.com">bonjour@cafeadaptogene.com</a> avec une source officielle et sa date. Les corrections factuelles sont versionnées.</p>
          <div className="barometer-chart-links">
            <a href={`${dataBase}-prix.svg`} download>Prix SVG</a>
            <a href={`${dataBase}-cafeine.svg`} download>Caféine SVG</a>
            <a href={`${dataBase}-ingredients.svg`} download>Ingrédients SVG</a>
            <a href={`${dataBase}-transparence.svg`} download>Transparence SVG</a>
          </div>
        </section>

        <section className="barometer-limit">
          <h2>Ce que ce baromètre ne dit pas.</h2>
          <p>Il ne classe ni l’efficacité clinique, ni la qualité gustative, ni la pertinence individuelle d’un produit. Les prix, compositions et stocks peuvent changer après le relevé. L’étiquette du lot et l’avis d’un professionnel restent prioritaires lorsqu’une situation de santé le justifie.</p>
          <Link className="button button-light" href="/annuaire-cafes-fonctionnels/">Explorer l’annuaire <span>→</span></Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
