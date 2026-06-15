import { locales, type Locale } from "@/data/i18n";
import { phoenixProjects } from "@/data/phoenix-project";
import type { LocalizedPrivateProject, PrivateModule, PrivateProject } from "@/data/private-project-types";

export type { LocalizedPrivateProject, PrivateModule, PrivateProject } from "@/data/private-project-types";

export const privateUi: Record<
  Locale,
  {
    privateProjects: string;
    projectLibrary: string;
    openProject: string;
    openModule: string;
    modules: string;
    outputs: string;
    projectMap: string;
    moduleMap: string;
    moduleBlueprint: string;
    projectOverview: string;
    strategicLayer: string;
    implementationPlan: string;
    guardrails: string;
    dataSources: string;
    internalSources: string;
    externalSources: string;
    pilot: string;
    pilotMetrics: string;
    executiveFraming: string;
    strategicEffect: string;
    relatedModules: string;
    allProjects: string;
    backToProject: string;
    accessTitle: string;
    accessText: string;
    accessCode: string;
    accessSubmit: string;
    accessError: string;
    accessHint: string;
    projectsHeroText: string;
    projectWorkspace: string;
    access: string;
    code: string;
    languages: string;
    required: string;
    privateWorkspace: string;
    protectedRoute: string;
    session: string;
    cookieSession: string;
    presentationFlow: string;
    valuePromise: string;
    pilotStory: string;
    proofPoints: string;
  }
> = {
  en: {
    privateProjects: "Private Projects",
    projectLibrary: "Strategic project library",
    openProject: "Open Project",
    openModule: "Open Module",
    modules: "Modules",
    outputs: "Outputs",
    projectMap: "System architecture",
    moduleMap: "Five connected modules",
    moduleBlueprint: "Core slide",
    projectOverview: "Presentation frame",
    strategicLayer: "Value story",
    implementationPlan: "Pilot plan",
    guardrails: "Decision controls",
    dataSources: "Signal inputs",
    internalSources: "Inside Grafit",
    externalSources: "Market outside",
    pilot: "First pilot",
    pilotMetrics: "Proof points",
    executiveFraming: "Boardroom line",
    strategicEffect: "Commercial effect",
    relatedModules: "Next slides",
    allProjects: "All Projects",
    backToProject: "Back to Project",
    accessTitle: "Project access.",
    accessText: "Enter the access code to open the project area.",
    accessCode: "Access code",
    accessSubmit: "Unlock Workspace",
    accessError: "The code is not valid. Check it and try again.",
    accessHint: "One access code opens the current project session.",
    projectsHeroText:
      "Strategic project area for concepts, system maps, pilot plans, and decision material.",
    projectWorkspace: "project area",
    access: "Access",
    code: "Code",
    languages: "Languages",
    required: "Required",
    privateWorkspace: "Project area",
    protectedRoute: "Protected route",
    session: "Session",
    cookieSession: "Cookie session",
    presentationFlow: "System story",
    valuePromise: "Value",
    pilotStory: "Pilot",
    proofPoints: "Proof"
  },
  ro: {
    privateProjects: "Proiecte private",
    projectLibrary: "Biblioteca strategica de proiecte",
    openProject: "Deschide proiectul",
    openModule: "Deschide modulul",
    modules: "Module",
    outputs: "Rezultate",
    projectMap: "Arhitectura sistemului",
    moduleMap: "Cinci module conectate",
    moduleBlueprint: "Slide central",
    projectOverview: "Cadru de prezentare",
    strategicLayer: "Povestea valorii",
    implementationPlan: "Plan pilot",
    guardrails: "Controale de decizie",
    dataSources: "Inputuri de semnal",
    internalSources: "Din Grafit",
    externalSources: "Din piata",
    pilot: "Primul pilot",
    pilotMetrics: "Puncte de dovada",
    executiveFraming: "Linie pentru board",
    strategicEffect: "Efect comercial",
    relatedModules: "Slide-uri urmatoare",
    allProjects: "Toate proiectele",
    backToProject: "Inapoi la proiect",
    accessTitle: "Acces la proiect.",
    accessText: "Introdu codul de acces pentru a deschide zona proiectului.",
    accessCode: "Cod de acces",
    accessSubmit: "Deschide proiectul",
    accessError: "Codul nu este valid. Verifica-l si incearca din nou.",
    accessHint: "Un cod de acces deschide sesiunea curenta a proiectului.",
    projectsHeroText:
      "Zona strategica pentru concepte, harti de sistem, planuri pilot si material de decizie.",
    projectWorkspace: "zona de proiect",
    access: "Acces",
    code: "Cod",
    languages: "Limbi",
    required: "Necesar",
    privateWorkspace: "Zona de proiect",
    protectedRoute: "Ruta protejata",
    session: "Sesiune",
    cookieSession: "Sesiune cookie",
    presentationFlow: "Povestea sistemului",
    valuePromise: "Valoare",
    pilotStory: "Pilot",
    proofPoints: "Dovada"
  },
  ru: {
    privateProjects: "Стратегические проекты",
    projectLibrary: "Стратегическая библиотека проектов",
    openProject: "Открыть проект",
    openModule: "Открыть модуль",
    modules: "Модули",
    outputs: "Результаты",
    projectMap: "Архитектура системы",
    moduleMap: "Пять связанных модулей",
    moduleBlueprint: "Ключевая идея",
    projectOverview: "Концепция",
    strategicLayer: "История ценности",
    implementationPlan: "План пилота",
    guardrails: "Управляемость",
    dataSources: "Сигналы",
    internalSources: "Внутри Grafit",
    externalSources: "Внешний рынок",
    pilot: "Первый пилот",
    pilotMetrics: "Доказательство",
    executiveFraming: "Для руководства",
    strategicEffect: "Коммерческий эффект",
    relatedModules: "Следующие слайды",
    allProjects: "Все проекты",
    backToProject: "Назад к проекту",
    accessTitle: "Доступ к проекту.",
    accessText: "Введите код доступа, чтобы открыть раздел проекта.",
    accessCode: "Код доступа",
    accessSubmit: "Открыть раздел",
    accessError: "Код неверный. Проверьте его и попробуйте еще раз.",
    accessHint: "Один код доступа открывает текущую сессию проекта.",
    projectsHeroText:
      "Раздел для стратегической концепции, карты системы, пилотного плана и материалов для принятия решения.",
    projectWorkspace: "раздел проекта",
    access: "Доступ",
    code: "Код",
    languages: "Языки",
    required: "Обязательно",
    privateWorkspace: "Раздел проекта",
    protectedRoute: "Защищенный маршрут",
    session: "Сессия",
    cookieSession: "Сессия доступа",
    presentationFlow: "Маршрут презентации",
    valuePromise: "Ценность",
    pilotStory: "Пилот",
    proofPoints: "Доказательство"
  }
};

const enModules: PrivateModule[] = [
  {
    slug: "ai-trade-radar",
    title: "AI Trade Radar",
    icon: "monitor",
    summary:
      "A real-time awareness layer that turns market, pricing, supplier, inventory, and risk movement into prioritized trading alerts.",
    positioning:
      "AI Trade Radar gives the team early visibility into relevant change: what moved, why it matters commercially, and which signals deserve review first.",
    outputs: ["Prioritized trading alerts", "Signal explanations", "Risk and opportunity queue", "Weekly radar review"],
    layers: [
      {
        title: "Signal capture",
        text: "Collect price, stock, supplier, inventory, and market movement from internal and external sources.",
        icon: "data",
        items: ["Pricing changes", "Supplier activity", "Inventory aging"]
      },
      {
        title: "Relevance logic",
        text: "Classify what changed, why it matters, and which team should review it.",
        icon: "ranking",
        items: ["Risk tags", "Opportunity tags", "Priority score"]
      },
      {
        title: "Alert workflow",
        text: "Turn the signal into a clear commercial review alert with source, reason, priority, and next step.",
        icon: "flow",
        items: ["Weekly queue", "Team review", "Action notes"]
      },
      {
        title: "Decision output",
        text: "Support faster sourcing, pricing, sales, and transfer decisions without automating the decision itself.",
        icon: "tools",
        items: ["Review candidates", "Action options", "Outcome tracking"]
      }
    ],
    sections: [
      {
        title: "What it is",
        text:
          "AI Trade Radar is the first visibility layer for Grafit. It monitors the trading environment and turns noise into a small set of actionable alerts: what changed, why it matters, where the risk is, where an opportunity may exist, and what action can be considered."
      },
      {
        title: "Why Grafit",
        items: [
          "Grafit operates across multiple categories, markets, suppliers, warehouses, and sales channels.",
          "The larger the trading surface becomes, the easier it is for meaningful signals to disappear between teams.",
          "The radar makes market movement visible before it becomes a missed opportunity, aged stock problem, or pricing issue."
        ]
      },
      {
        title: "What the radar tracks",
        groups: [
          {
            title: "Pricing radar",
            items: ["abnormal price drop", "price compression", "undervalued stock", "competitor discounting", "region-specific price gaps"]
          },
          {
            title: "Supplier radar",
            items: ["new supplier activity", "stock lot appearance", "repeated offers", "reliability changes", "new potential suppliers"]
          },
          {
            title: "Inventory radar",
            items: ["aging stock", "slow-moving inventory", "liquidation candidates", "bundle opportunities", "stock that may fit another market"]
          },
          {
            title: "Risk radar",
            items: ["logistics cost changes", "supplier risk", "demand weakening", "margin compression", "documentation issues"]
          }
        ]
      }
    ],
    sources: {
      internal: ["current stock", "pricing database", "sales velocity", "purchase history", "supplier records", "buyer demand", "margin history", "warehouse data", "rejected deals"],
      external: ["B2B platforms", "marketplaces", "distributor websites", "liquidation platforms", "auction sites", "price monitoring", "product catalogues", "industry news"]
    },
    pilot: {
      title: "Narrow radar pilot",
      steps: [
        "Choose one vertical and connect current stock, pricing, and sales velocity.",
        "Add 5-10 external price, market, or supplier sources.",
        "Define alert logic for pricing, supplier, inventory, and risk movement.",
        "Issue a weekly prioritized signal queue.",
        "Review usefulness with sourcing, pricing, and sales teams."
      ],
      goal: "Understand which alert types actually help teams make faster and more accurate decisions.",
      metrics: ["useful alerts per week", "false-positive rate", "time saved in review", "decision follow-through", "commercial value of confirmed signals"]
    },
    guardrails: [
      "Every alert shows source, reason, and priority.",
      "The team sees review state, action note, and outcome feedback.",
      "The system helps select commercially meaningful signals faster."
    ],
    executive:
      "Grafit already has strong operational systems. AI Trade Radar adds a real-time awareness layer above them, helping teams detect pricing anomalies, supplier signals, stock risks, and market opportunities earlier and with more confidence.",
    effects: ["faster awareness", "fewer missed opportunities", "better stock utilization", "faster pricing reaction", "stronger supplier monitoring", "less dead inventory", "clearer trading priorities"]
  },
  {
    slug: "global-surplus-intelligence-network",
    title: "Global Surplus Intelligence Network",
    icon: "data",
    summary:
      "An external market intelligence network that continuously looks for surplus, overstock, liquidation, and category movement signals across markets.",
    positioning:
      "This module expands Grafit's market visibility and connects external market asymmetry with deal history, supplier context, and commercial priorities.",
    outputs: ["Surplus signal feed", "Ranked opportunities", "Source coverage map", "External-to-internal signal match"],
    layers: [
      {
        title: "External watchlist",
        text: "Monitor channels where surplus and overstock signals usually appear before they become obvious.",
        icon: "lens",
        items: ["Liquidation platforms", "B2B catalogues", "Distributor movement"]
      },
      {
        title: "Signal enrichment",
        text: "Add category, region, supplier, price, timing, and reliability context to raw signals.",
        icon: "api",
        items: ["Category match", "Region match", "Supplier context"]
      },
      {
        title: "Trading relevance",
        text: "Rank signals by likely fit with Grafit history, demand, margin, and logistics reality.",
        icon: "ranking",
        items: ["Demand fit", "Margin potential", "Logistics risk"]
      },
      {
        title: "Opportunity candidate",
        text: "Move only the strongest signals into sourcing review as opportunity candidates.",
        icon: "flow",
        items: ["Review queue", "Evidence pack", "Team decision"]
      }
    ],
    sections: [
      {
        title: "What it is",
        text:
          "Global Surplus Intelligence Network is an external market intelligence layer that constantly searches for signals of surplus opportunities across countries, categories, manufacturers, distributors, and B2B channels."
      },
      {
        title: "Why Grafit",
        items: [
          "Grafit already has sourcing, pricing, sales, logistics, buyer network, and trading experience.",
          "The next advantage is not replacing that machine, but increasing the amount and quality of useful market signals that enter it.",
          "External data without internal history creates noise; internal history without external monitoring creates limited visibility."
        ]
      },
      {
        title: "Signal categories",
        items: [
          "warehouse liquidation",
          "distributor exit",
          "overstock accumulation",
          "bankruptcy or restructuring signal",
          "abnormal price drop",
          "product line discontinuation",
          "large stock lot appearance",
          "regional shortage or oversupply",
          "manufacturer model transition",
          "B2B auction activity"
        ]
      }
    ],
    sources: {
      internal: ["purchase history", "sales history", "rejected deals", "supplier history", "buyer behavior", "pricing history", "stock aging", "warehouse movement", "margin by category"],
      external: ["B2B marketplaces", "liquidation platforms", "auction platforms", "manufacturer websites", "distributor websites", "public catalogues", "reseller price lists", "public procurement notices", "open web monitoring"]
    },
    pilot: {
      title: "Surplus signal pilot",
      steps: [
        "Choose one vertical such as printer supplies or auto parts.",
        "Select 5-10 external data sources with real signal density.",
        "Connect a limited set of internal historical data.",
        "Collect and classify surplus signals by trading relevance.",
        "Show the team ranked opportunities rather than raw data.",
        "Compare results against what the team would have found manually."
      ],
      goal: "Prove whether an external intelligence layer can find useful surplus signals earlier, wider, or cheaper than the current manual process.",
      metrics: ["signals found", "signals accepted for review", "manual search comparison", "lead time advantage", "confirmed commercial opportunities"]
    },
    guardrails: [
      "Signals are ranked before they enter review.",
      "Every opportunity candidate keeps source traceability.",
      "The team receives commercially explained opportunities, not raw data."
    ],
    executive:
      "Grafit already has strong trading infrastructure. The proposal is to add a permanent market intelligence layer above it, so external market asymmetry can be detected, enriched, matched with internal history, and turned into opportunity candidates faster.",
    effects: ["faster sourcing", "wider market visibility", "fewer missed opportunities", "stronger negotiation position", "better capital allocation", "more cross-market intelligence"]
  },
  {
    slug: "predictive-opportunity-engine",
    title: "Predictive Opportunity Engine",
    icon: "ai",
    summary:
      "A predictive sourcing layer that looks for early market patterns that often appear before surplus opportunities become visible to everyone.",
    positioning:
      "This module moves sourcing from reacting to already visible markets toward earlier detection of patterns that can lead to profitable surplus opportunities.",
    outputs: ["Opportunity hypotheses", "Early warning signals", "Pattern match reports", "Supplier outreach candidates"],
    layers: [
      {
        title: "Historical pattern base",
        text: "Collect past successful surplus purchases and the signals that appeared before them.",
        icon: "data",
        items: ["Past surplus events", "Timing data", "Margin outcome"]
      },
      {
        title: "Early signal watch",
        text: "Monitor product, distributor, market, and supply chain movement for similar patterns.",
        icon: "monitor",
        items: ["Lifecycle change", "Price compression", "Supply pressure"]
      },
      {
        title: "Hypothesis engine",
        text: "Turn early patterns into opportunity hypotheses with evidence and confidence markers.",
        icon: "ai",
        items: ["Pattern match", "Risk tag", "Demand match"]
      },
      {
        title: "Sourcing review",
        text: "Route hypotheses to the sourcing team for validation and early outreach.",
        icon: "lead",
        items: ["Supplier check", "Demand check", "Action decision"]
      }
    ],
    sections: [
      {
        title: "What it is",
        text:
          "Predictive Opportunity Engine looks not only for existing surplus offers, but also for early signs that surplus may appear soon. It is designed for timing advantage: seeing an opportunity while the market has not fully priced it yet."
      },
      {
        title: "Why Grafit",
        items: [
          "In surplus trading, timing is money.",
          "If Grafit sees an opportunity at the same time as everyone else, the competition moves to price and reaction speed.",
          "If Grafit sees the pattern earlier, it gets more time for verification, supplier outreach, demand assessment, and capital planning."
        ]
      },
      {
        title: "Predictive signal groups",
        groups: [
          {
            title: "Product lifecycle",
            items: ["new model replaces old model", "manufacturer discontinues line", "compatibility changes", "demand falls for older SKU"]
          },
          {
            title: "Distributor and retailer",
            items: ["branch closures", "restructuring", "clearance campaigns", "rising inventory", "financial pressure signals"]
          },
          {
            title: "Market and supply chain",
            items: ["price compression", "regional oversupply", "falling sell-through", "seasonal imbalance", "longer lead time"]
          }
        ]
      }
    ],
    sources: {
      internal: ["historical surplus events", "purchase timing", "sell-through speed", "margin outcomes", "supplier behavior history", "rejected offers", "inventory aging", "demand by region"],
      external: ["manufacturer announcements", "distributor websites", "retailer clearance pages", "B2B stock lists", "auction platforms", "financial registry signals", "marketplace pricing", "industry news"]
    },
    pilot: {
      title: "Predictive sourcing pilot",
      steps: [
        "Choose one category.",
        "Collect historical examples of successful surplus purchases.",
        "Identify external signals that appeared before those opportunities.",
        "Configure monitoring for similar future signals.",
        "Produce weekly opportunity hypotheses.",
        "Validate them with the sourcing team."
      ],
      goal: "Understand whether future surplus situations can be detected before they become obvious market offers.",
      metrics: ["hypotheses generated", "hypotheses validated", "days of lead time", "supplier engagement rate", "commercial outcome"]
    },
    guardrails: [
      "Each hypothesis is separated from the confirmed commercial decision.",
      "Every score is explained through evidence and source traceability.",
      "Review outcomes return to the system and improve future recommendations."
    ],
    executive:
      "Grafit is already strong at working with visible surplus opportunities. Predictive Opportunity Engine adds the next level: finding early market signs of future surplus so the team can act before the opportunity becomes visible to everyone.",
    effects: ["earlier sourcing", "better negotiation position", "less competition pressure", "higher potential margin", "faster supplier engagement", "better capital planning", "stronger market anticipation"]
  },
  {
    slug: "institutional-memory-layer",
    title: "Institutional Memory Layer",
    icon: "space",
    summary:
      "A shared operational memory layer that turns supplier, deal, SKU, market, and mistake history into a reusable management asset.",
    positioning:
      "This module turns Grafit's accumulated experience into working memory for future trading decisions: suppliers, deals, SKUs, markets, risks, and repeated patterns become available at the right moment.",
    outputs: ["Supplier memory cards", "Deal memory cards", "Product and SKU memory", "Past-experience search", "Reusable lessons"],
    layers: [
      {
        title: "Memory capture",
        text: "Collect historic decisions, outcomes, supplier notes, margins, delays, and rejected deals.",
        icon: "content",
        items: ["Deals", "Suppliers", "SKU history"]
      },
      {
        title: "Structured cards",
        text: "Convert raw history into supplier, deal, product, and market memory cards.",
        icon: "space",
        items: ["Supplier card", "Deal card", "Product card"]
      },
      {
        title: "Similarity search",
        text: "Find previous cases similar to a new supplier, SKU, category, or deal.",
        icon: "lens",
        items: ["Similar deals", "Known risks", "Reusable buyers"]
      },
      {
        title: "Decision support",
        text: "Make past experience usable before a team repeats an old mistake or misses a known pattern.",
        icon: "ranking",
        items: ["Risk context", "Margin history", "Decision notes"]
      }
    ],
    sections: [
      {
        title: "What it is",
        text:
          "Institutional Memory Layer turns the accumulated experience of Grafit into a living system of collective trading intelligence. The goal is to make past operational knowledge usable for future decisions."
      },
      {
        title: "Why Grafit",
        items: [
          "Grafit has years of decisions about suppliers, deals, SKU, margins, logistics, buyer behavior, and mistakes.",
          "In a large trading group, knowledge loss becomes expensive when it stays only in heads, messages, old spreadsheets, or local team habits.",
          "Institutional memory makes the best experience of the organization available across the whole system."
        ]
      },
      {
        title: "What the memory can store",
        groups: [
          {
            title: "Supplier memory",
            items: ["supplier history", "delivery quality", "real conditions", "documentation problems", "hidden risks"]
          },
          {
            title: "Deal memory",
            items: ["why a deal was accepted", "why it was rejected", "expected margin", "real margin", "sales duration", "buyer response"]
          },
          {
            title: "Product and market memory",
            items: ["analogs", "compatibility", "dead stock risk", "price elasticity", "seasonality", "countries where demand was stronger"]
          }
        ]
      }
    ],
    sources: {
      internal: ["ERP", "PIM", "pricing history", "sales history", "purchase history", "warehouse data", "CRM communication", "email notes", "manager comments", "claims and returns", "supplier records", "spreadsheets"],
      external: ["supplier websites", "public company data", "market prices", "distributor catalogues", "logistics benchmarks", "marketplace history", "company registries", "category demand indicators"]
    },
    pilot: {
      title: "Operational memory pilot",
      steps: [
        "Choose one vertical.",
        "Collect 12-24 months of historic deals.",
        "Gather supplier, margin, sales duration, and rejected deal context.",
        "Create a searchable intelligence layer.",
        "Build the first supplier, deal, and product memory cards.",
        "Test it on real new deals."
      ],
      goal: "Show whether the system can find relevant past experience faster and reduce repeat mistakes.",
      metrics: ["historic cases indexed", "memory cards created", "search success rate", "repeat-risk findings", "time saved in evaluation"]
    },
    guardrails: [
      "Memory cards are built around real commercial use cases.",
      "Sensitive commercial information follows access rules.",
      "Expert experience becomes easier to find, compare, and reuse."
    ],
    executive:
      "Grafit already has a large volume of operational experience. Institutional Memory Layer turns that experience into a system asset so knowledge about suppliers, deals, SKU, markets, and mistakes does not stay fragmented, but supports every relevant team.",
    effects: ["fewer repeated mistakes", "faster onboarding", "expertise preservation", "better supplier risk control", "faster deal evaluation", "cross-company knowledge reuse", "less dependency on individual memory"]
  },
  {
    slug: "cross-vertical-intelligence",
    title: "Cross-Vertical Intelligence",
    icon: "flow",
    summary:
      "A group-level intelligence layer that finds reusable supplier, pricing, market, logistics, inventory, and demand patterns across Grafit verticals.",
    positioning:
      "This module strengthens intelligence flow between Grafit companies and verticals: successful patterns, market signals, supplier insights, and risks become visible where they can create new value.",
    outputs: ["Cross-vertical pattern map", "Reusable market lessons", "Group-level risk view", "Shared opportunity signals"],
    layers: [
      {
        title: "Vertical inputs",
        text: "Collect normalized signals from selected companies, categories, markets, suppliers, and deal history.",
        icon: "data",
        items: ["Sales", "Purchases", "Stock", "Margins"]
      },
      {
        title: "Pattern matching",
        text: "Find repeated supplier, region, pricing, inventory, and logistics patterns across verticals.",
        icon: "lens",
        items: ["Supplier pattern", "Regional pattern", "Pricing pattern"]
      },
      {
        title: "Group intelligence",
        text: "Show where one business unit can reuse the knowledge or market signal of another.",
        icon: "product",
        items: ["Reusable buyers", "Shared risk", "Related category"]
      },
      {
        title: "Management view",
        text: "Support executive visibility without removing autonomy from operating teams.",
        icon: "ranking",
        items: ["Top risks", "Margin potential", "Capital allocation"]
      }
    ],
    sections: [
      {
        title: "What it is",
        text:
          "Cross-Vertical Intelligence helps Grafit learn not only inside separate verticals, but also between them. It identifies common patterns between companies, categories, markets, suppliers, inventory movement, and buyer behavior."
      },
      {
        title: "Why Grafit",
        items: [
          "Grafit works as a multi-company and multi-vertical trading holding.",
          "Each vertical can be strong in its niche, but hidden patterns may stay locked inside separate teams.",
          "The next strategic level is to let intelligence from one vertical improve decisions in another."
        ]
      },
      {
        title: "Patterns to reveal",
        groups: [
          {
            title: "Supplier patterns",
            items: ["reliability", "repeated problems", "documentation quality", "payment or delivery risk", "related suppliers"]
          },
          {
            title: "Regional patterns",
            items: ["where demand is stronger", "where margin is better", "where logistics is cheaper", "where returns risk is higher"]
          },
          {
            title: "Inventory and pricing patterns",
            items: ["undervalued stock", "overpricing blocks sales", "discount strategy works better", "stock useful to another market or division"]
          }
        ]
      }
    ],
    sources: {
      internal: ["sales across companies", "purchases", "warehouse data", "pricing history", "supplier data", "buyer data", "margin reports", "logistics data", "returns and claims", "rejected deals", "category performance"],
      external: ["market prices", "demand signals", "regional marketplace data", "supplier public activity", "competitor prices", "B2B catalogues", "logistics benchmarks"]
    },
    pilot: {
      title: "Cross-vertical pilot",
      steps: [
        "Choose 2-3 verticals, not the whole holding.",
        "Collect 12 months of deal, supplier, category, region, margin, and stock age data.",
        "Normalize the data enough for comparison.",
        "Find repeated operational patterns.",
        "Show management where one business unit can reuse intelligence from another."
      ],
      goal: "Prove that hidden operational patterns exist between verticals and can be monetized.",
      metrics: ["verticals compared", "patterns found", "reuse candidates", "risk overlaps", "confirmed synergy value"]
    },
    guardrails: [
      "Each vertical keeps its operating specificity.",
      "The shared layer reveals reusable patterns without forced process unification.",
      "Value is created through decision intelligence, not through the dashboard itself."
    ],
    executive:
      "Grafit already has strong specialized companies. The next level is to make intelligence from each vertical strengthen the whole holding. Cross-Vertical Intelligence creates a shared visibility layer for suppliers, markets, pricing, logistics, inventory, and demand patterns.",
    effects: ["less duplicate supplier research", "faster spread of successful practices", "better executive visibility", "stronger group-level decisions", "more synergy between companies", "better capital allocation", "less dead stock", "more market leverage"]
  }
];

const ruModules: PrivateModule[] = [
  {
    slug: "ai-trade-radar",
    title: "ИИ-радар торговых сигналов",
    icon: "monitor",
    summary:
      "Операционный радар для ежедневных изменений: цены, склад, поставщики, рынок и риск превращаются в короткую очередь действий.",
    positioning:
      "Этот модуль отвечает на вопрос команды: что требует внимания сегодня. Вместо отчета за прошлый период он выделяет изменения, которые могут повлиять на закупку, цену, продажу, склад или риск.",
    presentation: {
      valueTitle: "Сигналы, которые команда видит раньше",
      valueText: "Радар сокращает расстояние между изменением на рынке и действием внутри команды: не общий шум, а несколько проверяемых сигналов с причиной и следующим шагом.",
      flowTitle: "От рыночного шума к очереди действий",
      flowText: "Логика модуля простая: поймать изменение, объяснить причину, присвоить приоритет и передать команде короткое торговое оповещение.",
      proofTitle: "Раньше заметить, быстрее проверить",
      proofText: "Ценность доказывается не количеством уведомлений, а тем, сколько сигналов команда реально проверила, подтвердила и довела до решения.",
      pilotSlideTitle: "Пилот: полезность оповещений",
      pilotSlideText: "В пилоте остаются только те оповещения, которые ускоряют решения закупки, ценообразования и продаж; все остальное отсекается как шум.",
      internalSourceTitle: "Данные для ранней видимости",
      externalSourceTitle: "Рыночные сигналы вокруг Grafit",
      metricTitle: "Как проверяем полезность радара"
    },
    outputs: ["Торговые оповещения с действием", "Пояснение причины сигнала", "Очередь внимания на неделю", "Разбор реакции команды"],
    layers: [
      {
        title: "Радар цен",
        text: "Сравнивать внутреннюю цену, рыночные скидки и региональные разрывы, чтобы вовремя увидеть давление на маржу или шанс переоценки.",
        icon: "data",
        items: ["Падение цены", "Сжатие маржи", "Ценовой разрыв"]
      },
      {
        title: "Радар поставщиков",
        text: "Отмечать, когда поставщик внезапно активизировался, вывел похожие позиции, поменял условия или начал повторять предложения по одной категории.",
        icon: "ranking",
        items: ["Новая активность", "Партии на рынке", "Изменение условий"]
      },
      {
        title: "Радар склада",
        text: "Показывать не просто стареющий складской остаток, а варианты действия: переоценить, собрать комплект, перенести в другой рынок или усилить точечные продажи.",
        icon: "flow",
        items: ["Стареющий склад", "Медленные позиции", "Кандидаты на перенос"]
      },
      {
        title: "Радар рынка и риска",
        text: "Связывать спрос, сезонность, логистику, действия конкурентов и документы, чтобы риск не обнаруживался уже после сделки.",
        icon: "tools",
        items: ["Ослабление спроса", "Логистический риск", "Действие команды"]
      }
    ],
    sections: [
      {
        title: "Операционная видимость без отчетного шума",
        text:
          "ИИ-радар нужен не для красивой отчетности. Его задача - каждый день смотреть на цены, склад, поставщиков, движение рынка и риски, а затем превращать шум в короткий список торговых оповещений для команды."
      },
      {
        title: "Почему радар нужен именно Grafit",
        items: [
          "В Grafit сигнал может родиться в одном месте: у поставщика, на складе, в цене конкурента или в изменении спроса по региону.",
          "Если этот сигнал не попал в поле зрения вовремя, он превращается в позднюю реакцию: упущенную партию, мертвый остаток или неверную цену.",
          "Радар делает такие изменения видимыми до того, как они становятся проблемой или пропущенной возможностью."
        ]
      },
      {
        title: "Пять зон наблюдения торгового радара",
        groups: [
          {
            title: "Ценовые сигналы",
            items: ["аномальное снижение цены", "сжатие маржи", "недооцененный товар", "скидки конкурентов", "ценовые разрывы между регионами"]
          },
          {
            title: "Сигналы поставщиков",
            items: ["новая активность поставщика", "появление крупных партий", "повторяющиеся предложения", "изменение надежности", "новые потенциальные поставщики"]
          },
          {
            title: "Сигналы склада",
            items: ["старение запасов", "медленно продающиеся позиции", "кандидаты на ликвидацию", "возможности для комплектов", "товар для другого рынка"]
          },
          {
            title: "Сигналы риска",
            items: ["изменение стоимости логистики", "риск по поставщику", "ослабление спроса", "сжатие маржи", "проблемы с документами"]
          }
        ]
      }
    ],
    sources: {
      internal: ["текущие складские остатки", "база цен", "скорость продаж", "история закупок", "карточки поставщиков", "спрос покупателей", "история маржи", "данные склада", "отклоненные сделки"],
      external: ["B2B-платформы", "маркетплейсы", "сайты дистрибьюторов", "платформы ликвидации остатков", "аукционные площадки", "мониторинг цен", "товарные каталоги", "отраслевые новости"]
    },
    pilot: {
      title: "Узкий пилот торгового радара",
      steps: [
        "Выбрать одну вертикаль и подключить текущие складские остатки, цены и скорость продаж.",
        "Добавить 5-10 внешних источников по ценам, рынку или поставщикам.",
        "Определить логику оповещений по ценам, поставщикам, складу и рискам.",
        "Еженедельно формировать приоритетную очередь сигналов.",
        "Проверять полезность сигналов с командами закупки, ценообразования и продаж."
      ],
      goal: "Понять, какие типы оповещений действительно помогают команде принимать решения быстрее и точнее.",
      metrics: ["полезные сигналы в неделю", "доля ложных срабатываний", "сэкономленное время проверки", "доведение решений до результата", "коммерческая ценность подтвержденных сигналов"]
    },
    guardrails: [
      "Радар не принимает решение о закупке, а поднимает сигнал на проверку.",
      "Каждое оповещение объясняет источник, изменение, риск или возможность.",
      "Результат реакции возвращается в систему, чтобы улучшать качество следующих оповещений."
    ],
    executive:
      "У Grafit уже есть сильные операционные системы. ИИ-радар не заменяет их, а добавляет слой ранней видимости: ценовые аномалии, сигналы поставщиков, складские риски и рыночные возможности становятся заметны раньше.",
    effects: ["раньше видны изменения", "меньше упущенных возможностей", "лучше используется склад", "быстрее реакция на цены", "сильнее контроль поставщиков", "меньше мертвых остатков", "точнее торговые приоритеты"]
  },
  {
    slug: "global-surplus-intelligence-network",
    title: "Сеть поиска избыточных товарных возможностей",
    icon: "data",
    summary:
      "Внешняя разведка рынка избыточных партий: система ищет, где появляется товарная возможность, и связывает сигнал с историей Grafit.",
    positioning:
      "Вместо сбора ссылок модуль превращает внешний рынок ликвидаций, избыточных запасов и B2B-предложений в поток объясненных кандидатов для закупочной команды.",
    presentation: {
      valueTitle: "Внешний рынок становится картой возможностей",
      valueText: "Ценность появляется, когда внешний сигнал сразу получает контекст: категория, регион, источник, похожие сделки Grafit, спрос, маржа и логистическая реальность.",
      flowTitle: "От внешнего сигнала к проверенной партии",
      flowText: "Внешний сигнал проходит четыре шага: источник, обогащение контекстом, сверка с историей Grafit и карточка возможности для закупки.",
      proofTitle: "Больше полезных входов для закупки",
      proofText: "Успех модуля измеряется не числом найденных страниц, а количеством возможностей, которые команда приняла в проверку и смогла сравнить с ручным поиском.",
      pilotSlideTitle: "Пилот: от сигнала к возможности",
      pilotSlideText: "В пилоте одна вертикаль получает внешний поток сигналов и сравнивает его с ручным поиском: что нашли раньше, что шире и что реально пошло в проверку.",
      internalSourceTitle: "История Grafit для оценки сигнала",
      externalSourceTitle: "Внешние источники товарных сигналов",
      metricTitle: "Как проверяем качество возможностей"
    },
    outputs: ["Ранжированные товарные возможности", "Карта внешних источников", "Сигналы рыночной асимметрии", "Сопоставление с историей Grafit"],
    layers: [
      {
        title: "Внешний радар источников",
        text: "Наблюдать платформы ликвидации, B2B-маркетплейсы, аукционы, каталоги и публичные уведомления как сеть, где избыточные партии появляются раньше массового рынка.",
        icon: "lens",
        items: ["Ликвидации", "B2B-аукционы", "Публичные уведомления"]
      },
      {
        title: "Фильтр торговой ценности",
        text: "Отсекать поток нерелевантных объявлений и оставлять сигналы, где видны маржа, переизбыток, дефицит, момент входа или региональная асимметрия.",
        icon: "api",
        items: ["Торговая ценность", "Рыночная асимметрия", "Момент входа"]
      },
      {
        title: "Связка с историей Grafit",
        text: "Проверять внешний сигнал против истории закупок, отклоненных сделок, поведения покупателей, маржи по категории и логистических затрат.",
        icon: "ranking",
        items: ["История закупок", "Спрос покупателей", "Контекст маржи"]
      },
      {
        title: "Кандидат в возможность",
        text: "Передавать команде не ссылку, а карточку возможности: что найдено, почему это может быть ценно, чем подтверждается и что проверить первым.",
        icon: "flow",
        items: ["Ранжированная очередь", "Пакет доказательств", "Решение команды"]
      }
    ],
    sections: [
      {
        title: "Внешний рынок как наблюдаемая система",
        text:
          "Сеть поиска избыточных товарных возможностей делает внешний рынок постоянно наблюдаемым. Система ищет ликвидации складов, выход дистрибьюторов из категорий, накопление избыточных запасов, сигналы банкротства, распродажи и другие признаки будущей товарной возможности."
      },
      {
        title: "Где появляется торговая ценность",
        items: [
          "В бизнесе избыточных партий важен не сам факт найденной партии, а скорость понимания: есть ли спрос, маржа, логистика и смысл заходить в переговоры.",
          "У Grafit уже есть закупка, ценообразование, продажи, сеть покупателей и цепочка поставок; модуль подает в эту машину более качественные внешние входы.",
          "Внешние данные без внутренней истории дают шум. История без внешней разведки дает ограниченную видимость. Ценность появляется в их связке."
        ]
      },
      {
        title: "Сигналы избыточного рынка",
        items: [
          "ликвидация складских остатков",
          "выход дистрибьютора из категории",
          "накопление избыточного товара",
          "сигналы банкротства или реструктуризации",
          "аномальное снижение цены",
          "снятие товарной линии с производства",
          "появление крупной партии товара",
          "региональный дефицит или переизбыток",
          "переход производителя на новую модель",
          "активность на B2B-аукционах"
        ]
      }
    ],
    sources: {
      internal: ["история закупок", "история продаж", "отклоненные сделки", "история поставщиков", "поведение покупателей", "история цен", "старение запасов", "движение склада", "маржа по категориям"],
      external: ["B2B-маркетплейсы", "платформы ликвидации остатков", "аукционные площадки", "сайты производителей", "сайты дистрибьюторов", "открытые каталоги", "прайс-листы реселлеров", "публичные закупочные уведомления", "мониторинг открытого веба"]
    },
    pilot: {
      title: "Пилот по поиску избыточных товарных возможностей",
      steps: [
        "Выбрать одну вертикаль, например расходные материалы для принтеров или автозапчасти.",
        "Выбрать 5-10 внешних источников с реальной плотностью сигналов.",
        "Подключить ограниченный набор внутренних исторических данных.",
        "Собирать и классифицировать сигналы по торговой релевантности.",
        "Показывать команде ранжированные возможности, а не сырые данные.",
        "Сравнить результат с тем, что команда нашла бы вручную."
      ],
      goal: "Доказать, может ли внешний слой рыночной аналитики находить полезные сигналы раньше, шире или дешевле текущего ручного процесса.",
      metrics: ["найденные сигналы", "сигналы, принятые в проверку", "сравнение с ручным поиском", "выигрыш во времени", "подтвержденные коммерческие возможности"]
    },
    guardrails: [
      "Система не обещает автоматическую закупку; решение остается за людьми Grafit.",
      "Каждый кандидат сохраняет связь с источником, внутренней историей и причиной ранжирования.",
      "На проверку попадают ранжированные возможности, а не поток неструктурированных ссылок."
    ],
    executive:
      "Grafit уже обладает сильной торговой инфраструктурой. Идея - добавить над ней постоянный слой рыночной разведки, который раньше обнаруживает сигналы избыточного товара, связывает их с внутренней историей и помогает превращать рыночную асимметрию в торговые возможности.",
    effects: ["быстрее поиск поставщиков", "шире рыночная видимость", "меньше пропущенных возможностей", "сильнее переговорная позиция", "лучше распределение капитала", "меньше случайного поиска", "больше межрыночной разведки"]
  },
  {
    slug: "predictive-opportunity-engine",
    title: "Механизм прогнозирования возможностей",
    icon: "ai",
    summary:
      "Система ранних гипотез: она ищет признаки, что товарная возможность еще только формируется, до появления готового предложения.",
    positioning:
      "Модуль работает с ранними признаками, которые обычно появляются до готовой партии. Он сравнивает слабые внешние сигналы с прошлой историей Grafit и формирует гипотезу возможности: где может появиться партия, почему, когда и что проверить.",
    presentation: {
      valueTitle: "Возможность видна до массового рынка",
      valueText: "Максимальная маржа часто появляется не в момент готового предложения, а раньше: когда модель меняется, дистрибьютор сжимает цену, склад растет, а рынок еще не понял, что скоро появится избыточная партия.",
      flowTitle: "От слабого признака к гипотезе закупки",
      flowText: "Логика начинается не с готовой партии, а с предвестника: смены модели, давления на цену, роста складов или слабого сигнала от дистрибьютора.",
      proofTitle: "Выигрыш во времени до рынка",
      proofText: "Смысл пилота - измерить выигрыш во времени: сколько дней команда получает до того, как возможность становится очевидным предложением для всех.",
      pilotSlideTitle: "Пилот: найти сигнал раньше рынка",
      pilotSlideText: "В пилоте поднимаются прошлые успешные закупки избыточного товара и проверяется, какие внешние признаки появлялись за 30-60 дней до них.",
      internalSourceTitle: "Прошлые случаи для обучения паттернов",
      externalSourceTitle: "Слабые сигналы будущих партий",
      metricTitle: "Как измеряем выигрыш во времени"
    },
    outputs: ["Гипотезы возможностей", "Ранние предупреждающие сигналы", "Отчеты о совпадении паттернов", "Кандидаты для раннего контакта"],
    layers: [
      {
        title: "История избыточных партий",
        text: "Собрать прошлые удачные закупки и восстановить, какие события появились до них: момент входа, скорость продажи, итоговая маржа и внешний контекст.",
        icon: "data",
        items: ["Момент закупки", "Скорость продажи", "Итоговая маржа"]
      },
      {
        title: "Ранние рыночные сигналы",
        text: "Следить не за готовыми предложениями, а за предвестниками: сменой модели, реструктуризацией дистрибьютора, ростом складов и сжатием цены.",
        icon: "monitor",
        items: ["Смена модели", "Сжатие цены", "Переизбыток"]
      },
      {
        title: "Сопоставление паттернов",
        text: "Сравнивать текущую ситуацию с прошлыми кейсами избыточных закупок Grafit и показывать, почему это может быть повторяемым паттерном, а не случайным шумом.",
        icon: "ai",
        items: ["Поиск сходства", "Метка риска", "Проверка спроса"]
      },
      {
        title: "Ранний контакт",
        text: "Давать команде закупки ранний маршрут: кого мониторить, у кого проверить наличие, где оценить спрос и когда выйти к поставщику.",
        icon: "lead",
        items: ["Мониторинг поставщика", "Проверка спроса", "Первый контакт"]
      }
    ],
    sections: [
      {
        title: "Ранние признаки будущей возможности",
        text:
          "Большинство компаний реагирует на избыточный товар уже после того, как он стал очевиден: появилась партия, началась ликвидация, поставщик снизил цену. Механизм прогнозирования возможностей смотрит раньше - в момент, когда формируется причина будущей товарной возможности."
      },
      {
        title: "Момент входа как источник маржи",
        items: [
          "В торговле момент входа - это деньги: если Grafit узнает о возможности вместе со всеми, конкуренция быстро переходит в цену и скорость реакции.",
          "Ранний сигнал дает команде время на проверку спроса, расчет логистики, контакт с поставщиком и планирование капитала.",
          "Модуль не заменяет решение о закупке. Он дает гипотезу, которую можно проверить раньше рынка."
        ]
      },
      {
        title: "Что выдает будущую возможность",
        groups: [
          {
            title: "Жизненный цикл товара",
            items: ["новая модель заменяет старую", "производитель снимает линию с производства", "меняется совместимость", "падает спрос на старую товарную позицию"]
          },
          {
            title: "Дистрибьюторы и розница",
            items: ["закрытие филиалов", "реструктуризация", "кампании распродажи", "рост складских запасов", "сигналы финансового давления"]
          },
          {
            title: "Рынок и цепочка поставок",
            items: ["сжатие цены", "региональный переизбыток", "падение скорости продаж", "сезонный дисбаланс", "удлинение сроков поставки"]
          }
        ]
      }
    ],
    sources: {
      internal: ["исторические случаи избыточных закупок", "время закупки", "скорость продаж", "итоговая маржа", "история поведения поставщиков", "отклоненные предложения", "старение запасов", "спрос по регионам"],
      external: ["объявления производителей", "сайты дистрибьюторов", "страницы распродаж у ритейлеров", "B2B-списки складских остатков", "аукционные площадки", "сигналы финансовых реестров", "цены на маркетплейсах", "отраслевые новости"]
    },
    pilot: {
      title: "Пилот прогнозного поиска возможностей",
      steps: [
        "Выбрать одну категорию.",
        "Собрать исторические примеры успешных закупок избыточного товара.",
        "Найти внешние сигналы, которые появлялись до этих возможностей.",
        "Настроить мониторинг похожих будущих сигналов.",
        "Формировать еженедельные гипотезы возможностей.",
        "Проверять гипотезы с закупочной командой."
      ],
      goal: "Понять, можно ли обнаруживать будущие ситуации с избыточным товаром раньше, чем они превращаются в очевидные рыночные предложения.",
      metrics: ["сформированные гипотезы", "подтвержденные гипотезы", "выигранные дни до рынка", "доля контактов с поставщиками", "коммерческий результат"]
    },
    guardrails: [
      "Система выдает гипотезу возможности, а не готовое закупочное решение.",
      "Каждая гипотеза показывает паттерн, доказательства, риск и связь с прошлой историей Grafit.",
      "Результат проверки возвращается в базу паттернов, чтобы гипотезы становились точнее."
    ],
    executive:
      "Grafit уже силен в работе с появившимися товарными возможностями. Механизм прогнозирования возможностей добавляет следующий уровень: искать ранние рыночные признаки будущего избыточного товара, чтобы команда могла действовать до того, как возможность станет видимой для всех.",
    effects: ["более ранний поиск поставщиков", "лучшая позиция в переговорах", "меньше конкурентного давления", "выше потенциальная маржа", "быстрее контакт с поставщиком", "лучше планирование капитала", "сильнее рыночное предвидение"]
  },
  {
    slug: "institutional-memory-layer",
    title: "Слой институциональной памяти",
    icon: "space",
    summary:
      "Слой коллективной памяти: прошлые поставщики, сделки, товарные позиции, рынки, ошибки и удачные решения становятся доступными в момент новой оценки.",
    positioning:
      "На практике это ответ перед новой сделкой: покупали ли похожее, где была маржа, какие поставщики подводили и какие товарные позиции становились мертвыми остатками.",
    presentation: {
      valueTitle: "Опыт сделок работает на новые решения",
      valueText: "Вместо поиска по перепискам и старым таблицам команда получает карточки памяти: поставщик, сделка, товарная позиция, рынок, причина решения и фактический результат.",
      flowTitle: "От прошлой сделки к подсказке менеджеру",
      flowText: "Прошлая сделка превращается в подсказку перед новым решением: что покупали, кто подводил, где была маржа и какие ошибки уже известны.",
      proofTitle: "Меньше повторных ошибок",
      proofText: "Польза слоя памяти проявляется, когда новая оценка быстрее находит релевантный прошлый случай и не повторяет старую ошибку.",
      pilotSlideTitle: "Пилот: найти прошлый опыт быстрее",
      pilotSlideText: "В пилоте 12-24 месяца сделок превращаются в карточки памяти и проверяются на новых вопросах менеджеров.",
      internalSourceTitle: "Где уже живет память Grafit",
      externalSourceTitle: "Контекст вокруг поставщиков и рынков",
      metricTitle: "Как доказываем пользу памяти"
    },
    outputs: ["Карточки памяти поставщиков", "Карточки памяти сделок", "Память по товарам", "Поиск похожих случаев", "Повторно используемые уроки"],
    layers: [
      {
        title: "Память поставщиков",
        text: "Показывать не профиль поставщика, а его реальную историю: условия, задержки, документы, повторяемость предложений, надежность и скрытые риски.",
        icon: "content",
        items: ["Надежность", "Документы", "Скрытые риски"]
      },
      {
        title: "Память сделок",
        text: "Сохранять логику решения: почему зашли или отказались, какую маржу ожидали, что получилось по факту и что команда поняла после продажи.",
        icon: "space",
        items: ["Причина решения", "Фактическая маржа", "Срок продажи"]
      },
      {
        title: "Память товаров",
        text: "Связывать товарные позиции с аналогами, совместимостью, скоростью продажи, сезонностью, географией спроса и риском мертвых остатков.",
        icon: "lens",
        items: ["Аналоги", "Риск остатков", "География спроса"]
      },
      {
        title: "Ассистент памяти",
        text: "Давать ответ перед действием: где были похожие партии, кто покупал аналоги, почему отказались раньше и какой рынок сработал лучше.",
        icon: "ranking",
        items: ["Похожие случаи", "Риски повторения", "Уроки сделки"]
      }
    ],
    sections: [
      {
        title: "Память сделок как управленческий актив",
        text:
          "В торговле один из самых дорогих активов - накопленная операционная память. Слой институциональной памяти превращает опыт Grafit в живую систему коллективной торговой разведки: поставщики, сделки, товарные позиции, рынки, ошибки и удачные паттерны становятся доступными для новых решений."
      },
      {
        title: "Почему память стоит денег",
        items: [
          "В группе с разными вертикалями потеря знания становится дорогой: менеджер ушел, команда знает, а другое направление повторяет старую ошибку.",
          "История поставщиков, ценовая интуиция, причины отклоненных сделок и реальные результаты должны работать на новые решения, а не лежать в локальной памяти.",
          "Для крупной торговой группы институциональная память - это не база знаний, а способ сохранить и масштабировать лучший опыт."
        ]
      },
      {
        title: "Что сохраняет слой памяти",
        groups: [
          {
            title: "Память о поставщиках",
            items: ["история поставщика", "качество поставок", "реальные условия", "проблемы с документами", "скрытые риски"]
          },
          {
            title: "Память о сделках",
            items: ["почему сделку приняли", "почему отказались", "ожидаемая маржа", "фактическая маржа", "срок продажи", "реакция покупателей"]
          },
          {
            title: "Память о товарах и рынках",
            items: ["аналоги", "совместимость", "риск мертвых остатков", "эластичность цены", "сезонность", "страны с более сильным спросом"]
          }
        ]
      }
    ],
    sources: {
      internal: ["ERP", "PIM", "история цен", "история продаж", "история закупок", "данные склада", "коммуникации в CRM", "заметки из переписки", "комментарии менеджеров", "претензии и возвраты", "карточки поставщиков", "таблицы"],
      external: ["сайты поставщиков", "публичные данные компаний", "рыночные цены", "каталоги дистрибьюторов", "логистические ориентиры", "история маркетплейсов", "реестры компаний", "индикаторы спроса по категориям"]
    },
    pilot: {
      title: "Пилот операционной памяти",
      steps: [
        "Выбрать одну вертикаль.",
        "Взять 12-24 месяца исторических сделок.",
        "Собрать контекст по поставщикам, марже, сроку продажи и отклоненным сделкам.",
        "Создать поисковый слой знаний.",
        "Построить первые карточки памяти по поставщикам, сделкам и товарам.",
        "Проверить на реальных новых сделках."
      ],
      goal: "Показать, может ли система быстрее находить релевантный прошлый опыт и снижать риск повторения ошибок.",
      metrics: ["проиндексированные исторические случаи", "созданные карточки памяти", "успешность поиска", "найденные риски повторения ошибок", "сэкономленное время оценки"]
    },
    guardrails: [
      "Нельзя подавать это как критику текущей системы; в Grafit уже есть операционная разведка.",
      "Цель - сделать опыт доступным всему холдингу, а не заменить экспертов базой знаний.",
      "Карточки памяти строятся вокруг коммерческих решений, рисков и повторяемых уроков."
    ],
    executive:
      "Grafit уже обладает большим объемом операционного опыта. Слой институциональной памяти превращает этот опыт в системный актив: знания о поставщиках, сделках, товарных позициях, рынках и ошибках не остаются разрозненными, а работают на все подразделения холдинга.",
    effects: ["меньше повторных ошибок", "быстрее ввод менеджеров в контекст", "сохранение экспертизы", "лучше контроль рисков поставщиков", "сильнее оценка сделок", "обмен знаниями между компаниями", "меньше зависимости от отдельных людей"]
  },
  {
    slug: "cross-vertical-intelligence",
    title: "Межвертикальная аналитика",
    icon: "flow",
    summary:
      "Групповая аналитика Grafit: система находит, какие паттерны поставщиков, рынков, склада и цены повторяются между вертикалями.",
    positioning:
      "Модуль работает поверх вертикалей и помогает одной компании Grafit использовать опыт другой без потери автономии: где повторяется поставщик, риск, ценовая ситуация, складская проблема или спрос.",
    presentation: {
      valueTitle: "Знание одной вертикали усиливает другую",
      valueText: "Модуль ищет пересечения, которые обычно не видны изнутри одной компании: похожие поставщики, повторяемые риски, ценовые решения, складские сценарии и региональный спрос.",
      flowTitle: "От локального опыта к обучению холдинга",
      flowText: "Опыт одной вертикали становится сигналом для другой: поставщик, риск, цена, склад или спрос перестают жить только внутри одной команды.",
      proofTitle: "Синергия без централизации",
      proofText: "Проверка строится на 2-3 вертикалях: есть ли повторяемые операционные паттерны, которые можно использовать без перестройки процессов.",
      pilotSlideTitle: "Пилот: синергия между вертикалями",
      pilotSlideText: "Пилот сравнивает несколько направлений и показывает, где знание одной команды может снизить риск или открыть возможность для другой.",
      internalSourceTitle: "Данные между вертикалями",
      externalSourceTitle: "Внешний контекст для сравнения",
      metricTitle: "Как проверяем синергию"
    },
    outputs: ["Карта межвертикальных паттернов", "Повторно используемая разведка", "Групповые риски поставщиков", "Сигналы синергии по рынкам"],
    layers: [
      {
        title: "Паттерны поставщиков",
        text: "Показывать, где один поставщик, похожие поставщики или повторяемые проблемы встречаются в разных категориях и компаниях холдинга.",
        icon: "data",
        items: ["Надежность", "Риск доставки", "Скрытые связи"]
      },
      {
        title: "Региональные паттерны",
        text: "Сравнивать страны и каналы: где разные категории дают похожий спрос, маржу, логистику, возвраты или скорость оборота.",
        icon: "lens",
        items: ["Рост спроса", "Потенциал маржи", "Риск возвратов"]
      },
      {
        title: "Ценовые паттерны",
        text: "Находить ситуации, где одна вертикаль уже решила похожую ценовую проблему: завышенную цену, сжатие цены, скидочную стратегию или разрыв с рынком.",
        icon: "product",
        items: ["Недооцененный товар", "Ценовой разрыв", "Скидочная стратегия"]
      },
      {
        title: "Движение склада",
        text: "Искать товар, который стареет в одной вертикали, но может быть полезен другой компании, рынку, стратегии комплектов или каналу продаж.",
        icon: "ranking",
        items: ["Стареющий склад", "Кандидаты в комплекты", "Повторное использование"]
      }
    ],
    sections: [
      {
        title: "Холдинг учится между вертикалями",
        text:
          "Межвертикальная аналитика помогает Grafit учиться не только внутри отдельных направлений, но и между ними. Слой ищет общие паттерны между компаниями, категориями, рынками, поставщиками, движением склада и поведением покупателей."
      },
      {
        title: "Обмен знаниями без централизации",
        items: [
          "Разные компании Grafit могут иметь свои рынки, категории, сеть поставщиков, базу покупателей, ценовую логику и логистические паттерны.",
          "Цель не заставить все подразделения работать одинаково; каждая вертикаль сохраняет свою специфику и процессы.",
          "Следующий уровень - чтобы разведка одной вертикали усиливала решения другой, а холдинг учился как единая торговая система."
        ]
      },
      {
        title: "Паттерны между вертикалями",
        groups: [
          {
            title: "Закономерности по поставщикам",
            items: ["надежность", "повторяющиеся проблемы", "качество документов", "риск оплаты или доставки", "связанные поставщики"]
          },
          {
            title: "Региональные закономерности",
            items: ["где выше спрос", "где лучше маржа", "где дешевле логистика", "где выше риск возвратов"]
          },
          {
            title: "Закономерности склада и цен",
            items: ["недооцененный товар", "завышенная цена блокирует продажи", "скидочная стратегия работает лучше", "товар полезен другому рынку или направлению"]
          }
        ]
      }
    ],
    sources: {
      internal: ["продажи по компаниям", "закупки", "данные склада", "история цен", "данные поставщиков", "данные покупателей", "отчеты по марже", "данные логистики", "возвраты и претензии", "отклоненные сделки", "результаты категорий"],
      external: ["рыночные цены", "сигналы спроса", "региональные данные маркетплейсов", "публичная активность поставщиков", "цены конкурентов", "B2B-каталоги", "логистические ориентиры"]
    },
    pilot: {
      title: "Пилот межвертикальной аналитики",
      steps: [
        "Выбрать 2-3 вертикали, а не весь холдинг.",
        "Взять 12 месяцев данных по сделкам, поставщикам, категориям, регионам, марже и возрасту складских остатков.",
        "Нормализовать данные достаточно для сравнения.",
        "Найти повторяемые операционные закономерности.",
        "Показать руководству, где одно направление бизнеса может использовать знания другого."
      ],
      goal: "Доказать, что между вертикалями есть скрытые операционные закономерности, которые можно монетизировать.",
      metrics: ["сравненные вертикали", "найденные закономерности", "кандидаты на повторное использование", "пересечения рисков", "подтвержденная ценность синергии"]
    },
    guardrails: [
      "Единая CRM здесь не требуется: автономия команд сохраняется, а общими становятся только полезные паттерны.",
      "Слой работает поверх существующих процессов, ERP и локальной специфики вертикалей.",
      "Продукт - не панель сама по себе, а разведка для решений руководства и команд."
    ],
    executive:
      "У Grafit уже есть сильные специализированные компании. Следующий уровень - сделать так, чтобы разведка каждой вертикали усиливала весь холдинг: поставщики, рынки, цены, логистика, склад и спрос начинают работать как единая система знаний.",
    effects: ["меньше дублирования поиска", "быстрее распространяются успешные практики", "лучше видимость для руководства", "сильнее групповые решения", "больше синергии между компаниями", "лучше распределение капитала", "меньше мертвых остатков", "сильнее рыночная позиция"]
  }
];

const roModules: PrivateModule[] = [
  {
    slug: "ai-trade-radar",
    title: "AI Trade Radar",
    icon: "monitor",
    summary:
      "Strat de vizibilitate operationala care transforma miscarea pietei, preturilor, furnizorilor, stocului si riscurilor in alerte de trading prioritizate.",
    positioning:
      "AI Trade Radar ofera echipei vizibilitate timpurie asupra schimbarilor relevante: ce s-a miscat, de ce conteaza comercial si care semnale merita verificate primele.",
    outputs: ["Alerte trading prioritizate", "Explicatii pentru semnale", "Coada de riscuri si oportunitati", "Review radar saptamanal"],
    layers: [
      {
        title: "Captare semnale",
        text: "Colecteaza miscari de pret, stock, furnizori, inventory si piata din surse interne si externe.",
        icon: "data",
        items: ["Schimbari de pret", "Activitate furnizori", "Imbatranire stock"]
      },
      {
        title: "Logica relevantei",
        text: "Clasifica ce s-a schimbat, de ce conteaza si ce echipa trebuie sa verifice.",
        icon: "ranking",
        items: ["Risk tags", "Opportunity tags", "Priority score"]
      },
      {
        title: "Flux de alertare",
        text: "Transforma semnalul intr-o alerta clara pentru review comercial: sursa, motiv, prioritate si pas urmator.",
        icon: "flow",
        items: ["Weekly queue", "Team review", "Action notes"]
      },
      {
        title: "Rezultat decizional",
        text: "Sustine decizii mai rapide de sourcing, pricing, sales si transfer fara a automatiza decizia.",
        icon: "tools",
        items: ["Review candidates", "Action options", "Outcome tracking"]
      }
    ],
    sections: [
      {
        title: "Ce este",
        text:
          "AI Trade Radar este primul strat de vizibilitate pentru Grafit. Monitorizeaza mediul de trading si transforma zgomotul informational intr-un set mic de alerte actionabile: ce s-a schimbat, de ce conteaza, unde este riscul, unde poate exista o oportunitate si ce actiune poate fi analizata."
      },
      {
        title: "De ce Grafit",
        items: [
          "Grafit opereaza cu mai multe categorii, piete, furnizori, depozite si canale de vanzare.",
          "Cu cat suprafata de trading creste, cu atat semnalele importante se pot pierde mai usor intre echipe.",
          "Radarul face miscarea pietei vizibila inainte sa devina oportunitate ratata, problema de stoc vechi sau eroare de pricing."
        ]
      },
      {
        title: "Ce urmareste radarul",
        groups: [
          {
            title: "Pricing radar",
            items: ["abnormal price drop", "price compression", "undervalued stock", "competitor discounting", "region-specific price gaps"]
          },
          {
            title: "Supplier radar",
            items: ["activitate noua de furnizor", "aparitie stock lots", "oferte repetate", "schimbari de reliability", "furnizori potentiali noi"]
          },
          {
            title: "Inventory radar",
            items: ["aging stock", "slow-moving inventory", "liquidation candidates", "bundle opportunities", "stock potrivit pentru alta piata"]
          },
          {
            title: "Risk radar",
            items: ["schimbari de cost logistic", "supplier risk", "slabire cerere", "margin compression", "documentation issues"]
          }
        ]
      }
    ],
    sources: {
      internal: ["current stock", "pricing database", "sales velocity", "purchase history", "supplier records", "buyer demand", "margin history", "warehouse data", "rejected deals"],
      external: ["B2B platforms", "marketplaces", "distributor websites", "liquidation platforms", "auction sites", "price monitoring", "product catalogues", "industry news"]
    },
    pilot: {
      title: "Pilot radar restrans",
      steps: [
        "Alege o verticala si conecteaza current stock, pricing si sales velocity.",
        "Adauga 5-10 surse externe de pret, piata sau furnizori.",
        "Defineste alert logic pentru pricing, supplier, inventory si risk movement.",
        "Emite saptamanal o coada prioritizata de semnale.",
        "Verifica utilitatea cu echipele de sourcing, pricing si sales."
      ],
      goal: "Intelege ce tipuri de alerte ajuta echipa sa ia decizii mai rapid si mai exact.",
      metrics: ["alerte utile pe saptamana", "rata false-positive", "timp economisit la review", "follow-through decizional", "valoare comerciala confirmata"]
    },
    guardrails: [
      "Fiecare alerta arata sursa, motivul si prioritatea.",
      "Echipa vede review state, action note si outcome feedback.",
      "Sistemul ajuta la selectarea mai rapida a semnalelor cu sens comercial."
    ],
    executive:
      "Grafit are deja sisteme operationale puternice. AI Trade Radar adauga deasupra lor un strat de real-time awareness, ajutand echipele sa observe mai devreme si mai sigur pricing anomalies, supplier signals, stock risks si market opportunities.",
    effects: ["awareness mai rapid", "mai putine oportunitati ratate", "utilizare mai buna a stocului", "reactie mai rapida la pricing", "monitorizare mai puternica a furnizorilor", "mai putin dead inventory", "prioritati de trading mai clare"]
  },
  {
    slug: "global-surplus-intelligence-network",
    title: "Global Surplus Intelligence Network",
    icon: "data",
    summary:
      "Retea externa de market intelligence care cauta continuu semnale de surplus, overstock, liquidation si miscare de categorie pe mai multe piete.",
    positioning:
      "Acest modul extinde vizibilitatea de piata Grafit si conecteaza asimetria externa cu istoricul dealurilor, contextul furnizorilor si prioritatile comerciale.",
    outputs: ["Surplus signal feed", "Ranked opportunities", "Source coverage map", "External-to-internal signal match"],
    layers: [
      {
        title: "External watchlist",
        text: "Monitorizeaza canale unde semnalele de surplus si overstock apar de obicei inainte sa devina evidente.",
        icon: "lens",
        items: ["Liquidation platforms", "B2B catalogues", "Distributor movement"]
      },
      {
        title: "Signal enrichment",
        text: "Adauga context de categorie, regiune, furnizor, pret, timing si reliability la semnale brute.",
        icon: "api",
        items: ["Category match", "Region match", "Supplier context"]
      },
      {
        title: "Trading relevance",
        text: "Prioritizeaza semnale dupa potrivirea cu istoricul Grafit, cererea, marja si realitatea logistica.",
        icon: "ranking",
        items: ["Demand fit", "Margin potential", "Logistics risk"]
      },
      {
        title: "Opportunity candidate",
        text: "Muta doar cele mai puternice semnale in sourcing review ca opportunity candidates.",
        icon: "flow",
        items: ["Review queue", "Evidence pack", "Team decision"]
      }
    ],
    sections: [
      {
        title: "Ce este",
        text:
          "Global Surplus Intelligence Network este un strat extern de market intelligence care cauta constant semnale de oportunitati surplus pe tari, categorii, producatori, distribuitori si canale B2B."
      },
      {
        title: "De ce Grafit",
        items: [
          "Grafit are deja sourcing, pricing, sales, logistica, buyer network si experienta de trading.",
          "Urmatorul avantaj nu este inlocuirea acestei masini, ci cresterea calitatii semnalelor de piata care intra in ea.",
          "Datele externe fara istorie interna produc zgomot; istoria interna fara monitoring extern produce vizibilitate limitata."
        ]
      },
      {
        title: "Categorii de semnale",
        items: ["warehouse liquidation", "distributor exit", "overstock accumulation", "bankruptcy or restructuring signal", "abnormal price drop", "product line discontinuation", "large stock lot appearance", "regional shortage or oversupply", "manufacturer model transition", "B2B auction activity"]
      }
    ],
    sources: {
      internal: ["purchase history", "sales history", "rejected deals", "supplier history", "buyer behavior", "pricing history", "stock aging", "warehouse movement", "margin by category"],
      external: ["B2B marketplaces", "liquidation platforms", "auction platforms", "manufacturer websites", "distributor websites", "public catalogues", "reseller price lists", "public procurement notices", "open web monitoring"]
    },
    pilot: {
      title: "Pilot de semnale surplus",
      steps: [
        "Alege o verticala, de exemplu printer supplies sau auto parts.",
        "Selecteaza 5-10 surse externe cu densitate reala de semnale.",
        "Conecteaza un set limitat de date istorice interne.",
        "Colecteaza si clasifica surplus signals dupa trading relevance.",
        "Arata echipei ranked opportunities, nu raw data.",
        "Compara rezultatul cu ce ar fi gasit echipa manual."
      ],
      goal: "Dovedeste daca un strat extern de intelligence poate gasi semnale surplus utile mai devreme, mai larg sau mai ieftin decat procesul manual actual.",
      metrics: ["semnale gasite", "semnale acceptate pentru review", "comparatie cu cautarea manuala", "lead time advantage", "oportunitati comerciale confirmate"]
    },
    guardrails: [
      "Semnalele sunt ordonate inainte sa intre in review.",
      "Fiecare opportunity candidate pastreaza source traceability.",
      "Echipa primeste oportunitati explicate comercial, nu raw data."
    ],
    executive:
      "Grafit are deja infrastructura puternica de trading. Propunerea este sa adauge un strat permanent de market intelligence deasupra ei, astfel incat asimetria externa de piata sa fie detectata, imbogatita, comparata cu istoricul intern si transformata mai rapid in opportunity candidates.",
    effects: ["sourcing mai rapid", "vizibilitate mai larga pe piata", "mai putine oportunitati ratate", "pozitie de negociere mai puternica", "capital allocation mai buna", "mai multa cross-market intelligence"]
  },
  {
    slug: "predictive-opportunity-engine",
    title: "Predictive Opportunity Engine",
    icon: "ai",
    summary:
      "Strat de predictive sourcing care cauta patterns timpurii de piata ce apar adesea inainte ca oportunitatile surplus sa fie vizibile tuturor.",
    positioning:
      "Acest modul muta sistemul de la reactive sourcing la predictive sourcing. Nu pretinde ca prezice viitorul magic. Gaseste patterns repetabile care in trecut au dus la surplus events profitabile.",
    outputs: ["Opportunity hypotheses", "Early warning signals", "Pattern match reports", "Supplier outreach candidates"],
    layers: [
      {
        title: "Historical pattern base",
        text: "Colecteaza achizitii surplus reusite si semnalele aparute inaintea lor.",
        icon: "data",
        items: ["Past surplus events", "Timing data", "Margin outcome"]
      },
      {
        title: "Early signal watch",
        text: "Monitorizeaza product, distributor, market si supply chain movement pentru patterns similare.",
        icon: "monitor",
        items: ["Lifecycle change", "Price compression", "Supply pressure"]
      },
      {
        title: "Hypothesis engine",
        text: "Transforma patterns timpurii in opportunity hypotheses cu evidence si confidence markers.",
        icon: "ai",
        items: ["Pattern match", "Risk tag", "Demand match"]
      },
      {
        title: "Sourcing review",
        text: "Trimite hypotheses echipei de sourcing pentru validation si early outreach.",
        icon: "lead",
        items: ["Supplier check", "Demand check", "Action decision"]
      }
    ],
    sections: [
      {
        title: "Ce este",
        text:
          "Predictive Opportunity Engine cauta nu doar oferte surplus existente, ci si semne timpurii ca surplus poate aparea. Scopul este timing advantage: sa vezi oportunitatea inainte ca piata sa o fi evaluat complet."
      },
      {
        title: "De ce Grafit",
        items: [
          "In surplus trading, timing inseamna bani.",
          "Daca Grafit vede oportunitatea in acelasi timp cu toti ceilalti, competitia se muta pe pret si viteza de reactie.",
          "Daca Grafit vede pattern-ul mai devreme, echipa are mai mult timp pentru verificare, supplier outreach, evaluare cerere si capital planning."
        ]
      },
      {
        title: "Grupuri de predictive signals",
        groups: [
          {
            title: "Product lifecycle",
            items: ["model nou inlocuieste model vechi", "manufacturer discontinues line", "changing compatibility", "cerere in scadere pentru SKU vechi"]
          },
          {
            title: "Distributor and retailer",
            items: ["inchidere filiale", "restructuring", "clearance campaigns", "crestere inventory", "financial pressure signals"]
          },
          {
            title: "Market and supply chain",
            items: ["price compression", "regional oversupply", "falling sell-through", "seasonal imbalance", "longer lead time"]
          }
        ]
      }
    ],
    sources: {
      internal: ["historical surplus events", "purchase timing", "sell-through speed", "margin outcomes", "supplier behavior history", "rejected offers", "inventory aging", "demand by region"],
      external: ["manufacturer announcements", "distributor websites", "retailer clearance pages", "B2B stock lists", "auction platforms", "financial registry signals", "marketplace pricing", "industry news"]
    },
    pilot: {
      title: "Pilot predictive sourcing",
      steps: [
        "Alege o categorie.",
        "Colecteaza exemple istorice de achizitii surplus reusite.",
        "Gaseste semnalele externe aparute inaintea acelor oportunitati.",
        "Configureaza monitoring pentru semnale similare viitoare.",
        "Genereaza weekly opportunity hypotheses.",
        "Valideaza cu echipa de sourcing."
      ],
      goal: "Intelege daca situatiile viitoare de surplus pot fi detectate inainte sa devina oferte evidente pe piata.",
      metrics: ["hypotheses generated", "hypotheses validated", "days of lead time", "supplier engagement rate", "commercial outcome"]
    },
    guardrails: [
      "Fiecare hypothesis este separata de decizia comerciala confirmata.",
      "Fiecare score este explicat prin evidence si source traceability.",
      "Review outcome revine in sistem si imbunatateste recomandarile urmatoare."
    ],
    executive:
      "Grafit este deja puternic in lucrul cu oportunitati surplus vizibile. Predictive Opportunity Engine adauga nivelul urmator: cauta semne timpurii de piata pentru surplus viitor, astfel incat echipa sa poata actiona inainte ca oportunitatea sa fie vizibila tuturor.",
    effects: ["sourcing mai timpuriu", "pozitie de negociere mai buna", "presiune competitiva mai mica", "marja potentiala mai mare", "supplier engagement mai rapid", "capital planning mai bun", "market anticipation mai puternic"]
  },
  {
    slug: "institutional-memory-layer",
    title: "Institutional Memory Layer",
    icon: "space",
    summary:
      "Strat comun de operational memory care transforma istoricul furnizorilor, dealurilor, SKU-urilor, pietelor si greselilor intr-un management asset reutilizabil.",
    positioning:
      "Acest modul protejeaza experienta acumulata a Grafit de fragmentare. Nu este o baza pasiva de cunostinte, ci un operational memory assistant pentru decizii viitoare de trading.",
    outputs: ["Supplier memory cards", "Deal memory cards", "Product and SKU memory", "Past-experience search", "Reusable lessons"],
    layers: [
      {
        title: "Memory capture",
        text: "Colecteaza decizii istorice, outcomes, supplier notes, margins, delays si rejected deals.",
        icon: "content",
        items: ["Deals", "Suppliers", "SKU history"]
      },
      {
        title: "Structured cards",
        text: "Transforma raw history in supplier, deal, product si market memory cards.",
        icon: "space",
        items: ["Supplier card", "Deal card", "Product card"]
      },
      {
        title: "Similarity search",
        text: "Gaseste cazuri anterioare similare cu un supplier, SKU, category sau deal nou.",
        icon: "lens",
        items: ["Similar deals", "Known risks", "Reusable buyers"]
      },
      {
        title: "Decision support",
        text: "Face experienta trecuta utilizabila inainte ca echipa sa repete o greseala veche sau sa rateze un pattern cunoscut.",
        icon: "ranking",
        items: ["Risk context", "Margin history", "Decision notes"]
      }
    ],
    sections: [
      {
        title: "Ce este",
        text:
          "Institutional Memory Layer transforma experienta acumulata a Grafit intr-un sistem viu de collective trading intelligence. Scopul este sa faca operational knowledge din trecut utilizabil pentru decizii viitoare."
      },
      {
        title: "De ce Grafit",
        items: [
          "Grafit are ani de decizii despre suppliers, deals, SKU, margins, logistics, buyer behavior si mistakes.",
          "Intr-un trading group mare, pierderea de knowledge devine scumpa daca ramane doar in oameni, mesaje, tabele vechi sau obiceiuri locale de echipa.",
          "Institutional memory face cea mai buna experienta a organizatiei disponibila pentru tot sistemul."
        ]
      },
      {
        title: "Ce poate stoca memory layer",
        groups: [
          {
            title: "Supplier memory",
            items: ["supplier history", "delivery quality", "real conditions", "documentation problems", "hidden risks"]
          },
          {
            title: "Deal memory",
            items: ["de ce a fost acceptat dealul", "de ce a fost respins", "expected margin", "real margin", "sales duration", "buyer response"]
          },
          {
            title: "Product and market memory",
            items: ["analoguri", "compatibility", "dead stock risk", "price elasticity", "seasonality", "tari cu cerere mai puternica"]
          }
        ]
      }
    ],
    sources: {
      internal: ["ERP", "PIM", "pricing history", "sales history", "purchase history", "warehouse data", "CRM communication", "email notes", "manager comments", "claims and returns", "supplier records", "spreadsheets"],
      external: ["supplier websites", "public company data", "market prices", "distributor catalogues", "logistics benchmarks", "marketplace history", "company registries", "category demand indicators"]
    },
    pilot: {
      title: "Pilot operational memory",
      steps: [
        "Alege o verticala.",
        "Colecteaza 12-24 luni de dealuri istorice.",
        "Aduna context de supplier, margin, sales duration si rejected deals.",
        "Creeaza un searchable intelligence layer.",
        "Construieste primele supplier, deal si product memory cards.",
        "Testeaza pe dealuri noi reale."
      ],
      goal: "Arata daca sistemul gaseste experienta trecuta relevanta mai rapid si reduce riscul de repetare a greselilor.",
      metrics: ["historic cases indexed", "memory cards created", "search success rate", "repeat-risk findings", "time saved in evaluation"]
    },
    guardrails: [
      "Memory cards sunt construite in jurul use case-urilor comerciale reale.",
      "Informatia comerciala sensibila urmeaza reguli de acces.",
      "Expert experience devine mai usor de gasit, comparat si reutilizat."
    ],
    executive:
      "Grafit are deja un volum mare de operational experience. Institutional Memory Layer transforma aceasta experienta intr-un activ de sistem, astfel incat cunostintele despre furnizori, dealuri, SKU, piete si greseli sa nu ramana fragmentate, ci sa sustina toate echipele relevante.",
    effects: ["mai putine greseli repetate", "onboarding mai rapid", "pastrarea expertizei", "supplier risk control mai bun", "deal evaluation mai rapid", "cross-company knowledge reuse", "mai putina dependenta de memoria individuala"]
  },
  {
    slug: "cross-vertical-intelligence",
    title: "Cross-Vertical Intelligence",
    icon: "flow",
    summary:
      "Strat de group-level intelligence care gaseste patterns reutilizabile de supplier, pricing, market, logistics, inventory si demand intre verticalele Grafit.",
    positioning:
      "Acest modul conecteaza holdingul fara sa forteze toate echipele sa lucreze identic. Nu centralizeaza operatiunile. Imbunatateste intelligence flow intre companii si verticale.",
    outputs: ["Cross-vertical pattern map", "Reusable market lessons", "Group-level risk view", "Shared opportunity signals"],
    layers: [
      {
        title: "Vertical inputs",
        text: "Colecteaza semnale normalizate din companii, categorii, piete, furnizori si deal history selectate.",
        icon: "data",
        items: ["Sales", "Purchases", "Stock", "Margins"]
      },
      {
        title: "Pattern matching",
        text: "Gaseste supplier, region, pricing, inventory si logistics patterns repetate intre verticale.",
        icon: "lens",
        items: ["Supplier pattern", "Regional pattern", "Pricing pattern"]
      },
      {
        title: "Group intelligence",
        text: "Arata unde un business unit poate reutiliza knowledge sau market signal de la altul.",
        icon: "product",
        items: ["Reusable buyers", "Shared risk", "Related category"]
      },
      {
        title: "Management view",
        text: "Sustine executive visibility fara sa scoata autonomia echipelor operationale.",
        icon: "ranking",
        items: ["Top risks", "Margin potential", "Capital allocation"]
      }
    ],
    sections: [
      {
        title: "Ce este",
        text:
          "Cross-Vertical Intelligence ajuta Grafit sa invete nu doar in interiorul verticalelor separate, ci si intre ele. Identifica patterns comune intre companii, categorii, piete, furnizori, inventory movement si buyer behavior."
      },
      {
        title: "De ce Grafit",
        items: [
          "Grafit functioneaza ca multi-company si multi-vertical trading holding.",
          "Fiecare verticala poate fi puternica in nisa ei, dar hidden patterns pot ramane blocate in echipe separate.",
          "Nivelul strategic urmator este ca intelligence-ul unei verticale sa imbunatateasca deciziile alteia."
        ]
      },
      {
        title: "Patterns de identificat",
        groups: [
          {
            title: "Supplier patterns",
            items: ["reliability", "repeated problems", "documentation quality", "payment or delivery risk", "related suppliers"]
          },
          {
            title: "Regional patterns",
            items: ["unde cererea este mai puternica", "unde marja este mai buna", "unde logistica este mai ieftina", "unde riscul de returns este mai mare"]
          },
          {
            title: "Inventory and pricing patterns",
            items: ["undervalued stock", "overpricing blocks sales", "discount strategy works better", "stock util pentru alta piata sau divizie"]
          }
        ]
      }
    ],
    sources: {
      internal: ["sales across companies", "purchases", "warehouse data", "pricing history", "supplier data", "buyer data", "margin reports", "logistics data", "returns and claims", "rejected deals", "category performance"],
      external: ["market prices", "demand signals", "regional marketplace data", "supplier public activity", "competitor prices", "B2B catalogues", "logistics benchmarks"]
    },
    pilot: {
      title: "Pilot cross-vertical",
      steps: [
        "Alege 2-3 verticale, nu tot holdingul.",
        "Colecteaza 12 luni de deal, supplier, category, region, margin si stock age data.",
        "Normalizeaza datele suficient pentru comparatie.",
        "Gaseste repeated operational patterns.",
        "Arata managementului unde un business unit poate reutiliza intelligence-ul altuia."
      ],
      goal: "Dovedeste ca exista hidden operational patterns intre verticale si pot fi monetizate.",
      metrics: ["verticale comparate", "patterns gasite", "reuse candidates", "risk overlaps", "confirmed synergy value"]
    },
    guardrails: [
      "Fiecare verticala isi pastreaza specificul operational.",
      "Stratul comun arata reusable patterns fara forced process unification.",
      "Valoarea apare prin decision intelligence, nu prin dashboard in sine."
    ],
    executive:
      "Grafit are deja companii specializate puternice. Nivelul urmator este ca intelligence-ul fiecarei verticale sa intareasca tot holdingul. Cross-Vertical Intelligence creeaza un strat comun de vizibilitate pentru suppliers, markets, pricing, logistics, inventory si demand patterns.",
    effects: ["mai putin duplicate supplier research", "raspandire mai rapida a practicilor reusite", "executive visibility mai buna", "decizii de grup mai puternice", "mai multa synergy intre companii", "capital allocation mai buna", "mai putin dead stock", "market leverage mai mare"]
  }
];

const basePrivateProjects: Record<Locale, PrivateProject[]> = {
  en: [
    {
      slug: "grafit",
      title: "Grafit Intelligence Layer",
      eyebrow: "Strategic concept",
      client: "Grafit Holding",
      summary:
        "A decision-intelligence system that connects market signals, supplier movement, stock data, deal history, and cross-vertical knowledge into one practical layer for trading decisions.",
      description:
        "Grafit Intelligence Layer helps teams detect opportunities earlier, review signals faster, and preserve decision context across suppliers, deals, categories, and operating verticals.",
      icon: "product",
      status: "Ready for focused pilot planning",
      outputs: ["Early signal radar", "Surplus opportunity map", "Opportunity scoring", "Decision memory", "Cross-vertical insights"],
      modules: enModules,
      thesis: {
        title: "One system for earlier, sharper trading decisions.",
        text:
          "Grafit Intelligence Layer connects five operating functions into one decision flow: early market radar, surplus opportunity discovery, commercial potential scoring, decision memory, and cross-vertical learning.",
        items: [
          "Market movement becomes clear opportunity cards instead of scattered noise.",
          "Deal history and supplier context become reusable intelligence for the next decision.",
          "Teams get fewer signals, better-ranked signals, and a faster path from signal to action."
        ]
      },
      implementation: {
        title: "Pilot: from market signal to reviewed opportunity",
        text:
          "The first launch can focus on one trading vertical with available stock, pricing, purchase, sales, and supplier history. The goal is to prove that better signals create faster, more confident commercial review.",
        steps: [
          "Select one vertical where historic stock, pricing, sales, and supplier data are available.",
          "Connect a focused set of external market and surplus sources.",
          "Generate a weekly queue of ranked signals with source context.",
          "Review signals with the commercial team and mark outcomes.",
          "Capture accepted, rejected, and missed opportunities into decision memory.",
          "Use the confirmed patterns to decide the next vertical or module expansion."
        ]
      },
      guardrail: {
        title: "Designed to support commercial judgment",
        text:
          "The system keeps people in control while making the relevant context visible at the moment of review. It strengthens existing sourcing, pricing, sales, ERP, CRM, and logistics workflows rather than replacing them.",
        items: [
          "Every signal keeps source context and a clear reason for its score.",
          "Every opportunity moves through a human review state.",
          "Success is measured by useful commercial signals, faster review, and better follow-through."
        ]
      }
    }
  ],
  ro: [
    {
      slug: "grafit",
      title: "Grafit Intelligence Layer",
      eyebrow: "Concept strategic",
      client: "Grafit Holding",
      summary:
        "Sistem de decision intelligence care conecteaza semnale de piata, miscarea furnizorilor, date de stock, istoricul dealurilor si knowledge cross-vertical intr-un singur strat practic pentru decizii de trading.",
      description:
        "Grafit Intelligence Layer ajuta echipele sa vada oportunitati mai devreme, sa verifice semnale mai rapid si sa pastreze contextul deciziilor intre furnizori, dealuri, categorii si verticale.",
      icon: "product",
      status: "Pregatit pentru planificarea unui pilot concentrat",
      outputs: ["Radar de semnale timpurii", "Harta oportunitatilor surplus", "Scor comercial", "Memorie de decizie", "Insight-uri cross-vertical"],
      modules: roModules,
      thesis: {
        title: "Un sistem pentru decizii de trading mai timpurii si mai clare.",
        text:
          "Grafit Intelligence Layer conecteaza cinci functii operationale intr-un singur flux de decizie: radar de piata, descoperire surplus, scor de potential comercial, memorie de decizie si invatare cross-vertical.",
        items: [
          "Miscarea pietei devine opportunity cards clare, nu zgomot dispersat.",
          "Istoricul dealurilor si contextul furnizorilor devin intelligence reutilizabil pentru urmatoarea decizie.",
          "Echipele primesc mai putine semnale, mai bine ordonate si mai usor de transformat in actiune."
        ]
      },
      implementation: {
        title: "Pilot: de la semnal de piata la oportunitate verificata",
        text:
          "Prima lansare poate fi concentrata pe o singura verticala de trading cu date disponibile despre stock, pricing, achizitii, vanzari si furnizori. Scopul este sa dovedeasca faptul ca semnalele mai bune accelereaza review-ul comercial.",
        steps: [
          "Selecteaza o verticala unde exista istoric de stock, preturi, vanzari si furnizori.",
          "Conecteaza un set concentrat de surse externe de piata si surplus.",
          "Genereaza saptamanal o coada de semnale ordonate cu context de sursa.",
          "Revizuieste semnalele cu echipa comerciala si marcheaza rezultatele.",
          "Captureaza oportunitatile acceptate, respinse si ratate in memoria deciziilor.",
          "Foloseste pattern-urile confirmate pentru a decide urmatoarea verticala sau urmatorul modul."
        ]
      },
      guardrail: {
        title: "Construit pentru a sustine judecata comerciala",
        text:
          "Sistemul pastreaza controlul la oameni si face contextul relevant vizibil in momentul review-ului. El intareste procesele existente de sourcing, pricing, sales, ERP, CRM si logistica.",
        items: [
          "Fiecare semnal pastreaza contextul sursei si motivul scorului.",
          "Fiecare oportunitate trece printr-o stare de review uman.",
          "Succesul inseamna semnale comerciale utile, review mai rapid si follow-through mai bun."
        ]
      }
    }
  ],
  ru: [
    {
      slug: "grafit",
      title: "Интеллектуальный слой Grafit",
      eyebrow: "Стратегическая концепция",
      client: "Grafit Holding",
      summary:
        "Дополнительный аналитический слой над торговой машиной Grafit: радар рынка, внешний поиск возможностей, ранние гипотезы, память решений и обучение между вертикалями.",
      description:
        "Система не заменяет закупку, продажи, ERP или опыт менеджеров. Она собирает разрозненные сигналы в один контур, где команда раньше видит возможность и быстрее понимает, стоит ли ее проверять.",
      icon: "product",
      status: "Готово к планированию фокусного пилота",
      outputs: ["Радар ранних сигналов", "Карта товарных возможностей", "Оценка коммерческого потенциала", "Память решений", "Межвертикальные выводы"],
      modules: ruModules,
      thesis: {
        title: "Единый контур торговой разведки Grafit.",
        text:
          "Пять модулей работают как один стек торговой разведки: радар ловит изменения, внешний поиск находит избыточные партии, прогнозный механизм формирует гипотезы, память сохраняет опыт, а межвертикальная аналитика переносит удачные паттерны между компаниями.",
        items: [
          "Команда получает не поток данных, а короткую очередь проверяемых сигналов с причиной и следующим шагом.",
          "Внешние возможности сразу сверяются с историей Grafit: похожие сделки, спрос, маржа, поставщики, склад и логистика.",
          "Опыт одной сделки или вертикали не теряется, а становится рабочей подсказкой для следующих решений."
        ]
      },
      implementation: {
        title: "Пилот: от рыночного сигнала к проверенной возможности",
        text:
          "Первый запуск стоит сфокусировать на одной торговой вертикали с живыми данными по складу, ценам, закупкам, продажам и поставщикам. Цель пилота - проверить путь от раннего сигнала до коммерческого решения: что найдено, почему это важно, кто проверил и чем закончилась проверка.",
        steps: [
          "Выбрать одну вертикаль с доступной историей складских остатков, цен, продаж и данных по поставщикам.",
          "Подключить ограниченный набор внешних рыночных источников и источников по избыточным запасам.",
          "Формировать еженедельную очередь приоритетных сигналов с контекстом источников.",
          "Проверять сигналы с коммерческой командой и фиксировать результат.",
          "Сохранять принятые, отклоненные и пропущенные возможности в память решений.",
          "Использовать подтвержденные закономерности для выбора следующей вертикали или следующего модуля."
        ]
      },
      guardrail: {
        title: "Система усиливает коммерческое решение",
        text:
          "Контроль остается у команды Grafit. Система поднимает контекст в момент проверки и усиливает существующие процессы закупки, ценообразования, продаж, ERP, CRM и логистики, не ломая их.",
        items: [
          "Каждый сигнал сохраняет источник и понятную причину своей оценки.",
          "Каждая возможность проходит через человеческую проверку.",
          "Успех измеряется полезными коммерческими сигналами, скоростью проверки и качеством доведения решений до результата."
        ]
      }
    }
  ]
};

const registeredPrivateProjects = [
  phoenixProjects
] satisfies LocalizedPrivateProject[];

export const privateProjects: Record<Locale, PrivateProject[]> = Object.fromEntries(
  locales.map((locale) => [
    locale,
    [
      ...(basePrivateProjects[locale] ?? []),
      ...registeredPrivateProjects.map((projectSet) => projectSet[locale])
    ]
  ])
) as Record<Locale, PrivateProject[]>;

export const getPrivateProjects = (locale: Locale) => privateProjects[locale] ?? privateProjects.en;

export const getPrivateProject = (locale: Locale, slug: string) =>
  getPrivateProjects(locale).find((project) => project.slug === slug);

export const getPrivateModule = (locale: Locale, projectSlug: string, moduleSlug: string) =>
  getPrivateProject(locale, projectSlug)?.modules.find((module) => module.slug === moduleSlug);

export const privateProjectSlugs = privateProjects.en.map((project) => project.slug);

export const privateModuleSlugs = (projectSlug: string) =>
  privateProjects.en.find((project) => project.slug === projectSlug)?.modules.map((module) => module.slug) ?? [];
