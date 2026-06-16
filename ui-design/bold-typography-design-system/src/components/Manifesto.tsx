import { manifesto } from "../data/content";
import { Reveal, RevealGroup, RevealItem, SectionLabel } from "./Primitives";

// ─────────────────────────────────────────────────────────────────────────────
// Manifesto — an asymmetric 5/7 editorial split. The left rail is a label and a
// big layered numeral (depth via an offset duplicate in border color, not a
// shadow). The right column carries the load-bearing statement and body copy
// constrained to a readable measure.
// ─────────────────────────────────────────────────────────────────────────────

export function Manifesto() {
  return (
    <section id="manifesto" className="border-b border-border py-20 md:py-28 lg:py-32">
      <div className="container-bold grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        {/* Left rail */}
        <Reveal className="lg:col-span-4">
          <SectionLabel>{manifesto.kicker}</SectionLabel>
          {/* Layered-text depth: the duplicate <span class="layer"> sits 2px behind */}
          <div className="layered-text mt-8 select-none">
            <span aria-hidden className="layer text-[7rem] font-extrabold leading-none tracking-tighter md:text-[10rem]">
              02
            </span>
            <span className="block text-[7rem] font-extrabold leading-none tracking-tighter text-foreground md:text-[10rem]">
              02
            </span>
          </div>
        </Reveal>

        {/* Right column */}
        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal>
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              {manifesto.title}
              <br className="hidden sm:block" /> <span className="text-accent">{manifesto.titleAccent}</span>
            </h2>
          </Reveal>

          <RevealGroup className="mt-10 max-w-2xl space-y-6">
            {manifesto.body.map((p, i) => (
              <RevealItem key={i} as="div">
                <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{p}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
