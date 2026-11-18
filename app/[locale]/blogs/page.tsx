import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { blogIndexPath, blogPosts } from "@/lib/blogs";
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

  return (
    <Container bgColor="white" height="screen">
      <div className="flex min-h-screen-safe flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-semibold tracking-tight lg:text-6xl">
          {t("blog")}
        </h1>
        <ul className="mt-10 flex flex-col items-center gap-3 font-ui text-lg">
          {blogPosts.map((post) => (
            <li key={post.path}>
              <Link href={post.path} className="text-primary hover:underline">
                {post.translations[locale].title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
