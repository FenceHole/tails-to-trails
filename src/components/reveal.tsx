import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type Variant = 'pop' | 'left' | 'right' | 'wipe';

/**
 * Server and first client render are fully visible. After mount, anything
 * that starts below the fold is armed (hidden) and then revealed on scroll.
 */
export function Reveal({
  children,
  variant = 'pop',
  delay = 0,
  className = '',
  style,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'idle' | 'hidden' | 'shown'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.95) return;
    setState('hidden');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const transitionDelay = state === 'shown' ? `${delay}ms` : undefined;

  return (
    <div
      ref={ref}
      className={`rv ${className}`}
      data-reveal={state === 'idle' ? undefined : state}
      data-variant={variant}
      style={{ ...style, transitionDelay }}
    >
      {/* The wipe clips an inner box, never the observed one: browsers treat a
          fully clipped target as not intersecting, so it would never reveal. */}
      {variant === 'wipe' ? (
        <div className="rv-wipe" style={{ transitionDelay }}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
