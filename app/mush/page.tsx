import type { Metadata } from "next";
import { ProductLanding } from "../components/product-landing";
import { landingProducts } from "../product-landing-data";

const product = landingProducts.mush;

export const metadata: Metadata = {
  title: "Café Mush — Arabica & champignons adaptogènes",
  description: "Précommandez Café Mush par Café Adaptogène : café Arabica et champignons adaptogènes dans un format individuel, 2 € le sachet.",
  alternates: { canonical: "/mush/" },
  openGraph: { title: "Café Mush — Réveillez la bonne idée", description: product.lead, url: "/mush/", images: [{ url: product.packImage, alt: product.packAlt }] },
};

export default function MushPage() { return <ProductLanding product={product} />; }
