# Search Console Status - 2026-07-09

Property checked: `sc-domain:alfarank.com`.

## Executive status

- Search visibility is currently limited to the indexed home routes, not the full
  site architecture.
- No manual actions or security issues were reported.
- HTTPS is clean for the indexed URLs.
- Core Web Vitals has insufficient field data for both mobile and desktop.
- The main indexation bottleneck is "Crawled - currently not indexed" at scale,
  mixed with old WordPress-style URL history and a large sitemap footprint.
- Recovery diagnosis and the ordered indexing plan are documented in
  `docs/indexing-recovery-report.md`.

## Performance

GSC performance report, web search, 3-month view, updated 4 hours before check:

| Segment | Clicks | Impressions | CTR | Avg position |
| --- | ---: | ---: | ---: | ---: |
| All visible queries | 3 | 39 | 7.7% | 11.2 |
| Excluding brand, site operators, and football terms | 0 | 0 | n/a | n/a |
| Football terms only | 0 | 0 | n/a | n/a |

Visible queries:

| Query | Clicks | Impressions | Position |
| --- | ---: | ---: | ---: |
| `alfarank` | 2 | 5 | 7.8 |
| `alfa rank` | 1 | 2 | 32.0 |
| `site:alfarank.com` | 0 | 21 | 1.0 |
| `alpharun` | 0 | 2 | 89.5 |
| `alpha rank` | 0 | 1 | 29.0 |
| `alpharank` | 0 | 1 | 89.0 |

Visible page rows:

| Page | Clicks | Impressions | Position |
| --- | ---: | ---: | ---: |
| `https://alfarank.com/` | 2 | 36 | 12.0 |
| `https://alfarank.com/ru/` | 1 | 24 | 1.9 |

GSC page rows can overlap by query, so page impressions should not be summed as
site-level impressions.

## Indexing

Pages report, last updated 2026-06-30:

| Status | Count | Notes |
| --- | ---: | --- |
| Indexed | 2 | `/` crawled 2026-06-24, `/ru/` crawled 2026-06-25 |
| Not indexed | 428 | 3 reasons |

Not indexed reasons:

| Reason | Source | Validation | Count | Notes |
| --- | --- | --- | ---: | --- |
| `noindex` tag | Site | Not started | 18 | Old `/feed/` URLs from prior content history. |
| Page with redirect | Site | Not started | 1 | Normal if it is an intentional redirect. |
| Crawled - currently not indexed | Google systems | Started 2026-07-07 | 409 | Includes `/ro/` plus many old root-level article URLs now returning 404. |

Examples from the largest group:

- `https://alfarank.com/ro/`
- `https://alfarank.com/planet-green-holdings-faces-nyse-listing-challenges/`
- `https://alfarank.com/the-wealth-of-real-housewives-of-beverly-hills-cast/`
- `https://alfarank.com/discover-valley-ford-sonoma-countys-hidden-gem/`
- `https://alfarank.com/portfolio/netus-eu-mollis-hac-dignis/`
- `https://alfarank.com/local-seo-services-in-melbourne-brevard-county/`

Live checks during this update showed the old root examples return `404`, while
`/`, `/ru/`, `/ro/`, `sitemap.xml`, `news-sitemap.xml`, and `robots.txt` return
`200`.

## Sitemaps

GSC sitemaps report:

| Sitemap | Submitted | Last processed | Status | Discovered pages |
| --- | --- | --- | --- | ---: |
| `https://alfarank.com/news-sitemap.xml` | 2026-07-07 | 2026-07-07 | Success | 210 |
| `https://alfarank.com/sitemap.xml` | 2026-07-07 | 2026-07-07 | Success | 570 |

Live production sitemap check before deployment of the recovery build found 600
URLs in the main sitemap:

- 240 news article URLs in the main sitemap at the live production check.
- 357 durable corporate/case/LP URLs that should remain after cleanup.
- 3 conversion thank-you URLs in the live main sitemap before cleanup.
- 0 current football/sports URL matches.

Implemented cleanup:

- Main `sitemap.xml` now contains durable localized site routes only and no
  article URL expansion.
- `priority-sitemap.xml` now contains a compact set of 174 core commercial,
  structural, trust, and case-directory URLs for the first indexing push.
- `news-sitemap.xml` now includes only articles published in the last 48 hours,
  matching Google News sitemap guidance:
  `https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap`.
- Conversion thank-you routes were removed from sitemap output and set to
  `noindex, nofollow`.
- Legacy `/feed/` URLs now return `410 Gone` with `X-Robots-Tag: noindex,
  nofollow`.
- Priority hub pages were strengthened with page-specific descriptions plus
  `CollectionPage`, `ItemList`, and `BreadcrumbList` structured data:
  `/capabilities/`, `/solutions/`, and `/systems/`.
- Campaign landing pages now expose `Service`, `OfferCatalog`, `FAQPage`, and
  `BreadcrumbList` structured data through the shared LP template.

Post-build verification:

- `dist/sitemap.xml`: 357 URLs.
- `dist/priority-sitemap.xml`: 174 URLs.
- `dist/news-sitemap.xml`: 27 fresh news URLs.
- Main sitemap article URLs: 0.
- Main sitemap `thank-you` URLs: 0.
- Sitemap `feed` URLs: 0.
- Football/sports URL matches across generated XML files: 0.

Live production still needs deployment of the recovery build. At the production
check before deployment, `https://alfarank.com/sitemap.xml` still returned 600
URLs and `https://alfarank.com/news-sitemap.xml` still returned 240 URLs.
The local `main` branch was also 4 commits behind `origin/main` during the
audit, so the recovery should be deployed from a deliberately synchronized
build rather than from the dirty local working tree.

URL Inspection details:

- `https://alfarank.com/ro/`: not indexed; `Crawled - currently not indexed`;
  last crawled 2026-07-08 16:20:57; crawl allowed, fetch successful, indexing
  allowed, user canonical `https://alfarank.com/ro/`, Google canonical matched
  inspected URL.
- `https://alfarank.com/capabilities/`: not indexed; URL unknown to Google.
- `https://alfarank.com/lp/ai-content-workflow/`: not indexed; URL unknown to
  Google.

## Quality and safety

- Core Web Vitals: insufficient field data for mobile and desktop, updated
  2026-07-08.
- HTTPS: 2 HTTPS URLs, 0 non-HTTPS URLs, no critical issues, updated
  2026-07-09.
- Manual actions: no problems.
- Security issues: no problems.

## Next actions

1. Deploy the sitemap, priority sitemap, and feed cleanup.
2. Submit or resubmit `priority-sitemap.xml`, `sitemap.xml`, and
   `news-sitemap.xml`.
3. In GSC, request inspection for `/ro/` and priority commercial pages after
   deploy.
4. Validate the `Crawled - currently not indexed` issue only after the sitemap
   footprint has updated.
5. Strengthen priority indexed candidates first: `/ro/`, `/capabilities/`,
   `/solutions/`, `/systems/`, and the four `/lp/` routes.
6. Keep NOVA publication volume controlled until the news layer earns
   indexation signals; use recent-news sitemap exposure rather than pushing the
   full archive in XML.
