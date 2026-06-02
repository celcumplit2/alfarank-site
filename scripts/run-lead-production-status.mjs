import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);

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

function printHelp() {
  console.log(`Usage:
  npm run qa:lead-production-status
  npm run qa:lead-production-status -- --cloudflare-env-file .env --lead-env-file .env.lead.production.local
  npm run qa:lead-production-status -- --summary-file artifacts/lead-production-status.json

Purpose:
  Aggregates the production lead env preflight, Cloudflare Pages lead config
  audit, remote D1 migration/schema audit, and launch-gate dry-run into one
  no-secret go/no-go report.

Options:
  --cloudflare-env-file <path>  Cloudflare API credentials file. Defaults to .env.
                                Can be repeated.
  --env-file <path>             Alias for --cloudflare-env-file.
  --lead-env-file <path>        Filled lead production env. Defaults to
                                .env.lead.production.local.
  --project-name <name>         Cloudflare Pages project. Defaults to alfarank-site.
  --environment <name>          Cloudflare environment. Defaults to production.
  --summary-file <path>         Write aggregate no-secret JSON status. Defaults to
                                artifacts/lead-production-status.json.
`);
}

function commandSpec(command, commandArgs) {
  if (process.platform !== "win32" || !/\.(?:cmd|bat)$/i.test(command)) {
    return { command, args: commandArgs };
  }

  return {
    command: "cmd.exe",
    args: ["/d", "/s", "/c", command, ...commandArgs]
  };
}

function commandLabel(command, commandArgs) {
  const displayCommand = command === process.execPath ? "node" : command;
  return [displayCommand, ...commandArgs].join(" ");
}

function writeSummary(filePath, summary) {
  if (!filePath) return;

  const absolutePath = path.resolve(root, filePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(summary, null, 2)}\n`);
}

function readJsonSummary(filePath) {
  const absolutePath = path.resolve(root, filePath);
  if (!existsSync(absolutePath)) {
    return {
      found: false,
      data: null,
      error: `Summary file was not written: ${filePath}`
    };
  }

  try {
    return {
      found: true,
      data: JSON.parse(readFileSync(absolutePath, "utf8")),
      error: null
    };
  } catch (error) {
    return {
      found: false,
      data: null,
      error: `Summary file is not valid JSON: ${filePath} (${error instanceof Error ? error.message : String(error)})`
    };
  }
}

function deriveSummaryFile(summaryFile, suffix, fallback) {
  if (summaryFile === "artifacts/lead-production-status.json") return fallback;

  const parsed = path.parse(summaryFile);
  return path.join(parsed.dir || ".", `${parsed.name}-${suffix}${parsed.ext || ".json"}`);
}

function uniq(items) {
  return [...new Set(items.filter(Boolean))];
}

function resultFromExitAndSummary(exitCode, summary) {
  if (!summary.found) return "failed";
  if (exitCode !== 0 && summary.data?.result === "passed") return "failed";
  return summary.data?.result || (exitCode === 0 ? "passed" : "failed");
}

function leadEnvBlockers(summary) {
  if (!summary.found) return [summary.error];

  const data = summary.data || {};
  const blockers = [];
  if (data.result !== "passed") {
    blockers.push(...(Array.isArray(data.failures) ? data.failures : []));
  }
  return uniq(blockers);
}

function cloudflareBlockers(summary, environment) {
  if (!summary.found) return [summary.error];

  const data = summary.data || {};
  const blockers = [];
  if (data.result !== "passed") {
    blockers.push(...(Array.isArray(data.failures) ? data.failures : []));
  }

  const readiness = data.lead_env_readiness || {};
  const labels = {
    report_token: `${environment} Cloudflare LEAD_REPORT_TOKEN is missing.`,
    notification_route: `${environment} Cloudflare notification route is missing.`,
    quick_contact_channel: `${environment} Cloudflare quick contact channel is missing.`,
    analytics_adapter: `${environment} Cloudflare analytics adapter is missing.`,
    turnstile: `${environment} Cloudflare Turnstile keys are partially configured.`
  };

  Object.entries(labels).forEach(([key, message]) => {
    const status = readiness[key];
    if (!status) return;
    if (status === "missing" || status === "partial") blockers.push(message);
  });

  return uniq(blockers);
}

function d1Blockers(summary) {
  if (!summary.found) return [summary.error];

  const data = summary.data || {};
  if (data.result === "passed") return [];
  return uniq(Array.isArray(data.failures) ? data.failures : ["Remote D1 lead migration/schema audit failed."]);
}

function nextActionsFromSummaries({ leadEnvSummary, cloudflareSummary, blockers, environment }) {
  const actions = [];
  const leadEnvData = leadEnvSummary.data || {};
  const cloudflareData = cloudflareSummary.data || {};

  if (Array.isArray(leadEnvData.next_required_inputs)) {
    actions.push(...leadEnvData.next_required_inputs);
  }

  const cloudflareReadiness = cloudflareData.lead_env_readiness || {};
  const cloudflareMissing = Object.entries(cloudflareReadiness)
    .filter(([, status]) => status === "missing" || status === "partial")
    .map(([name]) => name);

  if (cloudflareMissing.length > 0) {
    actions.push(
      `Sync/apply production lead env names into Cloudflare ${environment}, then rerun qa:lead-cloudflare without --allow-missing-lead-env.`
    );
  }

  if (blockers.some((blocker) => /D1|migration|schema|table|column/i.test(blocker))) {
    actions.push("Apply pending remote D1 migrations, then rerun qa:lead-d1 until the summary passes.");
  }

  if (blockers.length === 0) {
    actions.push(
      "Run qa:lead-launch with --phase live and a production --base-url, then verify one report-backed live smoke lead."
    );
  }

  return uniq(actions);
}

function run(command, commandArgs) {
  return new Promise((resolve) => {
    const spawnSpec = commandSpec(command, commandArgs);
    const child = spawn(spawnSpec.command, spawnSpec.args, {
      cwd: root,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env
    });

    child.stdout.on("data", (chunk) => process.stdout.write(chunk));
    child.stderr.on("data", (chunk) => process.stderr.write(chunk));
    child.on("error", (error) => {
      resolve({
        exitCode: 1,
        error: error instanceof Error ? error.message : String(error)
      });
    });
    child.on("exit", (code) => {
      resolve({
        exitCode: code ?? 1,
        error: null
      });
    });
  });
}

async function main() {
  if (hasFlag("--help") || hasFlag("-h")) {
    printHelp();
    return;
  }

  const summaryFile = argValue("--summary-file", "artifacts/lead-production-status.json");
  const leadEnvFile = argValue("--lead-env-file", ".env.lead.production.local");
  const cloudflareEnvFiles = [
    ...argValues("--cloudflare-env-file"),
    ...argValues("--env-file")
  ];
  if (cloudflareEnvFiles.length === 0) cloudflareEnvFiles.push(".env");

  const projectName = argValue("--project-name", "alfarank-site");
  const environment = argValue("--environment", "production");
  const childSummaryFiles = {
    production_env: deriveSummaryFile(
      summaryFile,
      "production-env",
      "artifacts/lead-production-env-summary.json"
    ),
    cloudflare: deriveSummaryFile(
      summaryFile,
      "cloudflare",
      "artifacts/lead-cloudflare-summary.json"
    ),
    d1_migrations: deriveSummaryFile(
      summaryFile,
      "d1-migrations",
      "artifacts/lead-d1-migrations-summary.json"
    ),
    launch_gate: deriveSummaryFile(
      summaryFile,
      "launch-gate",
      "artifacts/lead-launch-gate-summary.json"
    )
  };

  const cloudflareEnvArgsForAudit = cloudflareEnvFiles.flatMap((filePath) => ["--env-file", filePath]);
  const cloudflareEnvArgsForGate = cloudflareEnvFiles.flatMap((filePath) => ["--cloudflare-env-file", filePath]);

  const steps = [
    {
      key: "production_env",
      label: "Production lead env preflight",
      command: process.execPath,
      commandArgs: [
        "scripts/audit-lead-production-env.mjs",
        "--env-file",
        leadEnvFile,
        "--summary-file",
        childSummaryFiles.production_env
      ]
    },
    {
      key: "cloudflare",
      label: "Cloudflare Pages lead config audit",
      command: process.execPath,
      commandArgs: [
        "scripts/audit-cloudflare-pages-lead-config.mjs",
        "--project-name",
        projectName,
        "--environment",
        environment,
        ...cloudflareEnvArgsForAudit,
        "--allow-missing-lead-env",
        "--summary-file",
        childSummaryFiles.cloudflare
      ]
    },
    {
      key: "d1_migrations",
      label: "Remote D1 lead migrations audit",
      command: process.execPath,
      commandArgs: [
        "scripts/audit-d1-lead-migrations.mjs",
        "--summary-file",
        childSummaryFiles.d1_migrations
      ]
    },
    {
      key: "launch_gate_plan",
      label: "Lead launch gate dry-run",
      command: process.execPath,
      commandArgs: [
        "scripts/run-lead-launch-gate.mjs",
        "--dry-run",
        "--lead-env-file",
        leadEnvFile,
        ...cloudflareEnvArgsForGate,
        "--summary-file",
        childSummaryFiles.launch_gate
      ]
    }
  ];

  const summary = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    started_at: new Date().toISOString(),
    completed_at: null,
    result: "running",
    project_name: projectName,
    environment,
    lead_env_file: leadEnvFile,
    cloudflare_env_files: cloudflareEnvFiles,
    secret_values_printed: false,
    summary_files: childSummaryFiles,
    checks: {},
    blockers: [],
    next_actions: []
  };

  console.log("Lead production go/no-go status");
  console.log(`Project: ${projectName}`);
  console.log(`Environment: ${environment}`);
  console.log(`Lead env file: ${leadEnvFile}`);
  console.log(`Cloudflare env files: ${cloudflareEnvFiles.join(", ")}`);
  console.log("Secrets are not printed by this status report.");
  console.log(`Summary file: ${summaryFile}`);

  writeSummary(summaryFile, summary);

  for (const step of steps) {
    console.log(`\n==> ${step.label}`);
    const startedAt = Date.now();
    const runResult = await run(step.command, step.commandArgs);
    const summaryFileForStep = {
      production_env: childSummaryFiles.production_env,
      cloudflare: childSummaryFiles.cloudflare,
      d1_migrations: childSummaryFiles.d1_migrations,
      launch_gate_plan: childSummaryFiles.launch_gate
    }[step.key];
    const stepSummary = readJsonSummary(summaryFileForStep);

    summary.checks[step.key] = {
      label: step.label,
      command: commandLabel(step.command, step.commandArgs),
      exit_code: runResult.exitCode,
      result: resultFromExitAndSummary(runResult.exitCode, stepSummary),
      summary_file: summaryFileForStep,
      summary_found: stepSummary.found,
      duration_ms: Date.now() - startedAt,
      error: runResult.error || stepSummary.error || null
    };

    writeSummary(summaryFile, summary);
  }

  const leadEnvSummary = readJsonSummary(childSummaryFiles.production_env);
  const cloudflareSummary = readJsonSummary(childSummaryFiles.cloudflare);
  const d1Summary = readJsonSummary(childSummaryFiles.d1_migrations);
  const launchGateSummary = readJsonSummary(childSummaryFiles.launch_gate);
  const blockers = [
    ...leadEnvBlockers(leadEnvSummary),
    ...cloudflareBlockers(cloudflareSummary, environment),
    ...d1Blockers(d1Summary),
    ...(summary.checks.launch_gate_plan?.exit_code === 0 && launchGateSummary.found
      ? []
      : [summary.checks.launch_gate_plan?.error || "Lead launch gate dry-run did not complete."])
  ];

  summary.blockers = uniq(blockers);
  summary.next_actions = nextActionsFromSummaries({
    leadEnvSummary,
    cloudflareSummary,
    blockers: summary.blockers,
    environment
  });
  summary.result = summary.blockers.length > 0 ? "blocked" : "ready";
  summary.completed_at = new Date().toISOString();
  writeSummary(summaryFile, summary);

  console.log(`\nLead production status: ${summary.result}`);
  if (summary.blockers.length > 0) {
    console.log("\nBlockers:");
    summary.blockers.forEach((blocker) => console.log(`- ${blocker}`));
  }
  if (summary.next_actions.length > 0) {
    console.log("\nNext actions:");
    summary.next_actions.forEach((action) => console.log(`- ${action}`));
  }
  console.log(`\nSummary file: ${summaryFile}`);

  if (summary.result === "blocked") {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
