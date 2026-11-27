# Signals event map

Meta tracking goes through `signal.meta.emit()` and Google tracking through
`signal.google.emit()` from `@devalon.dev/credits/signals`
(`@devalon.dev/credits@2.0.0`). `signal` is a namespace object; the two emitters
are independent and names/params are never translated between them. There is no
Graph API code in this repository: the package forwards every Meta event to
`signal.devalon.dev/{pixel_id}/signals` via `fetch(..., keepalive: true)`, with
the JWT sent as an `Authorization: Bearer …` request credential (since 1.1.3,
not in the event body), using the same `event_id` for the browser Pixel and the
server-side (CAPI) copy. Google emits go only to the GTM container's private
layer — no collector, no `event_id`, no `user_data`.

Since 1.1.4 the SDK also reads `fbclid` from the URL, validates it, persists it
in a first-party `_fbc` cookie (90 days, `SameSite=Lax`, `Secure` on HTTPS) and
adds `fbc` to every payload. An existing cookie is reused and is not rewritten
unless the click ID actually changes; no application code is involved.

Since 1.1.6 the same `<DevalonSignal>` loader also injects Google Tag Manager
(`google={devalonSignalGoogle}`, container `GTM-MZCPTKMG` in `lib/devalon.ts`).
Since 1.1.7 the container is bound to a private, read-only layer; in 2.0.0 it
is `__DS_G_DL` (exported as `DEVALON_GOOGLE_DATA_LAYER`,
`gtm.js?id=…&l=__DS_G_DL`). It does
not declare `gtag` and does not touch `window.dataLayer`. `signal.google.emit()`
pushes `{ ...params, event }` there, with the event name used verbatim as the
GTM Custom Event trigger. A CSP `nonce` applies to both script tags. The SDK's
older long globals (`__DEVALON_GTM_DATA_LAYER`, `__DEVALON_SIGNAL_*`) are gone
in 2.0.0; config now uses opaque read-only `__DS_M_*` / `__DS_G_*` keys.

The pre-existing `GTM-5T8B6F5N` snippet in `<head>` is kept alongside it and
still uses `window.dataLayer`, so `phone_click` and `lead_form_submit` from
`lib/analytics/gtm.ts` reach only that container. The two layers are isolated —
configure triggers separately in each container's GTM workspace.

 Loader: `<DevalonSignal meta={devalonSignalMeta} google={devalonSignalGoogle} />`
 in `app/[locale]/layout.tsx`.
 Config: `lib/devalon.ts` — pixel ID, `autoConfig: false`, GTM ID, and
 `logs: devalonLogs`. Since 2.0.0 `logs` replaces `debug`; it is `true` only when
 `NODE_ENV === "development"` (via the shared `devalonLogs` flag) and `false`
 in production and every other environment.
 Helpers: `lib/signals/events.ts` (`useSignals()` adds the active `locale` to
 every Meta and Google payload; `locale` is UI-only and is not forwarded to Meta),
 `lib/signals/user-data.ts` (E.164 phone normalization for matching), and
 `components/signals/jwt-provider.tsx` (token refresh).

## Events

| Meta event | Google event | Type | Trigger | Payload (beyond `locale`) |
| --- | --- | --- | --- | --- |
| `Lead` | `generate_lead` | standard | After a 2xx response from `/api/contact-footer` or `/api/contact-page` | `content_name: "footer-form" \| "contacts-page"`, `content_category: "contact-form"`; Meta only: `options.userData` with browser-hashed `email`, `phone` (E.164) and `name` (→ Meta `fn`) |
| `Contact` | `phone_click` / `email_click` | standard (Meta), custom (Google) | Click on any phone (`tel:`) or email (`mailto:`) CTA | `content_name: <surface>`; Meta only: `contact_method: "phone" \| "email"` |
| `ViewContent` | `article_view` | standard (Meta), custom (Google) | Once per blog article page load | `content_ids: [post.path]`, `content_name: <localized title>`; Meta only: `content_type: "article"`, `content_category: "blog"` |
| `HeroCtaClick` | `hero_cta_click` | custom | Hero "consultation" button | `button_id: "hero-consultation"`, `section: "hero"` |
| `NavClick` | `nav_click` | custom | Header, footer or mobile nav link | `nav_location: "header" \| "footer" \| "mobile"`, `item: <nav key>` |

`Contact` sources: `hero-phone`, `navbar-phone`, `mobile-phone`, `mobile-email`,
`footer-phone`, `footer-email`, `main-services-phone`, `technology-phone`,
`service-<key>` (green service card).

`Content` events are fired from `components/signals/article-view.tsx`, a small
client component; a ref guard prevents double-fire under React Strict Mode and
on re-renders. The other click events come from `components/signals/tracked-link.tsx`
and `components/signals/contact-link.tsx`, both client components.

Every helper has a `google*` counterpart called from the same place, so both
platforms see the same user action. `GOOGLE_EVENT_ALIASES` maps our two Meta
custom names to their snake_case GTM counterparts; unknown names are skipped
rather than sent under a trigger name that does not exist.

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
- `logs` in `lib/devalon.ts` is `true` only for `NODE_ENV === "development"`.
  With it on, every Meta and Google emit writes one console line; production
  stays quiet. A per-call `{ logs: true | false }` overrides the global flag.
  JWT log lines contain only metadata (`jti`, `exp`, …), never the token value.
- Google emits carry only `{ ...params, event }`: no `user_data`, no hashed PII,
  no `event_id`, and no request to `signal.devalon.dev`. Names follow Google's
  catalogs (`GOOGLE_STANDARD_EVENT_NAMES` / `GOOGLE_CUSTOM_EVENT_NAMES`, snake_case).
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
`origin` claim; production keeps `https://ventprime.md`. The generator uses the
same `devalonLogs` flag from `lib/devalon.ts`, so its `[Devalon JWT] generated`
metadata lines appear only in development.

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
   with **no `jwt` field in the body** and no `403 jwt_*` response. Under
   `npm run dev`, the console shows `meta.emit(<name>) → Pixel <id> ✓` and
   `google.emit(<name>) → GTM ✓` for both providers, plus JWT refresh metadata;
   production and other environments stay console-quiet.
8. A rendered page's HTML contains
   `gtm.js?id=GTM-MZCPTKMG&l=__DS_G_DL` and the read-only `__DS_G_DL` bootstrap;
   the Devalon snippet declares no `gtag`.
9. A form submit / CTA click pushes `generate_lead` / `phone_click` into
   `__DS_G_DL` (no `user_data`, no `event_id`), while the legacy container still
   receives `lead_form_submit` / `phone_click` via `dataLayer`.
