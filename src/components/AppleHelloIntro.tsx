import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { AppleHelloEffectEnglish } from './apple-hello-effect/apple-hello-effect-english';

const AppleHelloIntro = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // The English drawing completes after 3.5s. Keep it on screen briefly,
    // then let AnimatePresence perform the presentation fade-out.
    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, prefersReducedMotion ? 450 : 4100);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[60] flex min-h-screen items-center justify-center bg-white text-black dark:bg-black dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 0.65,
            ease: 'easeOut',
          }}
          aria-hidden="true"
        >
          <AppleHelloEffectEnglish
            className="h-auto w-[min(78vw,638px)]"
            static={prefersReducedMotion ?? false}
            exit={{ opacity: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppleHelloIntro;
