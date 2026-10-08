import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import {
  HeroScene,
  House,
  Key,
  Paw,
  Rake,
  SittingCat,
  SittingDog,
  WalkingDog,
} from '@/components/art';
import { CallButton, TextButton } from '@/components/cta-buttons';
import { FaqList } from '@/components/faq-list';
import { PlanBuilder } from '@/components/plan-builder';
import { Reveal } from '@/components/reveal';
import { SampleUpdate } from '@/components/sample-update';
import { TrailWrap } from '@/components/trail';
import { HOME_FAQS } from '@/content/faqs';
import {
  ABOUT,
  BUSINESS,
  PAGES,
  PRICING,
  PROMISES,
  TRUST_POINTS,
  formatPrice,
  type PriceKey,
} from '@/content/site';

const BOARD: PriceKey[] = ['soloWalk', 'packWalk', 'dogBoarding', 'catBoarding', 'catVisit', 'yardCleanup'];

const SLANG = [
  {
    word: 'Yinz',
    say: 'Yinz heading out of town? Dog boarding at Jennifer’s is a real home, not a kennel.',
    to: PAGES.boarding,
    tilt: '-rotate-2',
    tone: 'bg-bridge',
  },
  {
    word: 'Nebby',
    say: 'Got a nebby dog who supervises the whole street from the front window? That dog needs a walk.',
    to: PAGES.dogWalking,
    tilt: 'rotate-1',
    tone: 'bg-butter',
  },
  {
    word: 'Redd up',
    say: 'Yinz redd up the house. Jennifer handles the yard, so the messy part is done before company shows up.',
    to: PAGES.yardCleanup,
    tilt: '-rotate-1',
    tone: 'bg-butter',
  },
  {
    word: 'N’at',
    say: 'Walks, treats, photo updates n’at. Your cat gets fed and played with too.',
    to: PAGES.catSitting,
    tilt: 'rotate-2',
    tone: 'bg-bridge',
  },
];

export default function Home() {
  return (
    <TrailWrap>
      {/* 1. HERO */}
      <section className="hero relative overflow-hidden bg-bridge" data-testid="section-hero">
        <div className="wrap relative z-10 grid gap-6 pt-7 md:pt-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h1 className="text-[2.6rem] leading-[0.95] sm:text-6xl md:text-7xl xl:text-[5.4rem]" data-testid="text-h1">
              Dog Walking <span className="whitespace-nowrap">&amp; Pet Sitting</span> in{' '}
              <span className="relative inline-block -rotate-2 rounded-xl bg-ink px-3 pb-1 text-bridge shadow-[5px_5px_0_hsl(var(--river))]">
                Pittsburgh
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg font-medium leading-snug md:text-xl">
              Your dog is staring at the door. Jennifer walks, sits, boards and redds up yards around Pittsburgh, with
              a free meet &amp; greet first and flat prices from {formatPrice(PRICING.soloWalk.price)}.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CallButton variant="ink" className="w-full sm:w-auto" testId="button-call-hero" />
              <TextButton variant="paper" label="Text Jennifer" className="w-full sm:w-auto" testId="button-text-hero" />
            </div>
          </div>
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="wobble absolute right-4 top-2 z-10 flex h-36 w-36 items-center justify-center rounded-full border-[3px] border-ink bg-butter p-4 text-center font-display text-xl font-extrabold leading-tight shadow-[5px_5px_0_hsl(var(--ink))]">
              Free meet &amp; greet
            </div>
            <SittingDog className="absolute -bottom-2 left-6 z-10 h-[21rem] w-auto" color="tan" />
            <SittingCat className="absolute -bottom-2 right-0 z-10 h-44 w-auto" />
          </div>
        </div>
        <div className="relative mt-4 h-[11rem] sm:h-[14rem] lg:-mt-24 lg:h-[19rem]">
          <HeroScene className="absolute inset-0 h-full w-full" />
          <SittingDog className="absolute bottom-[3.2rem] right-3 h-24 w-auto sm:h-32 lg:hidden" color="tan" />
        </div>
      </section>

      {/* 2. TICKER */}
      <section aria-label="Why people trust Tails to Trails" className="on-dark overflow-hidden border-y-[2.5px] border-ink bg-ink py-3.5 text-butter">
        <div className="marquee-track">
          {[0, 1].map((n) => (
            <ul key={n} className={`flex shrink-0 items-center ${n === 1 ? 'marquee-dup' : ''}`} aria-hidden={n === 1 ? true : undefined}>
              {TRUST_POINTS.map((t) => (
                <li key={t} className="flex items-center gap-5 pr-5 font-display text-xl font-extrabold">
                  <span>{t}</span>
                  <Paw className="h-5 w-5 text-bridge" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* 3. SERVICES BENTO */}
      <section className="section" data-testid="section-services">
        <div className="wrap">
          <Reveal variant="wipe">
            <h2 className="max-w-3xl text-4xl md:text-6xl">
              Dog walker, pet sitter and yard crew, all one phone call
            </h2>
          </Reveal>
          <p className="mt-4 max-w-2xl text-lg text-foreground/80">
            Looking for a dog walker in Pittsburgh, a cat sitter, or dog boarding that isn&apos;t a kennel?
            Pick the page that fits. Each one has the details, the price and what the first visit looks like.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            <Reveal variant="left" className="lg:col-span-7">
              <Link href={PAGES.dogWalking.path} className="group relative flex h-full gap-4 min-h-[18rem] flex-col justify-between overflow-hidden rounded-3xl border-[2.5px] border-ink bg-bridge p-6 transition-transform hover:-rotate-1 md:p-8" data-testid="tile-dogWalking">
                <div className="max-w-sm">
                  <h3 className="text-3xl md:text-4xl">Dog walking</h3>
                  <p className="mt-2 text-foreground/85">30 minutes, just your dog and Jennifer. Early mornings, evenings and weekends work.</p>
                </div>
                <div className="flex items-end justify-between gap-3">
                  <p className="whitespace-nowrap font-display text-5xl font-extrabold">
                    {formatPrice(PRICING.soloWalk.price)}
                    <span className="ml-1 text-lg font-bold">per walk</span>
                  </p>
                  <span className="flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-full bg-ink font-bold text-bridge sm:px-4">
                    <span className="hidden sm:inline">See dog walking</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
                <WalkingDog className="pointer-events-none order-first -mb-2 w-36 self-end transition-transform duration-500 group-hover:translate-x-4 sm:absolute sm:-top-2 sm:right-2 sm:order-none sm:mb-0 sm:w-48 md:w-64" color="tan" />
              </Link>
            </Reveal>

            <Reveal variant="right" delay={100} className="lg:col-span-5">
              <Link href={PAGES.packWalks.path} className="group relative flex h-full gap-4 min-h-[18rem] flex-col justify-between overflow-hidden rounded-3xl border-[2.5px] border-ink bg-river p-6 text-butter transition-transform hover:rotate-1 md:p-8" data-testid="tile-packWalks">
                <div>
                  <h3 className="text-3xl md:text-4xl">Pack walks</h3>
                  <p className="mt-2 max-w-[16rem] text-butter/90">A 60-minute group walk for socializing and burning off the zoomies.</p>
                </div>
                <div className="flex items-end justify-between gap-2">
                  <p className="whitespace-nowrap font-display text-4xl font-extrabold text-bridge sm:text-5xl">
                    {formatPrice(PRICING.packWalk.price)}
                    <span className="ml-1 text-lg font-bold text-butter">per walk</span>
                  </p>
                  <div className="pointer-events-none -mb-2 -mr-3 flex w-28 shrink-0 items-end sm:w-44">
                    <WalkingDog className="-mr-4 w-1/2" color="night" />
                    <WalkingDog className="w-1/2" color="cream" />
                  </div>
                </div>
                <span className="sr-only">See pack walks</span>
              </Link>
            </Reveal>

            <Reveal variant="pop" className="lg:col-span-5">
              <Link href={PAGES.boarding.path} className="group relative flex h-full gap-4 min-h-[17rem] flex-col justify-between overflow-hidden rounded-3xl border-[2.5px] border-ink bg-card p-6 transition-transform hover:-rotate-1 md:p-8" data-testid="tile-boarding">
                <div className="max-w-[14rem]">
                  <h3 className="text-3xl md:text-4xl">Dog boarding</h3>
                  <p className="mt-2 text-foreground/85">Overnight in a real home, not a kennel. Cats board too.</p>
                </div>
                <p className="font-display text-4xl font-extrabold leading-none">
                  <span className="whitespace-nowrap">
                    {formatPrice(PRICING.dogBoarding.price)} <span className="text-base font-bold">dogs</span>
                  </span>{' '}
                  <span className="whitespace-nowrap">
                    {formatPrice(PRICING.catBoarding.price)} <span className="text-base font-bold">cats</span>
                  </span>
                  <span className="mt-1.5 block text-base font-bold">per night</span>
                </p>
                <House className="pointer-events-none order-first -mb-2 w-24 self-end transition-transform group-hover:-translate-y-2 sm:absolute sm:right-3 sm:top-4 sm:order-none sm:mb-0 sm:w-32 md:w-40" />
                <span className="sr-only">See dog boarding and sitting</span>
              </Link>
            </Reveal>

            <Reveal variant="pop" delay={100} className="lg:col-span-4">
              <Link href={PAGES.catSitting.path} className="group relative flex h-full gap-4 min-h-[17rem] flex-col justify-between overflow-hidden rounded-3xl border-[2.5px] border-ink bg-ink p-6 text-butter transition-transform hover:rotate-1" data-testid="tile-catSitting">
                <div className="max-w-[10rem]">
                  <h3 className="text-3xl">Cat sitting</h3>
                  <p className="mt-2 text-butter/85">Visits at home, so your cat stays on their turf.</p>
                </div>
                <p className="font-display text-4xl font-extrabold text-bridge">
                  {formatPrice(PRICING.catVisit.price)} <span className="text-base font-bold text-butter">per visit</span>
                </p>
                <SittingCat className="pointer-events-none absolute -right-1 top-3 w-28 transition-transform group-hover:scale-110" />
                <span className="sr-only">See cat sitting</span>
              </Link>
            </Reveal>

            <Reveal variant="right" delay={200} className="lg:col-span-3">
              <Link href={PAGES.yardCleanup.path} className="group relative flex h-full gap-4 min-h-[17rem] flex-col justify-between overflow-hidden rounded-3xl border-[2.5px] border-ink bg-tomato p-6 text-white transition-transform hover:-rotate-2" data-testid="tile-yardCleanup">
                <div>
                  <h3 className="text-3xl">Yard clean up</h3>
                  <p className="mt-2 max-w-[11rem] text-white/95">Jennifer does the messy part.</p>
                </div>
                <div className="flex items-end justify-between gap-2">
                  <p className="font-display text-4xl font-extrabold leading-none">
                    {formatPrice(PRICING.yardCleanup.price)}
                    <span className="mt-1 block text-base font-bold">per visit</span>
                  </p>
                  <Rake className="pointer-events-none -mb-2 -mr-3 w-20 shrink-0 rotate-6 transition-transform group-hover:rotate-12" />
                </div>
                <span className="sr-only">See yard clean up</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. PRICE BOARD */}
      <section className="on-dark section bg-ink text-butter" data-trail-cross data-testid="section-prices">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal variant="wipe">
              <h2 className="text-4xl text-bridge md:text-6xl">Pittsburgh dog walking prices, posted</h2>
            </Reveal>
            <p className="mt-5 max-w-md text-lg text-butter/85">
              No quote form, no &ldquo;contact us for pricing.&rdquo; These are Jennifer&apos;s prices. The first
              hello, the meet &amp; greet, is free.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TextButton variant="bridge" label="Text to book a meet & greet" testId="button-text-prices" />
            </div>
          </div>
          <Reveal variant="pop" className="lg:col-span-7">
            <ul className="rounded-3xl border-[3px] border-bridge bg-ink p-2 shadow-[8px_8px_0_hsl(var(--river))]">
              {BOARD.map((k) => {
                const it = PRICING[k];
                return (
                  <li key={k} className="border-b-2 border-dashed border-butter/25 last:border-b-0">
                    <Link
                      href={PAGES[it.page].path}
                      className="group flex min-h-16 items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-bridge hover:text-ink"
                      data-testid={`row-price-${k}`}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-xl font-extrabold leading-tight">{it.name}</span>
                        <span className="block text-sm opacity-80">{it.detail}</span>
                      </span>
                      <span className="hidden h-0 flex-1 border-b-2 border-dotted border-current opacity-40 sm:block" aria-hidden="true" />
                      <span className="font-display text-3xl font-extrabold text-bridge group-hover:text-ink">
                        {formatPrice(it.price)}
                        <span className="text-sm font-bold opacity-80">/{it.unit}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* 5. PLAN BUILDER */}
      <section className="section" id="plan" data-testid="section-plan">
        <div className="wrap">
          <Reveal variant="wipe">
            <h2 className="max-w-3xl text-4xl md:text-6xl">Build your plan, then text it to Jennifer</h2>
          </Reveal>
          <p className="mb-10 mt-4 max-w-2xl text-lg text-foreground/80">
            Tap the walks, nights and visits you need. The total uses Jennifer&apos;s posted prices, and the
            message writes itself.
          </p>
          <PlanBuilder />
        </div>
      </section>

      {/* 6. SAMPLE UPDATE */}
      <section className="section bg-bridge" data-trail-cross data-testid="section-update">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal variant="wipe">
              <h2 className="text-4xl md:text-6xl">Photo and message updates while you&apos;re away</h2>
            </Reveal>
            <p className="mt-5 max-w-lg text-lg font-medium">
              Whether it&apos;s a walk, a boarding stay or a cat sitting visit, you hear from Jennifer. Here&apos;s a
              made-up example of what an update from Jennifer can look like. It&apos;s a sample for this page, not
              a customer review.
            </p>
            <ul className="mt-6 space-y-2 font-bold">
              <li className="flex items-center gap-2"><Paw className="h-5 w-5" /> A quick message when you&apos;re home or out of town</li>
              <li className="flex items-center gap-2"><Paw className="h-5 w-5" /> Photos so you can see for yourself</li>
              <li className="flex items-center gap-2"><Paw className="h-5 w-5" /> Reply any time, it&apos;s just a text</li>
            </ul>
          </div>
          <div className="lg:col-span-6">
            <SampleUpdate />
          </div>
        </div>
      </section>

      {/* 7. PITTSBURGH */}
      <section className="section relative overflow-hidden" data-testid="section-pittsburgh">
        <div className="wrap">
          <Reveal variant="wipe">
            <h2 className="max-w-3xl text-4xl md:text-6xl">A local pet sitter and dog walker, Pittsburgh style</h2>
          </Reveal>
          <p className="mt-4 max-w-2xl text-lg text-foreground/80">
            Steep hills, yellow bridges, an incline or two. Tails to Trails is a Pittsburgh business, and Jennifer
            talks like one.
          </p>
          <div className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2">
            {SLANG.map((s, i) => (
              <Reveal key={s.word} variant={i % 2 === 0 ? 'left' : 'right'} delay={i * 80} className={i % 2 === 1 ? 'md:translate-y-10' : ''}>
                <div className="flex gap-4">
                  <span aria-hidden="true" className="mt-4 hidden h-[8.5rem] w-3 shrink-0 rounded-full border-[2.5px] border-ink bg-amber sm:block" />
                  <div className={`${s.tone} ${s.tilt} flex-1 rounded-2xl border-[2.5px] border-ink p-5 shadow-[5px_5px_0_hsl(var(--ink))] transition-transform hover:rotate-0`}>
                    <p className="font-display text-4xl font-extrabold">{s.word}</p>
                    <p className="mt-2">{s.say}</p>
                    <Link href={s.to.path} className="mt-3 inline-flex min-h-11 items-center gap-1 font-bold underline decoration-2 underline-offset-4 hover:no-underline" data-testid={`link-slang-${s.to.key}`}>
                      {s.to.navLabel} in Pittsburgh <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. ABOUT */}
      <section className="on-dark section overflow-hidden bg-river text-butter" data-trail-cross data-testid="section-about">
        <div className="wrap grid items-center gap-12 lg:grid-cols-12">
          <Reveal variant="pop" className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm">
              <div className="flex aspect-square items-center justify-center rounded-full border-[3px] border-ink bg-bridge">
                <Key className="w-3/4 -rotate-12" />
              </div>
              <SittingDog className="absolute -bottom-3 -right-4 w-36" color="cream" />
              <p className="absolute -left-2 top-4 rotate-[-8deg] rounded-xl border-[2.5px] border-ink bg-butter px-3 py-1.5 font-display text-lg font-extrabold text-ink">
                Keys, please
              </p>
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <h2 className="text-4xl text-bridge md:text-6xl">{ABOUT.greeting}</h2>
            <p className="mt-5 max-w-2xl font-display text-2xl font-bold leading-snug md:text-3xl">
              &ldquo;{ABOUT.quote}&rdquo;
            </p>
            <p className="mt-4 text-butter/85">
              {BUSINESS.legalName} is a one-person pet sitting and dog walking business in {BUSINESS.region}. When
              you call or text, you get Jennifer.
            </p>
            <ol className="mt-8 space-y-4">
              {PROMISES.map((p, i) => (
                <li key={p.title} className="flex gap-4 border-t border-butter/30 pt-4">
                  <span className="font-display text-3xl font-extrabold leading-none text-bridge">{i + 1}</span>
                  <div>
                    <h3 className="text-xl text-butter">{p.title}</h3>
                    <p className="text-butter/80">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-butter/90">{ABOUT.meetAndGreet}</p>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="section" id="faq" data-testid="section-faq">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal variant="wipe">
              <h2 className="text-4xl md:text-5xl">Dog walking and pet sitting questions, answered</h2>
            </Reveal>
            <div className="mt-6 hidden lg:block">
              <WalkingDog className="w-48" color="rust" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={HOME_FAQS} idPrefix="home" />
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="relative overflow-hidden border-t-[2.5px] border-ink bg-bridge pb-16 pt-16 md:pt-24" data-trail-cross data-testid="section-cta">
        <div className="wrap relative z-10 text-center">
          <h2 className="mx-auto max-w-4xl text-5xl md:text-7xl">Ready for a free meet &amp; greet?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg font-medium">
            Call or text Jennifer and tell her about your dog, your cat, or your yard. No forms, just a real
            conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CallButton variant="ink" testId="button-call-final" />
            <TextButton variant="paper" testId="button-text-final" />
          </div>
        </div>
        <div className="relative mt-10 flex justify-center gap-2" aria-hidden="true">
          <SittingDog className="h-28 w-auto" color="night" />
          <SittingCat className="h-24 w-auto" />
          <SittingDog className="h-32 w-auto" color="cream" />
        </div>
      </section>
    </TrailWrap>
  );
}
