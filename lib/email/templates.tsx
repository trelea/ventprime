import { Column, Link, Row, Section, Text, render, toPlainText } from "react-email";
import {
  getEmailCopy,
  interpolate,
  normalizeEmailLocale,
  type EmailCopy,
} from "@/lib/email/copy";
import { EmailHeading, EmailLayout } from "@/lib/email/layout";

export type FieldKey =
  | "name"
  | "phone"
  | "email"
  | "city"
  | "problems"
  | "services"
  | "locale"
  | "source"
  | "submittedAt";

export type NotificationField = { key: FieldKey; value: string };

export type ConfirmationInput = {
  name: string;
  locale: string;
};

export type NotificationInput = {
  name: string;
  locale: string;
  fields: NotificationField[];
};

export type RenderedEmail = { subject: string; html: string; text: string };

export type FormKind = "footer" | "contacts";

function labelFor(key: FieldKey, copy: EmailCopy): string {
  const labels: Record<FieldKey, string> = {
    name: copy.name,
    phone: copy.phone,
    email: copy.email,
    city: copy.city,
    problems: copy.problems,
    services: copy.services,
    locale: copy.locale,
    source: copy.source,
    submittedAt: copy.submittedAt,
  };
  return labels[key];
}

async function toEmail(subject: string, element: React.ReactElement): Promise<RenderedEmail> {
  const html = await render(element);
  return { subject, html, text: toPlainText(html) };
}

/** 1) Minimal confirmation sent back to the person who submitted a form. */
export async function renderConfirmationEmail(input: ConfirmationInput): Promise<RenderedEmail> {
  const locale = normalizeEmailLocale(input.locale);
  const copy = getEmailCopy(locale);
  const subject = interpolate(copy.confirmationSubject, { name: input.name });
  const intro = interpolate(copy.confirmationIntro, { name: input.name });

  return toEmail(
    subject,
    <EmailLayout locale={locale} preview={intro} copy={copy}>
      <EmailHeading>{copy.confirmationHeading}</EmailHeading>
      <Text className="mb-0 mt-4 text-[15px] leading-6 text-ink">{intro}</Text>
      <Text className="mb-0 mt-3 text-[15px] leading-6 text-ink">{copy.confirmationBody}</Text>
      <Text className="mb-0 mt-6 text-[13px] leading-6 text-muted">
        {copy.needHelp}{" "}
        <Link href="tel:+37379717214" className="text-brand no-underline">
          +373 79 717 214
        </Link>
        {" · "}
        <Link href="mailto:contact@ventprime.md" className="text-brand no-underline">
          contact@ventprime.md
        </Link>
      </Text>
    </EmailLayout>,
  );
}

async function renderNotification(
  kind: FormKind,
  input: NotificationInput,
): Promise<RenderedEmail> {
  const locale = normalizeEmailLocale(input.locale);
  const copy = getEmailCopy(locale);
  const subject = interpolate(
    kind === "footer" ? copy.footerSubject : copy.contactsSubject,
    { name: input.name },
  );
  const heading = kind === "footer" ? copy.footerHeading : copy.contactsHeading;
  const formLabel = kind === "footer" ? copy.footerForm : copy.contactsForm;

  return toEmail(
    subject,
    <EmailLayout locale={locale} preview={copy.notificationIntro} copy={copy}>
      <EmailHeading>{heading}</EmailHeading>
      <Text className="mb-0 mt-4 text-[15px] leading-6 text-ink">{copy.notificationIntro}</Text>

      <Section className="mt-6">
        <Text className="mb-2 mt-0 text-[12px] font-semibold uppercase tracking-wide text-muted">
          {formLabel}
        </Text>
        {input.fields.map((field) => (
          <Row key={field.key}>
            <Column className="w-[130px] border-b border-line py-2 align-top text-[13px] leading-5 text-muted">
              {labelFor(field.key, copy)}
            </Column>
            <Column className="border-b border-line py-2 align-top text-[13px] leading-5 text-ink">
              {field.value || copy.notProvided}
            </Column>
          </Row>
        ))}
      </Section>

      <Text className="mb-0 mt-6 text-[12px] leading-5 text-muted">{copy.replyHint}</Text>
    </EmailLayout>,
  );
}

/** 2) Internal notification for the compact footer form. */
export function renderFooterNotificationEmail(input: NotificationInput): Promise<RenderedEmail> {
  return renderNotification("footer", input);
}

/** 3) Internal notification for the detailed contacts-page form. */
export function renderContactsNotificationEmail(input: NotificationInput): Promise<RenderedEmail> {
  return renderNotification("contacts", input);
}
