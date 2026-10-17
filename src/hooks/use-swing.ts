import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';

/**
 * A hanging sign: drag it sideways and it swings, let go and it settles back
 * like a spring. Hovering (mouse) or focusing gives it a nudge.
 *
 * The angle is written straight to the element's style from a rAF loop that
 * only runs while the sign is moving, so nothing re-renders.
 */
const STIFFNESS = 120;
const DAMPING = 6.2;
const MAX_ANGLE = 8;
const DRAG_START = 5;

export function useSwing<T extends HTMLElement>(onFirstUse?: () => void) {
  const ref = useRef<T>(null);
  const s = useRef({
    angle: 0,
    vel: 0,
    dragging: false,
    pressed: false,
    startX: 0,
    prevAngle: 0,
    prevT: 0,
    raf: 0,
    last: 0,
    moved: false,
    used: false,
  });

  const paint = () => {
    const el = ref.current;
    if (el) el.style.transform = `rotate(${s.current.angle.toFixed(3)}deg)`;
  };

  const loop = useCallback((now: number) => {
    const st = s.current;
    if (st.dragging) {
      st.raf = window.requestAnimationFrame(loop);
      return;
    }
    const dt = Math.min(0.032, (now - st.last) / 1000 || 0.016);
    st.last = now;
    st.vel += (-STIFFNESS * st.angle - DAMPING * st.vel) * dt;
    st.angle += st.vel * dt;
    paint();
    if (Math.abs(st.angle) < 0.04 && Math.abs(st.vel) < 0.25) {
      st.angle = 0;
      st.vel = 0;
      paint();
      st.raf = 0;
      return;
    }
    st.raf = window.requestAnimationFrame(loop);
  }, []);

  const wake = useCallback(() => {
    const st = s.current;
    if (st.raf) return;
    st.last = performance.now();
    st.raf = window.requestAnimationFrame(loop);
  }, [loop]);

  useEffect(() => {
    const st = s.current;
    return () => window.cancelAnimationFrame(st.raf);
  }, []);

  const markUsed = () => {
    const st = s.current;
    if (!st.used) {
      st.used = true;
      onFirstUse?.();
    }
  };

  const nudge = useCallback(
    (strength: number, dir?: number) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const st = s.current;
      st.vel += (dir ?? (Math.random() < 0.5 ? -1 : 1)) * strength;
      wake();
    },
    [wake],
  );

  const handlers = {
    onPointerDown(e: ReactPointerEvent<T>) {
      const st = s.current;
      st.pressed = true;
      st.moved = false;
      st.startX = e.clientX;
      st.prevAngle = st.angle;
      st.prevT = performance.now();
    },
    onPointerMove(e: ReactPointerEvent<T>) {
      const st = s.current;
      if (!st.pressed) return;
      const dx = e.clientX - st.startX;
      if (!st.dragging) {
        if (Math.abs(dx) < DRAG_START) return;
        st.dragging = true;
        st.moved = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        markUsed();
        wake();
      }
      const next = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, dx * 0.06));
      const now = performance.now();
      const dt = Math.max(0.008, (now - st.prevT) / 1000);
      st.vel = (next - st.prevAngle) / dt;
      st.prevAngle = next;
      st.prevT = now;
      st.angle = next;
      paint();
    },
    onPointerUp(e: ReactPointerEvent<T>) {
      const st = s.current;
      st.pressed = false;
      if (st.dragging) {
        st.dragging = false;
        st.vel = Math.max(-150, Math.min(150, st.vel));
        if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
        wake();
      }
    },
    onPointerCancel() {
      const st = s.current;
      st.pressed = false;
      if (st.dragging) {
        st.dragging = false;
        wake();
      }
    },
    onPointerEnter(e: ReactPointerEvent<T>) {
      if (e.pointerType === 'mouse') {
        nudge(46);
        markUsed();
      }
    },
    onFocus() {
      nudge(36);
    },
  };

  /** True when the last gesture was a drag, so the click that follows must not navigate. */
  const wasDrag = () => {
    const was = s.current.moved;
    s.current.moved = false;
    return was;
  };

  return { ref, handlers, wasDrag, nudge };
}
