import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const duration = shouldReduceMotion ? 450 : 1400;
    const timer = setTimeout(onComplete, duration);
    return () => clearTimeout(timer);
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      role="status"
      aria-label="Loading portfolio"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.03 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#060608] overflow-hidden"
    >
      {/* Ambient crimson studio glow */}
      <div
        aria-hidden="true"
        className="absolute w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full blur-[115px] opacity-40 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,1,79,0.5) 0%, rgba(255,59,123,0.14) 52%, transparent 75%)',
        }}
      />

      {/* Centered lockup: Spinning Loading Ring + Logo + Dev Sohail */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 sm:gap-7 px-6">
        {/* Logo inside dual spinning loading rings */}
        <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 shrink-0">
          {/* Outer crimson glowing spinner ring */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-[2.5px] border-white/[0.06] border-t-[#FF014F] border-r-[#FF3B7B]/70 shadow-[0_0_28px_rgba(255,1,79,0.45)] animate-spin"
          />

          {/* Inner counter-rotating accent arc */}
          <span
            aria-hidden="true"
            className="absolute inset-2.5 rounded-full border border-transparent border-b-[#FF014F]/75 border-l-white/25 animate-[spin_1.8s_linear_infinite_reverse]"
          />

          {/* Soft inner halo behind logo */}
          <span
            aria-hidden="true"
            className="absolute inset-5 rounded-full bg-[#FF014F]/20 blur-xl animate-pulse"
          />

          {/* DS </> Brand Logo */}
          <motion.img
            src="/assets/logo.png"
            alt="Dev Sohail Logo"
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.8, rotateX: 16, rotateY: -18 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: 1,
                    scale: [0.95, 1.03, 0.98],
                    rotateX: [16, 0],
                    rotateY: [-18, 0],
                  }
            }
            transition={{
              duration: shouldReduceMotion ? 0.3 : 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformPerspective: 700 }}
            className="relative z-10 w-[70px] h-[70px] sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_20px_rgba(255,1,79,0.55)]"
          />
        </div>

        {/* Brand name & subtle loading progress near the ring */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center sm:items-start text-center sm:text-left"
        >
          <p className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white leading-none">
            Dev <span className="text-[#FF014F]">Sohail</span>
          </p>
          <p className="mt-1.5 text-[11px] sm:text-xs font-medium uppercase tracking-[0.26em] text-[#CFD0D4]/80">
            Full Stack MERN Developer
          </p>

          {/* Sleek crimson loading bar */}
          <div
            aria-hidden="true"
            className="mt-3.5 w-44 sm:w-48 h-[3px] rounded-full bg-white/10 overflow-hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{
                duration: shouldReduceMotion ? 0.35 : 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="h-full w-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #E60047 0%, #FF014F 60%, #FF3B7B 100%)',
              }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
