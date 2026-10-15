/**
 * Current year, cached so it is stable across prerenders.
 *
 * With `cacheComponents` enabled, calling `new Date()` during a prerender is
 * rejected as an unstable value, which breaks the build for the footer and
 * sitemap. `"use cache"` computes it once per build and revalidates later.
 */
export async function getCopyrightYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}