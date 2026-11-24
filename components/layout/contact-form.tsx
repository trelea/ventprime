"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { hash_meta_user_data } from "@devalon.dev/credits/signals";
import { useSignals } from "@/lib/signals/events";
import { Button } from "@/components/ui/button";

function FormField({
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
    <div className="flex flex-col gap-[6px] lg:gap-[8px]">
      <label
        htmlFor={id}
        className="flex flex-col gap-[8px] font-inter text-[15px] font-normal leading-[140%] tracking-normal text-white lg:gap-[11px] lg:text-[16px]"
      >
        {label}
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          className="w-full border-0 bg-transparent p-0 font-inter text-[15px] font-normal leading-[140%] tracking-normal text-white placeholder:text-white/60 focus:outline-none lg:text-[16px]"
        />
      </label>
      <span aria-hidden className="block h-px w-full bg-white/80" />
    </div>
  );
}

type SubmitStatus = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const t = useTranslations("Footer.form");
  const locale = useLocale();
  const { lead } = useSignals();
  const [status, setStatus] = useState<SubmitStatus>("idle");

  return (
    <form
      data-slot="contact-form"
      onSubmit={async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        setStatus("sending");

        try {
          const response = await fetch("/api/contact-footer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: data.get("name"),
              phone: data.get("phone"),
              email: data.get("email"),
              locale,
            }),
          });
          if (!response.ok) throw new Error("Request failed");
          const email = String(data.get("email") ?? "");
          const phone = String(data.get("phone") ?? "");
          // Hash before it leaves the browser; never fail the conversion if
          // Web Crypto is unavailable.
          const userData = await hash_meta_user_data({
            ...(email ? { email } : {}),
            ...(phone ? { phone } : {}),
          }).catch(() => undefined);
          lead("footer-form", userData);
          form.reset();
          setStatus("success");
        } catch {
          setStatus("error");
        }
      }}
      className="flex h-auto flex-col self-start rounded-[14px] bg-surface-dark-card p-[28px] lg:h-full lg:rounded-[22px] lg:px-[42px] lg:pb-[33px] lg:pt-[34px]"
    >
      <h2 className="font-inter text-[16px] font-bold leading-[140%] tracking-normal text-white lg:text-[18px]">
        {t("title")}
      </h2>

      <div className="mt-[18px] flex flex-col gap-[20px] lg:mt-[13px] lg:gap-[18px]">
        <FormField
          id="name"
          label={t("nameLabel")}
          placeholder={t("namePlaceholder")}
          required
        />
        <FormField
          id="phone"
          type="tel"
          label={t("phoneLabel")}
          placeholder={t("phonePlaceholder")}
          required
        />
        <FormField
          id="email"
          type="email"
          label={t("emailLabel")}
          placeholder={t("emailPlaceholder")}
          required
        />
      </div>

      <div className="mt-[18px] flex flex-wrap items-center justify-end gap-4 lg:mt-[24px]">
        {status === "success" && (
          <p role="status" className="font-ui text-[13px] text-white/80 lg:text-[14px]">
            {t("success")}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="font-ui text-[13px] text-white lg:text-[14px]">
            {t("error")}
          </p>
        )}
        <Button
          type="submit"
          disabled={status === "sending"}
          className="h-[42px] w-[169.59px] gap-[14px] rounded-[10px] bg-primary px-0 font-ui text-[15px] text-white hover:bg-primary/90 disabled:opacity-60 lg:h-[46px] lg:rounded-[14px] lg:text-[16px]"
        >
          <Image src="/icons/footer/send.svg" alt="" width={16} height={16} />
          {status === "sending" ? t("sending") : t("submit")}
        </Button>
      </div>
    </form>
  );
}

export { ContactForm };
