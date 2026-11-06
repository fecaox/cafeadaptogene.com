# Baromètre français des cafés fonctionnels 2027 — conception

## Intention

Créer sur Café Adaptogène une publication annuelle de référence, utile aux consommateurs, journalistes, blogs et agents IA. Le baromètre doit rendre le marché français des cafés fonctionnels plus lisible sans transformer des données incomplètes en classement commercial trompeur.

L’édition s’intitule « Baromètre français des cafés fonctionnels 2027 ». Elle est publiée en novembre 2026 à partir des données arrêtées au 6 novembre 2026. Le millésime désigne l’édition de référence pour 2027, pas une observation réalisée en 2027.

## Objectifs

- Publier une page canonique à l’URL `/barometre-cafes-fonctionnels-2027/`.
- Comparer prix par tasse, caféine, familles d’ingrédients et transparence.
- Distinguer l’univers recensé, le panel France qualifié et chaque sous-échantillon réellement calculable.
- Rendre les résultats citables grâce à une méthode explicite, des sources datées, des graphiques téléchargeables et des fichiers CSV/JSON.
- Intégrer le baromètre au corpus public destiné aux moteurs, agents IA et au MCP existant.
- Établir un format annuel réutilisable sans ajouter une dépendance de visualisation.

## Non-objectifs

- Désigner un « meilleur café » ou produire un palmarès de santé.
- Évaluer l’efficacité clinique des produits finis.
- Convertir artificiellement les prix en devises étrangères.
- Combler des valeurs absentes par estimation silencieuse.
- Présenter les marques liées à l’éditeur comme mieux classées ou leur accorder un bonus.
- Faire croire que les 143 références sont toutes vendues activement en France.

## Anti-objectifs

Le baromètre serait un échec si une moyenne ne précisait pas son échantillon, si une donnée marketing était présentée comme une mesure indépendante, si les sources devenaient impossibles à retrouver, ou si le site utilisait la publication comme comparatif publicitaire déguisé.

## Contraintes

- Réutiliser la base `data/marques-cafe-fonctionnel.csv`, source de vérité actuelle de 143 références.
- Préserver les mentions « non publié », les fourchettes et les contradictions.
- Ne jamais exposer l’adresse privée `fecaox@gmail.com` ni les liens privés de propriété entre marques.
- Le lien commercial ou éditorial d’une marque avec l’écosystème doit être signalé localement lorsqu’il est pertinent, sans influer sur les règles d’inclusion ou les calculs.
- Le site reste statique, construit avec Next.js 16/React 19 et Vinext/Cloudflare, sans bibliothèque graphique additionnelle.
- Les fichiers produits doivent être déterministes afin que les tests puissent vérifier les chiffres et les versions.

## Approches considérées

### 1. Toutes les références dans tous les calculs

Cette approche maximise la couverture, mais mélange produits indisponibles en France, fiches retirées, données manquantes et devises incompatibles. Elle donnerait des moyennes fragiles.

### 2. Panel France strict uniquement

Cette approche ne publierait que les produits français très documentés. Elle rend les calculs solides, mais cache l’ampleur du marché suivi et réduit la valeur de la base téléchargeable.

### 3. Architecture hybride retenue

Les 143 références restent accessibles dans l’univers recensé et dans le jeu de données complet. Les analyses principales utilisent un panel France qualifié. Chaque indicateur plus exigeant — prix ou caféine — repose sur un sous-échantillon annoncé. Cette architecture combine couverture, honnêteté méthodologique et réutilisabilité.

## Périmètres de données

### Univers recensé

Toutes les lignes valides de la base. Il sert à décrire la couverture du travail et alimente le fichier complet, sans être utilisé automatiquement pour les moyennes.

### Panel France qualifié

Une référence entre dans le panel si, au jour d’arrêt des données :

1. `disponibilite_france` commence par « oui » ;
2. `statut_commercial_actuel` commence par « actif » ;
3. `statut_verification` vaut A ou B ;
4. une URL de source officielle valide est présente.

Avec la base au 6 novembre 2026, ces règles produisent 35 produits et 32 marques. Ces nombres sont calculés, jamais saisis à la main dans la page.

### Sous-échantillon prix

Il comprend uniquement les produits du panel dont `prix_par_portion_observe` contient une valeur en euros exploitable. Une valeur unique devient minimum = maximum = point central. Une fourchette utilise son minimum, son maximum et son point central arithmétique pour les indicateurs agrégés. Les prix en dollars, les prix non calculables, les simples mentions « moins de » et les abonnements sans équivalent comparable restent visibles dans le fichier mais sont exclus des agrégats.

Les graphiques publient les fourchettes lorsque disponibles. Le texte indique la médiane des points centraux, la plage observée et la taille `n` de l’échantillon. La médiane est préférée à la moyenne comme chiffre principal, car elle résiste mieux aux extrêmes et aux promotions.

### Sous-échantillon caféine

Il comprend les produits du panel disposant de valeurs numériques dans `cafeine_mg_min` et/ou `cafeine_mg_max`. Les fourchettes conservent leurs deux bornes ; le point central sert aux agrégats. Les valeurs zéro sont incluses. Une comparaison verbale (« deux fois moins qu’un café ») sans milligrammes est exclue.

Le graphique principal répartit les produits selon les catégories existantes : sans caféine, faible (≤ 50 mg), modérée (51–100 mg), élevée (> 100 mg). Les chiffres portent sur les valeurs annoncées ou publiées par les marques, pas sur des analyses indépendantes.

### Ingrédients

Les familles sont détectées à partir des champs structurés, avec chevauchement autorisé : champignons, plantes/nootropiques, protéines, collagène, créatine, MCT, alternatives torréfiées/sans café. Un produit peut appartenir à plusieurs familles ; le graphique et le fichier le précisent, de sorte que les pourcentages n’ont pas à totaliser 100 %.

### Transparence

Les variantes commençant par « élevée » sont normalisées en « élevée » ; les autres classes restent « partielle » et « faible ». Le score ne mesure ni l’efficacité ni la qualité gustative. Il reflète la disponibilité publique des dosages, de la portion, de la caféine et des informations nécessaires à la comparaison.

La preuve de laboratoire est publiée séparément : document consultable, analyse annoncée mais non archivée, ou non publiée. Elle n’est pas fusionnée avec la transparence de la fiche.

## Livrables publics

### Page éditoriale

La page comprend, dans cet ordre :

1. un en-tête sobre avec millésime, date d’arrêt et résumé en une phrase ;
2. quatre chiffres clés : univers, panel France, couverture prix, couverture caféine ;
3. un encadré « À citer » composé de constats générés depuis les données ;
4. quatre sections illustrées : prix par tasse, caféine, ingrédients, transparence ;
5. un tableau comparatif compact du panel, triable côté client par marque, prix, caféine et transparence ;
6. la méthodologie, les critères d’inclusion, les limites et le protocole de correction ;
7. un bloc presse/données avec téléchargements CSV, JSON, méthodologie Markdown et SVG ;
8. une attribution conseillée : « Café Adaptogène, Baromètre français des cafés fonctionnels 2027, données arrêtées au 6 novembre 2026 ».

Le texte rappelle à chaque section le bon dénominateur et ne déduit aucun bénéfice santé.

### Données téléchargeables

- `public/data/barometre-cafes-fonctionnels-2027.csv` : univers complet, champs publics utiles, indicateurs calculés et drapeau d’inclusion.
- `public/data/barometre-cafes-fonctionnels-2027.json` : métadonnées de version, méthodologie, statistiques et enregistrements.
- `public/data/barometre-cafes-fonctionnels-2027-methodologie.md` : méthode lisible et citable.
- quatre SVG autonomes : prix, caféine, ingrédients, transparence. Chaque SVG inclut titre, sous-titre, taille de l’échantillon, date et attribution.

Le CSV utilise UTF-8 avec BOM et séparateur virgule, avec une ligne par référence. Les valeurs brutes sont conservées à côté des valeurs calculées. Le JSON porte un `schemaVersion`, un `datasetVersion`, une date d’arrêt et les URLs canoniques.

### Corpus IA et MCP

Le générateur des ressources IA reçoit un document de type `dataset` décrivant le baromètre, ses chiffres, ses limites, sa méthodologie et les URLs de téléchargement. Ce document est ajouté à `content.json` et `mcp-data.json`. Les sources officielles restent reliées aux fiches produit ; la page du baromètre reste la source canonique des agrégats.

Le fichier `public/ai/index.md` ajoute les liens vers la page et le jeu de données. Le MCP existant n’obtient pas de nouvel outil : sa recherche documentaire suffit dès que le dataset entre dans `mcp-data.json`.

## Architecture technique

### Calculs

Créer `scripts/lib/barometer-data.mjs` avec des fonctions pures : sélection du panel, parsing des nombres français, extraction des fourchettes en euros, normalisation de la transparence, détection des familles d’ingrédients, médiane, agrégats et sérialisation publique.

Créer `scripts/generate-barometer-assets.mjs` pour lire le CSV, valider les lignes, calculer le baromètre et écrire les fichiers publics et un module TypeScript généré `app/barometer-data.ts`. Le générateur est appelé avant la génération IA dans les commandes de build.

Le module TypeScript généré expose uniquement des objets sérialisables : métadonnées, statistiques, constats, séries de graphiques et lignes du panel. La page n’exécute aucun accès disque au rendu.

### Interface

Créer `app/barometre-cafes-fonctionnels-2027/page.tsx` pour le contenu statique, les données structurées et les téléchargements. Créer un composant client local uniquement pour le tri du tableau. Les graphiques principaux sont rendus en HTML/CSS accessible et les mêmes données produisent les SVG téléchargeables.

Les styles sont ajoutés à `app/globals.css`, en reprenant les couleurs, espacements et composants du site. Pas de dépendance supplémentaire.

### Référencement et données structurées

La page utilise un titre explicite, une description, une canonique, des métadonnées sociales et un JSON-LD `Dataset` incluant nom, description, créateur, date de publication, date de modification, licence d’usage/citation, variables mesurées et distributions CSV/JSON. Un `Article` relie le rapport à sa date et à son auteur éditorial. Aucun balisage de note ou de classement n’est ajouté.

La page est ajoutée au sitemap avec une priorité élevée et reçoit des liens depuis l’accueil, l’annuaire, la page nouveautés et la page d’accès IA lorsque l’intégration reste naturelle.

## Exactitude et tests

- Tester les règles d’inclusion avec produits actifs, indisponibles, épuisés, A/B/C et sources invalides.
- Tester les nombres français, valeurs uniques, fourchettes, symbole euro, dollars, mentions non calculables et valeurs zéro.
- Tester la médiane sur effectifs pairs et impairs.
- Tester la normalisation de transparence et le chevauchement des familles d’ingrédients.
- Vérifier les chiffres du jeu de données généré, les URLs publiques, l’absence de l’adresse privée et la stabilité de la version.
- Vérifier le rendu statique : titre, JSON-LD Dataset, liens de téléchargement, échantillons et attribution.
- Exécuter les builds Vinext et Next, la suite Node, le lint, puis contrôler les URLs publiques après publication.

## Publication, correction et maintenance

Le millésime 2027 est figé par `datasetVersion`; une correction factuelle peut augmenter une version mineure sans changer l’URL. Une nouvelle campagne de collecte produit une nouvelle date d’arrêt et, si elle modifie substantiellement les résultats, une nouvelle version documentée.

La page invite les marques et lecteurs à signaler une erreur via l’adresse publique du site, en demandant une URL officielle. Une correction conserve une trace dans le dépôt et ne supprime pas silencieusement les limites historiques.

## Décisions laissées au constructeur

- Le détail exact des composants visuels et de la typographie, à condition de respecter le design existant.
- La formulation finale des constats, dès lors qu’ils sont générés ou vérifiés par les données et restent descriptifs.
- L’ordre des colonnes secondaires du CSV et du tableau, sans supprimer source, date, inclusion, prix, caféine, ingrédients ou transparence.
