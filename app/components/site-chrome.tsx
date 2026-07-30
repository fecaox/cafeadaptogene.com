import Link from "next/link";
import { universes } from "../site-data";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <div className="noticebar">
        <span>Observatoire 2026</span>
        <p>Données vérifiées · Méthode publiée · Affiliation signalée</p>
      </div>
      <header className={`site-header${compact ? " compact-header" : ""}`}>
        <Link className="wordmark" href="/" aria-label="Café Adaptogène, accueil">
          CAFÉ <i>ADAPTOGÈNE</i>
        </Link>
        <nav aria-label="Navigation principale">
          {universes.map((universe) => <Link href={`/${universe.slug}/`} key={universe.id}>{universe.title}</Link>)}
          <Link href="/#marques">Marques</Link>
        </nav>
        <Link className="header-cta" href="/quel-cafe-me-correspond/">Trouver mon café <span>→</span></Link>
        <details className="mobile-menu">
          <summary aria-label="Ouvrir le menu">Menu</summary>
          <div>
            {universes.map((universe) => <Link href={`/${universe.slug}/`} key={universe.id}>{universe.title}</Link>)}
            <Link href="/#marques">Marques</Link>
            <Link className="mobile-quiz-link" href="/quel-cafe-me-correspond/">Trouver mon café</Link>
          </div>
        </details>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="wordmark footer-logo" href="/">CAFÉ <i>ADAPTOGÈNE</i></Link>
          <p>Le média français qui remet chaque café fonctionnel dans la bonne catégorie.</p>
          <Link className="footer-quiz" href="/quel-cafe-me-correspond/">Quel café vous correspond ? →</Link>
        </div>
        <div>
          <h3>Les univers</h3>
          {universes.map((universe) => <Link href={`/${universe.slug}/`} key={universe.id}>{universe.title}</Link>)}
        </div>
        <div>
          <h3>Nos engagements</h3>
          <Link href="/methodologie/">Méthodologie</Link>
          <Link href="/politique-affiliation/">Affiliation</Link>
          <Link href="/guide-cafe-adaptogene/">Guide essentiel</Link>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:bonjour@cafeadaptogene.com">bonjour@cafeadaptogene.com</a>
          <p className="footer-small">Une donnée à corriger ? Envoyez-nous sa source et sa date.</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 cafeadaptogene.com</span>
        <span>Information générale — ne remplace pas un avis médical</span>
        <span>Liens rémunérés signalés</span>
      </div>
    </footer>
  );
}
