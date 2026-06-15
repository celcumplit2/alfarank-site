import type { Locale } from "@/data/i18n";

export type PrivateModule = {
  slug: string;
  title: string;
  icon: string;
  summary: string;
  positioning: string;
  presentation?: {
    valueTitle?: string;
    valueText?: string;
    flowTitle?: string;
    flowText?: string;
    proofTitle?: string;
    proofText?: string;
    pilotSlideTitle?: string;
    pilotSlideText?: string;
    internalSourceTitle?: string;
    externalSourceTitle?: string;
    metricTitle?: string;
  };
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
  narrative?: {
    architecture: string;
    core: string;
    valueHeading: string;
    moduleMapTitle?: string;
    relatedIntro?: string;
  };
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

export type LocalizedPrivateProject = Record<Locale, PrivateProject>;
