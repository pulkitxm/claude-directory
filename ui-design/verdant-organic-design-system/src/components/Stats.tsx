import { Reveal } from "./Reveal";
import { stats } from "../lib/content";

/**
 * A quiet stats band on a stone tint. Numbers scale up gently on group-hover,
 * and a thin timber divider runs between columns on wider screens. Each cell is
 * its own group so hover is local.
 */
export function Stats() {
  return (
    <section aria-label="By the numbers" className="relative bg-muted/40 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="h-full">
            <div className="group flex flex-col items-center text-center md:items-start md:text-left">
              <span className="font-serif text-5xl font-bold text-primary transition-transform duration-500 ease-organic group-hover:scale-110 md:text-6xl">
                {s.value}
              </span>
              <span className="mt-2 max-w-[12rem] text-sm font-semibold leading-snug text-muted-foreground">
                {s.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
