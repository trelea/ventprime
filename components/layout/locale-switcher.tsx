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

/** BCP-47 locale → country flag shown to the user. */
const FLAGS: Record<Locale, string> = {
  ro: "md",
  ru: "ru",
  en: "gb",
};

function Flag({ locale, className }: { locale: Locale; className?: string }) {
  return (
    // Plain <img>: these are tiny hand-authored SVGs, and routing them through
    // the image optimizer would need `dangerouslyAllowSVG` for no benefit.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/flags/${FLAGS[locale]}.svg`}
      alt=""
      width={24}
      height={12}
      className={cn("h-3 w-6 rounded-[2px] object-cover shadow-xs", className)}
    />
  );
}

/**
 * Flag-only language switcher.
 *
 * Visually there are no words at all — just the flag and a chevron. The
 * accessible name comes from `aria-label` on the trigger and on each item, so
 * screen readers still announce the native language names.
 *
 * Switching uses next-intl's `useRouter().replace(pathname, { locale })`,
 * which rewrites the first segment *and* re-maps the slug to that locale
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
          showIcon={false}
          className="h-9 w-auto gap-0 rounded-full border-transparent bg-transparent pr-2 pl-2 shadow-none hover:bg-surface"
        >
          <Flag locale={locale} />
        </SelectTrigger>

        <SelectContent align="center" className="min-w-16">
          {routing.locales.map((candidate) => (
            <SelectItem
              key={candidate}
              value={candidate}
              aria-label={t(`label.${candidate}`)}
              showIndicator={false}
              className="justify-center py-2 pl-1.5"
            >
              <Flag locale={candidate} />
              <span className="sr-only">{t(`label.${candidate}`)}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}