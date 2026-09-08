import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PreorderForm } from "../components/preorder-form";
import { siteUrl } from "../site-data";
import styles from "./vitalitea.module.css";

const productImage = "/images/landing/vitalitea-pack.png";

const faq = [
  {
    question: "Vitalitéa est-il un vrai café ?",
    answer:
      "Oui. Vitalitéa reste dans la famille du café. Sa formule est composée exclusivement d’ingrédients issus du café et de son fruit. Elle ne contient ni champignon, ni plante stimulante ajoutée.",
  },
  {
    question: "Quel goût a-t-il ?",
    answer:
      "La formule est pensée pour conserver le goût, l’arôme et le rituel d’un café torréfié. Elle se prépare comme un café et ne cherche pas à ressembler à un latte aromatisé.",
  },
  {
    question: "Comment préparer une tasse ?",
    answer:
      "Utilisez un sachet de 12 g par tasse. La mouture est destinée à une préparation de type filtre ou cafetière. Les instructions définitives seront précisées avant la confirmation de la précommande.",
  },
  {
    question: "Vitalitéa contient-il de la caféine ?",
    answer:
      "Oui. Vitalitéa contient naturellement la caféine du café. La quantité réellement extraite dépend de la méthode, du volume d’eau et du temps de préparation. La valeur du produit fini sera publiée avant sa commercialisation définitive.",
  },
  {
    question: "Pourquoi parler de vitalité ?",
    answer:
      "Vitalité décrit le territoire de la marque et le moment de consommation. La caféine contribue à la vigilance, mais aucun café ne remplace le sommeil, une alimentation équilibrée ou une activité physique régulière.",
  },
];

export const metadata: Metadata = {
  title: "Vitalitéa, le café du fruit entier pour bien commencer la journée",
  description:
    "Découvrez Vitalitéa : un café du fruit entier, d’origine Costa Rica, dosé à 12 g par tasse et conçu pour garder le goût d’un véritable café.",
  alternates: { canonical: "/vitalitea/" },
  openGraph: {
    title: "Vitalitéa, le café du fruit entier",
    description: "L’intégralité de la cerise de café. Le goût du café tel que vous l’aimez.",
    url: "/vitalitea/",
    images: [{ url: productImage, alt: "Sachet Vitalitéa, café du fruit entier" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitalitéa, le café du fruit entier",
    description: "L’intégralité de la cerise de café. Le goût du café tel que vous l’aimez.",
    images: [productImage],
  },
};

export default function VitaliteaPage() {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Vitalitéa, café du fruit entier",
    image: `${siteUrl}${productImage}`,
    description:
      "Café du fruit entier d’origine Costa Rica, en sachet individuel de 12 g, à préparer comme un café.",
    brand: { "@type": "Brand", name: "Vitalitéa" },
    category: "Café fonctionnel issu du fruit du café",
    countryOfOrigin: { "@type": "Country", name: "Costa Rica" },
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: "2.00",
      availability: "https://schema.org/PreOrder",
      url: `${siteUrl}/vitalitea/`,
    },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <header className={styles.header}>
        <Link className={styles.brand} href="/vitalitea/" aria-label="Vitalitéa, accueil de la page">
          VITALITÉA
        </Link>
        <nav aria-label="Navigation Vitalitéa">
          <a href="#origine">Le concept</a>
          <a href="#preparation">Préparation</a>
          <a href="#questions">Questions</a>
        </nav>
        <a className={styles.headerCta} href="#precommande">Précommander</a>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Café du fruit entier · Costa Rica</p>
            <h1>Du café.<br /><em>Plus vivant.</em></h1>
            <p className={styles.lead}>
              L’intégralité de la cerise de café. Le goût du café tel que vous l’aimez.
            </p>
            <div className={styles.actions}>
              <a className={styles.primaryCta} href="#precommande">Je précommande <span>↗</span></a>
              <a className={styles.textCta} href="#origine">Comprendre la formule</a>
            </div>
            <p className={styles.heroNote}>Un sachet. Une tasse. 12 g de café issu du fruit entier.</p>
          </div>

          <div className={styles.heroVisual}>
            <span className={styles.sun} aria-hidden="true" />
            <div className={styles.packShot}>
              <Image
                src={productImage}
                alt="Sachet individuel Vitalitéa, café du fruit entier"
                width={1024}
                height={1536}
                priority
                unoptimized
                sizes="(max-width: 820px) 78vw, 40vw"
              />
            </div>
            <div className={styles.stamp}><b>12 g</b><span>par tasse</span></div>
          </div>
        </section>

        <div className={styles.marquee} aria-label="Le positionnement de Vitalitéa">
          <span>Goût café</span><i>●</i><span>Fruit entier</span><i>●</i><span>Vitalité quotidienne</span><i>●</i><span>Origine Costa Rica</span>
        </div>

        <section className={styles.proofStrip} aria-label="Informations principales">
          <div><b>100 %</b><span>issu du café<br />et de son fruit</span></div>
          <div><b>12 g</b><span>la dose<br />par tasse</span></div>
          <div><b>0</b><span>actif stimulant<br />ajouté</span></div>
          <div><b>1</b><span>vrai rituel<br />de café</span></div>
        </section>

        <section className={styles.origin} id="origine">
          <div className={styles.originIntro}>
            <p className={styles.sectionLabel}>Pourquoi Vitalitéa</p>
            <h2>Le café ne commence pas au grain.</h2>
          </div>
          <div className={styles.originBody}>
            <p className={styles.bigCopy}>
              Une cerise de café contient le grain, mais aussi une partie du fruit habituellement écartée. Vitalitéa réunit des composants issus de cet ensemble dans une tasse qui garde le profil d’un véritable café.
            </p>
            <div className={styles.originCards}>
              <article><span>01</span><h3>Le goût reste au centre</h3><p>Une base café, des notes torréfiées et une préparation familière. Pas de goût de champignon ni de mélange aromatisé.</p></article>
              <article><span>02</span><h3>Rien d’étranger au fruit</h3><p>La formule est exclusivement issue du café et de sa cerise. Sa fonctionnalité ne vient pas d’une longue liste d’actifs ajoutés.</p></article>
              <article><span>03</span><h3>La vitalité sans grand discours</h3><p>Vitalitéa accompagne le passage du repos à l’action. La caféine est naturellement présente, comme dans un café classique.</p></article>
            </div>
          </div>
        </section>

        <section className={styles.energyStatement}>
          <p>Le matin n’a pas besoin d’une promesse impossible.</p>
          <h2>Il a besoin d’un <em>bon départ.</em></h2>
          <div className={styles.energyLine}><span>Réveil</span><i /><span>Élan</span><i /><span>Journée</span></div>
        </section>

        <section className={styles.preparation} id="preparation">
          <div className={styles.preparationVisual}>
            <Image src={productImage} alt="" width={1024} height={1536} unoptimized sizes="(max-width: 760px) 72vw, 34vw" />
            <p>Vitalitéa<br /><span>édition 01</span></p>
          </div>
          <div className={styles.preparationCopy}>
            <p className={styles.sectionLabel}>Votre tasse</p>
            <h2>Le geste que vous connaissez déjà.</h2>
            <ol>
              <li><span>01</span><div><h3>Ouvrez</h3><p>Un sachet contient la dose prévue pour une tasse : 12 g.</p></div></li>
              <li><span>02</span><div><h3>Préparez</h3><p>Utilisez votre cafetière ou votre méthode filtre habituelle.</p></div></li>
              <li><span>03</span><div><h3>Buvez à votre rythme</h3><p>Retrouvez un vrai moment de café, au début de la journée ou avant une période d’activité.</p></div></li>
            </ol>
            <div className={styles.transparency}>
              <strong>Ce que nous savons déjà</strong>
              <p>Origine Costa Rica, portion de 12 g et formule exclusivement issue du café et de son fruit.</p>
              <strong>Ce qui sera confirmé avant l’achat</strong>
              <p>Profil sensoriel du lot, caféine mesurée dans le produit fini, date de disponibilité et étiquetage complet.</p>
            </div>
          </div>
        </section>

        <section className={styles.offerBand}>
          <div><span>Prix de lancement</span><b>2 €</b><small>le sachet</small></div>
          <p>Choisissez votre quantité.<br />La livraison reste à 4 €.</p>
          <a href="#precommande">Composer ma précommande <span>↓</span></a>
        </section>

        <section className={styles.preorder} id="precommande">
          <div className={styles.preorderIntro}>
            <p className={styles.sectionLabel}>Première édition</p>
            <h2>Réservez vos matins.</h2>
            <p>
              La précommande sert à dimensionner la première production. Vous choisissez le nombre de sachets et préparez un e-mail de réservation. Aucun paiement n’est demandé aujourd’hui.
            </p>
            <ul><li>Quantité libre</li><li>Livraison fixe à 4 €</li><li>Fiche finale avant confirmation</li></ul>
          </div>
          <PreorderForm productName="Vitalitéa" theme="vitalitea" />
        </section>

        <section className={styles.faq} id="questions">
          <header><p className={styles.sectionLabel}>Questions fréquentes</p><h2>Le produit, sans zone grise.</h2></header>
          <div>
            {faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span>+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <aside className={styles.caution}>
          <strong>À savoir</strong>
          <p>Vitalitéa est une denrée alimentaire en développement, pas un médicament. Il contient naturellement de la caféine. Il est déconseillé aux enfants et aux femmes enceintes ou allaitantes. Si vous êtes sensible à la caféine, sous traitement ou concerné par une pathologie, demandez conseil à un professionnel de santé.</p>
        </aside>

        <section className={styles.next}>
          <div><p className={styles.sectionLabel}>Continuer la découverte</p><h2>Un café pour chaque envie.</h2></div>
          <div className={styles.nextLinks}>
            <Link href="/proteine/"><span>01</span><b>Café Protéiné</b><small>Routine sportive</small><i>↗</i></Link>
            <Link href="/creatine/"><span>02</span><b>Café Créatine</b><small>Effort et régularité</small><i>↗</i></Link>
            <Link href="/collagene/"><span>03</span><b>Café Collagène</b><small>Rituel beauté</small><i>↗</i></Link>
            <Link href="/mush/"><span>04</span><b>Café Mush</b><small>Pause focus</small><i>↗</i></Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <Link href="/" className={styles.mediaLink}>CAFÉ ADAPTOGÈNE</Link>
        <p>Vitalitéa. Le café du fruit entier.</p>
        <div><a href="mailto:bonjour@cafeadaptogene.com">Contact</a><Link href="/politique-affiliation/">Informations</Link></div>
        <small>© 2026 · Précommande sans paiement immédiat · Information générale, ne remplace pas un avis médical</small>
      </footer>
    </div>
  );
}
