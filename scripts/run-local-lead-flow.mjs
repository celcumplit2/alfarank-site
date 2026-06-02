import { spawn } from "node:child_process";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer as createHttpServer } from "node:http";
import { createServer as createNetServer } from "node:net";
import { setTimeout as wait } from "node:timers/promises";

const host = "127.0.0.1";
const devVarsPath = ".dev.vars";
const preferredPort = Number(process.env.LEAD_LOCAL_PORT || process.env.LEAD_SMOKE_PORT || 8788);
const reportToken = process.env.LEAD_REPORT_TOKEN || process.env.LEAD_SMOKE_REPORT_TOKEN || "local-lead-smoke-token";
const webhookToken = process.env.LEAD_SMOKE_WEBHOOK_TOKEN || "local-lead-smoke-webhook-token";
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
const children = new Set();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const spawnSpec = commandSpec(command, args);
    const child = spawn(spawnSpec.command, spawnSpec.args, {
      shell: false,
      stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
      env: {
        ...process.env,
        ...options.env
      }
    });

    children.add(child);

    let output = "";
    if (options.capture) {
      child.stdout.on("data", (chunk) => {
        output += chunk.toString();
        process.stdout.write(chunk);
      });
      child.stderr.on("data", (chunk) => {
        output += chunk.toString();
        process.stderr.write(chunk);
      });
    }

    child.on("error", reject);
    child.on("exit", (code) => {
      children.delete(child);
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
      }
    });
  });
}

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = createNetServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, host);
  });
}

async function pickPort(startPort) {
  for (let port = startPort; port < startPort + 20; port += 1) {
    if (await isPortFree(port)) return port;
  }
  throw new Error(`No free local port found from ${startPort} to ${startPort + 19}`);
}

function commandSpec(command, args) {
  if (process.platform !== "win32") {
    return { command, args };
  }

  return {
    command: "cmd.exe",
    args: ["/d", "/s", "/c", command, ...args]
  };
}

function startPagesDev(port, localEnv) {
  const spawnSpec = commandSpec(npxCommand, [
    "wrangler",
    "pages",
    "dev",
    "dist",
    "--ip",
    host,
    "--port",
    String(port),
    "--persist-to",
    ".wrangler/state"
  ]);
  const child = spawn(spawnSpec.command, spawnSpec.args, {
      shell: false,
      stdio: ["ignore", "pipe", "pipe"],
      env: {
        ...process.env,
        ...localEnv
      }
  });

  children.add(child);

  child.stdout.on("data", (chunk) => process.stdout.write(chunk));
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));
  child.on("exit", () => children.delete(child));

  return child;
}

function quoteDevVar(value) {
  return JSON.stringify(String(value));
}

function writeLocalDevVars(localEnv) {
  const hadFile = existsSync(devVarsPath);
  const previous = hadFile ? readFileSync(devVarsPath, "utf8") : "";
  const names = Object.keys(localEnv);
  const localEnvPattern = new RegExp(`^\\s*(?:${names.join("|")})\\s*=`);
  const lines = previous
    .split(/\r?\n/)
    .filter((line) => !localEnvPattern.test(line));

  Object.entries(localEnv).forEach(([name, value]) => {
    lines.push(`${name}=${quoteDevVar(value)}`);
  });
  writeFileSync(devVarsPath, `${lines.filter(Boolean).join("\n")}\n`);

  return () => {
    if (hadFile) {
      writeFileSync(devVarsPath, previous);
    } else {
      rmSync(devVarsPath, { force: true });
    }
  };
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 1_000_000) {
        reject(new Error("Webhook payload is too large."));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });

    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    request.on("error", reject);
  });
}

function startWebhookCapture(port) {
  const events = [];
  const server = createHttpServer(async (request, response) => {
    try {
      const url = new URL(request.url || "/", `http://${host}:${port}`);
      if (request.method !== "POST" || url.pathname !== "/lead-webhook") {
        response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        response.end("Not found");
        return;
      }

      if (request.headers.authorization !== `Bearer ${webhookToken}`) {
        response.writeHead(401, { "content-type": "text/plain; charset=utf-8" });
        response.end("Unauthorized");
        return;
      }

      const rawBody = await readRequestBody(request);
      const payload = JSON.parse(rawBody || "{}");
      events.push(payload);
      response.writeHead(204);
      response.end();
    } catch (error) {
      console.error("Local lead webhook capture failed", error);
      response.writeHead(400, { "content-type": "text/plain; charset=utf-8" });
      response.end("Invalid webhook payload");
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, host, () => {
      server.off("error", reject);
      resolve({ server, events });
    });
  });
}

function stopServer(server) {
  if (!server) return;
  server.close();
}

function verifyWebhookEvents(events) {
  const createdEvents = events.filter((event) => event?.event === "project_request.created");
  const statusEvents = events.filter((event) => event?.event === "project_request.status_updated");

  assert(createdEvents.length >= 3, `Expected at least 3 lead-created webhook events, got ${createdEvents.length}`);
  assert(statusEvents.length >= 1, `Expected at least 1 lead-status webhook event, got ${statusEvents.length}`);

  createdEvents.forEach((event) => {
    assert(event.id, "Lead-created webhook event is missing id");
    assert(event.lead?.email, "Lead-created webhook event is missing lead email");
    assert(event.routing?.next_action, "Lead-created webhook event is missing routing next action");
    assert(event.lead_desk_url, "Lead-created webhook event is missing lead_desk_url");
  });

  const statusEvent = statusEvents[0];
  assert(statusEvent.id, "Lead-status webhook event is missing id");
  assert(statusEvent.lead_desk_url, "Lead-status webhook event is missing lead_desk_url");
  assert(statusEvent.status_event?.status === "contacted", "Lead-status webhook event has wrong status");
  assert(statusEvent.status_event?.previous_status, "Lead-status webhook event is missing previous_status");
  assert(statusEvent.status_event?.owner === "qa", "Lead-status webhook event is missing owner");
  assert(statusEvent.status_event?.next_action === "qa_verified_follow_up", "Lead-status webhook event is missing next action");
  assert(statusEvent.lead?.status === "contacted", "Lead-status webhook event is missing updated lead status");

  console.log(
    `Local lead webhook capture verified ${createdEvents.length} created events and ${statusEvents.length} status update event.`
  );
}

async function waitForServer(baseUrl, child) {
  const deadline = Date.now() + 45_000;
  let lastError = "";

  while (Date.now() < deadline) {
    assert(child.exitCode === null, `wrangler pages dev exited early with ${child.exitCode}`);

    try {
      const response = await fetch(`${baseUrl}/start-project/`, {
        signal: AbortSignal.timeout(1500)
      });
      if (response.ok) return;
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }

    await wait(500);
  }

  throw new Error(`Timed out waiting for ${baseUrl}. Last error: ${lastError}`);
}

function stopChild(child) {
  if (!child || child.exitCode !== null) return;

  if (process.platform === "win32") {
    spawn("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
      shell: false
    });
    return;
  }

  child.kill("SIGTERM");
}

async function main() {
  const port = await pickPort(preferredPort);
  const webhookPort = await pickPort(port + 100);
  const baseUrl = `http://${host}:${port}`;
  const webhookUrl = `http://${host}:${webhookPort}/lead-webhook`;
  const localEnv = {
    LEAD_REPORT_TOKEN: reportToken,
    LEAD_WEBHOOK_URL: webhookUrl,
    LEAD_WEBHOOK_TOKEN: webhookToken,
    LEAD_TELEGRAM_BOT_TOKEN: "",
    LEAD_TELEGRAM_CHAT_ID: "",
    LEAD_TELEGRAM_MESSAGE_THREAD_ID: ""
  };
  const restoreDevVars = writeLocalDevVars(localEnv);
  let pagesDev;
  let webhookCapture;

  try {
    console.log(`Lead local smoke port: ${port}`);
    console.log(`Lead local webhook capture port: ${webhookPort}`);
    console.log("Applying local D1 migrations...");
    await run(npmCommand, ["run", "db:migrate:local"]);

    console.log("Building static output...");
    await run(npmCommand, ["run", "build"]);

    console.log("Starting local Cloudflare Pages runtime...");
    webhookCapture = await startWebhookCapture(webhookPort);
    pagesDev = startPagesDev(port, localEnv);

    await waitForServer(baseUrl, pagesDev);

    console.log("Running lead smoke test against local Pages runtime...");
    await run(npmCommand, ["run", "qa:lead-flow"], {
      env: {
        LEAD_SMOKE_BASE_URL: baseUrl,
        LEAD_REPORT_TOKEN: reportToken,
        LEAD_SMOKE_REQUIRE_REPORT: "1",
        LEAD_SMOKE_EXPECT_NOTIFICATION_EVENTS: "1"
      }
    });

    verifyWebhookEvents(webhookCapture.events);
    console.log("Local lead flow smoke passed.");
  } finally {
    stopChild(pagesDev);
    stopServer(webhookCapture?.server);
    for (const child of children) stopChild(child);
    restoreDevVars();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  for (const child of children) stopChild(child);
  process.exit(1);
});
