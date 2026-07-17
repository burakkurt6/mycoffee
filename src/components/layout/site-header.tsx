import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";
import type { Locale } from "@/types";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader() {
  const locale = useLocale() as Locale;

  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <div className="flex flex-wrap items-center gap-6">
          <ul className="flex flex-wrap items-center gap-6 text-sm">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {item.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
