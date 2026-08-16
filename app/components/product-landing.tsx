import Image from "next/image";
import Link from "next/link";
import { LandingProduct, landingProducts, landingSlugs } from "../product-landing-data";
import { siteUrl } from "../site-data";
import { PreorderForm } from "./preorder-form";
import styles from "./product-landing.module.css";

export function ProductLanding({ product }: { product: LandingProduct }) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.productName} — Café Adaptogène`,
    image: `${siteUrl}${product.packImage}`,
    description: product.lead,
    brand: { "@type": "Brand", name: "Café Adaptogène" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "2.00",
      availability: "https://schema.org/PreOrder",
      url: `${siteUrl}/${product.slug}/`,
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className={`${styles.landing} ${styles[product.theme]}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className={styles.topbar}>
        <Link className={styles.logo} href="/">CAFÉ <strong>ADAPTOGÈNE</strong></Link>
        <nav aria-label="Les créations Café Adaptogène">
          {landingSlugs.map((slug) => (
            <Link className={slug === product.slug ? styles.currentProduct : ""} href={`/${slug}/`} key={slug}>
              {landingProducts[slug].shortName}
            </Link>
          ))}
        </nav>
        <a className={styles.topCta} href="#precommande">Précommander <span>↘</span></a>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{product.eyebrow}</p>
            <h1>{product.headline}</h1>
            <p className={styles.lead}>{product.lead}</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href="#precommande">Je précommande <span>→</span></a>
              <a className={styles.secondaryCta} href="#formule">Voir la formule</a>
            </div>
            <ul className={styles.heroFacts}>
              <li><b>2 €</b><span>par sachet</span></li>
              <li><b>4 €</b><span>livraison fixe</span></li>
              <li><b>Libre</b><span>quantité choisie</span></li>
            </ul>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.animalFrame}>
              <Image src={product.animalImage} alt={product.animalAlt} fill priority sizes="(max-width: 800px) 100vw, 58vw" />
            </div>
            <div className={styles.packFrame}>
              <Image src={product.packImage} alt={product.packAlt} width={720} height={840} priority sizes="(max-width: 800px) 62vw, 25vw" />
            </div>
            <div className={styles.heroBadge}><span>Nouveau</span><b>01</b><small>Format individuel</small></div>
            <p className={styles.heroSignature}>{product.animalName}</p>
          </div>
        </section>

        <div className={styles.ticker} aria-label={product.promise}>
          {[0, 1, 2].map((item) => <span key={item}>{product.promise} <b>✦</b></span>)}
        </div>

        <section className={styles.identity}>
          <div className={styles.identityTitle}>
            <p>Le manifeste</p>
            <h2>{product.ritualTitle}</h2>
          </div>
          <div className={styles.identityCopy}>
            <p>{product.ritualText}</p>
            <blockquote>“{product.manifesto}”</blockquote>
          </div>
        </section>

        <section className={styles.features} id="formule">
          <header>
            <p>Pourquoi cette formule</p>
            <h2>Conçue autour de votre rituel.</h2>
          </header>
          <div className={styles.featureGrid}>
            {product.features.map((feature, index) => (
              <article key={feature.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{feature.kicker}</small>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.formula}>
          <div className={styles.formulaPack}>
            <span className={styles.formulaHalo} />
            <Image src={product.packImage} alt="" width={720} height={840} sizes="(max-width: 800px) 70vw, 31vw" />
          </div>
          <div className={styles.formulaCopy}>
            <p>Dans le sachet</p>
            <h2>Une formule courte.<br />Des informations claires.</h2>
            <ul>{product.ingredients.map((ingredient) => <li key={ingredient}><span>✓</span>{ingredient}</li>)}</ul>
            <div className={styles.transparencyNote}>
              <strong>Transparence avant confirmation</strong>
              <p>{product.disclaimer}</p>
            </div>
          </div>
        </section>

        <section className={styles.moments}>
          <header><p>Le mode d’emploi</p><h2>Une place naturelle dans la journée.</h2></header>
          <div>
            {product.moments.map((moment) => (
              <article key={moment.number}><span>{moment.number}</span><h3>{moment.title}</h3><p>{moment.text}</p></article>
            ))}
          </div>
        </section>

        <section className={styles.priceStory}>
          <div><span>Prix simple</span><b>2 €</b><p>le sachet</p></div>
          <blockquote>Vous choisissez la quantité.<br />La livraison reste à 4 €.</blockquote>
          <p>Pas de lot imposé. Pas d’abonnement caché. Vous constituez la précommande adaptée à votre rythme.</p>
        </section>

        <section className={styles.preorderSection} id="precommande">
          <div className={styles.preorderIntro}>
            <p>Première série</p>
            <h2>Réservez votre place.</h2>
            <p>La précommande nous aide à dimensionner la première production. Aucun paiement n’est demandé tant que les dosages et la fiche produit définitive ne vous ont pas été transmis.</p>
            <div className={styles.preorderPromise}><span>01</span><p>Vous choisissez votre quantité.</p><span>02</span><p>Vous envoyez votre intention par e-mail.</p><span>03</span><p>Vous recevez la fiche finale avant de confirmer.</p></div>
          </div>
          <PreorderForm productName={product.productName} theme={product.theme} />
        </section>

        <section className={styles.faq}>
          <header><p>Avant de précommander</p><h2>Les réponses franches.</h2></header>
          <div>
            {product.faq.map((item) => (
              <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>
            ))}
          </div>
        </section>

        <aside className={styles.healthNote}>
          <strong>À savoir</strong>
          <p>Ce produit est une denrée alimentaire en développement, pas un médicament. Il contient du café et donc de la caféine. En cas de grossesse, d’allaitement, de pathologie, de traitement ou de sensibilité particulière, demandez conseil à un professionnel de santé.</p>
        </aside>
      </main>

      <footer className={styles.footer}>
        <Link className={styles.logo} href="/">CAFÉ <strong>ADAPTOGÈNE</strong></Link>
        <p>Le café change. Le plaisir reste.</p>
        <div><Link href="/">Retour au média</Link><a href="mailto:bonjour@cafeadaptogene.com">Contact</a></div>
        <small>© 2026 Café Adaptogène · Précommandes sans paiement immédiat</small>
      </footer>
    </div>
  );
}
