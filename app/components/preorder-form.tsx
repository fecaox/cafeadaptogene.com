"use client";

import { useMemo, useState } from "react";
import styles from "./product-landing.module.css";

const PRICE_PER_SACHET = 2;
const SHIPPING_PRICE = 4;

export function PreorderForm({ productName, theme }: { productName: string; theme: string }) {
  const [quantity, setQuantity] = useState(20);
  const productTotal = quantity * PRICE_PER_SACHET;
  const total = productTotal + SHIPPING_PRICE;
  const mailto = useMemo(() => {
    const subject = `Précommande — ${productName}`;
    const body = [
      `Bonjour,`,
      ``,
      `Je souhaite précommander ${quantity} sachet${quantity > 1 ? "s" : ""} de ${productName}.`,
      `Produits : ${productTotal.toFixed(2).replace(".", ",")} €`,
      `Livraison forfaitaire : ${SHIPPING_PRICE.toFixed(2).replace(".", ",")} €`,
      `Total indicatif : ${total.toFixed(2).replace(".", ",")} €`,
      ``,
      `Merci de me recontacter lorsque la composition finale et la précommande seront prêtes à être confirmées.`,
    ].join("\n");
    return `mailto:bonjour@cafeadaptogene.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [productName, productTotal, quantity, total]);

  return (
    <div className={`${styles.orderCard} ${styles[`orderCard_${theme}`]}`}>
      <div className={styles.orderHeading}>
        <span>Précommande prioritaire</span>
        <h2>Composez votre lot.</h2>
        <p>Choisissez librement le nombre de sachets. Les 4 € de livraison restent identiques quelle que soit la quantité.</p>
      </div>
      <div className={styles.calculator}>
        <label htmlFor={`quantity-${theme}`}>Nombre de sachets</label>
        <div className={styles.quantityControl}>
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Retirer un sachet">−</button>
          <input
            id={`quantity-${theme}`}
            type="number"
            min="1"
            max="250"
            value={quantity}
            onChange={(event) => setQuantity(Math.min(250, Math.max(1, Number(event.target.value) || 1)))}
          />
          <button type="button" onClick={() => setQuantity((value) => Math.min(250, value + 1))} aria-label="Ajouter un sachet">+</button>
        </div>
        <div className={styles.quickQuantities}>
          {[10, 20, 30, 60].map((value) => (
            <button className={quantity === value ? styles.activeQuantity : ""} type="button" onClick={() => setQuantity(value)} key={value}>{value}</button>
          ))}
        </div>
      </div>
      <dl className={styles.orderSummary}>
        <div><dt>{quantity} sachet{quantity > 1 ? "s" : ""} × 2 €</dt><dd>{productTotal.toFixed(2).replace(".", ",")} €</dd></div>
        <div><dt>Livraison forfaitaire</dt><dd>4,00 €</dd></div>
        <div className={styles.orderTotal}><dt>Total indicatif</dt><dd>{total.toFixed(2).replace(".", ",")} €</dd></div>
      </dl>
      <a className={styles.orderButton} href={mailto}>Précommander {quantity} sachet{quantity > 1 ? "s" : ""} <span>→</span></a>
      <p className={styles.orderFinePrint}>Aucun paiement aujourd’hui. Le bouton prépare un e-mail de réservation. Composition, dosage final, délai et conditions vous seront transmis avant toute confirmation.</p>
    </div>
  );
}
