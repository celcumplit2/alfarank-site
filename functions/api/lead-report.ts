type Env = {
  DB: D1Database;
  LEAD_REPORT_TOKEN?: string;
};

type LeadReportRow = Record<string, string | number | null>;
type LeadReportFilters = {
  status: string | null;
  channel: string | null;
  locale: string | null;
  priority: string | null;
  bucket: string | null;
  offer: string | null;
  formVariant: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  partnerRef: string | null;
  responseSla: string | null;
  followUpSla: string | null;
  createdFrom: string | null;
  createdTo: string | null;
  owner: string | null;
  needsOwner: boolean;
  needsNextAction: boolean;
};

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
const SLA_SORT_SQL = `CASE ${SLA_STATE_SQL}
  WHEN 'overdue' THEN 1
  WHEN 'due_soon' THEN 2
  WHEN 'on_track' THEN 3
  WHEN 'touched' THEN 4
  ELSE 5
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

function aliasedColumn(tableAlias: string, name: string): string {
  return tableAlias ? `${tableAlias}.${name}` : name;
}

function activeStatusSql(tableAlias = ""): string {
  const column = (name: string) => aliasedColumn(tableAlias, name);
  return `COALESCE(${column("status")}, 'new') IN ('new', 'reviewed', 'contacted', 'qualified', 'proposal')`;
}

function followUpAgeHoursSql(tableAlias = ""): string {
  const column = (name: string) => aliasedColumn(tableAlias, name);
  return `ROUND((julianday('now') - julianday(${column("lead_status_updated_at")})) * 24, 1)`;
}

function followUpStateSql(tableAlias = ""): string {
  const column = (name: string) => aliasedColumn(tableAlias, name);
  const activeSql = activeStatusSql(tableAlias);
  const followUpAgeSql = followUpAgeHoursSql(tableAlias);

  return `CASE
    WHEN ${activeSql} = 0 THEN 'closed'
    WHEN ${column("lead_status_updated_at")} IS NULL THEN 'not_started'
    WHEN ${followUpAgeSql} >= 48 THEN 'stale'
    WHEN ${followUpAgeSql} >= 24 THEN 'due_soon'
    ELSE 'on_track'
  END`;
}

function slaStateSql(tableAlias = ""): string {
  const column = (name: string) => aliasedColumn(tableAlias, name);
  const activeSql = activeStatusSql(tableAlias);
  const responseAgeHoursSql = `ROUND((julianday('now') - julianday(${column("created_at")})) * 24, 1)`;

  return `CASE
    WHEN ${activeSql} = 0 THEN 'closed'
    WHEN ${column("lead_status_updated_at")} IS NOT NULL THEN 'touched'
    WHEN ${column("lead_priority")} = 'high' AND ${responseAgeHoursSql} >= 4 THEN 'overdue'
    WHEN ${column("lead_priority")} = 'medium' AND ${responseAgeHoursSql} >= 12 THEN 'overdue'
    WHEN ${column("lead_priority")} = 'low' AND ${responseAgeHoursSql} >= 24 THEN 'overdue'
    WHEN ${column("lead_priority")} = 'high' AND ${responseAgeHoursSql} >= 2 THEN 'due_soon'
    WHEN ${column("lead_priority")} = 'medium' AND ${responseAgeHoursSql} >= 8 THEN 'due_soon'
    WHEN ${column("lead_priority")} = 'low' AND ${responseAgeHoursSql} >= 18 THEN 'due_soon'
    ELSE 'on_track'
  END`;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
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

function parseLimit(request: Request): number {
  const url = new URL(request.url);
  const value = Number(url.searchParams.get("limit") || "20");
  if (!Number.isFinite(value)) return 20;
  return Math.max(1, Math.min(Math.floor(value), 50));
}

function includeTestLeads(request: Request): boolean {
  const url = new URL(request.url);
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

function reportFilters(request: Request): LeadReportFilters {
  const url = new URL(request.url);

  return {
    status: safeFilter(url.searchParams.get("status"), [
      "new",
      "reviewed",
      "contacted",
      "qualified",
      "proposal",
      "won",
      "lost",
      "spam",
      "archived"
    ]),
    channel: safeFilter(url.searchParams.get("channel"), ["direct", "referral", "campaign", "paid", "partner"]),
    locale: safeFilter(url.searchParams.get("locale"), ["en", "ru", "ro"]),
    priority: safeFilter(url.searchParams.get("priority"), ["low", "medium", "high"]),
    bucket: url.searchParams.get("bucket")?.trim().slice(0, 80) || null,
    offer: url.searchParams.get("offer")?.trim().slice(0, 120) || null,
    formVariant: url.searchParams.get("form_variant")?.trim().slice(0, 120) || null,
    utmSource: url.searchParams.get("utm_source")?.trim().slice(0, 120) || null,
    utmMedium: url.searchParams.get("utm_medium")?.trim().slice(0, 120) || null,
    utmCampaign: url.searchParams.get("utm_campaign")?.trim().slice(0, 120) || null,
    partnerRef: url.searchParams.get("partner_ref")?.trim().slice(0, 120) || null,
    responseSla: safeFilter(url.searchParams.get("response_sla"), ["overdue", "due_soon", "on_track", "touched", "closed"]),
    followUpSla: safeFilter(url.searchParams.get("follow_up_sla"), ["stale", "due_soon", "on_track", "not_started", "closed"]),
    createdFrom: safeDateBoundary(url.searchParams.get("created_from"), "start"),
    createdTo: safeDateBoundary(url.searchParams.get("created_to"), "end"),
    owner: url.searchParams.get("owner")?.trim().slice(0, 120) || null,
    needsOwner: booleanParam(url, "needs_owner"),
    needsNextAction: booleanParam(url, "needs_next_action")
  };
}

function leadWhereSql(
  includeTest: boolean,
  filters: LeadReportFilters,
  extraConditions: string[] = [],
  tableAlias = ""
): { sql: string; bindings: unknown[] } {
  const conditions = [...extraConditions];
  const bindings: unknown[] = [];
  const column = (name: string) => (tableAlias ? `${tableAlias}.${name}` : name);
  const activeSql = activeStatusSql(tableAlias);

  if (!includeTest) {
    conditions.push(`NOT (
      ${column("email")} LIKE 'lead-smoke-%@example.com'
      OR ${column("landing_offer")} LIKE 'smoke-lead-%'
      OR ${column("utm_campaign")} LIKE 'lead-smoke-%'
    )`);
  }

  if (filters.status) {
    conditions.push(`${column("status")} = ?`);
    bindings.push(filters.status);
  }

  if (filters.channel) {
    conditions.push(`${column("lead_channel")} = ?`);
    bindings.push(filters.channel);
  }

  if (filters.locale) {
    conditions.push(`${column("locale")} = ?`);
    bindings.push(filters.locale);
  }

  if (filters.priority) {
    conditions.push(`${column("lead_priority")} = ?`);
    bindings.push(filters.priority);
  }

  if (filters.bucket) {
    conditions.push(`${column("routing_bucket")} = ?`);
    bindings.push(filters.bucket);
  }

  if (filters.offer) {
    conditions.push(`${column("landing_offer")} = ?`);
    bindings.push(filters.offer);
  }

  if (filters.formVariant) {
    conditions.push(`${column("form_variant")} = ?`);
    bindings.push(filters.formVariant);
  }

  if (filters.utmSource) {
    conditions.push(`${column("utm_source")} = ?`);
    bindings.push(filters.utmSource);
  }

  if (filters.utmMedium) {
    conditions.push(`${column("utm_medium")} = ?`);
    bindings.push(filters.utmMedium);
  }

  if (filters.utmCampaign) {
    conditions.push(`${column("utm_campaign")} = ?`);
    bindings.push(filters.utmCampaign);
  }

  if (filters.partnerRef) {
    conditions.push(`${column("partner_ref")} = ?`);
    bindings.push(filters.partnerRef);
  }

  if (filters.responseSla) {
    conditions.push(`${slaStateSql(tableAlias)} = ?`);
    bindings.push(filters.responseSla);
  }

  if (filters.followUpSla) {
    conditions.push(`${followUpStateSql(tableAlias)} = ?`);
    bindings.push(filters.followUpSla);
  }

  if (filters.createdFrom) {
    conditions.push(`${column("created_at")} >= ?`);
    bindings.push(filters.createdFrom);
  }

  if (filters.createdTo) {
    conditions.push(`${column("created_at")} <= ?`);
    bindings.push(filters.createdTo);
  }

  if (filters.owner) {
    conditions.push(`LOWER(COALESCE(NULLIF(${column("lead_owner")}, ''), '')) = LOWER(?)`);
    bindings.push(filters.owner);
  }

  if (filters.needsOwner) {
    conditions.push(`${activeSql} AND COALESCE(NULLIF(${column("lead_owner")}, ''), '') = ''`);
  }

  if (filters.needsNextAction) {
    conditions.push(`${activeSql} AND COALESCE(NULLIF(${column("next_action")}, ''), '') = ''`);
  }

  return {
    sql: conditions.length ? `WHERE ${conditions.join("\n      AND ")}` : "",
    bindings
  };
}

async function allRows(env: Env, sql: string, ...bindings: unknown[]): Promise<LeadReportRow[]> {
  const statement = env.DB.prepare(sql);
  const result = bindings.length ? await statement.bind(...bindings).all<LeadReportRow>() : await statement.all<LeadReportRow>();
  return result.results || [];
}

function performanceRows(
  env: Env,
  filter: { sql: string; bindings: unknown[] },
  columnName: string,
  aliasName: string
): Promise<LeadReportRow[]> {
  return allRows(
    env,
    `SELECT
      source_value AS ${aliasName},
      COUNT(*) AS total,
      SUM(CASE WHEN COALESCE(status, 'new') IN ('new', 'reviewed', 'contacted', 'qualified', 'proposal') THEN 1 ELSE 0 END) AS active_count,
      SUM(CASE WHEN COALESCE(status, 'new') = 'contacted' THEN 1 ELSE 0 END) AS contacted_count,
      SUM(CASE WHEN COALESCE(status, 'new') IN ('qualified', 'proposal', 'won') THEN 1 ELSE 0 END) AS qualified_or_better_count,
      SUM(CASE WHEN COALESCE(status, 'new') = 'proposal' THEN 1 ELSE 0 END) AS proposal_count,
      SUM(CASE WHEN COALESCE(status, 'new') = 'won' THEN 1 ELSE 0 END) AS won_count,
      SUM(CASE WHEN COALESCE(status, 'new') = 'lost' THEN 1 ELSE 0 END) AS lost_count,
      AVG(lead_score) AS average_score,
      MAX(created_at) AS latest_created_at
    FROM (
      SELECT
        COALESCE(NULLIF(${columnName}, ''), 'unknown') AS source_value,
        status,
        lead_score,
        created_at
      FROM project_requests
      ${filter.sql}
    )
    GROUP BY source_value
    ORDER BY
      latest_created_at DESC,
      qualified_or_better_count DESC,
      won_count DESC,
      active_count DESC,
      total DESC
    LIMIT 50`,
    ...filter.bindings
  );
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return jsonResponse({ error: "Lead storage is not configured." }, 500);
  }

  if (!env.LEAD_REPORT_TOKEN) {
    return jsonResponse({ error: "Lead report access is not configured." }, 503);
  }

  if (bearerToken(request) !== env.LEAD_REPORT_TOKEN) {
    return jsonResponse({ error: "Unauthorized." }, 401);
  }

  const limit = parseLimit(request);
  const includeTest = includeTestLeads(request);
  const filters = reportFilters(request);
  const filter = leadWhereSql(includeTest, filters);
  const activeQueueFilter = leadWhereSql(includeTest, filters, [
    ACTIVE_STATUS_SQL
  ]);
  const statusEventFilter = leadWhereSql(includeTest, filters, [], "p");
  const notificationEventFilter = leadWhereSql(includeTest, filters, [], "p");

  const partnerFilter = leadWhereSql(includeTest, filters, [
    "(lead_channel = 'partner' OR COALESCE(NULLIF(partner_ref, ''), '') <> '')"
  ]);

  const [
    totals,
    byChannel,
    byLocale,
    byStatus,
    byPriority,
    byBucket,
    byOffer,
    byFormVariant,
    byUtmSource,
    byUtmMedium,
    byUtmCampaign,
    bySla,
    byFollowUpSla,
    byPartner,
    partnerPerformanceTotals,
    partnerPerformanceSources,
    sourcePerformanceChannels,
    sourcePerformanceOffers,
    sourcePerformanceFormVariants,
    sourcePerformanceUtmSources,
    sourcePerformanceUtmCampaigns,
    actionQueue,
    recent,
    statusEvents,
    notificationEvents
  ] = await Promise.all([
    allRows(
      env,
      `SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count,
        SUM(CASE WHEN ${ACTIVE_STATUS_SQL} THEN 1 ELSE 0 END) AS active_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'contacted' THEN 1 ELSE 0 END) AS contacted_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'qualified' THEN 1 ELSE 0 END) AS qualified_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'proposal' THEN 1 ELSE 0 END) AS proposal_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'won' THEN 1 ELSE 0 END) AS won_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'lost' THEN 1 ELSE 0 END) AS lost_count,
        SUM(CASE WHEN COALESCE(status, 'new') IN ('qualified', 'proposal', 'won') THEN 1 ELSE 0 END) AS qualified_or_better_count,
        SUM(CASE WHEN COALESCE(status, 'new') IN ('won', 'lost', 'spam', 'archived') THEN 1 ELSE 0 END) AS closed_count,
        SUM(CASE WHEN ${SLA_STATE_SQL} = 'overdue' THEN 1 ELSE 0 END) AS overdue_count,
        SUM(CASE WHEN ${SLA_STATE_SQL} = 'due_soon' THEN 1 ELSE 0 END) AS due_soon_count,
        SUM(CASE WHEN ${followUpStateSql()} = 'stale' THEN 1 ELSE 0 END) AS follow_up_stale_count,
        SUM(CASE WHEN ${followUpStateSql()} = 'due_soon' THEN 1 ELSE 0 END) AS follow_up_due_soon_count,
        SUM(CASE WHEN ${ACTIVE_STATUS_SQL} AND COALESCE(NULLIF(lead_owner, ''), '') = '' THEN 1 ELSE 0 END) AS needs_owner_count,
        SUM(CASE WHEN ${ACTIVE_STATUS_SQL} AND COALESCE(NULLIF(next_action, ''), '') = '' THEN 1 ELSE 0 END) AS needs_next_action_count,
        AVG(lead_score) AS average_score
      FROM project_requests
      ${filter.sql}`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT COALESCE(lead_channel, 'unknown') AS lead_channel, COUNT(*) AS total
      FROM project_requests
      ${filter.sql}
      GROUP BY COALESCE(lead_channel, 'unknown')
      ORDER BY total DESC`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT COALESCE(NULLIF(locale, ''), 'unknown') AS locale, COUNT(*) AS total
      FROM project_requests
      ${filter.sql}
      GROUP BY COALESCE(NULLIF(locale, ''), 'unknown')
      ORDER BY total DESC`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT COALESCE(status, 'unknown') AS status, COUNT(*) AS total
      FROM project_requests
      ${filter.sql}
      GROUP BY COALESCE(status, 'unknown')
      ORDER BY total DESC`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT COALESCE(lead_priority, 'unscored') AS lead_priority, COUNT(*) AS total
      FROM project_requests
      ${filter.sql}
      GROUP BY COALESCE(lead_priority, 'unscored')
      ORDER BY total DESC`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT COALESCE(routing_bucket, 'unrouted') AS routing_bucket, COUNT(*) AS total
      FROM project_requests
      ${filter.sql}
      GROUP BY COALESCE(routing_bucket, 'unrouted')
      ORDER BY total DESC`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT COALESCE(NULLIF(landing_offer, ''), 'unknown') AS landing_offer, COUNT(*) AS total
      FROM project_requests
      ${filter.sql}
      GROUP BY COALESCE(NULLIF(landing_offer, ''), 'unknown')
      ORDER BY total DESC
      LIMIT 20`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT COALESCE(NULLIF(form_variant, ''), 'unknown') AS form_variant, COUNT(*) AS total
      FROM project_requests
      ${filter.sql}
      GROUP BY COALESCE(NULLIF(form_variant, ''), 'unknown')
      ORDER BY total DESC
      LIMIT 20`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT COALESCE(NULLIF(utm_source, ''), 'unknown') AS utm_source, COUNT(*) AS total
      FROM project_requests
      ${filter.sql}
      GROUP BY COALESCE(NULLIF(utm_source, ''), 'unknown')
      ORDER BY total DESC
      LIMIT 20`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT COALESCE(NULLIF(utm_medium, ''), 'unknown') AS utm_medium, COUNT(*) AS total
      FROM project_requests
      ${filter.sql}
      GROUP BY COALESCE(NULLIF(utm_medium, ''), 'unknown')
      ORDER BY total DESC
      LIMIT 20`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT COALESCE(NULLIF(utm_campaign, ''), 'unknown') AS utm_campaign, COUNT(*) AS total
      FROM project_requests
      ${filter.sql}
      GROUP BY COALESCE(NULLIF(utm_campaign, ''), 'unknown')
      ORDER BY total DESC
      LIMIT 20`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT response_sla, COUNT(*) AS total
      FROM (
        SELECT ${SLA_STATE_SQL} AS response_sla
        FROM project_requests
        ${filter.sql}
      )
      GROUP BY response_sla
      ORDER BY
        CASE response_sla
          WHEN 'overdue' THEN 1
          WHEN 'due_soon' THEN 2
          WHEN 'on_track' THEN 3
          WHEN 'touched' THEN 4
          ELSE 5
        END`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT follow_up_sla, COUNT(*) AS total
      FROM (
        SELECT ${followUpStateSql()} AS follow_up_sla
        FROM project_requests
        ${filter.sql}
      )
      GROUP BY follow_up_sla
      ORDER BY
        CASE follow_up_sla
          WHEN 'stale' THEN 1
          WHEN 'due_soon' THEN 2
          WHEN 'on_track' THEN 3
          WHEN 'not_started' THEN 4
          ELSE 5
        END`,
      ...filter.bindings
    ),
    allRows(
      env,
      `SELECT
        normalized_partner_ref AS partner_ref,
        COUNT(*) AS total,
        SUM(CASE WHEN COALESCE(status, 'new') IN ('new', 'reviewed', 'contacted', 'qualified', 'proposal') THEN 1 ELSE 0 END) AS active_count,
        AVG(lead_score) AS average_score,
        MAX(created_at) AS latest_created_at
      FROM (
        SELECT
          COALESCE(NULLIF(partner_ref, ''), 'unknown') AS normalized_partner_ref,
          status,
          lead_score,
          created_at
        FROM project_requests
        ${partnerFilter.sql}
      )
      GROUP BY normalized_partner_ref
      ORDER BY latest_created_at DESC, total DESC
      LIMIT 20`,
      ...partnerFilter.bindings
    ),
    allRows(
      env,
      `SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN COALESCE(status, 'new') IN ('new', 'reviewed', 'contacted', 'qualified', 'proposal') THEN 1 ELSE 0 END) AS active_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'contacted' THEN 1 ELSE 0 END) AS contacted_count,
        SUM(CASE WHEN COALESCE(status, 'new') IN ('qualified', 'proposal', 'won') THEN 1 ELSE 0 END) AS qualified_or_better_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'proposal' THEN 1 ELSE 0 END) AS proposal_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'won' THEN 1 ELSE 0 END) AS won_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'lost' THEN 1 ELSE 0 END) AS lost_count,
        SUM(CASE WHEN COALESCE(status, 'new') IN ('won', 'lost', 'spam', 'archived') THEN 1 ELSE 0 END) AS closed_count,
        SUM(CASE WHEN COALESCE(NULLIF(partner_ref, ''), '') = '' THEN 1 ELSE 0 END) AS unknown_ref_count,
        AVG(lead_score) AS average_score
      FROM project_requests
      ${partnerFilter.sql}`,
      ...partnerFilter.bindings
    ),
    allRows(
      env,
      `SELECT
        normalized_partner_ref AS partner_ref,
        COUNT(*) AS total,
        SUM(CASE WHEN COALESCE(status, 'new') IN ('new', 'reviewed', 'contacted', 'qualified', 'proposal') THEN 1 ELSE 0 END) AS active_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'contacted' THEN 1 ELSE 0 END) AS contacted_count,
        SUM(CASE WHEN COALESCE(status, 'new') IN ('qualified', 'proposal', 'won') THEN 1 ELSE 0 END) AS qualified_or_better_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'proposal' THEN 1 ELSE 0 END) AS proposal_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'won' THEN 1 ELSE 0 END) AS won_count,
        SUM(CASE WHEN COALESCE(status, 'new') = 'lost' THEN 1 ELSE 0 END) AS lost_count,
        AVG(lead_score) AS average_score,
        MAX(created_at) AS latest_created_at
      FROM (
        SELECT
          COALESCE(NULLIF(partner_ref, ''), 'unknown') AS normalized_partner_ref,
          status,
          lead_score,
          created_at
        FROM project_requests
        ${partnerFilter.sql}
      )
      GROUP BY normalized_partner_ref
      ORDER BY
        won_count DESC,
        qualified_or_better_count DESC,
        active_count DESC,
        latest_created_at DESC,
        total DESC
      LIMIT 20`,
      ...partnerFilter.bindings
    ),
    performanceRows(env, filter, "lead_channel", "lead_channel"),
    performanceRows(env, filter, "landing_offer", "landing_offer"),
    performanceRows(env, filter, "form_variant", "form_variant"),
    performanceRows(env, filter, "utm_source", "utm_source"),
    performanceRows(env, filter, "utm_campaign", "utm_campaign"),
    allRows(
      env,
      `SELECT
        id,
        created_at,
        status,
        name,
        email,
        company,
        locale,
        lead_channel,
        partner_ref,
        landing_page,
        landing_offer,
        form_variant,
        project_type,
        current_system,
        business_problem,
        desired_result,
        desired_output,
        integrations,
        budget,
        timeline,
        contact_details,
        lead_score,
        lead_priority,
        routing_bucket,
        next_action,
        ${RESPONSE_AGE_HOURS_SQL} AS response_age_hours,
        ${responseDueHoursSql()} AS response_due_hours,
        ${responseDueAtSql()} AS response_due_at,
        ${responseRemainingHoursSql()} AS response_remaining_hours,
        ${SLA_STATE_SQL} AS response_sla,
        ${followUpAgeHoursSql()} AS follow_up_age_hours,
        ${followUpStateSql()} AS follow_up_sla,
        lead_owner,
        CASE WHEN COALESCE(NULLIF(lead_owner, ''), '') = '' THEN 1 ELSE 0 END AS needs_owner,
        CASE WHEN COALESCE(NULLIF(next_action, ''), '') = '' THEN 1 ELSE 0 END AS needs_next_action,
        lead_follow_up_note,
        lead_status_updated_at
      FROM project_requests
      ${activeQueueFilter.sql}
      ORDER BY
        ${SLA_SORT_SQL},
        CASE lead_priority
          WHEN 'high' THEN 1
          WHEN 'medium' THEN 2
          WHEN 'low' THEN 3
          ELSE 4
        END,
        lead_score DESC,
        COALESCE(lead_status_updated_at, created_at) ASC
      LIMIT ?`,
      ...activeQueueFilter.bindings,
      limit
    ),
    allRows(
      env,
      `SELECT
        id,
        created_at,
        status,
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
        project_type,
        current_system,
        business_problem,
        desired_result,
        desired_output,
        integrations,
        budget,
        timeline,
        contact_details,
        lead_score,
        lead_priority,
        routing_bucket,
        next_action,
        ${RESPONSE_AGE_HOURS_SQL} AS response_age_hours,
        ${responseDueHoursSql()} AS response_due_hours,
        ${responseDueAtSql()} AS response_due_at,
        ${responseRemainingHoursSql()} AS response_remaining_hours,
        ${SLA_STATE_SQL} AS response_sla,
        ${followUpAgeHoursSql()} AS follow_up_age_hours,
        ${followUpStateSql()} AS follow_up_sla,
        lead_owner,
        CASE WHEN COALESCE(NULLIF(lead_owner, ''), '') = '' THEN 1 ELSE 0 END AS needs_owner,
        CASE WHEN COALESCE(NULLIF(next_action, ''), '') = '' THEN 1 ELSE 0 END AS needs_next_action,
        lead_follow_up_note,
        lead_status_updated_at
      FROM project_requests
      ${filter.sql}
      ORDER BY created_at DESC
      LIMIT ?`,
      ...filter.bindings,
      limit
    ),
    allRows(
      env,
      `SELECT
        e.id,
        e.lead_id,
        e.previous_status,
        e.status,
        e.owner,
        e.next_action,
        e.note,
        e.created_at,
        p.name,
        p.email,
        p.company,
        p.lead_channel,
        p.partner_ref,
        p.landing_offer,
        p.form_variant,
        p.lead_priority,
        p.routing_bucket
      FROM project_request_status_events e
      JOIN project_requests p ON p.id = e.lead_id
      ${statusEventFilter.sql}
      ORDER BY e.created_at DESC
      LIMIT ?`,
      ...statusEventFilter.bindings,
      limit
    ),
    allRows(
      env,
      `SELECT
        n.id,
        n.lead_id,
        n.event_type,
        n.channel,
        n.status,
        n.status_code,
        n.error_message,
        n.created_at,
        p.name,
        p.email,
        p.company,
        p.lead_channel,
        p.partner_ref,
        p.landing_offer,
        p.form_variant,
        p.lead_priority,
        p.routing_bucket
      FROM project_request_notification_events n
      JOIN project_requests p ON p.id = n.lead_id
      ${notificationEventFilter.sql}
      ORDER BY n.created_at DESC
      LIMIT ?`,
      ...notificationEventFilter.bindings,
      limit
    )
  ]);

  return jsonResponse({
    generated_at: new Date().toISOString(),
    limit,
    include_test_leads: includeTest,
    filters: {
      status: filters.status,
      channel: filters.channel,
      locale: filters.locale,
      priority: filters.priority,
      bucket: filters.bucket,
      offer: filters.offer,
      form_variant: filters.formVariant,
      utm_source: filters.utmSource,
      utm_medium: filters.utmMedium,
      utm_campaign: filters.utmCampaign,
      partner_ref: filters.partnerRef,
      response_sla: filters.responseSla,
      follow_up_sla: filters.followUpSla,
      created_from: filters.createdFrom,
      created_to: filters.createdTo,
      owner: filters.owner,
      needs_owner: filters.needsOwner,
      needs_next_action: filters.needsNextAction
    },
    totals: totals[0] || {
      total: 0,
      new_count: 0,
      active_count: 0,
      contacted_count: 0,
      qualified_count: 0,
      proposal_count: 0,
      won_count: 0,
      lost_count: 0,
      qualified_or_better_count: 0,
      closed_count: 0,
      overdue_count: 0,
      due_soon_count: 0,
      follow_up_stale_count: 0,
      follow_up_due_soon_count: 0,
      needs_owner_count: 0,
      needs_next_action_count: 0,
      average_score: null
    },
    breakdowns: {
      by_status: byStatus,
      by_channel: byChannel,
      by_locale: byLocale,
      by_priority: byPriority,
      by_bucket: byBucket,
      by_offer: byOffer,
      by_form_variant: byFormVariant,
      by_utm_source: byUtmSource,
      by_utm_medium: byUtmMedium,
      by_utm_campaign: byUtmCampaign,
      by_partner: byPartner,
      by_sla: bySla,
      by_follow_up_sla: byFollowUpSla
    },
    action_queue: actionQueue,
    partner_performance: {
      totals: partnerPerformanceTotals[0] || {
        total: 0,
        active_count: 0,
        contacted_count: 0,
        qualified_or_better_count: 0,
        proposal_count: 0,
        won_count: 0,
        lost_count: 0,
        closed_count: 0,
        unknown_ref_count: 0,
        average_score: null
      },
      sources: partnerPerformanceSources
    },
    source_performance: {
      channels: sourcePerformanceChannels,
      offers: sourcePerformanceOffers,
      form_variants: sourcePerformanceFormVariants,
      utm_sources: sourcePerformanceUtmSources,
      utm_campaigns: sourcePerformanceUtmCampaigns
    },
    recent_leads: recent,
    status_events: statusEvents,
    notification_events: notificationEvents
  });
};

export const onRequestPost: PagesFunction = async () => {
  return jsonResponse({ error: "Method not allowed." }, 405);
};
