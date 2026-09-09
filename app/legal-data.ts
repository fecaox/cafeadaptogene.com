export type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
  links?: { label: string; url: string }[];
};

export type LegalDocument = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  alert?: string;
  sections: LegalSection[];
};

const legalContact = "contact@cafeminceur.fr";

export const legalDocuments: LegalDocument[] = [
  {
    slug: "mentions-legales",
    eyebrow: "Identification",
    title: "Mentions légales",
    description: "Identification de l’éditeur, de la publication et de l’hébergeur de CaféAdaptogène.com.",
    intro: "Cette page rassemble les informations d’identification du site CaféAdaptogène.com et les coordonnées permettant de joindre son éditeur.",
    alert: "Informations restant à compléter : forme juridique, capital social, numéro SIREN ou RCS, adresse postale complète, téléphone et identité du directeur de la publication. Aix-en-Provence désigne actuellement la ville d’établissement communiquée par l’éditeur.",
    sections: [
      {
        title: "Éditeur du site",
        items: [
          "Nom commercial et éditeur : CaféAdaptogène.com",
          "Établissement déclaré : Aix-en-Provence, France",
          `Adresse électronique : ${legalContact}`,
          "Site : https://cafeadaptogene.com",
        ],
      },
      {
        title: "Direction de la publication",
        paragraphs: [
          "L’identité du directeur ou de la directrice de la publication doit encore être communiquée et publiée. Pour toute demande relative à un contenu, utilisez l’adresse électronique de l’éditeur.",
        ],
      },
      {
        title: "Hébergement",
        paragraphs: [
          "Le site est hébergé par Obambu SARL, 10 rue de Penthièvre, 75008 Paris, France. L’hébergeur peut être contacté à l’adresse info@obambu.com.",
        ],
        links: [{ label: "Site de l’hébergeur", url: "https://obambu.com/fr/" }],
      },
      {
        title: "Propriété intellectuelle",
        paragraphs: [
          "La structure, la mise en page, les textes et les éléments graphiques créés pour le site sont protégés par le droit applicable. Leur reproduction substantielle nécessite l’autorisation préalable de l’éditeur.",
          "Les marques, photographies de produits et contenus appartenant à des tiers restent la propriété de leurs titulaires. Leur présence dans un annuaire, une comparaison ou une citation n’implique aucune affiliation, sauf mention explicite.",
        ],
      },
      {
        title: "Responsabilité éditoriale",
        paragraphs: [
          "Les informations sont publiées à titre général et peuvent évoluer. Elles ne constituent ni un diagnostic, ni une prescription, ni un avis médical. Les sources, dates de vérification et incertitudes sont indiquées lorsqu’elles sont déterminantes.",
          "Pour demander la correction d’une donnée factuelle ou signaler un contenu, écrivez à l’adresse de contact en joignant la source concernée.",
        ],
      },
    ],
  },
  {
    slug: "politique-de-confidentialite",
    eyebrow: "Données personnelles",
    title: "Politique de confidentialité",
    description: "Données traitées, finalités, durées de conservation et droits des visiteurs de CaféAdaptogène.com.",
    intro: "CaféAdaptogène.com limite la collecte aux informations que vous choisissez de transmettre, notamment lorsque vous écrivez au site ou préparez une demande de précommande.",
    sections: [
      {
        title: "Responsable du traitement",
        paragraphs: [
          `Le responsable du traitement est CaféAdaptogène.com, établi à Aix-en-Provence, France. Pour toute question relative à vos données personnelles, écrivez à ${legalContact}.`,
        ],
      },
      {
        title: "Données et finalités",
        items: [
          "Correspondance : adresse électronique, identité communiquée, contenu du message et pièces jointes éventuelles, afin de répondre à votre demande.",
          "Précommande : produit, quantité souhaitée et informations contenues dans l’e-mail préparé par le site, afin de traiter votre demande et de vous recontacter.",
          "Sécurité : données techniques strictement nécessaires à la livraison et à la protection du site, susceptibles d’apparaître dans les journaux de l’hébergeur.",
        ],
      },
      {
        title: "Bases légales et destinataires",
        paragraphs: [
          "Le traitement d’une demande repose sur l’intérêt légitime de répondre aux messages reçus. Les échanges relatifs à une précommande reposent sur les démarches précontractuelles demandées par la personne concernée. Les obligations comptables ou légales s’appliquent si une vente est ensuite conclue.",
          "Les données sont accessibles uniquement aux personnes habilitées à traiter les demandes et, lorsque cela est nécessaire, aux prestataires techniques de messagerie et d’hébergement. Elles ne sont pas vendues.",
        ],
      },
      {
        title: "Durées de conservation",
        items: [
          "Demandes générales et commerciales : jusqu’à trois ans après le dernier échange utile.",
          "Demandes de précommande non confirmées : jusqu’à leur traitement, puis au maximum trois ans après le dernier contact.",
          "Documents liés à une vente conclue : pendant les durées imposées par les obligations comptables, fiscales ou de preuve applicables.",
          "Journaux techniques : selon la durée nécessaire à la sécurité du service et les règles appliquées par l’hébergeur.",
        ],
      },
      {
        title: "Vos droits",
        paragraphs: [
          `Vous disposez notamment d’un droit d’accès, de rectification, d’effacement, de limitation et, selon la base légale, d’opposition ou de portabilité. Adressez votre demande à ${legalContact}. Une preuve d’identité peut être demandée uniquement en cas de doute raisonnable sur votre identité.`,
          "Si vous estimez, après avoir contacté le site, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.",
        ],
        links: [{ label: "Comprendre vos droits sur le site de la CNIL", url: "https://www.cnil.fr/fr/les-droits-des-personnes-sur-leurs-donnees" }],
      },
      {
        title: "Transferts et évolution",
        paragraphs: [
          "Aucun transfert volontaire de données hors de l’Espace économique européen n’est organisé par le site à ce jour. Les prestataires techniques restent soumis à leurs propres conditions et garanties. Cette politique sera mise à jour avant l’ajout d’un nouveau service qui modifierait les traitements décrits.",
        ],
      },
    ],
  },
  {
    slug: "politique-cookies",
    eyebrow: "Traceurs",
    title: "Politique relative aux cookies",
    description: "État des cookies et traceurs utilisés par CaféAdaptogène.com et règles applicables à leur évolution.",
    intro: "Dans sa version actuelle, le site fonctionne sans outil publicitaire, sans mesure d’audience et sans compte utilisateur.",
    sections: [
      {
        title: "Situation actuelle",
        paragraphs: [
          "CaféAdaptogène.com ne dépose aucun cookie publicitaire et n’intègre aucun outil de mesure d’audience. Les vidéos sont servies directement depuis le site et ne proviennent pas d’une plateforme tierce susceptible de suivre la navigation.",
          "Aucun bandeau de consentement n’est affiché, puisqu’aucun traceur soumis au consentement n’est actuellement déclenché par le site.",
        ],
      },
      {
        title: "Cookies strictement nécessaires",
        paragraphs: [
          "L’infrastructure d’hébergement peut utiliser des mécanismes techniques indispensables à la sécurité, à la transmission des pages ou à la protection contre les abus. Lorsqu’ils sont strictement nécessaires au service demandé, ces mécanismes ne requièrent pas de consentement préalable.",
        ],
      },
      {
        title: "Évolution de cette politique",
        paragraphs: [
          "Avant d’ajouter une solution d’analyse, un pixel publicitaire, une vidéo tierce ou un autre traceur non essentiel, le site mettra en place une information préalable et un choix permettant d’accepter ou de refuser avec la même simplicité.",
          "Le retrait du consentement devra rester accessible à tout moment. Cette page sera mise à jour avec la liste des services, leur finalité, leur durée et leurs destinataires.",
        ],
        links: [{ label: "Règles de la CNIL sur les cookies", url: "https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi" }],
      },
      {
        title: "Questions",
        paragraphs: [`Pour toute question sur les traceurs ou les données personnelles, écrivez à ${legalContact}.`],
      },
    ],
  },
  {
    slug: "conditions-utilisation",
    eyebrow: "Règles du site",
    title: "Conditions d’utilisation",
    description: "Règles applicables à la consultation et à l’utilisation des contenus de CaféAdaptogène.com.",
    intro: "La consultation du site implique le respect des présentes conditions. Elles encadrent un média comparatif et ne remplacent pas les conditions contractuelles d’un marchand tiers.",
    sections: [
      {
        title: "Objet du site",
        paragraphs: [
          "CaféAdaptogène.com publie des guides, comparaisons, annuaires et présentations de cafés fonctionnels. Les contenus visent à faciliter la compréhension du marché à partir des informations disponibles au moment de leur mise à jour.",
        ],
      },
      {
        title: "Information générale",
        paragraphs: [
          "Les contenus ne constituent pas un conseil médical, nutritionnel personnalisé ou financier. Une allégation publiée par une marque est distinguée, autant que possible, d’un fait mesuré ou d’une appréciation éditoriale.",
          "Les personnes enceintes ou allaitantes, les mineurs, les personnes sensibles à la caféine, sous traitement ou concernées par une pathologie doivent demander un avis professionnel adapté.",
        ],
      },
      {
        title: "Liens externes et affiliation",
        paragraphs: [
          "Le site contient des liens vers des marques et marchands tiers. CaféAdaptogène.com ne contrôle ni leur disponibilité, ni leurs prix, ni leurs politiques. Certains liens peuvent donner lieu à une commission, sans modifier le prix payé par l’utilisateur. Leur caractère commercial est signalé.",
        ],
        links: [{ label: "Politique d’affiliation", url: "/politique-affiliation/" }],
      },
      {
        title: "Utilisation autorisée",
        items: [
          "Consulter, partager un lien et citer un extrait court avec attribution.",
          "Ne pas extraire massivement les données, contourner les mesures de sécurité ou perturber le fonctionnement du site.",
          "Ne pas reproduire une partie substantielle de la base, des textes ou de la présentation sans autorisation.",
        ],
      },
      {
        title: "Disponibilité et corrections",
        paragraphs: [
          `Le site peut être modifié ou interrompu pour maintenance. Une erreur factuelle peut être signalée à ${legalContact} avec une source et sa date. L’éditeur examine les demandes sans garantir un délai de publication immédiat.`,
        ],
      },
    ],
  },
  {
    slug: "conditions-precommande",
    eyebrow: "Réservations",
    title: "Conditions des demandes de précommande",
    description: "Fonctionnement des demandes de précommande préparées depuis CaféAdaptogène.com.",
    intro: "Les boutons de précommande du site préparent un e-mail. Ils ne déclenchent aucun paiement et ne concluent pas, à eux seuls, une vente.",
    alert: "Aucune commande ferme n’est actuellement encaissée sur CaféAdaptogène.com. Une vente ne sera conclue qu’après communication des informations finales, acceptation expresse des conditions applicables et confirmation du vendeur.",
    sections: [
      {
        title: "Fonctionnement",
        items: [
          "Vous choisissez un produit et une quantité indicative.",
          "Le site prépare un e-mail récapitulatif que vous pouvez modifier avant de l’envoyer.",
          "L’envoi manifeste seulement votre intérêt et permet d’être recontacté.",
          "Aucune donnée bancaire n’est demandée et aucun paiement n’est effectué sur le site.",
        ],
      },
      {
        title: "Prix affichés",
        paragraphs: [
          "Pour les produits présentés à 2 euros le sachet et 4 euros de livraison forfaitaire, le total affiché reste indicatif tant qu’une offre finale n’a pas été confirmée. La quantité peut être personnalisée.",
          "Avant toute vente, le vendeur communiquera le prix total, les taxes éventuelles, la composition et l’étiquetage définitifs, le délai estimé, le mode de paiement, les conditions de livraison et les garanties applicables.",
        ],
      },
      {
        title: "Confirmation ou annulation",
        paragraphs: [
          `Vous pouvez retirer votre demande sans frais avant toute confirmation en écrivant à ${legalContact}. Le vendeur peut également ne pas donner suite si le produit, la quantité ou la date de lancement ne peut pas être confirmé.`,
          "Le contrat ne sera formé qu’après une acceptation claire de l’offre finale par le client et une confirmation du vendeur. Les conditions générales de vente définitives seront alors remises sur un support durable.",
        ],
      },
      {
        title: "Données personnelles",
        paragraphs: [
          "Les informations contenues dans l’e-mail servent uniquement à traiter la demande, répondre au demandeur et préparer une éventuelle relation contractuelle.",
        ],
        links: [{ label: "Consulter la politique de confidentialité", url: "/politique-de-confidentialite/" }],
      },
      {
        title: "Réclamations et médiation",
        paragraphs: [
          `Toute réclamation doit d’abord être envoyée à ${legalContact}. Si une vente est conclue, les coordonnées du médiateur de la consommation choisi par le vendeur devront figurer dans les conditions définitives. Aucun médiateur n’a encore été communiqué pour publication.`,
        ],
      },
    ],
  },
  {
    slug: "livraison-retours",
    eyebrow: "Après-vente",
    title: "Livraison, rétractation et retours",
    description: "Principes de livraison, de rétractation et de retour applicables aux produits présentés sur CaféAdaptogène.com.",
    intro: "Cette page présente les principes prévus pour les futures ventes. Les demandes actuelles de précommande ne sont ni payées ni confirmées et peuvent être retirées sans frais avant la conclusion d’un contrat.",
    sections: [
      {
        title: "Livraison",
        paragraphs: [
          "Pour les offres indiquant un forfait de 4 euros, ce forfait est prévu quelle que soit la quantité de sachets. La zone desservie, le transporteur et le délai seront confirmés avant tout paiement.",
          "Le risque de perte ou d’endommagement est transféré au consommateur lorsqu’il prend physiquement possession du colis, sauf cas prévu par la loi.",
        ],
      },
      {
        title: "Droit de rétractation",
        paragraphs: [
          `Lorsqu’un droit de rétractation s’applique à une vente à distance, le consommateur dispose en principe de quatorze jours à compter de la réception du bien pour notifier sa décision à ${legalContact}, sans avoir à la justifier. Le produit doit ensuite être renvoyé dans le délai légal.`,
          "Les exceptions prévues par la loi restent applicables, notamment pour les biens susceptibles de se détériorer rapidement et, sous les conditions légales, pour les produits scellés ne pouvant être renvoyés pour des raisons d’hygiène ou de protection de la santé après avoir été descellés.",
        ],
      },
      {
        title: "État et frais de retour",
        paragraphs: [
          "Les sachets retournés doivent être non ouverts, complets, en très bon état et protégés pour le transport. La responsabilité du consommateur peut être engagée en cas de dépréciation résultant de manipulations allant au-delà de ce qui est nécessaire pour vérifier la nature et les caractéristiques du produit.",
          "Les frais directs du retour pour rétractation sont à la charge du consommateur. Une adresse de retour complète et les instructions seront communiquées avant l’expédition. Aucun retour ne doit être envoyé à la seule mention « Aix-en-Provence ».",
        ],
      },
      {
        title: "Remboursement",
        paragraphs: [
          "En cas de rétractation valable, les sommes dues sont remboursées dans le délai légal. Le remboursement peut être différé jusqu’à la récupération des biens ou jusqu’à la fourniture d’une preuve d’expédition, selon la première de ces dates.",
          "Un produit non conforme, endommagé ou reçu par erreur relève des garanties légales et doit être signalé rapidement. Les frais nécessaires à sa mise en conformité ne sont pas mis à la charge du consommateur.",
        ],
      },
      {
        title: "Réclamation et médiation",
        paragraphs: [
          `Contactez d’abord ${legalContact} en indiquant la référence, la date et le motif de votre demande. Si une vente est conclue et qu’aucune solution amiable n’est trouvée, le consommateur pourra saisir gratuitement le médiateur désigné dans les conditions de vente définitives.`,
        ],
        links: [{ label: "Informations officielles sur le droit de rétractation", url: "https://www.economie.gouv.fr/particuliers/mes-droits-conso/bien-consommer/vente-distance-tout-savoir-sur-votre-droit-de-retractation" }],
      },
    ],
  },
];

export const legalDocumentBySlug = new Map(legalDocuments.map((document) => [document.slug, document]));
