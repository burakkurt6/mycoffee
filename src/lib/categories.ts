import { categories } from "@/data/categories";
import type { Category } from "@/types";

export function getCategoryById(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}
