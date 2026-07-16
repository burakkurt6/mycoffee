# Proje: My Coffee

Next.js 16 (App Router) tabanlı, çift dilli (TR/EN) kurumsal/ürün tanıtım sitesi.
Backend yok — tüm içerik `data/` klasöründen statik olarak yönetiliyor.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Paket yöneticisi:** pnpm (npm/yarn KULLANMA)
- **UI:** shadcn/ui + Tailwind CSS
- **İkonlar:** lucide-react
- **Form:** react-hook-form + zod
- **i18n:** next-intl (`/tr`, `/en` prefix'li URL yapısı)
- **Render stratejisi:** SSG (Static Site Generation) — mümkün olan her yerde
- **SEO:** Metadata API, sitemap.ts, robots.ts, opengraph-image.tsx

## Klasör Mimarisi

```
src/
├── app/[locale]/(marketing)/   # Sadece routing + layout + metadata
├── components/
│   ├── ui/                     # shadcn bileşenleri (dokunma, shadcn CLI ile ekle)
│   ├── layout/                 # header, footer, language-switcher
│   ├── sections/                # hero, feature-grid, cta
│   ├── products/                # product-card, product-grid, product-detail
│   └── forms/                   # contact-form
├── lib/                         # Pure TS helper, third-party client init
├── actions/                     # Server Actions ("use server")
├── data/                        # Statik içerik (tek doğruluk kaynağı)
├── types/                       # Paylaşılan TS type'ları
├── schemas/                     # Zod şemaları
├── i18n/                        # next-intl routing/request config
├── messages/                    # tr.json, en.json çeviriler
└── middleware.ts                # next-intl middleware
```

## Katman Kuralları (ÖNEMLİ — asla ihlal etme)

| Klasör | Yapabilir | Yapamaz |
|---|---|---|
| `app/` | Component compose etmek, metadata tanımlamak | İş mantığı, veri işleme, doğrudan data manipülasyonu |
| `components/` | `lib/` ve `data/`'dan import etmek | `app/` içine bağımlılık |
| `lib/` | Framework-agnostic TS yazmak | React import etmek |
| `data/` | Typed, sabit içerik tutmak | Fonksiyon/logic barındırmak (sadece veri) |
| `actions/` | Server-side mutation, form submit | Client component içinde çağrılmamak (sadece server) |

## Kodlama Kuralları

- Component dosya isimleri: `kebab-case.tsx` (örn. `product-card.tsx`)
- Varsayılan olarak **Server Component** yaz; `"use client"` sadece interaktiflik (state, event, hook) gerektiğinde ekle
- Her yeni sayfa `generateMetadata` export etmeli (başlık, açıklama, OG, hreflang alternates)
- Görsellerde her zaman `next/image` kullan, `alt` metni zorunlu ve çift dilli olmalı
- Yeni shadcn bileşeni eklerken `npx shadcn@latest add <component>` komutunu kullan, elle component yazma
- Zod şemaları `schemas/` altında tanımlanır, hem client form validation hem server action'da aynı şema kullanılır (DRY)
- Tip tanımları `types/index.ts` içinde merkezi tutulur, component içinde inline type tanımlamaktan kaçın

## i18n Kuralları

- Her sayfa metni `messages/tr.json` ve `messages/en.json` içinde eş zamanlı güncellenir
- URL yapısı: `/tr/urunler`, `/en/products` gibi locale'e göre farklı slug istiyorsak `routing.ts` içinde `pathnames` tanımlanır — istemiyorsak sabit slug kullanılır (karar aşamasında netleştireceğiz)
- Yeni bir metin eklerken önce `messages/*.json`'a key ekle, sonra component'te `useTranslations()` / `getTranslations()` ile çağır — asla hardcoded TR/EN metin yazma

## İçerik Güncelleme

Ürün, kategori, site bilgisi gibi içerikler `data/*.ts` dosyalarından değiştirilir.
Bu dosyalar `types/index.ts`'teki tiplere uygun olmalı. Yeni ürün eklemek = `data/products.ts`'e obje eklemek, başka hiçbir yer değişmemeli.

## Git / Workflow

- Her aşama (kurulum, i18n, data layer, UI, sayfalar, form, SEO) ayrı commit
- Commit mesajları kısa ve İngilizce: `feat: add product listing page`, `chore: setup next-intl routing`
- Her adımdan sonra `pnpm dev` ile görsel kontrol yapılır, sonra commit atılır

## Şu An Yapılmayacaklar (scope dışı, ileride)

- Blog / MDX içerik sistemi (opsiyonel, ilerleyen aşamada eklenecek)
- Backend / CMS entegrasyonu
- Kullanıcı hesabı / auth
