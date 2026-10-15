/**
 * Image manifest.
 *
 * Every photo lives in `public/images/<name>.webp` and is produced by
 * `scripts/fetch-images.mjs`. Widths/heights are pinned so `next/image` can
 * reserve layout space and avoid CLS (AGENTS.md §5.9).
 *
 * Alt text is intentionally NOT stored here — it is a user-visible string and
 * lives in `messages/<locale>.json` under `images.<name>.alt`.
 */

export interface ImageEntry {
  src: string;
  width: number;
  height: number;
  /** Photographer credit — Unsplash requires attribution for some licences. */
  credit?: string;
}

function image(name: string, width: number, height: number): ImageEntry {
  return { src: `/images/${name}.webp`, width, height };
}

export const images = {
  /**
   * Brand logo (see `scripts/build-logo.mjs`). `logo` is the full lockup with
   * both taglines — used in the footer and for print. `logo-nav` is the same
   * artwork cropped to the mark + wordmark, because the taglines are
   * unreadable at navbar height.
   *
   * Dimensions are the real ones; these are served unoptimized so the alpha
   * channel is never flattened by the image optimizer's JPEG fallback.
   */
  logo: image("logo", 640, 300),
  "logo-nav": image("logo-nav", 512, 198),
  "logo-mark": image("logo-mark", 320, 93),

  "hero-home-interior": image("hero-home-interior", 2000, 2500),
  "hero-house-exterior": image("hero-house-exterior", 2000, 1333),

  // ⚠️  PLACEHOLDERS — these are stock photos standing in for the client's own
  // work photos (AGENTS.md §11). `service-foraj-diamantat` in particular has no
  // real diamond-drilling photo yet and is reusing the old basement shot.
  "service-ventilatie-pasiva": image("service-ventilatie-pasiva", 2000, 1333),
  "service-ventilatie-fortata": image("service-ventilatie-fortata", 2000, 2800),
  "service-tratare-mucegai": image("service-tratare-mucegai", 2000, 1125),
  "service-foraj-diamantat": image("service-foraj-diamantat", 2000, 1500),

  "about-installation": image("about-installation", 2000, 3478),
  "about-attic": image("about-attic", 2000, 2667),

  "tech-ductwork": image("tech-ductwork", 2000, 1330),
  "tech-facade": image("tech-facade", 2000, 1330),

  "project-1-before": image("project-1-before", 2000, 2500),
  "project-1-after": image("project-1-after", 2000, 1200),
  "project-2-before": image("project-2-before", 2000, 3000),
  "project-2-after": image("project-2-after", 2000, 1334),

  "og-image": image("og-image", 1200, 630),
} as const satisfies Record<string, ImageEntry>;

export type ImageName = keyof typeof images;

export function getImage(name: ImageName): ImageEntry {
  return images[name];
}