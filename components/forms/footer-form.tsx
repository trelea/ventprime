"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Send } from "lucide-react";
import { submitLead } from "@/lib/actions";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * Footer's 3-field mini-form (Full name / Phone / E-mail) — the footer's
 * third column.
 *
 * Runs against the same `submitLead` action as the rest of the site, so the
 * lead lands in one pipeline (e-mail + Telegram) with just the basics.
 *
 * Light and unboxed on purpose: it sits on a white card inside the light
 * footer, and every field shows only its bottom rule (the shared `Input`
 * primitive) under a label and a placeholder — no fills, no full outlines.
 * The submit button is larger and right-aligned at the foot of the form.
 */
export function FooterForm({ source }: { source: string }) {
  const t = useTranslations("Form");
  const tValidation = useTranslations("Form.validation");
  const tSuccess = useTranslations("Form.success");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  if (done) {
    return (
      <div
        className="border-border bg-surface rounded-xl border p-6 text-center"
        role="status"
      >
        <p className="text-foreground font-semibold">{tSuccess("title")}</p>
        <p className="text-muted-foreground mt-1 text-sm">
          {tSuccess("description", { hours: site.responseTimeHours })}
        </p>
      </div>
    );
  }

  return (
    <form
      className="text-foreground"
      action={(formData) => {
        startTransition(async () => {
          const result = await submitLead({
            name: String(formData.get("name") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            email: String(formData.get("email") ?? ""),
            company: String(formData.get("company") ?? ""),
            source,
          });

          if (result.status === "success") setDone(true);
          else setErrors(result.errors);
        });
      }}
    >
      <p className="text-xl font-semibold">{t("quick.title")}</p>

      <div className="mt-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`footer-name-${source}`} className="font-normal">
            {t("fields.name")} *
          </Label>
          <Input
            id={`footer-name-${source}`}
            name="name"
            autoComplete="name"
            placeholder={t("fields.namePlaceholder")}
            required
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? (
            <p className="text-destructive text-xs">
              {tValidation("nameRequired")}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`footer-phone-${source}`} className="font-normal">
            {t("fields.phone")} *
          </Label>
          <Input
            id={`footer-phone-${source}`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+373 60 000 000"
            required
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone ? (
            <p className="text-destructive text-xs">
              {errors.phone === "phoneRequired"
                ? tValidation("phoneRequired")
                : tValidation("phoneInvalid")}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`footer-email-${source}`} className="font-normal">
            {t("fields.email")}
          </Label>
          <Input
            id={`footer-email-${source}`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("fields.emailPlaceholder")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email ? (
            <p className="text-destructive text-xs">
              {tValidation("emailInvalid")}
            </p>
          ) : null}
        </div>

        {/* Honeypot — hidden from humans, irresistible to bots. */}
        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor={`footer-company-${source}`}>Company</label>
          <input
            id={`footer-company-${source}`}
            name="company"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="mt-1 flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="bg-emerald-500 hover:bg-emerald-500/90 h-12 gap-2 rounded-lg px-8 text-base text-white"
          >
            {pending ? <Loader2 className="animate-spin" /> : <Send />}
            {pending ? t("full.submitting") : t("quick.submit")}
          </Button>
        </div>
      </div>
    </form>
  );
}
