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
    "Comprendre, comparer et choisir parmi les cafés classiques, intrinsèquement fonctionnels, enrichis et alternatives nouvelle génération.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Café Adaptogène",
    title: "Café Adaptogène — Le guide des cafés nouvelle génération",
    description: "Trois univers, sept familles et un test pour trouver le café fonctionnel qui vous correspond.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Café Adaptogène, le guide des cafés nouvelle génération" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Café Adaptogène — Le guide des cafés nouvelle génération",
    description: "Trois univers, sept familles et un test pour trouver le café fonctionnel qui vous correspond.",
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
