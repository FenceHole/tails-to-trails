import { Reveal } from '@/components/reveal';
import { SittingDog } from '@/components/art';

/** A clearly-labelled sample of the kind of message and photo update Jennifer sends. */
export function SampleUpdate() {
  return (
    <div
      className="mx-auto w-full max-w-sm rounded-[2.5rem] border-[3px] border-ink bg-ink p-3 shadow-[8px_8px_0_hsl(var(--ink))]"
      data-testid="demo-sample-update"
    >
      <div className="overflow-hidden rounded-[2rem] bg-butter">
        <div className="flex items-center justify-between border-b-[2.5px] border-ink bg-bridge px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-ink font-display text-lg font-extrabold text-bridge">
              J
            </span>
            <span className="font-display text-lg font-extrabold">Jennifer</span>
          </div>
          <span className="rounded-full border-2 border-ink bg-butter px-2.5 py-1 text-xs font-extrabold">
            Sample message
          </span>
        </div>
        <div className="space-y-3 p-4">
          <Reveal variant="left" delay={0}>
            <p className="max-w-[85%] rounded-2xl rounded-bl-md border-2 border-ink bg-white px-4 py-2.5">
              Morning! Biscuit was already at the door when I got there. We&apos;re off.
            </p>
          </Reveal>
          <Reveal variant="left" delay={140}>
            <div className="w-[70%] overflow-hidden rounded-2xl rounded-bl-md border-2 border-ink bg-river pt-3">
              <SittingDog className="mx-auto h-36 w-auto" color="cream" />
              <p className="bg-ink px-3 py-1 text-xs font-bold text-butter">Sample photo, drawn for this demo</p>
            </div>
          </Reveal>
          <Reveal variant="left" delay={280}>
            <p className="max-w-[88%] rounded-2xl rounded-bl-md border-2 border-ink bg-white px-4 py-2.5">
              All done. Fresh water down, paws wiped, and he&apos;s already asleep on the couch. Nebby the whole
              way, waved at every window.
            </p>
          </Reveal>
          <Reveal variant="right" delay={420}>
            <p className="ml-auto max-w-[75%] rounded-2xl rounded-br-md border-2 border-ink bg-ink px-4 py-2.5 text-bridge">
              Same time Thursday?
            </p>
          </Reveal>
          <Reveal variant="left" delay={560}>
            <p className="max-w-[60%] rounded-2xl rounded-bl-md border-2 border-ink bg-white px-4 py-2.5">
              You got it.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
