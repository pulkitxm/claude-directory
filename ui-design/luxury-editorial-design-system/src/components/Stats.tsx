import { Overline, Emphasis } from "./Primitives";
import { stats } from "../data/content";

/* Dark inverted section — provides section rhythm/alternation.
   bg #1A1A1A, alabaster text, muted text at 60–80% opacity. */
export function Stats() {
  return (
    <section
      id="atelier"
      className="relative z-10 bg-foreground py-20 text-background md:py-32"
    >
      <div className="mx-auto max-w-[1600px] px-8 md:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6 lg:col-start-1">
            <Overline tone="light">A Century of the House</Overline>
            <h2 className="mt-8 max-w-xl font-serif text-4xl font-normal leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
              Measured in <Emphasis>decades</Emphasis>, never in seasons.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="max-w-md font-sans text-base leading-relaxed text-background/70 md:text-lg">
              We have changed very little since 1924 — and that is the point. The
              numbers below are not growth metrics. They are a record of restraint.
            </p>
          </div>
        </div>

        {/* Numbers row: 2 cols mobile, 4 on desktop */}
        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-background/20 pt-14 md:mt-20 lg:grid-cols-4 lg:gap-x-16">
          {stats.map((s) => (
            <div key={s.label} className="group">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-serif text-5xl font-normal leading-none tracking-tight transition-colors duration-700 ease-luxe group-hover:text-accent md:text-7xl lg:text-8xl">
                {s.value}
              </dd>
              <p className="mt-5 flex items-center gap-3">
                <span aria-hidden className="h-px w-6 bg-background/40" />
                <span className="font-sans text-[10px] uppercase tracking-overline text-background/60 md:text-xs">
                  {s.label}
                </span>
              </p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
