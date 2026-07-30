import Image from "next/image";
import type { ProductProfile } from "../site-data";

export function ProductCard({ product, compact = false }: { product: ProductProfile; compact?: boolean }) {
  const commercial = product.relationship === "partenaire";
  return (
    <article className={`product-card${compact ? " compact-product" : ""}`}>
      <div className="product-image">
        <Image src={product.image} alt={product.imageAlt} width={720} height={720} sizes={compact ? "(max-width: 760px) 40vw, 180px" : "(max-width: 760px) 86vw, 320px"} />
        {commercial && <span className="relationship-badge">Partenaire · classement indépendant</span>}
      </div>
      <div className="product-copy">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <strong>{product.product}</strong>
        <p>{product.description}</p>
        <div className="product-badges">{product.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
        {!compact && (
          <div className="product-balance">
            <p><b>Points forts</b>{product.strengths.slice(0, 2).join(" · ")}</p>
            <p><b>À savoir</b>{product.limits[0]}</p>
          </div>
        )}
        <div className="product-footer">
          <small>{product.verified}</small>
          <a href={product.link} target="_blank" rel={commercial ? "sponsored nofollow noopener" : "nofollow noopener"}>
            Voir le site officiel <span>↗</span>{commercial && <em>Lien partenaire</em>}
          </a>
        </div>
      </div>
    </article>
  );
}
