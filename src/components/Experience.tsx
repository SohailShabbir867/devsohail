import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowRight,
  FiBriefcase,
  FiZap,
} from 'react-icons/fi';
import {
  EXPERIENCE_DATA,
  EXPERIENCE_INTRO,
  type ExperienceItem,
} from '../data/constants';

const ExperienceCard = ({
  exp,
  index,
  shouldReduceMotion,
}: {
  exp: ExperienceItem;
  index: number;
  shouldReduceMotion: boolean | null;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);

  const showDetails = () => {
    setIsFlipped(true);
    backButtonRef.current?.focus({ preventScroll: true });
  };

  const showFront = () => {
    setIsFlipped(false);
    frontButtonRef.current?.focus({ preventScroll: true });
  };

  return (
    <motion.article
      initial={
        shouldReduceMotion ? false : { opacity: 0, y: 26, scale: 0.99 }
      }
      whileInView={
        shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
      }
      viewport={{ once: true, margin: '-70px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      className={`experience-card group${isFlipped ? ' is-flipped' : ''}`}
    >
      <div className="experience-card__inner">
        <div
          aria-hidden={isFlipped}
          className="experience-card__face experience-card__face--front"
        >
          <div className="experience-card__brand">
            <span className="experience-card__monogram">
              {exp.company.trim().charAt(0)}
            </span>
            <span aria-hidden="true" className="experience-card__divider" />
          </div>

          <div className="experience-card__content">
            <span className="experience-card__badge">
              <FiBriefcase aria-hidden="true" size={13} />
              {exp.focusTag}
            </span>
            <h3 className="mt-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#FF3B7B] sm:text-xl">
              {exp.role}
            </h3>
            <p className="mt-0.5 text-sm font-semibold text-[#FF3B7B]">
              {exp.company}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[#A1A1AA] sm:text-[13px]">
              {exp.summary}
            </p>

            <div className="my-3 h-px bg-white/[0.08]" aria-hidden="true" />

            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#D4D4D8]">
              <FiZap aria-hidden="true" className="shrink-0 text-[#FF014F]" />
              <span>Key Technologies</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {exp.technologies.slice(0, 5).map((technology) => (
                <span key={technology} className="experience-card__tag">
                  {technology}
                </span>
              ))}
              {exp.technologies.length > 5 && (
                <span
                  className="experience-card__tag"
                  aria-label={`${exp.technologies.length - 5} more technologies`}
                >
                  +{exp.technologies.length - 5}
                </span>
              )}
            </div>
          </div>

          <button
            ref={frontButtonRef}
            type="button"
            onClick={showDetails}
            aria-label={`Show job description for ${exp.role} at ${exp.company}`}
            aria-pressed={isFlipped}
            tabIndex={isFlipped ? -1 : 0}
            className="focus-ring experience-card__action"
          >
            <FiArrowRight aria-hidden="true" size={18} />
          </button>
        </div>

        <div
          aria-hidden={!isFlipped}
          className="experience-card__face experience-card__face--back"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="experience-card__badge">
              <FiBriefcase aria-hidden="true" size={13} />
              Job Description
            </span>
            <button
              ref={backButtonRef}
              type="button"
              onClick={showFront}
              aria-label={`Return to ${exp.role} overview`}
              tabIndex={isFlipped ? 0 : -1}
              className="focus-ring experience-card__action"
            >
              <FiArrowLeft aria-hidden="true" size={18} />
            </button>
          </div>
          <h3 className="text-lg font-bold text-white">{exp.company}</h3>
          <p className="mt-1 text-xs font-medium text-white/80">
            {exp.projectHighlight}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white">
            {exp.summary}
          </p>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/90">
            {exp.responsibilities.slice(0, 3).map((responsibility) => (
              <li key={responsibility} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF014F]"
                />
                {responsibility}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-1.5 border-t border-white/10 pt-3">
            {exp.technologies.map((technology) => (
              <span key={technology} className="experience-card__tag">
                {technology}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ─────────────────────────────────────────────
   Experience Section — alternating crimson timeline
───────────────────────────────────────────── */
const Experience = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative w-full overflow-hidden bg-dark py-20 lg:py-28"
    >
      {/* Ambient crimson glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 -left-24 h-[360px] w-[360px] rounded-full opacity-10 blur-[140px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,1,79,0.6) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 -right-24 h-[420px] w-[420px] rounded-full opacity-15 blur-[150px]"
        style={{
          background:
            'radial-gradient(circle, rgba(255,1,79,0.45) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center lg:mb-14"
        >
          <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF014F]/45 bg-[#FF014F]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF3B7B] sm:text-xs">
            <FiBriefcase aria-hidden="true" size={15} />
            Work Experience
          </p>
          <h2
            id="experience-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
          >
            Experience & <span className="text-[#FF014F]">Impact</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
            {EXPERIENCE_INTRO}
          </p>
          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#FF014F] via-[#FF3B7B] to-[#FF014F]"
          />
        </motion.header>

        {/* ── Alternating Experience Timeline ── */}
        <div className="relative mx-auto max-w-6xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#FF014F]/45 to-transparent lg:left-1/2"
          />

          <div className="flex flex-col gap-6 lg:gap-8">
            {[...EXPERIENCE_DATA].reverse().map((exp, idx) => (
              <div
                key={exp.id}
                className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-x-4 lg:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)]"
              >
                <div
                  className={`col-start-2 row-start-1 min-w-0 ${
                    idx % 2 === 0
                      ? 'lg:col-start-1'
                      : 'lg:col-start-3'
                  }`}
                >
                  <ExperienceCard
                    exp={exp}
                    index={idx}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>

                <span className="relative z-10 col-start-1 row-start-1 flex h-12 w-12 items-center justify-center rounded-full border border-[#FF014F]/50 bg-[#0A0A0E] text-[#FF3B7B] shadow-[0_0_0_6px_#060608,0_0_24px_rgba(255,1,79,0.2)] lg:col-start-2">
                  <FiBriefcase size={18} aria-hidden="true" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;