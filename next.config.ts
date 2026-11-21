import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 only allows quality 75 by default; allow higher-quality output.
    qualities: [75, 90],
  },
  // Allow the dev server to be opened from other devices on the LAN.
  allowedDevOrigins: ["192.168.1.7", "archlinux"],
  experimental: {
    agentFeedback: true,
    globalNotFound: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
