import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductFilter } from "@/components/products/product-filter";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ProductsPage" });

  return buildMetadata({
    locale,
    href: "/urunler",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductsPageContent />;
}

function ProductsPageContent() {
  const t = useTranslations("ProductsPage");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("description")}</p>
      <div className="mt-10">
        <ProductFilter categories={categories} products={products} />
      </div>
    </main>
  );
}
