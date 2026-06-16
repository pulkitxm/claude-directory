import { Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { Eyebrow } from "./Eyebrow";
import { SteamingCup } from "./Botanical";
import { benefits } from "../lib/content";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * A reasons-to-believe section on a deep moss field — one of the design
 * system's dark "varied section backgrounds". The lifestyle illustration is
 * clipped into a complex organic blob mask (not a rectangle), and the benefits
 * read as a checklist with moss-on-mist checkmarks. A soft grain overlay keeps
 * the paper texture alive against the dark fill.
 */
export function Benefits() {
  const reduced = useReducedMotion();
  return (
    <section className="relative overflow-hidden bg-primary px-4 py-32 text-primary-foreground sm:px-6 lg:px-8">
      <div className="grain-soft" />
      {/* faint blob washes within the dark field */}
      <div aria-hidden className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-secondary/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* image with organic mask */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-md">
            <div
              className={`overflow-hidden border-4 border-white/15 shadow-float-lg ${reduced ? "" : "animate-morph-b"}`}
              style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
            >
              <SteamingCup className="aspect-square h-auto w-full" />
            </div>
            {/* floating stat chip */}
            <div className="absolute -bottom-4 -right-2 rounded-2xl border border-white/20 bg-primary/80 px-5 py-3 shadow-float backdrop-blur-sm sm:-right-5">
              <p className="font-serif text-2xl font-bold text-primary-foreground">1.4k</p>
              <p className="text-xs font-semibold text-primary-foreground/75">trees in the ground</p>
            </div>
          </div>
        </Reveal>

        {/* copy + checklist */}
        <div className="order-1 max-w-2xl lg:order-2">
          <Reveal>
            <Eyebrow onDark>Why it tastes different</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-4xl font-semibold text-primary-foreground md:text-5xl">
              Honest in the cup, kind to the ground.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 text-lg leading-relaxed text-primary-foreground/80">
              We measure quality the old way — by what we leave out, and what we
              put back. No dust, no fillers, no flavourings, and a meadow that's
              richer for our visit.
            </p>
          </Reveal>

          <ul className="mt-9 space-y-5">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={0.2 + i * 0.08} as="li">
                <div className="flex gap-4">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-primary-foreground ring-1 ring-white/20">
                    <Check size={20} strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-primary-foreground">
                      {b.title}
                    </h3>
                    <p className="mt-1 text-base leading-relaxed text-primary-foreground/75">
                      {b.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.5}>
            <Button
              size="lg"
              className="mt-9 bg-card text-foreground hover:bg-background"
            >
              Read our stewardship pledge
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
