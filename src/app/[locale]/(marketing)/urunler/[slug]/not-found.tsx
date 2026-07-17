import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function ProductNotFound() {
  const t = useTranslations("ProductsPage");

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("notFound")}
      </h1>
      <Link
        href="/urunler"
        className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground"
      >
        {t("backToProducts")}
      </Link>
    </main>
  );
}
