# AlfaRank.com

Corporate website for AlfaRank, a digital systems company.

## Stack

- Astro static site
- Ready for GitHub workflow
- Ready for Cloudflare Pages deployment

## Commands

```bash
npm install
npm run dev
npm run build
npm run qa:lead-flow:local
npm run qa:lead-env
npm run qa:lead-d1
npm run qa:lead-analytics
npm run qa:lead-cloudflare -- --env-file .env
npm run lead-env:prepare
npm run lead-env:sync -- --env-file .env --lead-env-file .env.lead.production.local
npm run qa:lead-production-status -- --cloudflare-env-file .env --lead-env-file .env.lead.production.local
npm run lead-env:checklist
npm run qa:lead-launch -- --cloudflare-env-file .env --lead-env-file .env.lead.production.local
npm run qa:lead-flow:remote -- --base-url https://example.pages.dev
```

`npm run dev` runs the Astro frontend server only. Cloudflare Pages Functions
are not available in that mode, so the Start Project form API will return 404
locally.

For a full local check with `/api/start-project`, use:

```bash
npm run qa:lead-flow:local
```

That command builds the site, starts a local Cloudflare Pages runtime, verifies
the lead submission/report/status/export flow, and shuts the runtime down.

For manual Pages runtime work, use:

```bash
npm run db:migrate:local
npm run dev:pages
```

The manual Pages dev server runs on:

```text
http://127.0.0.1:8788/
```

## Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: 22.12+
- D1 binding: `DB`

## Project Requests

The Start Project form posts to:

- `POST /api/start-project`

Submissions are stored in Cloudflare D1 using:

- `migrations/0001_project_requests.sql`

Create and configure the D1 database:

```bash
npx wrangler d1 create alfarank-project-requests
npx wrangler d1 migrations apply alfarank-project-requests
```

Copy the returned `database_id` into `wrangler.toml`.

Before launching traffic, check the production lead-generation configuration
without printing secret values:

```bash
npm run qa:lead-env
```

To verify the first-party analytics event layer and conversion context in the
source and built pages:

```bash
npm run qa:lead-analytics
```

Run it with production variables exported in the shell, or pass an env file
directly:

```bash
node scripts/audit-lead-production-env.mjs --env-file .env.production.local
```

Check the deployed Cloudflare Pages project without printing secret values:

```bash
npm run qa:lead-cloudflare -- --env-file .env
```

This verifies the Pages project, domains, latest production deploy, D1 binding,
and visible lead environment variable names. It also writes a no-secret
Cloudflare summary to `artifacts/lead-cloudflare-summary.json` by default; use
`--summary-file <path>` for a named handoff file or `--no-summary` for
terminal-only checks.

Check the remote D1 lead migrations and schema without printing secret values:

```bash
npm run qa:lead-d1
```

This verifies the local lead migration inventory, confirms the remote D1 has no
pending migrations, checks the `project_requests`,
`project_request_status_events`, and `project_request_notification_events`
schemas, and writes `artifacts/lead-d1-migrations-summary.json`.

Prepare a local ignored lead production env draft with a generated report token:

```bash
npm run lead-env:prepare
```

Fill real notification, contact, analytics, and optional Turnstile values in
`.env.lead.production.local`, then run:

```bash
npm run qa:lead-env -- --env-file .env.lead.production.local
```

The preflight prints a readiness map with only variable names/statuses, never
secret values. It must show notification delivery, quick contact, and analytics
as ready before syncing Cloudflare Pages env.

It also writes a no-secret blocker report to
`artifacts/lead-production-env-summary.json` by default. Use
`--summary-file <path>` for a named handoff file, or `--no-summary` when only
terminal output is needed.

To see one aggregate go/no-go status for lead-generation launch readiness:

```bash
npm run qa:lead-production-status -- --cloudflare-env-file .env --lead-env-file .env.lead.production.local
```

This writes `artifacts/lead-production-status.json` without secret values and
exits nonzero while production blockers remain. It aggregates the local lead env
preflight, Cloudflare Pages config audit, remote D1 migration/schema audit, and
launch-gate dry-run into one blocker/next-action list.

To turn that status into a human-readable handoff checklist:

```bash
npm run lead-env:checklist
```

This writes `artifacts/lead-production-checklist.md` without secret values. It
lists the missing production inputs, exact sync/check commands, live-gate step,
and the final partner-program stage.

Dry-run the Cloudflare sync before applying it:

```bash
npm run lead-env:sync -- --env-file .env --lead-env-file .env.lead.production.local
```

When the dry-run shows the expected names and types, apply:

```bash
npm run lead-env:sync -- --env-file .env --lead-env-file .env.lead.production.local --apply
```

After `--apply`, the command re-reads the Pages project and verifies that the
synced variable names are present with the expected `plain_text` / `secret_text`
types.

Both dry-run and apply modes write a no-secret sync summary to
`artifacts/lead-env-sync-summary.json` by default. It includes planned variable
names/types, current visible env names, hidden current secret names by name, and
post-apply check status without printing values.

To run the lead-generation launch gate before applying Cloudflare env changes:

```bash
npm run qa:lead-launch -- --cloudflare-env-file .env --lead-env-file .env.lead.production.local
```

The gate writes a no-secret JSON summary to
`artifacts/lead-launch-gate-summary.json` by default. Use
`--summary-file <path>` to choose a different handoff file, or `--no-summary`
when only terminal output is needed.

After `lead-env:sync --apply` and deploy, run the live gate:

```bash
npm run qa:lead-launch -- --phase live --base-url https://example.pages.dev --cloudflare-env-file .env --lead-env-file .env.lead.production.local
```

After the production or preview variables are configured, run a report-backed
remote smoke. It refuses localhost targets and requires a report token so the
test proves storage, report, status, and CSV export instead of only posting
forms:

```bash
npm run qa:lead-flow:remote -- --base-url https://example.pages.dev --env-file .env.production.local
```

## Documentation

The development brief is stored in:

- `docs/development-brief.md`
- `docs/form-handling.md`
