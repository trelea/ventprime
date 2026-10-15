"use client";

import { useRef, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, ImagePlus, Loader2, Send, X } from "lucide-react";
import { submitLead } from "@/lib/actions";
import { serviceKeys, type ServiceKey } from "@/lib/services";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const MAX_PHOTOS = 3;

const PREMISES = ["house", "apartment", "basement", "attic", "commercial"] as const;
const PROBLEMS = [
  "mold",
  "humidity",
  "condensation",
  "smell",
  "newVentilation",
  "other",
] as const;

export function ContactForm({
  source,
  preselectedService,
  preselectedProblem,
}: {
  source: string;
  /** Pre-selects the "Service" field when rendered at the bottom of a service page. */
  preselectedService?: ServiceKey;
  /** Pre-selects the "Problem" field when rendered at the bottom of a service page. */
  preselectedProblem?: string;
}) {
  const t = useTranslations("Form");
  const tOptions = useTranslations("Form.options");
  const tValidation = useTranslations("Form.validation");
  const tSuccess = useTranslations("Form.success");
  const tPrivacy = useTranslations("Privacy");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [pending, startTransition] = useTransition();
  const fileInput = useRef<HTMLInputElement>(null);

  if (done) {
    return (
      <div
        className="bg-brand-green-soft rounded-2xl p-8 text-center"
        role="status"
      >
        <CheckCircle2 className="text-brand-green mx-auto size-10" />
        <p className="mt-3 text-lg font-semibold">{tSuccess("title")}</p>
        <p className="text-muted-foreground mt-1">
          {tSuccess("description", { hours: site.responseTimeHours })}
        </p>
      </div>
    );
  }

  return (
    <form
      className="bg-background flex flex-col gap-5 rounded-2xl border border-border p-6"
      action={(formData) => {
        startTransition(async () => {
          const result = await submitLead({
            name: String(formData.get("name") ?? ""),
            phone: String(formData.get("phone") ?? ""),
            email: String(formData.get("email") ?? ""),
            locality: String(formData.get("locality") ?? ""),
            premise: String(formData.get("premise") ?? ""),
            service: String(formData.get("service") ?? ""),
            problem: String(formData.get("problem") ?? ""),
            area: String(formData.get("area") ?? ""),
            message: String(formData.get("message") ?? ""),
            company: String(formData.get("company") ?? ""),
            source,
          });

          if (result.status === "success") setDone(true);
          else setErrors(result.errors);
        });
      }}
    >
      <div>
        <h3 className="text-xl font-semibold">{t("full.title")}</h3>
        <p className="text-muted-foreground mt-1 text-sm">{t("full.description")}</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="lead-name"
          label={`${t("fields.name")} *`}
          error={errors.name}
          errorText={tValidation("nameRequired")}
        >
          {(props) => <Input name="name" autoComplete="name" required {...props} />}
        </Field>

        <Field
          id="lead-phone"
          label={`${t("fields.phone")} *`}
          error={errors.phone}
          errorText={
            errors.phone === "phoneRequired"
              ? tValidation("phoneRequired")
              : tValidation("phoneInvalid")
          }
        >
          {(props) => (
            <Input name="phone" type="tel" autoComplete="tel" required {...props} />
          )}
        </Field>

        <Field id="lead-email" label={t("fields.email")}>
          {(props) => <Input name="email" type="email" autoComplete="email" {...props} />}
        </Field>

        <Field id="lead-locality" label={t("fields.locality")}>
          {(props) => <Input name="locality" autoComplete="address-level2" {...props} />}
        </Field>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lead-premise">{t("fields.premise")}</Label>
          <Select name="premise">
            <SelectTrigger id="lead-premise">
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {PREMISES.map((option) => (
                <SelectItem key={option} value={option}>
                  {tOptions(`premise.${option}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lead-service">{t("fields.service")}</Label>
          <Select name="service" defaultValue={preselectedService}>
            <SelectTrigger id="lead-service">
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {serviceKeys.map((option) => (
                <SelectItem key={option} value={option}>
                  {tOptions(`service.${option}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="lead-problem">{t("fields.problem")}</Label>
          <Select name="problem" defaultValue={preselectedProblem}>
            <SelectTrigger id="lead-problem">
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {PROBLEMS.map((option) => (
                <SelectItem key={option} value={option}>
                  {tOptions(`problem.${option}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Field id="lead-area" label={t("fields.area")}>
          {(props) => <Input name="area" type="number" min="0" {...props} />}
        </Field>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>{t("fields.photos")}</Label>
        <div className="flex flex-wrap items-center gap-3">
          {photos.map((photo, index) => (
            <div key={photo.name} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(photo)}
                alt=""
                className="size-16 rounded-lg border border-border object-cover"
              />
              <button
                type="button"
                aria-label={t("photos.remove")}
                onClick={() =>
                  setPhotos((current) => current.filter((_, i) => i !== index))
                }
                className="bg-background absolute -top-2 -right-2 rounded-full border border-border p-0.5"
              >
                <X className="size-3" />
              </button>
            </div>
          ))}

          {photos.length < MAX_PHOTOS ? (
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="hover:border-primary flex size-16 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border text-xs transition-colors"
            >
              <ImagePlus className="size-4" />
              {t("photos.add")}
            </button>
          ) : null}

          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={(event) => {
              const files = Array.from(event.target.files ?? []);
              setPhotos((current) =>
                [...current, ...files].slice(0, MAX_PHOTOS),
              );
              event.target.value = "";
            }}
          />
          <span className="text-muted-foreground text-xs">
            {t("photos.hint")}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="lead-message">{t("fields.message")}</Label>
        <Textarea id="lead-message" name="message" rows={4} />
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="lead-company">Company</label>
        <input id="lead-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="lead-consent"
          name="consent"
          required
          aria-invalid={Boolean(errors.consent)}
        />
        <Label htmlFor="lead-consent" className="text-muted-foreground font-normal">
          {t("fields.consent")} (
          <span className="underline underline-offset-2">{tPrivacy("title")}</span>)
        </Label>
      </div>
      {errors.consent ? (
        <p className="text-destructive -mt-3 text-xs">
          {tValidation("consentRequired")}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="bg-brand-green hover:bg-brand-green/90 w-full text-white"
      >
        {pending ? <Loader2 className="animate-spin" /> : <Send />}
        {pending ? t("full.submitting") : t("full.submit")}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  errorText,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  errorText?: string;
  children: (props: { id: string; "aria-invalid": true | undefined }) => React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children({ id, "aria-invalid": error ? true : undefined })}
      {error ? <p className="text-destructive text-xs">{errorText}</p> : null}
    </div>
  );
}