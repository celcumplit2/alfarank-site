type Env = {
  DB: D1Database;
};

const COOKIE_NAME = "alfarank_lead_conversion";

function json(payload: Record<string, unknown>, status = 200, clearCookie = false): Response {
  const headers = new Headers({
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });

  if (clearCookie) {
    headers.set("set-cookie", `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax; Secure`);
  }

  return new Response(JSON.stringify(payload), { status, headers });
}

function cookieValue(request: Request, name: string): string {
  const cookie = request.headers.get("cookie") || "";
  for (const part of cookie.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return value.join("=");
  }
  return "";
}

async function hashToken(token: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) return json({ verified: false }, 503);

  const leadId = new URL(request.url).searchParams.get("lead_id") || "";
  const cookie = cookieValue(request, COOKIE_NAME);
  const separator = cookie.indexOf(".");
  const cookieLeadId = separator > 0 ? cookie.slice(0, separator) : "";
  const token = separator > 0 ? cookie.slice(separator + 1) : "";

  if (!leadId || leadId !== cookieLeadId || !token) {
    return json({ verified: false }, 200, Boolean(cookie));
  }

  try {
    const tokenHash = await hashToken(token);
    const result = await env.DB.prepare(
      `UPDATE project_requests
       SET conversion_recorded_at = ?
       WHERE id = ?
         AND conversion_token_hash = ?
         AND conversion_recorded_at IS NULL`
    )
      .bind(new Date().toISOString(), leadId, tokenHash)
      .run();

    return json({ verified: Number(result.meta.changes || 0) === 1 }, 200, true);
  } catch (error) {
    console.error("Failed to verify lead conversion", error);
    return json({ verified: false }, 500);
  }
};

export const onRequestGet: PagesFunction = async () => json({ verified: false }, 405);
