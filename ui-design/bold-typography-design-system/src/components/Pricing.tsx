import { Check, ArrowRight } from "lucide-react";
import { pricing } from "../data/content";
import { Card, Reveal, RevealGroup, RevealItem, SectionLabel } from "./Primitives";
import { Button } from "./Button";

// ─────────────────────────────────────────────────────────────────────────────
// Pricing — 1 → 2 → 3 columns. The featured tier is differentiated only by a 2px
// accent border and a small accent badge above its content (no background change),
// exactly as the spec prescribes. Feature rows use the lucide Check at 1.5px.
// ─────────────────────────────────────────────────────────────────────────────

export function Pricing() {
  return (
    <section id="pricing" className="border-b border-border bg-muted py-20 md:py-28 lg:py-32">
      <div className="container-bold">
        <Reveal className="max-w-3xl">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Pay for the <span className="text-accent">press</span>, not the paint.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {pricing.map((tier) => (
            <RevealItem key={tier.name} as="div" className="relative">
              {/* accent badge sits above the highlighted card */}
              {tier.featured && tier.badge && (
                <span className="absolute -top-3 left-8 z-10 bg-accent px-3 py-1 font-mono text-xs uppercase tracking-wider text-accent-foreground">
                  {tier.badge}
                </span>
              )}
              <Card
                highlighted={tier.featured}
                interactive={!tier.featured}
                className="flex h-full flex-col bg-background"
              >
                <h3 className="text-xl font-bold uppercase tracking-wide text-foreground">{tier.name}</h3>
                <p className="mt-2 text-sm leading-snug text-muted-foreground">{tier.blurb}</p>

                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold tracking-tight text-foreground">{tier.price}</span>
                  <span className="font-mono text-sm text-muted-foreground">{tier.cadence}</span>
                </div>

                <div className="my-8 h-px w-full bg-border" />

                <ul className="flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                      <Check size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Button
                    href="#final-cta"
                    variant={tier.featured ? "primary" : "outline"}
                    size="default"
                    className={tier.featured ? "" : "w-full"}
                  >
                    {tier.cta}
                    {tier.featured && <ArrowRight size={16} strokeWidth={1.5} />}
                  </Button>
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
