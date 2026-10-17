import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { HillsDivider } from '@/components/scene-art';
import { PAGES, type PageKey } from '@/content/site';

/** Mint-sky hero with breadcrumb, used by the prices and guide pages. */
export function PageHero({
  pageKey,
  intro,
  art,
  children,
}: {
  pageKey: PageKey;
  intro: string;
  art?: ReactNode;
  children?: ReactNode;
}) {
  const meta = PAGES[pageKey];
  return (
    <section className="relative overflow-hidden bg-mint" data-testid="section-page-hero">
      <div className="wrap relative z-10 grid items-center gap-8 pb-20 pt-10 md:pb-28 md:pt-16 lg:grid-cols-12">
        <div className={art ? 'lg:col-span-8' : 'lg:col-span-10'}>
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
          <p className="mt-5 max-w-2xl text-lg font-medium leading-snug md:text-xl">{intro}</p>
          {children}
        </div>
        {art ? <div className="hidden lg:col-span-4 lg:block">{art}</div> : null}
      </div>
      <HillsDivider className="absolute inset-x-0 bottom-0 z-0 h-16 w-full md:h-24" />
      <span className="absolute inset-x-0 bottom-0 z-0 h-[2.5px] bg-ink" aria-hidden="true" />
    </section>
  );
}
