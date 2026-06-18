const ITEMS = [
  "shadcn project structure",
  "Tailwind CSS v4",
  "TypeScript strict",
  "@/components/ui/hive",
  "WebGL2 fragment shader",
  "zero runtime deps",
  "self-contained rAF loop",
  "DPR-aware resize",
  "prefers-reduced-motion safe",
  "offline-ready",
];

/**
 * A quiet marquee strip that bridges the hero and the docs. Duplicated content
 * so the -50% translate loops seamlessly.
 */
export function IntegrationTicker() {
  const run = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-10 overflow-hidden border-y border-[rgba(228,200,255,0.1)] bg-[rgba(10,7,18,0.5)] py-3 backdrop-blur">
      <div className="marquee">
        {run.map((item, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-center gap-3 font-mono text-[12px] tracking-wide text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-amber/70" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
