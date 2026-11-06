# Baromètre français des cafés fonctionnels 2027 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publier un baromètre 2027 méthodologiquement traçable, avec page éditoriale, panel France, graphiques et données CSV/JSON/SVG réutilisables par journalistes et agents IA.

**Architecture:** Un module JavaScript pur transforme le CSV maître en un modèle de baromètre déterministe. Un générateur écrit les ressources publiques et un module TypeScript statique consommé par la page Next.js ; le même modèle enrichit le corpus IA/MCP existant.

**Tech Stack:** Node.js 24, JavaScript ESM, TypeScript, React 19, Next.js 16, Vinext/Cloudflare, tests `node:test`, CSS/SVG natifs.

**Spec:** `docs/superpowers/specs/2026-11-06-barometre-cafes-fonctionnels-2027-design.md`

## Global Constraints

- L’édition 2027 utilise les données arrêtées au 6 novembre 2026 et une version déterministe.
- Le panel France exige disponibilité commençant par « oui », statut commençant par « actif », vérification A/B et source HTTP(S).
- Les agrégats prix n’acceptent que les montants en euros explicitement calculables ; les agrégats caféine exigent des milligrammes numériques.
- Chaque statistique publiée porte son dénominateur ; aucune donnée absente n’est estimée silencieusement.
- Aucune nouvelle dépendance de visualisation.
- Ne jamais exposer `fecaox@gmail.com` ni les liens privés de propriété entre marques.
- Le baromètre ne classe ni l’efficacité, ni la santé, ni la qualité gustative des produits.

## Review Focus

- Une disponibilité contenant « France » mais commençant par « non » doit rester hors panel : test Task 1.
- Un prix en dollars ou « moins de 1 € » doit rester hors agrégat sans disparaître du dataset : tests Tasks 1 et 2.
- Une caféine nulle est une donnée mesurée valide, pas une valeur absente : test Task 1.
- Les familles d’ingrédients se chevauchent et ne doivent pas être forcées à totaliser 100 % : tests Tasks 1 et 3.
- Le build doit régénérer les assets avant que Next.js ou l’IA ne les importe : tests et commandes Tasks 2, 3 et 5.

---

### Task 1: Moteur de calcul du baromètre

**Files:**
- Create: `scripts/lib/barometer-data.mjs`
- Create: `tests/barometer-data.test.mjs`

**Interfaces:**
- Consumes: lignes brutes issues de `parseCsv(text)` dans `scripts/lib/functional-coffee-data.mjs`.
- Produces: `isQualifiedPanelRow(row)`, `parseEuroRange(value)`, `parseCaffeineRange(row)`, `normalizeTransparency(value)`, `detectIngredientFamilies(row)`, `median(values)`, `buildBarometer(rows, options?)`.

- [ ] **Step 1: Écrire les tests unitaires en échec**

Tester explicitement : panel oui/actif/A-B/source HTTP, exclusions non/épuisé/C/source invalide ; valeurs `1,30 €`, `0,76–1,49 €`, dollars, « moins de », zéro caféine ; médianes paires/impaires ; transparence ; familles chevauchantes ; stabilité du modèle final.

- [ ] **Step 2: Vérifier l’échec**

Run: `node --test tests/barometer-data.test.mjs`
Expected: FAIL avec module ou fonctions absentes.

- [ ] **Step 3: Implémenter les fonctions pures**

`buildBarometer(rows, { siteUrl = "https://cafeadaptogene.com", cutoffDate = "2026-11-06", datasetVersion = "2027.1" } = {})` renvoie métadonnées, méthodologie, statistiques, constats, séries et enregistrements publics. Le prix central d’une fourchette est sa moyenne ; la médiane trie les points centraux. Les familles utilisent les champs structurés et peuvent se cumuler.

- [ ] **Step 4: Vérifier le passage**

Run: `node --test tests/barometer-data.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/barometer-data.mjs tests/barometer-data.test.mjs
git commit -m "feat: calcule le baromètre cafés fonctionnels"
```

### Task 2: Génération des ressources publiques

**Files:**
- Create: `scripts/generate-barometer-assets.mjs`
- Create: `tests/barometer-assets.test.mjs`
- Generate: `app/barometer-data.ts`
- Generate: `public/data/barometre-cafes-fonctionnels-2027.csv`
- Generate: `public/data/barometre-cafes-fonctionnels-2027.json`
- Generate: `public/data/barometre-cafes-fonctionnels-2027-methodologie.md`
- Generate: `public/data/barometre-cafes-fonctionnels-2027-prix.svg`
- Generate: `public/data/barometre-cafes-fonctionnels-2027-cafeine.svg`
- Generate: `public/data/barometre-cafes-fonctionnels-2027-ingredients.svg`
- Generate: `public/data/barometre-cafes-fonctionnels-2027-transparence.svg`
- Modify: `package.json`

**Interfaces:**
- Consumes: `buildBarometer(rows)` de Task 1 et le CSV maître.
- Produces: `barometer` exporté par `app/barometer-data.ts` et des fichiers publics versionnés.

- [ ] **Step 1: Écrire les tests d’assets en échec**

Vérifier le nombre de lignes, les métadonnées, les champs bruts/calculés, le BOM CSV, les SVG autonomes avec titre/date/n, les URLs canoniques, l’absence de données privées et l’exclusion des prix non comparables des agrégats.

- [ ] **Step 2: Vérifier l’échec**

Run: `node --test tests/barometer-assets.test.mjs`
Expected: FAIL car les assets n’existent pas.

- [ ] **Step 3: Implémenter le générateur et les sérialisations**

Écrire des sorties stables et ordonnées. Le module TypeScript contient `export const barometer = … as const;`. Les SVG utilisent les séries calculées et du texte accessible. Ajouter `generate:barometer` et le faire précéder `generate:ai` dans les builds.

- [ ] **Step 4: Générer puis tester**

Run: `node scripts/generate-barometer-assets.mjs && node --test tests/barometer-assets.test.mjs`
Expected: PASS, univers 143, panel 35, marques 32 avec la base courante.

- [ ] **Step 5: Commit**

```bash
git add package.json scripts/generate-barometer-assets.mjs tests/barometer-assets.test.mjs app/barometer-data.ts public/data/
git commit -m "feat: publie les données du baromètre 2027"
```

### Task 3: Corpus IA et MCP

**Files:**
- Modify: `scripts/lib/ai-assets.mjs`
- Modify: `scripts/generate-ai-assets.mjs`
- Modify: `tests/ai-assets.test.mjs`
- Generate: `public/ai/content.json`
- Generate: `public/ai/catalog.json`
- Generate: `public/ai/sources.json`
- Generate: `public/ai/mcp-data.json`
- Generate: `public/ai/index.md`

**Interfaces:**
- Consumes: `barometer` généré en Task 2.
- Produces: un document `dataset:barometre-cafes-fonctionnels-2027` recherché par les agents et le MCP.

- [ ] **Step 1: Étendre les tests IA en échec**

Tester l’identifiant, l’URL canonique, les chiffres de panel, les limites méthodologiques, les liens CSV/JSON, l’augmentation déterministe du nombre de documents et l’absence de données privées.

- [ ] **Step 2: Vérifier l’échec**

Run: `node --test tests/ai-assets.test.mjs`
Expected: FAIL car le dataset n’est pas dans le corpus.

- [ ] **Step 3: Ajouter le dataset au générateur**

Étendre `buildAiAssets({ guides, products, siteUrl, datasets = [] })`. Les datasets deviennent des documents de type `dataset` dans `content.documents` et `mcpData.documents`. Ajouter les liens baromètre/data à `index.md`.

- [ ] **Step 4: Régénérer et tester**

Run: `node scripts/generate-barometer-assets.mjs && node scripts/generate-ai-assets.mjs && node --test tests/ai-assets.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/ai-assets.mjs scripts/generate-ai-assets.mjs tests/ai-assets.test.mjs public/ai/
git commit -m "feat: expose le baromètre aux agents IA"
```

### Task 4: Page éditoriale, graphiques et navigation

**Files:**
- Create: `app/barometre-cafes-fonctionnels-2027/page.tsx`
- Create: `app/barometre-cafes-fonctionnels-2027/BarometerTable.tsx`
- Modify: `app/globals.css`
- Modify: `app/sitemap.ts`
- Modify: `app/page.tsx`
- Modify: `app/annuaire-cafes-fonctionnels/page.tsx`
- Modify: `app/nouveautes-cafes-fonctionnels/page.tsx`
- Modify: `app/acces-agents-ia/page.tsx`
- Modify: `tests/rendered-html.test.mjs`
- Modify: `tests/seo-priorities.test.mjs`

**Interfaces:**
- Consumes: `barometer` de `app/barometer-data.ts`.
- Produces: page statique canonique, tableau triable accessible, JSON-LD Dataset/Article, téléchargements et liens internes.

- [ ] **Step 1: Écrire les tests de rendu/SEO en échec**

Vérifier titre, date, chiffres, tailles d’échantillon, attribution, liens CSV/JSON/Markdown/SVG, JSON-LD Dataset avec distributions, sitemap et liens internes. Vérifier que les familles chevauchantes sont expliquées et qu’aucun « meilleur produit » n’est déclaré.

- [ ] **Step 2: Vérifier l’échec**

Run: `node --test tests/rendered-html.test.mjs tests/seo-priorities.test.mjs`
Expected: FAIL car la route et les liens n’existent pas.

- [ ] **Step 3: Implémenter la page et le tableau**

Utiliser des barres HTML/CSS avec tableaux textuels associés. `BarometerTable` trie par marque, prix central, caféine centrale ou transparence sans masquer les valeurs manquantes. Ajouter la méthode, les limites, le protocole de correction et les téléchargements.

- [ ] **Step 4: Ajouter styles, sitemap et liens éditoriaux**

Reprendre la palette existante ; assurer lisibilité mobile, focus clavier, contraste et impression correcte. Ajouter des liens contextuels sans transformer toutes les pages en bandeaux promotionnels.

- [ ] **Step 5: Construire et tester le rendu**

Run: `node scripts/generate-barometer-assets.mjs && node scripts/generate-ai-assets.mjs && ./node_modules/.bin/next build && node --test tests/rendered-html.test.mjs tests/seo-priorities.test.mjs`
Expected: build réussi et tests PASS.

- [ ] **Step 6: Commit**

```bash
git add app/barometre-cafes-fonctionnels-2027 app/globals.css app/sitemap.ts app/page.tsx app/annuaire-cafes-fonctionnels/page.tsx app/nouveautes-cafes-fonctionnels/page.tsx app/acces-agents-ia/page.tsx tests/rendered-html.test.mjs tests/seo-priorities.test.mjs
git commit -m "feat: publie le baromètre cafés fonctionnels 2027"
```

### Task 5: Vérification complète et publication

**Files:**
- Modify if required: files from Tasks 1–4 only.

**Interfaces:**
- Consumes: l’ensemble de la fonctionnalité.
- Produces: build Cloudflare/Next validé, branche principale publiée, URLs publiques contrôlées.

- [ ] **Step 1: Exécuter la suite complète**

Run: `npm test`
Expected: builds Vinext et Next réussis, tous les tests PASS.

- [ ] **Step 2: Exécuter le lint**

Run: `npm run lint`
Expected: aucune erreur.

- [ ] **Step 3: Contrôler les changements et les données privées**

Run: `git diff --check && rg -n "fecaox@gmail\\.com|meilleur café|classement santé" app scripts public/data public/ai tests`
Expected: aucun espace fautif, aucune donnée privée, aucune affirmation interdite.

- [ ] **Step 4: Publier**

Run: `git push origin main`
Expected: push accepté et pipeline de déploiement déclenché.

- [ ] **Step 5: Vérifier la production**

Contrôler avec HTTP la page, les quatre téléchargements principaux, le sitemap et `ai/mcp-data.json`. Vérifier statut 200, titre, version, panel et absence de page de cache obsolète.

- [ ] **Step 6: Commit correctif éventuel**

Si la vérification révèle un défaut, corriger uniquement le défaut, relancer les contrôles concernés, committer puis pousser.
