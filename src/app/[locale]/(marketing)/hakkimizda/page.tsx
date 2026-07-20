import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return buildMetadata({
    locale,
    href: "/hakkimizda",
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutPageContent />;
}

function AboutPageContent() {
  const t = useTranslations("AboutPage");

  const values = [
    { title: t("value1Title"), description: t("value1Description") },
    { title: t("value2Title"), description: t("value2Description") },
    { title: t("value3Title"), description: t("value3Description") },
  ];

  return (
    <main className="flex-1">
      <div className="relative h-[320px] w-full sm:h-[400px] md:h-[480px]">
        <Image
          src="/images/about/about-hero.webp"
          alt={t("heroAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1 className="text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {t("title")}
          </h1>
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <div className="space-y-4 text-muted-foreground">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
        </div>

        <h2 className="mt-12 text-xl font-semibold tracking-tight">
          {t("valuesHeading")}
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-3">
          {values.map((value) => (
            <li key={value.title}>
              <p className="font-medium">{value.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {value.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
