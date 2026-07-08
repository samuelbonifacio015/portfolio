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

const BG: Record<'light' | 'strong' | 'card', { light: string; dark: string }> = {
  light:  { light: 'rgba(255,255,255,0.55)', dark: 'rgba(255,255,255,0.05)' },
  // light 0.75: con 0.55 el blur arrastraba manchas oscuras al pasar sobre secciones negras (navbar)
  strong: { light: 'rgba(255,255,255,0.75)', dark: 'rgba(255,255,255,0.04)' },
  card:   { light: 'rgba(255,255,255,0.55)', dark: 'rgba(255,255,255,0.07)' },
};

const SHADOW: Record<'light' | 'strong' | 'card', { light: string; dark: string }> = {
  light: {
    light: 'inset 0 1px 1px rgba(255,255,255,0.1)',
    dark:  'inset 0 1px 1px rgba(255,255,255,0.08), 0 0 0 0.5px rgba(255,255,255,0.07)',
  },
  strong: {
    light: '4px 4px 4px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.15)',
    dark:  '4px 4px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1), 0 0 0 0.5px rgba(255,255,255,0.07)',
  },
  card: {
    light: 'inset 0 1px 1px rgba(255,255,255,0.1)',
    dark:  '0 4px 24px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(255,255,255,0.08), inset 0 1px 1px rgba(255,255,255,0.06)',
  },
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
    const mql = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsWide(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
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

  const theme = isDark ? 'dark' : 'light';

  const glassStyle = disabled ? {} : {
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    background: BG[variant][theme],
    boxShadow: SHADOW[variant][theme],
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
            background: isDark
              ? 'linear-gradient(180deg, hsl(var(--primary) / 0.7) 0%, hsl(var(--primary) / 0.1) 50%, hsl(var(--primary) / 0.5) 100%)'
              : 'linear-gradient(180deg, hsl(var(--primary) / 0.5) 0%, rgba(255,255,255,0) 50%, hsl(var(--primary) / 0.3) 100%)',
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
