import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);

function argValue(name, fallback = "") {
  const direct = args.find((arg) => arg.startsWith(`${name}=`));
  if (direct) return direct.slice(name.length + 1);

  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1]) return args[index + 1];

  return fallback;
}

function hasFlag(name) {
  return args.includes(name);
}

function printHelp() {
  console.log(`Usage:
  npm run lead-env:checklist
  npm run lead-env:checklist -- --status-file artifacts/lead-production-status.json
  npm run lead-env:checklist -- --output artifacts/lead-production-checklist.md

Writes a human-readable no-secret checklist from the aggregate production lead
status report. Run qa:lead-production-status first if the status file is stale.

Options:
  --status-file <path>  Defaults to artifacts/lead-production-status.json.
  --output <path>       Defaults to artifacts/lead-production-checklist.md.
`);
}

function readJson(filePath) {
  const absolutePath = path.resolve(root, filePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`${filePath} is missing. Run npm run qa:lead-production-status first.`);
  }
  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function writeFile(filePath, content) {
  const absolutePath = path.resolve(root, filePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, content);
}

function checklistItem(done, text) {
  return `- [${done ? "x" : " "}] ${text}`;
}

function linesForList(items, fallback) {
  if (!Array.isArray(items) || items.length === 0) return [`- ${fallback}`];
  return items.map((item) => `- ${String(item || "")}`);
}

function commandBlock(commands) {
  return ["```bash", ...commands, "```"];
}

function statusLabel(value) {
  if (!value) return "unknown";
  return String(value);
}

function main() {
  if (hasFlag("--help") || hasFlag("-h")) {
    printHelp();
    return;
  }

  const statusFile = argValue("--status-file", "artifacts/lead-production-status.json");
  const output = argValue("--output", "artifacts/lead-production-checklist.md");
  const status = readJson(statusFile);
  const leadEnvFile = status.lead_env_file || ".env.lead.production.local";
  const cloudflareEnvFiles = Array.isArray(status.cloudflare_env_files) && status.cloudflare_env_files.length
    ? status.cloudflare_env_files
    : [".env"];
  const cloudflareEnvArg = cloudflareEnvFiles.flatMap((filePath) => ["--cloudflare-env-file", filePath]).join(" ");
  const cloudflareSyncEnvArg = cloudflareEnvFiles.flatMap((filePath) => ["--env-file", filePath]).join(" ");
  const projectName = status.project_name || "alfarank-site";
  const environment = status.environment || "production";
  const blockers = Array.isArray(status.blockers) ? status.blockers : [];
  const nextActions = Array.isArray(status.next_actions) ? status.next_actions : [];
  const checks = status.checks || {};

  const content = [
    "# Lead Production Checklist",
    "",
    `Generated from: \`${statusFile}\``,
    `Generated at: \`${new Date().toISOString()}\``,
    `Project: \`${projectName}\``,
    `Environment: \`${environment}\``,
    `Current result: \`${statusLabel(status.result)}\``,
    "`secret_values_printed: false`",
    "",
    "## Current Blockers",
    "",
    ...linesForList(blockers, "No blockers in the current status report."),
    "",
    "## Next Actions",
    "",
    ...linesForList(nextActions, "Run the live launch gate and production smoke."),
    "",
    "## Remote D1 Schema",
    "",
    checklistItem(false, "Verify remote D1 lead migrations and schema before production smoke."),
    "",
    ...commandBlock(["npm run qa:lead-d1"]),
    "",
    "## Fill Local Lead Env",
    "",
    checklistItem(false, `Open \`${leadEnvFile}\` and fill one notification route.`),
    checklistItem(false, "Use either `LEAD_WEBHOOK_URL` plus optional `LEAD_WEBHOOK_TOKEN`, or `LEAD_TELEGRAM_BOT_TOKEN` plus `LEAD_TELEGRAM_CHAT_ID`."),
    checklistItem(false, "Fill at least one quick contact channel: `PUBLIC_CONTACT_EMAIL`, `PUBLIC_CONTACT_TELEGRAM_URL`, or `PUBLIC_CONTACT_WHATSAPP_URL`."),
    checklistItem(false, "Fill one analytics adapter: `PUBLIC_GTM_ID`, `PUBLIC_GA_ID`, `PUBLIC_GA_MEASUREMENT_ID`, or `PUBLIC_PLAUSIBLE_DOMAIN`."),
    checklistItem(false, "Optional: set both `PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`, or leave both empty."),
    "",
    ...commandBlock([`npm run qa:lead-env -- --env-file ${leadEnvFile}`]),
    "",
    "## Sync Cloudflare",
    "",
    checklistItem(false, "Dry-run the Cloudflare Pages env sync and confirm the names/types only."),
    checklistItem(false, "Review `artifacts/lead-env-sync-summary.json` after dry-run/apply; it must contain names/types and no secret values."),
    "",
    ...commandBlock([`npm run lead-env:sync -- ${cloudflareSyncEnvArg} --lead-env-file ${leadEnvFile}`]),
    "",
    checklistItem(false, "Apply only after the dry-run shows the expected names/types."),
    "",
    ...commandBlock([`npm run lead-env:sync -- ${cloudflareSyncEnvArg} --lead-env-file ${leadEnvFile} --apply`]),
    "",
    checklistItem(false, "Verify Cloudflare production lead env names strictly."),
    "",
    ...commandBlock([`npm run qa:lead-cloudflare -- ${cloudflareSyncEnvArg} --project-name ${projectName} --environment ${environment}`]),
    "",
    "## Launch Gate",
    "",
    checklistItem(false, "Refresh aggregate status after env sync/apply."),
    "",
    ...commandBlock([`npm run qa:lead-production-status -- ${cloudflareEnvArg} --lead-env-file ${leadEnvFile}`]),
    "",
    checklistItem(false, "Run the pre-apply gate before deploy or final handoff."),
    "",
    ...commandBlock([`npm run qa:lead-launch -- ${cloudflareEnvArg} --lead-env-file ${leadEnvFile}`]),
    "",
    checklistItem(false, "After deploy, run the live gate with the preview or production URL."),
    "",
    ...commandBlock([`npm run qa:lead-launch -- --phase live --base-url <preview-or-production-url> ${cloudflareEnvArg} --lead-env-file ${leadEnvFile}`]),
    "",
    "## Partner Program",
    "",
    checklistItem(false, "Keep partner traffic as the final stage after the base intake, notifications, analytics, Cloudflare env, and live smoke are reliable."),
    checklistItem(false, "When enabled, verify `partner_ref` capture, partner breakdown, partner performance, and partner-filtered export."),
    "",
    "## Check Snapshot",
    "",
    `- Production env check: \`${statusLabel(checks.production_env?.result)}\``,
    `- Cloudflare check: \`${statusLabel(checks.cloudflare?.result)}\``,
    `- Launch gate dry-run: \`${statusLabel(checks.launch_gate_plan?.result)}\``,
    "",
    "This checklist intentionally contains variable names and commands only, not secret values.",
    ""
  ].join("\n");

  writeFile(output, content);
  console.log(`Lead production checklist written: ${output}`);
  console.log("Secret values were not printed.");
}

main();
