import type { MetadataRoute } from "next";
import { landingSlugs } from "./product-landing-data";
import { allGuides, siteUrl } from "./site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: "2026-09-29", changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/marques/`, lastModified: "2026-08-25", changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/marques/cafe-integral/`, lastModified: "2026-08-25", changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/marques/cafe-minceur/`, lastModified: "2026-08-25", changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/annuaire-cafes-fonctionnels/`, lastModified: "2026-09-29", changeFrequency: "weekly", priority: 0.95 },
    { url: `${siteUrl}/nouveautes-cafes-fonctionnels/`, lastModified: "2026-09-29", changeFrequency: "weekly", priority: 0.95 },
    { url: `${siteUrl}/vitalitea/`, lastModified: "2026-09-08", changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/mentions-legales/`, lastModified: "2026-09-09", changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/politique-de-confidentialite/`, lastModified: "2026-09-09", changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/politique-cookies/`, lastModified: "2026-09-09", changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/conditions-utilisation/`, lastModified: "2026-09-09", changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/conditions-precommande/`, lastModified: "2026-09-09", changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/livraison-retours/`, lastModified: "2026-09-09", changeFrequency: "monthly", priority: 0.3 },
    { url: `${siteUrl}/quel-cafe-me-correspond/`, lastModified: "2026-08-01", changeFrequency: "monthly", priority: 0.9 },
    ...landingSlugs.map((slug) => ({
      url: `${siteUrl}/${slug}/`,
      lastModified: "2026-08-16",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...allGuides.map((guide) => ({
      url: `${siteUrl}/${guide.slug}/`,
      lastModified: guide.slug === "cafe-nouvelle-generation" ? "2026-09-24" : guide.slug === "torregral" ? "2026-08-25" : "2026-08-01",
      changeFrequency: "monthly" as const,
      priority: guide.slug === "guide-cafe-adaptogene" || guide.slug === "torregral" ? 0.9 : 0.8,
    })),
  ];
}
