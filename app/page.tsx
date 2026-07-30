import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "./components/product-card";
import { SiteFooter, SiteHeader } from "./components/site-chrome";
import { guides, products, siteUrl, taxonomyGuides, universes } from "./site-data";

const featuredIds = ["torregral", "bonjour", "cafit", "cosmicblend"];
const featured = featuredIds.map((id) => products.find((product) => product.id === id)).filter(Boolean) as typeof products;
const familyPages = taxonomyGuides.filter((guide) => !universes.some((universe) => universe.slug === guide.slug));
const priorityArticleIds = ["cafe-fonctionnel", "cafe-nouvelle-generation", "comparatif-cafe-adaptogene", "cafe-focus", "cafe-sans-crash"];
const priorityArticles = priorityArticleIds.map((slug) => guides.find((guide) => guide.slug === slug)).filter(Boolean) as typeof guides;

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Café Adaptogène",
        url: siteUrl,
        description: "Guide français des cafés adaptogènes, fonctionnels et nouvelle génération.",
        inLanguage: "fr-FR",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Café Adaptogène",
        url: siteUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteHeader />
      <main>
        <section className="home-hero">
          <div className="home-hero-copy">
            <p className="eyebrow"><span /> Le guide français de la nouvelle génération de cafés</p>
            <h1>Quel café voulez-vous vraiment boire&nbsp;?</h1>
            <p className="hero-lede">Un vrai café plus fonctionnel, un mélange aux champignons, une formule protéinée ou une alternative sans café&nbsp;? Nous les classons avant de les comparer.</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/quel-cafe-me-correspond/">Trouver mon café <span>→</span></Link>
              <Link className="button button-ghost" href="/guide-cafe-adaptogene/">Comprendre le marché</Link>
            </div>
            <div className="hero-facts">
              <span><b>3</b> univers lisibles</span>
              <span><b>7</b> familles comparables</span>
              <span><b>12</b> produits documentés</span>
            </div>
          </div>
          <div className="hero-products" aria-label="Exemples de cafés nouvelle génération">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <figure className="hero-pack hero-pack-main">
              <Image src="/images/products/torregral-packaging.jpg" alt="Paquet de café Torrégral" width={1000} height={680} priority />
              <figcaption><span>01</span><b>Le café reste du café</b><small>Torrégral · intrinsèquement fonctionnel</small></figcaption>
            </figure>
            <figure className="hero-pack hero-pack-side">
              <Image src="/images/products/bonjourdrink-packaging.jpg" alt="Sachet Bonjour Super Café" width={600} height={600} priority />
              <figcaption><span>02</span><b>Le café devient mélange</b><small>Bonjour · champignons & céréales</small></figcaption>
            </figure>
            <div className="hero-stamp"><span>Guide</span><b>2026</b><small>France</small></div>
          </div>
        </section>

        <section className="definition-strip" aria-label="Définition du café augmenté">
          <p><b>Café augmenté</b> <span>nom masculin</span></p>
          <blockquote>Un café, une boisson torréfiée ou un produit du caféier dont la composition, la fabrication ou l’usage revendique une fonction supplémentaire.</blockquote>
          <Link href="/methodologie/">Voir notre définition complète ↗</Link>
        </section>

        <section className="home-section universe-section">
          <header className="section-intro split-intro">
            <div>
              <p className="eyebrow"><span /> La carte du marché</p>
              <h2>Trois univers.<br /><em>Enfin une boussole.</em></h2>
            </div>
            <p>Une formule ne devrait pas être classée selon son slogan, mais selon ce que vous buvez réellement. Notre premier travail consiste donc à remettre chaque produit dans la bonne famille.</p>
          </header>
          <div className="universe-grid">
            {universes.map((universe) => (
              <article className={`universe-card ${universe.color}`} key={universe.id}>
                <div className="universe-top"><span>{universe.number}</span><small>{universe.kicker}</small></div>
                <h3>{universe.title}</h3>
                <p>{universe.description}</p>
                <div className="universe-children">
                  {universe.children.map((child) => (
                    <Link href={`/${child.slug}/`} key={child.slug}>
                      <span>{child.title}</span><small>{child.note}</small><b>↗</b>
                    </Link>
                  ))}
                </div>
                <Link className="universe-link" href={`/${universe.slug}/`}>Explorer cet univers <span>→</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="quiz-callout">
          <div className="quiz-callout-copy">
            <p className="eyebrow light"><span /> Recommandation personnalisée</p>
            <h2>Le meilleur café<br />n’existe pas.</h2>
            <p className="quiz-accent">Le vôtre, peut-être.</p>
            <p>Goût, composition, préparation, caféine et objectif&nbsp;: sept réponses suffisent pour obtenir une recommandation expliquée et deux alternatives.</p>
            <Link className="button button-light" href="/quel-cafe-me-correspond/">Faire le test · 2 min <span>→</span></Link>
          </div>
          <div className="quiz-preview" aria-hidden="true">
            <div className="quiz-preview-head"><span>Question 1 / 7</span><small>Aucune marque n’est citée pendant le test</small></div>
            <h3>Le goût d’un véritable café est-il indispensable&nbsp;?</h3>
            <div><span>Oui, absolument</span><b>01</b></div>
            <div><span>De préférence</span><b>02</b></div>
            <div><span>Je suis ouvert</span><b>03</b></div>
            <p>Résultats calculés à partir de critères publiés — jamais du montant d’une commission.</p>
          </div>
        </section>

        <section className="home-section editorial-selection" id="comparatifs">
          <header className="section-intro">
            <p className="eyebrow"><span /> Quatre points de départ</p>
            <h2>Comparer sans mélanger<br /><em>les usages.</em></h2>
            <p>Ces produits représentent quatre logiques différentes. Ils ne partagent pas un classement unique : chacun est évalué dans sa famille.</p>
          </header>
          <div className="featured-products">
            {featured.map((product) => <ProductCard product={product} compact key={product.id} />)}
          </div>
          <p className="local-disclosure"><b>Transparence :</b> Torrégral appartient à l’écosystème à l’origine de ce média. Cette relation est signalée et ne lui apporte aucun bonus dans le questionnaire. Les informations de toutes les marques restent soumises à la même grille.</p>
        </section>

        <section className="home-section priority-editorial">
          <header className="section-intro split-intro">
            <div>
              <p className="eyebrow"><span /> À lire en premier</p>
              <h2>Les guides qui posent<br /><em>les bons repères.</em></h2>
            </div>
            <p>Définition, nouvelle génération, comparatif et choix par usage : cinq dossiers reliés entre eux pour comprendre le marché avant d’acheter.</p>
          </header>
          <div className="priority-article-grid">
            {priorityArticles.map((guide, index) => (
              <Link className={guide.color} href={`/${guide.slug}/`} key={guide.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{guide.eyebrow}</small>
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
                <b>Lire le guide →</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="family-index">
          <div className="family-index-head">
            <p className="eyebrow light"><span /> Les sept familles</p>
            <h2>Du grain à la formule<br />tout-en-un.</h2>
          </div>
          <div className="family-list">
            {familyPages.map((guide, index) => (
              <Link href={`/${guide.slug}/`} key={guide.slug}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><small>{guide.eyebrow}</small><h3>{guide.title.split(":")[0]}</h3></div>
                <p>{guide.description}</p>
                <b>↗</b>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-section brand-observatory" id="marques">
          <header className="section-intro split-intro">
            <div>
              <p className="eyebrow"><span /> Observatoire des marques</p>
              <h2>Le marché en images,<br /><em>sans angle mort.</em></h2>
            </div>
            <p>Les visuels identifient les produits ; les textes distinguent ce que la marque déclare de ce que nous avons pu vérifier. Les données sont revues au fil des changements de formule.</p>
          </header>
          <div className="brand-wall">
            {products.map((product, index) => (
              <a href={product.link} target="_blank" rel={product.relationship === "partenaire" ? "sponsored nofollow noopener" : "nofollow noopener"} key={product.id}>
                <span className="brand-wall-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="brand-wall-image"><Image src={product.image} alt={product.imageAlt} width={420} height={420} /></div>
                <div><small>{product.category}</small><h3>{product.name}</h3><p>{product.badges.slice(0, 2).join(" · ")}</p></div>
                <b>↗</b>
              </a>
            ))}
          </div>
        </section>

        <section className="method-band">
          <div className="method-lead">
            <p className="eyebrow light"><span /> Notre méthode</p>
            <blockquote>“Une formule spectaculaire sur le papier ne vaut rien si l’étiquette reste floue.”</blockquote>
            <p>Nous séparons toujours composition vérifiable, promesse de la marque, niveau de preuve et jugement éditorial.</p>
            <Link className="text-link light-link" href="/methodologie/">Lire la méthode complète ↗</Link>
          </div>
          <div className="method-steps">
            {[
              ["01", "Classer", "Une seule catégorie principale, puis des étiquettes secondaires."],
              ["02", "Normaliser", "Caféine, actifs et prix ramenés à une tasse comparable."],
              ["03", "Vérifier", "Source, date et nature de chaque information rendues visibles."],
              ["04", "Expliquer", "Points forts et limites affichés ensemble, y compris pour nos partenaires."],
            ].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="health-callout">
          <div><span>À lire avant d’acheter</span><h2>Fonctionnel ne veut pas dire médical.</h2></div>
          <p>Les mots focus, minceur ou sans crash décrivent des intentions et des positionnements, pas des résultats garantis. Caféine, plantes, champignons et allergènes peuvent nécessiter une vigilance particulière.</p>
          <div>
            <a href="https://www.anses.fr/fr/content/dossier/complements-alimentaires-tout-savoir-sur-les-usages-et-risques" target="_blank" rel="noopener">Dossier Anses ↗</a>
            <a href="https://www.efsa.europa.eu/fr/topics/topic/caffeine" target="_blank" rel="noopener">Repères caféine EFSA ↗</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
