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
  role: "Senior software engineer",
  focus: "Analysis and development of web applications",
  years: "9",
  based: "Skopje, Macedonia",
  email: "viktorzdravkovski995@gmail.com",
  phone: "+389 71 789 609",
  socials: [
    { label: "GitHub", value: "viktorzdravkovski", href: "https://github.com/viktorzdravkovski" },
    { label: "LinkedIn", value: "viktor-zdravkovski", href: "https://www.linkedin.com/in/viktor-zdravkovski/" },
  ] satisfies Social[],
};

export const experience: ExperienceEntry[] = [
  {
    role: "React academy teacher",
    company: "Creative Hub",
    period: "Oct 2022 — present",
    location: "Skopje, Macedonia",
    summary:
      "Creating and adjusting the curriculum for the React academy, and teaching and assisting students of all ages how to independently develop full-blown web applications with real-world usage.",
    highlights: [
      "Owned the React academy curriculum end to end — created, adjusted and delivered it, cohort after cohort.",
      "Took students of all ages from their first component to a working application used in the real world.",
    ],
  },
  {
    role: "Software engineer",
    company: "Netcetera",
    companyHref: "https://www.netcetera.com",
    period: "Sep 2018 — present",
    location: "Skopje, Macedonia",
    summary:
      "Analysis, estimation, development and deployment of complex web applications in investment banking and real-estate management, in Agile teams and working closely with the business.",
    highlights: [
      "Part of the development team for the online investment platform at key4.ch.",
      "Part of the migration team, moving large volumes of data using Spring Batch.",
      "Part of the development team for Wüest Dimensions, a professional real-estate management application.",
      "Development of web applications with large code bases using Java Spring.",
      "Designing and working with Oracle and PostgreSQL databases — Liquibase for schema management, Hibernate for object-relational mapping.",
      "Design and development of web interfaces with OpenAPI and SOAP, and integrations with third-party systems.",
      "Deployment and management of Docker containers; application deployment and CI/CD with Jenkins.",
      "UI design and development with ReactJS.",
      "Taking care of system security and code reviews, and providing support to the customer.",
      "Taking the lead on projects — task planning, estimation, scheduling — and mentoring interns and younger colleagues.",
    ],
  },
  {
    role: "Data science intern",
    company: "Netcetera",
    companyHref: "https://www.netcetera.com",
    period: "Mar 2018 — May 2018",
    location: "Skopje, Macedonia",
    summary:
      "Machine learning to predict insurance fraud, and the Django REST APIs that carried the data in.",
    highlights: [
      "Created machine learning models to predict insurance frauds, with Python for data processing.",
      "Developed REST APIs based on the Django framework for accepting data input externally.",
    ],
  },
  {
    role: "Full-stack developer",
    company: "VapourApps",
    period: "Jun 2017 — Feb 2018",
    location: "Skopje, Macedonia",
    summary:
      "Python modules for a set of integrated applications — Active Directory, file sharing, mail, backup, proxy — on Linux-based platforms.",
    highlights: [
      "Built Python modules for the suite of integrated applications across Linux platforms.",
      "Integrated an external payment web service with PHP and SOAP.",
    ],
  },
  {
    role: "Back-end development intern",
    company: "VapourApps",
    period: "Feb 2017 — Jun 2017",
    location: "Skopje, Macedonia",
    summary: "Where it started: plugins for the company's application suite, in Python.",
    highlights: ["Developed Python plugins for a set of applications."],
  },
];

export const systems = {
  statement:
    "A good system is quiet. It fails in ways you planned for, scales without drama, and is still understandable a year later.",
  capabilities: [
    {
      name: "Web applications",
      note: "Analysis, design and development — web applications taken from requirements to running software.",
    },
    {
      name: "Autonomous delivery",
      note: "The ability to work autonomously — designing and developing to engineering best practice.",
    },
    {
      name: "Clean, SOLID code",
      note: "Writing clear code that follows SOLID patterns and principles, and stays readable for the person who inherits it.",
    },
    {
      name: "Versioning & deployment",
      note: "Taking care of system versioning and deployment as part of the engineering work.",
    },
  ] satisfies Capability[],
};

export const stack: StackGroup[] = [
  {
    group: "Languages",
    items: ["Java", "Python", "JavaScript", "Bash scripting"],
  },
  {
    group: "Backend",
    items: ["Spring Core", "Spring Batch", "Hibernate ORM", "Django", "PHP"],
  },
  {
    group: "Data",
    items: ["SQL / NoSQL", "Oracle", "PostgreSQL", "Liquibase"],
  },
  {
    group: "Web & APIs",
    items: ["OpenAPI", "SOAP web services", "ReactJS", "HTML / CSS / Bootstrap"],
  },
  {
    group: "DevOps & platform",
    items: ["Docker", "Jenkins", "Linux"],
  },
  {
    group: "Tools & methods",
    items: [
      "IntelliJ IDEA",
      "Visual Studio Code",
      "SQL Server Management Studio",
      "Git",
      "Agile development",
      "Scrum",
      "Waterfall",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Investment platform at key4.ch",
    year: "Netcetera",
    summary: "The online investment platform at key4.ch — complex web applications in the investment-banking field.",
    detail:
      "Part of the development team for the online investment platform at key4.ch. The work runs the full cycle in a large Java Spring code base: analysis and estimation with the business, development and deployment in Agile sprints, web interfaces with OpenAPI and SOAP, and integrations with third-party systems. System security, code reviews and customer support stayed part of the remit throughout.",
    role: "Software engineer",
    stack: ["Java", "Spring", "OpenAPI", "SOAP", "Oracle", "Docker", "Jenkins", "ReactJS"],
    links: [{ label: "key4.ch", href: "https://key4.ch" }],
  },
  {
    name: "Wüest Dimensions",
    year: "Netcetera",
    summary: "Professional real-estate management application, built with the development team.",
    detail:
      "Part of the development team for Wüest Dimensions, a professional real-estate management application. My part leaned on the data: designing and working with Oracle and PostgreSQL, Liquibase for schema management and Hibernate for object-relational mapping — plus UI design and development with ReactJS.",
    role: "Software engineer",
    stack: ["Java", "Spring", "Hibernate", "Liquibase", "Oracle", "PostgreSQL", "ReactJS"],
    links: [],
  },
  {
    name: "Integrated application suite",
    year: "VapourApps",
    summary:
      "A set of integrated applications — Active Directory, file sharing, mail, backup, proxy — built on Linux platforms.",
    detail:
      "Developed modules with Python for a suite of integrated applications — Active Directory, file sharing, mail, backup and proxy — running on different Linux-based platforms. On top of that, integrated an external payment web service with PHP and SOAP.",
    role: "Full-stack developer",
    stack: ["Python", "PHP", "SOAP", "Linux"],
    links: [],
  },
];

export const notes: Note[] = [
  {
    title: "Bachelor of Computer Science",
    meta: "Faculty of Computer Science & Engineering, Skopje — 2019 — present",
  },
  {
    title: "Coding hackathons",
    meta: "Participant",
  },
  {
    title: "Automotive engineering",
    meta: "A committed fan",
  },
];

export const navigation = [
  { label: "Experience", href: "#experience" },
  { label: "Systems", href: "#systems" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];
