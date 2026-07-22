import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { products } from "@/data/products";
import { env } from "@/lib/env";
import type { Locale } from "@/types";

const staticHrefs: {
  href: "/" | "/hakkimizda" | "/urunler" | "/iletisim";
  changeFrequency: "weekly" | "monthly";
  priority: number;
}[] = [
  { href: "/", changeFrequency: "weekly", priority: 1 },
  { href: "/hakkimizda", changeFrequency: "monthly", priority: 0.7 },
  { href: "/urunler", changeFrequency: "weekly", priority: 0.9 },
  { href: "/iletisim", changeFrequency: "monthly", priority: 0.5 },
];

function localizedUrl(locale: Locale, href: Parameters<typeof getPathname>[0]["href"]) {
  // getPathname already returns the locale-prefixed pathname (e.g. "/en/products").
  return `${env.NEXT_PUBLIC_SITE_URL}${getPathname({ locale, href })}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    staticHrefs.map(({ href, changeFrequency, priority }) => ({
      url: localizedUrl(locale, href),
      lastModified: now,
      changeFrequency,
      priority,
    })),
  );

  const productEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    products.map((product) => ({
      url: localizedUrl(locale, {
        pathname: "/urunler/[slug]",
        params: { slug: product.slug[locale] },
      }),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticEntries, ...productEntries];
}
