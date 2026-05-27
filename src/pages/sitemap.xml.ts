import { capabilities, industries, solutions, systems } from "@/data/site";
import { landingOffers } from "@/data/landing";

const baseUrl = "https://alfarank.com";
const lastmod = "2026-05-26";

const staticRoutes = [
  "/",
  "/capabilities/",
  "/solutions/",
  "/systems/",
  "/technologies/",
  "/industries/",
  "/about/",
  "/start-project/"
];

const routes = [
  ...staticRoutes,
  ...capabilities.map((item) => `/capabilities/${item.slug}/`),
  ...solutions.map((item) => `/solutions/${item.slug}/`),
  ...systems.map((item) => `/systems/${item.slug}/`),
  ...industries.map((item) => `/industries/${item.slug}/`),
  ...landingOffers.map((item) => `/lp/${item.slug}/`)
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
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
