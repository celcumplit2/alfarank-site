export type PageItem = {
  title: string;
  slug: string;
  icon?: string;
  summary: string;
  details?: string[];
  outputs?: string[];
  related?: string[];
  intro?: string;
  modules?: {
    title: string;
    text: string;
  }[];
  workflow?: string[];
  useCases?: string[];
};

export const company = {
  name: "AlfaRank",
  position:
    "AlfaRank designs and launches digital systems for business operations, content infrastructure, automation, and growth.",
  short:
    "AlfaRank designs and launches practical digital systems for companies that need automation, content infrastructure, data workflows, web platforms, and business integrations."
};

export const home = {
  heroTitle: "Digital systems that connect, automate, and perform.",
  heroText:
    "AlfaRank builds the infrastructure behind modern business workflows: web platforms, AI automation, SEO/content systems, data tools, e-commerce operations, and integrations.",
  buildText:
    "The company works across connected technical directions. Each direction can be delivered as a standalone system or combined into a broader business platform.",
  solutionsText:
    "The site is organized around business problems first. Each solution describes the workflow, infrastructure, and output required to make the process repeatable.",
  systemsText:
    "Systems are presented as practical profiles: what the system does, how the workflow is structured, which modules are involved, and what business output it supports.",
  process: [
    "Define the business problem and the operational result.",
    "Map the current website, content, CRM, data, or workflow layer.",
    "Design the system scope, modules, data inputs, and integrations.",
    "Build a prototype or first working version.",
    "Launch, connect, measure, and improve the system."
  ]
};

export const capabilities: PageItem[] = [
  {
    title: "AI Automation",
    slug: "ai-automation",
    icon: "ai",
    summary:
      "Technical AI workflow capability for prompts, rules, review states, data actions, and integrations inside business systems.",
    intro:
      "AI automation is treated as a build capability, not a promise to generate content by itself. AlfaRank designs the operating path around models: inputs, prompts, rules, confidence checks, review states, logs, fallback logic, and the CMS, CRM, database, or API actions that should happen after the model responds.",
    details: [
      "Prompt, rule, and workflow design",
      "Classification, enrichment, routing, and action triggers",
      "Review states, logs, confidence checks, and fallback logic",
      "Connections to CMS, CRM, databases, APIs, and internal tools"
    ],
    modules: [
      {
        title: "Model and prompt layer",
        text:
          "Prompts, templates, system instructions, constraints, and reusable generation or classification patterns are defined before automation is connected to live work."
      },
      {
        title: "Business rules and states",
        text:
          "Rules, statuses, confidence thresholds, review steps, exceptions, and ownership keep the workflow controllable instead of acting as a black box."
      },
      {
        title: "Action and integration layer",
        text:
          "AI output can update CRM records, draft CMS content, enrich data, route tasks, prepare reports, or trigger notifications through controlled actions."
      },
      {
        title: "Observability and fallback",
        text:
          "Logs, manual overrides, review queues, and quality signals show where the automation is reliable and where people still need to decide."
      }
    ],
    outputs: [
      "Controlled AI workflows",
      "Model-assisted actions",
      "Reviewable automation paths",
      "Connected CMS, CRM, data, or reporting operations"
    ],
    workflow: [
      "Define the repeated decision, classification, draft, or action that should be assisted.",
      "Map inputs, business rules, confidence thresholds, and required review points.",
      "Design prompts, states, logs, fallbacks, and permissions before connecting tools.",
      "Connect model output to CMS, CRM, databases, dashboards, or notifications.",
      "Review accuracy, exceptions, cost, speed, and operational usefulness after launch."
    ],
    useCases: [
      "Classify and route incoming leads, records, tickets, or tasks.",
      "Generate controlled drafts from approved templates and source data.",
      "Enrich records with extracted entities, summaries, tags, or scores.",
      "Prepare research notes, reports, or data reviews with human approval.",
      "Add AI assistance to WordPress, CRM, dashboards, databases, and APIs."
    ],
    related: ["Generate more content", "Automate lead processing", "Build internal tools"]
  },
  {
    title: "Web & Product Development",
    slug: "web-product-development",
    icon: "web",
    summary:
      "Web platforms, product interfaces, dashboards, portals, MVPs, and operational tools built around business workflows.",
    intro:
      "Web and product development at AlfaRank is focused on usable business systems, not decorative websites. The work can include public websites, product interfaces, dashboards, portals, internal tools, and MVPs that connect content, data, automation, and operational workflows.",
    details: [
      "Corporate websites with structured content systems",
      "Product interfaces and MVPs",
      "Dashboards, portals, and internal tools",
      "Integration-ready frontends and admin surfaces"
    ],
    modules: [
      {
        title: "Corporate web platforms",
        text:
          "Structured websites with reusable content models, clear navigation, service or solution pages, technical SEO foundations, and deployment workflows."
      },
      {
        title: "Product interfaces and MVPs",
        text:
          "Interfaces for validating digital products, SaaS concepts, client portals, workflow tools, and business-facing product ideas."
      },
      {
        title: "Dashboards and internal tools",
        text:
          "Operational interfaces for teams that need to view data, update records, manage workflows, trigger actions, or review outputs."
      },
      {
        title: "Integration-ready architecture",
        text:
          "Frontend and backend structures designed to connect with CRMs, CMS platforms, APIs, databases, automation tools, and analytics."
      }
    ],
    outputs: ["Web platforms", "Product interfaces", "Operational tools"],
    workflow: [
      "Define the business workflow, user roles, and required output.",
      "Map content, data, integrations, and operational states.",
      "Design the information architecture and core interface flows.",
      "Build the first launchable version with deployment and review workflow.",
      "Connect analytics, automation, CMS, CRM, or API layers where needed."
    ],
    useCases: [
      "Launch a structured corporate site with strong navigation and content architecture.",
      "Build a product MVP or client portal around a specific business workflow.",
      "Replace spreadsheets or manual processes with internal tools.",
      "Create dashboards for monitoring content, leads, products, data, or operations.",
      "Modernize an existing website into a system that can integrate and scale."
    ],
    related: ["Launch a digital product", "Build internal tools", "Upgrade an existing website"]
  },
  {
    title: "SEO & Content Infrastructure",
    slug: "seo-content-infrastructure",
    icon: "content",
    summary:
      "Architecture for content systems: page types, taxonomies, templates, metadata, internal links, CMS structures, and publishing controls.",
    intro:
      "SEO and content infrastructure is a build capability. It defines how content should be modeled and published: page types, taxonomies, entity relationships, templates, metadata, internal links, CMS fields, QA rules, and monitoring hooks. The growth promise belongs to solution pages; this page explains the system layer that makes scalable publishing possible.",
    details: [
      "Page types, taxonomies, and entity relationships",
      "Template, metadata, and internal linking systems",
      "CMS and static publishing structures",
      "QA rules, indexation checks, and monitoring hooks"
    ],
    modules: [
      {
        title: "Content architecture",
        text:
          "Page types, taxonomy, internal linking, templates, metadata, content groups, and navigation structures designed before production begins."
      },
      {
        title: "Programmatic SEO systems",
        text:
          "Scalable page structures driven by data, reusable templates, entity relationships, location/product/category models, and automated publishing logic."
      },
      {
        title: "Publishing structures",
        text:
          "Content fields, review states, CMS handoff rules, static build paths, publishing queues, and update logic define how content moves."
      },
      {
        title: "Content performance layer",
        text:
          "Monitoring hooks track indexation, rankings, content gaps, page quality, structured data, and improvement priorities without turning this page into a growth promise."
      }
    ],
    outputs: ["Content architecture", "Publishing controls", "Scalable page infrastructure"],
    workflow: [
      "Define the organic growth model and the page types required.",
      "Map data sources, content inputs, keyword/entity groups, and publishing constraints.",
      "Create templates, metadata patterns, internal linking rules, and CMS structures.",
      "Build the production workflow for content creation, review, and publishing.",
      "Monitor performance, identify gaps, and improve the system over time."
    ],
    useCases: [
      "Create scalable landing page structures for services, locations, products, or categories.",
      "Build a programmatic publishing workflow from data sources and templates.",
      "Turn AI-assisted content generation into a controlled editorial system.",
      "Upgrade an existing site with better information architecture and internal linking.",
      "Create monitoring for content quality, rankings, indexation, and technical issues."
    ],
    related: ["Generate more content", "Scale SEO infrastructure"]
  },
  {
    title: "Data Systems & Scraping",
    slug: "data-systems-scraping",
    icon: "data",
    summary:
      "Technical capability for collecting, normalizing, matching, storing, and exposing data from websites, APIs, feeds, files, and SERP sources.",
    intro:
      "Data systems and scraping is the capability layer for turning unstable sources into usable data infrastructure. The focus is not the business reason for monitoring, but the mechanics: source access, collection jobs, validation, normalization, entity matching, storage, change detection, exports, dashboards, and alerts.",
    details: [
      "Source access: scraping, APIs, feeds, files, and SERPs",
      "Validation, cleaning, deduplication, and entity matching",
      "Storage, history, search, and comparison structures",
      "Exports, dashboards, alerts, and reporting interfaces"
    ],
    modules: [
      {
        title: "Data collection layer",
        text:
          "Scrapers, API connectors, feed processors, upload tools, and scheduled jobs that bring data into a controlled system."
      },
      {
        title: "Normalization and storage",
        text:
          "Structures for cleaning, matching, deduplicating, tagging, grouping, and storing data so it can be searched, compared, and reused."
      },
      {
        title: "Monitoring and alerts",
        text:
          "Change detection, scheduled checks, alert rules, and issue queues expose movement in prices, catalogs, rankings, SERPs, availability, reviews, or other tracked sources."
      },
      {
        title: "Audit, scoring, and reporting",
        text:
          "Rules, scoring models, dashboards, exports, and reports can be built on top of the data layer when the project needs evaluation rather than collection alone."
      }
    ],
    outputs: ["Data collection layer", "Normalized records", "Change detection", "Dashboards and exports"],
    workflow: [
      "Define what data matters and what decisions it should support.",
      "Map available sources: websites, APIs, feeds, files, SERPs, catalogs, or internal records.",
      "Design collection, normalization, storage, and update logic.",
      "Create dashboards, alerts, exports, ranking logic, or audit reports.",
      "Review data quality and improve coverage, reliability, and signal usefulness."
    ],
    useCases: [
      "Monitor competitor websites, prices, catalogs, content, or search visibility.",
      "Build an audit system for websites, pages, products, listings, or campaigns.",
      "Collect market data from public sources and turn it into dashboards.",
      "Create ranking or scoring systems for entities, pages, products, or locations.",
      "Generate recurring reports from scraped, API, or internal data."
    ],
    related: ["Build a data/monitoring system", "Build internal tools"]
  },
  {
    title: "E-commerce Systems",
    slug: "ecommerce-systems",
    icon: "commerce",
    summary:
      "Build capability for catalog data, product content, feed logic, stock/pricing signals, integrations, and commerce operations tooling.",
    intro:
      "E-commerce systems is a capability page for the pieces AlfaRank can assemble around a store or product catalog. It covers data structures, feeds, product content, stock and price signals, marketplace or ad exports, API connections, dashboards, and operating tools. The concrete catalog operating model lives in the E-commerce System profile.",
    details: [
      "Product data models, categories, attributes, and filters",
      "Feed import/export and marketplace synchronization",
      "Product/category content and SEO templates",
      "Stock, pricing, availability, and catalog quality signals"
    ],
    modules: [
      {
        title: "Catalog and product data structure",
        text:
          "Product models, categories, attributes, filters, metadata, content fields, and data rules that make the catalog easier to manage and expand."
      },
      {
        title: "Feeds and integrations",
        text:
          "Systems for generating, importing, transforming, and synchronizing product feeds with marketplaces, CRMs, analytics tools, warehouses, or external platforms."
      },
      {
        title: "Content and SEO infrastructure",
        text:
          "Templates, product descriptions, category content, programmatic landing pages, metadata, internal linking, and publishing workflows for e-commerce growth."
      },
      {
        title: "Monitoring and operations",
        text:
          "Dashboards and alerts for stock, pricing, availability, catalog quality, content gaps, technical issues, and key commercial signals."
      }
    ],
    outputs: ["Catalog build blocks", "Feed and sync logic", "Commerce operations tooling"],
    workflow: [
      "Audit the current catalog, product data, CMS, store platform, feeds, and integrations.",
      "Define the target operating model for product updates, content, pricing, stock, and reporting.",
      "Design product data structures, feed rules, automation points, and monitoring logic.",
      "Build or connect the required tools, dashboards, CMS structures, and API workflows.",
      "Launch the system, validate data quality, and improve based on operational use."
    ],
    useCases: [
      "Clean up and restructure product catalogs for easier management.",
      "Generate product feeds for marketplaces, ads, affiliates, or internal tools.",
      "Create scalable product and category content workflows.",
      "Monitor pricing, stock, competitor changes, or catalog quality.",
      "Connect e-commerce operations with CRM, analytics, automation, or reporting systems."
    ],
    related: ["Upgrade an existing website", "Build a data/monitoring system"]
  },
  {
    title: "Video & Media Automation",
    slug: "video-media-automation",
    icon: "media",
    summary:
      "Build capability for repeatable media workflows: brief intake, generation, templates, review, exports, metadata, and publishing handoff.",
    intro:
      "Video and media automation is the capability layer behind media production systems. It describes what can be assembled for different formats: structured briefs, generation steps, templates, asset rules, captions, thumbnails, export variants, review queues, metadata, storage, and publishing handoff. Concrete system profiles can then show how those pieces become an operating workflow for a specific media process.",
    details: [
      "Brief intake and structured source material",
      "Generation, enrichment, captions, thumbnails, and variants",
      "Template rules, asset rules, exports, and metadata",
      "Review queues, storage, publishing, and platform handoff"
    ],
    modules: [
      {
        title: "Generation pipelines",
        text:
          "Workflows that transform scripts, product data, article inputs, prompts, or structured briefs into video, image, audio, or media drafts."
      },
      {
        title: "Template-based production",
        text:
          "Reusable production structures for intros, scenes, captions, formats, aspect ratios, brand assets, metadata, and export variants."
      },
      {
        title: "Review and quality control",
        text:
          "Human review stages, status tracking, approval logic, asset checks, versioning, and correction workflows for controlled output."
      },
      {
        title: "Publishing and distribution",
        text:
          "Automation for preparing metadata, thumbnails, captions, CMS entries, platform-ready files, and publishing queues."
      }
    ],
    outputs: ["Media workflows", "Video automation", "Content production pipelines"],
    workflow: [
      "Define the repeatable media output and the input structure behind it.",
      "Map the generation, editing, review, export, and publishing stages.",
      "Create templates, prompts, asset rules, metadata patterns, and QA steps.",
      "Connect AI/media tools, storage, CMS, publishing channels, or dashboards.",
      "Test output quality, production speed, and review reliability."
    ],
    useCases: [
      "Generate video drafts from articles, product data, scripts, or structured briefs.",
      "Create repeatable media production workflows for content teams.",
      "Automate captions, thumbnails, metadata, file preparation, or exports.",
      "Connect media generation with CMS or publishing systems.",
      "Build internal tools for reviewing, approving, and tracking media output."
    ],
    related: ["Generate more content"]
  },
  {
    title: "WordPress & API Integrations",
    slug: "wordpress-api-integrations",
    icon: "api",
    summary:
      "Build capability for WordPress content models, admin utilities, API connections, CRM/form handoff, and controlled publishing workflows.",
    intro:
      "WordPress and API integrations is a capability page. It describes what can be built inside or around WordPress: custom post types, taxonomies, fields, admin screens, import/export tools, form and CRM routes, API synchronization, automation, and publishing controls. Website modernization and WordPress Tools should remain separate solution and system-profile pages.",
    details: [
      "Custom WordPress structures and tools",
      "API integrations with external systems",
      "CMS publishing and editorial workflows",
      "Automation between websites, CRMs, forms, and databases"
    ],
    modules: [
      {
        title: "Custom WordPress architecture",
        text:
          "Content types, taxonomies, fields, templates, admin screens, editorial logic, and content models designed around business operations."
      },
      {
        title: "API and CRM integrations",
        text:
          "Connections between WordPress, CRMs, forms, payment tools, databases, analytics, third-party APIs, and automation platforms."
      },
      {
        title: "Publishing and content workflows",
        text:
          "Systems for AI-assisted drafts, editorial review, metadata, scheduled publishing, programmatic content, and quality control."
      },
      {
        title: "Operational tools and plugins",
        text:
          "Custom admin tools, dashboards, import/export flows, monitoring utilities, internal workflows, and plugin-style business features."
      }
    ],
    outputs: ["WordPress tools", "API integrations", "Connected publishing systems"],
    workflow: [
      "Audit the current WordPress structure, plugins, data model, forms, and integrations.",
      "Define what business workflow WordPress should support.",
      "Design custom content models, API connections, admin tools, and automation points.",
      "Build, test, and connect the required components.",
      "Document the workflow and prepare the system for ongoing content or operational use."
    ],
    useCases: [
      "Turn WordPress into a structured publishing or content infrastructure system.",
      "Connect forms, CRM, email, analytics, databases, and third-party APIs.",
      "Build custom admin tools for internal workflows.",
      "Create programmatic SEO or content publishing structures.",
      "Replace fragile plugin chains with controlled custom integrations."
    ],
    related: ["Upgrade an existing website", "Scale SEO infrastructure"]
  }
];

export const solutions: PageItem[] = [
  {
    title: "Generate More Content",
    slug: "generate-more-content",
    icon: "content",
    summary:
      "A solution for teams that need higher publishing capacity without losing editorial control, review discipline, or CMS handoff quality.",
    intro:
      "This solution starts from a business pressure: the team needs more pages, articles, guides, product copy, or local/category content than manual production can handle. AlfaRank turns that pressure into a scoped production route: inputs, templates, AI-assisted drafts, editorial checks, publishing handoff, and measurement.",
    details: [
      "Publishing demand exceeds manual production capacity",
      "Inputs, templates, and briefs are not organized enough to scale",
      "Editors need review states instead of uncontrolled draft generation",
      "CMS handoff and performance feedback need to become repeatable"
    ],
    modules: [
      {
        title: "Content demand map",
        text:
          "Content types, publishing volume, target page groups, business priority, and current production blockers are defined before workflow design starts."
      },
      {
        title: "Input and template structure",
        text:
          "Topics, entities, keywords, product data, locations, briefs, templates, source material, and metadata become controlled inputs instead of loose requests."
      },
      {
        title: "Draft and review route",
        text:
          "AI-assisted drafts move through editorial checks, QA rules, corrections, approvals, and readiness states before they can be published."
      },
      {
        title: "Publish and measure loop",
        text:
          "Approved output moves into CMS handoff, metadata, internal links, publishing queue, indexation checks, and performance feedback."
      }
    ],
    outputs: ["Higher publishing capacity", "Clearer editorial control", "Repeatable CMS handoff", "Visible production and performance signals"],
    workflow: [
      "Define what needs to be produced, at what volume, and why current production blocks it.",
      "Choose the first content type and the inputs needed to create it reliably.",
      "Create templates, AI-assisted draft logic, review states, and approval rules.",
      "Connect the approved output to CMS handoff, metadata, internal links, and publishing queue.",
      "Measure speed, quality, indexation, gaps, and update needs after launch."
    ],
    useCases: [
      "Scale blog, guide, landing, product, category, or location content when manual production is too slow.",
      "Turn structured data into publishable drafts with review before CMS handoff.",
      "Give editors a controlled workflow for AI-assisted drafts and QA steps.",
      "Create a publishing route for repeated content formats.",
      "Make production speed, quality, indexation, and content gaps visible."
    ],
    related: ["AI Automation", "SEO & Content Infrastructure", "WordPress & API Integrations"]
  },
  {
    title: "Automate Lead Processing",
    slug: "automate-lead-processing",
    icon: "lead",
    summary:
      "Connect forms, CRM, enrichment, scoring, routing, notifications, and follow-up into one lead operating flow.",
    intro:
      "This solution is for businesses that receive leads from websites, ads, forms, calls, directories, or partner channels and need a cleaner operating process. AlfaRank builds lead systems that classify requests, enrich records, route work, update CRM data, and trigger follow-up actions.",
    details: [
      "Lead capture and CRM connection",
      "Qualification, enrichment, and scoring",
      "Routing and team notifications",
      "Follow-up workflows and status tracking"
    ],
    modules: [
      {
        title: "Lead capture and normalization",
        text:
          "Forms, landing pages, website events, imports, APIs, and CRM inputs normalized into a consistent lead structure."
      },
      {
        title: "Classification and scoring",
        text:
          "Rules or AI-assisted logic for identifying project type, priority, location, budget signal, urgency, and required next action."
      },
      {
        title: "Routing and notifications",
        text:
          "Assignment logic, team alerts, CRM updates, status changes, and follow-up triggers based on lead type and business rules."
      },
      {
        title: "Tracking and reporting",
        text:
          "Dashboards or logs showing lead status, response time, source quality, bottlenecks, and conversion flow."
      }
    ],
    outputs: ["Faster lead handling", "Less manual sorting", "Cleaner sales operations"],
    workflow: [
      "Map all lead sources and current handling process.",
      "Define qualification rules, statuses, owners, and response logic.",
      "Connect website forms, CRM, notifications, and enrichment tools.",
      "Build routing, scoring, and follow-up automation.",
      "Measure response speed, source quality, and process gaps."
    ],
    useCases: [
      "Route leads from a website form into the right CRM pipeline.",
      "Classify project requests by service type, urgency, or business fit.",
      "Notify sales or operations teams based on lead attributes.",
      "Enrich leads with website, company, source, or campaign data.",
      "Track lead response and follow-up status across channels."
    ],
    related: ["AI Automation", "WordPress & API Integrations", "Build Internal Tools"]
  },
  {
    title: "Build Internal Tools",
    slug: "build-internal-tools",
    icon: "tools",
    summary:
      "Replace spreadsheets and manual coordination with internal dashboards, databases, and workflow tools.",
    intro:
      "This solution is for teams that rely on manual coordination, scattered spreadsheets, repeated admin work, or disconnected tools. AlfaRank builds internal tools that make business processes visible, repeatable, and easier to operate.",
    details: [
      "Admin panels and operational dashboards",
      "Internal databases and user roles",
      "Workflow states and approvals",
      "Exports, reporting, and alerts"
    ],
    modules: [
      {
        title: "Operational dashboard",
        text:
          "Interfaces for viewing records, statuses, tasks, metrics, alerts, and process stages in one place."
      },
      {
        title: "Workflow and permissions",
        text:
          "Roles, approvals, status changes, assignment logic, comments, review steps, and controlled access."
      },
      {
        title: "Data and integrations",
        text:
          "Connections to CRMs, websites, APIs, spreadsheets, databases, CMS tools, and automation platforms."
      },
      {
        title: "Reports and actions",
        text:
          "Exports, alerts, recurring reports, bulk actions, triggered workflows, and operational summaries."
      }
    ],
    outputs: ["Operational visibility", "Reduced repetitive work", "Single source of process data"],
    workflow: [
      "Identify the repeated internal process and current pain points.",
      "Define the data model, statuses, users, permissions, and actions.",
      "Design the interface around real team workflows.",
      "Build the first usable version and connect required data sources.",
      "Improve based on actual daily use."
    ],
    useCases: [
      "Replace operational spreadsheets with a structured tool.",
      "Create dashboards for content, leads, projects, products, or data workflows.",
      "Build approval systems for publishing, media, reports, or client work.",
      "Connect internal processes with CRM, CMS, APIs, or databases.",
      "Create reporting and alerting tools for managers or operators."
    ],
    related: ["Web & Product Development", "Data Systems & Scraping", "AI Automation"]
  },
  {
    title: "Launch a Digital Product",
    slug: "launch-digital-product",
    icon: "product",
    summary:
      "Move from business idea to working MVP, SaaS interface, client portal, or productized platform.",
    intro:
      "This solution is for companies that need to turn a business idea, internal workflow, or productized service into a working digital product. AlfaRank helps define the first launchable version, design the interface and data model, build the core system, and prepare it for real users.",
    details: [
      "Product scope and user flows",
      "Frontend and backend architecture",
      "Authentication, dashboards, and data models",
      "Launch-ready deployment and iteration path"
    ],
    modules: [
      {
        title: "Product scope and flows",
        text:
          "Definition of user roles, core actions, screens, data objects, workflow states, and the minimum system required for launch."
      },
      {
        title: "Interface and application layer",
        text:
          "Frontend screens, dashboards, portals, forms, data views, navigation, onboarding, and key product interactions."
      },
      {
        title: "Data and backend structure",
        text:
          "Databases, APIs, authentication, permissions, business logic, file handling, integrations, and admin controls."
      },
      {
        title: "Launch and iteration setup",
        text:
          "Deployment workflow, analytics, feedback loops, issue tracking, and a path from MVP to more complete product system."
      }
    ],
    outputs: ["Working MVP", "Product interface", "Launch-ready platform"],
    workflow: [
      "Define the product goal, users, workflow, and first launch scope.",
      "Map screens, data objects, user actions, permissions, and integrations.",
      "Build the interface, backend logic, and required admin tools.",
      "Deploy the first usable version and connect analytics or feedback flows.",
      "Improve the product based on real usage and business priorities."
    ],
    useCases: [
      "Launch a SaaS MVP or productized service interface.",
      "Build a client portal for requests, files, reports, dashboards, or workflows.",
      "Turn an internal workflow into a product that can be used by customers.",
      "Create a prototype that is technically strong enough to become the real product.",
      "Build admin tools and dashboards around a new digital product."
    ],
    related: ["Web & Product Development", "AI Automation", "Data Systems & Scraping"]
  },
  {
    title: "Upgrade an Existing Website",
    slug: "upgrade-existing-website",
    icon: "web",
    summary:
      "Modernize an existing website into a structured platform with better content logic, integrations, speed, and maintainability.",
    intro:
      "This solution is for businesses that already have a website, but the site no longer supports current operations, content needs, SEO structure, integrations, or conversion workflows. AlfaRank upgrades the website as a digital system, not just a visual refresh.",
    details: [
      "Information architecture and content model cleanup",
      "Performance and technical structure improvements",
      "CMS and integration upgrades",
      "Conversion paths and operational workflows"
    ],
    modules: [
      {
        title: "Architecture and content model",
        text:
          "Restructuring pages, navigation, templates, taxonomies, content types, metadata, internal links, and publishing logic."
      },
      {
        title: "Technical modernization",
        text:
          "Performance improvements, frontend cleanup, CMS structure, deployment workflow, tracking, accessibility, and maintainability."
      },
      {
        title: "Integrations and automation",
        text:
          "Connections with forms, CRM, analytics, APIs, email, databases, content workflows, and internal tools."
      },
      {
        title: "Conversion and business workflows",
        text:
          "Lead flows, project request forms, service/solution pages, trust elements, routing logic, and measurable calls to action."
      }
    ],
    outputs: ["Cleaner structure", "Better maintainability", "More useful business workflows"],
    workflow: [
      "Audit the current website, CMS, content structure, performance, and integrations.",
      "Define what the upgraded site should support operationally.",
      "Redesign the information architecture, content model, and core templates.",
      "Build technical, CMS, automation, and integration improvements.",
      "Launch the upgraded site and monitor structure, performance, and conversion paths."
    ],
    useCases: [
      "Turn a brochure website into a structured corporate platform.",
      "Improve a WordPress site with custom content models and integrations.",
      "Rebuild content architecture for SEO and scalable publishing.",
      "Connect forms, CRM, analytics, and automation workflows.",
      "Modernize an old site without positioning it as a rebrand story."
    ],
    related: ["Web & Product Development", "WordPress & API Integrations", "SEO & Content Infrastructure"]
  },
  {
    title: "Build a Data/Monitoring System",
    slug: "build-data-monitoring-system",
    icon: "monitor",
    summary:
      "A solution for teams that need current visibility into competitors, prices, rankings, catalogs, SERPs, or operational signals.",
    intro:
      "This solution starts from a visibility problem: important data changes outside the team's view or arrives too late to support decisions. AlfaRank scopes a monitoring route that turns sources into validated records, alerts, dashboards, reports, and decision-ready signals.",
    details: [
      "Important market or operational data changes faster than the team can check it",
      "Sources are scattered across websites, feeds, APIs, files, SERPs, or internal tools",
      "Manual checks do not create history, alerts, or reusable reports",
      "Teams need dashboards and issue lists tied to decisions"
    ],
    modules: [
      {
        title: "Source and signal mapping",
        text:
          "Definition of the data sources, entities, metrics, fields, update frequency, reliability requirements, and business decisions the system should support."
      },
      {
        title: "Collection layer",
        text:
          "Scraping, API connectors, feed processors, file imports, scheduled jobs, and validation checks for data collection."
      },
      {
        title: "Processing and storage",
        text:
          "Cleaning, matching, deduplication, normalization, scoring, historical storage, and structured access to collected data."
      },
      {
        title: "Dashboards and alerts",
        text:
          "Interfaces, reports, exports, alerting rules, issue lists, and monitoring views for business users."
      }
    ],
    outputs: ["Current market visibility", "Automated checks", "Decision-ready alerts and reports", "Reusable monitoring history"],
    workflow: [
      "Define which changes matter, who needs to act on them, and how late is too late.",
      "Map sources, entities, fields, update frequency, and reliability requirements.",
      "Build collection, validation, normalization, and storage logic.",
      "Create dashboards, alerts, reports, or ranking/scoring views.",
      "Improve source coverage, data quality, and business usefulness."
    ],
    useCases: [
      "Monitor competitor pricing, availability, content, catalogs, or changes.",
      "Track SERP results, rankings, search visibility, or indexation status.",
      "Build audit systems for websites, pages, products, listings, or campaigns.",
      "Create alerts for operational changes or data quality issues.",
      "Generate recurring business reports from external and internal data."
    ],
    related: ["Data Systems & Scraping", "Build Internal Tools", "E-commerce Systems"]
  },
  {
    title: "Scale SEO Infrastructure",
    slug: "scale-seo-infrastructure",
    icon: "scale",
    summary:
      "A solution for companies whose organic growth needs structured page systems, templates, publishing controls, and measurement loops.",
    intro:
      "This solution starts from an organic growth bottleneck: the business needs more search coverage, but the site architecture, page types, templates, internal linking, and publishing process cannot scale cleanly. AlfaRank turns SEO into an operating route with data structures, QA, monitoring, and improvement loops.",
    details: [
      "Search coverage is limited by site structure, not only by content volume",
      "Page types, templates, and data sources need to scale together",
      "Internal linking, metadata, and QA need repeatable rules",
      "Publishing and monitoring need to feed an improvement loop"
    ],
    modules: [
      {
        title: "Organic growth model",
        text:
          "Target page groups, search demand, business priority, data availability, and current structural blockers are mapped before production scales."
      },
      {
        title: "Page system and templates",
        text:
          "Page types, templates, content variables, taxonomy, internal linking rules, metadata patterns, and navigation are designed as one system."
      },
      {
        title: "Technical and content QA",
        text:
          "Checks for indexation, metadata, schema, internal links, duplicate patterns, content completeness, template quality, and crawlability."
      },
      {
        title: "Monitoring and improvement loop",
        text:
          "Rank tracking, indexing checks, content gap analysis, performance signals, issue queues, and prioritized improvement workflows keep the system moving."
      }
    ],
    outputs: ["Scalable page systems", "Structured publishing controls", "Measurable organic growth infrastructure"],
    workflow: [
      "Define the organic growth model, target page groups, and structural blockers.",
      "Design site architecture, templates, content models, and data relationships.",
      "Build publishing workflows and CMS/static-site structures.",
      "Add technical QA, metadata, internal linking, and monitoring.",
      "Use performance signals to prioritize updates, fixes, and new page groups."
    ],
    useCases: [
      "Scale landing pages for locations, services, products, categories, or data entities.",
      "Create programmatic SEO pages from structured data without losing QA control.",
      "Fix site architecture before increasing content production.",
      "Connect AI-assisted content workflows to templates and editorial review.",
      "Use rankings, indexation, content quality, and technical issues to drive updates."
    ],
    related: ["SEO & Content Infrastructure", "Generate More Content", "WordPress & API Integrations"]
  }
];

export const systems: PageItem[] = [
  {
    title: "Business Workflow System",
    slug: "business-workflow-system",
    icon: "space",
    summary:
      "A structured workspace for requests, tasks, approvals, files, dashboards, automations, and operating output.",
    intro:
      "Business Workflow System is a profile for teams whose work is spread across requests, files, chats, spreadsheets, approvals, and recurring tasks. The system turns that loose process into a workspace with defined objects, statuses, owners, role dashboards, automation hooks, reports, and controlled handoff.",
    details: [
      "Request, client, task, file, approval, owner, deadline, and output objects",
      "Queues and dashboards for operators, reviewers, managers, clients, or partners",
      "Status logic for intake, processing, review, correction, approval, and delivery",
      "Automation hooks for reminders, QA checks, imports, exports, reports, and handoff"
    ],
    modules: [
      {
        title: "Operating model and entities",
        text:
          "The system starts by defining the real objects of the workflow: requests, clients, tasks, files, content items, approvals, statuses, owners, deadlines, and delivered outputs."
      },
      {
        title: "Workspace and queue interface",
        text:
          "Dashboards, intake lists, kanban stages, detail screens, review panels, filters, and role views make daily work visible and easier to control."
      },
      {
        title: "Rules, permissions, and automation",
        text:
          "Permissions, status changes, notifications, validations, AI-assisted drafts, imports, exports, and recurring checks reduce repeated manual coordination."
      },
      {
        title: "Reporting and delivery outputs",
        text:
          "The system produces summaries, client-ready deliverables, internal reports, exports, bottleneck signals, and handoff records for the next step."
      }
    ],
    outputs: ["Workflow workspace", "Request and task control", "Approval and delivery queues", "Operational reports"],
    workflow: [
      "Map the current workflow, roles, objects, files, approvals, and recurring handoffs.",
      "Define statuses, permissions, required fields, ownership rules, and the screens each role needs.",
      "Build the first workspace with intake, queues, detail views, review points, and delivery outputs.",
      "Connect automation, AI assistance, imports, exports, reports, or integrations where the process repeats.",
      "Use reports and operating signals to improve speed, ownership, quality, and delivery reliability."
    ],
    useCases: [
      "Service delivery workspace for requests, owners, deadlines, and client-ready outputs.",
      "Internal operations console for tasks, approvals, files, and recurring handoffs.",
      "Content, document, asset, or data review hub with controlled statuses.",
      "Partner or client workspace for intake, review, correction, and delivery.",
      "Productized service workflow where repeated work needs measurable output."
    ],
    related: ["Web & Product Development", "Build Internal Tools", "AI Automation"]
  },
  {
    title: "AI Media Production System",
    slug: "ai-media-production-system",
    icon: "lens",
    summary:
      "A controlled system for turning briefs, scripts, products, articles, prompts, and assets into reviewed media outputs.",
    intro:
      "AI Media Production System is a profile for content teams that need repeatable output without losing editorial or brand control. It organizes briefs, scripts, prompts, source assets, template rules, generation steps, review states, export variants, storage, metadata, and publishing queues.",
    details: [
      "Brief, script, product, article, prompt, and source asset intake",
      "Generation pipeline for scenes, captions, thumbnails, audio notes, and variants",
      "Template and brand rules for formats, safe zones, naming, and reusable assets",
      "Human review states before export, storage, publication, or platform handoff"
    ],
    modules: [
      {
        title: "Source intake and production brief",
        text:
          "Collects scripts, article text, product data, prompts, source media, brand constraints, language, aspect ratio, rights notes, and publication target before generation starts."
      },
      {
        title: "Generation and variant pipeline",
        text:
          "Turns structured inputs into draft scenes, captions, thumbnails, voice or audio notes, metadata, short-form cuts, format variants, and review-ready media drafts."
      },
      {
        title: "Template and brand control",
        text:
          "Keeps reusable formats, visual rules, naming, export sizes, safe zones, intros, outros, caption styles, and asset storage consistent across batches."
      },
      {
        title: "Review, export, and publishing queue",
        text:
          "Adds approval statuses, corrections, final exports, CMS or platform handoff, storage paths, metadata, and reporting on production speed and quality."
      }
    ],
    outputs: ["Reviewed media drafts", "Controlled generation pipeline", "Template-based asset system", "Publishing-ready exports"],
    workflow: [
      "Define the repeatable media format, source material, brand constraints, and publishing target.",
      "Structure briefs, prompts, templates, asset rules, review criteria, and export requirements.",
      "Generate drafts and variants through controlled pipeline steps instead of one-off manual prompts.",
      "Route outputs through review, correction, approval, final export, storage, and platform handoff.",
      "Measure speed, quality, correction reasons, and performance signals to improve the next batch."
    ],
    useCases: [
      "Article-to-video, product-to-video, or script-to-video production with review.",
      "Short-form social asset production where templates and brand rules matter.",
      "Thumbnail, caption, metadata, voice note, and format variant generation.",
      "Media approval workspace for editors, reviewers, operators, or clients.",
      "Publishing queue for generated video, visual, audio, or social assets."
    ],
    related: ["Video & Media Automation", "AI Automation", "Generate More Content"]
  },
  {
    title: "Content Automation Workflows",
    slug: "content-automation-workflows",
    icon: "flow",
    summary:
      "A system profile for operating content production through inputs, queues, roles, review states, CMS handoff, and monitoring.",
    intro:
      "Content Automation Workflows is not the promise to publish more content; it is the operating profile behind that promise. The system defines the objects, queues, roles, statuses, checks, and handoff points that let repeated content production move from source inputs to approved CMS-ready output.",
    details: [
      "Topic, entity, source, brief, and template objects",
      "Generation queue, enrichment queue, review queue, and publishing queue",
      "Roles for editors, reviewers, operators, and owners",
      "Status, QA, approval, update, and monitoring states"
    ],
    modules: [
      {
        title: "Input objects",
        text:
          "Topics, keyword groups, entities, products, services, locations, briefs, source files, templates, and metadata fields become structured objects."
      },
      {
        title: "Production queues",
        text:
          "Draft generation, enrichment, media preparation, metadata, internal links, and formatting move through visible queues instead of scattered tasks."
      },
      {
        title: "Review and approval states",
        text:
          "Editors and reviewers use statuses, QA checks, corrections, approvals, and manual overrides before content can leave the system."
      },
      {
        title: "CMS handoff and update loop",
        text:
          "Approved items move into CMS handoff, publishing queues, indexation checks, performance monitoring, and update queues."
      }
    ],
    outputs: ["Content production operating model", "Controlled draft and review queues", "CMS-ready publishing handoff", "Monitoring and update loop"],
    workflow: [
      "Define the content objects, roles, queues, and states the system must manage.",
      "Build input structures for topics, sources, briefs, templates, and metadata.",
      "Connect generation, enrichment, review, approval, and correction steps.",
      "Move approved output into CMS handoff, publishing queue, monitoring, and update logic.",
      "Use queue health, quality checks, indexation, and performance signals to improve the next cycle."
    ],
    useCases: [
      "Operating model for programmatic SEO production.",
      "Editorial queue for AI-assisted blog, guide, or landing-page drafts.",
      "Product, category, location, or entity content production pipeline.",
      "Approval workflow for teams that need controlled publishing.",
      "Monitoring and update queue for already published content."
    ],
    related: ["Generate More Content", "SEO & Content Infrastructure", "AI Automation"]
  },
  {
    title: "E-commerce System",
    slug: "ecommerce-system",
    icon: "commerce",
    summary:
      "A system profile for managing catalog operations through product data, feeds, content, stock/pricing signals, integrations, and reports.",
    intro:
      "E-commerce System is the operating profile for a product catalog. It shows how product data, attributes, feed rules, content fields, stock and pricing signals, marketplace exports, monitoring, and reporting can work as one catalog operations system.",
    details: [
      "Product data model and catalog governance",
      "Feed import, export, validation, and synchronization",
      "Product/category content fields and SEO templates",
      "Stock, pricing, availability, quality, and reporting signals"
    ],
    modules: [
      {
        title: "Catalog data model",
        text:
          "Products, categories, attributes, filters, media fields, metadata, validation rules, and ownership define the catalog operating base."
      },
      {
        title: "Feed and integration workflow",
        text:
          "Imports, exports, transformations, marketplace feeds, advertising feeds, CRM connections, warehouse data, and API synchronization run through controlled rules."
      },
      {
        title: "Product content layer",
        text:
          "Product descriptions, category copy, landing templates, metadata patterns, internal links, and publishing states are tied to catalog data."
      },
      {
        title: "Monitoring and reporting",
        text:
          "Dashboards and alerts track stock, prices, availability, feed issues, missing fields, content gaps, performance signals, and operational changes."
      }
    ],
    outputs: ["Catalog operations model", "Product feed control", "Commerce monitoring and reports"],
    workflow: [
      "Audit the current store, catalog, CMS, product data, and integrations.",
      "Design the product data model and operating workflow.",
      "Build feed, content, monitoring, and automation modules.",
      "Connect required APIs, analytics, CRM, marketplace, or reporting tools.",
      "Validate catalog quality and improve the workflow based on real operations."
    ],
    useCases: [
      "Product catalog restructuring.",
      "Marketplace or advertising feed generation.",
      "Product/category content workflows.",
      "Pricing, stock, or competitor monitoring.",
      "E-commerce dashboard and reporting systems."
    ],
    related: ["E-commerce Systems", "Data Systems & Scraping", "SEO & Content Infrastructure"]
  },
  {
    title: "WordPress Tools",
    slug: "wordpress-tools",
    icon: "api",
    summary:
      "A system profile for WordPress admin tools, content objects, publishing queues, integrations, and operational utilities.",
    intro:
      "WordPress Tools is not a general website upgrade offer. It is a system profile for the controlled tooling layer inside or around WordPress: content objects, admin utilities, import/export screens, publishing queues, API connections, CRM/form handoff, automation, and operational views.",
    details: [
      "Content objects, fields, taxonomies, templates, and editorial states",
      "Admin utilities, import/export tools, bulk actions, and review screens",
      "API, CRM, form, analytics, and database handoff",
      "Publishing queues, automation hooks, reports, and operating views"
    ],
    modules: [
      {
        title: "Custom content structures",
        text:
          "Post types, taxonomies, fields, templates, editorial states, metadata, and content relationships define the objects WordPress should manage."
      },
      {
        title: "Admin tools and workflows",
        text:
          "Custom dashboards, import/export screens, review panels, bulk actions, editorial utilities, logs, and internal operating views make the process usable."
      },
      {
        title: "API and automation layer",
        text:
          "Connections with CRMs, forms, analytics, external APIs, databases, AI workflows, notifications, and automation tools."
      },
      {
        title: "Publishing infrastructure",
        text:
          "Programmatic pages, content queues, AI-assisted drafts, metadata systems, quality checks, and controlled publishing flows."
      }
    ],
    outputs: ["WordPress operating tools", "Connected CMS workflows", "Controlled admin utilities"],
    workflow: [
      "Audit the current WordPress setup, plugins, content model, and integrations.",
      "Define what workflow WordPress needs to support.",
      "Design custom content structures, admin tools, and API connections.",
      "Build the tools and connect automation or publishing workflows.",
      "Document the system and prepare it for ongoing content or business operations."
    ],
    useCases: [
      "Custom WordPress admin tools.",
      "CRM, form, API, or database integrations.",
      "Programmatic SEO structures in WordPress.",
      "AI-assisted publishing workflows.",
      "Replacing fragile plugin chains with controlled custom logic."
    ],
    related: ["WordPress & API Integrations", "SEO & Content Infrastructure", "Automate Lead Processing"]
  },
  {
    title: "Data/Audit/Ranking Systems",
    slug: "data-audit-ranking-systems",
    icon: "ranking",
    summary:
      "A system profile for turning collected data into scores, audits, rankings, issue lists, alerts, and recurring reports.",
    intro:
      "Data/Audit/Ranking Systems is not general data collection. It is the evaluation profile that sits on top of collected and normalized data: scoring rules, audit checks, ranking logic, issue detection, dashboards, alerts, and recurring reports.",
    details: [
      "Scoring rules, weights, thresholds, and confidence signals",
      "Audit checks for pages, products, listings, campaigns, or entities",
      "Ranking logic, issue detection, and recommendation rules",
      "Scorecards, dashboards, exports, alerts, and recurring reports"
    ],
    modules: [
      {
        title: "Data collection layer",
        text:
          "Scrapers, APIs, feeds, file imports, manual inputs, scheduled jobs, and validation logic provide the structured input for evaluation."
      },
      {
        title: "Normalization and matching",
        text:
          "Cleaning, deduplication, entity matching, field mapping, tagging, grouping, historical storage, and data quality checks."
      },
      {
        title: "Audit and scoring logic",
        text:
          "Rules, weights, thresholds, AI-assisted checks, ranking models, issue detection, and recommendation logic."
      },
      {
        title: "Reporting and dashboard layer",
        text:
          "Views, filters, exports, recurring reports, alerts, audit summaries, scorecards, and decision-ready dashboards."
      }
    ],
    outputs: ["Audit system", "Ranking and scoring logic", "Decision-ready reports"],
    workflow: [
      "Define what needs to be evaluated, monitored, ranked, or audited.",
      "Map data sources, entities, fields, rules, and output requirements.",
      "Build collection, normalization, scoring, and storage logic.",
      "Create dashboards, exports, alerts, or recurring reports.",
      "Validate the system against real cases and refine the scoring model."
    ],
    useCases: [
      "Website, SEO, or content audits.",
      "Product, listing, location, or competitor ranking systems.",
      "SERP, marketplace, catalog, or pricing monitoring.",
      "Data quality dashboards and issue reports.",
      "Recurring audit reports for agencies or internal teams."
    ],
    related: ["Data Systems & Scraping", "Build a Data/Monitoring System", "Build Internal Tools"]
  }
];

export const industries: PageItem[] = [
  {
    title: "Service Businesses",
    slug: "service-businesses",
    icon: "lead",
    summary: "Industry context for companies where response speed, lead routing, service pages, CRM follow-up, and delivery visibility drive revenue."
  },
  {
    title: "E-commerce",
    slug: "ecommerce",
    icon: "commerce",
    summary: "Industry context for catalog-heavy businesses: product data quality, feeds, marketplaces, stock/pricing movement, and content operations."
  },
  {
    title: "Media & Content Projects",
    slug: "media-content-projects",
    icon: "media",
    summary: "Industry context for teams whose output depends on editorial planning, production queues, publishing cadence, media assets, and performance feedback."
  },
  {
    title: "Travel",
    slug: "travel",
    icon: "map",
    summary: "Industry context for destination catalogs, availability data, programmatic pages, source monitoring, and structured travel content."
  },
  {
    title: "Local Business",
    slug: "local-business",
    icon: "local",
    summary: "Industry context for local search demand, service landing pages, reviews, listing signals, lead flow, and simple CRM handoff."
  },
  {
    title: "SaaS / MVP",
    slug: "saas-mvp",
    icon: "product",
    summary: "Industry context for MVP scope, product interfaces, onboarding, user roles, dashboards, data models, and iteration loops."
  },
  {
    title: "Agencies",
    slug: "agencies",
    icon: "flow",
    summary: "Industry context for agencies that need white-label reporting, client dashboards, content production systems, and internal workflow tooling."
  },
  {
    title: "Data-heavy Businesses",
    slug: "data-heavy-businesses",
    icon: "data",
    summary: "Industry context for organizations with many sources, changing entities, normalization pressure, alerts, dashboards, and recurring reports."
  }
];

export const technologies = [
  "WordPress",
  "Astro",
  "Next.js",
  "APIs",
  "AI models",
  "Automation tools",
  "Scraping",
  "Data processing",
  "Video generation",
  "Analytics",
  "CRM integrations",
  "Cloudflare Pages",
  "GitHub"
];
