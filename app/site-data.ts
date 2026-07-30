export const siteUrl = "https://cafeadaptogene.com";

export type Guide = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  color: string;
  icon: string;
  keyPoints: string[];
  criteria: { title: string; text: string }[];
  faq: { question: string; answer: string }[];
};

export const guides: Guide[] = [
  {
    slug: "guide-cafe-adaptogene",
    eyebrow: "Guide essentiel",
    title: "Café adaptogène : comprendre, comparer et bien choisir",
    description: "Le guide français pour comprendre les cafés adaptogènes, lire les compositions et comparer les formules sans confondre promesse et preuve.",
    intro: "Un café adaptogène associe généralement une base torréfiée — café, chicorée, orge ou cacao — à des champignons fonctionnels et parfois à des plantes dites adaptogènes. La catégorie est récente, très hétérogène et encore mal définie : deux produits portant le même nom peuvent avoir des compositions, des dosages et des niveaux de caféine radicalement différents.",
    color: "sage",
    icon: "A",
    keyPoints: ["Base réellement caféinée ou substitut", "Quantités par tasse, pas seulement par sachet", "Extrait, corps fructifère et traçabilité", "Prix par portion à dose recommandée"],
    criteria: [
      { title: "Commencer par l’étiquette", text: "Nous relevons la liste complète des ingrédients, la quantité par portion et le type d’extrait lorsque la marque le précise." },
      { title: "Comparer le comparable", text: "Un café soluble, une chicorée au cacao et un arabica moulu ne procurent ni le même goût ni le même rituel. Nous les classons séparément." },
      { title: "Garder la preuve en vue", text: "Les études sur un ingrédient isolé ne démontrent pas automatiquement l’effet du mélange fini. Nous signalons ce décalage." },
    ],
    faq: [
      { question: "Un café adaptogène est-il toujours un vrai café ?", answer: "Non. Certaines formules contiennent du café soluble ou moulu ; d’autres reposent surtout sur la chicorée, l’orge ou le cacao avec un ajout de caféine." },
      { question: "Le goût ressemble-t-il à un espresso ?", answer: "Rarement à l’identique. Les formules riches en chicorée, cacao ou poudres végétales sont souvent plus rondes et se rapprochent d’un latte." },
      { question: "Peut-on en boire tous les jours ?", answer: "Cela dépend de la composition, de votre sensibilité et de vos traitements. Vérifiez la caféine totale et demandez un avis professionnel en cas de grossesse, de pathologie ou de traitement." },
    ],
  },
  {
    slug: "cafe-champignon",
    eyebrow: "Comparatif catégorie",
    title: "Café aux champignons : Lion’s Mane, Chaga, Reishi… que comparer ?",
    description: "Comparatif des cafés aux champignons disponibles en France : base, extraits, dosages, caféine, goût et prix par tasse.",
    intro: "Le « mushroom coffee » est l’une des catégories emblématiques du café fonctionnel. Derrière l’image du champignon se cachent pourtant plusieurs réalités : café arabica enrichi, latte instantané, chicorée cacaotée ou boisson presque sans caféine. La bonne question n’est pas seulement “combien de champignons ?”, mais lesquels, sous quelle forme et dans quelle boisson.",
    color: "copper",
    icon: "M",
    keyPoints: ["Espèces et quantités détaillées", "Corps fructifère ou mycélium", "Méthode d’extraction documentée", "Goût, solubilité et sucres ajoutés"],
    criteria: [
      { title: "Lion’s Mane", text: "Souvent positionné sur le focus. Nous distinguons la littérature sur l’ingrédient des bénéfices réellement démontrés pour la formule vendue." },
      { title: "Chaga, Reishi, Cordyceps", text: "Leur présence ne suffit pas : provenance, partie utilisée, extraction et quantité par tasse comptent davantage qu’une longue liste." },
      { title: "La matrice de la boisson", text: "Cacao, chicorée, fibres, lait de coco ou arômes influencent fortement la digestion, les calories et le profil gustatif." },
    ],
    faq: [
      { question: "Le café aux champignons a-t-il un goût de champignon ?", answer: "Les marques cherchent généralement à masquer cette note par le café, le cacao ou la chicorée. Le résultat varie d’un espresso léger à un latte plus gourmand." },
      { question: "Plus de milligrammes signifie-t-il meilleur ?", answer: "Pas nécessairement. La nature de l’extrait, sa standardisation et la transparence du fabricant sont aussi importantes que la masse annoncée." },
      { question: "Est-ce la même chose qu’un complément alimentaire ?", answer: "Pas toujours juridiquement ni dans l’usage, mais ces boissons peuvent contenir des ingrédients concentrés. Les mêmes réflexes de prudence restent utiles." },
    ],
  },
  {
    slug: "cafe-focus",
    eyebrow: "Choisir par objectif",
    title: "Café focus : les formules pensées pour la concentration",
    description: "Café focus, nootropiques et énergie mentale : comment comparer caféine, L-théanine, Lion’s Mane et extraits de café.",
    intro: "Les cafés “focus” promettent une attention plus stable que le café classique. Les formules combinent souvent caféine modérée, L-théanine, Lion’s Mane, polyphénols ou plantes. Pour les départager, nous examinons d’abord la dose de caféine, la transparence des actifs et la plausibilité de la formule — pas le vocabulaire marketing.",
    color: "blue",
    icon: "F",
    keyPoints: ["Caféine clairement quantifiée", "Actifs et doses par tasse", "Pas de mélange propriétaire opaque", "Compatibilité avec votre rythme"],
    criteria: [
      { title: "Pour le travail profond", text: "Une stimulation prévisible vaut souvent mieux qu’une liste interminable d’actifs. Les profils sobres et documentés gagnent des points." },
      { title: "Pour réduire le café", text: "Une formule à faible teneur en caféine peut aider à conserver le rituel, mais ne garantit pas l’absence de nervosité chez les personnes sensibles." },
      { title: "Notre repère éditorial", text: "Torrégral mérite une place dédiée pour son angle café nouvelle génération et focus ; il reste évalué selon la même grille que les autres marques." },
    ],
    faq: [
      { question: "Un café focus est-il un nootropique ?", answer: "Le terme est souvent utilisé commercialement. Il ne constitue pas à lui seul une preuve d’efficacité ni une catégorie réglementaire homogène." },
      { question: "Faut-il éviter d’en boire l’après-midi ?", answer: "Si la formule contient de la caféine, oui pour de nombreuses personnes : même une dose modérée peut perturber le sommeil lorsqu’elle est prise tard." },
      { question: "Pourquoi comparer la caféine en premier ?", answer: "Parce qu’elle a un effet stimulant bien établi et qu’elle explique souvent une grande partie du ressenti immédiat attribué au produit." },
    ],
  },
  {
    slug: "cafe-sans-crash",
    eyebrow: "Choisir par ressenti",
    title: "Café sans crash : ce que la formule peut — et ne peut pas — garantir",
    description: "Guide des cafés à énergie plus progressive : caféine modérée, L-théanine, fibres, chicorée et alternatives au café classique.",
    intro: "“Sans crash” décrit une attente, pas une catégorie scientifique. Le ressenti dépend de la dose, de la vitesse de consommation, du sommeil, de l’alimentation et de la sensibilité individuelle. Nous privilégions donc les marques qui quantifient leur caféine et évitent les promesses absolues.",
    color: "sand",
    icon: "S",
    keyPoints: ["Dose de caféine modérée", "Sucres ajoutés et calories", "Moment et contexte de consommation", "Promesses formulées avec mesure"],
    criteria: [
      { title: "Moins n’est pas zéro", text: "Une dose réduite peut être plus facile à tolérer, mais une personne très sensible peut ressentir agitation ou sommeil perturbé." },
      { title: "Le rôle du rituel", text: "Boire plus lentement, accompagner la tasse d’un repas et éviter l’accumulation d’autres sources de caféine modifient aussi l’expérience." },
      { title: "Alternatives sans café", text: "Chicorée, orge et lupin peuvent préserver le geste et les notes torréfiées, avec des profils de caféine très différents." },
    ],
    faq: [
      { question: "Existe-t-il un café garanti sans crash ?", answer: "Non. Aucune formule ne peut garantir un ressenti identique pour tous. La dose de caféine et votre sensibilité restent déterminantes." },
      { question: "La L-théanine annule-t-elle les effets de la caféine ?", answer: "Non. Elle est souvent associée à la caféine, mais ne rend pas une dose élevée neutre et ne remplace pas l’attention portée au sommeil." },
      { question: "Une boisson sans caféine est-elle toujours plus saine ?", answer: "Pas automatiquement : il faut aussi regarder les sucres, arômes, allergènes, calories et autres actifs ajoutés." },
    ],
  },
  {
    slug: "cafe-collagene",
    eyebrow: "Comparatif catégorie",
    title: "Café collagène : beauté, protéines et boisson chaude",
    description: "Comment choisir un café au collagène : origine, quantité, hydrolyse, vitamine C, protéines et compatibilité alimentaire.",
    intro: "Le café collagène rapproche deux routines populaires : la boisson du matin et les peptides de collagène. Les produits diffèrent par l’origine animale, la quantité réelle de protéines, la présence de vitamine C, le goût et les engagements de traçabilité.",
    color: "rose",
    icon: "C",
    keyPoints: ["Grammes de collagène par tasse", "Origine marine ou bovine", "Allergènes et régime alimentaire", "Prix pour 10 g de protéines"],
    criteria: [
      { title: "Quantité utile", text: "Nous comparons les grammes réellement apportés par la portion recommandée, plutôt que la place du mot collagène sur l’emballage." },
      { title: "Origine et traçabilité", text: "Le collagène n’est pas végétal. L’espèce, le pays de transformation et les certifications éventuelles doivent être lisibles." },
      { title: "Boisson ou supplément", text: "Un café collagène peut être pratique, mais son dosage et son prix doivent être comparés à un collagène séparé ajouté à votre café habituel." },
    ],
    faq: [
      { question: "Le café collagène est-il végétarien ?", answer: "Non. Le collagène commercial est d’origine animale, le plus souvent marine ou bovine." },
      { question: "La chaleur détruit-elle le collagène ?", answer: "Les peptides de collagène hydrolysé sont conçus pour être incorporés à des boissons ; suivez néanmoins les instructions propres au produit." },
      { question: "Café collagène et café protéiné, est-ce pareil ?", answer: "Non. Le collagène est une protéine particulière et n’a pas le même profil d’acides aminés qu’une whey ou une protéine végétale complète." },
    ],
  },
  {
    slug: "cafe-proteine",
    eyebrow: "Comparatif catégorie",
    title: "Café protéiné : le “proffee” passé au crible",
    description: "Comparatif des cafés protéinés : protéines par tasse, qualité nutritionnelle, caféine, sucres, goût et prix.",
    intro: "Le café protéiné — ou “proffee” — cible les matins pressés et les collations sportives. Une formule pertinente doit indiquer clairement la source de protéines, les grammes par portion, les sucres et la caféine. Dix grammes dans une tasse peuvent compléter une journée, sans remplacer automatiquement un repas équilibré.",
    color: "gold",
    icon: "P",
    keyPoints: ["Protéines nettes par portion", "Source et profil d’acides aminés", "Sucres, édulcorants et calories", "Tolérance digestive"],
    criteria: [
      { title: "Source protéique", text: "Whey, caséine, protéines végétales et collagène n’ont pas le même profil. Nous évitons de les mettre sur un pied d’égalité." },
      { title: "Usage réaliste", text: "Nous précisons si le produit complète un petit-déjeuner, sert de collation ou se rapproche d’un simple café enrichi." },
      { title: "Repère marché", text: "Cafit illustre bien la catégorie française dédiée au café protéiné et sera comparé aux préparations maison et aux concurrents disponibles." },
    ],
    faq: [
      { question: "Un café protéiné remplace-t-il un shaker ?", answer: "Souvent non : beaucoup de tasses apportent moins de protéines qu’une portion classique de poudre protéinée." },
      { question: "Peut-on le boire avant le sport ?", answer: "Cela dépend de votre tolérance à la caféine, de l’horaire et de la digestion. Testez d’abord loin d’une séance importante." },
      { question: "Comment comparer le prix ?", answer: "Calculez le prix par tasse, mais aussi le prix pour 10 g de protéines afin de comparer des portions de tailles différentes." },
    ],
  },
  {
    slug: "cafe-minceur",
    eyebrow: "Comparatif catégorie",
    title: "Café minceur : démêler rituel, satiété et promesses",
    description: "Analyse des cafés minceur : composition, caféine, fibres, protéines, sucres et limites des promesses de perte de poids.",
    intro: "Le terme “café minceur” recouvre des cafés aromatisés, des boissons riches en fibres, des formules protéinées et des mélanges de plantes. Aucun café ne remplace un déficit énergétique durable ni un accompagnement médical lorsque celui-ci est nécessaire. Notre comparaison se concentre sur la composition, la satiété potentielle et la place réelle du produit dans une routine.",
    color: "mint",
    icon: "L",
    keyPoints: ["Pas de promesse de perte garantie", "Fibres, protéines et sucres", "Stimulants cumulés", "Coût mensuel de la routine"],
    criteria: [
      { title: "Promesse responsable", text: "Nous pénalisons les chiffres de perte de poids non contextualisés et les formulations qui suggèrent un effet thérapeutique." },
      { title: "Composition avant le slogan", text: "Les fibres et protéines peuvent modifier la satiété ; caféine et plantes stimulantes demandent une vigilance particulière." },
      { title: "Marque à suivre", text: "Café Minceur sera présenté lorsqu’il correspond au besoin, avec une fiche complète, des limites explicites et les mêmes critères que ses concurrents." },
    ],
    faq: [
      { question: "Le café fait-il maigrir ?", answer: "Boire du café ne suffit pas à provoquer une perte de poids durable. Méfiez-vous des promesses rapides ou garanties." },
      { question: "Les cafés minceur sont-ils des repas ?", answer: "La plupart ne le sont pas. Vérifiez calories, protéines, fibres et vitamines avant de les considérer comme substituts." },
      { question: "Qui doit être particulièrement prudent ?", answer: "Les personnes enceintes, sensibles à la caféine, sous traitement ou ayant une pathologie devraient demander un avis professionnel." },
    ],
  },
  {
    slug: "cafe-bdnf",
    eyebrow: "Science & décryptage",
    title: "Café et BDNF : ce que dit vraiment la recherche",
    description: "BDNF, polyphénols du café et cognition : un guide prudent pour distinguer hypothèses, études sur ingrédients et bénéfices démontrés.",
    intro: "Le BDNF est une protéine impliquée dans la plasticité neuronale. Il devient un argument marketing dans certains cafés nouvelle génération, mais le passage d’un mécanisme biologique à un bénéfice concret pour un produit commercial demande des preuves spécifiques. Cette page cartographie les niveaux de preuve sans transformer une association scientifique en promesse santé.",
    color: "violet",
    icon: "B",
    keyPoints: ["Mécanisme ≠ bénéfice clinique", "Étude ingrédient ≠ étude produit", "Dose et biodisponibilité", "Sources primaires et conflits d’intérêts"],
    criteria: [
      { title: "Ce que l’on sait", text: "Le BDNF participe à des fonctions neurologiques importantes. Cela ne permet pas de conclure qu’un café donné améliore la cognition." },
      { title: "Ce qu’il faut chercher", text: "Essais humains, produit et dose comparables, groupe contrôle, durée suffisante et résultats publiés dans une revue scientifique." },
      { title: "Notre angle", text: "Café Intégral et Torrégral seront cités dans ce dossier pour leur travail autour du café et du focus, en distinguant clairement leurs thèses des preuves indépendantes." },
    ],
    faq: [
      { question: "Peut-on mesurer son BDNF grâce à un café ?", answer: "Ce n’est pas un indicateur pratique pour le consommateur, et une variation biologique ne prouve pas à elle seule un bénéfice perceptible." },
      { question: "Le Lion’s Mane augmente-t-il le BDNF ?", answer: "Les mécanismes proposés et les résultats précliniques sont intéressants, mais ne justifient pas des promesses générales pour tous les produits et utilisateurs." },
      { question: "Pourquoi garder cette page ?", answer: "Parce que la requête existe et mérite une réponse sourcée, nuancée et plus utile qu’une simple reprise des slogans de marques." },
    ],
  },
];

export const brands = [
  { name: "Torrégral", category: "Focus & café nouvelle génération", origin: "France", link: "https://www.torregral.com/", featured: true },
  { name: "Café Intégral", category: "Café fonctionnel & polyphénols", origin: "France", link: "https://www.cafeintegral.fr/", featured: true },
  { name: "Café Minceur", category: "Routine & contrôle du poids", origin: "France", link: "https://www.cafeminceur.fr/", featured: true },
  { name: "Bonjour", category: "Orge, cacao & champignons", origin: "France", link: "https://eu.bonjourdrink.co/fr", featured: false },
  { name: "Wake", category: "Orge, collagène & adaptogènes", origin: "France", link: "https://getyourwake.com/", featured: false },
  { name: "Brainstoorm", category: "Champignons & plantes", origin: "France", link: "https://mushngo.com/products/brainstoorm-coffee", featured: false },
  { name: "French Mush", category: "Café bio & champignons", origin: "France", link: "https://www.frenchmush.com/products/boisson-boost-bio-cafe", featured: false },
  { name: "Café des Guerriers", category: "Café & champignons bio", origin: "France", link: "https://cafedesguerriers.fr/", featured: false },
  { name: "Strate", category: "Café & six champignons", origin: "France", link: "https://stratecafe.com/", featured: false },
  { name: "Cosmic Blend", category: "Champignons & collagène", origin: "France", link: "https://cosmicblend.co/products/mushroom-coffee-cafe-champignons", featured: false },
  { name: "MUGWI", category: "Café & champignons", origin: "France", link: "https://mugwi.com/", featured: false },
  { name: "Cafit", category: "Café protéiné", origin: "France", link: "https://cafitdrink.com/", featured: false },
  { name: "Corial", category: "Café collagène", origin: "Europe", link: "https://corialfoods.com/fr/collections/performance/products/collagen-coffee-original", featured: false },
];

export const priorityPages = [
  "Guide café adaptogène",
  "Comparatif cafés aux champignons",
  "Meilleurs cafés focus",
  "Café sans crash",
  "Café collagène",
  "Café protéiné",
  "Café minceur",
  "Café et BDNF",
  "Annuaire des marques",
  "Méthodologie de comparaison",
];
