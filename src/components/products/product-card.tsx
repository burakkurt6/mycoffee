import Image from "next/image";
import { useFormatter, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardTitle } from "@/components/ui/card";
import type { Locale, Product } from "@/types";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const locale = useLocale() as Locale;
  const format = useFormatter();

  return (
    <Link
      href={{ pathname: "/urunler/[slug]", params: { slug: product.slug[locale] } }}
      className="group block h-full"
    >
      <Card className="h-full overflow-hidden py-0 transition-shadow group-hover:shadow-md">
        <div className="relative aspect-square w-full">
          <Image
            src={product.image}
            alt={product.name[locale]}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
        <div className="flex flex-col gap-2 p-6 pt-4">
          <CardTitle>{product.name[locale]}</CardTitle>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {product.description[locale]}
          </p>
          {product.price !== undefined && (
            <p className="font-medium">
              {format.number(product.price, {
                style: "currency",
                currency: product.currency ?? "TRY",
              })}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}
