import type { Metadata } from "next";
import Link from "next/link";
import "./[locale]/globals.css";

// Next.js injects noindex on not-found responses automatically.
export const metadata: Metadata = {
  title: "Page not found | VentPrime",
};

/** Global 404: unmatched URLs skip layout, so this renders a full document. */
export default function GlobalNotFound() {
  return (
    <html lang="en">
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
          <h1 style={{ fontSize: 36, margin: "0 0 16px" }}>
            404 — Page not found
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.5, margin: "0 0 24px" }}>
            The page you are looking for does not exist or has moved.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/"
              style={{
                background: "#00B5A4",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 24px",
                borderRadius: 12,
                fontWeight: 600,
              }}
            >
              Back to home
            </Link>
            <Link
              href="/blogs"
              style={{
                background: "#191919",
                color: "#fff",
                textDecoration: "none",
                padding: "12px 24px",
                borderRadius: 12,
                fontWeight: 600,
              }}
            >
              Read the blog
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
