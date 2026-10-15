import type { ServiceKey } from "@/lib/services";

/**
 * FEEDBACK section data (AGENTS.md §5.6).
 *
 * ⚠️  PLACEHOLDERS — these are not real reviews. The names, quotes and stock
 * avatars below are samples so the marquee reads correctly; fabricating
 * customer testimonials is a legal problem in most jurisdictions and would
 * poison the `aggregateRating` / `review` JSON-LD that this data feeds.
 *
 * Replace with real, permissioned reviews before launch. The spec requires
 * 8–12 entries; `Review` schema is only emitted once real data is present
 * (see `lib/seo.ts`).
 */

const avatar = (photo: string, alt: string) => ({
  src: `https://images.unsplash.com/${photo}?w=96&h=96&fit=crop&crop=faces&q=80&fm=webp`,
  alt,
});

export interface Testimonial {
  id: string;
  quoteKey: string;
  /** Author name — real people only. */
  author: string;
  /** Locality, used for local SEO and trust. */
  locality: string;
  service: ServiceKey;
  rating: 1 | 2 | 3 | 4 | 5;
  /** ISO date, rendered in the active locale. */
  date: string;
  /** Stock portrait avatar (sample only — swap for the real client photo). */
  avatar: { src: string; alt: string };
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quoteKey: "quote",
    author: "Andrei M.",
    locality: "Chișinău",
    service: "tratare-mucegai",
    rating: 5,
    date: "2026-08-14",
    avatar: avatar("photo-1562124638-724e13052daf", "Smiling man"),
  },
  {
    id: "t2",
    quoteKey: "quote",
    author: "Elena P.",
    locality: "Ialoveni",
    service: "ventilatie-pasiva",
    rating: 5,
    date: "2026-07-02",
    avatar: avatar("photo-1623605931891-d5b95ee98459", "Smiling woman"),
  },
  {
    id: "t3",
    quoteKey: "quote",
    author: "Ion C.",
    locality: "Bălți",
    service: "ventilatie-pasiva",
    rating: 5,
    date: "2026-06-21",
    avatar: avatar("photo-1625241152315-4a698f74ceb7", "Man in a red shirt"),
  },
  {
    id: "t4",
    quoteKey: "quote",
    author: "Maria R.",
    locality: "Orhei",
    service: "ventilatie-pasiva",
    rating: 5,
    date: "2026-05-30",
    avatar: avatar("photo-1714750977930-e7a7f4611257", "Man in a green shirt"),
  },
  {
    id: "t5",
    quoteKey: "quote",
    author: "Victor S.",
    locality: "Strășeni",
    service: "ventilatie-fortata",
    rating: 5,
    date: "2026-05-11",
    avatar: avatar("photo-1622012070740-4f753ebb9bad", "Man in a crew neck shirt"),
  },
  {
    id: "t6",
    quoteKey: "quote",
    author: "Ana G.",
    locality: "Căușeni",
    service: "tratare-mucegai",
    rating: 5,
    date: "2026-04-19",
    avatar: avatar("photo-1622039683730-65f2bad01ee2", "Smiling man"),
  },
];

/**
 * Before/after projects (AGENTS.md §5.6 Block B).
 *
 * ⚠️  PLACEHOLDERS — localities, titles and readings are invented. Replace
 * with real, documented case studies.
 */
export interface Project {
  id: string;
  titleKey: string;
  summaryKey: string;
  locality: string;
  service: ServiceKey;
  before: string;
  after: string;
  /** Relative humidity readings, when measured. */
  humidityBefore?: number;
  humidityAfter?: number;
}

export const projects: Project[] = [
  {
    id: "p1",
    titleKey: "title",
    summaryKey: "summary",
    locality: "Chișinău",
    service: "tratare-mucegai",
    before: "project-1-before",
    after: "project-1-after",
    humidityBefore: 85,
    humidityAfter: 55,
  },
  {
    id: "p2",
    titleKey: "title",
    summaryKey: "summary",
    locality: "Ialoveni",
    service: "ventilatie-pasiva",
    before: "project-2-before",
    after: "project-2-after",
    humidityBefore: 78,
    humidityAfter: 52,
  },
];
