# Search engine submission

## What is automated

`.github/workflows/indexnow.yml` runs on every push to `main` (and can be
triggered manually from the Actions tab). It waits for the live sitemap, then
`scripts/indexnow.mjs` reads `sitemap.xml` and POSTs all of its URLs to
[IndexNow](https://www.indexnow.org/).

IndexNow forwards the notification to participating engines: **Bing, Yandex,
Naver, Seznam.cz and Yep**. DuckDuckGo sources results from Bing, so it benefits
indirectly.

Ownership is proven by the public key file `public/<key>.txt` — the filename and
its contents are the same value. The workflow finds it automatically. The site
URL defaults to `https://ventprime.md`; override it with a repository variable
named `SITE_URL` if the domain changes.

Run it manually from your machine:

```bash
npm run indexnow -- --dry-run   # parse sitemap only, no submission
npm run indexnow                # submit
```

## What is not automated

**Google does not support IndexNow**, and its Indexing API is restricted to
JobPosting/BroadcastEvent content. Google discovers pages through the sitemap
and internal links. Complete these one-time steps manually:

1. **Google Search Console** — add the property for `https://ventprime.md`,
   verify ownership, then open *Sitemaps* and submit `/sitemap.xml`. Use *URL
   Inspection → Request indexing* for new or updated pages that need priority.
2. **Bing Webmaster Tools** — verify the site and confirm the sitemap is listed.
   IndexNow already notifies Bing, but verification gives you crawl reports.
3. **Yandex Webmaster** — verify the site and add the sitemap under *Site map
   files*. IndexNow notifies Yandex as well.

Other engines (Baidu, for example) require their own webmaster accounts and
manual submission.

## Notes

- A submission requests a crawl; it does not guarantee indexing or ranking.
- The workflow waits up to ~5 minutes for the live sitemap after a push. If the
  host deploys slower than that, trigger the workflow again with
  *Run workflow* once the new sitemap is live.
- Changes limited to `docs/` or `.github/` do not trigger a submission.
- To rotate the IndexNow key: generate a 32-character hex value, create
  `public/<new-key>.txt` with the same contents, deploy, delete the old key
  file, and re-run the workflow.
