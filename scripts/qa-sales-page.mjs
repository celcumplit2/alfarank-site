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
  return { html: await response.text(), headers: response.headers };
}

const source = readText("src/pages/sales.astro");
const globalCss = readText("src/styles/global.css");
const nativeSelects = readText("src/scripts/native-selects.js");
const startProjectApi = readText("functions/api/start-project.ts");
const salesClientsApi = readText("functions/api/sales/clients.ts");
const salesActionsApi = readText("functions/api/sales/actions.ts");
const salesDocumentsApi = readText("functions/api/sales/documents.ts");
const salesSharedApi = readText("functions/api/sales/_shared.ts");
const sourceDetailsMigration = readText("migrations/0015_sales_client_source_details.sql");
const actionDocumentsMigration = readText("migrations/0017_sales_action_documents.sql");
const salesVoice = readText("src/scripts/sales-voice.js");
const salesVoiceApi = readText("functions/api/sales/voice.ts");
const responseHeaders = readText("public/_headers");

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
assert(
  source.includes("data-upload-action") &&
    source.includes("data-action-document-input") &&
    source.includes('requestJson("/api/sales/documents"') &&
    source.includes("loadDocuments") &&
    source.includes("download title=\"Скачать"),
  "Action cards must expose document upload, listing, and authenticated download controls."
);
assert(
  source.includes("data-action-form-document-trigger") &&
    source.includes("data-action-form-document-input") &&
    source.includes("data-action-form-document-list") &&
    source.includes("pendingActionDocuments") &&
    source.includes("uploadActionDocument(savedAction.id, file)") &&
    source.includes("Документы выбраны:") &&
    source.includes("Действие сохранено. Документы загружены:"),
  "New action form must queue selected documents and upload them immediately after the action is saved."
);
assert(
  source.includes("options.body instanceof FormData") && source.includes("!isMultipart"),
  "Sales JSON helper must preserve the browser multipart boundary for document uploads."
);
assert(
  salesDocumentsApi.includes("export const onRequestGet") &&
    salesDocumentsApi.includes("export const onRequestPost") &&
    salesDocumentsApi.includes("request.formData()") &&
    salesDocumentsApi.includes("INSERT INTO sales_action_documents") &&
    salesDocumentsApi.includes('"content-disposition"') &&
    salesDocumentsApi.includes("actionScope(user)"),
  "Sales document API must authenticate, scope, store, list, and download action documents."
);
assert(
  actionDocumentsMigration.includes("CREATE TABLE IF NOT EXISTS sales_action_documents") &&
    actionDocumentsMigration.includes("content BLOB NOT NULL") &&
    actionDocumentsMigration.includes("REFERENCES sales_actions (id) ON DELETE CASCADE"),
  "Sales D1 migration must store action documents and remove them with their action."
);
assert(source.includes("data-delete-client") && source.includes("data-delete-action"), "Sales page must keep admin delete controls.");
assert(
  salesSharedApi.includes("canDeleteSalesData") &&
    salesClientsApi.includes("export const onRequestDelete") &&
    salesClientsApi.includes("canDeleteSalesData(user)") &&
    salesClientsApi.includes("DELETE FROM sales_actions WHERE client_id = ?") &&
    salesClientsApi.includes("DELETE FROM sales_clients WHERE id = ?") &&
    salesActionsApi.includes("export const onRequestDelete") &&
    salesActionsApi.includes("canDeleteSalesData(user)") &&
    salesActionsApi.includes("DELETE FROM sales_actions WHERE id = ?"),
  "Sales delete buttons must have working admin-only DELETE API handlers for clients and actions."
);
assert(source.includes("<th>Источник / кампания</th>"), "Clients table must expose the source/campaign column.");
assert(source.includes('name="source"'), "Client cards must expose the source field.");
assert(source.includes('name="source_details"'), "Extended client card must expose full attribution details.");
assert(
  source.includes("salesVoiceUrl") &&
    (source.match(/data-voice-form/g) || []).length === 2 &&
    source.includes("salesVoiceModuleUrl"),
  "Both active Sales forms must load the shared voice input module."
);
assert(
  salesVoice.includes("MediaRecorder") &&
    salesVoice.includes("/api/sales/voice") &&
    salesVoice.includes('body.append("form_schema"') &&
    salesVoice.includes("payload.values") &&
    salesVoice.includes("TRANSIENT_VOICE_STATUSES") &&
    salesVoice.includes("Автоматически повторяю запрос"),
  "Sales voice module must record one utterance and apply structured values across the active form."
);
assert(
  salesVoiceApi.includes("requireSalesUser") &&
    salesVoiceApi.includes("XAI_API_KEY") &&
    salesVoiceApi.includes("https://api.x.ai/v1/stt") &&
    salesVoiceApi.includes("https://api.x.ai/v1/chat/completions") &&
    salesVoiceApi.includes('type: "json_schema"'),
  "Sales voice API must authenticate and use server-side xAI STT plus structured field extraction."
);
assert(
  salesVoice.includes('navigator.mediaDevices.getUserMedia({ audio: true })') &&
    salesVoice.includes("data-voice-permission-help") &&
    salesVoice.includes("data-voice-permission-feedback") &&
    salesVoice.includes("showPermissionHelp(instance)") &&
    salesVoice.includes("hidePermissionHelp(instance)") &&
    salesVoice.includes("Проверить микрофон") &&
    !salesVoice.includes("microphonePermissionState") &&
    !salesVoice.includes("navigator.permissions.query") &&
    !salesVoice.includes("showModal") &&
    !salesVoice.includes("data-voice-permission-dialog") &&
    source.includes(".sales-voice-permission-help[hidden]") &&
    source.includes(".sales-voice-permission-feedback[hidden]") &&
    source.includes(".sales-voice-permission-actions"),
  "Microphone access must be tested through getUserMedia without blocking on a potentially stale Permissions API state."
);
assert(
  responseHeaders.includes("/sales/*") &&
    responseHeaders.includes("! Permissions-Policy") &&
    responseHeaders.includes("microphone=(self)") &&
    responseHeaders.includes("microphone=()"),
  "Sales Tracker must allow its own microphone while the rest of the site keeps the restrictive microphone policy."
);
assert(
  source.includes('class="sales-root"') &&
    source.includes(".sales-root::-webkit-scrollbar") &&
    source.includes(".sales-root::-webkit-scrollbar-button") &&
    source.includes(".sales-root::-webkit-scrollbar-button:single-button") &&
    source.includes("opacity: 0 !important") &&
    source.includes("background-image: none !important") &&
    source.includes(".sales-page-scrollbar") &&
    source.includes(".sales-custom-scrollbar") &&
    source.includes("setupCustomScrollbars") &&
    source.includes(".sales-table-wrap::-webkit-scrollbar") &&
    source.includes("scrollbar-width: none") &&
    source.includes(".sales-app *::-webkit-scrollbar") &&
    source.includes(".sales-app .ar-native-select__menu::-webkit-scrollbar") &&
    source.includes(".sales-body::-webkit-scrollbar-button") &&
    source.includes("scrollbar-color:") &&
    source.includes("scrollbar-gutter: stable"),
  "Sales UI must keep custom AlfaRank scrollbars instead of native Windows scrollbars."
);
assert(
  source.includes(".sales-check input") &&
    source.includes("appearance: none") &&
    source.includes(".sales-check input:checked"),
  "Sales checkbox controls must keep custom AlfaRank styling."
);
assert(
  source.includes(".sales-panel:has(.ar-native-select.is-open)") &&
    source.includes(".sales-filterbar:has(.ar-native-select.is-open)") &&
    source.includes(".sales-login-card:has(.ar-native-select.is-open)") &&
    source.includes(".sales-panel.has-open-native-select") &&
    source.includes(".sales-app .ar-native-select.is-open") &&
    source.includes(".sales-app .ar-native-select__menu") &&
    nativeSelects.includes("layerHostSelector") &&
    nativeSelects.includes("has-open-native-select") &&
    hasRule(source, ".sales-panel", ["position: relative", "overflow: visible"]),
  "Sales custom select menus must stay above adjacent panels when open."
);
assert(sourceDetailsMigration.includes("source_details"), "Sales D1 migration must add source_details.");
assert(
  source.includes('data-quick-add-form data-client-form') &&
    source.includes("data-client-form-title") &&
    source.includes("data-client-submit") &&
    !source.includes("data-client-details-panel") &&
    !source.includes("data-client-open-details"),
  "Clients tab must use one collapsible client form instead of separate short and extended forms."
);
assert(
  (source.match(/name="contact_name"/g) || []).length === 1 &&
    (source.match(/name="source"/g) || []).length === 1,
  "Client form must keep contact and source fields in one place, without duplicate inputs."
);
assert(
  source.includes("sales-form--quick is-collapsed") &&
    source.includes("sales-form--action is-collapsed") &&
    source.includes("data-quick-toggle") &&
    source.includes("data-action-toggle") &&
    source.includes(".sales-form.is-collapsed > :not(.sales-panel-head)") &&
    source.includes("setQuickFormExpanded(false)") &&
    source.includes("setActionFormExpanded(false)"),
  "New client and new action forms must be collapsed by default and expand only on click."
);
assert(
  source.includes('data-action-form-title tabindex="-1"') &&
    source.includes('elements.actionForm.scrollIntoView({ block: "start", behavior: "smooth" })') &&
    source.includes("elements.actionFormTitle.focus({ preventScroll: true })") &&
    source.includes("Открыто редактирование действия:"),
  "Editing an action must scroll to the populated form and expose clear visual feedback."
);
assert(
    !/<input[^>]*name="next_action"/.test(source) &&
    !/<input[^>]*name="next_action_at"/.test(source) &&
    source.includes("<th>Ближайшее действие</th>") &&
    salesClientsApi.includes("COALESCE(next_action_at, '9999-12-31')"),
  "Client form must not edit next action fields; client tables should show the nearest action as read-only."
);
assert(!source.includes("первое действие"), "Clients flow must use client next step wording, not first-action wording.");
assert(!source.includes("Компания + первое действие"), "Clients tab must not present client creation as first-action creation.");
assert(!source.includes("первое действие добавлены"), "Quick client creation must not create an action.");
assert(!source.includes("payload.task"), "Quick client form must save client fields, not an action task.");
assert(!source.includes("quickAddForm.elements.action_date"), "Client form must not use an action date field.");
assert(
  source.includes("data-action-completion-field") &&
    source.includes("updateActionCompletionFields") &&
    source.includes("Следующий шаг после результата"),
  "Action follow-up fields must be separated from the planned action itself."
);
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
assert(
  source.includes(".sales-date-picker") &&
    source.includes(".sales-date-trigger") &&
    source.includes("setupDatePickers") &&
    source.includes("renderDatePicker") &&
    source.includes("data-date-today") &&
    source.includes("data-date-value"),
  "Sales date fields must use the custom AlfaRank calendar instead of a plain text-only date control."
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
  const { html, headers } = await loadRemote(remoteUrl);
  const permissionsPolicy = headers.get("permissions-policy") || "";
  assert(
    permissionsPolicy.includes("microphone=(self)") && !permissionsPolicy.includes("microphone=()"),
    `Remote /sales/ must allow its own microphone. Received Permissions-Policy: ${permissionsPolicy || "missing"}`
  );
  assert(html.includes("Sales Tracker | AlfaRank"), "Remote /sales/ page title is missing.");
  assert(
    /\.sales-app\{[^}]*position:relative[^}]*z-index:1/.test(html),
    "Remote /sales/ page does not include the sales-app stacking fix."
  );
  assert(html.includes("data-export-xlsx"), "Remote /sales/ page is missing XLSX export.");
  assert(
    html.includes("data-quick-add-form data-client-form") &&
      html.includes("data-client-form-title") &&
      html.includes("data-client-submit"),
    "Remote /sales/ page is missing the single collapsible client form."
  );
  assert(!html.includes("data-client-details-panel"), "Remote /sales/ page still ships the removed extended client panel.");
  assert(!html.includes("data-client-open-details"), "Remote /sales/ page still ships the removed client details trigger.");
  assert(!/<input[^>]*name="next_action"/.test(html), "Remote client form still edits the next action.");
  assert(!/<input[^>]*name="next_action_at"/.test(html), "Remote client form still edits the next action date.");
  assert(!html.includes("Компания + первое действие"), "Remote /sales/ page still has first-action client copy.");
  assert(!html.includes("payload.task"), "Remote /sales/ page still creates an action from the quick client form.");
  assert(!html.includes('type="date"'), "Remote /sales/ page still ships native date inputs.");
  assert(html.includes("sales-date-picker"), "Remote /sales/ page is missing the custom AlfaRank calendar.");
  assert(html.includes("data-voice-form") && html.includes("sales-voice"), "Remote /sales/ page is missing voice input.");
}

console.log("Sales page QA passed. Still run browser screenshot QA before production deploy.");
