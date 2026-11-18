import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { routing } from "@/i18n/routing";
import { getPostByPath } from "@/lib/blogs";
import { localizedAlternates } from "@/lib/seo";

const articlePath = "/blogs/ozone-treatment-when-it-helps" as const;

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

export default async function OzoneTreatmentWhenItHelps({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const content = getPostByPath(articlePath)!.translations[locale];

  return (
    <Container bgColor="white" height="screen">
      <div className="flex min-h-screen-safe flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-semibold tracking-tight lg:text-6xl">
          {content.title}
        </h1>
      </div>
    </Container>
  );
}
