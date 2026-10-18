"use client";

import { useEffect } from "react";

/**
 * Renders nothing — guarantees a URL hash lands on its section on load/refresh.
 *
 * The browser's own fragment jump fires before the app's layout has settled
 * (web fonts swapping in, the pinned `min-h-screen-safe` sections sizing up), so
 * a refresh of `…/ro#despre` can end up parked on the wrong offset — or at the
 * top. This re-applies the jump once the page has painted, animated so the
 * visitor watches it scroll down to the section.
 *
 * Deliberately only on the initial hard load: in-app navigations are left to
 * the header's links, which own their own smooth scroll (and would otherwise be
 * snapped).
 */
export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const id = decodeURIComponent(hash);
    const jump = () => {
      document
        .getElementById(id)
        ?.scrollIntoView({ block: "start", behavior: "smooth" });
    };

    // Once after the first paint, once more after fonts/images have settled so
    // the animation still finishes on the right offset.
    const frame = requestAnimationFrame(jump);
    const timer = window.setTimeout(jump, 150);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  return null;
}
