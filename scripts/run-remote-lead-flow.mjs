import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const nodeCommand = process.execPath;

function argValues(name) {
  const values = [];

  args.forEach((arg, index) => {
    if (arg === name && args[index + 1]) values.push(args[index + 1]);
    if (arg.startsWith(`${name}=`)) values.push(arg.slice(name.length + 1));
  });

  return values;
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

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function safeUrl(input) {
  try {
    return new URL(input);
  } catch {
    return null;
  }
}

function isLocalHost(hostname) {
  return ["localhost", "127.0.0.1", "::1", "[::1]"].includes(hostname);
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
        reject(new Error(`${command} ${commandArgs.join(" ")} exited with ${code}`));
      }
    });
  });
}

function printHelp() {
  console.log(`Usage:
  npm run qa:lead-flow:remote -- --base-url https://preview.example.pages.dev
  npm run qa:lead-flow:remote -- --base-url https://preview.example.pages.dev --env-file .env.production.local

Required:
  LEAD_SMOKE_BASE_URL or --base-url
  LEAD_REPORT_TOKEN or LEAD_SMOKE_REPORT_TOKEN

Optional:
  --env-file <path>       Load production/preview variables without printing secrets.
  --allow-localhost       Permit localhost targets for wrapper debugging only.
  --skip-env-preflight    Skip npm run qa:lead-env equivalent and run smoke only.
  --dry-run               Validate inputs and env preflight without posting smoke leads.
`);
}

async function main() {
  if (hasFlag("--help") || hasFlag("-h")) {
    printHelp();
    return;
  }

  const envFileValues = argValues("--env-file").reduce(
    (acc, filePath) => ({ ...acc, ...parseEnvFile(filePath) }),
    {}
  );
  const env = {
    ...process.env,
    ...envFileValues
  };
  const baseUrl = (argValues("--base-url").at(-1) || env.LEAD_SMOKE_BASE_URL || "").replace(/\/+$/, "");
  const reportToken = env.LEAD_REPORT_TOKEN || env.LEAD_SMOKE_REPORT_TOKEN || "";
  const parsedBaseUrl = safeUrl(baseUrl);

  assert(baseUrl, "Remote lead smoke requires LEAD_SMOKE_BASE_URL or --base-url.");
  assert(parsedBaseUrl, `Remote lead smoke base URL is invalid: ${baseUrl}`);
  assert(
    parsedBaseUrl.protocol === "https:" || parsedBaseUrl.protocol === "http:",
    "Remote lead smoke base URL must use http(s)."
  );
  assert(
    hasFlag("--allow-localhost") || !isLocalHost(parsedBaseUrl.hostname),
    "Remote lead smoke refuses localhost targets. Use qa:lead-flow:local for local checks."
  );
  assert(reportToken, "Remote lead smoke requires LEAD_REPORT_TOKEN or LEAD_SMOKE_REPORT_TOKEN.");

  if (!hasFlag("--skip-env-preflight")) {
    console.log("Running production lead env preflight...");
    await run(nodeCommand, ["scripts/audit-lead-production-env.mjs", ...argValues("--env-file").flatMap((filePath) => ["--env-file", filePath])], {
      env
    });
  }

  if (hasFlag("--dry-run")) {
    console.log("Remote lead flow dry run passed.");
    return;
  }

  console.log(`Running strict lead smoke against ${baseUrl}`);
  await run(nodeCommand, ["scripts/smoke-lead-flow.mjs"], {
    env: {
      ...env,
      LEAD_SMOKE_BASE_URL: baseUrl,
      LEAD_SMOKE_REQUIRE_REPORT: "1"
    }
  });

  console.log("Remote lead flow smoke passed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
