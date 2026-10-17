import type { ServicePageKey } from '@/content/site';

const INK = 'hsl(258 22% 10%)';
const BRIDGE = 'hsl(43 98% 54%)';
const AMBER = 'hsl(38 95% 44%)';
const BUTTER = 'hsl(45 100% 93%)';
const RIVER = 'hsl(188 84% 24%)';
const TOMATO = 'hsl(7 78% 46%)';

export const DOG_COLORS = {
  tan: { body: 'hsl(27 62% 56%)', ear: 'hsl(21 52% 36%)' },
  cream: { body: 'hsl(40 70% 84%)', ear: 'hsl(30 45% 55%)' },
  night: { body: 'hsl(258 14% 30%)', ear: 'hsl(258 18% 16%)' },
  rust: { body: 'hsl(14 66% 50%)', ear: 'hsl(10 55% 30%)' },
} as const;
export type DogColor = keyof typeof DOG_COLORS;

export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="16" fill={BRIDGE} stroke={INK} strokeWidth="4" />
      <path d="M9 38 Q32 6 55 38" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M20 24 V39 M32 19 V39 M44 24 V39" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M6 40 H58" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      <ellipse cx="32" cy="51.5" rx="4.6" ry="3.8" fill={INK} />
      <circle cx="24.5" cy="48" r="2.1" fill={INK} />
      <circle cx="29" cy="45.4" r="2.1" fill={INK} />
      <circle cx="35" cy="45.4" r="2.1" fill={INK} />
      <circle cx="39.5" cy="48" r="2.1" fill={INK} />
    </svg>
  );
}

export function Paw({ className = 'h-5 w-5', fill = 'currentColor' }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill={fill}>
      <ellipse cx="16" cy="21" rx="7.5" ry="6.2" />
      <circle cx="6.5" cy="14" r="3.2" />
      <circle cx="12.5" cy="8.5" r="3.4" />
      <circle cx="19.5" cy="8.5" r="3.4" />
      <circle cx="25.5" cy="14" r="3.2" />
    </svg>
  );
}

/** Side-view dog, faces right. Legs swing when an ancestor has .walking */
export function WalkingDog({ className = '', color = 'tan' }: { className?: string; color?: DogColor }) {
  const c = DOG_COLORS[color];
  const s = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 130 86" className={className} aria-hidden="true">
      <g className="dog-bob">
        <g className="dog-tail">
          <path d="M20 36 C8 30 6 20 12 10" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
          <path d="M20 36 C8 30 6 20 12 10" fill="none" stroke={c.body} strokeWidth="4.5" strokeLinecap="round" />
        </g>
        <rect className="leg leg-b" x="34" y="50" width="11" height="28" rx="5.5" fill={c.ear} {...s} />
        <rect className="leg leg-a" x="76" y="50" width="11" height="28" rx="5.5" fill={c.ear} {...s} />
        <rect x="16" y="28" width="72" height="28" rx="14" fill={c.body} {...s} />
        <rect className="leg leg-a" x="22" y="50" width="11" height="28" rx="5.5" fill={c.body} {...s} />
        <rect className="leg leg-b" x="64" y="50" width="11" height="28" rx="5.5" fill={c.body} {...s} />
        <rect x="98" y="26" width="22" height="15" rx="7.5" fill={c.body} {...s} />
        <circle cx="92" cy="30" r="15" fill={c.body} {...s} />
        <path d="M80 36 L86 50" stroke={RIVER} strokeWidth="6" strokeLinecap="round" />
        <circle cx="118" cy="31" r="4" fill={INK} />
        <path d="M82 17 C70 21 72 41 83 42 C91 38 91 23 86 16 Z" fill={c.ear} {...s} />
        <circle cx="99" cy="26" r="2.6" fill={INK} />
      </g>
    </svg>
  );
}

export function SittingDog({ className = '', color = 'tan' }: { className?: string; color?: DogColor }) {
  const c = DOG_COLORS[color];
  const s = { stroke: INK, strokeWidth: 3.5, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <g className="dog-tail">
        <path d="M92 124 C112 124 116 104 108 94" fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round" />
        <path d="M92 124 C112 124 116 104 108 94" fill="none" stroke={c.body} strokeWidth="5" strokeLinecap="round" />
      </g>
      <path d="M26 128 C20 90 36 78 60 78 C84 78 100 90 94 128 Z" fill={c.body} {...s} />
      <ellipse cx="42" cy="130" rx="13" ry="7" fill={c.body} {...s} />
      <ellipse cx="78" cy="130" rx="13" ry="7" fill={c.body} {...s} />
      <path d="M44 90 Q60 104 76 90" fill="none" stroke={RIVER} strokeWidth="6" strokeLinecap="round" />
      <circle cx="60" cy="102" r="5.5" fill={BRIDGE} stroke={INK} strokeWidth="2.5" />
      <path d="M34 30 C12 34 12 72 30 76 C40 68 42 46 40 30 Z" fill={c.ear} {...s} />
      <path d="M86 30 C108 34 108 72 90 76 C80 68 78 46 80 30 Z" fill={c.ear} {...s} />
      <circle cx="60" cy="52" r="29" fill={c.body} {...s} />
      <ellipse cx="60" cy="64" rx="15" ry="12" fill={BUTTER} stroke={INK} strokeWidth="3" />
      <ellipse cx="60" cy="58" rx="6.5" ry="4.8" fill={INK} />
      <path d="M60 63 V68 M52 69 Q60 76 68 69" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M55 71 Q60 84 66 71 Z" fill={TOMATO} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <g className="blink">
        <circle cx="47" cy="45" r="4.4" fill={INK} />
        <circle cx="73" cy="45" r="4.4" fill={INK} />
        <circle cx="48.4" cy="43.6" r="1.4" fill="#fff" />
        <circle cx="74.4" cy="43.6" r="1.4" fill="#fff" />
      </g>
    </svg>
  );
}

export function SittingCat({ className = '' }: { className?: string }) {
  const body = 'hsl(258 14% 26%)';
  const s = { stroke: INK, strokeWidth: 3.5, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <g className="cat-tail">
        <path d="M88 128 C118 130 120 96 104 84" fill="none" stroke={INK} strokeWidth="12" strokeLinecap="round" />
        <path d="M88 128 C118 130 120 96 104 84" fill="none" stroke={body} strokeWidth="6" strokeLinecap="round" />
      </g>
      <path d="M28 130 C20 92 36 72 60 72 C84 72 100 92 92 130 Z" fill={body} {...s} />
      <ellipse cx="44" cy="131" rx="12" ry="6.5" fill={body} {...s} />
      <ellipse cx="76" cy="131" rx="12" ry="6.5" fill={body} {...s} />
      <path d="M44 100 Q60 90 76 100" fill="none" stroke="hsl(258 14% 40%)" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 40 L30 8 L54 26 Z" fill={body} {...s} />
      <path d="M88 40 L90 8 L66 26 Z" fill={body} {...s} />
      <path d="M35 30 L35 17 L45 25 Z" fill={TOMATO} />
      <path d="M85 30 L85 17 L75 25 Z" fill={TOMATO} />
      <ellipse cx="60" cy="50" rx="31" ry="26" fill={body} {...s} />
      <g className="blink">
        <ellipse cx="48" cy="48" rx="7" ry="7.5" fill={BRIDGE} stroke={INK} strokeWidth="2.5" />
        <ellipse cx="72" cy="48" rx="7" ry="7.5" fill={BRIDGE} stroke={INK} strokeWidth="2.5" />
        <ellipse cx="48" cy="48" rx="2" ry="6" fill={INK} />
        <ellipse cx="72" cy="48" rx="2" ry="6" fill={INK} />
      </g>
      <path d="M56 58 L64 58 L60 63 Z" fill={TOMATO} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M60 63 Q54 69 48 65 M60 63 Q66 69 72 65" fill="none" stroke={BUTTER} strokeWidth="2" strokeLinecap="round" />
      <path d="M36 58 L16 54 M36 63 L16 66 M84 58 L104 54 M84 63 L104 66" stroke={BUTTER} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Rake({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <path d="M78 6 L36 112" stroke={INK} strokeWidth="14" strokeLinecap="round" />
      <path d="M78 6 L36 112" stroke="hsl(30 60% 55%)" strokeWidth="7" strokeLinecap="round" />
      <path d="M14 112 L66 126 L58 134 L10 122 Z" fill={BRIDGE} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M16 122 L18 138 M26 124 L28 140 M36 127 L38 142 M46 129 L48 143 M56 131 L57 144" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M92 108 q10 -18 24 -8 q-6 20 -24 8 Z" fill={TOMATO} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <path d="M84 126 q8 -14 20 -6 q-4 16 -20 6 Z" fill={AMBER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

export function House({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 140" className={className} aria-hidden="true">
      <path d="M12 66 L80 12 L148 66" fill={TOMATO} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      <rect x="26" y="62" width="108" height="72" fill={BUTTER} stroke={INK} strokeWidth="4" />
      <rect x="104" y="20" width="14" height="30" fill={AMBER} stroke={INK} strokeWidth="4" />
      <rect x="36" y="76" width="30" height="26" rx="3" fill={RIVER} stroke={INK} strokeWidth="3.5" />
      <path d="M51 76 V102 M36 89 H66" stroke={INK} strokeWidth="2.5" />
      <path d="M92 134 V92 Q92 80 104 80 Q116 80 116 92 V134 Z" fill={BRIDGE} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
      <circle cx="110" cy="108" r="2.6" fill={INK} />
    </svg>
  );
}

export function Key({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      <circle cx="48" cy="48" r="34" fill={BRIDGE} stroke={INK} strokeWidth="5" />
      <circle cx="48" cy="48" r="13" fill={RIVER} stroke={INK} strokeWidth="5" />
      <path d="M72 72 L142 142" stroke={INK} strokeWidth="26" strokeLinecap="round" />
      <path d="M72 72 L142 142" stroke={BRIDGE} strokeWidth="14" strokeLinecap="round" />
      <path d="M112 112 L126 98 M126 126 L140 112" stroke={INK} strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}

/** Wide panorama: yellow bridge over three rivers, steep hills with row houses, an incline. */
export function HeroScene({ className = '' }: { className?: string }) {
  const towerL = 560;
  const towerR = 920;
  const topY = 96;
  const deckY = 258;
  const hangers: { x: number; y: number }[] = [];
  for (let i = 1; i < 12; i += 1) {
    const t = i / 12;
    const x = towerL + (towerR - towerL) * t;
    const y = (1 - t) * (1 - t) * topY + 2 * (1 - t) * t * 226 + t * t * topY;
    hangers.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 });
  }
  const sideL = [0.25, 0.5, 0.75].map((t) => ({
    x: Math.round((280 + (towerL - 280) * t) * 10) / 10,
    y: Math.round((deckY + (topY - deckY) * t * t * 0.95) * 10) / 10,
  }));
  const sideR = [0.25, 0.5, 0.75].map((t) => ({
    x: Math.round((towerR + (1200 - towerR) * t) * 10) / 10,
    y: Math.round((topY + (deckY - topY) * (1 - (1 - t) * (1 - t))) * 10) / 10,
  }));
  const houseColors = [BUTTER, TOMATO, RIVER, BRIDGE, 'hsl(14 40% 70%)'];
  const houses: { x: number; y: number; w: number; h: number; c: string }[] = [];
  for (let row = 0; row < 4; row += 1) {
    for (let k = 0; k < 6 - row; k += 1) {
      houses.push({ x: 20 + k * 40 + row * 18, y: 236 - row * 36, w: 34, h: 28 + (k % 2) * 6, c: houseColors[(row * 2 + k) % 5] });
    }
  }
  return (
    <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <g className="cloud" fill={BUTTER} stroke={INK} strokeWidth="3">
        <path d="M120 70 q10 -26 40 -18 q18 -22 46 -4 q26 -2 26 22 H110 q-10 0 10 0 Z" />
      </g>
      <g className="cloud cloud-2" fill={BUTTER} stroke={INK} strokeWidth="3">
        <path d="M1040 48 q10 -24 38 -16 q20 -20 44 -2 q26 0 26 20 H1030 q-8 -2 10 -2 Z" />
      </g>
      {/* back hills */}
      <path d="M0 200 Q180 120 360 190 T720 210 T1080 170 T1440 200 V360 H0 Z" fill={AMBER} stroke={INK} strokeWidth="3.5" />
      {/* left hill with row houses */}
      <path d="M0 120 L300 330 V360 H0 Z" fill={RIVER} stroke={INK} strokeWidth="3.5" />
      <g transform="translate(0,56)">
        {houses.map((h) => (
          <g key={`${h.x}-${h.y}`}>
            <rect x={h.x} y={h.y - h.h + 40} width={h.w} height={h.h} fill={h.c} stroke={INK} strokeWidth="2.5" />
            <path d={`M${h.x - 3} ${h.y - h.h + 40} L${h.x + h.w / 2} ${h.y - h.h + 28} L${h.x + h.w + 3} ${h.y - h.h + 40} Z`} fill={INK} />
            <rect x={h.x + 8} y={h.y - h.h + 48} width="7" height="8" fill={INK} opacity="0.75" />
            <rect x={h.x + 20} y={h.y - h.h + 48} width="7" height="8" fill={INK} opacity="0.75" />
          </g>
        ))}
      </g>
      {/* right hill + incline */}
      <path d="M1440 90 L1180 300 V360 H1440 Z" fill={RIVER} stroke={INK} strokeWidth="3.5" />
      <path d="M1210 292 L1400 138" stroke={INK} strokeWidth="5" />
      <path d="M1232 300 L1420 148" stroke={INK} strokeWidth="5" />
      <g transform="translate(1214 262)">
        <g className="incline-car" style={{ transform: 'translate(0,0)' }}>
          <g transform="rotate(-39)">
            <rect x="0" y="0" width="44" height="26" rx="5" fill={TOMATO} stroke={INK} strokeWidth="3" />
            <rect x="6" y="5" width="9" height="9" fill={BUTTER} stroke={INK} strokeWidth="2" />
            <rect x="19" y="5" width="9" height="9" fill={BUTTER} stroke={INK} strokeWidth="2" />
            <rect x="32" y="5" width="7" height="9" fill={BUTTER} stroke={INK} strokeWidth="2" />
          </g>
        </g>
      </g>
      {/* river */}
      <rect x="0" y="296" width="1440" height="64" fill={RIVER} stroke={INK} strokeWidth="3.5" />
      <path d="M40 322 q20 -10 40 0 t40 0 M360 336 q20 -10 40 0 t40 0 M700 324 q20 -10 40 0 t40 0 M1000 338 q20 -10 40 0 t40 0" fill="none" stroke={BUTTER} strokeWidth="3" strokeLinecap="round" />
      {/* piers */}
      <rect x={towerL - 10} y={deckY} width="42" height="46" fill={AMBER} stroke={INK} strokeWidth="3.5" />
      <rect x={towerR - 10} y={deckY} width="42" height="46" fill={AMBER} stroke={INK} strokeWidth="3.5" />
      {/* cables */}
      <path d={`M280 ${deckY} Q${towerL - 120} ${topY + 20} ${towerL + 11} ${topY}`} fill="none" stroke={INK} strokeWidth="4" />
      <path d={`M${towerL + 11} ${topY} Q${(towerL + towerR) / 2 + 11} 226 ${towerR + 11} ${topY}`} fill="none" stroke={INK} strokeWidth="4" />
      <path d={`M${towerR + 11} ${topY} Q${towerR + 130} ${topY + 20} 1200 ${deckY}`} fill="none" stroke={INK} strokeWidth="4" />
      <g stroke={INK} strokeWidth="2.5">
        {hangers.map((p) => (
          <line key={p.x} x1={p.x + 11} y1={p.y} x2={p.x + 11} y2={deckY} />
        ))}
        {sideL.map((p) => (
          <line key={`l${p.x}`} x1={p.x} y1={p.y} x2={p.x} y2={deckY} />
        ))}
        {sideR.map((p) => (
          <line key={`r${p.x}`} x1={p.x} y1={p.y} x2={p.x} y2={deckY} />
        ))}
      </g>
      {/* towers */}
      {[towerL, towerR].map((x) => (
        <g key={x}>
          <rect x={x} y={topY - 6} width="22" height={deckY - topY + 8} fill={BRIDGE} stroke={INK} strokeWidth="4" />
          <rect x={x - 6} y={topY + 34} width="34" height="10" fill={BRIDGE} stroke={INK} strokeWidth="3" />
          <rect x={x - 6} y={topY + 84} width="34" height="10" fill={BRIDGE} stroke={INK} strokeWidth="3" />
        </g>
      ))}
      {/* deck */}
      <rect x="250" y={deckY - 6} width="980" height="16" rx="3" fill={BRIDGE} stroke={INK} strokeWidth="4" />
      <g transform={`translate(${towerL - 20} ${deckY - 52})`}>
        <svg width="64" height="44" viewBox="0 0 130 86" className="walking">
          <g className="deck-dog">
            <WalkingDogInline />
          </g>
        </svg>
      </g>
    </svg>
  );
}

/** Inline dog shapes for use inside another svg (nested svg avoids a second root). */
function WalkingDogInline() {
  const c = DOG_COLORS.tan;
  const s = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const };
  return (
    <g>
      <path d="M20 36 C8 30 6 20 12 10" fill="none" stroke={INK} strokeWidth="10" strokeLinecap="round" />
      <path d="M20 36 C8 30 6 20 12 10" fill="none" stroke={c.body} strokeWidth="4.5" strokeLinecap="round" />
      <rect className="leg leg-b" x="34" y="50" width="11" height="28" rx="5.5" fill={c.ear} {...s} />
      <rect className="leg leg-a" x="76" y="50" width="11" height="28" rx="5.5" fill={c.ear} {...s} />
      <rect x="16" y="28" width="72" height="28" rx="14" fill={c.body} {...s} />
      <rect className="leg leg-a" x="22" y="50" width="11" height="28" rx="5.5" fill={c.body} {...s} />
      <rect className="leg leg-b" x="64" y="50" width="11" height="28" rx="5.5" fill={c.body} {...s} />
      <rect x="98" y="26" width="22" height="15" rx="7.5" fill={c.body} {...s} />
      <circle cx="92" cy="30" r="15" fill={c.body} {...s} />
      <circle cx="118" cy="31" r="4" fill={INK} />
      <path d="M82 17 C70 21 72 41 83 42 C91 38 91 23 86 16 Z" fill={c.ear} {...s} />
      <circle cx="99" cy="26" r="2.6" fill={INK} />
    </g>
  );
}

export function Hills({ className = '', fill = RIVER }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 1440 140" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M0 80 L180 20 L330 90 L520 30 L720 100 L930 24 L1130 96 L1300 40 L1440 84 V140 H0 Z" fill={fill} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  );
}

export function ServiceArt({ k, className = '' }: { k: ServicePageKey; className?: string }) {
  switch (k) {
    case 'dogWalking':
      return <WalkingDog className={className} color="tan" />;
    case 'packWalks':
      return (
        <div className={`flex items-end ${className}`}>
          <WalkingDog className="w-1/3 -mr-3" color="night" />
          <WalkingDog className="w-1/3 -mr-3 mb-3" color="cream" />
          <WalkingDog className="w-1/3 mb-1" color="rust" />
        </div>
      );
    case 'boarding':
      return (
        <div className={`relative ${className}`}>
          <House className="w-full" />
          <SittingDog className="absolute -bottom-1 -right-3 w-[38%]" color="cream" />
        </div>
      );
    case 'catSitting':
      return <SittingCat className={className} />;
    case 'yardCleanup':
      return (
        <div className={`flex items-end ${className}`}>
          <Rake className="w-1/2" />
          <SittingDog className="w-1/2 -ml-4" color="rust" />
        </div>
      );
  }
}
