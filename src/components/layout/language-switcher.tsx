"use client";

import { useParams } from "next/navigation";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getProductBySlug } from "@/lib/products";
import type { Locale } from "@/types";

const locales: Locale[] = ["tr", "en"];

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("Layout");

  function switchLocale(nextLocale: Locale) {
    // Product slugs are themselves translated per locale (e.g. "turk-kahvesi" vs
    // "turkish-coffee"), so a plain param carry-over would produce a broken URL.
    // Look up the current product by its current-locale slug and swap in the
    // equivalent slug for the target locale.
    if (typeof params.slug === "string") {
      const product = getProductBySlug(params.slug, locale);
      if (product) {
        router.replace(
          { pathname: "/urunler/[slug]", params: { slug: product.slug[nextLocale] } },
          { locale: nextLocale },
        );
        return;
      }
    }

    router.replace(
      // @ts-expect-error -- `params` matches `pathname` for the current route.
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <div
      className="flex items-center gap-1 text-sm"
      aria-label={t("changeLanguage")}
    >
      <Globe className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchLocale(l)}
          aria-current={l === locale}
          className={
            l === locale
              ? "font-semibold text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
