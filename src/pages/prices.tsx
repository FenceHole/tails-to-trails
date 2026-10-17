import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { SittingCat, SittingDog } from '@/components/art';
import { CallButton, TextButton } from '@/components/cta-buttons';
import { FaqList } from '@/components/faq-list';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { PRICES_FAQS, PRICES_INTRO } from '@/content/extra-pages';
import { PAGES, PRICING, formatPrice, type PriceKey } from '@/content/site';

const GROUPS: { title: string; keys: PriceKey[] }[] = [
  { title: 'Dog walking', keys: ['soloWalk', 'packWalk'] },
  { title: 'Boarding and sitting', keys: ['dogBoarding', 'catBoarding', 'catVisit'] },
  { title: 'Around the house', keys: ['yardCleanup'] },
];

export default function Prices() {
  return (
    <>
      <PageHero
        pageKey="prices"
        intro={PRICES_INTRO}
        art={
          <div className="wobble mx-auto flex w-full max-w-[17rem] items-end">
            <SittingDog className="w-1/2" color="tan" />
            <SittingCat className="-ml-2 w-1/2" />
          </div>
        }
      >
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CallButton variant="ink" className="w-full sm:w-auto" testId="button-call-hero" />
          <TextButton variant="paper" label="Text Jennifer" className="w-full sm:w-auto" testId="button-text-hero" />
        </div>
      </PageHero>

      <section className="section" data-testid="section-price-table">
        <div className="wrap">
          <Reveal variant="wipe">
            <h2 className="max-w-3xl text-4xl md:text-5xl">What Pittsburgh pet care costs with Jennifer</h2>
          </Reveal>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {GROUPS.map((g, gi) => (
              <Reveal key={g.title} variant="pop" delay={gi * 90}>
                <div className="h-full rounded-3xl border-[2.5px] border-ink bg-card p-5 shadow-[6px_6px_0_hsl(var(--ink))]">
                  <h3 className="text-2xl text-plum">{g.title}</h3>
                  <ul className="mt-3">
                    {g.keys.map((k) => {
                      const it = PRICING[k];
                      return (
                        <li key={k} className="border-t-2 border-dashed border-ink/25 first:border-t-0">
                          <Link
                            href={PAGES[it.page].path}
                            className="group flex min-h-16 items-center gap-3 rounded-xl py-3 transition-colors hover:bg-bridge hover:px-2"
                            data-testid={`row-price-${k}`}
                          >
                            <span className="min-w-0 flex-1">
                              <span className="block font-display text-lg font-extrabold leading-tight">{it.name}</span>
                              <span className="block text-sm text-foreground/75">{it.detail}</span>
                            </span>
                            <span className="whitespace-nowrap font-display text-3xl font-extrabold">
                              {formatPrice(it.price)}
                              <span className="text-sm font-bold text-foreground/70">/{it.unit}</span>
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="left">
            <Link
              href={PAGES.meetGreet.path}
              className="group mt-10 flex min-h-20 flex-wrap items-center justify-between gap-4 rounded-3xl border-[2.5px] border-ink bg-bridge px-6 py-5 transition-transform hover:-rotate-1"
              data-testid="link-meet-greet"
            >
              <span>
                <span className="block font-display text-3xl font-extrabold">Meet &amp; greet: free</span>
                <span className="block text-foreground/85">Everyone starts here, and it costs nothing.</span>
              </span>
              <span className="flex items-center gap-2 font-bold">
                What to expect <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section" data-testid="section-prices-faq">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal variant="wipe">
              <h2 className="text-4xl md:text-5xl">Pittsburgh pet care prices: your questions answered</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={PRICES_FAQS} idPrefix="prices" />
          </div>
        </div>
      </section>

      <section className="bg-bridge py-16 md:py-24" data-testid="section-service-cta">
        <div className="wrap text-center">
          <h2 className="mx-auto max-w-3xl text-4xl md:text-6xl">Ready to book a free meet &amp; greet?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium">
            Call or text Jennifer. Tell her about your dog, your cat or your yard.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CallButton variant="ink" testId="button-call-final" />
            <TextButton variant="paper" testId="button-text-final" />
          </div>
        </div>
      </section>
    </>
  );
}
