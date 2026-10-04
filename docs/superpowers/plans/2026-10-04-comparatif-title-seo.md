# Titre SEO du comparatif café adaptogène Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publier un titre SEO plus direct pour le comparatif café adaptogène sans changer son H1, son contenu ou ses autres métadonnées.

**Architecture:** Le modèle `Guide` reçoit un titre SEO optionnel. Le générateur de métadonnées utilise un titre absolu uniquement lorsqu’il est renseigné, afin de neutraliser le suffixe global sur le comparatif sans affecter les autres guides.

**Tech Stack:** Next.js 16, TypeScript, `node:test`, Vinext/Cloudflare et export statique GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-10-04-comparatif-title-seo-design.md`

## Global Constraints

- Titre SEO exact : « Comparatif café adaptogène 2026 : lequel choisir ? ».
- Le H1, la description, l’URL canonique et le contenu restent inchangés.
- Les autres guides conservent le modèle global `%s | Café Adaptogène`.
- Aucun autre site ou article n’est modifié.

## Review Focus

- Le suffixe global ne doit disparaître que pour le comparatif.
- Le H1 du comparatif doit rester inchangé.
- Le titre doit être identique dans les rendus Vinext et statique.
- La canonique doit rester `/comparatif-cafe-adaptogene/`.
- Le rendu des autres guides ne doit pas changer.

---

### Task 1: Titre SEO absolu du comparatif

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `app/site-data.ts`
- Modify: `app/[slug]/page.tsx`
- Create: `docs/superpowers/specs/2026-10-04-comparatif-title-seo-design.md`
- Create: `docs/superpowers/plans/2026-10-04-comparatif-title-seo.md`

**Interfaces:**
- Consumes: `Guide` et `generateMetadata()` existants.
- Produces: `Guide.seoTitle?: string` et un titre `Metadata.title.absolute` lorsque cette valeur existe.

- [ ] **Step 1: Écrire le test de rendu défaillant**

Étendre le test du comparatif pour exiger `<title>Comparatif café adaptogène 2026 : lequel choisir ?</title>` et refuser le suffixe redondant.

- [ ] **Step 2: Vérifier l’échec**

Run: `node --test --test-name-pattern="priority SEO article" tests/rendered-html.test.mjs`

Expected: FAIL car le rendu contient encore « Meilleur café adaptogène 2026 : comparatif France | Café Adaptogène ».

- [ ] **Step 3: Implémenter le titre SEO optionnel**

Ajouter `seoTitle?: string` à `Guide`, renseigner la valeur approuvée sur le comparatif et utiliser `{ absolute: guide.seoTitle }` dans `generateMetadata()` uniquement lorsque la propriété existe.

- [ ] **Step 4: Vérifier le test ciblé puis la suite complète**

Run: `npm run build && node --test --test-name-pattern="priority SEO article" tests/rendered-html.test.mjs`

Expected: PASS.

Run: `npm test`

Expected: les deux builds et tous les tests réussissent.

- [ ] **Step 5: Commit**

```bash
git add app/site-data.ts 'app/[slug]/page.tsx' tests/rendered-html.test.mjs docs/superpowers/specs/2026-10-04-comparatif-title-seo-design.md docs/superpowers/plans/2026-10-04-comparatif-title-seo.md
git commit -m "Optimise le titre du comparatif café adaptogène"
```
