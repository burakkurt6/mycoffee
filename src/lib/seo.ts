import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { env } from "@/lib/env";
import type { Locale } from "@/types";

const ogLocaleMap: Record<Locale, string> = {
  tr: "tr_TR",
  en: "en_US",
};

type BuildMetadataParams = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
};

function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_SITE_URL}${path}`;
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  image,
}: BuildMetadataParams): Metadata {
  const normalizedPath = path === "/" ? "" : path;
  const canonicalUrl = absoluteUrl(`/${locale}${normalizedPath}`);
  const fullTitle = `${title} | ${siteConfig.name}`;

  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      absoluteUrl(`/${locale}${normalizedPath}`),
    ]),
  );
  languages["x-default"] = absoluteUrl(
    `/${routing.defaultLocale}${normalizedPath}`,
  );

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
