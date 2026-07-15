type Env = {
  DB: D1Database;
  LEAD_WEBHOOK_URL?: string;
  LEAD_WEBHOOK_TOKEN?: string;
  LEAD_TELEGRAM_BOT_TOKEN?: string;
  LEAD_TELEGRAM_CHAT_ID?: string;
  LEAD_TELEGRAM_MESSAGE_THREAD_ID?: string;
  LEAD_SMOKE_TURNSTILE_TOKEN?: string;
  TURNSTILE_SECRET_KEY?: string;
};

type ProjectRequest = {
  name: string;
  email: string;
  company: string;
  project_type: string;
  current_system: string;
  business_problem: string;
  desired_result: string;
  desired_output: string;
  integrations: string;
  budget: string;
  timeline: string;
  contact_details: string;
  source_path: string;
  landing_page: string;
  landing_offer: string;
  form_variant: string;
  locale: string;
  referrer: string;
  lead_channel: string;
  partner_ref: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  user_agent: string;
  ip_address: string;
};

type LeadRouting = {
  lead_score: number;
  lead_priority: "low" | "medium" | "high";
  routing_bucket: string;
  next_action: string;
};

type TurnstileResult = {
  success?: boolean;
  "error-codes"?: string[];
};

type TelegramResult = {
  ok?: boolean;
  description?: string;
};

type NotificationChannel = "webhook" | "telegram";
type NotificationDelivery = {
  channel: NotificationChannel;
  status: "skipped" | "delivered" | "failed";
  status_code: number | null;
  error_message: string | null;
};

const MAX_FIELD_LENGTH = 6000;
const MAX_NOTIFICATION_ERROR_LENGTH = 500;
const TELEGRAM_MESSAGE_LIMIT = 3900;

function clean(value: FormDataEntryValue | null): string {
  return String(value ?? "").trim().slice(0, MAX_FIELD_LENGTH);
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function htmlResponse(message: string, status = 400): Response {
  return new Response(message, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8"
    }
  });
}

function compact(value: string, maxLength = 180): string {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
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

function telegramLine(label: string, value: string, maxLength = 180): string {
  const text = compact(value, maxLength);
  if (!text) return "";
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(text)}`;
}

async function verifyTurnstile(env: Env, token: string, remoteIp: string): Promise<{ ok: boolean; message?: string }> {
  if (!env.TURNSTILE_SECRET_KEY) {
    return { ok: true };
  }

  if (!token) {
    return {
      ok: false,
      message: "Spam protection token is required. Please reload the page and try again."
    };
  }

  const smokeToken = String(env.LEAD_SMOKE_TURNSTILE_TOKEN || "").trim();
  if (smokeToken.length >= 32 && token === smokeToken) {
    return { ok: true };
  }

  const body = new FormData();
  body.set("secret", env.TURNSTILE_SECRET_KEY);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body
    });

    if (!response.ok) {
      console.error("Turnstile verification request failed", response.status, await response.text());
      return { ok: false, message: "Spam protection could not be verified. Please try again." };
    }

    const result = (await response.json()) as TurnstileResult;
    if (!result.success) {
      console.error("Turnstile verification failed", result["error-codes"] || []);
      return { ok: false, message: "Spam protection check failed. Please try again." };
    }

    return { ok: true };
  } catch (error) {
    console.error("Turnstile verification failed", error);
    return { ok: false, message: "Spam protection could not be verified. Please try again." };
  }
}

function thankYouPath(payload: Pick<ProjectRequest, "source_path" | "landing_page">): string {
  const source = payload.source_path || payload.landing_page || "";
  const locale = source.match(/^\/(ru|ro)(?=\/|$)/)?.[1];
  return locale ? `/${locale}/start-project/thank-you/` : "/start-project/thank-you/";
}

function localeFromPath(path: string): string {
  return path.match(/^\/(ru|ro)(?=\/|$)/)?.[1] || "en";
}

function normalizeLeadChannel(value: string): string {
  return ["direct", "referral", "campaign", "paid", "partner"].includes(value) ? value : "";
}

function leadChannel(payload: Pick<ProjectRequest, "lead_channel" | "partner_ref" | "landing_offer" | "utm_source" | "utm_medium" | "referrer">): string {
  const channel = normalizeLeadChannel(payload.lead_channel);
  if (channel) return channel;
  if (payload.partner_ref || payload.landing_offer === "partner-program") return "partner";

  const medium = payload.utm_medium.toLowerCase();
  if (["cpc", "ppc", "paid", "paid-search", "paid-social", "display"].includes(medium)) return "paid";
  if (payload.utm_source) return "campaign";
  if (payload.referrer) return "referral";

  return "direct";
}

function normalizeFormVariant(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9:_-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 120);
}

function inferFormVariant(
  rawValue: string,
  payload: Pick<ProjectRequest, "source_path" | "landing_page" | "landing_offer" | "lead_channel">
): string {
  const explicit = normalizeFormVariant(rawValue);
  if (explicit) return explicit;

  if (payload.landing_offer === "quick-intake") return "quick-intake";
  if (payload.landing_offer === "partner-program" || payload.lead_channel === "partner") return "partner-program";
  if (payload.landing_offer) return `lp:${normalizeFormVariant(payload.landing_offer)}`;

  const source = `${payload.source_path} ${payload.landing_page}`.toLowerCase();
  if (source.includes("/lp/")) return "lp:unknown";

  return "start-project";
}

function containsAny(value: string, keywords: string[]): boolean {
  return keywords.some((keyword) => value.includes(keyword));
}

function leadRouting(payload: ProjectRequest): LeadRouting {
  const sourceText = [
    payload.project_type,
    payload.current_system,
    payload.business_problem,
    payload.desired_result,
    payload.desired_output,
    payload.integrations,
    payload.landing_offer
  ]
    .join(" ")
    .toLowerCase();

  let score = 20;

  if (payload.lead_channel === "partner") score += 22;
  if (payload.lead_channel === "paid") score += 18;
  if (payload.lead_channel === "campaign") score += 12;
  if (payload.lead_channel === "referral") score += 8;
  if (payload.landing_offer && payload.landing_offer !== "quick-intake") score += 10;
  if (payload.company) score += 8;
  if (payload.current_system) score += 8;
  if (payload.desired_output) score += 8;
  if (payload.integrations) score += 8;
  if (payload.contact_details) score += 6;
  if (payload.budget) score += 6;
  if (payload.timeline) score += 6;

  const lead_priority = score >= 70 ? "high" : score >= 45 ? "medium" : "low";

  let routing_bucket = "project-scope";

  if (payload.lead_channel === "partner") {
    routing_bucket = "partner";
  } else if (containsAny(sourceText, ["lead", "crm", "automation", "автомат", "лид", "ai", "ии"])) {
    routing_bucket = "automation";
  } else if (containsAny(sourceText, ["content", "seo", "media", "publication", "контент", "публикац", "медиа"])) {
    routing_bucket = "content-seo";
  } else if (containsAny(sourceText, ["data", "monitor", "scrap", "parser", "dashboard", "report", "данн", "монитор", "парс", "отчет"])) {
    routing_bucket = "data-monitoring";
  } else if (containsAny(sourceText, ["ecommerce", "e-commerce", "catalog", "feed", "commerce", "каталог", "товар", "фид"])) {
    routing_bucket = "ecommerce";
  } else if (containsAny(sourceText, ["web", "website", "platform", "wordpress", "api", "site", "сайт", "платформ"])) {
    routing_bucket = "web-platform";
  } else if (payload.landing_offer === "quick-intake") {
    routing_bucket = "quick-diagnostic";
  }

  let next_action = "review_project_request";

  if (routing_bucket === "partner") {
    next_action = "qualify_partner_source";
  } else if (lead_priority === "high") {
    next_action = "prepare_scope_response";
  } else if (routing_bucket === "quick-diagnostic") {
    next_action = "request_missing_context";
  } else if (payload.lead_channel === "paid" || payload.lead_channel === "campaign") {
    next_action = "fast_campaign_follow_up";
  }

  return {
    lead_score: Math.min(score, 100),
    lead_priority,
    routing_bucket,
    next_action
  };
}

function thankYouUrl(payload: ProjectRequest, requestUrl: string, leadId?: string): URL {
  const url = new URL(thankYouPath(payload), requestUrl);
  const conversionParams: Record<string, string | undefined> = {
    lead_id: leadId,
    source_path: payload.source_path,
    landing_page: payload.landing_page,
    landing_offer: payload.landing_offer,
    form_variant: payload.form_variant,
    locale: payload.locale,
    lead_channel: payload.lead_channel,
    partner_ref: payload.partner_ref,
    utm_source: payload.utm_source,
    utm_medium: payload.utm_medium,
    utm_campaign: payload.utm_campaign,
    utm_term: payload.utm_term,
    utm_content: payload.utm_content
  };

  Object.entries(conversionParams).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  return url;
}

async function hashConversionToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function conversionCookie(leadId: string, token: string, requestUrl: string): string {
  const secure = new URL(requestUrl).protocol === "https:" ? "; Secure" : "";
  return `alfarank_lead_conversion=${leadId}.${token}; Path=/; Max-Age=600; HttpOnly; SameSite=Lax${secure}`;
}

function salesClientId(leadId: string): string {
  return `client_site_${leadId.replace(/[^a-z0-9_-]+/gi, "_").slice(0, 80)}`;
}

function urlHost(value: string): string {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function salesPotential(priority: LeadRouting["lead_priority"]): "Высокий" | "Средний" | "Низкий" {
  if (priority === "high") return "Высокий";
  if (priority === "low") return "Низкий";
  return "Средний";
}

function trackingParams(payload: ProjectRequest, requestUrl: string): Map<string, string> {
  const params = new Map<string, string>();
  const add = (key: string, value: string): void => {
    const text = compact(value, 500);
    if (key && text && !params.has(key)) params.set(key, text);
  };

  add("utm_source", payload.utm_source);
  add("utm_medium", payload.utm_medium);
  add("utm_campaign", payload.utm_campaign);
  add("utm_term", payload.utm_term);
  add("utm_content", payload.utm_content);

  [payload.source_path, payload.landing_page].forEach((path) => {
    const sourceUrl = safeUrl(path || "", requestUrl);
    if (!sourceUrl) return;
    try {
      const url = new URL(sourceUrl);
      url.searchParams.forEach((value, key) => add(key, value));
    } catch {
      // Source URL is best-effort attribution context.
    }
  });

  return params;
}

function firstTrackingValue(params: Map<string, string>, keys: string[]): string {
  for (const key of keys) {
    const value = params.get(key);
    if (value) return value;
  }
  return "";
}

function salesLeadSource(payload: ProjectRequest, requestUrl: string): string {
  const sourceUrl = safeUrl(payload.source_path || payload.landing_page || "/", requestUrl);
  const params = trackingParams(payload, requestUrl);
  const utmSource = firstTrackingValue(params, ["utm_source"]);
  const utmMedium = firstTrackingValue(params, ["utm_medium"]);
  const utmCampaign = firstTrackingValue(params, ["utm_campaign", "campaign", "campaign_name"]);
  const referrer = urlHost(payload.referrer);
  let mainSource = "Сайт";

  if (utmSource || utmMedium || utmCampaign) {
    mainSource = `Реклама: ${[utmSource, utmMedium, utmCampaign || "кампания не указана"].filter(Boolean).join(" / ")}`;
  } else if (payload.partner_ref) {
    mainSource = `Партнер: ${payload.partner_ref}`;
  } else if (referrer) {
    mainSource = `Реферал: ${referrer}`;
  } else if (payload.landing_offer) {
    mainSource = `Сайт / оффер: ${payload.landing_offer}`;
  } else if (payload.form_variant) {
    mainSource = `Сайт / форма: ${payload.form_variant}`;
  } else if (payload.lead_channel) {
    mainSource = `Сайт / канал: ${payload.lead_channel}`;
  }

  const details = [
    payload.landing_offer && !mainSource.includes(payload.landing_offer) ? `оффер: ${payload.landing_offer}` : "",
    sourceUrl ? `страница: ${sourceUrl}` : ""
  ];

  return compact([mainSource, ...details].filter(Boolean).join(" · "), 240);
}

function salesLeadSourceDetails(id: string, payload: ProjectRequest, routing: LeadRouting, requestUrl: string): string {
  const sourceUrl = safeUrl(payload.source_path || payload.landing_page || "/", requestUrl);
  const landingUrl = safeUrl(payload.landing_page || payload.source_path || "/", requestUrl);
  const params = trackingParams(payload, requestUrl);
  const keyword = firstTrackingValue(params, ["utm_term", "keyword", "kw", "term"]);
  const ad = firstTrackingValue(params, ["utm_content", "ad", "ad_id", "creative", "creative_id", "adname"]);
  const campaign = firstTrackingValue(params, ["utm_campaign", "campaign", "campaign_name", "campaignid", "campaign_id"]);
  const adGroup = firstTrackingValue(params, ["adgroup", "adgroup_id", "adgroupid", "adset", "adset_id"]);
  const campaignId = firstTrackingValue(params, ["campaignid", "campaign_id"]);
  const adGroupId = firstTrackingValue(params, ["adgroupid", "adgroup_id", "adset_id"]);
  const creativeId = firstTrackingValue(params, ["creative", "creative_id", "ad_id", "adid"]);
  const clickIds = ["gclid", "gbraid", "wbraid", "msclkid", "fbclid", "yclid", "ttclid"]
    .map((key) => [key, params.get(key)] as const)
    .filter(([, value]) => Boolean(value));
  const known = new Set([
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "campaign",
    "campaign_name",
    "campaignid",
    "campaign_id",
    "adgroup",
    "adgroup_id",
    "adgroupid",
    "adset",
    "adset_id",
    "keyword",
    "kw",
    "term",
    "ad",
    "ad_id",
    "creative",
    "creative_id",
    "adname",
    "gclid",
    "gbraid",
    "wbraid",
    "msclkid",
    "fbclid",
    "yclid",
    "ttclid"
  ]);
  const otherParams = [...params.entries()]
    .filter(([key]) => !known.has(key))
    .map(([key, value]) => `${key}: ${value}`);

  return [
    `Lead ID: ${id}`,
    `Тип источника: ${params.size ? "рекламная/трекинговая заявка" : "сайт без UTM"}`,
    payload.lead_channel ? `Канал: ${payload.lead_channel}` : "",
    firstTrackingValue(params, ["utm_source"]) ? `UTM source: ${firstTrackingValue(params, ["utm_source"])}` : "",
    firstTrackingValue(params, ["utm_medium"]) ? `UTM medium: ${firstTrackingValue(params, ["utm_medium"])}` : "",
    campaign ? `Кампания: ${campaign}` : "",
    adGroup ? `Группа объявлений: ${adGroup}` : "",
    keyword ? `Ключевое слово: ${keyword}` : "",
    ad ? `Объявление / creative: ${ad}` : "",
    campaignId ? `Campaign ID: ${campaignId}` : "",
    adGroupId ? `Ad group ID: ${adGroupId}` : "",
    creativeId ? `Ad ID / creative ID: ${creativeId}` : "",
    clickIds.length ? `Click ID: ${clickIds.map(([key, value]) => `${key}=${value}`).join(" / ")}` : "",
    payload.landing_offer ? `Оффер: ${payload.landing_offer}` : "",
    payload.form_variant ? `Форма: ${payload.form_variant}` : "",
    sourceUrl ? `Страница заявки: ${sourceUrl}` : "",
    landingUrl && landingUrl !== sourceUrl ? `Landing page: ${landingUrl}` : "",
    payload.referrer ? `Referrer: ${payload.referrer}` : "",
    payload.partner_ref ? `Partner ref: ${payload.partner_ref}` : "",
    otherParams.length ? `Другие параметры: ${otherParams.join(" / ")}` : "",
    `Маршрут: ${routing.routing_bucket} / ${routing.next_action}`,
    `Приоритет: ${routing.lead_priority} / ${routing.lead_score}`
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 4000);
}

function salesLeadComment(id: string, payload: ProjectRequest, routing: LeadRouting, requestUrl: string): string {
  const sourceUrl = safeUrl(payload.source_path || payload.landing_page || "/", requestUrl);
  const utm = [payload.utm_source, payload.utm_medium, payload.utm_campaign].filter(Boolean).join(" / ");
  return [
    `Заявка с сайта: ${id}`,
    payload.project_type ? `Тип: ${payload.project_type}` : "",
    payload.current_system ? `Текущая система: ${payload.current_system}` : "",
    payload.business_problem ? `Проблема: ${payload.business_problem}` : "",
    payload.desired_result ? `Желаемый результат: ${payload.desired_result}` : "",
    payload.budget ? `Бюджет: ${payload.budget}` : "",
    payload.timeline ? `Срок: ${payload.timeline}` : "",
    sourceUrl ? `Страница: ${sourceUrl}` : "",
    payload.referrer ? `Referrer: ${payload.referrer}` : "",
    utm ? `UTM: ${utm}` : "",
    `Маршрут: ${routing.routing_bucket} / ${routing.next_action} / ${routing.lead_priority} (${routing.lead_score})`
  ]
    .filter(Boolean)
    .join("\n")
    .slice(0, 1800);
}

async function syncLeadToSalesTracker(
  env: Env,
  id: string,
  createdAt: string,
  payload: ProjectRequest,
  routing: LeadRouting,
  requestUrl: string
): Promise<void> {
  const clientId = salesClientId(id);
  const source = salesLeadSource(payload, requestUrl);
  const sourceDetails = salesLeadSourceDetails(id, payload, routing, requestUrl);
  const client = {
    id: clientId,
    company_name: payload.company || payload.name || payload.email || "Заявка с сайта",
    segment: "B2B услуги",
    website: null,
    city: null,
    contact_name: payload.name || null,
    contact_role: null,
    contact_details: [payload.email, payload.contact_details].filter(Boolean).join(" / ") || null,
    source,
    source_details: sourceDetails,
    last_contact_at: null,
    status: "Новый",
    next_action: "Связаться по заявке с сайта",
    next_action_at: createdAt.slice(0, 10),
    potential: salesPotential(routing.lead_priority),
    comment: salesLeadComment(id, payload, routing, requestUrl),
    owner_id: "pavel",
    created_at: createdAt,
    updated_at: createdAt
  };

  try {
    await env.DB.prepare(
      `INSERT INTO sales_clients (
        id,
        company_name,
        segment,
        website,
        city,
        contact_name,
        contact_role,
        contact_details,
        source,
        source_details,
        last_contact_at,
        status,
        next_action,
        next_action_at,
        potential,
        comment,
        owner_id,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        client.id,
        client.company_name,
        client.segment,
        client.website,
        client.city,
        client.contact_name,
        client.contact_role,
        client.contact_details,
        client.source,
        client.source_details,
        client.last_contact_at,
        client.status,
        client.next_action,
        client.next_action_at,
        client.potential,
        client.comment,
        client.owner_id,
        client.created_at,
        client.updated_at
      )
      .run();

    await env.DB.prepare(
      `INSERT INTO sales_audit_log (
        id,
        entity_type,
        entity_id,
        action,
        actor_id,
        before_json,
        after_json,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        crypto.randomUUID(),
        "client",
        client.id,
        "create_from_site_lead",
        "system",
        null,
        JSON.stringify({ lead_id: id, client }),
        createdAt
      )
      .run();
  } catch (error) {
    console.error("Failed to sync project request into sales tracker", error);
  }
}

async function notifyLead(
  env: Env,
  id: string,
  createdAt: string,
  payload: ProjectRequest,
  routing: LeadRouting,
  requestUrl: string
): Promise<void> {
  const deliveries = await Promise.all([
    notifyWebhook(env, id, createdAt, payload, routing, requestUrl),
    notifyTelegram(env, id, createdAt, payload, routing, requestUrl)
  ]);
  await recordNotificationEvents(env, id, "project_request.created", deliveries);
}

async function notifyWebhook(
  env: Env,
  id: string,
  createdAt: string,
  payload: ProjectRequest,
  routing: LeadRouting,
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
        event: "project_request.created",
        id,
        created_at: createdAt,
        routing,
        lead_desk_url: safeUrl("/lead-desk/", requestUrl),
        lead: {
          name: payload.name,
          email: payload.email,
          company: payload.company,
          project_type: payload.project_type,
          current_system: payload.current_system,
          business_problem: payload.business_problem,
          desired_result: payload.desired_result,
          desired_output: payload.desired_output,
          integrations: payload.integrations,
          budget: payload.budget,
          timeline: payload.timeline,
          contact_details: payload.contact_details,
          source_path: payload.source_path,
          landing_page: payload.landing_page,
          landing_offer: payload.landing_offer,
          form_variant: payload.form_variant,
          locale: payload.locale,
          referrer: payload.referrer,
          lead_channel: payload.lead_channel,
          partner_ref: payload.partner_ref,
          utm_source: payload.utm_source,
          utm_medium: payload.utm_medium,
          utm_campaign: payload.utm_campaign,
          utm_term: payload.utm_term,
          utm_content: payload.utm_content,
          lead_score: routing.lead_score,
          lead_priority: routing.lead_priority,
          routing_bucket: routing.routing_bucket,
          next_action: routing.next_action
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lead notification webhook failed", response.status, errorText);
      return notificationFailed("webhook", response.status, errorText);
    }

    return notificationDelivered("webhook", response.status);
  } catch (error) {
    console.error("Lead notification webhook failed", error);
    return notificationFailed("webhook", null, error);
  }
}

function telegramLeadMessage(
  id: string,
  createdAt: string,
  payload: ProjectRequest,
  routing: LeadRouting,
  requestUrl: string
): string {
  const leadDeskUrl = safeUrl("/lead-desk/", requestUrl);
  const sourceUrl = safeUrl(payload.source_path || payload.landing_page || "/", requestUrl);
  const headline = routing.lead_priority === "high" ? "New high-priority AlfaRank lead" : "New AlfaRank lead";
  const lines = [
    `<b>${escapeHtml(headline)}</b>`,
    telegramLine("Priority", `${routing.lead_priority} / ${routing.lead_score}`),
    telegramLine("Route", `${routing.routing_bucket} -> ${routing.next_action}`),
    telegramLine("Lead", [payload.name, payload.company].filter(Boolean).join(" / ")),
    telegramLine("Email", payload.email),
    telegramLine("Channel", payload.lead_channel),
    telegramLine("Form", payload.form_variant),
    telegramLine("Offer", payload.landing_offer || payload.project_type),
    telegramLine("Partner", payload.partner_ref),
    telegramLine("Problem", payload.business_problem, 360),
    telegramLine("Desired result", payload.desired_result, 360),
    telegramLine("Source", sourceUrl, 260),
    telegramLine("UTM", [payload.utm_source, payload.utm_medium, payload.utm_campaign].filter(Boolean).join(" / "), 220),
    telegramLine("Created", createdAt),
    telegramLine("Lead ID", id, 80),
    leadDeskUrl ? `<a href="${escapeHtml(leadDeskUrl)}">Open Lead Desk</a>` : ""
  ].filter(Boolean);

  const message = lines.join("\n");
  return message.length <= TELEGRAM_MESSAGE_LIMIT
    ? message
    : `${message.slice(0, TELEGRAM_MESSAGE_LIMIT - 1).trimEnd()}…`;
}

async function notifyTelegram(
  env: Env,
  id: string,
  createdAt: string,
  payload: ProjectRequest,
  routing: LeadRouting,
  requestUrl: string
): Promise<NotificationDelivery> {
  if (!env.LEAD_TELEGRAM_BOT_TOKEN || !env.LEAD_TELEGRAM_CHAT_ID) return notificationSkipped("telegram");

  const body: Record<string, string | number | boolean> = {
    chat_id: env.LEAD_TELEGRAM_CHAT_ID,
    text: telegramLeadMessage(id, createdAt, payload, routing, requestUrl),
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
      console.error("Lead Telegram notification failed", response.status, result.description || "");
      return notificationFailed("telegram", response.status, result.description || "Telegram API returned an error.");
    }

    return notificationDelivered("telegram", response.status);
  } catch (error) {
    console.error("Lead Telegram notification failed", error);
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
    console.error("Failed to record lead notification delivery events", error);
  }
}

async function parseRequest(request: Request): Promise<ProjectRequest & { honeypot: string; turnstile_token: string }> {
  const form = await request.formData();
  const sourcePath = clean(form.get("source_path"));
  const landingPage = clean(form.get("landing_page"));
  const landingOffer = clean(form.get("landing_offer"));
  const referrer = clean(form.get("referrer"));
  const partnerRef = clean(form.get("partner_ref"));
  const utmSource = clean(form.get("utm_source"));
  const utmMedium = clean(form.get("utm_medium"));
  const basePayload = {
    source_path: sourcePath,
    landing_page: landingPage,
    landing_offer: landingOffer,
    referrer,
    partner_ref: partnerRef,
    utm_source: utmSource,
    utm_medium: utmMedium,
    lead_channel: clean(form.get("lead_channel"))
  };
  const normalizedLeadChannel = leadChannel(basePayload);
  const formVariant = inferFormVariant(clean(form.get("form_variant")), {
    source_path: sourcePath,
    landing_page: landingPage,
    landing_offer: landingOffer,
    lead_channel: normalizedLeadChannel
  });

  return {
    name: clean(form.get("name")),
    email: clean(form.get("email")),
    company: clean(form.get("company")),
    project_type: clean(form.get("project_type")),
    current_system: clean(form.get("current_system")),
    business_problem: clean(form.get("business_problem")),
    desired_result: clean(form.get("desired_result")),
    desired_output: clean(form.get("desired_output")),
    integrations: clean(form.get("integrations")),
    budget: clean(form.get("budget")),
    timeline: clean(form.get("timeline")),
    contact_details: clean(form.get("contact_details")),
    source_path: sourcePath,
    landing_page: landingPage,
    landing_offer: landingOffer,
    form_variant: formVariant,
    locale: clean(form.get("locale")) || localeFromPath(sourcePath || landingPage),
    referrer,
    lead_channel: normalizedLeadChannel,
    partner_ref: partnerRef,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: clean(form.get("utm_campaign")),
    utm_term: clean(form.get("utm_term")),
    utm_content: clean(form.get("utm_content")),
    user_agent: request.headers.get("user-agent") ?? "",
    ip_address: request.headers.get("cf-connecting-ip") ?? "",
    honeypot: clean(form.get("company_website")),
    turnstile_token: clean(form.get("cf-turnstile-response"))
  };
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return htmlResponse("Project request storage is not configured.", 500);
  }

  const payload = await parseRequest(request);

  if (payload.honeypot) {
    return new Response(null, { status: 204 });
  }

  const turnstile = await verifyTurnstile(env, payload.turnstile_token, payload.ip_address);
  if (!turnstile.ok) {
    return htmlResponse(turnstile.message || "Spam protection check failed. Please try again.");
  }

  if (!payload.name || !payload.email || !payload.business_problem || !payload.desired_result) {
    return htmlResponse("Name, email, business problem, and desired result are required.");
  }

  if (!isValidEmail(payload.email)) {
    return htmlResponse("A valid email address is required.");
  }

  const id = crypto.randomUUID();
  const conversionToken = crypto.randomUUID();
  const conversionTokenHash = await hashConversionToken(conversionToken);
  const createdAt = new Date().toISOString();
  const routing = leadRouting(payload);

  try {
    await env.DB.prepare(
      `INSERT INTO project_requests (
        id,
        name,
        email,
        company,
        project_type,
        current_system,
        business_problem,
        desired_result,
        desired_output,
        integrations,
        budget,
        timeline,
        contact_details,
        source_path,
        landing_page,
        landing_offer,
        form_variant,
        locale,
        referrer,
        lead_channel,
        partner_ref,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        user_agent,
        ip_address,
        lead_score,
        lead_priority,
        routing_bucket,
        next_action,
        conversion_token_hash,
        status,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', ?)`
    )
      .bind(
        id,
        payload.name,
        payload.email,
        payload.company,
        payload.project_type,
        payload.current_system,
        payload.business_problem,
        payload.desired_result,
        payload.desired_output,
        payload.integrations,
        payload.budget,
        payload.timeline,
        payload.contact_details,
        payload.source_path,
        payload.landing_page,
        payload.landing_offer,
        payload.form_variant,
        payload.locale,
        payload.referrer,
        payload.lead_channel,
        payload.partner_ref,
        payload.utm_source,
        payload.utm_medium,
        payload.utm_campaign,
        payload.utm_term,
        payload.utm_content,
        payload.user_agent,
        payload.ip_address,
        routing.lead_score,
        routing.lead_priority,
        routing.routing_bucket,
        routing.next_action,
        conversionTokenHash,
        createdAt
      )
      .run();
  } catch (error) {
    console.error("Failed to store project request", error);
    return htmlResponse("Project request could not be stored. Please try again or contact AlfaRank directly.", 500);
  }

  await syncLeadToSalesTracker(env, id, createdAt, payload, routing, request.url);
  await notifyLead(env, id, createdAt, payload, routing, request.url);

  return new Response(null, {
    status: 303,
    headers: {
      location: thankYouUrl(payload, request.url, id).toString(),
      "set-cookie": conversionCookie(id, conversionToken, request.url),
      "cache-control": "no-store"
    }
  });
};

export const onRequestGet: PagesFunction = async () => {
  return htmlResponse("Method not allowed.", 405);
};
