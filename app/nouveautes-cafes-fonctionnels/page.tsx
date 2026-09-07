import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { directoryProducts, directoryStats, directoryUpdatedAt, marketUpdateStats } from "../brand-directory-data";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { siteUrl } from "../site-data";

export const metadata: Metadata = {
  title: "Nouveautés cafés fonctionnels : lancements et marché 2026",
  description: "Les nouveaux cafés fonctionnels repérés en France, les fiches qui ont changé et les produits à surveiller, avec sources officielles et limites visibles.",
  alternates: { canonical: "/nouveautes-cafes-fonctionnels/" },
  openGraph: {
    title: "Nouveautés cafés fonctionnels et observatoire du marché",
    description: `${marketUpdateStats.newReferences} nouvelles références et ${marketUpdateStats.verifiedChanges} mises à jour vérifiées au ${directoryUpdatedAt}.`,
    url: `${siteUrl}/nouveautes-cafes-fonctionnels/`,
    images: ["/og.png"],
  },
};

const latestChanges = directoryProducts.filter((item) => item.changeDate === marketUpdateStats.latestChangeDate);
const newReferences = latestChanges.filter((item) => item.changeType.includes("nouvelle référence"));
const updatedReferences = latestChanges.filter((item) => !item.changeType.includes("nouvelle référence"));
const watchlist = latestChanges.filter((item) => item.publicStatus !== "Actif" || item.verificationLevel === "C" || !item.featuredNovelty);

function ProductVisual({ item }: { item: (typeof directoryProducts)[number] }) {
  return item.imagePath ? (
    <Image src={item.imagePath} alt={`Packaging ${item.brand} ${item.product}`} width={720} height={720} />
  ) : (
    <div className="updates-visual-missing"><span>Visuel officiel non retrouvé</span><b>{item.brand}</b></div>
  );
}

export default function MarketUpdatesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Nouveautés cafés fonctionnels et observatoire du marché",
        description: metadata.description,
        url: `${siteUrl}/nouveautes-cafes-fonctionnels/`,
        dateModified: marketUpdateStats.latestChangeDate,
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "ItemList",
        numberOfItems: newReferences.length,
        itemListElement: newReferences.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${item.brand} — ${item.product}`,
          url: `${siteUrl}/annuaire-cafes-fonctionnels/#${item.id}`,
          ...(item.imagePath ? { image: `${siteUrl}${item.imagePath}` } : {}),
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader compact />
      <main className="updates-page">
        <div className="article-breadcrumb"><Link href="/">Accueil</Link><span>→</span><b>Nouveautés</b></div>

        <header className="updates-hero">
          <div className="updates-hero-copy">
            <p className="eyebrow light"><span /> Veille du marché · {directoryUpdatedAt}</p>
            <h1>Nouveautés cafés fonctionnels.</h1>
            <p>Neuf nouvelles références entrent dans l’annuaire : cafés protéinés, mélanges aux champignons et alternatives torréfiées. Nous signalons aussi les prix, formules et pages produit qui ont changé.</p>
            <div className="updates-actions">
              <a className="button button-light" href="#nouveaux-produits">Voir les lancements <span>↓</span></a>
              <Link className="text-link light-link" href="/annuaire-cafes-fonctionnels/">Explorer les {directoryStats.references} références ↗</Link>
            </div>
          </div>
          <dl className="updates-scoreboard">
            <div><dt>{marketUpdateStats.newReferences}</dt><dd>nouvelles références</dd></div>
            <div><dt>{marketUpdateStats.verifiedChanges}</dt><dd>fiches actualisées</dd></div>
            <div><dt>{directoryStats.references}</dt><dd>produits suivis au total</dd></div>
            <div><dt>{marketUpdateStats.underWatch}</dt><dd>signaux sous surveillance</dd></div>
          </dl>
        </header>

        <section className="updates-answer">
          <p className="eyebrow"><span /> Ce qu’il faut retenir</p>
          <div>
            <h2>Le marché ne se limite plus au café aux champignons.</h2>
            <p>La nouveauté la plus nette est la diversification. Le café devient une base protéinée, tandis que le lupin, l’orge ou les noyaux de dattes cherchent à reproduire son rituel sans caféine. Un lancement n’est toutefois pas une preuve d’efficacité : nous retenons d’abord la composition, la dose, la caféine et la disponibilité réelle.</p>
          </div>
        </section>

        <section className="updates-new" id="nouveaux-produits">
          <header className="updates-section-heading">
            <div><p className="eyebrow"><span /> Entrées dans la base</p><h2>{newReferences.length} produits repérés et documentés.</h2></div>
            <p>Les données ci-dessous viennent des pages officielles consultées le {directoryUpdatedAt}. « Non publié » signifie que la marque ne fournit pas l’information exploitable sur sa fiche.</p>
          </header>
          <div className="updates-grid">
            {newReferences.map((item, index) => (
              <article className="updates-card" key={item.id}>
                <div className="updates-card-number">{String(index + 1).padStart(2, "0")}</div>
                <figure><ProductVisual item={item} /></figure>
                <div className="updates-card-copy">
                  <p>{item.category}</p>
                  <h3>{item.brand}</h3>
                  <h4>{item.product}</h4>
                  <p className="updates-summary">{item.changeSummary}</p>
                  <dl>
                    <div><dt>Dose</dt><dd>{item.dose}</dd></div>
                    <div><dt>Caféine</dt><dd>{item.caffeine}</dd></div>
                    <div><dt>Prix observé</dt><dd>{item.price}</dd></div>
                    <div><dt>Vérification</dt><dd>Niveau {item.verificationLevel}</dd></div>
                  </dl>
                  <div className="updates-card-links">
                    <Link href={`/annuaire-cafes-fonctionnels/#${item.id}`}>Voir la fiche normalisée →</Link>
                    <a href={item.source} target="_blank" rel="nofollow noopener">Source officielle ↗</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="updates-changes">
          <header>
            <p className="eyebrow light"><span /> Fiches actualisées</p>
            <h2>Ce qui a changé depuis le dernier relevé.</h2>
          </header>
          <div>
            {updatedReferences.map((item) => (
              <article key={item.id}>
                <span className={`level level-${item.verificationLevel.toLowerCase()}`}>{item.verificationLevel}</span>
                <div><small>{item.changeType}</small><h3>{item.brand} · {item.product}</h3><p>{item.changeSummary}</p></div>
                <Link href={`/annuaire-cafes-fonctionnels/#${item.id}`}>Détails →</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="updates-watch">
          <div>
            <p className="eyebrow"><span /> Ce que nous surveillons</p>
            <h2>Une page qui disparaît ou deux chiffres incompatibles changent la lecture.</h2>
          </div>
          <div className="updates-watch-list">
            {watchlist.map((item) => (
              <article key={item.id}>
                <span>{item.publicStatus}</span>
                <h3>{item.brand}</h3>
                <p>{item.changeSummary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="updates-method">
          <p>Cette veille n’est ni un palmarès ni une recommandation médicale. Une information annoncée par une marque reste présentée comme telle. Les prix et stocks peuvent changer après notre relevé.</p>
          <div><Link className="button button-primary" href="/methodologie/">Lire la méthode <span>→</span></Link><Link className="text-link" href="/quel-cafe-me-correspond/">Trouver un café selon mes critères ↗</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
