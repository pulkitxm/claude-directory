import { process } from "../data/content";
import { Reveal, RevealGroup, RevealItem, SectionLabel } from "./Primitives";

// ─────────────────────────────────────────────────────────────────────────────
// Process ("How It Works") — three steps laid out as number | title | description.
// The oversized step numerals sit in border color and snap to accent on hover —
// a pure 150ms color change, no movement, exactly as the spec describes.
// ─────────────────────────────────────────────────────────────────────────────

export function Process() {
  return (
    <section id="process" className="border-b border-border bg-muted py-20 md:py-28 lg:py-32">
      <div className="container-bold">
        <Reveal className="max-w-3xl">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Three moves to a <span className="text-accent">poster</span>.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 divide-y divide-border border-y border-border">
          {process.map((step) => (
            <RevealItem
              key={step.n}
              as="div"
              className="group grid grid-cols-1 items-baseline gap-4 py-10 lg:grid-cols-12 lg:gap-8 lg:py-12"
            >
              <div className="lg:col-span-2">
                <span className="font-mono text-6xl font-bold leading-none tracking-tight text-border transition-colors duration-150 ease-crisp group-hover:text-accent md:text-7xl">
                  {step.n}
                </span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:col-span-4">
                {step.title}
              </h3>
              <p className="max-w-xl text-base leading-normal text-muted-foreground md:text-lg lg:col-span-6">
                {step.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
