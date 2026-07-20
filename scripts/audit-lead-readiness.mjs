import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];
const passed = [];

function absolute(relativePath) {
  return path.join(root, relativePath);
}

function exists(relativePath) {
  return existsSync(absolute(relativePath));
}

function read(relativePath) {
  const filePath = absolute(relativePath);
  if (!existsSync(filePath)) {
    failures.push(`${relativePath}: missing file`);
    return "";
  }
  return readFileSync(filePath, "utf8");
}

function check(label, condition, failureDetail) {
  if (condition) {
    passed.push(label);
  } else {
    failures.push(failureDetail || label);
  }
}

function checkIncludes(filePath, label, needles) {
  const source = read(filePath);
  const missing = needles.filter((needle) => !source.includes(needle));
  check(label, missing.length === 0, `${filePath}: missing ${missing.join(", ")}`);
}

function checkRouteHtml(routePath, label, needles) {
  checkIncludes(path.join("dist", routePath, "index.html"), label, needles);
}

const requiredFiles = [
  "functions/api/start-project.ts",
  "functions/api/lead-report.ts",
  "functions/api/lead-status.ts",
  "functions/api/lead-export.ts",
  "migrations/0004_project_request_attribution_fields.sql",
  "migrations/0005_project_request_routing_fields.sql",
  "migrations/0006_project_request_lifecycle_fields.sql",
  "migrations/0007_project_request_status_events.sql",
  "migrations/0008_project_request_notification_events.sql",
  "migrations/0009_project_request_form_variant.sql",
  "scripts/smoke-lead-flow.mjs",
  "scripts/audit-d1-lead-migrations.mjs",
  "scripts/audit-lead-analytics.mjs",
  "scripts/run-local-lead-flow.mjs",
  "scripts/run-remote-lead-flow.mjs",
  "scripts/audit-cloudflare-pages-lead-config.mjs",
  "scripts/audit-lead-production-env.mjs",
  "scripts/prepare-lead-production-env.mjs",
  "scripts/sync-cloudflare-pages-lead-env.mjs",
  "scripts/run-lead-launch-gate.mjs",
  "scripts/run-lead-production-status.mjs",
  "scripts/write-lead-production-checklist.mjs",
  "config/lead-production.env.example",
  "src/components/ContactChannels.astro",
  "src/components/LeadAssurance.astro",
  "src/components/LeadProofPatterns.astro",
  "src/components/TurnstileField.astro",
  "src/pages/start-project.astro",
  "src/pages/lp/[slug].astro",
  "src/pages/partner-program.astro",
  "src/pages/[locale]/partner-program.astro",
  "src/pages/lead-desk.astro",
  "docs/lead-generation-readiness.md",
  "docs/form-handling.md",
  "docs/deployment-protocol.md",
  "docs/analytics.md"
];

requiredFiles.forEach((filePath) => check(`${filePath} exists`, exists(filePath), `${filePath}: missing file`));

const trackingFields = [
  'name="source_path"',
  'name="landing_page"',
  'name="landing_offer"',
  'name="form_variant"',
  'name="locale"',
  'name="referrer"',
  'name="lead_channel"',
  'name="partner_ref"',
  'name="utm_source"',
  'name="utm_medium"',
  'name="utm_campaign"',
  'name="utm_term"',
  'name="utm_content"'
];

checkIncludes("src/pages/start-project.astro", "start-project forms preserve attribution fields", [
  'data-conversion-form="quick-intake"',
  'data-conversion-form="start-project"',
  "<LeadAssurance",
  "<LeadProofPatterns",
  "<TurnstileField",
  ...trackingFields
]);

checkIncludes("src/pages/lp/[slug].astro", "landing page forms preserve campaign attribution fields", [
  "landingFullVariant",
  "landingQuickVariant",
  "data-conversion-form={landingFullVariant}",
  "data-conversion-form={landingQuickVariant}",
  "<ContactChannels",
  "<LeadAssurance",
  "<LeadProofPatterns",
  "<TurnstileField",
  ...trackingFields
]);

checkIncludes("src/pages/partner-program.astro", "partner intake preserves partner attribution fields", [
  'data-partner-intake',
  'data-conversion-form="partner-program"',
  'name="landing_offer" value="partner-program"',
  'name="form_variant" value="partner-program"',
  'name="lead_channel" value="partner"',
  'partner_ref: ["partner_ref", "partner", "ref", "affiliate", "affiliate_id"]',
  "<TurnstileField",
  "<ContactChannels",
  ...trackingFields
]);

checkIncludes("functions/api/start-project.ts", "start-project API stores attribution, routing, lifecycle, and notification context", [
  "leadChannel(",
  "leadRouting(",
  "form_variant",
  "inferFormVariant",
  "lead_score",
  "lead_priority",
  "routing_bucket",
  "next_action",
  "LEAD_WEBHOOK_URL",
  "LEAD_TELEGRAM_BOT_TOKEN",
  "TURNSTILE_SECRET_KEY",
  "cf-turnstile-response",
  "project_request_notification_events",
  "recordNotificationEvents",
  "lead_desk_url"
]);

checkIncludes("functions/api/lead-report.ts", "lead report exposes source, offer, routing, and lifecycle breakdowns", [
  "by_channel",
  "by_locale",
  "by_status",
  "by_priority",
  "by_bucket",
  "by_offer",
  "by_form_variant",
  "by_utm_source",
  "by_utm_medium",
  "by_utm_campaign",
  "by_partner",
  "partner_performance",
  "partnerPerformanceSources",
  "source_performance",
  "sourcePerformanceChannels",
  "sourcePerformanceOffers",
  "sourcePerformanceFormVariants",
  "sourcePerformanceUtmSources",
  "sourcePerformanceUtmCampaigns",
  "performanceRows",
  "by_sla",
  "by_follow_up_sla",
  "overdue_count",
  "follow_up_stale_count",
  "follow_up_due_soon_count",
  "needs_owner_count",
  "needs_next_action_count",
  "active_count",
  "contacted_count",
  "qualified_or_better_count",
  "won_count",
  "response_sla",
  "response_due_at",
  "response_remaining_hours",
  "responseDueAtSql",
  "responseRemainingHoursSql",
  "partnerFilter",
  "reportFilters",
  "column(\"status\")",
  "column(\"locale\")",
  "column(\"form_variant\")",
  "column(\"utm_source\")",
  "column(\"utm_medium\")",
  "column(\"utm_campaign\")",
  'url.searchParams.get("locale")',
  'url.searchParams.get("utm_source")',
  'url.searchParams.get("utm_medium")',
  'url.searchParams.get("utm_campaign")',
  "formVariant",
  "partnerRef",
  "responseSla",
  "followUpSla",
  "createdFrom",
  "createdTo",
  "owner",
  "needsOwner",
  "needsNextAction",
  'url.searchParams.get("response_sla")',
  'url.searchParams.get("follow_up_sla")',
  'url.searchParams.get("created_from")',
  'url.searchParams.get("created_to")',
  'booleanParam(url, "needs_owner")',
  'booleanParam(url, "needs_next_action")',
  "filters:",
  "locale: filters.locale",
  "utm_source: filters.utmSource",
  "utm_medium: filters.utmMedium",
  "utm_campaign: filters.utmCampaign",
  "response_sla: filters.responseSla",
  "follow_up_sla: filters.followUpSla",
  "created_from: filters.createdFrom",
  "created_to: filters.createdTo",
  "needs_owner: filters.needsOwner",
  "needs_next_action: filters.needsNextAction",
  "business_problem",
  "desired_result",
  "contact_details",
  "action_queue",
  "status_events",
  "notification_events",
  "project_request_notification_events",
  "project_request_status_events",
  "LEAD_REPORT_TOKEN"
]);

checkIncludes("functions/api/lead-status.ts", "lead status endpoint updates lifecycle state and writes status event history", [
  "lead_owner",
  "lead_follow_up_note",
  "lead_status_updated_at",
  "next_action",
  "project_request_status_events",
  "previous_status",
  "status_event",
  "crypto.randomUUID",
  "LEAD_REPORT_TOKEN",
  "project_request.status_updated",
  "notifyLeadStatus",
  "LEAD_WEBHOOK_URL",
  "LEAD_TELEGRAM_BOT_TOKEN",
  "project_request_notification_events",
  "recordNotificationEvents",
  "lead_desk_url"
]);

checkIncludes("functions/api/lead-export.ts", "lead export includes attribution, routing, and lifecycle columns", [
  "lead_channel",
  "locale",
  "partner_ref",
  "form_variant",
  'url.searchParams.get("locale")',
  "locale = ?",
  'url.searchParams.get("form_variant")',
  'url.searchParams.get("utm_source")',
  'url.searchParams.get("utm_medium")',
  'url.searchParams.get("utm_campaign")',
  "utm_source = ?",
  "utm_medium = ?",
  "utm_campaign = ?",
  'url.searchParams.get("partner_ref")',
  'url.searchParams.get("response_sla")',
  'url.searchParams.get("follow_up_sla")',
  'url.searchParams.get("created_from")',
  'url.searchParams.get("created_to")',
  'booleanParam(url, "needs_owner")',
  'booleanParam(url, "needs_next_action")',
  "lead_score",
  "lead_priority",
  "routing_bucket",
  "next_action",
  "needs_owner",
  "needs_next_action",
  "response_sla",
  "follow_up_sla",
  "follow_up_age_hours",
  "followUpStateSql",
  "followUpAgeHoursSql",
  "response_age_hours",
  "response_due_hours",
  "response_due_at",
  "response_remaining_hours",
  "responseDueAtSql",
  "responseRemainingHoursSql",
  "lead_owner",
  "lead_follow_up_note"
]);

checkIncludes("scripts/run-local-lead-flow.mjs", "local lead flow wrapper starts Pages runtime and verifies report-backed smoke", [
  "wrangler",
  "pages",
  "dev",
  "db:migrate:local",
  "LEAD_SMOKE_BASE_URL",
  "LEAD_REPORT_TOKEN",
  "LEAD_WEBHOOK_URL",
  "LEAD_WEBHOOK_TOKEN",
  "project_request.created",
  "project_request.status_updated",
  "verifyWebhookEvents",
  "LEAD_SMOKE_EXPECT_NOTIFICATION_EVENTS",
  "qa:lead-flow"
]);

checkIncludes("scripts/smoke-lead-flow.mjs", "lead smoke verifies offer and partner reporting/export coverage", [
  "by_offer",
  "by_locale",
  "by_form_variant",
  "by_partner",
  "partner_performance",
  "source_performance",
  "by_sla",
  "by_utm_source",
  "by_utm_medium",
  "by_utm_campaign",
  "source performance",
  "response_sla",
  "status_event",
  "status_events",
  "notification_events",
  "LEAD_SMOKE_EXPECT_NOTIFICATION_EVENTS",
  "qualified_or_better_count",
  "LEAD_SMOKE_REQUIRE_REPORT",
  "verifyFilteredReport",
  "verifyPartnerExport",
  'response_sla: "touched"',
  "SLA-filtered export",
  "response_due_at",
  "response_remaining_hours",
  "follow_up_sla",
  "follow_up_age_hours",
  "follow-up-filtered",
  "date-filtered",
  "locale-filtered",
  "UTM-source-filtered",
  "UTM-medium-filtered",
  "UTM-campaign-filtered",
  "needs_owner",
  "needs_next_action",
  "owner-filtered",
  "needs-owner-filtered",
  "follow-up context",
  "business_problem",
  "desired_result",
  "form_variant",
  "partner_ref"
]);

checkIncludes("scripts/run-remote-lead-flow.mjs", "remote lead flow wrapper enforces preview/production report-backed smoke", [
  "LEAD_SMOKE_BASE_URL",
  "LEAD_REPORT_TOKEN",
  "LEAD_SMOKE_REQUIRE_REPORT",
  "audit-lead-production-env.mjs",
  "smoke-lead-flow.mjs",
  "--dry-run",
  "--allow-localhost"
]);

checkIncludes("scripts/audit-d1-lead-migrations.mjs", "remote D1 lead migrations audit checks local files, no pending remote migrations, and required schema", [
  "wrangler",
  "d1",
  "migrations",
  "list",
  "PRAGMA table_info(",
  "project_request_status_events",
  "project_request_notification_events",
  "form_variant",
  "artifacts/lead-d1-migrations-summary.json",
  "secret_values_printed",
  "no_pending_remote_migrations",
  "remote_columns_by_table"
]);

checkIncludes("scripts/audit-cloudflare-pages-lead-config.mjs", "Cloudflare Pages lead config audit checks project, deployment, D1 binding, and lead env names without printing values", [
  "CLOUDFLARE_ACCOUNT_ID",
  "CLOUDFLARE_API_TOKEN",
  "/pages/projects/",
  "LEAD_REPORT_TOKEN",
  "LEAD_WEBHOOK_URL",
  "PUBLIC_CONTACT_EMAIL",
  "PUBLIC_GTM_ID",
  "d1_databases",
  "--allow-missing-lead-env",
  "--summary-file",
  "artifacts/lead-cloudflare-summary.json",
  "secret_values_printed",
  "visible_env_names",
  "lead_env_readiness",
  "writeSummary"
]);

checkIncludes("scripts/audit-lead-production-env.mjs", "production lead env preflight checks notification, analytics, contact, report, and Turnstile config", [
  "LEAD_REPORT_TOKEN",
  "LEAD_WEBHOOK_URL",
  "LEAD_TELEGRAM_BOT_TOKEN",
  "PUBLIC_CONTACT_EMAIL",
  "PUBLIC_GTM_ID",
  "PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "--summary-file",
  "artifacts/lead-production-env-summary.json",
  "secret_values_printed",
  "next_required_inputs",
  "placeholder_names",
  "writeSummary"
]);

checkIncludes("scripts/prepare-lead-production-env.mjs", "lead production env preparation creates an ignored draft with generated report token", [
  "randomBytes",
  ".env.lead.production.local",
  "config/lead-production.env.example",
  "LEAD_REPORT_TOKEN",
  "--dry-run",
  "--force"
]);

checkIncludes("scripts/sync-cloudflare-pages-lead-env.mjs", "lead production env sync validates and uploads filled lead env to Cloudflare Pages without printing values", [
  "audit-lead-production-env.mjs",
  "/pages/projects/",
  "deployment_configs",
  "secret_text",
  "plain_text",
  "LEAD_REPORT_TOKEN",
  "--apply",
  "--skip-post-apply-check",
  "--summary-file",
  "artifacts/lead-env-sync-summary.json",
  "secret_values_printed",
  "planned_env_vars",
  "hidden_current_secret_names",
  "post_apply_check",
  "writeSummary",
  "Post-apply Cloudflare env name/type check passed",
  "Dry-run only"
]);

checkIncludes("scripts/run-lead-launch-gate.mjs", "lead launch gate orchestrates pre-apply and live production readiness checks", [
  "qa:lead-readiness",
  "audit-lead-analytics.mjs",
  "qa:lead-d1",
  "qa:lead-env",
  "lead-env:sync",
  "qa:lead-cloudflare",
  "qa:lead-flow:local",
  "qa:lead-flow:remote",
  "--phase",
  "pre-apply",
  "live",
  "--skip-local-smoke",
  "--summary-file",
  "artifacts/lead-launch-gate-summary.json",
  "secret_values_printed",
  "writeSummary",
  "result"
]);

checkIncludes("scripts/run-lead-production-status.mjs", "lead production status aggregates env, Cloudflare, and launch-gate blockers without printing values", [
  "audit-lead-production-env.mjs",
  "audit-cloudflare-pages-lead-config.mjs",
  "audit-d1-lead-migrations.mjs",
  "run-lead-launch-gate.mjs",
  "artifacts/lead-production-status.json",
  "artifacts/lead-production-env-summary.json",
  "artifacts/lead-cloudflare-summary.json",
  "artifacts/lead-d1-migrations-summary.json",
  "artifacts/lead-launch-gate-summary.json",
  "secret_values_printed",
  "blockers",
  "next_actions",
  "--summary-file",
  "--lead-env-file",
  "--cloudflare-env-file"
]);

checkIncludes("scripts/write-lead-production-checklist.mjs", "lead production checklist turns aggregate blockers into a no-secret handoff checklist", [
  "artifacts/lead-production-status.json",
  "artifacts/lead-production-checklist.md",
  "secret_values_printed: false",
  "LEAD_WEBHOOK_URL",
  "LEAD_TELEGRAM_BOT_TOKEN",
  "PUBLIC_CONTACT_EMAIL",
  "PUBLIC_GTM_ID",
  "qa:lead-d1",
  "artifacts/lead-env-sync-summary.json",
  "lead-env:sync",
  "qa:lead-launch",
  "partner_ref",
  "Secret values were not printed"
]);

checkIncludes("config/lead-production.env.example", "lead production env example lists required notification, contact, analytics, report, and Turnstile fields", [
  "LEAD_REPORT_TOKEN",
  "LEAD_WEBHOOK_URL",
  "LEAD_TELEGRAM_BOT_TOKEN",
  "PUBLIC_CONTACT_EMAIL",
  "PUBLIC_GTM_ID",
  "PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY"
]);

checkIncludes("package.json", "package scripts expose local lead smoke, production env preflight, and lead readiness audit", [
  "qa:lead-flow:local",
  "qa:lead-flow:remote",
  "qa:lead-env",
  "qa:lead-d1",
  "qa:lead-analytics",
  "qa:lead-cloudflare",
  "qa:lead-readiness",
  "qa:lead-launch",
  "qa:lead-production-status",
  "lead-env:prepare",
  "lead-env:checklist",
  "lead-env:sync"
]);

checkIncludes("migrations/0004_project_request_attribution_fields.sql", "migration 0004 adds attribution fields", [
  "locale",
  "referrer",
  "lead_channel",
  "partner_ref"
]);

checkIncludes("migrations/0005_project_request_routing_fields.sql", "migration 0005 adds routing fields", [
  "lead_score",
  "lead_priority",
  "routing_bucket",
  "next_action"
]);

checkIncludes("migrations/0006_project_request_lifecycle_fields.sql", "migration 0006 adds lifecycle fields", [
  "lead_owner",
  "lead_follow_up_note",
  "lead_status_updated_at"
]);

checkIncludes("migrations/0007_project_request_status_events.sql", "migration 0007 adds lifecycle status event history", [
  "project_request_status_events",
  "lead_id",
  "previous_status",
  "created_at"
]);

checkIncludes("migrations/0008_project_request_notification_events.sql", "migration 0008 adds notification delivery event history", [
  "project_request_notification_events",
  "event_type",
  "channel",
  "status_code",
  "error_message"
]);

checkIncludes("migrations/0009_project_request_form_variant.sql", "migration 0009 adds form variant tracking", [
  "form_variant",
  "idx_project_requests_form_variant"
]);

checkIncludes("src/layouts/Layout.astro", "layout emits first-party lead analytics events", [
  "page_view",
  "cta_click",
  "form_start",
  "form_validation_error",
  "form_submit_attempt",
  "quick_contact_click",
  "verified_lead_submit",
  "https://www.googletagmanager.com/gtag/js?id=",
  "PUBLIC_GTM_ID",
  "PUBLIC_GA_ID",
  "PUBLIC_GA_MEASUREMENT_ID",
  "PUBLIC_PLAUSIBLE_DOMAIN"
]);

checkIncludes("src/layouts/Layout.astro", "layout manages shared public lead form submit state", [
  "setLeadFormSubmitting",
  "data-submit-state",
  "aria-busy",
  "data-form-status",
  "pageshow"
]);

checkIncludes("src/components/ContactChannels.astro", "quick contact channels are env-driven and tracked", [
  "PUBLIC_CONTACT_EMAIL",
  "PUBLIC_CONTACT_TELEGRAM_URL",
  "PUBLIC_CONTACT_WHATSAPP_URL",
  "data-contact-channel"
]);

checkIncludes("src/components/TurnstileField.astro", "Turnstile widget is optional and env-driven", [
  "PUBLIC_TURNSTILE_SITE_KEY",
  "cf-turnstile",
  "data-sitekey"
]);

checkIncludes("src/data/i18n.ts", "partner program route is localized and included in route inventory", [
  '"/partner-program/"',
  "partnerProgram"
]);

if (!exists("dist")) {
  failures.push("dist: missing build output. Run `npm run build` before this audit.");
} else {
  checkRouteHtml("start-project", "built EN start-project page includes quick and full intake", [
    'data-conversion-form="quick-intake"',
    'data-conversion-form="start-project"',
    'name="form_variant" value="quick-intake"',
    'name="form_variant" value="start-project"',
    'name="lead_channel"',
    'name="partner_ref"'
  ]);

  checkRouteHtml("ru/start-project", "built RU start-project page includes tracked intake", [
    'data-conversion-form="quick-intake"',
    'data-conversion-form="start-project"',
    'name="form_variant" value="quick-intake"',
    'name="form_variant" value="start-project"',
    'name="locale" value="ru"'
  ]);

  checkRouteHtml("ro/start-project", "built RO start-project page includes tracked intake", [
    'data-conversion-form="quick-intake"',
    'data-conversion-form="start-project"',
    'name="form_variant" value="quick-intake"',
    'name="form_variant" value="start-project"',
    'name="locale" value="ro"'
  ]);

  checkRouteHtml("partner-program", "built EN partner program page includes partner intake", [
    'data-partner-intake',
    'data-conversion-form="partner-program"',
    'name="landing_offer" value="partner-program"',
    'name="form_variant" value="partner-program"',
    'name="lead_channel" value="partner"'
  ]);

  checkRouteHtml("ru/partner-program", "built RU partner program page includes partner intake", [
    'data-partner-intake',
    'name="locale" value="ru"',
    'name="landing_offer" value="partner-program"',
    'name="form_variant" value="partner-program"'
  ]);

  checkRouteHtml("ro/partner-program", "built RO partner program page includes partner intake", [
    'data-partner-intake',
    'name="locale" value="ro"',
    'name="landing_offer" value="partner-program"',
    'name="form_variant" value="partner-program"'
  ]);

  checkRouteHtml("lead-desk", "built lead desk page remains internal noindex UI", [
    "noindex, nofollow",
    "/api/lead-report",
    "/api/lead-status",
    "/api/lead-export",
    "data-lead-export-partner",
    "data-lead-filter-status",
    "data-lead-filter-channel",
    "data-lead-filter-locale",
    "data-lead-filter-created-from",
    "data-lead-filter-created-to",
    "data-lead-filter-sla",
    "data-lead-filter-follow-up-sla",
    "data-lead-filter-owner",
    "data-lead-filter-needs-owner",
    "data-lead-filter-needs-next-action",
    "data-lead-quick-filter",
    "data-lead-copy-summary",
    "data-lead-copy-view",
    "data-lead-filter-bucket",
    "data-lead-filter-utm-source",
    "data-lead-filter-utm-medium",
    "data-lead-filter-utm-campaign",
    "data-lead-filter-form-variant",
    "lp:automate-lead-processing:quick",
    "Conversion queue",
    "Lead context",
    "Partner refs",
    "Partner performance",
    "Form variant",
    "Locale",
    "RU leads",
    "data-lead-source-performance",
    "data-lead-partners",
    "UTM source",
    "UTM medium",
    "UTM campaign",
    "Source performance",
    "renderSourcePerformance",
    "Response SLA",
    "Follow-up SLA",
    "Last 7 days",
    "Last 30 days",
    "Stale follow-up",
    "Needs owner",
    "Needs next action",
    "applyViewParamsFromUrl",
    "syncViewUrl",
    "Lead Desk view link copied without the report token.",
    "response_due_at",
    "response_remaining_hours",
    "Status events",
    "Notification events",
    "data-lead-events",
    "data-lead-notifications",
    "Overdue",
    "Qualified+",
    "Pipeline %"
  ]);

  checkRouteHtml("lp/automate-lead-processing", "built lead LP includes tracked campaign form", [
    'data-conversion-form="lp:automate-lead-processing:quick"',
    'data-conversion-form="lp:automate-lead-processing"',
    'name="landing_offer" value="automate-lead-processing"',
    'name="form_variant" value="lp:automate-lead-processing:quick"',
    'name="form_variant" value="lp:automate-lead-processing"',
    'name="lead_channel"',
    'name="partner_ref"'
  ]);

  checkIncludes("dist/sitemap.xml", "sitemap includes localized partner program and conversion routes", [
    "https://alfarank.com/partner-program/",
    "https://alfarank.com/ru/partner-program/",
    "https://alfarank.com/ro/partner-program/",
    "https://alfarank.com/start-project/",
    "https://alfarank.com/ru/start-project/",
    "https://alfarank.com/ro/start-project/"
  ]);
}

checkIncludes("docs/form-handling.md", "form handling docs cover partner, reporting, export, lifecycle, Turnstile, and notifications", [
  "partner-program",
  "/api/lead-report",
  "/api/lead-status",
  "/api/lead-export",
  "qa:lead-flow:local",
  "qa:lead-flow:remote",
  "qa:lead-env",
  "qa:lead-d1",
  "qa:lead-analytics",
  "qa:lead-cloudflare",
  "qa:lead-launch",
  "lead-env:prepare",
  "PUBLIC_TURNSTILE_SITE_KEY",
  "LEAD_TELEGRAM_BOT_TOKEN",
  "project_request.status_updated",
  "project_request_notification_events",
  "notification_events",
  "project_request_status_events",
  "status_events"
]);

checkIncludes("docs/deployment-protocol.md", "deployment protocol covers lead production QA inputs", [
  "npm run qa:lead-env",
  "npm run qa:lead-d1",
  "npm run qa:lead-analytics",
  "npm run qa:lead-launch",
  "npm run qa:lead-production-status",
  "npm run lead-env:prepare",
  "npm run qa:lead-cloudflare",
  "npm run qa:lead-flow:local",
  "npm run qa:lead-flow:remote",
  "npm run qa:lead-flow",
  "LEAD_SMOKE_BASE_URL",
  "LEAD_REPORT_TOKEN",
  "PUBLIC_CONTACT_EMAIL",
  "PUBLIC_GTM_ID"
]);

const productionEnv = [
  "LEAD_REPORT_TOKEN",
  "LEAD_WEBHOOK_URL",
  "LEAD_TELEGRAM_BOT_TOKEN",
  "LEAD_TELEGRAM_CHAT_ID",
  "PUBLIC_CONTACT_EMAIL",
  "PUBLIC_CONTACT_TELEGRAM_URL",
  "PUBLIC_CONTACT_WHATSAPP_URL",
  "PUBLIC_GTM_ID",
  "PUBLIC_GA_ID",
  "PUBLIC_GA_MEASUREMENT_ID",
  "PUBLIC_PLAUSIBLE_DOMAIN",
  "PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY"
];

const missingEnv = productionEnv.filter((name) => !process.env[name]);
if (missingEnv.length > 0) {
  warnings.push(`Production env not present in this shell: ${missingEnv.join(", ")}`);
  if (process.env.LEAD_AUDIT_REQUIRE_ENV === "1") {
    failures.push(`LEAD_AUDIT_REQUIRE_ENV=1 and missing production env: ${missingEnv.join(", ")}`);
  }
}

if (failures.length > 0) {
  console.error("Lead readiness audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  if (warnings.length > 0) {
    console.error("\nWarnings:");
    warnings.forEach((warning) => console.error(`- ${warning}`));
  }
  process.exit(1);
}

console.log(`Lead readiness audit passed: ${passed.length} checks.`);
if (warnings.length > 0) {
  console.log("Warnings:");
  warnings.forEach((warning) => console.log(`- ${warning}`));
}
