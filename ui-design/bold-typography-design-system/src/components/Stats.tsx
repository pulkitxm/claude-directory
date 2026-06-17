import { stats } from "../data/content";
import { RevealGroup, RevealItem } from "./Primitives";

// ─────────────────────────────────────────────────────────────────────────────
// Stats — a mono-numeral band that goes 1 → 2 → 4 columns. Numbers are large and
// set in JetBrains Mono (the system's "stats/technical details" face), each with
// a thin top rule and an accent unit. Reveals stagger in as the band scrolls up.
// ─────────────────────────────────────────────────────────────────────────────

export function Stats() {
  return (
    <section className="border-b border-border bg-muted py-16 md:py-20">
      <RevealGroup className="container-bold grid grid-cols-1 gap-px sm:grid-cols-2 md:grid-cols-4" as="div">
        {stats.map((s) => (
          <RevealItem key={s.label} className="px-2 py-6 md:px-6">
            <div className="h-px w-full bg-border" />
            <div className="mt-6 flex items-baseline font-mono text-5xl font-bold tracking-tight text-foreground md:text-6xl">
              {s.value}
              {s.unit && <span className="ml-0.5 text-2xl text-accent md:text-3xl">{s.unit}</span>}
            </div>
            <p className="mt-4 max-w-[18ch] text-sm leading-snug text-muted-foreground">{s.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
