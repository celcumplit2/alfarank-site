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

function namesFromBindingConfig(value) {
  if (Array.isArray(value)) {
    return value
      .map((entry) => entry?.binding || entry?.name || "")
      .filter(Boolean)
      .sort();
  }
  if (value && typeof value === "object") return Object.keys(value).sort();
  return [];
}

function namesFromEnvVars(value) {
  if (!value || typeof value !== "object") return [];
  return Object.keys(value).sort();
}

function any(names, candidates) {
  return candidates.some((name) => names.has(name));
}

function all(names, candidates) {
  return candidates.every((name) => names.has(name));
}

function printHelp() {
  console.log(`Usage:
  npm run qa:lead-cloudflare -- --env-file .env
  npm run qa:lead-cloudflare -- --project-name alfarank-site --environment production --env-file .env

Required auth:
  CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in process env or --env-file.

Options:
  --project-name <name>       Defaults to alfarank-site.
  --environment <name>        production or preview. Defaults to production.
  --env-file <path>           Load local Cloudflare API credentials. Values are not printed.
  --allow-missing-lead-env    Inspect project/deploy/D1 without failing on missing lead env names.
  --summary-file <path>       Write a no-secret JSON Cloudflare summary.
                              Defaults to artifacts/lead-cloudflare-summary.json.
  --no-summary                Do not write the JSON Cloudflare summary.
`);
}

function writeSummary(filePath, summary) {
  if (!filePath) return;

  const absolutePath = path.resolve(root, filePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(summary, null, 2)}\n`);
}

async function fetchProject({ accountId, token, projectName }) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  const payload = await response.json();

  if (!response.ok || !payload.success) {
    const messages = Array.isArray(payload.errors)
      ? payload.errors.map((error) => error.message || String(error)).join("; ")
      : `HTTP ${response.status}`;
    throw new Error(`Cloudflare Pages project lookup failed: ${messages}`);
  }

  return payload.result;
}

async function main() {
  if (hasFlag("--help") || hasFlag("-h")) {
    printHelp();
    return;
  }

  const { values: env, files } = checkedEnv();
  const accountId = env.CLOUDFLARE_ACCOUNT_ID || "";
  const token = env.CLOUDFLARE_API_TOKEN || "";
  const projectName = argValues("--project-name").at(-1) || "alfarank-site";
  const environment = argValues("--environment").at(-1) || "production";
  const allowMissingLeadEnv = hasFlag("--allow-missing-lead-env");
  const summaryFile = hasFlag("--no-summary")
    ? ""
    : argValue("--summary-file", "artifacts/lead-cloudflare-summary.json");

  check(
    "Cloudflare account ID is available",
    Boolean(accountId),
    "CLOUDFLARE_ACCOUNT_ID is missing. Pass --env-file .env or export it in the shell."
  );
  check(
    "Cloudflare API token is available",
    Boolean(token),
    "CLOUDFLARE_API_TOKEN is missing. Pass --env-file .env or export it in the shell."
  );

  if (failures.length > 0) {
    throw new Error(failures.join("\n"));
  }

  const project = await fetchProject({ accountId, token, projectName });
  const configs = project.deployment_configs || {};
  const config = configs[environment] || {};
  const envVarNames = new Set(namesFromEnvVars(config.env_vars));
  const d1BindingNames = namesFromBindingConfig(config.d1_databases);
  const latestDeployment = project.latest_deployment;
  const domains = Array.isArray(project.domains) ? project.domains : [];
  const envVarNameList = [...envVarNames].sort();

  check("Cloudflare Pages project exists", project.name === projectName, `Project ${projectName} was not returned.`);
  check("Production branch is main", project.production_branch === "main", "Production branch is not main.");
  check("Pages domain is configured", domains.includes(`${projectName}.pages.dev`), `${projectName}.pages.dev is missing.`);
  warn("Primary domain is configured", domains.includes("alfarank.com"), "alfarank.com is not attached to the Pages project.");
  warn("WWW domain is configured", domains.includes("www.alfarank.com"), "www.alfarank.com is not attached to the Pages project.");

  if (environment === "production") {
    check(
      "Latest deployment is production",
      latestDeployment?.environment === "production",
      "Latest deployment is not a production deployment."
    );
    check(
      "Latest deployment succeeded",
      latestDeployment?.latest_stage?.status === "success",
      "Latest production deployment did not finish successfully."
    );
  }

  check(
    `${environment} D1 binding DB is configured`,
    d1BindingNames.includes("DB"),
    `${environment} D1 binding DB is missing. Remote lead smoke cannot prove D1 storage.`
  );

  const notificationReady =
    envVarNames.has("LEAD_WEBHOOK_URL") || all(envVarNames, ["LEAD_TELEGRAM_BOT_TOKEN", "LEAD_TELEGRAM_CHAT_ID"]);
  const contactReady = any(envVarNames, [
    "PUBLIC_CONTACT_EMAIL",
    "PUBLIC_CONTACT_TELEGRAM_URL",
    "PUBLIC_CONTACT_WHATSAPP_URL"
  ]);
  const analyticsReady = any(envVarNames, ["PUBLIC_GTM_ID", "PUBLIC_GA_ID", "PUBLIC_PLAUSIBLE_DOMAIN"]);
  const hasTurnstilePublic = envVarNames.has("PUBLIC_TURNSTILE_SITE_KEY");
  const hasTurnstileSecret = envVarNames.has("TURNSTILE_SECRET_KEY");

  const leadEnvChecks = [
    {
      label: `${environment} lead report token exists`,
      condition: envVarNames.has("LEAD_REPORT_TOKEN"),
      failure: `${environment} LEAD_REPORT_TOKEN is missing. Lead Desk/report/status/export are not production-verifiable.`
    },
    {
      label: `${environment} lead notification route exists`,
      condition: notificationReady,
      failure: `${environment} notification route is missing. Set LEAD_WEBHOOK_URL or LEAD_TELEGRAM_BOT_TOKEN + LEAD_TELEGRAM_CHAT_ID.`
    },
    {
      label: `${environment} quick contact channel exists`,
      condition: contactReady,
      failure: `${environment} quick contact channel is missing. Set PUBLIC_CONTACT_EMAIL, PUBLIC_CONTACT_TELEGRAM_URL, or PUBLIC_CONTACT_WHATSAPP_URL.`
    },
    {
      label: `${environment} analytics adapter exists`,
      condition: analyticsReady,
      failure: `${environment} analytics adapter is missing. Set PUBLIC_GTM_ID, PUBLIC_GA_ID, or PUBLIC_PLAUSIBLE_DOMAIN.`
    },
    {
      label: `${environment} Turnstile keys are consistent`,
      condition: hasTurnstilePublic === hasTurnstileSecret,
      failure: `${environment} Turnstile is partially configured. PUBLIC_TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY must be set together.`
    }
  ];

  leadEnvChecks.forEach((item) => {
    if (allowMissingLeadEnv && !item.condition) {
      warnings.push(item.failure);
      return;
    }
    check(item.label, item.condition, item.failure);
  });

  if (!hasTurnstilePublic && !hasTurnstileSecret) {
    warnings.push(`${environment} Turnstile is not enabled. Honeypot protection remains active, but public forms have no challenge layer.`);
  }

  console.log("Cloudflare Pages lead config audit");
  console.log(`Project: ${projectName}`);
  console.log(`Environment: ${environment}`);
  console.log(`Sources: process.env${files.length ? `, ${files.join(", ")}` : ""}`);
  console.log(`Domains: ${domains.join(", ") || "(none)"}`);
  if (latestDeployment) {
    console.log(
      `Latest deployment: ${latestDeployment.environment || "unknown"} ${latestDeployment.latest_stage?.status || "unknown"} ${latestDeployment.url || ""}`.trim()
    );
  }
  console.log(`Visible ${environment} env names: ${envVarNameList.length ? envVarNameList.join(", ") : "(none)"}`);
  console.log(`Visible ${environment} D1 bindings: ${d1BindingNames.length ? d1BindingNames.join(", ") : "(none)"}`);

  if (failures.length > 0) {
    console.error("\nMissing or invalid Cloudflare lead configuration:");
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
    project_name: projectName,
    environment,
    sources: ["process.env", ...files],
    secret_values_printed: false,
    allow_missing_lead_env: allowMissingLeadEnv,
    production_branch: project.production_branch || null,
    domains,
    latest_deployment: latestDeployment
      ? {
          environment: latestDeployment.environment || null,
          status: latestDeployment.latest_stage?.status || null,
          url: latestDeployment.url || null
        }
      : null,
    d1_bindings: d1BindingNames,
    visible_env_names: envVarNameList,
    lead_env_readiness: {
      report_token: envVarNames.has("LEAD_REPORT_TOKEN") ? "ready" : "missing",
      notification_route: notificationReady ? "ready" : "missing",
      quick_contact_channel: contactReady ? "ready" : "missing",
      analytics_adapter: analyticsReady ? "ready" : "missing",
      turnstile: hasTurnstilePublic && hasTurnstileSecret ? "ready" : hasTurnstilePublic || hasTurnstileSecret ? "partial" : "disabled"
    },
    passed_count: passed.length,
    failures,
    warnings
  };

  writeSummary(summaryFile, summary);
  if (summaryFile) console.log(`\nSummary file: ${summaryFile}`);

  if (failures.length > 0) {
    process.exitCode = 1;
    return;
  }

  console.log(`\nCloudflare Pages lead config audit passed: ${passed.length} checks.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
