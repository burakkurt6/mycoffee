"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { sendContactForm } from "@/actions/send-contact";
import { createContactFormSchema, type ContactFormValues } from "@/schemas/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ContactForm() {
  const t = useTranslations("ContactForm");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(createContactFormSchema(t)),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    const result = await sendContactForm(values);

    if (result.success) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nameLabel")}</FormLabel>
              <FormControl>
                <Input placeholder={t("namePlaceholder")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emailLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("messageLabel")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("messagePlaceholder")}
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? t("submitting") : t("submitButton")}
        </Button>

        {status === "success" && (
          <p role="status" className="text-sm text-green-600">
            {t("successMessage")}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-sm text-destructive">
            {t("errorMessage")}
          </p>
        )}
      </form>
    </Form>
  );
}
