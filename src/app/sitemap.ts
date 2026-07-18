import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { products } from "@/data/products";
import { env } from "@/lib/env";

const staticPaths: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/hakkimizda", changeFrequency: "monthly", priority: 0.7 },
  { path: "/urunler", changeFrequency: "weekly", priority: 0.9 },
  { path: "/iletisim", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    staticPaths.map(({ path, changeFrequency, priority }) => ({
      url: `${env.NEXT_PUBLIC_SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
  );

  const productEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${env.NEXT_PUBLIC_SITE_URL}/${locale}/urunler/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticEntries, ...productEntries];
}
