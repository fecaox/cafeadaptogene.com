import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, guides, siteUrl } from "../site-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/${guide.slug}/` },
    openGraph: { title: guide.title, description: guide.description, url: `${siteUrl}/${guide.slug}/`, images: ["/og.png"] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);
  if (!guide) notFound();

  const currentIndex = guides.findIndex((item) => item.slug === slug);
  const related = guides.filter((item) => item.slug !== slug).slice(currentIndex % 3, currentIndex % 3 + 3);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: "2026-07-30",
    dateModified: "2026-07-30",
    inLanguage: "fr-FR",
    mainEntityOfPage: `${siteUrl}/${guide.slug}/`,
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
      <div className="noticebar"><span>Édition 2026</span><p>Comparatifs indépendants · Données vérifiées · Affiliation signalée</p></div>
      <header className="site-header compact-header">
        <Link className="wordmark" href="/">CAFÉ <i>ADAPTOGÈNE</i></Link>
        <nav aria-label="Navigation principale"><Link href="/#guides">Guides</Link><Link href="/#comparatif">Comparatifs</Link><Link href="/#marques">Marques</Link><Link href="/#methode">Notre méthode</Link></nav>
        <Link className="header-cta" href="/#choisir">Quel café choisir ? <span>↗</span></Link>
      </header>

      <main className="article-page">
        <div className="article-breadcrumb"><Link href="/">Accueil</Link><span>→</span><Link href="/#guides">Guides</Link><span>→</span><b>{guide.title.split(":")[0]}</b></div>
        <header className={`article-hero ${guide.color}`}>
          <div className="article-heading">
            <p className="eyebrow"><span /> {guide.eyebrow}</p>
            <h1>{guide.title}</h1>
            <p>{guide.description}</p>
            <div className="article-meta"><span>Mis à jour le 30 juillet 2026</span><span>Lecture · 7 min</span><span>Relecture éditoriale</span></div>
          </div>
          <div className="article-monogram" aria-hidden="true"><span>{guide.icon}</span><small>GUIDE<br />PRATIQUE</small></div>
        </header>

        <div className="article-layout">
          <aside className="article-toc">
            <p>Dans ce guide</p>
            <a href="#comprendre">01. Comprendre la catégorie</a>
            <a href="#criteres">02. Nos critères</a>
            <a href="#marques-guide">03. Marques à comparer</a>
            <a href="#faq">04. Questions fréquentes</a>
            <div><b>Notre engagement</b><span>Les informations des marques sont recoupées et les liens commerciaux sont signalés.</span></div>
          </aside>

          <article className="article-body">
            <section id="comprendre">
              <p className="article-lead">{guide.intro}</p>
              <div className="takeaways">
                <h2>À vérifier avant d’acheter</h2>
                <div>{guide.keyPoints.map((point, i) => <p key={point}><span>0{i + 1}</span>{point}</p>)}</div>
              </div>
              <h2>Une catégorie, plusieurs réalités</h2>
              <p>Nous utilisons “café fonctionnel” comme terme parapluie, mais chaque fiche précise la nature de la boisson. Une formule peut contenir du café traditionnel, une petite quantité de café soluble, un extrait de caféine ou aucun café du tout. Cette distinction influence le goût, la préparation et l’effet stimulant.</p>
              <p>Les bénéfices mis en avant sont ceux déclarés par les fabricants. Nous ne les reprenons comme faits que lorsqu’ils correspondent à une donnée robuste et pertinente pour le produit et la dose étudiés. C’est particulièrement important pour les champignons et plantes, dont les extraits varient fortement.</p>
              <div className="editor-note"><span>Note de la rédaction</span><p>Une liste d’ingrédients longue n’est pas nécessairement un signe de qualité. La transparence des quantités, la cohérence de la formule et la tolérance comptent davantage.</p></div>
            </section>

            <section id="criteres">
              <p className="eyebrow"><span /> Méthode de lecture</p>
              <h2>Les trois questions qui font la différence</h2>
              <div className="criteria-grid">
                {guide.criteria.map((item, i) => <div key={item.title}><span>0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}
              </div>
              <h2>Notre grille de comparaison</h2>
              <p>Chaque produit est évalué sur cinq dimensions : composition et dosages (30 %), traçabilité (25 %), goût et usage (20 %), niveau de preuve et prudence du discours (15 %), puis prix par tasse (10 %). Une marque mise en avant commercialement ne bénéficie d’aucun bonus de score.</p>
            </section>

            <section id="marques-guide">
              <p className="eyebrow"><span /> Panorama 2026</p>
              <h2>Marques à inclure dans votre comparaison</h2>
              <div className="mini-brand-grid">
                {brands.slice(0, 9).map((brand) => (
                  <a href={brand.link} target="_blank" rel="nofollow" key={brand.name}>
                    <span>{brand.name.charAt(0)}</span><div><h3>{brand.name}</h3><p>{brand.category}</p></div><b>↗</b>
                  </a>
                ))}
              </div>
              <p className="source-note dark-note">Les liens ci-dessus mènent aux sites officiels. Lorsqu’un lien affilié sera disponible, il sera identifié comme tel à proximité immédiate.</p>
            </section>

            <section id="faq" className="faq-section">
              <p className="eyebrow"><span /> Questions fréquentes</p>
              <h2>Ce qu’il faut retenir</h2>
              {guide.faq.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}
            </section>

            <div className="health-warning">
              <h3>Précaution</h3>
              <p>Ce contenu fournit une information générale et ne remplace pas un avis médical. Tenez compte de toutes vos sources de caféine. En cas de grossesse, d’allaitement, de traitement, de pathologie ou d’effet indésirable, demandez conseil à un professionnel de santé.</p>
            </div>
          </article>
        </div>

        <section className="related-guides">
          <p className="eyebrow"><span /> Continuer à explorer</p>
          <h2>Guides associés</h2>
          <div>{related.map(item => <Link className={item.color} href={`/${item.slug}/`} key={item.slug}><small>{item.eyebrow}</small><h3>{item.title}</h3><span>Lire le guide ↗</span></Link>)}</div>
        </section>
      </main>

      <footer className="article-footer">
        <div className="footer-main"><div><Link className="wordmark footer-logo" href="/">CAFÉ <i>ADAPTOGÈNE</i></Link><p>Le guide indépendant des cafés fonctionnels, adaptogènes et nouvelle génération.</p></div><div><h3>Explorer</h3>{guides.slice(0, 4).map(g => <Link key={g.slug} href={`/${g.slug}/`}>{g.title.split(":")[0]}</Link>)}</div><div><h3>Comprendre</h3>{guides.slice(4).map(g => <Link key={g.slug} href={`/${g.slug}/`}>{g.title.split(":")[0]}</Link>)}</div></div>
        <div className="footer-bottom"><span>© 2026 cafeadaptogene.com</span><span>Information générale — ne remplace pas un avis médical</span><span>Liens affiliés signalés</span></div>
      </footer>
    </>
  );
}
