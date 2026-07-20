import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { products } from "@/data/products";
import { getCategoryById } from "@/lib/categories";
import { getProductBySlug } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import type { Locale, Product } from "@/types";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return buildMetadata({
    locale,
    href: { pathname: "/urunler/[slug]", params: { slug } },
    title: product.name[locale],
    description: product.description[locale],
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

  const t = await getTranslations({ locale, namespace: "ProductsPage" });
  const format = await getFormatter({ locale });

  return (
    <ProductDetailContent
      product={product}
      locale={locale}
      backToProductsLabel={t("backToProducts")}
      formattedPrice={
        product.price !== undefined
          ? format.number(product.price, {
              style: "currency",
              currency: product.currency ?? "TRY",
            })
          : undefined
      }
    />
  );
}

type ContentProps = {
  product: Product;
  locale: Locale;
  backToProductsLabel: string;
  formattedPrice: string | undefined;
};

function ProductDetailContent({
  product,
  locale,
  backToProductsLabel,
  formattedPrice,
}: ContentProps) {
  const category = getCategoryById(product.categoryId);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <Link
        href="/urunler"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        {backToProductsLabel}
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
          {formattedPrice !== undefined && (
            <p className="mt-6 text-xl font-medium">{formattedPrice}</p>
          )}
        </div>
      </div>
    </main>
  );
}
