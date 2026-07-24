import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ProductGrid } from "@/components/products/product-grid";
import { getFeaturedProducts } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return buildMetadata({
    locale,
    href: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("HomePage");
  const featuredProducts = getFeaturedProducts();

  return (
    <main className="flex-1">
      <div className="relative h-[400px] w-full sm:h-[500px] md:h-[600px]">
        <Image
          src="/images/home/home-hero.webp"
          alt={t("heroAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 sm:bg-transparent sm:bg-gradient-to-r sm:from-black/70 sm:via-black/30 sm:to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center sm:justify-start sm:px-12 sm:text-left md:px-16">
          <div className="max-w-md">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-white/90">{t("description")}</p>
          </div>
        </div>
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("featuredHeading")}
        </h2>
        <div className="mt-8">
          <ProductGrid products={featuredProducts} />
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/urunler"
            className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            {t("viewAllProducts")}
          </Link>
        </div>
      </section>
    </main>
  );
}
