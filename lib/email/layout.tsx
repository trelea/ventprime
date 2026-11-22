import type { ReactNode } from "react";
import {
  Body,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
} from "react-email";
import type { EmailCopy } from "@/lib/email/copy";

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ventprime.md").replace(/\/+$/, "");
}

type EmailLayoutProps = {
  locale: string;
  preview: string;
  copy: EmailCopy;
  children: ReactNode;
};

export function EmailLayout({ locale, preview, copy, children }: EmailLayoutProps) {
  const siteUrl = getSiteUrl();

  return (
    <Html lang={locale}>
      <Head />
      <Preview>{preview}</Preview>
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
          theme: {
            extend: {
              colors: {
                brand: "#00b5a4",
                navy: "#0f2e4d",
                ink: "#191919",
                muted: "#6b7a89",
                line: "#e8e8e8",
              },
            },
          },
        }}
      >
        <Body className="mx-auto my-0 w-full max-w-[600px] bg-white px-6 py-8 font-sans text-ink">
          <Section className="mb-8" data-skip-in-text="true">
            <Img
              src={`${siteUrl}/email/logo.png`}
              width="180"
              height="35"
              alt="VentPrime"
              className="h-auto w-[180px]"
            />
          </Section>

          {children}

          <Hr className="my-8 border-0 border-t border-line" />

          <Section className="text-[12px] leading-5 text-muted">
            <Row>
              <Column className="w-[24px] align-top" data-skip-in-text="true">
                <Img
                  src={`${siteUrl}/email/icon.png`}
                  width="20"
                  height="20"
                  alt=""
                  className="h-5 w-5"
                />
              </Column>
              <Column className="align-top">
                <Heading as="h2" className="m-0 text-[13px] font-semibold leading-5 text-navy">
                  VentPrime
                </Heading>
                <Text className="m-0">{copy.address}</Text>
              </Column>
            </Row>

            <Text className="mb-0 mt-3">
              <Link href="tel:+37379717214" className="text-brand no-underline">
                +373 79 717 214
              </Link>
              {" · "}
              <Link href="mailto:contact@ventprime.md" className="text-brand no-underline">
                contact@ventprime.md
              </Link>
              {" · "}
              <Link href={siteUrl} className="text-brand no-underline">
                {copy.site}
              </Link>
            </Text>
            <Text className="mb-0 mt-1 text-[11px] text-muted">{copy.copyright}</Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
}

/** Reused heading with the brand icon, kept subtle. */
export function EmailHeading({ children }: { children: ReactNode }) {
  return (
    <Section>
      <Heading as="h1" className="m-0 text-[24px] font-bold leading-8 text-navy">
        {children}
      </Heading>
    </Section>
  );
}
