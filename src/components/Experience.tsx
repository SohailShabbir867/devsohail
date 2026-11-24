import { useState, type ComponentType } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  FiBriefcase,
  FiCheckCircle,
  FiChevronRight,
  FiGlobe,
  FiGrid,
  FiLayers,
  FiZap,
} from 'react-icons/fi';
import {
  SiCss,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { EXPERIENCE_DATA, EXPERIENCE_INTRO, type ExperienceItem } from '../data/constants';

interface TechVisual {
  icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

const TECH_META: Record<string, TechVisual> = {
  'React.js':     { icon: SiReact,       color: '#61DAFB' },
  'Next.js':      { icon: SiNextdotjs,   color: '#FFFFFF' },
  'TypeScript':   { icon: SiTypescript,  color: '#3178C6' },
  'JavaScript':   { icon: SiJavascript,  color: '#F7DF1E' },
  'Node.js':      { icon: SiNodedotjs,   color: '#5FA04E' },
  'Express.js':   { icon: SiExpress,     color: '#E4E6EA' },
  'MongoDB':      { icon: SiMongodb,     color: '#47A248' },
  'Supabase':     { icon: SiSupabase,    color: '#3ECF8E' },
  'PostgreSQL':   { icon: SiPostgresql,  color: '#4169E1' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'HTML5':        { icon: SiHtml5,       color: '#E34F26' },
  'CSS3':         { icon: SiCss,         color: '#1572B6' },
  'Git':          { icon: SiGit,         color: '#F05032' },
  'GitHub':       { icon: SiGithub,      color: '#E4E6EA' },
  'REST APIs':    { icon: FiGlobe,       color: '#FF3B7B' },
};

const TechPill = ({ label }: { label: string }) => {
  const meta = TECH_META[label] ?? { icon: FiLayers, color: '#FF3B7B' };
  const Icon = meta.icon;

  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#0B0B0F] px-3 py-1.5 text-xs font-medium text-[#E4E6EA] whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 hover:border-[#FF014F]/55 hover:bg-[#FF014F]/10 hover:text-white">
      <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: meta.color }} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
};

const ExperienceDetailCard = ({ exp }: { exp: ExperienceItem }) => (
  <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111115] p-6 sm:p-8 shadow-2xl shadow-black/50">
    {/* Top-right crimson studio aura */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-24 -right-24 h-60 w-60 rounded-full bg-[#FF014F]/12 blur-[85px]"
    />

    <div className="relative z-10 flex flex-1 flex-col">
      {/* Header row */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#FF014F]/30 bg-[#FF014F]/10 text-[#FF014F] shadow-[0_0_24px_rgba(255,1,79,0.2)]">
            <FiBriefcase size={20} aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              {exp.role}
            </h3>
            <p className="mt-0.5 text-sm sm:text-base font-semibold text-[#FF3B7B]">
              {exp.company}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF014F]/30 bg-[#FF014F]/10 px-3 py-1.5 text-xs font-semibold text-[#FF3B7B] whitespace-nowrap">
            <FiZap size={12} aria-hidden="true" />
            {exp.projectHighlight}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[#E4E6EA] whitespace-nowrap">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${
                exp.featured ? 'bg-[#FF014F]' : 'bg-white/60'
              }`}
            />
            {exp.focusTag}
          </span>
        </div>
      </div>

      {/* Role Summary */}
      <p className="mt-5 text-sm sm:text-[15px] leading-relaxed text-[#D4D4D8]/90">
        {exp.summary}
      </p>

      <div className="my-6 h-px bg-white/[0.07]" aria-hidden="true" />

      {/* Key Responsibilities — scannable 2-col tiles (last odd spans full width) */}
      <div>
        <h4 className="mb-3.5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#CFD0D4]">
          <FiCheckCircle size={13} className="text-[#FF014F]" aria-hidden="true" />
          <span>Key Responsibilities &amp; Contributions</span>
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {exp.responsibilities.map((item, idx) => {
            const isOddLast =
              idx === exp.responsibilities.length - 1 &&
              exp.responsibilities.length % 2 === 1;
            return (
              <li
                key={item}
                className={`flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 text-xs sm:text-[13px] leading-relaxed text-[#CFD0D4]/90 transition-colors duration-200 hover:border-[#FF014F]/35 hover:bg-[#FF014F]/[0.04] ${
                  isOddLast ? 'sm:col-span-2' : ''
                }`}
              >
                <FiCheckCircle
                  size={14}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-[#FF014F]"
                />
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="my-6 h-px bg-white/[0.07]" aria-hidden="true" />

      {/* Technologies */}
      <div className="mt-auto">
        <h4 className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#CFD0D4]">
          <FiLayers size={13} className="text-[#FF014F]" aria-hidden="true" />
          <span>Technologies Used</span>
        </h4>
        <div className="flex flex-wrap gap-2">
          {exp.technologies.map((tech) => (
            <TechPill key={tech} label={tech} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Experience = () => {
  const shouldReduceMotion      = useReducedMotion();
  const [activeIndex, setActive] = useState(0);
  const [viewAll, setViewAll]    = useState(false);

  const activeExp = EXPERIENCE_DATA[activeIndex];

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setActive((idx + 1) % EXPERIENCE_DATA.length);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setActive((idx - 1 + EXPERIENCE_DATA.length) % EXPERIENCE_DATA.length);
    }
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative w-full py-20 lg:py-28 bg-dark overflow-hidden"
    >
      {/* Ambient crimson glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-[150px] opacity-15 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,1,79,0.45) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full px-5 sm:px-6 mx-auto max-w-7xl lg:px-8">
        {/* ── Centered Section Header ── */}
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-14"
        >
          <p className="mb-3 text-xs sm:text-sm font-display font-bold uppercase tracking-[0.26em] text-[#FF014F]">
            Work Experience
          </p>
          <h2
            id="experience-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
          >
            Experience &amp; <span className="text-[#FF014F]">Impact</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
            {EXPERIENCE_INTRO}
          </p>
        </motion.header>

        {/* ── Sub-header with Mode Switch (Interactive vs All Roles) ── */}
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Career Highlights
            </h3>
            <div aria-hidden="true" className="hidden sm:flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="w-16 sm:w-24 h-px bg-white/20" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF014F]" />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setViewAll((prev) => !prev)}
            aria-pressed={viewAll}
            className="focus-ring cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#111115] px-4 py-2 min-h-[40px] text-xs font-semibold text-[#E4E6EA] transition-all duration-200 hover:border-[#FF014F]/55 hover:text-white"
          >
            <FiGrid size={14} className="text-[#FF014F]" aria-hidden="true" />
            <span>{viewAll ? 'Interactive View' : 'View All Roles'}</span>
          </button>
        </div>

        {/* ── View 1: Interactive Master-Detail Split View ── */}
        {!viewAll ? (
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Selector Rail */}
            <div
              role="tablist"
              aria-label="Companies worked with"
              className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5"
            >
              {EXPERIENCE_DATA.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    id={`exp-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls={`exp-panel-${item.id}`}
                    type="button"
                    onClick={() => setActive(idx)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                    className={`group relative flex items-center justify-between gap-3 w-full text-left rounded-2xl border p-5 cursor-pointer transition-all duration-300 focus-ring overflow-hidden ${
                      isActive
                        ? 'border-[#FF014F]/60 bg-[#15151C] shadow-[0_14px_38px_rgba(255,1,79,0.14)]'
                        : 'border-white/10 bg-[#101014] hover:border-[#FF014F]/35 hover:bg-[#14141A]'
                    }`}
                  >
                    {/* Active crimson vertical bar */}
                    {isActive && (
                      <motion.span
                        layoutId="activeExpBar"
                        aria-hidden="true"
                        className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-[#FF014F]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}

                    <div className="pl-1.5 min-w-0">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FF3B7B]">
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${
                            isActive ? 'bg-[#FF014F]' : 'bg-white/40'
                          }`}
                        />
                        {item.focusTag}
                      </span>
                      <p className="mt-1 text-base sm:text-lg font-bold text-white truncate">
                        {item.company}
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-[#A1A1AA] truncate">
                        {item.role}
                      </p>
                      <span className="mt-2.5 inline-block rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[11px] font-medium text-[#CFD0D4]">
                        {item.projectHighlight}
                      </span>
                    </div>

                    <FiChevronRight
                      size={18}
                      aria-hidden="true"
                      className={`shrink-0 transition-transform duration-300 ${
                        isActive
                          ? 'text-[#FF014F] translate-x-0.5'
                          : 'text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5'
                      }`}
                    />
                  </button>
                );
              })}

              {/* Quick summary strip on desktop */}
              <div className="hidden lg:flex items-center justify-between rounded-2xl border border-white/[0.07] bg-[#0D0D11] px-5 py-4 text-xs text-[#A1A1AA]">
                <span>Select a company to inspect</span>
                <span className="font-semibold text-[#FF3B7B]">
                  {activeIndex + 1} / {EXPERIENCE_DATA.length}
                </span>
              </div>
            </div>

            {/* Right Animated Role Detail Panel */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExp.id}
                  role="tabpanel"
                  id={`exp-panel-${activeExp.id}`}
                  aria-labelledby={`exp-tab-${activeExp.id}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ExperienceDetailCard exp={activeExp} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* ── View 2: All Roles Expanded Side-by-Side (strictly left-aligned) ── */
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {EXPERIENCE_DATA.map((exp) => (
              <ExperienceDetailCard key={exp.id} exp={exp} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
