import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { BlogArticle } from "@/components/ui/blog-article";
import { BlogBreadcrumb } from "@/components/ui/blog-breadcrumb";
import { BlogImagePair } from "@/components/ui/blog-image-pair";
import { BlogTable } from "@/components/ui/blog-table";
import { BlogTextBlock } from "@/components/ui/blog-text-block";
import { RelatedArticles } from "@/components/ui/related-articles";
import { ArticleSeo } from "@/components/seo/article-seo";
import { DevalonCredit } from "@/components/seo/devalon-credit";
import { routing } from "@/i18n/routing";
import { getPostByPath } from "@/lib/blogs";
import { postMetadata } from "@/lib/seo";

const articlePath = "/blogs/why-windows-fog-up-in-winter" as const;

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const post = getPostByPath(articlePath)!;

  return postMetadata(locale, post);
}

export default async function WhyWindowsFogUpInWinter({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const post = getPostByPath(articlePath)!;
  const content = post.translations[locale];
  const blocks = content.additional ?? [];
  const t = await getTranslations({ locale, namespace: "Nav" });
  const tSeo = await getTranslations({ locale, namespace: "Seo" });

  return (
    <>
      <ArticleSeo locale={locale} post={post} blogLabel={t("blog")} />
      <DevalonCredit locale={locale} path={articlePath} />
      <Container bgColor="white" height="auto">
        <div className="pt-[calc(var(--navbar-height,70px)_+_20px)] pb-[20px] sm:pt-[calc(var(--navbar-height,70px)_+_24px)] sm:pb-[24px] md:pt-[calc(var(--navbar-height,70px)_+_28px)] md:pb-[30px] lg:pt-[calc(var(--navbar-height,70px)_+_30px)] max-[390px]:pt-[84px] max-[390px]:pb-4">
          <BlogBreadcrumb title={content.title} />
        </div>
      </Container>

      <div className="flex flex-col gap-[40px] pb-[64px] max-[390px]:gap-6 max-[390px]:pb-8 sm:gap-[56px] sm:pb-[80px] md:gap-[64px] md:pb-[100px] lg:gap-[72px] lg:pb-[140px] xl:gap-[80px] xl:pb-[180px]">
        <BlogArticle
          img={post.image}
          title={content.title}
          description={content.excerpt}
          imagePosition={post.imagePosition}
          alt={`${tSeo("coverAltPrefix")}${content.title}`}
        />

        {content.table && (
          <BlogTable
            title={content.table.title}
            columns={content.table.columns}
            rows={content.table.rows}
            columnWidths={["2/10", "4/10", "4/10"]}
          />
        )}

        {blocks[0] && (
          <BlogTextBlock
            title={blocks[0].title}
            description={blocks[0].description}
            bullets={blocks[0].bullets}
          />
        )}

        <BlogImagePair
          images={[
            "/blogs/why-windows-fog-up-in-winter/indoor-climate.jpg",
            "/blogs/why-windows-fog-up-in-winter/valve-filter.jpg",
          ]}
          alt={[tSeo("indoorClimateAlt"), tSeo("valveFilterAlt")]}
        />
      </div>
      <RelatedArticles locale={locale} currentPath={articlePath} />
    </>
  );
}
