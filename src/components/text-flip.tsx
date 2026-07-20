import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Children, useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

const WORDS = ['Ingeniero', 'Full-Stack', 'Frontend', 'Backend', 'Mobile'];

type TextFlipProps = {
  children: ReactNode;
  className?: string;
  play?: boolean;
};

export const TextFlip = ({ children, className, play = true }: TextFlipProps) => {
  const words = Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!play || words.length < 2) return;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % words.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, [play, prefersReducedMotion, words.length]);

  return (
    <span className={cn('inline-flex min-w-0', className)} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={activeIndex}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.35, ease: 'easeOut' }}
        >
          {words[activeIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const TextFlipDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const tallestWord = WORDS.reduce((longest, word) => (longest.length >= word.length ? longest : word));

  return (
    <div
      ref={ref}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground sm:text-base"
    >
      <span>Soy</span>
      <span className="inline-grid">
        <span className="invisible col-start-1 row-start-1" aria-hidden="true">
          {tallestWord}
        </span>
        <TextFlip className="col-start-1 row-start-1 text-foreground" play={isInView}>
          {WORDS.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </TextFlip>
      </span>
    </div>
  );
};

export default TextFlipDemo;
