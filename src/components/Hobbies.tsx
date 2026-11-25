import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  FiArrowLeft,
  FiArrowRight,
  FiCode,
  FiCpu,
  FiHeart,
  FiMonitor,
  FiSearch,
  FiShield,
  FiTerminal,
} from 'react-icons/fi';
import type { IconType } from 'react-icons';

type HobbyItem = {
  id: string;
  title: string;
  highlight: string;
  descriptions: string[];
  icon: IconType;
};

const HOBBIES: HobbyItem[] = [
  {
    id: 'coding-web-development',
    title: 'Coding & Web Development',
    highlight: 'Front-End Development, React.js, JavaScript, Tailwind CSS',
    descriptions: [
      'I enjoy writing clean and optimized code while building real-world web applications.',
      'I regularly practice problem-solving, improving logic, and exploring new technologies.',
      'My main focus is becoming a professional Full Stack Web Developer.',
    ],
    icon: FiCode,
  },
  {
    id: 'ai-researching',
    title: 'AI Researching',
    highlight: 'RAG Systems, AI Agents, Prompt Engineering, Model Fine-Tuning',
    descriptions: [
      'Passionate about experimenting with LLMs, Retrieval-Augmented Generation (RAG), and agentic workflows.',
      'I actively test open-source AI models and automation platforms like n8n and Openclaw to enhance developer productivity.',
    ],
    icon: FiCpu,
  },
  {
    id: 'technology-web-researching',
    title: 'Technology & Web Researching',
    highlight: 'Technical Docs, Architecture Patterns, API Analysis',
    descriptions: [
      'I enjoy deep-diving into official technical documentations, API specifications, and system architecture patterns.',
      'Evaluating emerging web technologies, libraries, and tools allows me to design clean, scalable applications.',
    ],
    icon: FiSearch,
  },
  {
    id: 'linux-terminal-usage',
    title: 'Linux Terminal Usage',
    highlight: 'Bash, Zsh, CLI Tools',
    descriptions: [
      'I enjoy working in Linux terminals and learning command-line tools for development.',
      'Managing files, automation, and running scripts improves my development workflow.',
    ],
    icon: FiTerminal,
  },
  {
    id: 'cybersecurity-exploration',
    title: 'Cybersecurity Exploration',
    highlight: 'Kali Linux, Ethical Hacking Basics',
    descriptions: [
      'I explore cybersecurity tools available in Kali Linux to understand system security.',
      'This hobby strengthens my knowledge in computer security and OS internals.',
    ],
    icon: FiShield,
  },
  {
    id: 'operating-systems',
    title: 'Exploring Operating Systems',
    highlight: 'Windows, Linux Distros, OS Optimization',
    descriptions: [
      'I test and explore different operating systems to understand their features and performance.',
      'This hobby helps me become a better developer with system-level understanding.',
    ],
    icon: FiMonitor,
  },
];

const HobbyCard = ({
  hobby,
  index,
  shouldReduceMotion,
}: {
  hobby: HobbyItem;
  index: number;
  shouldReduceMotion: boolean | null;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontButtonRef = useRef<HTMLButtonElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const HobbyIcon = hobby.icon;

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
              <HobbyIcon aria-hidden="true" size={28} />
            </span>
            <span aria-hidden="true" className="experience-card__divider" />
          </div>

          <div className="experience-card__content">
            <span className="experience-card__badge">
              <FiHeart aria-hidden="true" size={13} />
              Personal Interest
            </span>
            <h3 className="mt-2 text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#FF3B7B] sm:text-xl">
              {hobby.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-[#FF3B7B]">
              {hobby.highlight}
            </p>

            <div className="my-3 h-px bg-white/[0.08]" aria-hidden="true" />

            <div className="flex items-center gap-2 text-[11px] font-semibold text-[#D4D4D8]">
              <HobbyIcon
                aria-hidden="true"
                className="shrink-0 text-[#FF014F]"
              />
              <span>Areas of Interest</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {hobby.highlight.split(', ').map((interest) => (
                <span key={interest} className="experience-card__tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <button
            ref={frontButtonRef}
            type="button"
            onClick={showDetails}
            aria-label={`Show details about ${hobby.title}`}
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
              <HobbyIcon aria-hidden="true" size={13} />
              Hobby Details
            </span>
            <button
              ref={backButtonRef}
              type="button"
              onClick={showFront}
              aria-label={`Return to ${hobby.title} overview`}
              tabIndex={isFlipped ? 0 : -1}
              className="focus-ring experience-card__action"
            >
              <FiArrowLeft aria-hidden="true" size={18} />
            </button>
          </div>
          <h3 className="text-lg font-bold text-white">{hobby.title}</h3>
          <p className="mt-1 text-xs font-medium text-white/80">
            {hobby.highlight}
          </p>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-white/90">
            {hobby.descriptions.map((description) => (
              <li key={description} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF014F]"
                />
                {description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
};

const Hobbies = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hobbies"
      aria-labelledby="hobbies-title"
      className="relative w-full overflow-hidden bg-dark py-20 lg:py-28"
    >
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
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center lg:mb-14"
        >
          <p className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF014F]/45 bg-[#FF014F]/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#FF3B7B] sm:text-xs">
            <FiHeart aria-hidden="true" size={15} />
            Hobbies & Interests
          </p>
          <h2
            id="hobbies-title"
            className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Beyond Work, <span className="text-[#FF014F]">Curiosity</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
            The interests I explore to keep learning, experimenting, and
            understanding technology.
          </p>
          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#FF014F] via-[#FF3B7B] to-[#FF014F]"
          />
        </motion.header>

        <div className="relative mx-auto max-w-6xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 left-6 top-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#FF014F]/45 to-transparent lg:left-1/2"
          />

          <div className="flex flex-col gap-6 lg:gap-8">
            {HOBBIES.map((hobby, index) => {
              const HobbyIcon = hobby.icon;

              return (
                <div
                  key={hobby.id}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-x-4 lg:grid-cols-[minmax(0,1fr)_5rem_minmax(0,1fr)]"
                >
                  <div
                    className={`col-start-2 row-start-1 min-w-0 ${
                      index % 2 === 0
                        ? 'lg:col-start-1'
                        : 'lg:col-start-3'
                    }`}
                  >
                    <HobbyCard
                      hobby={hobby}
                      index={index}
                      shouldReduceMotion={shouldReduceMotion}
                    />
                  </div>

                  <span className="relative z-10 col-start-1 row-start-1 flex h-12 w-12 items-center justify-center rounded-full border border-[#FF014F]/50 bg-[#0A0A0E] text-[#FF3B7B] shadow-[0_0_0_6px_#060608,0_0_24px_rgba(255,1,79,0.2)] lg:col-start-2">
                    <HobbyIcon size={18} aria-hidden="true" />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
