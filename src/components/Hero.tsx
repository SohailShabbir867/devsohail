import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaDownload,
  FaArrowRight,
} from 'react-icons/fa';
import Profile from '../assets/profile.webp';
import { SOCIAL_LINKS, SITE_DATA, STATS, ROLES } from '../data/constants';

/* ── Letter-by-letter name reveal ── */
const LetterReveal = ({ text, className }: { text: string; className?: string }) => (
  <span className={className} aria-label={text}>
    {Array.from(text).map((ch, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: -18, rotateX: -90 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          delay: 0.35 + i * 0.045,
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        style={{ display: 'inline-block', transformOrigin: 'top center' }}
      >
        {ch === ' ' ? '\u00A0' : ch}
      </motion.span>
    ))}
  </span>
);

/* ── Floating ambient orbs ── */
const orbs = [
  { size: 500, x: '-10%', y: '-20%', color: 'rgba(192,57,43,0.07)',  delay: 0, dur: 12 },
  { size: 380, x:  '60%', y:  '50%', color: 'rgba(231,76,60,0.05)',  delay: 2, dur: 15 },
  { size: 300, x:  '30%', y:  '80%', color: 'rgba(192,57,43,0.06)',  delay: 4, dur: 10 },
  { size: 220, x:  '80%', y:  '10%', color: 'rgba(169,50,38,0.04)',  delay: 1, dur: 18 },
];

/* ── Tiny sparkle particles ── */
const particles = [
  { size: 4, x: '15%', y: '20%', delay: 0 },
  { size: 3, x: '75%', y: '35%', delay: 1 },
  { size: 5, x: '45%', y: '70%', delay: 2.5 },
  { size: 3, x: '88%', y: '65%', delay: 0.8 },
  { size: 4, x: '25%', y: '85%', delay: 3.2 },
  { size: 2, x: '60%', y: '15%', delay: 1.5 },
];

const socialIcons = [
  { icon: FaGithub,    href: SOCIAL_LINKS.github,    label: 'GitHub'    },
  { icon: FaLinkedin,  href: SOCIAL_LINKS.linkedin,  label: 'LinkedIn'  },
  { icon: FaFacebook,  href: SOCIAL_LINKS.facebook,  label: 'Facebook'  },
  { icon: FaInstagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
];

const Hero = () => {
  const [textIndex, setTextIndex]       = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex]       = useState(0);

  /* Typewriter effect */
  useEffect(() => {
    if (charIndex < ROLES[textIndex].length) {
      const t = setTimeout(() => {
        setDisplayedText((prev) => prev + ROLES[textIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 70);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCharIndex(0);
        setDisplayedText('');
        setTextIndex((prev) => (prev + 1) % ROLES.length);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [charIndex, textIndex]);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center bg-dark overflow-hidden"
    >
      {/* ── Ambient floating orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {orbs.map((orb, i) => (
          <div
            key={i}
            className="orb-float absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: `radial-gradient(circle at center, ${orb.color}, transparent 70%)`,
              animationDelay: `${orb.delay}s`,
              animationDuration: `${orb.dur}s`,
            }}
          />
        ))}

        {/* Sparkle particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent/60"
            style={{ width: p.size, height: p.size, left: p.x, top: p.y }}
            animate={{ y: [0, -12, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3 + p.delay, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          />
        ))}

        {/* Subtle dot-grid */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          animate={{ backgroundPosition: ['0px 0px', '40px 40px'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* ── Accent glow blobs ── */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[140px] animate-glow-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Diagonal accent line (design detail from reference) ── */}
      <div
        className="absolute top-0 right-0 w-[2px] h-[60%] opacity-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #c0392b, transparent)' }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 w-full px-6 mx-auto max-w-7xl lg:px-8 py-20 lg:py-0">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left: Text content ── */}
          <div className="order-2 lg:order-1">

            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-2 text-sm text-gray-500 tracking-[0.3em] uppercase font-medium"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.3 }}
              className="mb-3 text-4xl font-extrabold text-white md:text-5xl lg:text-6xl leading-tight"
              style={{ perspective: '600px' }}
            >
              <LetterReveal text={SITE_DATA.name} />
            </motion.h1>

            {/* Typewriter role */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-2 text-xl font-extrabold sm:text-2xl md:text-3xl gradient-text min-h-[2.5rem] md:min-h-[3rem]"
            >
              {displayedText}
              <span className="text-accent animate-pulse ml-0.5">|</span>
            </motion.h2>

            {/* Short bio */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mb-6 text-sm leading-relaxed text-gray-400 max-w-md"
            >
              A passionate Full Stack MERN Developer specialising in scalable web applications
              with MongoDB, Express.js, React.js, and Node.js — integrating AI into modern
              web products and building high-performance TypeScript MCP servers.
            </motion.p>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex items-center mb-7 space-x-3"
            >
              {socialIcons.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.08, type: 'spring', stiffness: 300, damping: 18 }}
                  whileHover={{ scale: 1.25, rotate: [0, -10, 10, -5, 0] }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-10 h-10 text-gray-400 transition-colors duration-300 border rounded-full border-dark-200 hover:text-accent hover:border-accent hover:shadow-lg hover:shadow-accent/25"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <motion.a
                href="#contact"
                whileHover={{ y: -3, boxShadow: '0 20px 40px rgba(192,57,43,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="ripple-btn inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-lg bg-accent hover:bg-accent-dark transition-colors duration-300"
              >
                Hire Me
                <FaArrowRight size={13} />
              </motion.a>

              <motion.a
                href={SITE_DATA.cv}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, borderColor: '#c0392b', color: '#c0392b' }}
                whileTap={{ scale: 0.97 }}
                className="ripple-btn inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 border rounded-lg border-dark-200 hover:border-accent hover:text-accent"
              >
                <FaDownload size={13} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="flex divide-x divide-dark-200"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="px-6 first:pl-0"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 + i * 0.12, type: 'spring', stiffness: 250, damping: 18 }}
                >
                  <motion.p
                    className="text-2xl font-extrabold text-accent md:text-3xl"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="mt-0.5 text-xs text-gray-500 md:text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Profile image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', stiffness: 120, damping: 18 }}
            className="relative flex items-end justify-center order-1 lg:order-2"
          >
            <div className="relative group">
              {/* Pulsing ring behind image */}
              <motion.div
                animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-[-20px] rounded-full border border-accent/20 blur-sm"
              />

              {/* Dark circle platform */}
              <div className="w-[240px] h-[240px] sm:w-[290px] sm:h-[290px] md:w-[340px] md:h-[340px] lg:w-[380px] lg:h-[380px] rounded-full bg-dark-100 absolute bottom-0 left-1/2 -translate-x-1/2 border border-white/[0.04] shadow-2xl">
                {/* Inner gradient sheen */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Red accent ring */}
              <div
                className="absolute inset-[-8px] rounded-full opacity-20 pointer-events-none"
                style={{
                  background: 'conic-gradient(from 180deg, #c0392b 0deg, transparent 120deg, #c0392b 240deg, transparent 360deg)',
                }}
              />

              {/* Profile photo */}
              <img
                src={Profile}
                alt="Sohail Shabbir – Full Stack MERN Developer"
                title="Sohail Shabbir | devsohail.tech"
                width={430}
                height={430}
                fetchPriority="high"
                decoding="sync"
                className="relative z-10 w-[240px] sm:w-[290px] md:w-[340px] lg:w-[380px] h-auto object-contain brightness-105 contrast-110 saturate-[0.85] group-hover:scale-[1.02] transition-transform duration-500 drop-shadow-[0_15px_50px_rgba(0,0,0,0.9)]"
              />

              {/* Bottom fade blend */}
              <div className="absolute bottom-0 left-0 right-0 z-20 h-20 bg-gradient-to-t from-dark to-transparent" />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 18 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 px-5 py-1.5 rounded-full bg-accent text-white text-xs font-bold tracking-wider shadow-lg shadow-accent/40 whitespace-nowrap"
              >
                Full Stack MERN Developer
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute flex flex-col items-center gap-2 -translate-x-1/2 bottom-10 left-1/2"
      >
        {/* Outer glow ring */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-10 h-14 rounded-full border border-accent/30"
        />
        <div className="flex items-start justify-center w-6 h-10 p-1 border-2 rounded-full border-accent/40">
          <div className="w-1.5 h-3 rounded-full bg-accent animate-scroll-dot" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
