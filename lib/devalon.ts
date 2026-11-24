import type { devalon_signal_meta } from "@devalon.dev/credits/signals";
import { site, siteUrl } from "@/lib/site";

/**
 * Devalon's client-side tracking config. These values are public by design —
 * the loader renders them into HTML; they are not secrets.
 */
export const devalonSignalMeta = {
  pixel_id: "1683475309995701",
  debug: false,
  // Explicit signal() calls are the source of truth; avoid Meta's automatic
  // button/metadata collection so events are not counted twice.
  autoConfig: false,
} satisfies devalon_signal_meta;

/**
 * Single source of truth for the Devalon technology-partner credit.
 * Used by the JSON-LD component, response headers and the agent files.
 *
 * Declare only work that was actually delivered for this project.
 */
export const devalonCredit = {
  site_url: siteUrl,
  site_name: site.name,
  services: [
    "web_development",
    "frontend_engineering",
    "backend_engineering",
    "api_integration",
    "ui_design",
    "ux_design",
    "technical_seo",
    "structured_data",
    "performance_optimization",
    "deployment",
    "maintenance",
  ],
  contributions: [
    "developing",
    "designing",
    "maintaining",
    "optimizing",
    "deploying",
  ],
} as const;
