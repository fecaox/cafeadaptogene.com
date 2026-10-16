# Café aux champignons Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Concentrer la visibilité SEO « café aux champignons » sur une page complète et rediriger l’ancienne URL concurrente.

**Architecture:** Les contenus restent dans `app/site-data.ts` et sont rendus par la route générique existante. La suppression de l’ancien guide le retire du sitemap et des paramètres statiques ; Apache assure la redirection avant le rendu statique.

**Tech Stack:** Next.js 16, TypeScript, export statique, Apache `.htaccess`, tests Node.

**Spec:** `docs/superpowers/specs/2026-10-16-cafe-champignons-consolidation.md`

## Global Constraints

- Préserver les formulations prudentes sur la santé et distinguer les allégations commerciales des preuves.
- Ne pas toucher au fichier utilisateur non suivi `scripts/build-functional-coffee-workbook.mjs`.
- Publier sur `main` seulement après le build et la suite complète de tests.

## Review Focus

- L’ancienne URL doit être absente du sitemap mais couverte par une redirection 301.
- Le nouveau titre doit rester centré sur la requête sans dupliquer une autre page.
- Les critères de comparaison doivent être concrets : dose, extraction, caféine, goût et prix.
- Les liens internes ne doivent plus pointer vers l’ancienne URL.
- Les données structurées et la date visible doivent refléter la page fusionnée.

---

### Task 1: Verrouiller le comportement SEO attendu

**Files:**
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: sortie statique `out/` produite par Next.js.
- Produces: test d’intégration couvrant rendu, sitemap et redirection Apache.

- [ ] **Step 1: Écrire le test en échec**
- [ ] **Step 2: Exécuter le build statique puis vérifier l’échec attendu**

### Task 2: Fusionner, rediriger et publier

**Files:**
- Modify: `app/site-data.ts`
- Modify: `app/[slug]/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `public/.htaccess`
- Modify: `STRATEGIE-SEO.md`

**Interfaces:**
- Consumes: route générique `GuidePage` et tableau `allGuides` existants.
- Produces: page canonique enrichie, date actualisée, sitemap dédoublonné et redirection 301.

- [ ] **Step 1: Ajouter le contenu minimal répondant au test**
- [ ] **Step 2: Exécuter le test ciblé et vérifier son passage**
- [ ] **Step 3: Exécuter lint, build et suite complète**
- [ ] **Step 4: Contrôler le diff, committer et pousser sur `main`**
- [ ] **Step 5: Vérifier la page et la redirection en production**
