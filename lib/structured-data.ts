import type { LocalizedPath } from "@/i18n/routing";
import type { BlogPost, Locale } from "@/lib/blogs";
import { articleText } from "@/lib/blog-text";
import {
  absoluteLocalizedPath,
  isoDate,
  site,
  siteUrl,
  topicTags,
} from "@/lib/seo";

type JsonLd = Record<string, unknown>;

const businessId = `${siteUrl}/#business`;

const knowsAbout: Record<Locale, string[]> = {
  en: [
    "Natural ventilation",
    "Heat recovery",
    "Humidity control",
    "Mould removal",
    "Ozone treatment",
  ],
  ro: [
    "Ventilație naturală",
    "Recuperare de căldură",
    "Controlul umidității",
    "Înlăturarea mucegaiului",
    "Ozonizare",
  ],
  ru: [
    "Естественная вентиляция",
    "Рекуперация тепла",
    "Контроль влажности",
    "Удаление плесени",
    "Озонирование",
  ],
};

export type ServiceInput = {
  name: string;
  description: string;
};

/** Site-wide identity, shared by every page. */
export function siteJsonLd(
  locale: Locale,
  description: string,
  services: ServiceInput[] = [],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: site.name,
        url: absoluteLocalizedPath("/", locale),
        telephone: site.phone,
        email: site.email,
        image: `${siteUrl}/icon.svg`,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.svg`,
          width: 225,
          height: 44,
        },
        description,
        knowsAbout: knowsAbout[locale],
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.street,
          addressLocality: site.city,
          addressCountry: site.country,
        },
        areaServed: [
          { "@type": "City", name: site.city },
          { "@type": "Country", name: "Moldova" },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: site.phone,
            email: site.email,
            contactType: "customer service",
            areaServed: site.country,
            availableLanguage: ["en", "ro", "ru"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: absoluteLocalizedPath("/", locale),
        name: site.name,
        inLanguage: locale,
        publisher: { "@id": businessId },
      },
      ...services.map((service, index) => ({
        "@type": "Service",
        "@id": `${siteUrl}/${locale}#service-${index + 1}`,
        name: service.name,
        description: service.description,
        serviceType: service.name,
        provider: { "@id": businessId },
        areaServed: {
          "@type": "Country",
          name: "Moldova",
        },
      })),
    ],
  };
}

/** Blog collection + item list, used on the localized blog index. */
export function blogIndexJsonLd(
  locale: Locale,
  posts: BlogPost[],
  blogLabel: string,
): JsonLd {
  const blogUrl = absoluteLocalizedPath("/blogs", locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${siteUrl}/${locale}#blog`,
        name: blogLabel,
        url: blogUrl,
        inLanguage: locale,
        publisher: { "@id": businessId },
        blogPost: posts.map((post) => ({
          "@id": absoluteLocalizedPath(post.path, locale),
        })),
      },
      {
        "@type": "CollectionPage",
        "@id": `${blogUrl}#page`,
        url: blogUrl,
        name: blogLabel,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: post.translations[locale].title,
            url: absoluteLocalizedPath(post.path, locale),
          })),
        },
      },
    ],
  };
}

export type BreadcrumbItem = {
  name: string;
  path: LocalizedPath;
};

/** Breadcrumb trail with fully qualified, localized URLs. */
export function breadcrumbJsonLd(
  locale: Locale,
  items: BreadcrumbItem[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteLocalizedPath(item.path, locale),
    })),
  };
}

/** One BlogPosting node per localized article, including the full text. */
export function articleJsonLd(
  locale: Locale,
  post: BlogPost,
  section?: string,
): JsonLd {
  const content = post.translations[locale];

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: content.title,
    description: content.metaDescription,
    articleBody: articleText(content),
    keywords: topicTags[locale].join(", "),
    timeRequired: `PT${post.readMinutes}M`,
    ...(section ? { articleSection: section } : {}),
    isAccessibleForFree: true,
    image: [`${siteUrl}${post.image}`],
    datePublished: isoDate(post.date),
    dateModified: isoDate(post.date),
    inLanguage: locale,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteLocalizedPath(post.path, locale),
    },
    author: {
      "@type": "Organization",
      name: site.name,
      url: siteUrl,
    },
    publisher: { "@id": businessId },
  };
}

/** FAQ entries come straight from the translated messages. */
export function faqJsonLd(
  locale: Locale,
  items: Array<{ question: string; answer: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
