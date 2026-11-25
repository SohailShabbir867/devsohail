import { useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Hobbies from './components/Hobbies';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import WhatsAppWidget from './components/WhatsAppWidget';
import { NAV_ITEMS, SITE_DATA } from './data/constants';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-dark min-h-screen">
        <AnimatePresence mode="wait">
          {isLoading && (
            <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        <Navbar />
        <main>
          <Hero />
          <About />
          <Education />
          <Skills />
          <Experience />
          <Hobbies />
          <Portfolio />
          <Contact />
        </main>
        <footer className="border-t border-[#FF014F]/20 bg-[#0A0A0E] px-5 sm:px-6">
          <div className="mx-auto max-w-7xl py-8 lg:py-10">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <a
                href="#home"
                aria-label={`${SITE_DATA.name} home`}
                className="focus-ring flex items-center gap-2.5 rounded-lg"
              >
                <img
                  src="/assets/logo.png"
                  alt=""
                  aria-hidden="true"
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain drop-shadow-[0_0_14px_rgba(255,1,79,0.4)]"
                />
                <span className="text-lg font-bold tracking-tight text-white">
                  {SITE_DATA.brandFirst}
                  <span className="font-normal text-[#FF014F]">
                    {SITE_DATA.brandSecond}
                  </span>
                </span>
              </a>

              <nav
                aria-label="Footer navigation"
                className="flex flex-wrap justify-center gap-x-5 gap-y-3 md:justify-end"
              >
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.targetId}
                    href={`#${item.targetId}`}
                    className="focus-ring rounded text-xs font-medium text-[#A1A1AA] transition-colors hover:text-[#FF3B7B] sm:text-sm"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            <div className="mt-7 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-center sm:flex-row sm:text-left">
              <p className="text-xs text-[#71717A]">
                © {new Date().getFullYear()} {SITE_DATA.name}. All rights reserved.
              </p>
              <a
                href="#home"
                className="focus-ring rounded text-xs font-medium text-[#A1A1AA] transition-colors hover:text-[#FF3B7B]"
              >
                Back to top
              </a>
            </div>
          </div>
        </footer>
        <WhatsAppWidget />
      </div>
    </MotionConfig>
  );
}

export default App;
