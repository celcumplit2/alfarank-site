import { alternatePaths, localesForBaseRoute, localizePath } from "@/data/i18n";
import { caseDirections } from "@/data/case-examples";
import { landingOffers } from "@/data/landing";
import { capabilities, industries, solutions, systems } from "@/data/site";

const baseUrl = "https://alfarank.com";

const priorityBaseRoutes = [
  "/",
  "/capabilities/",
  ...capabilities.map((item) => `/capabilities/${item.slug}/`),
  "/solutions/",
  ...solutions.map((item) => `/solutions/${item.slug}/`),
  "/systems/",
  ...systems.map((item) => `/systems/${item.slug}/`),
  "/industries/",
  ...industries.map((item) => `/industries/${item.slug}/`),
  ...landingOffers.map((item) => `/lp/${item.slug}/`),
  "/cases/",
  ...caseDirections.map((direction) => `/cases/${direction.slug}/`),
  "/about/",
  "/contact/",
  "/alfa-pulse/",
  "/start-project/",
  "/partner-program/",
  "/news/",
  "/news/about/",
  "/news/editorial-policy/",
  "/news/authors/andrei/",
  "/sitemap/"
];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const priorityRoutes = () => [
  ...new Set(
    priorityBaseRoutes.flatMap((route) => localesForBaseRoute(route).map((locale) => localizePath(route, locale)))
  )
];

const routeXml = () =>
  priorityRoutes()
    .map((route) => {
      const baseRoute =
        priorityBaseRoutes.find((candidate) => alternatePaths(candidate).some((entry) => entry.href === route)) ?? route;
      const alternates = alternatePaths(baseRoute)
        .map(
          (entry) =>
            `    <xhtml:link rel="alternate" hreflang="${entry.locale}" href="${baseUrl}${entry.href}" />`
        )
        .join("\n");

      return `  <url>
    <loc>${escapeXml(`${baseUrl}${route}`)}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${baseUrl}${baseRoute}`)}" />
  </url>`;
    })
    .join("\n");

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routeXml()}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8"
    }
  });
}
