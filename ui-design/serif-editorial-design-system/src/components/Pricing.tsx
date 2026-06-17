import { Check } from "lucide-react";
import { pricing } from "../data/content";
import { Button } from "./Button";
import { Card, Section, SectionLabel } from "./Primitives";

export function Pricing() {
  return (
    <Section id="pricing" className="bg-muted/40">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <SectionLabel className="mx-auto mb-8 max-w-xs">{pricing.label}</SectionLabel>
        <h2
          className="font-display leading-[1.16] tracking-[-0.01em] text-foreground"
          style={{ fontSize: "clamp(2rem, 4.6vw, 3rem)" }}
        >
          {pricing.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{pricing.lede}</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch lg:gap-7">
        {pricing.tiers.map((tier) => (
          <Card
            key={tier.name}
            featured={tier.featured}
            elevated={tier.featured}
            hover={!tier.featured}
            accentTop={!tier.featured}
            className={`flex flex-col p-8 lg:p-9 ${tier.featured ? "lg:-translate-y-4" : ""}`}
          >
            {tier.featured && tier.ribbon && (
              <span className="small-caps absolute right-7 top-9 rounded-full bg-accent px-3 py-1 text-[0.62rem] text-accent-foreground">
                {tier.ribbon}
              </span>
            )}

            <h3 className="font-display text-2xl text-foreground">{tier.name}</h3>
            <p className="mt-2 min-h-[2.75rem] font-display text-base italic text-muted-foreground">
              {tier.blurb}
            </p>

            <div className="mt-6 flex items-baseline gap-2 border-y border-border py-6">
              <span className="font-display text-5xl leading-none tracking-tight text-foreground">
                {tier.price}
              </span>
              <span className="small-caps text-muted-foreground">{tier.cadence}</span>
            </div>

            <ul className="mt-7 flex-1 space-y-3.5">
              {tier.features.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-[0.97rem] leading-snug text-foreground/85">
                  <Check size={16} strokeWidth={2} className="mt-1 shrink-0 text-accent" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <Button
              href="#"
              variant={tier.featured ? "primary" : "outline"}
              className="mt-9 w-full"
            >
              {tier.cta}
            </Button>
          </Card>
        ))}
      </div>

      <p className="mx-auto mt-12 max-w-md text-center text-sm italic text-muted-foreground">
        Every membership renews by hand and may be passed to a friend. No auto-renewal, ever.
      </p>
    </Section>
  );
}
