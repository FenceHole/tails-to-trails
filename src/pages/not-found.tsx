import { Link } from 'wouter';
import { SittingDog } from '@/components/art';
import { CallButton } from '@/components/cta-buttons';
import { PAGES, SERVICE_NAV } from '@/content/site';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-bridge" data-testid="page-not-found">
      <div className="wrap py-14 text-center md:py-24">
        <div className="mx-auto flex items-end justify-center gap-1 font-display font-extrabold leading-none" aria-hidden="true">
          <span className="text-[7rem] sm:text-[11rem]">4</span>
          <SittingDog className="mb-2 h-[6.5rem] w-auto sm:h-40" color="tan" />
          <span className="text-[7rem] sm:text-[11rem]">4</span>
        </div>
        <h1 className="mt-4 text-4xl md:text-6xl">This trail doesn&apos;t go anywhere</h1>
        <p className="mx-auto mt-4 max-w-lg text-lg font-medium">
          Page not found. Your dog may have buried it. Head back to Tails to Trails or pick a service below,
          and if yinz are still lost, just call.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={PAGES.home.path} className="btn btn-ink" data-testid="link-404-home">
            Back to the homepage
          </Link>
          <CallButton variant="paper" testId="button-call-404" />
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
          {SERVICE_NAV.map((p) => (
            <li key={p.key}>
              <Link href={p.path} className="flex min-h-11 items-center rounded-full border-[2.5px] border-ink bg-butter px-4 font-bold hover:bg-ink hover:text-bridge" data-testid={`link-404-${p.key}`}>
                {p.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
