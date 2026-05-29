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
      "AI workflows that reduce manual work, accelerate content and data operations, and connect business systems into repeatable processes.",
    intro:
      "AI automation at AlfaRank is not a layer of isolated prompts. It is a way to design controlled workflows where AI models, business rules, data sources, CMS tools, CRMs, and human review work together. The result is a system that can produce, classify, enrich, monitor, or route work with less manual effort and more consistency.",
    details: [
      "Content generation and review workflows",
      "Lead enrichment, routing, and follow-up logic",
      "Reporting, research, and data processing assistants",
      "Human-in-the-loop automation for controlled output"
    ],
    modules: [
      {
        title: "Content and publishing workflows",
        text:
          "Systems that turn topics, entities, product data, briefs, or templates into draft content, enriched media, editorial tasks, and CMS-ready output."
      },
      {
        title: "Lead and CRM automation",
        text:
          "Workflows for processing form submissions, classifying requests, enriching lead data, assigning owners, updating CRM records, and triggering follow-up actions."
      },
      {
        title: "Research and data assistants",
        text:
          "AI-assisted tools for summarizing datasets, preparing reports, monitoring sources, extracting structured information, and supporting internal decisions."
      },
      {
        title: "Human-in-the-loop control",
        text:
          "Review states, approval steps, logs, confidence checks, and manual override points are designed into the system when output quality matters."
      }
    ],
    outputs: [
      "Automated workflows",
      "AI-assisted operating processes",
      "Connected CRM, CMS, and database actions",
      "Repeatable content, lead, data, or reporting pipelines"
    ],
    workflow: [
      "Identify repeated manual work and define what output should be automated.",
      "Map the required inputs: website data, CRM records, CMS content, files, APIs, prompts, and business rules.",
      "Design the automation flow with states, validation, review, and fallback logic.",
      "Connect the flow to the systems where the work actually happens.",
      "Measure accuracy, speed, and operational impact after launch."
    ],
    useCases: [
      "Generate and review content for large publishing workflows.",
      "Classify and route incoming leads by project type or urgency.",
      "Summarize research, scraped data, audit results, or monitoring signals.",
      "Prepare drafts, reports, internal notes, and structured records from raw inputs.",
      "Connect AI actions with WordPress, CRMs, databases, spreadsheets, and APIs."
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
      "Search and content systems based on data, templates, publishing workflows, and scalable site architecture.",
    intro:
      "SEO and content infrastructure at AlfaRank is not packaged as a list of isolated optimization tasks. It is the design of a content system: data sources, page types, templates, publishing workflows, internal linking logic, metadata, quality control, and monitoring.",
    details: [
      "Programmatic SEO structures",
      "Content databases and template systems",
      "Publishing pipelines for CMS and static sites",
      "Quality checks, metadata, and monitoring workflows"
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
        title: "Publishing workflows",
        text:
          "Processes for briefs, AI-assisted drafts, editorial review, CMS publishing, quality checks, updates, and monitoring."
      },
      {
        title: "Content performance layer",
        text:
          "Tracking systems for indexation, rankings, content gaps, page quality, structured data, and improvement priorities."
      }
    ],
    outputs: ["Content infrastructure", "Publishing pipelines", "Scalable SEO systems"],
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
      "Systems for collecting, normalizing, monitoring, auditing, and ranking business data from multiple sources.",
    intro:
      "Data systems and scraping work is focused on turning external or internal information into structured business signals. AlfaRank designs systems that collect data, clean it, store it, monitor changes, score entities, generate reports, and trigger actions.",
    details: [
      "Scraping and structured data collection",
      "Monitoring tools for competitors, catalogs, SERPs, and marketplaces",
      "Audit and ranking systems",
      "Dashboards, alerts, exports, and reporting"
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
          "Systems that track changes in competitors, prices, catalogs, rankings, SERPs, availability, reviews, or other business signals."
      },
      {
        title: "Audit, scoring, and reporting",
        text:
          "Rules and dashboards that turn raw data into scores, rankings, issue lists, recommendations, exports, and recurring reports."
      }
    ],
    outputs: ["Monitoring systems", "Data pipelines", "Audit and ranking tools"],
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
      "Catalog, feed, content, pricing, stock, and integration infrastructure for e-commerce operations.",
    intro:
      "E-commerce systems at AlfaRank are focused on the operational layer behind online sales: product data, catalogs, feeds, content, stock, pricing, integrations, analytics, and repeatable workflows. The goal is to make the store easier to manage, scale, monitor, and connect with other business systems.",
    details: [
      "Product catalog and content workflows",
      "Feed generation and integrations",
      "Pricing, stock, and availability monitoring",
      "Analytics and operational dashboards"
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
    outputs: ["Catalog infrastructure", "Feed systems", "E-commerce automation"],
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
      "Automated media workflows for video, content production, asset generation, and repeatable publishing processes.",
    intro:
      "Video and media automation focuses on turning repeatable creative production into a controlled system. AlfaRank can design workflows for generating, processing, enriching, reviewing, exporting, and publishing media assets using templates, AI tools, structured inputs, and automation logic.",
    details: [
      "Video and content generation pipelines",
      "Asset preparation and enrichment",
      "Template-based production workflows",
      "Publishing and review automation"
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
      "WordPress-based systems, custom integrations, API connections, publishing tools, and business automation layers.",
    intro:
      "WordPress and API integrations at AlfaRank treat WordPress as a business platform, not only a website CMS. The work can include custom content structures, admin tools, API connections, CRM workflows, automation, publishing systems, and operational interfaces built around WordPress.",
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
      "Build a content production system that turns topics, data, templates, and review workflows into publishable output.",
    intro:
      "This solution is for companies that need more content without turning production into uncontrolled manual work. AlfaRank designs content systems that combine topic databases, templates, AI-assisted drafting, editorial review, media preparation, CMS publishing, and performance monitoring.",
    details: [
      "Topic, keyword, and entity databases",
      "AI-assisted draft generation",
      "Editorial review and QA workflow",
      "CMS publishing pipeline and monitoring"
    ],
    modules: [
      {
        title: "Content input system",
        text:
          "Topic lists, keyword groups, entities, products, locations, briefs, templates, and source data organized before production starts."
      },
      {
        title: "Generation and enrichment",
        text:
          "AI-assisted drafts, outlines, metadata, media prompts, structured sections, internal links, and content variants generated from controlled inputs."
      },
      {
        title: "Editorial workflow",
        text:
          "Review states, QA checks, approval logic, corrections, versioning, and final publishing preparation."
      },
      {
        title: "Publishing and monitoring",
        text:
          "CMS-ready output, publishing queues, indexation checks, performance tracking, and improvement loops."
      }
    ],
    outputs: ["Higher publishing capacity", "Controlled quality", "Repeatable content operations"],
    workflow: [
      "Define the content types and publishing volume needed.",
      "Create the topic, data, template, and brief structure.",
      "Build AI-assisted generation and enrichment workflows.",
      "Add editorial review, QA, and approval stages.",
      "Connect publishing and monitoring systems."
    ],
    useCases: [
      "Scale blog, guide, landing, product, category, or location content.",
      "Create programmatic content from structured data.",
      "Support editors with AI-assisted drafts and QA steps.",
      "Build a CMS publishing pipeline for repeated content formats.",
      "Monitor content quality, indexation, rankings, and updates."
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
      "Create systems that track competitors, prices, rankings, catalogs, content, SERPs, or operational signals.",
    intro:
      "This solution is for companies that need better visibility into changing data. AlfaRank builds monitoring systems that collect information from websites, APIs, feeds, SERPs, catalogs, or internal sources, then turn it into alerts, dashboards, reports, scores, and decisions.",
    details: [
      "Data source mapping",
      "Scraping, API, or feed collection",
      "Normalization and storage",
      "Dashboards, alerts, and reports"
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
    outputs: ["Current market visibility", "Automated checks", "Decision-ready reports"],
    workflow: [
      "Define what should be monitored and why it matters.",
      "Map the available sources and the structure of the data.",
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
      "Build the site architecture, data structures, templates, and publishing workflows needed for scalable organic growth.",
    intro:
      "This solution is for companies that need organic growth to come from a structured system rather than disconnected SEO tasks. AlfaRank designs the architecture, templates, data structures, publishing workflows, and monitoring layer needed to scale SEO infrastructure.",
    details: [
      "Programmatic page structures",
      "Content templates and data sources",
      "Technical SEO and internal linking logic",
      "Publishing, monitoring, and improvement cycles"
    ],
    modules: [
      {
        title: "Information architecture",
        text:
          "Page types, site structure, taxonomy, internal linking, navigation, templates, and content relationships."
      },
      {
        title: "Programmatic publishing layer",
        text:
          "Data-driven page creation, reusable layouts, content variables, metadata patterns, and automated publishing logic."
      },
      {
        title: "Technical and content QA",
        text:
          "Checks for indexation, metadata, schema, internal links, duplicate patterns, content completeness, and page quality."
      },
      {
        title: "Monitoring and improvement loop",
        text:
          "Rank tracking, indexing checks, content gap analysis, performance signals, and prioritized improvement workflows."
      }
    ],
    outputs: ["Scalable page systems", "Structured publishing", "Measurable organic growth infrastructure"],
    workflow: [
      "Define the organic growth model and target page groups.",
      "Design site architecture, templates, content models, and data relationships.",
      "Build publishing workflows and CMS/static-site structures.",
      "Add technical QA, metadata, internal linking, and monitoring.",
      "Use performance signals to improve the system continuously."
    ],
    useCases: [
      "Scale landing pages for locations, services, products, categories, or data entities.",
      "Create programmatic SEO pages from structured data.",
      "Improve an existing site architecture before content production scales.",
      "Build AI-assisted content workflows with editorial control.",
      "Monitor rankings, indexation, content quality, and technical issues."
    ],
    related: ["SEO & Content Infrastructure", "Generate More Content", "WordPress & API Integrations"]
  }
];

export const systems: PageItem[] = [
  {
    title: "WhiteSpace",
    slug: "whitespace",
    icon: "space",
    summary:
      "A system profile for structured business workflows, content infrastructure, or productized operational modules.",
    intro:
      "WhiteSpace is presented as a system profile for business workflows that need structure, data, content, automation, and operational visibility. The exact implementation can vary by use case, but the profile demonstrates how AlfaRank thinks about productized systems rather than isolated tasks.",
    details: [
      "System overview and module map",
      "Business context and workflow",
      "Technology layer and integrations",
      "Outputs, use cases, and related capabilities"
    ],
    modules: [
      {
        title: "Workflow structure",
        text:
          "A mapped process with inputs, statuses, roles, actions, approvals, and outputs instead of scattered manual work."
      },
      {
        title: "Data and content layer",
        text:
          "Structured records, content fields, metadata, files, entities, or operational objects that can be reused by different parts of the system."
      },
      {
        title: "Automation layer",
        text:
          "Triggered actions, AI-assisted steps, notifications, imports, exports, checks, or API connections that reduce repeated manual work."
      },
      {
        title: "Interface layer",
        text:
          "Dashboards, admin screens, review surfaces, status views, and user-facing pages that make the workflow usable."
      }
    ],
    outputs: ["Structured workflow", "Operational visibility", "Reusable system modules"],
    workflow: [
      "Define the business process and what output the system should create.",
      "Map the objects, data, users, states, and actions involved.",
      "Build the interface and operational workflow.",
      "Connect automation, content, APIs, or reporting where useful.",
      "Measure how the system improves speed, quality, or visibility."
    ],
    useCases: [
      "Internal workflow systems.",
      "Productized service platforms.",
      "Content or data operations dashboards.",
      "Review, approval, and reporting tools.",
      "Business process automation systems."
    ],
    related: ["Web & Product Development", "Build Internal Tools", "AI Automation"]
  },
  {
    title: "SOVA / Vidorix",
    slug: "sova-vidorix",
    icon: "lens",
    summary:
      "AI, video, content, and media automation profile focused on repeatable generation and production workflows.",
    intro:
      "SOVA / Vidorix is a system profile for AI-assisted content, video, and media production workflows. The system direction is based on repeatable generation, structured inputs, templates, review stages, and controlled publishing or export flows.",
    details: [
      "Media workflow structure",
      "Generation and review stages",
      "Template and asset handling",
      "Publishing or export outputs"
    ],
    modules: [
      {
        title: "Input and brief structure",
        text:
          "Scripts, prompts, product data, article content, media assets, brand rules, and generation parameters organized before production."
      },
      {
        title: "Generation pipeline",
        text:
          "AI-assisted steps for drafts, scenes, captions, media variations, thumbnails, metadata, or structured production assets."
      },
      {
        title: "Template and asset system",
        text:
          "Reusable formats, layout rules, brand assets, export sizes, media naming, storage logic, and version handling."
      },
      {
        title: "Review and publishing flow",
        text:
          "Status tracking, approval steps, corrections, final export, publishing queues, or CMS/platform integration."
      }
    ],
    outputs: ["Media production workflow", "AI-assisted generation pipeline", "Controlled review process"],
    workflow: [
      "Define the repeatable media output and source inputs.",
      "Create generation templates, prompts, and asset rules.",
      "Add review, approval, and correction stages.",
      "Prepare export, publishing, or storage workflows.",
      "Measure production speed, consistency, and review quality."
    ],
    useCases: [
      "Video generation from articles, scripts, or product data.",
      "Repeatable social or media asset production.",
      "Content-to-video workflows.",
      "Media review and approval systems.",
      "Publishing pipelines for generated assets."
    ],
    related: ["Video & Media Automation", "AI Automation", "Generate More Content"]
  },
  {
    title: "Content Automation Workflows",
    slug: "content-automation-workflows",
    icon: "flow",
    summary:
      "A system profile for generating, reviewing, enriching, publishing, and monitoring content at scale.",
    intro:
      "Content Automation Workflows is a system profile for companies that need repeatable content production without losing control over quality. The system combines topic structures, AI-assisted generation, enrichment, review, CMS publishing, and monitoring.",
    details: [
      "Topic and data inputs",
      "AI-assisted generation",
      "Review and quality control",
      "CMS publishing and monitoring"
    ],
    modules: [
      {
        title: "Topic and data inputs",
        text:
          "Keyword groups, entities, products, services, locations, briefs, source data, and templates that define what should be produced."
      },
      {
        title: "Generation and enrichment",
        text:
          "AI-assisted drafts, outlines, metadata, internal links, media prompts, structured sections, and formatting."
      },
      {
        title: "Editorial QA",
        text:
          "Human review stages, quality checks, status tracking, corrections, approvals, and content readiness signals."
      },
      {
        title: "Publishing and monitoring",
        text:
          "CMS publishing, scheduled releases, indexation checks, ranking monitoring, update queues, and performance review."
      }
    ],
    outputs: ["Repeatable content production", "Controlled publishing workflow", "Scalable SEO/content operations"],
    workflow: [
      "Define content types, templates, and target publishing volume.",
      "Build the topic/data input system.",
      "Create AI-assisted generation and enrichment steps.",
      "Add review, QA, and approval logic.",
      "Publish, monitor, and improve based on performance."
    ],
    useCases: [
      "Programmatic SEO content production.",
      "AI-assisted blog or guide workflows.",
      "Product/category/location content generation.",
      "Editorial workflow automation.",
      "CMS publishing and content monitoring."
    ],
    related: ["Generate More Content", "SEO & Content Infrastructure", "AI Automation"]
  },
  {
    title: "E-commerce System",
    slug: "ecommerce-system",
    icon: "commerce",
    summary:
      "Catalog, product content, feed, integration, and monitoring infrastructure for e-commerce operations.",
    intro:
      "E-commerce System is a profile for the operational infrastructure behind online stores and product catalogs. The system connects product data, content, feeds, pricing, availability, integrations, monitoring, and reporting into a more manageable workflow.",
    details: [
      "Product data model",
      "Content and feed workflows",
      "Stock, pricing, and availability logic",
      "Analytics and integrations"
    ],
    modules: [
      {
        title: "Product data model",
        text:
          "Structured products, categories, attributes, filters, metadata, media fields, and rules for maintaining catalog quality."
      },
      {
        title: "Feed and integration workflow",
        text:
          "Imports, exports, transformations, marketplace feeds, advertising feeds, CRM connections, warehouse data, and API synchronization."
      },
      {
        title: "Content and SEO layer",
        text:
          "Product descriptions, category content, landing templates, metadata patterns, internal linking, and publishing logic for organic growth."
      },
      {
        title: "Monitoring and reporting",
        text:
          "Dashboards and alerts for stock, prices, availability, catalog issues, content gaps, performance signals, and operational changes."
      }
    ],
    outputs: ["Catalog operations", "Product feed infrastructure", "E-commerce monitoring"],
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
      "Custom WordPress tools, API connections, content workflows, and admin utilities for business websites.",
    intro:
      "WordPress Tools is a system profile for turning WordPress into a structured business platform. The focus is on custom admin utilities, content models, publishing workflows, API connections, automation, and operational tools that sit inside or around WordPress.",
    details: [
      "Custom content structures",
      "API and CRM integrations",
      "Publishing tools",
      "Operational admin workflows"
    ],
    modules: [
      {
        title: "Custom content structures",
        text:
          "Post types, taxonomies, fields, templates, editorial states, metadata, and content relationships built around the business model."
      },
      {
        title: "Admin tools and workflows",
        text:
          "Custom dashboards, import/export tools, review screens, bulk actions, editorial tools, and internal operating views."
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
    outputs: ["Custom WordPress platform", "Connected CMS workflows", "Operational admin tools"],
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
      "Systems for collecting data, scoring entities, auditing assets, ranking results, and generating reports.",
    intro:
      "Data/Audit/Ranking Systems is a profile for tools that transform raw data into evaluations, scores, rankings, reports, alerts, or operational decisions. These systems are useful when a business needs repeatable analysis instead of manual review.",
    details: [
      "Data collection",
      "Normalization and scoring",
      "Audit and ranking logic",
      "Dashboards and exports"
    ],
    modules: [
      {
        title: "Data collection layer",
        text:
          "Scrapers, APIs, feeds, file imports, manual inputs, scheduled jobs, and validation logic for gathering structured data."
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
    summary: "Lead systems, CRM flows, content infrastructure, websites, and internal tools."
  },
  {
    title: "E-commerce",
    slug: "ecommerce",
    icon: "commerce",
    summary: "Catalog infrastructure, feeds, product content, pricing, analytics, and integrations."
  },
  {
    title: "Media & Content Projects",
    slug: "media-content-projects",
    icon: "media",
    summary: "Editorial workflows, content databases, programmatic publishing, and automation."
  },
  {
    title: "Travel",
    slug: "travel",
    icon: "map",
    summary: "Destination data, catalog structures, availability, scraping, and SEO infrastructure."
  },
  {
    title: "Local Business",
    slug: "local-business",
    icon: "local",
    summary: "Local landing infrastructure, lead automation, monitoring, and review/data workflows."
  },
  {
    title: "SaaS / MVP",
    slug: "saas-mvp",
    icon: "product",
    summary: "MVPs, dashboards, portals, onboarding flows, data models, and integrations."
  },
  {
    title: "Agencies",
    slug: "agencies",
    icon: "flow",
    summary: "White-label systems, reporting automation, content production, and internal tooling."
  },
  {
    title: "Data-heavy Businesses",
    slug: "data-heavy-businesses",
    icon: "data",
    summary: "Collection, normalization, monitoring, alerting, dashboards, and reporting systems."
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
