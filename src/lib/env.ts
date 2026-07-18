import { z } from "zod";

const isDev = process.env.NODE_ENV !== "production";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

if (!parsed.success) {
  if (isDev) {
    console.warn(
      "[env] NEXT_PUBLIC_SITE_URL eksik veya geçersiz, geliştirme için http://localhost:3000 kullanılıyor.",
    );
  } else {
    throw new Error(`Invalid environment variables: ${parsed.error.message}`);
  }
}

export const env = {
  NEXT_PUBLIC_SITE_URL: parsed.success
    ? parsed.data.NEXT_PUBLIC_SITE_URL
    : "http://localhost:3000",
};
