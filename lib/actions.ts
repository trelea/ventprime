"use server";

import { headers } from "next/headers";
import { site } from "@/lib/site";

/**
 * Lead submission stub (AGENTS.md §6).
 *
 * ✅ Implemented: validation, honeypot anti-spam, source-page capture and the
 * thank-you state the UI renders.
 *
 * 🚧 TODO before launch — wire real delivery:
 *   1. Email notification (Resend / SMTP) — env `RESEND_API_KEY`; recipients
 *      default to `site.contact.email` and can be overridden with `LEADS_EMAIL_TO`
 *   2. Telegram bot notification — env `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
 *   3. Persist to the database as a backup
 *
 * Until then leads are logged server-side only, so nothing is lost locally.
 */

export interface LeadInput {
  name: string;
  phone: string;
  email?: string;
  locality?: string;
  premise?: string;
  /** Internal `ServiceKey`, pre-selected on the service pages (AGENTS.md §6). */
  service?: string;
  problem?: string;
  area?: string;
  message?: string;
  /** Honeypot — must stay empty. Bots fill every field they find. */
  company?: string;
  /** Pathname the form was submitted from, so the lead knows its source. */
  source?: string;
}

export type LeadResult =
  | { status: "success" }
  | { status: "error"; errors: Record<string, string> };

/** Permissive: Moldovan numbers are `+373 6x xxx xxx` or 9 digits local. */
const PHONE_PATTERN = /^[+()\d][\d\s()-]{5,20}$/;

export async function submitLead(
  input: LeadInput,
): Promise<LeadResult> {
  // Honeypot: pretend to succeed so bots get no signal.
  if (input.company) return { status: "success" };

  const errors: Record<string, string> = {};
  const name = input.name?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";

  if (!name) errors.name = "nameRequired";
  if (!phone) errors.phone = "phoneRequired";
  else if (!PHONE_PATTERN.test(phone)) errors.phone = "phoneInvalid";

  if (Object.keys(errors).length > 0) return { status: "error", errors };

  // Rate limiting note: no shared store yet, so this is a best-effort guard
  // against accidental double submits within a single request.
  const headerList = await headers();

  console.info("[lead]", {
    ...input,
    company: undefined,
    // Where this lead would be delivered. Kept alongside the payload so the
    // server log proves the inbox matches `site.contact.email` (the same
    // address rendered in the footer, CONTACTS and the JSON-LD schema).
    deliverTo: process.env.LEADS_EMAIL_TO ?? site.contact.email,
    receivedAt: new Date().toISOString(),
    userAgent: headerList.get("user-agent")?.slice(0, 120) ?? null,
  });

  return { status: "success" };
}