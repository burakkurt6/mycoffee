// Gerçek ürün içeriği - fotoğraflar public/images/products/ altında .webp olarak duruyor.
import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "filtre-kahve",
    slug: "filtre-kahve",
    categoryId: "ozel-demleme-kahveler",
    name: {
      tr: "Filtre Kahve",
      en: "Filter Coffee",
    },
    description: {
      tr: "Taze çekirdeklerden demlenen, hafif ve dengeli filtre kahve.",
      en: "A light, well-balanced filter coffee brewed from freshly ground beans.",
    },
    image: "/images/products/filtre-kahve.webp",
    price: 180,
    currency: "TRY",
    featured: true,
  },
  {
    id: "turk-kahvesi",
    slug: "turk-kahvesi",
    categoryId: "kahveler",
    name: {
      tr: "Türk Kahvesi",
      en: "Turkish Coffee",
    },
    description: {
      tr: "Cezvede pişirilen, köpüklü geleneksel Türk kahvesi.",
      en: "Traditional foamy Turkish coffee, brewed in a cezve.",
    },
    image: "/images/products/turk-kahvesi.webp",
    price: 190,
    currency: "TRY",
  },
  {
    id: "americano",
    slug: "americano",
    categoryId: "ozel-demleme-kahveler",
    name: {
      tr: "Americano",
      en: "Americano",
    },
    description: {
      tr: "Espresso üzerine sıcak su eklenerek hazırlanan sade ve dengeli bir kahve.",
      en: "A simple, balanced coffee made by adding hot water to espresso.",
    },
    image: "/images/products/americano.webp",
    price: 200,
    currency: "TRY",
  },
  {
    id: "espresso",
    slug: "espresso",
    categoryId: "kahveler",
    name: {
      tr: "Espresso",
      en: "Espresso",
    },
    description: {
      tr: "Yoğun aromalı, klasik İtalyan usulü espresso.",
      en: "A classic Italian-style espresso with intense aroma.",
    },
    image: "/images/products/espresso.webp",
    price: 190,
    currency: "TRY",
  },
  {
    id: "cappuccino",
    slug: "cappuccino",
    categoryId: "kahveler",
    name: {
      tr: "Cappuccino",
      en: "Cappuccino",
    },
    description: {
      tr: "Espresso, buharda ısıtılmış süt ve yoğun köpükle hazırlanan klasik İtalyan kahvesi.",
      en: "A classic Italian coffee made with espresso, steamed milk, and thick foam.",
    },
    image: "/images/products/cappuccino.webp",
    price: 230,
    currency: "TRY",
    featured: true,
  },
  {
    id: "latte",
    slug: "latte",
    categoryId: "kahveler",
    name: {
      tr: "Latte",
      en: "Latte",
    },
    description: {
      tr: "Espresso ve bol sütle hazırlanan, yumuşak içimli kahve.",
      en: "A smooth coffee made with espresso and plenty of steamed milk.",
    },
    image: "/images/products/latte.webp",
    price: 240,
    currency: "TRY",
  },
  {
    id: "mocha",
    slug: "mocha",
    categoryId: "kahveler",
    name: {
      tr: "Mocha",
      en: "Mocha",
    },
    description: {
      tr: "Espresso, çikolata ve sütün buluştuğu tatlı bir kahve deneyimi.",
      en: "A sweet coffee experience combining espresso, chocolate, and milk.",
    },
    image: "/images/products/mocha.webp",
    price: 270,
    currency: "TRY",
  },
  {
    id: "frappe",
    slug: "frappe",
    categoryId: "kahveler",
    name: {
      tr: "Frappe",
      en: "Frappe",
    },
    description: {
      tr: "Buzla çırpılan, köpüklü ve serinletici soğuk kahve.",
      en: "A frothy, refreshing cold coffee whipped with ice.",
    },
    image: "/images/products/frappe.webp",
    price: 290,
    currency: "TRY",
  },
  {
    id: "cool-lime",
    slug: "cool-lime",
    categoryId: "soguk-icecekler",
    name: {
      tr: "Cool Lime",
      en: "Cool Lime",
    },
    description: {
      tr: "Taze limon ve nane ile hazırlanan ferahlatıcı soğuk içecek.",
      en: "A refreshing cold drink made with fresh lime and mint.",
    },
    image: "/images/products/cool-lime.webp",
    price: 250,
    currency: "TRY",
  },
];
