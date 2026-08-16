import type { Metadata } from "next";
import { ProductLanding } from "../components/product-landing";
import { landingProducts } from "../product-landing-data";

const product = landingProducts.collagene;

export const metadata: Metadata = {
  title: "Café Collagène — Arabica, collagène marin & acide hyaluronique",
  description: "Précommandez Café Collagène par Café Adaptogène : Arabica, collagène marin et acide hyaluronique, 2 € le sachet et quantité libre.",
  alternates: { canonical: "/collagene/" },
  openGraph: { title: "Café Collagène — Votre café devient un rituel précieux", description: product.lead, url: "/collagene/", images: [{ url: product.packImage, alt: product.packAlt }] },
};

export default function CollagenePage() { return <ProductLanding product={product} />; }
