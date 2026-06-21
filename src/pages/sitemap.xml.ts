import { allBaseRoutes, alternatePaths, allLocalizedRoutes } from "@/data/i18n";
import { articleDate, getNovaArticleSummaries, normalizeArticleUrl } from "@/lib/nova";
import type { NewsLocale } from "@/lib/nova";

const baseUrl = "https://alfarank.com";
const lastmod = "2026-05-27";
const newsLocales: NewsLocale[] = ["en", "ro", "ru"];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const localizedRouteXml = () => {
  const routes = allLocalizedRoutes();
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
  const articles = await getNovaArticleSummaries();
  const newsRoutes = [
    ...articles.flatMap((article) =>
      newsLocales.map((locale) => `  <url>
    <loc>${escapeXml(normalizeArticleUrl(article.slug, locale))}</loc>
    <lastmod>${escapeXml(article.updatedAt || articleDate(article) || lastmod)}</lastmod>
  </url>`
      )
    )
  ].join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${localizedRouteXml()}
${newsRoutes}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8"
    }
  });
}
