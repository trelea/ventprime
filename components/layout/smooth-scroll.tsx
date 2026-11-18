"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

/** Keep Lenis' internal scroll position in sync with client-side navigation. */
function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }
    previousPathname.current = pathname;

    // A fragment link owns its own scroll target; don't fight it.
    if (window.location.hash) {
      return;
    }

    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

/**
 * Smooth, inertial scrolling for the whole document. Wrapped around every page
 * in the locale layout, so home and blog pages all share the same behaviour.
 * Lenis already honours `prefers-reduced-motion` (`respectReducedMotion`).
 */
function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        // Native touch scrolling already feels right on mobile.
        syncTouch: false,
        anchors: true,
        autoRaf: true,
      }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}

export { SmoothScroll };
