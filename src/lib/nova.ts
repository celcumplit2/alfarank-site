import { localizePath } from "@/data/i18n";
import { normalizeSentenceStarts, translateNovaArticle, translateNovaArticleSummary } from "@/data/nova-news-translations";
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

const generatedHeadingOverrides: Record<string, string> = {
  "RPA Acceleration: Efficiency, Complexity, and Decision Risks for Digital Operators": "RPA Acceleration Risks",
  "AI-Powered Workflow Automation: Opportunity and Uncertainty for Digital Operators": "Automation Opportunity and Uncertainty",
  "AlphaSense Enterprise Metrics: Funding vs. Revenue vs. Customer Penetration": "AlphaSense Metrics Snapshot",
  "Procurement Process Improvements with Agentic AI vs. Manual/Legacy Methods": "Procurement Automation Gains",
  "Operator Decisions: Where to Automate, Where to Retain Human-in-the-Loop": "Automation Decision Boundaries",
  "Architecture Shift: From Fragmented Collection to Automated AI Readiness": "Architecture Shift",
  "Practical Steps and Decision Signals for Content Workflow Operators": "Workflow Decision Signals",
  "Pega's AI Platform Overhaul: A New Playbook for Workflow Automation": "Pega Workflow Automation Playbook",
  "Workflow Automation Market Timeline and Maturity Shift (2025–2031)": "Automation Market Timeline",
  "Analysis: Two-Way Native Integrations Rewrite the B2B Workflow Map": "B2B Workflow Map",
  "Updating Decision Models: Autonomous and Assistive AI in the SOC": "SOC Decision Models",
  "AI Automation and Workflow Market Adoption Snapshot (2025–2031)": "AI Workflow Adoption Snapshot",
  "Key Workflow Upgrades from RoboAgent & Brian Moses Partnership": "RoboAgent Workflow Upgrades",
  "KnowledgeLake Milestones: User Scale and Industry Recognition": "KnowledgeLake Milestones",
  "How to Rethink AI Integration in Content-Driven SOC Workflows": "Rethinking SOC AI Integration",
  "Historical Sequence: From Chatbots to Data-Layered Automation": "From Chatbots to Data Layers"
};

const articleHeadingTopics: Record<string, Record<NewsLocale, string>> = {
  "mitesco-roboagent-brian-moses-ai-coaching-operator-playbook": {
    en: "Mitesco RoboAgent coaching",
    ro: "Coachingul RoboAgent Mitesco",
    ru: "Сделка Mitesco и RoboAgent"
  },
  "knowledgelake-ceo-appointment-timeline-impact-analysis": {
    en: "KnowledgeLake CEO transition",
    ro: "Tranzitia CEO KnowledgeLake",
    ru: "Смена CEO KnowledgeLake"
  },
  "intezer-soc-operating-layer-enterprise-ai-agent-adoption": {
    en: "Intezer SOC operating layer",
    ro: "Stratul SOC Intezer",
    ru: "SOC-слой Intezer"
  },
  "digicode-ai-procurement-multi-agent-decision": {
    en: "Digicode procurement agents",
    ro: "Agentii de achizitii Digicode",
    ru: "Агенты закупок Digicode"
  },
  "alphasense-ai-workflow-opportunity-risk-2026": {
    en: "AlphaSense AI funding",
    ro: "Finantarea AI AlphaSense",
    ru: "AI-раунд AlphaSense"
  },
  "ai-saas-workflow-actor-productivity-governance-risk": {
    en: "SaaS workflow actors",
    ro: "SaaS ca actor de workflow",
    ru: "SaaS как участник workflow"
  },
  "databricks-genie-one-ai-automation-risk-opportunity": {
    en: "Databricks Genie One",
    ro: "Databricks Genie One",
    ru: "Databricks Genie One"
  },
  "pega-ai-platform-costs-governance-integration-analysis": {
    en: "Pega AI pricing shift",
    ro: "Schimbarea AI Pega",
    ru: "AI-сдвиг Pega"
  },
  "ai-development-enterprise-workflow-judgment-market-analysis-2026": {
    en: "AI development bottlenecks",
    ro: "Blocajele dezvoltarii AI",
    ru: "Узкие места AI-разработки"
  },
  "servicenow-ai-workflow-partnerships-digital-operations-steps": {
    en: "ServiceNow AI alliances",
    ro: "Aliantele AI ServiceNow",
    ru: "AI-альянсы ServiceNow"
  },
  "rpa-growth-risk-digital-ops-analysis": {
    en: "RPA market surge",
    ro: "Cresterea pietei RPA",
    ru: "Рост рынка RPA"
  },
  "cloudflare-acquires-voidzero-operator-toolchain-impact": {
    en: "Cloudflare VoidZero deal",
    ro: "Acordul Cloudflare VoidZero",
    ru: "Сделка Cloudflare VoidZero"
  },
  "natgashub-databricks-integration-pipeline-data-ai-governance-risks": {
    en: "NatGasHub Databricks data flow",
    ro: "Fluxul NatGasHub Databricks",
    ru: "Поток данных NatGasHub Databricks"
  },
  "enterprise-agentic-ai-timeline-data-foundations": {
    en: "Enterprise agentic AI",
    ro: "AI agentic in enterprise",
    ru: "Агентный AI в enterprise"
  },
  "zoominfo-konnectify-two-way-integration-b2b-workflow-timeline": {
    en: "ZoomInfo Konnectify integration",
    ro: "Integrarea ZoomInfo Konnectify",
    ru: "Интеграция ZoomInfo Konnectify"
  }
};

type HeadingTemplate = Record<NewsLocale, (topic: string) => string>;

const articleSectionHeadingOverrides: Record<string, Record<string, Record<NewsLocale, string>>> = {
  "mitesco-roboagent-brian-moses-ai-coaching-operator-playbook": {
    Impact: {
      en: "How the RoboAgent deal changes adoption",
      ro: "Cum schimba acordul adoptarea RoboAgent",
      ru: "Как сделка меняет внедрение RoboAgent"
    },
    Consequences: {
      en: "What changes for agent workflows",
      ro: "Ce se schimba in workflow-urile agentilor",
      ru: "Что меняется в рабочих процессах агентов"
    },
    "Data points": {
      en: "Data behind the coaching layer",
      ro: "Date despre stratul de coaching",
      ru: "Данные о coaching-слое RoboAgent"
    },
    "Comparison matrix": {
      en: "Criteria for evaluating the partnership",
      ro: "Criterii pentru evaluarea parteneriatului",
      ru: "Критерии оценки партнерства"
    },
    "Decision matrix": {
      en: "Criteria for evaluating the partnership",
      ro: "Criterii pentru evaluarea parteneriatului",
      ru: "Критерии оценки партнерства"
    },
    "Watch next": {
      en: "Signals to monitor after launch",
      ro: "Semnale de urmarit dupa lansare",
      ru: "Сигналы после запуска"
    },
    "What to watch next": {
      en: "Signals to monitor after launch",
      ro: "Semnale de urmarit dupa lansare",
      ru: "Сигналы после запуска"
    },
    Timeline: {
      en: "Mitesco and Brian Moses rollout timeline",
      ro: "Cronologia lansarii Mitesco si Brian Moses",
      ru: "Хронология запуска Mitesco и Brian Moses"
    }
  }
};

const headingTemplates: Record<string, HeadingTemplate> = {
  "Why it matters": {
    en: (topic) => `Why it matters for ${topic}`,
    ro: (topic) => `De ce conteaza ${topic}`,
    ru: (topic) => `Почему это важно для ${topic}`
  },
  Impact: {
    en: () => "Workflow impact",
    ro: () => "Impact asupra workflow-ului",
    ru: () => "Влияние на рабочие процессы"
  },
  Context: {
    en: (topic) => `Context behind ${topic}`,
    ro: (topic) => `Context pentru ${topic}`,
    ru: (topic) => `Контекст вокруг ${topic}`
  },
  Consequences: {
    en: () => "Operational consequences",
    ro: () => "Consecinte operationale",
    ru: () => "Операционные последствия"
  },
  "Data points": {
    en: () => "Key data behind the update",
    ro: () => "Date cheie din actualizare",
    ru: () => "Ключевые данные обновления"
  },
  "Evidence-backed metrics": {
    en: () => "Evidence-backed metrics",
    ro: () => "Metrici verificate",
    ru: () => "Проверенные метрики"
  },
  "Decision matrix": {
    en: () => "Decision criteria",
    ro: () => "Criterii de decizie",
    ru: () => "Критерии решения"
  },
  "Comparison matrix": {
    en: () => "Comparison criteria",
    ro: () => "Criterii de comparatie",
    ru: () => "Критерии сравнения"
  },
  Scenarios: {
    en: () => "Possible outcomes",
    ro: () => "Scenarii posibile",
    ru: () => "Возможные сценарии"
  },
  "Watch next": {
    en: () => "Signals to watch",
    ro: () => "Semnale de urmarit",
    ru: () => "Что отслеживать"
  },
  "What to watch next": {
    en: () => "Signals to watch",
    ro: () => "Semnale de urmarit",
    ru: () => "Что отслеживать"
  },
  Timeline: {
    en: () => "Timeline",
    ro: () => "Cronologie",
    ru: () => "Хронология"
  },
  "Reported data behind the story": {
    en: () => "Source data behind the story",
    ro: () => "Date din surse",
    ru: () => "Данные источников"
  },
  "Numbers behind the shift": {
    en: () => "Numbers behind the shift",
    ro: () => "Cifrele schimbarii",
    ru: () => "Цифры сдвига"
  },
  "Market context at a glance": {
    en: () => "Market context at a glance",
    ro: () => "Context de piata",
    ru: () => "Рыночный контекст"
  }
};

const normalizedHeadingTranslations: Record<string, Partial<Record<NewsLocale, string>>> = {
  "RPA Acceleration Risks": {
    ro: "Riscurile accelerarii RPA",
    ru: "Риски ускорения RPA"
  },
  "Automation Opportunity and Uncertainty": {
    ro: "Oportunitate si incertitudine in automatizare",
    ru: "Возможности и неопределенность автоматизации"
  },
  "AlphaSense Metrics Snapshot": {
    ro: "Instantaneu al metricilor AlphaSense",
    ru: "Сводка метрик AlphaSense"
  },
  "Procurement Automation Gains": {
    ro: "Castiguri din automatizarea achizitiilor",
    ru: "Эффект автоматизации закупок"
  },
  "Automation Decision Boundaries": {
    ro: "Limite de decizie pentru automatizare",
    ru: "Границы решений по автоматизации"
  },
  "Architecture Shift": {
    ro: "Schimbare de arhitectura",
    ru: "Архитектурный сдвиг"
  },
  "Workflow Decision Signals": {
    ro: "Semnale pentru decizie",
    ru: "Сигналы для принятия решений"
  },
  "Operator Decision Signals": {
    ro: "Semnale pentru decizie",
    ru: "Сигналы для принятия решений"
  },
  "Pega Workflow Automation Playbook": {
    ro: "Playbook Pega pentru automatizarea workflow",
    ru: "Playbook Pega для автоматизации workflow"
  },
  "Automation Market Timeline": {
    ro: "Cronologia pietei de automatizare",
    ru: "Хронология рынка автоматизации"
  },
  "B2B Workflow Map": {
    ro: "Harta workflow B2B",
    ru: "Карта B2B workflow"
  },
  "SOC Decision Models": {
    ro: "Modele de decizie SOC",
    ru: "Модели решений SOC"
  },
  "AI Workflow Adoption Snapshot": {
    ro: "Instantaneu al adoptarii workflow AI",
    ru: "Сводка внедрения AI workflow"
  },
  "RoboAgent Workflow Upgrades": {
    ro: "Upgrade-uri workflow RoboAgent",
    ru: "Улучшения workflow RoboAgent"
  },
  "KnowledgeLake Milestones": {
    ro: "Repere KnowledgeLake",
    ru: "Вехи KnowledgeLake"
  },
  "Rethinking SOC AI Integration": {
    ro: "Regandirea integrarii AI in SOC",
    ru: "Переосмысление AI-интеграции в SOC"
  },
  "From Chatbots to Data Layers": {
    ro: "De la chatbots la straturi de date",
    ru: "От чатботов к слоям данных"
  }
};

const compactHeadingTopic = (value: string) => {
  const topic = value
    .replace(/\s+\|\s+AlfaRank$/i, "")
    .split(/[—–-]/)[0]
    .split(":")[0]
    .replace(/\s+/g, " ")
    .trim();

  if (topic.length <= 42) return topic;
  return topic.split(/\s+/).slice(0, 6).join(" ");
};

const headingTopicForArticle = (article: NovaArticle, locale: NewsLocale) =>
  articleHeadingTopics[article.slug]?.[locale] ?? compactHeadingTopic(articleTitle(article));

const personalizedHeading = (original: unknown, topic: string, locale: NewsLocale, articleSlug = "") => {
  if (typeof original !== "string") return "";
  const key = generatedHeadingOverrides[original] ?? original;
  const articleOverride = articleSectionHeadingOverrides[articleSlug]?.[key]?.[locale];
  if (articleOverride) return articleOverride;
  const template = headingTemplates[key];
  return template ? template[locale](topic) : "";
};

const translatedNormalizedHeading = (original: unknown, locale: NewsLocale) => {
  if (locale === "en" || typeof original !== "string") return "";
  const key = generatedHeadingOverrides[original] ?? original;
  return normalizedHeadingTranslations[key]?.[locale] ?? "";
};

const personalizeHeadingValue = (
  translatedValue: unknown,
  sourceValue: unknown,
  topic: string,
  locale: NewsLocale,
  articleSlug = "",
  key = ""
): unknown => {
  if (typeof translatedValue === "string") {
    if (key === "heading" || key === "title") {
      return personalizedHeading(sourceValue, topic, locale, articleSlug) || translatedNormalizedHeading(sourceValue, locale) || translatedValue;
    }

    return translatedValue;
  }

  if (Array.isArray(translatedValue)) {
    const sourceItems = Array.isArray(sourceValue) ? sourceValue : [];
    return translatedValue.map((item, index) => personalizeHeadingValue(item, sourceItems[index], topic, locale, articleSlug, key));
  }

  if (translatedValue && typeof translatedValue === "object") {
    const sourceObject = sourceValue && typeof sourceValue === "object" ? (sourceValue as Record<string, unknown>) : {};
    return Object.fromEntries(
      Object.entries(translatedValue).map(([entryKey, entryValue]) => [
        entryKey,
        personalizeHeadingValue(entryValue, sourceObject[entryKey], topic, locale, articleSlug, entryKey)
      ])
    );
  }

  return translatedValue;
};

const personalizeArticleHeadings = (article: NovaArticle, sourceArticle: NovaArticle, locale: NewsLocale): NovaArticle => {
  const topic = headingTopicForArticle(article, locale);
  if (!topic) return article;

  return {
    ...article,
    blocks: article.blocks.map((block, index) => {
      const sourceBlock = sourceArticle.blocks[index];
      return {
        ...block,
        payload: personalizeHeadingValue(block.payload, sourceBlock?.payload, topic, locale, article.slug) as Record<string, unknown>
      };
    })
  };
};

const normalizeGeneratedHeadings = (value: unknown): unknown => {
  if (typeof value === "string") {
    return generatedHeadingOverrides[value] ?? value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => normalizeGeneratedHeadings(item));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, normalizeGeneratedHeadings(item)])
    );
  }

  return value;
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
  if (!data.article) return undefined;

  const normalizedArticle = normalizeGeneratedHeadings(data.article) as NovaArticle;
  const translatedArticle = translateNovaArticle(normalizedArticle, locale);
  return personalizeArticleHeadings(translatedArticle, normalizedArticle, locale);
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
  return normalizeSentenceStarts(labels[locale][article.category] ?? article.category.replaceAll("-", " "), locale);
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
