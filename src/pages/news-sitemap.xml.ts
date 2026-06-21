import { articleDate, getNovaArticleSummaries, normalizeArticleUrl } from "@/lib/nova";
import type { NewsLocale } from "@/lib/nova";

const newsLocales: NewsLocale[] = ["en", "ro", "ru"];

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const articlesByLocale = await Promise.all(
    newsLocales.map(async (locale) => ({
      locale,
      articles: await getNovaArticleSummaries(locale)
    }))
  );
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${articlesByLocale
  .flatMap(({ locale, articles }) =>
    articles.map((article) => `  <url>
    <loc>${escapeXml(normalizeArticleUrl(article.slug, locale))}</loc>
    <news:news>
      <news:publication>
        <news:name>AlfaRank</news:name>
        <news:language>${locale}</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(articleDate(article))}</news:publication_date>
      <news:title>${escapeXml(article.meta?.headline || article.seo?.title || article.title)}</news:title>
    </news:news>
  </url>`)
  )
  .join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "content-type": "application/xml; charset=utf-8"
    }
  });
}
