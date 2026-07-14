import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const args = process.argv.slice(2);
const urlIndex = args.indexOf("--url");
const remoteUrl = urlIndex >= 0 ? args[urlIndex + 1] : "";

function readText(path) {
  return readFileSync(resolve(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function hasRule(text, selector, required) {
  const blocks = [...text.matchAll(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`, "g"))];
  return blocks.some((match) => required.every((part) => match[1].includes(part)));
}

async function loadRemote(url) {
  assert(url, "Pass a URL after --url.");
  const response = await fetch(url);
  assert(response.ok, `Remote sales page returned HTTP ${response.status}.`);
  return response.text();
}

const source = readText("src/pages/sales.astro");
const globalCss = readText("src/styles/global.css");
const startProjectApi = readText("functions/api/start-project.ts");
const sourceDetailsMigration = readText("migrations/0015_sales_client_source_details.sql");

assert(source.includes('<body class="sales-body">'), "Sales page must keep the sales-body scope.");
assert(source.includes("<LiquidBackground />"), "Sales page must keep the shared LiquidBackground component.");
assert(
  hasRule(source, ".sales-app", ["position: relative", "z-index: 1"]),
  "Sales UI must keep .sales-app above the fixed background: position: relative; z-index: 1."
);
assert(
  hasRule(globalCss, ".liquid-background", ["position: fixed", "z-index: 0", "pointer-events: none"]),
  "LiquidBackground must remain fixed behind page content with pointer-events disabled."
);
assert(
  source.includes('data-tab="clients"') && source.includes('data-tab="actions"'),
  "Sales page must keep separate Clients and Actions tabs."
);
assert(source.includes("data-export-xlsx"), "Sales page must keep the XLSX export control.");
assert(source.includes("data-delete-client") && source.includes("data-delete-action"), "Sales page must keep admin delete controls.");
assert(source.includes("<th>Источник / кампания</th>"), "Clients table must expose the source/campaign column.");
assert(source.includes('name="source"'), "Client cards must expose the source field.");
assert(source.includes('name="source_details"'), "Extended client card must expose full attribution details.");
assert(sourceDetailsMigration.includes("source_details"), "Sales D1 migration must add source_details.");
assert(source.includes("data-client-details-panel hidden"), "Extended client card must be hidden until opened from the short card or client row.");
assert(!source.includes("первое действие"), "Clients flow must use client next step wording, not first-action wording.");
assert(!source.includes("Компания + первое действие"), "Clients tab must not present client creation as first-action creation.");
assert(!source.includes("первое действие добавлены"), "Quick client creation must not create an action.");
assert(!source.includes("payload.task"), "Quick client form must save client fields, not an action task.");
assert(!source.includes("quickAddForm.elements.action_date"), "Quick client form must use next_action_at, not action_date.");
assert(
  startProjectApi.includes("syncLeadToSalesTracker") &&
    startProjectApi.includes('owner_id: "pavel"') &&
    startProjectApi.includes('"create_from_site_lead"') &&
    startProjectApi.includes("salesLeadSourceDetails") &&
    startProjectApi.includes("Ключевое слово:") &&
    startProjectApi.includes("Объявление / creative:") &&
    startProjectApi.includes("Campaign ID:") &&
    startProjectApi.includes("Ad group ID:") &&
    startProjectApi.includes("Ad ID / creative ID:") &&
    startProjectApi.includes("Click ID:"),
  "Start-project submissions must create a Pavel-owned sales client with full attribution source context."
);
assert(
  !startProjectApi.includes("INSERT INTO sales_actions"),
  "Start-project submissions must not create sales actions automatically."
);
assert(
  !/<input[^>]*data-date-field[^>]*type="date"|<input[^>]*type="date"[^>]*data-date-field/.test(source),
  "Sales date fields must stay text inputs to avoid the native browser calendar regression."
);

const distPath = "dist/sales/index.html";
if (existsSync(resolve(root, distPath))) {
  const html = readText(distPath);
  assert(html.includes("Sales Tracker | AlfaRank"), "Built /sales/ page title is missing.");
  assert(
    /\.sales-app\{[^}]*position:relative[^}]*z-index:1/.test(html),
    "Built /sales/ page does not include the sales-app stacking fix."
  );
  assert(html.includes("data-export-xlsx"), "Built /sales/ page is missing XLSX export.");
}

if (remoteUrl) {
  const html = await loadRemote(remoteUrl);
  assert(html.includes("Sales Tracker | AlfaRank"), "Remote /sales/ page title is missing.");
  assert(
    /\.sales-app\{[^}]*position:relative[^}]*z-index:1/.test(html),
    "Remote /sales/ page does not include the sales-app stacking fix."
  );
  assert(html.includes("data-export-xlsx"), "Remote /sales/ page is missing XLSX export.");
  assert(html.includes("Короткая карточка"), "Remote /sales/ page is missing the short client card.");
  assert(html.includes("data-client-details-panel hidden"), "Remote /sales/ page must ship the hidden extended client card.");
  assert(!html.includes("Компания + первое действие"), "Remote /sales/ page still has first-action client copy.");
  assert(!html.includes("payload.task"), "Remote /sales/ page still creates an action from the quick client form.");
  assert(!html.includes('type="date"'), "Remote /sales/ page still ships native date inputs.");
}

console.log("Sales page QA passed. Still run browser screenshot QA before production deploy.");
