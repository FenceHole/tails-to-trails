import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { WalkingDog } from '@/components/art';
import { HillsDivider, SCENE } from '@/components/scene-art';
import { PAGES } from '@/content/site';

type Phase = 'idle' | 'flying' | 'running' | 'returning';

const HOME = 8;
const RUN_MS_PER_PCT = 22;

/**
 * "Throw the ball": tap the meadow (or press the button) and the dog runs
 * to it and brings it back. It is a toy, but it gives the page a reason to
 * be played with and ends with a nudge toward the free meet & greet.
 */
export function FetchMeadow() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [dogX, setDogX] = useState(HOME);
  const [faceLeft, setFaceLeft] = useState(false);
  const [ballX, setBallX] = useState(HOME + 9);
  const [carried, setCarried] = useState(false);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('');
  const [runMs, setRunMs] = useState(900);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const throwBall = (pct: number) => {
    if (phase !== 'idle') return;
    const target = Math.max(34, Math.min(90, pct));
    setStatus('Ball thrown. Here he goes.');
    setCarried(false);
    setFaceLeft(false);
    setPhase('flying');
    setBallX(target);
    later(() => {
      setPhase('running');
      const dist = Math.abs(target - 6 - dogX);
      const run = Math.max(500, dist * RUN_MS_PER_PCT);
      setRunMs(run);
      setDogX(target - 6);
      later(() => {
        setCarried(true);
        setFaceLeft(true);
        setPhase('returning');
        setDogX(HOME);
        setBallX(HOME - 2);
        later(() => {
          setFaceLeft(false);
          setCarried(false);
          setBallX(HOME + 9);
          setCount((n) => n + 1);
          setPhase('idle');
          setStatus('Fetched! Throw it again.');
        }, run);
      }, run);
    }, 700);
  };

  const onField = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    throwBall(((e.clientX - r.left) / r.width) * 100);
  };

  const moving = phase === 'running' || phase === 'returning';

  return (
    <section className="relative overflow-hidden border-y-[2.5px] border-ink bg-mint" data-testid="section-fetch">
      <div className="wrap relative z-10 pt-14 md:pt-20">
        <div className="max-w-2xl">
          <p className="font-script text-3xl leading-none text-plum md:text-4xl">Go on, give it a throw</p>
          <h2 className="mt-2 text-4xl md:text-6xl">Every dog on this trail loves fetch</h2>
          <p className="mt-3 max-w-xl text-lg text-foreground/80">
            Tap the meadow to throw the ball. Jennifer&apos;s dogs get plenty of this on real walks.
          </p>
          <button
            type="button"
            onClick={() => throwBall(40 + Math.random() * 48)}
            disabled={phase !== 'idle'}
            className="btn btn-ink mt-5 disabled:cursor-wait disabled:opacity-70"
            data-testid="button-throw-ball"
          >
            Throw the ball
          </button>
          <span className="ml-4 inline-flex items-center rounded-full border-[2.5px] border-ink bg-bridge px-3 py-1 font-display font-extrabold" data-testid="text-fetch-count">
            Fetches: {count}
          </span>
        </div>
      </div>

      <div
        onClick={onField}
        className="meadow-field relative mt-6 h-56 sm:h-64"
        data-testid="meadow-field"
      >
        <HillsDivider className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full" fill={SCENE.fern} back={SCENE.meadow} />
        <div
          className={`pointer-events-none absolute bottom-6 w-28 sm:w-36 ${moving ? 'walking' : ''}`}
          style={{
            left: `${dogX}%`,
            transition: moving ? `left ${runMs}ms linear` : 'none',
          }}
        >
          <div style={{ transform: faceLeft ? 'scaleX(-1)' : undefined }}>
            <WalkingDog className="w-full" color="tan" />
          </div>
        </div>
        <div
          className="pointer-events-none absolute bottom-7"
          style={{
            left: `${ballX}%`,
            transition:
              phase === 'flying'
                ? 'left 0.7s ease-out'
                : phase === 'returning'
                  ? `left ${runMs}ms linear`
                  : 'none',
            marginBottom: carried ? '2.5rem' : undefined,
          }}
        >
          <span
            className={`${phase === 'flying' ? 'ball-arc' : ''} block h-5 w-5 rounded-full border-[2.5px] border-ink bg-bridge`}
            aria-hidden="true"
          />
        </div>
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>

      {count >= 3 ? (
        <div className="relative z-10 bg-fern pb-8 pt-2 text-center">
          <Link
            href={PAGES.meetGreet.path}
            className="btn btn-bridge pop-in"
            data-testid="link-fetch-cta"
          >
            Good dog. Book a free meet &amp; greet <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </section>
  );
}
