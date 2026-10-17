import { useEffect, useRef } from 'react';

/**
 * Art for the trailhead scene, taken from Jennifer's flyer: mint sky, layered
 * green hills, a tan trail, charcoal silhouettes, a black cat on the sign.
 * Flat shapes on purpose (the flyer has no outlines); the sticker-style
 * outlines belong to the UI around it.
 */

export const SCENE = {
  mint: 'hsl(140 33% 93%)',
  meadow: 'hsl(142 62% 63%)',
  fern: 'hsl(140 46% 40%)',
  pine: 'hsl(143 58% 28%)',
  spruce: 'hsl(150 62% 20%)',
  trail: 'hsl(30 28% 63%)',
  trailEdge: 'hsl(28 30% 46%)',
  charcoal: 'hsl(0 0% 24%)',
  grass: 'hsl(140 66% 38%)',
} as const;

/** One tiered spruce, base centred on (x, y). */
function Tree({ x, y, h, fill }: { x: number; y: number; h: number; fill: string }) {
  const w = h * 0.5;
  const d = [
    `M${x} ${y - h}`,
    `L${x + w * 0.36} ${y - h * 0.62}`,
    `L${x + w * 0.2} ${y - h * 0.62}`,
    `L${x + w * 0.44} ${y - h * 0.32}`,
    `L${x + w * 0.26} ${y - h * 0.32}`,
    `L${x + w * 0.5} ${y}`,
    `L${x - w * 0.5} ${y}`,
    `L${x - w * 0.26} ${y - h * 0.32}`,
    `L${x - w * 0.44} ${y - h * 0.32}`,
    `L${x - w * 0.2} ${y - h * 0.62}`,
    `L${x - w * 0.36} ${y - h * 0.62}`,
    'Z',
  ].join(' ');
  return <path d={d} fill={fill} />;
}

const LAYER = 'px-layer pointer-events-none absolute bottom-0 left-[-6%] h-full w-[112%]';

/**
 * Four stacked hill layers that drift at different speeds with the pointer
 * (see .px-1 to .px-3 in index.css). Fills its parent; the parent sets height.
 */
export function Landscape({ className = '' }: { className?: string }) {
  const svg = {
    viewBox: '0 0 1440 360',
    preserveAspectRatio: 'xMidYMax slice' as const,
    'aria-hidden': true as const,
  };
  return (
    <div className={`absolute inset-0 ${className}`} aria-hidden="true">
      {/* far meadow */}
      <svg {...svg} className={`${LAYER} px-1`}>
        <path d="M0 130 Q200 66 420 112 T820 104 T1200 72 T1440 112 V360 H0 Z" fill={SCENE.meadow} />
        {[150, 196, 640, 690, 1010, 1060, 1380].map((x, i) => (
          <Tree key={x} x={x} y={112 - (i % 3) * 6 + 18} h={34 + (i % 3) * 8} fill={SCENE.fern} />
        ))}
      </svg>
      {/* mid hills with spruce */}
      <svg {...svg} className={`${LAYER} px-2`}>
        <path d="M0 176 Q140 124 300 160 Q430 192 548 256 L572 360 H0 Z" fill={SCENE.pine} />
        <path d="M1440 154 Q1300 112 1140 172 Q1030 214 944 284 L920 360 H1440 Z" fill="hsl(143 52% 34%)" />
        {[
          [88, 196, 78],
          [150, 214, 112],
          [214, 202, 64],
          [330, 226, 70],
          [410, 250, 50],
          [1270, 214, 84],
          [1352, 188, 60],
          [1396, 232, 96],
        ].map(([x, y, h]) => (
          <Tree key={x} x={x} y={y} h={h} fill={SCENE.spruce} />
        ))}
      </svg>
      {/* trail */}
      <svg {...svg} className={`${LAYER} px-2`}>
        <path
          d="M690 152 C650 192 722 216 784 246 C852 280 902 322 934 360 L758 360 C748 322 700 288 640 260 C560 224 600 176 690 152 Z"
          fill={SCENE.trail}
        />
        <path
          d="M690 152 C650 192 722 216 784 246 C852 280 902 322 934 360 M640 260 C560 224 600 176 690 152"
          fill="none"
          stroke={SCENE.trailEdge}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path d="M700 196 C730 222 790 240 830 278" fill="none" stroke={SCENE.trailEdge} strokeWidth="2.5" strokeDasharray="3 14" strokeLinecap="round" opacity="0.6" />
      </svg>
      {/* near hills */}
      <svg {...svg} className={`${LAYER} px-3`}>
        <path d="M0 252 Q200 214 424 256 Q628 292 700 360 H0 Z" fill={SCENE.fern} />
        <path d="M1440 238 Q1240 222 1040 288 Q962 322 932 360 H1440 Z" fill={SCENE.fern} />
        <Tree x={520} y={310} h={92} fill={SCENE.pine} />
        <Tree x={566} y={330} h={64} fill={SCENE.pine} />
        <Tree x={36} y={300} h={110} fill={SCENE.pine} />
      </svg>
    </div>
  );
}

/** Wide, short hill band for the top edge of a page section. */
export function HillsDivider({ className = '', fill = SCENE.fern, back = SCENE.meadow }: { className?: string; fill?: string; back?: string }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M0 64 Q220 14 460 56 T920 46 T1440 62 V120 H0 Z" fill={back} />
      <path d="M0 96 Q260 52 560 92 T1100 84 T1440 98 V120 H0 Z" fill={fill} />
    </svg>
  );
}

/** Sun in the painted-bridge yellow. */
export function Sun({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g stroke="hsl(43 98% 54%)" strokeWidth="6" strokeLinecap="round" className="sun-rays">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI) / 6;
          return <line key={i} x1={60 + Math.cos(a) * 42} y1={60 + Math.sin(a) * 42} x2={60 + Math.cos(a) * 54} y2={60 + Math.sin(a) * 54} />;
        })}
      </g>
      <circle cx="60" cy="60" r="34" fill="hsl(43 98% 54%)" stroke="hsl(258 22% 10%)" strokeWidth="3.5" />
    </svg>
  );
}

export function Cloud({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 60" className={className} aria-hidden="true">
      <path d="M14 50 Q2 50 4 38 Q6 28 20 28 Q22 10 44 10 Q58 0 74 12 Q96 4 104 22 Q124 18 128 34 Q146 32 148 44 Q150 50 138 50 Z" fill="#fff" opacity="0.92" />
    </svg>
  );
}

/* ---------------------------------------------------------------------- */
/* Silhouettes                                                              */
/* ---------------------------------------------------------------------- */

/** Jennifer with a big dog on a leash. Ponytail and tail move on their own. */
export function WalkerAndDog({ className = '' }: { className?: string }) {
  const c = SCENE.charcoal;
  return (
    <svg viewBox="0 0 470 270" className={className} aria-hidden="true">
      <g fill={c}>
        <g className="ponytail">
          <path d="M96 36 Q66 30 60 62 Q58 84 74 100 Q70 74 92 58 Z" />
        </g>
        <ellipse cx="116" cy="46" rx="20" ry="23" />
        <path d="M94 40 Q96 14 120 14 Q142 14 142 38 L170 44 Q176 49 168 52 L94 52 Z" />
        <path d="M108 66 L126 66 L128 76 Q154 82 156 108 L154 150 Q150 166 144 178 L150 202 Q154 216 152 232 L146 262 L120 262 L118 244 L112 244 L108 262 L82 262 L88 232 Q84 214 88 200 L94 176 Q84 154 86 124 L86 104 Q88 82 102 76 Z" />
        <path d="M150 90 Q172 124 180 168 Q186 192 200 220 L190 226 Q166 200 158 172 Q148 142 140 112 Z" />
        <g transform="translate(172 90)">
          <g className="dog-tail-sil">
            <path d="M32 62 Q6 52 2 18 Q10 32 18 36 Q8 20 16 8 Q26 36 40 48 Z" />
          </g>
          <path d="M30 58 Q60 40 110 44 Q150 48 178 40 Q196 32 208 42 Q222 50 236 60 Q252 68 270 80 Q290 88 296 94 Q296 104 288 106 L266 106 Q248 114 230 110 L222 108 Q214 134 212 150 L210 166 Q222 170 224 172 L192 172 L194 144 Q170 136 150 136 Q130 134 116 130 L114 166 Q126 170 126 172 L92 172 L90 142 Q60 130 36 100 Q26 80 30 58 Z" />
          <path d="M176 140 L172 166 L186 172 L156 172 L160 140 Z" />
          <path d="M78 130 L72 166 L84 172 L56 172 L60 130 Z" />
          <path d="M228 56 Q212 66 216 92 Q226 98 238 86 Q244 70 234 56 Z" fill="hsl(0 0% 17%)" />
        </g>
      </g>
      <path d="M198 222 Q304 252 402 166" fill="none" stroke={c} strokeWidth="3" />
    </svg>
  );
}

/** The sprinting cat from the bottom corner of the flyer. Faces right. */
export function RunCat({ className = '' }: { className?: string }) {
  const c = SCENE.charcoal;
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden="true">
      <g fill="none" stroke={c} strokeLinecap="round" strokeLinejoin="round">
        <path d="M30 62 Q2 58 6 26 Q8 12 22 14" strokeWidth="7" />
        <path d="M34 66 Q76 46 128 62" strokeWidth="34" />
        <g className="cat-legs-a">
          <path d="M50 84 L20 106" strokeWidth="9" />
          <path d="M64 86 L40 112" strokeWidth="9" />
        </g>
        <g className="cat-legs-b">
          <path d="M118 80 L152 106" strokeWidth="9" />
          <path d="M130 74 L170 92" strokeWidth="9" />
        </g>
      </g>
      <g fill={c}>
        <circle cx="152" cy="52" r="20" />
        <path d="M138 40 L140 18 L156 34 Z" />
        <path d="M160 34 L172 18 L176 42 Z" />
      </g>
    </svg>
  );
}

/**
 * The black cat from the Visits sign: head and one paw over the edge. Its eyes
 * follow the pointer. Pupils are moved directly (no React re-render) so
 * tracking stays cheap.
 */
export function PeekCat({ className = '' }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);
  const left = useRef<SVGEllipseElement>(null);
  const right = useRef<SVGEllipseElement>(null);

  useEffect(() => {
    const svg = root.current;
    if (!svg) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      raf = 0;
      const r = svg.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2);
      const dy = py - (r.top + r.height * 0.5);
      const len = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, len / 160) * 4.6;
      const x = (dx / len) * k;
      const y = (dy / len) * k * 0.8;
      for (const el of [left.current, right.current]) {
        if (el) el.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
      }
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = window.requestAnimationFrame(apply);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  const c = SCENE.charcoal;
  return (
    <svg ref={root} viewBox="0 0 120 100" className={className} aria-hidden="true">
      <g fill={c}>
        <path d="M24 44 L22 8 L52 30 Z" />
        <path d="M96 44 L98 8 L68 30 Z" />
        <ellipse cx="60" cy="56" rx="40" ry="34" />
        <ellipse cx="22" cy="86" rx="14" ry="10" />
      </g>
      <path d="M28 38 L27 18 L42 30 Z M92 38 L93 18 L78 30 Z" fill="hsl(350 40% 48%)" opacity="0.55" />
      <g className="cat-blink">
        <ellipse cx="44" cy="52" rx="10" ry="10.5" fill="hsl(55 60% 90%)" />
        <ellipse cx="76" cy="52" rx="10" ry="10.5" fill="hsl(55 60% 90%)" />
        <ellipse ref={left} cx="44" cy="53" rx="4.6" ry="6.4" fill="hsl(0 0% 9%)" className="pupil" />
        <ellipse ref={right} cx="76" cy="53" rx="4.6" ry="6.4" fill="hsl(0 0% 9%)" className="pupil" />
      </g>
      <path d="M56 68 L64 68 L60 73 Z" fill="hsl(350 60% 72%)" />
      <path d="M30 70 L6 66 M30 76 L8 82 M90 70 L114 66 M90 76 L112 82" stroke="hsl(0 0% 85%)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 88 L12 94 M20 90 L20 96 M28 88 L28 94" stroke="hsl(0 0% 16%)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** Tuft of grass at the foot of the signpost. */
export function Tuft({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 50" className={className} aria-hidden="true">
      <path d="M4 50 Q6 24 22 22 L26 8 L40 24 L56 4 L68 24 L86 10 L96 26 L112 2 L124 26 L142 8 L152 26 L170 14 L178 28 Q196 30 196 50 Z" fill={SCENE.grass} />
    </svg>
  );
}
