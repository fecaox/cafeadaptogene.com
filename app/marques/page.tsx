import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brandEntities } from "../brand-entities";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { siteUrl } from "../site-data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Torrégral, Café Intégral et Café Minceur : nos marques",
  description: "Identité, positionnement, données disponibles et limites de Torrégral, Café Intégral et Café Minceur, les marques liées à l’écosystème Café Adaptogène.",
  alternates: { canonical: "/marques/" },
  openGraph: {
    title: "Les marques de l’écosystème Café Adaptogène",
    description: "Trois identités de marque explicites, des faits vérifiables et une relation commerciale déclarée.",
    url: `${siteUrl}/marques/`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Les marques de l’écosystème Café Adaptogène" }],
  },
};

export default function BrandsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/marques/#page`,
        url: `${siteUrl}/marques/`,
        name: "Les marques de l’écosystème Café Adaptogène",
        description: "Fiches d’identité et données vérifiables de Torrégral, Café Intégral et Café Minceur.",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: brandEntities.map((brand) => ({ "@id": `${siteUrl}${brand.canonicalPath}#brand` })),
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/marques/#list`,
        numberOfItems: brandEntities.length,
        itemListElement: brandEntities.map((brand, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}${brand.canonicalPath}`,
          name: brand.name,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader compact />
      <main className="owned-brands-page">
        <div className="article-breadcrumb"><Link href="/">Accueil</Link><span>→</span><b>Marques de l’écosystème</b></div>
        <section className="owned-brands-hero">
          <div>
            <p className="eyebrow"><span /> Identités de marque</p>
            <h1>Nos marques,<br /><em>sans zone grise.</em></h1>
          </div>
          <div className="owned-brands-intro">
            <p>Torrégral, Café Intégral et Café Minceur sont liés à l’écosystème à l’origine de ce média. Nous publions cette relation, leurs différences et les données encore manquantes.</p>
            <small>Une appartenance commerciale ne vaut ni preuve scientifique, ni supériorité automatique.</small>
          </div>
        </section>

        <section className="brand-entity-grid" aria-label="Marques liées à Café Adaptogène">
          {brandEntities.map((brand, index) => (
            <article className={`brand-entity-card ${brand.color}`} key={brand.slug}>
              <div className="brand-entity-index"><span>0{index + 1}</span><small>{brand.category}</small></div>
              <figure><Image src={brand.image} alt={brand.imageAlt} width={900} height={900} /></figure>
              <div className="brand-entity-copy">
                <h2>{brand.name}</h2>
                <p>{brand.summary}</p>
                <dl>
                  {brand.facts.slice(0, 3).map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
                </dl>
                <Link href={brand.canonicalPath}>Lire la fiche vérifiable <span>→</span></Link>
              </div>
            </article>
          ))}
        </section>

        <section className="owned-brands-principles">
          <h2>Ce que signifie<br /><em>« meilleur » ici.</em></h2>
          <div>
            <article><span>01</span><h3>Le besoin d’abord</h3><p>Une recommandation dépend du goût, de la caféine, du rituel, des ingrédients acceptés et du niveau de preuve recherché.</p></article>
            <article><span>02</span><h3>La relation déclarée</h3><p>Le lien économique avec ces marques est visible sur chaque fiche et ne modifie pas le calcul du questionnaire.</p></article>
            <article><span>03</span><h3>Les limites publiées</h3><p>Une donnée absente reste « non publiée ». Une estimation n’est jamais présentée comme une mesure du produit fini.</p></article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
