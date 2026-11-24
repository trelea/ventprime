# Signals event map

All tracking goes through `signal()` from `@devalon.dev/credits/signals`. There
is no Graph API code in this repository: the package forwards every event to
`signal.devalon.dev/{pixel_id}/signals` with `navigator.sendBeacon`, using the
same `event_id` for the browser Pixel and the server-side (CAPI) copy.

 Loader: `<DevalonSignal meta={devalonSignalMeta} />` in `app/[locale]/layout.tsx`.
 Config: `lib/devalon.ts` — pixel ID, `debug: true`, `autoConfig: false`.
 Helpers: `lib/signals/events.ts` (`useSignals()` adds the active `locale` to
 every payload). `locale` is UI-only context and is not forwarded to Meta.

## Events

| Event | Type | Trigger | Payload (beyond `locale`) |
| --- | --- | --- | --- |
| `Lead` | standard | After a 2xx response from `/api/contact-footer` or `/api/contact-page` | `content_name: "footer-form" \| "contacts-page"`, `content_category: "contact-form"`, `options.userData` with browser-hashed `email`/`phone` |
| `Contact` | standard | Click on any phone (`tel:`) or email (`mailto:`) CTA | `content_name: <surface>`, `contact_method: "phone" \| "email"` |
| `ViewContent` | standard | Once per blog article page load | `content_ids: [post.path]`, `content_type: "article"`, `content_name: <localized title>`, `content_category: "blog"` |
| `HeroCtaClick` | custom | Hero "consultation" button | `button_id: "hero-consultation"`, `section: "hero"` |
| `NavClick` | custom | Header, footer or mobile nav link | `nav_location: "header" \| "footer" \| "mobile"`, `item: <nav key>` |

`Contact` sources: `hero-phone`, `navbar-phone`, `mobile-phone`, `mobile-email`,
`footer-phone`, `footer-email`, `main-services-phone`, `technology-phone`,
`service-<key>` (green service card).

`Content` events are fired from `components/signals/article-view.tsx`, a small
client component; a ref guard prevents double-fire under React Strict Mode and
on re-renders. The other click events come from `components/signals/tracked-link.tsx`
and `components/signals/contact-link.tsx`, both client components.

## Rules applied

- No artificial `value`/`currency` on engagement events; only real conversions
  use standard events.
- `Lead` fires after a successful API response, never on button click or error.
- Email/phone are hashed in the browser with `hash_meta_user_data()` (Web Crypto);
  raw PII never leaves the browser. If hashing fails, the conversion is still sent.
- `autoConfig: false` stops Meta's automatic button/metadata collection, so the
  explicit events above are the only ones counted.
- `debug: true` is intentionally kept on for this project. A per-call
  `{ debug: false }` can silence a noisy event.
- No `capi_test_event_code` in production payloads.
- Custom event names stay well under Meta's 50-character limit.

## Verify

1. `npm run build` and `npm run lint` pass.
2. Meta Events Manager → Test Events shows `PageView`, `ViewContent`, `Contact`
   and `Lead` with matching browser/CAPI `event_id`s (deduplicated).
3. Submit both forms with valid data: confirmation appears and one `Lead` fires.
4. Click a phone/email CTA and a nav link: one `Contact` / `NavClick` fires.
5. With `debug: true`, the browser console shows `✓ Pixel <id>` and
   `→ endpoint ✓` for each event.
