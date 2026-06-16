import { useEffect, useState } from "react";
import { useReveal } from "../lib/useReveal";

type Stat = {
  /** numeric target for the count-up */
  value: number;
  /** how to render the number (decimals) */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 11.4, decimals: 1, suffix: "s", label: "Median deploy" },
  { value: 42, suffix: "ms", label: "p99 cold start" },
  { value: 6, suffix: " regions", label: "Replicated by default" },
  { value: 99.99, decimals: 2, suffix: "%", label: "Edge uptime" },
];

function useCountUp(target: number, run: boolean, durationMs = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, durationMs]);
  return val;
}

function StatCell({ stat, run }: { stat: Stat; run: boolean }) {
  const val = useCountUp(stat.value, run);
  const display =
    (stat.prefix ?? "") +
    val.toLocaleString("en-US", {
      minimumFractionDigits: stat.decimals ?? 0,
      maximumFractionDigits: stat.decimals ?? 0,
    }) +
    (stat.suffix ?? "");
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-8 text-center md:py-10">
      <span className="font-display text-4xl font-semibold tracking-tight text-foreground tabular-nums md:text-5xl">
        {display}
      </span>
      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        {stat.label}
      </span>
    </div>
  );
}

export function Stats() {
  const { ref, shown } = useReveal<HTMLDivElement>({ threshold: 0.4 });
  return (
    <section className="relative">
      <div className="container-x">
        <div
          ref={ref}
          className="grid grid-cols-2 divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.08] bg-background-alt/50 backdrop-blur-sm sm:divide-y-0 md:grid-cols-4 md:divide-x"
        >
          {STATS.map((s) => (
            <StatCell key={s.label} stat={s} run={shown} />
          ))}
        </div>
      </div>
    </section>
  );
}
