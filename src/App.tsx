import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Mascot } from 'page-mascot';
import {
  chapters,
  content,
  featuredProjects,
  projects,
  type ChapterId,
  type Project,
} from './content';
import { capabilityGroups, capabilitySpotlight } from './capabilities';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ProjectLinks({ project }: { project: Project }) {
  if (project.links.length === 0) return null;

  return (
    <div className="project-links">
      {project.links.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
          {link.label}<span aria-hidden="true"> ↗</span>
        </a>
      ))}
    </div>
  );
}

function EvidenceGallery({ project, compact = false }: { project: Project; compact?: boolean }) {
  const images = project.images ?? [];

  if (images.length === 0) return null;

  return (
    <div className={'evidence-gallery ' + (compact ? 'evidence-gallery--compact' : 'evidence-gallery--journey')} data-project={project.id} aria-label={`${project.title} visual story`}>
      {!compact && <p className="evidence-gallery__intro">Scroll through the work <span>{String(images.length).padStart(2, '0')} views ↓</span></p>}
      {images.map((item, index) => (
        <figure key={item.src} className="evidence-gallery__scene">
          <img src={item.src} alt={item.alt} loading="lazy" />
          <figcaption><span>{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>{item.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function TypingHeadline({ reduceMotion }: { reduceMotion: boolean | null }) {
  const name = 'Teeraphat Raksawong';
  const [length, setLength] = useState(reduceMotion ? name.length : 0);

  useEffect(() => {
    if (reduceMotion) {
      setLength(name.length);
      return;
    }
    let current = 0;
    const timer = window.setInterval(() => {
      current += 1;
      setLength(current);
      if (current >= name.length) window.clearInterval(timer);
    }, 50);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <h1 id="hero-title" className="hero__title" aria-label={`${name} (Necktie)`}>
      <span className="hero__name-line" aria-hidden="true">{name.slice(0, Math.min(length, 9))}{length <= 9 && <span className="hero__cursor">|</span>}</span>
      <span className="hero__name-line" aria-hidden="true">{length > 9 ? name.slice(10, length) : ''}{length > 9 && <span className="hero__cursor">|</span>}</span>
    </h1>
  );
}

const rotatingWords = ['products.', 'systems.', 'proof.'];

function RolodexStatement({ reduceMotion }: { reduceMotion: boolean | null }) {
  const wordsRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (reduceMotion || !wordsRef.current) return;
    const words = gsap.utils.toArray<HTMLElement>('.rolodex__word', wordsRef.current);
    gsap.set(words, { visibility: 'visible', opacity: 0, rotationX: 90, transformOrigin: '50% 100%' });
    gsap.set(words[0], { opacity: 1, rotationX: 0 });
    const sequence = gsap.timeline({ repeat: -1, repeatDelay: 0.25 });
    words.forEach((word, index) => {
      const next = words[(index + 1) % words.length];
      sequence.to({}, { duration: 2.1 });
      sequence.to(word, { rotationX: -90, opacity: 0, duration: 0.48, ease: 'power2.in', transformOrigin: '50% 0%' });
      sequence.fromTo(next,
        { rotationX: 90, opacity: 0, transformOrigin: '50% 100%' },
        { rotationX: 0, opacity: 1, duration: 0.55, ease: 'power3.out' },
        '<0.02',
      );
    });
  }, { scope: wordsRef, dependencies: [reduceMotion], revertOnUpdate: true });

  return (
    <p className="rolodex" aria-label="I build products, systems, and proof.">
      <span aria-hidden="true">I build </span>
      <span className="rolodex__stage" aria-hidden="true" ref={wordsRef}>
        {rotatingWords.map((word, index) => <span key={word} className={'rolodex__word' + (index === 0 ? ' rolodex__word--first' : '')}>{word}</span>)}
      </span>
    </p>
  );
}

const skillCards = [
  { label: 'AI-native Engineering', size: 'hero', tone: 'ink', angle: -5, lift: 2 },
  { label: 'Agent Systems', size: 'hero', tone: 'paper', angle: 4, lift: -4 },
  { label: 'AI Product Design', size: 'minor', tone: 'accent', angle: -8, lift: 3 },
  { label: 'LLM Evaluation', size: 'minor', tone: 'paper', angle: 7, lift: -5 },
  { label: 'Research', size: 'minor', tone: 'ink', angle: -3, lift: 4 },
  { label: 'Product Strategy', size: 'major', tone: 'paper', angle: -7, lift: -1 },
  { label: 'Software Architecture', size: 'major', tone: 'ink', angle: 3, lift: 5 },
  { label: 'UX / UI', size: 'minor', tone: 'paper', angle: 8, lift: 4 },
  { label: 'API Design', size: 'minor', tone: 'accent', angle: -5, lift: -3 },
  { label: 'Prototyping', size: 'minor', tone: 'ink', angle: 6, lift: 2 },
  { label: 'Data & Evaluation', size: 'major', tone: 'paper', angle: 8, lift: -5 },
  { label: 'Windows Systems', size: 'major', tone: 'paper', angle: -4, lift: 4 },
  { label: 'Data Pipelines', size: 'minor', tone: 'ink', angle: -7, lift: 3 },
  { label: 'Automation', size: 'minor', tone: 'paper', angle: 4, lift: -4 },
  { label: 'Reverse Engineering', size: 'major', tone: 'accent', angle: -3, lift: -2 },
  { label: 'Security Review', size: 'major', tone: 'ink', angle: 6, lift: 3 },
  { label: 'System Debugging', size: 'minor', tone: 'paper', angle: 5, lift: -5 },
  { label: 'IT Support', size: 'minor', tone: 'ink', angle: -6, lift: 4 },
  { label: 'Pentesting', size: 'minor', tone: 'accent', angle: 8, lift: 2 },
  { label: 'Games & Esports', size: 'minor', tone: 'paper', angle: -6, lift: 2 },
  { label: 'IT Operations', size: 'minor', tone: 'paper', angle: 5, lift: -4 },
  { label: 'Workflow Automation', size: 'minor', tone: 'accent', angle: -4, lift: 4 },
  { label: 'Full-stack Delivery', size: 'minor', tone: 'ink', angle: 4, lift: -5 },
  { label: 'CI / CD', size: 'minor', tone: 'paper', angle: -8, lift: 4 },
  { label: 'Computer Vision', size: 'minor', tone: 'ink', angle: 7, lift: -2 },
  { label: 'Technical Writing', size: 'minor', tone: 'paper', angle: -4, lift: 3 },
  { label: 'Workshops', size: 'minor', tone: 'accent', angle: 6, lift: -4 },
  { label: 'Creative Direction', size: 'minor', tone: 'ink', angle: -6, lift: 2 },
  { label: 'Audio & Video', size: 'minor', tone: 'paper', angle: 5, lift: -3 },
];

function HeroShowcase() {
  return (
    <section className="skill-wall" data-entrance aria-label="A preview of the domains I work across">
      <div className="skill-wall__header"><span>ONE METHOD, MANY LAYERS</span><span>DISCOVER → ENGINEER → OPERATE</span></div>
      <ul className="skill-wall__pile">
        {skillCards.map((skill, index) => (
          <li
            key={skill.label}
            className={`skill-card skill-card--${skill.size} skill-card--${skill.tone}`}
            style={{ '--angle': `${skill.angle}deg`, '--lift': `${skill.lift}px`, '--order': index } as CSSProperties}
          >
            <span>{skill.label}</span>
          </li>
        ))}
      </ul>
      <a className="skill-wall__footer" href="#capability-map">Explore the full capability map <span aria-hidden="true">↘</span></a>
    </section>
  );
}

function CaseNotes({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `case-notes-${project.id}`;

  return (
    <div className={'project-notes' + (isOpen ? ' is-open' : '')}>
      <button
        className="project-notes__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span>{isOpen ? 'Close case notes' : 'Open case notes'}</span>
        <span className="project-notes__glyph" aria-hidden="true"><span /></span>
      </button>
      <div className="project-notes__reveal" id={contentId} aria-hidden={!isOpen} inert={!isOpen}>
        <div className="project-notes__reveal-inner">
          <div className="project-notes__content">
            <div className="project-notes__masthead" aria-hidden="true"><span>CASE FILE / {project.index}</span><span>PROBLEM → DECISION → EVIDENCE</span></div>
            <dl className="case-facts">
              <div>
                <dt>Context</dt>
                <dd>{project.caseStudy.context}</dd>
              </div>
              <div>
                <dt>Why it mattered</dt>
                <dd>{project.caseStudy.why}</dd>
              </div>
              <div>
                <dt>Role and scope</dt>
                <dd>{project.caseStudy.role}</dd>
              </div>
              <div>
                <dt>Constraint and decision</dt>
                <dd>{project.caseStudy.constraints} {project.caseStudy.decisions}</dd>
              </div>
            </dl>
            <div className="case-facts__build">
              <h4>What I built</h4>
              <ol>
                {project.caseStudy.build.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
            <div className="case-facts__evidence">
              <h4>Evidence</h4>
              <p>{project.caseStudy.evidence}</p>
              <h4>Verified outcome or learning</h4>
              <p>{project.caseStudy.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectGraphic({ project }: { project: Project }) {
  if (project.id === 'nexora' || project.id === 'hotel-document-intelligence') {
    const isNexora = project.id === 'nexora';
    const steps = isNexora
      ? ['Scope the work', 'Ground in evidence', 'Agent proposes', 'Human authorizes']
      : ['Parse document', 'Extract fields', 'Check evidence', 'Human reviews'];
    return <figure className="system-figure" aria-label={`${project.title} system design: ${steps.join(', ')}`}>
      <div className="system-figure__top"><span>{isNexora ? 'NEXORA / AGENT WORK LAYER' : 'HOTEL CONTRACT / DOCUMENT INTELLIGENCE'}</span><span>DESIGN &amp; EVALUATION</span></div>
      <p className="system-figure__title">{isNexora ? 'AI prepares.\nPeople decide.' : 'From document\nto verified field.'}</p>
      <ol className="system-figure__flow">{steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}</ol>
      <figcaption>{isNexora ? 'Public-safe architecture concept · active internal work' : 'Public-safe evaluation workflow · internal data excluded'}</figcaption>
    </figure>;
  }

  if (project.id === 'clutchg-pc-optimizer') {
    return <figure className="case-visual case-visual--clutch" aria-label="ClutchG concept diagram showing evidence, risk, and rollback around 44 audited Windows tweak contracts">
      <div className="case-visual__top"><span>CLUTCHG / WINDOWS TOOLING</span><span>01—04</span></div>
      <div className="case-visual__headline"><strong>44</strong><span>audited contracts<br />evidence, risk<br />and rollback</span></div>
      <div className="case-visual__steps"><span>01 / Evidence</span><span>02 / Risk</span><span>03 / Backup</span><span>04 / Restore</span></div>
      <figcaption>Designed so every change has context and a way back.</figcaption>
    </figure>;
  }

  if (project.id === 'valscout') {
    return <figure className="case-visual case-visual--valscout" aria-label="Valscout concept diagram showing public competitive data organized into a scouting workflow">
      <div className="case-visual__top"><span>VALSCOUT / TACTICAL INTELLIGENCE</span><span>04—04</span></div>
      <div className="case-visual__map" aria-hidden="true"><i /><i /><i /><i /><b>A</b><b>B</b></div>
      <div className="case-visual__steps"><span>Public data</span><span>→</span><span>Patterns</span><span>→</span><span>Scouting report</span></div>
      <figcaption>From competitive data to a coach's next decision.</figcaption>
    </figure>;
  }

  if (project.feature === 'research') {
    return (
      <figure className="research-figure" aria-label="Research figures: 22,664 reviews across 11 restaurants, collected at 26 to 40 or more reviews per second">
        <div className="research-figure__main">
          <strong>{project.facts?.[0].value}</strong>
          <span>{project.facts?.[0].label}</span>
        </div>
        <div className="research-figure__details">
          {project.facts?.slice(1).map((fact) => (
            <div key={fact.label}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
        <figcaption>Oral presentation accepted · FAB 2026</figcaption>
      </figure>
    );
  }

  return (
    <figure className="product-figure">
      <div className="product-figure__topline">
        <span>Product / 01</span>
        <span>End-to-end</span>
      </div>
      <p className="product-figure__name">YouNum<span aria-hidden="true">.</span></p>
      <p className="product-figure__caption">One product, carried from first question to release.</p>
      <ol className="product-figure__flow" aria-label="Concept, user flow, design, architecture, build, launch, and iteration">
        {['Concept', 'Flow', 'Design', 'Architecture', 'Build', 'Launch', 'Iterate'].map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            {step}
          </li>
        ))}
      </ol>
    </figure>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className={'project-card project-card--featured project-card--' + (project.feature ?? 'product')} aria-labelledby={'project-' + project.id} data-reveal>
      <div className="featured-project__stage">
        <div className="project-card__body">
          <p className="project-card__category"><span>{project.index}</span> / {project.category}</p>
          <h3 id={'project-' + project.id}>{project.title}</h3>
          <p className="project-card__summary">{project.summary}</p>
          <p className="project-card__ownership">{project.ownership}</p>
          <p className="project-card__stack">
            <span className="visually-hidden">Technologies and methods: </span>
            {project.stack.join(' · ')}
          </p>
          <ProjectLinks project={project} />
        </div>
        <div className="project-card__visual">
          {project.images?.length ? <EvidenceGallery project={project} /> : <ProjectGraphic project={project} />}
        </div>
      </div>
      <CaseNotes project={project} />
      <div className="featured-project__story" aria-label={`${project.title} project story`}>
        <div><span>01 / The question</span><p>{project.caseStudy.context}</p></div>
        <div><span>02 / The decision</span><p>{project.caseStudy.decisions}</p></div>
        <div><span>03 / What it proved</span><p>{project.caseStudy.outcome}</p></div>
      </div>
    </article>
  );
}

function ProjectIndexRow({ project }: { project: Project }) {
  return (
    <article className="project-card project-card--index" aria-labelledby={'project-' + project.id} data-reveal>
      <p className="project-index__number" aria-hidden="true">{project.index}</p>
      <div className="project-index__heading">
        <p className="project-card__category">{project.category}</p>
        <h3 id={'project-' + project.id}>{project.title}</h3>
        {project.images?.length ? <EvidenceGallery project={project} compact /> : project.visual ? (
          <figure className="project-flow" aria-label={`${project.title} process: ${project.visual.steps.join(', ')}`}>
            <span className="project-flow__label">{project.visual.label}</span>
            <strong className="project-flow__headline">{project.visual.headline}</strong>
            <ol className="project-flow__steps">{project.visual.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
            <figcaption>{project.visual.note}</figcaption>
          </figure>
        ) : null}
      </div>
      <div className="project-index__detail">
        <p className="project-card__summary">{project.summary}</p>
        <p className="project-card__ownership">{project.ownership}</p>
        <p className="project-card__stack">
          <span className="visually-hidden">Technologies and methods: </span>
          {project.stack.join(' · ')}
        </p>
        <ProjectLinks project={project} />
        {project.id === 'actually-faster-book' && <BookPreview />}
        <CaseNotes project={project} />
      </div>
    </article>
  );
}

function BookPreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const previewUrl = '/files/Actually-Faster-Book-Preview.pdf';

  const closeReader = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || closingRef.current) return;

    const finish = () => {
      dialog.classList.remove('is-closing');
      dialog.close();
      window.dispatchEvent(new Event('mascot:book-closed'));
      closingRef.current = false;
      setIsOpen(false);
      setIsZoomed(false);
    };

    if (reduceMotion) {
      finish();
      return;
    }

    closingRef.current = true;
    dialog.classList.add('is-closing');
    const animation = dialog.animate(
      [{ opacity: 1, transform: 'translateY(0) scale(1)' }, { opacity: 0, transform: 'translateY(14px) scale(.985)' }],
      { duration: 220, easing: 'cubic-bezier(.4, 0, 1, 1)' },
    );
    animation.finished.then(finish, finish);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <div className="book-preview">
      <p className="book-preview__meta">22-page preview · Thai · Foreword and Chapter 1</p>
      <button className="book-preview__trigger" type="button" onClick={() => setIsOpen(true)}>
        Read the book preview <span aria-hidden="true">↗</span>
      </button>
      <dialog
        className="book-reader"
        ref={dialogRef}
        onClose={() => setIsOpen(false)}
        onCancel={(event) => { event.preventDefault(); closeReader(); }}
        onClick={(event) => { if (event.target === event.currentTarget) closeReader(); }}
        aria-labelledby="book-reader-title"
      >
        <div className="book-reader__bar">
          <div>
            <span className="book-reader__eyebrow">THE PROOF PROJECT / EBOOK PREVIEW</span>
            <h4 id="book-reader-title">Actually Faster?</h4>
          </div>
          <div className="book-reader__actions">
            <button className="book-reader__zoom" type="button" aria-pressed={isZoomed} onClick={() => setIsZoomed((value) => !value)}>{isZoomed ? 'Fit page' : 'Zoom in'}</button>
            <button className="book-reader__close" type="button" onClick={closeReader} aria-label="Close book preview">×</button>
          </div>
        </div>
        <div className={'book-reader__pages' + (isZoomed ? ' book-reader__pages--zoomed' : '')} aria-label="Read the first 22 pages of Actually Faster?">
          {Array.from({ length: 22 }, (_, index) => (
            <figure className="book-reader__page" key={index}>
              <img src={`/book-preview/page-${String(index + 1).padStart(2, '0')}.webp`} alt={`Actually Faster? preview page ${index + 1} of 22`} width="864" height="1296" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
              <figcaption>{String(index + 1).padStart(2, '0')} / 22</figcaption>
            </figure>
          ))}
        </div>
        <div className="book-reader__footer">
          <span>Read the foreword and first chapter.</span>
          <a href={previewUrl} target="_blank" rel="noreferrer">Open PDF in a new tab ↗</a>
        </div>
      </dialog>
    </div>
  );
}

type MascotMoment = { eyebrow: string; body: string; target?: string; action?: string };

const mascotMoments: Record<ChapterId, MascotMoment[]> = {
  intro: [
    { eyebrow: 'HELLO, HUMAN', body: "I’m CRT, Necktie’s tiny guide. He turns fuzzy ideas into working systems.", target: '#experience', action: 'Meet Necktie' },
    { eyebrow: 'A LITTLE BACKSTORY', body: 'Before software, Necktie made interactive art. There is a graduation gallery just below the introduction.', target: '#education', action: 'See where it began' },
  ],
  experience: [
    { eyebrow: 'BEHIND THE ROLE', body: 'Necktie connects product decisions, AI workflows, and engineering. The interesting bit is how those pieces become one working system.', target: '#evidence', action: 'See the proof' },
    { eyebrow: 'YES, HE TEACHES TOO', body: 'He has taken AI from the build room to the classroom, helping people turn a first idea into something they can use.', target: '#evidence', action: 'See the projects' },
  ],
  evidence: [
    { eyebrow: 'WELCOME TO THE WORK', body: 'Start with the question, then the decision, then the evidence. Each case note tells you why the work exists.', target: '#project-nexora', action: 'Start with Nexora' },
    { eyebrow: 'TAKE A CLOSER LOOK', body: 'Those are real interfaces and research figures. Open a case note if you want the thinking behind the pixels.', target: '#project-clutchg-pc-optimizer', action: 'Explore ClutchG' },
  ],
  approach: [
    { eyebrow: 'HOW HE BUILDS', body: 'The AIDLC connects the business question to product scope, agent design, implementation, evaluation, and release.', target: '#capability-map', action: 'See the capabilities' },
    { eyebrow: 'ONE METHOD, MANY TOOLS', body: 'AI is part of the process. Judgment, evidence, and a working result still belong to the engineer.', target: '#contact', action: 'Get in touch' },
  ],
  contact: [
    { eyebrow: 'YOU MADE IT', body: 'Thanks for spending time with Necktie’s work. A good problem is a great way to start a conversation.', target: 'mailto:pethreeday@gmail.com', action: 'Say hello' },
    { eyebrow: 'ONE LAST THING', body: 'Want the short version? The CV is ready. Want the full story? You can always scroll back through the work.', target: '#intro', action: 'Back to the start' },
  ],
};

const projectMoments: Record<string, string> = {
  nexora: 'Here is the agent work layer: AI prepares, evidence stays visible, and people keep the final say.',
  younum: 'YouNum went from a solo idea to a live product. Necktie owned the flow, interface, code, and launch.',
  'khaosoi-research': 'A data story with numbers: 22,664 public reviews across 11 Chiang Mai restaurants.',
  'clutchg-pc-optimizer': 'ClutchG makes Windows changes explainable and reversible. Look for the backup path in the interface.',
  'hotel-document-intelligence': 'Contracts can be messy. This workflow separates extraction, evidence checks, and human review.',
  'actually-faster-book': 'Plot twist: the software research became a 158-page book. You can read the opening 22 pages right here.',
  'inand-on': 'A mobile-first business tool, built around the work people actually do at the counter.',
  valscout: 'Game and esports knowledge meets product thinking here. Open the case note for the decisions behind it.',
  comprice: 'This one connects Thai PC retailer data, compatible parts, and a buyer-friendly build flow. Still in development.',
  homie: 'A small shared home has many moving parts. Homie brings them into one private, mobile-friendly place.',
  'mcp-thai-thesis': 'Necktie turned thesis-writing pain points into reusable checks for Thai academic work.',
  'nzs-skills': 'These agent skills make a simple promise: claims should come with evidence you can inspect.',
  'poop-detector': 'Yes, the name is real. It is a pet-care computer-vision experiment with event logs and notifications.',
  'atk-firmwaremod': 'A tiny hardware problem became a guided firmware workflow with backup and patch logging.',
  'qwen3vl-finetune-nexora': 'Here the focus is on preparing and evaluating vision-language models for a real document workflow.',
  'line-ai-secretary': 'A conversational assistant needs useful boundaries, good context, and a clear path back to a person.',
  'tracco-tracker': 'Tracking tools only help when the data is clear enough to act on. The case note explains the product choices.',
};

function PageMascot({ activeChapter, reduceMotion }: {
  activeChapter: ChapterId;
  reduceMotion: boolean | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [moment, setMoment] = useState<MascotMoment>(mascotMoments.intro[0]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const momentIndex = useRef(0);
  const lastChapter = useRef<ChapterId>(activeChapter);
  const educationInView = useRef(false);
  const creativeInView = useRef(false);

  const announce = useCallback((next: MascotMoment) => {
    setMoment(next);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (lastChapter.current === 'intro' && window.scrollY < window.innerHeight * 0.6 && (!window.location.hash || window.location.hash === '#intro')) {
        announce(mascotMoments.intro[0]);
      }
    }, 1150);
    return () => window.clearTimeout(timer);
  }, [announce]);

  useEffect(() => {
    if (lastChapter.current === activeChapter) return;
    lastChapter.current = activeChapter;
    momentIndex.current = 0;
    if (!isPaused) announce(mascotMoments[activeChapter][0]);
  }, [activeChapter, announce, isPaused]);

  useEffect(() => {
    const section = document.getElementById('education');
    if (isPaused || !section || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      educationInView.current = entry.isIntersecting;
      if (entry.isIntersecting) announce({ eyebrow: 'BEFORE THE CODE', body: 'A BFA in Media Art & Design came first. The graduation work made visitors part of the experience, a question Necktie still carries into software.', target: '#experience', action: 'Follow the story' });
    }, { rootMargin: '-20% 0px -55% 0px' });
    observer.observe(section);
    return () => { educationInView.current = false; observer.disconnect(); };
  }, [announce, isPaused]);

  useEffect(() => {
    const section = document.getElementById('creative-practice');
    if (isPaused || !section || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      creativeInView.current = entry.isIntersecting;
      if (entry.isIntersecting) announce({ eyebrow: 'THE CREATIVE SIDE', body: 'Before designing user flows, Necktie directed, filmed, edited, and made music. Start with the documentary, then follow the rest of the work.', target: 'https://www.youtube.com/watch?v=RjLryUSlC4c', action: 'Watch Graduated' });
    }, { rootMargin: '-20% 0px -55% 0px' });
    observer.observe(section);
    return () => { creativeInView.current = false; observer.disconnect(); };
  }, [announce, isPaused]);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible' || educationInView.current || creativeInView.current || document.querySelector('dialog[open]') || document.querySelector('#mascot-message:hover') || document.activeElement?.closest('#mascot-message')) return;
      const moments = mascotMoments[activeChapter];
      momentIndex.current = (momentIndex.current + 1) % moments.length;
      announce(moments[momentIndex.current]);
    }, 14000);
    return () => window.clearInterval(timer);
  }, [activeChapter, announce, isPaused]);

  useEffect(() => {
    if (!isOpen || isPaused) return;
    const timer = window.setTimeout(() => {
      if (!document.activeElement?.closest('#mascot-message')) setIsOpen(false);
    }, 8500);
    return () => window.clearTimeout(timer);
  }, [isOpen, moment, isPaused]);

  useEffect(() => {
    if (isPaused || !('IntersectionObserver' in window)) return;
    let lastProject = '';
    const observer = new IntersectionObserver((entries) => {
      const entry = entries.find((item) => item.isIntersecting);
      if (!entry) return;
      const id = entry.target.id.replace(/^project-/, '');
      if (id === lastProject || !projectMoments[id]) return;
      lastProject = id;
      announce({ eyebrow: 'PROJECT SPOTLIGHT', body: projectMoments[id], target: `#${entry.target.id}`, action: 'Stay with this project' });
    }, { rootMargin: '-22% 0px -56% 0px' });
    document.querySelectorAll<HTMLElement>('[id^="project-"]').forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [announce, isPaused]);

  useEffect(() => {
    if (isPaused) return;
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const notes = event.target.closest('.project-notes__toggle');
      if (notes && notes.getAttribute('aria-expanded') === 'false') {
        const title = notes.closest('article')?.querySelector<HTMLElement>('[id^="project-"]')?.textContent?.trim();
        announce({ eyebrow: 'CASE FILE OPEN', body: `${title || 'This project'} has more to tell. Follow the context, the decision, and what the work actually proved.` });
      }
    };
    const onBookClosed = () => announce({ eyebrow: 'BACK FROM THE BOOK?', body: 'That was only the opening chapter. The full project connects research, source-code audits, and a safer way to change Windows.' });
    document.addEventListener('click', onClick);
    window.addEventListener('mascot:book-closed', onBookClosed);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('mascot:book-closed', onBookClosed);
    };
  }, [announce, isPaused]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return (
    <div className={'page-mascot' + (activeChapter === 'contact' ? ' page-mascot--contact' : '')}>
      <motion.div
        id="mascot-message"
        className={'page-mascot__bubble' + (isOpen ? ' is-open' : '')}
        aria-hidden={!isOpen}
        inert={!isOpen}
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, y: 0, scale: 1, visibility: 'visible' },
          closed: { opacity: 0, y: 8, scale: 0.98, visibility: 'hidden' },
        }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="page-mascot__topline"><span className="page-mascot__eyebrow">CRT / {moment.eyebrow}</span><button type="button" className="page-mascot__dismiss" aria-label="Pause CRT messages" onClick={() => { setIsPaused(true); setIsOpen(false); buttonRef.current?.focus(); }}>×</button></div>
        <p className="page-mascot__intro" aria-live="polite">{moment.body}</p>
        {moment.target && <div className="page-mascot__links"><a href={moment.target} onClick={() => setIsOpen(false)}>{moment.action}<span aria-hidden="true"> ↗</span></a></div>}
      </motion.div>

      <Mascot directions="/mascots/crt-directions.webp" reactions="/mascots/crt-reactions.webp" size={84} label="CRT guide" className="page-mascot__crt" />
      <button
        ref={buttonRef}
        className="page-mascot__guide"
        type="button"
        aria-label={isPaused ? 'Resume CRT messages' : isOpen ? 'Hear another CRT tip' : content.mascot.openLabel}
        aria-expanded={isOpen}
        aria-controls="mascot-message"
        onClick={() => {
          if (isPaused) setIsPaused(false);
          const moments = mascotMoments[activeChapter];
          momentIndex.current = (momentIndex.current + 1) % moments.length;
          announce(moments[momentIndex.current]);
        }}
      >
        {isPaused ? 'Talk to CRT' : isOpen ? 'Tell me more' : 'Where next?'}
      </button>
    </div>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState<ChapterId>('intro');
  const mainRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const showcaseProjects = [
    featuredProjects.find((project) => project.id === 'nexora')!,
    featuredProjects.find((project) => project.id === 'younum')!,
    featuredProjects.find((project) => project.id === 'khaosoi-research')!,
    projects.find((project) => project.id === 'clutchg-pc-optimizer')!,
    featuredProjects.find((project) => project.id === 'hotel-document-intelligence')!,
  ].map((project, index) => ({ ...project, index: String(index + 1).padStart(2, '0') }));
  const indexedProjects = projects.filter((project) => project.id !== 'clutchg-pc-optimizer')
    .map((project, index) => ({ ...project, index: String(index + 6).padStart(2, '0') }));

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pulseAt = (target: EventTarget | null, x?: number, y?: number) => {
      if (reducedMotion.matches || !(target instanceof Element)) return;
      const control = target.closest('a, button, summary, [role="button"]');
      if (!control || control.matches(':disabled, [aria-disabled="true"]') || control.closest('dialog[open]')) return;
      const rect = control.getBoundingClientRect();
      const pulse = document.createElement('span');
      pulse.className = 'interaction-pulse';
      pulse.setAttribute('aria-hidden', 'true');
      pulse.style.left = `${x ?? rect.left + rect.width / 2}px`;
      pulse.style.top = `${y ?? rect.top + rect.height / 2}px`;
      document.body.appendChild(pulse);
      window.setTimeout(() => pulse.remove(), 600);
    };
    const onPointerDown = (event: PointerEvent) => pulseAt(event.target, event.clientX, event.clientY);
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.repeat && (event.key === 'Enter' || event.key === ' ')) pulseAt(event.target);
    };
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('keydown', onKeyDown, true);
    };
  }, []);

  useEffect(() => {
    let frame = 0;

    const updateChapter = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = window.innerHeight * 0.34;
        let current: ChapterId = 'intro';

        chapters.forEach(({ id }) => {
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top <= marker) current = id;
        });

        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
          current = 'contact';
        }
        setActiveChapter(current);
      });
    };

    window.addEventListener('scroll', updateChapter, { passive: true });
    window.addEventListener('resize', updateChapter);
    updateChapter();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateChapter);
      window.removeEventListener('resize', updateChapter);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [mobileMenuOpen]);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-entrance]', {
        y: 18,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power3.out',
      });

      gsap.fromTo('[data-ink-line]',
        { strokeDashoffset: 500 },
        { strokeDashoffset: 0, duration: 1.15, ease: 'power2.out', scrollTrigger: { trigger: '[data-ink-line]', start: 'top 85%', once: true } },
      );

      gsap.to('[data-liquid-map]', {
        attr: { scale: 3 },
        duration: 3.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      gsap.fromTo('.story-bridge__progress-fill', { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: '.story-bridge', start: 'top 75%', end: 'bottom 75%', scrub: true },
      });

      gsap.utils.toArray<HTMLElement>('.story-bridge__path li').forEach((step, index) => {
        gsap.from(step, {
          x: index % 2 === 0 ? -34 : 34,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 82%', once: true },
        });
      });

      gsap.fromTo('.capability-universe__tag', { y: -18 }, {
        y: 0,
        duration: 0.55,
        stagger: 0.025,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.capability-universe', start: 'top 86%', once: true },
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 16,
          autoAlpha: 0,
          duration: 0.55,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });
    });
    return () => media.revert();
  }, { scope: mainRef });

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <div className="site-header__inner">
          <a className="wordmark" href="#intro" aria-label="Teeraphat Raksawong, back to introduction">
            <span className="wordmark__mark" aria-hidden="true"><img src="/images/teeraphat-avatar.png" alt="" /></span>
            <span>Teeraphat Raksawong</span>
          </a>

          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="site-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span className="menu-toggle__icon" aria-hidden="true"><span /><span /></span>
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
          </button>

          <nav
            id="site-navigation"
            className={'site-nav' + (mobileMenuOpen ? ' site-nav--open' : '')}
            aria-label="Main navigation"
          >
            {chapters.map((chapter) => (
              <a
                key={chapter.id}
                href={'#' + chapter.id}
                aria-current={activeChapter === chapter.id ? 'location' : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span aria-hidden="true">{chapter.number}</span> {chapter.label}
              </a>
            ))}
          </nav>
          <a className="header-contact" href="#contact">Let’s talk<span aria-hidden="true"> ↗</span></a>
        </div>
      </header>

      <main id="main" className="site-main" ref={mainRef}>
        <section id="intro" className="hero" data-chapter="intro" aria-labelledby="hero-title">
          <div className="hero__copy">
            <p className="hero__role" data-entrance>
              <span className="section-index">01 / INTRODUCTION</span>
              <span>{content.role}</span>
            </p>
            <div className="hero__identity">
              <TypingHeadline reduceMotion={reduceMotion} />
              <div className="hero__signature" data-entrance>
                <div className="hero__avatar">
                  <img src="/images/teeraphat-avatar.png" alt="Illustrated avatar of Teeraphat Raksawong" />
                </div>
                <p className="hero__nickname">(Necktie)</p>
              </div>
            </div>
            <p className="hero__intro" data-entrance>
              I turn ambiguous business problems into <span className="hero__sketch-word">working AI systems
                <svg aria-hidden="true" viewBox="0 0 240 22" preserveAspectRatio="none"><path data-ink-line d="M3 15 C50 5, 100 18, 157 11 S218 10, 237 5" /></svg>
              </span>: defining the product, designing agents and architecture, building with AI, evaluating the result, and shipping it.
            </p>
            <p className="hero__background" data-entrance>{content.hero.background}</p>
            <div className="hero__actions" data-entrance>
              <a className="button button--accent" href="#evidence">{content.hero.workCta}</a>
              <a className="button button--outline" href={content.cvUrl} download>{content.hero.cvCta}</a>
            </div>
          </div>

          <HeroShowcase />

          <div className="identity-strip" data-reveal>
            <p><a href="#education">Education <span aria-hidden="true">↘</span></a><strong>{content.hero.education.map((degree) => <span key={degree}>{degree}</span>)}</strong></p>
            <p><span>Research focus</span><strong>{content.hero.thesis}</strong></p>
          </div>
        </section>

        <section id="education" className="education-section" aria-labelledby="education-title">
          <div className="chapter-heading" data-reveal>
            <p className="chapter-heading__number">THE FOUNDATION / EDUCATION</p>
            <div>
              <h2 id="education-title">Before software, I built experiences.</h2>
              <p>My work began in media art: asking what changes when someone can step in, touch, and become part of the experience. That question still shapes how I build products and AI systems.</p>
            </div>
          </div>

          <div className="education-degrees" data-reveal>
            <div className="education-degree">
              <span className="education-degree__year">2020–2023</span>
              <div><h3>Bachelor of Fine Arts in Media Art and Design</h3><p>Faculty of Fine Arts, Chiang Mai University</p><p>Interactive art design and innovative integration.</p></div>
            </div>
            <div className="education-degree">
              <span className="education-degree__year">2024–present</span>
              <div><h3>Master of Software Engineering <span className="education-degree__status">Candidate</span></h3><p>College of Arts, Media and Technology, Chiang Mai University</p><p>Research focus: Windows OS latency and FPS player performance.</p></div>
            </div>
          </div>

          <div className="education-work">
            <div className="education-work__story" data-reveal>
              <p className="education-work__eyebrow">UNDERGRADUATE WORK / INTERACTION → INSTALLATION</p>
              <h3>A visitor completes the work.</h3>
              <p>The early experiments invited people to interact with a physical object. The graduation work grew into an installation that people could move through and experience together. I kept developing that work over time.</p>
              <p>It taught me to design for a real person in front of the work. Today I apply the same instinct to user flows, software, and AI: make the system respond in a way people can understand.</p>
              <p className="hand-note hand-note--education">What happens if someone touches it? ↗</p>
              <a href="https://www.instagram.com/p/Cy-xeAZvep4/" target="_blank" rel="noreferrer">See the 2023 pre-thesis post <span aria-hidden="true">↗</span></a>
            </div>
            <div className="education-gallery" aria-label="Media Art and Design project photographs">
              <figure className="education-gallery__image education-gallery__image--main" data-reveal><img src="/images/education/graduation-installation.jpg" alt="Visitors gathered around a sculptural graduation installation in a red-lit room" width="2160" height="2880" loading="lazy" decoding="async" /><figcaption><span>01 / 04</span> Graduation installation · people in the space</figcaption></figure>
              <figure className="education-gallery__image" data-reveal><img src="/images/education/touch-experiment.jpg" alt="A visitor touches a glowing plasma sphere in an early interactive art experiment" width="1080" height="1440" loading="lazy" decoding="async" /><figcaption><span>02 / 04</span> Pre-thesis · an invitation to touch</figcaption></figure>
              <figure className="education-gallery__image" data-reveal><img src="/images/education/visitor-experiment.jpg" alt="Visitors looking at the interactive object inside a wooden enclosure" width="2160" height="2880" loading="lazy" decoding="async" /><figcaption><span>03 / 04</span> The experience, seen with visitors</figcaption></figure>
              <figure className="education-gallery__image" data-reveal><img src="/images/education/installation-process.jpg" alt="White sculptural forms during construction of the installation" width="2160" height="2880" loading="lazy" decoding="async" /><figcaption><span>04 / 04</span> Form taking shape during the build</figcaption></figure>
            </div>
          </div>

          <div id="creative-practice" className="creative-practice" aria-labelledby="creative-practice-title">
            <div className="creative-practice__intro" data-reveal>
              <p className="education-work__eyebrow">CREATIVE PRACTICE / FILM & MUSIC</p>
              <h3 id="creative-practice-title">I learned to tell a story before I built software.</h3>
              <p>Outside interactive installations, I worked behind the camera and made music. Directing, shooting, editing, songwriting, and covers taught me how to shape a sequence for people who will actually watch or listen. That sense of pacing still informs how I present a product and guide someone through it.</p>
              <p className="hand-note hand-note--creative">There is always another way to tell it. ↘</p>
            </div>

            <div className="creative-practice__features">
              <a className="creative-film creative-film--lead" href="https://www.youtube.com/watch?v=RjLryUSlC4c" target="_blank" rel="noreferrer" data-reveal aria-label="Watch Graduated, a short documentary directed, filmed, and edited by Teeraphat Raksawong on YouTube">
                <span className="creative-film__visual"><img src="https://i.ytimg.com/vi/RjLryUSlC4c/hqdefault.jpg" alt="Still from the short documentary Graduated" loading="lazy" decoding="async" /><span className="creative-film__play" aria-hidden="true">↗</span></span>
                <span className="creative-film__meta">SHORT DOCUMENTARY <span>21 MIN · 2021</span></span>
                <strong>Graduated</strong>
                <span className="creative-film__role">Director · Director of Photography · Editor</span>
              </a>

              <div className="creative-music" data-reveal>
                <div className="creative-music__waves" aria-hidden="true">{[22, 42, 64, 36, 78, 53, 95, 58, 39, 72, 48, 86, 60, 32, 68, 43, 79, 51, 26, 62, 38, 73, 47, 24].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}</div>
                <p className="creative-music__label">MUSIC / NEXTZUS STUDIO</p>
                <h4>Original songs & covers.</h4>
                <p>I write songs and share original work and covers through my YouTube channel.</p>
                <div className="creative-music__links">
                  <a href="https://www.youtube.com/watch?v=VpjOSOCzDus" target="_blank" rel="noreferrer">Listen to an original track <span aria-hidden="true">↗</span></a>
                  <a href="https://www.youtube.com/watch?v=szPEpbjPhA8" target="_blank" rel="noreferrer">Listen to a cover <span aria-hidden="true">↗</span></a>
                  <a href="https://www.youtube.com/@NextzusStudio_official/featured" target="_blank" rel="noreferrer">Explore Nextzus Studio <span aria-hidden="true">↗</span></a>
                </div>
              </div>
            </div>

            <div className="creative-video-list" aria-label="Selected film and video work">
              {[
                { id: 'HSGF20gdvDI', type: 'MOVING IMAGE / AD', title: 'Another Place', detail: 'A headphone advertisement made for a moving-image course.', role: 'Course project · moving-image advertisement' },
                { id: 'i7xiiDgpHxI', type: 'VLOG / 2020', title: 'Vlog film · 01', detail: 'Camera and editing for a vlog.', role: 'Camera · Editor' },
                { id: 'RJeFe-Ae7PE', type: 'VLOG / 2021', title: 'Vlog film · 02', detail: 'Camera and editing for a second vlog.', role: 'Camera · Editor' },
              ].map((film) => (
                <a className="creative-video" href={`https://www.youtube.com/watch?v=${film.id}`} target="_blank" rel="noreferrer" key={film.id} data-reveal aria-label={`Watch ${film.type}: ${film.title} on YouTube`}>
                  <span className="creative-video__image"><img src={`https://i.ytimg.com/vi/${film.id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" /></span>
                  <span className="creative-video__copy"><span>{film.type}</span><strong>{film.title}</strong><span>{film.detail}</span><small>{film.role}</small></span>
                  <span className="creative-video__arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section" data-chapter="experience" aria-labelledby="experience-title">
          <div className="chapter-heading" data-reveal>
            <p className="chapter-heading__number">02 / EXPERIENCE</p>
            <div>
              <h2 id="experience-title">{content.experience.title}</h2>
              <p>{content.experience.intro}</p>
            </div>
          </div>

          <div className="experience-list">
            {content.experience.roles.map((role) => (
              <article className="experience-entry" key={role.title} data-reveal>
                <p className="experience-entry__period">{role.period}</p>
                <div className="experience-entry__body">
                  <p className="experience-entry__company">{role.company}</p>
                  <h3>{role.title}</h3>
                  <p>{role.description}</p>
                  {role.contributions.length > 0 && (
                    <ul>
                      {role.contributions.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                  {role.engagements.length > 0 && (
                    <div className="experience-engagements">
                      <p className="experience-engagements__label">SELECTED WORKSHOPS</p>
                      <ol>
                        {role.engagements.map((engagement) => (
                          <li key={engagement.title}>
                            <div className="experience-engagements__heading">
                              <h4>{engagement.title}</h4>
                              <time>{engagement.date}</time>
                            </div>
                            <p>{engagement.detail}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {role.images.length > 0 && (
                    <div className="experience-gallery" aria-label={`${role.title} photos`}>
                      {role.images.map((photo) => (
                        <figure className="experience-gallery__item" key={photo.src}>
                          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                          <figcaption>{photo.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="story-bridge" aria-labelledby="story-bridge-title">
          <svg className="visually-hidden" aria-hidden="true" width="0" height="0" focusable="false"><filter id="liquid-type"><feTurbulence type="fractalNoise" baseFrequency="0.008 0.025" numOctaves="2" seed="4" result="noise" /><feDisplacementMap data-liquid-map in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" /></filter></svg>
          <div className="story-bridge__header" data-reveal>
            <span className="story-bridge__eyebrow">THE WAY I WORK / 01—04</span>
            <span className="story-bridge__hint">KEEP SCROLLING ↓</span>
          </div>
          <div className="story-bridge__body">
            <div className="story-bridge__thought" data-reveal><h2 id="story-bridge-title">I begin with<br /><em>the question.</em></h2><p className="hand-note hand-note--bridge">Wait, what problem are we solving?</p></div>
            <div className="story-bridge__aside" data-reveal>
              <div className="story-bridge__motion-panel">
                <RolodexStatement reduceMotion={reduceMotion} />
                <p>What does the business need to achieve, and who has authority over the result? My AIDLC turns that question into a scoped product, a governed AI workflow, and working software.</p>
              </div>
              <a href="#evidence" className="story-bridge__cta">See the work <span aria-hidden="true">↘</span></a>
            </div>
          </div>
          <div className="story-bridge__progress" aria-hidden="true"><span className="story-bridge__progress-fill" /></div>
          <ol className="story-bridge__path" aria-label="My product process">
            <li><span>01 / BUSINESS</span><strong>Find the real problem</strong></li>
            <li><span>02 / PRODUCT</span><strong>Define scope and flow</strong></li>
            <li><span>03 / AI + SOFTWARE</span><strong>Engineer the system</strong></li>
            <li><span>04 / EVIDENCE</span><strong>Evaluate, ship, and learn</strong></li>
          </ol>
          <a className="story-bridge__down" href="#evidence" aria-label="Scroll to selected projects"><span aria-hidden="true">↓</span><span>SELECTED PROJECTS BELOW</span></a>
        </section>

        <section id="evidence" className="work-section" data-chapter="evidence" aria-labelledby="work-title">
          <div className="chapter-heading" data-reveal>
            <p className="chapter-heading__number">03 / SELECTED WORK</p>
            <div>
              <h2 id="work-title">{content.evidence.title}</h2>
              <p>{content.evidence.intro}</p>
            </div>
          </div>

          <div className="featured-projects">
            <p className="project-group-label">{content.evidence.featuredLabel}</p>
            {showcaseProjects.map((project) => <FeaturedProject key={project.id} project={project} />)}
          </div>

          <div className="project-index">
            <p className="project-group-label">{content.evidence.indexLabel}<span>{String(indexedProjects.length).padStart(2, '0')} additional projects</span></p>
            <div className="project-index__list">
              {indexedProjects.map((project) => <ProjectIndexRow key={project.id} project={project} />)}
            </div>
          </div>
        </section>

        <section id="approach" className="method-section" data-method data-chapter="approach" aria-labelledby="method-title">
          <div className="chapter-heading chapter-heading--light" data-reveal>
            <p className="chapter-heading__number">04 / AIDLC &amp; CAPABILITIES</p>
            <div>
              <h2 id="method-title">{content.approach.title}</h2>
              <p>{content.approach.intro}</p>
            </div>
          </div>

          <ol className="method-list">
            {content.approach.steps.map((step, index) => (
              <li key={step.title} data-method-step data-reveal>
                <span className="method-list__index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="point-of-view" data-reveal>
            <div className="point-of-view__intro">
              <p className="point-of-view__eyebrow">{content.approach.pointOfView.eyebrow}</p>
              <h3>{content.approach.pointOfView.title}</h3>
              <p>{content.approach.pointOfView.body}</p>
              <p className="hand-note hand-note--belief">Make it useful. Then see if it worked.</p>
            </div>
            <ol className="point-of-view__principles">
              {content.approach.pointOfView.principles.map((principle, index) => (
                <li key={principle.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h4>{principle.title}</h4>
                  <p>{principle.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="capabilities-section" id="capability-map">
            <div className="capability-universe__intro" data-reveal>
              <p className="capabilities-section__label">THE THINGS I BUILD / DESIGN / ENGINEER / CREATE</p>
              <h3>One person.<br /><em>Many disciplines.</em></h3>
              <p>Media art led me into interaction design, software, AI, agents, product systems, and creative technology. My way of working connects these fields instead of treating them as separate careers.</p>
            </div>
            <div className="capability-universe" aria-label={`${capabilitySpotlight.length} selected capabilities`}>
              {capabilitySpotlight.map((capability, index) => (
                <span className={`capability-universe__tag capability-universe__tag--${capability.size}`} style={{ '--skill-index': index } as CSSProperties} key={capability.label}>{capability.label}</span>
              ))}
            </div>
            <div className="capability-catalog__heading" data-reveal>
              <div><p className="capabilities-section__label">EXPLORE THE FULL MAP</p><h4>Twenty-seven areas of practice.</h4></div>
              <p>Open a discipline to see the full set. <span>{capabilityGroups.reduce((count, group) => count + group.items.length, 0)} labels across {capabilityGroups.length} areas.</span></p>
            </div>
            <div className="capability-catalog">
              {capabilityGroups.map((group) => (
                <details className="capability-catalog__group" key={group.id}>
                  <summary>
                    <span className="capability-catalog__number">{group.id}</span>
                    <span className="capability-catalog__summary"><strong>{group.title}</strong><span>{group.items.slice(0, 3).join(' · ')}</span></span>
                    <span className="capability-catalog__count">{group.items.length} skills</span>
                    <span className="capability-catalog__expand" aria-hidden="true">+</span>
                  </summary>
                  <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </details>
              ))}
            </div>
            <p className="capability-universe__footer">From business systems to interactive media. <span>Same curiosity, different materials.</span></p>
          </div>

          <p className="language-note">{content.approach.language}</p>
        </section>

        <section id="contact" className="contact-section" data-chapter="contact" aria-labelledby="contact-title">
          <div className="contact-section__copy">
            <p className="chapter-heading__number">05 / CONTACT</p>
            <h2 id="contact-title">{content.contact.title}</h2>
            <p>{content.contact.body}</p>
          </div>
          <div className="contact-section__actions">
            <a className="button button--dark" href={'mailto:' + content.contact.email}>{content.contact.emailCta}</a>
            <a className="button button--light" href={content.cvUrl} download>{content.contact.cvCta}</a>
          </div>
          <PageMascot activeChapter={activeChapter} reduceMotion={reduceMotion} />
        </section>
      </main>

      <footer className="site-footer">
        <a className="site-footer__name" href="#intro">{content.name} <span>({content.nickname})</span></a>
        <p>{content.contact.footer}</p>
        <div className="site-footer__links">
          <a href={'mailto:' + content.contact.email}>{content.contact.email}</a>
          <a href={'tel:' + content.contact.phoneHref}>{content.contact.phone}</a>
          <a href={content.contact.github} target="_blank" rel="noreferrer">{content.contact.githubLabel}<span aria-hidden="true"> ↗</span></a>
        </div>
        <a className="site-footer__top" href="#intro">Back to top ↑</a>
      </footer>
    </MotionConfig>
  );
}

export default App;
