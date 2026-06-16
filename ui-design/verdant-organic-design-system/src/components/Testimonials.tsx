import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { testimonials } from "../lib/content";

// Alternating avatar tints so the row doesn't read uniform.
const tints = ["#5D7052", "#C18C5D", "#A8743F"];
// Each card rests at a slightly different lean and, on hover, tilts the
// opposite way — as if you've just picked that particular note off the table.
// Resting lean + hover tilt are paired per card so the motion stays varied.
const leans = [
  "lg:rotate-[-1.2deg] lg:hover:rotate-1",
  "lg:rotate-[0.8deg] lg:hover:-rotate-1",
  "lg:rotate-[1.2deg] lg:hover:-rotate-[0.6deg]",
];

/**
 * Testimonials as a row of cards that subtly rotate on hover — as if you've
 * picked a physical note off the table. A large hanging Fraunces quote mark
 * anchors each card.
 */
export function Testimonials() {
  return (
    <section className="relative bg-muted/40 px-4 py-32 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Slow mornings, in their words"
          title={
            <>
              Kept on shelves from{" "}
              <span className="italic text-primary">Portland to Oaxaca.</span>
            </>
          }
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className="h-full">
              <figure
                className={`group flex h-full flex-col rounded-[2rem] border border-border/50 bg-card p-8 shadow-soft transition-all duration-500 ease-organic hover:-translate-y-1 hover:rotate-1 hover:shadow-soft-lg ${leans[i % leans.length]}`}
              >
                <Quote
                  size={36}
                  className="text-secondary/40 transition-colors duration-500 group-hover:text-secondary"
                  aria-hidden
                  fill="currentColor"
                />
                <blockquote className="mt-4 flex-1 font-serif text-xl italic leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-border/50 pt-5">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full font-serif text-base font-bold text-primary-foreground"
                    style={{ background: tints[i % tints.length] }}
                    aria-hidden
                  >
                    {t.initial}
                  </span>
                  <div>
                    <div className="font-bold text-foreground">{t.name}</div>
                    <div className="text-sm font-semibold text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
