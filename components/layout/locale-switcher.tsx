"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { cn } from "cn";

/** BCP-47 locale → short code shown to the user (no flags). */
const CODES: Record<Locale, string> = {
  ro: "RO",
  ru: "RU",
  en: "EN",
};

/**
 * Text-only language switcher.
 *
 * Visually the trigger carries only the current locale's two-letter code and a
 * chevron. The accessible name comes from `aria-label` on the trigger and on
 * each item, so screen readers still announce the native language names ("Română",
 * "Русский", "English") rather than the bare code.
 *
 * Switching uses next-intl's `useRouter().replace(pathname, { locale })`, which
 * rewrites the first segment *and* re-maps the slug to that locale
 * (`/ro/ventilatie-pasiva` → `/ru/passivnaya-ventilyaciya`).
 *
 * `className` controls the wrapper's display so callers can pass
 * `hidden lg:flex` without colliding with a hardcoded `flex`.
 *
 * `variant` picks the trigger's shape: the default `pill` is the compact
 * two-letter control that sits beside the desktop CTA, while `nav` renders a
 * full-width row (native language name + chevron) so the mobile sheet can carry
 * it as one of the menu items instead of a detached footer control.
 */
export function LocaleSwitcher({
  className,
  variant = "pill",
}: {
  className?: string;
  variant?: "pill" | "nav";
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Locale");
  const pathname = usePathname();
  const router = useRouter();
  const nav = variant === "nav";

  return (
    <div className={cn("items-center gap-1", className)}>
      <Select
        value={locale}
        onValueChange={(next) =>
          router.replace(pathname, { locale: next as Locale })
        }
      >
        <SelectTrigger
          aria-label={t("switcher")}
          className={cn(
            "border-transparent bg-transparent shadow-none hover:bg-surface",
            nav
              ? // `font-sans` matches the surrounding menu rows: the sheet is
                // portaled to <body>, so it sits outside the `header` rule that
                // gives the nav chrome the UI face, and the rows inherit the
                // body font instead. The primitive's `font-ui` would stand out.
                // `data-[size=default]:h-auto` neutralises the primitive's h-8;
                // tailwind-merge can't drop it because it lives in a variant.
                "font-sans h-auto w-full justify-between rounded-md px-3 py-2.5 text-base font-medium data-[size=default]:h-auto"
              : "h-9 w-auto min-w-11 gap-0 rounded-full px-3 text-sm font-semibold tracking-wide uppercase",
          )}
        >
          {nav ? t(`label.${locale}`) : CODES[locale]}
        </SelectTrigger>

        <SelectContent align="center" className="min-w-16">
          {routing.locales.map((candidate) => (
            <SelectItem
              key={candidate}
              value={candidate}
              aria-label={t(`label.${candidate}`)}
              showIndicator={false}
              className="justify-center py-2 pl-1.5 text-sm font-semibold tracking-wide uppercase"
            >
              <span aria-hidden>{CODES[candidate]}</span>
              <span className="sr-only">{t(`label.${candidate}`)}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
