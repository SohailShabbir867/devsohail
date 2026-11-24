import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowDown, FiTerminal } from 'react-icons/fi';
import { SITE_DATA, ROLES } from '../data/constants';

/* ── Tiny floating particles in brand orange ── */
const particles = [
  { size: 4, x: '12%', y: '24%', delay: 0 },
  { size: 3, x: '48%', y: '22%', delay: 1.2 },
  { size: 4, x: '36%', y: '78%', delay: 2.1 },
  { size: 3, x: '84%', y: '68%', delay: 0.7 },
  { size: 3, x: '58%', y: '14%', delay: 1.7 },
];

const Hero = () => {
  const [textIndex, setTextIndex]         = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex]         = useState(0);

  /* Typewriter role cycle */
  useEffect(() => {
    const currentRole = ROLES[textIndex];
    if (charIndex < currentRole.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + currentRole[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 65);
      return () => clearTimeout(timer);
    }

    const pauseTimer = setTimeout(() => {
      setCharIndex(0);
      setDisplayedText('');
      setTextIndex((prev) => (prev + 1) % ROLES.length);
    }, 2200);
    return () => clearTimeout(pauseTimer);
  }, [charIndex, textIndex]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset       = 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - navOffset, behavior: 'smooth' });
      if (window.history.pushState) {
        window.history.pushState(null, '', `#${sectionId}`);
      }
    }
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex bg-dark overflow-hidden"
    >
      {/* ── Architectural Dark Facets & Orange Studio Lighting (matching Image 2) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Diagonal dark studio glass planes */}
        <div
          className="absolute -inset-24 opacity-40"
          style={{
            background:
              'linear-gradient(118deg, transparent 20%, rgba(255,255,255,0.025) 20.5%, transparent 48%, rgba(255,255,255,0.02) 48.5%, transparent 75%)',
          }}
        />
        <div
          className="absolute -inset-24 opacity-35"
          style={{
            background:
              'linear-gradient(-42deg, transparent 30%, rgba(255,102,0,0.05) 55%, transparent 72%)',
          }}
        />

        {/* Top-left orange corner light flare */}
        <div
          className="absolute -top-16 -left-20 w-[340px] h-[340px] rounded-full blur-[95px] opacity-60 animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(255,102,0,0.45) 0%, transparent 70%)' }}
        />
        {/* Diagonal crisp orange edge streak on left */}
        <div
          className="hidden sm:block absolute top-[20%] -left-14 w-48 h-72 -rotate-[28deg] opacity-35 blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(255,102,0,0.65) 0%, transparent 70%)',
          }}
        />
        {/* Bottom-left subtle warm glow */}
        <div
          className="absolute -bottom-20 -left-16 w-[280px] h-[280px] rounded-full blur-[90px] opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(255,102,0,0.4) 0%, transparent 70%)' }}
        />

        {/* Top-right orange corner flare */}
        <div
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[110px] opacity-55"
          style={{ background: 'radial-gradient(circle, rgba(255,102,0,0.42) 0%, transparent 70%)' }}
        />

        {/* Bottom-right studio rim glow behind portrait */}
        <div
          className="absolute -bottom-24 right-[-4%] w-[520px] h-[520px] rounded-full blur-[120px] opacity-65 animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(255,102,0,0.38) 0%, rgba(230,81,0,0.12) 45%, transparent 75%)' }}
        />
        {/* Diagonal bottom-right accent prism */}
        <div
          className="hidden md:block absolute bottom-0 -right-12 w-64 h-72 rotate-[24deg] opacity-40 blur-[2px]"
          style={{
            background: 'linear-gradient(160deg, transparent 20%, rgba(255,102,0,0.55) 75%, rgba(255,133,51,0.3) 100%)',
          }}
        />

        {/* Top-right 6x4 dot matrix grid (from Image 2) */}
        <div
          aria-hidden="true"
          className="hidden md:grid grid-cols-6 gap-3 absolute top-28 right-8 lg:right-12 opacity-20"
        >
          {Array.from({ length: 24 }).map((_, idx) => (
            <span key={idx} className="w-1 h-1 rounded-full bg-white/70" />
          ))}
        </div>

        {/* Faint floating </> code symbol above-left of portrait (from Image 2) */}
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute top-[22%] left-[53%] text-white/[0.06] select-none"
        >
          <svg width="68" height="44" viewBox="0 0 68 44" fill="none">
            <path
              d="M22 10L8 22L22 34M46 10L60 22L46 34M38 6L30 38"
              stroke="currentColor"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Faint tilted laptop with </> watermark behind CTA area (from Image 2) */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute bottom-6 left-[42%] -translate-x-1/2 -rotate-[12deg] text-white/[0.04] select-none"
        >
          <svg width="210" height="150" viewBox="0 0 210 150" fill="none">
            <rect x="30" y="14" width="150" height="96" rx="10" stroke="currentColor" strokeWidth="4" />
            <path
              d="M84 50L70 62L84 74M126 50L140 62L126 74M111 45L99 79"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 118H198L186 132H24L12 118Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Subtle ambient particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent/55"
            style={{ width: p.size, height: p.size, left: p.x, top: p.y }}
            animate={{ y: [0, -10, 0], opacity: [0.25, 0.75, 0.25] }}
            transition={{ duration: 3.5 + p.delay, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-10 w-full px-6 mx-auto max-w-7xl lg:px-8 pt-24 md:pt-28 flex flex-col justify-between">
        <div className="grid flex-1 items-center grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">

          {/* ── Left Column: Headline + Typewriter + Pill CTAs + Scroll Explorer ── */}
          <div className="lg:col-span-7 flex flex-col justify-center pb-6 lg:pb-16">

            {/* Bold Two-Line Headline (developer adaptation of Image 2) */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-extrabold tracking-tight text-white leading-[1.08]"
            >
              <span className="text-accent">I Build</span> Scalable
              <br />
              Web Apps<span className="text-accent">.</span>
            </motion.h1>

            {/* Typewriter Role Text (preserved from previous implementation) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25 }}
              className="mt-5 mb-8 flex items-center gap-3 min-h-[2.25rem]"
            >
              <span className="inline-block w-7 h-[2px] rounded-full bg-accent shrink-0" />
              <p className="text-base sm:text-lg md:text-xl font-semibold tracking-wide gradient-text">
                {displayedText}
                <span className="text-accent animate-pulse ml-0.5">|</span>
              </p>
            </motion.div>

            {/* Two Side-by-Side Pill CTA Buttons (matching Image 2) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              {/* Left Outlined Pill: Hi! I Am Sohail Shabbir */}
              <motion.button
                type="button"
                onClick={() => scrollToSection('about')}
                whileHover={{ y: -2, borderColor: 'rgba(255, 102, 0, 0.75)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white rounded-full border border-white/25 bg-white/[0.03] hover:bg-accent/[0.08] transition-all duration-300"
              >
                <FiTerminal size={15} className="text-accent" />
                <span>Hi! I Am {SITE_DATA.name}</span>
              </motion.button>

              {/* Right Filled Gradient Pill: Download CV */}
              <motion.a
                href={SITE_DATA.cv}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, boxShadow: '0 14px 36px rgba(255,102,0,0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="ripple-btn inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white rounded-full shadow-[0_8px_28px_rgba(255,102,0,0.38)] transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #FF5500 0%, #FF6600 50%, #FF8533 100%)',
                }}
              >
                <span>Download CV</span>
                <FiDownload size={15} />
              </motion.a>
            </motion.div>

            {/* Bottom-left: Scroll to Explore | (↓) (matching Image 2) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-14 lg:mt-20 flex items-center gap-4"
            >
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="group inline-flex items-center gap-4 text-xs sm:text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                <span>Scroll to Explore</span>
                <span className="h-5 w-px bg-white/20" aria-hidden="true" />
                <motion.span
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-accent/60 text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300"
                >
                  <FiArrowDown size={14} />
                </motion.span>
              </button>
            </motion.div>
          </div>

          {/* ── Right Column: Bottom-Grounded Developer Portrait ── */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex items-end justify-center lg:justify-end self-end"
          >
            {/* Subtle orange rim aura behind portrait */}
            <div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full blur-[70px] opacity-35 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(255,102,0,0.65) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 w-full max-w-[360px] sm:max-w-[430px] lg:max-w-[520px] xl:max-w-[580px] flex justify-center lg:justify-end">
              <img
                src="/assets/hero%20section%20image.png"
                alt="Sohail Shabbir – Full Stack MERN Developer"
                title="Sohail Shabbir | devsohail.tech"
                loading="eager"
                decoding="sync"
                className="w-full h-auto max-h-[68vh] lg:max-h-[85vh] object-contain object-bottom select-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
              />

              {/* Seamless bottom gradient blend into section background */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-dark via-dark/55 to-transparent pointer-events-none"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
