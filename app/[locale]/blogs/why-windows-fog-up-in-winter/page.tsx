import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { BlogBreadcrumb } from "@/components/ui/blog-breadcrumb";
import { routing } from "@/i18n/routing";
import { getPostByPath } from "@/lib/blogs";
import { localizedAlternates } from "@/lib/seo";

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

  const content = getPostByPath(articlePath)!.translations[locale];

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: localizedAlternates(articlePath, locale),
  };
}

export default async function WhyWindowsFogUpInWinter({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const content = getPostByPath(articlePath)!.translations[locale];

  return (
    <>
      <Container bgColor="white" height="auto">
        <div className="pt-[calc(var(--navbar-height,70px)_+_20px)] pb-[20px] sm:pt-[calc(var(--navbar-height,70px)_+_24px)] sm:pb-[24px] md:pt-[calc(var(--navbar-height,70px)_+_28px)] md:pb-[30px] lg:pt-[calc(var(--navbar-height,70px)_+_30px)]">
          <BlogBreadcrumb title={content.title} />
        </div>
      </Container>
      <Container bgColor="white" height="auto">
        <div className="pb-[48px] sm:pb-[56px] md:pb-[64px] lg:pb-[72px] 2xl:pb-[80px]">
          <h1 className="font-gilroy text-[28px] leading-[1.1] font-bold tracking-normal text-black sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[44px] 2xl:text-[48px]">
            {content.title}
          </h1>
        </div>
      </Container>
    </>
  );
}
