import {
  capabilities as baseCapabilities,
  company as baseCompany,
  home as baseHome,
  industries as baseIndustries,
  solutions as baseSolutions,
  systems as baseSystems,
  technologies as baseTechnologies
} from "@/data/site";
import type { PageItem } from "@/data/site";
import { landingOffers as baseLandingOffers } from "@/data/landing";
import type { LandingOffer } from "@/data/landing";
import { ruQualityOverrides } from "@/data/ru-overrides";
import { caseDirections } from "@/data/case-examples";

export const locales = ["en", "ro", "ru"] as const;
export const translatedLocales = ["ro", "ru"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ro: "RO",
  ru: "RU"
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  ro: "Romana",
  ru: "Русский"
};

export const localeOg: Record<Locale, string> = {
  en: "en_US",
  ro: "ro_MD",
  ru: "ru_MD"
};

export const isLocale = (value: string | undefined): value is Locale =>
  Boolean(value && locales.includes(value as Locale));

export const localePrefix = (locale: Locale) => (locale === "en" ? "" : `/${locale}`);

const localePathPattern = /^\/(ro|ru)(?=\/|$)/;

const normalizePath = (path: string) => {
  if (!path) return "/";
  const clean = path.startsWith("/") ? path : `/${path}`;
  return clean.endsWith("/") || clean.includes(".") ? clean : `${clean}/`;
};

const splitPathSuffix = (href: string) => {
  const hashIndex = href.indexOf("#");
  const queryIndex = href.indexOf("?");
  const firstSuffixIndex = [hashIndex, queryIndex].filter((index) => index >= 0).sort((a, b) => a - b)[0];

  if (firstSuffixIndex === undefined) {
    return { path: href, suffix: "" };
  }

  return {
    path: href.slice(0, firstSuffixIndex),
    suffix: href.slice(firstSuffixIndex)
  };
};

export const stripLocaleFromPath = (path: string) => {
  const clean = normalizePath(path);
  const stripped = clean.replace(localePathPattern, "");
  return stripped || "/";
};

export const localeFromPath = (path: string): Locale => {
  const match = normalizePath(path).match(localePathPattern);
  return isLocale(match?.[1]) ? match[1] : "en";
};

export const localizePath = (href: string | undefined, locale: Locale) => {
  if (!href) return href ?? "";
  if (
    href.startsWith("#") ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  const { path, suffix } = splitPathSuffix(href);
  if (!path) return `${localePrefix(locale) || ""}/${suffix}`.replace("//", "/");

  const basePath = stripLocaleFromPath(path);
  const localized = locale === "en" ? basePath : `${localePrefix(locale)}${basePath === "/" ? "/" : basePath}`;
  return `${localized}${suffix}`;
};

export const localesForBaseRoute = (path: string): Locale[] => {
  const basePath = stripLocaleFromPath(path);
  return basePath.startsWith("/cases/") ? ["en", "ro", "ru"] : [...locales];
};

export const alternatePaths = (path: string) => {
  const basePath = stripLocaleFromPath(path);
  return localesForBaseRoute(basePath).map((locale) => ({
    locale,
    href: localizePath(basePath, locale)
  }));
};

export const staticBaseRoutes = [
  "/",
  "/capabilities/",
  "/solutions/",
  "/systems/",
  "/technologies/",
  "/industries/",
  "/about/",
  "/contact/",
  "/privacy-policy/",
  "/terms-and-conditions/",
  "/cookie-policy/",
  "/sitemap/",
  "/start-project/",
  "/partner-program/",
  "/start-project/thank-you/"
];

const caseBaseRoutes = () => [
  "/cases/",
  ...caseDirections.map((direction) => `/cases/${direction.slug}/`),
  ...caseDirections.flatMap((direction) =>
    direction.examples.map((example) => `/cases/${direction.slug}/${example.slug}/`)
  )
];

export const allBaseRoutes = () => [
  ...staticBaseRoutes,
  ...caseBaseRoutes(),
  ...baseCapabilities.map((item) => `/capabilities/${item.slug}/`),
  ...baseSolutions.map((item) => `/solutions/${item.slug}/`),
  ...baseSystems.map((item) => `/systems/${item.slug}/`),
  ...baseIndustries.map((item) => `/industries/${item.slug}/`),
  ...baseLandingOffers.map((item) => `/lp/${item.slug}/`)
];

export const allLocalizedRoutes = () =>
  allBaseRoutes().flatMap((route) => localesForBaseRoute(route).map((locale) => localizePath(route, locale)));

type Dictionary = Record<string, string>;

const ruCopy: Dictionary = {
  "AlfaRank designs and launches digital systems for business operations, content infrastructure, automation, and growth.":
    "AlfaRank проектирует и запускает цифровые системы для бизнес-процессов, контентной инфраструктуры, автоматизации и роста.",
  "AlfaRank designs and launches practical digital systems for companies that need automation, content infrastructure, data workflows, web platforms, and business integrations.":
    "AlfaRank создает практичные цифровые системы для компаний, которым нужны автоматизация, контентная инфраструктура, процессы данных, веб-платформы и бизнес-интеграции.",
  "Digital systems connected, automated, built to perform.": "Цифровые системы, соединенные, автоматизированные и готовые работать.",
  "Digital systems that connect, automate, and perform.": "Цифровые системы соединяют и автоматизируют.",
  "AlfaRank builds the infrastructure behind modern business workflows: web platforms, AI automation, SEO/content systems, data tools, e-commerce operations, and integrations.":
    "AlfaRank строит инфраструктуру для современных бизнес-процессов: веб-платформы, AI-автоматизацию, SEO и контентные системы, инструменты данных, e-commerce-операции и интеграции.",
  "The company works across connected technical directions. Each direction can be delivered as a standalone system or combined into a broader business platform.":
    "Компания работает в связанных технических направлениях. Каждое направление можно запустить как отдельную систему или объединить в более широкую бизнес-платформу.",
  "The site is organized around business problems first. Each solution describes the workflow, infrastructure, and output required to make the process repeatable.":
    "Сайт сначала собран вокруг бизнес-задач. Каждое решение показывает процесс, инфраструктуру и результат, которые делают работу повторяемой.",
  "Systems are presented as practical profiles: what the system does, how the workflow is structured, which modules are involved, and what business output it supports.":
    "Системы описаны как практичные профили: что система делает, как устроен процесс, какие модули нужны и какой бизнес-результат она поддерживает.",
  "Define the business problem and the operational result.": "Определить бизнес-проблему и операционный результат.",
  "Map the current website, content, CRM, data, or workflow layer.": "Разобрать текущий сайт, контент, CRM, данные или рабочий процесс.",
  "Design the system scope, modules, data inputs, and integrations.": "Спроектировать границы системы, модули, входные данные и интеграции.",
  "Build a prototype or first working version.": "Собрать прототип или первую рабочую версию.",
  "Launch, connect, measure, and improve the system.": "Запустить, подключить, измерить и улучшать систему.",
  "System design": "Проектирование системы",
  "Launch output": "Запускаемый результат",
  "Projects start from the process that needs to become faster, clearer, measurable, or automated.":
    "Проект начинается с процесса, который должен стать быстрее, понятнее, измеримее или автоматизированнее.",
  "The work becomes interfaces, content models, automations, APIs, data flows, dashboards, and publishing systems.":
    "Работа превращается в интерфейсы, модели контента, автоматизацию, API, потоки данных, панели и системы публикации.",
  "The first version must make a practical business output visible enough to improve.":
    "Первая версия должна сделать практический бизнес-результат достаточно видимым, чтобы его можно было улучшать.",
  "Projects move through scope, prototype, implementation, integration, launch, and measurement.":
    "Проект проходит через оценку объема, прототип, реализацию, интеграции, запуск и измерение результата.",
  "Start a project": "Начать проект",
  "Automation-first": "Сначала автоматизация",
  "Marketing + engineering": "Маркетинг + инженерия",
  "Measurable output": "Измеримый результат",

  "Capabilities are grouped by operating layer.": "Возможности сгруппированы по операционным слоям.",
  "Each group combines build directions with the solution routes where that capability usually becomes a working system.":
    "Каждая группа связывает направления работ с маршрутами решений, где эта возможность обычно становится рабочей системой.",
  "Each zone opens a capability page with practical modules, workflow use cases, and related system routes.":
    "Каждая зона ведет на страницу возможности с практическими модулями, сценариями применения и связанными системными маршрутами.",
  "Capability foundation": "Основа возможностей",
  "All build directions": "Все направления работ",
  "Use the full catalog when the system is already clear, or start from the layer groups above when the problem still needs routing.":
    "Полный каталог подходит, когда система уже понятна; группы слоев выше помогают направить задачу в правильный маршрут.",
  "Service navigation surface": "Навигационная поверхность услуг",
  "Choose the build zone": "Зона работ",
  "Scope the first zone": "Описать первую зону",
  "Automation and operations": "Автоматизация и операции",
  "Repeated work, lead handling, content production, reporting, routing, and review loops.":
    "Повторяющаяся работа, обработка лидов, производство контента, отчетность, маршрутизация и циклы проверки.",
  "Content and growth systems": "Контентные и growth-системы",
  "Publishing infrastructure, programmatic pages, SEO workflows, media production, and monitoring.":
    "Инфраструктура публикации, программные страницы, SEO-процессы, медиапроизводство и мониторинг.",
  "Data and commerce infrastructure": "Данные и commerce-инфраструктура",
  "Collection, normalization, scoring, feeds, catalog operations, dashboards, and alerts.":
    "Сбор, нормализация, оценка, фиды, операции каталога, панели и уведомления.",
  "Build directions online": "Направления работ активны",
  "Directions": "Направления",
  "Build map": "Карта направлений",
  "Buildable modules": "Собираемые модули",
  "A capability becomes useful when it connects real inputs, review states, integrations, and a visible business output.":
    "Возможность становится полезной, когда соединяет реальные входные данные, состояния проверки, интеграции и видимый бизнес-результат.",
  "How the capability becomes a working system": "Как возможность становится рабочей системой",
  "The build starts with the business process, then chooses the stack, review points, and integrations that make the workflow reliable.":
    "Сборка начинается с бизнес-процесса, затем выбираются стек, точки проверки и интеграции, которые делают процесс надежным.",
  "Best-fit use cases": "Лучшие сценарии применения",
  "Look for repeated work, clear ownership, and output that can be reviewed, routed, published, monitored, or improved.":
    "Ищем повторяющуюся работу, понятную ответственность и результат, который можно проверять, направлять, публиковать, мониторить или улучшать.",
  "Signal processor": "Процессор сигналов",
  "Collect. Normalize. Decide.": "Собрать. Нормализовать. Принять решение.",
  "Raw sources become clean records, matched entities, ranked signals, alerts, reports, and operational dashboards.":
    "Сырые источники превращаются в чистые записи, сопоставленные сущности, ранжированные сигналы, уведомления, отчеты и операционные панели.",
  "Automation tower": "Башня автоматизации",
  "Build the flow": "Собрать поток",
  "AI automation becomes valuable when the whole operating path is visible: capture, enrich, score, route, and follow up.":
    "AI-автоматизация дает ценность, когда виден весь операционный путь: захватить, обогатить, оценить, направить и довести до следующего действия.",
  "Start automation scope": "Описать автоматизацию",
  "AI Review Console": "Консоль AI-проверки",
  "Batch 04 / Ready for review": "Пакет 04 / готов к проверке",
  "Media workflow preview": "Превью медиапроцесса",
  "Creative production becomes a visible queue: brief, generate, review, render, publish, and learn.":
    "Креативное производство становится видимой очередью: бриф, генерация, проверка, рендер, публикация и обучение на результате.",
  "Capability system": "Система возможности",
  "Build a data/monitoring system": "Система данных и мониторинга",
  "Operational output": "Операционный результат",

  "First scope": "Первый объем",
  "Proof metric": "Метрика доказательства",
  "Risk removed": "Снятый риск",
  "Campaign fit": "Соответствие кампании",
  "Buyer pressure": "Давление покупателя",
  "Best next action": "Лучшее следующее действие",
  "Send the current workflow, traffic source, tools, and the first result you need. AlfaRank can scope the smallest useful version from that context.":
    "Текущий процесс, источник трафика, инструменты и первый нужный результат дают AlfaRank контекст для определения минимальной полезной версии.",
  "What the first build can include": "Что может войти в первую сборку",
  "This offer is specific enough for campaign traffic, but still flexible enough to shape around the buyer's current tools, constraints, and target outcome.":
    "Оффер достаточно конкретен для рекламного трафика, но остается гибким, чтобы подстроиться под текущие инструменты, ограничения и целевой результат покупателя.",
  "Incoming sources": "Входящие источники",
  "Lead input": "Вход лида",
  "Lead reactor": "Реактор лидов",
  "Source -> qualify -> route -> respond": "Источник -> квалификация -> маршрут -> ответ",
  "Activated outputs": "Активированные выходы",
  "Content factory rail": "Линия контент-фабрики",
  "Commerce control deck": "Пульт commerce-контроля",
  "Request system plan": "Запросить план системы",
  "Feed status": "Статус фида",
  "Catalog QA": "QA каталога",
  "Ops report": "Операционный отчет",
  "Platform blueprint": "Чертеж платформы",
  "Integration core": "Ядро интеграций",
  "One platform path for content, forms, lead data, reporting, and launch.":
    "Единый платформенный маршрут для контента, форм, данных лидов, отчетности и запуска.",
  "The page sells the before and after": "Страница продает состояние до и после",
  "For this campaign, the page needs to show what is broken now, what becomes structured, and which signals prove that the result is improving.":
    "Для этой кампании страница должна показать, что сейчас сломано, что становится структурированным и какие сигналы доказывают улучшение результата.",
  "Manual pressure": "Ручное давление",
  "A practical first scope": "Практичный первый объем",
  "This page turns the ad click into a scoped system request: clear inputs, build modules, launch output, and a reason to start.":
    "Страница превращает рекламный клик в запрос на систему: понятные входные данные, модули сборки, запускаемый результат и причина начать.",
  "Buyer questions": "Вопросы покупателя",
  "Before a lead asks": "До того как лид спросит",
  "Systems, tools, or integrations": "Системы, инструменты или интеграции",
  "Capture context": "Собрать контекст",
  "The request enters with source, offer, UTM, current system, and business pressure.":
    "Заявка приходит с источником, оффером, UTM, текущей системой и бизнес-давлением.",
  "Map scope": "Разложить объем",
  "Inputs, integrations, expected output, and first launch boundary are turned into a build path.":
    "Входные данные, интеграции, ожидаемый результат и граница первого запуска превращаются в маршрут сборки.",
  "Route next step": "Направить следующий шаг",
  "The project can be reviewed as a landing page, automation, system, platform, or data workflow.":
    "Проект можно рассмотреть как посадочную страницу, автоматизацию, систему, платформу или процесс данных.",
  "Intake reactor": "Реактор заявки",
  "Turn context into scope.": "Превратить контекст в объем.",
  "The form routes business pressure, current systems, desired output, and integrations into one project request.":
    "Форма собирает бизнес-давление, текущие системы, желаемый результат и интеграции в одну проектную заявку.",
  "What process needs to become faster, clearer, or more automated.":
    "Какой процесс должен стать быстрее, понятнее или автоматизированнее.",
  "What data, website, CRM, CMS, or internal system already exists.":
    "Какие данные, сайт, CRM, CMS или внутренняя система уже существуют.",
  "What output should be visible after the first implementation phase.":
    "Какой результат должен быть виден после первого этапа реализации.",
  "Which integrations, tools, or manual workflows should be connected.":
    "Какие интеграции, инструменты или ручные процессы нужно соединить.",
  "Content Automation Workflows is a system profile for companies that need repeatable content production without losing control over quality. The system combines topic structures, AI-assisted generation, enrichment, review, CMS publishing, and monitoring.":
    "Это профиль системы для компаний, которым нужно повторяемое производство контента без потери контроля качества. Система объединяет структуры тем, AI-генерацию, обогащение, проверку, публикацию в CMS и мониторинг.",
  "WordPress Tools is a system profile for turning WordPress into a structured business platform. The focus is on custom admin utilities, content models, publishing workflows, API connections, automation, and operational tools that sit inside or around WordPress.":
    "Это профиль системы, который превращает WordPress в структурированную бизнес-платформу. Фокус на кастомных админ-инструментах, моделях контента, процессах публикации, API-связях, автоматизации и операционных инструментах внутри или вокруг WordPress.",
  "Data/Audit/Ranking Systems is a profile for tools that transform raw data into evaluations, scores, rankings, reports, alerts, or operational decisions. These systems are useful when a business needs repeatable analysis instead of manual review.":
    "Это профиль инструментов, которые превращают сырые данные в оценки, скоринги, ранжирование, отчеты, уведомления и операционные решения. Такие системы нужны, когда бизнесу требуется повторяемый анализ вместо ручной проверки.",
  "Received": "Получено",
  "Mapped": "Разложено",
  "Scoped": "Оценено",
  "Request context and source tracking are stored.": "Контекст заявки и отслеживание источника сохранены.",
  "The workflow, system type, and expected output are reviewed.": "Процесс, тип системы и ожидаемый результат проходят проверку.",
  "A first launch path can be shaped from the submitted details.": "Из отправленных деталей можно собрать маршрут первого запуска.",
  "Request workflow": "Процесс заявки",
  "Review, map, scope.": "Проверить, разложить, оценить.",
  "The request is reviewed against system type, current workflow, feasibility, timeline, and implementation path.":
    "Заявка проверяется по типу системы, текущему процессу, реализуемости, срокам и маршруту внедрения.",
  "Next route": "Следующий маршрут",
  "Review possible build directions": "Посмотреть возможные направления работ",
  "Map the business problem": "Разложить бизнес-проблему",
  "Explore operating patterns": "Изучить операционные паттерны",
  "System type": "Тип системы",
  "Existing workflow": "Текущий процесс",
  "First launch scope": "Объем первого запуска",

  "capabilities": "возможностей",
  "solutions": "решений",
  "Automate repeated work": "Автоматизация повторяющейся работы",
  "AI, rules, review states, and connected actions for content, leads, reports, or internal operations.":
    "AI, правила, состояния проверки и связанные действия для контента, лидов, отчетов и внутренних операций.",
  "Lead Processing": "Обработка лидов",
  "Launch or rebuild a web platform": "Запустить или пересобрать веб-платформу",
  "Structured pages, product interfaces, dashboards, portals, MVPs, and integration-ready frontend systems.":
    "Структурированные страницы, продуктовые интерфейсы, панели, порталы, MVP и frontend-системы, готовые к интеграциям.",
  "Web Development": "Веб-разработка",
  "Upgrade Website": "Апгрейд сайта",
  "Scale content or SEO": "Масштабировать контент или SEO",
  "Topic data, templates, editorial QA, metadata, CMS publishing, and performance monitoring.":
    "Данные по темам, шаблоны, редакционная проверка, метаданные, публикация в CMS и мониторинг эффективности.",
  "Content Infrastructure": "Контентная инфраструктура",
  "Generate Content": "Генерация контента",
  "Publishing system": "Система публикации",
  "Track data, competitors, or rankings": "Отслеживать данные, конкурентов или позиции",
  "Scraping, APIs, normalization, scoring, dashboards, alerts, exports, and recurring reports.":
    "Сбор данных, API, нормализация, оценка, панели, уведомления, экспорты и регулярные отчеты.",
  "Data Systems": "Системы данных",
  "Monitoring System": "Система мониторинга",
  "Improve e-commerce operations": "Улучшить e-commerce-операции",
  "Product data, feeds, stock and price monitoring, catalog content, marketplaces, and analytics.":
    "Товарные данные, фиды, мониторинг остатков и цен, контент каталога, маркетплейсы и аналитика.",
  "E-commerce Profile": "E-commerce-профиль",
  "Connect WordPress, APIs, and tools": "Соединить WordPress, API и инструменты",
  "Custom CMS structures, CRM connections, publishing workflows, business automations, and admin tools.":
    "Кастомные структуры CMS, CRM-связи, процессы публикации, бизнес-автоматизация и админ-инструменты.",
  "Start Project": "Начать проект",
  "4 offer pages": "4 офферные страницы",
  "Lead intake and routing system": "Система приема и маршрутизации лидов",
  "AI-assisted content workflow": "AI-процесс производства контента",
  "Product data, feed, and monitoring system": "Система товарных данных, фидов и мониторинга",
  "Connected WordPress and CRM workflow": "Связанный процесс WordPress и CRM",
  "7 connected directions": "7 связанных направлений",
  "Workflows that run while you sleep": "Процессы, которые работают без ручного участия",
  "Web Platforms": "Веб-платформы",
  "Scalable websites and apps that perform": "Масштабируемые сайты и приложения, которые работают на результат",
  "Content Engine": "Контентный движок",
  "From idea to publish at machine speed": "От идеи до публикации на высокой скорости",
  "Media": "Медиа",
  "Media Flow": "Медиапоток",
  "Create. Distribute. Amplify.": "Создать. Распространить. Усилить.",
  "API Layer": "Слой API",
  "Connect systems. Expose capabilities": "Соединять системы. Открывать возможности",
  "Data Signals": "Сигналы данных",
  "Collect, normalize, turn into insight": "Собрать, нормализовать, превратить в вывод",
  "Commerce Ops": "Commerce-операции",
  "Operations that drive revenue": "Операции, которые двигают выручку",
  "Slow leads": "Медленные лиды",
  "Manual content": "Ручной контент",
  "Broken data": "Сломанные данные",
  "Qualified pipeline": "Квалифицированный pipeline",
  "Publish engine": "Движок публикации",
  "Live dashboards": "Живые панели",
  "12 sources": "12 источников",
  "logic layer": "слой логики",
  "QA ready": "готово к QA",
  "CRM ready": "готово к CRM",
  "CMS / AI / Data / APIs / Deploy": "CMS / AI / данные / API / деплой",
  "Project flow": "Процесс проекта",
  "How projects start": "Как начинаются проекты",
  "Every project begins with a concrete operational problem. The first goal is to define the system that should exist, not to force the business into a predefined service package.":
    "Каждый проект начинается с конкретной операционной проблемы. Первая цель - определить систему, которая должна появиться, а не втиснуть бизнес в заранее заданный пакет услуг.",

  "AI Automation": "AI-автоматизация",
  "Web & Product Development": "Веб- и продуктовая разработка",
  "SEO & Content Infrastructure": "SEO и контентная инфраструктура",
  "Data Systems & Scraping": "Системы данных и сбор данных",
  "E-commerce Systems": "E-commerce-системы",
  "Video & Media Automation": "Автоматизация видео и медиа",
  "WordPress & API Integrations": "WordPress и API-интеграции",
  "Generate More Content": "Генерация большего объема контента",
  "Automate Lead Processing": "Автоматизация обработки лидов",
  "Build Internal Tools": "Внутренние инструменты",
  "Launch a Digital Product": "Запуск цифрового продукта",
  "Upgrade an Existing Website": "Апгрейд существующего сайта",
  "Build a Data/Monitoring System": "Система данных и мониторинга",
  "Scale SEO Infrastructure": "Масштабирование SEO-инфраструктуры",
  "Content Automation Workflows": "Процессы автоматизации контента",
  "E-commerce System": "E-commerce-система",
  "WordPress Tools": "Инструменты WordPress",
  "Data/Audit/Ranking Systems": "Системы данных, аудита и ранжирования",
  "Service Businesses": "Сервисные компании",
  "E-commerce": "E-commerce",
  "Media & Content Projects": "Медиа и контентные проекты",
  "Travel": "Туризм",
  "Local Business": "Локальный бизнес",
  "SaaS / MVP": "SaaS / MVP",
  "Agencies": "Агентства",
  "Data-heavy Businesses": "Бизнесы с большим объемом данных",

  "AI workflows that reduce manual work, accelerate content and data operations, and connect business systems into repeatable processes.":
    "AI-процессы, которые сокращают ручную работу, ускоряют операции с контентом и данными и соединяют бизнес-системы в повторяемые процессы.",
  "Web platforms, product interfaces, dashboards, portals, MVPs, and operational tools built around business workflows.":
    "Веб-платформы, продуктовые интерфейсы, панели, порталы, MVP и операционные инструменты, собранные вокруг бизнес-процессов.",
  "Search and content systems based on data, templates, publishing workflows, and scalable site architecture.":
    "Поисковые и контентные системы на базе данных, шаблонов, процессов публикации и масштабируемой архитектуры сайта.",
  "Systems for collecting, normalizing, monitoring, auditing, and ranking business data from multiple sources.":
    "Системы для сбора, нормализации, мониторинга, аудита и ранжирования бизнес-данных из разных источников.",
  "Catalog, feed, content, pricing, stock, and integration infrastructure for e-commerce operations.":
    "Инфраструктура каталогов, фидов, контента, цен, остатков и интеграций для e-commerce-операций.",
  "Automated media workflows for video, content production, asset generation, and repeatable publishing processes.":
    "Автоматизированные медиа-процессы для видео, производства контента, генерации ассетов и повторяемой публикации.",
  "WordPress-based systems, custom integrations, API connections, publishing tools, and business automation layers.":
    "Системы на WordPress, кастомные интеграции, API-связи, инструменты публикации и слои бизнес-автоматизации.",
  "Build a content production system that turns topics, data, templates, and review workflows into publishable output.":
    "Создать систему производства контента, которая превращает темы, данные, шаблоны и редакционную проверку в готовый к публикации результат.",
  "Connect forms, CRM, enrichment, scoring, routing, notifications, and follow-up into one lead operating flow.":
    "Соединить формы, CRM, обогащение данных, оценку, маршрутизацию, уведомления и последующие действия в единый процесс обработки заявок.",
  "Replace spreadsheets and manual coordination with internal dashboards, databases, and workflow tools.":
    "Заменить таблицы и ручную координацию внутренними панелями, базами данных и рабочими инструментами.",
  "Build the first usable version of a product, portal, dashboard, or platform around a clear business workflow.":
    "Собрать первую рабочую версию продукта, портала, панели или платформы вокруг понятного бизнес-процесса.",
  "Modernize an existing site into a structured business system with better content, performance, integrations, and conversion paths.":
    "Превратить существующий сайт в структурированную бизнес-систему с лучшим контентом, скоростью, интеграциями и маршрутами конверсии.",
  "Collect, normalize, monitor, and report on business data from websites, APIs, feeds, files, or internal sources.":
    "Собирать, нормализовать, мониторить и показывать бизнес-данные из сайтов, API, фидов, файлов или внутренних источников.",
  "Build the site architecture, data structures, templates, and publishing workflows needed for scalable organic growth.":
    "Построить архитектуру сайта, структуры данных, шаблоны и процессы публикации для масштабируемого органического роста.",
  "A system profile for structured business workflows, content infrastructure, or productized operational modules.":
    "Профиль системы для структурированных бизнес-процессов, контентной инфраструктуры или продуктовых операционных модулей.",
  "AI, video, content, and media automation profile focused on repeatable generation and production workflows.":
    "Профиль AI, видео, контента и медиа-автоматизации для повторяемой генерации и производственного процесса.",
  "A workspace operating system for turning service delivery, content work, requests, and internal routines into one visible workflow.":
    "Операционная система рабочего пространства, которая собирает сервисную работу, контент, заявки и внутренние процессы в один видимый процесс.",
  "An AI media production system for turning briefs, scripts, assets, and templates into reviewed video or content outputs.":
    "AI-система медиапроизводства, которая превращает брифы, сценарии, ассеты и шаблоны в проверенные видео- и контент-результаты.",
  "A system profile for generating, reviewing, enriching, publishing, and monitoring content at scale.":
    "Профиль системы для генерации, проверки, обогащения, публикации и мониторинга контента в масштабе.",
  "Catalog, product content, feed, integration, and monitoring infrastructure for e-commerce operations.":
    "Инфраструктура каталога, товарного контента, фидов, интеграций и мониторинга для e-commerce-операций.",
  "Custom WordPress tools, API connections, content workflows, and admin utilities for business websites.":
    "Кастомные инструменты WordPress, API-связи, контентные процессы и админ-инструменты для бизнес-сайтов.",
  "Systems for collecting data, scoring entities, auditing assets, ranking results, and generating reports.":
    "Системы для сбора данных, оценки объектов, аудита материалов, ранжирования результатов и генерации отчетов.",
  "Lead systems, CRM flows, content infrastructure, websites, and internal tools.":
    "Системы заявок, CRM-потоки, контентная инфраструктура, сайты и внутренние инструменты.",
  "Catalog infrastructure, feeds, product content, pricing, analytics, and integrations.":
    "Инфраструктура каталогов, фиды, товарный контент, цены, аналитика и интеграции.",
  "Editorial workflows, content databases, programmatic publishing, and automation.":
    "Редакционные процессы, базы контента, программная публикация и автоматизация.",
  "Destination data, catalog structures, availability, scraping, and SEO infrastructure.":
    "Данные направлений, структуры каталогов, доступность, сбор данных и SEO-инфраструктура.",
  "Local landing infrastructure, lead automation, monitoring, and review/data workflows.":
    "Локальная посадочная инфраструктура, автоматизация заявок, мониторинг и процессы проверки данных.",
  "MVPs, dashboards, portals, onboarding flows, data models, and integrations.":
    "MVP, панели, порталы, онбординг, модели данных и интеграции.",
  "White-label systems, reporting automation, content production, and internal tooling.":
    "White-label-системы, автоматизация отчетности, производство контента и внутренние инструменты.",
  "Collection, normalization, monitoring, alerting, dashboards, and reporting systems.":
    "Системы сбора, нормализации, мониторинга, алертов, панелей и отчетности.",

  "Lead automation landing page": "Посадочная страница автоматизации заявок",
  "Content system landing page": "Посадочная страница контентной системы",
  "E-commerce operations landing page": "Посадочная страница e-commerce-операций",
  "WordPress integration landing page": "Посадочная страница WordPress-интеграции",
  "Automate lead processing before good requests go cold.": "Автоматизация обработки лидов до того, как хорошие заявки теряют скорость.",
  "Automate lead intake before requests go cold.": "Автоматизация приема заявок до потери интереса.",
  "Build an AI-assisted content workflow with editorial control.": "AI-assisted процесс производства контента с редакционным контролем.",
  "Build an AI content workflow with editorial control.": "AI-процесс контента с редакционным контролем.",
  "Turn product data, feeds, and catalog updates into one system.": "Товарные данные, фиды и обновления каталога объединяются в одну систему.",
  "Unify product data, feeds, and catalog updates.": "Единая система товарных данных, фидов и обновлений каталога.",
  "Connect WordPress forms, CRM, APIs, and internal workflow.": "Соедините формы WordPress, CRM, API и внутренний рабочий процесс.",
  "Connect WordPress, CRM, APIs, and workflows.": "Соедините WordPress, CRM, API и рабочие процессы.",
  "Request This System": "Запросить эту систему",
  "Related Solution": "Связанное решение",
  "Digital systems company": "Компания цифровых систем",
  "Start a Project": "Начать проект",
  "Explore Capabilities": "Изучить возможности",
  "View Solutions": "Смотреть решения",
  "View Capabilities": "Смотреть возможности",
  "All Systems": "Все системы",
  "All Industries": "Все индустрии",
  "Back to Home": "На главную",
  "Capabilities": "Возможности",
  "Solutions": "Решения",
  "Systems": "Системы",
  "Technologies": "Технологии",
  "Industries": "Индустрии",
  "Capability": "Возможность",
  "Solution": "Решение",
  "System profile": "Профиль системы",
  "Industry profile": "Профиль индустрии",
  "About AlfaRank": "О AlfaRank",
  "Request received": "Заявка получена",
  "Technical directions for building digital systems.": "Технические направления для создания цифровых систем.",
  "AlfaRank capabilities are organized around what the company can build, connect, automate, and launch.":
    "Возможности AlfaRank собраны вокруг того, что компания может построить, соединить, автоматизировать и запустить.",
  "Business problems translated into working systems.": "Бизнес-проблемы, переведенные в рабочие системы.",
  "Solution pages connect operational, marketing, content, and data problems to the infrastructure required to solve them.":
    "Страницы решений связывают операционные, маркетинговые, контентные и data-задачи с инфраструктурой, которая нужна для их решения.",
  "System and project profiles.": "Профили систем и проектов.",
  "This section is structured around systems, modules, workflows, outputs, and implementation logic instead of a generic portfolio grid.":
    "Этот раздел построен вокруг систем, модулей, рабочих процессов, результатов и логики реализации, а не вокруг обычной сетки портфолио.",
  "Digital systems for businesses with operational, content, data, and growth workflows.":
    "Цифровые системы для компаний с операционными, контентными, data- и growth-процессами.",
  "Digital systems by industry.": "Цифровые системы по отраслям.",
  "AlfaRank systems can be adapted to different industries when the business needs structured web platforms, automation, content infrastructure, integrations, or monitoring.":
    "Системы AlfaRank можно адаптировать под разные индустрии, когда бизнесу нужны структурированные веб-платформы, автоматизация, контентная инфраструктура, интеграции или мониторинг.",
  "The implementation layer behind AlfaRank systems.": "Слой реализации за системами AlfaRank.",
  "The stack is selected for practical delivery: clear content models, stable deployment, API integration, automation, data processing, and measurable operations.":
    "Стек выбирается под практичную поставку: понятные модели контента, стабильный деплой, API-интеграции, автоматизация, обработка данных и измеримые операции.",
  "Practical system development for business output.": "Практичная разработка систем под бизнес-результат.",
  "AlfaRank combines marketing logic, engineering, automation, content infrastructure, and data workflows to build digital systems that work inside real business processes.":
    "AlfaRank соединяет маркетинговую логику, инженерную разработку, автоматизацию, контентную инфраструктуру и процессы данных, чтобы строить цифровые системы внутри реальных бизнес-процессов.",
  "Define the system your business needs.": "Опишите систему, которая нужна вашему бизнесу.",
  "Use the form to describe the project type, current setup, business problem, desired result, and optional timeline or budget.":
    "Через форму опишите тип проекта, текущую конфигурацию, бизнес-проблему, желаемый результат и при необходимости сроки или бюджет.",
  "Your project request has been submitted.": "Ваша заявка на проект отправлена.",
  "AlfaRank will review the project type, business problem, current system, and desired result before the next step.":
    "AlfaRank посмотрит тип проекта, бизнес-проблему, текущую систему и желаемый результат перед следующим шагом.",
  "Data": "Данные",
  "Syncing": "Синхронизация",
  "Signals": "Сигналы",
  "Active": "Активно",
  "Automation": "Автоматизация",
  "Content": "Контент",
  "Published": "Опубликовано",
  "SEO engine": "SEO-движок",
  "Connected": "Соединено",
  "Lead flow": "Поток лидов",
  "APIs": "API",
  "Live": "Активно",
  "Reports": "Отчеты",
  "Updated": "Обновлено",
  "Decisions": "Решения",
  "7 directions": "7 направлений",
  "Launchable": "Готово к запуску",
  "Ready": "Готово"
  ,
  "Route console": "Консоль маршрута",
  "Industry system core": "Ядро индустриальной системы",
  "System fit": "Совпадение с системой",
  "Where this system connects next": "Куда эта система подключается дальше",
  "Landing-page development": "Развитие посадочной страницы",
  "How traffic becomes scoped demand": "Как трафик превращается в понятный спрос",
  "Landing angle": "Угол посадочной страницы",
  "Offer route": "Маршрут оффера",
  "Proof signals": "Сигналы доказательств",
  "Angle": "Угол",
  "Route": "Маршрут",
  "Evidence": "Доказательство",
  "Next conversion step": "Следующий шаг конверсии",
  "Scope an industry system": "Запросить систему для индустрии",
  "Scope Industry System": "Запросить систему для индустрии",
  "Related systems": "Связанные системы",
  "Related areas": "Связанные направления",
  "Business output": "Бизнес-результат",
  "What this covers": "Что входит",
  "What this solution covers": "Что входит в решение",
  "Expected output": "Ожидаемый результат",
  "Relevant capabilities": "Релевантные возможности",
  "System modules": "Системные модули",
  "Implementation logic": "Логика реализации",
  "Implementation path": "Путь реализации",
  "Implementation options": "Варианты реализации",
  "Use cases": "Сценарии применения",
  "Lead-generation proof": "Доказательства для лидогенерации",
  "System blueprint": "Чертеж системы",
  "System overview": "Обзор системы",
  "Outputs": "Результаты",
  "Core modules": "Ключевые модули",
  "Workflow": "Рабочий процесс",
  "Related build paths": "Связанные пути сборки",
  "All current industry contexts": "Все текущие индустриальные контексты",
  "Industry catalog": "Каталог индустрий",
  "Priority industry routes": "Приоритетные маршруты индустрий",
  "Technology matrix": "Технологическая матрица",
  "Core stack": "Ключевой стек",
  "Selection logic": "Логика выбора",
  "Operating principles": "Операционные принципы",
  "Business problem to working system.": "От бизнес-проблемы к рабочей системе.",
  "Project intake": "Вводные по проекту",
  "Good project inputs": "Хорошие вводные по проекту",
  "Quick project signal": "Быстрый сигнал по проекту",
  "Send a short request first.": "Короткая заявка как первый шаг.",
  "If the full brief feels early, send the pressure point and contact. The first reply can turn it into scope.":
    "Если полный бриф пока рано заполнять, достаточно точки давления и контакта. Первый ответ превратит это в объем работ.",
  "Direct channels": "Прямые каналы",
  "Use a direct channel if the request is urgent.": "Для срочного запроса есть прямой канал.",
  "Telegram": "Telegram",
  "WhatsApp": "WhatsApp",
  "What should become faster or clearer?": "Что должно стать быстрее или понятнее?",
  "Send Quick Request": "Отправить короткую заявку",
  "Open full brief": "Открыть полный бриф",
  "After the request": "После заявки",
  "What happens next": "Что будет дальше",
  "Response target": "Цель по ответу",
  "1 business day": "1 рабочий день",
  "The first reply confirms the pressure point, missing context, and the smallest useful next step.":
    "Первый ответ подтвердит точку давления, недостающий контекст и самый полезный следующий шаг.",
  "Routed request": "Маршрутизированная заявка",
  "Score, route, next action": "Оценка, маршрут, действие",
  "Source, offer, priority, and next action stay attached to the lead.":
    "Источник, оффер, приоритет и следующее действие остаются привязаны к лиду.",
  "Clear first scope": "Понятный первый объем",
  "Implementation boundary": "Граница реализации",
  "The first step is shaped as a useful build boundary, not a vague discovery call.":
    "Первый шаг оформляется как полезная граница сборки, а не как размытый созвон.",
  "Human review": "Проверка человеком",
  "No pressure loop": "Без давления",
  "If the request is early, the answer asks for missing context instead of forcing a sales call.":
    "Если запрос еще сырой, ответ запросит недостающий контекст вместо навязанного продажного звонка.",
  "Proof assets": "Доказательные активы",
  "Example first-stage proof": "Примеры доказательств первого этапа",
  "A lead converts more easily when the first build has a visible proof target. These patterns show what can be validated before a larger system is expanded.":
    "Лиду проще конвертироваться, когда у первой сборки есть видимая цель доказательства. Эти паттерны показывают, что можно проверить до расширения системы.",
  "Lead intake system": "Система приема лидов",
  "Requests arrive from forms, ads, referrals, email, and messengers with no single owner or next action.":
    "Заявки приходят из форм, рекламы, рекомендаций, email и мессенджеров без единого владельца и следующего действия.",
  "One tracked intake path with source context, priority, owner, status, and next action.":
    "Один отслеживаемый путь приема с источником, приоритетом, владельцем, статусом и следующим действием.",
  "Stored lead source, response state, routing bucket, and follow-up queue.":
    "Сохраненный источник лида, состояние ответа, маршрут обработки и очередь follow-up.",
  "Content operation": "Контентная операция",
  "Topics, briefs, drafts, approvals, publishing, and SEO checks live in separate manual steps.":
    "Темы, брифы, черновики, согласования, публикация и SEO-проверки живут отдельными ручными шагами.",
  "A controlled publishing workflow with templates, review states, CMS handoff, and reporting points.":
    "Контролируемый publishing-процесс с шаблонами, статусами проверки, передачей в CMS и точками отчетности.",
  "Visible queue, approval status, publishing output, indexation or performance signals.":
    "Видимая очередь, статус согласования, опубликованный результат, сигналы индексации или эффективности.",
  "Data and commerce control": "Контроль данных и commerce",
  "Catalog, prices, stock, competitors, or operational data are checked by hand and become stale quickly.":
    "Каталог, цены, остатки, конкуренты или операционные данные проверяются вручную и быстро устаревают.",
  "A normalized data layer with checks, alerts, dashboard output, and an action list.":
    "Нормализованный слой данных с проверками, алертами, dashboard-выводом и списком действий.",
  "Freshness checks, missing-field reports, alerts, data coverage, and completed actions.":
    "Проверки свежести, отчеты по пропущенным полям, алерты, покрытие данных и закрытые действия.",
  "Pressure": "Давление",
  "First useful build": "Первая полезная сборка",
  "Proof signal": "Сигнал доказательства",
  "The proof target is selected from the submitted workflow, not forced into a generic service package.":
    "Цель доказательства выбирается из отправленного процесса, а не втискивается в общий пакет услуг.",
  "Scope a proof path": "Описать путь доказательства",
  "Send Project Request": "Отправить заявку",
  "Project type": "Тип проекта",
  "Business problem": "Бизнес-проблема",
  "Desired result": "Желаемый результат",
  "Desired output": "Желаемый результат",
  "Current website/system": "Текущий сайт/система",
  "Name": "Имя",
  "Email": "Email",
  "Company optional": "Компания, опционально",
  "Budget optional": "Бюджет, опционально",
  "Timeline optional": "Сроки, опционально",
  "Decision hub": "Центр выбора",
  "From business problem": "От бизнес-проблемы",
  "To an operational system": "К операционной системе",
  "Choose the pressure point. Follow the route to solutions and system.":
    "Точка давления связывается с маршрутом к решениям и системе.",
  "Pressure point": "Точка давления",
  "A business need becomes a working system with measurable output.":
    "Бизнес-потребность превращается в рабочую систему с измеримым результатом.",
  "Orbit automation": "Автоматизация",
  "Orbit web platform": "Веб-платформа",
  "Orbit content SEO": "Контент / SEO",
  "Orbit data": "Данные",
  "Orbit ecommerce": "E-commerce",
  "Orbit integrations": "Интеграции",
  "Clear routes": "Ясные маршруты",
  "From problem to solution": "От проблемы к решению",
  "Proven solutions": "Проверенные решения",
  "Ready modules and practices": "Готовые модули и практики",
  "Measurable result": "Измеримый результат",
  "Transparency and control": "Прозрачность и контроль",
  "Secure and scalable": "Безопасность и масштабируемость",
  "Reliable platform for growth": "Надежная платформа для роста",
  "What system do you need?": "Какая система нужна?",
  "Start from the operational need. Each route points to the most relevant capability, solution, or system profile so the home page works like a map of the company.":
    "Начинайте с операционной потребности. Каждый маршрут ведет к релевантной возможности, решению или профилю системы, чтобы главная работала как карта компании.",
  "Need -> System": "Потребность -> система",
  "Choose the pressure point, then follow the route into the section with the right level of detail.":
    "Каждая точка давления ведет в раздел с нужным уровнем детализации.",
  "what can be built": "что можно собрать",
  "which problem it solves": "какую проблему решает",
  "how it operates": "как работает",
  "what connects it": "что соединяет",
  "what to scope first": "что описать первым",
  "Campaign landing pages": "Рекламные посадочные страницы",
  "Offer pages built for ads and client leads": "Оффер-страницы для рекламы и клиентских лидов",
  "These pages translate the broader system catalog into concrete buyer-ready offers with a problem, modules, proof signals, and a tracked intake path.":
    "Эти страницы переводят каталог систем в конкретные офферы для покупателя: проблема, модули, доказательства и отслеживаемый путь заявки.",
  "Lead acquisition layer": "Слой привлечения лидов",
  "Each campaign page turns one buyer problem into a scoped system request with proof, modules, CTA, and intake tracking.":
    "Каждая рекламная страница превращает одну проблему покупателя в понятный запрос на систему с доказательствами, модулями, CTA и трекингом заявки.",
  "Plan campaign route": "Спланировать рекламный маршрут",
  "Ad message": "Рекламное сообщение",
  "Proof layer": "Слой доказательств",
  "Tracked intake": "Отслеживаемая заявка",
  "What AlfaRank builds": "Что строит AlfaRank",
  "ALFARANK CORE": "ЯДРО ALFARANK",
  "Capabilities are not a menu of services. They are a set of technical forces that can be combined into one operating system.":
    "Возможности - это не меню услуг, а набор технических сил, которые можно объединить в одну операционную систему.",
  "Business problems mapped to systems": "Бизнес-проблемы, разложенные в системы",
  "Business pressure": "Бизнес-давление",
  "Business pressure routed into system output.": "Бизнес-давление превращается в системный результат.",
  "Each solution starts from an operational problem and turns it into a path for content, leads, data, products, teams, or growth systems.":
    "Каждое решение начинается с операционной проблемы и превращает ее в путь для контента, лидов, данных, продуктов, команд или систем роста.",
  "ALFARANK ROUTING ENGINE": "МАРШРУТНЫЙ ДВИЖОК ALFARANK",
  "Capture. Process. Route. Deliver.": "Захватить. Обработать. Направить. Доставить.",
  "Scope a route": "Описать маршрут",
  "Route engine": "Маршрутный движок",
  "Problem to system": "Проблема в систему",
  "Inputs are converted into scoped implementation paths, then into measurable business outputs.":
    "Вводные превращаются в понятные пути реализации, а затем в измеримые бизнес-результаты.",
  "View solution routes": "Смотреть маршруты решений",
  "System output": "Системный результат",
  "Open route": "Открыть маршрут",
  "From client workflow to operating system": "От клиентского процесса к операционной системе",
  "Input": "Ввод",
  "Rules + AI": "Правила + AI",
  "Human Review": "Проверка человеком",
  "Lead, content, catalog, or source data enters one controlled model.":
    "Лиды, контент, каталог или исходные данные попадают в одну управляемую модель.",
  "Automation classifies, enriches, routes, drafts, and checks work.":
    "Автоматизация классифицирует, обогащает, маршрутизирует, готовит черновики и проверяет работу.",
  "Approvals, corrections, owner decisions, and fallback states stay visible.":
    "Согласования, правки, решения владельца и резервные состояния остаются видимыми.",
  "CRM actions, published pages, dashboards, feeds, or reports leave the system.":
    "Из системы выходят CRM-действия, опубликованные страницы, панели, фиды или отчеты.",
  "Technology layer": "Технологический слой",
  "Built with practical, integration-ready technology.": "Собрано на практичных технологиях, готовых к интеграциям.",
  "AlfaRank uses established web, automation, AI, data, and CMS technologies to create systems that can be launched, reviewed, integrated, and improved without locking the business into a fragile stack.":
    "AlfaRank использует проверенные веб-, automation-, AI-, data- и CMS-технологии, чтобы создавать системы, которые можно запускать, проверять, интегрировать и улучшать без хрупкой привязки к стеку.",
  "View Technologies": "Смотреть технологии",
  "Stack logic": "Логика стека",
  "Where the systems apply": "Где применяются системы",
  "The same system approach works across service businesses, e-commerce, media, travel, local businesses, SaaS, and data-heavy operations.":
    "Один системный подход работает для сервисных компаний, e-commerce, медиа, туризма, локального бизнеса, SaaS и компаний с большим объемом данных.",
  "Implementation matrix": "Матрица реализации",
  "Stack layers ready": "Слои стека готовы",
  "Frontend": "Фронтенд",
  "Publishing": "Публикация",
  "Deploy": "Деплой",
  "Tools": "Инструменты",
  "Layers": "Слои",
  "Connective tissue": "Связующий слой",
  "Operating model": "Операционная модель",
  "Execution loop active": "Контур выполнения активен",
  "Work stages": "Этапы работы",
  "System owner": "Владелец системы",
  "Delivery mode": "Режим поставки",
  "Request path open": "Путь заявки открыт",
  "Current setup": "Текущая конфигурация",
  "Follow-up": "Следующий контакт",
  "Input fields": "Поля ввода",
  "Mission control": "Центр управления",
  "Client system map / live routing": "Карта клиентской системы / активная маршрутизация",
  "Orchestrate. Automate. Scale.": "Оркестрация. Автоматизация. Масштабирование.",
  "System online": "Система онлайн",
  "Implementation layer": "Слой реализации",
  "AlfaRank core": "Ядро AlfaRank",
  "Mapped nodes": "Связанные узлы",
  "Flow state": "Состояние потока",
  "Output path": "Путь результата",
  "Buildable": "Можно собрать",
  "Reusable": "Повторяемо",
  "Measured": "Измеряется",
  "Problem": "Проблема",
  "Process": "Процесс",
  "Deliver": "Доставка",
  "Measure": "Измерение",
  "Profile": "Профиль",
  "Module": "Модуль",
  "Modules": "Модули",
  "Interface": "Интерфейс",
  "Output": "Результат",
  "Reuse": "Повторное использование",
  "Need": "Потребность",
  "Flow": "Поток",
  "System": "Система",
  "Result": "Результат",
  "Proof": "Доказательство",
  "Market": "Рынок",
  "Context": "Контекст",
  "Growth": "Рост",
  "AI layer": "AI-слой",
  "Web layer": "Веб-слой",
  "Content layer": "Контентный слой",
  "Data layer": "Слой данных",
  "Commerce layer": "Коммерческий слой",
  "Media pipeline": "Медиапайплайн",
  "API layer": "API-слой",
  "Tooling layer": "Слой инструментов",
  "Product layer": "Продуктовый слой",
  "Monitoring layer": "Слой мониторинга",
  "Growth layer": "Слой роста",
  "System space": "Системное пространство",
  "Review lens": "Контур проверки",
  "Workflow layer": "Слой процессов",
  "Scoring layer": "Слой оценки",
  "Market map": "Карта рынка",
  "Local layer": "Локальный слой",
  "Interfaces + routes": "Интерфейсы + маршруты",
  "Content models": "Контент-модели",
  "Assistants + actions": "Ассистенты + действия",
  "Collection + scoring": "Сбор + оценка",
  "Launch pipeline": "Пайплайн запуска",
  "Define": "Определить",
  "Shape": "Сформировать",
  "Build": "Собрать",
  "Launch": "Запуск",
  "Ship": "Выпуск",
  "Improve": "Улучшение",
  "Working model": "Рабочая модель",
  "Production path": "Путь в продакшен",
  "Signals + reports": "Сигналы + отчеты",
  "Needs": "Потребности",
  "Fit": "Соответствие",
  "Industry fit mapped": "Соответствие индустрии размечено",
  "Industry system": "Индустриальная система",
  "Industry map": "Карта индустрий",
  "Market contexts mapped": "Рыночные контексты размечены",
  "Fit map": "Карта соответствия",
  "Service, commerce, media, travel, local, SaaS, agency, data-heavy workflows":
    "Сервисные, торговые, медийные, туристические, локальные, SaaS, агентские и data-насыщенные процессы",
  "Lead capture and routing": "Захват и маршрутизация лидов",
  "CRM follow-up": "Последующие действия в CRM",
  "Local/service landing infrastructure": "Локальная посадочная инфраструктура для услуг",
  "Operational dashboards": "Операционные панели",
  "Catalog data quality": "Качество данных каталога",
  "Feeds and marketplace sync": "Синхронизация фидов и маркетплейсов",
  "Stock and pricing monitoring": "Мониторинг остатков и цен",
  "Product/category content": "Контент товаров и категорий",
  "Editorial workflow": "Редакционный процесс",
  "AI-assisted drafts": "Черновики с AI-помощью",
  "Media asset preparation": "Подготовка медиа-ассетов",
  "Publishing and monitoring": "Публикация и мониторинг",
  "Destination data": "Данные направлений",
  "Availability or catalog structures": "Структуры доступности или каталога",
  "Programmatic SEO pages": "Программные SEO-страницы",
  "Monitoring and scraping": "Мониторинг и сбор данных",
  "Local landing pages": "Локальные посадочные страницы",
  "Review and ranking signals": "Сигналы отзывов и ранжирования",
  "Website and CRM connections": "Связи сайта и CRM",
  "MVP scope": "Объем MVP",
  "Product interface": "Продуктовый интерфейс",
  "Dashboard and admin tools": "Панели и админ-инструменты",
  "Data and integration model": "Модель данных и интеграций",
  "White-label reporting": "White-label отчетность",
  "Client dashboards": "Клиентские панели",
  "Content production systems": "Системы производства контента",
  "Internal workflow tooling": "Инструменты внутренних процессов",
  "Data collection": "Сбор данных",
  "Normalization and scoring": "Нормализация и оценка",
  "Monitoring and alerts": "Мониторинг и алерты",
  "Reports and exports": "Отчеты и экспорты",
  "Use the strongest repeated workflow as the first commercial solution route.":
    "Самый частый повторяемый процесс становится первым коммерческим маршрутом решения.",
  "Service businesses": "Сервисные компании",
  "Demand": "Спрос",
  "Catalog": "Каталог",
  "Production": "Производство",
  "Product": "Продукт",
  "Lead automation": "Автоматизация лидов",
  "CRM flow": "CRM-поток",
  "Catalog data": "Данные каталога",
  "Feeds": "Фиды",
  "Publishing pipeline": "Пайплайн публикации",
  "Media automation": "Автоматизация медиа",
  "Dashboard": "Панель",
  "Portal": "Портал",
  "Faster qualified requests": "Более быстрые квалифицированные заявки",
  "Cleaner product operations": "Более чистые продуктовые операции",
  "Repeatable production": "Повторяемое производство",
  "Launchable product layer": "Продуктовый слой, готовый к запуску",
  "Start with the business model, then map the system.": "Бизнес-модель становится стартовой точкой карты системы.",
  "The strongest industry pages translate repeated business needs into concrete system patterns: lead flow, catalog operations, publishing, product interfaces, monitoring, and integrations.":
    "Сильные индустриальные страницы переводят повторяемые бизнес-потребности в конкретные системные паттерны: поток лидов, операции каталога, публикацию, продуктовые интерфейсы, мониторинг и интеграции.",
  "Growth signal funnel": "Воронка сигналов роста",
  "Market context becomes system scope.": "Рыночный контекст становится объемом системы.",
  "Every industry route is treated as a live business signal: demand, catalog, content, product, data, and operational pressure.":
    "Каждый индустриальный маршрут рассматривается как живой бизнес-сигнал: спрос, каталог, контент, продукт, данные и операционное давление.",
  "Each industry now has a profile page with system fit, likely build paths, and a project intake route.":
    "У каждой индустрии теперь есть профильная страница с системным соответствием, вероятными путями сборки и маршрутом заявки.",
  "This solution is for companies that need more content without turning production into uncontrolled manual work. AlfaRank designs content systems that combine topic databases, templates, AI-assisted drafting, editorial review, media preparation, CMS publishing, and performance monitoring.":
    "Это решение для компаний, которым нужно больше контента без превращения производства в неконтролируемую ручную работу. AlfaRank проектирует контентные системы, которые соединяют базы тем, шаблоны, AI-черновики, редакционную проверку, подготовку медиа, публикацию в CMS и мониторинг эффективности.",
  "Topic, keyword, and entity databases": "Базы тем, ключевых слов и сущностей",
  "AI-assisted draft generation": "Генерация черновиков с AI-помощью",
  "Editorial review and QA workflow": "Редакционная проверка и контроль качества",
  "CMS publishing pipeline and monitoring": "Пайплайн публикации в CMS и мониторинг",
  "Content input system": "Система входных данных контента",
  "Topic lists, keyword groups, entities, products, locations, briefs, templates, and source data organized before production starts.":
    "Списки тем, группы ключевых слов, сущности, продукты, локации, брифы, шаблоны и исходные данные организованы до начала производства.",
  "Generation and enrichment": "Генерация и обогащение",
  "AI-assisted drafts, outlines, metadata, media prompts, structured sections, internal links, and content variants generated from controlled inputs.":
    "AI-черновики, структуры, метаданные, медиа-промпты, разделы, внутренние ссылки и варианты контента генерируются из контролируемых входных данных.",
  "Review states, QA checks, approval logic, corrections, versioning, and final publishing preparation.":
    "Статусы проверки, контроль качества, логика согласования, правки, версии и финальная подготовка к публикации.",
  "CMS-ready output, publishing queues, indexation checks, performance tracking, and improvement loops.":
    "Готовый для CMS результат, очереди публикации, проверки индексации, отслеживание эффективности и циклы улучшения.",
  "Higher publishing capacity": "Больше публикаций без потери качества",
  "Controlled quality": "Контроль качества",
  "Repeatable content operations": "Повторяемые контентные операции",
  "Define the content types and publishing volume needed.": "Определить типы контента и нужный объем публикаций.",
  "Create the topic, data, template, and brief structure.": "Собрать структуру тем, данных, шаблонов и брифов.",
  "Build AI-assisted generation and enrichment workflows.": "Собрать AI-процессы генерации и обогащения.",
  "Add editorial review, QA, and approval stages.": "Добавить редакционную проверку, контроль качества и этапы согласования.",
  "Connect publishing and monitoring systems.": "Подключить системы публикации и мониторинга.",
  "Scale blog, guide, landing, product, category, or location content.": "Масштабировать контент для блогов, гайдов, посадочных, товаров, категорий или локаций.",
  "Create programmatic content from structured data.": "Создавать программный контент из структурированных данных.",
  "Support editors with AI-assisted drafts and QA steps.": "Поддерживать редакторов AI-черновиками и этапами проверки качества.",
  "Build a CMS publishing pipeline for repeated content formats.": "Собрать пайплайн публикации в CMS для повторяемых форматов контента.",
  "Monitor content quality, indexation, rankings, and updates.": "Мониторить качество контента, индексацию, позиции и обновления.",
  "This solution is for businesses that receive leads from websites, ads, forms, calls, directories, or partner channels and need a cleaner operating process. AlfaRank builds lead systems that classify requests, enrich records, route work, update CRM data, and trigger follow-up actions.":
    "Это решение для компаний, которые получают заявки с сайтов, рекламы, форм, звонков, каталогов или партнерских каналов и нуждаются в более чистом операционном процессе. AlfaRank строит системы заявок, которые классифицируют обращения, обогащают записи, маршрутизируют работу, обновляют CRM и запускают последующие действия.",
  "Lead capture and CRM connection": "Захват заявок и подключение CRM",
  "Qualification, enrichment, and scoring": "Квалификация, обогащение и оценка",
  "Routing and team notifications": "Маршрутизация и уведомления команды",
  "Follow-up workflows and status tracking": "Follow-up-процессы и отслеживание статусов",
  "Lead capture and normalization": "Захват и нормализация заявок",
  "Forms, landing pages, website events, imports, APIs, and CRM inputs normalized into a consistent lead structure.":
    "Формы, посадочные страницы, события сайта, импорты, API и входящие данные CRM приводятся к единой структуре заявки.",
  "Classification and scoring": "Классификация и оценка",
  "Rules or AI-assisted logic for identifying project type, priority, location, budget signal, urgency, and required next action.":
    "Правила или AI-логика определяют тип проекта, приоритет, локацию, бюджетный сигнал, срочность и нужное следующее действие.",
  "Routing and notifications": "Маршрутизация и уведомления",
  "Assignment logic, team alerts, CRM updates, status changes, and follow-up triggers based on lead type and business rules.":
    "Логика назначения, уведомления команды, обновления CRM, смена статусов и follow-up-триггеры на основе типа заявки и бизнес-правил.",
  "Tracking and reporting": "Отслеживание и отчетность",
  "Dashboards or logs showing lead status, response time, source quality, bottlenecks, and conversion flow.":
    "Панели или журналы показывают статус заявки, скорость ответа, качество источника, узкие места и ход конверсии.",
  "Faster lead handling": "Более быстрая обработка заявок",
  "Less manual sorting": "Меньше ручной сортировки",
  "Cleaner sales operations": "Более чистые продажи",
  "This solution is for teams that rely on manual coordination, scattered spreadsheets, repeated admin work, or disconnected tools. AlfaRank builds internal tools that make business processes visible, repeatable, and easier to operate.":
    "Это решение для команд, которые зависят от ручной координации, разрозненных таблиц, повторяемой админ-работы или несвязанных инструментов. AlfaRank строит внутренние инструменты, которые делают бизнес-процессы видимыми, повторяемыми и более удобными в управлении.",
  "Admin panels and operational dashboards": "Админ-панели и операционные дашборды",
  "Internal databases and user roles": "Внутренние базы данных и роли пользователей",
  "Workflow states and approvals": "Статусы процесса и согласования",
  "Exports, reporting, and alerts": "Экспорты, отчеты и алерты",
  "Operational dashboard": "Операционный дашборд",
  "Interfaces for viewing records, statuses, tasks, metrics, alerts, and process stages in one place.":
    "Интерфейсы для просмотра записей, статусов, задач, метрик, алертов и этапов процесса в одном месте.",
  "Workflow and permissions": "Процесс и права доступа",
  "Roles, approvals, status changes, assignment logic, comments, review steps, and controlled access.":
    "Роли, согласования, смена статусов, логика назначения, комментарии, этапы проверки и контролируемый доступ.",
  "Data and integrations": "Данные и интеграции",
  "Connections to CRMs, websites, APIs, spreadsheets, databases, CMS tools, and automation platforms.":
    "Подключения к CRM, сайтам, API, таблицам, базам данных, CMS-инструментам и платформам автоматизации.",
  "Reports and actions": "Отчеты и действия",
  "Exports, alerts, recurring reports, bulk actions, triggered workflows, and operational summaries.":
    "Экспорты, алерты, регулярные отчеты, массовые действия, запускаемые процессы и операционные сводки.",
  "Reduced repetitive work": "Меньше повторяемой работы",
  "Single source of process data": "Единый источник данных процесса",
  "This solution is for companies that need to turn a business idea, internal workflow, or productized service into a working digital product. AlfaRank helps define the first launchable version, design the interface and data model, build the core system, and prepare it for real users.":
    "Это решение для компаний, которым нужно превратить бизнес-идею, внутренний процесс или продуктовую услугу в рабочий цифровой продукт. AlfaRank помогает определить первую запускаемую версию, спроектировать интерфейс и модель данных, собрать ядро системы и подготовить продукт к реальным пользователям.",
  "Product scope and user flows": "Скоуп продукта и пользовательские сценарии",
  "Frontend and backend architecture": "Архитектура фронтенда и бэкенда",
  "Authentication, dashboards, and data models": "Авторизация, панели и модели данных",
  "Launch-ready deployment and iteration path": "Деплой и путь итераций для запуска",
  "Product scope and flows": "Скоуп продукта и сценарии",
  "Definition of user roles, core actions, screens, data objects, workflow states, and the minimum system required for launch.":
    "Определение ролей пользователей, ключевых действий, экранов, объектов данных, статусов процесса и минимальной системы для запуска.",
  "Interface and application layer": "Интерфейсный и прикладной слой",
  "Frontend screens, dashboards, portals, forms, data views, navigation, onboarding, and key product interactions.":
    "Фронтенд-экраны, панели, порталы, формы, представления данных, навигация, онбординг и ключевые продуктовые взаимодействия.",
  "Data and backend structure": "Данные и структура бэкенда",
  "Databases, APIs, authentication, permissions, business logic, file handling, integrations, and admin controls.":
    "Базы данных, API, авторизация, права доступа, бизнес-логика, работа с файлами, интеграции и админ-контроль.",
  "Launch and iteration setup": "Настройка запуска и итераций",
  "Deployment workflow, analytics, feedback loops, issue tracking, and a path from MVP to more complete product system.":
    "Процесс деплоя, аналитика, обратная связь, трекинг задач и путь от MVP к более полной продуктовой системе.",
  "Launch-ready platform": "Платформа, готовая к запуску",
  "This solution is for businesses that already have a website, but the site no longer supports current operations, content needs, SEO structure, integrations, or conversion workflows. AlfaRank upgrades the website as a digital system, not just a visual refresh.":
    "Это решение для компаний, у которых уже есть сайт, но он больше не поддерживает текущие операции, контентные задачи, SEO-структуру, интеграции или маршруты конверсии. AlfaRank обновляет сайт как цифровую систему, а не просто как визуальный редизайн.",
  "Information architecture and content model cleanup": "Чистка информационной архитектуры и модели контента",
  "Performance and technical structure improvements": "Улучшение скорости и технической структуры",
  "CMS and integration upgrades": "Апгрейд CMS и интеграций",
  "Conversion paths and operational workflows": "Маршруты конверсии и операционные процессы",
  "Architecture and content model": "Архитектура и модель контента",
  "Restructuring pages, navigation, templates, taxonomies, content types, metadata, internal links, and publishing logic.":
    "Перестройка страниц, навигации, шаблонов, таксономий, типов контента, метаданных, внутренних ссылок и логики публикации.",
  "Technical modernization": "Техническая модернизация",
  "Performance improvements, frontend cleanup, CMS structure, deployment workflow, tracking, accessibility, and maintainability.":
    "Улучшение скорости, чистка фронтенда, структура CMS, процесс деплоя, трекинг, доступность и поддерживаемость.",
  "Integrations and automation": "Интеграции и автоматизация",
  "Connections with forms, CRM, analytics, APIs, email, databases, content workflows, and internal tools.":
    "Связи с формами, CRM, аналитикой, API, email, базами данных, контентными процессами и внутренними инструментами.",
  "Conversion and business workflows": "Конверсия и бизнес-процессы",
  "Lead flows, project request forms, service/solution pages, trust elements, routing logic, and measurable calls to action.":
    "Потоки заявок, формы запроса проекта, страницы услуг и решений, элементы доверия, логика маршрутизации и измеримые CTA.",
  "Cleaner structure": "Более чистая структура",
  "Better maintainability": "Проще поддерживать",
  "More useful business workflows": "Более полезные бизнес-процессы",
  "This solution is for companies that need better visibility into changing data. AlfaRank builds monitoring systems that collect information from websites, APIs, feeds, SERPs, catalogs, or internal sources, then turn it into alerts, dashboards, reports, scores, and decisions.":
    "Это решение для компаний, которым нужна лучшая видимость изменяющихся данных. AlfaRank строит системы мониторинга, которые собирают информацию с сайтов, API, фидов, SERP, каталогов или внутренних источников, а затем превращают ее в алерты, панели, отчеты, оценки и решения.",
  "Data source mapping": "Карта источников данных",
  "Scraping, API, or feed collection": "Сбор через scraping, API или фиды",
  "Normalization and storage": "Нормализация и хранение",
  "Dashboards, alerts, and reports": "Панели, алерты и отчеты",
  "Source and signal mapping": "Карта источников и сигналов",
  "Collection layer": "Слой сбора",
  "Processing and storage": "Обработка и хранение",
  "Dashboards and alerts": "Панели и алерты",
  "Current market visibility": "Видимость текущего рынка",
  "Automated checks": "Автоматические проверки",
  "This solution is for companies that need organic growth to come from a structured system rather than disconnected SEO tasks. AlfaRank designs the architecture, templates, data structures, publishing workflows, and monitoring layer needed to scale SEO infrastructure.":
    "Это решение для компаний, которым нужен органический рост из структурированной системы, а не из разрозненных SEO-задач. AlfaRank проектирует архитектуру, шаблоны, структуры данных, процессы публикации и слой мониторинга для масштабирования SEO-инфраструктуры.",
  "Programmatic page structures": "Структуры программных страниц",
  "Content templates and data sources": "Шаблоны контента и источники данных",
  "Technical SEO and internal linking logic": "Техническое SEO и логика внутренней перелинковки",
  "Publishing, monitoring, and improvement cycles": "Публикация, мониторинг и циклы улучшения",
  "Information architecture": "Информационная архитектура",
  "Programmatic publishing layer": "Слой программной публикации",
  "Technical and content QA": "Технический и контентный контроль качества",
  "Monitoring and improvement loop": "Цикл мониторинга и улучшения",
  "Scalable page systems": "Масштабируемые системы страниц",
  "Structured publishing": "Структурированная публикация",
  "Measurable organic growth infrastructure": "Измеримая инфраструктура органического роста",
  "System overview and module map": "Обзор системы и карта модулей",
  "Business context and workflow": "Бизнес-контекст и процесс",
  "Technology layer and integrations": "Технологический слой и интеграции",
  "Outputs, use cases, and related capabilities": "Результаты, сценарии и связанные возможности",
  "Workflow structure": "Структура процесса",
  "A mapped process with inputs, statuses, roles, actions, approvals, and outputs instead of scattered manual work.":
    "Разложенный процесс с входами, статусами, ролями, действиями, согласованиями и результатами вместо разрозненной ручной работы.",
  "Data and content layer": "Слой данных и контента",
  "Structured records, content fields, metadata, files, entities, or operational objects that can be reused by different parts of the system.":
    "Структурированные записи, поля контента, метаданные, файлы, сущности или операционные объекты, которые разные части системы могут использовать повторно.",
  "Triggered actions, AI-assisted steps, notifications, imports, exports, checks, or API connections that reduce repeated manual work.":
    "Триггерные действия, AI-шаги, уведомления, импорты, экспорты, проверки или API-связи, которые сокращают повторяемую ручную работу.",
  "Interface layer": "Интерфейсный слой",
  "Dashboards, admin screens, review surfaces, status views, and user-facing pages that make the workflow usable.":
    "Панели, админ-экраны, поверхности проверки, статусы и пользовательские страницы, которые делают процесс удобным.",
  "Reusable system modules": "Повторно используемые модули системы",
  "Define the business process and what output the system should create.": "Определить бизнес-процесс и результат, который должна создать система.",
  "Map the objects, data, users, states, and actions involved.": "Разложить объекты, данные, пользователей, состояния и действия.",
  "Build the interface and operational workflow.": "Собрать интерфейс и операционный процесс.",
  "Connect automation, content, APIs, or reporting where useful.": "Подключить автоматизацию, контент, API или отчетность там, где это полезно.",
  "Measure how the system improves speed, quality, or visibility.": "Измерить, как система улучшает скорость, качество или видимость.",
  "Internal workflow systems.": "Внутренние системы процессов.",
  "Productized service platforms.": "Платформы продуктовых услуг.",
  "Content or data operations dashboards.": "Панели контентных или data-операций.",
  "Review, approval, and reporting tools.": "Инструменты проверки, согласования и отчетности.",
  "Business process automation systems.": "Системы автоматизации бизнес-процессов.",
  "Workspace model for requests, records, tasks, and approvals": "Модель рабочего пространства для заявок, записей, задач и согласований",
  "Role-based dashboards for owners, reviewers, clients, or operators": "Ролевые панели для владельцев, ревьюеров, клиентов и операторов",
  "Reusable content and data objects that connect across modules": "Переиспользуемые объекты контента и данных между модулями",
  "Automation hooks for reminders, QA, exports, reporting, and handoff": "Автоматизация напоминаний, QA, экспортов, отчетов и передачи",
  "Process map and entities": "Карта процесса и сущности",
  "The system starts by defining the objects that matter: requests, clients, tasks, files, content items, statuses, owners, deadlines, and outputs.":
    "Система начинается с описания ключевых объектов: заявок, клиентов, задач, файлов, контентных единиц, статусов, владельцев, сроков и результатов.",
  "Workspace interface": "Интерфейс рабочего пространства",
  "Dashboards, queues, kanban-style stages, detail screens, review panels, and filters make the operating process visible to the team.":
    "Панели, очереди, канбан-этапы, карточки деталей, экраны проверки и фильтры делают рабочий процесс видимым для команды.",
  "Rules and automation": "Правила и автоматизация",
  "Notifications, status changes, validations, AI-assisted drafts, imports, exports, and recurring checks reduce repeated manual coordination.":
    "Уведомления, смена статусов, проверки, AI-черновики, импорты, экспорты и регулярные контроли сокращают ручную координацию.",
  "Reporting and handoff": "Отчеты и передача",
  "The system produces summaries, client-ready outputs, internal reports, exports, and signals that show what needs attention next.":
    "Система формирует сводки, клиентские результаты, внутренние отчеты, экспорты и сигналы о том, что требует внимания дальше.",
  "Managed workspace": "Управляемое рабочее пространство",
  "Visible delivery process": "Видимый процесс выполнения",
  "Reusable operations modules": "Переиспользуемые операционные модули",
  "Reports and handoff signals": "Отчеты и сигналы передачи",
  "Map the current process, roles, objects, and recurring handoffs.":
    "Картируем текущий процесс, роли, объекты и повторяемые передачи.",
  "Define statuses, permissions, data fields, and the screens each role needs.":
    "Определяем статусы, права, поля данных и экраны, которые нужны каждой роли.",
  "Build the first workspace with queues, detail views, review points, and outputs.":
    "Собираем первое рабочее пространство с очередями, карточками, точками проверки и результатами.",
  "Connect automation, AI assistance, imports, exports, or integrations where the workflow repeats.":
    "Подключаем автоматизацию, AI-помощь, импорты, экспорты и интеграции там, где процесс повторяется.",
  "Use reports and operating signals to improve speed, ownership, and quality.":
    "Используем отчеты и операционные сигналы, чтобы улучшать скорость, ответственность и качество.",
  "Internal operations dashboard for a service team.": "Внутренняя операционная панель для сервисной команды.",
  "Client request and delivery workspace.": "Рабочее пространство для клиентских заявок и выполнения.",
  "Content production and approval hub.": "Хаб производства и согласования контента.",
  "Document, asset, or data review console.": "Консоль проверки документов, ассетов или данных.",
  "Productized service workflow with repeatable outputs.": "Процесс продуктовой услуги с повторяемыми результатами.",
  "Brief, script, prompt, and asset intake": "Прием брифов, сценариев, промптов и ассетов",
  "Template library for scenes, captions, formats, and brand rules": "Библиотека шаблонов для сцен, субтитров, форматов и бренд-правил",
  "Human review stages before export or publication": "Этапы проверки человеком перед экспортом или публикацией",
  "Export, storage, metadata, and publishing queues": "Экспорт, хранение, метаданные и очереди публикации",
  "Brief and asset intake": "Прием брифов и ассетов",
  "Collects scripts, article text, product data, prompts, source media, brand constraints, language, aspect ratio, and publication target before generation starts.":
    "Собирает сценарии, тексты статей, продуктовые данные, промпты, исходные медиа, бренд-ограничения, язык, формат кадра и цель публикации до старта генерации.",
  "Media generation pipeline": "Конвейер генерации медиа",
  "Turns structured inputs into draft scenes, captions, thumbnails, voice or audio notes, metadata, and media variants ready for review.":
    "Превращает структурированные входные данные в черновики сцен, субтитры, обложки, голосовые или аудио-заметки, метаданные и медиа-варианты для проверки.",
  "Template and brand system": "Система шаблонов и бренда",
  "Keeps reusable formats, visual rules, naming, export sizes, safe zones, intros, outros, and asset storage consistent across batches.":
    "Удерживает единые форматы, визуальные правила, нейминг, размеры экспорта, безопасные зоны, заставки, финальные экраны и хранение ассетов между партиями.",
  "Review and publishing queue": "Очередь проверки и публикации",
  "Adds approval statuses, corrections, final exports, CMS or platform handoff, storage paths, and reporting on production speed and quality.":
    "Добавляет статусы согласования, правки, финальные экспорты, передачу в CMS или платформу, пути хранения и отчетность по скорости и качеству производства.",
  "Reviewed media drafts": "Проверенные медиа-черновики",
  "AI-assisted production pipeline": "AI-поддерживаемый производственный конвейер",
  "Template-based asset system": "Система ассетов на базе шаблонов",
  "Publishing-ready exports": "Экспорты, готовые к публикации",
  "Define the repeatable media format and the source material behind it.":
    "Определяем повторяемый медиаформат и исходный материал за ним.",
  "Structure briefs, prompts, templates, brand rules, and export requirements.":
    "Структурируем брифы, промпты, шаблоны, бренд-правила и требования к экспорту.",
  "Generate first drafts and variants through controlled pipeline steps.":
    "Генерируем первые черновики и варианты через контролируемые шаги конвейера.",
  "Route outputs through review, correction, approval, and final export.":
    "Проводим результаты через проверку, правки, согласование и финальный экспорт.",
  "Publish, store, measure, and improve the workflow for the next batch.":
    "Публикуем, сохраняем, измеряем и улучшаем процесс для следующей партии.",
  "Article-to-video or product-to-video generation.": "Генерация видео из статей или продуктовых данных.",
  "Short-form social asset production with review.": "Производство коротких ассетов для соцсетей с проверкой.",
  "Thumbnail, caption, metadata, and variant generation.": "Генерация обложек, субтитров, метаданных и вариантов.",
  "Media approval workspace for a content team.": "Рабочее пространство согласования медиа для контент-команды.",
  "Publishing queue for generated video or visual assets.": "Очередь публикации для сгенерированных видео и визуальных ассетов.",
  "Reusable patterns online": "Повторяемые паттерны активны",
  "System profile library": "Библиотека системных профилей",
  "Each profile shows modules, workflow, output, and how the pattern can become a scoped implementation path.":
    "Каждый профиль показывает модули, процесс, результат и путь, по которому паттерн можно превратить в конкретную реализацию.",
  "Structured websites with reusable content models, clear navigation, service or solution pages, technical SEO foundations, and deployment workflows.":
    "Структурированные сайты с повторно используемыми моделями контента, понятной навигацией, страницами услуг или решений, технической SEO-основой и процессом деплоя.",
  "Scalable page structures driven by data, reusable templates, entity relationships, location/product/category models, and automated publishing logic.":
    "Масштабируемые структуры страниц на основе данных, повторно используемых шаблонов, связей сущностей, моделей локаций, товаров или категорий и автоматизированной логики публикации.",
  "Data-driven page creation, reusable layouts, content variables, metadata patterns, and automated publishing logic.":
    "Создание страниц из данных, повторно используемые макеты, переменные контента, паттерны метаданных и автоматизированная логика публикации.",
  "Page types, site structure, taxonomy, internal linking, navigation, templates, and content relationships.":
    "Типы страниц, структура сайта, таксономия, внутренняя перелинковка, навигация, шаблоны и связи контента.",
  "Design site architecture, templates, content models, and data relationships.":
    "Спроектировать архитектуру сайта, шаблоны, модели контента и связи данных.",
  "Contact details optional": "Контактные детали, опционально"
};

const roCopy: Dictionary = {
  "AlfaRank designs and launches digital systems for business operations, content infrastructure, automation, and growth.":
    "AlfaRank proiecteaza si lanseaza sisteme digitale pentru operatiuni de business, infrastructura de continut, automatizare si crestere.",
  "AlfaRank designs and launches practical digital systems for companies that need automation, content infrastructure, data workflows, web platforms, and business integrations.":
    "AlfaRank creeaza sisteme digitale practice pentru companii care au nevoie de automatizare, infrastructura de continut, fluxuri de date, platforme web si integrari de business.",
  "Digital systems connected, automated, built to perform.": "Sisteme digitale conectate, automatizate si construite pentru performanta.",
  "Digital systems that connect, automate, and perform.": "Sisteme digitale conectate si automatizate.",
  "AlfaRank builds the infrastructure behind modern business workflows: web platforms, AI automation, SEO/content systems, data tools, e-commerce operations, and integrations.":
    "AlfaRank construieste infrastructura din spatele fluxurilor moderne de business: platforme web, automatizare AI, sisteme SEO si continut, instrumente de date, operatiuni e-commerce si integrari.",
  "The company works across connected technical directions. Each direction can be delivered as a standalone system or combined into a broader business platform.":
    "Compania lucreaza pe directii tehnice conectate. Fiecare directie poate fi livrata ca sistem separat sau combinata intr-o platforma de business mai ampla.",
  "The site is organized around business problems first. Each solution describes the workflow, infrastructure, and output required to make the process repeatable.":
    "Site-ul este organizat mai intai in jurul problemelor de business. Fiecare solutie descrie fluxul, infrastructura si rezultatul necesare pentru a face procesul repetabil.",
  "Systems are presented as practical profiles: what the system does, how the workflow is structured, which modules are involved, and what business output it supports.":
    "Sistemele sunt prezentate ca profiluri practice: ce face sistemul, cum este structurat fluxul, ce module sunt implicate si ce rezultat de business sustine.",
  "Define the business problem and the operational result.": "Definim problema de business si rezultatul operational.",
  "Map the current website, content, CRM, data, or workflow layer.": "Mapam site-ul, continutul, CRM-ul, datele sau stratul de workflow existent.",
  "Design the system scope, modules, data inputs, and integrations.": "Proiectam scope-ul sistemului, modulele, intrarile de date si integrarile.",
  "Build a prototype or first working version.": "Construim un prototip sau prima versiune functionala.",
  "Launch, connect, measure, and improve the system.": "Lansam, conectam, masuram si imbunatatim sistemul.",

  "AI Automation": "Automatizare AI",
  "Web & Product Development": "Dezvoltare web si produs",
  "SEO & Content Infrastructure": "Infrastructura SEO si continut",
  "Data Systems & Scraping": "Sisteme de date si scraping",
  "E-commerce Systems": "Sisteme e-commerce",
  "Video & Media Automation": "Automatizare video si media",
  "WordPress & API Integrations": "Integrari WordPress si API",
  "Generate More Content": "Genereaza mai mult continut",
  "Automate Lead Processing": "Automatizeaza procesarea leadurilor",
  "Build Internal Tools": "Construieste instrumente interne",
  "Launch a Digital Product": "Lanseaza un produs digital",
  "Upgrade an Existing Website": "Upgrade pentru un site existent",
  "Build a Data/Monitoring System": "Sistem de date si monitorizare",
  "Scale SEO Infrastructure": "Scaleaza infrastructura SEO",
  "Content Automation Workflows": "Workflow-uri de automatizare a continutului",
  "E-commerce System": "Sistem e-commerce",
  "WordPress Tools": "Instrumente WordPress",
  "Data/Audit/Ranking Systems": "Sisteme data/audit/ranking",
  "Service Businesses": "Businessuri de servicii",
  "E-commerce": "E-commerce",
  "Media & Content Projects": "Proiecte media si continut",
  "Travel": "Travel",
  "Local Business": "Business local",
  "SaaS / MVP": "SaaS / MVP",
  "Agencies": "Agentii",
  "Data-heavy Businesses": "Businessuri data-heavy",

  "AI workflows that reduce manual work, accelerate content and data operations, and connect business systems into repeatable processes.":
    "Workflow-uri AI care reduc munca manuala, accelereaza operatiunile de continut si date si conecteaza sistemele de business in procese repetabile.",
  "Web platforms, product interfaces, dashboards, portals, MVPs, and operational tools built around business workflows.":
    "Platforme web, interfete de produs, dashboarduri, portaluri, MVP-uri si instrumente operationale construite in jurul workflow-urilor de business.",
  "Search and content systems based on data, templates, publishing workflows, and scalable site architecture.":
    "Sisteme de search si continut bazate pe date, template-uri, workflow-uri de publicare si arhitectura scalabila.",
  "Systems for collecting, normalizing, monitoring, auditing, and ranking business data from multiple sources.":
    "Sisteme pentru colectarea, normalizarea, monitorizarea, auditarea si rankingul datelor de business din mai multe surse.",
  "Catalog, feed, content, pricing, stock, and integration infrastructure for e-commerce operations.":
    "Infrastructura de catalog, feeduri, continut, pricing, stoc si integrari pentru operatiuni e-commerce.",
  "Automated media workflows for video, content production, asset generation, and repeatable publishing processes.":
    "Workflow-uri media automatizate pentru video, productie de continut, generare de asseturi si procese repetabile de publicare.",
  "WordPress-based systems, custom integrations, API connections, publishing tools, and business automation layers.":
    "Sisteme bazate pe WordPress, integrari custom, conexiuni API, instrumente de publicare si straturi de automatizare business.",
  "Build a content production system that turns topics, data, templates, and review workflows into publishable output.":
    "Construieste un sistem de productie de continut care transforma topicuri, date, template-uri si review workflow in output publicabil.",
  "Connect forms, CRM, enrichment, scoring, routing, notifications, and follow-up into one lead operating flow.":
    "Conecteaza formulare, CRM, enrichment, scoring, routing, notificari si follow-up intr-un singur flux de leaduri.",
  "Replace spreadsheets and manual coordination with internal dashboards, databases, and workflow tools.":
    "Inlocuieste spreadsheeturile si coordonarea manuala cu dashboarduri interne, baze de date si workflow tools.",
  "Build the first usable version of a product, portal, dashboard, or platform around a clear business workflow.":
    "Construieste prima versiune utilizabila a unui produs, portal, dashboard sau platforma in jurul unui workflow clar.",
  "Modernize an existing site into a structured business system with better content, performance, integrations, and conversion paths.":
    "Modernizeaza un site existent intr-un sistem de business structurat, cu continut, performanta, integrari si conversion paths mai bune.",
  "Collect, normalize, monitor, and report on business data from websites, APIs, feeds, files, or internal sources.":
    "Colecteaza, normalizeaza, monitorizeaza si raporteaza date de business din site-uri, API-uri, feeduri, fisiere sau surse interne.",
  "Build the site architecture, data structures, templates, and publishing workflows needed for scalable organic growth.":
    "Construieste arhitectura site-ului, structurile de date, template-urile si workflow-urile de publicare necesare pentru crestere organica scalabila.",
  "A system profile for structured business workflows, content infrastructure, or productized operational modules.":
    "Profil de sistem pentru workflow-uri de business structurate, infrastructura de continut sau module operationale productizate.",
  "AI, video, content, and media automation profile focused on repeatable generation and production workflows.":
    "Profil de automatizare AI, video, continut si media, axat pe generare si productie repetabila.",
  "A system profile for generating, reviewing, enriching, publishing, and monitoring content at scale.":
    "Profil de sistem pentru generare, review, enrichment, publicare si monitorizare de continut la scara.",
  "Catalog, product content, feed, integration, and monitoring infrastructure for e-commerce operations.":
    "Infrastructura de catalog, product content, feeduri, integrari si monitorizare pentru operatiuni e-commerce.",
  "Custom WordPress tools, API connections, content workflows, and admin utilities for business websites.":
    "Instrumente WordPress custom, conexiuni API, workflow-uri de continut si utilitare admin pentru site-uri de business.",
  "Systems for collecting data, scoring entities, auditing assets, ranking results, and generating reports.":
    "Sisteme pentru colectare de date, scoring de entitati, audit de assets, ranking de rezultate si generare de rapoarte.",
  "Lead systems, CRM flows, content infrastructure, websites, and internal tools.":
    "Sisteme de leaduri, fluxuri CRM, infrastructura de continut, site-uri si instrumente interne.",
  "Catalog infrastructure, feeds, product content, pricing, analytics, and integrations.":
    "Infrastructura de catalog, feeduri, product content, pricing, analytics si integrari.",
  "Editorial workflows, content databases, programmatic publishing, and automation.":
    "Workflow-uri editoriale, baze de continut, publicare programatica si automatizare.",
  "Destination data, catalog structures, availability, scraping, and SEO infrastructure.":
    "Date de destinatii, structuri de catalog, disponibilitate, scraping si infrastructura SEO.",
  "Local landing infrastructure, lead automation, monitoring, and review/data workflows.":
    "Infrastructura de landing local, automatizare leaduri, monitorizare si workflow-uri review/data.",
  "MVPs, dashboards, portals, onboarding flows, data models, and integrations.":
    "MVP-uri, dashboarduri, portaluri, onboarding flows, modele de date si integrari.",
  "White-label systems, reporting automation, content production, and internal tooling.":
    "Sisteme white-label, automatizare reporting, productie de continut si internal tooling.",
  "Collection, normalization, monitoring, alerting, dashboards, and reporting systems.":
    "Sisteme de colectare, normalizare, monitorizare, alerting, dashboarduri si raportare.",

  "Lead automation landing page": "Landing page pentru automatizare leaduri",
  "Content system landing page": "Landing page pentru sistem de continut",
  "E-commerce operations landing page": "Landing page pentru operatiuni e-commerce",
  "WordPress integration landing page": "Landing page pentru integrare WordPress",
  "Automate lead processing before good requests go cold.": "Automatizeaza procesarea leadurilor inainte ca solicitarile bune sa se raceasca.",
  "Automate lead intake before requests go cold.": "Automatizeaza intake-ul de leaduri la timp.",
  "Build an AI-assisted content workflow with editorial control.": "Construieste un workflow de continut asistat de AI, cu control editorial.",
  "Build an AI content workflow with editorial control.": "Construieste un workflow AI pentru continut.",
  "Turn product data, feeds, and catalog updates into one system.": "Transforma datele de produs, feedurile si actualizarile catalogului intr-un singur sistem.",
  "Unify product data, feeds, and catalog updates.": "Unifica datele de produs, feedurile si catalogul.",
  "Connect WordPress forms, CRM, APIs, and internal workflow.": "Conecteaza formularele WordPress, CRM-ul, API-urile si workflow-ul intern.",
  "Connect WordPress, CRM, APIs, and workflows.": "Conecteaza WordPress, CRM, API-uri si workflow-uri.",
  "Request This System": "Solicita acest sistem",
  "Related Solution": "Solutie asociata",
  "Digital systems company": "Companie de sisteme digitale",
  "Start a Project": "Porneste un proiect",
  "Explore Capabilities": "Exploreaza capabilitatile",
  "View Solutions": "Vezi solutii",
  "View Capabilities": "Vezi capabilitati",
  "All Systems": "Toate sistemele",
  "All Industries": "Toate industriile",
  "Back to Home": "Inapoi acasa",
  "Capabilities": "Capabilitati",
  "Solutions": "Solutii",
  "Systems": "Sisteme",
  "Technologies": "Tehnologii",
  "Industries": "Industrii",
  "Capability": "Capabilitate",
  "Solution": "Solutie",
  "System profile": "Profil de sistem",
  "Industry profile": "Profil de industrie",
  "About AlfaRank": "Despre AlfaRank",
  "Request received": "Solicitare primita",
  "Technical directions for building digital systems.": "Directii tehnice pentru construirea sistemelor digitale.",
  "AlfaRank capabilities are organized around what the company can build, connect, automate, and launch.":
    "Capabilitatile AlfaRank sunt organizate in jurul a ceea ce compania poate construi, conecta, automatiza si lansa.",
  "Business problems translated into working systems.": "Probleme de business transformate in sisteme functionale.",
  "Solution pages connect operational, marketing, content, and data problems to the infrastructure required to solve them.":
    "Paginile de solutii conecteaza problemele operationale, de marketing, continut si date cu infrastructura necesara pentru rezolvare.",
  "System and project profiles.": "Profiluri de sisteme si proiecte.",
  "This section is structured around systems, modules, workflows, outputs, and implementation logic instead of a generic portfolio grid.":
    "Sectiunea este structurata in jurul sistemelor, modulelor, workflow-urilor, outputurilor si logicii de implementare, nu ca un portofoliu generic.",
  "Digital systems for businesses with operational, content, data, and growth workflows.":
    "Sisteme digitale pentru businessuri cu workflow-uri operationale, de continut, date si crestere.",
  "Digital systems by industry.": "Sisteme digitale pe industrie.",
  "AlfaRank systems can be adapted to different industries when the business needs structured web platforms, automation, content infrastructure, integrations, or monitoring.":
    "Sistemele AlfaRank pot fi adaptate pentru industrii diferite cand businessul are nevoie de platforme web structurate, automatizare, infrastructura de continut, integrari sau monitorizare.",
  "The implementation layer behind AlfaRank systems.": "Stratul de implementare din spatele sistemelor AlfaRank.",
  "The stack is selected for practical delivery: clear content models, stable deployment, API integration, automation, data processing, and measurable operations.":
    "Stackul este ales pentru livrare practica: modele clare de continut, deploy stabil, integrari API, automatizare, procesare de date si operatiuni masurabile.",
  "Practical system development for business output.": "Dezvoltare practica de sisteme pentru rezultat de business.",
  "AlfaRank combines marketing logic, engineering, automation, content infrastructure, and data workflows to build digital systems that work inside real business processes.":
    "AlfaRank combina logica de marketing, engineering, automatizare, infrastructura de continut si workflow-uri de date pentru sisteme digitale care functioneaza in procese reale de business.",
  "Define the system your business needs.": "Defineste sistemul de care businessul tau are nevoie.",
  "Use the form to describe the project type, current setup, business problem, desired result, and optional timeline or budget.":
    "Foloseste formularul pentru a descrie tipul proiectului, setupul curent, problema de business, rezultatul dorit si optional timeline sau buget.",
  "Your project request has been submitted.": "Solicitarea ta de proiect a fost trimisa.",
  "AlfaRank will review the project type, business problem, current system, and desired result before the next step.":
    "AlfaRank va analiza tipul proiectului, problema de business, sistemul curent si rezultatul dorit inainte de pasul urmator.",
  "Data": "Date",
  "Syncing": "Sincronizare",
  "Signals": "Semnale",
  "Active": "Activ",
  "Automation": "Automatizare",
  "Content": "Continut",
  "Published": "Publicat",
  "SEO engine": "Motor SEO",
  "Connected": "Conectat",
  "Lead flow": "Flux de leaduri",
  "APIs": "API-uri",
  "Live": "Live",
  "Reports": "Rapoarte",
  "Updated": "Actualizat",
  "Decisions": "Decizii",
  "7 directions": "7 directii",
  "Launchable": "Lansabil",
  "Ready": "Gata",
  "Build step": "Etapa de build",
  "Map intake": "Mapare intake",
  "Lead sources, forms, owners, and follow-up timing are mapped before automation starts.":
    "Sursele de leaduri, formularele, responsabilii si timpii de raspuns sunt mapate inainte de automatizare.",
  "Define routing": "Logica de rutare",
  "Fields, qualification logic, priority rules, and ownership become one intake model.":
    "Campurile, logica de calificare, prioritatile si ownershipul devin un singur model de intake.",
  "Connect handoff": "Conectare handoff",
  "CRM, email, dashboards, sheets, or notifications receive the structured request.":
    "CRM-ul, emailul, dashboardurile, sheeturile sau notificarile primesc cererea structurata.",
  "Review live leads": "Verificare leaduri live",
  "Real submissions show source quality, response speed, owner status, and next action.":
    "Cererile reale arata calitatea sursei, viteza raspunsului, statusul ownerului si pasul urmator.",
  "Select content type": "Tip de continut",
  "One page type, template, source set, and desired CMS output become the first scope.":
    "Un tip de pagina, un sablon, setul de surse si rezultatul CMS dorit definesc primul scope.",
  "Design production model": "Model de productie",
  "Prompts, fields, review states, metadata, and approval rules are fixed before generation.":
    "Prompturile, campurile, starile de review, metadata si regulile de aprobare sunt fixate inainte de generare.",
  "Build workflow": "Construire workflow",
  "Generation, enrichment, QA, and publishing handoff move through one controlled path.":
    "Generarea, imbogatirea, QA-ul si handofful spre publicare merg pe o singura ruta controlata.",
  "Measure content signals": "Masurare semnale",
  "Output quality, speed, queue status, indexation, and gaps guide the next cycle.":
    "Calitatea outputului, viteza, statusul cozii, indexarea si gapurile ghideaza urmatorul ciclu.",
  "Audit catalog flow": "Audit flux catalog",
  "Product data, feeds, platform limits, and update routines are checked as one operating path.":
    "Datele de produs, feedurile, limitele platformei si rutina de actualizare sunt verificate ca un singur flux operational.",
  "Define data rules": "Reguli de date",
  "Fields, transformations, validation rules, and monitoring needs become the product model.":
    "Campurile, transformarile, regulile de validare si monitorizarea devin modelul de produs.",
  "Build operating modules": "Module operationale",
  "Feed export, validation, dashboard, alerts, or reports are assembled around the model.":
    "Exportul de feed, validarea, dashboardul, alertele sau rapoartele sunt asamblate in jurul modelului.",
  "Tune with live data": "Ajustare cu date reale",
  "Real products expose missing fields, feed issues, price changes, and operational actions.":
    "Produsele reale arata campuri lipsa, probleme de feed, schimbari de pret si actiuni operationale.",
  "Map WordPress stack": "Mapare stack WordPress",
  "Plugins, forms, content objects, CRM route, and manual handoffs are reviewed together.":
    "Pluginurile, formularele, obiectele de continut, ruta CRM si handoffurile manuale sunt analizate impreuna.",
  "Define workflow objects": "Obiecte workflow",
  "Fields, statuses, validation, ownership, and API handoff become the controlled model.":
    "Campurile, statusurile, validarea, ownershipul si handofful API devin modelul controlat.",
  "Build integration layer": "Strat de integrare",
  "Custom tooling, automation, or API sync connects WordPress to the operating workflow.":
    "Toolingul custom, automatizarea sau sincronizarea API conecteaza WordPress la workflowul operational.",
  "Test real submissions": "Test cu cereri reale",
  "Live records confirm routing, logs, owner status, next action, and documentation.":
    "Inregistrarile live confirma rutarea, logurile, statusul ownerului, pasul urmator si documentatia.",
  "Themes, entities, page types, and briefs are organized before generation starts.":
    "Temele, entitatile, tipurile de pagini si briefurile sunt organizate inainte de generare.",
  "Sources, product data, keywords, and rules become controlled inputs for the workflow.":
    "Sursele, datele de produs, keywordurile si regulile devin intrari controlate pentru flux.",
  "AI creates drafts from templates instead of isolated prompts and loose instructions.":
    "AI creeaza drafturi din sabloane, nu din prompturi izolate si instructiuni vagi.",
  "Editors keep quality control through statuses, checks, corrections, and approvals.":
    "Editorii pastreaza controlul calitatii prin statusuri, verificari, corectii si aprobari.",
  "Approved output moves toward CMS, metadata, internal links, and publishing queues.":
    "Rezultatul aprobat trece spre CMS, metadata, linkuri interne si cozi de publicare.",
  "Performance, indexation, gaps, and queue status feed the next production cycle.":
    "Performanta, indexarea, golurile si statusul cozii alimenteaza urmatorul ciclu de productie.",
  "Route console": "Consola de ruta",
  "Industry system core": "Nucleu de sistem pentru industrie",
  "System fit": "Potrivire de sistem",
  "Where this system connects next": "Unde se conecteaza mai departe sistemul",
  "Landing-page development": "Dezvoltarea landing page-ului",
  "How traffic becomes scoped demand": "Cum traficul devine cerere clarificata",
  "Landing angle": "Unghi de landing page",
  "Offer route": "Ruta ofertei",
  "Proof signals": "Semnale de dovada",
  "Angle": "Unghi",
  "Route": "Ruta",
  "Evidence": "Dovada",
  "Next conversion step": "Urmatorul pas de conversie",
  "Scope an industry system": "Defineste un sistem pentru industrie",
  "Scope Industry System": "Defineste sistemul industriei",
  "Related build paths": "Rute de build asociate",
  "Related systems": "Sisteme asociate",
  "Related areas": "Zone asociate",
  "Business output": "Rezultat de business",
  "What this covers": "Ce acopera",
  "What this solution covers": "Ce acopera solutia",
  "Expected output": "Output asteptat",
  "Relevant capabilities": "Capabilitati relevante",
  "System modules": "Module de sistem",
  "Implementation logic": "Logica de implementare",
  "Implementation path": "Calea de implementare",
  "Implementation options": "Optiuni de implementare",
  "Use cases": "Cazuri de utilizare",
  "Lead-generation proof": "Dovada pentru generarea leadurilor",
  "System blueprint": "Blueprint de sistem",
  "System overview": "Prezentare sistem",
  "Outputs": "Outputuri",
  "Core modules": "Module principale",
  "Workflow": "Flux de lucru",
  "All current industry contexts": "Toate contextele curente de industrie",
  "Industry catalog": "Catalog de industrii",
  "Priority industry routes": "Rute prioritare de industrie",
  "Technology matrix": "Matrice tehnologica",
  "Core stack": "Stack principal",
  "Selection logic": "Logica de selectie",
  "Operating principles": "Principii operationale",
  "Business problem to working system.": "De la problema de business la sistem functional.",
  "Project intake": "Introducere proiect",
  "Good project inputs": "Inputuri bune pentru proiect",
  "Quick project signal": "Semnal rapid de proiect",
  "Send a short request first.": "Trimite mai intai o solicitare scurta.",
  "If the full brief feels early, send the pressure point and contact. The first reply can turn it into scope.":
    "Daca brief-ul complet este prea devreme, trimite punctul de presiune si contactul. Primul raspuns il poate transforma in scope.",
  "Direct channels": "Canale directe",
  "Use a direct channel if the request is urgent.": "Daca solicitarea este urgenta, foloseste un canal direct.",
  "Telegram": "Telegram",
  "WhatsApp": "WhatsApp",
  "What should become faster or clearer?": "Ce trebuie sa devina mai rapid sau mai clar?",
  "Send Quick Request": "Trimite solicitare rapida",
  "Open full brief": "Deschide brief-ul complet",
  "After the request": "Dupa solicitare",
  "What happens next": "Ce urmeaza",
  "Response target": "Tinta de raspuns",
  "1 business day": "1 zi lucratoare",
  "The first reply confirms the pressure point, missing context, and the smallest useful next step.":
    "Primul raspuns confirma punctul de presiune, contextul lipsa si cel mai util pas urmator.",
  "Routed request": "Cerere rutata",
  "Score, route, next action": "Scor, ruta, actiune",
  "Source, offer, priority, and next action stay attached to the lead.":
    "Sursa, oferta, prioritatea si urmatoarea actiune raman atasate leadului.",
  "Clear first scope": "Primul scope clar",
  "Implementation boundary": "Limita de implementare",
  "The first step is shaped as a useful build boundary, not a vague discovery call.":
    "Primul pas este definit ca o limita utila de build, nu ca un apel vag de discovery.",
  "Human review": "Revizie umana",
  "No pressure loop": "Fara presiune",
  "If the request is early, the answer asks for missing context instead of forcing a sales call.":
    "Daca solicitarea este timpurie, raspunsul cere contextul lipsa in loc sa forteze un apel de vanzare.",
  "Proof assets": "Active de dovada",
  "Example first-stage proof": "Exemple de dovada pentru primul stadiu",
  "A lead converts more easily when the first build has a visible proof target. These patterns show what can be validated before a larger system is expanded.":
    "Un lead converteste mai usor cand prima constructie are o tinta vizibila de dovada. Aceste modele arata ce poate fi validat inainte ca sistemul sa fie extins.",
  "Lead intake system": "Sistem de intake pentru leaduri",
  "Requests arrive from forms, ads, referrals, email, and messengers with no single owner or next action.":
    "Solicitarile vin din formulare, reclame, recomandari, email si mesagerie fara un singur responsabil sau urmatoarea actiune clara.",
  "One tracked intake path with source context, priority, owner, status, and next action.":
    "Un singur traseu de intake urmarit, cu sursa, prioritate, responsabil, status si urmatoarea actiune.",
  "Stored lead source, response state, routing bucket, and follow-up queue.":
    "Sursa leadului, starea raspunsului, ruta de procesare si coada de follow-up sunt salvate.",
  "Content operation": "Operatiune de continut",
  "Topics, briefs, drafts, approvals, publishing, and SEO checks live in separate manual steps.":
    "Topicurile, briefurile, drafturile, aprobarile, publicarea si verificarile SEO stau in pasi manuali separati.",
  "A controlled publishing workflow with templates, review states, CMS handoff, and reporting points.":
    "Un flux controlat de publicare cu template-uri, stari de review, predare catre CMS si puncte de raportare.",
  "Visible queue, approval status, publishing output, indexation or performance signals.":
    "Coada vizibila, status de aprobare, output publicat, semnale de indexare sau performanta.",
  "Data and commerce control": "Control pentru date si commerce",
  "Catalog, prices, stock, competitors, or operational data are checked by hand and become stale quickly.":
    "Catalogul, preturile, stocurile, competitorii sau datele operationale sunt verificate manual si devin rapid invechite.",
  "A normalized data layer with checks, alerts, dashboard output, and an action list.":
    "Un strat de date normalizat, cu verificari, alerte, dashboard si lista de actiuni.",
  "Freshness checks, missing-field reports, alerts, data coverage, and completed actions.":
    "Verificari de prospetime, rapoarte pentru campuri lipsa, alerte, acoperire de date si actiuni finalizate.",
  "Pressure": "Presiune",
  "First useful build": "Prima constructie utila",
  "Proof signal": "Semnal de dovada",
  "The proof target is selected from the submitted workflow, not forced into a generic service package.":
    "Tinta de dovada este aleasa din fluxul trimis, nu fortata intr-un pachet generic de servicii.",
  "Scope a proof path": "Defineste ruta de dovada",
  "Send Project Request": "Trimite solicitarea",
  "Project type": "Tip proiect",
  "Business problem": "Problema de business",
  "Desired result": "Rezultat dorit",
  "Desired output": "Output dorit",
  "Current website/system": "Site/sistem curent",
  "Name": "Nume",
  "Email": "Email",
  "Company optional": "Companie, optional",
  "Budget optional": "Buget, optional",
  "Timeline optional": "Termen, optional",
  "Decision hub": "Centru de decizie",
  "From business problem": "De la problema de business",
  "To an operational system": "La sistem operational",
  "Choose the pressure point. Follow the route to solutions and system.":
    "Alege punctul de presiune. Urmeaza ruta catre solutii si sistem.",
  "Pressure point": "Punct de presiune",
  "A business need becomes a working system with measurable output.":
    "Nevoia de business devine un sistem functional cu rezultat masurabil.",
  "Orbit automation": "Automatizare",
  "Orbit web platform": "Platforma web",
  "Orbit content SEO": "Continut / SEO",
  "Orbit data": "Date",
  "Orbit ecommerce": "E-commerce",
  "Orbit integrations": "Integrari",
  "Clear routes": "Rute clare",
  "From problem to solution": "De la problema la solutie",
  "Proven solutions": "Solutii verificate",
  "Ready modules and practices": "Module si practici pregatite",
  "Measurable result": "Rezultat masurabil",
  "Transparency and control": "Transparenta si control",
  "Secure and scalable": "Sigur si scalabil",
  "Reliable platform for growth": "Platforma fiabila pentru crestere",
  "What system do you need?": "Ce sistem iti trebuie?",
  "Start from the operational need. Each route points to the most relevant capability, solution, or system profile so the home page works like a map of the company.":
    "Porneste de la nevoia operationala. Fiecare ruta duce catre capabilitatea, solutia sau profilul de sistem relevant, astfel incat pagina principala functioneaza ca o harta a companiei.",
  "Need -> System": "Nevoie -> sistem",
  "Choose the pressure point, then follow the route into the section with the right level of detail.":
    "Alege punctul de presiune si urmeaza ruta catre sectiunea cu nivelul potrivit de detaliu.",
  "what can be built": "ce se poate construi",
  "which problem it solves": "ce problema rezolva",
  "how it operates": "cum opereaza",
  "what connects it": "ce il conecteaza",
  "what to scope first": "ce trebuie definit primul",
  "Campaign landing pages": "Landing pages pentru campanii",
  "Offer pages built for ads and client leads": "Pagini de oferta pentru reclame si leaduri",
  "These pages translate the broader system catalog into concrete buyer-ready offers with a problem, modules, proof signals, and a tracked intake path.":
    "Aceste pagini transforma catalogul de sisteme in oferte concrete pentru cumparatori: problema, module, semnale de dovada si traseu de cerere urmarit.",
  "Lead acquisition layer": "Strat de achizitie leaduri",
  "Each campaign page turns one buyer problem into a scoped system request with proof, modules, CTA, and intake tracking.":
    "Fiecare pagina de campanie transforma o problema a cumparatorului intr-o cerere de sistem clar definita, cu dovada, module, CTA si tracking pentru intake.",
  "Plan campaign route": "Planifica ruta campaniei",
  "Ad message": "Mesaj publicitar",
  "Proof layer": "Strat de dovada",
  "Tracked intake": "Cerere urmarita",
  "What AlfaRank builds": "Ce construieste AlfaRank",
  "ALFARANK CORE": "NUCLEU ALFARANK",
  "Capabilities are not a menu of services. They are a set of technical forces that can be combined into one operating system.":
    "Capabilitatile nu sunt un meniu de servicii, ci un set de forte tehnice care pot fi combinate intr-un sistem operational.",
  "Business problems mapped to systems": "Probleme de business mapate in sisteme",
  "Business pressure": "Presiune de business",
  "Business pressure routed into system output.": "Presiunea de business devine output de sistem.",
  "Each solution starts from an operational problem and turns it into a path for content, leads, data, products, teams, or growth systems.":
    "Fiecare solutie porneste de la o problema operationala si o transforma intr-o ruta pentru continut, leaduri, date, produse, echipe sau sisteme de crestere.",
  "ALFARANK ROUTING ENGINE": "MOTOR DE RUTARE ALFARANK",
  "Capture. Process. Route. Deliver.": "Captureaza. Proceseaza. Ruteaza. Livreaza.",
  "Scope a route": "Defineste ruta",
  "Route engine": "Motor de ruta",
  "Problem to system": "Problema in sistem",
  "Inputs are converted into scoped implementation paths, then into measurable business outputs.":
    "Inputurile sunt convertite in rute de implementare clare, apoi in rezultate de business masurabile.",
  "View solution routes": "Vezi rutele de solutii",
  "System output": "Output de sistem",
  "Open route": "Deschide ruta",
  "Slow leads": "Leaduri lente",
  "Manual content": "Productie manuala",
  "Broken data": "Date deteriorate",
  "Disconnected tools": "Instrumente separate",
  "Unclear project scope": "Proiect neclar",
  "Qualified pipeline": "Pipeline calificat",
  "Publishing engine": "Motor de publicare",
  "Live monitoring": "Monitorizare live",
  "Connected workflow": "Flux conectat",
  "Scoped implementation route": "Ruta de implementare definita",
  "From client workflow to operating system": "De la workflow-ul clientului la sistem operational",
  "Input": "Input",
  "Rules + AI": "Reguli + AI",
  "Human Review": "Revizie umana",
  "Lead, content, catalog, or source data enters one controlled model.":
    "Leadurile, continutul, catalogul sau datele sursa intra intr-un model controlat.",
  "Automation classifies, enriches, routes, drafts, and checks work.":
    "Automatizarea clasifica, imbogateste, ruteaza, redacteaza si verifica lucrul.",
  "Approvals, corrections, owner decisions, and fallback states stay visible.":
    "Aprobarile, corectiile, deciziile ownerului si starile de fallback raman vizibile.",
  "CRM actions, published pages, dashboards, feeds, or reports leave the system.":
    "Din sistem ies actiuni CRM, pagini publicate, dashboarduri, feeduri sau rapoarte.",
  "Technology layer": "Strat tehnologic",
  "Built with practical, integration-ready technology.": "Construit cu tehnologie practica, gata de integrari.",
  "AlfaRank uses established web, automation, AI, data, and CMS technologies to create systems that can be launched, reviewed, integrated, and improved without locking the business into a fragile stack.":
    "AlfaRank foloseste tehnologii web, automation, AI, data si CMS validate pentru a crea sisteme care pot fi lansate, revizuite, integrate si imbunatatite fara a bloca businessul intr-un stack fragil.",
  "View Technologies": "Vezi tehnologiile",
  "Stack logic": "Logica stackului",
  "Where the systems apply": "Unde se aplica sistemele",
  "The same system approach works across service businesses, e-commerce, media, travel, local businesses, SaaS, and data-heavy operations.":
    "Aceeasi abordare de sistem functioneaza pentru businessuri de servicii, e-commerce, media, travel, businessuri locale, SaaS si operatiuni data-heavy.",
  "Implementation matrix": "Matrice de implementare",
  "Stack layers ready": "Straturi de stack pregatite",
  "Frontend": "Frontend",
  "Publishing": "Publicare",
  "Deploy": "Deploy",
  "Tools": "Instrumente",
  "Layers": "Straturi",
  "Connective tissue": "Strat de conectare",
  "Operating model": "Model operational",
  "Execution loop active": "Bucla de executie activa",
  "Work stages": "Etape de lucru",
  "System owner": "Owner de sistem",
  "Delivery mode": "Mod de livrare",
  "Request path open": "Ruta de cerere deschisa",
  "Current setup": "Configuratie curenta",
  "Follow-up": "Follow-up",
  "Input fields": "Campuri de input",
  "Mission control": "Centru de control",
  "Client system map / live routing": "Harta sistemului client / rutare live",
  "Orchestrate. Automate. Scale.": "Orchestreaza. Automatizeaza. Scaleaza.",
  "System online": "Sistem online",
  "Implementation layer": "Strat de implementare",
  "Technology layer and integrations": "Strat tehnologic si integrari",
  "AlfaRank core": "Nucleu AlfaRank",
  "Mapped nodes": "Noduri mapate",
  "Flow state": "Stare flux",
  "Output path": "Ruta outputului",
  "Buildable": "Construibil",
  "Reusable": "Reutilizabil",
  "Measured": "Masurat",
  "Problem": "Problema",
  "Process": "Proces",
  "Deliver": "Livrare",
  "Measure": "Masurare",
  "Profile": "Profil",
  "Module": "Modul",
  "Modules": "Module",
  "Interface": "Interfata",
  "Output": "Output",
  "Reuse": "Reutilizare",
  "Need": "Nevoie",
  "Flow": "Flux",
  "System": "Sistem",
  "Result": "Rezultat",
  "Proof": "Dovada",
  "Market": "Piata",
  "Context": "Context",
  "Growth": "Crestere",
  "AI layer": "Strat AI",
  "Web layer": "Strat web",
  "Content layer": "Strat de continut",
  "Data layer": "Strat de date",
  "Commerce layer": "Strat commerce",
  "Media pipeline": "Pipeline media",
  "API layer": "Strat API",
  "Tooling layer": "Strat de instrumente",
  "Product layer": "Strat produs",
  "Monitoring layer": "Strat monitorizare",
  "Growth layer": "Strat de crestere",
  "System space": "Spatiu de sistem",
  "Review lens": "Lentila de review",
  "Workflow layer": "Strat workflow",
  "Scoring layer": "Strat scoring",
  "Market map": "Harta pietei",
  "Local layer": "Strat local",
  "Interfaces + routes": "Interfete + rute",
  "Content models": "Modele de continut",
  "Assistants + actions": "Asistenti + actiuni",
  "Collection + scoring": "Colectare + scoring",
  "Launch pipeline": "Pipeline de lansare",
  "Define": "Definire",
  "Shape": "Modelare",
  "Build": "Construire",
  "Launch": "Lansare",
  "Ship": "Livrare",
  "Improve": "Imbunatatire",
  "Working model": "Model functional",
  "Production path": "Ruta de productie",
  "Signals + reports": "Semnale + rapoarte",
  "Needs": "Nevoi",
  "Fit": "Potrivire",
  "Industry fit mapped": "Potrivirea industriei mapata",
  "Industry system": "Sistem de industrie",
  "Industry map": "Harta industriilor",
  "Market contexts mapped": "Contexte de piata mapate",
  "Fit map": "Harta potrivirii",
  "Service, commerce, media, travel, local, SaaS, agency, data-heavy workflows":
    "Workflow-uri servicii, commerce, media, travel, locale, SaaS, agentii si data-heavy",
  "Lead capture and routing": "Captare si rutare leaduri",
  "CRM follow-up": "Follow-up in CRM",
  "Local/service landing infrastructure": "Infrastructura de landing locala pentru servicii",
  "Operational dashboards": "Dashboarduri operationale",
  "Catalog data quality": "Calitatea datelor de catalog",
  "Feeds and marketplace sync": "Sincronizare feeduri si marketplace-uri",
  "Stock and pricing monitoring": "Monitorizare stoc si preturi",
  "Product/category content": "Continut de produs si categorie",
  "Editorial workflow": "Workflow editorial",
  "AI-assisted drafts": "Drafturi asistate de AI",
  "Media asset preparation": "Pregatire asseturi media",
  "Publishing and monitoring": "Publicare si monitorizare",
  "Destination data": "Date de destinatie",
  "Availability or catalog structures": "Structuri de disponibilitate sau catalog",
  "Programmatic SEO pages": "Pagini SEO programatice",
  "Monitoring and scraping": "Monitorizare si scraping",
  "Local landing pages": "Landing pages locale",
  "Review and ranking signals": "Semnale de review si ranking",
  "Website and CRM connections": "Conexiuni site si CRM",
  "MVP scope": "Scope MVP",
  "Product interface": "Interfata de produs",
  "Dashboard and admin tools": "Dashboarduri si instrumente admin",
  "Data and integration model": "Model de date si integrari",
  "White-label reporting": "Raportare white-label",
  "Client dashboards": "Dashboarduri client",
  "Content production systems": "Sisteme de productie continut",
  "Internal workflow tooling": "Instrumente pentru workflow intern",
  "Data collection": "Colectare date",
  "Normalization and scoring": "Normalizare si scoring",
  "Monitoring and alerts": "Monitorizare si alerte",
  "Reports and exports": "Rapoarte si exporturi",
  "Use the strongest repeated workflow as the first commercial solution route.":
    "Foloseste cel mai puternic workflow repetat ca prima ruta comerciala de solutie.",
  "Service businesses": "Businessuri de servicii",
  "Demand": "Cerere",
  "Catalog": "Catalog",
  "Production": "Productie",
  "Product": "Produs",
  "Lead automation": "Automatizare leaduri",
  "CRM flow": "Flux CRM",
  "Catalog data": "Date de catalog",
  "Feeds": "Feeduri",
  "Publishing pipeline": "Pipeline de publicare",
  "Media automation": "Automatizare media",
  "Dashboard": "Dashboard",
  "Portal": "Portal",
  "Faster qualified requests": "Cereri calificate mai rapid",
  "Cleaner product operations": "Operatiuni de produs mai curate",
  "Repeatable production": "Productie repetabila",
  "Launchable product layer": "Strat de produs lansabil",
  "Start with the business model, then map the system.": "Porneste de la modelul de business, apoi mapeaza sistemul.",
  "The strongest industry pages translate repeated business needs into concrete system patterns: lead flow, catalog operations, publishing, product interfaces, monitoring, and integrations.":
    "Cele mai puternice pagini de industrie transforma nevoile repetate de business in patternuri concrete de sistem: flux de leaduri, operatiuni de catalog, publicare, interfete de produs, monitorizare si integrari.",
  "Growth signal funnel": "Funnel de semnale de crestere",
  "Market context becomes system scope.": "Contextul de piata devine scope de sistem.",
  "Every industry route is treated as a live business signal: demand, catalog, content, product, data, and operational pressure.":
    "Fiecare ruta de industrie este tratata ca semnal live de business: cerere, catalog, continut, produs, date si presiune operationala.",
  "Each industry now has a profile page with system fit, likely build paths, and a project intake route.":
    "Fiecare industrie are acum o pagina de profil cu potrivire de sistem, rute probabile de constructie si traseu de intake.",
  "Sending request...": "Trimitem solicitarea...",
  "Sending request with source context...": "Trimitem solicitarea cu contextul sursei...",
  "Sending request with campaign context...": "Trimitem solicitarea cu contextul campaniei...",
  "Contact details optional": "Detalii de contact, optional"
};

const dictionaries: Record<Exclude<Locale, "en">, Dictionary> = {
  ro: roCopy,
  ru: {
    ...ruCopy,
    ...ruQualityOverrides
  }
};

const roQualityOverrides: Dictionary = {
  "acest page turns ad click in scoped sistem request: clear intrari, construire modules, launch rezultat, si reason to start.":
    "Aceasta pagina transforma clickul din reclama intr-o cerere de sistem bine definita: intrari clare, module de construit, rezultat de lansare si motiv concret pentru pornire.",
  "acest solutie is pentru businesses care receive leaduri din websites, ads, forms, calls, directories, sau partner channels si need cleaner operational process. AlfaRank builds lead sisteme care classify requests, enrich records, ruta work, update CRM date, si trigger follow-up actions.":
    "Aceasta solutie este pentru afaceri care primesc leaduri din site-uri, reclame, formulare, apeluri, directoare sau canale de parteneri si au nevoie de un proces operational mai curat. AlfaRank construieste sisteme de leaduri care clasifica cereri, imbogatesc inregistrari, ruteaza munca, actualizeaza datele din CRM si declanseaza actiuni de follow-up.",
  "acest solutie is pentru teams care rely on manuala coordination, scattered spreadsheets, repeated admin work, sau disconnected instrumente. AlfaRank builds internal instrumente care make afaceri processes visible, repeatable, si easier to operate.":
    "Aceasta solutie este pentru echipe care depind de coordonare manuala, foi de calcul imprastiate, munca administrativa repetata sau instrumente neconectate. AlfaRank construieste instrumente interne care fac procesele de business vizibile, repetabile si mai usor de operat.",
  "AI-assisted steps for drafts, scenes, captions, media variations, thumbnails, metadata, or structured production assets.":
    "Pasi asistati de AI pentru drafturi, scene, descrieri, variatii media, thumbnailuri, metadata sau asseturi structurate de productie.",
  "Create alerts for operational changes or data quality issues.":
    "Creeaza alerte pentru schimbari operationale sau probleme de calitate a datelor.",
  "Define product goal, users, flux de lucru, si first launch definire.":
    "Defineste obiectivul produsului, utilizatorii, fluxul de lucru si limita primei lansari.",
  "Definition of user roles, core actions, screens, date objects, flux de lucru states, si minimum sistem required pentru launch.":
    "Definirea rolurilor de utilizator, actiunilor principale, ecranelor, obiectelor de date, starilor de flux si sistemului minim necesar pentru lansare.",
  "First launch definire": "Limita primei lansari",
  "first launch path can be shaped din submitted details.": "Ruta primei lansari poate fi definita din detaliile trimise.",
  "form rute afaceri pressure, current sisteme, desired rezultat, si integrations in one project request.":
    "Formularul ruteaza presiunea de business, sistemele curente, rezultatul dorit si integrarile intr-o singura cerere de proiect.",
  "Human-in-the-loop automatizare pentru controlled rezultat": "Automatizare cu revizie umana pentru rezultat controlat",
  "Human-in-the-loop control": "Control cu revizie umana",
  "intrari, integrations, expected rezultat, si first launch boundary are turned in construire path.":
    "Intrarile, integrarile, rezultatul asteptat si limita primei lansari sunt transformate intr-o ruta de construire.",
  "Launch a digital product": "Lanseaza un produs digital",
  "Launch a SaaS MVP or productized service interface.": "Lanseaza un MVP SaaS sau o interfata de serviciu productizat.",
  "Launch cu real product date si tune pentru operational use.": "Lanseaza cu date reale de produs si ajusteaza pentru utilizare operationala.",
  "Launch first flux de lucru si revizie lead quality dupa real submissions.":
    "Lanseaza primul flux de lucru si revizuieste calitatea leadurilor dupa cereri reale.",
  "Launch or rebuild a web platform": "Lanseaza sau reconstruieste o platforma web",
  "Launch rezultat": "Rezultat de lansare",
  "Launch si iteration setup": "Lansare si setare pentru iteratii",
  "Launch sistem, validate date quality, si improve based on operational use.":
    "Lanseaza sistemul, valideaza calitatea datelor si imbunatateste pe baza utilizarii operationale.",
  "Launch upgraded site si monitor structure, performance, si rute de conversie.":
    "Lanseaza site-ul imbunatatit si monitorizeaza structura, performanta si rutele de conversie.",
  "Launch, measurement, iteration": "Lansare, masurare, iteratie",
  "Launch-ready deployment si iteration path": "Deployment pregatit pentru lansare si ruta de iteratie",
  "Launch-ready platform": "Platforma pregatita pentru lansare",
  "lead flows, project request forms, service/solutie pages, trust elements, routing logic, si measurable calls to action.":
    "fluxuri de leaduri, formulare de cerere de proiect, pagini de servicii si solutii, elemente de incredere, logica de rutare si apeluri la actiune masurabile.",
  "One platform path pentru continut, forms, lead date, reporting, si launch.":
    "O ruta de platforma pentru continut, formulare, date de lead, raportare si lansare.",
  "Project request": "Cerere de proiect",
  "Projects move through definire, prototype, implementation, integration, launch, si measurement.":
    "Proiectele trec prin definire, prototip, implementare, integrare, lansare si masurare.",
  "Publishing pipelines for generated assets.": "Fluxuri de publicare pentru asseturi generate.",
  "Recurring audit reports for agencies or internal teams.": "Rapoarte recurente de audit pentru agentii sau echipe interne.",
  "Request": "Cerere",
  "Request acest ruta": "Solicita aceasta ruta",
  "Request context si sursa tracking are stored.": "Contextul cererii si urmarirea sursei sunt salvate.",
  "request enters cu sursa, offer, UTM, current sistem, si afaceri pressure.":
    "Cererea intra cu sursa, oferta, UTM, sistemul curent si presiunea de business.",
  "Request flux de lucru": "Flux de cerere",
  "request is reviewed against sistem type, current flux de lucru, feasibility, timeline, si implementation path.":
    "Cererea este evaluata dupa tipul de sistem, fluxul curent, fezabilitate, termen si ruta de implementare.",
  "Request sistem plan": "Solicita planul sistemului",
  "Scale landing pages for locations, services, products, categories, or data entities.":
    "Scaleaza pagini de landing pentru locatii, servicii, produse, categorii sau entitati de date.",
  "Send Request": "Trimite solicitarea",
  "Turn every serious request in qualified, routed, visible lead inainte first response window closes.":
    "Transforma fiecare cerere serioasa intr-un lead calificat, rutat si vizibil inainte ca fereastra primului raspuns sa se inchida.",
  "Website or platform launch": "Lansare site sau platforma",
  "working intake flow care captures sursa, request type, missing context, owner, si next action.":
    "Flux functional de intake care capteaza sursa, tipul cererii, contextul lipsa, responsabilul si urmatoarea actiune.",
  "Working MVP, Interfata de produs, Launch-ready platform": "MVP functional, interfata de produs, platforma pregatita pentru lansare"
};

const ruExactFallback: Dictionary = {
  "4 modules mapped": "4 модуля на карте",
  "4 connected modules": "4 связанных модуля",
  "4 build modules": "4 рабочих модуля",
  "Scope This Solution": "Запросить это решение",
  "Scope This System": "Запросить эту систему",
  "Scope this solution": "Запросить это решение",
  "Scope this capability": "Запросить эту возможность",
  "Scope first build": "Описать первую сборку",
  "See related route": "Смотреть связанный маршрут",
  "Send Request": "Отправить заявку",
  "Ask for this system": "Запросить эту систему",
  "What is happening now?": "Что происходит сейчас?",
  "What should the system make visible or faster?": "Что система должна сделать видимым или быстрее?",
  "Who this page should convert": "Кому подходит этот маршрут",
  "System offer": "Системный оффер",
  "System engine": "Системный двигатель",
  "Paid traffic brief": "Бриф для рекламного трафика",
  "Before": "До",
  "After": "После",
  "Signals to show": "Сигналы, которые нужно показать",
  "Problem pressure": "Давление проблемы",
  "Solution engine": "Двигатель решения",
  "Solution pattern": "Паттерн решения",
  "Prototype first": "Сначала прототип",
  "Integrated build": "Интегрированная сборка",
  "Operating layer": "Операционный слой",
  "Operating output": "Операционный результат",
  "Campaign trigger": "Триггер кампании",
  "Landing-page promise": "Обещание посадочной страницы",
  "Proof to collect": "Доказательства для сбора",
  "Trigger": "Триггер",
  "Promise": "Обещание",
  "Related solutions": "Связанные решения",
  "Build rail": "Рабочий маршрут",
  "Input layer": "Входной слой",
  "Workflow modules": "Модули процесса",
  "Automation layer": "Слой автоматизации",
  "Output layer": "Слой результата",
  "Module console": "Консоль модулей",
  "Module map": "Карта модулей",
  "How the system operates": "Как работает система",
  "Where this system pattern applies": "Где применяется этот системный паттерн",
  "System architecture": "Архитектура системы",
  "Related areas": "Связанные направления",
  "Module": "Модуль",
  "Modules": "Модули",
  "Control": "Контроль",
  "Connect": "Подключение",
  "Signal": "Сигнал",
  "Live": "Активно",
  "Operate": "Работа",
  "Publish": "Публикация",
  "Capture": "Захват",
  "Process": "Процесс",
  "Monitor": "Мониторинг",
  "Sync": "Синхронизация",
  "Review": "Проверка",
  "Email": "Email",
  "Travel": "Туризм",
  "Operational output": "Операционный результат",
  "Operational visibility": "Операционная видимость",
  "Working MVP": "Рабочий MVP",
  "Decision-ready reports": "Отчеты для решений",
  "Audit system": "Система аудита",
  "Custom WordPress platform": "Кастомная WordPress-платформа",
  "Repeatable content production": "Повторяемое производство контента",
  "Structured workflow": "Структурированный процесс",
  "Product data model": "Модель продуктовых данных",
  "Custom content structures": "Кастомные структуры контента",
  "Topic and data inputs": "Темы и входные данные",
  "Automation tools": "Инструменты автоматизации",
  "Data processing": "Обработка данных",
  "Video generation": "Генерация видео",
  "CRM integrations": "CRM-интеграции",
  "AI models": "AI-модели",
  "Analytics": "Аналитика",
  "Scraping": "Сбор данных",
  "Web platforms": "Веб-платформы",
  "WordPress tools": "Инструменты WordPress",
  "Data/audit/ranking systems": "Системы данных, аудита и ранжирования",
  "Data/Audit/Ranking Systems": "Системы данных, аудита и ранжирования",
  "Data systems и scraping": "Системы данных и сбор данных",
  "Data Systems & Scraping": "Системы данных и сбор данных",
  "Видео и media automation": "Видео и медиа-автоматизация",
  "Video & Media Automation": "Видео и медиа-автоматизация",
  "Workflow автоматизации контента": "Процессы автоматизации контента",
  "Content Automation Workflows": "Процессы автоматизации контента",
  "Data/monitoring система": "Система данных и мониторинга",
  "Build a Data/Monitoring System": "Система данных и мониторинга",
  "Next conversion step": "Следующий шаг конверсии",
  "Следующий conversion step": "Следующий шаг конверсии",
  "Scope a system": "Запросить систему",
  "Scope Industry System": "Запросить систему для индустрии",
  "Scope an industry system": "Запросить систему для индустрии",
  "Route console": "Консоль маршрутов",
  "Industry system core": "Ядро индустриальной системы",
  "Landing angle": "Угол посадочной страницы",
  "Offer route": "Маршрут оффера",
  "Proof signals": "Сигналы доказательства",
  "Angle": "Угол",
  "Route": "Маршрут",
  "Evidence": "Доказательства"
};

const ruPhraseFallback: Array<[RegExp, string]> = [
  [/^(.+) as an operating system$/i, "$1 как операционная система"],
  [/^(\d+) modules mapped$/i, "$1 модуля на карте"],
  [/^(\d+) connected modules$/i, "$1 связанных модуля"],
  [/^(\d+) build modules$/i, "$1 рабочих модуля"],
  [/^(\d+) reusable patterns$/i, "$1 повторяемых паттернов"],
  [/^System profiles for (.+)$/i, "Профили систем для $1"],
  [/^Solution routes for (.+)$/i, "Маршруты решений для $1"],
  [/^(.+) capabilities$/i, "Возможности для $1"],
  [/^Where (.+) systems usually start$/i, "Где обычно начинаются системы для $1"],
  [/^For (.+), the page needs to make (.+) obvious before a visitor asks for scope\.$/i, "Для $1 страница должна сделать $2 очевидным до запроса объема работ."],
  [/^Start with (.+), then shape the system, modules, integration points, and proof that make (.+) visible\.$/i, "$1 становится стартовой точкой; система, модули, точки интеграции и доказательства делают $2 видимым."],
  [/^Validate (.+) with one working path: input, state, output, and user review\.$/i, "Проверка $1 на одном рабочем маршруте: вход, состояние, результат и пользовательская проверка."],
  [/^Connect the (.+) layer to the site, CMS, CRM, APIs, database, analytics, or internal tools that already matter\.$/i, "Слой $1 подключается к сайту, CMS, CRM, API, базе данных, аналитике или важным внутренним инструментам."],
  [/^Add visibility around (.+): dashboards, alerts, QA, reporting, ownership, and improvement loops for daily use\.$/i, "Вокруг $1 появляется видимость: панели, уведомления, контроль качества, отчетность, ответственность и циклы улучшения для ежедневной работы."],
  [/^Turn this into a visible system output: (.+)\.$/i, "Это превращается в видимый системный результат: $1."],
  [/^Send the current process, tools, and expected (.+) so this can become a first working system\.$/i, "Текущий процесс, инструменты и ожидаемый результат $1 становятся основой первой рабочей системы."],
  [/^For (.+), the work starts by mapping the current process and then turning it into architecture, data, interfaces, automations, integrations, and launch workflow\.$/i, "Для $1 работа начинается с карты текущего процесса, а затем превращается в архитектуру, данные, интерфейсы, автоматизацию, интеграции и запуск."],
  [/^This fits when (.+) already creates pressure and the team needs structure, automation, visibility, or scale\.$/i, "Это подходит, когда $1 уже создает давление, а команде нужны структура, автоматизация, видимость или масштаб."],
  [/^These profiles turn the solution into concrete architecture: modules, workflow, integrations, and operating output around (.+)\.$/i, "Эти профили превращают решение в конкретную архитектуру: модули, процесс, интеграции и операционный результат вокруг $1."],
  [/^The first scoped version should expose the inputs, workflow states, integrations, and review points behind (.+)\.$/i, "Первая версия должна показать входные данные, состояния процесса, интеграции и точки проверки за $1."],
  [/^For (.+), every module should become a usable station rather than a loose feature list\.$/i, "Для $1 каждый модуль должен стать рабочей станцией, а не свободным списком функций."],
  [/^The build can start as a narrow proof, a connected workflow, or a fuller operating layer depending on how mature the current process is\.$/i, "Сборка может начаться как узкое доказательство, связанный процесс или полноценный операционный слой, в зависимости от зрелости текущего процесса."],
  [/^The page should make the before-and-after clear enough that a visitor can ask for the first version without decoding the whole technical stack\.$/i, "Страница должна ясно показать состояние до и после, чтобы посетитель мог запросить первую версию без расшифровки всего технического стека."],
  [/^Inputs, modules, automation, and outputs in one operating model\.$/i, "Входные данные, модули, автоматизация и результаты в одной операционной модели."],
  [/^This template shows how every system profile is meant to be read: what enters the system, what happens inside it, what gets automated, and what business output appears\.$/i, "Этот шаблон показывает, как читать каждый профиль системы: что входит в систему, что происходит внутри, что автоматизируется и какой бизнес-результат появляется."],
  [/^What the system needs before work can happen\.$/i, "Что нужно системе до начала работы."],
  [/^The operational blocks that turn inputs into useful movement\.$/i, "Операционные блоки, которые превращают входные данные в полезное движение."],
  [/^Rules, review states, integrations, and repeatable actions\.$/i, "Правила, состояния проверки, интеграции и повторяемые действия."],
  [/^The visible result that makes the system worth building\.$/i, "Видимый результат, ради которого систему стоит строить."],
  [/^Each module is a buildable part of the system, not a loose feature idea\. The modules define what has to exist for the workflow to operate\.$/i, "Каждый модуль - собираемая часть системы, а не свободная идея функции. Модули определяют, что должно существовать, чтобы процесс работал."],
  [/^Modules define the working parts of the system: what receives input, what processes it, and what produces output\.$/i, "Модули определяют рабочие части системы: что принимает вход, что его обрабатывает и что выдает результат."],
  [/^The profile describes the operational flow: inputs, processing, review, integrations, publishing, reporting, or output delivery\.$/i, "Профиль описывает операционный поток: входные данные, обработку, проверку, интеграции, публикацию, отчетность или доставку результата."],
  [/^The same architecture can be adapted to different business contexts when the workflow, data, and output requirements are clear\.$/i, "Ту же архитектуру можно адаптировать под разные бизнес-контексты, когда понятны процесс, данные и требования к результату."],
  [/^System profiles are designed to connect back into capabilities and solutions, so the profile can become a scoped implementation path instead of a standalone case note\.$/i, "Профили систем связаны с возможностями и решениями, поэтому профиль может стать конкретным маршрутом реализации, а не отдельной заметкой."],
  [/^A focused landing offer for companies that receive website, ad, or referral leads and need faster qualification, routing, follow-up, and source visibility\.$/i, "Сфокусированный посадочный оффер для компаний, которые получают лиды с сайта, рекламы или рекомендаций и нуждаются в быстрой квалификации, маршрутизации, последующих действиях и видимости источника."],
  [/^A landing offer for companies that need more content, product pages, guides, briefs, or media drafts without turning publishing into a quality problem\.$/i, "Посадочный оффер для компаний, которым нужно больше контента, продуктовых страниц, гайдов, брифов или медиа-черновиков без потери качества публикации."],
  [/^A landing offer for stores and catalog businesses that need cleaner product data, feed workflows, stock or price monitoring, and operational reporting\.$/i, "Посадочный оффер для магазинов и каталоговых бизнесов, которым нужны более чистые продуктовые данные, процессы фидов, мониторинг остатков или цен и операционная отчетность."],
  [/^A landing offer for businesses that rely on WordPress but need it to act like a connected operating layer instead of a fragile plugin stack\.$/i, "Посадочный оффер для бизнесов на WordPress, которым нужен связанный операционный слой вместо хрупкого набора плагинов."],
  [/^Turn every serious request into a qualified, routed, visible lead before the first response window closes\.$/i, "Каждый серьезный запрос превращается в квалифицированный, маршрутизированный и видимый лид до закрытия окна первого ответа."],
  [/^Use this route when paid search, referrals, or website forms already create requests but the team reacts too slowly\.$/i, "Маршрут подходит, когда платный поиск, рекомендации или формы сайта уже дают заявки, но команда реагирует слишком медленно."],
  [/^Make WordPress behave like a controlled workflow layer instead of a fragile stack of plugins\.$/i, "WordPress работает как контролируемый процессный слой вместо хрупкого набора плагинов."],
  [/^Turn catalog data, feeds, and monitoring into one operating layer the team can trust\.$/i, "Данные каталога, фиды и мониторинг объединяются в единый операционный слой, которому команда может доверять."],
  [/^Use this route when catalog updates, feeds, marketplace data, or product checks keep creating manual operations work\.$/i, "Маршрут подходит, когда обновления каталога, фиды, данные маркетплейсов или проверки товаров постоянно создают ручную операционную работу."]
];

const ruTermFallback: Dictionary = {
  "data workflow": "процессы данных",
  "data workflows": "процессы данных",
  "data tools": "инструменты данных",
  "workflow": "процесс",
  "workflows": "процессы",
  "workflow.": "процесс.",
  "workflow,": "процесс,",
  "business-workflow": "бизнес-процесс",
  "dashboard": "панель",
  "dashboards": "панели",
  "publishing": "публикация",
  "publishing tools": "инструменты публикации",
  "publishing workflow": "процесс публикации",
  "media automation": "медиа-автоматизация",
  "media workflow": "медиа-процесс",
  "production workflow": "производственный процесс",
  "production": "производство",
  "review workflow": "процесс проверки",
  "review": "проверка",
  "enrichment": "обогащение",
  "scoring": "оценка",
  "routing": "маршрутизация",
  "follow-up": "последующие действия",
  "lead workflow": "процесс лидов",
  "lead automation": "автоматизация лидов",
  "lead systems": "системы лидов",
  "lead flow": "поток лидов",
  "CRM flow": "CRM-поток",
  "custom": "кастомные",
  "admin utilities": "админ-инструменты",
  "admin tools": "админ-инструменты",
  "product content": "продуктовый контент",
  "pricing": "цены",
  "availability": "доступность",
  "destination data": "данные направлений",
  "reporting automation": "автоматизация отчетности",
  "content production": "производство контента",
  "internal tooling": "внутренние инструменты",
  "onboarding flows": "онбординг-процессы",
  "data models": "модели данных",
  "organic growth": "органический рост",
  "conversion paths": "маршруты конверсии",
  "data structures": "структуры данных",
  "scoring entities": "оценки сущностей",
  "assets": "ассетов",
  "asset": "ассет",
  "ranking": "ранжирование",
  "review/data workflow": "процесс проверки и данных",
  "landing": "посадочная",
  "landing page": "посадочная страница",
  "Landing page": "Посадочная страница",
  "outreach": "исходящей коммуникации",
  "live": "активная",
  "Live": "Активно",
  "engine": "двигатель",
  "Integrations": "Интеграции",
  "Leads": "Лиды",
  "profiles": "профили",
  "Manual workflow": "Ручной процесс",
  "Automation flow": "Поток автоматизации",
  "Website / product layer": "Сайт / продуктовый слой",
  "Publishing engine": "Двигатель публикации",
  "Market signal": "Рыночный сигнал",
  "Catalog operations": "Операции каталога",
  "Integration layer": "Слой интеграций",
  "Launchable platform": "Запускаемая платформа",
  "Signal dashboard": "Панель сигналов",
  "Catalog system": "Система каталога",
  "Connected CMS": "Связанная CMS"
};

const cleanRuCopy = (value: string) => {
  let result = ruQualityOverrides[value] ?? ruExactFallback[value] ?? value;

  for (const [pattern, replacement] of ruPhraseFallback) {
    if (pattern.test(result)) {
      result = result.replace(pattern, replacement);
      break;
    }
  }

  const entries = Object.entries(ruTermFallback).sort((a, b) => b[0].length - a[0].length);
  for (const [term, replacement] of entries) {
    result = result.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), replacement);
  }

  return result
    .replace(/\bAI-workflow\b/g, "AI-процессы")
    .replace(/\bAI-assisted\b/g, "AI-поддерживаемый")
    .replace(/\bData-heavy\b/g, "данные-насыщенные")
    .replace(/\bdata-heavy\b/g, "данные-насыщенные")
    .replace(/\bWhite-label\b/g, "white-label")
    .replace(/\bworkflow-СЃ/g, "процесс")
    .replace(/\s+([,.:;])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
};

const roExactFallback: Dictionary = {
  "PROFILES": "PROFILURI",
  "SOLUTION PATTERN": "PATTERN DE SOLUTIE",
  "SOLUTION ENGINE": "MOTOR DE SOLUTIE",
  "SOLUTION ROUTER": "ROUTER DE SOLUTII",
  "Source + signal mapping": "Mapare surse + semnale",
  "Data source mapping": "Maparea surselor de date",
  "Monitoring solution": "Solutie de monitorizare",
  "Input": "Intrare",
  "INPUT": "INTRARE",
  "Output": "Rezultat",
  "Scope": "Definire",
  "This solution is for companies that need more content without turning production into uncontrolled manual work. AlfaRank designs content systems that combine topic databases, templates, AI-assisted drafting, editorial review, media preparation, CMS publishing, and performance monitoring.":
    "Aceasta solutie este pentru companii care au nevoie de mai mult continut fara sa transforme productia in munca manuala necontrolata. AlfaRank proiecteaza sisteme de continut care combina baze de topicuri, template-uri, drafting asistat de AI, revizie editoriala, pregatire media, publicare CMS si monitorizare de performanta.",
  "This solution is for companies that need to turn a business idea, internal workflow, or productized service into a working digital product. AlfaRank helps define the first launchable version, design the interface and data model, build the core system, and prepare it for real users.":
    "Aceasta solutie este pentru companii care trebuie sa transforme o idee de business, un flux intern sau un serviciu productizat intr-un produs digital functional. AlfaRank ajuta la definirea primei versiuni lansabile, proiectarea interfetei si modelului de date, construirea nucleului sistemului si pregatirea pentru utilizatori reali.",
  "This solution is for companies that need better visibility into changing data. AlfaRank builds monitoring systems that collect information from websites, APIs, feeds, SERPs, catalogs, or internal sources, then turn it into alerts, dashboards, reports, scores, and decisions.":
    "Aceasta solutie este pentru companii care au nevoie de vizibilitate mai buna asupra datelor care se schimba. AlfaRank construieste sisteme de monitorizare care colecteaza informatie din site-uri, API-uri, feeduri, SERP-uri, cataloage sau surse interne, apoi o transforma in alerte, dashboarduri, rapoarte, scoruri si decizii.",
  "This solution is for companies that need organic growth to come from a structured system rather than disconnected SEO tasks. AlfaRank designs the architecture, templates, data structures, publishing workflows, and monitoring layer needed to scale SEO infrastructure.":
    "Aceasta solutie este pentru companii care vor ca cresterea organica sa vina dintr-un sistem structurat, nu din taskuri SEO separate. AlfaRank proiecteaza arhitectura, template-urile, structurile de date, fluxurile de publicare si stratul de monitorizare necesare pentru scalarea infrastructurii SEO.",
  "WordPress and API integrations at AlfaRank treat WordPress as a business platform, not only a website CMS. The work can include custom content structures, admin tools, API connections, CRM workflows, automation, publishing systems, and operational interfaces built around WordPress.":
    "Integrarile WordPress si API la AlfaRank trateaza WordPress ca platforma de business, nu doar ca CMS de site. Lucrul poate include structuri custom de continut, instrumente admin, conexiuni API, fluxuri CRM, automatizare, sisteme de publicare si interfete operationale construite in jurul WordPress.",
  "Content Automation Workflows is a system profile for companies that need repeatable content production without losing control over quality. The system combines topic structures, AI-assisted generation, enrichment, review, CMS publishing, and monitoring.":
    "Content Automation Workflows este un profil de sistem pentru companii care au nevoie de productie de continut repetabila fara sa piarda controlul calitatii. Sistemul combina structuri de topicuri, generare asistata de AI, imbogatire, revizie, publicare CMS si monitorizare.",
  "A focused landing offer for companies that receive website, ad, or referral leads and need faster qualification, routing, follow-up, and source visibility.":
    "Oferta de landing pentru companii care primesc leaduri din site, reclame sau recomandari si au nevoie de calificare, rutare, follow-up si vizibilitate asupra sursei mai rapide.",
  "A landing offer for companies that need more content, product pages, guides, briefs, or media drafts without turning publishing into a quality problem.":
    "Oferta de landing pentru companii care au nevoie de mai mult continut, pagini de produs, ghiduri, briefuri sau drafturi media fara ca publicarea sa devina o problema de calitate.",
  "Convert content ideas and data into a repeatable AI-assisted production workflow with human review built in.":
    "Transforma ideile si datele de continut intr-un flux de productie repetabil, asistat de AI, cu revizie umana inclusa.",
  "E-commerce teams, catalog businesses, marketplace operators, and product-heavy companies with repeated product data work.":
    "Echipe e-commerce, afaceri de catalog, operatori de marketplace si companii cu volum mare de date de produs.",
  "WordPress-based businesses, service companies, publishers, agencies, and teams that need custom forms, CRM handoff, publishing, or data workflows.":
    "Afaceri bazate pe WordPress, companii de servicii, publisheri, agentii si echipe care au nevoie de formulare personalizate, predare catre CRM, publicare sau fluxuri de date.",
  "Capability network": "Retea de capabilitati",
  "CAPABILITY NETWORK": "RETEA DE CAPABILITATI",
  "Capability foundation": "Fundatie de capabilitate",
  "CAPABILITY FOUNDATION": "FUNDATIE DE CAPABILITATE",
  "Build directions online": "Directii de construire active",
  "BUILD DIRECTIONS ONLINE": "DIRECTII DE CONSTRUIRE ACTIVE",
  "DIRECTIONS": "DIRECTII",
  "PROBLEM ROUTES MAPPED": "RUTE DE PROBLEME MAPATE",
  "PATTERNURI REUTILIZABILE ACTIVE": "PATTERNURI REUTILIZABILE ACTIVE",
  "Review queue active": "Coada de revizie activa",
  "REVIEW QUEUE ACTIVE": "COADA DE REVIZIE ACTIVA",
  "PROJECT REQUEST": "CERERE DE PROIECT",
  "REQUEST": "CERERE",
  "SISTEM TYPE": "TIP DE SISTEM",
  "SISTEM CATEGORY": "CATEGORIE DE SISTEM",
  "Working first version": "Prima versiune functionala",
  "Type, current system, problem, desired result": "Tip, sistem curent, problema, rezultat dorit",
  "Type, current sistem, problem, desired re...": "Tip, sistem curent, problema, rezultat dorit...",
  "Project type, problem, current setup, desired result": "Tip de proiect, problema, configuratie curenta, rezultat dorit",
  "Project type, problem, current setup, des...": "Tip de proiect, problema, configuratie curenta, rezultat dorit...",
  "Integrations": "Integrari",
  "INTEGRATIONS": "INTEGRARI",
  "Leads": "Leaduri",
  "LEADS": "LEADURI",
  "Website / product layer": "Strat site / produs",
  "WEBSITE / PRODUCT LAYER": "STRAT SITE / PRODUS",
  "Publishing engine": "Motor de publicare",
  "PUBLISHING ENGINE": "MOTOR DE PUBLICARE",
  "Market signal": "Semnal de piata",
  "MARKET SIGNAL": "SEMNAL DE PIATA",
  "MARKET SEMNAL": "SEMNAL DE PIATA",
  "Integration layer": "Strat de integrare",
  "INTEGRATION LAYER": "STRAT DE INTEGRARE",
  "Video generation": "Generare video",
  "CRM integrations": "Integrari CRM",
  "Data processing": "Procesare date",
  "Automation tools": "Instrumente de automatizare",
  "Track data, competitors, or rankings": "Urmareste date, competitori sau rankinguri",
  "AI automation at AlfaRank is not a layer of isolated prompts. It is a way to design controlled workflows where AI models, business rules, data sources, CMS tools, CRMs, and human review work together. The result is a system that can produce, classify, enrich, monitor, or route work with less manual effort and more consistency.":
    "Automatizarea AI la AlfaRank nu este un strat de prompturi izolate. Este o metoda de proiectare a fluxurilor controlate in care modelele AI, regulile de afaceri, sursele de date, instrumentele CMS, CRM-urile si revizia umana lucreaza impreuna. Rezultatul este un sistem care poate produce, clasifica, imbogati, monitoriza sau ruta munca cu mai putin efort manual si mai multa consistenta.",
  "Content generation and review workflows": "Fluxuri de generare si revizie a continutului",
  "Lead enrichment, routing, and follow-up logic": "Imbogatire leaduri, rutare si logica de follow-up",
  "Reporting, research, and data processing assistants": "Asistenti pentru raportare, cercetare si procesare date",
  "Systems that turn topics, entities, product data, briefs, or templates into draft content, enriched media, editorial tasks, and CMS-ready output.":
    "Sisteme care transforma topicuri, entitati, date de produs, briefuri sau template-uri in drafturi de continut, media imbogatita, taskuri editoriale si rezultat pregatit pentru CMS.",
  "Workflows for processing form submissions, classifying requests, enriching lead data, assigning owners, updating CRM records, and triggering follow-up actions.":
    "Fluxuri pentru procesarea formularelor, clasificarea cererilor, imbogatirea datelor de lead, asignarea responsabililor, actualizarea inregistrarilor CRM si declansarea actiunilor de follow-up.",
  "AI-assisted tools for summarizing datasets, preparing reports, monitoring sources, extracting structured information, and supporting internal decisions.":
    "Instrumente asistate de AI pentru sumarizarea seturilor de date, pregatirea rapoartelor, monitorizarea surselor, extragerea informatiei structurate si sustinerea deciziilor interne.",
  "Review states, approval steps, logs, confidence checks, and manual override points are designed into the system when output quality matters.":
    "Starile de revizie, pasii de aprobare, logurile, verificarile de incredere si punctele de override manual sunt proiectate in sistem cand calitatea rezultatului conteaza.",
  "Identify repeated manual work and define what output should be automated.": "Identifica munca manuala repetata si defineste ce rezultat trebuie automatizat.",
  "Map the required inputs: website data, CRM records, CMS content, files, APIs, prompts, and business rules.":
    "Mapeaza intrarile necesare: date din site, inregistrari CRM, continut CMS, fisiere, API-uri, prompturi si reguli de afaceri.",
  "Design the automation flow with states, validation, review, and fallback logic.":
    "Proiecteaza fluxul de automatizare cu stari, validare, revizie si logica de fallback.",
  "Connect the flow to the systems where the work actually happens.":
    "Conecteaza fluxul la sistemele unde munca se intampla efectiv.",
  "Measure accuracy, speed, and operational impact after launch.": "Masoara acuratetea, viteza si impactul operational dupa lansare.",
  "Generate and review content for large publishing workflows.": "Genereaza si revizuieste continut pentru fluxuri mari de publicare.",
  "Classify and route incoming leads by project type or urgency.": "Clasifica si ruteaza leadurile primite dupa tip de proiect sau urgenta.",
  "Summarize research, scraped data, audit results, or monitoring signals.": "Rezuma cercetare, date colectate, rezultate de audit sau semnale de monitorizare.",
  "Prepare drafts, reports, internal notes, and structured records from raw inputs.":
    "Pregateste drafturi, rapoarte, note interne si inregistrari structurate din intrari brute.",
  "Connect AI actions with WordPress, CRMs, databases, spreadsheets, and APIs.":
    "Conecteaza actiunile AI cu WordPress, CRM-uri, baze de date, foi de calcul si API-uri.",
  "Web and product development at AlfaRank is focused on usable business systems, not decorative websites. The work can include public websites, product interfaces, dashboards, portals, internal tools, and MVPs that connect content, data, automation, and operational workflows.":
    "Dezvoltarea web si de produs la AlfaRank este concentrata pe sisteme de afaceri utilizabile, nu pe site-uri decorative. Lucrul poate include site-uri publice, interfete de produs, dashboarduri, portaluri, instrumente interne si MVP-uri care conecteaza continut, date, automatizare si fluxuri operationale.",
  "Corporate websites with structured content systems": "Site-uri corporate cu sisteme de continut structurate",
  "Integration-ready frontends and admin surfaces": "Frontenduri si suprafete admin pregatite pentru integrari",
  "Structured websites with reusable content models, clear navigation, service or solution pages, technical SEO foundations, and deployment workflows.":
    "Site-uri structurate cu modele de continut reutilizabile, navigatie clara, pagini de servicii sau solutii, fundatii SEO tehnice si fluxuri de deploy.",
  "Interfaces for validating digital products, SaaS concepts, client portals, workflow tools, and business-facing product ideas.":
    "Interfete pentru validarea produselor digitale, conceptelor SaaS, portalurilor client, instrumentelor de workflow si ideilor de produs orientate spre afaceri.",
  "Operational interfaces for teams that need to view data, update records, manage workflows, trigger actions, or review outputs.":
    "Interfete operationale pentru echipe care trebuie sa vada date, sa actualizeze inregistrari, sa gestioneze fluxuri, sa declanseze actiuni sau sa revizuiasca rezultate.",
  "Integration-ready architecture": "Arhitectura pregatita pentru integrari",
  "Frontend and backend structures designed to connect with CRMs, CMS platforms, APIs, databases, automation tools, and analytics.":
    "Structuri frontend si backend proiectate pentru conectare cu CRM-uri, platforme CMS, API-uri, baze de date, instrumente de automatizare si analitica.",
  "Launch a structured corporate site with strong navigation and content architecture.":
    "Lanseaza un site corporate structurat, cu navigatie solida si arhitectura de continut.",
  "Build a product MVP or client portal around a specific business workflow.":
    "Construieste un MVP de produs sau portal client in jurul unui flux specific de afaceri.",
  "Replace spreadsheets or manual processes with internal tools.": "Inlocuieste tabelele sau procesele manuale cu instrumente interne.",
  "Create dashboards for monitoring content, leads, products, data, or operations.":
    "Creeaza dashboarduri pentru monitorizarea continutului, leadurilor, produselor, datelor sau operatiunilor.",
  "Modernize an existing website into a system that can integrate and scale.":
    "Modernizeaza un site existent intr-un sistem care se poate integra si scala.",
  "SEO and content infrastructure at AlfaRank is not packaged as a list of isolated optimization tasks. It is the design of a content system: data sources, page types, templates, publishing workflows, internal linking logic, metadata, quality control, and monitoring.":
    "Infrastructura SEO si de continut la AlfaRank nu este ambalata ca lista de taskuri izolate de optimizare. Este proiectarea unui sistem de continut: surse de date, tipuri de pagini, template-uri, fluxuri de publicare, logica de linking intern, metadate, controlul calitatii si monitorizare.",
  "Programmatic SEO structures": "Structuri SEO programatice",
  "Content databases and template systems": "Baze de continut si sisteme de template-uri",
  "Publishing pipelines for CMS and static sites": "Pipeline-uri de publicare pentru CMS si site-uri statice",
  "Quality checks, metadata, and monitoring workflows": "Verificari de calitate, metadate si fluxuri de monitorizare",
  "Page types, taxonomy, internal linking, templates, metadata, content groups, and navigation structures designed before production begins.":
    "Tipuri de pagini, taxonomie, linking intern, template-uri, metadate, grupuri de continut si structuri de navigatie proiectate inainte de productie.",
  "Scalable page structures driven by data, reusable templates, entity relationships, location/product/category models, and automated publishing logic.":
    "Structuri de pagini scalabile, conduse de date, template-uri reutilizabile, relatii intre entitati, modele de locatie/produs/categorie si logica de publicare automatizata.",
  "Processes for briefs, AI-assisted drafts, editorial review, CMS publishing, quality checks, updates, and monitoring.":
    "Procese pentru briefuri, drafturi asistate de AI, revizie editoriala, publicare CMS, verificari de calitate, actualizari si monitorizare.",
  "Tracking systems for indexation, rankings, content gaps, page quality, structured data, and improvement priorities.":
    "Sisteme de tracking pentru indexare, rankinguri, goluri de continut, calitatea paginilor, date structurate si prioritati de imbunatatire.",
  "Publishing pipelines": "Pipeline-uri de publicare",
  "Scalable SEO systems": "Sisteme SEO scalabile",
  "Define the organic growth model and the page types required.": "Defineste modelul de crestere organica si tipurile de pagini necesare.",
  "Map data sources, content inputs, keyword/entity groups, and publishing constraints.":
    "Mapeaza sursele de date, intrarile de continut, grupurile de keyworduri/entitati si constrangerile de publicare.",
  "Create templates, metadata patterns, internal linking rules, and CMS structures.":
    "Creeaza template-uri, patternuri de metadate, reguli de linking intern si structuri CMS.",
  "Build the production workflow for content creation, review, and publishing.":
    "Construieste fluxul de productie pentru creare, revizie si publicare de continut.",
  "Monitor performance, identify gaps, and improve the system over time.":
    "Monitorizeaza performanta, identifica golurile si imbunatateste sistemul in timp.",
  "Data systems and scraping work is focused on turning external or internal information into structured business signals. AlfaRank designs systems that collect data, clean it, store it, monitor changes, score entities, generate reports, and trigger actions.":
    "Lucrul cu sisteme de date si colectare este concentrat pe transformarea informatiei externe sau interne in semnale de afaceri structurate. AlfaRank proiecteaza sisteme care colecteaza date, le curata, le stocheaza, monitorizeaza schimbari, scorizeaza entitati, genereaza rapoarte si declanseaza actiuni.",
  "Scraping and structured data collection": "Colectare si structurare de date",
  "Monitoring tools for competitors, catalogs, SERPs, and marketplaces": "Instrumente de monitorizare pentru competitori, cataloage, SERP-uri si marketplace-uri",
  "Audit and ranking systems": "Sisteme de audit si ranking",
  "Data collection layer": "Strat de colectare date",
  "Scrapers, API connectors, feed processors, upload tools, and scheduled jobs that bring data into a controlled system.":
    "Scrapere, conectori API, procesoare de feed, instrumente de upload si joburi programate care aduc datele intr-un sistem controlat.",
  "Systems that track changes in competitors, prices, catalogs, rankings, SERPs, availability, reviews, or other business signals.":
    "Sisteme care urmaresc schimbari la competitori, preturi, cataloage, rankinguri, SERP-uri, disponibilitate, review-uri sau alte semnale de afaceri.",
  "Rules and dashboards that turn raw data into scores, rankings, issue lists, recommendations, exports, and recurring reports.":
    "Reguli si dashboarduri care transforma datele brute in scoruri, rankinguri, liste de probleme, recomandari, exporturi si rapoarte recurente.",
  "Data pipelines": "Pipeline-uri de date",
  "Define what data matters and what decisions it should support.": "Defineste ce date conteaza si ce decizii trebuie sa sustina.",
  "Map available sources: websites, APIs, feeds, files, SERPs, catalogs, or internal records.":
    "Mapeaza sursele disponibile: site-uri, API-uri, feeduri, fisiere, SERP-uri, cataloage sau inregistrari interne.",
  "Create dashboards, alerts, exports, ranking logic, or audit reports.":
    "Creeaza dashboarduri, alerte, exporturi, logica de ranking sau rapoarte de audit.",
  "Monitor competitor websites, prices, catalogs, content, or search visibility.":
    "Monitorizeaza site-uri concurente, preturi, cataloage, continut sau vizibilitate in cautare.",
  "E-commerce systems at AlfaRank are focused on the operational layer behind online sales: product data, catalogs, feeds, content, stock, pricing, integrations, analytics, and repeatable workflows. The goal is to make the store easier to manage, scale, monitor, and connect with other business systems.":
    "Sistemele e-commerce la AlfaRank sunt concentrate pe stratul operational din spatele vanzarilor online: date de produs, cataloage, feeduri, continut, stoc, preturi, integrari, analitica si fluxuri repetabile. Scopul este sa faca magazinul mai usor de gestionat, scalat, monitorizat si conectat cu alte sisteme de afaceri.",
  "Feed generation and integrations": "Generare feeduri si integrari",
  "Catalog and product data structure": "Structura catalogului si a datelor de produs",
  "Feeds and integrations": "Feeduri si integrari",
  "Product models, categories, attributes, filters, metadata, content fields, and data rules that make the catalog easier to manage and expand.":
    "Modele de produs, categorii, atribute, filtre, metadate, campuri de continut si reguli de date care fac catalogul mai usor de gestionat si extins.",
  "Systems for generating, importing, transforming, and synchronizing product feeds with marketplaces, CRMs, analytics tools, warehouses, or external platforms.":
    "Sisteme pentru generarea, importul, transformarea si sincronizarea feedurilor de produs cu marketplace-uri, CRM-uri, instrumente de analitica, depozite sau platforme externe.",
  "Templates, product descriptions, category content, programmatic landing pages, metadata, internal linking, and publishing workflows for e-commerce growth.":
    "Template-uri, descrieri de produs, continut de categorie, pagini de landing programatice, metadate, linking intern si fluxuri de publicare pentru cresterea e-commerce.",
  "Dashboards and alerts for stock, pricing, availability, catalog quality, content gaps, technical issues, and key commercial signals.":
    "Dashboarduri si alerte pentru stoc, preturi, disponibilitate, calitatea catalogului, goluri de continut, probleme tehnice si semnale comerciale cheie.",
  "Video and media automation focuses on turning repeatable creative production into a controlled system. AlfaRank can design workflows for generating, processing, enriching, reviewing, exporting, and publishing media assets using templates, AI tools, structured inputs, and automation logic.":
    "Automatizarea video si media se concentreaza pe transformarea productiei creative repetabile intr-un sistem controlat. AlfaRank poate proiecta fluxuri pentru generarea, procesarea, imbogatirea, revizia, exportul si publicarea asseturilor media folosind template-uri, instrumente AI, intrari structurate si logica de automatizare.",
  "Video and content generation pipelines": "Pipeline-uri de generare video si continut",
  "Template-based production workflows": "Fluxuri de productie bazate pe template-uri",
  "Generation pipelines": "Pipeline-uri de generare",
  "Template-based production": "Productie bazata pe template-uri",
  "Workflows that transform scripts, product data, article inputs, prompts, or structured briefs into video, image, audio, or media drafts.":
    "Fluxuri care transforma scripturi, date de produs, intrari de articole, prompturi sau briefuri structurate in drafturi video, imagine, audio sau media.",
  "Reusable production structures for intros, scenes, captions, formats, aspect ratios, brand assets, metadata, and export variants.":
    "Structuri de productie reutilizabile pentru intro-uri, scene, subtitrari, formate, aspect ratio-uri, asseturi de brand, metadate si variante de export.",
  "Content production pipelines": "Pipeline-uri de productie continut",
  "CONTENT PRODUCTION PIPELINES": "PIPELINE-URI DE PRODUCTIE CONTINUT",
  "API integrations": "Integrari API",
  "Custom WordPress architecture": "Arhitectura WordPress personalizata",
  "Custom WordPress structures and tools": "Structuri si instrumente WordPress personalizate",
  "API integrations with external systems": "Integrari API cu sisteme externe",
  "CMS publishing and editorial workflows": "Publicare CMS si fluxuri editoriale",
  "Connections between WordPress, CRMs, forms, payment tools, databases, analytics, third-party APIs, and automation platforms.":
    "Conexiuni intre WordPress, CRM-uri, formulare, instrumente de plata, baze de date, analitica, API-uri externe si platforme de automatizare.",
  "Operational tools and plugins": "Instrumente operationale si pluginuri",
  "Custom admin tools, dashboards, import/export flows, monitoring utilities, internal workflows, and plugin-style business features.":
    "Instrumente admin personalizate, dashboarduri, fluxuri import/export, utilitare de monitorizare, fluxuri interne si functionalitati de afaceri in stil plugin.",
  "Custom WordPress platform": "Platforma WordPress personalizata",
  "Custom content structures": "Structuri de continut personalizate",
  "CUSTOM WORDPRESS PLATFORM": "PLATFORMA WORDPRESS PERSONALIZATA",
  "API and automation layer": "Strat API si automatizare",
  "Publishing infrastructure": "Infrastructura de publicare"
};

const roPhraseFallback: Array<[RegExp, string]> = [
  [/^System profiles for (.+)$/i, "Profiluri de sistem pentru $1"],
  [/^Solution routes for (.+)$/i, "Rute de solutii pentru $1"],
  [/^(.+) capabilities$/i, "Capabilitati pentru $1"],
  [/^Where (.+) systems usually start$/i, "Unde incep de obicei sistemele pentru $1"],
  [/^How (.+) is built$/i, "Cum se construieste $1"],
  [/^For (.+), the work starts by mapping the current process and then turning it into architecture, data, interfaces, automations, integrations, and launch workflow\.$/i, "Pentru $1, lucrul incepe prin maparea procesului curent si transformarea lui in arhitectura, date, interfete, automatizari, integrari si flux de lansare."],
  [/^For (.+), every module should become a usable station rather than a loose feature list\.$/i, "Pentru $1, fiecare modul trebuie sa devina o statie utilizabila, nu o lista vaga de functionalitati."],
  [/^System profiles that support (.+)$/i, "Profiluri de sistem care sustin $1"],
  [/^These profiles turn the solution into concrete architecture: modules, workflow, integrations, and operating output around (.+)\.$/i, "Aceste profiluri transforma solutia in arhitectura concreta: module, flux de lucru, integrari si rezultat operational in jurul $1."],
  [/^The first scoped version should expose the inputs, workflow states, integrations, and review points behind (.+)\.$/i, "Prima versiune definita trebuie sa arate intrarile, starile fluxului, integrarile si punctele de revizie din spatele $1."],
  [/^The build can start as a narrow proof, a connected workflow, or a fuller operating layer depending on how mature the current process is\.$/i, "Construirea poate incepe ca dovada restransa, flux conectat sau strat operational mai amplu, in functie de maturitatea procesului curent."],
  [/^The page should make the before-and-after clear enough that a visitor can ask for the first version without decoding the whole technical stack\.$/i, "Pagina trebuie sa faca starea dinainte si dupa suficient de clara incat vizitatorul sa poata cere prima versiune fara sa decodeze tot stackul tehnic."],
  [/^Expected output$/i, "Rezultat asteptat"],
  [/^What this solution covers$/i, "Ce acopera solutia"]
];

const roTermFallback: Dictionary = {
  "landing page": "pagina de landing",
  "workflow-urilor": "fluxurilor de lucru",
  "workflow-ul": "fluxul de lucru",
  "workflow-uri": "fluxuri de lucru",
  workflow: "flux de lucru",
  workflows: "fluxuri de lucru",
  dashboard: "dashboard",
  dashboards: "dashboarduri",
  output: "rezultat",
  outputs: "rezultate",
  input: "intrare",
  inputs: "intrari",
  review: "revizie",
  scope: "definire",
  businessuri: "afaceri",
  business: "afaceri",
  content: "continut",
  tools: "instrumente",
  lead: "lead",
  leads: "leaduri",
  route: "ruta",
  routes: "rute",
  system: "sistem",
  systems: "sisteme",
  operating: "operational",
  publishing: "publicare",
  monitoring: "monitorizare",
  scraping: "colectare",
  automation: "automatizare",
  data: "date",
  "follow-up": "follow-up",
  "product content": "continut de produs",
  "conversion paths": "rute de conversie",
  "data-heavy": "intensive in date"
};

const roWordFallback: Dictionary = {
  the: "",
  a: "",
  an: "",
  and: "si",
  or: "sau",
  with: "cu",
  without: "fara",
  into: "in",
  from: "din",
  for: "pentru",
  this: "acest",
  that: "care",
  should: "trebuie sa",
  where: "unde",
  what: "ce",
  when: "cand",
  instead: "in loc de",
  before: "inainte",
  after: "dupa",
  build: "construire",
  built: "construit",
  companies: "companii",
  company: "companie",
  profiles: "profiluri",
  solution: "solutie",
  rather: "mai degraba",
  than: "decat",
  manual: "manuala",
  station: "statie",
  loose: "vag",
  feature: "functionalitate",
  list: "lista",
  collect: "colecteaza",
  visibility: "vizibilitate",
  source: "sursa",
  signal: "semnal"
};

const cleanRoCopy = (value: string) => {
  const englishSignal =
    /\b(the|and|with|without|into|from|this|that|should|where|what|when|instead|before|after|build|built|workflow|workflows|dashboard|landing page|operating|output|input|review|route|routes|tools|content|business|lead|system|systems|scope|solution|profiles|companies|company|rather|than|station|feature|manual|collect|visibility|source|signal)\b/i;
  let result = roQualityOverrides[value] ?? roExactFallback[value] ?? value;

  for (const [pattern, replacement] of roPhraseFallback) {
    if (pattern.test(result)) {
      result = result.replace(pattern, replacement);
      break;
    }
  }

  if (!englishSignal.test(result) && roExactFallback[value] === undefined) return result;

  const entries = Object.entries(roTermFallback).sort((a, b) => b[0].length - a[0].length);
  for (const [term, replacement] of entries) {
    result = result.replace(new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi"), replacement);
  }

  const cleaned = result
    .replace(/[A-Za-z][A-Za-z.-]*/g, (word) => {
      const suffix = word.match(/\.{1,3}$/)?.[0] || "";
      const normalized = word.toLowerCase().replace(/[^a-z.-]/g, "").replace(/\.+$/, "");
      const compact = normalized.replace(/[-.]/g, "");
      const allowed = new Set([
        "alfarank",
        "ai",
        "seo",
        "crm",
        "cms",
        "api",
        "apis",
        "wordpress",
        "saas",
        "mvp",
        "qa",
        "utm",
        "github",
        "cloudflare",
        "astro",
        "next",
        "next.js",
        "html",
        "css",
        "serp",
        "serps"
      ]);
      if (allowed.has(normalized) || allowed.has(compact)) return word;
      const replacement = roWordFallback[normalized] ?? roWordFallback[compact];
      return replacement === undefined ? word : `${replacement}${suffix === "..." ? "" : suffix}`;
    })
    .replace(/\s+([,.:;])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();

  return roQualityOverrides[cleaned] ?? cleaned;
};

const cleanTranslatedCopy = (locale: Exclude<Locale, "en">, value: string) => {
  if (locale === "ru") return cleanRuCopy(value);
  return cleanRoCopy(value);
};

export const getClientTranslations = (locale: Locale): Dictionary => {
  if (locale === "en") return {};

  const translations = {
    ...dictionaries[locale],
    ...(locale === "ru" ? ruExactFallback : { ...roExactFallback, ...roQualityOverrides }),
    ...ui[locale]
  };

  return Object.fromEntries(
    Object.entries(translations).map(([key, value]) => [key, cleanTranslatedCopy(locale, value)])
  );
};

export const ui = {
  en: {
    partnerProgram: "Partner Program",
    primaryNavigation: "Primary navigation",
    mobileNavigation: "Mobile navigation",
    homeAria: "AlfaRank home",
    menu: "Menu",
    startProject: "Start a Project",
    capabilities: "Capabilities",
    solutions: "Solutions",
    systems: "Systems",
    technologies: "Technologies",
    industries: "Industries",
    about: "About",
    footerText: "Digital systems for automation, content infrastructure, data workflows, and web platforms.",
    language: "Language",
    defaultTitle: "AlfaRank | Digital Systems Company",
    defaultDescription:
      "AlfaRank designs and launches digital systems for business operations, content infrastructure, automation, and growth.",
    viewSolutions: "View Solutions",
    viewCapabilities: "View Capabilities",
    allSystems: "All Systems",
    allIndustries: "All Industries",
    backHome: "Back to Home",
    exploreCapabilities: "Explore Capabilities"
  },
  ro: {
    partnerProgram: "Program de parteneri",
    primaryNavigation: "Navigatie principala",
    mobileNavigation: "Navigatie mobila",
    homeAria: "Pagina principala AlfaRank",
    menu: "Meniu",
    startProject: "Porneste un proiect",
    capabilities: "Capabilitati",
    solutions: "Solutii",
    systems: "Sisteme",
    technologies: "Tehnologii",
    industries: "Industrii",
    about: "Despre",
    footerText: "Sisteme digitale pentru automatizare, infrastructura de continut, fluxuri de date si platforme web.",
    language: "Limba",
    defaultTitle: "AlfaRank | Companie de sisteme digitale",
    defaultDescription:
      "AlfaRank proiecteaza si lanseaza sisteme digitale pentru operatiuni de business, infrastructura de continut, automatizare si crestere.",
    viewSolutions: "Vezi solutii",
    viewCapabilities: "Vezi capabilitati",
    allSystems: "Toate sistemele",
    allIndustries: "Toate industriile",
    backHome: "Inapoi acasa",
    exploreCapabilities: "Exploreaza capabilitatile"
  },
  ru: {
    partnerProgram: "Партнерская программа",
    primaryNavigation: "Основная навигация",
    mobileNavigation: "Мобильная навигация",
    homeAria: "Главная AlfaRank",
    menu: "Меню",
    startProject: "Начать проект",
    capabilities: "Возможности",
    solutions: "Решения",
    systems: "Системы",
    technologies: "Технологии",
    industries: "Индустрии",
    about: "О компании",
    footerText: "Цифровые системы для автоматизации, контентной инфраструктуры, процессов данных и веб-платформ.",
    language: "Язык",
    defaultTitle: "AlfaRank | Компания цифровых систем",
    defaultDescription:
      "AlfaRank проектирует и запускает цифровые системы для бизнес-процессов, контентной инфраструктуры, автоматизации и роста.",
    viewSolutions: "Смотреть решения",
    viewCapabilities: "Смотреть возможности",
    allSystems: "Все системы",
    allIndustries: "Все индустрии",
    backHome: "На главную",
    exploreCapabilities: "Изучить возможности"
  }
} as const;

export const t = (locale: Locale, key: keyof typeof ui.en) => ui[locale][key] ?? ui.en[key];

export const translateCopy = (locale: Locale, value: string) => {
  if (locale === "en") return value;
  return cleanTranslatedCopy(locale, dictionaries[locale][value] ?? value);
};

const translateDeep = <T>(value: T, locale: Locale, key = ""): T => {
  if (locale === "en") return value;

  if (typeof value === "string") {
    if (["slug", "icon"].includes(key)) return value;
    if (key === "href") return localizePath(value, locale) as T;
    return translateCopy(locale, value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((entry) => translateDeep(entry, locale)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [entryKey, translateDeep(entryValue, locale, entryKey)])
    ) as T;
  }

  return value;
};

export const getCompany = (locale: Locale) => translateDeep(baseCompany, locale);
export const getHome = (locale: Locale) => translateDeep(baseHome, locale);
export const getCapabilities = (locale: Locale): PageItem[] => translateDeep(baseCapabilities, locale);
export const getSolutions = (locale: Locale): PageItem[] => translateDeep(baseSolutions, locale);
export const getSystems = (locale: Locale): PageItem[] => translateDeep(baseSystems, locale);
export const getIndustries = (locale: Locale): PageItem[] => translateDeep(baseIndustries, locale);
export const getTechnologies = (locale: Locale): string[] => translateDeep(baseTechnologies, locale);
export const getLandingOffers = (locale: Locale): LandingOffer[] => translateDeep(baseLandingOffers, locale);

export const getLocalizedCollections = (locale: Locale) => ({
  company: getCompany(locale),
  home: getHome(locale),
  capabilities: getCapabilities(locale),
  solutions: getSolutions(locale),
  systems: getSystems(locale),
  industries: getIndustries(locale),
  technologies: getTechnologies(locale),
  landingOffers: getLandingOffers(locale)
});
