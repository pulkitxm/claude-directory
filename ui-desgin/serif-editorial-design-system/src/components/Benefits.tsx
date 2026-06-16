import { benefits } from "../data/content";
import { Section, SectionLabel } from "./Primitives";
import { PlateAtelier } from "./Plates";

export function Benefits() {
  return (
    <Section id="benefits" className="bg-muted/40">
      <SectionLabel align="left" className="mb-8">
        {benefits.label}
      </SectionLabel>

      {/* asymmetric two-column: 1.3fr / 0.7fr on desktop */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
        {/* primary column */}
        <div>
          <h2
            className="max-w-xl font-display leading-[1.12] tracking-[-0.01em] text-foreground"
            style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)" }}
          >
            {benefits.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{benefits.lede}</p>

          {/* numbered process — rule-separated rows */}
          <ol className="mt-12 border-t border-border">
            {benefits.points.map((p, i) => (
              <li
                key={p.title}
                className="group grid grid-cols-[auto_1fr] gap-x-6 border-b border-border py-7 transition-colors duration-200 hover:bg-card/60"
              >
                <span className="font-display text-3xl italic leading-none text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-[0.98rem] leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* narrow column — plate + margin note (sticky on desktop) */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative">
            <span aria-hidden className="absolute -right-4 -top-4 h-full w-full rounded-lg border border-accent/40" />
            <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-md">
              <PlateAtelier className="h-[clamp(320px,60vw,460px)] w-full" />
              <div className="flex items-center justify-between border-t border-border px-4 py-3">
                <span className="small-caps text-muted-foreground">Plate VII</span>
                <span className="small-caps text-accent">The Composing Room</span>
              </div>
            </div>
          </div>

          {/* pull quote / margin note */}
          <figure className="mt-10 border-l-2 border-accent pl-6">
            <blockquote className="font-display text-2xl italic leading-snug text-foreground">
              {benefits.marginNote}
            </blockquote>
            <figcaption className="small-caps mt-4 text-muted-foreground">{benefits.marginAttribution}</figcaption>
          </figure>
        </aside>
      </div>
    </Section>
  );
}
