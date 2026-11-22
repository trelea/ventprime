"use client";

import { useState, type ReactNode } from "react";
import { cn } from "cn";
import { Info, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const panelClassName = "flex w-full flex-col justify-between";

const fieldGroupClassName = "flex flex-col gap-2 lg:gap-1.5";

const fieldStackClassName = "flex flex-col gap-5 lg:gap-6 max-[390px]:gap-4";

const fieldLabelClassName =
  "font-inter text-[15px] font-normal leading-[140%] tracking-normal text-black lg:text-[16px] max-[390px]:text-[14px]";

const fieldControlClassName =
  "w-full rounded-none border-0 border-b border-neutral-300 bg-transparent p-0 font-inter text-[15px] font-normal leading-[140%] tracking-normal text-black focus:outline-none lg:py-2.5 lg:text-[16px] max-[390px]:text-[14px]";

const inputClassName = cn(
  fieldControlClassName,
  "placeholder:text-[#00000099] focus-visible:border-primary",
);

const selectTriggerClassName = cn(
  fieldControlClassName,
  "h-auto justify-between data-placeholder:text-[#00000099] focus-visible:border-primary focus-visible:ring-0 [&_svg]:text-primary",
);

const accentClassName = "my-2 h-[2px] w-28 bg-primary";

const bodyTextClassName =
  "font-inter text-[14px] leading-[1.4] tracking-normal lg:text-[16px]";

const listGapClassName = "flex flex-col gap-3";

const priceListClassName = "flex flex-col gap-3 lg:gap-4";

function Field({
  id,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className={fieldGroupClassName}>
      <label htmlFor={id} className={fieldLabelClassName}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputClassName}
      />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onValueChange,
  placeholder,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string | null) => void;
  placeholder?: string;
  options: string[];
}) {
  return (
    <div className={fieldGroupClassName}>
      <span className={fieldLabelClassName}>{label}</span>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} aria-label={label} className={selectTriggerClassName}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="font-inter">
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function PriceRow({
  label,
  price,
  unit,
}: {
  label: string;
  price: string;
  unit: string;
}) {
  return (
    <div
      className={cn(
        bodyTextClassName,
        "flex items-start justify-between gap-4",
      )}
    >
      <span className="min-w-0">{label}</span>
      <span className="flex shrink-0 items-baseline gap-1 whitespace-nowrap">
        <strong className="font-bold">{price}</strong>
        <span className="text-white/70">{unit}</span>
      </span>
    </div>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div className={cn(bodyTextClassName, "flex items-start gap-3")}>
      <Info aria-hidden className="mt-0.5 size-5 shrink-0" />
      <p>{children}</p>
    </div>
  );
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

function ContactsForm() {
  const t = useTranslations("Contacts");
  const locale = useLocale();

  const [city, setCity] = useState("Chisinau");
  const [problem, setProblem] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const cities = t.raw("form.cityOptions") as string[];
  const problems = t.raw("form.problemOptions") as string[];
  const services = t.raw("form.serviceOptions") as string[];

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setStatus("sending");

        try {
          const response = await fetch("/api/contact-page", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.get("contacts-name"),
              phone: data.get("contacts-phone"),
              city,
              problem: problem ? [problem] : [],
              service: service ? [service] : [],
              locale,
            }),
          });
          if (!response.ok) throw new Error("Request failed");
          form.reset();
          setCity("Chisinau");
          setProblem("");
          setService("");
          setStatus("success");
        } catch {
          setStatus("error");
        }
      }}
      className="flex w-full flex-col items-stretch overflow-hidden rounded-[22px] lg:flex-row"
    >
      <div
        className={cn(
          panelClassName,
          "gap-8 rounded-t-[22px] bg-card p-[28px] lg:w-[50.8%] lg:p-[50px] lg:rounded-l-[22px] lg:rounded-tr-none max-[390px]:gap-6 max-[390px]:p-5",
        )}
      >
        <div className={fieldStackClassName}>
          <Field
            id="contacts-name"
            label={t("form.nameLabel")}
            placeholder={t("form.namePlaceholder")}
            required
          />
          <Field
            id="contacts-phone"
            type="tel"
            label={t("form.phoneLabel")}
            placeholder={t("form.phonePlaceholder")}
            required
          />
          <SelectField
            id="contacts-city"
            label={t("form.cityLabel")}
            value={city}
            onValueChange={(value) => setCity(value ?? "")}
            options={cities}
          />
          <div aria-hidden className={accentClassName} />
          <SelectField
            id="contacts-problem"
            label={t("form.problemLabel")}
            value={problem}
            onValueChange={(value) => setProblem(value ?? "")}
            placeholder={t("form.problemPlaceholder")}
            options={problems}
          />
          <SelectField
            id="contacts-service"
            label={t("form.serviceLabel")}
            value={service}
            onValueChange={(value) => setService(value ?? "")}
            placeholder={t("form.servicePlaceholder")}
            options={services}
          />
        </div>
      </div>

      <div
        className={cn(
          panelClassName,
          "gap-5 rounded-b-[22px] bg-primary p-[28px] text-primary-foreground lg:w-[49.2%] lg:gap-8 lg:p-[50px] lg:rounded-r-[22px] lg:rounded-bl-none max-[390px]:gap-4 max-[390px]:p-5",
        )}
      >
        <div className="flex flex-col gap-4 lg:gap-5">
          <h3 className="font-gilroy text-[20px] font-bold leading-[1.2] tracking-normal lg:text-[24px] max-[390px]:text-[18px]">
            {t("pricing.title")}
          </h3>
          <div className={priceListClassName}>
            <PriceRow
              label={t("pricing.valve")}
              price={t("pricing.valvePrice")}
              unit={t("pricing.valveUnit")}
            />
            <PriceRow
              label={t("pricing.treatment")}
              price={t("pricing.treatmentPrice")}
              unit={t("pricing.treatmentUnit")}
            />
          </div>

          <div className="w-full border-t border-white/30" />

          <div className={listGapClassName}>
            <Note>{t("notes.calculation")}</Note>
            <Note>
              <strong className="font-bold">{t("notes.discount")}</strong>{" "}
              {t("notes.discountText")}
            </Note>
          </div>
        </div>

        <div className="mt-auto flex flex-col items-end gap-4 lg:gap-3">
          {status === "success" && (
            <p
              role="status"
              className="font-inter text-[13px] text-white/80 lg:text-[14px]"
            >
              {t("form.success")}
            </p>
          )}
          {status === "error" && (
            <p
              role="alert"
              className="font-inter text-[13px] text-white lg:text-[14px]"
            >
              {t("form.error")}
            </p>
          )}
          <Button
            type="submit"
            disabled={status === "sending"}
            className="h-[42px] min-w-[170px] gap-[14px] rounded-[10px] bg-white px-0 font-ui text-[15px] font-semibold text-primary hover:bg-neutral-50 disabled:opacity-60 max-[390px]:h-10 max-[390px]:min-w-0 max-[390px]:gap-2 max-[390px]:text-[14px] lg:h-auto lg:min-w-0 lg:gap-2 lg:rounded-xl lg:px-7 lg:py-3.5 lg:font-inter lg:text-[16px]"
          >
            <Send aria-hidden className="size-4 text-primary" />
            {status === "sending" ? t("form.sending") : t("form.submit")}
          </Button>
        </div>
      </div>
    </form>
  );
}

export { ContactsForm };
