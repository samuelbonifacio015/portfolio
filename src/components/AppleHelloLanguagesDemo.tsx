import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

import { AppleHelloEffectEnglish } from './apple-hello-effect/apple-hello-effect-english';
import { AppleHelloEffectHindi } from './apple-hello-effect/apple-hello-effect-hindi';
import { AppleHelloEffectSpanish } from './apple-hello-effect/apple-hello-effect-spanish';
import { AppleHelloEffectVietnamese } from './apple-hello-effect/apple-hello-effect-vietnamese';

const AppleHelloLanguagesDemo = () => {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const handleAnimationEnd = () => {
    setIndex((previousIndex) => (previousIndex + 1) % 4);
  };

  if (prefersReducedMotion) {
    return (
      <div className="flex min-h-24 items-center justify-center py-2 sm:min-h-28" aria-hidden="true">
        <span className="font-display text-4xl font-semibold tracking-[-0.03em] text-foreground">Hola</span>
      </div>
    );
  }

  const demos = [
    <AppleHelloEffectEnglish
      key="english"
      className="h-20 max-w-full"
      onAnimationComplete={handleAnimationEnd}
    />,
    <AppleHelloEffectHindi
      key="hindi"
      className="h-20 max-w-full"
      onAnimationComplete={handleAnimationEnd}
    />,
    <AppleHelloEffectSpanish
      key="spanish"
      className="h-20 max-w-full"
      durationScale={0.8}
      onAnimationComplete={handleAnimationEnd}
    />,
    <AppleHelloEffectVietnamese
      key="vietnamese"
      className="h-20 max-w-full"
      durationScale={0.8}
      onAnimationComplete={handleAnimationEnd}
    />,
  ];

  return (
    <div
      className="flex min-h-24 items-center justify-center overflow-hidden py-2 text-foreground sm:min-h-28"
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">{demos[index]}</AnimatePresence>
    </div>
  );
};

export default AppleHelloLanguagesDemo;
