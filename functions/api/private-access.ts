type Env = {
  PRIVATE_PROJECTS_ACCESS_CODE?: string;
  PRIVATE_PROJECTS_COOKIE_SECRET?: string;
  [key: string]: string | undefined;
};

const COOKIE_NAME = "alfa_private_access";
const PROJECT_COOKIE_PREFIX = "alfa_project_";
const DEFAULT_ACCESS_CODE = "AlfaProjects-2026!";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

const clean = (value: FormDataEntryValue | null) => String(value ?? "").trim();

const configuredCode = (env: Env) => env.PRIVATE_PROJECTS_ACCESS_CODE || DEFAULT_ACCESS_CODE;

const configuredSecret = (env: Env) => env.PRIVATE_PROJECTS_COOKIE_SECRET || configuredCode(env);

const projectSlugFromPath = (pathname: string) => {
  const match = pathname.match(/^\/(?:(?:ro|ru)\/)?projects\/([^/]+)(?:\/|$)/);
  return match?.[1]?.toLowerCase() ?? "";
};

const projectEnvNameFor = (projectSlug: string) => {
  const key = projectSlug.toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return key ? `PRIVATE_PROJECT_${key}_ACCESS_CODE` : "";
};

const projectCookieNameFor = (projectSlug: string) =>
  `${PROJECT_COOKIE_PREFIX}${projectSlug.replace(/[^a-z0-9-]+/g, "_")}_access`;

const configuredProjectCode = (env: Env, projectSlug: string) => {
  const envName = projectEnvNameFor(projectSlug);
  return envName ? String(env[envName] ?? "").trim() : "";
};

const cookieValueFor = async (env: Env) => {
  const input = new TextEncoder().encode(`${configuredCode(env)}:${configuredSecret(env)}`);
  const digest = await crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const projectCookieValueFor = async (env: Env, projectSlug: string, projectCode: string) => {
  const input = new TextEncoder().encode(`project:${projectSlug}:${projectCode}:${configuredSecret(env)}`);
  const digest = await crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const localeFromPath = (pathname: string) => {
  const match = pathname.match(/^\/(ro|ru)(?=\/|$)/);
  return match?.[1] ?? "en";
};

const accessPathFor = (pathname: string) => {
  const locale = localeFromPath(pathname);
  return locale === "en" ? "/access/" : `/${locale}/access/`;
};

const safeNextPath = (value: string) => {
  if (!value.startsWith("/")) return "/projects/";
  if (value.startsWith("//")) return "/projects/";
  if (!/^\/(?:projects|ro\/projects|ru\/projects)(?:\/|$)/.test(value)) return "/projects/";
  return value;
};

const redirectResponse = (location: string, headers?: HeadersInit) =>
  new Response(null, {
    status: 303,
    headers: {
      location,
      ...(headers ?? {})
    }
  });

const accessCookieFor = async (env: Env, nextPath: string, code: string) => {
  if (code === configuredCode(env)) {
    return {
      name: COOKIE_NAME,
      value: await cookieValueFor(env)
    };
  }

  const projectSlug = projectSlugFromPath(nextPath);
  const projectCode = configuredProjectCode(env, projectSlug);

  if (projectSlug && projectCode && code === projectCode) {
    return {
      name: projectCookieNameFor(projectSlug),
      value: await projectCookieValueFor(env, projectSlug, projectCode)
    };
  }

  return null;
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const form = await request.formData();
  const code = clean(form.get("access_code"));
  const nextPath = safeNextPath(clean(form.get("next")));
  const accessCookie = await accessCookieFor(env, nextPath, code);

  if (!accessCookie) {
    const loginUrl = new URL(accessPathFor(nextPath), request.url);
    loginUrl.searchParams.set("next", nextPath);
    loginUrl.searchParams.set("error", "1");
    return redirectResponse(loginUrl.toString());
  }

  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  const cookie = `${accessCookie.name}=${encodeURIComponent(accessCookie.value)}; Path=/; Max-Age=${MAX_AGE_SECONDS}; HttpOnly; SameSite=Lax${secure}`;

  return redirectResponse(new URL(nextPath, request.url).toString(), {
    "set-cookie": cookie
  });
};

export const onRequestGet: PagesFunction = async ({ request }) => {
  return redirectResponse(new URL("/access/", request.url).toString());
};
