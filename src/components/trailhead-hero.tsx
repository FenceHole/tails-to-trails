import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { CallButton, TextButton } from '@/components/cta-buttons';
import { Cloud, Landscape, RunCat, Sun, WalkerAndDog } from '@/components/scene-art';
import { Signpost } from '@/components/signpost';
import { usePointerParallax } from '@/hooks/use-pointer-parallax';
import { BUSINESS, PAGES, PRICING, formatPrice } from '@/content/site';

/**
 * The home hero: Jennifer's flyer as a living scene. Hills drift with the
 * pointer, the signs swing, the dog and the cat answer a tap.
 */
export function TrailheadHero() {
  const scene = usePointerParallax<HTMLElement>();
  const [woof, setWoof] = useState(0);
  const [hop, setHop] = useState(false);
  const [dash, setDash] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const t = timers.current;
    return () => t.forEach((id) => window.clearTimeout(id));
  }, []);

  const pet = () => {
    setWoof((n) => n + 1);
    setHop(true);
    timers.current.push(
      window.setTimeout(() => setHop(false), 1500),
    );
  };

  const sprint = () => {
    if (dash) return;
    setDash(true);
    timers.current.push(window.setTimeout(() => setDash(false), 1950));
  };

  return (
    <section
      ref={scene}
      className="hero relative overflow-hidden border-b-[2.5px] border-ink bg-mint"
      data-testid="section-hero"
    >
      {/* sky */}
      <div className="px-sun pointer-events-none absolute right-3 top-[8.2rem] z-0 w-20 sm:right-[4%] sm:top-[9.5rem] sm:w-28 lg:right-[2%] lg:top-6 lg:w-36" aria-hidden="true">
        <Sun className="w-full" />
      </div>
      <div className="px-cloud pointer-events-none absolute left-[4%] top-[30%] z-0 w-28 sm:w-40 lg:left-[44%] lg:top-[8%]" aria-hidden="true">
        <Cloud className="cloud w-full" />
      </div>
      <div className="px-cloud pointer-events-none absolute right-[30%] top-[52%] z-0 hidden w-28 sm:block lg:right-[26%] lg:top-[20%]" aria-hidden="true">
        <Cloud className="cloud cloud-2 w-full" />
      </div>

      {/* hills, trail and trees */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[15rem] sm:h-[18rem] lg:h-[25rem]">
        <Landscape />
      </div>

      <div className="wrap relative z-10 grid gap-8 pb-28 pt-7 sm:pb-32 md:pt-10 lg:grid-cols-12 lg:items-start lg:gap-6 lg:pb-24">
        <div className="lg:col-span-7 lg:pb-32">
          <p className="font-script text-[2.35rem] leading-[0.95] text-plum sm:text-6xl lg:text-[3.7rem] xl:text-[4.5rem]" data-testid="text-wordmark">
            {BUSINESS.legalName}
          </p>
          <p className="mt-1 font-script text-xl leading-tight text-plum/90 sm:text-3xl">{BUSINESS.descriptor}</p>

          <h1
            className="mt-5 text-[1.85rem] leading-[1] sm:text-4xl md:text-5xl xl:text-[3.3rem]"
            data-testid="text-h1"
          >
            Dog Walking <span className="whitespace-nowrap">&amp; Pet Sitting</span> in{' '}
            <span className="relative inline-block -rotate-2 rounded-xl bg-ink px-2.5 pb-0.5 text-bridge shadow-[4px_4px_0_hsl(var(--plum))]">
              Pittsburgh
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-lg font-medium leading-snug md:text-xl">
            Your dog is staring at the door. Jennifer walks, sits, boards and redds up yards around Pittsburgh, with a
            free meet &amp; greet first and flat prices from {formatPrice(PRICING.soloWalk.price)}.
          </p>
          <p className="mt-5 font-script text-3xl leading-none text-plum sm:text-4xl">For a free meet and greet</p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CallButton variant="ink" className="w-full sm:w-auto" testId="button-call-hero" />
            <TextButton variant="paper" label="Text Jennifer" className="w-full sm:w-auto" testId="button-text-hero" />
          </div>
          <p className="mt-4 text-sm font-bold">
            <Link href={PAGES.prices.path} className="inline-flex min-h-11 items-center underline decoration-2 underline-offset-4 hover:no-underline" data-testid="link-hero-prices">
              See every price
            </Link>
          </p>
        </div>

        <div className="lg:col-span-5">
          <Signpost />
        </div>
      </div>

      {/* Jennifer and her dog */}
      <div className="absolute bottom-3 left-1 z-20 sm:bottom-5 sm:left-[2%] lg:bottom-6 lg:left-[1%]">
        <button
          type="button"
          onClick={pet}
          aria-label="Say hi to Jennifer's dog"
          className={`${hop ? 'hop happy' : ''} block cursor-pointer`}
          data-testid="button-pet-dog"
        >
          <WalkerAndDog className="h-[5.2rem] w-auto sm:h-28 lg:h-[9.5rem]" />
        </button>
        {woof > 0 ? (
          <span
            key={woof}
            role="status"
            className="bubble absolute -top-6 left-[55%] whitespace-nowrap rounded-xl border-[2.5px] border-ink bg-butter px-3 py-0.5 font-script text-2xl leading-tight text-ink"
          >
            Woof!
          </span>
        ) : null}
      </div>

      {/* the running cat */}
      <div className="absolute bottom-2 right-2 z-20 sm:bottom-4 sm:right-[3%] lg:bottom-5">
        <button
          type="button"
          onClick={sprint}
          aria-label="Make the cat run"
          className={`${dash ? 'cat-dash running' : ''} block cursor-pointer`}
          data-testid="button-run-cat"
        >
          <RunCat className="h-12 w-auto sm:h-16 lg:h-[4.5rem]" />
        </button>
      </div>
    </section>
  );
}
