import { products } from "@/data/products";
import type { Product } from "@/types";

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
