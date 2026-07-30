import type { Metadata } from "next";
import "./globals.css";
import { siteUrl } from "./site-data";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Café Adaptogène — Le guide des cafés nouvelle génération",
    template: "%s | Café Adaptogène",
  },
  description:
    "Comparatifs indépendants, guides et analyses des cafés adaptogènes, aux champignons, au collagène, protéinés, focus et nouvelle génération.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Café Adaptogène",
    title: "Café Adaptogène — Le guide des cafés nouvelle génération",
    description: "Comprendre, comparer et choisir son café fonctionnel avec méthode.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Café Adaptogène, le guide des cafés nouvelle génération" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Café Adaptogène — Le guide des cafés nouvelle génération",
    description: "Comprendre, comparer et choisir son café fonctionnel avec méthode.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
