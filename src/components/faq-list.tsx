import { Plus } from 'lucide-react';
import type { FaqItem } from '@/content/site';

/** Native details/summary: keyboard operable, answers always in the DOM. */
export function FaqList({ items, idPrefix }: { items: readonly FaqItem[]; idPrefix: string }) {
  return (
    <div className="border-t-[2.5px] border-ink">
      {items.map((f, i) => (
        <details key={f.q} className="group border-b-[2.5px] border-ink" data-testid={`faq-${idPrefix}-${i}`}>
          <summary className="flex min-h-[3.5rem] items-start justify-between gap-4 py-5 pr-1">
            <h3 className="text-xl leading-tight md:text-2xl">{f.q}</h3>
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink bg-bridge group-hover:bg-ink group-hover:text-bridge">
              <Plus className="faq-plus h-5 w-5" aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-12 text-lg leading-relaxed text-foreground/85">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
