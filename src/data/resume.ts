/**
 * resume.ts — single source of truth for every piece of content in the app.
 *
 * HOW TO EDIT:
 *  - Skills live in `allSkills`. Add a skill there first (pick a category),
 *    then reference its `id` from experience entries, education entries, and
 *    projects via their `skills` arrays. Skill ids are type-checked: a typo
 *    in a `skills` array is a compile error, so cross-links can never dangle.
 *  - Everything else (hero, timeline, projects, publications) is plain data
 *    below. The UI renders whatever is here — no content is hard-coded in
 *    components.
 */

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

export const skillCategories = [
  { id: 'languages', label: 'Languages' },
  { id: 'frameworks', label: 'Frameworks & Testing' },
  { id: 'ai', label: 'AI & LLM Engineering' },
  { id: 'cloud', label: 'Cloud, Data & DevOps' },
  { id: 'domain', label: 'Clinical / Domain' },
  { id: 'tools', label: 'Practices & Tools' },
] as const;

export type SkillCategoryId = (typeof skillCategories)[number]['id'];

const allSkills = [
  // Languages
  { id: 'js', name: 'JavaScript / TypeScript', category: 'languages' },
  { id: 'python', name: 'Python', category: 'languages' },
  { id: 'sql', name: 'SQL', category: 'languages' },
  { id: 'csharp', name: 'C#', category: 'languages' },
  { id: 'java', name: 'Java', category: 'languages' },

  // Frameworks & testing
  { id: 'react', name: 'React', category: 'frameworks' },
  { id: 'node', name: 'Node.js / Express', category: 'frameworks' },
  { id: 'aspnet', name: 'ASP.NET MVC', category: 'frameworks' },
  { id: 'jest', name: 'Jest / supertest', category: 'frameworks' },

  // AI & LLM engineering
  { id: 'bedrock', name: 'Amazon Bedrock Agents', category: 'ai' },
  { id: 'llm-apis', name: 'LLM APIs (Claude, OpenAI)', category: 'ai' },
  { id: 'prompt-eng', name: 'Prompt Engineering', category: 'ai' },
  { id: 'multi-agent', name: 'Multi-Agent Orchestration', category: 'ai' },
  { id: 'mcp', name: 'MCP Tooling', category: 'ai' },
  { id: 'multimodal', name: 'Multimodal Pipelines (TTS / Avatar)', category: 'ai' },
  { id: 'responsible-ai', name: 'Guardrails & Human-in-the-Loop', category: 'ai' },

  // Cloud, data & DevOps
  { id: 'aws', name: 'AWS (EC2, S3, RDS, Lambda)', category: 'cloud' },
  { id: 'docker', name: 'Docker', category: 'cloud' },
  { id: 'cicd', name: 'CI/CD Pipelines', category: 'cloud' },
  { id: 'mysql', name: 'MySQL', category: 'cloud' },
  { id: 'mssql', name: 'MSSQL', category: 'cloud' },
  { id: 'sqlite', name: 'SQLite', category: 'cloud' },

  // Clinical / domain
  { id: 'med-sim', name: 'Medical Simulation & Education', category: 'domain' },
  { id: 'behavioral-scoring', name: 'Clinical Behavioral Scoring', category: 'domain' },
  { id: 'healthcare-data', name: 'Healthcare Data Modeling', category: 'domain' },
  { id: 'multi-tenant', name: 'Multi-Tenant Data Isolation', category: 'domain' },
  { id: 'env-data', name: 'Environmental Data (WQX)', category: 'domain' },

  // Practices & tools
  { id: 'git', name: 'Git / GitHub', category: 'tools' },
  { id: 'auth', name: 'OAuth / SSO / RBAC', category: 'tools' },
  { id: 'kanban', name: 'Agile / Kanban / Jira', category: 'tools' },
  { id: 'tech-comm', name: 'Technical Communication', category: 'tools' },
] as const;

export type SkillId = (typeof allSkills)[number]['id'];

export interface Skill {
  id: SkillId;
  name: string;
  category: SkillCategoryId;
}

export const skills: readonly Skill[] = allSkills;

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export type TimelineEntryType = 'work' | 'education';

export interface TimelineEntry {
  id: string;
  type: TimelineEntryType;
  title: string;
  org: string;
  location: string;
  period: string;
  /** Used for sorting, most recent first. */
  sortKey: number;
  summary?: string;
  highlights: string[];
  skills: SkillId[];
}

export interface Project {
  id: string;
  name: string;
  period: string;
  tagline: string;
  description: string;
  skills: SkillId[];
  link?: { label: string; url: string };
  note?: string;
}

export type PublicationKind =
  | 'journal'
  | 'patent'
  | 'talk'
  | 'conference'
  | 'workshop';

export interface Publication {
  id: string;
  kind: PublicationKind;
  title: string;
  venue: string;
  status: string;
  award?: string;
  detail?: string;
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const hero = {
  name: 'Eli Meldrim',
  fullName: 'Elijah Meldrim',
  title: 'Software Engineer · AI Prompt Engineer',
  location: 'Springfield, IL',
  summary:
    'I build and operate production generative-AI systems end-to-end. As the platform engineer for SILOMed — a multi-tenant ' +
    'medical-simulation platform used by medical students and residents — I own everything from multi-tenant MySQL schema design ' +
    'and Amazon Bedrock agent orchestration to multimodal speech/avatar pipelines and CI-gated AWS deployments. Patent co-inventor ' +
    '(application filed), invited national-conference speaker, and co-author of research on AI-driven medical education. ' +
    'M.S. in Computer Science in progress (4.0 GPA).',
} as const;

// ---------------------------------------------------------------------------
// Timeline: experience + education
// ---------------------------------------------------------------------------

export const timeline: TimelineEntry[] = [
  {
    id: 'siu',
    type: 'work',
    title: 'Software Engineer / AI Prompt Engineer',
    org: 'SIU School of Medicine',
    location: 'Springfield, IL',
    period: 'Aug 2025 – Present',
    sortKey: 202508,
    summary:
      'Sole platform engineer for SILOMed, a production multi-tenant generative-AI clinical simulation platform.',
    highlights: [
      'Design, build, and operate SILOMed end-to-end — React, Node.js/Express, MySQL, Docker, and AWS — delivering AI patient encounters with structured actions, evaluations, and behavioral scoring.',
      'Architected multimodal AI pipelines integrating custom Amazon Bedrock agents, LLM provider APIs, text-to-speech, and avatar rendering — replacing an unreliable vendor component with a self-hosted containerized stack.',
      'Built an AI case-generation agent with a guided authoring workflow so non-technical clinical faculty can create complete, clinically structured simulation content — with templates, guardrails, and human-in-the-loop review designed in.',
      'Implemented versioned data snapshots so result-derived metrics are always computed against the case definition in effect at the time — point-in-time correctness for downstream reporting.',
      'Apply responsible-AI practices in a healthcare-adjacent setting: multi-tenant data isolation, role-based access control, and root-cause remediation of data-privacy defects found in production.',
      'Codified engineering practices into a reusable multi-agent development pipeline — planning, coding, layered adversarial review, drift and dead-code checks, CI, and end-to-end testing.',
      'Ship secure enterprise integrations: SSO via Microsoft Entra ID (MSAL) and Google OAuth / OpenID Connect, S3 media management, and dual staging/production environments.',
      'Brief physicians, faculty, and partner institutions on AI capability; demo features live and present the platform at national medical-education conferences.',
    ],
    skills: [
      'js', 'python', 'sql', 'react', 'node', 'jest',
      'bedrock', 'llm-apis', 'prompt-eng', 'multi-agent', 'mcp', 'multimodal', 'responsible-ai',
      'aws', 'docker', 'cicd', 'mysql',
      'med-sim', 'behavioral-scoring', 'healthcare-data', 'multi-tenant',
      'git', 'auth', 'kanban', 'tech-comm',
    ],
  },
  {
    id: 'amazon',
    type: 'work',
    title: 'Warehouse Associate & Associate Safety Committee Member',
    org: 'Amazon',
    location: 'Boise, ID',
    period: 'Jan 2022 – Aug 2025',
    sortKey: 202201,
    highlights: [
      'Worked full-time through college in a 24x7 operations environment; coordinated inbound/outbound trailer movement using internal logistics systems.',
      'Served on the Associate Safety Committee: conducted audits, recommended process improvements, and led safety training sessions.',
      'Associate of the Month, October 2022.',
    ],
    skills: [],
  },
  {
    id: 'pacific',
    type: 'work',
    title: 'Student IT Helpdesk Technician',
    org: 'Pacific University',
    location: 'Forest Grove, OR',
    period: 'Oct 2021 – Jan 2022',
    sortKey: 202110,
    highlights: [
      'Provided hardware and software support for students and faculty.',
      'Migrated equipment management to a third-party checkout platform.',
    ],
    skills: [],
  },
  {
    id: 'ut-ms',
    type: 'education',
    title: 'M.S. in Computer Science',
    org: 'University of Tennessee',
    location: 'Online',
    period: 'In progress · Expected Dec 2026',
    sortKey: 202512,
    summary: 'GPA: 4.0 / 4.0',
    highlights: [],
    skills: ['java', 'python', 'sql'],
  },
  {
    id: 'bsu-bs',
    type: 'education',
    title: 'B.S. in Computer Science',
    org: 'Boise State University',
    location: 'Boise, ID',
    period: 'Graduated May 2024',
    sortKey: 202405,
    summary: 'GPA: 3.4 / 4.0',
    highlights: [
      'Coursework: Artificial Intelligence · Data Mining · Databases · Distributed Systems · Operating Systems · Algorithms · Human-Computer Interaction',
      'Senior capstone delivered to a government client (Idaho DEQ) — see the Hydrolink project below.',
    ],
    skills: ['java', 'csharp', 'python', 'sql', 'aspnet', 'mssql', 'git'],
  },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: 'silomed',
    name: 'SILOMed.Solutions',
    period: '2025 – Present',
    tagline: 'Production healthcare AI simulation platform',
    description:
      'Multi-tenant platform where medical trainees work through generative-AI patient cases. Every encounter produces structured evaluation, behavioral, and timing data feeding downstream scoring and cohort-level reporting for faculty.',
    skills: [
      'react', 'node', 'mysql', 'docker', 'aws', 'js', 'sql', 'python',
      'bedrock', 'llm-apis', 'multimodal', 'prompt-eng', 'responsible-ai',
      'med-sim', 'behavioral-scoring', 'healthcare-data', 'multi-tenant', 'auth', 'jest', 'cicd',
    ],
    link: { label: 'silomed.solutions', url: 'https://silomed.solutions' },
  },
  {
    id: 'heartbeat-dev',
    name: 'Heartbeat Dev',
    period: '2025 – Present',
    tagline: 'Nine-stage multi-agent AI development pipeline',
    description:
      'Coordinated AI agents that plan, scaffold, test, review, and document code changes: plan → code → second opinion → senior review → drift and dead-code checks → CI → end-to-end test. Encodes code-quality standards as teachable, version-controlled artifacts.',
    skills: ['multi-agent', 'prompt-eng', 'mcp', 'llm-apis', 'cicd', 'git'],
  },
  {
    id: 'knowledge-graph',
    name: 'Codebase Knowledge-Graph Generator',
    period: '2025 – Present',
    tagline: 'AST parsing → queryable dependency graphs',
    description:
      'Parses source code into a directed graph of files, symbols, and dependencies with community detection and lineage-style BFS/DFS traversal — turning an unfamiliar codebase into something you can query.',
    skills: ['js', 'multi-agent', 'llm-apis', 'prompt-eng'],
  },
  {
    id: 'medbook',
    name: 'MedBook',
    period: '2026',
    tagline: 'Clinic scheduling with conflict-detection rules',
    description:
      'ASP.NET Core MVC clinic scheduler with a rules-based SchedulingService (double-booking and availability conflicts), xUnit test coverage, seeded SQLite data, and three-role access control (admin, doctor, patient) via ASP.NET Identity.',
    skills: ['csharp', 'aspnet', 'sqlite', 'auth'],
    link: { label: 'Portfolio page', url: 'https://elimeldrim.github.io/portfolio-medbook.html' },
  },
  {
    id: 'hydrolink',
    name: 'Hydrolink',
    period: 'Spring 2024',
    tagline: 'Senior capstone for the Idaho DEQ',
    description:
      'Partnered with the Idaho Department of Environmental Quality to automate transmission of water-quality data to federal databases via the WQX API — an enterprise integration delivered to a government client.',
    skills: ['csharp', 'aspnet', 'mssql', 'docker', 'git', 'env-data'],
    note: 'Source is DEQ-owned and private.',
  },
  {
    id: 'inventory-tracker',
    name: 'DIY Inventory Tracker',
    period: 'Fall 2024',
    tagline: 'Full-stack inventory for small businesses',
    description:
      'Full-stack application for small business owners to track inventory, sales, expenses, and recipes — with location tracking and custom reporting.',
    skills: ['csharp', 'aspnet', 'mysql', 'sql'],
  },
];

export const portfolioUrl = 'https://elimeldrim.github.io';

// ---------------------------------------------------------------------------
// Publications, patents, talks
// ---------------------------------------------------------------------------

export const publications: Publication[] = [
  {
    id: 'jmir',
    kind: 'journal',
    title:
      'An Artificial Intelligence–Driven Simulated Patient Encounter for First-Year Medical Students: A Comparative Pilot of Group and Individual Delivery Formats',
    venue: 'JMIR Medical Education',
    status: 'Submitted June 2026 · Under review',
    detail: 'Co-author.',
  },
  {
    id: 'patent-nlp',
    kind: 'patent',
    title:
      'Automated Natural Language Processing System and Method for Real-Time Scoring of Clinician Behavioral Communication Competency in Suicide Risk Assessment',
    venue: 'U.S. Patent Application',
    status: 'Application filed',
    detail: 'Co-inventor.',
  },
  {
    id: 'aamc-2026',
    kind: 'talk',
    title:
      'More Than a Machine: Using AI Patients to Nurture Confidence and Connection in Clinical Training',
    venue:
      'AAMC Emerging Technologies for Teaching and Learning Digital Demonstrations Virtual Conference',
    status: 'Invited speaker · Feb 2026',
  },
  {
    id: 'cord-2026',
    kind: 'conference',
    title: 'Innovating Emergency Medicine Simulation Training through Generative AI: A Pilot in Resident Education',
    venue: 'CORD Academic Assembly 2026, Orlando, FL',
    status: 'Presented · March 2026',
    award: '2nd Place, Innovation',
    detail: 'Co-author.',
  },
  {
    id: 'saem',
    kind: 'conference',
    title:
      'Emergency Medicine Simulation Training Through Generative Artificial Intelligence: A Pilot in Resident Education',
    venue: 'Society for Academic Emergency Medicine (SAEM)',
    status: 'Accepted',
    detail: 'Co-author. Also accepted at the Conference on Residency Directors (CORD).',
  },
  {
    id: 'apa-2026',
    kind: 'workshop',
    title:
      'Build Your Own AI Avatar: An Experimental Workshop to Create AI Avatars for Teaching and Assessment in Psychiatry',
    venue: 'American Psychiatric Association, Sept 2026',
    status: 'Accepted · 90-minute workshop',
    detail: 'Co-author.',
  },
  {
    id: 'siu-symposia',
    kind: 'conference',
    title:
      'Case-specific performance patterns in AI-simulated emergency medicine curricula (two co-authored abstracts)',
    venue: 'SIU Research Symposia, Feb 2026',
    status: 'Submitted',
  },
];

export const publicationKindLabels: Record<PublicationKind, string> = {
  journal: 'Journal',
  patent: 'Patent',
  talk: 'Invited Talk',
  conference: 'Conference',
  workshop: 'Workshop',
};
