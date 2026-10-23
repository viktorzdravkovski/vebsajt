export type Social = {
  label: string;
  value: string;
  href?: string;
};

export type ExperienceEntry = {
  company: string;
  companyHref?: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
};

export type Capability = {
  name: string;
  note: string;
};

export type StackGroup = {
  group: string;
  items: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  name: string;
  year: string;
  summary: string;
  detail: string;
  role: string;
  stack: string[];
  links: ProjectLink[];
};

export type Note = {
  title: string;
  meta: string;
};

export const profile = {
  name: "Viktor Zdravkovski",
  role: "Software engineer",
  focus: "Systems, platform, reliability",
  years: "10",
  based: "Skopje, Macedonia",
  email: "viktorzdravkovski995@gmail.com",
  socials: [
    { label: "GitHub", value: "viktorzdravkovski", href: "https://github.com/viktorzdravkovski" },
    { label: "LinkedIn", value: "viktor-zdravkovski", href: "https://www.linkedin.com/in/viktor-zdravkovski/" },
  ] satisfies Social[],
};

export const experience: ExperienceEntry[] = [
  {
    role: "Staff software engineer",
    company: "Netcetera",
    companyHref: "https://www.netcetera.com",
    period: "[20XX — present]",
    location: "Skopje, Macedonia",
    summary: "[What the team built, and what you owned across it.]",
    highlights: [
      "[A system you designed, and the constraint that shaped it]",
      "[A measurable outcome: latency, cost, reliability, delivery speed]",
      "[A hard call you made and what it cost]",
    ],
  },
  {
    role: "Senior software engineer",
    company: "Netcetera",
    companyHref: "https://www.netcetera.com",
    period: "[20XX — 20XX]",
    location: "Skopje, Macedonia",
    summary: "[What the team built, and what you owned across it.]",
    highlights: [
      "[A migration or redesign, and what it replaced]",
      "[A measurable outcome]",
      "[Something you owned from first sketch to on-call]",
    ],
  },
  {
    role: "Software engineer",
    company: "[Previous company]",
    period: "[20XX — 20XX]",
    location: "[City, country]",
    summary: "[What the team built, and what you owned across it.]",
    highlights: [
      "[A service or product area you built from zero]",
      "[A measurable outcome]",
      "[A practice or tool you introduced that stuck]",
    ],
  },
  {
    role: "Software engineer",
    company: "[Previous company]",
    period: "[20XX — 20XX]",
    location: "[City, country]",
    summary: "[What the team built, and what you owned across it.]",
    highlights: [
      "[Early work that still holds up]",
      "[A measurable outcome]",
    ],
  },
];

export const systems = {
  statement:
    "A good system is quiet. It fails in ways you planned for, scales without drama, and is still understandable a year later.",
  capabilities: [
    {
      name: "Distributed systems",
      note: "Consistency, idempotency, backpressure, and failure budgets. Designing for the network being a hostile place.",
    },
    {
      name: "Data modelling",
      note: "Schemas that survive three years of product decisions, and migrations that do not require a maintenance window.",
    },
    {
      name: "Reliability",
      note: "SLOs people believe, incident reviews without blame, and degradation that is graceful rather than surprising.",
    },
    {
      name: "Performance",
      note: "Profiling before guessing, caching with an exit plan, and load shapes that resemble real traffic.",
    },
    {
      name: "Platform & delivery",
      note: "Pipelines, environments, and developer experience people do not route around.",
    },
  ] satisfies Capability[],
};

export const stack: StackGroup[] = [
  {
    group: "Languages",
    items: ["TypeScript", "Go", "Python", "SQL", "Bash"],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Vite"],
  },
  {
    group: "Backend & APIs",
    items: ["Node.js", "GraphQL", "gRPC", "REST", "Event-driven services"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "Redis", "Kafka", "ClickHouse", "S3"],
  },
  {
    group: "Platform",
    items: ["AWS", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
  },
  {
    group: "Observability",
    items: ["OpenTelemetry", "Prometheus", "Grafana", "Loki"],
  },
];

export const projects: Project[] = [
  {
    name: "[Project one]",
    year: "[20XX]",
    summary: "[One line on what it does and who it is for.]",
    detail:
      "[The problem, the constraint, and the decision you would defend. Two or three sentences is enough.]",
    role: "[Your role]",
    stack: ["TypeScript", "PostgreSQL", "Kafka"],
    links: [],
  },
  {
    name: "[Project two]",
    year: "[20XX]",
    summary: "[One line on what it does and who it is for.]",
    detail:
      "[The problem, the constraint, and the decision you would defend. Two or three sentences is enough.]",
    role: "[Your role]",
    stack: ["Go", "Redis", "Kubernetes"],
    links: [],
  },
  {
    name: "[Project three]",
    year: "[20XX]",
    summary: "[One line on what it does and who it is for.]",
    detail:
      "[The problem, the constraint, and the decision you would defend. Two or three sentences is enough.]",
    role: "[Your role]",
    stack: ["Python", "ClickHouse", "Terraform"],
    links: [],
  },
];

export const notes: Note[] = [
  {
    title: "[Note or talk title]",
    meta: "[Venue or publication], [year]",
  },
  {
    title: "[Note or talk title]",
    meta: "[Venue or publication], [year]",
  },
  {
    title: "[Note or talk title]",
    meta: "[Venue or publication], [year]",
  },
];

export const navigation = [
  { label: "Experience", href: "#experience" },
  { label: "Systems", href: "#systems" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];
