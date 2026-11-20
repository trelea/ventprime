import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { BlogContainer } from "@/components/ui/blog-container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { blogIndexPath, blogPosts, truncateExcerpt } from "@/lib/blogs";
import { localizedAlternates } from "@/lib/seo";

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

  const t = await getTranslations({ locale, namespace: "Nav" });

  return {
    title: `${t("blog")} | VentPrime`,
    alternates: localizedAlternates(blogIndexPath, locale),
  };
}

export default async function BlogsPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Nav" });
  const tb = await getTranslations({ locale, namespace: "Blogs" });

  return (
    <>
      <Container bgColor="white" height="auto">
        <div className="pt-[calc(var(--navbar-height,70px)_+_20px)] pb-[20px] sm:pt-[calc(var(--navbar-height,70px)_+_24px)] sm:pb-[24px] md:pt-[calc(var(--navbar-height,70px)_+_28px)] md:pb-[30px] lg:pt-[calc(var(--navbar-height,70px)_+_30px)]">
          <Breadcrumb>
            <BreadcrumbList className="font-gilroy text-[13px] leading-[120%] tracking-[0.02em] capitalize text-black sm:text-[14px] md:text-[15px] lg:text-[16px]">
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={<Link href="/" />}
                  className="font-normal"
                >
                  {tb("home")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-black">
                  {t("blog")}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </Container>

      <div className="flex flex-col gap-[64px] pb-[64px] sm:gap-[72px] sm:pb-[72px] md:gap-[88px] md:pb-[88px] lg:gap-[104px] lg:pb-[104px] xl:gap-[120px] xl:pb-[120px] 2xl:gap-[130px] 2xl:pb-[130px]">
        {blogPosts.map((post) => (
          <BlogContainer
            key={post.path}
            img={post.image}
            date={post.date}
            read={post.readMinutes}
            title={post.translations[locale].title}
            description={truncateExcerpt(post.translations[locale].excerpt)}
            href={post.path}
            imagePosition={post.imagePosition}
          />
        ))}
      </div>
    </>
  );
}
