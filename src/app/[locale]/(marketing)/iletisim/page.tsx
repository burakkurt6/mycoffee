import type { Metadata } from "next";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";
import type { Locale } from "@/types";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return buildMetadata({
    locale: locale as Locale,
    path: "/iletisim",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactPageContent />;
}

function ContactPageContent() {
  const t = useTranslations("ContactPage");
  const locale = useLocale() as Locale;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-2 text-muted-foreground">{t("description")}</p>

      <div className="mt-10 grid gap-10 sm:grid-cols-[2fr_1fr]">
        <ContactForm />

        <div className="space-y-2 text-sm text-muted-foreground">
          <h2 className="text-sm font-medium text-foreground">
            {t("contactInfoHeading")}
          </h2>
          <p>{siteConfig.contact.email}</p>
          {siteConfig.contact.phone && <p>{siteConfig.contact.phone}</p>}
          {siteConfig.contact.address && (
            <p>{siteConfig.contact.address[locale]}</p>
          )}
        </div>
      </div>
    </main>
  );
}
