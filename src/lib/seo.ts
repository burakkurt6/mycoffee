import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";
import { env } from "@/lib/env";
import type { Locale } from "@/types";

const ogLocaleMap: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
};

type Href = Parameters<typeof getPathname>[0]["href"];

type BuildMetadataParams = {
  locale: Locale;
  href: Href;
  title: string;
  description: string;
  image?: string;
};

function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_SITE_URL}${path}`;
}

function localizedUrl(locale: Locale, href: Href) {
  // getPathname already returns the locale-prefixed pathname (e.g. "/en/products").
  return absoluteUrl(getPathname({ locale, href }));
}

export function buildMetadata({
  locale,
  href,
  title,
  description,
  image,
}: BuildMetadataParams): Metadata {
  const canonicalUrl = localizedUrl(locale, href);
  const fullTitle = `${title} | ${siteConfig.name}`;

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedUrl(l, href)]),
  );
  languages["x-default"] = localizedUrl(routing.defaultLocale, href);

  const images = image ? [{ url: absoluteUrl(image) }] : undefined;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: ogLocaleMap[locale],
      type: "website",
      ...(images && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(images && { images }),
    },
  };
}
