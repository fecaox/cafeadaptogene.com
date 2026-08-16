import type { Metadata } from "next";
import { ProductLanding } from "../components/product-landing";
import { landingProducts } from "../product-landing-data";

const product = landingProducts.proteine;

export const metadata: Metadata = {
  title: "Café Protéiné — Arabica & whey naturelle",
  description: "Précommandez Café Protéiné par Café Adaptogène : café Arabica, whey naturelle, format individuel, 2 € le sachet et quantité libre.",
  alternates: { canonical: "/proteine/" },
  openGraph: { title: "Café Protéiné — Le café qui entre dans votre routine sportive", description: product.lead, url: "/proteine/", images: [{ url: product.packImage, alt: product.packAlt }] },
};

export default function ProteinePage() { return <ProductLanding product={product} />; }
