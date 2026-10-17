import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { LogoMark, Paw } from '@/components/art';
import { CallButton, TextButton } from '@/components/cta-buttons';
import { BUSINESS, PAGES, SERVICE_NAV, TEL_HREF } from '@/content/site';

function norm(p: string): string {
  return p.length > 1 ? p.replace(/\/$/, '') : p;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [loc] = useLocation();
  const current = norm(loc);

  useEffect(() => {
    setOpen(false);
  }, [loc]);

  return (
    <header className="sticky top-0 z-50 border-b-[2.5px] border-ink bg-butter/95 backdrop-blur">
      <div className="wrap flex h-[4.25rem] items-center justify-between gap-3">
        <Link href={PAGES.home.path} className="group flex min-h-11 items-center gap-2.5" data-testid="link-logo">
          <LogoMark className="h-10 w-10 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
          <span className="font-display text-xl font-extrabold leading-none tracking-tight">
            Tails to Trails
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {SERVICE_NAV.map((p) => {
            const active = norm(p.path) === current;
            return (
              <Link
                key={p.key}
                href={p.path}
                aria-current={active ? 'page' : undefined}
                data-testid={`link-nav-${p.key}`}
                className={`relative flex min-h-11 items-center rounded-full px-3.5 font-bold transition-colors hover:bg-bridge ${
                  active ? 'bg-ink text-bridge hover:bg-ink' : ''
                }`}
              >
                {p.navLabel}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CallButton small className="hidden sm:inline-flex" testId="button-call-header" />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] border-ink bg-bridge lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            data-testid="button-menu"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t-[2.5px] border-ink bg-bridge lg:hidden">
          <ul className="wrap flex flex-col py-3">
            <li>
              <Link href={PAGES.home.path} className="flex min-h-12 items-center font-display text-2xl font-extrabold" data-testid="link-mobile-home">
                Home
              </Link>
            </li>
            {SERVICE_NAV.map((p) => (
              <li key={p.key}>
                <Link
                  href={p.path}
                  className="flex min-h-12 items-center font-display text-2xl font-extrabold"
                  data-testid={`link-mobile-${p.key}`}
                >
                  {p.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export function StickyBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex gap-2.5 border-t-[2.5px] border-ink bg-butter px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2.5 md:hidden"
      data-testid="bar-sticky-contact"
    >
      <CallButton variant="ink" label="Call" className="flex-1" testId="button-call-sticky" />
      <TextButton variant="bridge" label="Text" className="flex-1" testId="button-text-sticky" />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="on-dark bg-ink pb-28 pt-16 text-butter md:pb-12">
      <div className="wrap grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <LogoMark className="h-12 w-12" />
            <p className="font-display text-3xl font-extrabold tracking-tight">{BUSINESS.name}</p>
          </div>
          <p className="mt-4 max-w-sm text-butter/80">
            {BUSINESS.descriptor}. One person, one phone number, and a dog walker in Pittsburgh who answers it.
          </p>
          <a
            href={TEL_HREF}
            className="mt-5 inline-flex min-h-11 items-center font-display text-3xl font-extrabold text-bridge underline decoration-2 underline-offset-4 hover:decoration-4"
            data-testid="link-footer-phone"
          >
            {BUSINESS.phoneDisplay}
          </a>
        </div>
        <nav aria-label="Services" className="md:col-span-4">
          <h2 className="text-lg text-bridge">Pet care in Pittsburgh</h2>
          <ul className="mt-3">
            {SERVICE_NAV.map((p) => (
              <li key={p.key}>
                <Link href={p.path} className="flex min-h-11 items-center hover:text-bridge hover:underline" data-testid={`link-footer-${p.key}`}>
                  {p.navLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link href={PAGES.home.path} className="flex min-h-11 items-center hover:text-bridge hover:underline" data-testid="link-footer-home">
                Home
              </Link>
            </li>
          </ul>
        </nav>
        <div className="md:col-span-3">
          <h2 className="text-lg text-bridge">Good to know</h2>
          <ul className="mt-3 space-y-2 text-butter/85">
            <li>Free meet &amp; greet</li>
            <li>Trusted &amp; insured</li>
            <li>Phone and text only. No forms, no app, no waiting on a callback.</li>
          </ul>
        </div>
      </div>
      <div className="wrap mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-butter/25 pt-6 text-sm text-butter/70">
        <Paw className="h-4 w-4 text-bridge" />
        <span>
          {BUSINESS.legalName}, {BUSINESS.region}
        </span>
        <span aria-hidden="true">&middot;</span>
        <span>Drawn in the 412, walked on every hill, redd up n&apos;at.</span>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [loc] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc]);
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-3 focus:text-bridge"
        data-testid="link-skip"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <StickyBar />
    </>
  );
}
