import { TICKER_ITEMS } from "@/data/content";

/**
 * Live-data ticker — a seamless scrolling marquee bounded by subtle top/bottom
 * borders (the design system's preferred section divider). Pauses on hover.
 */
export function Ticker() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      aria-label="Live network statistics"
      className="relative border-y border-white/10 bg-matter/60"
    >
      <div className="mask-fade-x overflow-hidden py-4">
        <div className="pause-on-hover flex w-max animate-ticker items-center">
          {items.map((item, i) => (
            <div key={i} className="flex items-center" aria-hidden={i >= TICKER_ITEMS.length}>
              <span className="mx-6 flex items-center gap-2.5 whitespace-nowrap font-mono text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-orange shadow-glow" />
                <span className="uppercase tracking-wider text-stardust">
                  {item.label}
                </span>
                <span className="font-medium text-white">{item.value}</span>
              </span>
              <span className="text-white/15">/</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
