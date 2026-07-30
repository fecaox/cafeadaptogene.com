import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "../components/product-card";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { allGuides, products, siteUrl, universes } from "../site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return allGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = allGuides.find((item) => item.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/${guide.slug}/` },
    openGraph: { title: guide.title, description: guide.description, url: `${siteUrl}/${guide.slug}/`, images: ["/og.png"] },
  };
}

function fallbackProducts(slug: string) {
  const map: Record<string, string[]> = {
    "guide-cafe-adaptogene": ["torregral", "bonjour", "cafit"],
    "cafe-champignon": ["bonjour", "guerriers", "frenchmush"],
    "cafe-focus": ["torregral", "bonjour", "brainstoorm"],
    "cafe-sans-crash": ["torregral", "bonjour", "cafeintegral"],
    "cafe-collagene": ["corial", "cosmicblend", "wake"],
    "cafe-proteine": ["cafit", "corial", "cosmicblend"],
    "cafe-minceur": ["cafeminceur", "torregral", "bonjour"],
    "cafe-bdnf": ["cafeintegral", "torregral", "brainstoorm"],
  };
  return map[slug] ?? [];
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = allGuides.find((item) => item.slug === slug);
  if (!guide) notFound();

  const currentIndex = allGuides.findIndex((item) => item.slug === slug);
  const related = allGuides.filter((item) => item.slug !== slug).slice(currentIndex % 7, currentIndex % 7 + 3);
  const selectedIds = guide.productIds ?? fallbackProducts(slug);
  const selectedProducts = selectedIds.map((id) => products.find((product) => product.id === id)).filter(Boolean) as typeof products;
  const universe = universes.find((item) => item.slug === slug || item.children.some((child) => child.slug === slug));
  const hasDeepDive = Boolean(guide.sections?.length);
  const readingTime = 7 + (guide.sections?.length ?? 0) * 2;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: "2026-07-30",
    dateModified: "2026-07-30",
    inLanguage: "fr-FR",
    mainEntityOfPage: `${siteUrl}/${guide.slug}/`,
    author: { "@type": "Organization", name: "Rédaction Café Adaptogène" },
    publisher: { "@type": "Organization", name: "Café Adaptogène", url: siteUrl },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <SiteHeader compact />
      <main className="article-page">
        <div className="article-breadcrumb">
          <Link href="/">Accueil</Link><span>→</span>
          {universe && <><Link href={`/${universe.slug}/`}>{universe.title}</Link><span>→</span></>}
          <b>{guide.title.split(":")[0]}</b>
        </div>

        <header className={`article-hero ${guide.color}`}>
          <div className="article-heading">
            <p className="eyebrow"><span /> {guide.eyebrow}</p>
            <h1>{guide.title}</h1>
            <p>{guide.description}</p>
            <div className="article-meta"><span>Mis à jour le 30 juillet 2026</span><span>Lecture · {readingTime} min</span><span>Sources et méthode visibles</span></div>
          </div>
          <div className="article-monogram" aria-hidden="true"><span>{guide.icon}</span><small>CAFÉ<br />ADAPTOGÈNE</small></div>
        </header>

        <div className="article-layout">
          <aside className="article-toc">
            <p>Dans ce guide</p>
            <a href="#definition">01. La définition</a>
            <a href="#criteres">02. Les bons critères</a>
            {hasDeepDive && <a href="#approfondir">03. Le guide détaillé</a>}
            {selectedProducts.length > 0 && <a href="#produits">{hasDeepDive ? "04" : "03"}. Produits repères</a>}
            <a href="#faq">{hasDeepDive ? "05" : "04"}. Questions fréquentes</a>
            {guide.sources?.length ? <a href="#sources">{hasDeepDive ? "06" : "05"}. Sources</a> : null}
            <Link href="/quel-cafe-me-correspond/">Faire le test →</Link>
          </aside>

          <article className="article-body">
            <section id="definition">
              <p className="answer-first">{guide.intro}</p>
              <div className="takeaways">
                <h2>Les quatre repères à garder</h2>
                <div>{guide.keyPoints.map((point, index) => <p key={point}><span>0{index + 1}</span>{point}</p>)}</div>
              </div>
              <h2>La catégorie avant la promesse</h2>
              <p>Deux produits qui emploient les mêmes mots peuvent être très différents dans la tasse. Nous regardons d’abord la base réelle, la préparation, la caféine et l’origine de la fonctionnalité. Ce n’est qu’ensuite que nous examinons les ingrédients et les bénéfices mis en avant.</p>
              <p>Une affirmation publiée par une marque est présentée comme telle. Une étude sur un ingrédient ne devient pas automatiquement une preuve pour la formule vendue, surtout lorsque la dose ou l’extrait diffèrent.</p>
              <div className="editor-note"><span>Règle éditoriale</span><p>Si un produit ne révèle pas une information déterminante, nous écrivons « non communiqué » plutôt que de la deviner.</p></div>
            </section>

            <section id="criteres">
              <p className="eyebrow"><span /> Lire et comparer</p>
              <h2>Les trois questions qui font la différence</h2>
              <div className="criteria-grid">
                {guide.criteria.map((item, index) => <div key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}
              </div>
              <div className="method-inline">
                <div><span>Socle commun</span><b>Goût · transparence · préparation · prix par tasse</b></div>
                <div><span>Critères spécialisés</span><b>Adaptés à la famille, jamais copiés d’un autre comparatif</b></div>
                <Link href="/methodologie/">Consulter toute la méthode ↗</Link>
              </div>
            </section>

            {guide.sections?.length ? (
              <section id="approfondir" className="article-deep-dive">
                <p className="eyebrow"><span /> Guide détaillé</p>
                {guide.sections.map((section, index) => (
                  <div className="article-deep-section" key={section.title}>
                    <span className="deep-section-number">{String(index + 1).padStart(2, "0")}</span>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {section.bullets?.length ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                    {section.links?.length ? (
                      <div className="deep-section-links">
                        {section.links.map((link) => <Link href={`/${link.slug}/`} key={link.slug}>{link.label} <span>→</span></Link>)}
                      </div>
                    ) : null}
                  </div>
                ))}
              </section>
            ) : null}

            {selectedProducts.length > 0 && (
              <section id="produits" className="article-products">
                <p className="eyebrow"><span /> Repères du marché</p>
                <h2>Produits à comparer dans cette famille</h2>
                <p className="section-copy-small">Cette sélection illustre différents profils. Elle ne constitue pas un palmarès universel : utilisez le questionnaire pour tenir compte de vos préférences.</p>
                <div>{selectedProducts.map((product) => <ProductCard product={product} compact key={product.id} />)}</div>
              </section>
            )}

            <section id="faq" className="faq-section">
              <p className="eyebrow"><span /> Questions fréquentes</p>
              <h2>Ce qu’il faut retenir</h2>
              {guide.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}
            </section>

            {guide.sources?.length ? (
              <section id="sources" className="article-sources">
                <p className="eyebrow"><span /> Sources institutionnelles</p>
                <h2>Pour aller à la source</h2>
                <div>{guide.sources.map((source) => <a href={source.url} target="_blank" rel="noopener" key={source.url}>{source.label}<span>↗</span></a>)}</div>
              </section>
            ) : null}

            <div className="health-warning">
              <h3>Précaution</h3>
              <p>Ce contenu fournit une information générale et ne remplace pas un avis médical. Tenez compte de toutes vos sources de caféine. En cas de grossesse, d’allaitement, de traitement, de pathologie ou d’effet indésirable, demandez conseil à un professionnel de santé.</p>
            </div>
          </article>
        </div>

        <section className="article-quiz-cta">
          <div><span>Vous hésitez encore ?</span><h2>Sept réponses valent mieux qu’un classement générique.</h2></div>
          <p>Le sélecteur compare votre goût, votre rituel, votre composition préférée et votre objectif aux produits documentés.</p>
          <Link className="button button-light" href="/quel-cafe-me-correspond/">Trouver mon café <span>→</span></Link>
        </section>

        <section className="related-guides">
          <p className="eyebrow"><span /> Continuer à explorer</p>
          <h2>Guides associés</h2>
          <div>{related.map((item) => <Link className={item.color} href={`/${item.slug}/`} key={item.slug}><small>{item.eyebrow}</small><h3>{item.title}</h3><span>Lire le guide ↗</span></Link>)}</div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
