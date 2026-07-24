import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];
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

function listFiles(directory) {
  return readdirSync(absolute(directory), { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(relativePath) : [relativePath];
  });
}

function checkAbsent(filePaths, label, needles) {
  const matches = [];

  for (const filePath of filePaths) {
    const source = read(filePath);
    for (const needle of needles) {
      if (source.includes(needle)) matches.push(`${filePath}: ${needle}`);
    }
  }

  check(label, matches.length === 0, `${label}: found ${matches.join(", ")}`);
}

function routeHtml(routePath, label, needles) {
  checkIncludes(path.join("dist", routePath, "index.html"), label, needles);
}

const requiredFiles = [
  "functions/api/lead-conversion.ts",
  "src/layouts/Layout.astro",
  "src/pages/start-project.astro",
  "src/pages/lp/[slug].astro",
  "src/pages/partner-program.astro",
  "docs/analytics.md"
];

requiredFiles.forEach((filePath) => check(`${filePath} exists`, exists(filePath), `${filePath}: missing file`));

const sharedContextKeys = [
  "path",
  "lead_id",
  "source_path",
  "landing_page",
  "landing_offer",
  "form_variant",
  "locale",
  "referrer",
  "lead_channel",
  "partner_ref",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content"
];

const formContextKeys = [
  "form",
  "project_type",
  "desired_output"
];

const analyticsEvents = [
  'track("page_view")',
  'track("cta_click"',
  'track("form_start"',
  'track("form_validation_error"',
  'track("form_submit_click"',
  'track("form_submit_attempt"',
  'track("verified_lead_submit")',
  'track("quick_contact_click"'
];

checkIncludes("src/layouts/Layout.astro", "layout emits complete lead analytics event inventory", analyticsEvents);

checkIncludes("src/layouts/Layout.astro", "layout analytics payload keeps shared conversion context", sharedContextKeys);

checkIncludes("src/layouts/Layout.astro", "layout analytics payload keeps form context", formContextKeys);

checkIncludes("src/layouts/Layout.astro", "layout forwards events to first-party and optional vendor destinations", [
  "window.dataLayer",
  "window.dataLayer.push(payload)",
  'CustomEvent("alfarank:analytics"',
  'window.gtag("event", eventName, payload.alfarank)',
  "https://www.googletagmanager.com/gtag/js?id=",
  "window.plausible(eventName, { props: payload.alfarank })",
  "PUBLIC_GTM_ID",
  "PUBLIC_GA_ID",
  "PUBLIC_GA_MEASUREMENT_ID",
  "PUBLIC_PLAUSIBLE_DOMAIN"
]);

checkIncludes("src/layouts/Layout.astro", "layout infers partner, paid, campaign, referral, and direct lead channels", [
  '["partner_ref", "partner", "ref", "affiliate", "affiliate_id"]',
  'params.get("offer") === "partner-program"',
  '["cpc", "ppc", "paid", "paid-search", "paid-social", "display"]',
  'if (params.get("utm_source")) return "campaign"',
  'if (document.referrer) return "referral"',
  'return "direct"'
]);

checkIncludes("src/layouts/Layout.astro", "layout only fires verified_lead_submit after server verification", [
  "/start-project\\/thank-you\\/",
  "/api/lead-conversion?lead_id=",
  'method: "POST"',
  '"content-type": "application/json"',
  'body: "{}"',
  "result?.verified === true",
  'track("verified_lead_submit")'
]);

checkAbsent(
  listFiles("src").filter((filePath) => /\.(astro|js|mjs|ts)$/.test(filePath)),
  "source contains no legacy thank-you conversion event",
  ["thank_you_view"]
);

checkIncludes("functions/api/lead-conversion.ts", "conversion endpoint requires and consumes one-time server proof", [
  "alfarank_lead_conversion",
  "conversion_token_hash = ?",
  "conversion_recorded_at IS NULL",
  "Number(result.meta.changes || 0) === 1",
  "onRequestPost"
]);

const trackedFormFields = [
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

checkIncludes("src/pages/start-project.astro", "start-project forms expose analytics attribution fields", [
  'data-conversion-form="quick-intake"',
  'data-conversion-form="start-project"',
  ...trackedFormFields
]);

checkIncludes("src/pages/lp/[slug].astro", "landing page forms expose analytics attribution fields", [
  "landingFullVariant",
  "landingQuickVariant",
  "data-conversion-form={landingFullVariant}",
  "data-conversion-form={landingQuickVariant}",
  ...trackedFormFields
]);

checkIncludes("src/pages/alfa-pulse.astro", "ALFA Pulse form exposes analytics attribution fields", [
  'const formVariant = "alfa-pulse-offer"',
  "data-conversion-form={formVariant}",
  'name="landing_offer" value="alfa-pulse"',
  "structuredData={structuredData}",
  ...trackedFormFields
]);

checkIncludes("src/pages/partner-program.astro", "partner intake exposes analytics attribution fields", [
  'data-conversion-form="partner-program"',
  'name="lead_channel" value="partner"',
  'name="landing_offer" value="partner-program"',
  'name="form_variant" value="partner-program"',
  'partner_ref: ["partner_ref", "partner", "ref", "affiliate", "affiliate_id"]',
  ...trackedFormFields
]);

checkIncludes("docs/analytics.md", "analytics docs describe events, properties, vendors, and conversion reading", [
  "window.dataLayer",
  "window.gtag",
  "window.plausible",
  "alfarank:analytics",
  "page_view",
  "cta_click",
  "form_start",
  "form_validation_error",
  "form_submit_click",
  "form_submit_attempt",
  "verified_lead_submit",
  "quick_contact_click",
  "lead_channel",
  "partner_ref",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "Primary conversion"
]);

if (!exists("dist")) {
  failures.push("dist: missing build output. Run `npm run build` before this audit.");
} else {
  checkAbsent(
    listFiles("dist").filter((filePath) => /\.(html|js)$/.test(filePath)),
    "build contains no legacy thank-you conversion event",
    ["thank_you_view"]
  );

  ["start-project/thank-you", "ru/start-project/thank-you", "ro/start-project/thank-you"].forEach((routePath) => {
    routeHtml(routePath, `built ${routePath} page contains conversion analytics context`, [
      "alfarank:analytics",
      "verified_lead_submit",
      "lead_id",
      "landing_page",
      "landing_offer",
      "form_variant",
      "lead_channel",
      "partner_ref",
      "utm_source",
      "utm_medium",
      "utm_campaign"
    ]);
  });

  routeHtml("start-project", "built start-project page contains tracked forms and event layer", [
    'data-conversion-form="quick-intake"',
    'data-conversion-form="start-project"',
    'name="form_variant" value="quick-intake"',
    'name="form_variant" value="start-project"',
    "form_submit_attempt",
    "form_validation_error",
    "form_start",
    "quick_contact_click"
  ]);

  routeHtml("partner-program", "built partner-program page contains partner conversion context", [
    'data-conversion-form="partner-program"',
    'name="lead_channel" value="partner"',
    'name="landing_offer" value="partner-program"',
    'name="form_variant" value="partner-program"',
    "partner_ref",
    "utm_source"
  ]);

  ["alfa-pulse", "ru/alfa-pulse", "ro/alfa-pulse"].forEach((routePath) => {
    routeHtml(routePath, `built ${routePath} page contains tracked ALFA Pulse form`, [
      'data-conversion-form="alfa-pulse-offer"',
      'name="landing_offer" value="alfa-pulse"',
      'name="form_variant" value="alfa-pulse-offer"',
      'name="source_path"',
      'name="landing_page"',
      'name="lead_channel"',
      'name="utm_source"',
      'name="utm_medium"',
      'name="utm_campaign"',
      '"@type":"Service"',
      '"name":"ALFA Pulse"'
    ]);
  });

  routeHtml("lp/automate-lead-processing", "built lead LP contains quick and full campaign conversion context", [
    'data-conversion-form="lp:automate-lead-processing:quick"',
    'data-conversion-form="lp:automate-lead-processing"',
    'name="form_variant" value="lp:automate-lead-processing:quick"',
    'name="form_variant" value="lp:automate-lead-processing"',
    "form_submit_attempt",
    "form_start"
  ]);
}

if (failures.length > 0) {
  console.error("Lead analytics audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Lead analytics audit passed: ${passed.length} checks.`);
