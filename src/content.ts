export type ChapterId = 'intro' | 'experience' | 'evidence' | 'approach' | 'contact';

export type ProjectLink = {
  href: string;
  label: string;
};

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  ownership: string;
  stack: string[];
  images?: { src: string; alt: string; caption: string }[];
  visual?: { label: string; headline: string; steps: string[]; note: string };
  feature?: 'product' | 'research';
  facts?: { value: string; label: string }[];
  links: ProjectLink[];
  caseStudy: {
    context: string;
    why: string;
    role: string;
    constraints: string;
    decisions: string;
    build: string[];
    evidence: string;
    outcome: string;
  };
};

export const chapters: { id: ChapterId; number: string; label: string }[] = [
  { id: 'intro', number: '01', label: 'Introduction' },
  { id: 'experience', number: '02', label: 'Experience' },
  { id: 'evidence', number: '03', label: 'Selected work' },
  { id: 'approach', number: '04', label: 'AIDLC' },
  { id: 'contact', number: '05', label: 'Contact' },
];

export const content = {
  name: 'Teeraphat Raksawong',
  nickname: 'Necktie',
  role: 'AI Lead Engineer · AI-native builder',
  cvUrl: '/files/Teeraphat-Raksawong-CV-2026.pdf',
  hero: {
    background:
      'My path began in Media Art & Design and continues through software engineering, applied AI, and products built for real workflows.',
    education: 'Master of Software Engineering candidate · CMU CAMT · 2024–present',
    thesis:
      'Thesis focus: reducing Windows OS latency to improve FPS player skills.',
    workCta: 'See selected work',
    cvCta: 'Download CV',
  },
  experience: {
    title: 'Experience',
    intro:
      'I connect business workflows to AI systems and software delivery, with human ownership of the decisions that matter.',
    roles: [
      {
        period: 'Sep 2026–Present',
        title: 'AI Lead Engineer',
        company: 'DMC Connect',
        description:
          'Primary technical owner for Nexora, translating travel operations into product scope, AI workflow design, system architecture, and AI-native implementation.',
        contributions: [
          'Defined an AIDLC workflow linking product requirements, user flows, architecture, coding agents, tests, AI evaluation, and release review',
          'Designed governed agent workflows and hotel-contract document intelligence with evidence, structured extraction, and human review',
          'Worked directly with business leadership on product direction, technical decisions, and engineering execution',
        ],
      },
      {
        period: '2024–2026',
        title: 'AI Workshop Facilitator',
        company: 'Corporate and government participants',
        description:
          'Facilitated practical AI workshops for corporate and government participants, adapting technical ideas to the work in front of each group.',
        contributions: [],
      },
    ],
  },
  evidence: {
    title: 'Selected work',
    intro:
      'Five case notes show how I move between AI systems, product definition, structured data, and software engineering. Internal work is described at a public-safe level; planned capabilities are identified as such.',
    featuredLabel: 'Featured work',
    indexLabel: 'More projects',
  },
  approach: {
    title: 'AI-native engineering, from problem to production.',
    intro:
      'My AIDLC connects business → product → AI → engineering. Coding agents accelerate the work; I retain ownership of scope, architecture, validation, and release decisions.',
    pointOfView: {
      eyebrow: 'WHAT I BELIEVE',
      title: 'The outcome matters more than the code produced along the way.',
      body: 'I see agents as a new execution layer for software and business work. My job is to define intent, give them the right context and tools, and make the result testable. Durable software still matters where reliability, integration, and long-term ownership demand it.',
      principles: [
        { title: 'Design the capability', body: 'An agent needs a purpose, bounded context, tools, permissions, and a place in the real workflow.' },
        { title: 'Engineer the feedback loop', body: 'Evaluate outputs against evidence and ground truth; trace errors and improve the system over time.' },
        { title: 'Keep authority explicit', body: 'Let AI research, build, extract, and propose. People and deterministic rules own consequential decisions.' },
      ],
    },
    steps: [
      { title: 'Understand', body: 'Observe the business workflow, users, constraints, and authority boundaries.' },
      { title: 'Research', body: 'Study the domain, existing systems, evidence, and failure modes.' },
      { title: 'Define', body: 'Write the product scope, acceptance criteria, and useful first outcome.' },
      { title: 'Design', body: 'Map user flows, system boundaries, data, and permissions.' },
      { title: 'Contextualize', body: 'Give agents bounded context, tools, skills, and review points.' },
      { title: 'Build with AI', body: 'Use coding agents for implementation and iteration while owning engineering decisions.' },
      { title: 'Evaluate', body: 'Measure AI outputs against ground truth, edge cases, cost, and failure modes.' },
      { title: 'Validate', body: 'Test software paths and let people review consequential outputs.' },
      { title: 'Ship', body: 'Review security and release a working slice into its real workflow.' },
      { title: 'Iterate', body: 'Observe use, investigate errors, and update the product and system.' },
    ],
    skills: [
      {
        title: 'AI-native development',
        items: ['AIDLC', 'Vibe Coding with engineering review', 'Coding agents', 'Context engineering', 'Claude Code', 'Codex'],
      },
      {
        title: 'Agent systems',
        items: ['Agent engineering', 'Agent-as-a-Service design', 'Tool and API orchestration', 'Permissions', 'Human approval', 'Evaluation and auditability'],
      },
      {
        title: 'AI workflows',
        items: ['Document intelligence', 'Structured extraction', 'Model evaluation', 'Human-in-the-loop', 'Workflow automation', 'Data pipelines'],
      },
      {
        title: 'Engineering foundation',
        items: ['Product discovery', 'System architecture', 'TypeScript and Python', 'APIs and databases', 'Testing', 'Git and CI/CD'],
      },
    ],
    language: 'English: conversational for workplace communication.',
  },
  contact: {
    title: 'Have a useful problem to solve?',
    body:
      'I’m open to AI engineering, agent systems, and product work that turns difficult workflows into reliable software.',
    email: 'pethreeday@gmail.com',
    phone: '095-036-2311',
    phoneHref: '+66950362311',
    github: 'https://github.com/neckttiie090520',
    githubLabel: 'GitHub · neckttiie090520',
    emailCta: 'Email Teeraphat',
    cvCta: 'Download CV',
    footer: 'AI-native engineering with evidence, human judgment, and working software.',
  },
  mascot: {
    openLabel: 'Open page guide',
    closeLabel: 'Close page guide',
    guides: {
      intro: {
        eyebrow: '01 / INTRODUCTION',
        body: 'Start with the background, then follow how the work moved into engineering.',
        target: '#experience',
        action: 'Next: experience',
      },
      experience: {
        eyebrow: '02 / EXPERIENCE',
        body: 'The role story sets up the project evidence in the next chapter.',
        target: '#evidence',
        action: 'Next: selected work',
      },
      evidence: {
        eyebrow: '03 / SELECTED WORK',
        body: 'All nine projects are listed here. Open a case note to inspect the decisions and evidence.',
        target: '#approach',
        action: 'Next: approach',
      },
      approach: {
        eyebrow: '04 / APPROACH',
        body: 'Follow the AIDLC from business problem to evaluated system, then get in touch.',
        target: '#contact',
        action: 'Next: contact',
      },
      contact: {
        eyebrow: '05 / CONTACT',
        body: 'Thanks for reading. Get in touch, open the CV, or return to the introduction.',
        target: '#intro',
        action: 'Back to introduction',
      },
    } satisfies Record<ChapterId, { eyebrow: string; body: string; target: string; action: string }>,
  },
};

export const featuredProjects: Project[] = [
  {
    id: 'nexora',
    index: '01',
    title: 'Nexora',
    category: 'AI product architecture · Agent systems',
    summary:
      'A governed AI work layer for travel operations. I help turn messy operational work into scoped, evidence-backed workflows with human control over consequential actions.',
    ownership:
      'Primary technical owner across product definition, architecture, agent workflow design, AI-native development, and engineering execution.',
    stack: ['AIDLC', 'Agent workflow design', 'System architecture', 'Human approval'],
    feature: 'product',
    links: [],
    caseStudy: {
      context:
        'Travel teams work across enquiries, contracts, quotations, and existing systems. The challenge is to coordinate that work without losing source evidence or decision ownership.',
      why:
        'An AI assistant is useful only when it knows the scope of a task, the source of a claim, and who can authorize the next action.',
      role:
        'I lead technical direction and translate business needs into product boundaries, user flows, agent capabilities, architecture, and implementation plans.',
      constraints:
        'Nexora is an active internal initiative. The full platform and proposed capabilities should not be presented as deployed; confidential operational details stay private.',
      decisions:
        'Design a scoped work layer in which AI prepares and proposes, evidence remains traceable, and people or deterministic rules authorize consequential decisions.',
      build: [
        'Defined product scope, user journeys, and technical architecture for a narrower first workflow.',
        'Specified agent boundaries, context, tools, permissions, and human review points.',
        'Connected AI-native implementation to requirements, evaluation, security review, and release checkpoints.',
      ],
      evidence:
        'The public case note describes my role and design decisions; internal specifications, customer data, and unreleased functionality are not published.',
      outcome:
        'A defined product and architecture direction with implementation work in progress. No production or business-impact metric is claimed.',
    },
  },
  {
    id: 'younum',
    index: '01',
    title: 'YouNum',
    category: 'End-to-end product',
    summary:
      'A solo product carried from concept and user flow through UX/UI, architecture, build, integration, testing, launch, and iteration.',
    ownership:
      'I owned the product journey from the first flow to release and continued iteration.',
    stack: ['Next.js', 'React', 'TypeScript', 'Supabase'],
    images: [
      { src: '/showcase/younum-public-home.png', alt: 'Current public YouNum landing page with a night sky and number reading call to action', caption: 'The current public product entry point' },
      { src: '/showcase/younum-public-dream.png', alt: 'YouNum dream flow explaining the three steps from dream to symbols to numbers', caption: 'The dream flow explains each step before entry' },
      { src: '/showcase/younum-public-articles.png', alt: 'YouNum article page with a table of contents and clear reading columns', caption: 'Editorial guidance makes the methods understandable' },
    ],
    feature: 'product',
    facts: [
      { value: '01 → 06', label: 'Concept to iteration' },
      { value: 'Solo', label: 'End-to-end ownership' },
    ],
    links: [{ href: 'https://www.younum.me/', label: 'Visit YouNum' }],
    caseStudy: {
      context:
        'YouNum is a self-directed product built by one person from concept through launch.',
      why:
        'Carrying the product beyond an idea made the tradeoffs between user flow, design, architecture, and delivery part of one continuous job.',
      role:
        'Solo product owner and builder across discovery, UX/UI, architecture, implementation, integration, testing, launch, and iteration.',
      constraints:
        'The product decisions had to stay coherent across the whole lifecycle rather than optimizing a single technical slice.',
      decisions:
        'I worked from the user flow outward, then chose a full-stack implementation that I could build, test, launch, and continue to change.',
      build: [
        'Shape the concept into user flows and UX/UI.',
        'Design the system architecture and full-stack implementation.',
        'Integrate and test the product with Next.js, React, TypeScript, and Supabase.',
        'Launch the product and continue to iterate.',
      ],
      evidence:
        'The live product is available at younum.me.',
      outcome:
        'A live product carried through launch and continued iteration of its core flows.',
    },
  },
  {
    id: 'khaosoi-research',
    index: '02',
    title: 'Google Maps RPC Scraper',
    category: 'Data platform · Research',
    summary:
      'A Google Maps review collection framework used in a Chiang Mai Khao Soi study: 22,664 reviews across 11 restaurants, with an oral presentation accepted at FAB 2026.',
    ownership:
      'I built the scraper framework and used it to develop a research dataset and presentation.',
    stack: ['Google Maps RPC scraper', 'Review analysis'],
    feature: 'research',
    facts: [
      { value: '22,664', label: 'Google Maps reviews' },
      { value: '11', label: 'Chiang Mai restaurants' },
      { value: '26–40+', label: 'Reviews per second' },
    ],
    links: [
      {
        href: 'https://github.com/neckttiie090520/Google-map-RPC-scraper',
        label: 'View scraper source',
      },
    ],
    caseStudy: {
      context:
        'The scraper collects public Google Maps reviews; a Chiang Mai Khao Soi study put it to work on a bounded research question.',
      why:
        'A bounded dataset makes the local research question concrete enough to collect, compare, and present.',
      role:
        'I built the RPC-based collection workflow and prepared the resulting research for presentation.',
      constraints:
        'The scope is limited to public review data from 11 restaurants; no private customer data or restaurant performance claims are presented.',
      decisions:
        'I used a repeatable RPC-based collection workflow and recorded the measured review throughput alongside the dataset size.',
      build: [
        'Collect public Google Maps reviews for 11 Chiang Mai Khao Soi restaurants.',
        'Record a total of 22,664 reviews.',
        'Measure collection rates of 26–40+ reviews per second.',
        'Develop the research into an oral presentation.',
      ],
      evidence:
        'The scraper source is public. The oral presentation was accepted at FAB 2026.',
      outcome:
        'Collected 22,664 reviews across 11 restaurants; the research was accepted for oral presentation at FAB 2026.',
    },
  },
  {
    id: 'hotel-document-intelligence',
    index: '05',
    title: 'Hotel Contract Intelligence',
    category: 'Document intelligence · AI evaluation',
    summary:
      'An internal evaluation workflow for extracting structured hotel-contract information, checking evidence, and routing uncertain fields to human review.',
    ownership:
      'Worked on dataset preparation, ground truth, model comparison, error analysis, and the review workflow.',
    stack: ['Document intelligence', 'Structured extraction', 'Model evaluation', 'Human review'],
    feature: 'product',
    links: [],
    caseStudy: {
      context:
        'Hotel contracts contain business-critical details in documents that vary in layout and wording.',
      why:
        'Extraction needs source evidence and human verification before a business workflow can rely on the result.',
      role:
        'I worked on dataset preparation, extraction evaluation, model comparison, error analysis, and the human-review direction.',
      constraints:
        'The work uses internal documents. This page excludes contract content, customer information, accuracy scores, and claims of production-scale automation.',
      decisions:
        'Treat parsing, candidate extraction, verification, and human review as separate steps; compare outputs against ground truth and track failure types.',
      build: [
        'Prepared contract examples and ground-truth fields for evaluation.',
        'Compared extraction outputs and recorded error categories.',
        'Designed a review path for uncertain or consequential fields.',
      ],
      evidence:
        'Only the public-safe workflow and my role are described; datasets and internal evaluation artifacts remain private.',
      outcome:
        'An evaluation and review workflow under active development. No extraction accuracy or deployment claim is made.',
    },
  },
];

export const projects: Project[] = [
  {
    id: 'clutchg-pc-optimizer',
    index: '01',
    title: 'ClutchG PC Optimizer',
    category: 'Windows tooling · Evidence-led product',
    summary:
      'A Windows optimization tool that makes risk, evidence, and rollback visible before a player changes their system.',
    ownership:
      'Built the optimizer workflow, desktop GUI, documentation, and safety model around reversible changes.',
    stack: ['Python', 'Windows', 'Desktop GUI', 'Research'],
    images: [
      { src: '/showcase/clutchg-dashboard.png', alt: 'ClutchG desktop dashboard with hardware summary, system score, and recommended profile', caption: 'Dashboard: hardware context before optimization' },
      { src: '/showcase/clutchg-quickfix.png', alt: 'ClutchG Quick Fix interface for grouped optimization actions', caption: 'Quick Fix: grouped-action interface from the development build' },
      { src: '/showcase/clutchg-context.png', alt: 'ClutchG custom tweak list with an explanation panel for the selected Windows setting', caption: 'Context: each tweak explains what it changes' },
      { src: '/showcase/clutchg-backup.png', alt: 'ClutchG backup screen showing automatic backup and a restore action', caption: 'Backup: a visible path back from a system change' },
    ],
    facts: [
      { value: '44', label: 'audited tweak contracts' },
      { value: '23', label: 'optimizer repositories studied' },
      { value: '3', label: 'risk tiers' },
    ],
    links: [{ href: 'https://github.com/neckttiie090520/clutchg-pc-optimizer', label: 'View public repository' }],
    caseStudy: {
      context: 'Competitive players are offered many Windows tweaks with little explanation of evidence, risk, or how to undo them.',
      why: 'An optimization tool should help a person understand the tradeoff before changing a real machine.',
      role: 'Designed and built the research-backed Windows optimizer, its Python GUI, backup and rollback flow, and documentation.',
      constraints: 'System changes can create instability. The project avoids disabling core Windows security protections and records changes for reversal.',
      decisions: 'Study existing tools, classify candidate changes by risk, and place hardware detection, profiles, documentation, backup, and restore into one guided workflow. A later code audit corrected the earlier 56-tweak claim: 45 passed screening and 44 had verified execution and rollback contracts.',
      build: [
        'Reviewed 23 open-source optimizer repositories and more than 200 techniques.',
        'Audited 44 executable, reversible tweak contracts across the risk framework.',
        'Built a desktop GUI with hardware detection and profile recommendations.',
        'Added automatic backup, change logging, and per-tweak rollback.',
      ],
      evidence: 'The public repository and a 158-page book document the research, GUI, risk model, and self-audit. The audit found that all nine Quick Action bundles still contained an unresolved item, so their fail-closed guard stopped those bundles from executing.',
      outcome: 'A documented desktop optimizer and an audit that corrected its own claim from 56 to 44 verified contracts. Quick Action repair was unfinished when the book was written; player FPS experiments were planned, not completed.',
    },
  },
  {
    id: 'actually-faster-book',
    index: '06',
    title: 'Actually Faster?',
    category: 'AI-assisted publishing · Software research',
    summary:
      'A 158-page book that turns my ClutchG research into a readable account of software evidence, risk, reversibility, and the gap between claims and code.',
    ownership:
      'I authored the project story and built an AI-assisted editorial pipeline for writing, figures, page layout, and quality review.',
    stack: ['AI-assisted editorial workflow', 'Python', 'HTML/CSS', 'SVG', 'PDF audit'],
    images: [
      { src: '/showcase/actually-faster-cover.webp', alt: 'Cover of the 158-page book Actually Faster?', caption: 'The finished 6 × 9 inch book cover' },
      { src: '/showcase/actually-faster-audit-funnel.webp', alt: 'Book infographic showing the candidate-to-implementation audit funnel', caption: 'Source-grounded figure: 200+ candidates → 45 screened → 44 verified contracts' },
      { src: '/showcase/actually-faster-risk-framework.webp', alt: 'Book page showing the risk classification framework for Windows changes', caption: 'Risk framework drawn as an SVG figure in the book' },
    ],
    links: [],
    caseStudy: {
      context: 'ClutchG began as a software and research project. Its methods, tradeoffs, and failure modes deserved an explanation that someone could follow beyond a code repository.',
      why: 'A book forces the engineering story to be readable and accountable: every number, figure, and recommendation needs a source and a clear limit.',
      role: 'I turned my own research and implementation into the manuscript, designed the editorial workflow, generated the book layout with Python, and reviewed its figures, language, and pagination.',
      constraints: 'The writing had to distinguish code that worked from design intent. AI could help shape prose and visuals, but claims had to trace back to source material and pass human review.',
      decisions: 'Build a repeatable pipeline: gather project evidence, draft and revise the narrative with AI assistance, create source-traced SVG figures, typeset a 6 × 9 inch PDF, then audit the prose and page layout.',
      build: [
        'Wrote a 158-page account of ClutchG and the research behind it.',
        'Used Python, HTML, and CSS to produce the cover, chapters, typography, and mirrored print gutters.',
        'Created seven source-traced SVG infographics and ran manuscript, Thai-language, and PDF layout audits.',
        'Used the book audit to correct an earlier 56-tweak claim to 44 verified execution and rollback contracts.',
      ],
      evidence: 'The preview images are rendered pages from the finished PDF; the production workspace contains the build, infographic, and audit scripts.',
      outcome: 'A finished 158-page book and a more honest account of the underlying software. The audit also surfaced unresolved Quick Action bundles; no measured FPS gain is claimed.',
    },
  },
  {
    id: 'comprice',
    index: '07',
    title: 'Comprice',
    category: 'In development · Thai PC commerce data',
    summary: 'A Thai PC-parts comparison and build-planning product that brings retailer prices, product specifications, and compatibility decisions into one workflow.',
    ownership: 'Building the data adapters, normalized catalogue, comparison API, and buyer-facing product experience.',
    stack: ['Python', 'FastAPI', 'SQLite', 'React', 'TypeScript'],
    visual: { label: 'THE PRODUCT FLOW', headline: 'Find the part. Check the whole build.', steps: ['Retail feeds', 'Normalize', 'Compare', 'Build'], note: 'Product in development · illustrative system flow' },
    links: [],
    caseStudy: {
      context: 'PC buyers in Thailand have to reconcile product names, specifications, stock, and prices spread across multiple storefronts.',
      why: 'A low price only helps when the buyer can see its source, freshness, and whether the component fits the rest of the build.',
      role: 'I am developing the collection and normalization layer, comparison API, compatibility workflow, and frontend.',
      constraints: 'Retailer feeds differ in format and reliability. Price provenance and compatibility must stay visible; the product is still in development.',
      decisions: 'Normalize store listings into a common component model, keep shop attribution beside every offer, and check socket, memory, form factor, and power constraints during build planning.',
      build: [
        'Developed adapters covering seven documented retail and marketplace sources.',
        'Built a Python API and SQLite catalogue for products, offers, history, and build slots.',
        'Designed a React interface for discovery, price comparison, and compatible PC builds.',
      ],
      evidence: 'The local project contains source adapters, API routes, the frontend, and product/architecture documentation. The UI is an active build, not a launched public product.',
      outcome: 'An integrated product under development. No live-store coverage, price accuracy, or buyer-adoption claim is made.',
    },
  },
  {
    id: 'homie',
    index: '08',
    title: 'Homie',
    category: 'In development · Private household PWA',
    summary: 'A two-person household PWA for shopping, calendars, pet care, shared finance, photos, and an activity feed that syncs between devices.',
    ownership: 'Building the product and its privacy-aware data model, realtime synchronization, mobile interface, and release workflow.',
    stack: ['Next.js', 'React', 'Supabase', 'Realtime', 'PWA'],
    visual: { label: 'THE SHARED LOOP', headline: 'One home. Two people. One current view.', steps: ['Shopping', 'Calendar', 'Pet care', 'Finance'], note: 'Private household workflow · no personal data shown' },
    links: [],
    caseStudy: {
      context: 'A shared home creates small daily coordination tasks that are easy to lose across messages and separate apps.',
      why: 'One calm mobile workflow can help two people see what changed, what is due, and what needs care without exposing household data.',
      role: 'I designed and built the app, data model, access rules, realtime update path, and seven-tab mobile experience.',
      constraints: 'The product is for a private two-person household. Finance, moods, receipts, and pet photos are personal; no real household records or private screenshots are published here.',
      decisions: 'Use household-scoped access rules and one realtime channel to synchronize shared records while keeping the interface focused on everyday actions.',
      build: [
        'Built shopping, calendar, pet care, finance, and activity workflows.',
        'Added private photo storage and synchronized updates across household devices.',
        'Prepared a PWA release path and a real-device review checklist.',
      ],
      evidence: 'The local application and handoff documentation record the completed implementation slices. Two-device user acceptance and cloud cutover remained open at the latest project handoff.',
      outcome: 'A working local product still moving through device review and deployment. No public launch or household impact metric is claimed.',
    },
  },
  {
    id: 'mcp-thai-thesis',
    index: '09',
    title: 'MCP Thai Thesis',
    category: 'Open source · Academic quality tooling',
    summary: 'An MCP server and AI skill set for reviewing Thai graduate theses: citations, language, consistency, formatting, and software-project documentation.',
    ownership: 'Turned problems encountered in my own thesis workflow into reusable tools and guidance for Thai academic writing.',
    stack: ['TypeScript', 'MCP', 'Thai language QA', 'APA', 'ISO 29110'],
    visual: { label: 'THESIS QUALITY LOOP', headline: 'Write, inspect, revise.', steps: ['Citations', 'Thai prose', 'Consistency', 'ISO 29110'], note: 'Human author retains the final judgment' },
    links: [{ href: 'https://github.com/neckttiie090520/mcp-thai-thesis', label: 'View public repository' }],
    caseStudy: {
      context: 'Thai graduate work combines language conventions, citation rules, university formats, and, for software theses, process documentation.',
      why: 'These checks are repetitive and easy to miss when a thesis grows across chapters and appendices.',
      role: 'Built and published a tool and skill ecosystem from the quality checks I needed during my own software-engineering thesis.',
      constraints: 'The tool assists review; it cannot guarantee academic approval, validate research truth, or replace an advisor or author.',
      decisions: 'Separate citation, prose, structure, consistency, and ISO 29110 checks so each produces issues a human can inspect and resolve.',
      build: [
        'Implemented a TypeScript MCP server for thesis review tasks.',
        'Packaged reusable AI skills and university-aware guidance.',
        'Documented setup, workflows, examples, and limits in the public repository.',
      ],
      evidence: 'The public source, README, tools, skills, and documentation are linked above.',
      outcome: 'An open-source quality-assurance workflow grounded in real thesis production. It helps review writing rather than generating or certifying a thesis.',
    },
  },
  {
    id: 'nzs-skills',
    index: '10',
    title: 'nzs-skills',
    category: 'Open source · Agent engineering',
    summary: 'An executable skill system that routes an AI coding task through evidence gathering, decisions, implementation, and verification in the medium where a claim can be checked.',
    ownership: 'Codified my working method and failure lessons into reusable agent instructions, validation rules, and documentation.',
    stack: ['Agent skills', 'JavaScript', 'Workflow design', 'Validation'],
    visual: { label: 'THE WORKING METHOD', headline: 'A claim needs a witness.', steps: ['Route', 'Gather', 'Build', 'Verify'], note: 'Check the result where the claim is true' },
    links: [{ href: 'https://github.com/neckttiie090520/nzs-skills', label: 'View public repository' }],
    caseStudy: {
      context: 'Coding agents can report a change as complete before anyone checks the real page, database, build, or cost ledger.',
      why: 'A repeatable method should make the next verification step explicit and record what remains uncertain.',
      role: 'Designed the skill system, its task router, review disciplines, documentation, and repository validation.',
      constraints: 'The method still relies on agents to attest to their own checks; the repository states that weakness openly.',
      decisions: 'Turn recurring project failures into specific evidence rules, then give each task a route and an observable exit condition.',
      build: [
        'Created entry skills for task routing, longer work, review, setup, and handoff.',
        'Added focused disciplines for research, implementation, security, and verification.',
        'Built repository validation for skill metadata, references, and reachability.',
      ],
      evidence: 'The public repository contains the skills, source incidents, validation script, and stated limitations.',
      outcome: 'A published agent-working method with executable repository checks. It does not claim that self-attested agent verification is independent proof.',
    },
  },
  {
    id: 'poop-detector',
    index: '11',
    title: 'Poop Detector',
    category: 'Private project · Computer vision automation',
    summary: 'A pet-care experiment that watches a camera region for cat litter events, records detections, and connects notifications and robot-control actions.',
    ownership: 'Built the detection workflow, control interface, event logging, and service integrations.',
    stack: ['Python', 'OpenCV', 'RTSP', 'SQLite', 'LINE API'],
    visual: { label: 'PRIVATE AUTOMATION', headline: 'Observe before acting.', steps: ['Camera', 'Filter', 'Log', 'Notify'], note: 'Conceptual flow · no camera footage shown' },
    links: [],
    caseStudy: {
      context: 'A camera-based pet-care task needs to distinguish an actual event from shadows and other visual noise before taking action.',
      why: 'A useful automation must let a person tune the monitored region, inspect detections, and see what was triggered.',
      role: 'Built the detector, local GUI, event API, logging, and integrations for notifications and follow-up actions.',
      constraints: 'The repository is private and camera footage, credentials, home details, and event records are excluded from this portfolio.',
      decisions: 'Use a configurable camera region and color/shape filters with persistence across frames before recording an event or invoking an integration.',
      build: [
        'Implemented RTSP monitoring and configurable detection filters.',
        'Added a GUI, API endpoints, and SQLite event history.',
        'Connected optional LINE notification, Google Drive backup, and robot-control paths.',
      ],
      evidence: 'The private source repository and its README describe the implemented modules; no footage, detection rate, or reliability metric is published.',
      outcome: 'A private home-automation project with inspectable events and configurable integrations. No production reliability claim is made.',
    },
  },
  {
    id: 'atk-firmwaremod',
    index: '04',
    title: 'ATK-FIRMWAREMOD',
    category: 'Firmware maintenance tooling',
    summary:
      'GUI and CLI tooling for an ATK mouse firmware sleep fix, with timeout analysis, backup, patching, and patch logging.',
    ownership:
      'Built a guided and scriptable firmware-maintenance workflow.',
    stack: ['GUI', 'CLI', 'Firmware tooling'],
    links: [],
    caseStudy: {
      context:
        'The tool addresses a sleep-behavior fix in ATK mouse firmware.',
      why:
        'Firmware changes need a repeatable path with enough context to inspect what will be changed and what happened.',
      role:
        'Built the GUI and CLI tooling around the firmware sleep-fix workflow.',
      constraints:
        'The workflow needs to account for timeout values and keep a backup and patch log.',
      decisions:
        'Provide both a guided interface and a command-line path, while making analysis and patch activity explicit.',
      build: [
        'Analyze firmware timeout behavior.',
        'Support GUI and CLI use.',
        'Back up firmware before applying a patch.',
        'Record patch activity in a log.',
      ],
      evidence:
        'The project README documents GUI and CLI support, timeout analysis, backup, patching, and logging.',
      outcome:
        'README-supported capabilities are listed above; no device compatibility or reliability metrics are claimed.',
    },
  },
  {
    id: 'inand-on',
    index: '05',
    title: 'InAndOn',
    category: 'Mobile-first business workflow · PWA',
    summary:
      'A mobile document workspace for a tailoring business: create cash bills, billing notes, receipts, and quotations from one focused flow.',
    ownership:
      'Designed and built the customer-facing PWA and connected its document workflow to a Google Apps Script backend.',
    stack: ['Mobile UX', 'PWA', 'Google Apps Script', 'Document workflows'],
    images: [
      {
        src: '/showcase/inandon-document-types.webp',
        alt: 'InAndOn mobile interface with four document choices: cash bill, billing note, receipt, and quotation.',
        caption: 'The live mobile interface starts with the document the business needs to create. No customer record is shown.',
      },
    ],
    links: [
      { href: 'https://neckttiie090520.github.io/inandon-pwa/index.html', label: 'Open live PWA' },
      { href: 'https://github.com/neckttiie090520/inandon-pwa', label: 'View public repository' },
    ],
    caseStudy: {
      context:
        'A tailoring business handles several document types while serving customers, often from a phone rather than a desk.',
      why:
        'A shared starting point for quoting and billing makes the next action clear, while keeping customer, item, deposit, and signature steps in one workflow.',
      role:
        'Designed and built the mobile PWA, document-entry flow, and Google Apps Script integration.',
      constraints:
        'The app handles real customer and transaction details; the public case shows only a blank product screen.',
      decisions:
        'Put the four document types up front, then carry the user through customer selection, line items, deposits, and signatures in the same mobile flow.',
      build: [
        'Built the mobile document selector and entry form for cash bills, billing notes, receipts, and quotations.',
        'Connected document creation and history to a Google Apps Script JSON backend.',
        'Made the app installable as a PWA and supported document sharing.',
      ],
      evidence:
        'The live public PWA shows the four document choices and blank entry flow. The public repository documents the implementation. The screenshot contains no customer data.',
      outcome:
        'A working, mobile-first document workflow for a real tailoring business. No transaction volume or revenue impact is claimed.',
    },
  },
  {
    id: 'qwen3vl-finetune-nexora',
    index: '06',
    title: 'qwen3vl-finetune-nexora',
    category: 'AI evaluation · Structured extraction',
    summary:
      'A model-evaluation and structured-extraction workflow where uncertain outputs go to human review.',
    ownership:
      'Worked on evaluation, structured extraction, and human-review flow at a public-safe level.',
    stack: ['Model evaluation', 'Structured extraction', 'Human review'],
    links: [],
    caseStudy: {
      context:
        'The work explores model evaluation and structured extraction for product workflows.',
      why:
        'When model output is uncertain, a person needs a clear review step before it is relied on.',
      role:
        'Worked on a workflow combining model evaluation, structured extraction, and human review.',
      constraints:
        'This summary stays at the workflow level and excludes internal data, screenshots, customer details, and performance claims.',
      decisions:
        'Keep uncertainty visible and route outputs that need judgment to a human reviewer.',
      build: [
        'Evaluate model output for structured extraction tasks.',
        'Represent extracted information in a structured workflow.',
        'Send uncertain outputs for human review.',
      ],
      evidence:
        'The public-safe project scope is model evaluation, structured extraction, and human review; no internal artifacts are linked.',
      outcome:
        'The described workflow retains human review for uncertain outputs. No accuracy or business-impact metrics are claimed.',
    },
  },
  {
    id: 'valscout',
    index: '07',
    title: 'Valscout',
    category: 'Competitive scouting',
    summary:
      'A Valorant scouting platform for coaches and analysts, based on public competitive data.',
    ownership:
      'Built a scouting platform that organizes public competitive data for analysis.',
    stack: ['Next.js', 'Supabase', 'Gemini'],
    links: [{ href: 'https://github.com/neckttiie090520/valscout', label: 'Repository (access may be restricted)' }],
    caseStudy: {
      context:
        'Coaches and analysts use competitive information to prepare for Valorant matches.',
      why:
        'A focused scouting platform can bring publicly available competitive data into one analysis workflow.',
      role:
        'Built a Valorant scouting platform for coaches and analysts.',
      constraints:
        'The portfolio summary is limited to public competitive data; no player-private or team-confidential material is shown.',
      decisions:
        'Use a web platform with Next.js and Supabase, with Gemini included in the product stack.',
      build: [
        'Design the scouting workflow for coach and analyst use.',
        'Build the platform with Next.js and Supabase.',
        'Integrate Gemini into the product stack.',
      ],
      evidence:
        'Project scope and stack are listed here. The repository is not linked because public access has not been confirmed.',
      outcome:
        'A scouting platform based on public competitive data; no team adoption or performance metrics are claimed.',
    },
  },
  {
    id: 'line-ai-secretary',
    index: '08',
    title: 'LINE AI Secretary',
    category: 'Personal productivity assistant',
    summary:
      'A personal LINE assistant for notes, search, reminders, tasks, and calendar management.',
    ownership:
      'Built the assistant around everyday personal organization tasks.',
    stack: ['Next.js', 'Supabase', 'LINE API', 'Google Calendar'],
    links: [],
    caseStudy: {
      context:
        'Notes, reminders, tasks, and calendar items are routine personal organization work.',
      why:
        'A LINE-based assistant keeps those actions close to a messaging workflow the user already uses.',
      role:
        'Built a personal assistant integrating LINE, Supabase, and Google Calendar.',
      constraints:
        'The product can contain personal information, so no personal-data screenshots or records are published.',
      decisions:
        'Bring notes, search, reminders, tasks, and calendar actions together through LINE.',
      build: [
        'Support notes and search.',
        'Add reminders and task handling.',
        'Connect calendar actions through Google Calendar.',
        'Build with Next.js, Supabase, and the LINE API.',
      ],
      evidence:
        'The verified product scope is notes, search, reminders, tasks, and calendar support; no personal data is displayed.',
      outcome:
        'A personal LINE assistant covering those workflows. No usage or productivity metrics are claimed.',
    },
  },
  {
    id: 'tracco-tracker',
    index: '09',
    title: 'Tracco Tracker',
    category: 'Workshop management',
    summary:
      'Workshop scheduling, tasks and submissions, team collaboration, and a real-time dashboard.',
    ownership:
      'Built the management workflow around workshop activity and live status.',
    stack: ['Workshop scheduling', 'Tasks and submissions', 'Real-time dashboard'],
    links: [
      {
        href: 'https://github.com/neckttiie090520/tracco-tracker',
        label: 'View public repository',
      },
    ],
    caseStudy: {
      context:
        'Running a workshop involves schedules, tasks, submissions, and coordination across a team.',
      why:
        'A shared workflow makes activity and current status easier to follow during a workshop.',
      role:
        'Built a workshop-management tracker and real-time dashboard.',
      constraints:
        'The tool needs to cover both scheduled activity and work submitted by participants.',
      decisions:
        'Keep scheduling, tasks, submissions, collaboration, and status in the same workflow.',
      build: [
        'Support workshop scheduling.',
        'Track tasks and submissions.',
        'Enable team collaboration.',
        'Present current activity in a real-time dashboard.',
      ],
      evidence:
        'The public source repository is linked from this page.',
      outcome:
        'A workshop-management product with scheduling, task/submission, collaboration, and dashboard features. No adoption metrics are claimed.',
    },
  },
];
