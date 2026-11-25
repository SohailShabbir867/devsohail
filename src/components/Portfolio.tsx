import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  imageFit?: 'cover' | 'contain';
  live: string;
  liveLabel?: string;
  github?: string;
  tags: string[];
}

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'mern-dailyblogs',
    title: 'MERN Stack Blogging Website',
    description:
      'Full-stack MERN blogging platform featuring JWT authentication, rich text publishing, real-time chat interactions, and an integrated TypeScript MCP server for AI blog posting.',
    image: '/assets/projects/dailyblogs.png',
    live: 'https://dailyblogs.website/',
    github: 'https://github.com/SohailShabbir867/',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express', 'MCP Server'],
  },
  {
    id: 'mern-roombridge',
    title: 'RoomBridge - Room & Hostel Finder',
    description:
      'Room and accommodation discovery platform built on the MERN stack, with real-time chat, geo-filtering, and verified property listings.',
    image: '/assets/projects/roombridge.png',
    live: 'https://roombridge.site',
    github: 'https://github.com/SohailShabbir867/RoomBridge',
    tags: ['React.js', 'Tailwind CSS', 'Socket.io', 'MongoDB'],
  },
  {
    id: 'ai-researchflow',
    title: 'AI ResearchFlow',
    description:
      'Autonomous AI research engine powered by Google Gemini and arXiv APIs. It orchestrates parallel search, synthesizes academic literature, and generates structured reports.',
    image: '/assets/projects/researchflow.jpg',
    live: 'https://sohailshabbir867.github.io/ai-researchflow/',
    github: 'https://github.com/SohailShabbir867/ai-researchflow',
    tags: ['React.js', 'Gemini', 'arXiv API', 'AI Agents'],
  },
  {
    id: 'food-garden',
    title: 'FoodGarden',
    description:
      'Food ordering platform with dynamic menu filtering, interactive cart management, order tracking, and a responsive mobile-first interface.',
    image: '/assets/projects/foodgarden.webp',
    live: 'https://sohailshabbir867.github.io/Food-Garden-Website/',
    github: 'https://github.com/SohailShabbir867/Food-Garden-Website',
    tags: ['React.js', 'Node.js', 'Tailwind CSS', 'Express'],
  },
  {
    id: 'ecommerce-platform',
    title: 'Modern E-Commerce Storefront',
    description:
      'Responsive e-commerce storefront with category filtering, product search, cart state management, and an optimized checkout flow.',
    image: '/assets/projects/ecommerce.webp',
    live: 'https://SohailShabbir867.github.io/eCommerce-website/',
    github: 'https://github.com/SohailShabbir867/eCommerce-website',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
  },
  {
    id: 'weather-app',
    title: 'Real-Time Weather Intelligence',
    description:
      'Weather application using the OpenWeatherMap API for location-based forecasts and live weather updates.',
    image: '/assets/projects/weatherapp.webp',
    live: 'https://SohailShabbir867.github.io/my-app/',
    github: 'https://github.com/SohailShabbir867/my-app',
    tags: ['JavaScript', 'OpenWeather API', 'CSS3', 'Async/Await'],
  },
  {
    id: 'jobs-board',
    title: 'Tech Jobs Board',
    description:
      'Job board platform connecting developers and employers through job listings, application tracking, and authentication workflows.',
    image: '/assets/projects/jobs-board.webp',
    live: 'https://SohailShabbir867.github.io/Hassan-Mahmood/',
    github: 'https://github.com/SohailShabbir867/Hassan-Mahmood',
    tags: ['React.js', 'Tailwind CSS', 'Authentication', 'CRUD'],
  },
  {
    id: 'password-generator',
    title: 'Cryptographic Password Generator',
    description:
      'Customizable password generator with character-set options, strength evaluation, and one-click clipboard copying.',
    image: '/assets/projects/password-generator.webp',
    live: 'https://SohailShabbir867.github.io/Password_Generator-/',
    github: 'https://github.com/SohailShabbir867/Password_Generator-',
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Security'],
  },
  {
    id: 'blizon-internal-portal',
    title: 'Blizon Internal Portal',
    description:
      'Blizon’s internal portal brings EOS workflows and team chat together as a Slack replacement, with audio and video calling, AI-powered MCP proposal creation, and meeting summaries.',
    image: '/assets/projects/blizon-portal.png',
    imageFit: 'contain',
    live: 'https://portal.blizon.tech',
    liveLabel: 'Open Portal',
    github: 'https://github.com/SohailShabbir867/',
    tags: [
      'Blizon EOS',
      'Team Chat',
      'Audio & Video',
      'AI MCP Proposals',
      'Meeting Summaries',
    ],
  },
];

const PortfolioCard = ({
  project,
  index,
  shouldReduceMotion,
}: {
  project: PortfolioProject;
  index: number;
  shouldReduceMotion: boolean | null;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 28,
              rotateX: 8,
              rotateY: index % 2 === 0 ? -4 : 4,
              scale: 0.98,
            }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 }
      }
      viewport={{ once: true, margin: '-50px', amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformPerspective: 1000, transformOrigin: 'center bottom' }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onViewportEnter={() => {
        if (window.matchMedia('(hover: none)').matches) {
          setIsFlipped(true);
        }
      }}
      className={`portfolio-card group${isFlipped ? ' is-flipped' : ''}`}
    >
      <div className="portfolio-card__inner">
        <div className="portfolio-card__face portfolio-card__face--front">
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            width={600}
            height={400}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full ${
              project.imageFit === 'contain'
                ? 'bg-[#eaf4e8] object-contain'
                : 'object-cover transition-transform duration-700 group-hover:scale-105'
            }`}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/20 to-transparent"
          />
          <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-[#060608]/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur">
            Project
          </span>
          <div className="relative z-10 mt-auto flex items-end justify-between gap-4 p-5 sm:p-6">
            <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
              {project.title}
            </h3>
            <button
              type="button"
              onClick={() => setIsFlipped(true)}
              aria-label={`Show details for ${project.title}`}
              aria-pressed={isFlipped}
              className="focus-ring inline-flex min-h-11 shrink-0 items-center rounded-xl border border-white/20 bg-[#060608]/75 px-3 text-xs font-semibold text-white backdrop-blur transition-colors hover:border-[#FF014F] hover:bg-[#FF014F]"
            >
              Details
            </button>
          </div>
        </div>

        <div className="portfolio-card__face portfolio-card__face--back p-5 sm:p-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF3B7B]">
              Project details
            </span>
            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              aria-label={`Show image for ${project.title}`}
              className="focus-ring inline-flex min-h-11 shrink-0 items-center rounded-lg border border-white/15 px-3 text-xs font-semibold text-white/80 transition-colors hover:border-white/40 hover:text-white"
            >
              Image
            </button>
          </div>

          <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">
            {project.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#FF014F]/25 bg-[#FF014F]/10 px-2.5 py-1 text-[11px] font-medium text-[#FFD3E0]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className={`mt-5 grid gap-3 border-t border-white/10 pt-4 ${
              project.github ? 'grid-cols-2' : 'grid-cols-1'
            }`}
          >
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live preview of ${project.title}`}
              className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#FF014F] px-3 text-xs font-semibold text-white transition-colors hover:bg-[#D60044]"
            >
              <FiExternalLink aria-hidden="true" size={15} />
              {project.liveLabel ?? 'Live Preview'}
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3 text-xs font-semibold text-white transition-colors hover:border-[#FF014F]/60 hover:bg-[#FF014F]/10"
              >
                <FiGithub aria-hidden="true" size={15} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Portfolio = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="relative w-full overflow-hidden bg-dark py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-24 top-1/4 h-[360px] w-[360px] rounded-full bg-[#FF014F]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-[#FF014F]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={
            shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center lg:mb-14"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-[#FF014F] sm:text-sm">
            Selected Work
          </p>
          <h2
            id="portfolio-title"
            className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Projects &amp; <span className="text-[#FF014F]">Portfolio</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#A1A1AA] sm:text-base">
            Explore my web projects. Hover over a card or scroll to it on mobile
            to reveal the description, live preview, and source code.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {PORTFOLIO_PROJECTS.map((project, index) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
