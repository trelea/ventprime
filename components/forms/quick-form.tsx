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
 * Floating "free consultation" mini-form (AGENTS.md §6).
 *
 * All copy is server-rendered text passed down by the caller so the component
 * stays reusable from the header, the hero and service pages.
 */
export function QuickForm({
  source,
  compact = false,
}: {
  source: string;
  compact?: boolean;
}) {
  const t = useTranslations("Form");
  const tValidation = useTranslations("Form.validation");
  const tSuccess = useTranslations("Form.success");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [pending, startTransition] = useTransition();

  if (done) {
    return (
      <div
        className="bg-background rounded-2xl border border-border p-5 text-center shadow-lg"
        role="status"
      >
        <p className="text-brand-green font-semibold">{tSuccess("title")}</p>
        <p className="text-muted-foreground mt-1 text-sm">
          {tSuccess("description", { hours: site.responseTimeHours })}
        </p>
      </div>
    );
  }

  return (
    <form
      className="bg-background rounded-2xl border border-border p-5 shadow-lg"
      action={(formData) => {
        startTransition(async () => {
          const result = await submitLead({
            name: String(formData.get("name") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            company: String(formData.get("company") ?? ""),
            source,
          });

          if (result.status === "success") setDone(true);
          else setErrors(result.errors);
        });
      }}
    >
      <p className="text-base font-semibold">{t("quick.title")}</p>
      {!compact ? (
        <p className="text-muted-foreground mt-1 mb-4 text-sm">
          {t("quick.description")}
        </p>
      ) : (
        <div className="mb-4" />
      )}

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`quick-name-${source}`}>{t("fields.name")} *</Label>
          <Input
            id={`quick-name-${source}`}
            name="name"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name ? (
            <p className="text-destructive text-xs">{tValidation("nameRequired")}</p>
          ) : null}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`quick-phone-${source}`}>{t("fields.phone")} *</Label>
          <Input
            id={`quick-phone-${source}`}
            name="phone"
            type="tel"
            autoComplete="tel"
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

        {/* Honeypot — hidden from humans, irresistible to bots. */}
        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor={`quick-company-${source}`}>Company</label>
          <input id={`quick-company-${source}`} name="company" tabIndex={-1} autoComplete="off" />
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="bg-brand-green hover:bg-brand-green/90 w-full text-white"
        >
          {pending ? <Loader2 className="animate-spin" /> : <Send />}
          {pending ? t("full.submitting") : t("quick.submit")}
        </Button>
      </div>
    </form>
  );
}