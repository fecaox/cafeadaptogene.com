import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { siteUrl } from "../site-data";
import Quiz from "./Quiz";

export const metadata: Metadata = {
  title: "Quel café vous correspond ? Le test en 2 minutes",
  description: "Goût, composition, caféine, objectif et préparation : répondez à 7 questions pour trouver le café fonctionnel qui vous correspond.",
  alternates: { canonical: "/quel-cafe-me-correspond/" },
  openGraph: {
    title: "Quel café vous correspond ?",
    description: "Un questionnaire indépendant pour choisir entre vrai café, café enrichi et alternative fonctionnelle.",
    url: `${siteUrl}/quel-cafe-me-correspond/`,
    images: ["/og.png"],
  },
};

export default function QuizPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Quel café vous correspond ?",
    url: `${siteUrl}/quel-cafe-me-correspond/`,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Web",
    inLanguage: "fr-FR",
    description: "Questionnaire éditorial pour orienter les lecteurs parmi les familles de cafés fonctionnels.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <SiteHeader compact />
      <main className="quiz-page">
        <header className="quiz-page-head">
          <p className="eyebrow"><span /> Le sélecteur Café Adaptogène</p>
          <h1>Quel café vous<br /><em>correspond vraiment&nbsp;?</em></h1>
          <p>Sept questions, aucune marque citée pendant le test et trois résultats expliqués. Vos réponses restent dans votre navigateur et ne sont ni enregistrées ni transmises.</p>
        </header>
        <Quiz />
        <section className="quiz-method-note">
          <div><span>01</span><h2>Un outil d’orientation, pas un diagnostic.</h2></div>
          <p>Le questionnaire compare vos préférences aux caractéristiques publiques des produits. Il ne peut pas prédire votre tolérance, votre goût personnel ou un bénéfice de santé. En cas de sensibilité, traitement ou situation particulière, vérifiez la composition avec un professionnel compétent.</p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
