import { Check } from "lucide-react";
import { motion } from "framer-motion";
import {
  Button,
  Eyebrow,
  Section,
  staggerChild,
  staggerParent,
} from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type Tier = {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    name: "Shore",
    price: "$0",
    cadence: "free forever",
    blurb: "For finding out whether the tide pulls you in.",
    features: [
      "One intention a day",
      "Three soundscapes",
      "A seven-day streak",
      "Web and iOS",
    ],
    cta: "Start on Shore",
  },
  {
    name: "Open Water",
    price: "$8",
    cadence: "per month",
    blurb: "For people whose best hours are deep-work hours.",
    features: [
      "Unlimited sessions",
      "All twelve soundscapes",
      "Streaks that never reset",
      "Session history & exports",
      "Offline beds for travel",
    ],
    cta: "Go to Open Water",
    featured: true,
  },
  {
    name: "Fleet",
    price: "$6",
    cadence: "per seat / month",
    blurb: "For teams that protect each other's focus.",
    features: [
      "Everything in Open Water",
      "Shared quiet hours",
      "Team focus rhythm board",
      "SSO & admin controls",
    ],
    cta: "Talk to us",
  },
];

export function Pricing() {
  return (
    <Section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex justify-center">
          <Eyebrow marker="$" align="center">
            Pricing
          </Eyebrow>
        </div>
        <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight tracking-tight text-foam">
          Pay for the deep hours,
          <br />
          <span className="text-mist">not the features.</span>
        </h2>
      </div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-16 grid items-stretch gap-5 lg:grid-cols-3"
      >
        {TIERS.map((tier) => (
          <motion.div
            key={tier.name}
            variants={staggerChild}
            className={cn(
              "relative flex flex-col rounded-card border p-7 transition-all duration-300 ease-tide",
              tier.featured
                ? "border-tide/40 bg-deep shadow-glow lg:-translate-y-3 lg:scale-[1.02]"
                : "border-line bg-deep/40 hover:border-line-bright hover:bg-deep/70"
            )}
          >
            {tier.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-tide px-3 py-1 font-mono text-[0.625rem] font-medium tracking-data text-abyss">
                MOST CHOSEN
              </span>
            )}

            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-2xl font-medium text-foam">
                {tier.name}
              </h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              {tier.blurb}
            </p>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-5xl font-semibold text-foam">
                {tier.price}
              </span>
              <span className="font-mono text-[0.6875rem] tracking-data text-haze">
                {tier.cadence.toUpperCase()}
              </span>
            </div>

            <div className="my-6 h-px bg-line" />

            <ul className="flex-1 space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foam/85">
                  <span
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                      tier.featured ? "bg-tide/20 text-tide" : "bg-shelf/60 text-mist"
                    )}
                  >
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Button
              href="#cta"
              variant={tier.featured ? "primary" : "ghost"}
              className="mt-8 w-full"
            >
              {tier.cta}
            </Button>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
