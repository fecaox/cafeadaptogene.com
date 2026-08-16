export type LandingSlug = "proteine" | "creatine" | "collagene" | "mush";

export type LandingProduct = {
  slug: LandingSlug;
  theme: LandingSlug;
  shortName: string;
  productName: string;
  animalName: string;
  eyebrow: string;
  headline: string;
  lead: string;
  promise: string;
  packImage: string;
  packAlt: string;
  animalImage: string;
  animalAlt: string;
  ingredients: string[];
  moments: { number: string; title: string; text: string }[];
  features: { kicker: string; title: string; text: string }[];
  ritualTitle: string;
  ritualText: string;
  manifesto: string;
  disclaimer: string;
  faq: { question: string; answer: string }[];
};

export const landingProducts: Record<LandingSlug, LandingProduct> = {
  proteine: {
    slug: "proteine",
    theme: "proteine",
    shortName: "Protéine",
    productName: "Café Protéiné",
    animalName: "L'instinct du lion",
    eyebrow: "Café Arabica × whey naturelle",
    headline: "Le café qui entre dans votre routine sportive.",
    lead: "Le plaisir d'un vrai café et une formule enrichie en protéines, réunis dans un sachet individuel simple à emporter.",
    promise: "Énergie. Protéines. Plaisir.",
    packImage: "/images/landing/proteine-pack.jpg",
    packAlt: "Sachet individuel Café Protéiné Café Adaptogène",
    animalImage: "/images/landing/proteine-lion.jpg",
    animalAlt: "Lion athlétique tenant une tasse de café et un haltère",
    ingredients: ["Café Arabica", "Whey naturelle", "Sans sucres ajoutés"],
    moments: [
      { number: "06:45", title: "Avant la journée", text: "Un rituel café familier lorsque la matinée commence vite." },
      { number: "10:30", title: "Après l'entraînement", text: "Une option nomade pensée pour réunir café et nutrition sportive." },
      { number: "16:00", title: "Pause active", text: "Le goût du café, sans transformer la pause en shaker classique." },
    ],
    features: [
      { kicker: "Le goût d'abord", title: "Un café, pas un dessert", text: "Une base Arabica et une formule sans sucres ajoutés, conçues pour préserver un profil café." },
      { kicker: "Format nomade", title: "Un sachet. Une tasse.", text: "Pas de pot encombrant ni de mesure à improviser : le format individuel suit votre rythme." },
      { kicker: "Routine simplifiée", title: "Deux habitudes, un geste", text: "L'idée est simple : rapprocher la pause café et l'univers protéiné dans une seule préparation." },
    ],
    ritualTitle: "Nourrir l'élan, garder le plaisir.",
    ritualText: "Le lion n'est pas ici pour promettre un résultat magique. Il incarne une routine assumée : régulière, forte et compatible avec le plaisir d'un café.",
    manifesto: "Votre café ne remplace ni un repas équilibré ni votre programme. Il peut simplement mieux s'accorder avec la vie que vous avez choisie.",
    disclaimer: "La teneur finale en protéines et les informations nutritionnelles seront communiquées avant la confirmation définitive de la précommande.",
    faq: [
      { question: "Est-ce un café ou un shaker ?", answer: "La formule est pensée comme un café Arabica enrichi en whey naturelle, à préparer et boire comme une pause café." },
      { question: "Combien de protéines contient un sachet ?", answer: "Le dosage final est en cours de validation. Il sera affiché avec le tableau nutritionnel avant toute confirmation et tout paiement." },
      { question: "La formule contient-elle du sucre ajouté ?", answer: "Le packaging indique une formule sans sucres ajoutés. Les sucres naturellement présents seront précisés dans le tableau nutritionnel final." },
      { question: "Y a-t-il un allergène ?", answer: "La whey est issue du lait. L'étiquetage complet des allergènes sera fourni avant confirmation de la commande." },
    ],
  },
  creatine: {
    slug: "creatine",
    theme: "creatine",
    shortName: "Créatine",
    productName: "Café Créatine",
    animalName: "Le protocole du gorille",
    eyebrow: "Café Arabica × créatine pure",
    headline: "Activez le mode puissance.",
    lead: "Un café intense et un format individuel pensé pour celles et ceux qui organisent leur journée autour de l'effort.",
    promise: "Force. Puissance. Performance.",
    packImage: "/images/landing/creatine-pack.jpg",
    packAlt: "Sachet individuel Café Créatine Café Adaptogène",
    animalImage: "/images/landing/creatine-gorille.jpg",
    animalAlt: "Gorille musclé dans un univers rouge et noir",
    ingredients: ["Café Arabica", "Créatine pure", "Sans sucres ajoutés"],
    moments: [
      { number: "01", title: "Déchirer", text: "Ouvrez le sachet individuel quand votre protocole l'exige." },
      { number: "02", title: "Infuser", text: "Préparez votre café avec la quantité d'eau adaptée à votre intensité." },
      { number: "03", title: "Exécuter", text: "Gardez une routine régulière et mesurable, sans discours magique." },
    ],
    features: [
      { kicker: "Formule directe", title: "Pas de détour", text: "Une base Arabica, de la créatine pure et aucun sucre ajouté annoncé sur le packaging." },
      { kicker: "Rituel discipliné", title: "Pensé pour la régularité", text: "Le sachet individuel facilite le transport et aide à conserver un geste constant." },
      { kicker: "Transparence", title: "Le chiffre avant la promesse", text: "Le dosage final sera publié avant validation : pas d'effet revendiqué sans quantité vérifiable." },
    ],
    ritualTitle: "La puissance aime les protocoles simples.",
    ritualText: "Le gorille représente la force brute. Le produit, lui, doit rester précis : une composition lisible, une portion claire et aucune promesse au-delà de la formule finale.",
    manifesto: "Ce n'est pas un raccourci. C'est un café conçu pour trouver sa place dans une routine d'entraînement déjà construite.",
    disclaimer: "La créatine n'autorisera une allégation de performance que si la portion quotidienne finale atteint les conditions réglementaires applicables. Le dosage sera communiqué avant confirmation.",
    faq: [
      { question: "Quelle quantité de créatine contient un sachet ?", answer: "Le dosage final est encore en validation. Il sera indiqué en grammes avant confirmation définitive de la précommande." },
      { question: "Puis-je le boire les jours sans entraînement ?", answer: "La page ne fournit pas de protocole personnalisé. La fréquence dépendra de la dose finale, de vos autres apports et, si nécessaire, de l'avis d'un professionnel." },
      { question: "Le café contient-il de la caféine ?", answer: "Oui, puisqu'il repose sur du café Arabica. La quantité exacte de caféine par sachet sera publiée avec la fiche finale." },
      { question: "Est-ce adapté à tout le monde ?", answer: "Non. Grossesse, allaitement, mineurs, pathologie, traitement ou sensibilité à la caféine nécessitent une vigilance et éventuellement un avis professionnel." },
    ],
  },
  collagene: {
    slug: "collagene",
    theme: "collagene",
    shortName: "Collagène",
    productName: "Café Collagène",
    animalName: "Le rituel du cerf",
    eyebrow: "Café Arabica × collagène marin",
    headline: "Votre café devient un rituel précieux.",
    lead: "Une tasse quotidienne inspirée par l'élégance du cerf : Arabica, collagène marin et acide hyaluronique dans un format individuel raffiné.",
    promise: "Éclat. Fermeté. Régénération.",
    packImage: "/images/landing/collagene-pack.jpg",
    packAlt: "Sachet individuel Café Collagène Café Adaptogène",
    animalImage: "/images/landing/collagene-cerf.jpg",
    animalAlt: "Cerf doré dans une lumière douce et luxueuse",
    ingredients: ["Café Arabica", "Collagène marin", "Acide hyaluronique", "Sans sucres ajoutés"],
    moments: [
      { number: "I", title: "Un instant à soi", text: "Créer une pause qui ne ressemble ni à une gélule ni à une contrainte." },
      { number: "II", title: "Un geste quotidien", text: "Un sachet individuel pour intégrer facilement le rituel à la matinée." },
      { number: "III", title: "Une formule lisible", text: "Chaque quantité finale sera révélée avant la confirmation de commande." },
    ],
    features: [
      { kicker: "La base", title: "Arabica délicat", text: "Le rituel commence par un véritable café, dans une formule annoncée sans sucres ajoutés." },
      { kicker: "Le complexe", title: "Collagène marin", text: "Associé à de l'acide hyaluronique dans une formule dont les dosages finaux seront publiés." },
      { kicker: "L'intention", title: "Beauté sans surpromesse", text: "Un univers inspiré de l'éclat et de la constance, sans présenter la tasse comme un traitement." },
    ],
    ritualTitle: "L'élégance est une habitude.",
    ritualText: "Le cerf incarne le renouvellement, la finesse et la présence. Il donne au café son territoire visuel ; seule la composition finale déterminera ce que le produit peut légalement revendiquer.",
    manifesto: "Une belle routine commence par un plaisir que l'on a envie de retrouver — pas par une promesse impossible à mesurer.",
    disclaimer: "Les quantités de collagène marin et d'acide hyaluronique, l'origine détaillée et les allergènes seront communiqués avant confirmation définitive.",
    faq: [
      { question: "Quel type de collagène est utilisé ?", answer: "La formule est annoncée avec du collagène marin. L'origine, le type et la quantité exacts seront précisés sur la fiche finale." },
      { question: "Le collagène modifie-t-il le goût du café ?", answer: "La formule est développée pour conserver une expérience café. Le profil sensoriel définitif sera décrit après validation du produit fini." },
      { question: "Ce café garantit-il un effet sur la peau ?", answer: "Non. La présence d'un ingrédient ne garantit pas un résultat individuel. La page ne présente pas le produit comme un traitement médical ou dermatologique." },
      { question: "La formule convient-elle aux végétariens ?", answer: "Non, le collagène annoncé est d'origine marine." },
    ],
  },
  mush: {
    slug: "mush",
    theme: "mush",
    shortName: "Mush",
    productName: "Café Mush",
    animalName: "Le professeur Mush",
    eyebrow: "Café Arabica × champignons adaptogènes",
    headline: "Réveillez la bonne idée.",
    lead: "Un café joyeux et curieux, imaginé pour les matins où l'on veut installer un rituel de concentration sans rendre la tasse austère.",
    promise: "Focus. Équilibre. Naturellement.",
    packImage: "/images/landing/mush-pack.jpg",
    packAlt: "Sachet individuel Café Mush Café Adaptogène",
    animalImage: "/images/landing/mush-character.jpg",
    animalAlt: "Champignon savant avec lunettes, toque universitaire et livre",
    ingredients: ["Café Arabica", "Champignons adaptogènes", "Sans sucres ajoutés"],
    moments: [
      { number: "A", title: "Ouvrir le chapitre", text: "Un sachet individuel pour commencer sans peser ni doser." },
      { number: "B", title: "Faire infuser l'idée", text: "Une pause café qui marque le passage vers un temps de travail concentré." },
      { number: "C", title: "Revenir au livre", text: "Un rituel simple n'effectue pas le travail à votre place : il aide à en donner le signal." },
    ],
    features: [
      { kicker: "Vrai café", title: "L'Arabica reste au programme", text: "La formule est conçue autour du goût du café, avec des champignons ajoutés et une recette annoncée sans sucres ajoutés." },
      { kicker: "Rituel focus", title: "Un signal pour le cerveau", text: "Le professeur Mush associe la tasse au moment où l'on coupe les distractions et où l'on commence." },
      { kicker: "Formule à publier", title: "Les espèces comptent", text: "Espèces, formes d'extraits et dosages seront affichés avant confirmation de la précommande." },
    ],
    ritualTitle: "La concentration commence par un rendez-vous.",
    ritualText: "Le professeur Mush ne vous promet pas un nouveau cerveau. Il vous invite à créer un repère : une tasse, une intention, une tâche importante.",
    manifesto: "Le meilleur rituel de focus n'est pas spectaculaire. C'est celui que l'on peut répéter quand le monde réclame notre attention.",
    disclaimer: "Les espèces de champignons, leurs formes, parties utilisées et dosages exacts seront publiés avant validation définitive. Les mots focus et clarté décrivent le positionnement du rituel, pas un résultat garanti.",
    faq: [
      { question: "Quels champignons contient Café Mush ?", answer: "La sélection finale est encore en validation. Chaque espèce, partie utilisée, forme d'extrait et quantité sera publiée avant confirmation." },
      { question: "Est-ce que le produit a un goût de champignon ?", answer: "L'objectif de formulation est de conserver une expérience de café Arabica. Le profil gustatif final sera décrit après validation." },
      { question: "Le produit améliore-t-il réellement la mémoire ?", answer: "Aucun résultat individuel n'est garanti. Une étude sur un ingrédient ne démontre pas automatiquement l'effet du mélange fini, surtout avant publication des doses." },
      { question: "Café Mush contient-il de la caféine ?", answer: "Oui, sa base est un café Arabica. La quantité précise par sachet sera publiée avec la composition définitive." },
    ],
  },
};

export const landingSlugs = Object.keys(landingProducts) as LandingSlug[];
