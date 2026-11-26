# Devalon metadata (1.1.5 overlap contract)

Devalon owns the `creator` / `author` fields, the `WebSite` and `WebPage` nodes,
the provenance response headers, the visible backlink and the `llms.txt` /
`humans.txt` credit blocks. The client owns `publisher`, its own business entity
and its services. This repo follows that split so crawlers see one entity per
company and one author per page.

- The client entity is the `LocalBusiness` at `https://ventprime.md/#business`,
  exported as `businessEntityId` from `lib/site.ts` and used by
  `lib/structured-data.ts`.
- `lib/devalon.ts` sets `client_entity_id` to that id. `DevalonCredit` passes it
  to `DevalonJsonLd`, so Devalon references the existing `LocalBusiness` instead
  of generating a second `Organization` stub.
- `siteJsonLd()` deliberately emits **no** `WebSite` node — `DevalonCredit`
  renders one on every page. Likewise `articleJsonLd()` no longer declares
  `author`; Devalon sets `author`/`creator` on its `WebSite`/`WebPage` nodes.

Verify after deploying (strict mode needs the served HTML and headers):

```bash
yarn check:credits https://ventprime.md --deployed --strict
```
