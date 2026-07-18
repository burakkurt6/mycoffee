import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { products } from "@/data/products";
import { getCategoryById } from "@/lib/categories";
import { getProductBySlug } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import type { Locale, Product } from "@/types";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const localizedLocale = locale as Locale;

  return buildMetadata({
    locale: localizedLocale,
    path: `/urunler/${slug}`,
    title: product.name[localizedLocale],
    description: product.description[localizedLocale],
    image: product.image,
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: Product }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("ProductsPage");
  const format = useFormatter();
  const category = getCategoryById(product.categoryId);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <Link
        href="/urunler"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        {t("backToProducts")}
      </Link>

      <div className="mt-6 grid gap-10 sm:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.name[locale]}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 50vw, 100vw"
            priority
          />
        </div>

        <div>
          {category && (
            <p className="text-sm text-muted-foreground">
              {category.name[locale]}
            </p>
          )}
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            {product.name[locale]}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {product.description[locale]}
          </p>
          {product.price !== undefined && (
            <p className="mt-6 text-xl font-medium">
              {format.number(product.price, {
                style: "currency",
                currency: product.currency ?? "TRY",
              })}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
