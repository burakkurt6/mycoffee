export type Locale = "tr" | "en";

export interface LocalizedString {
  tr: string;
  en: string;
}

export interface Category {
  id: string;
  slug: string;
  name: LocalizedString;
}

export interface Product {
  id: string;
  slug: LocalizedString;
  categoryId: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
  price?: number;
  currency?: string;
  featured?: boolean;
}

export interface NavItem {
  label: LocalizedString;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: LocalizedString;
  nav: NavItem[];
  social: {
    platform: string;
    url: string;
  }[];
  contact: {
    email: string;
    phone?: string;
    address?: LocalizedString;
  };
}
