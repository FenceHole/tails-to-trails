import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Copy, Minus, Plus } from 'lucide-react';
import { CallButton } from '@/components/cta-buttons';
import {
  BUSINESS,
  DEFAULT_SMS_BODY,
  PRICING,
  formatPrice,
  smsHref,
  type PriceKey,
} from '@/content/site';

const ORDER: PriceKey[] = ['soloWalk', 'packWalk', 'dogBoarding', 'catBoarding', 'catVisit', 'yardCleanup'];
const TINT: Record<PriceKey, string> = {
  soloWalk: 'bg-bridge',
  packWalk: 'bg-butter',
  dogBoarding: 'bg-bridge',
  catBoarding: 'bg-butter',
  catVisit: 'bg-bridge',
  yardCleanup: 'bg-butter',
};
const MAX = 40;

function noun(unit: 'walk' | 'night' | 'visit', n: number): string {
  if (n === 1) return unit;
  return `${unit}s`;
}

export function PlanBuilder() {
  const [qty, setQty] = useState<Record<PriceKey, number>>({
    soloWalk: 3,
    packWalk: 0,
    dogBoarding: 0,
    catBoarding: 0,
    catVisit: 0,
    yardCleanup: 0,
  });
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const total = useMemo(
    () => ORDER.reduce((sum, k) => sum + qty[k] * PRICING[k].price, 0),
    [qty],
  );

  const message = useMemo(() => {
    const lines = ORDER.filter((k) => qty[k] > 0).map(
      (k) =>
        `- ${qty[k]} ${noun(PRICING[k].unit, qty[k])}: ${PRICING[k].name} (${formatPrice(PRICING[k].price)} per ${PRICING[k].unit})`,
    );
    if (lines.length === 0) return DEFAULT_SMS_BODY;
    return `Hi Jennifer! I'd like to set up a free meet & greet and get a plan going for one pet:\n${lines.join('\n')}\nEstimated total: ${formatPrice(total)}\nMy pet's name and any other pets: `;
  }, [qty, total]);

  const change = (k: PriceKey, delta: number) =>
    setQty((q) => ({ ...q, [k]: Math.min(MAX, Math.max(0, q[k] + delta)) }));

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(message);
      ok = true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = message;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
      document.body.removeChild(ta);
    }
    if (ok) {
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2600);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <ul className="space-y-3.5 lg:col-span-7" data-testid="list-plan-lines">
        {ORDER.map((k) => {
          const item = PRICING[k];
          const q = qty[k];
          return (
            <li
              key={k}
              className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-3 rounded-2xl border-[2.5px] border-ink p-4 transition-shadow sm:p-5 ${TINT[k]} ${
                q > 0 ? 'shadow-[5px_5px_0_hsl(var(--ink))]' : ''
              }`}
              data-testid={`row-plan-${k}`}
            >
              <div className="min-w-0 flex-1 basis-48">
                <p className="font-display text-xl font-extrabold leading-tight">{item.name}</p>
                <p className="text-sm text-foreground/80">
                  {item.detail}. {formatPrice(item.price)} per {item.unit}.
                </p>
              </div>
              <div className="flex items-center gap-2" role="group" aria-label={`${item.name} quantity`}>
                <button
                  type="button"
                  onClick={() => change(k, -1)}
                  disabled={q === 0}
                  aria-label={`Remove one ${item.unit} of ${item.name.toLowerCase()}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] border-ink bg-butter transition-transform active:scale-90 enabled:hover:bg-ink enabled:hover:text-bridge disabled:opacity-40"
                  data-testid={`button-minus-${k}`}
                >
                  <Minus className="h-5 w-5" aria-hidden="true" />
                </button>
                <span
                  key={q}
                  className="pop-in w-12 text-center font-display text-3xl font-extrabold tabular-nums"
                  aria-live="polite"
                  data-testid={`text-qty-${k}`}
                >
                  {q}
                </span>
                <button
                  type="button"
                  onClick={() => change(k, 1)}
                  disabled={q >= MAX}
                  aria-label={`Add one ${item.unit} of ${item.name.toLowerCase()}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] border-ink bg-ink text-bridge transition-transform active:scale-90 hover:-rotate-6 hover:scale-105 disabled:opacity-40"
                  data-testid={`button-plus-${k}`}
                >
                  <Plus className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
        <li className="px-1 text-sm text-foreground/80">
          Plans are priced for one pet. Have more than one? Just mention them in your text and Jennifer will
          take it from there.
        </li>
      </ul>

      <div className="lg:col-span-5">
        <div className="on-dark relative rounded-3xl border-[2.5px] border-ink bg-ink p-6 text-butter shadow-[7px_7px_0_hsl(var(--river))] sm:p-8 lg:sticky lg:top-24">
          <p className="font-display text-lg font-bold text-bridge">Your estimate</p>
          <p className="mt-1 flex items-baseline gap-2" aria-live="polite" data-testid="text-plan-total">
            <span key={total} className="pop-in inline-block font-display text-7xl font-extrabold leading-none tabular-nums text-bridge">
              {formatPrice(total)}
            </span>
            <span className="text-butter/80">for the stretch above</span>
          </p>

          <div className="mt-5 rounded-2xl border-2 border-dashed border-butter/40 p-4 text-[0.95rem] leading-relaxed">
            <p className="mb-1 text-xs font-bold text-butter/70">The text you&apos;ll send</p>
            <p className="whitespace-pre-line break-words" data-testid="text-plan-message">
              {message}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <a href={smsHref(message)} className="btn btn-bridge w-full" data-testid="button-plan-text">
              Text this plan to Jennifer
            </a>
            <CallButton variant="paper" label={`Or call ${BUSINESS.phoneDisplay}`} className="w-full" testId="button-plan-call" />
            <button
              type="button"
              onClick={copy}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-butter/50 px-4 font-bold hover:bg-butter/10"
              data-testid="button-plan-copy"
            >
              {copied ? <Check className="h-5 w-5 text-bridge" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
              {copied ? 'Copied. Paste it into a text.' : 'Copy message'}
            </button>
            <p className="text-sm text-butter/70">
              On a computer, text links usually do nothing. Copy the message and send it from your phone to{' '}
              {BUSINESS.phoneDisplay}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
