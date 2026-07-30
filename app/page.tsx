import Link from "next/link";
import { brands, guides, siteUrl } from "./site-data";

const selection = [
  {
    rank: "01",
    name: "Torrégral",
    label: "Le choix focus",
    note: "À étudier pour son positionnement café nouvelle génération, son univers focus et son approche du rituel de travail.",
    tags: ["Focus", "Café", "France"],
    link: "https://www.torregral.com/",
    tone: "espresso",
  },
  {
    rank: "02",
    name: "Bonjour",
    label: "L’alternative accessible",
    note: "Une boisson à base d’orge, de cacao et de champignons qui a largement contribué à faire connaître la catégorie en France.",
    tags: ["Orge", "Champignons", "Faible caféine"],
    link: "https://eu.bonjourdrink.co/fr",
    tone: "sage",
  },
  {
    rank: "03",
    name: "Cosmic Blend",
    label: "L’option collagène",
    note: "Une formule hybride qui associe caféine modérée, champignons, L-théanine et collagène marin.",
    tags: ["Collagène", "Lion’s Mane", "30 mg caféine*"],
    link: "https://cosmicblend.co/products/mushroom-coffee-cafe-champignons",
    tone: "rose",
  },
  {
    rank: "04",
    name: "Cafit",
    label: "Le repère protéiné",
    note: "Une marque française entièrement centrée sur le café protéiné, utile pour cartographier la catégorie “proffee”.",
    tags: ["10 g protéines*", "Sport", "Instantané"],
    link: "https://cafitdrink.com/",
    tone: "gold",
  },
];

const questions = [
  { n: "01", q: "Quel est votre objectif ?", a: "Focus, réduction de caféine, protéines, beauté ou gestion du poids : la catégorie vient avant la marque." },
  { n: "02", q: "Quel goût acceptez-vous ?", a: "Vrai café, chicorée, cacao ou latte : une boisson utile mais délaissée au placard reste un mauvais achat." },
  { n: "03", q: "Quel niveau de preuve ?", a: "Nous séparons l’effet connu de la caféine, les données sur un ingrédient et les essais sur le produit fini." },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Café Adaptogène",
    url: siteUrl,
    description: "Guide français des cafés adaptogènes, fonctionnels et nouvelle génération.",
    inLanguage: "fr-FR",
    publisher: { "@type": "Organization", name: "Café Adaptogène", url: siteUrl },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="noticebar">
        <span>Édition 2026</span>
        <p>Comparatifs indépendants · Données vérifiées · Affiliation signalée</p>
      </div>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Café Adaptogène, accueil">
          CAFÉ <i>ADAPTOGÈNE</i>
        </Link>
        <nav aria-label="Navigation principale">
          <a href="#guides">Guides</a>
          <a href="#comparatif">Comparatifs</a>
          <a href="#marques">Marques</a>
          <a href="#methode">Notre méthode</a>
        </nav>
        <a className="header-cta" href="#choisir">Quel café choisir ? <span>↗</span></a>
        <details className="mobile-menu">
          <summary aria-label="Ouvrir le menu">Menu</summary>
          <div>
            <a href="#guides">Guides</a>
            <a href="#comparatif">Comparatifs</a>
            <a href="#marques">Marques</a>
            <a href="#methode">Notre méthode</a>
          </div>
        </details>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Le média français des cafés fonctionnels</p>
            <h1>Le café change.<br />Votre rituel aussi.</h1>
            <p className="hero-lede">Adaptogène, aux champignons, protéiné, au collagène ou pensé pour le focus : nous comparons les cafés nouvelle génération avec méthode, mesure et goût.</p>
            <div className="hero-actions">
              <a className="button button-dark" href="#comparatif">Voir le comparatif 2026 <span>→</span></a>
              <Link className="text-link" href="/guide-cafe-adaptogene/">Commencer par le guide <span>↗</span></Link>
            </div>
            <div className="trust-line">
              <span><b>13</b> marques suivies</span>
              <span><b>8</b> catégories décodées</span>
              <span><b>0</b> promesse miracle</span>
            </div>
          </div>

          <aside className="hero-compass" aria-label="Boussole des cafés fonctionnels">
            <div className="compass-top">
              <span>La boussole</span>
              <span>Mise à jour · 30.07.26</span>
            </div>
            <div className="cup-scene" aria-hidden="true">
              <span className="steam steam-one" />
              <span className="steam steam-two" />
              <span className="cup"><i /></span>
              <span className="bean bean-one" />
              <span className="bean bean-two" />
              <span className="mushroom">♧</span>
            </div>
            <div className="compass-grid">
              <Link href="/cafe-focus/"><b>01</b><span>Focus</span><small>Clarté & travail</small></Link>
              <Link href="/cafe-sans-crash/"><b>02</b><span>Énergie stable</span><small>Moins de caféine</small></Link>
              <Link href="/cafe-collagene/"><b>03</b><span>Beauté</span><small>Collagène & peptides</small></Link>
              <Link href="/cafe-proteine/"><b>04</b><span>Performance</span><small>Protéines & sport</small></Link>
            </div>
          </aside>
        </section>

        <div className="marquee" aria-label="Thématiques couvertes">
          <div>CAFÉ ADAPTOGÈNE <i>✦</i> CAFÉ CHAMPIGNON <i>✦</i> CAFÉ FOCUS <i>✦</i> CAFÉ PROTÉINÉ <i>✦</i> CAFÉ COLLAGÈNE <i>✦</i> SANS CRASH <i>✦</i> BDNF</div>
        </div>

        <section className="section categories" id="guides">
          <div className="section-head">
            <div>
              <p className="eyebrow"><span /> Explorer par catégorie</p>
              <h2>À chaque besoin,<br /><em>son type de café.</em></h2>
            </div>
            <p>Une même étiquette “fonctionnelle” peut cacher des boissons très différentes. Commencez par la catégorie qui correspond réellement à votre usage.</p>
          </div>
          <div className="category-grid">
            {guides.slice(0, 8).map((guide, index) => (
              <Link href={`/${guide.slug}/`} className={`category-card ${guide.color}`} key={guide.slug}>
                <span className="card-number">0{index + 1}</span>
                <span className="category-icon" aria-hidden="true">{guide.icon}</span>
                <div>
                  <small>{guide.eyebrow}</small>
                  <h3>{guide.title.split(":")[0]}</h3>
                  <p>{guide.description}</p>
                  <b>Lire le guide <span>↗</span></b>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="selection" id="comparatif">
          <div className="selection-heading">
            <p className="eyebrow light"><span /> Sélection éditoriale</p>
            <h2>Quatre portes d’entrée<br />dans le café augmenté.</h2>
            <p>Cette sélection ne prétend pas désigner un vainqueur universel. Elle montre quatre usages distincts. Les notes complètes seront enrichies à mesure de nos tests et vérifications.</p>
            <a href="#methode" className="text-link light-link">Lire notre méthodologie <span>↗</span></a>
          </div>
          <div className="selection-list">
            {selection.map((item) => (
              <article className={`selection-card ${item.tone}`} key={item.name}>
                <div className="rank">{item.rank}</div>
                <div className="brand-seal" aria-hidden="true">{item.name.charAt(0)}</div>
                <div className="selection-info">
                  <p>{item.label}</p>
                  <h3>{item.name}</h3>
                  <span>{item.note}</span>
                  <div>{item.tags.map(tag => <small key={tag}>{tag}</small>)}</div>
                </div>
                <a href={item.link} target="_blank" rel="nofollow sponsored" aria-label={`Découvrir ${item.name}`}>Découvrir <span>↗</span></a>
              </article>
            ))}
            <p className="source-note">* Données déclarées par les marques, à vérifier sur la fiche produit au moment de l’achat. Les liens commerciaux et affiliés sont signalés.</p>
          </div>
        </section>

        <section className="section chooser" id="choisir">
          <div className="chooser-intro">
            <p className="eyebrow"><span /> Le bon réflexe</p>
            <h2>Ne cherchez pas<br />“le meilleur”.</h2>
            <p className="accent-copy">Cherchez celui qui vous correspond.</p>
            <p>Le meilleur café fonctionnel dépend de votre sensibilité à la caféine, de votre objectif, du goût attendu, de votre budget et de la transparence de la formule.</p>
          </div>
          <div className="question-list">
            {questions.map(item => (
              <div key={item.n}>
                <span>{item.n}</span>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
            <Link className="button button-copper" href="/guide-cafe-adaptogene/">Suivre le guide de choix <span>→</span></Link>
          </div>
        </section>

        <section className="brand-directory" id="marques">
          <div className="section brand-title">
            <p className="eyebrow light"><span /> Observatoire des marques</p>
            <h2>Le marché français,<br /><em>sans angle mort.</em></h2>
            <p>Marques historiques, nouveaux entrants et offres internationales disponibles en France : notre annuaire est vivant et documenté.</p>
          </div>
          <div className="brand-table-wrap">
            <div className="brand-table-head"><span>Marque</span><span>Positionnement</span><span>Origine</span><span>Fiche</span></div>
            {brands.map((brand) => (
              <div className={`brand-row ${brand.featured ? "featured" : ""}`} key={brand.name}>
                <strong>{brand.name}{brand.featured && <small> à suivre</small>}</strong>
                <span>{brand.category}</span>
                <span>{brand.origin}</span>
                <a href={brand.link} target="_blank" rel="nofollow">Site officiel ↗</a>
              </div>
            ))}
          </div>
        </section>

        <section className="section method" id="methode">
          <div className="method-manifesto">
            <p className="eyebrow"><span /> Notre méthode</p>
            <blockquote>“Une formule spectaculaire sur le papier ne vaut rien si l’étiquette reste floue.”</blockquote>
            <p>Notre rôle n’est pas de répéter les promesses des marques, mais de rendre leurs produits comparables.</p>
          </div>
          <div className="method-score">
            <h2>La grille Café Adaptogène</h2>
            {[
              ["Composition & dosages", "30", "Les quantités sont-elles complètes et exprimées par tasse ?"],
              ["Qualité & traçabilité", "25", "Origine, extraction, certifications et analyses sont-elles documentées ?"],
              ["Goût & usage", "20", "La boisson est-elle agréable, simple à préparer et cohérente avec sa catégorie ?"],
              ["Preuve & prudence", "15", "Le discours distingue-t-il données scientifiques et promesses commerciales ?"],
              ["Prix juste", "10", "Le prix par portion reflète-t-il la formule et l’expérience ?"],
            ].map(([name, score, text]) => (
              <div className="score-row" key={name}>
                <span>{score}<small>/100</small></span>
                <div><h3>{name}</h3><p>{text}</p></div>
              </div>
            ))}
            <p className="disclosure"><b>Transparence.</b> Le site peut percevoir une commission lorsqu’un achat est effectué via certains liens. Cela n’augmente pas votre prix et n’autorise jamais une marque à modifier nos critères.</p>
          </div>
        </section>

        <section className="science-callout">
          <div>
            <span>À lire avant d’acheter</span>
            <h2>Naturel ne veut pas dire anodin.</h2>
          </div>
          <p>Les boissons enrichies peuvent contenir de la caféine, des plantes, des champignons concentrés ou des allergènes. En cas de grossesse, traitement, pathologie ou sensibilité particulière, demandez conseil à un professionnel de santé. Une allégation de marque n’est pas un avis médical.</p>
          <div className="science-links">
            <a href="https://www.anses.fr/fr/content/dossier/complements-alimentaires-tout-savoir-sur-les-usages-et-risques" target="_blank" rel="noopener">Dossier Anses ↗</a>
            <a href="https://www.efsa.europa.eu/en/topics/topic/caffeine" target="_blank" rel="noopener">Repères caféine EFSA ↗</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-main">
          <div>
            <Link className="wordmark footer-logo" href="/">CAFÉ <i>ADAPTOGÈNE</i></Link>
            <p>Le guide indépendant des cafés fonctionnels, adaptogènes et nouvelle génération.</p>
          </div>
          <div><h3>Explorer</h3>{guides.slice(0, 4).map(g => <Link key={g.slug} href={`/${g.slug}/`}>{g.title.split(":")[0]}</Link>)}</div>
          <div><h3>Comprendre</h3>{guides.slice(4).map(g => <Link key={g.slug} href={`/${g.slug}/`}>{g.title.split(":")[0]}</Link>)}</div>
          <div><h3>À propos</h3><a href="#methode">Méthodologie</a><a href="#marques">Marques suivies</a><a href="mailto:bonjour@cafeadaptogene.com">Nous contacter</a></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 cafeadaptogene.com</span>
          <span>Information générale — ne remplace pas un avis médical</span>
          <span>Liens affiliés signalés</span>
        </div>
      </footer>
    </>
  );
}
