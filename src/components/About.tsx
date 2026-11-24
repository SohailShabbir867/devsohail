import { motion, useReducedMotion } from 'framer-motion';
import {
  ABOUT_HIGHLIGHTS,
  ABOUT_INFO_ITEMS,
  ABOUT_INTRO,
} from '../data/constants';

const About = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative w-full py-20 lg:py-28 bg-dark overflow-hidden"
    >
      {/* Subtle ambient crimson background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[420px] h-[420px] rounded-full blur-[140px] opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,1,79,0.45) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full px-5 sm:px-6 mx-auto max-w-7xl lg:px-8">
        {/* ── Top Centered Section Header (matching reference layout) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14 lg:mb-20"
        >
          <p className="mb-3 text-xs sm:text-sm font-display font-bold uppercase tracking-[0.28em] text-[#FF014F]">
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Who Am I &amp;
            <br />
            What I <span className="text-[#FF014F]">Engineer</span>
          </h2>
          <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#878787]">
            {ABOUT_INTRO}
          </p>
        </motion.div>

        {/* ── Two-Column Content: Text-Form Left + Geometric Portrait Right ── */}
        <div className="grid items-center grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">

          {/* ── Left Column: Pure Text-Form Numbered Sections (no card boxes) ── */}
          <div className="order-2 lg:order-1 lg:col-span-6 divide-y divide-white/[0.08]">
            {ABOUT_HIGHLIGHTS.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group py-7 first:pt-0 last:pb-0 transition-all duration-300"
              >
                <div className="flex items-baseline gap-3 mb-2.5">
                  <span className="font-display text-xl sm:text-2xl font-bold text-[#FF014F] transition-transform duration-300 group-hover:translate-x-0.5">
                    {item.number}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FF014F] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {item.description && (
                  <p className="pl-0 sm:pl-9 text-sm sm:text-[15px] leading-relaxed text-[#CFD0D4]/85">
                    {item.description}
                  </p>
                )}

                {item.isInfoList && (
                  <dl className="pl-0 sm:pl-9 mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {ABOUT_INFO_ITEMS.map((info) => (
                      <div
                        key={info.label}
                        className={`flex items-center gap-2.5 text-sm ${
                          info.label === 'Email' ? 'sm:col-span-2' : ''
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full bg-[#FF014F] shrink-0"
                        />
                        <dt className="font-semibold text-white min-w-[68px]">
                          {info.label}:
                        </dt>
                        <dd className="text-[#CFD0D4]/85 break-words">
                          {info.href ? (
                            <a
                              href={info.href}
                              className="hover:text-[#FF014F] transition-colors focus-ring rounded"
                            >
                              {info.value}
                            </a>
                          ) : (
                            info.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </motion.div>
            ))}
          </div>

          {/* ── Right Column: Stepped Circular Geometric Backdrop + Portrait (matching reference) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 lg:col-span-6 flex items-center justify-center"
          >
            <div className="relative group w-[310px] h-[340px] sm:w-[390px] sm:h-[420px] flex items-end justify-center">
              {/* Soft crimson ambient glow behind portrait */}
              <div
                aria-hidden="true"
                className="absolute inset-6 rounded-full blur-[70px] bg-[#FF014F]/20 group-hover:bg-[#FF014F]/35 transition-all duration-500 pointer-events-none"
              />

              {/* Upper dark circle backdrop (matching reference top sphere) */}
              <div
                aria-hidden="true"
                className="absolute bottom-[56px] sm:bottom-[68px] left-1/2 -translate-x-1/2 w-[230px] h-[230px] sm:w-[290px] sm:h-[290px] rounded-full bg-[#131317] border border-white/[0.04] pointer-events-none"
              />

              {/* Lower wider dark semi-circle bowl (matching reference stepped lower curve) */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[290px] h-[145px] sm:w-[366px] sm:h-[183px] rounded-b-full bg-[#17171d] border-b border-x border-white/[0.04] shadow-2xl pointer-events-none"
              />

              {/* ── Floating Crimson Geometric Shapes (matching reference composition) ── */}
              {/* 1. Mid-left solid crimson circle */}
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-3 sm:left-4 top-[42%] z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF014F] shadow-[0_0_24px_rgba(255,1,79,0.5)] group-hover:scale-110 transition-transform duration-300 pointer-events-none"
              />

              {/* 2. Bottom-left outlined crimson ring */}
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute left-2 sm:left-3 bottom-3 sm:bottom-4 z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[1.5px] border-[#FF014F]/85 group-hover:border-[#FF3B7B] group-hover:scale-105 transition-all duration-300 pointer-events-none"
              />

              {/* 3. Upper-right tiny outlined circle */}
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                className="absolute right-8 sm:right-10 top-[20%] z-10 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[1.5px] border-[#FF014F] pointer-events-none"
              />

              {/* 4. Mid-right medium outlined circle */}
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute right-1 sm:right-2 top-[38%] z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-[1.5px] border-[#FF014F] pointer-events-none"
              />

              {/* 5. Mid-right solid crimson half-circle bowl */}
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute right-0 sm:-right-1 bottom-[26%] z-20 w-20 h-10 sm:w-24 sm:h-12 rounded-b-full bg-[#FF014F] shadow-[0_0_26px_rgba(255,1,79,0.5)] group-hover:translate-x-1 transition-transform duration-300 pointer-events-none"
              />

              {/* ── Portrait Container Clipped Smoothly to Lower Circular Bowl ── */}
              <div
                className="relative z-10 w-[290px] sm:w-[366px] h-full flex items-end justify-center overflow-hidden"
                style={{
                  borderBottomLeftRadius: '9999px',
                  borderBottomRightRadius: '9999px',
                }}
              >
                <img
                  src="/assets/hero%20section%20image.png"
                  alt="Sohail Shabbir – Full Stack MERN Developer"
                  title="Sohail Shabbir | About Me"
                  loading="lazy"
                  decoding="async"
                  className="w-[88%] sm:w-[90%] h-auto max-h-[325px] sm:max-h-[400px] object-contain object-bottom select-none transition-transform duration-500 group-hover:scale-[1.03] drop-shadow-[0_12px_32px_rgba(0,0,0,0.8)]"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
