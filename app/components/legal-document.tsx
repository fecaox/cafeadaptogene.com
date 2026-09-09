import Link from "next/link";
import type { LegalDocument } from "../legal-data";
import { legalDocuments } from "../legal-data";
import { SiteFooter, SiteHeader } from "./site-chrome";

function isInternal(url: string) {
  return url.startsWith("/");
}

export function LegalDocumentPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <SiteHeader compact />
      <main className="legal-page">
        <div className="legal-breadcrumb">
          <Link href="/">Accueil</Link><span>→</span><b>Informations légales</b>
        </div>

        <header className="legal-hero">
          <div>
            <p className="eyebrow"><span /> {document.eyebrow}</p>
            <h1>{document.title}</h1>
            <p>{document.description}</p>
          </div>
          <dl>
            <div><dt>Mise à jour</dt><dd>9 septembre 2026</dd></div>
            <div><dt>Contact</dt><dd><a href="mailto:contact@cafeminceur.fr">contact@cafeminceur.fr</a></dd></div>
            <div><dt>Établissement</dt><dd>Aix-en-Provence, France</dd></div>
          </dl>
        </header>

        <div className="legal-layout">
          <aside>
            <p>Documents</p>
            {legalDocuments.map((item) => (
              <Link className={item.slug === document.slug ? "active" : ""} href={`/${item.slug}/`} key={item.slug}>
                {item.title}<span>↗</span>
              </Link>
            ))}
          </aside>

          <article className="legal-content">
            <p className="legal-intro">{document.intro}</p>
            {document.alert ? <div className="legal-alert"><strong>Point à régulariser</strong><p>{document.alert}</p></div> : null}
            {document.sections.map((section, index) => (
              <section key={section.title} id={`section-${index + 1}`}>
                <span className="legal-section-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.items?.length ? <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                  {section.links?.length ? (
                    <div className="legal-links">
                      {section.links.map((link) => isInternal(link.url)
                        ? <Link href={link.url} key={link.url}>{link.label} <span>→</span></Link>
                        : <a href={link.url} target="_blank" rel="noopener" key={link.url}>{link.label} <span>↗</span></a>)}
                    </div>
                  ) : null}
                </div>
              </section>
            ))}
            <div className="legal-contact-card">
              <div><span>Une question ou une correction ?</span><h2>Écrivez-nous.</h2></div>
              <a href="mailto:contact@cafeminceur.fr">contact@cafeminceur.fr <span>→</span></a>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
