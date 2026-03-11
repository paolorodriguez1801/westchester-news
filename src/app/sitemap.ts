import { MetadataRoute } from "next";
import { getAllArticleSlugs, getAllCategorySlugs } from "@/lib/db/queries";

export const revalidate = 3600; // se regenera cada hora ← LÍNEA NUEVA

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://westchesternewstoday.com";

  let articleSlugs: { slug: string; published_at: string }[] = [];
  let categorySlugs: { slug: string }[] = [];

  try {
    [articleSlugs, categorySlugs] = await Promise.all([
      getAllArticleSlugs(),
      getAllCategorySlugs(),
    ]);
  } catch {
    // DB not available during build — return only the home entry
  }

  const home: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1.0,
    },
  ];

  const articles: MetadataRoute.Sitemap = articleSlugs.map((a) => ({
    url: `${siteUrl}/news/${a.slug}`,
    lastModified: new Date(a.published_at),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const categories: MetadataRoute.Sitemap = categorySlugs.map((c) => ({
    url: `${siteUrl}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.6,
  }));

  return [...home, ...articles, ...categories];
}
