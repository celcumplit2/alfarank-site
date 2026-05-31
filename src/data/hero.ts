import type { PageItem } from "@/data/site";

type HeroNode = {
  title: string;
  state?: string;
  icon?: string;
  detail?: string;
  meter?: string;
  href?: string;
};

type HeroMetric = {
  value: string;
  label: string;
};

export type HeroVisual = {
  icon?: string;
  label?: string;
  state?: string;
  mode?: string;
  output?: string;
  coreHref?: string;
  nodes?: HeroNode[];
  metrics?: HeroMetric[];
};

type CollectionVisualOptions = {
  mode: string;
  icon: string;
  label: string;
  state: string;
  output: string;
  primaryMetric: string;
  secondaryMetric: string;
};

const meterFor = (value: string, index: number) =>
  `${64 + ((value.length * 7 + index * 11) % 30)}%`;

const shortDetail = (value?: string) => {
  if (!value) return undefined;

  return value
    .replace("AI-assisted", "AI")
    .replace("operating processes", "ops")
    .replace("operations", "ops")
    .replace("infrastructure", "infra")
    .replace("production", "production")
    .replace("workflow", "flow")
    .replace("workflows", "flows")
    .split(/[.,:;]/)[0]
    .split(/\s+/)
    .slice(0, 3)
    .join(" ");
};

const stateSets: Record<string, string[]> = {
  capability: ["Input", "Workflow", "Control", "Output", "Loop"],
  solution: ["Problem", "Process", "Connect", "Deliver", "Measure"],
  "system-profile": ["Input", "Module", "Automation", "Interface", "Output"],
  capabilities: ["Build", "Connect", "Automate", "Launch", "Improve"],
  solutions: ["Need", "Flow", "System", "Result", "Proof"],
  systems: ["Profile", "Modules", "Workflow", "Output", "Reuse"],
  industries: ["Market", "Workflow", "Data", "System", "Growth"]
};

const fallbackIcons = ["data", "flow", "tools", "api", "ranking"];

const detailByIcon: Record<string, string> = {
  ai: "AI layer",
  web: "Web layer",
  content: "Content layer",
  data: "Data layer",
  commerce: "Commerce layer",
  media: "Media pipeline",
  api: "API layer",
  lead: "Lead flow",
  tools: "Tooling layer",
  product: "Product layer",
  monitor: "Monitoring layer",
  scale: "Growth layer",
  space: "System space",
  lens: "Review lens",
  flow: "Workflow layer",
  ranking: "Scoring layer",
  map: "Market map",
  local: "Local layer"
};

const collectionPathByMode: Record<string, string> = {
  capabilities: "/capabilities/",
  solutions: "/solutions/",
  systems: "/systems/",
  industries: "/industries/"
};

const itemPathByMode: Record<string, string> = {
  capability: "/capabilities/",
  solution: "/solutions/",
  "system-profile": "/systems/"
};

const moduleSectionByMode: Record<string, string> = {
  capability: "#capability-modules",
  solution: "#solution-modules",
  "system-profile": "#system-modules"
};

const moduleNodes = (item: PageItem, mode: string): HeroNode[] => {
  const states = stateSets[mode] ?? stateSets.capability;
  const modules = item.modules?.slice(0, 5) ?? [];
  const href = moduleSectionByMode[mode] ?? `${itemPathByMode[mode] ?? "/"}${item.slug}/`;

  if (modules.length) {
    return modules.map((module, index) => ({
      title: module.title,
      state: states[index % states.length],
      icon: index === 0 ? item.icon : fallbackIcons[index % fallbackIcons.length],
      detail: shortDetail(item.outputs?.[index % (item.outputs.length || 1)] ?? item.details?.[index]),
      meter: meterFor(module.title, index),
      href
    }));
  }

  return (item.details ?? []).slice(0, 5).map((detail, index) => ({
    title: detail,
    state: states[index % states.length],
    icon: index === 0 ? item.icon : fallbackIcons[index % fallbackIcons.length],
    detail: shortDetail(item.outputs?.[index % (item.outputs.length || 1)]),
    meter: meterFor(detail, index),
    href
  }));
};

export const itemHeroVisual = (item: PageItem, mode: "capability" | "solution" | "system-profile"): HeroVisual => ({
  mode,
  icon: item.icon,
  label: item.title,
  state: `${item.modules?.length ?? item.details?.length ?? 0} modules mapped`,
  output: item.outputs?.[0] ?? item.summary,
  coreHref: `${itemPathByMode[mode]}${item.slug}/`,
  nodes: moduleNodes(item, mode),
  metrics: [
    { value: String(item.modules?.length ?? item.details?.length ?? 0).padStart(2, "0"), label: "Modules" },
    { value: String(item.outputs?.length ?? 0).padStart(2, "0"), label: "Outputs" },
    { value: String(item.useCases?.length ?? 0).padStart(2, "0"), label: "Use cases" }
  ]
});

export const collectionHeroVisual = (
  items: PageItem[],
  options: CollectionVisualOptions
): HeroVisual => ({
  mode: options.mode,
  icon: options.icon,
  label: options.label,
  state: options.state,
  output: options.output,
  coreHref: collectionPathByMode[options.mode] ?? "/",
  nodes: items.slice(0, 5).map((item, index) => ({
    title: item.title,
    state: (stateSets[options.mode] ?? stateSets.capabilities)[index % 5],
    icon: item.icon,
    detail: detailByIcon[item.icon ?? ""] ?? shortDetail(item.summary),
    meter: meterFor(item.title, index),
    href: `${collectionPathByMode[options.mode] ?? "/"}${item.slug}/`
  })),
  metrics: [
    { value: String(items.length).padStart(2, "0"), label: options.primaryMetric },
    {
      value: String(items.reduce((total, item) => total + (item.modules?.length ?? 0), 0)).padStart(2, "0"),
      label: "Modules"
    },
    { value: "Live", label: options.secondaryMetric }
  ]
});

export const technologiesHeroVisual: HeroVisual = {
  mode: "technologies",
  icon: "api",
  label: "Implementation matrix",
  state: "Stack layers ready",
  output: "Frontend, CMS, AI, data, integrations, deployment",
  coreHref: "/technologies/",
  nodes: [
    { title: "Astro / Next.js", state: "Frontend", icon: "web", detail: "Interfaces + routes", meter: "86%", href: "/capabilities/web-product-development/" },
    { title: "WordPress / CMS", state: "Publishing", icon: "api", detail: "Content models", meter: "78%", href: "/capabilities/wordpress-api-integrations/" },
    { title: "AI + Automation", state: "Workflow", icon: "ai", detail: "Assistants + actions", meter: "91%", href: "/capabilities/ai-automation/" },
    { title: "Scraping + Data", state: "Signals", icon: "data", detail: "Collection + scoring", meter: "83%", href: "/capabilities/data-systems-scraping/" },
    { title: "Cloudflare / GitHub", state: "Deploy", icon: "product", detail: "Launch pipeline", meter: "74%", href: "/technologies/" }
  ],
  metrics: [
    { value: "13", label: "Tools" },
    { value: "05", label: "Layers" },
    { value: "API", label: "Connective tissue" }
  ]
};

export const aboutHeroVisual: HeroVisual = {
  mode: "about-alfarank",
  icon: "space",
  label: "Operating model",
  state: "Execution loop active",
  output: "Marketing logic, engineering, automation, content, data",
  coreHref: "/about/",
  nodes: [
    { title: "Scope", state: "Define", icon: "space", detail: "Business output", meter: "72%", href: "/start-project/" },
    { title: "Prototype", state: "Shape", icon: "product", detail: "Working model", meter: "80%", href: "/systems/" },
    { title: "Build", state: "Connect", icon: "tools", detail: "Modules + APIs", meter: "88%", href: "/capabilities/" },
    { title: "Launch", state: "Ship", icon: "web", detail: "Production path", meter: "76%", href: "/technologies/" },
    { title: "Measure", state: "Improve", icon: "ranking", detail: "Signals + reports", meter: "82%", href: "/solutions/" }
  ],
  metrics: [
    { value: "05", label: "Work stages" },
    { value: "01", label: "System owner" },
    { value: "Loop", label: "Delivery mode" }
  ]
};

export const intakeHeroVisual: HeroVisual = {
  mode: "start-a-project",
  icon: "lead",
  label: "Project intake",
  state: "Request path open",
  output: "Type, current system, problem, desired result, timeline",
  coreHref: "#project-intake",
  nodes: [
    { title: "Project type", state: "Select", icon: "tools", detail: "System category", meter: "70%", href: "#project-intake" },
    { title: "Current setup", state: "Map", icon: "web", detail: "Website / workflow", meter: "74%", href: "#project-intake" },
    { title: "Business problem", state: "Clarify", icon: "flow", detail: "Operational pain", meter: "86%", href: "#project-intake" },
    { title: "Desired result", state: "Define", icon: "ranking", detail: "Launch output", meter: "91%", href: "#project-intake" },
    { title: "Follow-up", state: "Route", icon: "lead", detail: "Next step", meter: "78%", href: "#project-intake" }
  ],
  metrics: [
    { value: "07", label: "Input fields" },
    { value: "D1", label: "Storage" },
    { value: "POST", label: "Submit flow" }
  ]
};

export const requestReceivedHeroVisual: HeroVisual = {
  mode: "request-received",
  icon: "lead",
  label: "Request received",
  state: "Review queue active",
  output: "Project type, problem, current setup, desired result",
  coreHref: "/",
  nodes: [
    { title: "Submission", state: "Stored", icon: "lead", detail: "Project request", meter: "84%", href: "/start-project/" },
    { title: "Classification", state: "Review", icon: "flow", detail: "System type", meter: "72%", href: "/solutions/" },
    { title: "Context check", state: "Inspect", icon: "lens", detail: "Current setup", meter: "68%", href: "/systems/" },
    { title: "Scope path", state: "Prepare", icon: "space", detail: "Next action", meter: "79%", href: "/capabilities/" },
    { title: "Reply", state: "Next", icon: "api", detail: "Follow-up", meter: "66%", href: "/" }
  ],
  metrics: [
    { value: "OK", label: "Status" },
    { value: "01", label: "Request" },
    { value: "Next", label: "Step" }
  ]
};
