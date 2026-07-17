// Bu sayfadaki içerik örnek/placeholder metindir — gerçek içerik kullanıcı tarafından güncellenecek.
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  return {
    title: t("title"),
    description: t("description"),
  };
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
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
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
    </main>
  );
}
