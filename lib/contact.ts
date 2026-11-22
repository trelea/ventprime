import { Resend } from "resend";
import {
  renderConfirmationEmail,
  renderContactsNotificationEmail,
  renderFooterNotificationEmail,
  type FieldKey,
  type NotificationField,
} from "@/lib/email/templates";

type ContactPayload = Record<string, unknown>;

type ContactEndpointConfig = {
  source: string;
  kind: "footer" | "contacts";
  extraFields: (payload: ContactPayload) => Array<[FieldKey, unknown]>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, max = 200): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, max);
}

/** Accept a single value or a list (the two forms send different shapes). */
function format(value: unknown): string {
  if (Array.isArray(value)) {
    const cleaned = value.map((item) => text(item, 120)).filter(Boolean);
    return cleaned.length ? cleaned.join(", ") : "—";
  }
  return text(value) || "—";
}

function fail(error: string, status: number) {
  return Response.json({ ok: false, error }, { status });
}

/** Shared handling for both contact endpoints. */
export async function handleContactRequest(
  request: Request,
  config: ContactEndpointConfig,
): Promise<Response> {
  let payload: ContactPayload;
  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return fail("invalid_payload", 400);
    }
    payload = parsed as ContactPayload;
  } catch {
    return fail("invalid_payload", 400);
  }

  const name = text(payload.name, 100);
  const phone = text(payload.phone, 50);
  const email = text(payload.email, 254).toLowerCase();
  const locale = text(payload.locale, 10) || "en";

  if (!name || !phone || !email) {
    return fail("missing_required_fields", 400);
  }
  if (!EMAIL_PATTERN.test(email)) {
    return fail("invalid_email", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return fail("email_service_not_configured", 500);
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "VentPrime <contact@ventprime.md>";
  const to = process.env.RESEND_TO_EMAIL ?? "contact@ventprime.md";

  const fields: NotificationField[] = [
    { key: "name", value: name },
    { key: "phone", value: phone },
    { key: "email", value: email },
    ...config.extraFields(payload).map(([key, value]) => ({ key, value: format(value) })),
    { key: "locale", value: locale },
    { key: "source", value: config.source },
    { key: "submittedAt", value: new Date().toISOString() },
  ];

  const notification = await (config.kind === "footer"
    ? renderFooterNotificationEmail({ name, locale, fields })
    : renderContactsNotificationEmail({ name, locale, fields }));

  const resend = new Resend(apiKey);

  // The internal notification is the critical send: if it fails, the form reports an error.
  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: notification.subject,
      html: notification.html,
      text: notification.text,
    });

    if (error) {
      console.error(`Resend error (${config.source}):`, error.message);
      return fail("send_failed", 502);
    }
  } catch (cause) {
    console.error(`Resend request failed (${config.source}):`, cause);
    return fail("send_failed", 502);
  }

  // The confirmation is best-effort: a bad user address must not undo a received request.
  const confirmation = await renderConfirmationEmail({ name, locale });
  try {
    const { error } = await resend.emails.send({
      from,
      to: [email],
      replyTo: to,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });

    if (error) {
      console.error(`Resend confirmation error (${config.source}):`, error.message);
    }
  } catch (cause) {
    console.error(`Resend confirmation request failed (${config.source}):`, cause);
  }

  return Response.json({ ok: true });
}
