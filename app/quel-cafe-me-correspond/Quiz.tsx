"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { products, type ProductProfile } from "../site-data";

type AnswerMap = Record<string, string>;

const questions = [
  {
    id: "taste",
    eyebrow: "Votre tasse",
    title: "Le goût d’un véritable café est-il indispensable ?",
    note: "C’est le critère qui sépare le plus nettement un café d’une alternative.",
    options: [
      ["exact", "Oui, absolument", "Je veux reconnaître un vrai café, sans goût de céréale ou de champignon."],
      ["close", "De préférence", "J’accepte une différence légère si la formule m’intéresse."],
      ["open", "Je suis ouvert", "Cacao, chicorée ou notes végétales ne me dérangent pas."],
    ],
  },
  {
    id: "composition",
    eyebrow: "La composition",
    title: "Qu’acceptez-vous dans votre tasse ?",
    note: "Il n’y a pas de bonne réponse : ce choix détermine la famille pertinente.",
    options: [
      ["coffee-only", "Du café, rien d’autre", "La fonctionnalité doit venir du café ou de sa transformation."],
      ["mushrooms", "Des champignons ou des plantes", "Je recherche explicitement ce type d’actifs."],
      ["nutrition", "Protéines, collagène ou créatine", "Je veux rapprocher café et nutrition."],
      ["multi", "Une formule tout-en-un", "Plusieurs actifs dans une seule boisson me conviennent."],
      ["alternative", "Une alternative au café", "Chicorée, céréales ou fruit du caféier m’intéressent."],
      ["open", "Aucune préférence", "Je choisis surtout selon le résultat global."],
    ],
  },
  {
    id: "goal",
    eyebrow: "Votre priorité",
    title: "Quel usage recherchez-vous d’abord ?",
    note: "Nous parlons ici d’un objectif personnel, jamais d’un bénéfice garanti.",
    options: [
      ["ritual", "Préserver mon rituel", "Même goût, même geste, approche plus moderne."],
      ["focus", "Travail et concentration", "Une boisson cohérente avec mes périodes de travail."],
      ["steady", "Une stimulation plus mesurée", "Je souhaite mieux maîtriser ma consommation."],
      ["performance", "Nutrition et sport", "Protéines, récupération ou routine sportive."],
      ["beauty", "Collagène et routine beauté", "Je cherche une formule nutritionnelle dédiée."],
      ["weight", "Accompagner mon équilibre", "Je veux une routine simple, sans promesse miracle."],
      ["discover", "Découvrir autre chose", "Je veux explorer le caféier, les plantes ou les champignons."],
    ],
  },
  {
    id: "ritual",
    eyebrow: "La préparation",
    title: "Comment voulez-vous préparer votre boisson ?",
    note: "Un excellent produit dans un format que vous n’utilisez pas reste un mauvais choix.",
    options: [
      ["machine", "Machine ou espresso", "Je veux conserver ma machine à café."],
      ["filter", "Filtre ou cafetière", "J’aime doser et extraire mon café."],
      ["instant", "Instantané", "Eau chaude, une cuillère et c’est prêt."],
      ["infusion", "Infusion", "Je suis prêt à adopter un autre geste."],
      ["any", "Peu importe", "Je peux adapter mon rituel au produit."],
    ],
  },
  {
    id: "caffeine",
    eyebrow: "La caféine",
    title: "Quel niveau de stimulation recherchez-vous ?",
    note: "La sensibilité varie fortement ; vérifiez toujours la dose indiquée sur le produit acheté.",
    options: [
      ["classic", "Celui d’un café classique", "Je tolère mon café habituel."],
      ["reduced", "Une dose réduite", "Je souhaite rester caféiné, mais plus modérément."],
      ["none", "Sans caféine", "Je veux préserver le rituel sans stimulant."],
      ["any", "Je ne sais pas", "Ce n’est pas mon premier critère."],
    ],
  },
  {
    id: "simplicity",
    eyebrow: "La lisibilité",
    title: "Quelle importance accordez-vous à une composition courte ?",
    note: "Une formule longue peut être pertinente, mais elle doit détailler chaque actif.",
    options: [
      ["simple", "C’est essentiel", "Je préfère peu d’ingrédients et une fonction claire."],
      ["transparent", "Surtout de la transparence", "Plusieurs ingrédients me conviennent si les doses sont expliquées."],
      ["open", "Peu importe", "Je privilégie l’expérience globale."],
    ],
  },
  {
    id: "budget",
    eyebrow: "Le budget",
    title: "Comment arbitrez-vous le prix par tasse ?",
    note: "Le prix exact évolue : nous comparons ici votre niveau d’exigence général.",
    options: [
      ["value", "Le prix d’abord", "Je cherche la solution la plus accessible."],
      ["balanced", "Le meilleur équilibre", "Je peux payer davantage si la formule le justifie."],
      ["premium", "La qualité d’abord", "Je privilégie le produit qui correspond le mieux."],
      ["any", "Sans préférence", "Je déciderai après avoir vu les résultats."],
    ],
  },
] as const;

function scoreProduct(product: ProductProfile, answers: AnswerMap) {
  let score = 10;
  const reasons: string[] = [];

  if (answers.taste === "exact") {
    score += product.taste * 8;
    if (product.taste >= 4) reasons.push("un goût et un rituel proches d’un véritable café");
  } else if (answers.taste === "close") {
    score += product.taste * 5;
    if (product.taste >= 3) reasons.push("un profil encore reconnaissable pour un amateur de café");
  } else {
    score += 12;
  }

  if (answers.composition === "open") {
    score += 12;
  } else if (product.compositions.includes(answers.composition)) {
    score += 40;
    const labels: Record<string, string> = {
      "coffee-only": "une fonctionnalité qui vient principalement du café",
      mushrooms: "la présence recherchée de champignons ou de plantes",
      nutrition: "une formule orientée nutrition ou performance",
      multi: "une approche tout-en-un",
      alternative: "une vraie alternative au café conventionnel",
    };
    reasons.push(labels[answers.composition]);
  } else {
    score -= 8;
  }

  if (product.goals.includes(answers.goal)) {
    score += 32;
    const labels: Record<string, string> = {
      ritual: "la conservation de votre rituel",
      focus: "un positionnement cohérent avec les périodes de travail",
      steady: "une approche pensée autour d’une stimulation plus mesurée",
      performance: "un usage nutritionnel ou sportif lisible",
      beauty: "une formule centrée sur le collagène et la routine beauté",
      weight: "un rituel positionné sur l’équilibre, sans promesse garantie",
      discover: "une manière différente d’explorer le café et ses ingrédients",
    };
    reasons.push(labels[answers.goal]);
  }

  if (answers.ritual === "any") score += 10;
  else if (product.rituals.includes(answers.ritual)) {
    score += 18;
    reasons.push("une préparation compatible avec votre quotidien");
  } else score -= 5;

  if (answers.caffeine === "any") score += 8;
  else if (product.caffeine === answers.caffeine) {
    score += 12;
    reasons.push("un niveau de caféine correspondant à votre préférence");
  } else if (product.caffeine === "variable") score += 5;
  else if (answers.caffeine === "none" && product.id === "bonjour") {
    score += 6;
    reasons.push("l’existence d’une variante Cacao Decaf distincte à sélectionner");
  } else score -= 5;

  if (answers.simplicity === "simple") {
    score += product.simplicity * 4;
    if (product.simplicity >= 4) reasons.push("une composition particulièrement courte");
  } else if (answers.simplicity === "transparent") {
    score += product.simplicity * 2.4;
  } else score += 8;

  if (answers.budget === "any") score += 5;
  else if (product.priceTier === answers.budget) score += 8;
  else if (answers.budget === "premium") score += 4;

  return { product, score, reasons: reasons.slice(0, 4) };
}

function maximumScore(answers: AnswerMap) {
  return 10
    + (answers.taste === "exact" ? 40 : answers.taste === "close" ? 25 : 12)
    + (answers.composition === "open" ? 12 : 40)
    + 32
    + (answers.ritual === "any" ? 10 : 18)
    + (answers.caffeine === "any" ? 8 : 12)
    + (answers.simplicity === "simple" ? 20 : answers.simplicity === "transparent" ? 12 : 8)
    + (answers.budget === "any" ? 5 : 8);
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const finished = step >= questions.length;
  const current = questions[Math.min(step, questions.length - 1)];

  const results = useMemo(() => {
    if (!finished) return [];
    const max = maximumScore(answers);
    return products
      .map((product) => scoreProduct(product, answers))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((result) => ({ ...result, match: Math.max(42, Math.min(97, Math.round((result.score / max) * 100))) }));
  }, [answers, finished]);

  function choose(value: string) {
    setAnswers((previous) => ({ ...previous, [current.id]: value }));
  }

  function next() {
    if (!answers[current.id]) return;
    setStep((previous) => previous + 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
  }

  if (finished) {
    return (
      <section className="quiz-results" aria-live="polite">
        <div className="results-heading">
          <p className="eyebrow light"><span /> Votre profil est prêt</p>
          <h2>{answers.taste === "exact" ? "Vous voulez du fonctionnel, sans renoncer au café." : "Votre café doit s’adapter à votre usage."}</h2>
          <p>Le score mesure la correspondance avec vos réponses. Il ne mesure ni un effet médical ni une supériorité absolue.</p>
        </div>
        {answers.caffeine === "none" && (
          <div className="no-exact-match"><b>Attention au choix sans caféine.</b> Vérifiez la référence exacte avant achat : certaines marques proposent plusieurs recettes dont la teneur en caféine diffère.</div>
        )}
        <div className="result-list">
          {results.map((result, index) => {
            const commercial = result.product.relationship === "partenaire";
            return (
              <article className={`result-card result-${index + 1}`} key={result.product.id}>
                <div className="result-rank"><span>{index === 0 ? "Meilleure correspondance" : index === 1 ? "Alternative proche" : "Autre piste"}</span><b>{String(index + 1).padStart(2, "0")}</b></div>
                <div className="result-image"><Image src={result.product.image} alt={result.product.imageAlt} width={620} height={620} /></div>
                <div className="result-copy">
                  <p>{result.product.category}</p>
                  <h3>{result.product.name}</h3>
                  <strong>{result.match}% de correspondance</strong>
                  <div className="match-bar"><i style={{ width: `${result.match}%` }} /></div>
                  <h4>Pourquoi ce résultat</h4>
                  <ul>{result.reasons.length ? result.reasons.map((reason) => <li key={reason}>{reason}</li>) : <li>la meilleure compatibilité globale parmi les produits documentés</li>}</ul>
                  <div className="result-caution"><b>Point à vérifier</b><span>{result.product.limits[0]}</span></div>
                  <a href={result.product.link} target="_blank" rel={commercial ? "sponsored nofollow noopener" : "nofollow noopener"}>
                    Voir {result.product.name} <span>↗</span>{commercial && <em>Lien partenaire</em>}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
        <div className="results-actions">
          <button type="button" onClick={restart}>Recommencer le test</button>
          <Link href="/methodologie/">Comprendre le calcul ↗</Link>
        </div>
        <p className="results-disclosure">Les relations commerciales n’entrent pas dans le calcul. Torrégral, Café Intégral et Café Minceur sont liés à l’écosystème éditorial du site ; cette relation est affichée lorsqu’un de ces produits apparaît.</p>
      </section>
    );
  }

  return (
    <section className="quiz-shell">
      <div className="quiz-progress" aria-label={`Question ${step + 1} sur ${questions.length}`}>
        <span>Question {String(step + 1).padStart(2, "0")} / {String(questions.length).padStart(2, "0")}</span>
        <div>{questions.map((question, index) => <i className={index <= step ? "active" : ""} key={question.id} />)}</div>
        <small>Environ 2 minutes</small>
      </div>
      <div className="quiz-question">
        <p className="eyebrow"><span /> {current.eyebrow}</p>
        <h2>{current.title}</h2>
        <p>{current.note}</p>
        <div className="quiz-options" role="radiogroup" aria-label={current.title}>
          {current.options.map(([value, label, description], index) => (
            <button
              type="button"
              role="radio"
              aria-checked={answers[current.id] === value}
              className={answers[current.id] === value ? "selected" : ""}
              onClick={() => choose(value)}
              key={value}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><b>{label}</b><small>{description}</small></div>
              <i />
            </button>
          ))}
        </div>
        <div className="quiz-navigation">
          <button type="button" className="quiz-back" disabled={step === 0} onClick={() => setStep((previous) => Math.max(0, previous - 1))}>← Précédent</button>
          <button type="button" className="quiz-next" disabled={!answers[current.id]} onClick={next}>{step === questions.length - 1 ? "Voir mes résultats" : "Continuer"} <span>→</span></button>
        </div>
      </div>
      <aside className="quiz-principle">
        <span>Notre principe</span>
        <blockquote>La catégorie vient avant la marque.</blockquote>
        <p>Une recherche de protéines ne conduira pas vers un café aux champignons. Un goût de vrai café ne conduira pas vers une chicorée simplement parce qu’elle est populaire.</p>
      </aside>
    </section>
  );
}
