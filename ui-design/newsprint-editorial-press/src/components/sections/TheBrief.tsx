import { Ticker, type TickerItem } from "@/components/ui/Ticker";
import { Reveal } from "@/components/ui/Reveal";
import { Kicker } from "@/components/ui/Kicker";

const WIRE: TickerItem[] = [
  { value: "11,204", label: "Issues Printed", breaking: true },
  { value: "62", label: "Standing Desks" },
  { value: "1.4M", label: "Readers on the Wire" },
  { value: "38ms", label: "Median Filing Latency", breaking: true },
  { value: "100%", label: "Sourced Claims" },
  { value: "0px", label: "Border Radius" },
  { value: "4AM", label: "Press Run" },
  { value: "24/7", label: "Fact Desk", breaking: true },
];

const FIGURES = [
  { value: "11,204", label: "Editions to date", note: "Daily since Vol. 1" },
  { value: "62", label: "Desks worldwide", note: "From NYC to Tokyo" },
  { value: "1.4M", label: "Subscribers", note: "Print + wire" },
  { value: "38ms", label: "Filing latency", note: "Wire to page" },
];

/**
 * The Brief: a breaking-news crawl over a row of headline figures, framed by a
 * collapsed black grid so each statistic reads as its own boxed column.
 */
export function TheBrief() {
  return (
    <section id="the-brief" className="border-b-4 border-ink">
      <Ticker items={WIRE} />

      <div className="mx-auto max-w-screen-xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-4">
          <Kicker>The Brief · By the Numbers</Kicker>
          <p className="max-w-md font-body text-sm italic leading-relaxed text-ink/65">
            A standing summary, recounted at the top of every edition so the
            ledger is never in doubt.
          </p>
        </div>

        <dl className="grid grid-cols-1 border-l border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
          {FIGURES.map((f, i) => (
            <Reveal
              key={f.label}
              as="div"
              delay={i * 80}
              className="group border-b border-r border-ink p-6 transition-colors duration-200 hover:bg-neutral-100 sm:p-8"
            >
              <dt className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-ink/55">
                {String(i + 1).padStart(2, "0")} / {f.label}
              </dt>
              <dd className="mt-3 font-serif text-5xl font-black tabular-nums tracking-tighter lg:text-6xl">
                {f.value}
              </dd>
              <dd className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/45 transition-colors group-hover:text-editorial">
                {f.note}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
