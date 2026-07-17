import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
