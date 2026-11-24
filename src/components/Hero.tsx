import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { FiDownload, FiArrowDown, FiTerminal } from 'react-icons/fi';
import { SITE_DATA, ROLES } from '../data/constants';

/* ── Subtle floating particles in Reeni crimson ── */
const particles = [
  { size: 4, x: '12%', y: '24%', delay: 0 },
  { size: 3, x: '46%', y: '20%', delay: 1.1 },
  { size: 4, x: '34%', y: '80%', delay: 2.0 },
  { size: 3, x: '86%', y: '68%', delay: 0.8 },
  { size: 3, x: '60%', y: '14%', delay: 1.6 },
];

const Hero = () => {
  const [textIndex, setTextIndex]         = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex]         = useState(0);
  const shouldReduceMotion                = useReducedMotion();

  /* Zero-rerender 3D hover tilt for the portrait stage */
  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 180, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 180, damping: 24 });
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-4.5, 4.5]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [4.5, -4.5]);

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

  const handlePortraitMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x    = (e.clientX - rect.left) / rect.width - 0.5;
    const y    = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePortraitLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
      className="relative w-full min-h-screen flex items-center bg-dark overflow-hidden"
    >
      {/* ── Architectural Dark Facets & Crimson Studio Lighting ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Diagonal dark studio glass facets */}
        <div
          className="absolute -inset-24 opacity-45"
          style={{
            background:
              'linear-gradient(118deg, transparent 20%, rgba(255,255,255,0.025) 20.5%, transparent 48%, rgba(255,255,255,0.02) 48.5%, transparent 75%)',
          }}
        />
        <div
          className="absolute -inset-24 opacity-40"
          style={{
            background:
              'linear-gradient(-42deg, transparent 30%, rgba(255,1,79,0.07) 55%, transparent 74%)',
          }}
        />

        {/* Top-left & bottom-left crimson flares */}
        <div
          className="absolute -top-20 -left-20 w-[340px] h-[340px] rounded-full blur-[100px] opacity-60 animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, rgba(255,1,79,0.42) 0%, transparent 70%)' }}
        />
        <div
          className="hidden sm:block absolute top-[18%] -left-14 w-48 h-72 -rotate-[28deg] opacity-35 blur-sm"
          style={{ background: 'linear-gradient(135deg, rgba(255,1,79,0.6) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-24 -left-16 w-[300px] h-[300px] rounded-full blur-[95px] opacity-45"
          style={{ background: 'radial-gradient(circle, rgba(255,1,79,0.38) 0%, transparent 70%)' }}
        />

        {/* Top-right & bottom-right crimson flares */}
        <div
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-[115px] opacity-55"
          style={{ background: 'radial-gradient(circle, rgba(255,1,79,0.4) 0%, transparent 70%)' }}
        />
        <div
          className="hidden md:block absolute bottom-0 -right-12 w-64 h-72 rotate-[24deg] opacity-40 blur-[2px]"
          style={{
            background: 'linear-gradient(160deg, transparent 20%, rgba(255,1,79,0.5) 75%, rgba(255,59,123,0.28) 100%)',
          }}
        />

        {/* Top-right 6x4 dot matrix grid */}
        <div className="hidden md:grid grid-cols-6 gap-3 absolute top-28 right-8 lg:right-12 opacity-20">
          {Array.from({ length: 24 }).map((_, idx) => (
            <span key={idx} className="w-1 h-1 rounded-full bg-white/75" />
          ))}
        </div>

        {/* Faint floating </> watermark */}
        <motion.div
          animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden lg:block absolute top-[18%] left-[48%] text-white/[0.05] select-none"
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

        {/* Faint tilted laptop with </> watermark */}
        <div className="hidden md:block absolute bottom-8 left-[38%] -translate-x-1/2 -rotate-[12deg] text-white/[0.04] select-none">
          <svg width="200" height="144" viewBox="0 0 210 150" fill="none">
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

        {/* Ambient particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#FF014F]/60"
            style={{ width: p.size, height: p.size, left: p.x, top: p.y }}
            animate={shouldReduceMotion ? undefined : { y: [0, -10, 0], opacity: [0.25, 0.8, 0.25] }}
            transition={{ duration: 3.5 + p.delay, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-10 w-full px-5 sm:px-6 mx-auto max-w-7xl lg:px-8 pt-24 pb-12 lg:py-24">
        <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">

          {/* ── Left Column (Desktop First / Mobile Second, matching Reeni responsive layout) ── */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col justify-center text-left">

            {/* Subtle greeting eyebrow (inspired by Reeni "HELLO") */}
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="mb-3 text-xs sm:text-sm font-display font-bold uppercase tracking-[0.3em] text-[#CFD0D4]"
            >
              Hello
            </motion.p>

            {/* Bold Two-Line Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-[66px] font-extrabold tracking-tight text-white leading-[1.08]"
            >
              <span className="text-[#FF014F]">I Build</span> Scalable
              <br />
              Web Apps<span className="text-[#FF014F]">.</span>
            </motion.h1>

            {/* Typewriter Role Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 mb-7 flex items-center gap-3 min-h-[2.25rem]"
            >
              <span className="inline-block w-7 h-[2px] rounded-full bg-[#FF014F] shrink-0" />
              <p className="text-base sm:text-lg md:text-xl font-semibold tracking-wide gradient-text">
                {displayedText}
                <span className="text-[#FF014F] animate-pulse ml-0.5">|</span>
              </p>
            </motion.div>

            {/* Two Side-by-Side Pill CTA Buttons with icon-reverse hover */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              {/* Left Outlined Pill: Hi! I Am Sohail Shabbir */}
              <motion.button
                type="button"
                onClick={() => scrollToSection('about')}
                whileHover={{ y: -2, borderColor: 'rgba(255, 1, 79, 0.8)' }}
                whileTap={{ scale: 0.97 }}
                className="hover-icon-reverse focus-ring cursor-pointer inline-flex items-center gap-2.5 px-6 py-3.5 min-h-[46px] text-sm font-medium text-[#E4E6EA] rounded-full border border-white/20 bg-white/[0.03] hover:bg-[#FF014F]/[0.08] hover:text-white transition-all duration-300"
              >
                <span className="icon-slide text-[#FF014F]" aria-hidden="true">
                  <FiTerminal size={15} className="icon-primary" />
                  <FiTerminal size={15} className="icon-secondary" />
                </span>
                <span>Hi! I Am {SITE_DATA.name}</span>
              </motion.button>

              {/* Right Filled Gradient Pill: Download CV */}
              <motion.a
                href={SITE_DATA.cv}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, boxShadow: '0 14px 38px rgba(255,1,79,0.55)' }}
                whileTap={{ scale: 0.97 }}
                className="ripple-btn hover-icon-reverse focus-ring inline-flex items-center gap-2.5 px-7 py-3.5 min-h-[46px] text-sm font-semibold text-white rounded-full shadow-[0_8px_30px_rgba(255,1,79,0.4)] transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #E60047 0%, #FF014F 55%, #FF2A6D 100%)',
                }}
              >
                <span>Download CV</span>
                <span className="icon-slide" aria-hidden="true">
                  <FiDownload size={15} className="icon-primary" />
                  <FiDownload size={15} className="icon-secondary" />
                </span>
              </motion.a>
            </motion.div>

            {/* Bottom-left: Scroll to Explore | (↓) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.55 }}
              className="mt-10 lg:mt-14 flex items-center"
            >
              <button
                type="button"
                onClick={() => scrollToSection('about')}
                className="group focus-ring cursor-pointer inline-flex items-center gap-4 text-xs sm:text-sm font-medium text-[#CFD0D4] hover:text-white transition-colors rounded-full py-1"
              >
                <span>Scroll to Explore</span>
                <span className="h-5 w-px bg-white/20" aria-hidden="true" />
                <motion.span
                  animate={shouldReduceMotion ? undefined : { y: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-[#FF014F]/65 text-[#FF014F] group-hover:bg-[#FF014F] group-hover:text-white group-hover:border-[#FF014F] group-hover:shadow-[0_0_20px_rgba(255,1,79,0.55)] transition-all duration-300"
                >
                  <FiArrowDown size={14} aria-hidden="true" />
                </motion.span>
              </button>
            </motion.div>
          </div>

          {/* ── Right Column (Centered Stage / Mobile Top First, matching Reeni layout + Glow & Hover) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 lg:col-span-6 relative flex items-center justify-center"
          >
            <div
              onMouseMove={handlePortraitMove}
              onMouseLeave={handlePortraitLeave}
              style={{ perspective: 900 }}
              className="relative group w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[490px] xl:max-w-[530px] flex items-center justify-center py-4 lg:py-6"
            >
              {/* ── Multi-layer Crimson Halo & Ambient Glow near Portrait ── */}
              <div
                aria-hidden="true"
                className="animate-halo-pulse absolute inset-4 rounded-full blur-[85px] bg-[#FF014F]/30 group-hover:bg-[#FF014F]/50 group-hover:blur-[95px] transition-all duration-500 pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute w-[250px] h-[250px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full blur-[55px] opacity-65 group-hover:opacity-95 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,1,79,0.42) 0%, rgba(255,59,123,0.16) 52%, transparent 76%)',
                }}
              />

              {/* Subtle glowing orbital rings behind portrait */}
              <div
                aria-hidden="true"
                className="absolute w-[270px] h-[270px] sm:w-[330px] sm:h-[330px] lg:w-[410px] lg:h-[410px] rounded-full border border-[#FF014F]/25 shadow-[0_0_45px_rgba(255,1,79,0.2)] group-hover:border-[#FF014F]/60 group-hover:shadow-[0_0_75px_rgba(255,1,79,0.45)] group-hover:scale-[1.03] transition-all duration-500 pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute w-[310px] h-[310px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] rounded-full border border-dashed border-white/[0.08] group-hover:border-[#FF014F]/35 transition-colors duration-500 pointer-events-none animate-[spin_28s_linear_infinite]"
              />

              {/* ── Layered Display Typography Flanking Neck/Shoulders (matching Reeni reference) ── */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[35%] -translate-y-1/2 z-0 flex items-center justify-center gap-24 sm:gap-32 lg:gap-40 pointer-events-none select-none"
              >
                <span className="font-display font-bold uppercase tracking-[0.06em] text-[30px] sm:text-[42px] lg:text-[50px] text-white/90 group-hover:text-white group-hover:-translate-x-1 transition-all duration-500 whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
                  FULL
                </span>
                <span className="font-display font-bold uppercase tracking-[0.06em] text-[30px] sm:text-[42px] lg:text-[50px] text-white/90 group-hover:text-white group-hover:translate-x-1 transition-all duration-500 whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">
                  STACK
                </span>
              </div>

              {/* ── Interactive Tilting Portrait Image ── */}
              <motion.div
                style={shouldReduceMotion ? undefined : { rotateX, rotateY }}
                className="relative z-10 w-full flex justify-center"
              >
                <img
                  src="/assets/hero%20section%20image.png"
                  alt="Sohail Shabbir – Full Stack MERN Developer"
                  title="Sohail Shabbir | devsohail.tech"
                  loading="eager"
                  decoding="sync"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black 74%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, black 74%, transparent 100%)',
                  }}
                  className="w-[88%] sm:w-[90%] lg:w-[92%] h-auto max-h-[380px] sm:max-h-[460px] lg:max-h-[540px] object-contain object-bottom select-none transition-all duration-500 group-hover:scale-[1.03] drop-shadow-[0_0_28px_rgba(255,1,79,0.3)] group-hover:drop-shadow-[0_0_48px_rgba(255,1,79,0.55)]"
                />
              </motion.div>

              {/* ── Outlined Foreground Watermark Across Lower Torso (matching Reeni reference) ── */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-3 sm:bottom-5 z-20 flex justify-center pointer-events-none select-none"
              >
                <span className="font-display font-bold uppercase tracking-[0.04em] text-[24px] sm:text-[33px] lg:text-[40px] text-outline-hero group-hover:text-outline-accent group-hover:translate-y-0.5 transition-all duration-500 whitespace-nowrap">
                  FULL STACK DEVELOPER
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
