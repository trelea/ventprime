"use client";

import type { ComponentProps } from "react";
import { useSignals } from "@/lib/signals/events";

type ContactLinkProps = ComponentProps<"a"> & {
  /** Identifies the surface that produced the contact attempt. */
  source: string;
};

/** Anchor that reports a Meta `Contact` event when the user clicks it. */
function ContactLink({ source, href, onClick, ...props }: ContactLinkProps) {
  const { contact } = useSignals();
  const method =
    typeof href === "string" && href.startsWith("mailto:") ? "email" : "phone";

  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        contact(source, method);
        onClick?.(event);
      }}
    />
  );
}

export { ContactLink };
