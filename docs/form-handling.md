# Start Project Form Handling

The `/start-project/` form posts to a Cloudflare Pages Function:

```text
POST /api/start-project
```

The function writes submissions into Cloudflare D1 using the `DB` binding.

Production status:

- D1 database: `alfarank-project-requests`
- binding: `DB`
- lead storage migrations applied locally and on remote D1:
  `migrations/0001_project_requests.sql`,
  `migrations/0002_project_request_intake_fields.sql`,
  `migrations/0003_project_request_tracking_fields.sql`,
  `migrations/0004_project_request_attribution_fields.sql`, and
  `migrations/0005_project_request_routing_fields.sql`, and
  `migrations/0006_project_request_lifecycle_fields.sql`, and
  `migrations/0007_project_request_status_events.sql`, and
  `migrations/0008_project_request_notification_events.sql`, and
  `migrations/0009_project_request_form_variant.sql`
- remote D1 was verified after applying `0009`, including the notification
  delivery audit table and form variant column.
- verified on production: form POST redirects to `/start-project/thank-you/`
  and creates a D1 record.

## D1 Table

Migration file:

```text
migrations/0001_project_requests.sql
```

Table:

```text
project_requests
```

Fields:

- `id`
- `name`
- `email`
- `project_type`
- `current_system`
- `business_problem`
- `desired_result`
- `desired_output`
- `integrations`
- `contact_details`
- `budget`
- `timeline`
- `source_path`
- `landing_page`
- `landing_offer`
- `form_variant`
- `locale`
- `referrer`
- `lead_channel`
- `partner_ref`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `user_agent`
- `ip_address`
- `lead_score`
- `lead_priority`
- `routing_bucket`
- `next_action`
- `status`
- `lead_owner`
- `lead_follow_up_note`
- `lead_status_updated_at`
- `created_at`

Status event history table:

```text
project_request_status_events
```

Fields:

- `id`
- `lead_id`
- `previous_status`
- `status`
- `owner`
- `next_action`
- `note`
- `created_at`

Notification delivery history table:

```text
project_request_notification_events
```

Fields:

- `id`
- `lead_id`
- `event_type`
- `channel`
- `status`
- `status_code`
- `error_message`
- `created_at`

## Cloudflare Setup

Create the D1 database:

```bash
npx wrangler d1 create alfarank-project-requests
```

Copy the returned `database_id` into `wrangler.toml`.

Apply the migration:

```bash
npx wrangler d1 migrations apply alfarank-project-requests
```

For remote migration commands in this workspace, Wrangler expects the token as
`CLOUDFLARE_API_TOKEN`. If the active token is stored under another local
variable name, assign it to `CLOUDFLARE_API_TOKEN` for the command process.

Wrangler is installed as a project dev dependency so migration scripts use the
local binary instead of installing `wrangler` through `npx` on every run. This
avoids the Windows npm cache `EBUSY` lock that can happen during temporary
Wrangler/Miniflare installs.

Useful scripts:

```bash
npm run db:migrate:local
npm run db:migrate:remote
npm run db:migrations:remote
npm run qa:lead-flow:local
npm run qa:lead-flow:remote -- --base-url https://example.pages.dev
npm run qa:lead-env
npm run qa:lead-d1
npm run qa:lead-analytics
npm run qa:lead-cloudflare -- --env-file .env
npm run lead-env:prepare
npm run lead-env:sync -- --env-file .env --lead-env-file .env.lead.production.local
npm run qa:lead-readiness
npm run qa:lead-launch -- --cloudflare-env-file .env --lead-env-file .env.lead.production.local
```

`npm run qa:lead-env` checks production lead-generation configuration without
printing secret values. Run it with real production variables exported in the
shell, or pass one or more safe local env files:

```bash
node scripts/audit-lead-production-env.mjs --env-file .env.production.local
```

The preflight fails when the Lead Desk/report token, notification route,
analytics adapter, or quick contact channel is missing. It also catches partial
Turnstile setup where the public site key and server secret are not configured
together. The output includes a readiness map that shows filled variable names
and ready/missing status for report access, notification delivery, quick
contacts, analytics, and Turnstile without printing secret values.

`npm run qa:lead-d1` checks remote D1 lead migration/schema readiness without
printing secret values. It verifies the local lead migration file inventory,
no pending remote migrations, `project_requests`,
`project_request_status_events`, and `project_request_notification_events`
columns, then writes `artifacts/lead-d1-migrations-summary.json`.

`npm run qa:lead-analytics` builds the site and verifies the first-party
analytics layer in source and built output. It checks event names, shared
conversion context, form attribution fields, vendor forwarding hooks, localized
thank-you routes, and partner-program attribution before a real analytics
vendor is connected.

Use `npm run lead-env:prepare` to create an ignored
`.env.lead.production.local` draft from `config/lead-production.env.example`.
The script generates a strong `LEAD_REPORT_TOKEN` and leaves real notification,
quick contact, analytics, and optional Turnstile values for explicit
configuration. It never prints the generated token.

`npm run lead-env:sync` validates the filled lead env file with
`scripts/audit-lead-production-env.mjs`, then prepares a Cloudflare Pages API
update for `deployment_configs.<environment>.env_vars`. Dry-run is the default;
use `--apply` only after the printed variable names and `plain_text` /
`secret_text` types are correct. After `--apply`, it re-reads the Pages project
and verifies that the synced names are present with the expected types. Secret
values are never printed. The command writes
`artifacts/lead-env-sync-summary.json` by default with planned names/types,
current visible env names, hidden current secret names by name, and post-apply
check status.

`npm run qa:lead-cloudflare` checks the actual Cloudflare Pages project through
the Cloudflare API without printing secret values. It verifies the project,
domains, latest production deploy, D1 `DB` binding, and the names of lead env
variables configured on the selected Pages environment. Use `--env-file .env`
for local Cloudflare API credentials and `--allow-missing-lead-env` when you
want an inventory-only audit before the real lead variables are configured.

`npm run qa:lead-readiness` builds the site and audits the lead-generation
surface: public forms, hidden attribution fields, partner-program intake,
sitemap coverage, Lead Desk, API endpoints, migrations, and documentation. It
does not require production secrets by default; set `LEAD_AUDIT_REQUIRE_ENV=1`
when the same audit should fail on missing production environment variables.

`npm run qa:lead-launch` is the lead-generation launch gate. In the default
`pre-apply` phase it runs the code/readiness checks, verifies the analytics
event layer, verifies remote D1 lead migrations/schema, validates the filled
lead production env file, runs Cloudflare env sync in dry-run mode, inventories
the Cloudflare Pages project/D1 binding, and runs local Pages smoke unless
`--skip-local-smoke` is passed. After
`lead-env:sync --apply` and deploy, run it with `--phase live --base-url
<preview-or-production-url>` to require strict Cloudflare lead env names and a
report-backed remote smoke.

`npm run qa:lead-flow:local` is the local end-to-end smoke wrapper. It builds
the site, starts `wrangler pages dev` against `dist` with local D1 persistence,
sets a temporary `LEAD_REPORT_TOKEN`, starts a local webhook capture endpoint,
runs `npm run qa:lead-flow` against that runtime, verifies
`project_request.created` and `project_request.status_updated` webhook payloads,
and then stops the servers. Use it before preview or production smoke testing
to verify form POST, localized redirect, D1 storage, lead report, lifecycle
status update, webhook delivery, and CSV export in one command.

`npm run qa:lead-flow:remote` is the strict preview/production wrapper. It
requires `LEAD_SMOKE_BASE_URL` or `--base-url`, refuses localhost targets, and
requires `LEAD_REPORT_TOKEN` or `LEAD_SMOKE_REPORT_TOKEN`. It runs the
production env preflight first, then runs the same EN/RU/RO smoke with
`LEAD_SMOKE_REQUIRE_REPORT=1`, so report, status, and CSV export verification
cannot be skipped by accident.

## Public Form Submit UX

All public lead forms use `form[data-conversion-form]` and share one client-side
submit-state controller from `src/layouts/Layout.astro`.

On submit, the controller:

- tracks `form_submit_attempt`;
- sets `data-submit-state="submitting"` and `aria-busy="true"` on the form;
- disables submit buttons and swaps the button label to the form's
  `data-sending-label`;
- writes pending copy into `[data-form-status]`;
- prevents duplicate submit attempts while the first request is in progress;
- resets disabled buttons on browser `pageshow`, including back/forward cache
  restores.

Page-specific scripts should only fill source, UTM, locale, partner/ref, and
offer fields. They should not add their own submit-button disabling logic.

For Cloudflare Pages, make sure the D1 binding is named:

```text
DB
```

Note: `wrangler.toml` should only include the D1 binding after the real
`database_id` is available. A placeholder `database_id` will make Cloudflare
Pages deployment fail during the deploy stage.

## Flow

```text
Form -> /api/start-project -> Cloudflare Pages Function -> D1 -> optional webhook/Telegram -> localized thank-you page
D1 lead -> /api/lead-status -> status/owner/note update + status event -> optional lifecycle webhook/Telegram -> /api/lead-report
Notification attempts -> project_request_notification_events -> /api/lead-report -> /lead-desk/
D1 lead -> /api/lead-export -> CSV export for ops/CRM handoff
```

The form also includes a hidden honeypot field named `company_website`.

## Optional Turnstile Spam Protection

The public intake forms render Cloudflare Turnstile only when this build
variable is set:

```text
PUBLIC_TURNSTILE_SITE_KEY
```

The Pages Function verifies the returned `cf-turnstile-response` only when this
runtime secret is set:

```text
TURNSTILE_SECRET_KEY
```

This keeps local development and existing production forms working until both
keys are configured. Once `TURNSTILE_SECRET_KEY` is present, submissions without
a valid Turnstile response are rejected before they are stored in D1.

Automated smoke tests can include a Turnstile token through:

```text
LEAD_SMOKE_TURNSTILE_TOKEN
```

For preview environments, use Cloudflare's Turnstile test keys if the smoke test
needs to exercise the protected POST path without a browser.

## Intake Variants

The same endpoint supports two public intake variants:

- `start-project`: full project brief on `/start-project/`.
- `quick-intake`: short cold-lead form on `/start-project/` with name, email,
  and one pressure-point field.
- `lp:<slug>:quick`: short campaign-lead form on each `/lp/<slug>/` page with
  name, email, one pressure-point field, and hidden offer defaults.
- `lp:<slug>`: full campaign brief on each `/lp/<slug>/` page.
- `partner-program`: partner/referral intake on `/partner-program/`,
  `/ru/partner-program/`, and `/ro/partner-program/`. It sends
  `landing_offer=partner-program`, `form_variant=partner-program`,
  `lead_channel=partner`, and hidden defaults for partner qualification so
  partner leads enter the same D1/reporting flow without being mixed with
  direct project requests.

Every public lead form also sends `form_variant` so lead operations can compare
the start-project quick intake, full brief, LP quick signal, LP full brief, and
partner form without relying on page paths alone.

The quick forms send hidden defaults for `project_type`, `desired_output`, and
`desired_result` so they can use the same validation and storage path as the
full brief. They still capture source, language, UTM, channel, and partner/ref
attribution fields.

The partner form uses the same validation and Turnstile/honeypot protection as
the other public forms. It captures the partner source through `partner_ref`,
`partner`, `ref`, `affiliate`, or `affiliate_id`, while UTM fields remain
available for campaign-level attribution.

## Optional Quick Contact Channels

Quick direct-contact links are build-time configurable and stay hidden until at
least one contact variable is present:

```text
PUBLIC_CONTACT_EMAIL
PUBLIC_CONTACT_TELEGRAM_URL
PUBLIC_CONTACT_WHATSAPP_URL
```

When configured, the links appear near the start-project quick intake, LP quick
intake, partner intake, and in the footer. Clicks are tracked as
`quick_contact_click` with the selected channel.

## Localized Thank-You Redirects

The function reads `source_path` / `landing_page` and redirects users back to
the matching thank-you page:

- `/start-project/thank-you/`
- `/ru/start-project/thank-you/`
- `/ro/start-project/thank-you/`

After a real stored submission, the redirect includes non-PII conversion
context in query parameters:

- `lead_id`
- `source_path`
- `landing_page`
- `landing_offer`
- `form_variant`
- `locale`
- `lead_channel`
- `partner_ref`
- UTM parameters

The redirect does not include name, email, company, referrer, or project
description fields.

## Attribution Fields

The form and API now store the first-pass attribution context for every lead:

- `locale`: page language at the moment of submission.
- `referrer`: browser referrer for internal QA/reporting.
- `lead_channel`: inferred channel: `direct`, `referral`, `campaign`, `paid`,
  or `partner`.
- `partner_ref`: optional partner/referral code from `partner_ref`, `partner`,
  `ref`, `affiliate`, or `affiliate_id` query parameters.

The API also derives `lead_channel` server-side if the browser did not send it.
Partner attribution is captured on every form and has a dedicated public intake
route through `/partner-program/` for partner traffic.

## Lead Routing Fields

After parsing and attribution, the API derives a first-pass routing model:

- `lead_score`: 0-100 score based on source, offer, company/context fields,
  timeline, budget, integrations, and contact details.
- `lead_priority`: `low`, `medium`, or `high`.
- `routing_bucket`: operational bucket such as `automation`, `content-seo`,
  `data-monitoring`, `ecommerce`, `web-platform`, `quick-diagnostic`,
  `partner`, or `project-scope`.
- `next_action`: suggested internal follow-up action such as
  `prepare_scope_response`, `request_missing_context`,
  `fast_campaign_follow_up`, `qualify_partner_source`, or
  `review_project_request`.

These fields are stored in D1 and included in the optional webhook payload so a
CRM, notification channel, or automation workflow can route the lead without
manually reading the full request first.

## Lead Lifecycle API

Lead status can be updated through a protected endpoint:

```text
POST /api/lead-status
```

It uses the same required token as the lead report:

```text
LEAD_REPORT_TOKEN
```

Access can use either:

```text
Authorization: Bearer <LEAD_REPORT_TOKEN>
```

or a `?token=` query parameter for local smoke tests.

Request body:

```json
{
  "id": "<lead_id>",
  "status": "contacted",
  "owner": "sales",
  "note": "First reply sent.",
  "next_action": "schedule_discovery_call"
}
```

Supported statuses:

- `new`
- `reviewed`
- `contacted`
- `qualified`
- `proposal`
- `won`
- `lost`
- `spam`
- `archived`

The endpoint updates `status`, `lead_owner`, `lead_follow_up_note`,
`next_action`, and `lead_status_updated_at`. It also writes a row to
`project_request_status_events` and returns `status_event` with the previous
status, new status, owner, next action, note, and timestamp. This gives the
site a minimal conversion workflow with an audit trail before a full CRM is
connected.

After the D1 update and status-event insert succeed, `/api/lead-status` can
send the optional lifecycle notification event `project_request.status_updated`
to the same webhook and Telegram destinations used for new lead notifications.
The payload includes `status_event`, current lead routing/source fields, and
`lead_desk_url`, so a CRM, automation workflow, or operator chat can react to
qualified, proposal, won, lost, or archived status changes.

The protected report computes a first-response SLA signal from existing fields,
without another migration. Active leads without `lead_status_updated_at` are
considered untouched. The default first-response windows are:

- `high`: 4 hours;
- `medium`: 12 hours;
- `low`: 24 hours.

Untouched leads move from `on_track` to `due_soon` and then `overdue`; touched
active leads are marked `touched`. Report rows and Lead Desk cards also expose
the computed first-response deadline and remaining/overdue hours, so operators
can see the exact response window without calculating it manually.

## Optional Lead Notifications

The D1 insert remains the source of truth. Notification channels can be added
without changing the form markup. They run after the lead is stored, so a
notification failure does not lose the request.

Cloudflare environment variables:

```text
LEAD_WEBHOOK_URL
LEAD_WEBHOOK_TOKEN
LEAD_TELEGRAM_BOT_TOKEN
LEAD_TELEGRAM_CHAT_ID
LEAD_TELEGRAM_MESSAGE_THREAD_ID
```

When `LEAD_WEBHOOK_URL` is present, the function sends a JSON payload after the
D1 insert succeeds. The payload includes routing fields and a `lead_desk_url`
for the internal operator UI.

When `LEAD_TELEGRAM_BOT_TOKEN` and `LEAD_TELEGRAM_CHAT_ID` are present, the
function also sends a compact Telegram message with priority, route, contact,
source, UTM, partner/ref code, problem, desired result, and a Lead Desk link.
`LEAD_TELEGRAM_MESSAGE_THREAD_ID` is optional for Telegram forum topics.

The same channel set is also reused by `/api/lead-status` for lifecycle
changes. Status notifications are sent only after the D1 status update and
`project_request_status_events` insert succeed; delivery errors are logged but
do not roll back or hide the saved status update.

When webhook or Telegram delivery is attempted, the result is recorded in
`project_request_notification_events` with event type, channel, delivery status,
HTTP/API status code, optional error message, and timestamp. Skipped channels
are not stored. This keeps delivery failures visible in `/api/lead-report` and
`/lead-desk/` without making notification delivery the source of truth.

## Protected Lead Report API

The site also exposes a protected JSON report endpoint:

```text
GET /api/lead-report
```

Required Cloudflare environment variable:

```text
LEAD_REPORT_TOKEN
```

Access can use either an authorization header:

```text
Authorization: Bearer <LEAD_REPORT_TOKEN>
```

or a `?token=` query parameter for simple smoke tests. The endpoint returns
`503` when `LEAD_REPORT_TOKEN` is not configured and `401` when the token is
wrong.

The report includes:

- total leads, new leads, and average score;
- overdue and due-soon first-response counts;
- stale and due-soon follow-up counts for active leads that were already
  touched but may be waiting too long for the next operator action;
- active, contacted, qualified, proposal, won, lost, closed, and qualified+
  pipeline totals for quick conversion health checks;
- breakdowns by `status`, `lead_channel`, `lead_priority`, `routing_bucket`,
  `locale`, `landing_offer`, `form_variant`, `utm_source`, `utm_medium`,
  `utm_campaign`, `partner_ref`, response SLA, and follow-up SLA;
- partner rows include active lead count and average score so referral sources
  can be compared before a dedicated partner CRM exists;
- `partner_performance` summarizes partner leads by total, active,
  contacted, qualified+, proposal, won/lost, unknown ref count, average score,
  and source-level performance;
- `source_performance` compares channels, offers, form variants, UTM sources,
  and UTM campaigns by total, active, contacted, qualified+, proposal,
  won/lost, latest lead time, and average score;
- an `action_queue` ordered by priority, score, and oldest untouched active
  lead, including first-response due time and remaining/overdue hours;
- the latest leads with source, attribution, routing, and next-action fields;
- `status_events`, the latest lifecycle status changes joined back to lead
  source, offer, priority, bucket, and partner/ref context.
- `notification_events`, the latest webhook/Telegram delivery attempts joined
  back to lead source, offer, priority, bucket, and partner/ref context.

Useful report filters:

- `status`: one lifecycle status such as `new`, `contacted`, `qualified`,
  `proposal`, `won`, or `lost`.
- `channel`: `direct`, `referral`, `campaign`, `paid`, or `partner`.
- `locale`: `en`, `ru`, or `ro`.
- `priority`: `low`, `medium`, or `high`.
- `bucket`: exact `routing_bucket`.
- `offer`: exact `landing_offer`.
- `form_variant`: exact form variant such as `quick-intake`, `start-project`,
  `lp:ai-content-workflow`, or `partner-program`.
- `utm_source`, `utm_medium`, `utm_campaign`: exact campaign attribution values
  for working or exporting a specific traffic source.
- `partner_ref`: exact partner/referral code.
- `owner`: exact current `lead_owner`.
- `created_from` / `created_to`: date or ISO timestamp bounds for the lead
  `created_at` field. A `YYYY-MM-DD` value is expanded to the start or end of
  that UTC day.
- `follow_up_sla`: `stale`, `due_soon`, `on_track`, `not_started`, or
  `closed`.
- `needs_owner=1`: active leads that do not yet have an owner.
- `needs_next_action=1`: active leads that do not yet have a next action.

These filters affect totals, breakdowns, the active action queue, and recent
leads. Lead Desk uses the same filters for the visible report and CSV export so
an operator can work a specific queue before downloading it.

By default, the report excludes smoke-test leads created by `npm run
qa:lead-flow` (`lead-smoke-*`, `smoke-lead-*`, and `lead-smoke-*` campaigns).
Pass `include_test=1` when you intentionally want QA submissions in the report.

The response is `no-store` so browsers and proxies do not cache lead data.

## Protected Lead CSV Export

The site also exposes a protected CSV export endpoint:

```text
GET /api/lead-export
```

It uses the same `LEAD_REPORT_TOKEN` access model as `/api/lead-report` and
`/api/lead-status`.

Useful query parameters:

- `limit`: 1-500 rows, default `200`.
- `include_test=1`: include smoke-test leads.
- `status`: one lifecycle status such as `new`, `contacted`, `qualified`,
  `proposal`, `won`, or `lost`.
- `channel`: `direct`, `referral`, `campaign`, `paid`, or `partner`.
- `locale`: `en`, `ru`, or `ro`.
- `priority`: `low`, `medium`, or `high`.
- `bucket`: exact `routing_bucket`.
- `offer`: exact `landing_offer`.
- `form_variant`: exact form variant.
- `utm_source`, `utm_medium`, `utm_campaign`: exact campaign attribution
  values.
- `partner_ref`: exact partner/referral code.
- `owner`: exact current `lead_owner`.
- `created_from` / `created_to`: date or ISO timestamp bounds for exporting a
  period-specific handoff.
- `follow_up_sla`: `stale`, `due_soon`, `on_track`, `not_started`, or
  `closed`.
- `needs_owner=1`: active leads that do not yet have an owner.
- `needs_next_action=1`: active leads that do not yet have a next action.

The CSV includes source, attribution, routing, response SLA, response deadline,
remaining/overdue hours, follow-up SLA, owner/next-action gap flags,
lifecycle, project context, and follow-up note fields. It gives the team a
reliable export path before a full CRM or webhook destination is finalized.

## Protected Lead Desk UI

The static internal page `/lead-desk/` wraps the protected lead operations API
in a browser UI. It is not linked from public navigation and uses
`noindex, nofollow`.

The page lets an operator:

- enter `LEAD_REPORT_TOKEN` into session storage;
- load `/api/lead-report` through an `Authorization: Bearer <token>` header;
- review totals, pipeline conversion counts, overdue/due-soon counts,
  source/status/offer/partner/SLA breakdowns, active queue, and recent leads;
- see each queue lead's first-response due time and remaining/overdue hours;
- filter the visible report and CSV export by status, channel, locale, priority,
  bucket, offer, form variant, UTM source/medium/campaign, partner/ref, owner,
  created date range, response SLA, follow-up SLA, owner gap, next-action gap,
  and smoke-test visibility;
- use quick filters for overdue, due-soon, stale follow-up, follow-up due soon,
  last 7 days, last 30 days, new, unassigned, no-next-action, partner leads,
  and EN/RU/RO locale queues from the operator focus panel;
- read the lead's business problem, desired result, output, integrations,
  budget, timeline, and contact details directly in the active queue;
- open a mailto follow-up or copy a compact lead summary from each queue card;
- update lead lifecycle state through `/api/lead-status`;
- review recent lifecycle status events from `status_events`;
- review recent notification delivery events from `notification_events`;
- download `/api/lead-export` as a CSV file without placing the token in a
  URL, including optional partner-ref filtering.

The page is a lightweight operations bridge before a full CRM is connected. It
does not replace the D1 database as the source of truth.

## Lead Flow Smoke Test

The repository includes an automated EN/RU/RO lead flow smoke test:

```bash
npm run qa:lead-flow
```

For local verification without manually starting Pages runtime first, use:

```bash
npm run qa:lead-flow:local
```

This wrapper builds the static output, starts `wrangler pages dev` on a free
local port starting at `8788`, injects a temporary `LEAD_REPORT_TOKEN`, runs the
same smoke flow, and shuts the runtime down.

Before running the smoke against preview or production, run:

```bash
npm run qa:lead-env
```

That command verifies that the environment is actually ready for lead handling:
Lead Desk/report token, notification delivery, analytics, quick contacts, and
Turnstile consistency.

By default it posts to `http://127.0.0.1:8788`. Use `LEAD_SMOKE_BASE_URL` to
target a Cloudflare preview or production URL:

```bash
LEAD_SMOKE_BASE_URL=https://example.pages.dev npm run qa:lead-flow
```

For preview/production handoff, prefer the stricter wrapper:

```bash
npm run qa:lead-flow:remote -- --base-url https://example.pages.dev --env-file .env.production.local
```

If `LEAD_REPORT_TOKEN` or `LEAD_SMOKE_REPORT_TOKEN` is set, the smoke test also
queries `/api/lead-report?include_test=1` and verifies the newly submitted test
leads appear in the protected report. It also updates one smoke lead through
`/api/lead-status` and verifies lifecycle status, owner, status event history,
notification delivery history when `LEAD_SMOKE_EXPECT_NOTIFICATION_EVENTS=1`,
status breakdown, offer breakdown, partner-ref breakdown, response SLA
breakdown, response SLA filtering, conversion pipeline totals, and action queue
in the report, including first-response due time, remaining/overdue hours,
follow-up SLA filtering, owner filtering, and owner-gap filtering. The same run
verifies
`/api/lead-export` returns CSV with the smoke leads, lifecycle fields, response
SLA fields, response deadline columns, follow-up SLA columns,
owner/next-action gap columns, partner-ref filtering, owner-gap filtering,
follow-up SLA filtering, and response SLA filtering.

The test creates three QA leads: EN direct/campaign, RU content workflow, and RO
partner/referral. This is intentional; run it only against environments where
test submissions can be stored and cleaned up later if needed.
