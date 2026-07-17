"use server";

import { createContactFormSchema, type ContactFormValues } from "@/schemas/contact";

type SendContactResult = { success: true } | { success: false; error: string };

export async function sendContactForm(
  values: ContactFormValues,
): Promise<SendContactResult> {
  const schema = createContactFormSchema((key) => key);
  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    return { success: false, error: "invalid" };
  }

  try {
    // TODO: Resend veya benzeri bir servisle gerçek email gönderimi buraya eklenecek
    console.log("[Contact Form Submission]", parsed.data);

    return { success: true };
  } catch {
    return { success: false, error: "unknown" };
  }
}
