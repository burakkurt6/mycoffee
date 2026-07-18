// image path'leri şu an placeholder SVG - gerçek ürün fotoğrafları hazır olduğunda
// public/images/products/ altına aynı isimle .jpg/.webp olarak eklenip path burada güncellenmelidir
import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "ethiopia-yirgacheffe",
    slug: "etiyopya-yirgacheffe",
    categoryId: "filter-coffee",
    name: {
      tr: "Etiyopya Yirgacheffe",
      en: "Ethiopia Yirgacheffe",
    },
    description: {
      tr: "Çiçeksi ve narenciye notaları taşıyan, açık kavrulmuş filtre kahve.",
      en: "A light-roasted filter coffee with floral and citrus notes.",
    },
    image: "/images/products/etiyopya-yirgacheffe.svg",
    price: 320,
    currency: "TRY",
    featured: true,
  },
  {
    id: "classic-espresso-blend",
    slug: "klasik-espresso-harmani",
    categoryId: "espresso-based",
    name: {
      tr: "Klasik Espresso Harmanı",
      en: "Classic Espresso Blend",
    },
    description: {
      tr: "Yoğun gövdeli, çikolata ve fındık tonlarıyla dengeli bir espresso harmanı.",
      en: "A full-bodied espresso blend balanced with chocolate and hazelnut tones.",
    },
    image: "/images/products/klasik-espresso-harmani.svg",
    price: 280,
    currency: "TRY",
    featured: true,
  },
  {
    id: "colombia-supremo",
    slug: "kolombiya-supremo",
    categoryId: "filter-coffee",
    name: {
      tr: "Kolombiya Supremo",
      en: "Colombia Supremo",
    },
    description: {
      tr: "Karamel ve kırmızı meyve notalarıyla öne çıkan dengeli bir kahve.",
      en: "A balanced coffee with notable caramel and red fruit notes.",
    },
    image: "/images/products/kolombiya-supremo.svg",
    price: 300,
    currency: "TRY",
  },
  {
    id: "pour-over-dripper",
    slug: "pour-over-dripper",
    categoryId: "coffee-equipment",
    name: {
      tr: "Pour Over Dripper",
      en: "Pour Over Dripper",
    },
    description: {
      tr: "Ev kullanımına uygun, seramik gövdeli filtre kahve demleme ekipmanı.",
      en: "A ceramic pour-over dripper suited for home brewing.",
    },
    image: "/images/products/pour-over-dripper.svg",
    price: 450,
    currency: "TRY",
  },
];
