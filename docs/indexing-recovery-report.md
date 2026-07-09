# AlfaRank indexing recovery report - 2026-07-09

## Diagnosis

The site is not blocked by one single fatal technical error. The current
indexing problem is a timing and signal-quality problem:

- Google has only indexed `/` and `/ru/`.
- `/ro/` was crawled successfully on 2026-07-08 by Googlebot Smartphone, with
  crawl allowed, fetch successful, indexing allowed, and canonical set to
  `https://alfarank.com/ro/`; Google still classified it as `Crawled - currently
  not indexed`.
- `/capabilities/` and `/lp/ai-content-workflow/` still showed as `URL unknown
  to Google` in URL Inspection even though the sitemap report had accepted the
  submitted sitemap files.
- The Page indexing report was last updated on 2026-06-30, while the sitemaps
  were submitted and processed on 2026-07-07. The visible Page indexing report
  therefore lags behind the sitemap submission.

## What Google was seeing

Search Console sitemaps report on 2026-07-09:

| Sitemap | Submitted | Last processed | Status | Discovered pages |
| --- | --- | --- | --- | ---: |
| `https://alfarank.com/news-sitemap.xml` | 2026-07-07 | 2026-07-07 | Success | 210 |
| `https://alfarank.com/sitemap.xml` | 2026-07-07 | 2026-07-07 | Success | 570 |

Live production check on 2026-07-09 before deployment of the recovery changes:

| File | Live URL count | Problem |
| --- | ---: | --- |
| `sitemap.xml` | 600 | Too broad for the current indexing stage. Included 240 news article URLs and 3 thank-you URLs. |
| `news-sitemap.xml` | 240 | Full localized NOVA archive instead of only recent news. |

This means Search Console accepted a large, noisy sitemap footprint while the
domain still has very low indexed trust.

## Timeline

- 2026-05-27: production launch preparation added `robots.txt`, generated
  `sitemap.xml`, canonical metadata, and deployment docs.
- 2026-06-19: NOVA-backed AlfaRank News pages were added, together with
  `news-sitemap.xml` and article expansion into the main sitemap.
- 2026-06-21: Romanian and Russian news localization expanded each published
  article into three localized URLs.
- 2026-06-23: NOVA news translations were connected to LANG.
- 2026-06-30: the Page indexing report snapshot visible in GSC was last updated.
- 2026-07-07: `sitemap.xml` and `news-sitemap.xml` were submitted and processed.
- 2026-07-08: Google crawled `/ro/`, but did not index it.
- 2026-07-09: sitemap recovery changes were implemented locally.

## Recovery changes implemented

- Main `sitemap.xml` now contains durable localized site routes only.
- Main sitemap no longer expands NOVA article URLs.
- `news-sitemap.xml` now includes only articles published in the last 48 hours.
- `priority-sitemap.xml` was added for a compact set of core commercial,
  structural, and trust pages.
- `robots.txt` now advertises all three sitemaps.
- Conversion thank-you pages are excluded from sitemap output and set to
  `noindex, nofollow`.
- Legacy `/feed/` URLs now return `410 Gone` with `X-Robots-Tag: noindex,
  nofollow`.
- Main sitemap `lastmod` was moved to `2026-07-09` for the recovery build.
- Priority hub pages now have page-specific descriptions plus `CollectionPage`,
  `ItemList`, and `BreadcrumbList` structured data.
- Campaign landing pages now expose `Service`, `OfferCatalog`, `FAQPage`, and
  `BreadcrumbList` structured data.

Post-build verification:

| File | URLs | Article URLs | noindex URLs | robots-disallowed URLs | thank-you | feed | football/sports |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `sitemap.xml` | 357 | 0 | 0 | 0 | 0 | 0 | 0 |
| `priority-sitemap.xml` | 174 | 0 | 0 | 0 | 0 | 0 | 0 |
| `news-sitemap.xml` | 27 | 27 | 0 | 0 | 0 | 0 | 0 |

## Required order to actually recover indexing

1. Deploy the recovery build to production.
2. Verify live production counts:
   - `https://alfarank.com/sitemap.xml` -> 357 URLs.
   - `https://alfarank.com/priority-sitemap.xml` -> 174 URLs.
   - `https://alfarank.com/news-sitemap.xml` -> 27 fresh news URLs in the
     verified 2026-07-09 build.
3. In Search Console, submit or resubmit:
   - `https://alfarank.com/priority-sitemap.xml`
   - `https://alfarank.com/sitemap.xml`
   - `https://alfarank.com/news-sitemap.xml`
4. Use URL Inspection and request indexing for a small priority batch:
   - `https://alfarank.com/ro/`
   - `https://alfarank.com/capabilities/`
   - `https://alfarank.com/solutions/`
   - `https://alfarank.com/systems/`
   - `https://alfarank.com/lp/automate-lead-processing/`
   - `https://alfarank.com/lp/ai-content-workflow/`
   - `https://alfarank.com/lp/ecommerce-feed-system/`
   - `https://alfarank.com/lp/wordpress-crm-integration/`
   - `https://alfarank.com/cases/`
   - `https://alfarank.com/news/`
5. Do not validate the `Crawled - currently not indexed` group until Search
   Console has processed the cleaner production sitemaps.
6. Keep NOVA publication volume controlled. Fresh articles can remain in the
   news sitemap, but the full archive should not be pushed in XML until the site
   earns stronger indexation signals.

## Current blocker

The recovery build is verified locally, but production still needs to be
updated. Requesting indexing before deployment would push Google toward the old
600/240 sitemap footprint rather than the cleaned 357/174/27 footprint.

The local `main` branch was 4 commits behind `origin/main` during the audit, and
the latest Cloudflare Pages production deployment attempt visible in Wrangler had
failed while the last successful production deployment was already based on
`origin/main`. The recovery deployment should therefore be made from a clean,
synchronized build that preserves the existing production fixes.
