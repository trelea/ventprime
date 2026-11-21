import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import type { LocalizedPath } from "@/i18n/routing";
import { blogPosts, truncateExcerpt, type Locale } from "@/lib/blogs";

type RelatedArticlesProps = {
  locale: Locale;
  currentPath: LocalizedPath;
};

/** Cross-links the other articles to build topical clusters for crawlers. */
export async function RelatedArticles({
  locale,
  currentPath,
}: RelatedArticlesProps) {
  const t = await getTranslations({ locale, namespace: "Blogs" });
  const posts = blogPosts.filter((post) => post.path !== currentPath).slice(0, 3);

  return (
    <Container bgColor="white" height="auto">
      <section className="pb-16 sm:pb-20 lg:pb-24">
        <h2 className="mb-6 font-gilroy text-[24px] leading-[1.1] font-bold text-black sm:text-[28px] lg:text-[32px]">
          {t("relatedTitle")}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {posts.map((post) => {
            const content = post.translations[locale];
            return (
              <Link
                key={post.path}
                href={post.path}
                className="group flex flex-col gap-3"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[10px]">
                  <Image
                    src={post.image}
                    alt={content.title}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="font-gilroy text-[16px] leading-[1.3] font-semibold text-black sm:text-[18px]">
                  {content.title}
                </h3>
                <p className="font-inter text-[13px] leading-[1.5] text-black/70 sm:text-[14px]">
                  {truncateExcerpt(content.excerpt, 110)}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </Container>
  );
}
