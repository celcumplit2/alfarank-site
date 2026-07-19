# AlfaRank production rules

These rules apply to the entire repository and are mandatory for every agent and release task.

## Canonical workspace

- The production workspace on this machine is `D:\ALFA_release_sales_sync`.
- `D:\ALFA` is an older, dirty research workspace. Never build or deploy production from it.
- GitHub `celcumplit2/alfarank-site`, branch `main`, is the production source of truth.

## Deployment path

- Never run `wrangler pages deploy`, `wrangler pages deployment create`, or upload a local `dist` directory to the production Pages project.
- Production is published only by pushing an reviewed commit to GitHub `main`; Cloudflare Pages must report trigger `github:push` with successful clone, build, and deploy stages.
- Run `npm run release:preflight` before pushing production.
- Run `npm run release:verify` after Cloudflare finishes.
- A Cloudflare `ad_hoc` production deployment is a release failure even when its deploy stage says success.

## Critical product matrix

Every production release must preserve and verify together:

- `/alfa-pulse/`, `/ro/alfa-pulse/`, and `/ru/alfa-pulse/`;
- all Alfa Pulse PDF files under `/offers/alfa-pulse/`;
- all four `/lp/` offer pages;
- `/sales/`, its D1-backed data, admin access, one client form, actions, audit log, and XLSX export;
- `/api/start-project` and Telegram notification configuration.

Do not accept a rollback or hotfix based on one route. Verify the complete matrix first. D1 data must never be reset, recreated, or migrated during a UI rollback unless the user explicitly authorizes a database change.

## Verification

- Local/static checks are not enough. Verify `https://alfarank.com` after every production change.
- Check desktop and 390px mobile layouts in a browser, including authenticated Sales Tracker state.
- Record the deployed commit, Cloudflare deployment ID, trigger type, route QA result, and browser result.
- Treat NOVA/LANG news sync failures separately from Sales Tracker failures; never use a news error as evidence that Sales Tracker is broken.
