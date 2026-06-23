import {
  normalizeSentenceStarts,
  translateNovaArticle,
  translateNovaArticleSummary
} from "@/data/nova-news-translations";
import type { NewsLocale, NovaArticle, NovaArticleSummary } from "@/lib/nova";

const LANG_API_BASE = import.meta.env.LANG_PUBLIC_API_BASE || "https://lang.alfarank.com/api/public";
const LANG_SITE_ID = import.meta.env.LANG_ALFARANK_SITE_ID || "alfarank-site";
const LANG_PUBLIC_TOKEN =
  import.meta.env.LANG_ALFARANK_PUBLIC_TOKEN || "public_alfarank_46cc3bcc8e0131ac3b42319469ffcf13511f4fe4e71dc412";

const LANG_TARGETS: Partial<Record<NewsLocale, string>> = {
  ro: "Romanian",
  ru: "Russian"
};

const LANG_SLUGS: Record<string, string> = {
  Romanian: "ro",
  Russian: "ru"
};

const TEXTS_PER_REQUEST = 80;

type TextItem = {
  key: string;
  text: string;
};

type LangTranslation = {
  key?: string;
  translatedText?: string;
};

type LangTranslateResponse = {
  translations?: LangTranslation[];
};

type LangArticleResponse = {
  article?: NovaArticle;
};

const translatedArticlePromises = new Map<string, Promise<NovaArticle | undefined>>();
const summaryPromises = new Map<string, Promise<NovaArticleSummary>>();
const articlePromises = new Map<string, Promise<NovaArticle>>();

const langUrl = (path: string) => `${LANG_API_BASE.replace(/\/$/, "")}${path}`;

const canUseLang = (locale: NewsLocale) => locale !== "en" && Boolean(LANG_PUBLIC_TOKEN && LANG_TARGETS[locale]);

const readLangJson = async <T>(response: Response, label: string): Promise<T> => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(`${label} failed ${response.status}: ${JSON.stringify(data).slice(0, 400)}`);
  }
  return data as T;
};

const langHeaders = () => ({
  "content-type": "application/json",
  "x-lang-site-id": LANG_SITE_ID,
  "x-lang-public-token": LANG_PUBLIC_TOKEN
});

const lastNamedPathSegment = (path: string[]) => {
  for (let index = path.length - 1; index >= 0; index -= 1) {
    const segment = path[index] || "";
    if (!/^\d+$/.test(segment)) return segment;
  }
  return "";
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === "object" && !Array.isArray(value));

const isTranslatableField = (field: string, value: string) => {
  if (!value || value.length > 5000) return false;
  if (/^https?:\/\//i.test(value)) return false;
  if (!/[a-z]/i.test(value)) return false;
  if (/^[a-z0-9_-]{8,}$/i.test(value) && !/\s/.test(value)) return false;
  return /^(title|headline|description|summary|body|text|heading|subheading|label|alt|caption|name|kicker|dek|content|quote|question|answer|whyItMatters|impact|context|implication|currentEvent|baseline|note|notes|value|rawValue|takeaway|cta|lead|thesis|items|paragraphs|bullets|signal|why|unit|axis|interpretation|detail)$/i.test(
    field
  );
};

const shouldSkipArticleField = (field: string) =>
  /^(id|siteId|articleId|sourceArticleId|sourceItemId|clusterId|slug|sourceSlug|canonicalUrl|url|publicUrl|r2Key|hash|status|createdAt|updatedAt|publishedAt|fetchedAt|generatedAt|translatedAt|provider|model|sourceRef|sourceRefs|sourceUrl|sourceUrls|sources|citations|schema|metadata|prompt|generationPrompt)$/i.test(
    field
  );

const collectTranslatableStrings = (value: unknown, path: string[] = [], items: TextItem[] = [], seen = new Set<string>()) => {
  if (items.length >= 500) return items;

  if (typeof value === "string") {
    const field = lastNamedPathSegment(path);
    if (!isTranslatableField(field, value)) return items;
    const text = value.trim();
    const key = path.join(".");
    if (!text || seen.has(key)) return items;
    seen.add(key);
    items.push({ key, text });
    return items;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => collectTranslatableStrings(item, [...path, String(index)], items, seen));
    return items;
  }

  if (isRecord(value)) {
    for (const [key, child] of Object.entries(value)) {
      if (shouldSkipArticleField(key)) continue;
      collectTranslatableStrings(child, [...path, key], items, seen);
    }
  }

  return items;
};

const setDeepValue = (target: unknown, path: string[], value: string) => {
  let current = target;
  for (let index = 0; index < path.length - 1; index += 1) {
    const segment = path[index];
    current = Array.isArray(current) ? current[Number(segment)] : isRecord(current) ? current[segment] : undefined;
    if (current === undefined || current === null) return;
  }

  const last = path[path.length - 1];
  if (Array.isArray(current)) current[Number(last)] = value;
  else if (isRecord(current)) current[last] = value;
};

const cloneJson = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const langTranslate = async (items: TextItem[], locale: NewsLocale) => {
  const targetLanguage = LANG_TARGETS[locale];
  if (!targetLanguage || items.length === 0) return new Map<string, string>();

  const translations = new Map<string, string>();
  for (let index = 0; index < items.length; index += TEXTS_PER_REQUEST) {
    const chunk = items.slice(index, index + TEXTS_PER_REQUEST);
    const response = await fetch(langUrl("/translate"), {
      method: "POST",
      headers: langHeaders(),
      body: JSON.stringify({
        siteId: LANG_SITE_ID,
        token: LANG_PUBLIC_TOKEN,
        sourceLanguage: "English",
        targetLanguage,
        texts: chunk
      })
    });
    const data = await readLangJson<LangTranslateResponse>(response, `LANG translate ${targetLanguage}`);
    for (const item of data.translations || []) {
      if (item.key && item.translatedText) translations.set(item.key, item.translatedText);
    }
  }
  return translations;
};

const applyLangTranslations = <T>(source: T, fallback: T, locale: NewsLocale): Promise<T> =>
  (async () => {
    if (!canUseLang(locale)) return fallback;
    const items = collectTranslatableStrings(source);
    if (!items.length) return fallback;

    try {
      const translations = await langTranslate(items, locale);
      const translated = cloneJson(fallback);
      for (const item of items) {
        const value = translations.get(item.key);
        if (value) setDeepValue(translated, item.key.split("."), normalizeSentenceStarts(value, locale));
      }
      return translated;
    } catch (error) {
      console.warn(error instanceof Error ? error.message : "LANG translate failed");
      return fallback;
    }
  })();

const fetchTranslatedArticle = async (article: NovaArticle, locale: NewsLocale) => {
  const targetLanguage = LANG_TARGETS[locale];
  const slugCode = targetLanguage ? LANG_SLUGS[targetLanguage] : "";
  if (!targetLanguage || !slugCode) return undefined;

  const sourceSlug = article.slug;
  const translatedSlug = `${sourceSlug}-${slugCode}`;
  const key = `${targetLanguage}:${translatedSlug}`;
  const existing = translatedArticlePromises.get(key);
  if (existing) return existing;

  const promise = (async () => {
    const url = new URL(langUrl(`/articles/translations/${encodeURIComponent(targetLanguage)}/${encodeURIComponent(translatedSlug)}`));
    url.searchParams.set("siteId", LANG_SITE_ID);
    url.searchParams.set("token", LANG_PUBLIC_TOKEN);
    const response = await fetch(url);
    if (response.status === 404) return undefined;
    const data = await readLangJson<LangArticleResponse>(response, `LANG article ${translatedSlug}`);
    if (!data.article) return undefined;
    return {
      ...data.article,
      id: article.id,
      slug: sourceSlug,
      status: article.status,
      category: article.category,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      meta: {
        ...data.article.meta,
        image: article.meta?.image,
        datePublished: article.meta?.datePublished,
        dateModified: article.meta?.dateModified
      }
    } as NovaArticle;
  })().catch((error) => {
    console.warn(error instanceof Error ? error.message : "LANG translated article fetch failed");
    return undefined;
  });

  translatedArticlePromises.set(key, promise);
  return promise;
};

export const translateNovaArticleSummaryWithLang = async (
  article: NovaArticleSummary,
  locale: NewsLocale
): Promise<NovaArticleSummary> => {
  const key = `${locale}:${article.id || article.slug}`;
  const existing = summaryPromises.get(key);
  if (existing) return existing;

  const promise = (async () => {
    const fallback = translateNovaArticleSummary(article, locale);
    return applyLangTranslations(article, fallback, locale);
  })();
  summaryPromises.set(key, promise);
  return promise;
};

export const translateNovaArticleWithLang = async (article: NovaArticle, locale: NewsLocale): Promise<NovaArticle> => {
  const key = `${locale}:${article.id || article.slug}`;
  const existing = articlePromises.get(key);
  if (existing) return existing;

  const promise = (async () => {
    const fallback = translateNovaArticle(article, locale);
    if (!canUseLang(locale)) return fallback;

    const publishedArticle = await fetchTranslatedArticle(article, locale);
    if (publishedArticle) return publishedArticle;

    return applyLangTranslations(article, fallback, locale);
  })();
  articlePromises.set(key, promise);
  return promise;
};
