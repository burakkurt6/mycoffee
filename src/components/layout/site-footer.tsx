import Image from "next/image";
import type { IconType } from "react-icons";
import { SiFacebook, SiInstagram } from "react-icons/si";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";
import type { Locale } from "@/types";

const socialIcons: Record<string, IconType> = {
  instagram: SiInstagram,
  facebook: SiFacebook,
};

export function SiteFooter() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-0 overflow-hidden border-t bg-background">
      <Image
        src="/images/about/footer-texture.webp"
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover opacity-22"
      />
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p>{siteConfig.contact.email}</p>
          {siteConfig.contact.phone && <p>{siteConfig.contact.phone}</p>}
          {siteConfig.contact.address && (
            <p>{siteConfig.contact.address[locale]}</p>
          )}
        </div>
        <div className="flex items-center gap-4">
          {siteConfig.social.map((item) => {
            const Icon = socialIcons[item.platform];
            return (
              <a
                key={item.platform}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.platform}
                className="hover:text-foreground"
              >
                {Icon ? <Icon className="h-5 w-5" /> : item.platform}
              </a>
            );
          })}
        </div>
      </div>
      <p className="border-t px-6 py-4 text-center text-xs text-muted-foreground">
        © {year} {siteConfig.name}. {t("rightsReserved")}
      </p>
    </footer>
  );
}
