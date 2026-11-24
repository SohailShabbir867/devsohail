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
        scrolled || isMenuOpen
          ? 'bg-dark/95 backdrop-blur-xl shadow-2xl shadow-black/60 border-b border-white/[0.08]'
          : 'bg-transparent'
      }`}
    >
      {/* Subtle scroll progress bar */}
      {scrollProgress > 1 && (
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#FF014F] via-[#FF3B7B] to-[#FF014F] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      )}

      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* ── Left: [S] SohailShabbir Logo ── */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, 'home')}
            className="relative z-10 flex items-center gap-2.5 group focus-ring rounded-lg"
          >
            <motion.span
              whileHover={{ scale: 1.08, rotate: -4 }}
              transition={{ type: 'spring', stiffness: 340, damping: 18 }}
              className="flex items-center justify-center w-8 h-8 rounded-[8px] border-[1.75px] border-[#FF014F] bg-[#FF014F]/10 text-[#FF014F] font-extrabold text-base leading-none shadow-[0_0_18px_rgba(255,1,79,0.35)] group-hover:bg-[#FF014F] group-hover:text-white group-hover:shadow-[0_0_24px_rgba(255,1,79,0.65)] transition-all duration-300"
            >
              S
            </motion.span>
            <span className="text-[19px] font-bold tracking-tight text-white">
              {SITE_DATA.firstName}
              <span className="font-normal text-[#FF014F] transition-colors duration-300 group-hover:text-[#FF3B7B]">
                {SITE_DATA.lastName}
              </span>
            </span>
          </a>

          {/* ── Center: Signature Curved Crimson Top Tab (Desktop) ── */}
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
                className="-mr-[1px] shrink-0 drop-shadow-[0_10px_24px_rgba(255,1,79,0.32)]"
              >
                <path d="M0 0 C16 0 14 52 36 52 L36 0 Z" fill="#E60047" />
              </svg>

              {/* Center gradient bar */}
              <div
                className="h-[52px] px-5 xl:px-7 flex items-center gap-6 xl:gap-7 shadow-[0_10px_34px_rgba(255,1,79,0.4)]"
                style={{
                  background: 'linear-gradient(90deg, #E60047 0%, #FF014F 50%, #FF2A6D 100%)',
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
                          className={`relative flex items-center gap-1 py-1 text-[13.5px] font-medium tracking-wide transition-colors duration-200 cursor-pointer focus-ring rounded ${
                            isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white'
                          }`}
                        >
                          <span>{item.label}</span>
                          <FiChevronDown
                            size={14}
                            aria-hidden="true"
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
                              <div className="p-1.5 rounded-xl bg-dark-100/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/75">
                                {item.subLinks.map((sub) =>
                                  sub.external ? (
                                    <a
                                      key={sub.label}
                                      href={sub.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => setIsBlogsOpen(false)}
                                      className="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-gray-200 rounded-lg hover:bg-[#FF014F]/15 hover:text-[#FF014F] transition-colors focus-ring"
                                    >
                                      <span>{sub.label}</span>
                                      <FiExternalLink size={12} aria-hidden="true" />
                                    </a>
                                  ) : (
                                    <a
                                      key={sub.label}
                                      href={sub.href}
                                      onClick={(e) => handleNavClick(e, item.targetId)}
                                      className="block px-3.5 py-2.5 text-xs font-medium text-gray-200 rounded-lg hover:bg-[#FF014F]/15 hover:text-[#FF014F] transition-colors focus-ring"
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
                      className={`group/nav relative py-1 text-[13.5px] font-medium tracking-wide transition-colors duration-200 whitespace-nowrap focus-ring rounded ${
                        isActive ? 'text-white font-semibold' : 'text-white/90 hover:text-white'
                      }`}
                    >
                      {item.label}
                      {isActive ? (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-white"
                          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                        />
                      ) : (
                        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-white/75 rounded-full group-hover/nav:w-full transition-all duration-300" />
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
                className="-ml-[1px] shrink-0 drop-shadow-[0_10px_24px_rgba(255,1,79,0.32)]"
              >
                <path d="M36 0 C20 0 22 52 0 52 L0 0 Z" fill="#FF2A6D" />
              </svg>
            </div>
          </nav>

          {/* ── Right: Let's Talk > Button + Circular Mobile Hamburger (matching Image 2) ── */}
          <div className="flex items-center gap-3 z-10">
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(255,1,79,0.55)' }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 min-h-[42px] text-[13.5px] font-semibold text-white rounded-md shadow-[0_4px_22px_rgba(255,1,79,0.4)] transition-all duration-300 ripple-btn hover-icon-reverse focus-ring"
              style={{
                background: 'linear-gradient(135deg, #E60047 0%, #FF014F 55%, #FF2A6D 100%)',
              }}
            >
              <span>Let&apos;s Talk</span>
              <span className="icon-slide" aria-hidden="true">
                <FiChevronRight size={15} className="icon-primary stroke-[2.5]" />
                <FiChevronRight size={15} className="icon-secondary stroke-[2.5]" />
              </span>
            </motion.a>

            {/* Circular crimson mobile hamburger button (matching Image 2 mobile bar) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="relative z-50 flex flex-col items-center justify-center w-11 h-11 lg:hidden gap-1.5 rounded-full bg-[#FF014F] text-white shadow-[0_0_22px_rgba(255,1,79,0.52)] hover:bg-[#D40041] transition-colors duration-200 cursor-pointer focus-ring"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
                  transition={{ type: 'spring', stiffness: 320, damping: 22 }}
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-b lg:hidden bg-dark-100 border-white/10 shadow-2xl shadow-black/90"
          >
            <div className="flex flex-col items-center py-6 px-6 space-y-2">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={`#${item.targetId}`}
                  onClick={(e) => handleNavClick(e, item.targetId)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-full text-center py-2.5 min-h-[44px] flex items-center justify-center text-base font-medium tracking-wide rounded-lg transition-colors duration-200 focus-ring ${
                    activeSection === item.targetId
                      ? 'text-[#FF014F] font-semibold bg-[#FF014F]/10'
                      : 'text-gray-200 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25 }}
                className="inline-flex items-center justify-center gap-1.5 px-8 py-3 min-h-[44px] mt-3 text-sm font-semibold text-white rounded-full shadow-lg shadow-accent/35 hover-icon-reverse focus-ring"
                style={{
                  background: 'linear-gradient(135deg, #E60047 0%, #FF014F 55%, #FF2A6D 100%)',
                }}
              >
                <span>Let&apos;s Talk</span>
                <span className="icon-slide" aria-hidden="true">
                  <FiChevronRight size={15} className="icon-primary" />
                  <FiChevronRight size={15} className="icon-secondary" />
                </span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
