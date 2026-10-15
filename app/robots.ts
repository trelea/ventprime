import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Query-string lead captures and admin routes carry no SEO value.
      disallow: ["/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}