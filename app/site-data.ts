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
  sections?: {
    title: string;
    paragraphs: string[];
    bullets?: string[];
    links?: { label: string; slug: string }[];
  }[];
  sources?: { label: string; url: string }[];
  productIds?: string[];
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
    sections: [
      {
        title: "Les trois grandes familles de cafés adaptogènes",
        paragraphs: [
          "Le nom café adaptogène regroupe des produits qui ne sont pas toujours comparables. Certains restent de vrais cafés dont l’innovation vient du fruit ou du procédé. D’autres sont des cafés enrichis en champignons, plantes, protéines ou collagène. Une troisième famille rassemble des alternatives torréfiées où le café devient minoritaire, voire absent.",
          "Cette distinction change tout : goût, préparation, quantité de caféine et prix par tasse. Une boisson instantanée à l’orge enrichie en extraits ne doit pas être évaluée comme un café moulu destiné à une cafetière.",
        ],
        bullets: ["Café intrinsèquement fonctionnel : l’innovation vient du café lui-même", "Café enrichi : un ou plusieurs actifs sont ajoutés", "Alternative fonctionnelle : le rituel demeure, mais le café n’est plus la base dominante"],
        links: [{ label: "Comprendre le café fonctionnel", slug: "cafe-fonctionnel" }, { label: "Explorer les cafés nouvelle génération", slug: "cafe-nouvelle-generation" }],
      },
      {
        title: "Comment lire une composition sans se faire impressionner",
        paragraphs: [
          "Une longue liste d’ingrédients n’est ni une preuve d’efficacité ni un défaut en soi. Il faut ramener chaque quantité à la portion réellement consommée, distinguer poudre et extrait, puis vérifier si la partie du champignon et la méthode d’extraction sont précisées.",
          "Les mélanges propriétaires et les équivalents de matière première compliquent la lecture. Lorsque les masses annoncées dépassent le poids de la portion, ou que la dose recommandée ne correspond pas au tableau nutritionnel, nous classons la donnée comme à confirmer.",
        ],
        bullets: ["Poids de la portion", "Milligrammes de chaque actif", "Caféine par tasse", "Nombre réel de portions", "Prix à la dose recommandée"],
        links: [{ label: "Voir notre méthode de comparaison", slug: "methodologie" }],
      },
      {
        title: "Choisir selon le goût et le rituel avant la promesse",
        paragraphs: [
          "Pour un amateur d’espresso, la première question est sensorielle : le produit conserve-t-il un goût de café et fonctionne-t-il avec la machine ou la cafetière habituelle ? Pour une personne ouverte aux lattes, à la chicorée ou au cacao, les formules instantanées offrent davantage de possibilités.",
          "Le meilleur choix est celui que l’on peut préparer régulièrement, dont la caféine correspond à sa sensibilité et dont la composition reste compréhensible. Le questionnaire du site applique ces critères sans utiliser la commission comme facteur de classement.",
        ],
        links: [{ label: "Trouver le café qui me correspond", slug: "quel-cafe-me-correspond" }, { label: "Consulter le comparatif 2026", slug: "comparatif-cafe-adaptogene" }],
      },
    ],
    sources: [
      { label: "EFSA — repères sur la caféine", url: "https://www.efsa.europa.eu/fr/topics/topic/caffeine" },
      { label: "Anses — usages et risques des compléments alimentaires", url: "https://www.anses.fr/fr/content/dossier/complements-alimentaires-tout-savoir-sur-les-usages-et-risques" },
    ],
    faq: [
      { question: "Un café adaptogène est-il toujours un vrai café ?", answer: "Non. Certaines formules contiennent du café soluble ou moulu ; d’autres reposent surtout sur la chicorée, l’orge ou le cacao avec un ajout de caféine." },
      { question: "Le goût ressemble-t-il à un espresso ?", answer: "Rarement à l’identique. Les formules riches en chicorée, cacao ou poudres végétales sont souvent plus rondes et se rapprochent d’un latte." },
      { question: "Peut-on en boire tous les jours ?", answer: "Cela dépend de la composition, de votre sensibilité et de vos traitements. Vérifiez la caféine totale et demandez un avis professionnel en cas de grossesse, de pathologie ou de traitement." },
    ],
  },
  {
    slug: "cafe-fonctionnel",
    eyebrow: "Guide pilier",
    title: "Café fonctionnel : définition, catégories et critères de choix",
    description: "Qu’est-ce qu’un café fonctionnel ? Définition, grandes familles, ingrédients, caféine, prix et méthode pour comparer les produits disponibles en France.",
    intro: "Un café fonctionnel est un café ou une boisson inspirée du café dont la fabrication ou la composition cherche à apporter une fonction supplémentaire au simple plaisir de boire une tasse. Le terme couvre aussi bien un café travaillé à partir du fruit qu’un mélange enrichi en champignons, plantes, protéines, collagène ou autres actifs.",
    color: "blue",
    icon: "F",
    keyPoints: ["Fonction issue du café ou d’un ajout", "Vrai café, boisson hybride ou alternative", "Dose et caféine par portion", "Usage réel avant le marketing"],
    criteria: [
      { title: "Identifier la base", text: "Café moulu, café soluble, céréale torréfiée, chicorée ou cacao : la première ligne de la composition détermine l’expérience réelle." },
      { title: "Identifier la fonction", text: "Focus, énergie, nutrition, satiété ou rituel sans caféine : un produit doit être jugé sur un objectif principal clairement formulé." },
      { title: "Mesurer la transparence", text: "Portion, actifs, caféine, allergènes et prix par tasse doivent pouvoir être retrouvés sans calcul impossible." },
    ],
    sections: [
      {
        title: "Café fonctionnel, café adaptogène et café augmenté : quelles différences ?",
        paragraphs: [
          "Café fonctionnel est le terme le plus large. Il désigne une boisson à laquelle une fonction est attribuée par sa composition ou son procédé. Café adaptogène est un sous-ensemble généralement centré sur les champignons et les plantes. Café augmenté est le terme éditorial que nous utilisons pour cartographier l’ensemble du marché, y compris les cafés protéinés, au collagène ou issus autrement de la cerise.",
          "Ces expressions ne forment pas une catégorie réglementaire unique. Pour comparer les produits sérieusement, il faut donc revenir à des critères observables plutôt qu’à leur nom commercial.",
        ],
        links: [{ label: "Lire le guide du café adaptogène", slug: "guide-cafe-adaptogene" }],
      },
      {
        title: "Les sept familles utiles pour comparer le marché",
        paragraphs: [
          "Notre classement distingue le café classique, le café intrinsèquement fonctionnel, les cafés aux champignons et plantes, les cafés nutritionnels, les formules multi-actifs, les alternatives torréfiées et les produits issus de la cerise de café.",
          "Les sept familles sont regroupées dans trois univers lisibles : l’univers du café, les cafés enrichis, puis les alternatives et dérivés. Une marque peut recevoir plusieurs étiquettes secondaires, mais une seule catégorie principale afin d’éviter les comparaisons trompeuses.",
        ],
        bullets: ["Univers du café : classique et intrinsèquement fonctionnel", "Cafés enrichis : champignons, plantes, nutrition et multi-actifs", "Alternatives et dérivés : céréales, chicorée, cascara, café vert et fruit entier"],
        links: [{ label: "Voir la carte complète du marché", slug: "univers-cafe" }, { label: "Explorer les cafés enrichis", slug: "cafes-enrichis" }],
      },
      {
        title: "Quels ingrédients trouve-t-on dans un café fonctionnel ?",
        paragraphs: [
          "Les champignons les plus fréquents sont le Lion’s Mane, le Chaga, le Cordyceps et le Reishi. Les plantes peuvent inclure ginseng, maca, ashwagandha ou rhodiola. Les formules nutritionnelles ajoutent plutôt whey, collagène, MCT, fibres ou vitamines.",
          "La présence d’un ingrédient connu ne suffit pas à comparer deux produits. Une quantité non publiée, une forme d’extrait différente ou une portion irréaliste peuvent modifier fortement la pertinence de la formule.",
        ],
        links: [{ label: "Comparer les cafés aux champignons", slug: "cafe-champignon" }, { label: "Comparer les cafés protéinés", slug: "cafe-proteine" }, { label: "Comparer les cafés au collagène", slug: "cafe-collagene" }],
      },
      {
        title: "Le bon calcul : prix, portion et caféine",
        paragraphs: [
          "Le prix du sachet ne permet pas de savoir si un produit est cher. Nous calculons le coût par tasse à la dose recommandée et précisons si le prix dépend d’un abonnement, d’une promotion ou d’un lot.",
          "La caféine doit être traitée de la même manière. Une valeur par 100 g est peu utile sans le poids d’une portion. Lorsque plusieurs pages officielles se contredisent, nous publions une fourchette signalée ou la mention à confirmer.",
        ],
        links: [{ label: "Voir le comparatif des cafés adaptogènes", slug: "comparatif-cafe-adaptogene" }, { label: "Lire notre politique de transparence", slug: "politique-affiliation" }],
      },
    ],
    faq: [
      { question: "Le café fonctionnel est-il forcément enrichi ?", answer: "Non. Dans notre classement, un café peut être fonctionnel par sa matière première ou son procédé, sans ajout de champignons, plantes ou nutriments." },
      { question: "Un café fonctionnel remplace-t-il un complément alimentaire ?", answer: "Pas automatiquement. Il faut comparer les doses, la fréquence d’usage et la finalité du produit, puis demander un avis professionnel lorsqu’une situation médicale le justifie." },
      { question: "Comment reconnaître un produit transparent ?", answer: "La marque publie une composition complète, une portion claire, le dosage de chaque actif, la caféine et le nombre réel de tasses, sans obliger à reconstituer l’information depuis plusieurs pages." },
      { question: "Quel est le meilleur café fonctionnel ?", answer: "Il n’existe pas de meilleur produit universel. Le choix dépend d’abord du goût recherché, du niveau de caféine, du rituel de préparation, des actifs acceptés et du budget." },
    ],
    productIds: ["torregral", "bonjour", "cafit", "corial"],
  },
  {
    slug: "cafe-nouvelle-generation",
    eyebrow: "Décryptage marché",
    title: "Café nouvelle génération : quand le café devient fonctionnel",
    description: "Cafés nouvelle génération : innovations issues du fruit, cafés enrichis, boissons hybrides et critères pour distinguer une vraie évolution d’un simple slogan.",
    intro: "Le café nouvelle génération n’est pas une recette unique. Il désigne un mouvement qui transforme le café par le fruit, le procédé, l’ajout d’actifs ou la création d’une alternative au rituel classique. Pour rester utile, cette expression doit toujours être suivie d’une réponse concrète : qu’est-ce qui change réellement dans la tasse ?",
    color: "copper",
    icon: "N",
    keyPoints: ["Innovation sensorielle ou fonctionnelle", "Fruit, procédé ou ingrédients ajoutés", "Goût de café clairement décrit", "Différence mesurable et documentée"],
    criteria: [
      { title: "L’innovation vient-elle du café ?", text: "Un travail sur la cerise ou le procédé ne se classe pas comme une poudre enrichie en actifs extérieurs." },
      { title: "Le goût reste-t-il celui du café ?", text: "Cette question sépare le café intrinsèquement fonctionnel des alternatives et des lattes multi-ingrédients." },
      { title: "La nouveauté est-elle vérifiable ?", text: "Une formule nouvelle doit publier ce qu’elle contient, comment elle se prépare et ce qui la différencie d’une tasse classique." },
    ],
    sections: [
      {
        title: "Première voie : faire évoluer le café sans le remplacer",
        paragraphs: [
          "Dans cette famille, la boisson conserve le goût, la préparation et la place d’un café. L’innovation peut venir d’un usage plus complet du fruit ou d’un procédé particulier. Torrégral constitue le principal exemple suivi par ce site, avec une transparence commerciale explicitement signalée.",
          "Le critère décisif est simple : si l’on retire le discours fonctionnel, le consommateur boit-il encore un véritable café ? Si oui, le produit peut rester dans l’univers du café intrinsèquement fonctionnel.",
        ],
        links: [{ label: "Comprendre le café intrinsèquement fonctionnel", slug: "cafe-intrinsequement-fonctionnel" }],
      },
      {
        title: "Deuxième voie : enrichir le café avec de nouveaux actifs",
        paragraphs: [
          "Champignons, plantes, protéines, collagène, MCT et vitamines créent une famille très visible de cafés enrichis. La base peut rester du café, mais la fonctionnalité vient principalement de ce qui est ajouté.",
          "Ces produits répondent à des usages différents : focus, énergie plus mesurée, nutrition sportive ou routine beauté. Ils ne devraient pas être réunis dans un classement unique sans sous-catégories.",
        ],
        links: [{ label: "Explorer les cafés enrichis", slug: "cafes-enrichis" }, { label: "Voir les formules multi-actifs", slug: "cafe-multi-actifs" }],
      },
      {
        title: "Troisième voie : réinventer le rituel sans rester un café",
        paragraphs: [
          "Chicorée, orge, lupin, céréales torréfiées et boissons hybrides conservent la tasse chaude et les notes grillées, mais pas nécessairement le café. Les produits issus de la cascara, du café vert ou du fruit entier déplacent eux aussi l’usage traditionnel du caféier.",
          "Ces alternatives peuvent être pertinentes pour réduire la caféine ou découvrir d’autres saveurs. Elles doivent simplement être nommées avec précision pour ne pas laisser croire qu’elles reproduisent un espresso.",
        ],
        links: [{ label: "Découvrir les alternatives au café", slug: "alternatives-cafe" }, { label: "Explorer les produits de la cerise", slug: "produits-cerise-cafe" }],
      },
      {
        title: "Comment reconnaître une innovation crédible ?",
        paragraphs: [
          "Une innovation crédible explique sa matière première, son procédé, sa portion et sa caféine. Elle distingue les caractéristiques mesurables du produit des bénéfices encore hypothétiques et ne promet pas un résultat identique pour tous.",
          "Le prix doit enfin être ramené à la tasse. Une nouveauté peut coûter davantage qu’un café classique, mais le supplément doit correspondre à une différence lisible plutôt qu’à une accumulation de mots tendance.",
        ],
        bullets: ["Composition complète accessible", "Dose par tasse cohérente", "Goût et préparation décrits honnêtement", "Prix par portion calculable", "Limites et relation commerciale visibles"],
      },
    ],
    faq: [
      { question: "Café nouvelle génération et café adaptogène, est-ce identique ?", answer: "Non. Le café adaptogène est une branche du marché. Le café nouvelle génération comprend aussi les innovations issues du fruit, les cafés protéinés, au collagène et certaines alternatives." },
      { question: "Un café nouvelle génération doit-il contenir des champignons ?", answer: "Non. Il peut être fonctionnel par son procédé ou contenir d’autres familles d’ingrédients." },
      { question: "Torrégral est-il comparé indépendamment ?", answer: "Torrégral appartient à l’écosystème à l’origine du média. Cette relation est affichée et le produit suit la même grille de portion, caféine, goût, transparence et prix que les autres." },
      { question: "Une alternative à la chicorée est-elle encore un café ?", answer: "Non si le café est absent ou minoritaire. Elle appartient alors aux alternatives ou boissons hybrides, même si son usage rappelle le café." },
    ],
    productIds: ["torregral", "cafeminceur", "bonjour", "cafit"],
  },
  {
    slug: "comparatif-cafe-adaptogene",
    eyebrow: "Comparatif 2026",
    title: "Meilleur café adaptogène : comparatif des produits disponibles en France",
    description: "Comparatif 2026 des cafés adaptogènes en France : composition, dosage, caféine, goût, prix par tasse et profils auxquels chaque produit correspond.",
    intro: "Il n’existe pas un meilleur café adaptogène pour tout le monde. Le choix change selon que l’on veut préserver le goût d’un vrai café, réduire la caféine, consommer des champignons précisément dosés ou adopter une formule tout-en-un. Notre comparatif commence donc par votre profil, puis examine les données publiées par chaque marque.",
    color: "sage",
    icon: "#",
    keyPoints: ["Produits classés par profil", "Portion, caféine et prix normalisés", "Contradictions rendues visibles", "Affiliation sans influence sur le score"],
    criteria: [
      { title: "Pour le goût du café", text: "Nous privilégions les produits qui conservent une base, une préparation et un profil sensoriel proches d’un café traditionnel." },
      { title: "Pour les actifs", text: "Nous comparons les quantités par tasse et pénalisons les mélanges opaques ou les masses physiquement incohérentes." },
      { title: "Pour le budget", text: "Le coût est calculé par portion réellement annoncée, en séparant achat ponctuel, abonnement et promotion temporaire." },
    ],
    sections: [
      {
        title: "Quel café adaptogène choisir selon votre profil ?",
        paragraphs: [
          "Si le goût d’un véritable café est indispensable, commencez par les produits dont la base et le rituel restent clairement café. Si vous recherchez avant tout des champignons et acceptez une boisson instantanée différente, comparez Bonjour, Brainstoorm, French Mush, Café des Guerriers et Strate sur leurs doses publiées.",
          "Pour une formule nutritionnelle, Wake, Cosmic Blend, Cafit et Corial répondent à des usages distincts : collagène, protéines ou mélange multi-actifs. Ils ne sont pas interchangeables avec un café aux champignons classique.",
        ],
        bullets: ["Goût café prioritaire : Torrégral ou base café identifiable", "Caféine réduite : vérifier la référence et la valeur par tasse", "Champignons dosés : comparer espèce, extrait et quantité", "Nutrition : distinguer whey, collagène et autres actifs"],
        links: [{ label: "Faire le test personnalisé", slug: "quel-cafe-me-correspond" }],
      },
      {
        title: "Les données qui changent réellement le classement",
        paragraphs: [
          "Une dose de caféine vérifiée, le poids d’une portion et le nombre réel de tasses ont davantage de valeur qu’une promesse générale de focus ou d’énergie stable. Les cartes ci-dessous reprennent les chiffres observés sur les pages et étiquettes officielles au 30 juillet 2026.",
          "Lorsque la marque ne publie pas une valeur, nous l’indiquons. Lorsqu’elle publie deux chiffres incompatibles, nous affichons une fourchette avec un avertissement au lieu de choisir la valeur la plus favorable.",
        ],
        links: [{ label: "Consulter la méthode complète", slug: "methodologie" }],
      },
      {
        title: "Notre sélection n’est pas un podium universel",
        paragraphs: [
          "Un produit peut être excellent pour une personne et inadapté à une autre. Un amateur d’espresso peut rejeter une formule très complète à l’orge ; une personne sensible à la caféine peut préférer cette même formule à un café classique.",
          "Le comparatif présente donc des repères de marché, tandis que le questionnaire calcule une correspondance selon sept réponses. La relation commerciale avec Torrégral, Café Minceur et Café Intégral est déclarée et n’ajoute aucun point au calcul.",
        ],
        links: [{ label: "Lire notre politique d’affiliation", slug: "politique-affiliation" }],
      },
    ],
    faq: [
      { question: "Quel est le meilleur café adaptogène en 2026 ?", answer: "Le meilleur dépend du goût, de la caféine souhaitée, des ingrédients acceptés, du format et du budget. Notre questionnaire fournit une recommandation par profil plutôt qu’un gagnant universel." },
      { question: "Quel café adaptogène ressemble le plus à du café ?", answer: "Les produits qui conservent une base café dominante et une préparation traditionnelle sont les plus proches. Les mélanges à base d’orge, chicorée ou cacao produisent généralement une boisson différente." },
      { question: "Quel produit contient le moins de caféine ?", answer: "Parmi les valeurs publiques relevées, certaines formules annoncent 20 à 35 mg par tasse. Il faut toutefois vérifier la saveur exacte et l’étiquette du lot, car les recettes varient." },
      { question: "Pourquoi certains dosages sont-ils indiqués à confirmer ?", answer: "Parce que certaines pages officielles se contredisent ou publient des masses qui ne correspondent pas au poids de la portion. Nous refusons de transformer ces données en certitudes." },
      { question: "Les liens commerciaux modifient-ils le classement ?", answer: "Non. Une relation commerciale change uniquement la mention affichée à côté du lien. Elle n’intervient pas dans le questionnaire ni dans les critères éditoriaux." },
    ],
    productIds: ["torregral", "bonjour", "brainstoorm", "frenchmush", "guerriers", "strate"],
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
    sections: [
      {
        title: "Ce qui produit réellement l’effet immédiat d’un café focus",
        paragraphs: [
          "Dans la plupart des formules, la caféine reste l’ingrédient dont l’effet stimulant immédiat est le plus prévisible. C’est pourquoi sa quantité par tasse doit apparaître avant les promesses de clarté mentale ou de productivité.",
          "Une boisson contenant 20 mg, 35 mg ou 80 mg de caféine ne correspond pas au même usage. L’absence de valeur précise empêche également de comparer correctement le produit avec un espresso ou avec les autres sources consommées dans la journée.",
        ],
        links: [{ label: "Comparer les produits et leur caféine", slug: "comparatif-cafe-adaptogene" }],
      },
      {
        title: "Lion’s Mane, L-théanine et plantes : comment les comparer",
        paragraphs: [
          "Le Lion’s Mane est fréquent dans les cafés positionnés sur le focus. La L-théanine apparaît dans certaines formules caféinées, tandis que ginseng, rhodiola, maca ou ashwagandha complètent les mélanges les plus longs.",
          "La présence d’un nom connu ne permet pas de conclure sur le produit fini. Il faut connaître la quantité, la forme utilisée et, pour les champignons, la partie du champignon et le type d’extrait. Une étude sur un ingrédient isolé ne valide pas automatiquement le mélange commercial.",
        ],
        links: [{ label: "Lire le guide des cafés aux champignons", slug: "cafe-champignon" }, { label: "Comprendre le dossier BDNF", slug: "cafe-bdnf" }],
      },
      {
        title: "Vrai café ou boisson fonctionnelle instantanée ?",
        paragraphs: [
          "Une personne qui veut conserver son espresso n’a pas le même besoin qu’une personne prête à boire une préparation à l’orge, au cacao ou à la chicorée. Le goût et la préparation doivent donc être traités comme des critères principaux, pas comme de simples détails.",
          "Torrégral représente l’option intrinsèquement fonctionnelle suivie par le site ; Bonjour, Brainstoorm, French Mush ou Strate représentent différentes approches enrichies. Leur classement dépend des réponses au questionnaire, jamais de la relation commerciale.",
        ],
        links: [{ label: "Trouver mon café focus", slug: "quel-cafe-me-correspond" }, { label: "Comprendre le café nouvelle génération", slug: "cafe-nouvelle-generation" }],
      },
      {
        title: "Le moment de consommation compte autant que la formule",
        paragraphs: [
          "Un café focus pris tard peut perturber le sommeil chez une personne sensible, même lorsque sa dose est inférieure à celle d’un café classique. Le nombre de tasses et les autres sources de caféine doivent être additionnés.",
          "Le produit le plus pertinent est celui dont la stimulation reste compatible avec le rythme de travail et de sommeil de l’utilisateur. Une promesse de concentration ne doit jamais masquer ce calcul élémentaire.",
        ],
      },
    ],
    sources: [{ label: "EFSA — repères sur la caféine", url: "https://www.efsa.europa.eu/fr/topics/topic/caffeine" }],
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
    sections: [
      {
        title: "Que signifie réellement le crash du café ?",
        paragraphs: [
          "Le mot crash décrit généralement une baisse d’énergie ou de vigilance ressentie après une stimulation. Il ne correspond pas à un diagnostic ni à un effet identique chez tous les consommateurs. Sommeil, alimentation, quantité de caféine et rythme de consommation peuvent tous modifier le ressenti.",
          "Un produit peut promettre une énergie plus régulière, mais aucune composition ne garantit l’absence de baisse pour chaque personne. Nous privilégions donc les formulations mesurées et les marques qui publient leur caféine.",
        ],
      },
      {
        title: "Le premier levier reste la quantité de caféine",
        paragraphs: [
          "Réduire la dose par tasse peut être plus simple à évaluer qu’ajouter plusieurs actifs destinés à compenser une caféine élevée. Les produits étudiés vont de valeurs faibles ou modérées à des doses proches d’un café classique.",
          "Les chiffres doivent néanmoins être cohérents. Wake et Café des Guerriers publient actuellement plusieurs valeurs selon leurs pages ; ces produits restent comparables, mais leur caféine exacte doit être confirmée sur l’étiquette du lot acheté.",
        ],
        links: [{ label: "Voir les valeurs relevées dans le comparatif", slug: "comparatif-cafe-adaptogene" }],
      },
      {
        title: "L-théanine, protéines, fibres et MCT : ce qu’ils ne garantissent pas",
        paragraphs: [
          "Certaines marques associent la caféine à de la L-théanine, des protéines, des fibres ou des MCT. Ces ingrédients changent la composition nutritionnelle et parfois l’expérience de la boisson, mais leur présence ne permet pas d’affirmer que le crash disparaîtra.",
          "La bonne approche consiste à examiner la formule complète : caféine, sucres, calories, portion, vitesse de consommation et tolérance digestive. Une liste plus longue n’est pas nécessairement une réponse plus fiable.",
        ],
        links: [{ label: "Comparer les cafés protéinés", slug: "cafe-proteine" }, { label: "Explorer les formules multi-actifs", slug: "cafe-multi-actifs" }],
      },
      {
        title: "Trois stratégies pour une stimulation plus mesurée",
        paragraphs: [
          "La première consiste à conserver un véritable café mais à mieux maîtriser la dose et l’horaire. La deuxième est de choisir une formule explicitement moins caféinée. La troisième est d’adopter une alternative sans café ou une infusion issue du caféier.",
          "Le questionnaire distingue ces préférences afin de ne pas recommander une chicorée à une personne qui exige le goût d’un espresso, ni un café classique à une personne qui recherche réellement une boisson sans caféine.",
        ],
        bullets: ["Conserver le café et réduire la portion", "Choisir une formule à caféine quantifiée", "Passer à une alternative torréfiée ou une infusion"],
        links: [{ label: "Trouver l’option adaptée à mon profil", slug: "quel-cafe-me-correspond" }, { label: "Découvrir les alternatives au café", slug: "alternatives-cafe" }],
      },
    ],
    sources: [{ label: "EFSA — repères sur la caféine", url: "https://www.efsa.europa.eu/fr/topics/topic/caffeine" }],
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

export type Universe = {
  id: string;
  number: string;
  title: string;
  slug: string;
  kicker: string;
  description: string;
  color: string;
  children: { title: string; slug: string; note: string }[];
};

export const universes: Universe[] = [
  {
    id: "coffee",
    number: "01",
    title: "L’univers du café",
    slug: "univers-cafe",
    kicker: "Du classique au café intrinsèquement fonctionnel",
    description: "Des cafés qui conservent le goût, le geste et le rituel d’une vraie tasse, qu’ils soient traditionnels ou transformés d’une manière nouvelle.",
    color: "universe-rust",
    children: [
      { title: "Café classique & spécialité", slug: "cafe-classique-specialite", note: "Origines, torréfactions et préparations" },
      { title: "Café intrinsèquement fonctionnel", slug: "cafe-intrinsequement-fonctionnel", note: "La fonctionnalité vient du fruit et du procédé" },
    ],
  },
  {
    id: "enriched",
    number: "02",
    title: "Cafés enrichis",
    slug: "cafes-enrichis",
    kicker: "Un café, plus un ou plusieurs actifs",
    description: "Champignons, plantes, collagène, protéines ou formules tout-en-un : ici, la fonctionnalité vient principalement d’ingrédients ajoutés.",
    color: "universe-sage",
    children: [
      { title: "Champignons & plantes", slug: "cafe-champignons-plantes", note: "Lion’s Mane, Chaga, adaptogènes…" },
      { title: "Nutrition & performance", slug: "cafe-nutrition-performance", note: "Protéines, collagène, créatine, MCT" },
      { title: "Multi-actifs", slug: "cafe-multi-actifs", note: "Les formules all-in-one" },
    ],
  },
  {
    id: "alternatives",
    number: "03",
    title: "Alternatives & dérivés",
    slug: "alternatives-derives-cafe",
    kicker: "Pas vraiment du café, mais quand même",
    description: "Des boissons torréfiées et des produits issus du caféier qui déplacent le rituel : chicorée, orge, lupin, cascara ou fruit entier.",
    color: "universe-gold",
    children: [
      { title: "Alternatives & boissons hybrides", slug: "alternatives-cafe", note: "Chicorée, céréales et boissons minoritaires en café" },
      { title: "Produits issus de la cerise", slug: "produits-cerise-cafe", note: "Cascara, café vert et fruit complet" },
    ],
  },
];

export type ProductProfile = {
  id: string;
  name: string;
  product: string;
  category: string;
  origin: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  relationship: "partenaire" | "editorial";
  badges: string[];
  taste: number;
  compositions: string[];
  goals: string[];
  rituals: string[];
  caffeine: "classic" | "reduced" | "none" | "variable";
  simplicity: number;
  priceTier: "value" | "balanced" | "premium";
  strengths: string[];
  limits: string[];
  serving: string;
  caffeineText: string;
  priceText: string;
  verified: string;
};

export const products: ProductProfile[] = [
  {
    id: "torregral",
    name: "Torrégral",
    product: "Café premium nouvelle génération",
    category: "Café intrinsèquement fonctionnel",
    origin: "France",
    description: "Un café présenté par la marque comme 100 % café, pensé pour conserver un goût familier et une préparation classique tout en travaillant une approche plus complète de la cerise.",
    image: "/images/products/torregral-packaging.jpg",
    imageAlt: "Paquet de café Torrégral",
    link: "https://www.torregral.com/",
    relationship: "partenaire",
    badges: ["100 % café déclaré", "Goût café", "Procédé intrinsèque"],
    taste: 5,
    compositions: ["coffee-only"],
    goals: ["ritual", "focus", "steady"],
    rituals: ["machine", "filter"],
    caffeine: "classic",
    simplicity: 5,
    priceTier: "premium",
    strengths: ["Reste un véritable café", "Compatible avec le rituel habituel", "Sans champignons ni mélange aromatisé"],
    limits: ["Poids, dose de Café Intégral et caféine non publiés", "Les bénéfices spécifiques doivent encore être documentés produit par produit"],
    serving: "Non publiée",
    caffeineText: "Non publiée",
    priceText: "15 € / paquet",
    verified: "Site officiel consulté le 30 juillet 2026",
  },
  {
    id: "cafeminceur",
    name: "Café Minceur",
    product: "Café au goût familier",
    category: "Café intrinsèquement fonctionnel",
    origin: "France",
    description: "Un mélange de café torréfié, café vert, cascara et Café Intégral, entièrement issu de la cerise de café et préparé à raison de 10 g par tasse.",
    image: "/images/products/cafeminceur-packaging.jpg",
    imageAlt: "Paquet Café Minceur avec cuillère doseuse",
    link: "https://www.cafeminceur.fr/",
    relationship: "partenaire",
    badges: ["70 g · 7 tasses", "100 % fruit du café", "Objectif équilibre"],
    taste: 5,
    compositions: ["coffee-only"],
    goals: ["weight", "ritual"],
    rituals: ["filter"],
    caffeine: "classic",
    simplicity: 5,
    priceTier: "balanced",
    strengths: ["Goût annoncé proche du café", "Routine simple", "Format découverte"],
    limits: ["Proportions du mélange et caféine non publiées", "Aucun café ne garantit une perte de poids"],
    serving: "10 g",
    caffeineText: "Non publiée",
    priceText: "Dès 1,43 € / tasse",
    verified: "Site officiel consulté le 30 juillet 2026",
  },
  {
    id: "cafeintegral",
    name: "Café Intégral",
    product: "Fruit entier du caféier",
    category: "Produit issu de la cerise de café",
    origin: "France",
    description: "Une approche centrée sur le fruit complet du caféier, distincte d’un café torréfié conventionnel et classée parmi les dérivés de la cerise.",
    image: "/images/products/cafeintegral-packaging.jpg",
    imageAlt: "Paquet Café Intégral à base de cerise de café",
    link: "https://cafeintegral.fr/home/",
    relationship: "partenaire",
    badges: ["Fruit du caféier", "Infusion", "Approche intégrale"],
    taste: 2,
    compositions: ["fruit"],
    goals: ["discover", "focus", "steady"],
    rituals: ["infusion"],
    caffeine: "variable",
    simplicity: 5,
    priceTier: "premium",
    strengths: ["Valorise une autre partie du fruit", "Composition courte", "Univers distinct du café torréfié"],
    limits: ["Dose conseillée et caféine non publiées", "Ne reproduit pas exactement un espresso"],
    serving: "Non publiée",
    caffeineText: "Non publiée",
    priceText: "18,50 € / 50 g",
    verified: "Site officiel consulté le 30 juillet 2026",
  },
  {
    id: "bonjour",
    name: "Bonjour",
    product: "Super Café Original",
    category: "Alternative multi-actifs",
    origin: "France",
    description: "Une boisson instantanée à base d’orge et d’extrait de café Arabica, enrichie de 2 700 mg d’extraits de champignons et plantes, vitamines et minéraux.",
    image: "/images/products/bonjourdrink-packaging.jpg",
    imageAlt: "Sachet jaune Bonjour Super Café",
    link: "https://eu.bonjourdrink.co/pages/bonjour",
    relationship: "editorial",
    badges: ["2 700 mg d’extraits", "35 mg de caféine", "30 tasses"],
    taste: 2,
    compositions: ["mushrooms", "multi", "alternative"],
    goals: ["focus", "steady", "discover", "low-caffeine"],
    rituals: ["instant"],
    caffeine: "reduced",
    simplicity: 3,
    priceTier: "balanced",
    strengths: ["Dose de caféine déclarée", "Format simple", "Profil cacao et céréales grillées"],
    limits: ["Ne goûte pas comme un espresso", "La formule varie selon la saveur choisie"],
    serving: "6 g",
    caffeineText: "35 mg",
    priceText: "0,76–1,49 € / tasse",
    verified: "Site officiel consulté le 30 juillet 2026",
  },
  {
    id: "wake",
    name: "Wake",
    product: "Boisson fonctionnelle",
    category: "Multi-actifs",
    origin: "France",
    description: "Une formule saisonnière associant collagène, Lion’s Mane, acide hyaluronique, zinc, vitamines, orge torréfiée et café Arabica.",
    image: "/images/products/wake-packaging.jpg",
    imageAlt: "Packaging de la boisson fonctionnelle Wake",
    link: "https://getyourwake.com/products/wake-le-super-cafe-offre2",
    relationship: "editorial",
    badges: ["≈ 3,33 g collagène", "≈ 387 mg Lion’s Mane", "Formule saisonnière"],
    taste: 2,
    compositions: ["multi", "nutrition", "alternative"],
    goals: ["beauty", "steady", "discover"],
    rituals: ["instant"],
    caffeine: "reduced",
    simplicity: 2,
    priceTier: "premium",
    strengths: ["Formule tout-en-un", "Rituel rapide", "Positionnement différencié"],
    limits: ["La marque publie des valeurs de caféine contradictoires", "La recette est susceptible de changer chaque saison"],
    serving: "≈ 9 g",
    caffeineText: "≈ 5 à 30 mg*",
    priceText: "0,83–1,90 € / tasse",
    verified: "Informations publiques de la marque, vérifiées le 30 juillet 2026",
  },
  {
    id: "brainstoorm",
    name: "Brainstoorm",
    product: "Mushroom Coffee",
    category: "Café aux champignons et plantes",
    origin: "France",
    description: "Un mélange de trois champignons, maca, ashwagandha, rhodiola, cacao et fibres d’acacia, avec une caféine à libération prolongée annoncée.",
    image: "/images/products/brainstoorm-packaging.jpg",
    imageAlt: "Packaging Brainstoorm Mushroom Coffee",
    link: "https://mushngo.com/products/super-cafe",
    relationship: "editorial",
    badges: ["3 000 mg champignons", "20 mg caféine", "30 tasses"],
    taste: 3,
    compositions: ["mushrooms", "multi"],
    goals: ["focus", "discover"],
    rituals: ["instant"],
    caffeine: "reduced",
    simplicity: 2,
    priceTier: "premium",
    strengths: ["Positionnement clair", "Association de plusieurs actifs", "Format pratique"],
    limits: ["Les masses déclarées dépassent la portion de 8 g", "La marque doit préciser s’il s’agit d’équivalents matière première"],
    serving: "8 g annoncés*",
    caffeineText: "20 mg",
    priceText: "1,33 € / tasse",
    verified: "Informations publiques de la marque, vérifiées le 30 juillet 2026",
  },
  {
    id: "frenchmush",
    name: "French Mush",
    product: "Boisson Boost Café",
    category: "Café aux champignons",
    origin: "France",
    description: "Une boisson au café Arabica et à la chicorée apportant 800 mg d’extraits de cinq champignons par portion de 5 g.",
    image: "/images/products/frenchmush-packaging.jpg",
    imageAlt: "Packaging French Mush Boisson Boost Café",
    link: "https://www.frenchmush.com/products/boisson-boost-bio-cafe",
    relationship: "editorial",
    badges: ["800 mg d’extraits", "49 mg de caféine", "Bio déclaré"],
    taste: 3,
    compositions: ["mushrooms"],
    goals: ["focus", "discover"],
    rituals: ["instant"],
    caffeine: "reduced",
    simplicity: 3,
    priceTier: "premium",
    strengths: ["Univers spécialisé", "Base café identifiable", "Option française"],
    limits: ["Quantités séparées de café et chicorée non publiées", "Le format est plus proche d’une boisson instantanée que d’un espresso"],
    serving: "5 g",
    caffeineText: "49 mg",
    priceText: "0,88–1,50 € / tasse",
    verified: "Informations publiques de la marque, vérifiées le 30 juillet 2026",
  },
  {
    id: "guerriers",
    name: "Café des Guerriers",
    product: "Café & champignons bio",
    category: "Café aux champignons",
    origin: "France",
    description: "Une portion instantanée composée de 3,5 g de café et 1,5 g de champignons et plantes : Lion’s Mane, Cordyceps, Chaga, Reishi, ashwagandha et maca.",
    image: "/images/products/cafedesguerriers-packaging.jpg",
    imageAlt: "Café et packaging Café des Guerriers",
    link: "https://cafedesguerriers.fr/products/pack-cafe-immunite",
    relationship: "editorial",
    badges: ["1 500 mg d’actifs listés", "5 g par tasse", "Bio déclaré"],
    taste: 4,
    compositions: ["mushrooms"],
    goals: ["focus", "steady", "discover"],
    rituals: ["instant"],
    caffeine: "variable",
    simplicity: 3,
    priceTier: "premium",
    strengths: ["Rituel proche du café", "Association café et champignons", "Positionnement premium"],
    limits: ["La marque publie 48 mg puis 60 mg de caféine selon les pages", "Le total détaillé ne correspond pas aux 3 200 mg annoncés en titre"],
    serving: "5 g",
    caffeineText: "≈ 48 à 60 mg*",
    priceText: "0,97–1,30 € / tasse",
    verified: "Informations publiques de la marque, vérifiées le 30 juillet 2026",
  },
  {
    id: "strate",
    name: "Strate",
    product: "Café aux six champignons",
    category: "Café multi-actifs",
    origin: "France",
    description: "Une formule instantanée apportant 2 200 mg de six champignons par dose, complétée par du café Arabica et du lait de coco non quantifiés séparément.",
    image: "/images/products/strate-packaging.jpg",
    imageAlt: "Boîte de café Strate aux champignons",
    link: "https://stratecafe.com/products/cafe-champignons",
    relationship: "editorial",
    badges: ["2 200 mg champignons", "48 mg caféine", "6 g par tasse"],
    taste: 3,
    compositions: ["mushrooms", "multi"],
    goals: ["focus", "steady", "discover"],
    rituals: ["instant"],
    caffeine: "reduced",
    simplicity: 1,
    priceTier: "premium",
    strengths: ["Large spectre d’ingrédients", "Univers bien identifié", "Format fonctionnel"],
    limits: ["Quantités de café et de lait de coco non publiées", "La longueur de la formule ne garantit pas son efficacité"],
    serving: "6 g",
    caffeineText: "48 mg",
    priceText: "1,10–1,63 € / tasse",
    verified: "Informations publiques de la marque, vérifiées le 30 juillet 2026",
  },
  {
    id: "cosmicblend",
    name: "Cosmic Blend",
    product: "Mushroom Coffee Collagen",
    category: "Multi-actifs et collagène",
    origin: "France",
    description: "Une formule hybride associant extrait de café, Lion’s Mane, Chaga, L-théanine, acérola et collagène marin hydrolysé.",
    image: "/images/products/cosmicblend-packaging.jpg",
    imageAlt: "Pot Cosmic Blend Mushroom Coffee",
    link: "https://cosmicblend.co/products/mushroom-coffee-cafe-champignons",
    relationship: "editorial",
    badges: ["30 mg de caféine", "Collagène marin", "30 tasses"],
    taste: 2,
    compositions: ["nutrition", "mushrooms", "multi"],
    goals: ["beauty", "focus", "steady"],
    rituals: ["instant"],
    caffeine: "reduced",
    simplicity: 1,
    priceTier: "premium",
    strengths: ["Réunit plusieurs usages", "Caféine annoncée modérée", "Format instantané"],
    limits: ["Dose et quantités individuelles non publiées", "Contient du collagène marin et n’est pas végétalien"],
    serving: "Non publiée",
    caffeineText: "30 mg",
    priceText: "1,66 € / tasse",
    verified: "Informations publiques de la marque, vérifiées le 30 juillet 2026",
  },
  {
    id: "cafit",
    name: "Cafit",
    product: "Café protéiné",
    category: "Nutrition et performance",
    origin: "France",
    description: "Un café instantané avec whey, fibre d’acacia, MCT, arômes et édulcorant. Le tableau nutritionnel est établi pour 18 g, mais l’usage conseillé commence à 12 g.",
    image: "/images/products/cafit-packaging.jpg",
    imageAlt: "Boîte Cafit café protéiné",
    link: "https://cafitdrink.com/",
    relationship: "editorial",
    badges: ["10 g protéines / 18 g", "80 mg caféine / 18 g", "Instantané"],
    taste: 3,
    compositions: ["nutrition"],
    goals: ["performance"],
    rituals: ["instant"],
    caffeine: "classic",
    simplicity: 3,
    priceTier: "balanced",
    strengths: ["Objectif nutritionnel lisible", "Format pratique", "Alternative au proffee maison"],
    limits: ["La portion de 12 g contredit le tableau établi pour 18 g", "L’étiquette alterne entre concentré et isolat de whey"],
    serving: "12 à 18 g*",
    caffeineText: "80 mg / 18 g",
    priceText: "1,33 € / tasse annoncée",
    verified: "Informations publiques de la marque, vérifiées le 30 juillet 2026",
  },
  {
    id: "corial",
    name: "Corial",
    product: "Collagen Coffee Original",
    category: "Nutrition et performance",
    origin: "Europe",
    description: "Une formule courte composée principalement de collagène hydrolysé, de café soluble et de vitamine C, avec 8,5 g de collagène par portion.",
    image: "/images/products/corial-packaging.jpg",
    imageAlt: "Packaging Corial Collagen Coffee Original",
    link: "https://corialfoods.com/fr/collections/performance/products/collagen-coffee-original",
    relationship: "editorial",
    badges: ["8,5 g collagène", "68 mg caféine", "3 ingrédients"],
    taste: 3,
    compositions: ["nutrition"],
    goals: ["beauty", "performance"],
    rituals: ["instant"],
    caffeine: "classic",
    simplicity: 3,
    priceTier: "balanced",
    strengths: ["Usage très lisible", "Deux routines réunies", "Préparation rapide"],
    limits: ["Non végétalien", "Le pourcentage total affiché atteint 100,15 %, vraisemblablement par arrondi"],
    serving: "10 g",
    caffeineText: "68 mg",
    priceText: "0,73 € / tasse",
    verified: "Informations publiques de la marque, vérifiées le 30 juillet 2026",
  },
];

export const taxonomyGuides: Guide[] = [
  {
    slug: "univers-cafe", eyebrow: "Univers 01", title: "L’univers du café : du classique au café intrinsèquement fonctionnel", color: "copper", icon: "01",
    description: "Comprendre ce qui reste pleinement du café : origines, spécialité, torréfaction et procédés fonctionnels issus du fruit.",
    intro: "Cet univers réunit les produits dont la tasse, le goût et la préparation restent ceux d’un café. La frontière décisive n’est pas la modernité du discours, mais l’origine de la fonctionnalité : lorsqu’elle vient du café lui-même ou de son procédé, le produit reste ici.",
    keyPoints: ["Goût et rituel de café conservés", "Fonctionnalité intrinsèque ou café classique", "Pas d’actif externe dominant", "Préparation clairement indiquée"],
    criteria: [
      { title: "Le produit reste-t-il un café ?", text: "Nous regardons sa base, son goût et sa préparation réelle, pas seulement le mot café sur l’emballage." },
      { title: "D’où vient la différence ?", text: "Origine, variété, torréfaction ou nouveau travail de la cerise : la fonctionnalité doit venir du café." },
      { title: "Le rituel est-il conservé ?", text: "Machine, filtre ou extraction habituelle sont des marqueurs importants pour cet univers." },
    ],
    faq: [
      { question: "Pourquoi ne pas appeler cet univers “100 % café” ?", answer: "Parce que certaines recettes ou préparations peuvent contenir d’autres éléments. Le titre doit rester exact dans tous les cas." },
      { question: "Un café innovant peut-il rester un vrai café ?", answer: "Oui, si l’innovation concerne le fruit ou sa transformation et que la tasse conserve la nature et le rituel d’un café." },
      { question: "Les cafés aux champignons sont-ils inclus ?", answer: "Non : leur fonctionnalité vient principalement d’ingrédients ajoutés, ils appartiennent aux cafés enrichis." },
    ], productIds: ["torregral", "cafeminceur"],
  },
  {
    slug: "cafe-classique-specialite", eyebrow: "Famille 01", title: "Café classique et café de spécialité : les repères essentiels", color: "sand", icon: "C",
    description: "Espresso, filtre, dosettes, origines, variétés et torréfactions : le socle indispensable pour comparer le café augmenté.",
    intro: "Avant de parler de café fonctionnel, il faut savoir ce que l’on compare. Le café classique se décrit par son espèce, son origine, son traitement, sa torréfaction, sa fraîcheur et sa méthode de préparation. Le café de spécialité ajoute des exigences de qualité et de traçabilité, sans devenir pour autant un café enrichi.",
    keyPoints: ["Arabica, robusta et variétés", "Origine et méthode de traitement", "Torréfaction et fraîcheur", "Méthode de préparation"],
    criteria: [
      { title: "Le grain", text: "Variété, terroir et traitement structurent le potentiel aromatique avant même la torréfaction." },
      { title: "La torréfaction", text: "Claire, moyenne ou foncée : elle modifie fortement acidité, amertume et perception du corps." },
      { title: "La tasse", text: "Espresso, filtre, piston ou dosette ne sont pas des cafés différents mais des méthodes d’extraction." },
    ],
    faq: [
      { question: "Qu’est-ce qu’un café de spécialité ?", answer: "C’est un café évalué selon des critères de qualité, de traçabilité et de défauts, généralement associé à une origine et une torréfaction précises." },
      { question: "Un latte est-il une variété de café ?", answer: "Non. C’est une préparation associant un espresso et du lait ou une boisson végétale." },
      { question: "Le café classique est-il fonctionnel ?", answer: "Le café possède naturellement des composés actifs, mais nous réservons ici l’expression intrinsèquement fonctionnel aux procédés revendiquant une différence spécifique et documentable." },
    ],
  },
  {
    slug: "cafe-intrinsequement-fonctionnel", eyebrow: "Famille 02", title: "Café intrinsèquement fonctionnel : l’innovation vient du café", color: "copper", icon: "I",
    description: "Une nouvelle famille de cafés qui conservent le goût et le rituel tout en travaillant autrement le fruit du caféier.",
    intro: "Le café intrinsèquement fonctionnel ne reçoit pas nécessairement une longue liste d’actifs. Sa différence vient du choix de la matière première, du fruit du caféier ou d’un procédé particulier. Pour rester dans cette famille, il doit encore se boire et se reconnaître comme un véritable café.",
    keyPoints: ["Goût de café reconnaissable", "Procédé clairement expliqué", "Fonctionnalité issue du café", "Comparaison possible avec un café classique"],
    criteria: [
      { title: "Une définition stricte", text: "Ajouter un champignon ou du collagène fait basculer le produit dans les cafés enrichis, même si la base est excellente." },
      { title: "La preuve du procédé", text: "La marque doit pouvoir expliquer la matière utilisée, les étapes de transformation et les différences mesurables." },
      { title: "Le test de la tasse", text: "Le produit doit conserver un goût et une préparation suffisamment proches du café pour tenir sa promesse sensorielle." },
    ],
    faq: [
      { question: "Torrégral appartient-il à cette famille ?", answer: "Oui selon son positionnement actuel : la marque le présente comme un café, sans champignons ni substitut, dont l’innovation vient d’une approche plus complète de la cerise." },
      { question: "Café Intégral 100 % appartient-il à cette famille ?", answer: "Non dans notre taxonomie : il relève des produits issus de la cerise car son usage et son goût ne sont pas nécessairement ceux d’un café torréfié conventionnel." },
      { question: "Une déclinaison enrichie de Torrégral reste-t-elle ici ?", answer: "Non si un actif externe devient central. Elle conserve alors l’étiquette “base Torrégral”, mais sa catégorie principale devient café enrichi." },
    ], productIds: ["torregral", "cafeminceur"],
  },
  {
    slug: "cafes-enrichis", eyebrow: "Univers 02", title: "Cafés enrichis : comprendre ce que l’on ajoute à la tasse", color: "sage", icon: "02",
    description: "Champignons, plantes, protéines, collagène ou formules all-in-one : une carte claire des cafés avec ingrédients ajoutés.",
    intro: "Les cafés enrichis forment le territoire le plus visible du café fonctionnel. Leur point commun est simple : une partie importante de leur promesse vient d’un ingrédient ajouté. Cela ne les rend ni meilleurs ni moins bons ; cela impose seulement de vérifier les quantités, la compatibilité alimentaire et la cohérence de la formule.",
    keyPoints: ["Actifs et quantités par tasse", "Base réellement utilisée", "Allergènes et compatibilités", "Goût et format de préparation"],
    criteria: [
      { title: "Champignons et plantes", text: "Comparer les espèces, les parties utilisées, les extraits et les dosages plutôt que le nombre de logos." },
      { title: "Nutrition et performance", text: "Protéines, collagène et créatine répondent à des usages différents et ne doivent pas être confondus." },
      { title: "Multi-actifs", text: "Plus la formule est longue, plus la transparence des quantités et l’explication du rôle de chaque ingrédient deviennent importantes." },
    ],
    faq: [
      { question: "Pourquoi éviter “artificiellement enrichi” ?", answer: "Parce que les ingrédients ajoutés peuvent être naturels et que l’expression introduit un jugement avant l’analyse de la formule." },
      { question: "Un café enrichi peut-il avoir un vrai goût de café ?", answer: "Oui, surtout lorsque la base café reste dominante, mais les poudres et arômes ajoutés peuvent modifier sensiblement la tasse." },
      { question: "Plus d’actifs signifie-t-il plus d’efficacité ?", answer: "Non. Les quantités, la qualité des extraits, les interactions et les preuves comptent davantage que la longueur de la liste." },
    ], productIds: ["bonjour", "guerriers", "cafit", "cosmicblend"],
  },
  {
    slug: "cafe-champignons-plantes", eyebrow: "Famille 03", title: "Cafés aux champignons et aux plantes fonctionnelles", color: "sage", icon: "M",
    description: "Lion’s Mane, Chaga, Reishi, Cordyceps et plantes : comment lire les formules sans confondre présence et preuve.",
    intro: "Cette famille réunit deux sous-ensembles proches mais distincts : les cafés aux champignons fonctionnels et les cafés enrichis en plantes. Dans les deux cas, la qualité de l’extrait, la dose par tasse et la transparence de la marque comptent plus qu’une simple mention en façade.",
    keyPoints: ["Espèce et partie utilisées", "Extrait ou poudre brute", "Dose par portion", "Base café, céréale ou cacao"],
    criteria: [
      { title: "Champignons", text: "Lion’s Mane, Chaga, Reishi et Cordyceps n’ont ni le même historique ni les mêmes usages revendiqués." },
      { title: "Plantes", text: "Les plantes dites adaptogènes doivent être identifiées précisément, avec une vigilance particulière sur les contre-indications." },
      { title: "Goût réel", text: "Une formule peut ressembler à un café, à un cacao ou à une boisson de céréales : nous le précisons avant la promesse fonctionnelle." },
    ],
    faq: [
      { question: "Le café aux champignons goûte-t-il le champignon ?", answer: "Pas toujours. Le café, le cacao ou les céréales peuvent masquer les notes terreuses, mais le résultat varie fortement." },
      { question: "Corps fructifère ou mycélium ?", answer: "Cette information aide à comprendre la matière utilisée, mais elle ne remplace pas les données d’extraction, de standardisation et de dose." },
      { question: "Ces produits conviennent-ils à tout le monde ?", answer: "Non nécessairement. Les plantes et extraits peuvent présenter des précautions, notamment avec certains traitements ou situations médicales." },
    ], productIds: ["bonjour", "brainstoorm", "frenchmush", "guerriers", "strate"],
  },
  {
    slug: "cafe-nutrition-performance", eyebrow: "Famille 04", title: "Cafés nutritionnels et de performance", color: "gold", icon: "N",
    description: "Protéines, whey, collagène, créatine et MCT : choisir selon l’usage nutritionnel réel, pas selon la tendance.",
    intro: "Le café devient ici un véhicule nutritionnel. Certaines formules visent une collation protéinée, d’autres une routine collagène ou un usage sportif. Les grammes par portion, la source de l’actif, les calories et la tolérance digestive doivent être visibles immédiatement.",
    keyPoints: ["Grammes par portion", "Source de l’actif", "Calories, sucres et édulcorants", "Usage avant ou après l’effort"],
    criteria: [
      { title: "Protéines", text: "Whey, végétal et collagène n’ont pas le même profil d’acides aminés ni le même rôle nutritionnel." },
      { title: "Collagène", text: "Son origine animale, sa quantité et le prix pour une dose comparable doivent être indiqués." },
      { title: "Créatine et MCT", text: "Le dosage, la tolérance et l’intérêt d’une association systématique au café doivent être examinés séparément." },
    ],
    faq: [
      { question: "Un café protéiné remplace-t-il un petit-déjeuner ?", answer: "Pas automatiquement. Il faut considérer l’ensemble des protéines, fibres, calories et micronutriments apportés." },
      { question: "Le collagène est-il végétalien ?", answer: "Non. Le collagène commercial est d’origine animale, généralement bovine ou marine." },
      { question: "Faut-il prendre la créatine avec du café ?", answer: "Le café peut être un support pratique, mais la pertinence dépend surtout de la dose totale, de la régularité et de la tolérance individuelle." },
    ], productIds: ["cafit", "corial", "cosmicblend", "wake"],
  },
  {
    slug: "cafe-multi-actifs", eyebrow: "Famille 05", title: "Cafés multi-actifs : les formules all-in-one", color: "blue", icon: "+",
    description: "Plusieurs promesses dans une tasse : comment évaluer une formule qui combine champignons, plantes, nutriments et caféine.",
    intro: "Les cafés all-in-one veulent simplifier la routine en réunissant plusieurs familles d’actifs. Leur commodité est réelle, mais la comparaison devient difficile lorsque les quantités sont regroupées ou que chaque ingrédient est présent à une dose très faible.",
    keyPoints: ["Quantité de chaque actif", "Absence de mélange propriétaire opaque", "Compatibilité entre ingrédients", "Coût face à des produits séparés"],
    criteria: [
      { title: "La lisibilité", text: "Une formule complète doit être plus transparente, pas moins : chaque dose doit pouvoir être comprise." },
      { title: "La cohérence", text: "Les actifs doivent répondre à un usage commun plutôt qu’accumuler des promesses sans hiérarchie." },
      { title: "La tolérance", text: "Plus il y a d’ingrédients, plus il devient difficile d’identifier la cause d’un effet indésirable." },
    ],
    faq: [
      { question: "Un all-in-one remplace-t-il plusieurs compléments ?", answer: "Seulement si les actifs et les doses sont comparables, ce qui doit être vérifié sur l’étiquette." },
      { question: "Pourquoi les mélanges propriétaires posent-ils problème ?", answer: "Ils peuvent indiquer une quantité totale sans révéler la dose de chaque ingrédient." },
      { question: "À qui cette famille convient-elle ?", answer: "Aux personnes qui privilégient la commodité et acceptent une formule complexe, après vérification des ingrédients et précautions." },
    ], productIds: ["bonjour", "wake", "brainstoorm", "strate", "cosmicblend"],
  },
  {
    slug: "alternatives-derives-cafe", eyebrow: "Univers 03", title: "Alternatives et dérivés du café", color: "gold", icon: "03",
    description: "Chicorée, lupin, céréales torréfiées, cascara et fruit du caféier : tout ce qui prolonge le rituel sans être un espresso classique.",
    intro: "Cet univers accueille deux familles souvent confondues : les alternatives fabriquées avec d’autres plantes, et les produits provenant bien du caféier mais consommés autrement. Leur intérêt se mesure d’abord au goût recherché, à la caféine et au rituel que l’on souhaite conserver.",
    keyPoints: ["Origine botanique réelle", "Présence et quantité de café", "Caféine par tasse", "Goût et préparation"],
    criteria: [
      { title: "Alternatives", text: "Chicorée, lupin et céréales cherchent surtout à reproduire des notes torréfiées, souvent avec moins ou sans caféine." },
      { title: "Boissons hybrides", text: "Une petite quantité de café peut cohabiter avec une base majoritaire de cacao, céréales ou plantes." },
      { title: "Dérivés du fruit", text: "Cascara, café vert et fruit complet viennent du caféier, mais leur tasse et leur usage diffèrent du café torréfié." },
    ],
    faq: [
      { question: "La chicorée est-elle du café ?", answer: "Non. C’est une autre plante dont la racine torréfiée produit une boisson aux notes grillées." },
      { question: "La cascara contient-elle de la caféine ?", answer: "Elle peut en contenir, avec une teneur dépendant du produit et de la préparation." },
      { question: "Pourquoi conserver ces produits sur cafeadaptogene.com ?", answer: "Parce qu’ils répondent souvent à la même intention : garder un rituel chaud et fonctionnel en modifiant le café classique." },
    ], productIds: ["cafeintegral", "bonjour", "wake"],
  },
  {
    slug: "alternatives-cafe", eyebrow: "Famille 06", title: "Alternatives au café et boissons hybrides", color: "sand", icon: "A",
    description: "Chicorée, lupin, orge, petit épeautre et sarrasin torréfiés : comparer le goût, la caféine et la composition.",
    intro: "Les alternatives au café utilisent d’autres racines, graines ou céréales torréfiées pour produire une boisson brune et réconfortante. Les boissons hybrides y ajoutent parfois une petite quantité de café ou un extrait de caféine. Elles doivent être décrites selon leur ingrédient principal, pas seulement selon leur ressemblance visuelle avec le café.",
    keyPoints: ["Ingrédient majoritaire", "Présence de gluten ou allergènes", "Caféine ajoutée ou naturelle", "Sucres et arômes"],
    criteria: [
      { title: "Chicorée", text: "Naturellement sans caféine, elle apporte amertume et notes torréfiées, avec un profil distinct du café." },
      { title: "Lupin et graines", text: "Ils peuvent offrir un rituel proche du filtre tout en demandant une attention particulière aux allergènes." },
      { title: "Hybrides", text: "Le pourcentage de café ou la dose d’extrait de caféine doit être indiqué pour comprendre l’effet stimulant." },
    ],
    faq: [
      { question: "Quelle alternative ressemble le plus au café ?", answer: "Cela dépend de la torréfaction et de la recette ; aucune ne reproduit exactement un espresso, mais certaines approchent ses notes grillées." },
      { question: "Toutes les alternatives sont-elles sans caféine ?", answer: "Non. Certaines boissons hybrides ajoutent du café ou un extrait de caféine." },
      { question: "Les céréales torréfiées contiennent-elles du gluten ?", answer: "L’orge, le seigle et l’épeautre en contiennent ; il faut vérifier l’étiquette et les procédés revendiqués par la marque." },
    ], productIds: ["bonjour", "wake"],
  },
  {
    slug: "produits-cerise-cafe", eyebrow: "Famille 07", title: "Produits fonctionnels issus de la cerise de café", color: "rose", icon: "F",
    description: "Cascara, café vert, fruit entier et extraits : les usages fonctionnels du caféier au-delà du grain torréfié.",
    intro: "Le caféier produit un fruit dont le grain n’est qu’une partie. Cette famille explore la peau et la pulpe séchées, le café vert, le fruit complet et ses extraits. Ces produits appartiennent bien à l’univers du caféier, mais pas nécessairement à celui du goût et de la préparation d’un café classique.",
    keyPoints: ["Partie du fruit utilisée", "Séchage et transformation", "Caféine et polyphénols", "Infusion, poudre ou extrait"],
    criteria: [
      { title: "Cascara", text: "La peau et la pulpe séchées s’infusent généralement comme une tisane fruitée." },
      { title: "Café vert", text: "Non torréfié, il possède un profil gustatif et une composition différents du café brun." },
      { title: "Fruit complet", text: "Il cherche à valoriser plusieurs parties de la cerise et doit expliquer précisément son procédé." },
    ],
    faq: [
      { question: "Pourquoi cette famille est-elle séparée du café intrinsèquement fonctionnel ?", answer: "Parce que ces produits ne conservent pas toujours le goût, l’extraction et le rituel d’un café torréfié." },
      { question: "La cascara est-elle un déchet valorisé ?", answer: "Elle provient d’une partie souvent écartée lors de la préparation du grain ; sa valorisation peut créer un produit distinct." },
      { question: "Le café vert a-t-il le goût du café ?", answer: "Non. Sans torréfaction, son profil est généralement plus végétal et moins marqué par les arômes grillés." },
    ], productIds: ["cafeintegral"],
  },
];

export const supportGuides: Guide[] = [
  {
    slug: "methodologie", eyebrow: "Transparence", title: "Notre méthode de comparaison", color: "blue", icon: "M",
    description: "Comment Café Adaptogène classe, vérifie et compare des produits qui ne jouent pas tous dans la même catégorie.",
    intro: "Nous commençons par classer le produit avant de le noter. Une chicorée, un espresso et un café au collagène ne concourent pas dans le même classement. Chaque fiche sépare composition vérifiée, déclarations de la marque, niveau de preuve et appréciation éditoriale.",
    keyPoints: ["Une catégorie principale par produit", "Données normalisées par tasse", "Critères propres à chaque famille", "Date et source de vérification"],
    criteria: [
      { title: "Socle commun", text: "Goût, transparence, préparation, prix par tasse et qualité de l’information sont comparés pour tous." },
      { title: "Critères spécialisés", text: "Dosage protéique, type d’extrait ou fidélité au goût du café n’ont pas le même poids selon la catégorie." },
      { title: "Indépendance", text: "Une relation commerciale est signalée et ne modifie jamais la formule de calcul du questionnaire ou d’un classement." },
    ],
    faq: [
      { question: "Les produits sont-ils tous testés physiquement ?", answer: "Non. Une fiche précise ce qui provient d’un test, de l’étiquette ou des déclarations publiques de la marque." },
      { question: "Comment sont traités les prix ?", answer: "Nous privilégions le prix par portion à la dose recommandée et indiquons la date de vérification." },
      { question: "Une marque peut-elle acheter sa note ?", answer: "Non. Elle peut corriger une donnée factuelle documentée, jamais choisir le résultat éditorial." },
    ],
  },
  {
    slug: "politique-affiliation", eyebrow: "Indépendance", title: "Financement et politique d’affiliation", color: "sage", icon: "€",
    description: "Comment le site peut être rémunéré sans transformer ses recommandations en publicité déguisée.",
    intro: "Certains liens peuvent générer une commission lorsque vous achetez un produit. Cela n’augmente pas votre prix. Les relations directes avec Torrégral, Café Intégral et Café Minceur sont indiquées ; elles n’accordent aucun bonus automatique dans les classements ou le questionnaire.",
    keyPoints: ["Liens commerciaux signalés", "Aucun classement acheté", "Même grille pour toutes les marques", "Alternative non affiliée toujours possible"],
    criteria: [
      { title: "Signalement local", text: "La nature commerciale d’un lien est indiquée près du bouton concerné, pas seulement dans le pied de page." },
      { title: "Séparation", text: "Le modèle de données et les scores sont définis indépendamment du taux de commission." },
      { title: "Corrections", text: "Une marque peut fournir une source ou demander la correction d’un fait, mais pas réécrire notre appréciation." },
    ],
    faq: [
      { question: "Les liens affiliés changent-ils le prix ?", answer: "En principe non ; la commission est versée par le marchand selon son programme." },
      { question: "Pourquoi Torrégral apparaît-il souvent ?", answer: "Parce qu’il correspond à plusieurs profils recherchant un vrai goût de café et une fonctionnalité intrinsèque. Il ne gagne pas pour les profils collagène, protéines, champignons ou sans caféine." },
      { question: "Les marques sans affiliation sont-elles comparées ?", answer: "Oui. L’objectif est de couvrir le marché, qu’un programme commercial existe ou non." },
    ],
  },
];

export const allGuides = [...taxonomyGuides, ...guides, ...supportGuides];

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
