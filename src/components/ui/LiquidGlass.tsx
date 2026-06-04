import { motion, useMotionValue, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTheme } from '@/hooks/use-theme';

export interface LiquidGlassProps extends React.AllHTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  variant?: 'light' | 'strong' | 'card';
  children?: React.ReactNode;
  className?: string;
  enableTilt?: boolean;
  enableReflection?: boolean;
  enableBreathing?: boolean;
  enableMorphing?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileHover?: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileTap?: Record<string, any>;
}

const BLUR: Record<'light' | 'strong' | 'card', { light: number; dark: number }> = {
  light:  { light: 4,  dark: 8  },
  strong: { light: 30, dark: 50 },
  card:   { light: 10, dark: 20 },
};

const TILT_MAX = 4;

export function LiquidGlass({
  as = 'div',
  variant = 'card',
  children,
  className,
  enableTilt = false,
  enableReflection = false,
  enableBreathing = false,
  enableMorphing = false,
  disabled = false,
  whileHover,
  whileTap,
  ...rest
}: LiquidGlassProps) {
  const prefersReduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { isDark } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const containerRef = useRef<any>(null);
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const check = () => setIsWide(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [TILT_MAX, -TILT_MAX]),
    { stiffness: 300, damping: 30 }
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-TILT_MAX, TILT_MAX]),
    { stiffness: 300, damping: 30 }
  );

  const [reflection, setReflection] = useState({ x: 50, y: 50, visible: false });

  const canTilt    = !disabled && enableTilt    && !isMobile && !prefersReduced;
  const canReflect = !disabled && enableReflection && !isMobile && !prefersReduced;
  const canMorph   = !disabled && enableMorphing && isWide && variant === 'card' && !prefersReduced;
  const canBreathe = !disabled && enableBreathing && !prefersReduced;

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!containerRef.current) return;
      const rect = (containerRef.current as HTMLElement).getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      if (canTilt) { mouseX.set(x - 0.5); mouseY.set(y - 0.5); }
      if (canReflect) setReflection({ x: x * 100, y: y * 100, visible: true });
    },
    [canTilt, canReflect, mouseX, mouseY]
  );

  const onPointerLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setReflection(prev => ({ ...prev, visible: false }));
  }, [mouseX, mouseY]);

  const blur = BLUR[variant][isDark ? 'dark' : 'light'];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionEl = (motion as any)[as] as typeof motion.div;

  const glassStyle = disabled ? {} : {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    background: isDark ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.5)',
    boxShadow:
      variant === 'strong'
        ? '4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15)'
        : 'inset 0 1px 1px rgba(255,255,255,0.1)',
    willChange: 'transform' as const,
    ...(canTilt && { transformStyle: 'preserve-3d' as const, rotateX, rotateY }),
  };

  return (
    <MotionEl
      ref={containerRef}
      {...rest}
      className={cn('relative overflow-hidden', className)}
      style={{ ...glassStyle, ...((rest as React.CSSProperties & typeof rest).style ?? {}) }}
      whileHover={whileHover}
      whileTap={whileTap}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {canMorph && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
          aria-hidden="true"
        >
          <div className="lg-blob lg-blob-1" />
          <div className="lg-blob lg-blob-2" />
        </div>
      )}

      {children}

      {canBreathe && (
        <div
          className="lg-border-breathe pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            padding: '1.4px',
            background:
              'linear-gradient(180deg, rgba(37,99,235,0.5) 0%, rgba(255,255,255,0) 50%, rgba(37,99,235,0.3) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      )}

      {canReflect && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            opacity: reflection.visible ? 1 : 0,
            transition: 'opacity 0.3s ease-out',
            background: `radial-gradient(circle at ${reflection.x}% ${reflection.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
          }}
        />
      )}
    </MotionEl>
  );
}
