type Env = {
  PRIVATE_PROJECTS_ACCESS_CODE?: string;
  PRIVATE_PROJECTS_COOKIE_SECRET?: string;
  [key: string]: string | undefined;
};

const COOKIE_NAME = "alfa_private_access";
const PROJECT_COOKIE_PREFIX = "alfa_project_";
const DEFAULT_ACCESS_CODE = "AlfaProjects-2026!";

const isProtectedProjectPath = (pathname: string) =>
  /^\/projects(?:\/|$)/.test(pathname) || /^\/(ro|ru)\/projects(?:\/|$)/.test(pathname);

const slashRedirects = new Set(["/alfa-pulse", "/ro/alfa-pulse", "/ru/alfa-pulse"]);

const localeFromPath = (pathname: string) => {
  const match = pathname.match(/^\/(ro|ru)(?=\/|$)/);
  return match?.[1] ?? "en";
};

const accessPathFor = (pathname: string) => {
  const locale = localeFromPath(pathname);
  return locale === "en" ? "/access/" : `/${locale}/access/`;
};

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

const readCookie = (request: Request, name: string) => {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const entries = cookieHeader.split(";").map((entry) => entry.trim());
  const match = entries.find((entry) => entry.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
};

export const onRequest: PagesFunction<Env> = async ({ request, env, next }) => {
  const url = new URL(request.url);

  if (/\/feed\/?$/.test(url.pathname)) {
    return new Response("Gone", {
      status: 410,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex, nofollow"
      }
    });
  }

  if (slashRedirects.has(url.pathname)) {
    url.pathname = `${url.pathname}/`;
    return Response.redirect(url.toString(), 301);
  }

  if (!isProtectedProjectPath(url.pathname)) {
    return next();
  }

  const expectedCookie = await cookieValueFor(env);
  const currentCookie = readCookie(request, COOKIE_NAME);

  if (currentCookie === expectedCookie) {
    return next();
  }

  const projectSlug = projectSlugFromPath(url.pathname);
  const projectCode = configuredProjectCode(env, projectSlug);

  if (projectSlug && projectCode) {
    const expectedProjectCookie = await projectCookieValueFor(env, projectSlug, projectCode);
    const currentProjectCookie = readCookie(request, projectCookieNameFor(projectSlug));

    if (currentProjectCookie === expectedProjectCookie) {
      return next();
    }
  }

  const loginUrl = new URL(accessPathFor(url.pathname), request.url);
  loginUrl.searchParams.set("next", `${url.pathname}${url.search}`);

  return Response.redirect(loginUrl.toString(), 302);
};
