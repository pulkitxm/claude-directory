import { Section } from "@/components/ui/primitives";

const ITEMS = [
  "Tide Pool",
  "Night Harbor",
  "Rain on Glass",
  "Slow Tide",
  "Deep Field",
  "Pine Static",
  "Open Window",
  "Drift",
];

/** A seamless strip of the named soundscapes — the product's own vocabulary. */
export function Marquee() {
  return (
    <Section className="py-14">
      <p className="mb-6 text-center font-mono text-[0.6875rem] tracking-data text-haze">
        TWELVE LIVING SOUNDSCAPES · EACH ONE NEVER LOOPS THE SAME WAY TWICE
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-10 will-change-transform">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-3 text-mist"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-tide/60" />
              <span className="font-display text-xl italic text-foam/80">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
