export const noviqCompanyName = "Noviq Systems";
export const noviqSlug = "noviq-launch";

export const noviqRoutes = {
  root: "/projects/noviq-launch/",
  salesEngine: "/projects/noviq-launch/sales-engine/",
  investmentModel: "/projects/noviq-launch/investment-model/"
};

export const noviqCosts = {
  salesRepMonthly: 1350,
  salesToolMonthly: 90,
  extraRepSetup: 600,
  callsPerRepMonth: 360,
  meetingRate: 0.04,
  auditCloseRate: 0.18,
  siteCloseRate: 0.22,
  videoCloseRate: 0.28,
  auditPrice: 900,
  sitePrice: 4500,
  videoPrice: 850
};

export const noviqScenarios = [
  {
    id: "sales-cell",
    name: "Sales Cell",
    label: "проверка спроса",
    salesReps: 3,
    salesLeadMonthly: 0,
    specialistMonthly: 0,
    accountMonthly: 0,
    adsMonthly: 2000,
    officeMonthly: 1200,
    opsMonthly: 900,
    bufferMonthly: 700,
    setup: 9000,
    runway: 3,
    focus: "3 менеджера на телефоне, founder-led presale, офис как переговорная и быстрый тест спроса.",
    outcome: "Доказать, что рынок покупает аудиты, website rebuild и первые video packs без тяжелой команды."
  },
  {
    id: "representative-launch",
    name: "Representative Launch",
    label: "офис + продажи",
    salesReps: 5,
    salesLeadMonthly: 2200,
    specialistMonthly: 0,
    accountMonthly: 0,
    adsMonthly: 6000,
    officeMonthly: 2400,
    opsMonthly: 1200,
    bufferMonthly: 1200,
    setup: 18000,
    runway: 6,
    focus: "5 sales-менеджеров, sales lead, офис для встреч и контрактов, регулярная реклама на лидогенерацию.",
    outcome: "Собрать предсказуемый outbound/inbound поток и конвертировать аудиты в переделку сайтов."
  },
  {
    id: "ad-acceleration",
    name: "Ad Acceleration",
    label: "реклама + сейлс",
    salesReps: 6,
    salesLeadMonthly: 2200,
    specialistMonthly: 1800,
    accountMonthly: 0,
    adsMonthly: 14000,
    officeMonthly: 3000,
    opsMonthly: 1500,
    bufferMonthly: 2000,
    setup: 26000,
    runway: 6,
    focus: "Сильнее вкладываемся в paid traffic, креативы, обработку входящих и быстрые коммерческие офферы.",
    outcome: "Быстрее найти связку канал -> оффер -> аудит -> сайт или видео-пакет."
  },
  {
    id: "market-offensive",
    name: "Market Offensive",
    label: "агрессивный старт",
    salesReps: 10,
    salesLeadMonthly: 2200,
    specialistMonthly: 1800,
    accountMonthly: 1800,
    adsMonthly: 28000,
    officeMonthly: 4500,
    opsMonthly: 2400,
    bufferMonthly: 3500,
    setup: 45000,
    runway: 9,
    focus: "10 менеджеров, sales lead, account support, высокий рекламный бюджет и офис как полноценное представительство.",
    outcome: "Занять рынок быстрее, но только при готовности финансировать 9 месяцев runway."
  }
] as const;

export const noviqAddOns = [
  {
    id: "sales-training",
    title: "Sales trainer и скрипты",
    text: "Обучение команды, контроль звонков, objection handling и еженедельные разборы.",
    monthly: 900,
    setup: 3000
  },
  {
    id: "ad-boost",
    title: "Усиление рекламы",
    text: "Дополнительный paid traffic budget для теста 3-4 связок офферов параллельно.",
    monthly: 5000,
    setup: 1000
  },
  {
    id: "vidorix-kit",
    title: "Vidorix demo kit",
    text: "Пакет демо-роликов, шаблонов, презентаций и быстрых examples для продажи видео.",
    monthly: 700,
    setup: 4500
  },
  {
    id: "office-showroom",
    title: "Client showroom",
    text: "Переговорная, экран, презентационная зона и понятный контрактный процесс.",
    monthly: 1200,
    setup: 9000
  },
  {
    id: "crm-stack",
    title: "Sales CRM stack",
    text: "Телефония, записи звонков, pipeline, call reports и dashboard руководителя.",
    monthly: 450,
    setup: 2500
  },
  {
    id: "dev-reserve",
    title: "Contractor dev reserve",
    text: "Небольшой резерв на подрядчиков, когда founder не должен стопорить sales delivery.",
    monthly: 2500,
    setup: 0
  }
] as const;

export const noviqChannels = [
  {
    icon: "ranking",
    title: "Whitespace",
    label: "аудиты и rebuild",
    text: "Диагностика сайта, whitespace-аудит, затем перевод сайта на собственную платформу или rebuild под лидогенерацию."
  },
  {
    icon: "media",
    title: "Vidorix.app",
    label: "пакеты видео",
    text: "Короткие видео, продуктовые ролики, social content и регулярные media packages для бизнеса."
  },
  {
    icon: "lead",
    title: "Телефонные продажи",
    label: "outbound engine",
    text: "Менеджеры обзванивают базу компаний, квалифицируют интерес и закрывают аудит или встречу в офисе."
  }
] as const;

export const noviqDetailPages = [
  {
    href: noviqRoutes.salesEngine,
    eyebrow: "Sales engine",
    title: "Воронка, офферы и unit economics",
    text: "Как телефонные продажи превращаются в аудиты, rebuild-проекты и видео-пакеты."
  },
  {
    href: noviqRoutes.investmentModel,
    eyebrow: "Funding model",
    title: "Runway, tranches и use of funds",
    text: "Какой чек нужен, куда идет капитал и какие milestones открывают следующий транш."
  }
] as const;

export const noviqOffers = [
  {
    name: "Audit Sprint",
    price: "500-1 500 EUR",
    margin: "70-85%",
    cycle: "1-5 дней",
    role: "входной продукт",
    text: "Быстрая диагностика сайта, SEO/UX/контент gaps, список проблем и коммерческий мост к rebuild."
  },
  {
    name: "Website Rebuild",
    price: "4 000-12 000 EUR",
    margin: "45-65%",
    cycle: "2-6 недель",
    role: "основной чек",
    text: "Переделка сайта на собственной платформе, структура лидогенерации, техническая база и дальнейшая поддержка."
  },
  {
    name: "Video Growth Pack",
    price: "700-3 000 EUR / мес.",
    margin: "50-70%",
    cycle: "7-14 дней",
    role: "recurring",
    text: "Пакеты коротких роликов, продуктовых видео, social content и регулярного production через Vidorix.app."
  }
] as const;

export const noviqFunnelModes = [
  {
    mode: "Conservative",
    calls: 300,
    meetings: 8,
    audits: 1,
    rebuilds: 0.2,
    videoPacks: 0.3,
    revenue: 2400
  },
  {
    mode: "Base",
    calls: 360,
    meetings: 14,
    audits: 3,
    rebuilds: 0.7,
    videoPacks: 1,
    revenue: 7600
  },
  {
    mode: "Aggressive",
    calls: 420,
    meetings: 21,
    audits: 5,
    rebuilds: 1.2,
    videoPacks: 2,
    revenue: 13900
  }
] as const;

export const noviqUseOfFunds = [
  { label: "Sales salaries", share: 34, text: "Менеджеры, sales lead и commission pool." },
  { label: "Advertising", share: 24, text: "Paid traffic, креативы и тестирование офферов." },
  { label: "Office", share: 14, text: "Представительство, переговорная, клиентские встречи." },
  { label: "CRM / telephony", share: 7, text: "Pipeline, звонки, записи, отчеты, dashboard." },
  { label: "Demos / packaging", share: 8, text: "Vidorix kit, коммерческие материалы, презентации." },
  { label: "Ops reserve", share: 13, text: "Legal, accounting, подрядчики и непредвиденный runway." }
] as const;

export const noviqTranches = [
  {
    name: "Tranche 1",
    amount: "40k-50k EUR",
    period: "30-45 дней",
    goal: "Запустить sales cell, скрипты, CRM, офисную переговорную и первые рекламные тесты.",
    gate: "500+ контактов, 20+ встреч, 3-5 платных аудитов."
  },
  {
    name: "Tranche 2",
    amount: "80k-110k EUR",
    period: "3-4 месяца",
    goal: "Довести команду до 5 sales, усилить рекламу, закрыть первые rebuild/video contracts.",
    gate: "15+ аудитов, 3+ rebuild, повторяемая воронка по одному каналу."
  },
  {
    name: "Tranche 3",
    amount: "160k+ EUR",
    period: "6-9 месяцев",
    goal: "Масштабировать канал, нанять delivery support и убрать founder bottleneck.",
    gate: "Плановая выручка покрывает существенную часть burn или есть прогнозируемый pipeline."
  }
] as const;

export const noviqHiringRoadmap = [
  { month: "0-1", role: "3 sales managers", reason: "Обзвон, квалификация, назначение встреч и продажа audit sprint." },
  { month: "1-2", role: "Sales lead", reason: "Скрипты, контроль качества звонков, pipeline discipline и найм." },
  { month: "2-3", role: "Performance contractor", reason: "Тест рекламных связок и быстрые посадочные/offers." },
  { month: "3-4", role: "Account / project support", reason: "Чтобы founder не застревал в клиентских follow-up." },
  { month: "4-6", role: "Junior developer / delivery assistant", reason: "Только когда продажи подтверждают нагрузку на delivery." }
] as const;

export const noviqRisks = [
  {
    title: "Sales не выходит на план",
    mitigation: "Недельный контроль звонков, замена слабых менеджеров, trainer и жесткий KPI по встречам."
  },
  {
    title: "Реклама дает дорогие лиды",
    mitigation: "Не масштабировать spend до подтверждения оффера; держать outbound как базовый канал."
  },
  {
    title: "Founder становится bottleneck",
    mitigation: "Продавать paid audits, брать prepayment и подключать contractor reserve только по мере нагрузки."
  },
  {
    title: "Длинный цикл сделки",
    mitigation: "Начинать с малого чека audit sprint, а rebuild и video packs закрывать после диагностики."
  }
] as const;

export const calcNoviqScenarioMonthly = (scenario: (typeof noviqScenarios)[number]) =>
  scenario.salesReps * noviqCosts.salesRepMonthly +
  scenario.salesReps * noviqCosts.salesToolMonthly +
  scenario.salesLeadMonthly +
  scenario.specialistMonthly +
  scenario.accountMonthly +
  scenario.adsMonthly +
  scenario.officeMonthly +
  scenario.opsMonthly +
  scenario.bufferMonthly;

export const formatNoviqEur = (value: number) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
