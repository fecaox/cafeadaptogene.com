# Observatoire des nouveautés du café fonctionnel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Revérifier l’inventaire des cafés fonctionnels, intégrer les nouveautés confirmées et publier une page hybride de veille éditoriale sur cafeadaptogene.com.

**Architecture:** Le CSV reste la source de vérité. Le générateur transforme les champs explicites de changement en données TypeScript partagées par l’annuaire et la nouvelle page; la page calcule ses compteurs et ses sélections à partir de ces données au lieu de dupliquer des fiches.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS global existant, scripts Node.js, tests `node:test`, Vinext/Cloudflare, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-08-observatoire-nouveautes-design.md`

## Global Constraints

- Les sources officielles sont prioritaires et chaque observation est datée du 8 septembre 2026.
- « Nouveau » exige une date ou un changement observable; les incertitudes restent visibles.
- Priorité au marché français et aux produits réellement achetables en France.
- Aucun lien public ne doit révéler une relation entre cafeadaptogene.com et Torrégral, Café Intégral ou Café Minceur.
- Les promesses des marques sont attribuées et ne deviennent pas des conclusions médicales.
- Préserver le style, les dépendances et les capacités existantes du site.

---

### Task 1: Audit vérifiable du marché

**Files:**
- Create: `data/audits/2026-09-08-functional-coffee-market.md`
- Modify: `data/marques-cafe-fonctionnel.csv`

**Interfaces:**
- Consumes: les 128 références et leurs URLs officielles dans le CSV.
- Produces: un journal daté des sources contrôlées et un CSV enrichi avec `date_premiere_observation`, `type_changement`, `date_changement`, `resume_changement`, `selection_nouveaute`.

- [ ] **Step 1: Exporter les URLs officielles uniques et contrôler leur disponibilité HTTP**

Run: `node scripts/audit-functional-coffee-sources.mjs`

Expected: un rapport listant chaque URL, son statut HTTP, son URL finale et la date du contrôle.

- [ ] **Step 2: Rechercher les nouvelles références et les changements**

Contrôler les pages officielles des marques françaises/européennes, puis les références internationales structurantes. Archiver dans le journal uniquement les faits vérifiés : nom exact, format, dose, caféine, actifs, conditionnement, prix, disponibilité et changement observé.

- [ ] **Step 3: Mettre à jour le CSV**

Ajouter les nouvelles lignes et corriger les lignes existantes. Employer une valeur vide lorsqu’aucun changement n’est documenté; ne jamais déduire un lancement depuis un simple slogan.

- [ ] **Step 4: Valider l’intégrité des données**

Run: `node scripts/validate-functional-coffee-data.mjs`

Expected: zéro identifiant dupliqué, zéro nouvelle entrée sans source/date/type de changement, et toutes les valeurs de `selection_nouveaute` limitées à `oui` ou `non`.

- [ ] **Step 5: Commit**

```bash
git add data/audits/2026-09-08-functional-coffee-market.md data/marques-cafe-fonctionnel.csv scripts/audit-functional-coffee-sources.mjs scripts/validate-functional-coffee-data.mjs
git commit -m "Actualise l’inventaire des cafés fonctionnels"
```

### Task 2: Modèle de données des nouveautés

**Files:**
- Modify: `scripts/generate-public-brand-data.mjs`
- Modify: `app/brand-directory-data.ts` (généré)
- Test: `tests/functional-coffee-data.test.mjs`

**Interfaces:**
- Consumes: les nouveaux champs du CSV.
- Produces: `DirectoryProduct.firstObservedAt`, `changeType`, `changeDate`, `changeSummary`, `featuredNovelty` et `marketUpdateStats`.

- [ ] **Step 1: Écrire le test défaillant**

Le test importe les données générées et vérifie qu’une nouveauté possède une date, un type, un résumé et une source officielle; il vérifie aussi que `marketUpdateStats` correspond aux produits filtrés.

- [ ] **Step 2: Vérifier l’échec**

Run: `node --test tests/functional-coffee-data.test.mjs`

Expected: FAIL car les champs et statistiques de nouveautés n’existent pas encore.

- [ ] **Step 3: Étendre le générateur**

Remplacer le calcul fragile `index >= 101` par `Boolean(row.date_premiere_observation)` et exposer les cinq champs. Calculer les statistiques à partir des types de changements et de la disponibilité France.

- [ ] **Step 4: Régénérer et vérifier**

Run: `node scripts/generate-public-brand-data.mjs && node --test tests/functional-coffee-data.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/generate-public-brand-data.mjs app/brand-directory-data.ts tests/functional-coffee-data.test.mjs
git commit -m "Structure les nouveautés du marché"
```

### Task 3: Page hybride des nouveautés

**Files:**
- Create: `app/nouveautes-cafes-fonctionnels/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `directoryProducts`, `marketUpdateStats` et `directoryUpdatedAt`.
- Produces: route statique `/nouveautes-cafes-fonctionnels/` avec sélection, chronologie, vigilance, méthode et données structurées.

- [ ] **Step 1: Écrire le test de rendu défaillant**

Ajouter un test qui attend le statut 200, le titre « Nouveautés des cafés fonctionnels », la date « 8 septembre 2026 », les rubriques « À retenir », « Journal des changements », « Sous vigilance », `CollectionPage` et des liens vers l’annuaire et la méthodologie.

- [ ] **Step 2: Vérifier l’échec**

Run: `npm run build && node --test --test-name-pattern="nouveautés" tests/rendered-html.test.mjs`

Expected: FAIL avec une route absente.

- [ ] **Step 3: Implémenter la page et son style responsive**

Créer une page serveur statique. Trier les sélections par disponibilité France, niveau de vérification puis date; présenter les changements dans l’ordre chronologique inverse; réserver la vigilance aux retraits, sources introuvables et statuts C. Ajouter un `CollectionPage` et un `ItemList` qui pointent vers les fiches internes.

- [ ] **Step 4: Vérifier le rendu**

Run: `npm run build && node --test --test-name-pattern="nouveautés" tests/rendered-html.test.mjs`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/nouveautes-cafes-fonctionnels/page.tsx app/globals.css tests/rendered-html.test.mjs
git commit -m "Ajoute l’observatoire des nouveautés"
```

### Task 4: Maillage et fraîcheur SEO/GEO

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/annuaire-cafes-fonctionnels/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `public/llms.txt`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: la nouvelle route et les statistiques générées.
- Produces: liens internes visibles, sitemap daté et entrée LLM lisible.

- [ ] **Step 1: Étendre les assertions avant le code**

Vérifier que la page d’accueil et l’annuaire lient `/nouveautes-cafes-fonctionnels/`, que le sitemap contient la route et que `llms.txt` la décrit comme une veille datée.

- [ ] **Step 2: Vérifier l’échec**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: FAIL sur le nouveau maillage.

- [ ] **Step 3: Ajouter le maillage**

Ajouter une carte compacte sur l’accueil, un lien éditorial dans l’introduction de l’annuaire, la route au sitemap avec fréquence hebdomadaire, et une entrée factuelle dans `llms.txt`. Mettre à jour les dates et compteurs depuis les données.

- [ ] **Step 4: Vérifier tous les tests**

Run: `npm test`

Expected: PASS, zéro échec.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/annuaire-cafes-fonctionnels/page.tsx app/sitemap.ts public/llms.txt tests/rendered-html.test.mjs
git commit -m "Relie les nouveautés au parcours éditorial"
```

### Task 5: Relecture, validation et publication

**Files:**
- Modify: uniquement les fichiers nécessitant une correction issue de la validation.

**Interfaces:**
- Consumes: l’ensemble de la mise à jour.
- Produces: build validé et version publiée sur l’infrastructure existante.

- [ ] **Step 1: Relecture éditoriale**

Appliquer la grille humanizer aux textes visibles et rechercher les formulations absolues, les promesses santé non attribuées, les doublons de date et les relations de marque interdites.

- [ ] **Step 2: Vérification fraîche**

Run: `npm test`

Expected: build de production terminé, tous les tests `node:test` réussis.

- [ ] **Step 3: Contrôler l’état Git**

Run: `git status --short && git diff --check`

Expected: aucune erreur d’espacement et uniquement les changements prévus.

- [ ] **Step 4: Publier**

Fusionner la branche de travail validée dans `main`, pousser le dépôt GitHub qui alimente l’hébergeur, puis publier la version Sites correspondant exactement au commit validé.

- [ ] **Step 5: Vérifier le site public**

Contrôler le statut HTTP, le titre et la présence du contenu principal sur `https://cafeadaptogene.com/nouveautes-cafes-fonctionnels/`.
