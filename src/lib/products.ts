import { products } from "@/data/products";
import type { Locale, Product } from "@/types";

export function getProductBySlug(slug: string, locale: Locale): Product | undefined {
  return products.find((product) => product.slug[locale] === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}
