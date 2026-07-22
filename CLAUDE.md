# Proje: My Coffee

Next.js 16 (App Router) tabanlı, çift dilli (TR/EN) kurumsal/ürün tanıtım sitesi.
Backend yok — tüm içerik `data/` klasöründen statik olarak yönetiliyor.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Paket yöneticisi:** pnpm (npm/yarn KULLANMA)
- **UI:** shadcn/ui + Tailwind CSS
- **İkonlar:** lucide-react (UI ikonları), react-icons (`react-icons/si` — Simple Icons seti, marka/sosyal medya logoları — lucide-react marka ikonlarını içermiyor)
- **Form:** react-hook-form + zod
- **i18n:** next-intl (`/tr`, `/en` prefix'li URL yapısı)
- **Render stratejisi:** SSG (Static Site Generation) — mümkün olan her yerde
- **SEO:** Metadata API, sitemap.ts, robots.ts, opengraph-image.tsx

## Klasör Mimarisi

```
src/
├── app/[locale]/layout.tsx     # Hem root hem locale layout (ayrı bir app/layout.tsx YOK — next-intl önerisi)
├── app/[locale]/(marketing)/   # Sadece routing + layout + metadata
├── app/sitemap.ts               # Tüm route'lar × her iki locale (locale-prefiksiz, /sitemap.xml)
├── app/robots.ts                # /robots.txt, sitemap.ts'i işaret eder
├── app/opengraph-image.tsx      # Varsayılan OG görseli (locale-prefiksiz, tüm sayfalara miras kalır)
├── components/
│   ├── ui/                     # shadcn bileşenleri (dokunma, shadcn CLI ile ekle)
│   ├── layout/                 # header, footer, language-switcher
│   ├── sections/                # hero, feature-grid, cta
│   ├── products/                # product-card, product-grid, product-detail
│   └── forms/                   # contact-form
├── lib/                         # Pure TS helper, third-party client init (env.ts, seo.ts dahil)
├── actions/                     # Server Actions ("use server")
├── data/                        # Statik içerik (tek doğruluk kaynağı)
├── types/                       # Paylaşılan TS type'ları
├── schemas/                     # Zod şemaları
├── i18n/                        # next-intl routing/request config
├── messages/                    # tr.json, en.json çeviriler
└── proxy.ts                      # next-intl middleware (Next.js 16: middleware.ts değil proxy.ts)
```

**Not:** `app/layout.tsx` (locale dışı bir root layout) yok — `app/[locale]/layout.tsx` hem `<html lang={locale}>`/`<body>` tag'lerini hem de `NextIntlClientProvider`'ı barındırıyor. Projede locale prefix'i taşımayan hiçbir sayfa olmadığı için next-intl'in resmi önerdiği bu pattern kullanılıyor.

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
- URL yapısı: `/tr/urunler`, `/en/products` gibi locale'e göre farklı slug istiyorsak `routing.ts` içinde `pathnames` tanımlanır — istemiyorsak sabit slug kullanılır
- **Güncel `pathnames` haritası** (`src/i18n/routing.ts`):
  - `/` → TR: `/`, EN: `/`
  - `/hakkimizda` → TR: `/hakkimizda`, EN: `/about`
  - `/urunler` → TR: `/urunler`, EN: `/products`
  - `/urunler/[slug]` → TR: `/urunler/[slug]`, EN: `/products/[slug]`
  - `/iletisim` → TR: `/iletisim`, EN: `/contact`
  - Dinamik olmayan rotalara `next-intl`'in typed `Link`'i ile link verirken düz string href yeterli; `/urunler/[slug]` gibi parametreli rotalarda `href={{ pathname: '/urunler/[slug]', params: { slug } }}` object formu kullanılmalı
  - `src/global.d.ts` içinde `next-intl`'in `AppConfig` tipi `routing.locales`/`routing.pathnames`'e göre augment edilir — `tsc` bu sayede geçersiz href'leri derleme zamanında yakalar
  - Ürün `slug`'ları da locale'e göre farklılaşabiliyor (`data/products.ts`'te `slug: LocalizedString`, örn. `turk-kahvesi`/`turkish-coffee`) — bu yüzden `[locale]/layout.tsx`'teki `<NextIntlClientProvider locale={locale}>`'a **her zaman açık `locale` prop'u geçilmeli**; implicit inference'a bırakılırsa (`<NextIntlClientProvider>`), `urunler/[slug]` gibi `force-static` + iç içe dinamik segment içeren rotalarda `useLocale()` yanlış (varsayılan) locale'e sabitleniyor — bu da dil değiştirici gibi client component'lerde sessizce yanlış URL üretilmesine yol açar
- Yeni bir metin eklerken önce `messages/*.json`'a key ekle, sonra component'te `useTranslations()` / `getTranslations()` ile çağır — asla hardcoded TR/EN metin yazma

## İçerik Güncelleme

Ürün, kategori, site bilgisi gibi içerikler `data/*.ts` dosyalarından değiştirilir.
Bu dosyalar `types/index.ts`'teki tiplere uygun olmalı. Yeni ürün eklemek = `data/products.ts`'e obje eklemek, başka hiçbir yer değişmemeli.

**Not:** İletişim formu şu an sadece console.log ile çalışıyor, gerçek email gönderimi (Resend vb.) henüz entegre edilmedi — ileride ayrı bir adımda eklenecek.

**Not:** Production'a deploy ederken `.env` dosyasında `NEXT_PUBLIC_SITE_URL` gerçek domain'e güncellenmeli.

## Git / Workflow

- Her aşama (kurulum, i18n, data layer, UI, sayfalar, form, SEO) ayrı commit
- Commit mesajları kısa ve İngilizce: `feat: add product listing page`, `chore: setup next-intl routing`
- Her adımdan sonra `pnpm dev` ile görsel kontrol yapılır, sonra commit atılır

## Şu An Yapılmayacaklar (scope dışı, ileride)

- Blog / MDX içerik sistemi (opsiyonel, ilerleyen aşamada eklenecek)
- Backend / CMS entegrasyonu
- Kullanıcı hesabı / auth
