import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = process.argv.slice(2);
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

const requiredMigrationFiles = [
  "0001_project_requests.sql",
  "0002_project_request_intake_fields.sql",
  "0003_project_request_tracking_fields.sql",
  "0004_project_request_attribution_fields.sql",
  "0005_project_request_routing_fields.sql",
  "0006_project_request_lifecycle_fields.sql",
  "0007_project_request_status_events.sql",
  "0008_project_request_notification_events.sql",
  "0009_project_request_form_variant.sql"
];

const requiredTables = [
  "project_request_notification_events",
  "project_request_status_events",
  "project_requests"
];

const requiredColumnsByTable = {
  project_requests: [
    "id",
    "name",
    "email",
    "project_type",
    "current_system",
    "business_problem",
    "desired_result",
    "budget",
    "timeline",
    "source_path",
    "user_agent",
    "ip_address",
    "status",
    "created_at",
    "company",
    "desired_output",
    "integrations",
    "contact_details",
    "landing_page",
    "landing_offer",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "locale",
    "referrer",
    "lead_channel",
    "partner_ref",
    "lead_score",
    "lead_priority",
    "routing_bucket",
    "next_action",
    "lead_owner",
    "lead_follow_up_note",
    "lead_status_updated_at",
    "form_variant"
  ],
  project_request_status_events: [
    "id",
    "lead_id",
    "previous_status",
    "status",
    "owner",
    "next_action",
    "note",
    "created_at"
  ],
  project_request_notification_events: [
    "id",
    "lead_id",
    "event_type",
    "channel",
    "status",
    "status_code",
    "error_message",
    "created_at"
  ]
};

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
  npm run qa:lead-d1
  npm run qa:lead-d1 -- --database DB
  npm run qa:lead-d1 -- --summary-file artifacts/lead-d1-migrations-summary.json

Checks local lead D1 migration files and remote D1 schema without printing
secret values.

Options:
  --database <binding>     D1 binding/database name. Defaults to DB.
  --summary-file <path>    Write a no-secret JSON summary. Defaults to
                           artifacts/lead-d1-migrations-summary.json.
  --no-summary             Do not write the JSON summary.
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

function run(command, commandArgs) {
  return new Promise((resolve) => {
    const spawnSpec = commandSpec(command, commandArgs);
    const child = spawn(spawnSpec.command, spawnSpec.args, {
      cwd: root,
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      env: process.env
    });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      resolve({
        exitCode: 1,
        stdout,
        stderr,
        error: error instanceof Error ? error.message : String(error)
      });
    });
    child.on("exit", (code) => {
      resolve({
        exitCode: code ?? 1,
        stdout,
        stderr,
        error: null
      });
    });
  });
}

function extractWranglerJson(output) {
  const start = output.indexOf("[");
  const end = output.lastIndexOf("]");
  if (start < 0 || end < start) {
    throw new Error("Wrangler output did not contain a JSON result array.");
  }
  return JSON.parse(output.slice(start, end + 1));
}

function queryResults(payload) {
  return Array.isArray(payload?.[0]?.results) ? payload[0].results : [];
}

function writeSummary(filePath, summary) {
  if (!filePath) return;

  const absolutePath = path.resolve(root, filePath);
  mkdirSync(path.dirname(absolutePath), { recursive: true });
  writeFileSync(absolutePath, `${JSON.stringify(summary, null, 2)}\n`);
}

function localMigrationFiles() {
  const migrationsPath = path.resolve(root, "migrations");
  if (!existsSync(migrationsPath)) return [];
  return readdirSync(migrationsPath)
    .filter((name) => name.endsWith(".sql"))
    .sort();
}

function missingItems(required, actual) {
  const actualSet = new Set(actual);
  return required.filter((item) => !actualSet.has(item));
}

function readMigrationSnippets() {
  const snippets = {};
  requiredMigrationFiles.forEach((name) => {
    const filePath = path.resolve(root, "migrations", name);
    snippets[name] = existsSync(filePath) ? readFileSync(filePath, "utf8").slice(0, 400) : "";
  });
  return snippets;
}

async function wranglerExecute(database, command) {
  const result = await run(npxCommand, ["wrangler", "d1", "execute", database, "--remote", "--command", command]);
  if (result.exitCode !== 0) {
    throw new Error(`wrangler d1 execute failed with exit code ${result.exitCode}.`);
  }
  return queryResults(extractWranglerJson(result.stdout));
}

async function main() {
  if (hasFlag("--help") || hasFlag("-h")) {
    printHelp();
    return;
  }

  const database = argValue("--database", "DB");
  const summaryFile = hasFlag("--no-summary")
    ? ""
    : argValue("--summary-file", "artifacts/lead-d1-migrations-summary.json");
  const failures = [];
  const warnings = [];
  const passed = [];

  const localFiles = localMigrationFiles();
  const missingMigrations = missingItems(requiredMigrationFiles, localFiles);
  if (missingMigrations.length > 0) {
    failures.push(`Missing local lead D1 migration files: ${missingMigrations.join(", ")}.`);
  } else {
    passed.push("local migration file inventory");
  }

  const migrationSnippets = readMigrationSnippets();
  if (!migrationSnippets["0007_project_request_status_events.sql"].includes("project_request_status_events")) {
    failures.push("Migration 0007 does not define project_request_status_events.");
  }
  if (!migrationSnippets["0008_project_request_notification_events.sql"].includes("project_request_notification_events")) {
    failures.push("Migration 0008 does not define project_request_notification_events.");
  }
  if (!migrationSnippets["0009_project_request_form_variant.sql"].includes("form_variant")) {
    failures.push("Migration 0009 does not define form_variant.");
  }

  let migrationsListOutput = "";
  let noPendingRemoteMigrations = false;
  let remoteTables = [];
  const remoteColumnsByTable = {};

  try {
    const migrationsList = await run(npxCommand, ["wrangler", "d1", "migrations", "list", database, "--remote"]);
    migrationsListOutput = `${migrationsList.stdout}\n${migrationsList.stderr}`.trim();
    noPendingRemoteMigrations = migrationsList.exitCode === 0 && /No migrations to apply/i.test(migrationsListOutput);
    if (noPendingRemoteMigrations) {
      passed.push("remote migration list has no pending migrations");
    } else {
      failures.push(`Remote D1 migrations are not clean for ${database}. Run npm run db:migrate:remote.`);
    }
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  }

  try {
    const tableRows = await wranglerExecute(
      database,
      "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('project_requests','project_request_status_events','project_request_notification_events') ORDER BY name"
    );
    remoteTables = tableRows.map((row) => row.name).filter(Boolean).sort();
    const missingTables = missingItems(requiredTables, remoteTables);
    if (missingTables.length > 0) {
      failures.push(`Remote D1 is missing lead tables: ${missingTables.join(", ")}.`);
    } else {
      passed.push("remote lead tables");
    }

    for (const tableName of requiredTables) {
      const columns = await wranglerExecute(database, `PRAGMA table_info(${tableName})`);
      remoteColumnsByTable[tableName] = columns.map((row) => row.name).filter(Boolean).sort();
      const missingColumns = missingItems(requiredColumnsByTable[tableName], remoteColumnsByTable[tableName]);
      if (missingColumns.length > 0) {
        failures.push(`Remote table ${tableName} is missing columns: ${missingColumns.join(", ")}.`);
      } else {
        passed.push(`remote ${tableName} columns`);
      }
    }
  } catch (error) {
    failures.push(error instanceof Error ? error.message : String(error));
  }

  if (!noPendingRemoteMigrations) {
    warnings.push("Remote schema checks may be stale until pending D1 migrations are applied.");
  }

  const summary = {
    schema_version: 1,
    generated_at: new Date().toISOString(),
    result: failures.length > 0 ? "failed" : "passed",
    database,
    remote: true,
    secret_values_printed: false,
    local_migration_files: localFiles,
    required_migration_files: requiredMigrationFiles,
    missing_local_migration_files: missingMigrations,
    no_pending_remote_migrations: noPendingRemoteMigrations,
    remote_tables: remoteTables,
    remote_columns_by_table: remoteColumnsByTable,
    passed_count: passed.length,
    failures,
    warnings
  };

  writeSummary(summaryFile, summary);

  console.log("Lead D1 migrations audit");
  console.log(`Database binding: ${database}`);
  console.log(`Local lead migrations: ${localFiles.filter((name) => requiredMigrationFiles.includes(name)).length}/${requiredMigrationFiles.length}`);
  console.log(`Remote migrations pending: ${noPendingRemoteMigrations ? "no" : "yes/unknown"}`);
  console.log(`Remote lead tables: ${remoteTables.join(", ") || "(none)"}`);
  console.log("Secret values were not printed.");
  if (summaryFile) console.log(`Summary file: ${summaryFile}`);

  if (warnings.length > 0) {
    console.log("\nWarnings:");
    warnings.forEach((warning) => console.log(`- ${warning}`));
  }

  if (failures.length > 0) {
    console.error("\nMissing or invalid D1 lead migration state:");
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
    return;
  }

  console.log(`\nLead D1 migrations audit passed: ${passed.length} checks.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
