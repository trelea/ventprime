"use server";

import { headers } from "next/headers";
import { site } from "@/lib/site";
import type { PreliminaryCalculation } from "@/lib/calculator";

/**
 * Lead submission action (Customer Requirements §11 & §15).
 *
 * Developer Note (§11):
 *   Any email sent to the client MUST be sent FROM the company's email address
 *   (`site.contact.email` / configured domain sender) TO the email address
 *   entered by the client. Never use the client's personal email address as
 *   the `from` address.
 *
 * Post-Submit Behavior (§15):
 *   The company receives:
 *     - Contact details (`name`, `phone`, `email`)
 *     - Exact address and locality (`locality`, `localityRaion`, `address`)
 *     - Selected problem and service (`problem`, `service`)
 *     - Number and types of rooms (`roomsCount`, `moldTreatmentRooms`, `kitchenIntakePoint`, `problemRooms`, `premise`)
 *     - Photos (up to 10) and videos (`photos`, `videos`)
 *     - Client's message (`message`)
 *     - Preliminary calculation displayed to the client (`preliminaryCalculation`, `calculationSummaryText`)
 */

export interface UploadedFileSummary {
  name: string;
  size: number;
  type: string;
}

export interface LeadInput {
  name: string;
  phone: string;
  email?: string;
  locality?: string;
  /** Raion (district) of the selected locality — COMPLETARE §8. */
  localityRaion?: string;
  address?: string;
  premise?: string;
  service?: string;
  problem?: string;
  roomsCount?: string;
  moldTreatmentRooms?: string;
  kitchenIntakePoint?: boolean;
  problemRooms?: string[];
  photos?: UploadedFileSummary[];
  videos?: UploadedFileSummary[];
  message?: string;
  consent?: boolean;
  preliminaryCalculation?: PreliminaryCalculation;
  calculationSummaryText?: string;
  /** When true, enforces full-form required fields (`locality`, `consent`, file limits). */
  requireFullFields?: boolean;
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
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_PHOTOS = 10;
const MAX_PHOTO_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB per photo
const MAX_VIDEO_FILES = 2;
const MAX_VIDEO_SIZE_BYTES = 50 * 1024 * 1024; // 50 MB per video
const ALLOWED_VIDEO_TYPES = new Set([
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  // Honeypot: pretend to succeed so bots get no signal.
  if (input.company) return { status: "success" };

  const errors: Record<string, string> = {};
  const name = input.name?.trim() ?? "";
  const phone = input.phone?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const locality = input.locality?.trim() ?? "";

  if (!name) errors.name = "nameRequired";
  if (!phone) errors.phone = "phoneRequired";
  else if (!PHONE_PATTERN.test(phone)) errors.phone = "phoneInvalid";

  if (email && !EMAIL_PATTERN.test(email)) {
    errors.email = "emailInvalid";
  }

  if (input.requireFullFields) {
    if (!locality) {
      errors.locality = "localityRequired";
    }
    if (!input.consent) {
      errors.consent = "consentRequired";
    }

    if (input.photos && input.photos.length > MAX_PHOTOS) {
      errors.photos = "photosMaxExceeded";
    } else if (
      input.photos?.some(
        (photo) =>
          !photo.type.startsWith("image/") || photo.size > MAX_PHOTO_SIZE_BYTES,
      )
    ) {
      errors.photos = "photosInvalid";
    }

    if (input.videos && input.videos.length > MAX_VIDEO_FILES) {
      errors.videos = "videoMaxExceeded";
    } else if (
      input.videos?.some(
        (video) =>
          !ALLOWED_VIDEO_TYPES.has(video.type) ||
          video.size > MAX_VIDEO_SIZE_BYTES,
      )
    ) {
      errors.videos = "videoInvalid";
    }
  }

  // §15: Do not display the success message if any error occurred on submission or file upload.
  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  const headerList = await headers();
  const companyEmail = process.env.LEADS_EMAIL_TO ?? site.contact.email;
  const senderEmail = process.env.LEADS_EMAIL_FROM ?? site.contact.email;

  // Outgoing email envelopes (§11 Developer Note: client email is ALWAYS sent
  // FROM the company's address TO the client's address, never spoofing the client).
  const emailDispatchPlan = {
    toCompany: {
      from: senderEmail,
      to: companyEmail,
      replyTo: email || undefined,
    },
    toClient: email
      ? {
          from: senderEmail,
          to: email,
        }
      : null,
  };

  console.info("[lead]", {
    contact: {
      name,
      phone,
      email: email || null,
    },
    location: {
      locality: locality || null,
      localityRaion: input.localityRaion?.trim() || null,
      address: input.address?.trim() || null,
    },
    request: {
      premise: input.premise || null,
      problem: input.problem || null,
      service: input.service || null,
      roomsCount: input.roomsCount || null,
      moldTreatmentRooms: input.moldTreatmentRooms || null,
      kitchenIntakePoint: Boolean(input.kitchenIntakePoint),
      problemRooms: input.problemRooms ?? [],
      message: input.message?.trim() || null,
    },
    attachments: {
      photos: input.photos ?? [],
      videos: input.videos ?? [],
    },
    preliminaryCalculation: input.preliminaryCalculation ?? null,
    calculationSummaryText: input.calculationSummaryText ?? null,
    emailDispatchPlan,
    source: input.source ?? null,
    receivedAt: new Date().toISOString(),
    userAgent: headerList.get("user-agent")?.slice(0, 120) ?? null,
  });

  return { status: "success" };
}
