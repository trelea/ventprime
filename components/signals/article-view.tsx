"use client";

import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { useSignals } from "@/lib/signals/events";

type ArticleViewProps = {
  path: string;
  title: string;
};

/** Fires one ViewContent per article page load; Strict Mode safe. */
function ArticleView({ path, title }: ArticleViewProps) {
  const { viewContent } = useSignals();
  const locale = useLocale();
  const sentRef = useRef<string | null>(null);

  useEffect(() => {
    const key = `${locale}:${path}`;
    if (sentRef.current === key) return;
    sentRef.current = key;
    viewContent(path, title);
  }, [locale, path, title, viewContent]);

  return null;
}

export { ArticleView };
