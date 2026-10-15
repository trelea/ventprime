import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { retiredRedirects } from "./lib/retired-routes";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  // Review avatars are hotlinked Unsplash portraits (`lib/testimonials.ts`).
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  // 301s the six-service URLs from the previous revision of the site to the
  // four pages that absorbed them (AGENTS.md §3, §10). See
  // `lib/retired-routes.ts` — that module must stay import-free, because this
  // config file is transpiled outside the app's module graph and cannot
  // resolve `@/` path aliases.
  redirects: () => retiredRedirects,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default createNextIntlPlugin()(nextConfig);
