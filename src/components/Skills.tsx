import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiCpu, FiSearch, FiShare2 } from 'react-icons/fi';
import {
  SiBootstrap,
  SiCplusplus,
  SiCss,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiN8N,
  SiNodedotjs,
  SiReact,
  SiTypescript,
} from 'react-icons/si';

interface SkillItem {
  name: string;
  description: string;
  image?: string;
  icon?: typeof FiCpu;
  color?: string;
}

const SKILLS: SkillItem[] = [
  {
    name: 'React',
    description: 'Build interactive interfaces with reusable components.',
    icon: SiReact,
    color: '#61DAFB',
  },
  {
    name: 'Node.js',
    description: 'Create server-side apps and APIs with JavaScript.',
    icon: SiNodedotjs,
    color: '#339933',
  },
  {
    name: 'TypeScript',
    description: 'Write safer JavaScript with static types.',
    icon: SiTypescript,
    color: '#3178C6',
  },
  {
    name: 'MCP Protocol',
    description: 'Connect AI applications with tools and context.',
    icon: FiCpu,
  },
  {
    name: 'JavaScript',
    description: 'Power interactive experiences across the web.',
    icon: SiJavascript,
    color: '#F7DF1E',
  },
  {
    name: 'HTML',
    description: 'Structure accessible content for the web.',
    icon: SiHtml5,
    color: '#E34F26',
  },
  {
    name: 'CSS',
    description: 'Create responsive layouts and polished interfaces.',
    icon: SiCss,
    color: '#1572B6',
  },
  {
    name: 'Bootstrap',
    description: 'Build responsive UIs with a flexible component toolkit.',
    icon: SiBootstrap,
    color: '#7952B3',
  },
  {
    name: 'MongoDB',
    description: 'Store application data in a flexible document database.',
    icon: SiMongodb,
    color: '#47A248',
  },
  {
    name: 'RAG AI Training',
    description: 'Ground AI responses in relevant retrieved information.',
    icon: FiSearch,
  },
  {
    name: 'OpenClaw',
    description: 'Explore personal AI assistance and agent workflows.',
    image: '/assets/skills/openclaw.svg',
  },
  {
    name: 'n8n Automation',
    description: 'Connect apps and automate workflows visually.',
    icon: SiN8N,
    color: '#EA4B71',
  },
  {
    name: 'Azure',
    description: 'Build and deploy applications with Microsoft cloud services.',
    image: '/assets/skills/azure.svg',
  },
  {
    name: 'Amazon Web Services',
    description: 'Use AWS cloud infrastructure to run and scale applications.',
    image: '/assets/skills/aws.svg',
  },
  {
    name: 'Basic Networking',
    description: 'Understand network fundamentals and device connectivity.',
    icon: FiShare2,
  },
  {
    name: 'C++',
    description: 'Develop performant software with a general-purpose language.',
    icon: SiCplusplus,
    color: '#00599C',
  },
  {
    name: 'Canva',
    description: 'Create visual content with an accessible design toolkit.',
    image: '/assets/skills/canva.svg',
  },
  {
    name: 'Linux',
    description: 'Work with Linux systems, tools, and development environments.',
    icon: SiLinux,
    color: '#FCC624',
  },
  {
    name: 'Photoshop',
    description: 'Edit images and create digital graphics in Photoshop.',
    image: '/assets/skills/photoshop.svg',
  },
];

const Skills = () => {
  const shouldReduceMotion = useReducedMotion();
  const [flippedSkills, setFlippedSkills] = useState<Set<string>>(() => new Set());

  const toggleSkill = (skillName: string) => {
    setFlippedSkills((current) => {
      const next = new Set(current);
      if (next.has(skillName)) {
        next.delete(skillName);
      } else {
        next.add(skillName);
      }
      return next;
    });
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative w-full overflow-hidden bg-dark py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#FF014F] sm:text-sm">
            Tools of the trade
          </p>
          <h2
            id="skills-title"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Skills &amp; <span className="text-[#FF014F]">Technologies</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
            The technologies and creative tools I use to build modern web products and AI-powered experiences.
          </p>
        </motion.header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-6">
          {SKILLS.map((skill, index) => {
            const Icon = skill.icon;
            const isFlipped = flippedSkills.has(skill.name);

            return (
              <motion.button
                key={skill.name}
                type="button"
                aria-label={`${skill.name}: ${skill.description}`}
                aria-pressed={isFlipped}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: shouldReduceMotion ? 0 : index * 0.025,
                  duration: 0.35,
                  ease: 'easeOut',
                }}
                onClick={() => toggleSkill(skill.name)}
                className={`skill-flip-card${isFlipped ? ' is-flipped' : ''}`}
              >
                <span className="skill-flip-card__inner" aria-hidden="true">
                  <span className="skill-flip-card__face skill-flip-card__front">
                    {skill.image ? (
                      <img
                        src={skill.image}
                        alt=""
                        width={56}
                        height={56}
                        loading="lazy"
                        decoding="async"
                        className="mb-3 h-12 w-12 object-contain sm:h-14 sm:w-14"
                      />
                    ) : (
                      Icon && (
                        <Icon
                          aria-hidden="true"
                          className="mb-3 h-10 w-10 sm:h-12 sm:w-12"
                          style={{ color: skill.color ?? '#FF014F' }}
                        />
                      )
                    )}
                    <span className="text-xs font-semibold leading-snug text-[#CFD0D4] sm:text-sm">
                      {skill.name}
                    </span>
                  </span>
                  <span className="skill-flip-card__face skill-flip-card__back">
                    <span className="mb-2 text-sm font-bold text-white">{skill.name}</span>
                    <span className="text-xs leading-relaxed text-white/95">{skill.description}</span>
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
