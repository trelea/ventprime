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

function createSignals(locale: string) {
  return {
    /** Conversion — call only after the API confirms a successful submit. */
    lead(form: LeadForm, userData?: devalon_user_data): devalon_signal_event {
      return signal(
        "Lead",
        { content_name: form, content_category: "contact-form", locale },
        userData ? { userData } : undefined,
      );
    },

    /** Meta standard event for click-to-call / email intent. */
    contact(source: string, method: ContactMethod): devalon_signal_event {
      return signal("Contact", {
        content_name: source,
        contact_method: method,
        locale,
      });
    },

    /** Blog article view — content_ids is the Meta key ViewContent expects. */
    viewContent(path: string, title: string): devalon_signal_event {
      return signal("ViewContent", {
        content_ids: [path],
        content_type: "article",
        content_name: title,
        content_category: "blog",
        locale,
      });
    },

    /** Engagement events — never attach artificial value/currency. */
    custom(
      name: string,
      params: Record<string, unknown> = {},
    ): devalon_signal_event {
      return signal(name, { ...params, locale });
    },
  };
}

/** Typed signal helpers bound to the active locale. Client-only. */
export function useSignals() {
  const locale = useLocale();
  return useMemo(() => createSignals(locale), [locale]);
}
