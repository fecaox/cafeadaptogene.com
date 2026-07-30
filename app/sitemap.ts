import type { MetadataRoute } from "next";
import { guides, siteUrl } from "./site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: "2026-07-30", changeFrequency: "weekly", priority: 1 },
    ...guides.map((guide) => ({
      url: `${siteUrl}/${guide.slug}/`,
      lastModified: "2026-07-30",
      changeFrequency: "monthly" as const,
      priority: guide.slug === "guide-cafe-adaptogene" ? 0.9 : 0.8,
    })),
  ];
}
