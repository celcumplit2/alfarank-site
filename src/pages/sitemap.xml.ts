import { allBaseRoutes, alternatePaths, allLocalizedRoutes } from "@/data/i18n";

const baseUrl = "https://alfarank.com";
const lastmod = "2026-07-20";
const excludedSitemapRoutes = new Set([
  "/start-project/thank-you/",
  "/ro/start-project/thank-you/",
  "/ru/start-project/thank-you/"
]);

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const localizedRouteXml = () => {
  const routes = allLocalizedRoutes().filter((route) => !excludedSitemapRoutes.has(route));
  return routes
    .map(
      (route) => {
        const baseRoute = allBaseRoutes().find((candidate) => alternatePaths(candidate).some((entry) => entry.href === route)) ?? route;
        const alternates = alternatePaths(baseRoute)
          .map((entry) => `    <xhtml:link rel="alternate" hreflang="${entry.locale}" href="${baseUrl}${entry.href}" />`)
          .join("\n");

        return `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${baseRoute}" />
  </url>`;
      }
    )
    .join("\n");
};

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${localizedRouteXml()}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8"
    }
  });
}
