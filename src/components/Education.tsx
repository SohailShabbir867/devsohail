import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { EDUCATION_DATA, EDUCATION_INTRO } from '../data/constants';

const Education = () => {
  return (
    <section
      id="education"
      className="relative w-full py-20 lg:py-28 bg-dark overflow-hidden"
    >
      {/* Subtle ambient crimson background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-0 -translate-y-1/2 w-[380px] h-[380px] rounded-full blur-[140px] opacity-15 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,1,79,0.45) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full px-5 sm:px-6 mx-auto max-w-7xl lg:px-8">
        {/* ── Top Centered Section Header (matching Reeni reference) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 lg:mb-16"
        >
          <p className="mb-3 text-xs sm:text-sm font-display font-bold uppercase tracking-[0.28em] text-[#FF014F]">
            Academic Background
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            Academic Journey &amp;
            <br />
            Core <span className="text-[#FF014F]">Education</span>
          </h2>
          <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#878787]">
            {EDUCATION_INTRO}
          </p>
        </motion.div>

        {/* ── Sub-section Heading with Decorative Dot-Line (matching reference) ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-8"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Education
          </h3>
          <div aria-hidden="true" className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="w-16 sm:w-24 h-px bg-white/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF014F]" />
          </div>
        </motion.div>

        {/* ── Responsive 2-Column Education Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION_DATA.map((edu, index) => (
            <motion.article
              key={edu.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative rounded-2xl bg-[#111115] border border-white/[0.06] p-7 sm:p-8 hover:border-[#FF014F]/45 hover:-translate-y-1 hover:shadow-[0_14px_38px_rgba(255,1,79,0.12)] transition-all duration-300 overflow-hidden ${
                edu.featured ? 'md:col-span-2' : ''
              }`}
            >
              {/* Subtle top-right crimson hover sheen */}
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-[60px] bg-[#FF014F]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              />

              <div className="relative z-10">
                {/* Degree & Institution row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm sm:text-[15px] font-medium text-[#CFD0D4]">
                    {edu.degree}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FF014F]">
                    <FiAward size={13} aria-hidden="true" />
                    {edu.institution}
                  </span>
                </div>

                {/* Prominent Year Range (matching reference card typography) */}
                <h4 className="mt-1.5 text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-[#FF014F] transition-colors duration-300">
                  {edu.date}
                </h4>

                {/* Academic summary */}
                <p className="mt-3 text-sm leading-relaxed text-[#878787] group-hover:text-[#CFD0D4]/90 transition-colors duration-300">
                  {edu.summary}
                </p>

                {/* Key highlights on featured current degree */}
                {edu.featured && (
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-white/[0.06]">
                    {edu.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed text-[#CFD0D4]/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#FF014F] shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
