import { ImageResponse } from "next/og";
import type { LocalizedPath } from "@/i18n/routing";
import { getPostByPath } from "@/lib/blogs";
import { fonts, resolveLocale, size } from "@/components/seo/og-image-shared";

export { alt, contentType, generateStaticParams } from "@/components/seo/og-image-shared";

/** Article share image with the localized headline, generated at build time. */
export function createArticleImage(articlePath: LocalizedPath) {
  return async function Image({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }) {
    const { locale } = await params;
    const selectedLocale = resolveLocale(locale);
    const post = getPostByPath(articlePath);
    if (!post) {
      throw new Error(`Unknown article path: ${articlePath}`);
    }

    const title = post.translations[selectedLocale].title;
    const fontSize = title.length > 70 ? 46 : title.length > 50 ? 54 : 62;

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#ffffff",
            fontFamily: "Gilroy",
            padding: 72,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 30,
              fontWeight: 600,
              color: "#111111",
            }}
          >
            Vent<span style={{ display: "flex", color: "#00B5A4" }}>Prime</span>
            <span style={{ display: "flex", color: "#9a9a9a", marginLeft: 16 }}>
              / blog
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize,
              lineHeight: 1.15,
              fontWeight: 600,
              color: "#111111",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "#777777",
            }}
          >
            ventprime.md
          </div>
        </div>
      ),
      { ...size, fonts: await fonts },
    );
  };
}
