import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { hasLocale } from "next-intl";
import en from "@/messages/en.json";
import ro from "@/messages/ro.json";
import ru from "@/messages/ru.json";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";
import "./[locale]/globals.css";

const messages = { en, ro, ru };

// The locale is read from request headers, so this route blocks on the server.
export const instant = false;

// Next.js injects noindex on not-found responses automatically.
export const metadata: Metadata = {
  title: "Page not found | VentPrime",
};

/** Global 404: unmatched URLs skip layout, so this renders a full document. */
export default async function GlobalNotFound() {
  // The middleware reports the detected locale on every request; fall back to
  // the configured default (Romanian) if it's missing or unsupported.
  const headerList = await headers();
  const requestedLocale =
    headerList.get("X-NEXT-INTL-LOCALE") ?? routing.defaultLocale;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const t = messages[locale].NotFound;

  return (
    <html lang={locale}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          color: "#111111",
          fontFamily: "Arial, Helvetica, sans-serif",
          padding: 24,
        }}
      >
        <main style={{ maxWidth: 560 }}>
          <h1 style={{ fontSize: 36, margin: "0 0 16px" }}>{t.title}</h1>
          <p style={{ fontSize: 16, lineHeight: 1.5, margin: "0 0 24px" }}>
            {t.description}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href={localizedPath("/", locale)}
              style={{
                background: "#00B5A4",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 24px",
                borderRadius: 12,
                fontWeight: 600,
              }}
            >
              {t.backHome}
            </Link>
            <Link
              href={localizedPath("/blogs", locale)}
              style={{
                background: "#191919",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 24px",
                borderRadius: 12,
                fontWeight: 600,
              }}
            >
              {t.readBlog}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
