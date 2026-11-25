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
      aria-labelledby="about-heading"
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
        {/* ── Top Centered Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <p className="mb-3 text-xs sm:text-sm font-display font-bold uppercase tracking-[0.28em] text-[#FF014F]">
            About Me
          </p>
          <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Who Am I &amp;
            <br />
            What I <span className="text-[#FF014F]">Engineer</span>
          </h2>
          <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#878787]">
            {ABOUT_INTRO}
          </p>
        </motion.div>

        {/* ── Two-Column Content: Tight Text-Form Left + Framed Studio Photo Right ── */}
        <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">

          {/* ── Left Column: Compact Pure Text Flow (no numbers, no cards, no gaps) ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1 lg:col-span-6 space-y-4"
          >
            {ABOUT_HIGHLIGHTS.map((item) => (
              <div key={item.id} className="group">
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FF014F] transition-colors duration-300">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mt-1 text-sm sm:text-[15px] leading-relaxed text-[#CFD0D4]/85">
                    {item.description}
                  </p>
                )}

                {item.isInfoList && (
                  <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
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
              </div>
            ))}
          </motion.div>

          {/* ── Right Column: Studio Image Showcase with Crimson Glow & Geometric Accents ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 lg:col-span-6 flex items-center justify-center"
          >
            <div className="relative group w-full max-w-[460px] lg:max-w-[520px] p-3 sm:p-4">
              {/* Soft crimson ambient glow behind the portrait frame */}
              <div
                aria-hidden="true"
                className="absolute inset-2 rounded-3xl blur-[65px] bg-[#FF014F]/22 group-hover:bg-[#FF014F]/40 transition-all duration-500 pointer-events-none"
              />

              {/* Subtle offset geometric accent frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-3xl border border-[#FF014F]/20 group-hover:border-[#FF014F]/55 translate-x-2 translate-y-2 transition-all duration-500 pointer-events-none"
              />

              {/* Floating crimson geometric accents around the image */}
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-2 top-8 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FF014F] shadow-[0_0_22px_rgba(255,1,79,0.55)] group-hover:scale-110 transition-transform duration-300 pointer-events-none"
              />
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                className="absolute -left-3 -bottom-2 z-20 w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[1.5px] border-[#FF014F]/80 group-hover:border-[#FF3B7B] transition-colors duration-300 pointer-events-none"
              />
              <motion.span
                aria-hidden="true"
                animate={shouldReduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-6 sm:w-14 sm:h-7 rounded-b-full bg-[#FF014F] shadow-[0_0_22px_rgba(255,1,79,0.5)] pointer-events-none"
              />

              {/* Studio Portrait Frame */}
              <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 group-hover:border-[#FF014F]/50 shadow-2xl shadow-black/80 transition-colors duration-500 bg-dark-100">
                <img
                  src="/assets/about%20section%20image.png"
                  alt="Sohail Shabbir – Full Stack Developer"
                  title="Sohail Shabbir | About Me"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto aspect-[4/3] object-cover object-center select-none transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent pointer-events-none"
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
