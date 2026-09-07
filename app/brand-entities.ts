export type BrandFactStatus = "documenté" | "déclaré" | "estimé" | "non publié";

export type BrandEntity = {
  slug: string;
  name: string;
  productName: string;
  category: string;
  canonicalPath: string;
  officialUrl: string;
  image: string;
  imageAlt: string;
  color: string;
  monogram: string;
  summary: string;
  answer: string;
  relationship: string;
  facts: { label: string; value: string; status: BrandFactStatus }[];
  suitableFor: string[];
  notSuitableFor: string[];
  evidence: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
  related: { label: string; path: string }[];
  updated: string;
};

export const brandEntities: BrandEntity[] = [
  {
    slug: "torregral",
    name: "Torrégral",
    productName: "Café premium nouvelle génération",
    category: "Café intrinsèquement fonctionnel",
    canonicalPath: "/torregral/",
    officialUrl: "https://www.torregral.com/",
    image: "/images/products/torregral-packaging.jpg",
    imageAlt: "Paquet de café Torrégral",
    color: "copper",
    monogram: "T",
    summary: "Torrégral est un café moulu d’origine Costa Rica, dosé à 12 g par tasse et composé exclusivement d’ingrédients issus du café et de son fruit.",
    answer: "Torrégral est un choix cohérent pour une personne qui veut conserver le goût, la caféine et le rituel d’un véritable café tout en recherchant une approche fonctionnelle sans champignons, protéines ou plantes ajoutés.",
    relationship: "Cette fiche peut contenir un lien commercial signalé comme tel. Il n’ajoute aucun point aux comparatifs ni au questionnaire.",
    facts: [
      { label: "Portion", value: "12 g de produit sec par tasse", status: "documenté" },
      { label: "Origine", value: "Costa Rica", status: "documenté" },
      { label: "Composition", value: "Exclusivement issue du café et de son fruit", status: "déclaré" },
      { label: "Caféine", value: "Environ 120 à 140 mg dans la dose sèche", status: "estimé" },
      { label: "Préparation", value: "Café moulu, filtre ou méthode compatible", status: "déclaré" },
    ],
    suitableFor: ["Conserver un goût de café familier", "Éviter les mélanges aux champignons ou arômes", "Préserver un rituel de café moulu", "Choisir une formule entièrement issue du caféier"],
    notSuitableFor: ["Rechercher une boisson sans caféine", "Vouloir un café instantané", "Éviter toute caféine", "Attendre une preuve clinique sur le produit fini"],
    evidence: [
      { title: "Ce qui est établi", text: "La portion, l’origine et la nature exclusivement caféière de la recette sont documentées ou déclarées par la marque." },
      { title: "Ce qui est calculé", text: "Plusieurs valeurs par portion proviennent d’analyses de la matière première et d’un calcul appliqué à la dose de 12 g." },
      { title: "Ce qui reste à mesurer", text: "La caféine du Torrégral fini et de la tasse préparée doit encore être mesurée selon un protocole reproductible." },
    ],
    faq: [
      { question: "Torrégral est-il un vrai café ?", answer: "Oui. Il est présenté comme un café moulu dont tous les ingrédients proviennent du café et de son fruit." },
      { question: "Torrégral contient-il des champignons ?", answer: "Non. La composition communiquée ne contient ni champignon, ni plante adaptogène, ni protéine ajoutée." },
      { question: "Quel goût a Torrégral ?", answer: "Il est conçu pour conserver un profil et un rituel proches d’un café classique. La perception gustative reste personnelle." },
      { question: "Torrégral est-il le meilleur café fonctionnel ?", answer: "Il n’existe pas de meilleur produit universel. Torrégral est particulièrement pertinent si le goût d’un vrai café et une composition exclusivement issue du caféier sont prioritaires." },
    ],
    related: [{ label: "Fiche complète et valeurs par tasse", path: "/torregral/" }, { label: "Comparer les cafés nouvelle génération", path: "/cafe-nouvelle-generation/" }, { label: "Trouver son café", path: "/quel-cafe-me-correspond/" }],
    updated: "25 août 2026",
  },
  {
    slug: "cafe-integral",
    name: "Café Intégral",
    productName: "Café Intégral 100 %",
    category: "Produit issu de la cerise de café",
    canonicalPath: "/marques/cafe-integral/",
    officialUrl: "https://www.cafeintegral.fr/",
    image: "/images/products/cafeintegral-packaging.jpg",
    imageAlt: "Paquet Café Intégral à base de cerise de café",
    color: "sage",
    monogram: "CI",
    summary: "Café Intégral valorise le fruit du caféier dans un produit à infuser, distinct d’un espresso ou d’un café torréfié conventionnel.",
    answer: "Café Intégral correspond surtout aux personnes qui souhaitent découvrir une autre expression du fruit du caféier. Il ne doit pas être présenté comme un substitut gustatif exact à l’espresso.",
    relationship: "Cette fiche peut contenir un lien commercial signalé comme tel. Les informations factuelles et leurs limites restent évaluées avec la même méthode.",
    facts: [
      { label: "Catégorie", value: "Produit à base du fruit du caféier", status: "déclaré" },
      { label: "Usage", value: "Infusion", status: "déclaré" },
      { label: "Format observé", value: "50 g", status: "documenté" },
      { label: "Dose conseillée", value: "Non publiée sur la source consultée", status: "non publié" },
      { label: "Caféine par portion", value: "Non publiée", status: "non publié" },
    ],
    suitableFor: ["Découvrir le fruit du caféier au-delà du grain torréfié", "Préférer une préparation en infusion", "Rechercher une composition courte", "Explorer les dérivés de la cerise de café"],
    notSuitableFor: ["Reproduire exactement un espresso", "Exiger une dose de caféine publiée par tasse", "Chercher une dosette ou un café soluble classique", "Attendre une allégation santé démontrée sur le produit fini"],
    evidence: [
      { title: "Identité du produit", text: "La fiche le classe volontairement parmi les produits issus de la cerise de café, et non parmi les cafés torréfiés conventionnels." },
      { title: "Analyses disponibles", text: "Des analyses de matière première documentent plusieurs paramètres chimiques et nutritionnels, avec leurs dates et leurs limites." },
      { title: "Données manquantes", text: "La dose d’usage et la caféine par portion doivent rester indiquées comme non publiées tant qu’une source produit récente ne les précise pas." },
    ],
    faq: [
      { question: "Café Intégral est-il un café classique ?", answer: "Non. Dans notre classification, il s’agit d’un produit issu de la cerise de café, préparé comme une infusion et distinct d’un café torréfié classique." },
      { question: "Café Intégral contient-il de la caféine ?", answer: "Le fruit du caféier peut contenir de la caféine, mais la quantité par portion du produit commercial n’est pas publiée dans la source consultée." },
      { question: "À qui Café Intégral correspond-il le mieux ?", answer: "Aux personnes curieuses d’explorer le fruit du caféier au-delà du grain torréfié et qui acceptent un goût et un rituel différents de l’espresso." },
    ],
    related: [{ label: "Comprendre les produits de la cerise de café", path: "/produits-cerise-cafe/" }, { label: "Découvrir Torrégral", path: "/torregral/" }, { label: "Voir la méthodologie", path: "/methodologie/" }],
    updated: "25 août 2026",
  },
  {
    slug: "cafe-minceur",
    name: "Café Minceur",
    productName: "Café Minceur",
    category: "Café intrinsèquement fonctionnel",
    canonicalPath: "/marques/cafe-minceur/",
    officialUrl: "https://www.cafeminceur.fr/",
    image: "/images/products/cafeminceur-packaging.jpg",
    imageAlt: "Paquet Café Minceur avec cuillère doseuse",
    color: "rose",
    monogram: "CM",
    summary: "Café Minceur est une préparation de 10 g par tasse composée de café torréfié, café vert, cascara et poudre de cerise de café.",
    answer: "Café Minceur peut s’intégrer à une routine si l’utilisateur veut conserver un goût de café et une préparation simple. Son nom ne doit toutefois pas être interprété comme une garantie de perte de poids.",
    relationship: "Cette fiche peut contenir un lien commercial signalé comme tel. La marque est évaluée avec les mêmes critères que les autres références et ne reçoit aucun avantage automatique.",
    facts: [
      { label: "Portion", value: "10 g par tasse", status: "documenté" },
      { label: "Format", value: "70 g, soit 7 tasses annoncées", status: "documenté" },
      { label: "Composition", value: "Café torréfié, café vert, cascara et poudre de cerise de café", status: "déclaré" },
      { label: "Origine des ingrédients", value: "Entièrement issus de la cerise de café", status: "déclaré" },
      { label: "Caféine par portion", value: "Non publiée", status: "non publié" },
    ],
    suitableFor: ["Conserver un goût de café familier", "Installer une portion simple dans une routine", "Choisir une formule issue du seul fruit du caféier", "Comparer un coût par tasse explicite"],
    notSuitableFor: ["Chercher une garantie de perte de poids", "Éviter toute caféine", "Exiger les proportions détaillées de chaque ingrédient", "Attendre une efficacité clinique démontrée du mélange fini"],
    evidence: [
      { title: "Ce que la fiche publie", text: "La portion de 10 g, le format de 70 g et la liste des familles d’ingrédients sont affichés clairement." },
      { title: "Ce que le nom ne prouve pas", text: "Aucun café ne provoque à lui seul une perte de poids garantie. Les habitudes alimentaires, l’activité et le contexte global restent déterminants." },
      { title: "Ce qui manque", text: "Les proportions de la recette et la caféine par tasse ne sont pas publiées dans les sources actuellement examinées." },
    ],
    faq: [
      { question: "Café Minceur fait-il perdre du poids ?", answer: "Aucun café ne garantit une perte de poids. Le produit peut seulement s’inscrire dans une routine globale adaptée à la personne." },
      { question: "Quelle quantité utiliser ?", answer: "La portion indiquée est de 10 g par tasse ; le format de 70 g correspond à sept tasses annoncées." },
      { question: "Café Minceur contient-il autre chose que du caféier ?", answer: "La composition communiquée associe café torréfié, café vert, cascara et poudre de cerise de café." },
    ],
    related: [{ label: "Comprendre le café minceur", path: "/cafe-minceur/" }, { label: "Comparer les cafés fonctionnels", path: "/comparatif-cafe-adaptogene/" }, { label: "Trouver son café", path: "/quel-cafe-me-correspond/" }],
    updated: "25 août 2026",
  },
];

export const detailedBrandEntities = brandEntities.filter((brand) => brand.canonicalPath.startsWith("/marques/"));

export function getBrandEntity(slug: string) {
  return brandEntities.find((brand) => brand.slug === slug);
}
