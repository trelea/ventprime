import { ImageResponse } from "next/og";
import en from "../../messages/en.json";
import ro from "../../messages/ro.json";
import ru from "../../messages/ru.json";
import { fonts, resolveLocale, size } from "@/components/seo/og-image-shared";

const messages = { en, ro, ru };

export {
  alt,
  contentType,
  generateStaticParams,
} from "@/components/seo/og-image-shared";

/** Share image built on a real VentPrime work photo, one per locale. */
export function createPhotoImage(image: Promise<string>) {
  return async function Image({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;
    const tagline = messages[resolveLocale(locale)].Seo.ogAlt;
    const src = await image;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            position: "relative",
            width: "100%",
            height: "100%",
            background: "#111111",
            fontFamily: "Gilroy",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "60% 50%",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              padding: 72,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 25%, rgba(0,0,0,0.72) 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "26px 34px",
                borderRadius: 16,
                background: "rgba(0,0,0,0.62)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 76,
                  fontWeight: 600,
                  letterSpacing: -2,
                  color: "#ffffff",
                }}
              >
                Vent
                <span style={{ display: "flex", color: "#00B5A4" }}>
                  Prime
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 18,
                  fontSize: 30,
                  color: "#f2f2f2",
                  maxWidth: 940,
                }}
              >
                {tagline}
              </div>
            </div>
          </div>
        </div>
      ),
      { ...size, fonts: await fonts },
    );
  };
}
