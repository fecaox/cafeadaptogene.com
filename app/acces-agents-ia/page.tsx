import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-chrome";
import { siteUrl } from "../site-data";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Accès agents IA et MCP",
  description: "Accédez au corpus public de Café Adaptogène en JSON, Markdown ou via un serveur MCP en lecture seule.",
  alternates: { canonical: "/acces-agents-ia/" },
  openGraph: {
    title: "Accès agents IA et MCP — Café Adaptogène",
    description: "Un corpus public, sourcé et strictement en lecture seule pour les agents IA.",
    url: `${siteUrl}/acces-agents-ia/`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Accès agents IA Café Adaptogène" }],
  },
};

export default function AgentAccessPage() {
  return (
    <>
      <SiteHeader compact />
      <main>
        <div className="article-breadcrumb"><Link href="/">Accueil</Link><span>→</span><b>Accès agents IA</b></div>
        <section className="article-hero sage">
          <div className="article-heading">
            <p className="eyebrow"><span /> Données publiques et citables</p>
            <h1>Accès agents IA<br />et MCP</h1>
            <p>Le corpus public de Café Adaptogène peut être lu en JSON, en Markdown ou interrogé par un client compatible MCP.</p>
            <div className="article-meta"><span>Lecture seule</span><span>Sans compte</span><span>URLs publiques à citer</span></div>
          </div>
          <div className="article-monogram" aria-hidden="true"><span>AI</span><small>PUBLIC / READ ONLY</small></div>
        </section>

        <div className="article-layout">
          <aside className="article-toc">
            <p>Sur cette page</p>
            <a href="#mcp">Endpoint MCP</a>
            <a href="#outils">Outils disponibles</a>
            <a href="#connexion">Connexion</a>
            <a href="#fichiers">Fichiers directs</a>
            <a href="#limites">Limites</a>
          </aside>
          <article className="article-body">
            <p className="answer-first">Endpoint public : <strong>https://cafeadaptogene.com/mcp</strong>. Il ne permet aucune écriture et n’accède qu’aux informations déjà publiées sur ce site.</p>

            <section id="mcp">
              <p className="eyebrow"><span /> Serveur distant</p>
              <h2>Un point d’entrée MCP stable</h2>
              <p>Ajoutez l’URL ci-dessus comme serveur MCP distant dans votre client compatible. Aucune clé API ni donnée personnelle n’est requise. Les résultats contiennent une URL absolue vers la page publique qui doit être citée.</p>
              <div className="editor-note"><span>Règle d’usage</span><p>Commencez par <code>search</code>, puis utilisez <code>fetch</code> sur l’identifiant retenu. Conservez les nuances « mesuré », « estimé », « déclaré » et « non publié ».</p></div>
            </section>

            <section id="outils">
              <p className="eyebrow"><span /> Quatre outils</p>
              <h2>Rechercher sans déformer</h2>
              <div className="criteria-grid">
                <div><span>01</span><h3><code>search</code></h3><p>Recherche guides et produits. Dix résultats maximum avec identifiant, titre et URL publique.</p></div>
                <div><span>02</span><h3><code>fetch</code></h3><p>Renvoie le texte complet, les métadonnées et les sources associées à un identifiant.</p></div>
                <div><span>03</span><h3><code>compare_products</code></h3><p>Compare jusqu’à dix produits sur les champs documentés, sans podium commercial automatique.</p></div>
                <div><span>04</span><h3><code>get_sources</code></h3><p>Liste les sources d’un document ou l’ensemble dédupliqué des sources publiques.</p></div>
              </div>
            </section>

            <section id="connexion">
              <p className="eyebrow"><span /> Codex, Claude et autres clients</p>
              <h2>Comment le connecter</h2>
              <div className="method-inline">
                <div><b>1. Ajouter un serveur distant</b><span>Ouvrez les réglages MCP ou Connecteurs de votre outil.</span></div>
                <div><b>2. Coller l’endpoint</b><span>Utilisez exactement <code>https://cafeadaptogene.com/mcp</code>.</span></div>
                <div><b>3. Vérifier les outils</b><span>Le client doit afficher les quatre outils ci-dessus, tous en lecture seule.</span></div>
                <div><b>4. Exiger les citations</b><span>Demandez à l’agent de conserver les URLs renvoyées dans sa réponse.</span></div>
              </div>
            </section>

            <section id="fichiers">
              <p className="eyebrow"><span /> Sans MCP</p>
              <h2>Lire directement les fichiers</h2>
              <p>Un agent qui ne prend pas en charge MCP peut télécharger le même corpus dans des formats simples :</p>
              <ul className="source-list">
                <li><a href="/ai/content.json">Guides et fiches éditoriales — JSON</a></li>
                <li><a href="/ai/catalog.json">Annuaire des produits — JSON</a></li>
                <li><a href="/ai/sources.json">Sources dédupliquées — JSON</a></li>
                <li><a href="/ai/mcp-data.json">Index unifié — JSON</a></li>
                <li><a href="/ai/index.md">Notice courte — Markdown</a></li>
              </ul>
            </section>

            <section id="limites">
              <p className="eyebrow"><span /> Ce que cet accès ne fait pas</p>
              <h2>Une infrastructure, pas une promesse de classement</h2>
              <div className="takeaways">
                <h2>Limites explicites</h2>
                <div>
                  <p><span>01</span>Le MCP ne garantit ni indexation ni citation par un moteur ou un modèle.</p>
                  <p><span>02</span>Une source sur un ingrédient ne prouve pas l’effet du mélange fini.</p>
                  <p><span>03</span>Une donnée absente reste « non publiée ».</p>
                  <p><span>04</span>Les contenus ne remplacent pas un avis médical.</p>
                </div>
              </div>
            </section>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
