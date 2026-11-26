# Signals event map

All tracking goes through `signal()` from `@devalon.dev/credits/signals`
(`@devalon.dev/credits@1.1.5`). There is no Graph API code in this repository:
the package forwards every event to `signal.devalon.dev/{pixel_id}/signals` via
`fetch(..., keepalive: true)`, with the JWT sent as an `Authorization: Bearer …`
request credential (since 1.1.3, not in the event body), using the same
`event_id` for the browser Pixel and the server-side (CAPI) copy.

Since 1.1.4 the SDK also reads `fbclid` from the URL, validates it, persists it
in a first-party `_fbc` cookie (90 days, `SameSite=Lax`, `Secure` on HTTPS) and
adds `fbc` to every payload. An existing cookie is reused and is not rewritten
unless the click ID actually changes; no application code is involved.

 Loader: `<DevalonSignal meta={devalonSignalMeta} />` in `app/[locale]/layout.tsx`.
 Config: `lib/devalon.ts` — pixel ID, `debug: false`, `autoConfig: false`.
 Helpers: `lib/signals/events.ts` (`useSignals()` adds the active `locale` to
 every payload; `locale` is UI-only and is not forwarded to Meta),
 `lib/signals/user-data.ts` (E.164 phone normalization for matching), and
 `components/signals/jwt-provider.tsx` (token refresh).

## Events

| Event | Type | Trigger | Payload (beyond `locale`) |
| --- | --- | --- | --- |
| `Lead` | standard | After a 2xx response from `/api/contact-footer` or `/api/contact-page` | `content_name: "footer-form" \| "contacts-page"`, `content_category: "contact-form"`, `options.userData` with browser-hashed `email`, `phone` (E.164) and `name` (→ Meta `fn`) |
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
- Email, phone and name are hashed in the browser with `hash_meta_user_data()`
  (Web Crypto); raw PII never leaves the browser. If hashing fails, the
  conversion is still sent without matching data.
- Local Moldovan numbers (`07x…`) are converted to `+373…` before hashing —
  Devalon strips leading zeros, so without the country code Meta could not match
  them. The raw number in our own API payload is unchanged.
- `ct` / `st` / `zp` / `country` matching fields are auto-filled by Devalon's
  worker from IP geo on every forwarded event; no application code is needed.
- `autoConfig: false` stops Meta's automatic button/metadata collection, so the
  explicit events above are the only ones counted.
- `debug: true` is intentionally kept on for this project. A per-call
  `{ debug: false }` can silence a noisy event. JWT debug lines contain only
  metadata (`jti`, `exp`, …), never the token value.
- No `capi_test_event_code` in production payloads.
- Custom event names stay well under Meta's 50-character limit.

## JWT endpoint protection

`app/api/signal-tkn/route.ts` mints a short-lived HMAC-SHA256 token with
`createDevalonSignalJwt()`. `DEVALON_SIGNING_SECRET` is server-only (≥16 chars,
never `NEXT_PUBLIC_`/`VITE_`) and must match the secret registered with Devalon
for this pixel and origin (`siteUrl`, i.e. `https://ventprime.md`). Missing
secret or a mint failure returns a generic `500` and issues no token. The
same-origin check rejects foreign origins (403) and a best-effort per-IP limit
returns 429 after 10 requests/minute; for real abuse control add a rate-limit
rule for this path at the edge. Local testing from `localhost`/LAN needs a
Devalon administrator to enable development origins for the pixel and a local
`origin` claim; production keeps `https://ventprime.md`.

`components/signals/jwt-provider.tsx` registers `set_signal_jwt_provider()` once
on mount. There is deliberately **no `meta.jwt`** and no `force-dynamic`: pages
stay static, the SDK fetches a token on the first event, refreshes within
30 seconds of expiry, and retries once on a `403 jwt_*` rejection.

A JWT is a bearer credential: any visitor can call the public mint endpoint and
get a token valid for at most 300 seconds. This blocks anonymous/invalid
requests, but it is abuse reduction, **not** authentication of individual events.

## Verify

1. `npm run build` and `npm run lint` pass.
2. Meta Events Manager → Test Events shows `PageView`, `ViewContent`, `Contact`
   and `Lead` with matching browser/CAPI `event_id`s (deduplicated).
3. Submit both forms with valid data: confirmation appears and one `Lead` fires.
4. In the HAR, the `signal.devalon.dev` POST must show `user_data` with 64-hex
   `email`, `phone` (hash of the `+373…` number) and `firstName` (hash of the
   submitted name) — never raw values.
5. `GET /api/signal-tkn` returns a three-part token for same-origin calls,
   403 for a foreign origin, and a generic 500 when the signing secret is absent.
6. Click a phone/email CTA and a nav link: one `Contact` / `NavClick` fires.
7. In the HAR, the `signal.devalon.dev` POST carries `Authorization: Bearer …`
   with **no `jwt` field in the body** and no `403 jwt_*` response; the browser
   console shows `✓ Pixel <id>` and `→ endpoint ✓` (plus JWT refresh metadata)
   with `debug: true`.
