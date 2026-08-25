import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandEntity, ownedBrandEntities } from "../../brand-entities";
import { SiteFooter, SiteHeader } from "../../components/site-chrome";
import { siteUrl } from "../../site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return ownedBrandEntities.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandEntity(slug);
  if (!brand || !brand.canonicalPath.startsWith("/marques/")) return {};
  return {
    title: `${brand.name} : fiche, composition et avis`,
    description: `${brand.summary} Données disponibles, limites, profils adaptés et relation commerciale expliquée.`,
    alternates: { canonical: brand.canonicalPath },
    openGraph: {
      type: "article",
      title: `${brand.name} : la fiche vérifiable`,
      description: brand.summary,
      url: `${siteUrl}${brand.canonicalPath}`,
      images: [{ url: brand.image, width: 900, height: 900, alt: brand.imageAlt }],
    },
    twitter: { card: "summary_large_image", title: `${brand.name} : la fiche vérifiable`, description: brand.summary, images: [brand.image] },
  };
}

export default async function BrandEntityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = getBrandEntity(slug);
  if (!brand || !brand.canonicalPath.startsWith("/marques/")) notFound();

  const canonicalUrl = `${siteUrl}${brand.canonicalPath}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Brand",
        "@id": `${canonicalUrl}#brand`,
        name: brand.name,
        url: brand.officialUrl,
        sameAs: [brand.officialUrl],
        logo: `${siteUrl}${brand.image}`,
        description: brand.summary,
      },
      {
        "@type": "Product",
        "@id": `${canonicalUrl}#product`,
        name: brand.productName,
        category: brand.category,
        image: `${siteUrl}${brand.image}`,
        description: brand.summary,
        brand: { "@id": `${canonicalUrl}#brand` },
        additionalProperty: brand.facts.map((fact) => ({
          "@type": "PropertyValue",
          name: fact.label,
          value: fact.value,
          description: `Statut de la donnée : ${fact.status}`,
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: `${brand.name} : fiche, composition et avis`,
        description: brand.summary,
        dateModified: "2026-08-25",
        inLanguage: "fr-FR",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: { "@id": `${canonicalUrl}#product` },
        reviewedBy: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: brand.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "Marques", item: `${siteUrl}/marques/` },
          { "@type": "ListItem", position: 3, name: brand.name, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader compact />
      <main>
        <div className="article-breadcrumb"><Link href="/">Accueil</Link><span>→</span><Link href="/marques/">Marques</Link><span>→</span><b>{brand.name}</b></div>
        <section className={`article-hero brand-article-hero ${brand.color}`}>
          <div className="article-heading">
            <p className="eyebrow"><span /> Fiche d’identité vérifiable</p>
            <h1>{brand.name}</h1>
            <p>{brand.summary}</p>
            <div className="article-meta"><span>Mis à jour le {brand.updated}</span><span>{brand.category}</span></div>
          </div>
          <figure className="brand-pack-hero"><Image src={brand.image} alt={brand.imageAlt} width={900} height={900} priority /><figcaption>{brand.productName}</figcaption></figure>
        </section>

        <div className="article-layout">
          <aside className="article-toc">
            <p>Sur cette page</p>
            <a href="#reponse">Réponse courte</a><a href="#faits">Faits vérifiables</a><a href="#profils">À qui correspond-il ?</a><a href="#preuves">Niveau de preuve</a><a href="#questions">Questions fréquentes</a>
            <a href={brand.officialUrl} rel="nofollow sponsored">Site officiel ↗</a>
          </aside>
          <article className="article-body brand-entity-body">
            <section id="reponse">
              <p className="eyebrow"><span /> Réponse courte</p>
              <p className="answer-first">{brand.answer}</p>
              <aside className="editor-note"><span>Transparence</span><p>{brand.relationship}</p></aside>
            </section>

            <section id="faits">
              <p className="eyebrow"><span /> Données disponibles</p>
              <h2>Les faits, avec leur statut.</h2>
              <div className="brand-fact-table">
                {brand.facts.map((fact) => <div key={fact.label}><b>{fact.label}</b><span>{fact.value}</span><small className={`status-${fact.status.replace(" ", "-")}`}>{fact.status}</small></div>)}
              </div>
            </section>

            <section id="profils">
              <p className="eyebrow"><span /> Correspondance</p>
              <h2>À qui ce produit correspond-il ?</h2>
              <div className="brand-fit-grid">
                <div><h3>Plutôt adapté si…</h3>{brand.suitableFor.map((item) => <p key={item}><span>✓</span>{item}</p>)}</div>
                <div><h3>Moins adapté si…</h3>{brand.notSuitableFor.map((item) => <p key={item}><span>—</span>{item}</p>)}</div>
              </div>
            </section>

            <section id="preuves">
              <p className="eyebrow"><span /> Lecture critique</p>
              <h2>Ce que l’on sait et ce qui manque.</h2>
              <div className="criteria-grid">
                {brand.evidence.map((item, index) => <div key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}
              </div>
              <p className="section-copy-small">Une information déclarée par une marque est utile pour décrire le produit, mais elle n’équivaut pas à une mesure indépendante ni à une preuve clinique. Les fiches sont corrigées lorsqu’une source plus récente devient disponible.</p>
            </section>

            <section className="faq-section" id="questions">
              <p className="eyebrow"><span /> Questions fréquentes</p>
              <h2>Réponses directes.</h2>
              {brand.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}
            </section>

            <section>
              <p className="eyebrow"><span /> Continuer</p>
              <h2>Comparer dans le bon contexte.</h2>
              <div className="deep-section-links">{brand.related.map((item) => <Link href={item.path} key={item.path}>{item.label}</Link>)}</div>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
