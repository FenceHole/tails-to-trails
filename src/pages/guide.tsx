import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { SittingDog, WalkingDog } from '@/components/art';
import { CallButton, TextButton } from '@/components/cta-buttons';
import { FaqList } from '@/components/faq-list';
import { PageHero } from '@/components/page-hero';
import { Reveal } from '@/components/reveal';
import { GUIDE_FAQS, GUIDE_INTRO, GUIDE_SECTIONS } from '@/content/extra-pages';
import { PAGES } from '@/content/site';

const TONES = ['bg-bridge', 'bg-card', 'bg-butter'] as const;

export default function Guide() {
  return (
    <>
      <PageHero
        pageKey="guide"
        intro={GUIDE_INTRO}
        art={
          <div className="wobble mx-auto w-full max-w-[17rem]">
            <WalkingDog className="w-full" color="tan" />
          </div>
        }
      />

      <section className="section" data-testid="section-guide">
        <div className="wrap">
          <nav aria-label="On this page" className="mb-12">
            <ul className="flex flex-wrap gap-2.5">
              {GUIDE_SECTIONS.map((g) => (
                <li key={g.id}>
                  <a
                    href={`#${g.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border-[2.5px] border-ink bg-butter px-4 font-bold transition-colors hover:bg-bridge"
                  >
                    {g.title.split(':')[0]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            {GUIDE_SECTIONS.map((g, i) => (
              <Reveal key={g.id} variant={i % 2 ? 'right' : 'left'} className={i % 2 ? 'md:mt-12' : ''}>
                <article
                  id={g.id}
                  className={`${TONES[i % 3]} scroll-mt-28 rounded-2xl border-[2.5px] border-ink p-6 shadow-[6px_6px_0_hsl(var(--ink))] ${i % 2 ? 'rotate-1' : '-rotate-1'} transition-transform hover:rotate-0`}
                >
                  <h2 className="text-2xl md:text-3xl">{g.title}</h2>
                  <p className="mt-3 text-lg leading-relaxed">{g.body}</p>
                  <Link
                    href={PAGES[g.link].path}
                    className="mt-4 inline-flex min-h-11 items-center gap-1 font-bold underline decoration-2 underline-offset-4 hover:no-underline"
                    data-testid={`link-guide-${g.id}`}
                  >
                    {g.linkLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section border-t-[2.5px] border-ink" data-testid="section-guide-faq">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal variant="wipe">
              <h2 className="text-4xl md:text-5xl">Pittsburgh pet care: quick answers</h2>
            </Reveal>
            <div className="mt-6 hidden lg:block">
              <SittingDog className="w-40" color="cream" />
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={GUIDE_FAQS} idPrefix="guide" />
          </div>
        </div>
      </section>

      <section className="border-t-[2.5px] border-ink bg-bridge py-16 md:py-24" data-testid="section-service-cta">
        <div className="wrap text-center">
          <h2 className="mx-auto max-w-3xl text-4xl md:text-6xl">Want a hand with your Pittsburgh pet?</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg font-medium">
            Call or text Jennifer to set up a free meet &amp; greet for walks, sitting or boarding.
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
