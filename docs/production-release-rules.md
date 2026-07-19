# AlfaRank production release procedure

## Source of truth

Production releases use only `D:\ALFA_release_sales_sync` and GitHub `main`.
The older `D:\ALFA` workspace contains unrelated and uncommitted work and is
never a production deployment source.

## Release

1. Work and test in `D:\ALFA_release_sales_sync` on a `codex/*` branch.
2. Run `npm run release:preflight`.
3. Review and commit only intended files.
4. Push the reviewed commit to GitHub `main`.
5. Wait for Cloudflare Pages to complete clone, build, and deploy from trigger
   `github:push`.
6. Run `npm run release:verify`.
7. Verify the authenticated Sales Tracker in a browser at desktop and 390px
   mobile widths.

Direct upload commands and local `dist` uploads are forbidden for production.
They can publish a stale tree while labeling it with an unrelated commit.

## Required production matrix

- Alfa Pulse: `/alfa-pulse/`, `/ro/alfa-pulse/`, `/ru/alfa-pulse/`.
- Alfa Pulse PDFs: English, Romanian, and Russian files under
  `/offers/alfa-pulse/`.
- Offer landing pages: all four `/lp/` routes.
- Sales Tracker: `/sales/`, current single client form, actions, audit log,
  custom calendar, admin delete controls, and XLSX export.
- Lead intake: D1 binding `DB`, website lead capture, attribution, and Telegram.

## Rollback

A rollback is allowed only to a successful production deployment that has been
checked against the complete matrix above. Pages deployment rollback changes
code and assets; it does not reset the D1 database. After rollback, run the same
live and browser verification as after a normal release.

## Incident record: 2026-07-18

Production was overwritten by an `ad_hoc` direct upload from stale commit
`df70aca`. Cloudflare skipped clone and build, Alfa Pulse files disappeared,
and Sales Tracker reverted to an older interface. Production was restored to
GitHub deployment `0233ffe2` from commit `e06f261`, which contains both Alfa
Pulse and the current Sales Tracker.
