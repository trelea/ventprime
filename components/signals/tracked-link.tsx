"use client";

import type { ComponentProps } from "react";
import { Link } from "@/i18n/navigation";
import { useSignals } from "@/lib/signals/events";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  /** Custom event name — prefer META_CUSTOM_EVENT_NAMES (e.g. NavClick). */
  eventName: string;
  /** Additional UI-only parameters; locale is added automatically. */
  eventParams?: Record<string, unknown>;
};

/** Internal link that reports a custom engagement event on click. */
function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  const { custom, googleCustom } = useSignals();

  return (
    <Link
      {...props}
      onClick={(event) => {
        custom(eventName, eventParams);
        googleCustom(eventName, eventParams);
        onClick?.(event);
      }}
    />
  );
}

export { TrackedLink };
