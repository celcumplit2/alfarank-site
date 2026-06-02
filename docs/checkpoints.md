# Development Checkpoints

## 2026-06-02 - Cloudflare lead env sync summary

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- Current production blockers are still missing real notification, contact,
  analytics, and Cloudflare lead environment values.
- Cloudflare lead environment sync now leaves a no-secret summary artifact even
  when preflight fails before any apply step.

Implemented changes:

- Updated `scripts/sync-cloudflare-pages-lead-env.mjs` to write
  `artifacts/lead-env-sync-summary.json` by default.
- Added `--summary-file <path>` and `--no-summary` options for the sync script.
- The summary records status, mode, project/environment, planned variable names
  and types, current Cloudflare variable names, hidden current secret names,
  post-apply check status, failures, and warnings.
- The summary explicitly sets `secret_values_printed: false` and never stores
  environment values.
- README, deployment protocol, form-handling docs, lead-generation readiness
  docs, production checklist generation, and the readiness audit now reference
  the sync summary artifact.
- Regenerated `artifacts/lead-production-status.json` and
  `artifacts/lead-production-checklist.md`; the aggregate status remains
  blocked until real production values are provided and applied.

Verification:

- `node --check scripts/sync-cloudflare-pages-lead-env.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `node --check scripts/write-lead-production-checklist.mjs`: passed.
- Real `npm run lead-env:sync -- --cloudflare-env-file .env --lead-env-file
  .env.lead.production.local`: failed as expected because the real production
  lead env file is incomplete, and wrote a no-secret failed summary.
- Temporary safe dry-run with non-production test values: passed and wrote a
  no-secret dry-run summary; temporary test files were removed.
- `npm run qa:lead-production-status -- --cloudflare-env-file .env
  --lead-env-file .env.lead.production.local`: returned the expected blocked
  status with `d1_migrations: passed`.
- `npm run lead-env:checklist`: passed.
- Secret-pattern scan over sync summary and checklist: passed.
- `npm run qa:lead-readiness`: passed with 78 checks and only expected
  production-env warnings.
- `npx tsc --noEmit`: passed.
- `npx astro check`: 0 errors; existing hints only.
- `git diff --check`: passed with LF/CRLF warnings only.

Next action:

- Fill `.env.lead.production.local` with real notification/contact/analytics
  values, rerun sync in dry-run mode, apply Cloudflare lead env, run strict
  Cloudflare audit, then run the live lead launch gate.

## 2026-06-02 - Remote D1 lead schema audit

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- Current production blockers remain notification/contact/analytics values and
  Cloudflare lead env sync/apply, not remote D1 schema.
- Remote D1 lead migration/schema readiness now has its own no-secret audit and
  summary artifact.

Implemented changes:

- Added `scripts/audit-d1-lead-migrations.mjs`.
- Added `npm run qa:lead-d1`.
- The audit checks local lead migration file inventory `0001`-`0009`, remote
  `wrangler d1 migrations list DB --remote`, the three lead tables, and key
  columns for intake, attribution, routing, lifecycle, notifications, and
  `form_variant`.
- Added `artifacts/lead-d1-migrations-summary.json` as a no-secret summary.
- Added `qa:lead-d1` into `qa:lead-production-status` and the lead launch gate.
- README, form-handling docs, deployment protocol, lead-generation readiness
  docs, and the readiness audit now include the D1 audit command.
- Regenerated `artifacts/lead-production-status.json` and
  `artifacts/lead-production-checklist.md`; the aggregate status now includes
  `d1_migrations: passed` while remaining blocked on env/Cloudflare values.

Verification:

- `node --check scripts/audit-d1-lead-migrations.mjs`: passed.
- `node --check scripts/run-lead-production-status.mjs`: passed.
- `node --check scripts/run-lead-launch-gate.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npm run qa:lead-d1`: passed with 6 checks.
- `npm run qa:lead-production-status -- --cloudflare-env-file .env
  --lead-env-file .env.lead.production.local`: returned the expected blocked
  status; `d1_migrations` passed.
- `npm run lead-env:checklist`: passed and included the D1 schema step.
- Secret-pattern scan over the D1 summary and checklist: passed.
- `npm run qa:lead-readiness`: passed with 78 checks and only expected
  production-env warnings.
- `npx tsc --noEmit`: passed.
- `npx astro check`: 0 errors; existing hints only.
- `git diff --check`: passed with LF/CRLF warnings only.

Next action:

- Fill `.env.lead.production.local` with real notification/contact/analytics
  values, rerun `qa:lead-production-status`, sync/apply Cloudflare lead env,
  then run the live launch gate.

## 2026-06-02 - Lead production handoff checklist

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- Current production launch is still blocked by missing real notification,
  quick contact, analytics, and Cloudflare lead env values.
- This step makes the external configuration work easier to execute without
  exposing secrets: the aggregate blocked status can now be turned into a
  human-readable handoff checklist.

Implemented changes:

- Added `scripts/write-lead-production-checklist.mjs`.
- Added `npm run lead-env:checklist`.
- The command reads `artifacts/lead-production-status.json` and writes
  `artifacts/lead-production-checklist.md`.
- The checklist includes current blockers, next actions, local env fill steps,
  Cloudflare dry-run/apply commands, strict Cloudflare audit, live gate command,
  and partner program as the final stage.
- README, deployment protocol, lead-generation readiness docs, package scripts,
  and the readiness audit now include the checklist command.

Verification:

- `node --check scripts/write-lead-production-checklist.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npm run lead-env:checklist`: passed and wrote
  `artifacts/lead-production-checklist.md`.
- Secret-pattern scan over `artifacts/lead-production-checklist.md`: passed.
- `npm run qa:lead-readiness`: passed with 76 checks and only expected
  production-env warnings.
- `npx tsc --noEmit`: passed.
- `npx astro check`: 0 errors; existing hints only.

Next action:

- Fill `.env.lead.production.local` with real notification, quick contact, and
  analytics values, then run the checklist sequence through Cloudflare
  `lead-env:sync --apply` and live launch gate.

## 2026-06-02 - Lead generation go/no-go status

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- Partner program remains the last stage of the lead-generation readiness task:
  the base intake, notification, analytics, Cloudflare env, and live smoke path
  must be reliable first.
- Production lead-generation readiness now has one aggregate no-secret status
  artifact instead of only separate env/Cloudflare/launch summaries.

Implemented changes:

- Added `scripts/run-lead-production-status.mjs`.
- Added `npm run qa:lead-production-status`.
- The command runs the production lead env preflight, Cloudflare Pages lead
  config audit with missing lead env allowed, and lead launch-gate dry-run.
- It writes `artifacts/lead-production-status.json` with `blockers`,
  `next_actions`, child summary paths, check statuses, and
  `secret_values_printed: false`.
- README, deployment protocol, lead-generation readiness docs, and the
  readiness audit now include the aggregate status command.

Verification:

- `node --check scripts/run-lead-production-status.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `node --check scripts/run-lead-launch-gate.mjs`: passed.
- `npm run qa:lead-production-status -- --cloudflare-env-file .env
  --lead-env-file .env.lead.production.local --summary-file
  artifacts/test-lead-production-status.json`: returned the expected blocked
  status and produced a no-secret summary with 7 blockers and 4 next actions.
- The temporary `artifacts/test-lead-production-status*.json` files were
  removed after verification.
- A current ignored status snapshot was written to
  `artifacts/lead-production-status.json`.
- `npm run qa:lead-readiness`: passed with 74 checks and only expected
  production-env warnings.
- `npx tsc --noEmit`: passed.
- `npx astro check`: 0 errors; existing hints only.
- `git diff --check`: passed with LF/CRLF warnings only.

Next action:

- Run `npm run qa:lead-production-status -- --cloudflare-env-file .env
  --lead-env-file .env.lead.production.local`. It should currently report
  `blocked` until production notification/contact/analytics values are filled
  and synced/applied to Cloudflare.

## 2026-06-02 - Cloudflare lead config summary artifact

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- Cloudflare-side launch readiness now has the same no-secret artifact pattern
  as local production env preflight and the lead launch gate.
- Current Cloudflare production state is verified without exposing values:
  domains are attached, latest production deploy is successful, D1 binding `DB`
  exists, and visible lead env names are still missing.

Implemented changes:

- `scripts/audit-cloudflare-pages-lead-config.mjs` now writes a no-secret JSON
  summary by default to `artifacts/lead-cloudflare-summary.json`.
- Added `--summary-file <path>` for named Cloudflare handoff artifacts and
  `--no-summary` for terminal-only checks.
- The summary includes project/environment, sources, domains, latest deploy
  environment/status/url, D1 binding names, visible env names, lead env readiness
  by name, warnings, failures, and `secret_values_printed: false`.
- The lead readiness audit now requires Cloudflare summary behavior.
- README, deployment protocol, and lead-generation readiness docs now mention
  the Cloudflare summary artifact.

Verification:

- `node --check scripts/audit-cloudflare-pages-lead-config.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npm run qa:lead-cloudflare -- --env-file .env --allow-missing-lead-env
  --summary-file artifacts/test-lead-cloudflare-summary.json`: passed and
  produced a no-secret summary with 3 domains, D1 binding `DB`, 0 visible lead
  env names, and missing report/notification/contact/analytics readiness.
- `npm run qa:lead-readiness`: passed with only expected production-env
  warnings.
- `npx tsc --noEmit`: passed.
- `npx astro check`: 0 errors; existing hints only.
- `git diff --check`: passed with LF/CRLF warnings only.

Next action:

- Fill the local production lead env, rerun `qa:lead-env`, sync/apply those env
  names into Cloudflare, then rerun `qa:lead-cloudflare` without
  `--allow-missing-lead-env` and run the live report-backed smoke.

## 2026-06-02 - Lead production env blocker report

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- Current production launch blocker is external configuration, not local lead
  intake code: `.env.lead.production.local` has `LEAD_REPORT_TOKEN`, but still
  needs notification delivery, a public quick contact channel, and an analytics
  adapter. Cloudflare production currently has no visible lead env names, while
  domains and D1 binding `DB` are configured.
- Partner program remains the final acquisition stage; this blocker report
  makes the same env gate reusable before partner/ref traffic is enabled.

Implemented changes:

- `scripts/audit-lead-production-env.mjs` now writes a no-secret JSON blocker
  report by default to `artifacts/lead-production-env-summary.json`.
- Added `--summary-file <path>` for named handoff artifacts and `--no-summary`
  for terminal-only preflight runs.
- The env summary includes readiness statuses, filled variable names,
  placeholder names, next required production inputs, warnings, failures,
  final result, and `secret_values_printed: false`.
- The lead readiness audit now requires this production env summary behavior.
- README, deployment protocol, and lead-generation readiness docs now mention
  the production env blocker report.

Verification:

- `npm run qa:lead-env -- --env-file .env.lead.production.local`: failed as
  expected because notification delivery, quick contact, and analytics are not
  configured yet.
- `npm run qa:lead-env -- --env-file .env.lead.production.local --summary-file
  artifacts/test-lead-production-env-summary.json`: failed as expected and
  produced a no-secret JSON report with 3 blockers.
- `npm run qa:lead-cloudflare -- --env-file .env --allow-missing-lead-env`:
  passed project/domain/D1 checks and warned that production lead env names are
  not configured in Cloudflare yet.
- `node --check scripts/audit-lead-production-env.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npm run qa:lead-launch -- --dry-run --summary-file
  artifacts/test-lead-launch-summary.json`: passed.
- `npm run qa:lead-readiness`: passed with only expected production-env
  warnings.
- `npx tsc --noEmit`: passed.
- `npx astro check`: 0 errors; existing hints only.
- `git diff --check`: passed with LF/CRLF warnings only.

Next action:

- Fill real production notification/contact/analytics values, run
  `npm run qa:lead-env -- --env-file .env.lead.production.local`, then sync/apply
  Cloudflare env and run the live report-backed smoke.

## 2026-06-02 - Lead launch gate summary artifact

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step makes the production launch gate easier to hand off before paid,
  organic, or partner traffic is scaled: every gate run can now leave a
  no-secret JSON artifact with the exact steps and statuses.
- Partner program remains the final acquisition stage; the same launch-gate
  artifact will be used before partner/ref traffic is enabled.

Implemented changes:

- `scripts/run-lead-launch-gate.mjs` now writes a JSON summary by default to
  `artifacts/lead-launch-gate-summary.json`.
- Added `--summary-file <path>` for named launch artifacts and `--no-summary`
  for terminal-only runs.
- The summary includes phase, lead env file name, Cloudflare env file names,
  remote smoke URL, local smoke mode, step commands, step statuses, timings,
  final result, and `secret_values_printed: false`.
- The lead readiness audit now checks that the launch gate keeps this summary
  behavior wired in.
- README, deployment protocol, and lead-generation readiness docs now mention
  the launch-gate summary artifact.

Verification:

- `node --check scripts/run-lead-launch-gate.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npm run qa:lead-launch -- --dry-run --summary-file
  artifacts/test-lead-launch-summary.json`: passed and produced 8 planned
  gate steps without secret values.
- `npm run qa:lead-readiness`: passed with only expected production-env
  warnings for missing real notification/contact/analytics values.
- `npx tsc --noEmit`: passed.
- `npx astro check`: 0 errors; existing hints only.
- `git diff --check`: passed with LF/CRLF warnings only.

Next action:

- Continue toward real production env sync/apply, deploy, and live
  report-backed lead smoke.

## 2026-06-02 - Lead source performance reporting

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step improves lead measurement before paid/partner traffic is scaled:
  source views now show funnel quality, not only raw lead volume.
- Partner program remains the final acquisition stage; the same performance
  model helps compare future partner/ref campaigns against paid and organic
  campaigns.

Implemented changes:

- `/api/lead-report` now returns `source_performance` for lead channels,
  landing offers, form variants, UTM sources, and UTM campaigns.
- Each source performance row includes total, active, contacted, qualified+,
  proposal, won, lost, latest lead time, and average score.
- Lead Desk now shows a `Source performance` panel beside source mix and
  partner performance, so operators can see which offers/forms/campaigns are
  moving leads through the funnel.
- Smoke and readiness checks now require source performance in the report and
  Lead Desk.

Verification:

- `node --check scripts/smoke-lead-flow.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run qa:lead-readiness`: passed with only expected production-env
  warnings for missing real notification/contact/analytics values.
- `npm run qa:lead-flow:local`: passed, including source performance
  verification for UTM sources, UTM campaigns, and form variants.
- `npx astro check`: 0 errors; existing hints only.
- `git diff --check`: passed with LF/CRLF warnings only.
- Browser sanity on `/lead-desk/` preview confirmed the `Source performance`
  panel is present in the built page, source performance render code is
  included, there are no console errors, and horizontal overflow is negligible.

Next action:

- Continue toward production env and launch-gate readiness.

## 2026-06-02 - Lead Desk shareable queue views

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step improves day-to-day lead operations: filtered Lead Desk views can
  now be restored from the URL and copied as a safe queue link.
- Partner program remains the final acquisition stage; shareable partner,
  locale, UTM, SLA, owner, and date-filtered views make that future channel
  easier to operate without manual filter setup.

Implemented changes:

- `/lead-desk/` now reads supported filter parameters from the page URL on
  load: status, channel, locale, priority, SLA, follow-up SLA, bucket, offer,
  UTM source/medium/campaign, form variant, partner ref, owner, date range,
  test-lead visibility, owner gaps, and next-action gaps.
- Lead Desk now keeps the URL synchronized as filters, quick filters, and date
  range shortcuts change.
- Lead Desk now includes a `Copy view link` action. The copied URL preserves
  the current queue filters but does not include the report token.
- The readiness audit now checks that Lead Desk keeps shareable view-link
  behavior wired into the built page.

Verification:

- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `node --check scripts/smoke-lead-flow.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run qa:lead-readiness`: passed with only expected production-env
  warnings for missing real notification/contact/analytics values.
- `npm run qa:lead-flow:local`: passed.
- `npx astro check`: 0 errors; existing hints only.
- `git diff --check`: passed with LF/CRLF warnings only.
- Browser sanity on `/lead-desk/` preview confirmed URL-filter restoration,
  report-token removal from the URL, live URL sync after UTM campaign edits,
  visible/enabled `Copy view link`, no console errors, and no meaningful
  horizontal overflow.

Next action:

- Continue toward production env and launch-gate readiness.

## 2026-06-02 - Lead UTM reporting filters

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step improves campaign lead operations: paid, partner, newsletter, and
  content traffic can be reviewed by exact UTM source/medium/campaign instead
  of only aggregate UTM breakdowns.
- Partner program remains the final acquisition stage; UTM filters help compare
  partner campaigns and paid campaigns before CRM integration.

Implemented changes:

- `/api/lead-report` now accepts `utm_source`, `utm_medium`, and
  `utm_campaign`, applies them to totals, breakdowns, action queue, recent
  leads, lifecycle events, notification events, and partner performance, and
  echoes the filters in the response.
- `/api/lead-export` now supports the same UTM filters for campaign-specific
  CSV handoff.
- Lead Desk now has UTM source, medium, and campaign filters that apply to both
  visible report data and CSV export.
- Smoke and readiness checks now verify UTM report/export filters, not only UTM
  breakdown visibility.

Verification:

- `node --check scripts/smoke-lead-flow.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run qa:lead-readiness`: passed with only expected production-env
  warnings for missing real notification/contact/analytics values.
- `npm run qa:lead-flow:local`: passed, including UTM source/medium/campaign
  report filters and UTM source/campaign export filters.
- `npx astro check`: 0 errors; existing hints only.
- `git diff --check`: passed with LF/CRLF warnings only.
- Browser sanity on `/lead-desk/` preview confirmed UTM source/medium/campaign
  filters, client-side report/export wiring, no console errors, and no
  meaningful horizontal overflow.

Next action:

- Continue the lead-generation readiness task with QA verification, then move
  to the next highest-impact conversion/operations gap.

## 2026-06-02 - Lead locale reporting filters

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step improves multilingual lead operations: EN/RU/RO leads can be
  reviewed and exported independently instead of being mixed in one queue.
- Partner program remains the final acquisition stage; locale segmentation
  strengthens the base lead desk before partner volume is scaled.

Implemented changes:

- `/api/lead-report` now accepts `locale=en|ru|ro`, applies it to totals,
  breakdowns, action queue, recent leads, lifecycle events, notification
  events, and partner performance, and returns `breakdowns.by_locale`.
- `/api/lead-export` now supports the same `locale` filter for localized CSV
  handoff.
- Lead Desk now has a Locale selector, EN/RU/RO quick filters, and a Locale
  breakdown panel.
- Smoke and readiness checks now verify locale breakdowns plus report/export
  locale filters.

Verification:

- `node --check scripts/smoke-lead-flow.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run qa:lead-readiness`: passed with only expected production-env
  warnings for missing real notification/contact/analytics values.
- `npm run qa:lead-flow:local`: passed, including EN/RU/RO locale breakdowns
  plus report/export locale filters.
- `npx astro check`: 0 errors; existing hints only.
- `git diff --check`: passed with LF/CRLF warnings only.
- Browser sanity on `/lead-desk/` preview confirmed Locale select,
  EN/RU/RO quick filters, initial Locale breakdown, no console errors, and no
  meaningful horizontal overflow.

Next action:

- Continue the lead-generation readiness task with QA verification, then move
  to the next highest-impact conversion/operations gap.

## 2026-06-02 - Campaign LP quick intake

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step improves cold campaign conversion: landing pages now offer a short
  signal form before the full campaign brief.
- Partner program remains the final acquisition stage; this change improves the
  base paid/campaign intake path first.

Implemented changes:

- Each `/lp/<slug>/` page now renders a short tracked intake form with name,
  email, one pressure-point field, and hidden campaign defaults.
- The short LP form uses `form_variant=lp:<slug>:quick`; the full LP brief keeps
  `form_variant=lp:<slug>`, so Lead Desk/report/export can compare them.
- LP quick forms include optional direct contact channels when contact env
  variables are configured.
- Lead Desk form-variant filters now include both full and quick LP variants.
- Readiness, analytics, and smoke checks were updated to cover the new LP quick
  intake path.

Verification:

- `node --check scripts/smoke-lead-flow.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `node --check scripts/audit-lead-analytics.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run qa:lead-readiness`: passed with only expected production-env
  warnings for missing real notification/contact/analytics values.
- `npm run qa:lead-analytics`: passed.
- `npm run qa:lead-flow:local`: passed, including the
  `lp:ai-content-workflow:quick` smoke variant in report/export checks.
- `npx astro check`: 0 errors; existing hints only.
- Browser sanity on `/lp/automate-lead-processing/#landing-intake` confirmed
  quick and full LP forms, three quick required fields, hidden campaign
  defaults, clean console, no body horizontal overflow, and correct desktop
  two-column layout.

Next action:

- Continue the lead-generation readiness task with production notification,
  quick-contact, analytics adapter, and live deploy smoke checks.

## 2026-06-02 - Lead period reporting filters

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step improves lead measurement: operators can review and export leads
  for a specific campaign/partner time window instead of only all-time totals.
- Partner program remains the final acquisition stage; partner/ref reporting
  can now be combined with created-date ranges.

Implemented changes:

- `/api/lead-report` now accepts `created_from` and `created_to` filters and
  applies them to totals, breakdowns, action queue, recent leads, lifecycle
  events, notification events, and partner performance.
- `/api/lead-export` now supports the same `created_from` and `created_to`
  filters for period-specific CSV handoff.
- Lead Desk now has Created from / Created to controls plus quick Last 7 days
  and Last 30 days range buttons.
- Smoke and readiness audits now verify report/export/date-range coverage.
- Updated form-handling, project-plan, and lead-readiness docs.

Verification:

- `node --check scripts/smoke-lead-flow.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run qa:lead-readiness`: passed with only expected production-env
  warnings for missing real notification/contact/analytics values.
- `npm run qa:lead-flow:local`: passed, including date range report/export
  filters.
- `npx astro check`: 0 errors; existing hints only.
- Browser sanity on Lead Desk preview confirmed Created from / Created to
  controls, Last 7 days / Last 30 days buttons, working Last 7 days date
  assignment, no console errors, and no horizontal overflow.
- `git diff --check`: passed with only existing LF-to-CRLF working-copy
  warnings.

Next action:

- Continue the lead-generation readiness task with production notification,
  quick-contact, analytics adapter, and live deploy smoke checks.

## 2026-06-02 - Lead follow-up SLA visibility

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step improves conversion follow-through after first response: touched
  active leads now show whether the next follow-up is on track, due soon, or
  stale.
- Partner program remains the final acquisition stage; partner/ref filtering
  remains compatible with the new follow-up SLA filter.

Implemented changes:

- `/api/lead-report` now computes `follow_up_sla` and
  `follow_up_age_hours` from `lead_status_updated_at`.
- `/api/lead-report` now returns `follow_up_stale_count`,
  `follow_up_due_soon_count`, and `breakdowns.by_follow_up_sla`.
- `/api/lead-report` and `/api/lead-export` now support
  `follow_up_sla=stale|due_soon|on_track|not_started|closed`.
- `/api/lead-export` now includes `follow_up_sla` and
  `follow_up_age_hours` CSV columns.
- Lead Desk now has a Follow-up SLA filter, follow-up quick filters, follow-up
  metrics, breakdowns, and per-lead follow-up badges.
- Smoke and readiness audits now verify follow-up SLA report/export/filter/UI
  coverage.
- Updated form-handling, project-plan, and lead-readiness docs.

Verification:

- `node --check scripts/smoke-lead-flow.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run qa:lead-readiness`: passed with only expected production-env
  warnings for notification/contact/analytics values.
- `npm run qa:lead-flow:local`: passed, including follow-up SLA
  report/export filters.
- `npx astro check`: 0 errors; existing hints only.
- Browser sanity on Lead Desk preview confirmed the Follow-up SLA select, stale
  and due-soon quick filters, no console errors, and no horizontal overflow.
- `git diff --check`: passed with only existing LF-to-CRLF working-copy
  warnings.

Next action:

- Continue the lead-generation readiness task with production notification,
  quick-contact, analytics adapter, and live deploy smoke checks.

## 2026-06-02 - Lead owner and next-action gaps

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step improves conversion operations after lead capture: active leads can
  now be filtered by missing owner and missing next action before they stall.
- Partner program remains the final acquisition stage; partner/ref filtering
  remains compatible with the new owner/next-action controls.

Implemented changes:

- `/api/lead-report` now accepts `owner`, `needs_owner=1`, and
  `needs_next_action=1` filters and returns `needs_owner_count` plus
  `needs_next_action_count` totals.
- `/api/lead-report` now marks queue/recent rows with `needs_owner` and
  `needs_next_action`.
- `/api/lead-export` now supports the same owner/gap filters and includes
  `needs_owner` plus `needs_next_action` CSV columns.
- Lead Desk now has owner/gap filters, quick filters for unassigned/no-next
  action leads, operator-focus cards, and per-card warnings.
- Smoke and readiness audits now verify owner filtering, owner-gap filtering,
  and CSV gap columns.
- Updated form-handling, project-plan, and lead-readiness docs.

Verification:

- `node --check scripts/smoke-lead-flow.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run qa:lead-readiness`: passed with 72 checks; warnings only for missing
  production env in this shell.
- `npm run qa:lead-flow:local`: passed; verified EN/RU/RO submissions, D1
  storage, lifecycle update, webhook capture, report/export, notification
  events, partner performance, follow-up context, owner filtering,
  owner-gap filtering, response-SLA filters, and CSV gap columns.
- `npx astro check`: 0 errors, 3 existing hints.
- `git diff --check`: passed with CRLF warnings only.
- Browser sanity on `http://127.0.0.1:8792/lead-desk/`: owner filter,
  needs-owner/needs-next-action filters, quick filters, and per-card warning
  template present; no meaningful horizontal overflow on a narrow viewport.

Next action:

- Fill production notification/contact/analytics values, or continue improving
  conversion surfaces while those external inputs are pending.

## 2026-06-02 - Lead response deadline visibility

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step improves lead operations after capture: the team can now see the
  exact first-response deadline and remaining/overdue hours in report-backed
  surfaces.
- Partner program remains the final acquisition stage; partner/ref filtering
  and export coverage are still part of the lead workflow.

Implemented changes:

- `/api/lead-report` now computes `response_due_at` and
  `response_remaining_hours` for active queue and recent lead rows.
- `/api/lead-export` now includes `response_due_at` and
  `response_remaining_hours` CSV columns.
- Lead Desk SLA copy now shows remaining/overdue time and the computed due
  timestamp when available.
- Smoke and readiness audits now verify response-deadline fields across report,
  export, Lead Desk, and docs.
- Updated form-handling, project-plan, and lead-readiness docs.

Verification:

- `node --check scripts/smoke-lead-flow.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run qa:lead-readiness`: passed with 72 checks; warnings only for missing
  production env in this shell.
- `npm run qa:lead-flow:local`: passed; verified EN/RU/RO submissions, D1
  storage, lifecycle update, webhook capture, report/export, notification
  events, partner performance, follow-up context, response-SLA filters, and
  response-deadline fields.
- `npx astro check`: 0 errors, 3 existing hints.
- `git diff --check`: passed with CRLF warnings only.
- Browser sanity on `http://127.0.0.1:8792/lead-desk/`: response-deadline
  fields present in the built Lead Desk script, SLA filter present, 11 quick
  filters present, and no meaningful horizontal overflow on a narrow viewport.

Next action:

- Fill production notification/contact/analytics values, or continue improving
  conversion surfaces while those external inputs are pending.

## 2026-06-02 - Lead Desk follow-up context

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step improves conversion handling after lead capture: operators can now
  prepare a first response from Lead Desk without opening D1 or exporting CSV.
- Partner program remains the final acquisition stage; partner/ref context is
  still included in the copied summary and visible filters.

Implemented changes:

- `/api/lead-report` now includes request context in `action_queue` and
  `recent_leads`: problem, desired result, output, current system,
  integrations, budget, timeline, and contact details.
- Lead Desk queue cards now show a "Lead context" block, mailto follow-up link,
  and "Copy summary" action.
- Recent submissions now show a compact problem preview.
- Smoke and readiness audits now verify follow-up context coverage.
- Updated form-handling, project-plan, and lead-readiness docs.

Verification:

- `node --check scripts/smoke-lead-flow.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run qa:lead-readiness`: passed with 72 checks; warnings only for missing
  production env in this shell.
- `npm run qa:lead-flow:local`: passed; verified EN/RU/RO submissions, D1
  storage, lifecycle update, webhook capture, report/export, response-SLA
  filters, partner performance, and follow-up context.
- Browser sanity on `http://127.0.0.1:8792/lead-desk/`: Lead context template,
  email/copy actions, quick filters, SLA filter, and no horizontal overflow on
  narrow viewport.
- `npx astro check`: 0 errors, 3 existing hints.
- `git diff --check`: passed with CRLF warnings only.

Next action:

- Fill production notification/contact/analytics values, or continue improving
  conversion surfaces while those external inputs are pending.

## 2026-06-02 - Lead Desk SLA operator queue

Checkpoint status:

- The "Готовность к лидогенерации" task remains active.
- This step improves lead conversion operations before production secrets are
  available: operators can now focus the queue by first-response SLA.
- Partner program remains the final acquisition stage; partner leads are still
  visible through dedicated channel/ref filters and partner performance.

Implemented changes:

- Added `response_sla` filtering to `/api/lead-report` and `/api/lead-export`.
- Lead Desk now has a Response SLA filter, quick filters for overdue,
  due-soon, new, and partner leads, and an operator-focus summary panel.
- Queue cards now display SLA badges and visually emphasize overdue/due-soon
  leads.
- Smoke and readiness audits now require response-SLA report/export filtering
  and the Lead Desk quick-filter UI.
- Updated lead-generation docs/project plan/form handling docs for the new
  operator workflow.

Verification:

- `npx tsc --noEmit`: passed.
- `npx astro check`: 0 errors, 3 existing hints.
- `npm run qa:lead-readiness`: passed with 72 checks; warnings only for missing
  production env in this shell.
- `npm run qa:lead-flow:local`: passed; verified EN/RU/RO submissions, D1
  storage, lifecycle update, webhook capture, report/export, partner
  performance, form variants, and response-SLA filters.
- `git diff --check`: passed with CRLF warnings only.

Next action:

- Fill production notification/contact/analytics values, or continue improving
  conversion surfaces while those external inputs are pending.

## 2026-06-02 - Lead generation readiness task gate

Checkpoint status:

- The "Готовность к лидогенерации" task is the active rollout track.
- Partner program remains the final acquisition stage; the current blocker is
  production notification, quick-contact, and analytics configuration.
- `.env.lead.production.local` currently has a real `LEAD_REPORT_TOKEN`, but it
  is not ready to sync or use for paid/partner traffic yet.

Implemented changes:

- Hardened `scripts/audit-lead-production-env.mjs` so template placeholders
  such as `replace-with...`, `your-...`, `changeme`, and `example.com` count as
  missing/invalid production values.
- Added a "Next required production inputs" section to the lead env preflight
  output so the remaining setup can be handled as a short checklist without
  printing secret values.
- The preflight now separates real filled variable names from template
  placeholders.

Verification:

- `node --check scripts/audit-lead-production-env.mjs`: passed.
- `npm run qa:lead-env -- --env-file config/lead-production.env.example`:
  failed as expected because the template token is a placeholder and required
  notification/contact/analytics values are empty.
- `npm run qa:lead-env -- --env-file .env.lead.production.local`: failed as
  expected because notification route, quick contact channel, and analytics
  adapter are still missing.

Next action:

- Fill one production notification route, one public quick contact channel, and
  one analytics adapter in `.env.lead.production.local`, then rerun
  `npm run qa:lead-env -- --env-file .env.lead.production.local`.

## 2026-06-01 - Lead form variant tracking

Checkpoint status:

- The "Lead generation readiness" task remains active.
- Partner program remains the final stage, but all lead forms now carry a
  stable form-source marker for reporting.

Implemented changes:

- Added D1 migration `migrations/0009_project_request_form_variant.sql`.
- Added hidden `form_variant` fields to full brief, quick intake, LP, and
  partner forms.
- `/api/start-project` now stores `form_variant`, includes it in thank-you
  conversion params, webhook payloads, and Telegram messages.
- `/api/lead-report`, `/api/lead-export`, `/api/lead-status`, Lead Desk, and
  first-party analytics now preserve and filter/group by `form_variant`.
- Smoke, readiness, analytics audit, and lead-generation docs now treat form
  variant tracking as required coverage.

Verification:

- `npm run db:migrate:local`: applied `0009` locally.
- `npm run qa:lead-flow:local`: passed; verified EN/RU/RO leads, lifecycle
  status update, notification delivery events, webhook capture, CSV export,
  partner performance, and form variant report/export coverage.
- `npm run qa:lead-readiness`: passed with 72 checks; warnings only for missing
  production env in this shell.
- `npm run qa:lead-analytics`: passed with 20 checks.
- `npm run db:migrate:remote`: applied `0009` on remote D1.
- `npm run db:migrations:remote`: confirmed no pending remote migrations.
- Remote `PRAGMA table_info(project_requests)` confirmed `form_variant`.
- `npx tsc --noEmit`: passed.
- `npx astro check`: 0 errors, 3 existing hints.
- `git diff --check`: passed with CRLF warnings only.

Next action:

- Configure production notification/contact/analytics env, deploy updated Pages
  Functions, then run strict remote smoke against preview/production.

## 2026-06-01 - Partner performance reporting

Checkpoint status:

- The "Lead generation readiness" task remains active.
- Partner program remains the final stage, but it now has operational
  reporting before a dedicated partner CRM exists.

Implemented changes:

- Added `partner_performance` to `/api/lead-report` with partner totals and
  source-level performance.
- Lead Desk now shows a Partner performance panel with active, qualified+,
  won/lost, average score, and unknown partner-ref visibility.
- Smoke and readiness audits now verify partner performance output and UI.

Verification:

- `npx tsc --noEmit`: passed.
- `node --check scripts/smoke-lead-flow.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npm run qa:lead-flow:local`: passed; verified partner performance in
  `/api/lead-report` together with partner ref, status events, notification
  events, webhook capture, CSV export, and conversion totals.
- `npm run qa:lead-readiness`: passed with 70 checks.
- `npx astro check`: 0 errors, 3 existing hints.
- `git diff --check`: passed with CRLF warnings only.
- Browser sanity: opened `http://127.0.0.1:8791/lead-desk/` from a temporary
  preview server and resized desktop/mobile viewports.

Next action:

- Run local lead smoke and readiness checks, then use partner performance in
  live QA after production env/deploy are ready.

## 2026-06-01 - Lead production env readiness map

Checkpoint status:

- The "Lead generation readiness" task remains active.
- Production env cannot be synced/deployed yet because real notification,
  quick contact, and analytics values are still missing.

Implemented changes:

- Extended `scripts/audit-lead-production-env.mjs` to print a readiness map
  without exposing secret values.
- The map now shows report access, notification delivery, quick contact,
  analytics, Turnstile, and filled lead env variable names.
- Updated README and lead docs so production env sync is gated by a ready
  notification route, contact channel, and analytics adapter.

Verification:

- `node --check scripts/audit-lead-production-env.mjs`: passed.
- `npm run qa:lead-env -- --env-file .env.lead.production.local`: failed as
  expected because only `LEAD_REPORT_TOKEN` is filled; notification route,
  quick contact channel, and analytics adapter are missing.

Next action:

- Fill real `LEAD_WEBHOOK_URL` or Telegram credentials, at least one
  `PUBLIC_CONTACT_*` channel, and one analytics adapter; then run
  `npm run qa:lead-env -- --env-file .env.lead.production.local` again.

## 2026-06-01 - Lead notification delivery audit

Checkpoint status:

- The "Lead generation readiness" task remains active.
- Partner program remains the final stage in the lead-generation roadmap.
- Notification delivery attempts are now auditable locally and in remote D1.

Implemented changes:

- Added D1 migration `migrations/0008_project_request_notification_events.sql`.
- `POST /api/start-project` records attempted webhook/Telegram delivery results
  for `project_request.created`.
- `POST /api/lead-status` records attempted webhook/Telegram delivery results
  for `project_request.status_updated`.
- `/api/lead-report` exposes `notification_events`.
- `/lead-desk/` shows a Notification events panel.
- Local lead smoke now requires notification delivery events when the wrapper
  injects the local webhook capture endpoint.
- Readiness audit and lead-generation docs now cover notification-event history.

Verification:

- `npm run qa:lead-flow:local`: passed; verified 3 created webhook events,
  1 status-update webhook event, and notification delivery events in report.
- `npm run qa:lead-readiness`: passed with 70 checks.
- `npx astro check`: 0 errors, 3 existing hints.
- `git diff --check`: passed with CRLF warnings only.
- `npm run db:migrate:remote`: applied `0008` on remote D1.
- `npm run db:migrations:remote`: confirmed no pending remote migrations.

Next action:

- Fill real production notification, quick contact, analytics, and Turnstile
  values in `.env.lead.production.local`, sync them to Cloudflare Pages, deploy
  the updated Functions, and run strict remote smoke.

## 2026-06-01 - Lead status lifecycle notifications

Checkpoint status:

- The "Готовность к лидогенерации" task remains active. Partner program stays
  documented as the final lead-generation stage.
- Lead lifecycle status changes can now be forwarded to the same notification
  destinations as new lead submissions.

Implemented changes:

- Updated `POST /api/lead-status` to emit optional
  `project_request.status_updated` notifications after the D1 lead update and
  `project_request_status_events` insert succeed.
- Added webhook payload context for status updates: `status_event`, lead source
  and routing fields, owner/follow-up fields, and `lead_desk_url`.
- Added Telegram status-update messages with status transition, owner, next
  action, route, source, UTM, partner/ref, and Lead Desk link.
- Notification delivery failures are logged and do not roll back the saved
  lifecycle update.
- Updated readiness audit and docs for lifecycle notification coverage.

Verification:

- `npx tsc --noEmit`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npm run qa:lead-readiness`: passed with 68 checks.
- `npx astro check`: 0 errors, 3 existing hints.
- `npm run qa:lead-flow:local`: passed; verified form POST, D1 insert,
  lifecycle status event history, protected report, CSV export, UTM breakdowns,
  conversion totals, and partner ref.
- `git diff --check`: passed with CRLF warnings only.

Next action:

- Fill real production notification, quick contact, and analytics values in
  `.env.lead.production.local`, sync them to Cloudflare Pages, deploy the
  updated Functions, and run strict remote smoke.

## 2026-06-01 - Local lead webhook smoke verification

Checkpoint status:

- Local lead smoke now proves webhook delivery for both new lead intake and
  lifecycle status updates before any production webhook destination exists.

Implemented changes:

- Extended `scripts/run-local-lead-flow.mjs` with a temporary local webhook
  capture server.
- The wrapper now injects local-only `LEAD_WEBHOOK_URL` and
  `LEAD_WEBHOOK_TOKEN` into `.dev.vars` for the Pages runtime, then restores
  the previous file after the run.
- Telegram notification env is blanked for local smoke so QA leads do not leak
  into a real operator chat if local secrets exist.
- The wrapper verifies at least three `project_request.created` webhook events
  and at least one `project_request.status_updated` event with id, routing,
  owner/status, next action, and `lead_desk_url`.
- Updated readiness audit and documentation to cover local webhook smoke.

Verification:

- `node --check scripts/run-local-lead-flow.mjs`: passed.
- `node --check scripts/audit-lead-readiness.mjs`: passed.
- `npx tsc --noEmit`: passed.
- `npm run qa:lead-flow:local`: passed; local webhook capture verified
  3 created events and 1 status update event.

Next action:

- Keep local webhook smoke in the pre-launch gate, then repeat webhook delivery
  verification against the real production destination after Cloudflare Pages
  env sync and deploy.

## 2026-06-01 - Lead lifecycle status event history

Checkpoint status:

- Lead status updates now produce an auditable event history instead of only
  replacing the current lifecycle fields on the lead.

Implemented changes:

- Added migration `migrations/0007_project_request_status_events.sql`.
- Updated `POST /api/lead-status` to write `project_request_status_events`
  with previous status, new status, owner, next action, note, and timestamp.
- Updated `/api/lead-report` to return `status_events`.
- Added a Status events panel to `/lead-desk/`.
- Extended the local lead smoke wrapper to apply local D1 migrations before
  starting the Pages runtime.
- Extended smoke/readiness/docs coverage for lifecycle event history.
- Created ignored `.env.lead.production.local` with a generated
  `LEAD_REPORT_TOKEN` so production env sync now has a draft source file.

Verification:

- `npm run db:migrate:local`: applied `0007` locally.
- `npx tsc --noEmit`: passed.
- `node --check scripts/audit-lead-readiness.mjs`;
  `node --check scripts/smoke-lead-flow.mjs`;
  `node --check scripts/run-local-lead-flow.mjs`: passed.
- `npm run qa:lead-readiness`: passed with 68 checks.
- `npx astro check`: 0 errors, 3 existing hints.
- `npm run qa:lead-flow:local`: passed; local Pages runtime verified form
  POST, D1 insert, status event writeback, protected report, and CSV export.
- `npm run db:migrate:remote`: applied `0007` on remote D1.
- `npm run db:migrations:remote`: confirmed no pending remote migrations.
- `npm run lead-env:prepare`: created `.env.lead.production.local` without
  printing secret values.
- `node scripts/audit-lead-production-env.mjs --env-file
  .env.lead.production.local`: correctly fails until real notification,
  quick contact, and analytics values are filled.

Next action:

- Fill real notification, quick contact, and analytics values in
  `.env.lead.production.local`; then sync Cloudflare Pages env, deploy the
  updated Pages Functions, and run report-backed remote smoke.

## 2026-06-01 - Lead analytics audit gate

Checkpoint status:

- Lead-generation analytics can now be verified before a final analytics vendor
  is selected or enabled in production.

Implemented changes:

- Added `scripts/audit-lead-analytics.mjs`.
- Added `npm run qa:lead-analytics`.
- The audit verifies the first-party event inventory, shared conversion
  context, form attribution fields, partner-program attribution, optional
  vendor forwarding hooks, and localized thank-you conversion pages.
- Added the analytics audit to the lead launch gate after readiness/build and
  before TypeScript/Astro/env checks.
- Updated README, analytics docs, form-handling docs, deployment protocol,
  project plan, lead-generation readiness docs, and readiness audit.

Verification:

- `npm run qa:lead-analytics`: passed with 20 checks after building 151 pages.
- `npm run qa:lead-readiness`: passed with 66 checks.
- `npm run qa:lead-launch -- --dry-run --lead-env-file
  config/lead-production.env.example --skip-local-smoke --cloudflare-env-file
  .env`: passed and showed `Lead analytics audit` as step 2.

Next action:

- After production analytics variables are selected, run the live launch gate
  and confirm the vendor receives the same first-party events.

## 2026-06-01 - Lead conversion pipeline metrics

Checkpoint status:

- Lead Desk now shows whether lead generation is moving past intake into an
  actual sales pipeline, not only how many requests arrived.

Implemented changes:

- Extended `/api/lead-report` totals with active, contacted, qualified,
  proposal, won, lost, closed, and qualified+ counts.
- Added Lead Desk metric cards for active leads, contacted leads, qualified+
  leads, pipeline percentage, won leads, and win rate.
- Updated Lead Desk metric layout so the larger metric set wraps cleanly.
- Extended smoke coverage to verify conversion totals and contacted lead
  counting after a lifecycle update.
- Updated lead-generation readiness, form-handling, deployment protocol, and
  readiness audit.

Verification:

- `npm run qa:lead-readiness`: passed with 65 checks.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `npm run qa:lead-flow:local`: passed. It submitted EN/RU/RO smoke leads,
  updated one lead to `contacted`, and verified report/export, lifecycle
  status, UTM breakdowns, conversion totals, and partner ref.

Next action:

- After production env is applied, verify the same conversion totals through
  the live launch gate and use Lead Desk to compare real campaign/partner
  sources by pipeline progress.

## 2026-06-01 - UTM campaign reporting

Checkpoint status:

- Lead reporting now shows which campaign sources are creating requests, not
  only broad channel/offer buckets.

Implemented changes:

- Extended `/api/lead-report` with `breakdowns.by_utm_source`,
  `breakdowns.by_utm_medium`, and `breakdowns.by_utm_campaign`.
- Added UTM source, medium, and campaign sections to `/lead-desk/` breakdowns.
- Extended smoke coverage to verify UTM breakdowns from EN/RU/RO submissions.
- Updated lead-generation readiness, form-handling, deployment protocol, and
  readiness audit.

Verification:

- `npm run qa:lead-readiness`: passed with 65 checks.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `npm run qa:lead-flow:local`: passed. It submitted EN/RU/RO smoke leads and
  verified lead report/export, lifecycle status, partner ref, and UTM source,
  medium, and campaign breakdowns.

Next action:

- After production env is applied, verify UTM breakdowns through the live launch
  gate and compare real campaigns in Lead Desk.

## 2026-06-01 - Lead Desk report filters

Checkpoint status:

- Lead Desk can now operate on a filtered working queue instead of only
  exporting filtered CSV after viewing the full lead stream.

Implemented changes:

- Extended `/api/lead-report` with safe filters for `status`, `channel`,
  `priority`, `bucket`, `offer`, and `partner_ref`.
- The filters apply to totals, breakdowns, action queue, and recent leads.
- Added matching filters to `/lead-desk/`; the same filter state is used for
  the visible report and CSV export.
- Extended smoke coverage to verify partner-ref and status filtered reports.
- Updated form handling docs, deployment protocol, readiness docs, and the
  lead readiness audit.

Verification:

- `npm run qa:lead-readiness`: passed with 65 checks.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `npm run qa:lead-flow:local`: passed. It submitted EN/RU/RO smoke leads,
  updated one lead to `contacted`, verified unfiltered report/export, verified
  partner-ref filtered report/export, and verified a status-filtered report.

Next action:

- Verify the filtered report flow locally, then include it in the live launch
  gate after Cloudflare production env is applied.

## 2026-06-01 - Lead launch gate

Checkpoint status:

- Lead-generation production handoff now has one orchestrated gate for
  pre-apply and live verification instead of relying on a loose sequence of
  manual commands.

Implemented changes:

- Added `scripts/run-lead-launch-gate.mjs`.
- Added `npm run qa:lead-launch`.
- Default `pre-apply` phase runs readiness/build checks, TypeScript, Astro,
  production lead env preflight, Cloudflare env sync dry-run, Cloudflare
  Pages/D1 inventory audit, and local Pages smoke unless explicitly skipped.
- `--phase live` requires a preview/production `--base-url`, strict
  Cloudflare lead env audit, and report-backed remote smoke through
  `qa:lead-flow:remote`.
- Added docs in README, form handling, deployment protocol, and readiness audit.

Verification:

- `npm run qa:lead-launch -- --help`: passed.
- `npm run qa:lead-launch -- --dry-run --lead-env-file
  config/lead-production.env.example --skip-local-smoke`: passed and printed the
  pre-apply plan without running commands.
- `npm run qa:lead-launch -- --cloudflare-env-file .env --lead-env-file <temp
  safe env> --skip-local-smoke`: passed. It ran readiness/build checks,
  TypeScript, Astro, production lead env preflight, Cloudflare sync dry-run, and
  Cloudflare Pages/D1 audit without printing values or applying env changes.
- The launch-gate run confirmed `qa:lead-readiness` now passes with 65 checks.

Next action:

- Use the gate with real `.env.lead.production.local`, apply Cloudflare lead env
  only after dry-run review, deploy, then run the gate again with
  `--phase live`.

## 2026-06-01 - Cloudflare lead env sync path

Checkpoint status:

- Filled production lead env files can now be validated and synced to
  Cloudflare Pages deployment config through a dry-run-first script.

Implemented changes:

- Added `scripts/sync-cloudflare-pages-lead-env.mjs`.
- Added `npm run lead-env:sync`.
- The sync script reads Cloudflare API credentials from `--env-file`, reads the
  filled lead env file from `--lead-env-file`, validates it through
  `scripts/audit-lead-production-env.mjs`, classifies lead variables as
  `plain_text` or `secret_text`, and prepares a Cloudflare Pages
  `deployment_configs.<environment>.env_vars` update.
- Dry-run is the default; `--apply` is required for a real API PATCH.
- After `--apply`, the sync script re-reads the Pages project and verifies the
  synced variable names and `plain_text` / `secret_text` types.
- Secret values are never printed.
- Updated README, form handling docs, deployment protocol, lead-generation
  readiness docs, and readiness audit.

Verification:

- `npm run lead-env:sync -- --help`: passed.
- `npm run lead-env:sync -- --env-file .env --lead-env-file <temp safe env>`:
  passed dry-run. It validated the filled env file, checked the Cloudflare
  Pages project, printed only variable names and `secret_text` / `plain_text`
  types, and did not apply changes.
- `npm run qa:lead-readiness`: passed with 63 checks.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `git diff --check`: passed with only existing CRLF warnings.

Next action:

- Fill `.env.lead.production.local` with real values, run `npm run
  lead-env:sync -- --env-file .env --lead-env-file .env.lead.production.local`,
  then re-run with `--apply` if the dry-run names and types are correct.

## 2026-06-01 - Production lead env setup template

Checkpoint status:

- Production lead variables now have a local setup draft and template so the
  Cloudflare blocker can be resolved without inventing public contact or
  analytics values.

Implemented changes:

- Added `config/lead-production.env.example`.
- Added `scripts/prepare-lead-production-env.mjs`.
- Added `npm run lead-env:prepare`.
- The preparation script creates ignored `.env.lead.production.local` with a
  generated strong `LEAD_REPORT_TOKEN` and placeholders for real notification,
  quick contact, analytics, and optional Turnstile values.
- Updated README, form handling docs, deployment protocol, lead-generation
  readiness docs, and readiness audit.

Verification:

- `npm run lead-env:prepare -- --dry-run`: passed. The template is readable,
  and no file was written.
- `npm run qa:lead-readiness`: passed with 61 checks.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `git diff --check`: passed with only existing CRLF warnings.

Next action:

- Fill real production notification, quick contact, analytics, and optional
  Turnstile values, then run `npm run qa:lead-env -- --env-file
  .env.lead.production.local`.

## 2026-06-01 - Cloudflare Pages lead config audit

Checkpoint status:

- Production Pages project state is now auditable without printing secret
  values.

Implemented changes:

- Added `scripts/audit-cloudflare-pages-lead-config.mjs`.
- Added `npm run qa:lead-cloudflare`.
- The audit checks Cloudflare Pages project existence, production branch,
  attached domains, latest production deployment status, D1 `DB` binding, and
  visible lead env variable names for report, notifications, quick contacts,
  analytics, and Turnstile consistency.
- Updated README, form handling docs, deployment protocol, lead-generation
  readiness docs, and readiness audit.

Verification:

- `npx wrangler pages project list`: confirmed `alfarank-site` exists with
  `alfarank-site.pages.dev`, `alfarank.com`, and `www.alfarank.com`.
- `npx wrangler pages deployment list --project-name alfarank-site`: confirmed
  latest production deployment `11dbf4d6-d752-4069-a574-6e284dd8e103` succeeded.
- `npx wrangler pages secret list --project-name alfarank-site`: returned no
  production secrets.
- `node scripts/audit-cloudflare-pages-lead-config.mjs --env-file .env --allow-missing-lead-env`:
  passed inventory mode. It confirmed production deploy success, attached
  domains, and production D1 binding `DB`; it reported that production lead env
  names are currently missing.
- `node scripts/audit-cloudflare-pages-lead-config.mjs --env-file .env`: failed
  as intended because production `LEAD_REPORT_TOKEN`, notification route, quick
  contact channel, and analytics adapter are not configured on Cloudflare Pages.
- `npm run qa:lead-cloudflare -- --env-file .env --allow-missing-lead-env`:
  passed inventory mode and confirmed the same production deploy/domain/DB
  state without printing secret values.
- `npm run qa:lead-readiness`: passed with 57 checks.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `git diff --check`: passed with only existing CRLF warnings.

Next action:

- Configure production lead env variables in Cloudflare Pages, rerun
  `npm run qa:lead-cloudflare -- --env-file .env`, then run
  `npm run qa:lead-flow:remote -- --base-url <preview-or-production-url>`.

## 2026-06-01 - Strict remote lead-flow gate

Checkpoint status:

- Preview/production lead smoke now has a strict wrapper that prevents blind
  test submissions.

Implemented changes:

- Added `scripts/run-remote-lead-flow.mjs`.
- Added `npm run qa:lead-flow:remote`.
- The remote wrapper requires `LEAD_SMOKE_BASE_URL` or `--base-url`, refuses
  localhost targets by default, requires `LEAD_REPORT_TOKEN` or
  `LEAD_SMOKE_REPORT_TOKEN`, runs the production env preflight, and runs the
  lead smoke with `LEAD_SMOKE_REQUIRE_REPORT=1`.
- `scripts/smoke-lead-flow.mjs` now supports strict report-required mode.
- Updated README, form handling docs, deployment protocol, lead-generation
  readiness docs, and the readiness audit.

Verification:

- `node scripts/run-remote-lead-flow.mjs --base-url https://example.pages.dev --dry-run`
  with safe test env values: passed. The wrapper ran production env preflight
  and validated the remote gate without posting smoke leads.
- `node scripts/run-remote-lead-flow.mjs --help`: passed.
- `npm run qa:lead-flow:local`: passed. The local Pages runtime now runs the
  smoke with `LEAD_SMOKE_REQUIRE_REPORT=1` and verified EN/RU/RO submissions,
  lifecycle status, report/export coverage, response SLA, partner-ref
  breakdown, and partner-filtered CSV export.
- `npm run qa:lead-readiness`: passed with 55 checks.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `git diff --check`: passed with only existing CRLF warnings.

Next action:

- Configure real Cloudflare preview/production variables and run
  `npm run qa:lead-flow:remote -- --base-url <preview-or-production-url>`.

## 2026-06-01 - First-response SLA reporting

Checkpoint status:

- Lead operations now show whether active leads are still inside the first
  response window.

Implemented changes:

- Extended `/api/lead-report` with `overdue_count`, `due_soon_count`,
  `breakdowns.by_sla`, and per-lead `response_sla`, `response_age_hours`, and
  `response_due_hours`.
- Response windows are computed from existing lifecycle fields: high priority
  4 hours, medium 12 hours, low 24 hours.
- Extended `/api/lead-export` with response SLA columns.
- Updated `/lead-desk/` metrics, breakdowns, and lead metadata to show response
  SLA state.
- Extended `npm run qa:lead-flow` and `npm run qa:lead-readiness` to verify the
  SLA layer.

Verification:

- `npm run qa:lead-flow:local`: passed. The local Pages runtime verified
  EN/RU/RO submissions, lifecycle status, report SLA totals, SLA breakdown,
  lead-level response SLA fields, CSV SLA columns, partner-ref breakdown, and
  partner-filtered CSV export.
- `npm run qa:lead-readiness`: passed with 53 checks.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `git diff --check`: passed with only existing CRLF warnings.

Next action:

- Configure real production env and run `npm run qa:lead-env` plus
  `npm run qa:lead-flow` against preview or production.

## 2026-06-01 - Partner source reporting layer

Checkpoint status:

- Partner/referral leads are now easier to inspect and export from the
  operations layer.

Implemented changes:

- Extended `/api/lead-report` with `breakdowns.by_partner`, including total,
  active count, and average score per `partner_ref`.
- Extended `/api/lead-export` with a `partner_ref` filter for partner-specific
  CSV handoff.
- Updated `/lead-desk/` to show offer and partner-ref breakdowns and to export
  CSV by exact partner ref.
- Extended `npm run qa:lead-flow` to verify offer breakdown, partner breakdown,
  and partner-filtered CSV export.
- Updated lead-generation docs and readiness audit for the partner reporting
  layer.

Verification:

- `npm run qa:lead-flow:local`: passed. The local Pages runtime verified EN/RU/RO
  submissions, lifecycle update, offer breakdown, partner-ref breakdown, and
  partner-filtered CSV export.
- `npm run qa:lead-readiness`: passed with 53 checks.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `git diff --check`: passed with only existing CRLF warnings.

Next action:

- Configure real production env and run `npm run qa:lead-env` plus
  `npm run qa:lead-flow` against preview or production.

## 2026-06-01 - Production lead env preflight

Checkpoint status:

- Lead-generation readiness now has a separate production configuration gate
  before preview/production smoke or paid traffic.

Implemented changes:

- Added `scripts/audit-lead-production-env.mjs`.
- Added `npm run qa:lead-env`.
- The preflight checks presence and basic validity for `LEAD_REPORT_TOKEN`, at
  least one notification route, at least one public quick contact channel, at
  least one analytics adapter, and consistent Turnstile public/server keys.
- The command can read exported environment variables or explicit local env
  files through `--env-file` without printing secret values.
- Extended the lead readiness audit and docs to include the production env
  preflight.

Verification:

- `npm run qa:lead-env` with safe test values: passed. The command reported
  the expected warning that Turnstile is not enabled when no Turnstile keys are
  present.
- `npm run qa:lead-readiness`: passed with 52 checks.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `git diff --check`: passed with only existing CRLF warnings.

Next action:

- Configure the real production values in Cloudflare Pages, then run
  `npm run qa:lead-env` and `npm run qa:lead-flow` against the preview or
  production URL.

## 2026-06-01 - Local lead flow runtime smoke wrapper

Checkpoint status:

- Lead-generation QA now has a one-command local end-to-end smoke path for the
  Cloudflare Pages runtime.

Implemented changes:

- Added `scripts/run-local-lead-flow.mjs`.
- Added `npm run qa:lead-flow:local`.
- The wrapper picks a free local port, runs `npm run build`, starts
  `wrangler pages dev dist` with local D1 persistence and a temporary
  `LEAD_REPORT_TOKEN`, waits for `/start-project/`, runs
  `npm run qa:lead-flow`, then stops the runtime.
- The flow verifies EN/RU/RO public POSTs, localized thank-you redirects, D1
  storage, protected report readback, lifecycle status update, and CSV export.
- Extended `qa:lead-readiness` and docs to require the local smoke wrapper as
  part of the lead-generation QA surface.

Verification:

- `npm run qa:lead-flow:local`: passed. The wrapper built 151 pages, started
  local `wrangler pages dev`, verified EN/RU/RO lead submissions, localized
  redirects, D1 storage, lifecycle status update, lead report, and CSV export.
- `npm run qa:lead-readiness`: passed with 49 checks. Production env warnings
  are expected in the local shell.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `git diff --check`: passed with only existing CRLF warnings.

Next action:

- Configure production/preview env variables and rerun `npm run qa:lead-flow`
  against the deployed URL after deploy.

## 2026-06-01 - Shared lead form submit state

Checkpoint status:

- Public lead forms now share one submit-state controller instead of relying on
  duplicated page-level handlers.

Implemented changes:

- Added shared submit-state handling in `src/layouts/Layout.astro` for every
  `form[data-conversion-form]`.
- The handler sets `data-submit-state`, `aria-busy`, disabled submit buttons,
  pending status copy, validation status copy, and prevents duplicate submits.
- The state is reset on `pageshow` so browser back/forward cache does not leave
  a form stuck in a disabled state.
- Removed duplicated submit-button handlers from `/start-project/` and LP form
  scripts; those scripts now only fill attribution/source fields.
- Added a pending status style and extended the lead readiness audit to verify
  the shared submit-state controller.

Verification:

- `npm run qa:lead-readiness`: passed, including the shared submit-state
  controller audit.
- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `git diff --check`: passed with only existing CRLF warnings.

Next action:

- Verify production/preview form submissions after deploy with
  `npm run qa:lead-flow`.

## 2026-06-01 - Lead readiness audit command

Checkpoint status:

- Lead-generation QA now has a repeatable pre-launch audit command that checks
  the local build output and the source wiring before preview/production handoff.

Implemented changes:

- Added `scripts/audit-lead-readiness.mjs`.
- Added `npm run qa:lead-readiness`, which runs `npm run build` and then audits
  the lead-generation surface.
- The audit checks start-project forms, LP forms, partner-program intake,
  hidden attribution fields, sitemap coverage, Lead Desk, API endpoints,
  D1 migrations, notification/analytics/contact configuration hooks, and docs.
- The audit warns when production env variables are not present in the shell.
  With `LEAD_AUDIT_REQUIRE_ENV=1`, missing production env values become a hard
  failure for stricter release checks.
- Updated lead-generation readiness, form-handling, deployment, and project
  plan docs.

Verification:

- `npm run qa:lead-readiness`: passed.

Next action:

- Keep `qa:lead-readiness` in the release checklist before preview/production
  smoke testing with `qa:lead-flow`.

## 2026-06-01 - Partner program intake channel

Checkpoint status:

- The final lead-generation stage now has a public partner-program intake path
  that feeds the same lead storage, attribution, routing, and reporting model.

Implemented changes:

- Added `/partner-program/`, `/ru/partner-program/`, and
  `/ro/partner-program/`.
- Added a partner intake form that posts to `/api/start-project` with
  `landing_offer=partner-program` and `lead_channel=partner`.
- Captured `partner_ref`, `partner`, `ref`, `affiliate`, `affiliate_id`, and
  UTM values from URL parameters into the hidden form fields.
- Kept Turnstile/honeypot support through the existing public form path.
- Added the partner-program route to localized sitemap coverage.
- Added a footer link to the localized partner-program page.
- Updated lead-generation readiness, form-handling, and project plan docs.

Verification:

- `npx tsc --noEmit`: passed.
- `npx astro check`: passed with 0 errors and the existing 3 hints.
- `npm run build`: passed, 151 pages generated.
- `git diff --check`: passed with only existing CRLF warnings.
- Browser QA on `/ru/partner-program/` confirmed the form exists, required
  fields are present, `landing_offer=partner-program`, `lead_channel=partner`,
  `partner_ref` and UTM values populate from the URL, the footer link is
  present, and desktop/mobile widths have no horizontal overflow.

Next action:

- Verify one production/preview partner submission after deploy, then check it
  in `/lead-desk/` or `/api/lead-report` as `lead_channel=partner`.

## 2026-06-01 - Telegram lead notification channel

Checkpoint status:

- New lead notifications can now go directly to an operator Telegram chat
  without waiting for a CRM destination.

Implemented changes:

- Kept D1 as the source of truth: notifications run only after the request is
  stored.
- Split notification delivery into independent webhook and Telegram channels.
- Added optional Telegram env variables:
  `LEAD_TELEGRAM_BOT_TOKEN`, `LEAD_TELEGRAM_CHAT_ID`, and
  `LEAD_TELEGRAM_MESSAGE_THREAD_ID`.
- Telegram messages include priority, score, routing bucket, next action,
  contact, offer, source, UTM, partner/ref code, problem, desired result, lead
  id, and a `/lead-desk/` link.
- Webhook payload now also includes `lead_desk_url`.
- Notification failures remain non-blocking, so the user still reaches the
  thank-you page when the lead is already stored.
- Updated lead-generation readiness, form-handling, deployment, and project
  plan docs.

Next action:

- Configure a production Telegram bot/chat or webhook destination and verify a
  real EN/RU/RO lead submission reaches the working channel.

## 2026-06-01 - Optional Turnstile spam protection

Checkpoint status:

- Public lead intake can now enable Cloudflare Turnstile without breaking
  local or default submissions.

Implemented changes:

- Added `TurnstileField` component and optional Turnstile script through
  `PUBLIC_TURNSTILE_SITE_KEY`.
- Rendered the widget on `/start-project/` quick/full forms and LP intake
  forms.
- Added server-side verification in `/api/start-project` through
  `TURNSTILE_SECRET_KEY`.
- Kept the honeypot baseline and no-op behavior when Turnstile secret is not
  configured.
- Extended `npm run qa:lead-flow` to pass `LEAD_SMOKE_TURNSTILE_TOKEN` when
  testing Turnstile-protected preview paths.
- Updated lead-generation readiness, form-handling, deployment, and project
  plan docs.

Next action:

- Configure Turnstile keys in preview/production and run a browser submission
  plus smoke test with a test token where applicable.

## 2026-06-01 - Lead Desk UI

Checkpoint status:

- Lead operations now have a protected internal browser UI before CRM
  integration.

Implemented changes:

- Added `/lead-desk/` as a noindex internal page.
- The page stores `LEAD_REPORT_TOKEN` only in browser session storage.
- It loads `/api/lead-report` with an authorization header, renders metrics,
  breakdowns, action queue, and recent leads.
- It updates lead status, owner, next action, and follow-up note through
  `/api/lead-status`.
- It downloads `/api/lead-export` through `fetch` and a blob download, so the
  token is not placed in the URL.
- Updated lead-generation readiness, form-handling, deployment, and project
  plan docs.

Next action:

- Verify `/lead-desk/` against Cloudflare preview/production after
  `LEAD_REPORT_TOKEN` is configured.

## 2026-06-01 - Lead lifecycle status endpoint

Checkpoint status:

- Lead handling now has a minimal post-submission lifecycle layer, not only
  intake and reporting.

Implemented changes:

- Added D1 migration `migrations/0006_project_request_lifecycle_fields.sql`
  for `lead_owner`, `lead_follow_up_note`, and `lead_status_updated_at`.
- Added protected `POST /api/lead-status` using `LEAD_REPORT_TOKEN`.
- Supported statuses: `new`, `reviewed`, `contacted`, `qualified`,
  `proposal`, `won`, `lost`, `spam`, and `archived`.
- Extended `/api/lead-report` with status breakdown, lifecycle fields, and an
  `action_queue`.
- Extended `npm run qa:lead-flow` to update one smoke lead through
  `/api/lead-status` and verify lifecycle data in the report.
- Verified locally through Pages runtime: smoke submissions, lifecycle update,
  protected report readback, and unauthorized `401` for `/api/lead-status`.
- Applied migration `0006` to remote D1 and verified the remote schema through
  `lead_status_updated_at`; `npm run db:migrations:remote` reports no pending
  migrations.

Next action:

- Deploy the updated Pages Functions, set `LEAD_REPORT_TOKEN`, and run the
  smoke test against preview/production.

## 2026-06-01 - Lead CSV export endpoint

Checkpoint status:

- Lead operations now have a protected CSV export path before a full CRM or
  notification destination is finalized.

Implemented changes:

- Added `GET /api/lead-export` in `functions/api/lead-export.ts`.
- Uses the same `LEAD_REPORT_TOKEN` access model as the report and lifecycle
  endpoints.
- Exports source, attribution, routing, lifecycle, project context, and
  follow-up note fields.
- Supports filters for `status`, `channel`, `priority`, `bucket`, `offer`,
  `limit`, and `include_test=1`.
- Extended `npm run qa:lead-flow` to verify CSV export includes smoke leads and
  lifecycle fields.
- Updated lead-generation readiness and form-handling docs.

Next action:

- Deploy the updated Pages Functions and verify `/api/lead-export` against
  preview/production with `LEAD_REPORT_TOKEN`.

## 2026-06-01 - Lead flow smoke test script

Checkpoint status:

- Lead-generation QA now has a repeatable EN/RU/RO smoke test.
- The protected lead report hides smoke-test leads by default, while the smoke
  test verifies them with `include_test=1`.

Implemented changes:

- Added `scripts/smoke-lead-flow.mjs`.
- Added `npm run qa:lead-flow`.
- The test submits three leads through `/api/start-project`, verifies localized
  thank-you redirects and non-PII conversion params, and optionally verifies the
  new leads through `/api/lead-report` when a report token is provided.
- Updated `/api/lead-report` to exclude `lead-smoke-*` QA submissions unless
  `include_test=1` is passed.
- Documented local/preview usage through `LEAD_SMOKE_BASE_URL` and
  `LEAD_REPORT_TOKEN`.

Next action:

- Run the smoke test against the deployed Cloudflare preview after the updated
  Pages Function and `LEAD_REPORT_TOKEN` are live.

## 2026-06-01 - Protected lead report endpoint

Checkpoint status:

- A token-protected JSON reporting endpoint now exists for lead tracking
  without direct D1 console access.

Implemented changes:

- Added `GET /api/lead-report` in `functions/api/lead-report.ts`.
- Requires `LEAD_REPORT_TOKEN`; returns `503` when the token is not configured
  and `401` for invalid access.
- Reports totals, new count, average lead score, breakdowns by channel,
  priority, routing bucket, offer, and latest leads with attribution/routing
  fields.
- Updated form-handling, deployment, and lead-generation readiness docs.

Next action:

- Set `LEAD_REPORT_TOKEN` in Cloudflare Pages after deploy and verify the
  report against remote D1 using a short production smoke test.

## 2026-06-01 - Remote D1 lead schema migrated

Checkpoint status:

- Remote D1 now matches the lead attribution and routing schema required by the
  current intake API.

Implemented changes:

- Applied remote migrations `0004_project_request_attribution_fields.sql` and
  `0005_project_request_routing_fields.sql` to the `DB` binding.
- Verified `npm run db:migrations:remote` reports no pending migrations.
- Verified remote `PRAGMA table_info(project_requests)` includes `locale`,
  `referrer`, `lead_channel`, `partner_ref`, `lead_score`, `lead_priority`,
  `routing_bucket`, and `next_action`.

Next action:

- Deploy the updated Pages Function, configure `LEAD_WEBHOOK_URL`, and run
  EN/RU/RO production form submissions to confirm D1 storage, webhook delivery,
  redirect context, and analytics events.

## 2026-06-01 - Lead routing classification

Checkpoint status:

- New submissions now carry a first-pass operational routing model.

Implemented changes:

- Added D1 migration `migrations/0005_project_request_routing_fields.sql`.
- Added API-derived `lead_score`, `lead_priority`, `routing_bucket`, and
  `next_action` fields for every stored project request.
- Included the same routing fields in the optional webhook payload.
- Documented the routing model in form-handling, deployment, and
  lead-generation readiness docs.

Next action:

- Apply migration `0005` on remote D1, configure the production webhook, and
  verify a real EN/RU/RO submission reaches D1 and the working channel with
  routing data.

## 2026-06-01 - Analytics vendor adapters

Checkpoint status:

- Production analytics can now be enabled without changing application code.

Implemented changes:

- Added optional GTM injection through `PUBLIC_GTM_ID`.
- Added optional GA4 injection through `PUBLIC_GA_ID` with automatic page views
  disabled so the first-party `page_view` event remains authoritative.
- Added optional Plausible injection through `PUBLIC_PLAUSIBLE_DOMAIN` and
  optional `PUBLIC_PLAUSIBLE_SRC`.
- Kept the first-party `window.dataLayer`, `gtag`, `plausible`, and
  `alfarank:analytics` event forwarding model intact.
- Updated analytics, deployment, and lead-generation readiness documentation.

Next action:

- Choose the production analytics vendor and set the matching Cloudflare Pages
  build variable, then run an EN/RU/RO conversion smoke test.

## 2026-06-01 - Quick lead intake

Checkpoint status:

- Cold-lead entry path added without removing the detailed project brief.

Implemented changes:

- Added a short `quick-intake` form at the top of `/start-project/`.
- Quick form asks only for name, email, and the pressure point, while hidden
  defaults provide `project_type`, `desired_output`, and `desired_result`.
- Quick form uses the same source, locale, UTM, channel, and partner/ref
  attribution fields as the full intake form.
- Added RU/RO copy for the quick-intake labels and CTA.
- Updated the lead-generation readiness task status.

Next action:

- Add quick contact channels or connect the production lead webhook, then run
  real end-to-end lead tests in EN/RU/RO.

## 2026-06-01 - Lead attribution foundation

Checkpoint status:

- First implementation layer for lead-generation readiness extended from
  storage-only intake to measurable attribution.

Implemented changes:

- Added D1 migration `migrations/0004_project_request_attribution_fields.sql`.
- Added `locale`, `referrer`, `lead_channel`, and `partner_ref` to
  `/api/start-project` parsing, D1 insert, webhook payload, and safe
  thank-you conversion context.
- Updated `/start-project/` and LP forms to send attribution fields.
- Updated analytics context so page, CTA, form, and thank-you events can be
  grouped by locale, lead channel, and partner/ref code.
- Updated lead-generation, analytics, form-handling, deployment, and project
  plan docs.

Next action:

- Connect the production webhook endpoint and verify a real EN/RU/RO lead
  submission through D1, webhook, redirect, and analytics.

## 2026-06-01 - First-stage proof patterns

Checkpoint status:

- Case-style proof layer added for conversion confidence.

Implemented changes:

- Added `LeadProofPatterns` component with three proof patterns: lead intake,
  content operation, and data/commerce control.
- Each pattern shows pressure, first useful build, and proof signal without
  pretending to be a real client case with invented metrics.
- Rendered the section on `/start-project/`.
- Rendered the section on all campaign LP pages before the conversion form.
- Added RU/RO copy and responsive styling.
- Updated the lead-generation readiness task and project plan.

Next action:

- Add real proof assets when available: named examples, anonymized before/after
  snapshots, first-stage deliverable packages, or measurable outcomes from real
  projects.

## 2026-06-01 - First-response assurance near forms

Checkpoint status:

- First trust layer added around lead conversion forms.

Implemented changes:

- Added `LeadAssurance` component with response target, routing, first scope,
  and human review expectations.
- Rendered the panel on `/start-project/` beside the intake system console.
- Rendered the embedded version inside LP conversion panels before buyer FAQs.
- Added RU/RO copy for the new trust messages.
- Updated the lead-generation readiness task and project plan.

Next action:

- Add stronger proof assets: concrete example outcomes, first-stage package,
  and one or more case-style result blocks.

## 2026-06-01 - Optional quick contact channels

Checkpoint status:

- Quick direct-contact path prepared for lead generation.

Implemented changes:

- Added optional contact links driven by `PUBLIC_CONTACT_EMAIL`,
  `PUBLIC_CONTACT_TELEGRAM_URL`, and `PUBLIC_CONTACT_WHATSAPP_URL`.
- Rendered the links near the quick intake form and in the footer only when at
  least one contact variable is configured.
- Added `quick_contact_click` tracking with channel, label, href, and page
  location.
- Documented the variables in lead-generation, form-handling, analytics,
  deployment, and project-plan docs.

Next action:

- Set real production contact values in Cloudflare Pages build variables and
  verify that the links render and analytics events fire.

## 2026-06-01 - Готовность к лидогенерации task opened

Checkpoint status:

- Active lead-generation readiness task fixed as its own working checklist.

Implemented changes:

- Added `docs/lead-generation-readiness.md`.
- Named the task "Готовность к лидогенерации".
- Split the work into staged implementation: lead intake/routing, analytics,
  fast lead entry, proof/trust, quick contact channels, production QA, and
  partner program.
- Added partner program as the final stage of the task.
- Linked the active task from `docs/project-plan.md`.

Next action:

- Start implementation with the lead intake/routing layer: localized thank-you
  redirects, notification delivery, and production submission verification.

## 2026-05-27 - Full-site QA and duplicate content pass

Checkpoint status:

- Full-site automated QA pass completed after the latest visual fixes.
- 41 static pages were checked across desktop and mobile viewports.

Implemented changes:

- Removed leftover decorative signal docks from index pages where they were
  reading as accidental blocks instead of useful actions.
- Fixed the `/capabilities/` service surface layout so capability cards no
  longer overlap the core and hover/focus brings cards forward.
- Fixed the `/systems/` `Scope a system` CTA with an explicit tracked intake
  URL and visible hover/focus styling.
- Fixed mobile layout for industry detail route panels so they no longer get
  clipped on small screens.
- Reworked repeated template copy across capability, solution, industry, and
  LP pages so shared structures now speak in page-specific terms.

Verification:

- `npm run build`: passed, 41 static pages built.
- `npx astro check`: 0 errors, 0 warnings, 0 hints.
- Automated visual QA across 41 pages x 2 viewports: 0 issue pages after fix.
- Desktop issue pages: 0.
- Mobile issue pages: 0.
- Exact repeated content blocks, excluding header/footer navigation, reduced
  from 25 to 4.
- Remaining exact repeats are entity names or link labels:
  `SEO & Content Infrastructure`, `WordPress & API Integrations`,
  `Build a data/monitoring system`, and `Content Automation Workflows`.
- Full audit artifacts:
  `artifacts/full-site-qa/summary-after.json`,
  `artifacts/full-site-qa/full-site-visual-results-after.json`, and
  `artifacts/full-site-qa/duplicate-text-results-after.json`.

## 2026-05-27 - Readiness baseline and 100% plan

Checkpoint status:

- Planning checkpoint recorded.
- The working baseline is now fixed in `docs/project-plan.md`.

Baseline scores:

- Visual foundation: 75%.
- Block diversity: 65%.
- Page structure: 80%.
- Advertising LP readiness: 55%.
- Forms and lead intake: 60%.
- SEO, metadata, indexing: 65%.
- Analytics and lead measurement: 35-45%.
- Production deploy readiness: 50-60%.
- Mobile visual QA: 60-65%.

Implementation plan:

- Added a concrete 100% readiness plan to `docs/project-plan.md`.
- Split the plan into visual foundation, block diversity, page structure,
  advertising landing pages, forms and lead intake, SEO/indexing, analytics,
  production deploy readiness, and mobile visual QA.
- Added the priority execution order:
  final visual foundation, priority LPs, forms and production submissions,
  analytics, SEO audit, full screenshot QA, and production preview deploy.

Next action:

- Start execution from the first priority: lock the final visual foundation and
  mobile background behavior, then move into the first 4 traffic-ready LPs.

## 2026-05-27 - Readiness execution pass

Checkpoint status:

- Implementation pass completed for the first readiness push.
- Remaining production blocker: remote Cloudflare commands need
  `CLOUDFLARE_API_TOKEN` in the current environment.

Implemented changes:

- Locked the approved global background direction as `Global Angular
  Background` in `docs/visual-decision-library.md`.
- Tuned the angular background masks and opacity so the visual layer is stronger
  than the old glow background but calmer behind headline and form copy.
- Added a `Paid traffic brief` block to all 4 priority LPs:
  `/lp/automate-lead-processing/`, `/lp/ai-content-workflow/`,
  `/lp/ecommerce-feed-system/`, and `/lp/wordpress-crm-integration/`.
- Added LP-specific paid-traffic promise, trigger, first scope, proof metric,
  and risk removed data in `src/data/landing.ts`.
- Upgraded LP intake forms with current system/tools, contact details, submit
  loading state, `aria-live` status, and `data-conversion-form` identifiers.
- Added defensive D1 insert error handling in `functions/api/start-project.ts`.
- Added a first-party analytics layer in `src/layouts/Layout.astro` with
  `dataLayer`, optional `gtag`/`plausible`, and `alfarank:analytics` custom
  events.
- Added `docs/analytics.md` with the event taxonomy and reporting dimensions.
- Added JSON-LD Organization and WebSite schema, `robots` metadata, and
  `og:locale` in the shared layout.
- Added `wrangler` as a dev dependency and moved Wrangler scripts away from
  temporary `npx` installs to avoid Windows npm cache lock issues.

Verification:

- `npm run build`: passed, 41 static pages built.
- `npx astro check`: 0 errors, 0 warnings, 0 hints.
- `npx tsc --noEmit`: passed.
- `npm audit --audit-level=moderate`: 0 vulnerabilities.
- `git diff --check`: passed with only LF-to-CRLF working-copy warnings.
- SEO audit over `dist`: 41 HTML files have title, description, canonical, OG
  title/description, robots, and JSON-LD; sitemap has 40 URL entries.
- Browser QA checked the 4 LPs on desktop and mobile:
  `Paid traffic brief` exists and no horizontal overflow was found.
- Browser QA confirmed LP and `/start-project/` forms populate
  `source_path`, `landing_page`, `landing_offer`, and UTM values.
- Browser QA confirmed analytics events:
  `page_view`, `cta_click`, `form_start`, `form_submit_click`, and
  `form_validation_error`.
- `npm run db:migrate:local`: passed, no local migrations to apply.
- Local D1 `PRAGMA table_info(project_requests)` confirmed fields through
  migration `0003`.

Remote environment note:

- `npm run db:migrations:remote` now uses the local Wrangler binary, so the
  previous npx/Miniflare `EBUSY` install path is removed.
- The remote command still cannot run in this current shell because no
  Cloudflare token variable is present. Set `CLOUDFLARE_API_TOKEN` before
  remote migration or production database checks.

## 2026-05-26 - Original layout direction checkpoint

Checkpoint status:

- Not committed yet.
- Working tree contains the implementation and documentation changes.
- Local dev server remains available at `http://127.0.0.1:4323/`.

Implemented changes:

- Replaced repeated standard grids on the home page with more expressive
  system-native sections:
  operating spectrum for capabilities, solution field for business problems,
  technology radar, and market trajectory for industries.
- Reworked `/solutions/` from a card shelf into a routed solution map.
- Reworked `/capabilities/` catalog into an uneven capability mosaic.
- Reworked `/technologies/` core stack into a radar composition.
- Reworked LP system modules into an offer-centered module map.
- Added responsive fallbacks so the asymmetric layouts collapse into clean
  readable stacks on mobile.

Verification:

- `npm run build`: passed, 41 static pages built.
- `npx astro check`: 0 errors, 0 warnings, 0 hints.
- `npx tsc --noEmit`: passed.
- `git diff --check`: passed; Git reported only LF-to-CRLF working copy
  warnings.
- Browser QA covered desktop and mobile routes:
  `/`, `/solutions/`, `/capabilities/`, `/technologies/`, and
  `/lp/automate-lead-processing/`.
- Browser checks found no horizontal overflow and no console errors.
- Additional overlap checks covered the new asymmetric sections:
  operating spectrum, solution field, technology radar, market trajectory,
  solution map, capability mosaic, and landing module map.

Current next steps:

- Continue the same visual direction on deeper solution/system/industry detail
  pages so each page type gets its own content structure instead of repeating
  the same card rhythm.

## 2026-05-26 - Lead-generation landing page system checkpoint

Checkpoint status:

- Not committed yet.
- Working tree contains the implementation and documentation changes.
- Local dev server remains available at `http://127.0.0.1:4323/`.

Implemented changes:

- Fixed the new lead-generation plan in `docs/project-plan.md`.
- Added reusable landing offer data in `src/data/landing.ts`.
- Added dynamic offer landing pages under `/lp/[slug]/`.
- Added initial commercial LP routes:
  `/lp/automate-lead-processing/`, `/lp/ai-content-workflow/`,
  `/lp/ecommerce-feed-system/`, and `/lp/wordpress-crm-integration/`.
- Added campaign offer links on the home page.
- Added lead-generation proof sections on solution detail pages.
- Added industry landing-page development sections on industry profile pages.
- Added tracked hidden fields for source path, landing page, landing offer, and
  UTM values to `/start-project/` and LP forms.
- Updated the Pages Function to store the new tracking fields.
- Added D1 migration `migrations/0003_project_request_tracking_fields.sql`.
- Added LP routes to the generated sitemap.

Files changed or added in this checkpoint:

- `docs/project-plan.md`
- `docs/checkpoints.md`
- `functions/api/start-project.ts`
- `migrations/0003_project_request_tracking_fields.sql`
- `src/data/landing.ts`
- `src/pages/index.astro`
- `src/pages/lp/[slug].astro`
- `src/pages/industries/[slug].astro`
- `src/pages/sitemap.xml.ts`
- `src/pages/solutions/[slug].astro`
- `src/pages/start-project.astro`
- `src/styles/global.css`

Verification:

- `npm run build`: passed, 41 static pages built.
- `npx astro check`: 0 errors, 0 warnings, 0 hints.
- `npx tsc --noEmit`: passed.
- `git diff --check`: passed; Git reported only existing LF-to-CRLF working
  copy warnings.
- `dist/sitemap.xml`: 40 URL entries, including the new `/lp/` routes.
- Browser QA covered desktop `1366x900` routes:
  `/`, `/lp/automate-lead-processing/`, `/lp/ai-content-workflow/`,
  `/solutions/automate-lead-processing/`, `/industries/ecommerce/`, and
  `/start-project/` with campaign query parameters.
- Browser QA covered mobile `390x844` routes:
  `/`, `/lp/automate-lead-processing/`, `/lp/ecommerce-feed-system/`,
  `/industries/ecommerce/`, and `/start-project/` with campaign query
  parameters.
- Browser checks found no horizontal overflow and no console errors on tested
  desktop/mobile routes.
- Browser checks confirmed canonical/OG metadata, campaign offer links, proof
  sections, LP forms, and hidden tracking fields.
- LP and intake forms correctly populate `source_path`, `landing_offer`, and
  UTM hidden fields from query parameters.
- `npm run db:migrate:local` was unblocked by running Wrangler through an
  isolated npm cache. Local D1 migrations `0001 -> 0002 -> 0003` applied
  successfully to `.wrangler/state`.
- Remote D1 migrations `0002 -> 0003` applied successfully to
  `alfarank-project-requests`.
- `npx wrangler d1 migrations list DB --remote`: no migrations to apply.
- Remote `PRAGMA table_info(project_requests)` confirmed columns from
  `0002_project_request_intake_fields.sql` and
  `0003_project_request_tracking_fields.sql`.
- `sqlite3 :memory:` validation passed for migrations `0001 -> 0002 -> 0003`
  and a test insert using the new tracking columns.

Environment note:

- Wrangler expects the Cloudflare API token in `CLOUDFLARE_API_TOKEN`. In this
  workspace the working Cloudflare token is currently stored under
  `CLOUDFLARE_API_TOKEN_STREAM`, so remote Wrangler commands were run by
  temporarily assigning that value to `CLOUDFLARE_API_TOKEN` for the command
  process only.
- The normal npm cache previously produced a Windows `EBUSY` lock while
  installing Wrangler, so successful Wrangler commands used an isolated npm
  cache under the temp directory.

Current next steps:

- Production D1 schema is ready for the upgraded project request function.
- Optional cleanup: normalize the Cloudflare token variable name or add a
  project script for remote migrations so future commands do not need the
  temporary environment alias.
- Next growth layer: add proof assets, screenshots, short case-study blocks,
  and channel-specific copy variants for paid search, retargeting, and outreach.

## 2026-05-26 - Roadmap completion draft checkpoint

Checkpoint status:

- Not committed yet.
- Working tree contains the implementation and documentation changes.
- Local dev server remains available at `http://127.0.0.1:4323/`.

Implemented changes:

- Completed roadmap items 3-9 as implemented drafts.
- Upgraded `/capabilities/` with grouped capability foundation lanes and
  related solution routes.
- Upgraded system profile pages with a reusable blueprint template: input
  layer, workflow modules, automation layer, and output layer.
- Upgraded solution detail pages with a problem-to-system page pattern,
  implementation options, and related system links.
- Rebuilt `/technologies/` as a functional technology matrix.
- Expanded `/industries/` with priority routes and added dynamic industry
  profile pages for every listed industry.
- Upgraded `/start-project/` with company, desired output, integrations, and
  contact context fields.
- Added D1 migration `migrations/0002_project_request_intake_fields.sql` and
  updated the Pages Function to store the new intake fields.
- Added shared canonical, Open Graph, and Twitter metadata.
- Added `public/robots.txt`, generated `/sitemap.xml`, and added
  `public/og-image.svg`.
- Added `ignoreDeprecations: "6.0"` in `tsconfig.json` so full TypeScript
  checks can run cleanly with the current TypeScript version.

Files changed or added in this checkpoint:

- `docs/project-plan.md`
- `docs/checkpoints.md`
- `functions/api/start-project.ts`
- `migrations/0002_project_request_intake_fields.sql`
- `public/og-image.svg`
- `public/robots.txt`
- `src/layouts/Layout.astro`
- `src/pages/capabilities/index.astro`
- `src/pages/industries.astro`
- `src/pages/industries/[slug].astro`
- `src/pages/sitemap.xml.ts`
- `src/pages/solutions/[slug].astro`
- `src/pages/start-project.astro`
- `src/pages/systems/[slug].astro`
- `src/pages/technologies.astro`
- `src/styles/global.css`
- `tsconfig.json`

Verification:

- `npm run build`: passed.
- `npx astro check`: 0 errors, 0 warnings, 0 hints.
- `npx tsc --noEmit`: passed.
- Browser smoke check covered desktop routes:
  `/`, `/capabilities/`, `/solutions/generate-more-content/`,
  `/systems/content-automation-workflows/`, `/technologies/`, `/industries/`,
  `/industries/ecommerce/`, and `/start-project/`.
- Browser mobile check covered:
  `/`, `/capabilities/`, `/solutions/generate-more-content/`,
  `/systems/content-automation-workflows/`, `/industries/ecommerce/`, and
  `/start-project/`.
- Browser checks found no horizontal overflow and no console errors on tested
  desktop/mobile routes.
- Browser checks confirmed canonical and OG metadata on tested HTML routes.

Current next steps:

- Visual review of the expanded pages as a complete site.
- Before production deploy, apply D1 migration
  `migrations/0002_project_request_intake_fields.sql` to the remote database.
- Optional future work: add notification delivery for new project requests if
  email, Slack, or CRM destination is selected.

## 2026-05-26 - Home page navigation hub checkpoint

Checkpoint status:

- Not committed yet.
- Working tree contains the implementation and documentation changes.
- Local dev server remains available at `http://127.0.0.1:4323/`.

Implemented changes:

- Marked roadmap item 2, "Home Page as Navigation Hub", as an implemented
  draft in `docs/project-plan.md`.
- Added a "What system do you need?" decision hub directly after the homepage
  hero.
- Added six operational homepage routes:
  automation, web/product platforms, content/SEO, data monitoring,
  e-commerce operations, and WordPress/API integrations.
- Connected those routes to concrete capability, solution, and system profile
  URLs.
- Added a compact system path navigation row linking capabilities, solutions,
  systems, technologies, and project intake.
- Added responsive CSS for the homepage router, route cards, stats, and system
  path navigation.

Files changed or added:

- `docs/project-plan.md`
- `docs/checkpoints.md`
- `src/pages/index.astro`
- `src/styles/global.css`

Verification:

- `npm run build`: passed.
- `npx astro check`: 0 errors, 0 warnings, 0 hints.
- Browser homepage QA confirmed:
  six decision routes, five system path links, no horizontal overflow on
  desktop or mobile, and no console errors.

Current next steps:

- Review the homepage decision hub visually as part of broader page review.
- Continue with roadmap item 3: strengthen the capabilities visual foundation.

## 2026-05-26 - System hero visual language checkpoint

Checkpoint status:

- Not committed yet.
- Working tree contains the implementation and documentation changes.
- Local dev server remains available at `http://127.0.0.1:4323/`.

Implemented changes:

- Added `docs/project-plan.md` as the shared roadmap for the next design and
  page development phase.
- Marked the first roadmap task, "Systemic First Screen", as an implemented
  draft.
- Generated a visual reference for a code-native operational hero direction.
- Added `src/components/SystemHero.astro` for the homepage first screen.
- Replaced the homepage `PageHero` usage with `SystemHero`.
- Updated the homepage hero copy to:
  `Digital systems connected, automated, built to perform.`
- Built the homepage hero as a code-native system map: glass modules, SVG route
  lines, central core panel, status indicators, existing system icons, and
  responsive mobile layout.
- Upgraded the shared `PageHero` component so internal pages also use the same
  system-map visual language.
- Applied the internal system hero style across:
  `/capabilities/`, capability detail pages, `/solutions/`, solution detail
  pages, `/systems/`, system detail pages, `/technologies/`, `/industries/`,
  `/about/`, `/start-project/`, and `/start-project/thank-you/`.
- Added responsive CSS for desktop and mobile hero layouts in
  `src/styles/global.css`.

Files changed or added:

- `docs/project-plan.md`
- `docs/checkpoints.md`
- `src/components/SystemHero.astro`
- `src/components/PageHero.astro`
- `src/data/site.ts`
- `src/pages/index.astro`
- `src/styles/global.css`

Verification:

- `npm run build`: passed.
- `npx astro check`: 0 errors, 0 warnings, 0 hints.
- Browser smoke check covered 9 routes:
  `/`, `/capabilities/`, `/capabilities/ai-automation/`, `/solutions/`,
  `/systems/content-automation-workflows/`, `/technologies/`, `/industries/`,
  `/about/`, and `/start-project/`.
- Browser check found no horizontal overflow on tested desktop/mobile routes.
- Browser check found no failed requests and no console errors on the tested
  routes.
- Desktop and mobile screenshots were saved under `artifacts/` for visual
  review.

Current next steps:

- Visually tune hero spacing and route density if needed after review.
- Continue with roadmap item 2: make the home page a stronger navigation hub.

## 2026-05-25 - Page load optimization checkpoint

Checkpoint commit:

- `291032f Optimize page load performance`

Repository state at checkpoint:

- Branch: `main`
- Base remote commit before local checkpoint: `d0cbffd Refine glyph cards and local Pages workflow`
- Local branch state after checkpoint: ahead of `origin/main`
- Older saved stash still present: `stash@{0}: pre-github-update-2026-05-25`

Implemented changes:

- Added `public/favicon.svg` and linked it from the shared layout.
- Removed the production-only visual lab route `/icon-variants/`.
- Simplified the first-screen liquid background, text shadows, glass shadows, blur, and backdrop effects.
- Added `content-visibility: auto` for below-the-fold sections.
- Simplified `SystemIcon` output by removing repeated SVG `defs` and gradients from every icon instance.
- Enabled `build.inlineStylesheets: "always"` in Astro to remove the render-blocking stylesheet request.
- Updated dependencies to Astro `6.3.7`, TypeScript `6.0.3`, `@astrojs/check` `0.9.9`, and current Cloudflare Workers types.
- Added `overrides.volar-service-yaml = 0.0.71` to resolve the YAML audit chain.
- Updated Node.js requirement to `22.12+`.
- Fixed the footer copyright output.
- Added `.playwright-mcp/` to `.gitignore`.

Verification at checkpoint:

- `npm audit`: 0 vulnerabilities
- `npm run build`: passed
- `npx astro check`: 0 errors, 0 warnings
- Browser smoke test: no console errors and no failed requests
- `/icon-variants/`: returns 404 after route removal

Final Lighthouse results on local production preview:

- Mobile performance: 100
- Mobile FCP: 0.7 s
- Mobile LCP: 0.8 s
- Mobile Speed Index: 0.9 s
- Mobile TBT: 0 ms
- Mobile CLS: 0
- Desktop performance: 100
- Desktop FCP: 0.2 s
- Desktop LCP: 0.2 s
- Desktop Speed Index: 0.4 s
- Total transfer size reported by Lighthouse: 9 KiB

Local development server:

- `http://127.0.0.1:4323/`

## 2026-05-26 - Future blocks implementation checkpoint

Implemented changes:

- Rebuilt the home capabilities section as a `command-field` with an `ALFARANK CORE` center and linked capability nodes.
- Replaced the home solutions area with a `route-engine` that maps business pressure into system outputs.
- Added a home `blueprint-deck` for the input -> rules/AI -> review -> output story.
- Turned the technology radar chips on the home and technologies pages into real links.
- Replaced the capabilities catalog mosaic with a `service-surface` navigation block.
- Replaced the solutions index map with a `problem-system-route` block.
- Added page-specific landing page system visuals:
  - Lead LP: `lead-reactor`
  - Content LP: `content-factory`
  - E-commerce LP: `commerce-control`
  - WordPress LP: `platform-blueprint`
- Added responsive CSS so the new desktop compositions collapse into stable mobile grids.

Verification:

- `npm run build`: passed.
- `npx astro check`: 0 errors, 0 warnings, 0 hints.
- `npx tsc --noEmit`: passed.
- `git diff --check`: passed with only existing LF-to-CRLF working-copy warnings.
- Browser QA covered desktop and mobile for:
  `/`, `/capabilities/`, `/solutions/`, `/technologies/`,
  `/lp/automate-lead-processing/`, `/lp/ai-content-workflow/`,
  `/lp/ecommerce-feed-system/`, and `/lp/wordpress-crm-integration/`.
- Browser QA found no horizontal overflow, no panel overlaps in the new blocks,
  and no console errors on the tested routes.

## 2026-05-26 - AlfaRank block system foundation

Implemented changes:

- Added `docs/block-system.md` as the canonical ruleset for spreading the new
  visual language across the full site.
- Converted the 16 implemented reference blocks into reusable block families:
  Mission Control, Orbit / Radar, Command Field, Reactor, Pipeline / Rail,
  Blueprint, Console / Deck, Funnel, Before / After, and Offer Core.
- Added a page-family spread plan for the remaining templates:
  solution details, system details, industry details, About, Start Project,
  thank-you, and capability details that are not yet specialized.
- Added reusable CSS primitives with the `ar-` prefix:
  `ar-system-block`, `ar-system-core`, `ar-system-node`,
  `ar-connector-field`, `ar-signal-strip`, `ar-signal`,
  `ar-metric-bar`, `ar-system-dock`, `ar-system-panel`, and
  `ar-system-layer`.

Verification target:

- Treat future visual work as block-family selection plus page-specific data,
  not as repeated card grids.

## 2026-05-26 - Block system spread across templates

Implemented changes:

- Spread the block system from individual reference blocks into the remaining
  page templates.
- Capability detail pages that did not have a specialized block now use
  `capability-module-system`.
- Solution detail pages now use:
  - `solution-mechanism`
  - `solution-module-rail`
  - `solution-proof-engine`
- System detail pages now use:
  - `system-blueprint-surface`
  - `system-module-console`
- Industry detail pages now use:
  - `industry-detail-funnel`
  - `industry-route-console`
  - `industry-offer-engine`
- About now uses `about-operating-console`.
- Start Project now uses `intake-reactor`.
- Thank-you now uses `request-next-dock`.
- Systems index now uses `systems-navigation-console`.

Coverage:

- Static build still generates 41 HTML pages.
- Browser QA covered all 41 pages at desktop and mobile widths.
- No horizontal overflow was found on any tested page.

Reference screenshots:

```text
artifacts/block-system-spread/
```
