import type { Locale } from "@/data/i18n";

export type PrivateModule = {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  positioning: string;
  outputs: string[];
  layers: {
    title: string;
    text: string;
    icon: string;
    items: string[];
  }[];
  sections: {
    title: string;
    text?: string;
    items?: string[];
    groups?: {
      title: string;
      items: string[];
    }[];
  }[];
  sources: {
    internal: string[];
    external: string[];
  };
  pilot: {
    title: string;
    steps: string[];
    goal: string;
    metrics: string[];
  };
  guardrails: string[];
  executive: string;
  effects: string[];
};

export type PrivateProject = {
  slug: string;
  title: string;
  eyebrow: string;
  client: string;
  summary: string;
  description: string;
  icon: string;
  status: string;
  outputs: string[];
  modules: PrivateModule[];
  thesis: {
    title: string;
    text: string;
    items: string[];
  };
  implementation: {
    title: string;
    text: string;
    steps: string[];
  };
  guardrail: {
    title: string;
    text: string;
    items: string[];
  };
};

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
    presentationFlow: "История системы",
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
      "Радар ранних рыночных изменений, который показывает приоритетные сигналы по ценам, поставщикам, складу и рискам.",
    positioning:
      "Модуль дает команде раннюю видимость важных изменений: что произошло, почему это имеет коммерческий смысл и какие сигналы нужно проверить в первую очередь.",
    outputs: ["Приоритетные торговые сигналы", "Пояснения к каждому сигналу", "Очередь рисков и возможностей", "Еженедельный разбор радара"],
    layers: [
      {
        title: "Сбор сигналов",
        text: "Собирать изменения цен, складских остатков, активности поставщиков и рыночной ситуации из внутренних и внешних источников.",
        icon: "data",
        items: ["Изменения цен", "Активность поставщиков", "Старение запасов"]
      },
      {
        title: "Логика релевантности",
        text: "Классифицировать, что изменилось, почему это важно и какая команда должна это проверить.",
        icon: "ranking",
        items: ["Метка риска", "Метка возможности", "Оценка приоритета"]
      },
      {
        title: "Работа с оповещениями",
        text: "Превращать сигнал в понятное коммерческое оповещение: источник, причина, приоритет и следующий шаг.",
        icon: "flow",
        items: ["Еженедельная очередь", "Проверка командой", "Заметки по действиям"]
      },
      {
        title: "Поддержка решения",
        text: "Ускорять поиск поставщиков, ценообразование, продажи и решения по перемещению товара за счет более ясного контекста.",
        icon: "tools",
        items: ["Кандидаты на проверку", "Варианты действий", "Отслеживание результата"]
      }
    ],
    sections: [
      {
        title: "Что это такое",
        text:
          "ИИ-радар торговых сигналов - первый слой видимости для Grafit. Он отслеживает торговую среду и превращает информационный шум в небольшой набор практичных оповещений: что изменилось, почему это важно, где появился риск, где может быть возможность и какое действие стоит рассмотреть."
      },
      {
        title: "Почему это нужно Grafit",
        items: [
          "Grafit работает сразу с несколькими категориями, рынками, поставщиками, складами и каналами продаж.",
          "Чем шире торговый контур, тем выше риск, что значимые сигналы потеряются между командами.",
          "Радар делает рыночные изменения видимыми до того, как они станут упущенной возможностью, проблемой залежавшихся остатков или ошибкой в цене."
        ]
      },
      {
        title: "Что отслеживает радар",
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
      "Каждое оповещение показывает источник, причину и приоритет.",
      "Команда видит статус проверки, заметку по действию и обратную связь по результату.",
      "Система помогает быстрее отбирать сигналы с коммерческим смыслом."
    ],
    executive:
      "У Grafit уже есть сильные операционные системы. ИИ-радар добавляет над ними слой ранней рыночной видимости, помогая командам раньше и увереннее замечать ценовые аномалии, сигналы поставщиков, складские риски и рыночные возможности.",
    effects: ["раньше видны изменения", "меньше упущенных возможностей", "лучше используется склад", "быстрее реакция на цены", "сильнее контроль поставщиков", "меньше мертвых остатков", "точнее торговые приоритеты"]
  },
  {
    slug: "global-surplus-intelligence-network",
    title: "Сеть поиска избыточных товарных возможностей",
    icon: "data",
    summary:
      "Система внешнего мониторинга, которая ищет сигналы избыточных запасов, распродаж, ликвидаций и движения категорий на разных рынках.",
    positioning:
      "Модуль расширяет рыночную видимость Grafit и связывает внешнюю рыночную асимметрию с историей сделок, контекстом поставщиков и коммерческими приоритетами компании.",
    outputs: ["Лента сигналов по избыточным запасам", "Ранжированные возможности", "Карта покрытия источников", "Сопоставление внешних сигналов с внутренними данными"],
    layers: [
      {
        title: "Внешний список наблюдения",
        text: "Отслеживать каналы, где сигналы избыточных запасов и распродаж обычно появляются раньше, чем становятся очевидными для рынка.",
        icon: "lens",
        items: ["Платформы ликвидации", "B2B-каталоги", "Движение дистрибьюторов"]
      },
      {
        title: "Обогащение сигналов",
        text: "Добавлять к исходным сигналам категорию, регион, поставщика, цену, момент появления и контекст надежности.",
        icon: "api",
        items: ["Совпадение по категории", "Совпадение по региону", "Контекст поставщика"]
      },
      {
        title: "Торговая релевантность",
        text: "Ранжировать сигналы по соответствию истории Grafit, спросу, марже и логистической реальности.",
        icon: "ranking",
        items: ["Соответствие спросу", "Потенциал маржи", "Логистический риск"]
      },
      {
        title: "Кандидат в возможность",
        text: "Передавать на проверку закупочной команде только самые сильные сигналы как кандидаты в коммерческую возможность.",
        icon: "flow",
        items: ["Очередь проверки", "Пакет подтверждений", "Решение команды"]
      }
    ],
    sections: [
      {
        title: "Что это такое",
        text:
          "Сеть поиска избыточных товарных возможностей - внешний слой рыночной аналитики. Он постоянно ищет признаки появления товарных излишков по странам, категориям, производителям, дистрибьюторам и B2B-каналам."
      },
      {
        title: "Почему это нужно Grafit",
        items: [
          "У Grafit уже есть закупочная экспертиза, ценообразование, продажи, логистика, сеть покупателей и торговый опыт.",
          "Следующее преимущество не в замене этой машины, а в росте качества и количества полезных рыночных сигналов, которые в нее попадают.",
          "Внешние данные без внутренней истории дают шум; внутренняя история без внешнего мониторинга дает ограниченную видимость."
        ]
      },
      {
        title: "Категории сигналов",
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
      "Сигналы ранжируются до попадания в проверку.",
      "Каждый кандидат в возможность сохраняет прозрачную связь с источником.",
      "Команда получает не сырые данные, а коммерчески объясненные возможности."
    ],
    executive:
      "У Grafit уже есть сильная торговая инфраструктура. Идея - добавить над ней постоянный слой рыночной аналитики, чтобы внешняя рыночная асимметрия обнаруживалась, обогащалась, сопоставлялась с внутренней историей и быстрее превращалась в кандидатов для коммерческой проверки.",
    effects: ["быстрее поиск поставщиков", "шире рыночная видимость", "меньше упущенных возможностей", "сильнее переговорная позиция", "точнее распределение капитала", "больше межрыночной аналитики"]
  },
  {
    slug: "predictive-opportunity-engine",
    title: "Механизм прогнозирования возможностей",
    icon: "ai",
    summary:
      "Модуль раннего выявления закономерностей, которые могут привести к коммерчески интересным товарным возможностям.",
    positioning:
      "Модуль переводит закупочную работу от реакции на уже видимый рынок к раннему обнаружению признаков будущих прибыльных возможностей.",
    outputs: ["Гипотезы возможностей", "Ранние предупреждающие сигналы", "Отчеты о совпадении закономерностей", "Кандидаты для контакта с поставщиками"],
    layers: [
      {
        title: "База исторических закономерностей",
        text: "Собрать прошлые успешные закупки избыточного товара и сигналы, которые появлялись до них.",
        icon: "data",
        items: ["Прошлые события", "Данные по времени", "Итоговая маржа"]
      },
      {
        title: "Наблюдение за ранними сигналами",
        text: "Отслеживать движение товаров, дистрибьюторов, рынка и цепочек поставок в поиске похожих закономерностей.",
        icon: "monitor",
        items: ["Изменение жизненного цикла", "Сжатие цены", "Давление предложения"]
      },
      {
        title: "Механизм гипотез",
        text: "Превращать ранние закономерности в гипотезы возможностей с доказательствами и признаками уверенности.",
        icon: "ai",
        items: ["Совпадение закономерности", "Метка риска", "Соответствие спросу"]
      },
      {
        title: "Проверка закупочной командой",
        text: "Передавать гипотезы закупочной команде для проверки и раннего контакта с поставщиками.",
        icon: "lead",
        items: ["Проверка поставщика", "Проверка спроса", "Решение о действии"]
      }
    ],
    sections: [
      {
        title: "Что это такое",
        text:
          "Механизм прогнозирования возможностей ищет не только готовые предложения по избыточному товару, но и ранние признаки того, что такая возможность может появиться. Смысл модуля - выигрыш во времени: увидеть возможность до того, как рынок полностью ее оценил."
      },
      {
        title: "Почему это нужно Grafit",
        items: [
          "В торговле избыточным товаром время обнаружения напрямую влияет на деньги.",
          "Если Grafit видит возможность одновременно со всеми, конкуренция уходит в цену и скорость реакции.",
          "Если Grafit видит закономерность раньше, у команды появляется больше времени на проверку, контакт с поставщиком, оценку спроса и планирование капитала."
        ]
      },
      {
        title: "Группы прогнозных сигналов",
        groups: [
          {
            title: "Жизненный цикл товара",
            items: ["новая модель заменяет старую", "производитель снимает линию с производства", "меняется совместимость", "падает спрос на старый SKU"]
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
      "Каждая гипотеза отделяется от подтвержденного коммерческого решения.",
      "Каждая оценка объясняется через доказательства и прозрачную связь с источником.",
      "Результат проверки возвращается в систему и улучшает следующие рекомендации."
    ],
    executive:
      "Grafit уже силен в работе с видимыми товарными возможностями. Механизм прогнозирования добавляет следующий уровень: поиск ранних рыночных признаков будущего избыточного товара, чтобы команда могла действовать до того, как возможность станет видимой для всех.",
    effects: ["раньше начинается закупочная работа", "сильнее переговорная позиция", "меньше давления конкурентов", "выше потенциальная маржа", "быстрее контакт с поставщиком", "точнее планирование капитала", "лучше предвидение рынка"]
  },
  {
    slug: "institutional-memory-layer",
    title: "Слой институциональной памяти",
    icon: "space",
    summary:
      "Память решений Grafit: поставщики, сделки, SKU, рынки, ошибки и повторяемые уроки становятся доступными для новых решений.",
    positioning:
      "Модуль превращает накопленный опыт Grafit в рабочую память для будущих торговых решений: поставщики, сделки, SKU, рынки, риски и повторяемые закономерности становятся доступны в нужный момент.",
    outputs: ["Карточки памяти по поставщикам", "Карточки памяти по сделкам", "Память по товарам и SKU", "Поиск по прошлому опыту", "Повторно используемые уроки"],
    layers: [
      {
        title: "Сбор памяти",
        text: "Собирать прошлые решения, результаты, заметки по поставщикам, маржу, задержки и отклоненные сделки.",
        icon: "content",
        items: ["Сделки", "Поставщики", "История SKU"]
      },
      {
        title: "Структурированные карточки",
        text: "Превращать сырую историю в карточки памяти по поставщикам, сделкам, товарам и рынкам.",
        icon: "space",
        items: ["Карточка поставщика", "Карточка сделки", "Карточка товара"]
      },
      {
        title: "Поиск похожих случаев",
        text: "Находить прошлые случаи, похожие на нового поставщика, SKU, категорию или сделку.",
        icon: "lens",
        items: ["Похожие сделки", "Известные риски", "Повторные покупатели"]
      },
      {
        title: "Поддержка решения",
        text: "Делать прошлый опыт доступным до того, как команда повторит старую ошибку или пропустит известную закономерность.",
        icon: "ranking",
        items: ["Контекст риска", "История маржи", "Заметки по решению"]
      }
    ],
    sections: [
      {
        title: "Что это такое",
        text:
          "Слой институциональной памяти превращает накопленный опыт Grafit в живую систему коллективного торгового знания. Цель - сделать прошлый операционный опыт пригодным для будущих решений."
      },
      {
        title: "Почему это нужно Grafit",
        items: [
          "У Grafit за годы накоплены решения о поставщиках, сделках, SKU, марже, логистике, поведении покупателей и ошибках.",
          "В крупной торговой группе потеря знания становится дорогой, если оно остается только в головах, переписках, старых таблицах или привычках отдельных команд.",
          "Институциональная память делает лучший опыт организации доступным всей системе."
        ]
      },
      {
        title: "Что может хранить слой памяти",
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
      "Карточки памяти создаются вокруг реальных коммерческих сценариев.",
      "Чувствительная коммерческая информация хранится по правилам доступа.",
      "Экспертный опыт становится легче найти, сравнить и повторно использовать."
    ],
    executive:
      "У Grafit уже есть большой объем операционного опыта. Слой институциональной памяти превращает этот опыт в системный актив: знания о поставщиках, сделках, SKU, рынках и ошибках не остаются разрозненными, а работают на все релевантные команды.",
    effects: ["меньше повторных ошибок", "быстрее ввод новых людей в контекст", "сохранение экспертизы", "лучше контроль рисков поставщиков", "быстрее оценка сделок", "повторное использование знаний между компаниями", "меньше зависимости от индивидуальной памяти"]
  },
  {
    slug: "cross-vertical-intelligence",
    title: "Межвертикальная аналитика",
    icon: "flow",
    summary:
      "Слой групповой аналитики, который показывает повторяемые закономерности между вертикалями Grafit: поставщики, цены, логистика, склад и спрос.",
    positioning:
      "Модуль усиливает обмен знаниями между компаниями и вертикалями Grafit: успешные закономерности, рыночные сигналы, знания о поставщиках и риски становятся видимыми там, где могут создать новую ценность.",
    outputs: ["Карта закономерностей между вертикалями", "Повторно используемые рыночные уроки", "Видимость рисков на уровне группы", "Общие сигналы возможностей"],
    layers: [
      {
        title: "Входные данные вертикалей",
        text: "Собирать нормализованные сигналы из выбранных компаний, категорий, рынков, поставщиков и истории сделок.",
        icon: "data",
        items: ["Продажи", "Закупки", "Склад", "Маржа"]
      },
      {
        title: "Сопоставление закономерностей",
        text: "Находить повторяемые закономерности по поставщикам, регионам, ценам, запасам и логистике между вертикалями.",
        icon: "lens",
        items: ["Поставщики", "Регионы", "Цены"]
      },
      {
        title: "Групповая аналитика",
        text: "Показывать, где одно направление бизнеса может использовать знание или рыночный сигнал другого направления.",
        icon: "product",
        items: ["Повторные покупатели", "Общий риск", "Связанная категория"]
      },
      {
        title: "Управленческий обзор",
        text: "Давать руководству видимость по группе без потери автономии операционных команд.",
        icon: "ranking",
        items: ["Главные риски", "Потенциал маржи", "Распределение капитала"]
      }
    ],
    sections: [
      {
        title: "Что это такое",
        text:
          "Межвертикальная аналитика помогает Grafit учиться не только внутри отдельных вертикалей, но и между ними. Она выявляет общие закономерности между компаниями, категориями, рынками, поставщиками, движением запасов и поведением покупателей."
      },
      {
        title: "Почему это нужно Grafit",
        items: [
          "Grafit работает как торговый холдинг с несколькими компаниями и вертикалями.",
          "Каждая вертикаль может быть сильной в своей нише, но скрытые закономерности могут оставаться закрытыми внутри отдельных команд.",
          "Следующий стратегический уровень - сделать так, чтобы знания одной вертикали улучшали решения другой."
        ]
      },
      {
        title: "Какие закономерности выявлять",
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
      "Каждая вертикаль сохраняет собственную операционную специфику.",
      "Общий слой показывает повторно используемые закономерности без принудительной унификации процессов.",
      "Ценность создается через поддержку решений, а не через саму панель."
    ],
    executive:
      "У Grafit уже есть сильные специализированные компании. Следующий уровень - сделать так, чтобы знания каждой вертикали усиливали весь холдинг. Межвертикальная аналитика создает общий слой видимости по поставщикам, рынкам, ценам, логистике, запасам и спросу.",
    effects: ["меньше дублирующего поиска поставщиков", "быстрее распространяются успешные практики", "лучше управленческая видимость", "сильнее групповые решения", "больше синергии между компаниями", "точнее распределение капитала", "меньше мертвых остатков", "сильнее рыночная позиция"]
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

export const privateProjects: Record<Locale, PrivateProject[]> = {
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
        "Интеллектуальный слой Grafit объединяет рыночные сигналы, движение поставщиков, данные склада, историю сделок и знания между вертикалями в систему поддержки торговых решений.",
      description:
        "Система помогает командам раньше видеть возможности, быстрее проверять сигналы и сохранять контекст решений между поставщиками, сделками, категориями и вертикалями.",
      icon: "product",
      status: "Готово к планированию фокусного пилота",
      outputs: ["Радар ранних сигналов", "Карта товарных возможностей", "Оценка коммерческого потенциала", "Память решений", "Межвертикальные выводы"],
      modules: ruModules,
      thesis: {
        title: "Единый контур для раннего обнаружения торговых возможностей.",
        text:
          "Интеллектуальный слой Grafit соединяет пять рабочих функций в единый контур принятия решений: ранний радар рынка, поиск товарных возможностей, оценку коммерческого потенциала, память решений и обучение между вертикалями.",
        items: [
          "Рыночное движение превращается в понятные карточки возможностей, а не в разрозненный шум.",
          "История сделок и контекст поставщиков повторно используются при новых коммерческих решениях.",
          "Команды получают меньше сигналов, но они точнее ранжированы и быстрее доводятся до действия."
        ]
      },
      implementation: {
        title: "Пилот: от рыночного сигнала к проверенной возможности",
        text:
          "Первый запуск можно сфокусировать на одной торговой вертикали, где уже есть данные по складским остаткам, ценам, закупкам, продажам и поставщикам. Цель пилота - доказать, что более точные сигналы ускоряют коммерческую проверку и помогают быстрее находить рабочие возможности.",
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
          "Система оставляет контроль за людьми и показывает релевантный контекст в момент проверки. Она усиливает существующие процессы закупки, ценообразования, продаж, ERP, CRM и логистики, не ломая их.",
        items: [
          "Каждый сигнал сохраняет источник и понятную причину своей оценки.",
          "Каждая возможность проходит через человеческую проверку.",
          "Успех измеряется полезными коммерческими сигналами, скоростью проверки и качеством доведения решений до результата."
        ]
      }
    }
  ]
};

export const getPrivateProjects = (locale: Locale) => privateProjects[locale] ?? privateProjects.en;

export const getPrivateProject = (locale: Locale, slug: string) =>
  getPrivateProjects(locale).find((project) => project.slug === slug);

export const getPrivateModule = (locale: Locale, projectSlug: string, moduleSlug: string) =>
  getPrivateProject(locale, projectSlug)?.modules.find((module) => module.slug === moduleSlug);

export const privateProjectSlugs = privateProjects.en.map((project) => project.slug);

export const privateModuleSlugs = (projectSlug: string) =>
  privateProjects.en.find((project) => project.slug === projectSlug)?.modules.map((module) => module.slug) ?? [];
