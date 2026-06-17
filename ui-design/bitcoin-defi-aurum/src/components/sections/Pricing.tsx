import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { IconTile } from "@/components/ui/IconTile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRICING, type PricingTier } from "@/data/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24" aria-label="Vault tiers">
      <Container>
        <SectionHeading
          kicker="vaults"
          title="Choose your"
          accent="vault tier"
          description="Transparent, on-chain fees with no hidden spreads. Start free and self-sovereign, scale to an institutional treasury desk."
        />

        <div className="mt-16 grid items-stretch gap-6 md:grid-cols-3 md:gap-6 lg:gap-8">
          {PRICING.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 90} className="flex">
              <PricingCard tier={tier} />
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-xs uppercase tracking-widest text-stardust">
          All tiers are non-custodial · Cancel anytime · No lockups
        </p>
      </Container>
    </section>
  );
}

function PricingCard({ tier }: { tier: PricingTier }) {
  const popular = tier.popular;
  return (
    <div
      className={cn(
        "relative flex w-full flex-col rounded-2xl border p-8 transition-all duration-300",
        popular
          ? "z-10 border-orange/60 bg-matter shadow-tier md:scale-105"
          : "border-white/10 bg-matter opacity-90 hover:-translate-y-1 hover:border-orange/40 hover:opacity-100 md:opacity-80",
      )}
    >
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge tone="orange" className="border-orange/50 bg-void">
            Most Popular
          </Badge>
        </div>
      )}

      {/* faint grid on the popular tier for extra depth */}
      {popular && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl bg-grid-fine opacity-[0.04]"
          aria-hidden="true"
        />
      )}

      <div className="relative flex items-center justify-between">
        <div>
          <h3 className="font-heading text-2xl font-semibold text-white">
            {tier.name}
          </h3>
          <p className="mt-1 max-w-[14rem] text-sm leading-relaxed text-stardust">
            {tier.blurb}
          </p>
        </div>
        <IconTile icon={tier.icon} tone={popular ? "gold" : "orange"} />
      </div>

      <div className="relative mt-6 flex items-end gap-2">
        <span
          className={cn(
            "font-heading text-4xl font-bold tracking-tight",
            popular ? "text-gradient" : "text-white",
          )}
        >
          {tier.price}
        </span>
        <span className="mb-1 font-mono text-xs uppercase tracking-wider text-stardust">
          {tier.cadence}
        </span>
      </div>

      <div className="relative my-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <ul className="relative flex flex-1 flex-col gap-3.5">
        {tier.features.map((feat) => (
          <li key={feat} className="flex items-start gap-3 text-sm text-white/90">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                popular
                  ? "border-orange/50 bg-orange/15 text-orange"
                  : "border-white/15 bg-white/5 text-stardust",
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {feat}
          </li>
        ))}
      </ul>

      <div className="relative mt-8">
        <Button
          variant={popular ? "primary" : "outline"}
          className="w-full"
          size="md"
        >
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}
