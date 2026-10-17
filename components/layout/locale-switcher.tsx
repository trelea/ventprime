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
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Locale");
  const pathname = usePathname();
  const router = useRouter();

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
          className="h-9 w-auto min-w-11 gap-0 rounded-full border-transparent bg-transparent px-3 text-sm font-semibold tracking-wide uppercase shadow-none hover:bg-surface"
        >
          {CODES[locale]}
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
