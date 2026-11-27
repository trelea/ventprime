"use client";

import { useMemo } from "react";
import { useLocale } from "next-intl";
import {
  signal,
  type devalon_signal_event,
  type devalon_user_data,
} from "@devalon.dev/credits/signals";

export type LeadForm = "footer-form" | "contacts-page";
export type ContactMethod = "phone" | "email";

/** Meta custom names used here → GTM Custom Event names (snake_case). */
const GOOGLE_EVENT_ALIASES: Record<string, string> = {
  NavClick: "nav_click",
  HeroCtaClick: "hero_cta_click",
};

function createSignals(locale: string) {
  return {
    /** Conversion — call only after the API confirms a successful submit. */
    lead(form: LeadForm, userData?: devalon_user_data): devalon_signal_event {
      return signal.meta.emit(
        "Lead",
        { content_name: form, content_category: "contact-form", locale },
        userData ? { userData } : undefined,
      );
    },

    /** Google copy of the lead: no PII, no event id, no CAPI forwarding. */
    googleLead(form: LeadForm): void {
      signal.google.emit("generate_lead", { content_name: form, locale });
    },

    /** Meta standard event for click-to-call / email intent. */
    contact(source: string, method: ContactMethod): devalon_signal_event {
      return signal.meta.emit("Contact", {
        content_name: source,
        contact_method: method,
        locale,
      });
    },

    /** Google copy of the contact intent, with catalog custom names. */
    googleContact(source: string, method: ContactMethod): void {
      signal.google.emit(method === "phone" ? "phone_click" : "email_click", {
        content_name: source,
        locale,
      });
    },

    /** Blog article view — content_ids is the Meta key ViewContent expects. */
    viewContent(path: string, title: string): devalon_signal_event {
      return signal.meta.emit("ViewContent", {
        content_ids: [path],
        content_type: "article",
        content_name: title,
        content_category: "blog",
        locale,
      });
    },

    /** Google copy of the article view. */
    googleViewContent(path: string, title: string): void {
      signal.google.emit("article_view", {
        content_ids: [path],
        content_name: title,
        locale,
      });
    },

    /** Engagement events — never attach artificial value/currency. */
    custom(
      name: string,
      params: Record<string, unknown> = {},
    ): devalon_signal_event {
      return signal.meta.emit(name, { ...params, locale });
    },

    /** Google copy of an engagement event; unmapped Meta names are skipped. */
    googleCustom(name: string, params: Record<string, unknown> = {}): void {
      const googleName = GOOGLE_EVENT_ALIASES[name];
      if (!googleName) return;
      signal.google.emit(googleName, { ...params, locale });
    },
  };
}

/** Typed signal helpers bound to the active locale. Client-only. */
export function useSignals() {
  const locale = useLocale();
  return useMemo(() => createSignals(locale), [locale]);
}
