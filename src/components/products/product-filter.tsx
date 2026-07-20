"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ProductGrid } from "@/components/products/product-grid";
import { cn } from "@/lib/utils";
import type { Category, Locale, Product } from "@/types";

type Props = {
  categories: Category[];
  products: Product[];
};

export function ProductFilter({ categories, products }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("ProductsPage");
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

  const filteredProducts = activeCategoryId
    ? products.filter((product) => product.categoryId === activeCategoryId)
    : products;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategoryId(null)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition-colors",
            activeCategoryId === null
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {t("allCategories")}
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setActiveCategoryId(category.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              activeCategoryId === category.id
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {category.name[locale]}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
