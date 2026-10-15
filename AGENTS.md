<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Ignore routine debugging and unverified changes. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Keep a qualifying candidate through the reporting pass even if you resolve or work around it. A successful fix changes the report outcome; it does not erase the friction that qualified it.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `node node_modules/next/dist/bin/next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->

# VENTPRIME — Website Architecture & Structure Plan

**Client:** Maxim (also owner of Red Core / redcoreconcrete.com)
**Domain:** `stopmucegai.md`
**Brand:** VENTPRIME
**General email:** `ventprimemd@gmail.com`
**Languages:** Romanian, Russian, English (i18n already implemented in code — out of scope for this plan)
**Reference design:** redcoreconcrete.com (layout, section rhythm, component patterns)
**Structure:** 1 Home page + 4 service pages = **5 pages**
**Prepared:** 13 Oct 2026 · **Revised:** 14 Oct 2026 (v2 — 4 services, general email updated)

---

## 1. Business summary

VENTPRIME installs **ventilation systems** — passive (non-electric) and forced (electric) — for private homes and commercial premises, treats and disinfects premises against mold and fungus, and performs diamond drilling in concrete, brick and other building materials.

**Core value proposition:** a long-term fix for dampness and mold. The flagship solution is the **passive ventilation system with zero electricity cost and no regular maintenance**; where a building needs more airflow, forced ventilation is offered as the second option.

**Key messages (flagship passive system — must not be applied to forced ventilation):**

| Message            | What it means for the visitor                                  |
| ------------------ | -------------------------------------------------------------- |
| Energy-independent | No electricity, no running costs, works during outages         |
| Maintenance-free   | Install once, no filters, no service visits                    |
| Reliable           | No motors or electronics to break                              |
| Effective          | Removes the _cause_ (stagnant humid air), not just the symptom |
| Simple             | Fast installation, minimal intervention in the building        |

**Supporting messages (all services):** free on-site inspection first · the right system for the building (passive or forced) · clean, professional work · warranty.

**Target audiences:**

1. Homeowners with damp walls, condensation on windows, mold in corners/bathrooms
2. Owners of houses with basements / cellars / attics
3. Commercial premises (warehouses, shops, offices, restaurants, basement units) — also the main audience for forced ventilation
4. Secondary: landlords, property managers, builders/renovators, other contractors (diamond drilling as a standalone service)

**Primary conversion:** free consultation / free on-site inspection request (form + phone + messengers).

---

## 2. Reference site — redcoreconcrete.com

Red Core is a one-page home with anchor navigation plus one dedicated page per service. VENTPRIME follows the same model.

| Red Core element                                                              | VENTPRIME equivalent                    |
| ----------------------------------------------------------------------------- | --------------------------------------- |
| Full-width hero, big headline, subtitle, 2 CTAs, phone visible                | HERO                                    |
| Services grid: icon card + title + one-liner + "View services" → service page | SERVICES — 4 cards → 4 service pages    |
| "Why choose us?" — 4 icon blocks                                              | Folded into ABOUT US                    |
| About Us — two photos + text + Location + Service Area                        | ABOUT US                                |
| Feedbacks — auto-scrolling testimonial marquee                                | FEEDBACK                                |
| Footer — logo, address, email, phone, anchor links, socials                   | Footer + CONTACTS section               |
| Floating "Free consultation" form                                             | Same + floating Viber/WhatsApp/Telegram |
| Next.js, strong SEO/OG meta                                                   | Same stack                              |

**New vs. Red Core:** STATS/METRICS band and TECH section (the passive system is the differentiator and must be explained).
**Fix vs. Red Core:** footer social links are `#` placeholders there — only show icons for real profiles.

---

## 3. Sitemap

```
/ (Home — HERO · SERVICES · STATS · ABOUT US · TECH · FEEDBACK · CONTACTS)
├── /ventilatie-pasiva         1. Passive ventilation installation (no electricity)
├── /ventilatie-fortata        2. Forced ventilation installation (electric)
├── /tratare-mucegai           3. Mold & fungus treatment and disinfection
└── /foraj-diamantat           4. Diamond drilling in concrete, brick and other materials
```

| #   | Client's service (RU)                                                           | Page                |
| --- | ------------------------------------------------------------------------------- | ------------------- |
| 1   | Установка пассивной вентиляции (без электричества)                              | Passive ventilation |
| 2   | Установка принудительной вентиляции (с электрическим подключением)              | Forced ventilation  |
| 3   | Обработка и дезинфекция помещений от плесени и грибка                           | Mold treatment      |
| 4   | Алмазное сверление отверстий в бетоне, кирпиче и других строительных материалах | Diamond drilling    |

**Content moved from the earlier 6-service plan** (nothing is lost, it now lives inside the 4 pages):

| Earlier service                      | Now covered in                                                           |
| ------------------------------------ | ------------------------------------------------------------------------ |
| Humidity cause elimination           | Passive ventilation (diagnostics, causes) + Mold treatment (cause check) |
| Basement, attic & living ventilation | Passive ventilation (basement / attic / living-room blocks)              |
| Natural air circulation              | Passive ventilation + Home TECH section                                  |
| Mold recurrence prevention           | Mold treatment (prevention package, guarantee, follow-up)                |

---

## 4. Global layout

### Header (sticky, white, shadow on scroll)

- Logo VENTPRIME (left) → Home
- Nav (anchors to Home sections; from service pages they go to `/#section`):
  **Servicii ▾ · Despre noi · Tehnologie · Recenzii · Contacte**
  - "Servicii" dropdown lists the 4 service pages
- Phone number (click-to-call)
- CTA button **"Inspecție gratuită"** (green) → `#contacte`
- Active anchor highlighted on scroll (scroll-spy)
- Mobile: hamburger → full-screen menu, phone + CTA pinned at bottom

### Floating elements

- Bottom-right: messenger buttons (Viber, WhatsApp, Telegram), expandable
- "Free consultation" mini-form (as on Red Core): name + phone + submit
- Mobile: sticky bottom bar — **Sună** | **Scrie** | **Inspecție gratuită**

### Footer (dark blue)

- Logo + tagline ("Aer curat. Casă uscată. Fără electricitate.") — _tagline refers to the flagship passive system; see note in §12_
- Contacts: address, phone, **email `ventprimemd@gmail.com`**, working hours
- Links: 4 services + Home anchors
- Social icons (real profiles only)
- Legal name + IDNO
- © VENTPRIME 2026 · "Privacy notice" link (opens modal, see §6)

---

## 5. Home page (`/`)

Seven sections, in this order:

| #   | Section         | Anchor        | Main goal                                           |
| --- | --------------- | ------------- | --------------------------------------------------- |
| 1   | HERO            | `#acasa`      | Instant understanding + first conversion            |
| 2   | SERVICES        | `#servicii`   | Route visitors to the 4 service pages               |
| 3   | STATS / METRICS | `#cifre`      | Proof in numbers                                    |
| 4   | ABOUT US        | `#despre`     | Trust: who we are, why us, how we work              |
| 5   | TECH            | `#tehnologie` | Explain the passive technology (main SEO text)      |
| 6   | FEEDBACK        | `#recenzii`   | Social proof: reviews + real before/after results   |
| 7   | CONTACTS        | `#contacte`   | Conversion: form, all contact details, service area |

Background rhythm: white → sky-50 → blue gradient → white → sky-50 → white → dark-blue/white split.

---

### 5.1 HERO (`#acasa`)

**Goal:** in 5 seconds the visitor knows what VENTPRIME does, the main benefit, and how to call.

**Layout (desktop):** full-width background photo with a blue→transparent gradient overlay on the left; text block left (≈55%), image subject visible right. Height ~90vh, min 600px.
**Layout (mobile):** image on top (cropped), text below, CTAs full width, height auto.

**Content:**

- **Eyebrow label:** "Ventilație · Tratament mucegai · Găurire diamantată"
- **H1:** `Ventilație pasivă fără electricitate și eliminarea mucegaiului în Moldova`
- **Tagline (visual, larger weight than subtitle, not a heading):** _"Fără mucegai. Fără umezeală. Fără electricitate."_
- **Subtitle (1–2 lines):** Passive ventilation that removes the cause of dampness and mold — works 24/7, with no running costs and no maintenance. Forced ventilation, mold treatment and diamond drilling also available.
- **3 USP chips with icons:** ⚡ Ventilație pasivă, fără electricitate · 🔧 Fără mentenanță · 🛡️ Garanție X ani
- **CTAs:**
  - Primary (green): **Inspecție gratuită** → `#contacte`
  - Secondary (outline white): **Cum funcționează** → `#tehnologie`
- **Contact line:** phone (click-to-call) + Viber/WhatsApp/Telegram icons
- **Microcopy under CTA:** "Vă sunăm în X ore · Inspecție gratuită în toată Moldova"
- **Mini trust strip (bottom of hero):** ★ 4.9 Google (N recenzii) · X ani experiență · X obiecte

**Image:** real, bright photo — dry clean interior or installed unit on a house facade. 2400px wide, WebP/AVIF, preloaded (`priority`). Alt: "Ventilație pasivă VENTPRIME instalată pe o casă privată".

**Animation:** text fade-up on load; no autoplay video (LCP).

---

### 5.2 SERVICES (`#servicii`)

**Goal:** show all 4 services at a glance and send visitors to the matching service page.

**Header:**

- **H2:** `Servicii de ventilație, tratare a mucegaiului și găurire diamantată`
- **Intro (50–80 words):** short paragraph with main keywords — we install passive ventilation without electricity and forced ventilation with electrical connection, treat and disinfect premises against mold and fungus, and drill precise holes in concrete and brick, for houses, apartments, basements, attics and commercial premises.

**Grid:** 4 × 1 desktop (or 2 × 2 on narrower desktop) · 2 × 2 tablet · 1 column mobile. Equal card height.

**Card anatomy (Red Core style, refreshed):**

1. Line icon, 56px, blue, inside a soft green-50 circle
2. **H3** — service name
3. Description — 1–2 lines (~20 words)
4. 2–3 short key points with check icons
5. Link **"Află mai multe →"** (descriptive `aria-label` with service name)
6. Whole card clickable → service page

**Card states:** hover — lift 4px, shadow grows, top border turns green, arrow slides right. Focus state visible for keyboard.

**Card content:**

| #   | H3 title                                                                 | Description                                                                            | Key points                                                              | Icon                     | Link                  |
| --- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------ | --------------------- |
| 1   | Instalarea ventilației pasive (fără electricitate)                       | Sistem care funcționează non-stop fără curent și fără întreținere.                     | 0 lei curent · Fără filtre · Montaj rapid                               | Air flow + lightning-off | `/ventilatie-pasiva`  |
| 2   | Instalarea ventilației forțate (cu alimentare electrică)                 | Ventilație mecanică pentru spații cu încărcare mare de umiditate și aer viciat.        | Debit reglabil · Pentru spații comerciale · Montaj complet              | Fan + plug               | `/ventilatie-fortata` |
| 3   | Tratarea și dezinfectarea spațiilor împotriva mucegaiului și ciupercilor | Îndepărtare profesională a mucegaiului, tratament antifungic și dezinfecție.           | Toate tipurile de suprafețe · Produse sigure · Protecție pe termen lung | Wall + spray             | `/tratare-mucegai`    |
| 4   | Găurire diamantată în beton, cărămidă și alte materiale                  | Găuri curate și precise pentru ventilație, conducte și cabluri, fără vibrații și praf. | Beton armat · Fără vibrații · Diametre variate                          | Drill bit + circle       | `/foraj-diamantat`    |

**Bottom CTA strip:** "Nu știți ce soluție vă trebuie? Facem o inspecție gratuită și vă recomandăm ventilația potrivită." → **Inspecție gratuită**

---

### 5.3 STATS / METRICS (`#cifre`)

**Goal:** quick proof in numbers, right after the visitor sees what we offer.

**Layout:** full-width band, blue→green gradient background, white text. 4 counters in a row (desktop), 2 × 2 (mobile). Optional 5th–6th on wide screens.

**Counter anatomy:** big number (count-up animation when scrolled into view) + unit + label + one-line caption.
Final numbers are server-rendered in HTML (correct without JS, readable by Google); animation only visual. Respect `prefers-reduced-motion`.

**Metrics (client provides real values — no invented numbers):**

| Metric              | Example display | Caption                                 |
| ------------------- | --------------- | --------------------------------------- |
| Years of experience | **X+** ani      | pe piața din Moldova                    |
| Objects completed   | **X+** obiecte  | case, apartamente și spații comerciale  |
| Area treated        | **X** m²        | suprafețe tratate de mucegai            |
| Holes drilled       | **X+** găuri    | forate în beton și cărămidă             |
| Humidity reduction  | **până la X%**  | reducerea umidității după montaj        |
| Electricity cost    | **0 lei**       | cost de funcționare al sistemului pasiv |
| Guarantee           | **X ani**       | garanție pentru lucrări                 |

Primary four: years, objects, humidity reduction, 0 lei electricity (passive system). Guarantee, m² and holes drilled as optional.

**Optional line under counters:** "Peste X clienți ne-au recomandat prietenilor" + Google rating badge.

---

### 5.4 ABOUT US (`#despre`)

**Goal:** trust — who the company is, why choose it, how it works with clients.

**Block A — Company intro (Red Core layout: two overlapping photos left, text right; stacked on mobile)**

- Eyebrow: "Despre noi"
- **H2:** `VENTPRIME — specialiști în ventilație, eliminarea mucegaiului și găurire diamantată`
- Text 120–180 words: who we are, since when, what we specialise in, mission (healthy dry homes without extra costs), approach (we remove the cause, not the symptom; we recommend passive or forced ventilation depending on the building).
- **Location:** office/base address
- **Service area:** Chișinău and localities list (confirm with client)
- Photos: team at work — installation, measurement, treatment, drilling. Alt texts descriptive.

**Block B — Why choose VENTPRIME (4 icon blocks, Red Core "Why choose us?" style)**

- **H3 ×4:**
  - ⚡ **Sistem pasiv fără electricitate** — zero costuri lunare, fără curent.
  - 🛠️ **Soluția potrivită clădirii** — ventilație pasivă sau forțată, alegem împreună după inspecție.
  - 🛡️ **Garanție X ani** — răspundem pentru rezultat.
  - 🔍 **Inspecție gratuită** — măsurăm umiditatea și găsim cauza înainte de ofertă.

**Block C — How we work (4 numbered steps, horizontal timeline desktop / vertical mobile)**

1. **Solicitare** — sunați sau completați formularul
2. **Inspecție gratuită** — măsurăm umiditatea, identificăm cauza
3. **Montaj / tratament / găurire** — instalare ventilație, tratarea mucegaiului sau lucrări de găurire
4. **Casă uscată** — verificare ulterioară și garanție

**Block D — Trust row (if available):** certificates, product and equipment brands used, commercial client logos.

---

### 5.5 TECH (`#tehnologie`)

**Goal:** explain why ventilation works without electricity, how it compares to forced ventilation and other alternatives, and when each is the right choice. This is the main SEO text block of the page (400–600 words).

**Header:**

- Eyebrow: "Tehnologia noastră"
- **H2:** `Cum funcționează ventilația pasivă fără electricitate`
- Intro (60–80 words): the passive system uses natural physical forces (temperature and pressure difference, natural draft) to keep air moving 24/7 — _exact principle to be confirmed and described by the client_. One closing line: for spaces that need more airflow, VENTPRIME also installs forced ventilation.

**Block A — Animated diagram**

- SVG cross-section of a house: humid air (blue arrows) exits, fresh air (green arrows) enters, continuous loop.
- 3–4 numbered callouts on the diagram, mirrored by a text list next to it:
  1. **Aerul umed iese** — …
  2. **Aerul proaspăt intră** — …
  3. **Circulație continuă** — 24/7, fără curent
  4. **Umiditatea scade** — condensul și mucegaiul dispar
- Arrows animate on scroll; static fallback for reduced motion.

**Block B — What gets installed**

- 2–4 photos of the units/components with H3 caption + one line each (material, where mounted, lifetime).

**Block C — Comparison table**

|                           | Pasivă (VENTPRIME) | Forțată (VENTPRIME)     | Dezumidificator    | Aerisire prin geam         |
| ------------------------- | ------------------ | ----------------------- | ------------------ | -------------------------- |
| Cost electricitate        | 0 lei              | Lunar                   | Lunar, ridicat     | 0 lei, pierderi de căldură |
| Mentenanță                | Nu                 | Filtre, service         | Golire apă, filtre | —                          |
| Funcționează 24/7         | Da                 | Da                      | Da                 | Nu                         |
| Zgomot                    | Nu                 | Redus, depinde de model | Da                 | —                          |
| Funcționează fără curent  | Da                 | Nu                      | Nu                 | Da                         |
| Debit de aer reglabil     | Limitat (natural)  | Da                      | —                  | —                          |
| Elimină cauza mucegaiului | Da                 | Da (cu debit adecvat)   | Nu                 | Nu                         |

_Table values for the forced column to be confirmed with the client (equipment types, noise, filters)._ Green check highlights the passive column; table scrolls horizontally on mobile with the first column sticky.

**Block D — "Pasivă sau forțată?" mini-guide (2 cards)**

- **Pasivă** — recommended for houses, apartments, basements, attics, cellars; when the goal is zero running costs.
- **Forțată** — recommended for kitchens, bathrooms without windows, restaurants, warehouses, high humidity/odour load or no natural draft.
- Each card links to its service page.

**Block E — Technology FAQ (accordion, 4–5 questions, FAQPage schema)**

1. Cum poate funcționa ventilația fără electricitate?
2. Funcționează și iarna? Nu se răcește casa?
3. Chiar nu necesită întreținere?
4. Când este nevoie de ventilație forțată în loc de cea pasivă?
5. Cât durează montajul?

Answers fully present in HTML (accordion only hides visually).

**Closing CTA:** "Aflați ce sistem se potrivește casei dumneavoastră" → **Inspecție gratuită**

---

### 5.6 FEEDBACK (`#recenzii`)

**Goal:** social proof from real clients and real results.

**Header:**

- **H2:** `Recenziile clienților și rezultate reale`
- **Rating summary:** ★ 4.9 / 5 · N recenzii Google · link "Vezi toate pe Google" (→ Google Business Profile)

**Block A — Testimonials marquee (Red Core style)**

- Two rows scrolling in opposite directions (desktop), one row (mobile); pause on hover/touch; respects reduced motion.
- **Card:** stars · quote (2–4 lines) · name + locality · service tag (e.g. "Tratare mucegai") · date. Optional client photo.
- Minimum 8–12 real reviews; only real ones (also required for Review schema).

**Block B — Before / After results**

- 3–4 drag sliders side by side (carousel on mobile).
- Each: before/after photo pair, H3 title ("Subsol, Ialoveni"), short line problem → solution → result, optional humidity numbers (ex. 85% → 55%), link to the related service page.
- Alt texts: "Mucegai pe perete înainte de tratament, Chișinău" / "Același perete după tratament și ventilație".

**CTA:** "Vreți același rezultat?" → **Inspecție gratuită**

---

### 5.7 CONTACTS (`#contacte`)

**Goal:** conversion — every way to reach the company in one place.

**Header:**

- **H2:** `Contacte și zona de deservire`
- Line: "Lăsați datele — vă sunăm în X ore și programăm o inspecție gratuită."

**Layout:** two columns (desktop) — left: details on dark-blue card; right: form on white card. Stacked on mobile (form first).

**Left — details:**

- 📞 Phone(s), click-to-call
- 💬 Viber / WhatsApp / Telegram buttons
- ✉️ **ventprimemd@gmail.com** (`mailto:` link)
- 📍 Address
- 🕐 Working hours
- 🗺️ Service area — localities as plain text (local SEO)
- Social icons (real profiles only)

**Right — full form** (fields in §6)

**Below:** Google Map embed of the business location (lazy-loaded, with static image placeholder to protect performance).

---

### 5.8 Key business details on Home — placement

| Detail                                               | Where it appears                                  |
| ---------------------------------------------------- | ------------------------------------------------- |
| Phone (click-to-call)                                | Header, HERO, CONTACTS, footer, mobile sticky bar |
| Viber / WhatsApp / Telegram                          | HERO, floating buttons, CONTACTS                  |
| Email (`ventprimemd@gmail.com`)                      | CONTACTS, footer, schema, form notifications      |
| Address                                              | ABOUT US (location), CONTACTS, footer, map        |
| Service area (localities)                            | ABOUT US, CONTACTS                                |
| Working hours                                        | CONTACTS, footer                                  |
| USP: no electricity, no maintenance (passive system) | HERO chips, ABOUT US "Why choose", TECH           |
| Guarantee                                            | HERO chips, STATS, ABOUT US                       |
| Years / objects / m² / holes / humidity reduction    | HERO trust strip, STATS                           |
| Free inspection + response time                      | HERO microcopy, SERVICES CTA, CONTACTS            |
| Google rating + review count                         | HERO trust strip, FEEDBACK                        |
| Certificates / brands / client logos                 | ABOUT US trust row                                |
| Legal name + IDNO                                    | Footer                                            |

**NAP rule:** name, address and phone written identically in header, CONTACTS, footer, schema markup and Google Business Profile. The same email is used everywhere.

---

### 5.9 Home SEO specification

**Keyword role of Home** — broad queries with location; service pages take the specific ones (no cannibalization):

| Home (broad)                         | Service pages (specific)                                       |
| ------------------------------------ | -------------------------------------------------------------- |
| eliminare mucegai Chișinău / Moldova | tratament antifungic, dezinfecție mucegai → Mold treatment     |
| umiditate în casă soluții            | ventilație pasivă subsol, beci, mansardă → Passive ventilation |
| ventilație fără electricitate        | montaj ventilație pasivă → Passive ventilation                 |
| ventilație casă / spații comerciale  | montaj ventilație forțată → Forced ventilation                 |
| —                                    | găurire diamantată beton Chișinău → Diamond drilling           |

Equivalent RU/EN keywords go into the existing translation files.

**Title & meta (RO example, adapt per language):**

- Title (≤60 chars): `Ventilație pasivă și eliminare mucegai | VENTPRIME`
- Meta description (≤155 chars): `Scăpați de mucegai și umezeală definitiv. Ventilație pasivă fără electricitate, ventilație forțată, găurire diamantată. Inspecție gratuită în Moldova.`
- Canonical to itself; OG title/description/image (1200×630)

_Check final character counts after translation; trim the meta description if it exceeds 155._

**Heading hierarchy:**

| Section  | Heading                                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------------------- |
| HERO     | **H1** Ventilație pasivă fără electricitate și eliminarea mucegaiului în Moldova                                          |
| SERVICES | H2 Servicii de ventilație, tratare a mucegaiului și găurire diamantată → H3 ×4 service names                              |
| STATS    | No heading needed (or visually hidden H2 "VENTPRIME în cifre")                                                            |
| ABOUT US | H2 VENTPRIME — specialiști în ventilație, eliminarea mucegaiului și găurire diamantată → H3 why-choose blocks, steps      |
| TECH     | H2 Cum funcționează ventilația pasivă fără electricitate → H3 diagram steps, components, pasivă vs forțată, FAQ questions |
| FEEDBACK | H2 Recenziile clienților și rezultate reale → H3 before/after titles                                                      |
| CONTACTS | H2 Contacte și zona de deservire                                                                                          |

One H1 only. Tagline in HERO is styled text, not a heading.

**Content volume:** 1,200–1,800 words unique text in total — TECH ~500, ABOUT ~300, SERVICES ~250, FEEDBACK/CONTACTS the rest. Not copied from service pages. All text server-rendered (accordion, marquee, carousel content present in HTML).

**Internal linking:**

- 4 service cards link with descriptive anchors (service names)
- Before/after items link to related service pages
- TECH links to Passive ventilation and Forced ventilation pages
- Every service page links back to Home `#tehnologie`, `#recenzii`, `#contacte`

**Images:** descriptive file names (`mucegai-perete-dormitor-inainte-tratament.webp`), descriptive alt text with locality where natural, WebP/AVIF, explicit width/height, hero preloaded, everything below the fold lazy-loaded.

**Structured data on Home (JSON-LD):**

- `HomeAndConstructionBusiness`: name, legalName, url, logo, image, telephone, email, address, geo, openingHoursSpecification, areaServed, priceRange, sameAs, `hasOfferCatalog` with the 4 services and their URLs
- `aggregateRating` + `review` — only with real reviews shown in FEEDBACK
- `FAQPage` — TECH section FAQ
- `WebSite` + `Organization`

```json
{
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "VENTPRIME",
  "url": "https://stopmucegai.md",
  "logo": "https://stopmucegai.md/logo.svg",
  "telephone": "+373XXXXXXXX",
  "email": "ventprimemd@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "…",
    "addressLocality": "Chișinău",
    "addressCountry": "MD"
  },
  "areaServed": ["Chișinău", "Bălți", "Orhei"],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "08:00",
      "closes": "19:00"
    }
  ],
  "priceRange": "$$",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicii",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Instalarea ventilației pasive (fără electricitate)",
          "url": "https://stopmucegai.md/ventilatie-pasiva"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Instalarea ventilației forțate",
          "url": "https://stopmucegai.md/ventilatie-fortata"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Tratarea și dezinfectarea spațiilor împotriva mucegaiului",
          "url": "https://stopmucegai.md/tratare-mucegai"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Găurire diamantată în beton și cărămidă",
          "url": "https://stopmucegai.md/foraj-diamantat"
        }
      }
    ]
  },
  "sameAs": []
}
```

_(Placeholders — fill phone, address, hours, areaServed and sameAs with real data.)_

**Local SEO:** localities named in plain text (ABOUT US, CONTACTS), map embed, Google Business Profile linked, reviews collected there and mirrored in FEEDBACK.

**Performance (Core Web Vitals, mobile):** LCP < 2.5 s, CLS < 0.1, INP < 200 ms. Counters, marquee, diagram animation and before/after sliders must not block the main thread or shift layout.

---

## 6. Forms, lead handling & privacy

**Quick form** (floating): Name, Phone, [Submit]

**Full form** (Home CONTACTS + bottom of every service page):

- Name \*
- Phone \*
- Email
- Locality
- Type of premise: House / Apartment / Basement / Attic / Commercial
- Service / problem: Passive ventilation / Forced ventilation / Mold treatment / Diamond drilling / Humidity or condensation / Musty smell / Other (pre-selected on service pages)
- Area (m²), optional
- Photo upload, optional, max 3 (useful for remote pre-assessment)
- Message
- Consent checkbox

**Privacy:** no separate page. The form collects names and phone numbers, so Moldovan personal data law (Law 133/2011) still requires a short privacy notice — handled as a **modal** opened from the consent checkbox and the footer link.

**Delivery:** email to **ventprimemd@gmail.com** + **Telegram bot notification** (fast callback matters in this business). Submissions also stored in a small DB table as backup.
**Anti-spam:** honeypot + rate limit (Cloudflare Turnstile if spam appears).
**After submit:** thank-you state + "we'll call you within X hours". Source page/service attached to each lead.

---

## 7. Service page template (×4)

Same template for all four, like Red Core's service pages.

| #   | Section                               | Content                                                                    |
| --- | ------------------------------------- | -------------------------------------------------------------------------- |
| 1   | **Hero**                              | H1 service title, one-line benefit, photo, CTA "Inspecție gratuită", phone |
| 2   | **The problem / when needed**         | Symptoms, causes or use cases with icons                                   |
| 3   | **Our solution**                      | What we do, step by step                                                   |
| 4   | **What's included**                   | Checklist                                                                  |
| 5   | **Benefits**                          | 3–4 points tied to the core messages                                       |
| 6   | **Before / After or completed works** | 2–3 projects for this service                                              |
| 7   | **Price**                             | "from X lei" or "price after free inspection" (client decides)             |
| 8   | **FAQ**                               | 3–4 service-specific questions (FAQPage schema)                            |
| 9   | **Other services**                    | Cards linking to the other 3 (same card component as Home SERVICES)        |
| 10  | **CTA + full form**                   | Service field pre-selected                                                 |

### Specific content per service page

**1. Passive ventilation installation (no electricity)** (`/ventilatie-pasiva`)

- How the system works (short version + link to Home `#tehnologie`)
- Symptoms and causes it solves: condensation, damp walls, musty smell, poor ventilation, thermal bridges; hygrometer diagnostics at inspection
- Three sub-blocks: basement / attic / living rooms — typical problems and solution in each; storage and wood/roof protection
- Suitable premises: houses, apartments, commercial
- Installation process and duration
- Running-cost comparison with electric ventilation over 5–10 years
- "When passive is not enough" → link to Forced ventilation

**2. Forced ventilation installation (electric)** (`/ventilatie-fortata`)

- When forced ventilation is the better choice: kitchens, windowless bathrooms, restaurants, shops, warehouses, large or sealed spaces
- System types offered (extract, supply-and-extract, etc. — _client to confirm_) and what gets installed
- Honest running notes: electricity use, filters/service interval, noise level
- Installation process: design/sizing, ducts, electrical connection, commissioning
- Comparison "Pasivă vs forțată" with link to Passive ventilation page
- Link to Diamond drilling (holes for ducts and vents)

**3. Mold & fungus treatment and disinfection** (`/tratare-mucegai`)

- Treatment process: inspection and cause check, preparation, mold removal, antifungal treatment, disinfection, drying, protective coating
- Surface types: plaster, concrete, wood, drywall, tiles
- Products used and safety (children, pets)
- Why mold returns without ventilation → link to Passive and Forced ventilation
- **Prevention package** (from the earlier recurrence-prevention service): ventilation + protective treatment + recommendations
- Guarantee terms and follow-up checks

**4. Diamond drilling in concrete, brick and other materials** (`/foraj-diamantat`)

- Materials: reinforced concrete, concrete, brick, stone, block (_client to confirm full list_)
- Typical uses: ventilation ducts and vents, hoods, pipes, cables, air conditioning lines
- Why diamond drilling: clean precise edges, no impact vibration, minimal dust and damage to the structure
- Diameters and maximum depth (_client to provide_)
- Process: marking, drilling, cleaning, finishing
- Available together with ventilation installation or as a standalone service (also for builders and other contractors)
- Price: per hole by diameter and depth, or "after inspection" (client decides)
- Link to Passive and Forced ventilation pages

---

## 8. Visual design direction

**Style:** modern, clean, lots of white space, rounded cards, soft shadows — Red Core's layout, but airy and light instead of construction-heavy.

**Palette (proposal):**

| Token         | Color     | Use                              |
| ------------- | --------- | -------------------------------- |
| `--white`     | `#FFFFFF` | Main background                  |
| `--sky-50`    | `#F2F8FC` | Alternating section background   |
| `--blue-600`  | `#1E6FB8` | Primary — headings, links, icons |
| `--blue-900`  | `#0F2E4D` | Footer, dark sections, body text |
| `--green-500` | `#2FB36D` | CTAs, success, "healthy" accents |
| `--green-50`  | `#EAF8F0` | Icon circles, highlight boxes    |
| `--gray-500`  | `#6B7A89` | Secondary text                   |

Accent gradient (hero overlay, STATS band): `#1E6FB8 → #2FB36D`.

**Typography:** one sans-serif with full Latin + Romanian diacritics (ă â î ș ț) + Cyrillic — e.g. _Manrope_, _Inter_ or _Montserrat_.

**Imagery:** bright, dry interiors, clean walls, real installation photos, before/after pairs, drilling work photos. Dark mold photos only inside before/after.

**Icons:** custom line set — air flow, fan, drop with slash, leaf, shield, lightning-off, wrench-off, drill bit, house, basement, attic.

**Motion:** subtle — fade-in on scroll, count-up in STATS, animated air-flow arrows in TECH, testimonial marquee, before/after drag slider, smooth anchor scrolling with header offset. All respect `prefers-reduced-motion`.

---

## 9. Technical architecture

| Area               | Choice                                                                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework          | **Next.js (App Router)** — same as Red Core, reuse components                                                                                |
| Content            | Services, stats, reviews and before/after projects as typed data files. Optional headless CMS later if the client wants to edit them himself |
| Styling            | Tailwind CSS with the tokens above                                                                                                           |
| Images             | `next/image`, WebP/AVIF, responsive sizes, lazy-loaded below the fold                                                                        |
| Forms              | Server action / API route → email to `ventprimemd@gmail.com` (Resend/SMTP) + Telegram Bot API + DB backup                                    |
| Hosting            | Vercel or VPS with Docker; Cloudflare DNS/CDN                                                                                                |
| Analytics          | GA4 + Search Console; click tracking on phone, messengers, service cards and form submits; optional Meta Pixel                               |
| Performance target | Lighthouse ≥ 90 on mobile                                                                                                                    |

**Reusable components:** `ServiceCard` (Home + service pages), `StatCounter`, `BeforeAfterSlider`, `TestimonialMarquee`, `FaqAccordion`, `ContactForm`, `CtaStrip`.

---

## 10. SEO (site-wide)

- Unique `title` / `description` per page
- `sitemap.xml`, `robots.txt`
- Schema.org: `HomeAndConstructionBusiness` on Home (§5.9), `Service` + `FAQPage` + `BreadcrumbList` on each service page
- OG image per page (like Red Core)
- Google Business Profile for VENTPRIME linked to the site
- If stopmucegai.md currently hosts an older site with indexed pages → **301 redirects** to the matching new pages

**Target keywords (examples):**

- RO: eliminare mucegai Chișinău, tratament antifungic, ventilație pasivă, ventilație fără electricitate, ventilație forțată, ventilație subsol, găurire diamantată beton Chișinău
- RU: удаление плесени Кишинёв, обработка от плесени и грибка, пассивная вентиляция, принудительная вентиляция, вентиляция без электричества, алмазное сверление бетона Кишинёв
- EN: mold removal Moldova, passive ventilation system, forced ventilation installation, diamond core drilling Moldova

---

## 11. Content needed from client

- [ ] Logo VENTPRIME (vector) — or brief for designing one
- [ ] Phone(s), address, working hours, messenger numbers, legal name + IDNO _(general email confirmed: `ventprimemd@gmail.com`)_
- [ ] Service area — list of localities
- [ ] Passive technology description: exact working principle, components, photos of the units
- [ ] Forced ventilation: equipment types/brands offered, typical use cases, photos of installations
- [ ] Diamond drilling: materials, diameters, maximum depth, equipment, photos of completed work
- [ ] Real numbers for STATS: years, objects, m², holes drilled, humidity reduction, guarantee
- [ ] Prices or "from" prices (per service; per hole for drilling) — or "price after inspection"
- [ ] Before/after photos, labelled by service and locality
- [ ] Team / work photos for ABOUT US
- [ ] Testimonials (8–12: name, locality, service, text, permission to publish) + Google Business Profile link
- [ ] Mold treatment products info (safety claims)
- [ ] Certificates, brands, client logos (if any)
- [ ] Social media profiles
- [ ] Texts in RU (client's base language) → adapted to RO and EN

---

## 12. Open questions for Maxim

1. Does stopmucegai.md currently host a site that VENTPRIME replaces? (affects redirects)
2. Show prices or not? (for drilling: price per hole by diameter?)
3. Commercial clients — separate mention in ABOUT US / client logos?
4. Does he want to edit reviews/projects himself later (→ CMS)?
5. The tagline "Fără electricitate" and the "0 lei" message now apply only to passive ventilation, since forced ventilation uses electricity. OK to keep the tagline as the flagship message, with wording clarified as "sistem pasiv" where needed?
6. Is diamond drilling also sold as a standalone service to third parties (builders, other contractors)?
7. Should `ventprimemd@gmail.com` stay as the public address, or does the client want a domain email (e.g. info@stopmucegai.md) later for a more professional look?

---

## 13. Delivery phases

| Phase                  | Deliverable                                                                     |
| ---------------------- | ------------------------------------------------------------------------------- |
| 1. Structure & content | Plan approved, content collected, RU texts written                              |
| 2. Design              | Home + 1 service page mockups (desktop & mobile), palette & typography approved |
| 3. Development         | Home + 4 service pages, components, forms, Telegram integration                 |
| 4. SEO & launch        | Meta, schema, sitemap, analytics, redirects, Search Console, go-live            |
| 5. Post-launch         | Speed check, form tests, Google Business Profile, 2 weeks of fixes              |

---

## 14. Page count summary

| Page                                                                   | Count |
| ---------------------------------------------------------------------- | ----- |
| Home (HERO · SERVICES · STATS · ABOUT US · TECH · FEEDBACK · CONTACTS) | 1     |
| Service pages                                                          | 4     |
| **Total pages**                                                        | **5** |
