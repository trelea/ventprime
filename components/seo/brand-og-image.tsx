import { ImageResponse } from "next/og";
import en from "../../messages/en.json";
import ro from "../../messages/ro.json";
import ru from "../../messages/ru.json";
import { fonts, resolveLocale, size } from "@/components/seo/og-image-shared";

const messages = { en, ro, ru };

export { alt, contentType, generateStaticParams } from "@/components/seo/og-image-shared";

/** Site-wide share image, one per locale. */
export function createBrandImage() {
  return async function Image({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;
    const tagline = messages[resolveLocale(locale)].Seo.ogAlt;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#ffffff",
            fontFamily: "Gilroy",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 112,
              fontWeight: 600,
              letterSpacing: -4,
              color: "#111111",
            }}
          >
            Vent<span style={{ display: "flex", color: "#00B5A4" }}>Prime</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 26,
              fontSize: 32,
              color: "#444444",
              textAlign: "center",
              maxWidth: 980,
            }}
          >
            {tagline}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 52,
              width: 120,
              height: 8,
              borderRadius: 4,
              background: "#00B5A4",
            }}
          />
        </div>
      ),
      { ...size, fonts: await fonts },
    );
  };
}
