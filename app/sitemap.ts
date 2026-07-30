import type { MetadataRoute } from "next";
import { allGuides, siteUrl } from "./site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: "2026-07-30", changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/quel-cafe-me-correspond/`, lastModified: "2026-07-30", changeFrequency: "monthly", priority: 0.9 },
    ...allGuides.map((guide) => ({
      url: `${siteUrl}/${guide.slug}/`,
      lastModified: "2026-07-30",
      changeFrequency: "monthly" as const,
      priority: guide.slug === "guide-cafe-adaptogene" ? 0.9 : 0.8,
    })),
  ];
}
