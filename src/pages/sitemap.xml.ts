import { allBaseRoutes, alternatePaths, allLocalizedRoutes } from "@/data/i18n";

const baseUrl = "https://alfarank.com";
const lastmod = "2026-05-27";

const routes = allLocalizedRoutes();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
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
  .join("\n")}
</urlset>
`;

export function GET() {
  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8"
    }
  });
}
