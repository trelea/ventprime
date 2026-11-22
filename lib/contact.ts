import { Resend } from "resend";

type ContactPayload = Record<string, unknown>;

type ContactEndpointConfig = {
  source: string;
  subject: (name: string) => string;
  extraFields: (payload: ContactPayload) => Array<[string, unknown]>;
};

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
    payload = (await request.json()) as ContactPayload;
  } catch {
    return fail("invalid_payload", 400);
  }

  const name = text(payload.name);
  const phone = text(payload.phone, 50);
  if (!name || !phone) {
    return fail("missing_required_fields", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return fail("email_service_not_configured", 500);
  }

  const from = process.env.RESEND_FROM_EMAIL ?? "VentPrime <contact@ventprime.md>";
  const to = process.env.RESEND_TO_EMAIL ?? "contact@ventprime.md";

  const lines = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    ...config.extraFields(payload).map(([label, value]) => `${label}: ${format(value)}`),
    `Locale: ${format(payload.locale)}`,
    `Source: ${config.source}`,
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: config.subject(name),
      text: lines.join("\n"),
    });

    if (error) {
      console.error(`Resend error (${config.source}):`, error.message);
      return fail("send_failed", 502);
    }
    return Response.json({ ok: true });
  } catch (cause) {
    console.error(`Resend request failed (${config.source}):`, cause);
    return fail("send_failed", 502);
  }
}
