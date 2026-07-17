// Bu dosyadaki değerler örnek/placeholder veridir — gerçek içerik daha sonra elle güncellenecek.
import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "MyCoffee",
  description: {
    tr: "Özenle kavrulmuş kahveler ve kahve ekipmanları sunan kurumsal kahve markası.",
    en: "A corporate coffee brand offering carefully roasted coffees and coffee equipment.",
  },
  nav: [
    {
      label: { tr: "Anasayfa", en: "Home" },
      href: "/",
    },
    {
      label: { tr: "Hakkımızda", en: "About" },
      href: "/hakkimizda",
    },
    {
      label: { tr: "Ürünler", en: "Products" },
      href: "/urunler",
    },
    {
      label: { tr: "İletişim", en: "Contact" },
      href: "/iletisim",
    },
  ],
  social: [
    {
      platform: "instagram",
      url: "https://instagram.com/mycoffee",
    },
    {
      platform: "facebook",
      url: "https://facebook.com/mycoffee",
    },
  ],
  contact: {
    email: "info@example.com",
    phone: "+90 555 000 00 00",
    address: {
      tr: "Örnek Mahallesi, Kahve Sokak No:1, İstanbul",
      en: "Sample District, Coffee Street No:1, Istanbul",
    },
  },
};
