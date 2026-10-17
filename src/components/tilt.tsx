import { useRef, type ReactNode } from 'react';

/** Leans toward the mouse pointer. Touch and reduced-motion users get a plain wrapper. */
export function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateZ(0)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = '';
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
