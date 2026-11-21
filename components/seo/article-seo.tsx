import type { BlogPost, Locale } from "@/lib/blogs";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/json-ld";

type ArticleSeoProps = {
  locale: Locale;
  post: BlogPost;
  blogLabel: string;
};

/** Article + breadcrumb structured data for a localized blog post. */
export function ArticleSeo({ locale, post, blogLabel }: ArticleSeoProps) {
  return (
    <>
      <JsonLd value={articleJsonLd(locale, post, blogLabel)} />
      <JsonLd
        value={breadcrumbJsonLd(locale, [
          { name: "VentPrime", path: "/" },
          { name: blogLabel, path: "/blogs" },
          { name: post.translations[locale].title, path: post.path },
        ])}
      />
    </>
  );
}
