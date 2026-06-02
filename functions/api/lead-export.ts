type Env = {
  DB: D1Database;
  LEAD_REPORT_TOKEN?: string;
};

type LeadExportRow = Record<string, string | number | null>;

const ACTIVE_STATUS_SQL = "COALESCE(status, 'new') IN ('new', 'reviewed', 'contacted', 'qualified', 'proposal')";
const RESPONSE_AGE_HOURS_SQL = "ROUND((julianday('now') - julianday(created_at)) * 24, 1)";
const SLA_STATE_SQL = `CASE
  WHEN ${ACTIVE_STATUS_SQL} = 0 THEN 'closed'
  WHEN lead_status_updated_at IS NOT NULL THEN 'touched'
  WHEN lead_priority = 'high' AND ${RESPONSE_AGE_HOURS_SQL} >= 4 THEN 'overdue'
  WHEN lead_priority = 'medium' AND ${RESPONSE_AGE_HOURS_SQL} >= 12 THEN 'overdue'
  WHEN lead_priority = 'low' AND ${RESPONSE_AGE_HOURS_SQL} >= 24 THEN 'overdue'
  WHEN lead_priority = 'high' AND ${RESPONSE_AGE_HOURS_SQL} >= 2 THEN 'due_soon'
  WHEN lead_priority = 'medium' AND ${RESPONSE_AGE_HOURS_SQL} >= 8 THEN 'due_soon'
  WHEN lead_priority = 'low' AND ${RESPONSE_AGE_HOURS_SQL} >= 18 THEN 'due_soon'
  ELSE 'on_track'
END`;

function responseDueHoursSql(): string {
  return `CASE lead_priority
    WHEN 'high' THEN 4
    WHEN 'medium' THEN 12
    WHEN 'low' THEN 24
    ELSE 24
  END`;
}

function responseDueAtSql(): string {
  return `strftime('%Y-%m-%dT%H:%M:%fZ', created_at, '+' || (${responseDueHoursSql()}) || ' hours')`;
}

function responseRemainingHoursSql(): string {
  return `ROUND((${responseDueHoursSql()}) - (${RESPONSE_AGE_HOURS_SQL}), 1)`;
}

function followUpAgeHoursSql(): string {
  return "ROUND((julianday('now') - julianday(lead_status_updated_at)) * 24, 1)";
}

function followUpStateSql(): string {
  return `CASE
    WHEN ${ACTIVE_STATUS_SQL} = 0 THEN 'closed'
    WHEN lead_status_updated_at IS NULL THEN 'not_started'
    WHEN ${followUpAgeHoursSql()} >= 48 THEN 'stale'
    WHEN ${followUpAgeHoursSql()} >= 24 THEN 'due_soon'
    ELSE 'on_track'
  END`;
}

const EXPORT_COLUMNS = [
  "id",
  "created_at",
  "status",
  "lead_owner",
  "lead_status_updated_at",
  "name",
  "email",
  "company",
  "locale",
  "lead_channel",
  "partner_ref",
  "landing_page",
  "landing_offer",
  "form_variant",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "lead_score",
  "lead_priority",
  "routing_bucket",
  "next_action",
  "needs_owner",
  "needs_next_action",
  "response_sla",
  "response_age_hours",
  "response_due_hours",
  "response_due_at",
  "response_remaining_hours",
  "follow_up_sla",
  "follow_up_age_hours",
  "project_type",
  "current_system",
  "desired_output",
  "business_problem",
  "desired_result",
  "integrations",
  "budget",
  "timeline",
  "contact_details",
  "lead_follow_up_note"
];

function textResponse(message: string, status = 400): Response {
  return new Response(message, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

function bearerToken(request: Request): string {
  const authorization = request.headers.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (match) return match[1].trim();

  const url = new URL(request.url);
  return url.searchParams.get("token")?.trim() || "";
}

function parseLimit(url: URL): number {
  const value = Number(url.searchParams.get("limit") || "200");
  if (!Number.isFinite(value)) return 200;
  return Math.max(1, Math.min(Math.floor(value), 500));
}

function includeTestLeads(url: URL): boolean {
  const value = (url.searchParams.get("include_test") || "").toLowerCase();
  return ["1", "true", "yes"].includes(value);
}

function booleanParam(url: URL, name: string): boolean {
  return ["1", "true", "yes"].includes((url.searchParams.get(name) || "").toLowerCase());
}

function safeFilter(value: string | null, allowed: string[]): string | null {
  if (!value) return null;
  return allowed.includes(value) ? value : null;
}

function safeDateBoundary(value: string | null, boundary: "start" | "end"): string | null {
  const rawValue = value?.trim();
  if (!rawValue) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(rawValue)) {
    return boundary === "start" ? `${rawValue}T00:00:00.000Z` : `${rawValue}T23:59:59.999Z`;
  }

  const date = new Date(rawValue);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function csvCell(value: string | number | null | undefined): string {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function csvBody(rows: LeadExportRow[]): string {
  const lines = [EXPORT_COLUMNS.join(",")];

  rows.forEach((row) => {
    lines.push(EXPORT_COLUMNS.map((column) => csvCell(row[column])).join(","));
  });

  return `${lines.join("\n")}\n`;
}

async function exportRows(env: Env, request: Request): Promise<LeadExportRow[]> {
  const url = new URL(request.url);
  const limit = parseLimit(url);
  const includeTest = includeTestLeads(url);
  const status = safeFilter(url.searchParams.get("status"), [
    "new",
    "reviewed",
    "contacted",
    "qualified",
    "proposal",
    "won",
    "lost",
    "spam",
    "archived"
  ]);
  const channel = safeFilter(url.searchParams.get("channel"), ["direct", "referral", "campaign", "paid", "partner"]);
  const locale = safeFilter(url.searchParams.get("locale"), ["en", "ru", "ro"]);
  const priority = safeFilter(url.searchParams.get("priority"), ["low", "medium", "high"]);
  const bucket = url.searchParams.get("bucket")?.trim().slice(0, 80) || null;
  const offer = url.searchParams.get("offer")?.trim().slice(0, 120) || null;
  const formVariant = url.searchParams.get("form_variant")?.trim().slice(0, 120) || null;
  const utmSource = url.searchParams.get("utm_source")?.trim().slice(0, 120) || null;
  const utmMedium = url.searchParams.get("utm_medium")?.trim().slice(0, 120) || null;
  const utmCampaign = url.searchParams.get("utm_campaign")?.trim().slice(0, 120) || null;
  const partnerRef = url.searchParams.get("partner_ref")?.trim().slice(0, 120) || null;
  const responseSla = safeFilter(url.searchParams.get("response_sla"), ["overdue", "due_soon", "on_track", "touched", "closed"]);
  const followUpSla = safeFilter(url.searchParams.get("follow_up_sla"), ["stale", "due_soon", "on_track", "not_started", "closed"]);
  const createdFrom = safeDateBoundary(url.searchParams.get("created_from"), "start");
  const createdTo = safeDateBoundary(url.searchParams.get("created_to"), "end");
  const owner = url.searchParams.get("owner")?.trim().slice(0, 120) || null;
  const needsOwner = booleanParam(url, "needs_owner");
  const needsNextAction = booleanParam(url, "needs_next_action");

  const conditions: string[] = [];
  const bindings: unknown[] = [];

  if (!includeTest) {
    conditions.push(`NOT (
      email LIKE 'lead-smoke-%@example.com'
      OR landing_offer LIKE 'smoke-lead-%'
      OR utm_campaign LIKE 'lead-smoke-%'
    )`);
  }

  if (status) {
    conditions.push("status = ?");
    bindings.push(status);
  }

  if (channel) {
    conditions.push("lead_channel = ?");
    bindings.push(channel);
  }

  if (locale) {
    conditions.push("locale = ?");
    bindings.push(locale);
  }

  if (priority) {
    conditions.push("lead_priority = ?");
    bindings.push(priority);
  }

  if (bucket) {
    conditions.push("routing_bucket = ?");
    bindings.push(bucket);
  }

  if (offer) {
    conditions.push("landing_offer = ?");
    bindings.push(offer);
  }

  if (formVariant) {
    conditions.push("form_variant = ?");
    bindings.push(formVariant);
  }

  if (utmSource) {
    conditions.push("utm_source = ?");
    bindings.push(utmSource);
  }

  if (utmMedium) {
    conditions.push("utm_medium = ?");
    bindings.push(utmMedium);
  }

  if (utmCampaign) {
    conditions.push("utm_campaign = ?");
    bindings.push(utmCampaign);
  }

  if (partnerRef) {
    conditions.push("partner_ref = ?");
    bindings.push(partnerRef);
  }

  if (responseSla) {
    conditions.push(`${SLA_STATE_SQL} = ?`);
    bindings.push(responseSla);
  }

  if (followUpSla) {
    conditions.push(`${followUpStateSql()} = ?`);
    bindings.push(followUpSla);
  }

  if (createdFrom) {
    conditions.push("created_at >= ?");
    bindings.push(createdFrom);
  }

  if (createdTo) {
    conditions.push("created_at <= ?");
    bindings.push(createdTo);
  }

  if (owner) {
    conditions.push("LOWER(COALESCE(NULLIF(lead_owner, ''), '')) = LOWER(?)");
    bindings.push(owner);
  }

  if (needsOwner) {
    conditions.push(`${ACTIVE_STATUS_SQL} AND COALESCE(NULLIF(lead_owner, ''), '') = ''`);
  }

  if (needsNextAction) {
    conditions.push(`${ACTIVE_STATUS_SQL} AND COALESCE(NULLIF(next_action, ''), '') = ''`);
  }

  const whereSql = conditions.length ? `WHERE ${conditions.join("\n      AND ")}` : "";
  const result = await env.DB.prepare(
    `SELECT
      id,
      created_at,
      status,
      lead_owner,
      lead_status_updated_at,
      name,
      email,
      company,
      locale,
      lead_channel,
      partner_ref,
      landing_page,
      landing_offer,
      form_variant,
      utm_source,
      utm_medium,
      utm_campaign,
      lead_score,
      lead_priority,
      routing_bucket,
      next_action,
      CASE WHEN COALESCE(NULLIF(lead_owner, ''), '') = '' THEN 1 ELSE 0 END AS needs_owner,
      CASE WHEN COALESCE(NULLIF(next_action, ''), '') = '' THEN 1 ELSE 0 END AS needs_next_action,
      ${SLA_STATE_SQL} AS response_sla,
      ${RESPONSE_AGE_HOURS_SQL} AS response_age_hours,
      ${responseDueHoursSql()} AS response_due_hours,
      ${responseDueAtSql()} AS response_due_at,
      ${responseRemainingHoursSql()} AS response_remaining_hours,
      ${followUpStateSql()} AS follow_up_sla,
      ${followUpAgeHoursSql()} AS follow_up_age_hours,
      project_type,
      current_system,
      desired_output,
      business_problem,
      desired_result,
      integrations,
      budget,
      timeline,
      contact_details,
      lead_follow_up_note
    FROM project_requests
    ${whereSql}
    ORDER BY created_at DESC
    LIMIT ?`
  )
    .bind(...bindings, limit)
    .all<LeadExportRow>();

  return result.results || [];
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return textResponse("Lead storage is not configured.", 500);
  }

  if (!env.LEAD_REPORT_TOKEN) {
    return textResponse("Lead export access is not configured.", 503);
  }

  if (bearerToken(request) !== env.LEAD_REPORT_TOKEN) {
    return textResponse("Unauthorized.", 401);
  }

  const rows = await exportRows(env, request);
  const generatedAt = new Date().toISOString().replace(/[:.]/g, "-");

  return new Response(csvBody(rows), {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="alfarank-leads-${generatedAt}.csv"`,
      "cache-control": "no-store"
    }
  });
};

export const onRequestPost: PagesFunction = async () => {
  return textResponse("Method not allowed.", 405);
};
