"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Dialog as LightboxDialog } from "@base-ui/react/dialog";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type ImageLightboxProps = {
  /** Server-rendered thumbnail images, one per gallery image. */
  thumbnails: ReactNode[];
  /** Server-rendered full-size images, in the same order as the thumbnails. */
  previews: ReactNode[];
  /** Alt text for each image — used for the trigger's accessible name. */
  alts: string[];
  /** Index of the thumbnail this trigger wraps. */
  index?: number;
  /** Classes for the trigger element — copies the original thumbnail wrapper. */
  className?: string;
};

/**
 * Client-side interaction shell for a full-screen image viewer. All image
 * elements are rendered by Server Components and passed in as slots; this
 * module only handles clicks, the dialog, and gallery navigation.
 */
function ImageLightbox({
  thumbnails,
  previews,
  alts,
  index = 0,
  className,
}: ImageLightboxProps) {
  const t = useTranslations("ImageLightbox");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(index);

  const count = thumbnails.length;
  const hasMultiple = count > 1;

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + count) % count);
  }, [count]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % count);
  }, [count]);

  useEffect(() => {
    if (!open || !hasMultiple) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, hasMultiple, showPrevious, showNext]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) setActiveIndex(index);
    setOpen(nextOpen);
  };

  return (
    <LightboxDialog.Root open={open} onOpenChange={handleOpenChange}>
      <LightboxDialog.Trigger
        type="button"
        aria-label={`${t("open")}: ${alts[index] ?? ""}`}
        className={cn(
          "group relative block w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          className,
        )}
      >
        {thumbnails[index]}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 max-[390px]:size-7"
        >
          <Maximize2 className="size-4" />
        </span>
      </LightboxDialog.Trigger>

      <LightboxDialog.Portal>
        <LightboxDialog.Backdrop className="fixed inset-0 z-50 bg-black/90 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <LightboxDialog.Popup className="fixed inset-0 z-50 h-dvh w-screen overflow-hidden text-white outline-none">
          <LightboxDialog.Title className="sr-only">
            {t("title")}
          </LightboxDialog.Title>

          {/* Clicking the empty area around the image dismisses the viewer. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full cursor-zoom-out"
            onClick={() => setOpen(false)}
          />

          <div className="pointer-events-none relative flex h-full w-full items-center justify-center p-4 sm:p-10 lg:p-14">
            <div className="pointer-events-auto relative h-full w-full">
              {open && previews[activeIndex]}
            </div>
          </div>

          {hasMultiple && (
            <>
              <button
                type="button"
                aria-label={t("previous")}
                onClick={showPrevious}
                className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5 sm:size-12"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                aria-label={t("next")}
                onClick={showNext}
                className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5 sm:size-12"
              >
                <ChevronRight className="size-6" />
              </button>
              <span
                aria-live="polite"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 font-inter text-[13px] tracking-wide text-white sm:bottom-6"
              >
                {activeIndex + 1} / {count}
              </span>
            </>
          )}

          <LightboxDialog.Close
            aria-label={t("close")}
            className="absolute top-3 right-3 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:top-5 sm:right-5 sm:size-12"
          >
            <X className="size-6" />
          </LightboxDialog.Close>
        </LightboxDialog.Popup>
      </LightboxDialog.Portal>
    </LightboxDialog.Root>
  );
}

export { ImageLightbox };
