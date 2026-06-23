import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const targets = ["Russian", "Romanian"];
const siteId = "alfarank-site";

function readEnv(filePath) {
  if (!existsSync(filePath)) return {};
  return Object.fromEntries(
    readFileSync(filePath, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        return [line.slice(0, index).trim(), line.slice(index + 1).trim().replace(/^["']|["']$/g, "")];
      })
  );
}

function readSiteTokens(filePath) {
  if (!existsSync(filePath)) return {};
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch {
    return {};
  }
}

const env = { ...readEnv(path.join(root, ".env")), ...process.env };
const siteTokens = readSiteTokens(path.join(root, ".prod-site-tokens.json"));

const novaBase = env.NOVA_PUBLIC_API_BASE || "https://nova.alfarank.com/api/public";
const novaToken = env.NOVA_ALFARANK_PUBLIC_TOKEN || "public-d9d90ebc1d6748678d349cc1ab8918db";
const langBase = env.LANG_PUBLIC_API_BASE || "https://lang.alfarank.com/api/public";
const langToken =
  env.LANG_ALFARANK_PUBLIC_TOKEN ||
  env.LANG_PUBLIC_TOKEN ||
  siteTokens[siteId] ||
  "public_alfarank_46cc3bcc8e0131ac3b42319469ffcf13511f4fe4e71dc412";
const force = env.NOVA_TRANSLATION_FORCE === "1" || process.argv.includes("--force");

if (!langToken) {
  throw new Error("Missing LANG public token. Set LANG_ALFARANK_PUBLIC_TOKEN.");
}

function apiUrl(base, apiPath, params = {}) {
  const url = new URL(`${base.replace(/\/$/, "")}${apiPath}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  return url;
}

async function readJson(response, label) {
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`${label} returned non-JSON: ${text.slice(0, 240)}`);
  }
  if (!response.ok) {
    throw new Error(`${label} failed ${response.status}: ${JSON.stringify(data).slice(0, 500)}`);
  }
  return data;
}

async function fetchNovaSummaries() {
  const response = await fetch(
    apiUrl(novaBase, "/articles", {
      siteId,
      token: novaToken
    })
  );
  const data = await readJson(response, "NOVA article list");
  return (data.articles || []).filter((article) => article.slug && article.status === "published");
}

async function fetchNovaArticle(slug) {
  const response = await fetch(
    apiUrl(novaBase, `/articles/${encodeURIComponent(slug)}`, {
      siteId,
      token: novaToken
    })
  );
  const data = await readJson(response, `NOVA article ${slug}`);
  return data.article;
}

async function fetchExistingTranslationTargets(slug) {
  if (force) return new Set();
  const response = await fetch(
    apiUrl(langBase, `/articles/${encodeURIComponent(slug)}/translations`, {
      siteId,
      token: langToken
    })
  );
  if (response.status === 404) return new Set();
  const data = await readJson(response, `LANG translations ${slug}`);
  return new Set((data.translations || []).map((item) => item.targetLanguage).filter(Boolean));
}

async function publishMissingTranslations(article, targetLanguages) {
  const response = await fetch(`${langBase.replace(/\/$/, "")}/articles/publish`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-lang-site-id": siteId,
      "x-lang-public-token": langToken
    },
    body: JSON.stringify({
      siteId,
      token: langToken,
      sourceLanguage: "English",
      targetLanguages,
      article
    })
  });
  return readJson(response, `LANG publish ${article.slug}`);
}

const summaries = await fetchNovaSummaries();
console.log(`LANG sync: found ${summaries.length} published NOVA articles.`);

let publishedArticles = 0;
let publishedVariants = 0;
let skippedArticles = 0;

for (const summary of summaries) {
  const existingTargets = await fetchExistingTranslationTargets(summary.slug);
  const missingTargets = targets.filter((target) => !existingTargets.has(target));

  if (!missingTargets.length) {
    skippedArticles += 1;
    continue;
  }

  const article = await fetchNovaArticle(summary.slug);
  if (!article) {
    console.warn(`LANG sync: skipped missing NOVA article ${summary.slug}.`);
    continue;
  }

  const result = await publishMissingTranslations(article, missingTargets);
  publishedArticles += 1;
  publishedVariants += result.count || missingTargets.length;
  const translated = (result.translations || [])
    .map((item) => `${item.targetLanguage}:${item.translatedSlug}`)
    .join(", ");
  console.log(`LANG sync: translated ${summary.slug} -> ${translated || missingTargets.join(", ")}`);
}

console.log(
  `LANG sync complete: ${publishedArticles} article(s), ${publishedVariants} variant(s), ${skippedArticles} already complete.`
);
