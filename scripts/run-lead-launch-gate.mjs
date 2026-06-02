import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

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
  npm run qa:lead-launch
  npm run qa:lead-launch -- --cloudflare-env-file .env --lead-env-file .env.lead.production.local
  npm run qa:lead-launch -- --phase live --base-url https://alfarank.com --cloudflare-env-file .env --lead-env-file .env.lead.production.local

Modes:
  pre-apply  Default. Verifies code, filled lead env, Cloudflare project/D1,
             and Cloudflare env sync dry-run. Cloudflare lead env may still be
             missing because --apply has not happened yet.
  live       Verifies code, filled lead env, strict Cloudflare lead env names,
             and report-backed remote smoke against --base-url.

Options:
  --phase <pre-apply|live>      Defaults to pre-apply. --live is an alias for live.
  --cloudflare-env-file <path>  Cloudflare API credentials file. Defaults to .env.
                                Can be repeated.
  --env-file <path>             Alias for --cloudflare-env-file.
  --lead-env-file <path>        Filled lead production env. Defaults to
                                .env.lead.production.local.
  --base-url <url>              Preview or production URL for live remote smoke.
  --skip-local-smoke            Skip qa:lead-flow:local in this launch gate run.
  --summary-file <path>         Write a no-secret JSON gate summary. Defaults to
                                artifacts/lead-launch-gate-summary.json.
  --no-summary                  Do not write the JSON gate summary.
  --dry-run                     Print the planned gate steps without running them.
`);
}

function assertFileExists(filePath, label) {
  const absolutePath = path.resolve(root, filePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`${label} not found: ${filePath}`);
  }
}

function commandLabel(command, commandArgs) {
  return [command, ...commandArgs].join(" ");
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

function run(command, commandArgs, options = {}) {
  return new Promise((resolve, reject) => {
    const spawnSpec = commandSpec(command, commandArgs);
    const child = spawn(spawnSpec.command, spawnSpec.args, {
      cwd: root,
      shell: false,
      stdio: "inherit",
      env: {
        ...process.env,
        ...options.env
      }
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${commandLabel(command, commandArgs)} exited with ${code}`));
      }
    });
  });
}

function step(label, command, commandArgs, options = {}) {
  return { label, command, commandArgs, options };
}

function createStepSummary(item) {
  return {
    label: item.label,
    command: commandLabel(item.command, item.commandArgs),
    status: "planned",
    started_at: null,
    completed_at: null,
    duration_ms: null,
    error: null
  };
}

function writeSummary(filePath, summary) {
  if (!filePath) return;

  const absolutePath = path.resolve(root, filePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(summary, null, 2)}\n`);
}

async function main() {
  if (hasFlag("--help") || hasFlag("-h")) {
    printHelp();
    return;
  }

  const phase = hasFlag("--live") ? "live" : argValue("--phase", "pre-apply");
  if (!["pre-apply", "live"].includes(phase)) {
    throw new Error(`Unsupported --phase value: ${phase}. Use pre-apply or live.`);
  }

  const cloudflareEnvFiles = [
    ...argValues("--cloudflare-env-file"),
    ...argValues("--env-file")
  ];
  if (cloudflareEnvFiles.length === 0) cloudflareEnvFiles.push(".env");

  const leadEnvFile = argValue("--lead-env-file", ".env.lead.production.local");
  const baseUrl = (argValue("--base-url", process.env.LEAD_SMOKE_BASE_URL || "") || "").replace(/\/+$/, "");
  const skipLocalSmoke = hasFlag("--skip-local-smoke");
  const dryRun = hasFlag("--dry-run");
  const summaryFile = hasFlag("--no-summary")
    ? ""
    : argValue("--summary-file", "artifacts/lead-launch-gate-summary.json");

  cloudflareEnvFiles.forEach((filePath) => assertFileExists(filePath, "Cloudflare env file"));
  assertFileExists(leadEnvFile, "Lead production env file");
  if (phase === "live" && !baseUrl) {
    throw new Error("Live lead launch gate requires --base-url or LEAD_SMOKE_BASE_URL.");
  }

  const cloudflareEnvArgs = cloudflareEnvFiles.flatMap((filePath) => ["--env-file", filePath]);
  const gateSteps = [
    step("Lead readiness audit", npmCommand, ["run", "qa:lead-readiness"]),
    step("Lead analytics audit", "node", ["scripts/audit-lead-analytics.mjs"]),
    step("TypeScript check", npxCommand, ["tsc", "--noEmit"]),
    step("Astro check", npxCommand, ["astro", "check"]),
    step("Remote D1 lead migrations audit", npmCommand, ["run", "qa:lead-d1"]),
    step("Production lead env preflight", npmCommand, [
      "run",
      "qa:lead-env",
      "--",
      "--env-file",
      leadEnvFile
    ]),
    step("Cloudflare lead env sync dry-run", npmCommand, [
      "run",
      "lead-env:sync",
      "--",
      ...cloudflareEnvArgs,
      "--lead-env-file",
      leadEnvFile
    ]),
    step("Cloudflare Pages lead config audit", npmCommand, [
      "run",
      "qa:lead-cloudflare",
      "--",
      ...cloudflareEnvArgs,
      ...(phase === "pre-apply" ? ["--allow-missing-lead-env"] : [])
    ])
  ];

  if (!skipLocalSmoke) {
    gateSteps.push(step("Local Pages lead smoke", npmCommand, ["run", "qa:lead-flow:local"]));
  }

  if (phase === "live") {
    gateSteps.push(
      step("Remote report-backed lead smoke", npmCommand, [
        "run",
        "qa:lead-flow:remote",
        "--",
        "--base-url",
        baseUrl,
        "--env-file",
        leadEnvFile
      ])
    );
  }

  const summary = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    started_at: new Date().toISOString(),
    completed_at: null,
    result: dryRun ? "dry-run" : "running",
    phase,
    lead_env_file: leadEnvFile,
    cloudflare_env_files: cloudflareEnvFiles,
    remote_smoke_url: phase === "live" ? baseUrl : null,
    local_smoke: skipLocalSmoke ? "skipped" : "enabled",
    secret_values_printed: false,
    steps: gateSteps.map(createStepSummary)
  };

  console.log("Lead launch gate");
  console.log(`Phase: ${phase}`);
  console.log(`Lead env file: ${leadEnvFile}`);
  console.log(`Cloudflare env files: ${cloudflareEnvFiles.join(", ")}`);
  if (phase === "live") console.log(`Remote smoke URL: ${baseUrl}`);
  console.log(`Local smoke: ${skipLocalSmoke ? "skipped" : "enabled"}`);
  console.log("Secrets are not printed by this gate.");
  if (summaryFile) console.log(`Summary file: ${summaryFile}`);

  if (dryRun) {
    console.log("\nPlanned steps:");
    gateSteps.forEach((item, index) => {
      console.log(`${index + 1}. ${item.label}: ${commandLabel(item.command, item.commandArgs)}`);
    });
    summary.completed_at = new Date().toISOString();
    writeSummary(summaryFile, summary);
    return;
  }

  writeSummary(summaryFile, summary);

  for (const [index, item] of gateSteps.entries()) {
    const stepSummary = summary.steps[index];
    const stepStartedAt = Date.now();

    console.log(`\n==> ${item.label}`);
    stepSummary.status = "running";
    stepSummary.started_at = new Date().toISOString();
    writeSummary(summaryFile, summary);

    try {
      await run(item.command, item.commandArgs, item.options);
      stepSummary.status = "passed";
    } catch (error) {
      stepSummary.status = "failed";
      stepSummary.error = error instanceof Error ? error.message : String(error);
      summary.result = "failed";
      summary.completed_at = new Date().toISOString();
      stepSummary.completed_at = summary.completed_at;
      stepSummary.duration_ms = Date.now() - stepStartedAt;
      writeSummary(summaryFile, summary);
      throw error;
    }

    stepSummary.completed_at = new Date().toISOString();
    stepSummary.duration_ms = Date.now() - stepStartedAt;
    writeSummary(summaryFile, summary);
  }

  summary.result = "passed";
  summary.completed_at = new Date().toISOString();
  writeSummary(summaryFile, summary);

  console.log(`\nLead launch gate passed (${phase}).`);
  if (phase === "pre-apply") {
    console.log(
      "Next: review the dry-run names/types, run lead-env:sync with --apply, deploy, then run this gate with --phase live."
    );
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
