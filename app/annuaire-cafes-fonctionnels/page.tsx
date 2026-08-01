import type { Metadata } from "next";
import Link from "next/link";
import { directoryProducts, directoryStats, directoryUpdatedAt } from "../brand-directory-data";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { siteUrl } from "../site-data";
import DirectoryExplorer from "./DirectoryExplorer";

export const metadata: Metadata = {
  title: "Annuaire des cafés fonctionnels : 128 produits et 120 marques",
  description: "L’annuaire français des cafés fonctionnels, adaptogènes et augmentés : composition, caféine, dosage, prix, disponibilité et niveau de vérification.",
  alternates: { canonical: "/annuaire-cafes-fonctionnels/" },
  openGraph: {
    title: "Annuaire des cafés fonctionnels : 128 références vérifiées",
    description: "120 marques classées par base réelle, actifs, caféine, prix et disponibilité.",
    url: `${siteUrl}/annuaire-cafes-fonctionnels/`,
    images: ["/og.png"],
  },
};

export default function BrandDirectoryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Annuaire des cafés fonctionnels et adaptogènes",
        description: metadata.description,
        url: `${siteUrl}/annuaire-cafes-fonctionnels/`,
        dateModified: "2026-08-01",
        inLanguage: "fr-FR",
      },
      {
        "@type": "ItemList",
        numberOfItems: directoryProducts.length,
        itemListElement: directoryProducts.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${item.brand} — ${item.product}`,
          url: item.source.startsWith("http") ? item.source : `${siteUrl}/annuaire-cafes-fonctionnels/#${item.id}`,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader compact />
      <main className="directory-page">
        <div className="article-breadcrumb"><Link href="/">Accueil</Link><span>→</span><b>Annuaire des marques</b></div>
        <header className="directory-hero">
          <div>
            <p className="eyebrow light"><span /> Observatoire du marché · France 2026</p>
            <h1>L’annuaire des cafés fonctionnels.</h1>
            <p>Une base de référence pour comparer ce qui se trouve réellement dans la tasse : café, champignons, plantes, protéines, collagène, céréales torréfiées et autres formules nouvelle génération.</p>
            <a className="button button-light" href="#repertoire">Explorer les références <span>↓</span></a>
          </div>
          <dl className="directory-hero-stats">
            <div><dt>{directoryStats.references}</dt><dd>références documentées</dd></div>
            <div><dt>{directoryStats.brands}</dt><dd>marques recensées</dd></div>
            <div><dt>{directoryStats.documentedCaffeine}</dt><dd>teneurs en caféine documentées</dd></div>
            <div><dt>{directoryStats.newReferences}</dt><dd>nouvelles références ajoutées</dd></div>
          </dl>
        </header>

        <section className="directory-method-intro">
          <div>
            <p className="eyebrow"><span /> Comment lire l’annuaire</p>
            <h2>Exhaustif ne veut pas dire aveugle.</h2>
          </div>
          <div>
            <p>Chaque ligne distingue les informations retrouvées sur une source officielle, les données secondaires et ce qui reste non documenté. Le niveau porte sur la qualité de la vérification disponible, pas sur l’efficacité du produit.</p>
            <div className="verification-key">
              <p><b>A</b><span>Source officielle actuelle et informations suffisamment identifiables.</span></p>
              <p><b>B</b><span>Source exploitable, mais information importante incomplète ou statut à reconfirmer.</span></p>
              <p><b>C</b><span>Source primaire absente, page retirée ou produit actuel incertain.</span></p>
            </div>
            <p className="directory-updated">Base mise à jour le {directoryUpdatedAt}. Les prix sont des observations datées et peuvent évoluer.</p>
          </div>
        </section>

        <DirectoryExplorer />

        <section className="directory-closing">
          <div><p className="eyebrow light"><span /> Un choix, pas un diagnostic</p><h2>Une composition documentée reste le premier filtre.</h2></div>
          <div><p>La présence d’un ingrédient ou d’une étude sur cet ingrédient ne prouve pas l’effet du produit fini. Vérifiez la dose, la caféine, les allergènes et les éventuelles contre-indications.</p><Link className="button button-light" href="/quel-cafe-me-correspond/">Trouver mon café <span>→</span></Link><Link className="text-link light-link" href="/methodologie/">Lire toute la méthode ↗</Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
