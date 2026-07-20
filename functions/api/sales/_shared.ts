export type SalesRole = "manager" | "director" | "admin";

export type SalesUser = {
  id: string;
  username: string;
  name: string;
  role: SalesRole;
};

export type SalesEnv = {
  DB: D1Database;
  SALES_SESSION_SECRET?: string;
  SALES_PAVEL_PASSWORD?: string;
  SALES_SLAVA_PASSWORD?: string;
  SALES_ANDREY_PASSWORD?: string;
  SALES_PAVEL_PIN?: string;
  SALES_SLAVA_PIN?: string;
  SALES_ANDREY_PIN?: string;
  SALES_MANAGER_PIN?: string;
  SALES_DIRECTOR_PIN?: string;
  SALES_ADMIN_PIN?: string;
  PRIVATE_PROJECTS_COOKIE_SECRET?: string;
  XAI_API_KEY?: string;
  XAI_SALES_EXTRACT_MODEL?: string;
};

type SessionPayload = {
  u: string;
  exp: number;
};

export const SEGMENTS = [
  "B2B услуги",
  "Локальный бизнес",
  "E-commerce",
  "Образование",
  "Медицина",
  "Другое"
];

export const CLIENT_STATUSES = [
  "Новый",
  "Контакт",
  "Встреча назначена",
  "Встреча проведена",
  "КП отправлено",
  "Переговоры",
  "Клиент",
  "Отказ",
  "Пауза"
];

export const ACTION_TYPES = [
  "Поиск контакта",
  "Звонок",
  "Сообщение",
  "Встреча",
  "Повторный контакт",
  "КП отправлено",
  "Переговоры",
  "Другое"
];

export const ACTION_STATUSES = [
  "Запланировано",
  "В работе",
  "Сделано",
  "Перенесено",
  "Отменено"
];

export const PRIORITIES = ["Высокий", "Средний", "Низкий"];
export const TERMINAL_CLIENT_STATUSES = ["Клиент", "Отказ", "Пауза"];

const USERS: SalesUser[] = [
  { id: "pavel", username: "pavel", name: "Павел", role: "manager" },
  { id: "slava", username: "slava", name: "Слава", role: "manager" },
  { id: "andrey", username: "andrey", name: "Андрей", role: "admin" }
];

const MANAGER_IDS = USERS.filter((user) => user.role === "manager").map((user) => user.id);

const COOKIE_NAME = "alfa_sales_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const DEFAULT_SECRET = "AlfaSales-2026";

export function jsonResponse(data: unknown, status = 200, headers?: HeadersInit): Response {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...(headers ?? {})
    }
  });
}

export function textResponse(message: string, status = 400): Response {
  return new Response(message, {
    status,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export function clean(value: unknown, maxLength = 300): string {
  return String(value ?? "").trim().slice(0, maxLength);
}

export function nullableClean(value: unknown, maxLength = 300): string | null {
  const result = clean(value, maxLength);
  return result || null;
}

export function boolValue(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  const text = clean(value).toLowerCase();
  return ["1", "true", "yes", "да", "on"].includes(text);
}

export function todayParam(request: Request): string {
  const url = new URL(request.url);
  const value = clean(url.searchParams.get("today"), 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : new Date().toISOString().slice(0, 10);
}

export function safeDate(value: unknown): string | null {
  const text = clean(value, 32);
  if (!text) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const date = new Date(text);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function canSeeAll(user: SalesUser): boolean {
  return user.role === "director" || user.role === "admin";
}

export function canDeleteSalesData(user: SalesUser): boolean {
  return user.role === "admin";
}

export function isManagerId(id: string): boolean {
  return MANAGER_IDS.includes(id);
}

export function managerUsers(): SalesUser[] {
  return USERS.filter((user) => user.role === "manager");
}

export function isActiveClientStatus(status: string): boolean {
  return !TERMINAL_CLIENT_STATUSES.includes(status);
}

export function oneOf(value: unknown, allowed: string[], fallback: string): string {
  const text = clean(value, 120);
  return allowed.includes(text) ? text : fallback;
}

export function salesUsers(env: SalesEnv) {
  const pins: Record<string, string> = {
    pavel: env.SALES_PAVEL_PASSWORD || env.SALES_PAVEL_PIN || env.SALES_MANAGER_PIN || "1111",
    slava: env.SALES_SLAVA_PASSWORD || env.SALES_SLAVA_PIN || "2222",
    andrey: env.SALES_ANDREY_PASSWORD || env.SALES_ANDREY_PIN || env.SALES_ADMIN_PIN || env.SALES_DIRECTOR_PIN || "3333"
  };

  return USERS.map((user) => ({
    ...user,
    pin: pins[user.id]
  }));
}

export function publicUsers(env: SalesEnv): SalesUser[] {
  return salesUsers(env).map(({ pin: _pin, ...user }) => user);
}

export function userById(id: string): SalesUser | null {
  return USERS.find((user) => user.id === id) || null;
}

function secretFor(env: SalesEnv): string {
  return env.SALES_SESSION_SECRET || env.PRIVATE_PROJECTS_COOKIE_SECRET || DEFAULT_SECRET;
}

function base64UrlEncode(value: string | ArrayBuffer): string {
  const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = `${normalized}${"=".repeat((4 - (normalized.length % 4)) % 4)}`;
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new TextDecoder().decode(bytes);
}

async function hmac(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return base64UrlEncode(signature);
}

function readCookie(request: Request, name: string): string {
  const cookieHeader = request.headers.get("cookie") || "";
  const entries = cookieHeader.split(";").map((entry) => entry.trim());
  const match = entries.find((entry) => entry.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

export async function sessionCookieFor(user: SalesUser, env: SalesEnv, requestUrl: string): Promise<string> {
  const payload: SessionPayload = {
    u: user.id,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmac(encodedPayload, secretFor(env));
  const secure = new URL(requestUrl).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE_NAME}=${encodeURIComponent(`${encodedPayload}.${signature}`)}; Path=/; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; SameSite=Lax${secure}`;
}

export function expiredSessionCookie(requestUrl: string): string {
  const secure = new URL(requestUrl).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secure}`;
}

export async function currentSalesUser(request: Request, env: SalesEnv): Promise<SalesUser | null> {
  const rawCookie = readCookie(request, COOKIE_NAME);
  if (!rawCookie || !rawCookie.includes(".")) return null;

  const [encodedPayload, signature] = rawCookie.split(".");
  const expected = await hmac(encodedPayload, secretFor(env));
  if (signature !== expected) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;
    if (!payload.u || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return userById(payload.u);
  } catch {
    return null;
  }
}

export async function requireSalesUser(request: Request, env: SalesEnv): Promise<SalesUser | Response> {
  if (!env.DB) {
    return jsonResponse({ error: "Sales storage is not configured." }, 500);
  }

  const user = await currentSalesUser(request, env);
  if (!user) {
    return jsonResponse({ error: "Unauthorized." }, 401);
  }

  return user;
}

export function ownerCondition(user: SalesUser, tableAlias = ""): { sql: string; bindings: unknown[] } {
  if (canSeeAll(user)) return { sql: "", bindings: [] };
  const column = tableAlias ? `${tableAlias}.owner_id` : "owner_id";
  return { sql: `${column} = ?`, bindings: [user.id] };
}

export async function parseJson<T extends Record<string, unknown>>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    return {} as T;
  }
}

export async function recordAudit(
  env: SalesEnv,
  user: SalesUser,
  entityType: string,
  entityId: string,
  action: string,
  before: unknown,
  after: unknown
): Promise<void> {
  try {
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
        entityType,
        entityId,
        action,
        user.id,
        before == null ? null : JSON.stringify(before),
        after == null ? null : JSON.stringify(after),
        nowIso()
      )
      .run();
  } catch (error) {
    console.error("Failed to record sales audit event", error);
  }
}
