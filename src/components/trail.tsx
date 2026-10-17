import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { WalkingDog } from '@/components/art';

const Y_START = 640;
/** Half-height of the swoop that carries the trail from one gutter to the other. */
const SWOOP = 110;

type Pt = { x: number; y: number };
interface Geo {
  w: number;
  h: number;
  /** Page offsets of the sections the trail crosses over to the other side at. */
  crosses: number[];
}

function curve(pts: Pt[]): string {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i += 1) {
    const a = pts[i - 1];
    const b = pts[i];
    const dy = (b.y - a.y) * 0.6;
    d += ` C ${a.x} ${Math.round(a.y + dy)} ${b.x} ${Math.round(b.y - dy)} ${b.x} ${b.y}`;
  }
  return d;
}

/**
 * Wide screens: the trail wanders down one side gutter and swoops across to the
 * other only inside the empty padding between two sections, so it never runs
 * through text. Narrow screens: a single wiggle down the left edge.
 */
function buildPath({ w, h, crosses }: Geo): { d: string; yEnd: number } {
  if (w < 1280) {
    const yEnd = Math.max(Y_START + 600, h - 380);
    const pts: Pt[] = [];
    let i = 0;
    for (let y = Y_START; y < yEnd; y += 380) {
      pts.push({ x: i % 2 === 0 ? 20 : 34, y });
      i += 1;
    }
    pts.push({ x: 26, y: yEnd });
    return { d: curve(pts), yEnd };
  }

  const gutter = (w - 1152) / 2;
  const left = Math.max(44, Math.round(gutter / 2));
  const right = w - left;
  const wobble = gutter >= 110 ? 24 : 12;
  const pts: Pt[] = [{ x: left, y: Y_START }];
  let side = left;
  let y = Y_START;

  /** Wander down the current gutter to `to`, drifting a little for a hand-drawn feel. */
  const run = (to: number) => {
    const n = Math.max(1, Math.round((to - y) / 480));
    for (let k = 1; k <= n; k += 1) {
      pts.push({
        x: k === n ? side : side + (k % 2 === 1 ? wobble : -wobble),
        y: Math.round(y + ((to - y) * k) / n),
      });
    }
    y = to;
  };

  for (const c of crosses) {
    if (c - SWOOP < y + 200) continue;
    run(c - SWOOP);
    side = side === left ? right : left;
    y = c + SWOOP;
    pts.push({ x: side, y });
  }
  const yEnd = Math.max(y + 160, h - 380);
  run(yEnd);
  return { d: curve(pts), yEnd };
}

function sameGeo(a: Geo, b: Geo): boolean {
  return (
    a.w === b.w &&
    Math.abs(a.h - b.h) < 6 &&
    a.crosses.length === b.crosses.length &&
    a.crosses.every((c, i) => Math.abs(c - b.crosses[i]) < 6)
  );
}

/** Wraps the page; draws a trail down it and walks a dog along it on scroll. */
export function TrailWrap({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dogRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const next: Geo = {
        w: el.offsetWidth,
        h: el.offsetHeight,
        crosses: Array.from(el.querySelectorAll<HTMLElement>(':scope > [data-trail-cross]')).map((s) => s.offsetTop),
      };
      setGeo((g) => (g && sameGeo(g, next) ? g : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const built = useMemo(() => (geo ? buildPath(geo) : null), [geo]);
  const d = built?.d ?? '';
  const yEnd = built?.yEnd ?? 0;

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    const dog = dogRef.current;
    const flip = flipRef.current;
    if (!d || !wrap || !path || !dog || !flip) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    let lastP = -1;
    let raf = 0;
    let timer = 0;

    const update = () => {
      raf = 0;
      const top = wrap.getBoundingClientRect().top + window.scrollY;
      const raw = (window.scrollY + window.innerHeight * 0.6 - top - Y_START) / (yEnd - Y_START);
      const p = reduced ? 1 : Math.min(1, Math.max(0, raw));
      path.style.strokeDashoffset = `${len * (1 - p)}`;
      const at = p * len;
      const pt = path.getPointAtLength(at);
      const ahead = path.getPointAtLength(Math.min(len, at + 6));
      const behind = path.getPointAtLength(Math.max(0, at - 6));
      const dx = ahead.x - behind.x;
      if (Math.abs(dx) > 0.4) flip.style.transform = `scaleX(${dx < 0 ? -1 : 1})`;
      dog.style.transform = `translate3d(${pt.x - dog.offsetWidth / 2}px, ${pt.y - dog.offsetHeight + 8}px, 0)`;
      if (Math.abs(p - lastP) > 0.0004 && !reduced) {
        dog.classList.add('walking');
        window.clearTimeout(timer);
        timer = window.setTimeout(() => dog.classList.remove('walking'), 180);
      }
      lastP = p;
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, [d, yEnd]);

  return (
    <div ref={wrapRef} className="trail-pad relative">
      {children}
      {geo && d ? (
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true" data-testid="trail-layer">
          <svg width={geo.w} height={geo.h} viewBox={`0 0 ${geo.w} ${geo.h}`} className="absolute inset-0">
            <path d={d} fill="none" stroke="hsl(45 100% 93%)" strokeWidth="11" strokeLinecap="round" opacity="0.55" />
            <path d={d} fill="none" stroke="hsl(258 22% 10%)" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 10" opacity="0.5" />
            <path ref={pathRef} d={d} fill="none" stroke="hsl(258 22% 10%)" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <div ref={dogRef} className="absolute left-0 top-0 w-12 will-change-transform xl:w-[84px]">
            <div ref={flipRef}>
              <WalkingDog className="h-auto w-full drop-shadow-[0_3px_0_rgba(0,0,0,0.15)]" color="tan" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
