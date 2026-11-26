import { DevalonJsonLd } from "@devalon.dev/credits/next";
import type { LocalizedPath } from "@/i18n/routing";
import type { Locale } from "@/lib/blogs";
import { devalonCredit } from "@/lib/devalon";
import { absoluteLocalizedPath } from "@/lib/seo";

type DevalonCreditProps = {
  locale: Locale;
  /** Internal path of this page; the localized URL is derived from it. */
  path: LocalizedPath;
};

/**
 * Devalon attribution for one URL. Render exactly once per page with that
 * page's own path — a locale-only value would give every page the homepage
 * identity. Keep this a Server Component; it ships no client JavaScript.
 */
export function DevalonCredit({ locale, path }: DevalonCreditProps) {
  return (
    <DevalonJsonLd
      site_url={devalonCredit.site_url}
      site_name={devalonCredit.site_name}
      in_language={locale}
      page_url={absoluteLocalizedPath(path, locale)}
      client_entity_id={devalonCredit.client_entity_id}
      services={devalonCredit.services}
      contributions={devalonCredit.contributions}
    />
  );
}
