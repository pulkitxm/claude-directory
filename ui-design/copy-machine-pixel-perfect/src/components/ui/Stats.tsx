import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { value: 1.2, suffix: "M", prefix: "", decimals: 1, label: "Boards routed", sub: "across 9,400 teams" },
  { value: 38, suffix: "%", label: "Fewer respins", sub: "vs. desktop EDA tools" },
  { value: 6, suffix: "min", label: "Median to first DRC", sub: "from blank canvas" },
  { value: 99.98, suffix: "%", decimals: 2, label: "Gerber acceptance", sub: "at partner fabs" },
];

function Counter({ stat }: { stat: Stat }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(reduce ? stat.value : 0);

  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) setDisplay(stat.value);
      return;
    }
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, reduce, stat.value]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: stat.decimals ?? 0,
    maximumFractionDigits: stat.decimals ?? 0,
  });

  return (
    <span ref={ref} className="font-feature-mono tabular-nums">
      {stat.prefix}
      {formatted}
      {stat.suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section
      aria-label="Foundry by the numbers"
      className="relative overflow-hidden border-y border-substrate-600/60 bg-substrate-900/50 px-5 py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px trace-line"
      />
      <div className="mx-auto max-w-6xl">
        <SectionLabel designator="J2" label="Bill of materials" align="center" />
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center"
            >
              <div className="font-display text-4xl font-bold tracking-tightest text-copper-foil sm:text-5xl">
                <Counter stat={stat} />
              </div>
              <div className="mt-3 font-display text-sm font-semibold text-silk">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-silk-faint">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
