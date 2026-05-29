import type { HeroVisual } from "@/data/hero";

export type LandingOffer = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  icon: string;
  audience: string;
  trafficReady: {
    trigger: string;
    promise: string;
    firstScope: string;
    proofMetric: string;
    riskRemoved: string;
  };
  painPoints: string[];
  outcomes: string[];
  modules: {
    title: string;
    text: string;
  }[];
  proofSignals: {
    title: string;
    text: string;
  }[];
  process: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  formProjectType: string;
  desiredOutput: string;
  integrations: string;
  relatedLinks: {
    label: string;
    href: string;
  }[];
};

export const landingOffers: LandingOffer[] = [
  {
    slug: "automate-lead-processing",
    eyebrow: "Lead automation landing page",
    title: "Automate lead intake before requests go cold.",
    summary:
      "A focused landing offer for companies that receive website, ad, or referral leads and need faster qualification, routing, follow-up, and source visibility.",
    icon: "lead",
    audience:
      "Service businesses, agencies, B2B teams, and local operators that already get inbound requests but still process them manually.",
    trafficReady: {
      trigger: "Use this route when paid search, referrals, or website forms already create requests but the team reacts too slowly.",
      promise: "Turn every serious request into a qualified, routed, visible lead before the first response window closes.",
      firstScope: "One intake model, one routing path, one follow-up signal, and one reporting view for source and response time.",
      proofMetric: "Response time, qualified lead rate, owner assignment, source quality, and next action visibility.",
      riskRemoved: "Good leads no longer disappear inside inboxes, spreadsheets, plugin emails, or unclear ownership."
    },
    painPoints: [
      "Requests arrive from forms, messengers, ads, and email without one clear intake path.",
      "Sales or operations teams lose time reading context, assigning owners, and asking the same first questions.",
      "Lead quality, source, status, and follow-up speed are hard to measure."
    ],
    outcomes: [
      "Structured intake and lead classification",
      "CRM, email, sheet, or dashboard handoff",
      "Lead status, source, and follow-up reporting"
    ],
    modules: [
      {
        title: "Capture and normalize",
        text:
          "Collect form, ad, or manual lead inputs into one structured request model with clean fields and source context."
      },
      {
        title: "Classify and score",
        text:
          "Use rules, AI assistance, or lightweight scoring to identify request type, urgency, fit, and missing context."
      },
      {
        title: "Route and notify",
        text:
          "Send the lead to the right owner, CRM stage, email thread, dashboard, or follow-up queue."
      },
      {
        title: "Track the loop",
        text:
          "Make response time, source quality, status, and next actions visible so the process can improve."
      }
    ],
    proofSignals: [
      { title: "Before", text: "Manual review, slow handoff, scattered lead context, unclear campaign quality." },
      { title: "After", text: "One intake model, qualified requests, visible routing, and faster first response." },
      { title: "Signals to show", text: "Lead source, status, owner, response time, qualification score, next step." }
    ],
    process: [
      "Map the current lead sources and follow-up path.",
      "Define the intake fields, routing logic, and qualification rules.",
      "Connect CRM, email, dashboards, sheets, or notifications.",
      "Launch the first workflow and review lead quality after real submissions."
    ],
    faq: [
      {
        question: "Can this work without a full CRM rebuild?",
        answer:
          "Yes. The first version can route into the tools already used by the team, then grow into a fuller CRM workflow later."
      },
      {
        question: "Can AI help qualify leads?",
        answer:
          "Yes, when the rules are clear and there is a review path for important decisions or uncertain cases."
      },
      {
        question: "What is the best first deliverable?",
        answer:
          "A working intake flow that captures source, request type, missing context, owner, and next action."
      }
    ],
    formProjectType: "AI automation",
    desiredOutput: "Lead intake and routing system",
    integrations: "Website forms, CRM, email notifications, spreadsheets, analytics",
    relatedLinks: [
      { label: "Solution route", href: "/solutions/automate-lead-processing/" },
      { label: "AI Automation", href: "/capabilities/ai-automation/" },
      { label: "WordPress Tools", href: "/systems/wordpress-tools/" }
    ]
  },
  {
    slug: "ai-content-workflow",
    eyebrow: "Content system landing page",
    title: "Build an AI content workflow with editorial control.",
    summary:
      "A landing offer for companies that need more content, product pages, guides, briefs, or media drafts without turning publishing into a quality problem.",
    icon: "content",
    audience:
      "Content teams, SEO projects, media operators, e-commerce catalogs, and agencies that need repeatable output with review and publishing control.",
    trafficReady: {
      trigger: "Use this route when the team needs more useful pages, briefs, articles, or catalog content without losing editorial control.",
      promise: "Convert content ideas and data into a repeatable AI-assisted production workflow with human review built in.",
      firstScope: "One content type, one template system, one generation path, one review queue, and one CMS-ready output.",
      proofMetric: "Brief quality, draft throughput, approval status, publishing queue, indexation, and content gap coverage.",
      riskRemoved: "AI output stops being an uncontrolled prompt habit and becomes a reviewed publishing system."
    },
    painPoints: [
      "Content ideas, briefs, drafts, metadata, review, and publishing live in separate tools.",
      "AI output is useful but inconsistent without templates, QA, and human approval.",
      "Scaling volume makes it harder to keep internal linking, structure, and updates clean."
    ],
    outcomes: [
      "Topic, template, and brief system",
      "AI draft, enrichment, and review workflow",
      "CMS-ready publishing and monitoring layer"
    ],
    modules: [
      {
        title: "Topic and brief model",
        text:
          "Define entities, keywords, templates, content types, inputs, and required sections before production begins."
      },
      {
        title: "AI-assisted generation",
        text:
          "Create drafts, outlines, metadata, summaries, FAQs, or media prompts from controlled inputs."
      },
      {
        title: "Editorial QA",
        text:
          "Add status, review, correction, approval, and content quality checks before publishing."
      },
      {
        title: "CMS and monitoring",
        text:
          "Prepare CMS-ready output, publishing queues, indexation checks, ranking signals, and update loops."
      }
    ],
    proofSignals: [
      { title: "Before", text: "Prompt-by-prompt production, inconsistent structure, hard-to-review drafts." },
      { title: "After", text: "Repeatable workflow with templates, statuses, QA, publishing, and monitoring." },
      { title: "Signals to show", text: "Output volume, review status, publishing queue, indexation, content gaps." }
    ],
    process: [
      "Choose the first content type and the inputs behind it.",
      "Design templates, prompt structure, fields, and review states.",
      "Build generation, enrichment, QA, and publishing handoff.",
      "Measure output quality, speed, and content performance signals."
    ],
    faq: [
      {
        question: "Is this just AI text generation?",
        answer:
          "No. The value is the workflow around generation: templates, review, metadata, CMS handoff, and performance loops."
      },
      {
        question: "Can it support programmatic SEO?",
        answer:
          "Yes. The same structure can support pages for services, locations, products, categories, or other data entities."
      },
      {
        question: "Can editors stay in control?",
        answer:
          "Yes. Review states, approvals, corrections, and manual overrides are part of the system."
      }
    ],
    formProjectType: "SEO/content infrastructure",
    desiredOutput: "AI-assisted content workflow",
    integrations: "CMS, content database, AI models, analytics, search monitoring",
    relatedLinks: [
      { label: "Generate content", href: "/solutions/generate-more-content/" },
      { label: "SEO Infrastructure", href: "/capabilities/seo-content-infrastructure/" },
      { label: "Content Workflow", href: "/systems/content-automation-workflows/" }
    ]
  },
  {
    slug: "ecommerce-feed-system",
    eyebrow: "E-commerce operations landing page",
    title: "Unify product data, feeds, and catalog updates.",
    summary:
      "A landing offer for stores and catalog businesses that need cleaner product data, feed workflows, stock or price monitoring, and operational reporting.",
    icon: "commerce",
    audience:
      "E-commerce teams, catalog businesses, marketplace operators, and product-heavy companies with repeated product data work.",
    trafficReady: {
      trigger: "Use this route when catalog updates, feeds, marketplace data, or product checks keep creating manual operations work.",
      promise: "Turn catalog data, feeds, and monitoring into one operating layer the team can trust.",
      firstScope: "One product data model, one feed or export route, one validation layer, and one operations dashboard or report.",
      proofMetric: "Feed status, missing fields, stock or price changes, catalog coverage, and action-list completion.",
      riskRemoved: "Revenue channels stop depending on fragile exports, late issue discovery, and scattered product data."
    },
    painPoints: [
      "Product updates, content, feed exports, stock signals, and pricing checks depend on manual work.",
      "Marketplace or ad feeds break because product data is incomplete, inconsistent, or not transformed correctly.",
      "Catalog quality and operational issues are noticed late."
    ],
    outcomes: [
      "Product data and feed workflow",
      "Catalog quality checks and monitoring",
      "Operational dashboard or recurring reports"
    ],
    modules: [
      {
        title: "Catalog data model",
        text:
          "Structure products, categories, attributes, metadata, media, and rules for reliable updates."
      },
      {
        title: "Feed generation",
        text:
          "Create or transform feeds for marketplaces, ads, affiliates, CRMs, internal tools, or external platforms."
      },
      {
        title: "Monitoring layer",
        text:
          "Track stock, price, availability, missing data, competitor signals, and catalog issues."
      },
      {
        title: "Operations output",
        text:
          "Show alerts, reports, exports, dashboards, and action lists for the team that manages the catalog."
      }
    ],
    proofSignals: [
      { title: "Before", text: "Manual product updates, fragile feeds, late issue discovery, unclear catalog quality." },
      { title: "After", text: "Structured data, automated exports, monitoring, and visible operations output." },
      { title: "Signals to show", text: "Missing fields, feed status, price changes, stock issues, catalog coverage." }
    ],
    process: [
      "Audit the current product data, feeds, store platform, and update workflow.",
      "Define product fields, transformations, rules, and monitoring needs.",
      "Build the feed, validation, dashboard, or reporting modules.",
      "Launch with real product data and tune for operational use."
    ],
    faq: [
      {
        question: "Can this connect to an existing store?",
        answer:
          "Yes. The system can sit around the current platform and connect through feeds, APIs, exports, imports, or custom tools."
      },
      {
        question: "Can it monitor competitors?",
        answer:
          "Yes, when sources are suitable and the monitoring rules are defined clearly."
      },
      {
        question: "What should be built first?",
        answer:
          "Usually the smallest workflow that improves data quality, feed reliability, or operational visibility."
      }
    ],
    formProjectType: "E-commerce infrastructure",
    desiredOutput: "Product data, feed, and monitoring system",
    integrations: "Store platform, product feeds, marketplaces, analytics, spreadsheets, APIs",
    relatedLinks: [
      { label: "E-commerce systems", href: "/capabilities/ecommerce-systems/" },
      { label: "Monitoring solution", href: "/solutions/build-data-monitoring-system/" },
      { label: "E-commerce profile", href: "/systems/ecommerce-system/" }
    ]
  },
  {
    slug: "wordpress-crm-integration",
    eyebrow: "WordPress integration landing page",
    title: "Connect WordPress, CRM, APIs, and workflows.",
    summary:
      "A landing offer for businesses that rely on WordPress but need it to act like a connected operating layer instead of a fragile plugin stack.",
    icon: "api",
    audience:
      "WordPress-based businesses, service companies, publishers, agencies, and teams that need custom forms, CRM handoff, publishing, or data workflows.",
    trafficReady: {
      trigger: "Use this route when WordPress is already business-critical but forms, CRM, content, and reporting are loosely connected.",
      promise: "Make WordPress behave like a controlled workflow layer instead of a fragile stack of plugins.",
      firstScope: "One critical WordPress workflow, one CRM/API handoff, one status model, and one visible output path.",
      proofMetric: "Submission source, CRM status, integration logs, owner assignment, publishing state, and next action.",
      riskRemoved: "Critical operations stop depending on manual exports, duplicate entry, and plugin-chain uncertainty."
    },
    painPoints: [
      "Forms, plugins, CRM, email, content, and reporting are connected loosely or not at all.",
      "Teams depend on manual exports, plugin chains, duplicate data entry, and unclear ownership.",
      "WordPress has the business context, but the workflow around it is not structured."
    ],
    outcomes: [
      "Custom WordPress workflow or admin tool",
      "CRM/API integration and automation logic",
      "Cleaner intake, publishing, or reporting process"
    ],
    modules: [
      {
        title: "WordPress structure",
        text:
          "Design custom post types, fields, forms, taxonomies, admin screens, or content models around the workflow."
      },
      {
        title: "CRM and API handoff",
        text:
          "Connect forms, leads, records, files, content, or events to CRM, APIs, email, databases, or automation tools."
      },
      {
        title: "Workflow control",
        text:
          "Add status, validation, review, notifications, owner assignment, and fallback logic."
      },
      {
        title: "Reporting output",
        text:
          "Create dashboards, exports, logs, notifications, or action lists so the workflow is visible."
      }
    ],
    proofSignals: [
      { title: "Before", text: "Plugin dependency, manual exports, duplicate entry, disconnected CRM context." },
      { title: "After", text: "Controlled WordPress workflow with API handoff, status, and visible output." },
      { title: "Signals to show", text: "Submission source, CRM status, integration logs, owner, next action." }
    ],
    process: [
      "Audit the current WordPress setup, plugins, forms, and CRM path.",
      "Define the workflow objects, fields, validation, and API handoff.",
      "Build the custom tool, integration, or automation layer.",
      "Test real submissions and document the operating path."
    ],
    faq: [
      {
        question: "Can this avoid replacing the whole website?",
        answer:
          "Yes. Many first versions improve the workflow around the existing WordPress site before any larger rebuild."
      },
      {
        question: "Can it reduce plugin fragility?",
        answer:
          "Yes. Critical workflows can be moved into controlled custom logic instead of relying on several chained plugins."
      },
      {
        question: "Can this include content workflows?",
        answer:
          "Yes. The same integration layer can support publishing, editorial review, AI-assisted drafts, and reporting."
      }
    ],
    formProjectType: "WordPress/API integration",
    desiredOutput: "Connected WordPress and CRM workflow",
    integrations: "WordPress, forms, CRM, APIs, email, databases, analytics",
    relatedLinks: [
      { label: "WordPress capability", href: "/capabilities/wordpress-api-integrations/" },
      { label: "Website upgrade", href: "/solutions/upgrade-existing-website/" },
      { label: "WordPress tools", href: "/systems/wordpress-tools/" }
    ]
  }
];

export const landingOfferHeroVisual = (offer: LandingOffer): HeroVisual => ({
  mode: "landing-offer",
  icon: offer.icon,
  label: offer.eyebrow,
  state: "Campaign route ready",
  output: offer.desiredOutput,
  nodes: offer.modules.map((module, index) => ({
    title: module.title,
    state: ["Capture", "Process", "Connect", "Output"][index % 4],
    icon: index === 0 ? offer.icon : ["flow", "tools", "api", "ranking"][index % 4],
    detail: offer.outcomes[index % offer.outcomes.length],
    meter: `${74 + index * 5}%`
  })),
  metrics: [
    { value: String(offer.modules.length).padStart(2, "0"), label: "Modules" },
    { value: String(offer.outcomes.length).padStart(2, "0"), label: "Outputs" },
    { value: "LP", label: "Lead page" }
  ]
});

export const getLandingOffer = (slug: string) =>
  landingOffers.find((offer) => offer.slug === slug);
