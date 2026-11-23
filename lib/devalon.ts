import { site, siteUrl } from "@/lib/site";

/**
 * Devalon's numeric Meta Pixel ID. Public by design — the loader renders it
 * into HTML; it is not a secret.
 */
export const devalonPixelId = "1683475309995701";

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
