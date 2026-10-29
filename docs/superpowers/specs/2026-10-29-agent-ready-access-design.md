# Accès agents IA et MCP public — Café Adaptogène

## Objectif

Rendre le corpus public de Café Adaptogène facile à découvrir, interroger et citer par des agents IA, sans exposer de donnée privée et sans modifier la ligne éditoriale du site.

## Principes

- Le contenu HTML public reste la source canonique et humaine.
- Des exports JSON et Markdown reprennent uniquement les informations déjà publiées dans le dépôt.
- Un serveur MCP public, en lecture seule, expose les outils standard `search` et `fetch`, complétés par `compare_products` et `get_sources`.
- Chaque résultat renvoie une URL publique absolue que l’agent peut citer.
- L’absence de donnée reste explicite ; aucune allégation santé, source ou mesure n’est inventée.
- Le MCP facilite l’accès au corpus mais ne garantit ni indexation ni citation par un modèle.

## Corpus machine

Le build génère dans `public/ai/` :

- `content.json` : guides et fiches éditoriales ;
- `catalog.json` : annuaire des produits ;
- `sources.json` : sources externes dédupliquées ;
- `mcp-data.json` : index unifié consommé par le serveur MCP ;
- `index.md` : mode d’emploi court et liens vers les ressources.

Les identifiants sont stables (`guide:<slug>`, `product:<id>`, `source:<n>`), les textes sont tirés de `app/site-data.ts` et `app/brand-directory-data.ts`, et les données sont régénérées avant chaque build.

## Serveur MCP

Endpoint public : `https://cafeadaptogene.com/mcp`.

Le serveur utilise PHP 8.1+ et le SDK MCP PHP officiel `mcp/sdk` 0.9.0. Il sert les protocoles MCP actuels et hérités via Streamable HTTP.

Outils :

1. `search(query)` — au plus dix résultats `{id,title,url}` classés par correspondance textuelle.
2. `fetch(id)` — document complet `{id,title,text,url,metadata}`.
3. `compare_products(ids)` — comparaison factuelle de dix produits maximum, sans classement commercial automatique.
4. `get_sources(id?)` — sources liées à un document ou liste complète dédupliquée.

Tous les outils portent `readOnlyHint: true`, `destructiveHint: false` et `openWorldHint: false`. Le serveur n’appelle aucune API externe, ne reçoit aucune clé et n’écrit rien.

## Publication et sécurité

- Composer installe les dépendances dans GitHub Actions ; aucun secret n’est ajouté au dépôt.
- Le build copie l’application PHP et ses dépendances dans `out/mcp/`.
- Le `.htaccess` racine route `/mcp` vers `mcp/index.php` ; le `.htaccess` du sous-dossier interdit l’accès HTTP direct à `src/`, `vendor/` et aux données internes.
- Les entrées sont bornées : requête de 200 caractères, dix résultats, dix produits.
- La CI exécute les tests Node, les tests PHP et un échange MCP HTTP réel avant le déploiement FTPS.

## Découverte et documentation

- `llms.txt` référence les exports, le MCP et la page d’aide.
- Une page `/acces-agents-ia/` explique l’endpoint, les quatre outils, les limites et la procédure générique d’ajout dans un client MCP.
- Le sitemap inclut la page d’aide, mais pas les fichiers JSON.
- Les robots IA déjà autorisés restent inchangés.

## Mesure et suivi

- Search Console continue de mesurer impressions, clics et CTR des pages publiques ; le MCP ne remplace pas ces métriques.
- GA4 mesure la page d’aide comme les autres pages uniquement après consentement.
- Aucun journal nominatif des appels MCP n’est créé.
- Pour Café Intégral, le suivi `/home/` versus `/` est consigné séparément : la redirection publique peut être active avant que Google ne consolide son index.

## Hors périmètre

- Authentification ou outils d’écriture.
- Base vectorielle, RAG externe ou abonnement payant.
- Publication du même MCP sur les autres sites avant validation du pilote.
- Création de contenu ou d’études non présents dans les sources du site.
