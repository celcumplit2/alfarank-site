import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const defaultLeadEnvFile = ".env.lead.production.local";
let activeSummary = null;
let activeSummaryFile = "";
const secretNames = new Set([
  "LEAD_REPORT_TOKEN",
  "LEAD_WEBHOOK_TOKEN",
  "LEAD_TELEGRAM_BOT_TOKEN",
  "TURNSTILE_SECRET_KEY",
  "LEAD_SMOKE_TURNSTILE_TOKEN"
]);
const allowedLeadNames = [
  "LEAD_REPORT_TOKEN",
  "LEAD_WEBHOOK_URL",
  "LEAD_WEBHOOK_TOKEN",
  "LEAD_TELEGRAM_BOT_TOKEN",
  "LEAD_TELEGRAM_CHAT_ID",
  "LEAD_TELEGRAM_MESSAGE_THREAD_ID",
  "PUBLIC_CONTACT_EMAIL",
  "PUBLIC_CONTACT_TELEGRAM_URL",
  "PUBLIC_CONTACT_WHATSAPP_URL",
  "PUBLIC_GTM_ID",
  "PUBLIC_GA_ID",
  "PUBLIC_GA_MEASUREMENT_ID",
  "PUBLIC_PLAUSIBLE_DOMAIN",
  "PUBLIC_PLAUSIBLE_SRC",
  "PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "LEAD_SMOKE_TURNSTILE_TOKEN"
];

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
    throw new Error(`Env file not found: ${filePath}`);
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

function printHelp() {
  console.log(`Usage:
  npm run lead-env:sync -- --env-file .env --lead-env-file .env.lead.production.local
  npm run lead-env:sync -- --env-file .env --lead-env-file .env.lead.production.local --apply

Syncs filled production lead variables into Cloudflare Pages deployment config.
Dry-run is the default. Use --apply for the real API PATCH.

Options:
  --env-file <path>       Cloudflare API credentials file. Can be repeated.
  --lead-env-file <path>  Filled lead env file. Defaults to ${defaultLeadEnvFile}.
  --project-name <name>   Defaults to alfarank-site.
  --environment <name>    production or preview. Defaults to production.
  --apply                 Apply the update. Without this, only prints names/types.
  --skip-post-apply-check Skip the post-apply Cloudflare env name/type check.
  --summary-file <path>   Write a no-secret JSON sync summary. Defaults to
                          artifacts/lead-env-sync-summary.json.
  --no-summary            Do not write the JSON sync summary.
`);
}

function checkedCloudflareEnv() {
  const files = argValues("--env-file");
  const fileValues = files.reduce((acc, filePath) => ({ ...acc, ...parseEnvFile(filePath) }), {});
  return {
    ...process.env,
    ...fileValues
  };
}

function filteredLeadValues(leadEnv) {
  return Object.fromEntries(
    allowedLeadNames
      .map((name) => [name, String(leadEnv[name] ?? "").trim()])
      .filter(([, value]) => value)
  );
}

function envVarEntry(name, value) {
  return {
    type: secretNames.has(name) ? "secret_text" : "plain_text",
    value
  };
}

function envNameType(name) {
  return {
    name,
    type: secretNames.has(name) ? "secret_text" : "plain_text"
  };
}

function hiddenCurrentSecretNames(currentEnvVars, plannedNames) {
  return Object.entries(currentEnvVars)
    .filter(([name, entry]) => entry?.type === "secret_text" && !plannedNames.has(name))
    .map(([name]) => name)
    .sort();
}

function assertSyncedEnvVars(project, environment, plannedNames) {
  const envVars = project.deployment_configs?.[environment]?.env_vars || {};
  const missing = [];
  const wrongType = [];

  plannedNames.forEach((name) => {
    const entry = envVars[name];
    const expectedType = secretNames.has(name) ? "secret_text" : "plain_text";

    if (!entry) {
      missing.push(name);
      return;
    }

    if (entry.type !== expectedType) {
      wrongType.push(`${name}: expected ${expectedType}, got ${entry.type || "unknown"}`);
    }
  });

  if (missing.length > 0 || wrongType.length > 0) {
    const details = [
      missing.length ? `missing: ${missing.join(", ")}` : "",
      wrongType.length ? `wrong type: ${wrongType.join("; ")}` : ""
    ].filter(Boolean);
    throw new Error(`Cloudflare post-apply verification failed (${details.join("; ")}).`);
  }
}

function writeSummary(filePath, summary) {
  if (!filePath) return;

  const absolutePath = path.resolve(root, filePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(summary, null, 2)}\n`);
}

function updateSummary(patch = {}) {
  if (!activeSummary) return;
  activeSummary = {
    ...activeSummary,
    ...patch
  };
  writeSummary(activeSummaryFile, activeSummary);
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

async function patchProject({ accountId, token, projectName, environment, envVars }) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${projectName}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        deployment_configs: {
          [environment]: {
            env_vars: envVars
          }
        }
      })
    }
  );
  const payload = await response.json();

  if (!response.ok || !payload.success) {
    const messages = Array.isArray(payload.errors)
      ? payload.errors.map((error) => error.message || String(error)).join("; ")
      : `HTTP ${response.status}`;
    throw new Error(`Cloudflare Pages project update failed: ${messages}`);
  }

  return payload.result;
}

function run(command, commandArgs) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, commandArgs, {
      shell: false,
      stdio: "inherit"
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${commandArgs.join(" ")} exited with ${code}`));
    });
  });
}

async function main() {
  if (hasFlag("--help") || hasFlag("-h")) {
    printHelp();
    return;
  }

  const projectName = argValue("--project-name", "alfarank-site");
  const environment = argValue("--environment", "production");
  const leadEnvFile = argValue("--lead-env-file", defaultLeadEnvFile);
  const apply = hasFlag("--apply");
  const skipPostApplyCheck = hasFlag("--skip-post-apply-check");
  const summaryFile = hasFlag("--no-summary")
    ? ""
    : argValue("--summary-file", "artifacts/lead-env-sync-summary.json");
  const cloudflareEnvFiles = argValues("--env-file");
  const cloudflareEnv = checkedCloudflareEnv();
  const accountId = String(cloudflareEnv.CLOUDFLARE_ACCOUNT_ID || "").trim();
  const token = String(cloudflareEnv.CLOUDFLARE_API_TOKEN || "").trim();
  const leadValues = filteredLeadValues(parseEnvFile(leadEnvFile));
  const plannedNames = Object.keys(leadValues).sort();

  activeSummaryFile = summaryFile;
  activeSummary = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    started_at: new Date().toISOString(),
    completed_at: null,
    result: "running",
    project_name: projectName,
    environment,
    mode: apply ? "apply" : "dry-run",
    lead_env_file: leadEnvFile,
    cloudflare_env_files: cloudflareEnvFiles,
    secret_values_printed: false,
    planned_env_vars: plannedNames.map(envNameType),
    planned_env_names: plannedNames,
    current_env_names: [],
    hidden_current_secret_names: [],
    post_apply_check: "not-run",
    failures: [],
    warnings: []
  };
  writeSummary(activeSummaryFile, activeSummary);

  if (!accountId) throw new Error("CLOUDFLARE_ACCOUNT_ID is missing. Pass --env-file .env or export it.");
  if (!token) throw new Error("CLOUDFLARE_API_TOKEN is missing. Pass --env-file .env or export it.");

  await run(process.execPath, ["scripts/audit-lead-production-env.mjs", "--env-file", leadEnvFile]);

  const project = await fetchProject({ accountId, token, projectName });
  const currentEnvVars = project.deployment_configs?.[environment]?.env_vars || {};
  const plannedNameSet = new Set(Object.keys(leadValues));
  const unknownSecretNames = hiddenCurrentSecretNames(currentEnvVars, plannedNameSet);
  updateSummary({
    current_env_names: Object.keys(currentEnvVars).sort(),
    hidden_current_secret_names: unknownSecretNames
  });
  if (unknownSecretNames.length > 0 && apply) {
    throw new Error(
      `Refusing to apply because existing secret env values are hidden and not part of lead sync: ${unknownSecretNames.join(", ")}`
    );
  }
  const nextEnvVars = {
    ...currentEnvVars,
    ...Object.fromEntries(Object.entries(leadValues).map(([name, value]) => [name, envVarEntry(name, value)]))
  };

  console.log("Cloudflare Pages lead env sync");
  console.log(`Project: ${projectName}`);
  console.log(`Environment: ${environment}`);
  console.log(`Mode: ${apply ? "apply" : "dry-run"}`);
  console.log(
    `Lead env names: ${plannedNames.map((name) => `${name}:${secretNames.has(name) ? "secret_text" : "plain_text"}`).join(", ")}`
  );
  console.log("Values were not printed.");

  if (!apply) {
    console.log("Dry-run only. Re-run with --apply to update Cloudflare Pages.");
    updateSummary({
      completed_at: new Date().toISOString(),
      result: "dry-run"
    });
    return;
  }

  await patchProject({ accountId, token, projectName, environment, envVars: nextEnvVars });
  console.log("Cloudflare Pages lead env sync applied.");

  if (!skipPostApplyCheck) {
    const updatedProject = await fetchProject({ accountId, token, projectName });
    assertSyncedEnvVars(updatedProject, environment, plannedNameSet);
    updateSummary({
      post_apply_check: "passed"
    });
    console.log("Post-apply Cloudflare env name/type check passed.");
  } else {
    updateSummary({
      post_apply_check: "skipped"
    });
  }

  updateSummary({
    completed_at: new Date().toISOString(),
    result: "applied"
  });

  console.log("Run `npm run qa:lead-cloudflare -- --env-file .env` after the next deploy/config refresh.");
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  updateSummary({
    completed_at: new Date().toISOString(),
    result: "failed",
    failures: [...(activeSummary?.failures || []), message]
  });
  console.error(message);
  process.exitCode = 1;
});
