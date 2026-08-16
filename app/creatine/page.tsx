import type { Metadata } from "next";
import { ProductLanding } from "../components/product-landing";
import { landingProducts } from "../product-landing-data";

const product = landingProducts.creatine;

export const metadata: Metadata = {
  title: "Café Créatine — Arabica & créatine pure",
  description: "Précommandez Café Créatine par Café Adaptogène : café Arabica, créatine pure, format individuel, 2 € le sachet et quantité libre.",
  alternates: { canonical: "/creatine/" },
  openGraph: { title: "Café Créatine — Activez le mode puissance", description: product.lead, url: "/creatine/", images: [{ url: product.packImage, alt: product.packAlt }] },
};

export default function CreatinePage() { return <ProductLanding product={product} />; }
