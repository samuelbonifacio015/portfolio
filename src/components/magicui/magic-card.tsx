import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef, type MouseEvent, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface MagicCardProps {
  children?: ReactNode;
  className?: string;
  /** Keep the surface invisible until the pointer enters the card. */
  showBase?: boolean;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function MagicCard({
  children,
  className,
  showBase = true,
  gradientSize = 240,
  gradientColor = '#262626',
  gradientOpacity = 0.8,
  gradientFrom = '#A1A1AA',
  gradientTo = '#3F3F46',
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top } = card.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  };

  const glow = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`;
  const border = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientFrom}, ${gradientTo}, transparent 100%)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('group relative w-full rounded-[var(--radius-card)]', className)}
    >
      {showBase && <div className="absolute inset-0 rounded-[var(--radius-card)] bg-border" />}
      {showBase ? (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: border }}
        />
      ) : (
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-[var(--radius-card)] p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: border }}
        >
          <div className="size-full rounded-[calc(var(--radius-card)-1px)] bg-background" />
        </motion.div>
      )}
      {showBase && (
        <>
          <div className="absolute inset-px rounded-[calc(var(--radius-card)-1px)] bg-card" />
          <div className="pointer-events-none absolute inset-px rounded-[calc(var(--radius-card)-1px)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <motion.div
              className="size-full rounded-[calc(var(--radius-card)-1px)]"
              style={{ background: glow, opacity: gradientOpacity }}
            />
          </div>
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
