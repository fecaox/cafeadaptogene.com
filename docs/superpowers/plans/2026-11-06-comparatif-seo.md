# Comparatif Café Adaptogène SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Orienter les requêtes comparatives vers la page dédiée et rendre son extrait Google plus précis.

**Architecture:** Modifier les données éditoriales centrales du guide, le lien du hero et les dates dérivées du rendu/sitemap. Vérifier le comportement sur le HTML statique généré.

**Tech Stack:** Next.js statique, TypeScript, Node test runner.

**Spec:** `docs/superpowers/specs/2026-11-06-comparatif-seo-design.md`

## Global Constraints

- Ne pas présenter un produit comme gagnant universel.
- Ne pas modifier les données produits ni les mentions commerciales.
- Conserver les fichiers utilisateur non suivis.

## Review Focus

- Le nombre « 6 » doit correspondre aux six `productIds` du guide.
- Le lien du hero doit pointer vers la page canonique avec un libellé explicite.
- Le titre rendu ne doit pas recevoir un suffixe de marque.
- La date visible, le schéma Article et le sitemap doivent rester cohérents.
- Aucun autre guide ne doit recevoir la nouvelle date.

---

### Task 1: Extrait Google et maillage du comparatif

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `app/site-data.ts`
- Modify: `app/page.tsx`
- Modify: `app/[slug]/page.tsx`
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: le guide `comparatif-cafe-adaptogene` et son rendu statique.
- Produces: un titre et une description factuels, un lien hero direct, une date cohérente.

- [ ] **Step 1: Write the failing test**

Ajouter un test du rendu qui exige le titre `Meilleur café adaptogène 2026 : comparatif de 6 produits`, la description précise, le lien hero `Comparer 6 cafés adaptogènes`, et la date du 6 novembre 2026 dans la page et le sitemap.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run build:github && node --test tests/rendered-html.test.mjs`
Expected: FAIL sur les nouvelles attentes.

- [ ] **Step 3: Implement the minimal changes**

Modifier les cinq fichiers listés, sans changement de structure ni de données produit.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run build:github && node --test tests/rendered-html.test.mjs`
Expected: PASS.

- [ ] **Step 5: Run the full suite and commit**

Run: `npm test`
Expected: PASS.

