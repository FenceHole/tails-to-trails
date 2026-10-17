import { useState, type ReactNode } from 'react';
import { Link } from 'wouter';
import { PeekCat, Tuft } from '@/components/scene-art';
import { useSwing } from '@/hooks/use-swing';
import { PAGES, PRICING, formatPrice, type PageKey, type PriceKey } from '@/content/site';

/**
 * The flyer's signpost, built from real links. Each sign swings when you
 * hover it or drag it, and still works as a normal link when you click or
 * tap. Every price comes from PRICING.
 */

const per = (k: PriceKey) => `${formatPrice(PRICING[k].price)}/${PRICING[k].unit}`;

function Sign({
  to,
  heading,
  point,
  yellow = false,
  idle,
  onUse,
  testId,
  className = '',
  children,
  above,
}: {
  to: PageKey;
  heading: string;
  point: 'left' | 'right';
  yellow?: boolean;
  idle: string;
  onUse: () => void;
  testId: string;
  className?: string;
  children: ReactNode;
  /** Something that sits on top edge of the sign, such as the cat. */
  above?: ReactNode;
}) {
  const swing = useSwing<HTMLDivElement>(onUse);
  return (
    <div
      ref={swing.ref}
      {...swing.handlers}
      onClickCapture={(e) => {
        if (swing.wasDrag()) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      className={`relative z-10 select-none ${className}`}
      style={{ touchAction: 'pan-y' }}
    >
      {above}
      <div className={`${idle} relative`}>
        <div className={`sign ${point === 'left' ? 'sign-left' : 'sign-right'} ${yellow ? 'sign-yellow' : ''}`}>
          <Link
            href={PAGES[to].path}
            draggable={false}
            className="sign-link block"
            aria-label={`${heading}, see details`}
            data-testid={testId}
          >
            <span className="sign-edge">
              <span className="sign-face">{children}</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

const Title = ({ children }: { children: ReactNode }) => (
  <span className="whitespace-nowrap font-script text-[1.6rem] leading-none text-ink sm:text-[2.1rem]">{children}</span>
);

const Line = ({ label, price }: { label: string; price: string }) => (
  <span className="block font-display text-[0.95rem] font-extrabold leading-tight text-ink sm:text-base">
    {label} <span className="text-plum">{price}</span>
  </span>
);

export function Signpost({ className = '' }: { className?: string }) {
  const [used, setUsed] = useState(false);
  const [ducked, setDucked] = useState(false);
  const [meow, setMeow] = useState(0);
  const onUse = () => setUsed(true);

  const pokeCat = () => {
    setDucked(true);
    setMeow((n) => n + 1);
    window.setTimeout(() => setDucked(false), 1400);
  };

  return (
    <div className={`relative mx-auto w-full max-w-[25rem] pb-20 ${className}`} data-testid="signpost">
      {/* post */}
      <div
        aria-hidden="true"
        className="post-wood absolute bottom-10 left-1/2 top-3 z-0 w-6 -translate-x-1/2 rounded-sm border-x-[3px] border-ink bg-post"
      />
      <div className="relative flex flex-col gap-3">
        <Sign to="meetGreet" heading="Free meet and greet" point="right" yellow idle="sign-idle" onUse={onUse} testId="sign-meetGreet" className="mr-6 sm:mr-8">
          <span className="block">
            <Title>Free Meet &amp; Greet</Title>
            <span className="block font-display text-sm font-extrabold text-ink">Call or text 412-709-0057</span>
          </span>
        </Sign>

        <Sign to="boarding" heading="Boarding" point="left" idle="sign-idle sign-idle-b" onUse={onUse} testId="sign-boarding" className="ml-4 sm:ml-6">
          <span className="flex w-full items-center justify-between gap-3">
            <Title>Boarding</Title>
            <span className="text-right">
              <Line label="Cat" price={per('catBoarding')} />
              <Line label="Dog" price={per('dogBoarding')} />
            </span>
          </span>
        </Sign>

        <Sign
          to="catSitting"
          heading="Cat visits"
          point="right"
          idle="sign-idle sign-idle-c"
          onUse={onUse}
          testId="sign-catSitting"
          className={`mr-3 mt-11 sm:mr-5 ${ducked ? 'ducked' : ''}`}
          above={
            <>
              <button
                type="button"
                onClick={pokeCat}
                aria-label="Say hi to the cat"
                className="absolute bottom-[calc(100%-12px)] right-12 z-0 h-[3.6rem] w-[4.4rem] cursor-pointer overflow-hidden rounded-t-3xl"
                data-testid="button-peek-cat"
              >
                <PeekCat className="peek-cat h-full w-full" />
              </button>
              {meow > 0 ? (
                <span
                  key={meow}
                  role="status"
                  className="bubble absolute bottom-[calc(100%+2.4rem)] right-2 z-20 rounded-xl border-[2.5px] border-ink bg-butter px-3 py-1 font-script text-xl leading-tight text-ink"
                >
                  Meow!
                </span>
              ) : null}
            </>
          }
        >
          <span className="flex w-full items-center justify-between gap-3">
            <Title>Visits</Title>
            <span className="text-right">
              <Line label="Cat" price={per('catVisit')} />
            </span>
          </span>
        </Sign>

        <Sign to="dogWalking" heading="Walks" point="left" idle="sign-idle" onUse={onUse} testId="sign-dogWalking" className="ml-3 sm:ml-5">
          <span className="flex w-full items-center justify-between gap-3">
            <Title>Walks</Title>
            <span className="text-right">
              <Line label="30 min single" price={formatPrice(PRICING.soloWalk.price)} />
              <Line label="60 min group" price={formatPrice(PRICING.packWalk.price)} />
            </span>
          </span>
        </Sign>

        <Sign to="yardCleanup" heading="Yard clean up" point="right" idle="sign-idle sign-idle-b" onUse={onUse} testId="sign-yardCleanup" className="mr-5 sm:mr-8">
          <span className="flex w-full items-center justify-between gap-3">
            <Title>Yard Clean Up</Title>
            <span className="font-display text-lg font-extrabold text-plum">{per('yardCleanup')}</span>
          </span>
        </Sign>
      </div>
      <Tuft className="pointer-events-none absolute bottom-8 left-1/2 z-20 w-36 -translate-x-1/2" />
      <p
        className={`absolute bottom-0 left-0 right-0 text-center font-script text-xl text-plum transition-opacity duration-500 ${used ? 'opacity-0' : 'opacity-100'}`}
        aria-hidden="true"
      >
        try swinging the signs
      </p>
    </div>
  );
}
