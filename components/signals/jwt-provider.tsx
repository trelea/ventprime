"use client";

import { useEffect } from "react";
import { set_signal_jwt_provider } from "@devalon.dev/credits/signals";

/**
 * Registers the backend token mint. The SDK fetches a JWT on the first event,
 * refreshes it near expiry, and retries once if the collector rejects it.
 */
function JwtProvider() {
  useEffect(() => {
    set_signal_jwt_provider(async () => {
      const response = await fetch("/api/signal-tkn", { cache: "no-store" });
      if (!response.ok) throw new Error("jwt_unavailable");
      return response.text();
    });
  }, []);

  return null;
}

export { JwtProvider };
