import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["tr", "en"],
  defaultLocale: "tr",
  pathnames: {
    "/": "/",
    "/hakkimizda": "/hakkimizda",
    "/urunler": {
      tr: "/urunler",
      en: "/products",
    },
    "/urunler/[slug]": {
      tr: "/urunler/[slug]",
      en: "/products/[slug]",
    },
    "/iletisim": "/iletisim",
  },
});
