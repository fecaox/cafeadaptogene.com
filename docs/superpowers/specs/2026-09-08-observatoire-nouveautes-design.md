# Observatoire des nouveautés du café fonctionnel — conception

## Objectif

Actualiser l’inventaire des cafés fonctionnels au 8 septembre 2026 et publier une page hybride qui combine veille de marché, sélection éditoriale et accès aux fiches détaillées. La page doit devenir une porte d’entrée récurrente pour les lecteurs, les moteurs de recherche et les assistants d’IA sans dupliquer l’annuaire.

## Public et promesse

La page s’adresse d’abord aux consommateurs français qui veulent savoir ce qui vient réellement de changer : lancement, nouvelle formule, nouveau conditionnement, changement de prix, arrivée en France ou disparition d’un produit. Elle répond immédiatement à trois questions : qu’est-ce qui est nouveau, qu’est-ce qui est vérifié et qu’est-ce qui est achetable en France ?

## Périmètre de recherche

- Recontrôler toutes les références françaises et européennes disponibles en France.
- Recontrôler les références internationales structurantes lorsqu’elles influencent le marché français.
- Rechercher de nouvelles marques et de nouveaux produits apparus depuis la précédente vérification du 1er août 2026.
- Utiliser en priorité les pages produit, fiches nutritionnelles, FAQ, communiqués et catalogues officiels.
- Dater chaque observation et conserver les données non vérifiables comme telles.

## Modèle éditorial

Chaque changement recevra un type explicite : `lancement`, `reformulation`, `nouveau format`, `prix modifié`, `disponibilité modifiée`, `source déplacée` ou `produit retiré/introuvable`. Le mot « nouveauté » ne sera employé que lorsqu’une date ou un changement observable peut être documenté.

La sélection éditoriale reposera sur des critères publics : disponibilité en France, transparence du dosage, clarté de la caféine, originalité réelle de la formule, qualité de la source et intérêt par rapport aux produits déjà recensés. Il n’y aura ni podium arbitraire ni promesse d’efficacité.

## Page créée

Route : `/nouveautes-cafes-fonctionnels/`

Structure :

1. Réponse directe et date de mise à jour.
2. Compteurs : nouveaux produits, changements vérifiés, produits disponibles en France et références sous vigilance.
3. Sélection des nouveautés les plus intéressantes, avec raison factuelle et source officielle.
4. Fil chronologique des lancements et changements.
5. Bloc « Ce qui a disparu ou reste incertain ».
6. Méthode de sélection et limites.
7. Liens vers l’annuaire complet, le comparateur et le questionnaire.

## Données et architecture

Le fichier CSV reste la source éditoriale principale. Les changements seront représentés par des champs explicites dans les données publiques générées, afin que la page puisse être reconstruite automatiquement et que les badges de l’annuaire restent cohérents. Les statistiques et la date de mise à jour seront calculées depuis les données plutôt qu’écrites à plusieurs endroits.

La nouvelle page utilisera une couche de données dédiée dérivée de l’inventaire, sans recopier manuellement les fiches produit. Les pages de marques et l’annuaire continueront d’utiliser les mêmes données générées.

## SEO et GEO

- Titre ciblé sur « nouveautés cafés fonctionnels et adaptogènes 2026 ».
- Réponse courte dans le premier écran, puis données structurées `CollectionPage` et `ItemList`.
- Dates de vérification visibles, liens vers les sources officielles et formulation précise des inconnues.
- Ajout au sitemap, au maillage de l’accueil et de l’annuaire.
- Pas de données structurées `Review`, `AggregateRating` ou `Product` sans données marchandes complètes et légitimes.

## Ton, neutralité et confidentialité

Le ton reste expert, sobre et utile. Les affirmations de marque sont attribuées et ne deviennent pas des conclusions médicales. Le site ne révèle aucun lien capitalistique ou opérationnel entre cafeadaptogene.com et Torrégral, Café Intégral ou Café Minceur. Torrégral et Café Intégral peuvent être reliés publiquement uniquement lorsque cette relation est nécessaire à la compréhension du produit.

## Expérience visuelle

La page prolonge l’identité éditoriale existante, avec une silhouette de « journal de veille » : dates très visibles, cartes compactes, étiquettes de changement et contraste clair entre nouveautés confirmées et signaux faibles. Elle reste responsive, lisible au clavier et utilisable sans interaction complexe.

## Validation

- Tests de génération et de rendu pour la route, les métadonnées, le sitemap et les liens essentiels.
- Vérification que les compteurs correspondent aux données.
- Build de production et contrôle des pages exportées.
- Relecture des formulations santé, des dates, des prix et des sources avant publication.
