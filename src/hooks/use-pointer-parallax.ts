import { useEffect, useRef } from 'react';

/**
 * Writes the pointer position over an element to --mx and --my (-1 to 1) on
 * that element, so CSS can shift layers with calc(). Does nothing under
 * prefers-reduced-motion.
 */
export function usePointerParallax<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty('--mx', x.toFixed(3));
      el.style.setProperty('--my', y.toFixed(3));
    };
    const queue = () => {
      if (!raf) raf = window.requestAnimationFrame(apply);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      y = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      queue();
    };
    const onLeave = () => {
      x = 0;
      y = 0;
      queue();
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return ref;
}
