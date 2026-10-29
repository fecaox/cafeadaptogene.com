# Agent-ready access Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publier un corpus machine lisible et un serveur MCP public en lecture seule pour Café Adaptogène.

**Architecture:** Un générateur Node transforme les données éditoriales existantes en exports déterministes. Un serveur PHP mince, construit avec le SDK MCP officiel, recherche dans cet index local et est empaqueté dans l’export statique avant le déploiement Obambu.

**Tech Stack:** Node.js 24, Next.js 16, PHP 8.1+, `mcp/sdk` 0.9.0, GitHub Actions, Apache/FTPS.

**Spec:** `docs/superpowers/specs/2026-10-29-agent-ready-access-design.md`

## Global Constraints

- L’endpoint public est exactement `https://cafeadaptogene.com/mcp`.
- Tous les outils MCP sont en lecture seule et n’accèdent qu’au corpus généré localement.
- Les données publiques proviennent exclusivement de `app/site-data.ts` et `app/brand-directory-data.ts`.
- Aucun secret, e-mail privé, adresse privée ou donnée de navigation nominative n’est ajouté.
- Les pages HTML publiques restent les URLs canoniques à citer.
- L’export et le serveur doivent fonctionner avec PHP 8.1 et Node 24.22.1.

## Review Focus

- Une requête vide ou seulement composée d’espaces renvoie zéro résultat sans erreur.
- Une requête accentuée retrouve le même contenu que sa forme non accentuée.
- Un identifiant inconnu dans `fetch` ou `compare_products` est signalé sans erreur interne.
- Plus de dix résultats ou dix produits ne sont jamais renvoyés.
- Les chemins `mcp/vendor`, `mcp/src` et `mcp/data` sont interdits depuis le Web.

---

### Task 1: Générer le corpus public structuré

**Files:**
- Create: `scripts/lib/ai-assets.mjs`
- Create: `scripts/generate-ai-assets.mjs`
- Create: `tests/ai-assets.test.mjs`
- Modify: `package.json`
- Generate: `public/ai/content.json`, `public/ai/catalog.json`, `public/ai/sources.json`, `public/ai/mcp-data.json`, `public/ai/index.md`

**Interfaces:**
- Consumes: `guides`, `siteUrl` et `directoryProducts` existants.
- Produces: `buildAiAssets({ guides, products, siteUrl }) -> { content, catalog, sources, mcpData, markdown }` et les cinq fichiers publics.

- [ ] **Step 1: Write the failing tests**

Tester les identifiants stables, les URLs absolues, la conservation des limites éditoriales, la déduplication des sources, la recherche normalisée et les volumes réels du corpus.

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test tests/ai-assets.test.mjs`
Expected: FAIL because `scripts/lib/ai-assets.mjs` does not exist.

- [ ] **Step 3: Implement the generator**

Implémenter `normalizeSearchText(value)`, `buildAiAssets(input)` et le script d’écriture déterministe. Ajouter `generate:ai` et l’appeler avant les deux builds.

- [ ] **Step 4: Run generator and tests**

Run: `node scripts/generate-ai-assets.mjs && node --test tests/ai-assets.test.mjs`
Expected: PASS with five generated files and no source mutation.

- [ ] **Step 5: Commit**

Commit message: `Ajoute le corpus public pour les agents IA`

### Task 2: Servir le corpus par MCP en lecture seule

**Files:**
- Create: `mcp-server/composer.json`
- Create: `mcp-server/src/KnowledgeBase.php`
- Create: `mcp-server/src/Tools.php`
- Create: `mcp-server/public/index.php`
- Create: `mcp-server/public/.htaccess`
- Create: `mcp-server/tests/KnowledgeBaseTest.php`
- Create: `scripts/package-mcp-server.mjs`
- Create: `tests/mcp-package.test.mjs`
- Modify: `public/.htaccess`

**Interfaces:**
- Consumes: `public/ai/mcp-data.json` from Task 1.
- Produces: MCP tools `search`, `fetch`, `compare_products`, `get_sources` and deployable `out/mcp/`.

- [ ] **Step 1: Write failing Node and PHP contract tests**

Tester les cinq cas du Review Focus, les formats OpenAI de `search`/`fetch`, les annotations read-only et l’interdiction des chemins internes.

- [ ] **Step 2: Verify RED**

Run: `node --test tests/mcp-package.test.mjs`
Expected: FAIL because the MCP server and package script do not exist.

- [ ] **Step 3: Implement knowledge base and MCP registration**

Implémenter la recherche locale bornée, les retours structurés et les quatre outils avec schémas JSON explicites.

- [ ] **Step 4: Add packaging and Apache routing**

Copier `public/`, `src/`, `vendor/` and `mcp-data.json` into `out/mcp/` after the Next export; route `/mcp` internally and block every public subpath except the endpoint.

- [ ] **Step 5: Verify GREEN locally where possible**

Run: `node scripts/package-mcp-server.mjs --without-vendor && node --test tests/mcp-package.test.mjs`
Expected: PASS for data, routing and package structure.

- [ ] **Step 6: Commit**

Commit message: `Ajoute le serveur MCP public en lecture seule`

### Task 3: Documenter l’accès pour les agents

**Files:**
- Create: `app/acces-agents-ia/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `public/llms.txt`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: endpoint and asset URLs from Tasks 1–2.
- Produces: `/acces-agents-ia/`, discoverable from sitemap and `llms.txt`.

- [ ] **Step 1: Write the failing rendered-output test**

Tester le titre, l’endpoint exact, les quatre outils, le caractère read-only, les limites et les liens vers les exports.

- [ ] **Step 2: Verify RED**

Run: `node --test tests/rendered-html.test.mjs`
Expected: FAIL because `out/acces-agents-ia/index.html` is absent.

- [ ] **Step 3: Implement page and discovery links**

Créer une page statique utilisant le chrome du site, ajouter l’URL au sitemap et compléter `llms.txt`.

- [ ] **Step 4: Build and verify GREEN**

Run: `next build && node --test tests/rendered-html.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

Commit message: `Documente l’accès du site aux agents IA`

### Task 4: CI MCP, publication et contrôle public

**Files:**
- Modify: `.github/workflows/validate.yml`
- Modify: `.github/workflows/deploy-obambu.yml`
- Create: `mcp-server/tests/http-smoke.sh`

**Interfaces:**
- Consumes: Node tests, PHP tests and package script from Tasks 1–3.
- Produces: validated production endpoint and live machine assets.

- [ ] **Step 1: Add CI test steps before implementation-dependent deployment**

Installer PHP 8.1 and Composer, run the PHP test, package the vendor tree, start the local PHP server and exercise `server/discover`, `tools/list`, `search` and `fetch` over HTTP.

- [ ] **Step 2: Verify the CI test fails on the feature branch before the server is complete**

Run: push the test-only branch configuration.
Expected: failing MCP job for a missing or invalid endpoint, with the static site job still passing.

- [ ] **Step 3: Complete workflow packaging and deploy order**

Generate AI assets before builds, install exact Composer dependencies, run all tests, package MCP after `next build`, then deploy `out/`.

- [ ] **Step 4: Verify complete suite and production**

Run locally: both site builds, all Node tests, lint. Run in CI: Composer install, PHP tests and MCP HTTP smoke. Then verify live HTTP files and MCP tool calls.
Expected: all checks green; `/mcp`, `/ai/*.json`, `/ai/index.md`, `/acces-agents-ia/` return 200.

- [ ] **Step 5: Commit and publish**

Commit message: `Vérifie et publie l’accès MCP de Café Adaptogène`

### Task 5: Consigner le suivi SEO/GEO

**Files:**
- External edit: Google Sheets SEO workbook, tabs `Audits` and the relevant GSC statistics tab.
- External edit: `SNC/4 TOOLS/Suivi SEO multisites.md`, `SNC/1 PROJECTS/Site Café Adaptogène.md`, `SNC/MEMORY.md`.

**Interfaces:**
- Consumes: live production verification and Search Console `/` versus `/home/` metrics.
- Produces: dated record, next monitoring action and no false claim of Google consolidation.

- [ ] **Step 1: Read exact sheet metadata and target rows**

Use bounded reads and preserve formulas, validation and formatting.

- [ ] **Step 2: Append the dated audit facts**

Record current clicks, impressions and CTR for `/` and `/home/`, the inspection canonical state, and the Café Adaptogène MCP deployment.

- [ ] **Step 3: Verify written cells and durable notes**

Re-read the exact ranges and update SNC only with confirmed publication and the next check.

- [ ] **Step 4: Final review and verification**

Review the full change against the spec, run the complete suite, verify production and report any deferred minor issue.
