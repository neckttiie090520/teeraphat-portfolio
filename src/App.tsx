import { useEffect, useRef, useState, type CSSProperties } from 'react';
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
  const [active, setActive] = useState(0);
  const images = project.images ?? [];

  if (images.length === 0) return null;

  const item = images[active];
  return (
    <div className={'evidence-gallery' + (compact ? ' evidence-gallery--compact' : '')} data-project={project.id} aria-label={`${project.title} image gallery`}>
      <figure className="evidence-gallery__frame">
        <img src={item.src} alt={item.alt} loading="lazy" />
        <figcaption>{item.caption}</figcaption>
      </figure>
      {images.length > 1 && (
        <div className="evidence-gallery__controls">
          <button type="button" aria-label={`Previous ${project.title} image`} onClick={() => setActive((index) => (index + images.length - 1) % images.length)}>←</button>
          <span aria-live="polite">{String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
          <button type="button" aria-label={`Next ${project.title} image`} onClick={() => setActive((index) => (index + 1) % images.length)}>→</button>
        </div>
      )}
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

const skillCards = [
  { label: 'Product engineering', size: 'hero', tone: 'ink', angle: -5, lift: 2 },
  { label: 'AI integration', size: 'hero', tone: 'accent', angle: 4, lift: -4 },
  { label: 'UX/UI & user flows', size: 'major', tone: 'paper', angle: -7, lift: -1 },
  { label: 'System architecture', size: 'hero', tone: 'paper', angle: 3, lift: 5 },
  { label: 'TypeScript', size: 'minor', tone: 'ink', angle: 9, lift: -5 },
  { label: 'React', size: 'minor', tone: 'paper', angle: -4, lift: 4 },
  { label: 'Full-stack delivery', size: 'major', tone: 'accent', angle: -3, lift: -2 },
  { label: 'Next.js', size: 'minor', tone: 'paper', angle: 6, lift: 3 },
  { label: 'Workflow automation', size: 'hero', tone: 'ink', angle: -2, lift: 5 },
  { label: 'Python', size: 'minor', tone: 'accent', angle: 8, lift: -5 },
  { label: 'Supabase', size: 'minor', tone: 'paper', angle: -8, lift: 3 },
  { label: 'API design', size: 'minor', tone: 'paper', angle: 5, lift: -4 },
  { label: 'Agentic workflows', size: 'major', tone: 'paper', angle: -6, lift: 1 },
  { label: 'Model evaluation', size: 'major', tone: 'ink', angle: 3, lift: -2 },
  { label: 'Structured extraction', size: 'major', tone: 'accent', angle: -4, lift: 4 },
  { label: 'Human review', size: 'minor', tone: 'paper', angle: 8, lift: -3 },
  { label: 'Data pipelines', size: 'minor', tone: 'ink', angle: -6, lift: 2 },
  { label: 'Product discovery', size: 'minor', tone: 'paper', angle: 4, lift: -5 },
  { label: 'Windows tooling', size: 'minor', tone: 'paper', angle: -7, lift: 4 },
  { label: 'Google Maps RPC', size: 'minor', tone: 'accent', angle: 7, lift: -4 },
  { label: 'Testing & iteration', size: 'minor', tone: 'paper', angle: -3, lift: 3 },
  { label: 'Git & CI/CD', size: 'minor', tone: 'ink', angle: 5, lift: -2 },
  { label: 'Technical leadership', size: 'major', tone: 'paper', angle: -5, lift: 4 },
  { label: 'Workshop facilitation', size: 'minor', tone: 'accent', angle: 5, lift: -3 },
  { label: 'Cloud support', size: 'minor', tone: 'paper', angle: -6, lift: 4 },
  { label: 'Google Workspace', size: 'minor', tone: 'ink', angle: 6, lift: -2 },
  { label: 'Technical hiring', size: 'minor', tone: 'paper', angle: -4, lift: 3 },
  { label: 'PWA', size: 'minor', tone: 'accent', angle: 7, lift: -4 },
  { label: 'Google Apps Script', size: 'minor', tone: 'paper', angle: -7, lift: 2 },
  { label: 'Database design', size: 'minor', tone: 'paper', angle: 4, lift: -3 },
  { label: 'Document workflows', size: 'minor', tone: 'ink', angle: -5, lift: 4 },
  { label: 'Desktop GUI', size: 'minor', tone: 'paper', angle: 5, lift: -2 },
];

function HeroShowcase() {
  return (
    <section className="skill-wall" data-entrance aria-label="Skills and methods I use in my work">
      <div className="skill-wall__header"><span>WHAT I BUILD WITH</span><span>{skillCards.length} IN PRACTICE</span></div>
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
      <p className="skill-wall__footer">From the first question to a working release <span aria-hidden="true">↗</span></p>
    </section>
  );
}

function CaseNotes({ project }: { project: Project }) {
  return (
    <details className="project-notes">
      <summary>Open case notes</summary>
      <div className="project-notes__content">
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
    </details>
  );
}

function ProjectGraphic({ project }: { project: Project }) {
  if (project.id === 'clutchg-pc-optimizer') {
    return <figure className="case-visual case-visual--clutch" aria-label="ClutchG concept diagram showing evidence, risk, and rollback around 56 vetted Windows tweaks">
      <div className="case-visual__top"><span>CLUTCHG / WINDOWS TOOLING</span><span>01—04</span></div>
      <div className="case-visual__headline"><strong>56</strong><span>vetted tweaks<br />10 categories<br />3 risk tiers</span></div>
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
        <CaseNotes project={project} />
      </div>
      <div className="project-card__visual">
        {project.images?.length ? <EvidenceGallery project={project} /> : <ProjectGraphic project={project} />}
      </div>
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
        {project.images?.length ? <EvidenceGallery project={project} compact /> : null}
      </div>
      <div className="project-index__detail">
        <p className="project-card__summary">{project.summary}</p>
        <p className="project-card__ownership">{project.ownership}</p>
        <p className="project-card__stack">
          <span className="visually-hidden">Technologies and methods: </span>
          {project.stack.join(' · ')}
        </p>
        <ProjectLinks project={project} />
        <CaseNotes project={project} />
      </div>
    </article>
  );
}

function PageMascot({ activeChapter, reduceMotion }: {
  activeChapter: ChapterId;
  reduceMotion: boolean | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const guide = content.mascot.guides[activeChapter];

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
        <p className="page-mascot__eyebrow" aria-live="polite">{guide.eyebrow}</p>
        <p className="page-mascot__intro">{guide.body}</p>
        <div className="page-mascot__links">
          <a href={guide.target} onClick={() => setIsOpen(false)}>{guide.action}<span aria-hidden="true"> ↗</span></a>
        </div>
      </motion.div>

      <Mascot directions="/mascots/crt-directions.webp" reactions="/mascots/crt-reactions.webp" size={84} label="CRT guide" className="page-mascot__crt" />
      <button
        ref={buttonRef}
        className="page-mascot__guide"
        type="button"
        aria-label={isOpen ? content.mascot.closeLabel : content.mascot.openLabel}
        aria-expanded={isOpen}
        aria-controls="mascot-message"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? 'Close guide' : 'Where next?'}
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
    projects.find((project) => project.id === 'clutchg-pc-optimizer')!,
    featuredProjects.find((project) => project.id === 'younum')!,
    featuredProjects.find((project) => project.id === 'khaosoi-research')!,
    projects.find((project) => project.id === 'valscout')!,
  ].map((project, index) => ({ ...project, index: String(index + 1).padStart(2, '0') }));
  const indexedProjects = projects.filter((project) => !['clutchg-pc-optimizer', 'valscout'].includes(project.id))
    .map((project, index) => ({ ...project, index: String(index + 5).padStart(2, '0') }));

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
    media.add('(min-width: 760px) and (prefers-reduced-motion: no-preference)', () => {
      const bridge = document.querySelector<HTMLElement>('.story-bridge');
      const track = document.querySelector<HTMLElement>('.story-bridge__track');
      if (!bridge || !track) return;
      const distance = () => Math.max(0, track.scrollWidth - bridge.clientWidth + 96);
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: bridge,
          start: 'top top',
          end: () => `+=${Math.max(420, distance())}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
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
            {mobileMenuOpen ? 'Close' : 'Menu'}
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
              <div className="hero__avatar" data-entrance>
                <img src="/images/teeraphat-avatar.png" alt="Illustrated avatar of Teeraphat Raksawong" />
              </div>
            </div>
            <p className="hero__nickname" data-entrance>(Necktie)</p>
            <p className="hero__intro" data-entrance>
              I move from product questions to <span className="hero__sketch-word">working software
                <svg aria-hidden="true" viewBox="0 0 240 22" preserveAspectRatio="none"><path data-ink-line d="M3 15 C50 5, 100 18, 157 11 S218 10, 237 5" /></svg>
              </span>: shaping the flow, building the system, and checking the result.
            </p>
            <p className="hero__background" data-entrance>{content.hero.background}</p>
            <div className="hero__actions" data-entrance>
              <a className="button button--accent" href="#evidence">{content.hero.workCta}</a>
              <a className="button button--outline" href={content.cvUrl} download>{content.hero.cvCta}</a>
            </div>
          </div>

          <HeroShowcase />

          <div className="identity-strip" data-reveal>
            <p><span>Education</span><strong>{content.hero.education}</strong></p>
            <p><span>Research focus</span><strong>{content.hero.thesis}</strong></p>
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
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="story-bridge" aria-label="I begin with the question, shape the user flow, build the system, test with real work, then ship and learn.">
          <div className="story-bridge__track" aria-hidden="true">
            <span>I begin with the question</span><span className="story-bridge__symbol">↝</span>
            <span>shape the user flow</span><span className="story-bridge__symbol">✳</span>
            <span>build the system</span><span className="story-bridge__symbol">↗</span>
            <span>test with real work</span><span className="story-bridge__symbol">✳</span>
            <span>ship and learn.</span>
          </div>
        </div>

        <section id="evidence" className="work-section" data-chapter="evidence" aria-labelledby="work-title">
          <div className="chapter-heading" data-reveal>
            <p className="chapter-heading__number">03 / SELECTED EVIDENCE</p>
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
            <p className="chapter-heading__number">04 / APPROACH &amp; SKILLS</p>
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

          <div className="capabilities-section">
            <p className="capabilities-section__label">Skills in practice</p>
            <div className="capability-list">
              {content.approach.skills.map((group) => (
                <section className="capability-group" key={group.title} aria-label={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </section>
              ))}
            </div>
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
