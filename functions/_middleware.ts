type Env = {
  PRIVATE_PROJECTS_ACCESS_CODE?: string;
  PRIVATE_PROJECTS_COOKIE_SECRET?: string;
};

const COOKIE_NAME = "alfa_private_access";
const DEFAULT_ACCESS_CODE = "AlfaProjects-2026!";

const isProtectedProjectPath = (pathname: string) =>
  /^\/projects(?:\/|$)/.test(pathname) || /^\/(ro|ru)\/projects(?:\/|$)/.test(pathname);

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

const cookieValueFor = async (env: Env) => {
  const input = new TextEncoder().encode(`${configuredCode(env)}:${configuredSecret(env)}`);
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

  if (!isProtectedProjectPath(url.pathname)) {
    return next();
  }

  const expectedCookie = await cookieValueFor(env);
  const currentCookie = readCookie(request, COOKIE_NAME);

  if (currentCookie === expectedCookie) {
    return next();
  }

  const loginUrl = new URL(accessPathFor(url.pathname), request.url);
  loginUrl.searchParams.set("next", `${url.pathname}${url.search}`);

  return Response.redirect(loginUrl.toString(), 302);
};
