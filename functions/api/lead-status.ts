type Env = {
  DB: D1Database;
  LEAD_REPORT_TOKEN?: string;
  LEAD_WEBHOOK_URL?: string;
  LEAD_WEBHOOK_TOKEN?: string;
  LEAD_TELEGRAM_BOT_TOKEN?: string;
  LEAD_TELEGRAM_CHAT_ID?: string;
  LEAD_TELEGRAM_MESSAGE_THREAD_ID?: string;
};

type LeadStatus = "new" | "reviewed" | "contacted" | "qualified" | "proposal" | "won" | "lost" | "spam" | "archived";

type LeadStatusPayload = {
  id?: unknown;
  status?: unknown;
  owner?: unknown;
  note?: unknown;
  next_action?: unknown;
};

type LeadStatusRow = {
  id: string;
  created_at: string;
  status: string;
  name: string | null;
  email: string | null;
  company: string | null;
  source_path: string | null;
  landing_page: string | null;
  landing_offer: string | null;
  form_variant: string | null;
  locale: string | null;
  lead_channel: string | null;
  partner_ref: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  lead_score: number | null;
  lead_owner: string | null;
  lead_follow_up_note: string | null;
  lead_status_updated_at: string | null;
  next_action: string | null;
  lead_priority: string | null;
  routing_bucket: string | null;
};

type LeadStatusEventRow = {
  id: string;
  lead_id: string;
  previous_status: string | null;
  status: string;
  owner: string | null;
  next_action: string | null;
  note: string | null;
  created_at: string;
};

type NotificationChannel = "webhook" | "telegram";
type NotificationDelivery = {
  channel: NotificationChannel;
  status: "skipped" | "delivered" | "failed";
  status_code: number | null;
  error_message: string | null;
};

const ALLOWED_STATUSES: LeadStatus[] = ["new", "reviewed", "contacted", "qualified", "proposal", "won", "lost", "spam", "archived"];
const MAX_NOTE_LENGTH = 2000;
const MAX_FIELD_LENGTH = 160;
const MAX_NOTIFICATION_ERROR_LENGTH = 500;
const TELEGRAM_MESSAGE_LIMIT = 3900;

type TelegramResult = {
  ok?: boolean;
  description?: string;
};

const LEAD_STATUS_SELECT = `SELECT
      id,
      created_at,
      status,
      name,
      email,
      company,
      source_path,
      landing_page,
      landing_offer,
      form_variant,
      locale,
      lead_channel,
      partner_ref,
      utm_source,
      utm_medium,
      utm_campaign,
      lead_score,
      lead_owner,
      lead_follow_up_note,
      lead_status_updated_at,
      next_action,
      lead_priority,
      routing_bucket
    FROM project_requests
    WHERE id = ?
    LIMIT 1`;

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

function clean(value: unknown, maxLength = MAX_FIELD_LENGTH): string {
  return String(value ?? "").trim().slice(0, maxLength);
}

function nullableClean(value: unknown, maxLength = MAX_FIELD_LENGTH): string | null {
  const result = clean(value, maxLength);
  return result || null;
}

function hasOwn(payload: LeadStatusPayload, key: keyof LeadStatusPayload): boolean {
  return Object.prototype.hasOwnProperty.call(payload, key);
}

function compact(value: unknown, maxLength = 180): string {
  const normalized = String(value ?? "").replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, Math.max(0, maxLength - 3)).trimEnd()}...`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeUrl(path: string, requestUrl: string): string {
  try {
    return new URL(path || "/", requestUrl).toString();
  } catch {
    return "";
  }
}

function telegramLine(label: string, value: unknown, maxLength = 180): string {
  const text = compact(value, maxLength);
  if (!text) return "";
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(text)}`;
}

async function notifyLeadStatus(
  env: Env,
  lead: LeadStatusRow,
  event: LeadStatusEventRow,
  requestUrl: string
): Promise<void> {
  const deliveries = await Promise.all([
    notifyStatusWebhook(env, lead, event, requestUrl),
    notifyStatusTelegram(env, lead, event, requestUrl)
  ]);
  await recordNotificationEvents(env, lead.id, "project_request.status_updated", deliveries);
}

async function notifyStatusWebhook(
  env: Env,
  lead: LeadStatusRow,
  event: LeadStatusEventRow,
  requestUrl: string
): Promise<NotificationDelivery> {
  if (!env.LEAD_WEBHOOK_URL) return notificationSkipped("webhook");

  const headers: Record<string, string> = {
    "content-type": "application/json"
  };

  if (env.LEAD_WEBHOOK_TOKEN) {
    headers.authorization = `Bearer ${env.LEAD_WEBHOOK_TOKEN}`;
  }

  try {
    const response = await fetch(env.LEAD_WEBHOOK_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        event: "project_request.status_updated",
        id: lead.id,
        created_at: event.created_at,
        status_event: event,
        lead_desk_url: safeUrl("/lead-desk/", requestUrl),
        lead: {
          id: lead.id,
          created_at: lead.created_at,
          status: lead.status,
          name: lead.name,
          email: lead.email,
          company: lead.company,
          source_path: lead.source_path,
          landing_page: lead.landing_page,
          landing_offer: lead.landing_offer,
          form_variant: lead.form_variant,
          locale: lead.locale,
          lead_channel: lead.lead_channel,
          partner_ref: lead.partner_ref,
          utm_source: lead.utm_source,
          utm_medium: lead.utm_medium,
          utm_campaign: lead.utm_campaign,
          lead_score: lead.lead_score,
          lead_priority: lead.lead_priority,
          routing_bucket: lead.routing_bucket,
          next_action: lead.next_action,
          lead_owner: lead.lead_owner,
          lead_follow_up_note: lead.lead_follow_up_note,
          lead_status_updated_at: lead.lead_status_updated_at
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lead status notification webhook failed", response.status, errorText);
      return notificationFailed("webhook", response.status, errorText);
    }

    return notificationDelivered("webhook", response.status);
  } catch (error) {
    console.error("Lead status notification webhook failed", error);
    return notificationFailed("webhook", null, error);
  }
}

function statusTelegramMessage(lead: LeadStatusRow, event: LeadStatusEventRow, requestUrl: string): string {
  const leadDeskUrl = safeUrl("/lead-desk/", requestUrl);
  const sourceUrl = safeUrl(lead.source_path || lead.landing_page || "/", requestUrl);
  const priority = [lead.lead_priority, lead.lead_score == null ? "" : lead.lead_score].filter(Boolean).join(" / ");
  const route = [lead.routing_bucket, lead.next_action].filter(Boolean).join(" -> ");
  const channel = [lead.lead_channel, lead.form_variant, lead.landing_offer, lead.partner_ref].filter(Boolean).join(" / ");
  const utm = [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(" / ");
  const lines = [
    "<b>AlfaRank lead status updated</b>",
    telegramLine("Status", [event.previous_status, event.status].filter(Boolean).join(" -> ")),
    telegramLine("Lead", [lead.name, lead.company].filter(Boolean).join(" / ")),
    telegramLine("Email", lead.email),
    telegramLine("Owner", event.owner || lead.lead_owner),
    telegramLine("Next action", event.next_action || lead.next_action),
    telegramLine("Note", event.note, 360),
    telegramLine("Priority", priority),
    telegramLine("Route", route),
    telegramLine("Channel", channel, 220),
    telegramLine("Source", sourceUrl, 260),
    telegramLine("UTM", utm, 220),
    telegramLine("Updated", event.created_at),
    telegramLine("Lead ID", lead.id, 80),
    leadDeskUrl ? `<a href="${escapeHtml(leadDeskUrl)}">Open Lead Desk</a>` : ""
  ].filter(Boolean);

  const message = lines.join("\n");
  return message.length <= TELEGRAM_MESSAGE_LIMIT
    ? message
    : `${message.slice(0, TELEGRAM_MESSAGE_LIMIT - 3).trimEnd()}...`;
}

async function notifyStatusTelegram(
  env: Env,
  lead: LeadStatusRow,
  event: LeadStatusEventRow,
  requestUrl: string
): Promise<NotificationDelivery> {
  if (!env.LEAD_TELEGRAM_BOT_TOKEN || !env.LEAD_TELEGRAM_CHAT_ID) return notificationSkipped("telegram");

  const body: Record<string, string | number | boolean> = {
    chat_id: env.LEAD_TELEGRAM_CHAT_ID,
    text: statusTelegramMessage(lead, event, requestUrl),
    parse_mode: "HTML",
    disable_web_page_preview: true
  };

  const threadId = Number(env.LEAD_TELEGRAM_MESSAGE_THREAD_ID || "");
  if (Number.isInteger(threadId) && threadId > 0) {
    body.message_thread_id = threadId;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${env.LEAD_TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const result = (await response.json().catch(() => ({}))) as TelegramResult;
    if (!response.ok || !result.ok) {
      console.error("Lead status Telegram notification failed", response.status, result.description || "");
      return notificationFailed("telegram", response.status, result.description || "Telegram API returned an error.");
    }

    return notificationDelivered("telegram", response.status);
  } catch (error) {
    console.error("Lead status Telegram notification failed", error);
    return notificationFailed("telegram", null, error);
  }
}

function notificationSkipped(channel: NotificationChannel): NotificationDelivery {
  return {
    channel,
    status: "skipped",
    status_code: null,
    error_message: null
  };
}

function notificationDelivered(channel: NotificationChannel, statusCode: number): NotificationDelivery {
  return {
    channel,
    status: "delivered",
    status_code: statusCode,
    error_message: null
  };
}

function notificationFailed(channel: NotificationChannel, statusCode: number | null, error: unknown): NotificationDelivery {
  return {
    channel,
    status: "failed",
    status_code: statusCode,
    error_message: compact(error instanceof Error ? error.message : String(error ?? "Notification delivery failed."), MAX_NOTIFICATION_ERROR_LENGTH)
  };
}

async function recordNotificationEvents(
  env: Env,
  leadId: string,
  eventType: string,
  deliveries: NotificationDelivery[]
): Promise<void> {
  const attemptedDeliveries = deliveries.filter((delivery) => delivery.status !== "skipped");
  if (!attemptedDeliveries.length) return;

  try {
    await env.DB.batch(
      attemptedDeliveries.map((delivery) =>
        env.DB.prepare(
          `INSERT INTO project_request_notification_events (
            id,
            lead_id,
            event_type,
            channel,
            status,
            status_code,
            error_message,
            created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          crypto.randomUUID(),
          leadId,
          eventType,
          delivery.channel,
          delivery.status,
          delivery.status_code,
          delivery.error_message,
          new Date().toISOString()
        )
      )
    );
  } catch (error) {
    console.error("Failed to record lead status notification delivery events", error);
  }
}

async function parsePayload(request: Request): Promise<LeadStatusPayload> {
  try {
    return (await request.json()) as LeadStatusPayload;
  } catch {
    return {};
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return jsonResponse({ error: "Lead storage is not configured." }, 500);
  }

  if (!env.LEAD_REPORT_TOKEN) {
    return jsonResponse({ error: "Lead status access is not configured." }, 503);
  }

  if (bearerToken(request) !== env.LEAD_REPORT_TOKEN) {
    return jsonResponse({ error: "Unauthorized." }, 401);
  }

  const payload = await parsePayload(request);
  const id = clean(payload.id);
  const status = clean(payload.status).toLowerCase() as LeadStatus;

  if (!id) {
    return jsonResponse({ error: "Lead id is required." }, 400);
  }

  if (!ALLOWED_STATUSES.includes(status)) {
    return jsonResponse({ error: "Unsupported lead status.", allowed_statuses: ALLOWED_STATUSES }, 400);
  }

  const updatedAt = new Date().toISOString();
  const owner = hasOwn(payload, "owner") ? nullableClean(payload.owner) : null;
  const note = hasOwn(payload, "note") ? nullableClean(payload.note, MAX_NOTE_LENGTH) : null;
  const nextAction = hasOwn(payload, "next_action") ? nullableClean(payload.next_action) : null;

  const existing = await env.DB.prepare(LEAD_STATUS_SELECT)
    .bind(id)
    .first<LeadStatusRow>();

  if (!existing) {
    return jsonResponse({ error: "Lead not found." }, 404);
  }

  const event: LeadStatusEventRow = {
    id: crypto.randomUUID(),
    lead_id: id,
    previous_status: existing.status || "new",
    status,
    owner: owner ?? existing.lead_owner,
    next_action: nextAction ?? existing.next_action,
    note: note ?? existing.lead_follow_up_note,
    created_at: updatedAt
  };

  await env.DB.batch([
    env.DB.prepare(
      `UPDATE project_requests
    SET
      status = ?,
      lead_owner = COALESCE(?, lead_owner),
      lead_follow_up_note = COALESCE(?, lead_follow_up_note),
      next_action = COALESCE(?, next_action),
      lead_status_updated_at = ?
    WHERE id = ?`
    ).bind(status, owner, note, nextAction, updatedAt, id),
    env.DB.prepare(
      `INSERT INTO project_request_status_events (
        id,
        lead_id,
        previous_status,
        status,
        owner,
        next_action,
        note,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      event.id,
      event.lead_id,
      event.previous_status,
      event.status,
      event.owner,
      event.next_action,
      event.note,
      event.created_at
    )
  ]);

  const result = await env.DB.prepare(LEAD_STATUS_SELECT)
    .bind(id)
    .first<LeadStatusRow>();

  if (!result) {
    return jsonResponse({ error: "Lead not found." }, 404);
  }

  await notifyLeadStatus(env, result, event, request.url);

  return jsonResponse({
    updated: true,
    lead: result,
    status_event: event
  });
};

export const onRequestGet: PagesFunction = async () => {
  return jsonResponse({ error: "Method not allowed." }, 405);
};
