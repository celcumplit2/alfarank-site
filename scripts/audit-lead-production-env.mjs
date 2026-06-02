import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const failures = [];
const warnings = [];
const passed = [];

function argValues(name) {
  const values = [];

  args.forEach((arg, index) => {
    if (arg === name && args[index + 1]) values.push(args[index + 1]);
    if (arg.startsWith(`${name}=`)) values.push(arg.slice(name.length + 1));
  });

  return values;
}

function argValue(name, fallback = "") {
  return argValues(name).at(-1) || fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

function parseEnvValue(rawValue) {
  const value = rawValue.trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

function parseEnvFile(filePath) {
  const absolutePath = path.resolve(root, filePath);
  const values = {};

  if (!existsSync(absolutePath)) {
    failures.push(`Env file not found: ${filePath}`);
    return values;
  }

  const source = readFileSync(absolutePath, "utf8");
  source.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    const match = trimmed.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) return;

    values[match[1]] = parseEnvValue(match[2]);
  });

  return values;
}

function checkedEnv() {
  const files = argValues("--env-file");
  const fileValues = files.reduce((acc, filePath) => ({ ...acc, ...parseEnvFile(filePath) }), {});

  return {
    values: {
      ...process.env,
      ...fileValues
    },
    files
  };
}

function has(env, name) {
  const currentValue = value(env, name);
  return Boolean(currentValue) && !isPlaceholderValue(currentValue);
}

function value(env, name) {
  return String(env[name] ?? "").trim();
}

function rawHas(env, name) {
  return Boolean(value(env, name));
}

function isPlaceholderValue(input) {
  const normalized = String(input ?? "").trim().toLowerCase();
  if (!normalized) return false;

  return [
    /^replace[-_\s]?with/,
    /^your[-_\s]/,
    /^insert[-_\s]/,
    /^set[-_\s]/,
    /^todo$/,
    /^tbd$/,
    /^changeme$/,
    /^change[-_\s]?me$/,
    /^example$/,
    /example\.com/,
    /<[^>]+>/
  ].some((pattern) => pattern.test(normalized));
}

function presentNames(env, names) {
  return names.filter((name) => has(env, name));
}

function missingNames(env, names) {
  return names.filter((name) => !has(env, name));
}

function placeholderNames(env, names) {
  return names.filter((name) => rawHas(env, name) && isPlaceholderValue(value(env, name)));
}

function statusLine(label, status, details = "") {
  const suffix = details ? ` - ${details}` : "";
  return `${label}: ${status}${suffix}`;
}

function writeSummary(filePath, summary) {
  if (!filePath) return;

  const absolutePath = path.resolve(root, filePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(summary, null, 2)}\n`);
}

function any(env, names) {
  return names.some((name) => has(env, name));
}

function all(env, names) {
  return names.every((name) => has(env, name));
}

function check(label, condition, failureDetail) {
  if (condition) {
    passed.push(label);
  } else {
    failures.push(failureDetail || label);
  }
}

function warn(label, condition, message) {
  if (!condition) warnings.push(message || label);
}

function isUrl(input) {
  try {
    const parsed = new URL(input);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function isEmail(input) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

const { values: env, files } = checkedEnv();
const summaryFile = hasFlag("--no-summary")
  ? ""
  : argValue("--summary-file", "artifacts/lead-production-env-summary.json");

const notificationByWebhook = has(env, "LEAD_WEBHOOK_URL");
const notificationByTelegram = all(env, ["LEAD_TELEGRAM_BOT_TOKEN", "LEAD_TELEGRAM_CHAT_ID"]);
const contactChannels = [
  "PUBLIC_CONTACT_EMAIL",
  "PUBLIC_CONTACT_TELEGRAM_URL",
  "PUBLIC_CONTACT_WHATSAPP_URL"
];
const analyticsChannels = ["PUBLIC_GTM_ID", "PUBLIC_GA_ID", "PUBLIC_PLAUSIBLE_DOMAIN"];
const turnstilePublic = has(env, "PUBLIC_TURNSTILE_SITE_KEY");
const turnstileSecret = has(env, "TURNSTILE_SECRET_KEY");
const notificationChannels = [
  ...(notificationByWebhook ? ["webhook"] : []),
  ...(notificationByTelegram ? ["telegram"] : [])
];
const configuredContactChannels = presentNames(env, contactChannels);
const configuredAnalyticsChannels = presentNames(env, analyticsChannels);
const configuredLeadEnvNames = [
  "LEAD_REPORT_TOKEN",
  "LEAD_WEBHOOK_URL",
  "LEAD_WEBHOOK_TOKEN",
  "LEAD_TELEGRAM_BOT_TOKEN",
  "LEAD_TELEGRAM_CHAT_ID",
  "LEAD_TELEGRAM_MESSAGE_THREAD_ID",
  ...contactChannels,
  ...analyticsChannels,
  "PUBLIC_PLAUSIBLE_SRC",
  "PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "LEAD_SMOKE_TURNSTILE_TOKEN"
].filter((name, index, names) => names.indexOf(name) === index);
const configuredPlaceholderNames = placeholderNames(env, configuredLeadEnvNames);

if (configuredPlaceholderNames.length > 0) {
  failures.push(
    `Template placeholder values are still present: ${configuredPlaceholderNames.join(", ")}. Replace them with real production values or leave optional fields empty.`
  );
}

check(
  "Lead Desk/report token is configured",
  has(env, "LEAD_REPORT_TOKEN"),
  "LEAD_REPORT_TOKEN is missing. Lead Desk, report, export, and lifecycle status updates are not production-ready."
);

check(
  "Lead notification route is configured",
  notificationByWebhook || notificationByTelegram,
  "No lead notification route is configured. Set LEAD_WEBHOOK_URL or LEAD_TELEGRAM_BOT_TOKEN + LEAD_TELEGRAM_CHAT_ID."
);

check(
  "At least one public quick contact channel is configured",
  any(env, contactChannels),
  `No quick contact channel is configured. Set at least one of: ${contactChannels.join(", ")}.`
);

check(
  "At least one analytics adapter is configured",
  any(env, analyticsChannels),
  `No analytics adapter is configured. Set at least one of: ${analyticsChannels.join(", ")}.`
);

check(
  "Turnstile public and secret keys are consistent",
  turnstilePublic === turnstileSecret,
  "Turnstile is partially configured. PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY must be set together."
);

if (notificationByWebhook) {
  check(
    "Webhook URL is valid",
    isUrl(value(env, "LEAD_WEBHOOK_URL")),
    "LEAD_WEBHOOK_URL must be a valid http(s) URL."
  );
  warn(
    "Webhook token is recommended",
    has(env, "LEAD_WEBHOOK_TOKEN"),
    "LEAD_WEBHOOK_URL is set without LEAD_WEBHOOK_TOKEN. Use a bearer token unless the receiver is protected another way."
  );
}

if (has(env, "PUBLIC_CONTACT_EMAIL")) {
  check(
    "Public contact email is valid",
    isEmail(value(env, "PUBLIC_CONTACT_EMAIL")),
    "PUBLIC_CONTACT_EMAIL must be a valid email address."
  );
}

["PUBLIC_CONTACT_TELEGRAM_URL", "PUBLIC_CONTACT_WHATSAPP_URL"].forEach((name) => {
  if (!has(env, name)) return;
  check(`${name} is valid`, isUrl(value(env, name)), `${name} must be a valid http(s) URL.`);
});

if (turnstilePublic && turnstileSecret) {
  warn(
    "Smoke Turnstile token is available",
    has(env, "LEAD_SMOKE_TURNSTILE_TOKEN"),
    "Turnstile is enabled. Preview/production smoke POST may need LEAD_SMOKE_TURNSTILE_TOKEN or a Turnstile test key."
  );
} else {
  warnings.push("Turnstile is not enabled. Honeypot protection remains active, but public forms have no challenge layer.");
}

if (has(env, "PUBLIC_PLAUSIBLE_SRC")) {
  check(
    "Plausible script URL is valid",
    isUrl(value(env, "PUBLIC_PLAUSIBLE_SRC")),
    "PUBLIC_PLAUSIBLE_SRC must be a valid http(s) URL."
  );
}

const nextInputs = [];

if (!has(env, "LEAD_REPORT_TOKEN")) {
  nextInputs.push("Set a real LEAD_REPORT_TOKEN for Lead Desk, report, export, and status updates.");
}

if (!(notificationByWebhook || notificationByTelegram)) {
  nextInputs.push("Set one notification route: LEAD_WEBHOOK_URL, or LEAD_TELEGRAM_BOT_TOKEN + LEAD_TELEGRAM_CHAT_ID.");
}

if (!any(env, contactChannels)) {
  nextInputs.push(`Set one public quick contact channel: ${contactChannels.join(", ")}.`);
}

if (!any(env, analyticsChannels)) {
  nextInputs.push(`Set one analytics adapter: ${analyticsChannels.join(", ")}.`);
}

if (turnstilePublic !== turnstileSecret) {
  nextInputs.push(
    `Either set both Turnstile keys or clear both: ${missingNames(env, ["PUBLIC_TURNSTILE_SITE_KEY", "TURNSTILE_SECRET_KEY"]).join(", ")}.`
  );
}

if (configuredPlaceholderNames.length > 0) {
  nextInputs.unshift(
    `Replace template placeholders before syncing env: ${configuredPlaceholderNames.join(", ")}.`
  );
}

console.log("Lead production env preflight");
console.log(`Sources: process.env${files.length ? `, ${files.join(", ")}` : ""}`);
console.log("\nReadiness map:");
console.log(
  statusLine(
    "Lead Desk/report access",
    has(env, "LEAD_REPORT_TOKEN") ? "ready" : "missing",
    has(env, "LEAD_REPORT_TOKEN") ? "LEAD_REPORT_TOKEN is set" : "set LEAD_REPORT_TOKEN"
  )
);
console.log(
  statusLine(
    "Notification delivery",
    notificationChannels.length ? "ready" : "missing",
    notificationChannels.length
      ? notificationChannels.join(", ")
      : "set webhook or Telegram route"
  )
);
console.log(
  statusLine(
    "Quick contact channels",
    configuredContactChannels.length ? "ready" : "missing",
    configuredContactChannels.length
      ? configuredContactChannels.join(", ")
      : `set one of ${contactChannels.join(", ")}`
  )
);
console.log(
  statusLine(
    "Analytics adapter",
    configuredAnalyticsChannels.length ? "ready" : "missing",
    configuredAnalyticsChannels.length
      ? configuredAnalyticsChannels.join(", ")
      : `set one of ${analyticsChannels.join(", ")}`
  )
);
console.log(
  statusLine(
    "Turnstile",
    turnstilePublic && turnstileSecret ? "ready" : turnstilePublic || turnstileSecret ? "partial" : "disabled",
    turnstilePublic && turnstileSecret
      ? "public and secret keys are set"
      : turnstilePublic || turnstileSecret
        ? `missing ${missingNames(env, ["PUBLIC_TURNSTILE_SITE_KEY", "TURNSTILE_SECRET_KEY"]).join(", ")}`
        : "honeypot-only mode"
  )
);
console.log(
  statusLine(
    "Filled lead env names",
    presentNames(env, configuredLeadEnvNames).length ? "present" : "empty",
    presentNames(env, configuredLeadEnvNames).join(", ") || "none"
  )
);

if (configuredPlaceholderNames.length > 0) {
  console.log(statusLine("Template placeholders", "invalid", configuredPlaceholderNames.join(", ")));
}

if (nextInputs.length > 0) {
  console.log("\nNext required production inputs:");
  nextInputs.forEach((item) => console.log(`- ${item}`));
}

if (failures.length > 0) {
  console.error("\nMissing or invalid production configuration:");
  failures.forEach((failure) => console.error(`- ${failure}`));
}

if (warnings.length > 0) {
  console.log("\nWarnings:");
  warnings.forEach((warning) => console.log(`- ${warning}`));
}

const summary = {
  schema_version: 1,
  generated_at: new Date().toISOString(),
  result: failures.length > 0 ? "failed" : "passed",
  sources: ["process.env", ...files],
  secret_values_printed: false,
  readiness: {
    lead_report_access: {
      status: has(env, "LEAD_REPORT_TOKEN") ? "ready" : "missing",
      names: has(env, "LEAD_REPORT_TOKEN") ? ["LEAD_REPORT_TOKEN"] : []
    },
    notification_delivery: {
      status: notificationChannels.length ? "ready" : "missing",
      channels: notificationChannels
    },
    quick_contact_channels: {
      status: configuredContactChannels.length ? "ready" : "missing",
      names: configuredContactChannels
    },
    analytics_adapter: {
      status: configuredAnalyticsChannels.length ? "ready" : "missing",
      names: configuredAnalyticsChannels
    },
    turnstile: {
      status: turnstilePublic && turnstileSecret ? "ready" : turnstilePublic || turnstileSecret ? "partial" : "disabled",
      names: presentNames(env, ["PUBLIC_TURNSTILE_SITE_KEY", "TURNSTILE_SECRET_KEY"])
    }
  },
  filled_lead_env_names: presentNames(env, configuredLeadEnvNames),
  placeholder_names: configuredPlaceholderNames,
  next_required_inputs: nextInputs,
  passed_count: passed.length,
  failures,
  warnings
};

writeSummary(summaryFile, summary);
if (summaryFile) console.log(`\nSummary file: ${summaryFile}`);

if (failures.length > 0) {
  process.exit(1);
}

console.log(`\nLead production env preflight passed: ${passed.length} checks.`);
