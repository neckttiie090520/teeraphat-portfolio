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
  { id: 'approach', number: '04', label: 'Approach' },
  { id: 'contact', number: '05', label: 'Contact' },
];

export const content = {
  name: 'Teeraphat Raksawong',
  nickname: 'Necktie',
  role: 'AI Lead Engineer · Product builder',
  cvUrl: '/files/Teeraphat-Raksawong-CV-2026.pdf',
  hero: {
    intro:
      'I move from product questions to working software: shaping the flow, building the system, and checking the result.',
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
      'I work across discovery, technical direction, implementation, and the details that help a team keep moving.',
    roles: [
      {
        period: 'Sep 2026–Present',
        title: 'AI Lead Engineer',
        company: 'DMC Connect',
        description:
          'Hands-on technical direction and high-level product work on Nexora, from discovery and architecture through AI integration, testing, and iteration.',
        contributions: [
          'Workflow automation and structured data and document workflows',
          'AI-assisted engineering practices and technical hiring',
          'Cloud and Google Workspace support',
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
  bridge: 'From a question → to a working system → to evidence.',
  evidence: {
    title: 'Selected evidence',
    intro:
      'Four projects lead the story: safety-first Windows tooling, a solo product, measured data collection, and a scouting workflow. Open a case note for the decisions and evidence behind each one.',
    featuredLabel: 'Featured work',
    indexLabel: 'More projects',
  },
  approach: {
    title: 'Approach & skills',
    intro:
      'I like clear constraints, small testable steps, and systems that make uncertainty visible instead of hiding it.',
    steps: [
      {
        title: 'Understand the work',
        body: 'Clarify who needs the tool, what slows them down, and what a useful first release would prove.',
      },
      {
        title: 'Shape the flow',
        body: 'Make the user journey and system boundaries legible before adding technical complexity.',
      },
      {
        title: 'Build with checkpoints',
        body: 'Integrate the product in small steps, test important paths, and send uncertain AI output to a person.',
      },
      {
        title: 'Release and learn',
        body: 'Check the real workflow, respond to feedback, and iterate without inventing success metrics.',
      },
    ],
    skills: [
      {
        title: 'Product & engineering',
        items: [
          'Product discovery',
          'User flows and UX/UI',
          'System architecture',
          'Full-stack delivery',
          'Testing and iteration',
        ],
      },
      {
        title: 'AI & workflows',
        items: [
          'AI integration',
          'Model evaluation',
          'Structured extraction',
          'Human review',
          'Workflow automation',
        ],
      },
      {
        title: 'Team enablement',
        items: [
          'Technical direction',
          'AI-assisted engineering',
          'Technical hiring',
          'Cloud support',
          'Google Workspace',
        ],
      },
    ],
    language: 'English: conversational for workplace communication.',
  },
  contact: {
    title: 'Have a useful problem to solve?',
    body:
      'I’m open to conversations about AI and software engineering, product work, and practical workflow improvements.',
    email: 'pethreeday@gmail.com',
    phone: '095-036-2311',
    phoneHref: '+66950362311',
    github: 'https://github.com/neckttiie090520',
    githubLabel: 'GitHub · neckttiie090520',
    emailCta: 'Email Teeraphat',
    cvCta: 'Download CV',
    footer: 'Built around evidence, useful software, and clear decisions.',
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
        body: 'See how I work, then use the contact links if a project sounds relevant.',
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
      { src: '/showcase/younum-landing.webp', alt: 'YouNum landing page with its night sky theme and number reading entry point', caption: 'The public product entry point · YouNum' },
      { src: '/showcase/younum-home.png', alt: 'YouNum personal dashboard with dream, birthday, home number, and daily mood entry points', caption: 'The dashboard brings several number journeys into one flow' },
      { src: '/showcase/younum-dream.png', alt: 'YouNum dream journal with voice recording action', caption: 'A voice-first way to capture a dream before interpretation' },
      { src: '/showcase/younum-flow.png', alt: 'YouNum number energy flow showing the selected method and saved context', caption: 'The underlying choices stay visible before the result' },
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
    facts: [
      { value: '56', label: 'vetted tweaks' },
      { value: '23', label: 'optimizer repositories studied' },
      { value: '3', label: 'risk tiers' },
    ],
    links: [{ href: 'https://github.com/neckttiie090520/clutchg-pc-optimizer', label: 'View public repository' }],
    caseStudy: {
      context: 'Competitive players are offered many Windows tweaks with little explanation of evidence, risk, or how to undo them.',
      why: 'An optimization tool should help a person understand the tradeoff before changing a real machine.',
      role: 'Designed and built the research-backed Windows optimizer, its Python GUI, backup and rollback flow, and documentation.',
      constraints: 'System changes can create instability. The project avoids disabling core Windows security protections and records changes for reversal.',
      decisions: 'Study existing tools, classify 56 vetted tweaks by risk, and place hardware detection, profiles, documentation, backup, and restore into one guided workflow.',
      build: [
        'Reviewed 23 open-source optimizer repositories and more than 200 techniques.',
        'Organized 56 vetted tweaks across 10 categories and three risk tiers.',
        'Built a desktop GUI with hardware detection and profile recommendations.',
        'Added automatic backup, change logging, and per-tweak rollback.',
      ],
      evidence: 'The public repository documents the research method, GUI, tweak encyclopedia, and restore workflow.',
      outcome: 'A published, reversible Windows optimization tool. No FPS improvement is claimed as a measured result here.',
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
    category: 'Business workflow PWA',
    summary:
      'A quotation and cash-bill PWA for a tailoring business, backed by Google Apps Script.',
    ownership:
      'Built a small-business workflow around quotations and cash bills.',
    stack: ['PWA', 'Google Apps Script'],
    links: [],
    caseStudy: {
      context:
        'A tailoring business needs to create quotations and cash bills as part of its everyday work.',
      why:
        'Bringing those tasks into one focused PWA supports the business workflow without publishing customer or bill records.',
      role:
        'Built the PWA and its Google Apps Script backend for quotation and cash-bill work.',
      constraints:
        'The work involves customer and transaction details, so this portfolio describes the product flow only and shows no records.',
      decisions:
        'Keep the interface focused on quoting and billing, with Google Apps Script handling the backend.',
      build: [
        'Shape the quotation and cash-bill steps for a tailoring workflow.',
        'Build the PWA interface.',
        'Connect it to a Google Apps Script backend.',
      ],
      evidence:
        'The project scope is a tailoring-business quotation and cash-bill PWA; no customer data, bills, or private screenshots are published.',
      outcome:
        'A workflow-specific PWA is the verified deliverable. No transaction volume or business-result metrics are claimed.',
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
        href: 'https://traco-tracker.vercel.app/',
        label: 'Open live product',
      },
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
        'The live product and public source repository are linked from this page.',
      outcome:
        'A live workshop-management product with scheduling, task/submission, collaboration, and dashboard features. No adoption metrics are claimed.',
    },
  },
];
