import { localizePath } from "@/data/i18n";
import { translateNovaArticle, translateNovaArticleSummary } from "@/data/nova-news-translations";
import type { Locale } from "@/data/i18n";

const NOVA_API_BASE = import.meta.env.NOVA_PUBLIC_API_BASE || "https://nova.alfarank.com/api/public";
const NOVA_SITE_ID = import.meta.env.NOVA_ALFARANK_SITE_ID || "alfarank-site";
const NOVA_PUBLIC_TOKEN =
  import.meta.env.NOVA_ALFARANK_PUBLIC_TOKEN || "public-d9d90ebc1d6748678d349cc1ab8918db";

export type NewsLocale = Extract<Locale, "en" | "ro" | "ru">;

export type NovaChartDatum = {
  label?: string;
  value?: number | string;
  rawValue?: string;
};

export type NovaBlock = {
  type: string;
  payload: Record<string, unknown>;
};

export type NovaArticleSummary = {
  id: string;
  title: string;
  slug: string;
  status?: string;
  articleType?: string;
  category?: string;
  seo?: {
    title?: string;
    description?: string;
    tags?: string[];
  };
  meta?: {
    headline?: string;
    description?: string;
    datePublished?: string;
    dateModified?: string;
    keywords?: string[];
    image?: string;
    aiDisclosure?: string;
  };
  publishedAt?: string;
  updatedAt?: string;
};

export type NovaArticle = NovaArticleSummary & {
  blocks: NovaBlock[];
  facts?: {
    numbers?: string[];
    claims?: string[];
    entities?: string[];
    dates?: string[];
  };
};

type NovaListResponse = {
  articles?: NovaArticleSummary[];
};

type NovaArticleResponse = {
  article?: NovaArticle;
};

const novaUrl = (path: string) => {
  const url = new URL(`${NOVA_API_BASE.replace(/\/$/, "")}${path}`);
  url.searchParams.set("siteId", NOVA_SITE_ID);
  url.searchParams.set("token", NOVA_PUBLIC_TOKEN);
  return url;
};

export const newsPath = (path: string, locale: NewsLocale = "en") => localizePath(path, locale);

export const normalizeArticleUrl = (slug: string, locale: NewsLocale = "en") =>
  `https://alfarank.com${newsPath(`/news/${slug}/`, locale)}`;

export async function getNovaArticleSummaries(locale: NewsLocale = "en") {
  const response = await fetch(novaUrl("/articles"));
  if (!response.ok) {
    throw new Error(`NOVA articles request failed: ${response.status}`);
  }

  const data = (await response.json()) as NovaListResponse;
  return (data.articles || [])
    .filter((article) => article.slug && article.status === "published")
    .map((article) => translateNovaArticleSummary(article, locale));
}

export async function getNovaArticle(slug: string, locale: NewsLocale = "en") {
  const response = await fetch(novaUrl(`/articles/${encodeURIComponent(slug)}`));
  if (!response.ok) {
    throw new Error(`NOVA article request failed for ${slug}: ${response.status}`);
  }

  const data = (await response.json()) as NovaArticleResponse;
  return data.article ? translateNovaArticle(data.article, locale) : undefined;
}

export function articleTitle(article: NovaArticleSummary) {
  return article.meta?.headline || article.seo?.title || article.title;
}

export function articleDescription(article: NovaArticleSummary) {
  return article.meta?.description || article.seo?.description || "";
}

export function articleDate(article: NovaArticleSummary) {
  return article.meta?.datePublished || article.publishedAt || article.updatedAt || "";
}

export function articleImage(article: NovaArticleSummary) {
  return article.meta?.image || "";
}

export function articleCategory(article: NovaArticleSummary, locale: NewsLocale = "en") {
  const labels: Record<NewsLocale, Record<string, string>> = {
    en: {},
    ro: {
      "ai-automation": "automatizare AI",
      "digital-operations": "operatiuni digitale",
      "data-systems": "sisteme de date",
      "web-platforms": "platforme web",
      automation: "automatizare"
    },
    ru: {
      "ai-automation": "AI-автоматизация",
      "digital-operations": "цифровые операции",
      "data-systems": "системы данных",
      "web-platforms": "веб-платформы",
      automation: "автоматизация"
    }
  };

  if (!article.category) return "";
  return labels[locale][article.category] ?? article.category.replaceAll("-", " ");
}

export function formatArticleDate(value?: string, locale: NewsLocale = "en") {
  if (!value) return "";
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export function newsArticleSchema(article: NovaArticle, locale: NewsLocale = "en") {
  const title = articleTitle(article);
  const description = articleDescription(article);
  const url = normalizeArticleUrl(article.slug, locale);
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    mainEntityOfPage: url,
    url,
    datePublished: article.meta?.datePublished || article.publishedAt,
    dateModified: article.meta?.dateModified || article.updatedAt || article.publishedAt,
    author: {
      "@type": "Person",
      name: "Andrei",
      url: `https://alfarank.com${newsPath("/news/authors/andrei/", locale)}`
    },
    publisher: {
      "@type": "Organization",
      name: "AlfaRank",
      url: "https://alfarank.com",
      logo: {
        "@type": "ImageObject",
        url: "https://alfarank.com/og-image.svg"
      }
    },
    isAccessibleForFree: true,
    keywords: article.meta?.keywords || article.seo?.tags || [],
    image: article.meta?.image ? [article.meta.image] : undefined
  };
}
