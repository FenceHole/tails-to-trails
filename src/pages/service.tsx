import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';
import { Paw, ServiceArt } from '@/components/art';
import { CallButton, TextButton } from '@/components/cta-buttons';
import { FaqList } from '@/components/faq-list';
import { Reveal } from '@/components/reveal';
import { SERVICE_PAGES } from '@/content/services';
import { PAGES, PRICING, formatPrice, type ServicePageKey } from '@/content/site';

const TONES = ['bg-bridge', 'bg-butter', 'bg-card'] as const;

export default function ServicePage({ pageKey }: { pageKey: ServicePageKey }) {
  const meta = PAGES[pageKey];
  const c = SERVICE_PAGES[pageKey];

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden border-b-[2.5px] border-ink bg-bridge" data-testid="section-service-hero">
        <div className="wrap grid items-center gap-8 py-10 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm font-bold">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href={PAGES.home.path} className="inline-flex min-h-11 items-center underline underline-offset-4" data-testid="link-breadcrumb-home">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{meta.navLabel}</li>
              </ol>
            </nav>
            <h1 className="text-[2.5rem] leading-[0.96] sm:text-6xl md:text-7xl" data-testid="text-h1">
              {meta.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-snug md:text-xl" data-testid="text-service-intro">
              {c.intro}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {c.prices.map((k) => (
                <li key={k} className="rounded-full border-[2.5px] border-ink bg-butter px-4 py-1.5 font-bold" data-testid={`chip-price-${k}`}>
                  <span className="font-display text-xl font-extrabold">
                    {formatPrice(PRICING[k].price)}
                  </span>{' '}
                  per {PRICING[k].unit} &middot; {PRICING[k].name}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CallButton variant="ink" className="w-full sm:w-auto" testId="button-call-hero" />
              <TextButton variant="paper" body={c.cta.smsBody} className="w-full sm:w-auto" testId="button-text-hero" />
            </div>
          </div>
          <div className="hidden lg:col-span-4 lg:block">
            <div className="wobble mx-auto w-full max-w-[17rem]">
              <ServiceArt k={pageKey} className="w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* included: ledger */}
      <section className="section" data-testid="section-included">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal variant="wipe">
                <h2 className="text-4xl md:text-5xl">{c.headings.included}</h2>
              </Reveal>
              <div className="mt-6 w-40 lg:hidden">
                <ServiceArt k={pageKey} className="w-full" />
              </div>
            </div>
          </div>
          <ul className="lg:col-span-8">
            {c.included.map((it, i) => (
              <li key={it.title}>
                <Reveal variant={i % 2 ? 'right' : 'left'} className="flex gap-4 border-t-[2.5px] border-ink py-5">
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-bridge">
                    <Check className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-2xl">{it.title}</h3>
                    <p className="mt-1 text-foreground/85">{it.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* steps: a trail */}
      <section className="on-dark section bg-ink text-butter" data-testid="section-steps">
        <div className="wrap">
          <Reveal variant="wipe">
            <h2 className="max-w-3xl text-4xl text-bridge md:text-6xl">{c.headings.steps}</h2>
          </Reveal>
          <ol className="relative mt-12">
            <span aria-hidden="true" className="absolute bottom-4 left-[1.45rem] top-4 border-l-[4px] border-dashed border-bridge md:left-1/2" />
            {c.steps.map((s, i) => (
              <li key={s.title} className="relative pb-10 pl-16 last:pb-0 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                <span className="absolute left-0 top-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-ink bg-bridge font-display text-2xl font-extrabold text-ink shadow-[0_0_0_5px_hsl(var(--ink))] md:left-1/2 md:-translate-x-1/2">
                  {i + 1}
                </span>
                <Reveal variant={i % 2 ? 'right' : 'left'} className={`${i % 2 ? 'md:col-start-2' : 'md:text-right'}`}>
                  <h3 className="text-2xl text-bridge md:text-3xl">{s.title}</h3>
                  <p className="mt-1 text-butter/85">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* good for */}
      <section className="section" data-testid="section-goodfor">
        <div className="wrap">
          <Reveal variant="wipe">
            <h2 className="max-w-3xl text-4xl md:text-5xl">{c.headings.goodFor}</h2>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-3">
            {c.goodFor.map((g, i) => (
              <li
                key={g}
                className={`flex items-center gap-2 rounded-full border-[2.5px] border-ink px-5 py-3 font-display text-lg font-bold shadow-[4px_4px_0_hsl(var(--ink))] transition-transform hover:rotate-0 ${
                  i % 2 ? 'rotate-1 bg-butter' : '-rotate-1 bg-bridge'
                }`}
              >
                <Paw className="h-4 w-4" />
                {g}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* local notes */}
      <section className="section border-y-[2.5px] border-ink bg-river text-butter on-dark" data-testid="section-local">
        <div className="wrap">
          <Reveal variant="wipe">
            <h2 className="max-w-3xl text-4xl text-bridge md:text-5xl">{c.headings.local}</h2>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
            {c.localNotes.map((n, i) => (
              <Reveal key={n.title} variant={i % 2 ? 'right' : 'left'} className={i % 2 ? 'md:mt-10' : ''}>
                <div className={`${TONES[i % 3]} rounded-2xl border-[2.5px] border-ink p-6 text-ink shadow-[6px_6px_0_hsl(var(--ink))] ${i % 2 ? 'rotate-1' : '-rotate-1'}`}>
                  <h3 className="text-2xl">{n.title}</h3>
                  <p className="mt-2">{n.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="section" data-testid="section-service-faq">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal variant="wipe">
              <h2 className="text-4xl md:text-5xl">{c.headings.faq}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={c.faqs} idPrefix={pageKey} />
          </div>
        </div>
      </section>

      {/* related */}
      <section className="pb-16 md:pb-24" aria-labelledby="related-heading" data-testid="section-related">
        <div className="wrap">
          <h2 id="related-heading" className="text-3xl md:text-4xl">More from Tails to Trails</h2>
          <ul className="mt-6 border-t-[2.5px] border-ink">
            {c.related.map((k) => (
              <li key={k} className="border-b-[2.5px] border-ink">
                <Link
                  href={PAGES[k].path}
                  className="group flex min-h-16 items-center justify-between gap-4 py-4 font-display text-2xl font-extrabold transition-colors hover:bg-bridge hover:px-4 md:text-3xl"
                  data-testid={`link-related-${k}`}
                >
                  {PAGES[k].h1}
                  <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-2" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* cta */}
      <section className="border-t-[2.5px] border-ink bg-bridge py-16 md:py-24" data-testid="section-service-cta">
        <div className="wrap text-center">
          <h2 className="mx-auto max-w-3xl text-4xl md:text-6xl">{c.cta.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium">{c.cta.body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CallButton variant="ink" testId="button-call-final" />
            <TextButton variant="paper" body={c.cta.smsBody} testId="button-text-final" />
          </div>
        </div>
      </section>
    </>
  );
}
