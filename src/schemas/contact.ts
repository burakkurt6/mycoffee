import { z } from "zod";

type Translator = (key: string) => string;

export function createContactFormSchema(t: Translator) {
  return z.object({
    name: z.string().min(2, t("nameError")),
    email: z.email(t("emailError")),
    message: z.string().min(10, t("messageError")),
  });
}

export type ContactFormValues = z.infer<
  ReturnType<typeof createContactFormSchema>
>;
