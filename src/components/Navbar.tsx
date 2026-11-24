import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { NAV_ITEMS, SITE_DATA } from '../data/constants';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen]         = useState(false);
  const [isBlogsOpen, setIsBlogsOpen]       = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection]   = useState('home');
  const dropdownRef                         = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.targetId);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH    = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 30);
      setScrollProgress(docH > 0 ? (scrollY / docH) * 100 : 0);

      let current = 'home';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom > 160) current = id;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close Blogs dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsBlogsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setIsBlogsOpen(false);

    const scrollToTarget = () => {
      const element = document.getElementById(targetId);
      if (element) {
        const navOffset       = 72;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - navOffset, behavior: 'smooth' });
        if (window.history.pushState) {
          window.history.pushState(null, '', `#${targetId}`);
        }
      }
    };

    isMenuOpen ? setTimeout(scrollToTarget, 120) : scrollToTarget();
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/85 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      {/* Subtle scroll progress bar when scrolling */}
      {scrollProgress > 1 && (
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent via-accent-light to-accent transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      )}

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* ── Left: [S] SohailShabbir Logo ── */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="relative z-10 flex items-center gap-2.5 group"
          >
            <motion.span
              whileHover={{ scale: 1.06, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
              className="flex items-center justify-center w-8 h-8 rounded-[8px] border-[1.75px] border-accent bg-accent/10 text-accent font-extrabold text-base leading-none shadow-[0_0_16px_rgba(255,102,0,0.3)] group-hover:bg-accent group-hover:text-white transition-colors duration-300"
            >
              S
            </motion.span>
            <span className="text-[19px] font-bold tracking-tight text-white">
              {SITE_DATA.firstName}
              <span className="font-normal text-accent transition-colors duration-300 group-hover:text-accent-light">
                {SITE_DATA.lastName}
              </span>
            </span>
          </a>

          {/* ── Center: Signature Curved Orange Top Tab (Desktop) ── */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-start justify-center absolute left-1/2 -translate-x-1/2 top-0 z-20"
          >
            <div className="relative flex items-center">
              {/* Left concave S-curve wing */}
              <svg
                width="36"
                height="52"
                viewBox="0 0 36 52"
                fill="none"
                aria-hidden="true"
                className="-mr-[1px] shrink-0 drop-shadow-[0_8px_20px_rgba(255,102,0,0.28)]"
              >
                <path d="M0 0 C16 0 14 52 36 52 L36 0 Z" fill="#FF5500" />
              </svg>

              {/* Center solid gradient bar */}
              <div
                className="h-[52px] px-5 xl:px-7 flex items-center gap-6 xl:gap-7 shadow-[0_10px_32px_rgba(255,102,0,0.35)]"
                style={{
                  background: 'linear-gradient(90deg, #FF5500 0%, #FF6600 50%, #FF7B1A 100%)',
                }}
              >
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.targetId;

                  if (item.hasDropdown && item.subLinks) {
                    return (
                      <div
                        key={item.label}
                        ref={dropdownRef}
                        className="relative"
                        onMouseEnter={() => setIsBlogsOpen(true)}
                        onMouseLeave={() => setIsBlogsOpen(false)}
                      >
                        <button
                          type="button"
                          onClick={() => setIsBlogsOpen((prev) => !prev)}
                          aria-expanded={isBlogsOpen}
                          className={`relative flex items-center gap-1 py-1 text-[13.5px] font-medium tracking-wide transition-colors duration-200 ${
                            isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white'
                          }`}
                        >
                          <span>{item.label}</span>
                          <FiChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${
                              isBlogsOpen ? 'rotate-180' : ''
                            }`}
                          />
                          {isActive && (
                            <motion.span
                              layoutId="activeNav"
                              className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-white"
                              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                            />
                          )}
                        </button>

                        {/* Blogs Dropdown */}
                        <AnimatePresence>
                          {isBlogsOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 8, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.96 }}
                              transition={{ duration: 0.18 }}
                              className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-52 z-50"
                            >
                              <div className="p-1.5 rounded-xl bg-dark-100/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/70">
                                {item.subLinks.map((sub) =>
                                  sub.external ? (
                                    <a
                                      key={sub.label}
                                      href={sub.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => setIsBlogsOpen(false)}
                                      className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-gray-300 rounded-lg hover:bg-accent/15 hover:text-accent transition-colors"
                                    >
                                      <span>{sub.label}</span>
                                      <FiExternalLink size={12} />
                                    </a>
                                  ) : (
                                    <a
                                      key={sub.label}
                                      href={sub.href}
                                      onClick={(e) => handleNavClick(e, item.targetId)}
                                      className="block px-3.5 py-2.5 text-xs font-medium text-gray-300 rounded-lg hover:bg-accent/15 hover:text-accent transition-colors"
                                    >
                                      {sub.label}
                                    </a>
                                  ),
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <a
                      key={item.label}
                      href={`#${item.targetId}`}
                      onClick={(e) => handleNavClick(e, item.targetId)}
                      className={`relative py-1 text-[13.5px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap ${
                        isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-white"
                          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                        />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* Right concave S-curve wing */}
              <svg
                width="36"
                height="52"
                viewBox="0 0 36 52"
                fill="none"
                aria-hidden="true"
                className="-ml-[1px] shrink-0 drop-shadow-[0_8px_20px_rgba(255,102,0,0.28)]"
              >
                <path d="M36 0 C20 0 22 52 0 52 L0 0 Z" fill="#FF7B1A" />
              </svg>
            </div>
          </nav>

          {/* ── Right: Let's Talk > Button + Mobile Menu Button ── */}
          <div className="flex items-center gap-3 z-10">
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 28px rgba(255,102,0,0.5)' }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-[13.5px] font-semibold text-white rounded-md shadow-[0_4px_20px_rgba(255,102,0,0.35)] transition-all duration-300 ripple-btn"
              style={{
                background: 'linear-gradient(135deg, #FF5500 0%, #FF7A1A 100%)',
              }}
            >
              <span>Let&apos;s Talk</span>
              <FiChevronRight size={15} className="stroke-[2.5]" />
            </motion.a>

            {/* Mobile / Tablet Hamburger */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="relative z-50 flex flex-col items-center justify-center w-10 h-10 lg:hidden gap-1.5 rounded-lg border border-white/10 bg-dark-100/70 backdrop-blur-md"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {[
                isMenuOpen ? { rotate: 45,  y: 8 }  : { rotate: 0, y: 0 },
                isMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 },
                isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 },
              ].map((anim, i) => (
                <motion.span
                  key={i}
                  animate={anim}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="block w-5 h-0.5 bg-white rounded-full"
                />
              ))}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet Slide-down Drawer ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-b lg:hidden bg-dark-100 border-white/10 shadow-2xl shadow-black/80"
          >
            <div className="flex flex-col items-center py-6 px-6 space-y-4">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={`#${item.targetId}`}
                  onClick={(e) => handleNavClick(e, item.targetId)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`text-base font-medium tracking-wide transition-colors duration-200 ${
                    activeSection === item.targetId
                      ? 'text-accent font-semibold'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="inline-flex items-center gap-1.5 px-7 py-2.5 mt-2 text-sm font-semibold text-white rounded-md shadow-lg shadow-accent/30"
                style={{
                  background: 'linear-gradient(135deg, #FF5500 0%, #FF7A1A 100%)',
                }}
              >
                <span>Let&apos;s Talk</span>
                <FiChevronRight size={15} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
