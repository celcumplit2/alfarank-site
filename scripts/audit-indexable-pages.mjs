import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const expectedIndexablePages = 192;

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? listHtmlFiles(entryPath)
      : entry.isFile() && entry.name.endsWith(".html")
        ? [entryPath]
        : [];
  }));
  return nested.flat();
}

function routeFromFile(file) {
  const relative = path.relative(distDir, file).replaceAll(path.sep, "/");
  if (relative === "index.html") return "/";
  if (relative.endsWith("/index.html")) return `/${relative.slice(0, -"index.html".length)}`;
  return `/${relative}`;
}

function robotsContent(html) {
  const meta = html.match(/<meta\s+[^>]*name=["']robots["'][^>]*>/i)?.[0] ?? "";
  return meta.match(/content=["']([^"']*)["']/i)?.[1]?.toLowerCase() ?? "";
}

const files = await listHtmlFiles(distDir);
const pages = await Promise.all(files.map(async (file) => {
  const html = await readFile(file, "utf8");
  return { route: routeFromFile(file), robots: robotsContent(html) };
}));
const indexable = pages.filter((page) => !page.robots.includes("noindex"));

const requiredIndexable = ["/", "/cases/", "/news/", "/ru/alfa-pulse/"];
const newsHubRoutes = new Set([
  "/news/about/",
  "/news/editorial-policy/",
  "/ro/news/about/",
  "/ro/news/editorial-policy/",
  "/ru/news/about/",
  "/ru/news/editorial-policy/"
]);
const requiredNoindexPatterns = [
  /^\/news\/[^/]+\/$/,
  /^\/(?:ro|ru)\/news\/[^/]+\/$/,
  /^\/cases\/[^/]+\/[^/]+\/$/,
  /^\/(?:ro|ru)\/cases\/[^/]+\/[^/]+\/$/
];
const failures = [];

for (const route of requiredIndexable) {
  const page = pages.find((candidate) => candidate.route === route);
  if (!page) failures.push(`Missing required page: ${route}`);
  else if (page.robots.includes("noindex")) failures.push(`Required page is noindex: ${route}`);
}

for (const pattern of requiredNoindexPatterns) {
  const matching = pages.filter((page) => pattern.test(page.route) && !newsHubRoutes.has(page.route));
  if (matching.length === 0) failures.push(`No pages matched expected noindex pattern: ${pattern}`);
  const incorrectlyIndexable = matching.filter((page) => !page.robots.includes("noindex"));
  if (incorrectlyIndexable.length > 0) {
    failures.push(`Expected noindex pages are indexable: ${incorrectlyIndexable.slice(0, 5).map((page) => page.route).join(", ")}`);
  }
}

if (indexable.length !== expectedIndexablePages) {
  failures.push(`Indexable HTML count is ${indexable.length}; expected exactly ${expectedIndexablePages}`);
}

if (failures.length > 0) {
  console.error("Indexability audit failed:\n- " + failures.join("\n- "));
  process.exit(1);
}

console.log(`Indexability audit passed: ${indexable.length}/${pages.length} HTML pages are indexable (expected ${expectedIndexablePages}).`);
