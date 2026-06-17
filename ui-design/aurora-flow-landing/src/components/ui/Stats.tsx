import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Section } from "@/components/ui/primitives";

type Stat = {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
};

const STATS: Stat[] = [
  { value: 41, suffix: " min", label: "Median time in deep focus per session" },
  { value: 2.3, suffix: "M", decimals: 1, label: "Sessions finished this year" },
  { value: 12, suffix: "", label: "Living soundscapes, none on a loop" },
  { value: 96, suffix: "%", label: "Come back the next day" },
];

function useCountUp(target: number, decimals: number, run: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    const dur = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, decimals]);
  return decimals ? val.toFixed(decimals) : Math.round(val).toString();
}

function Metric({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const display = useCountUp(stat.value, stat.decimals ?? 0, inView);

  return (
    <div ref={ref} className="px-2">
      <div className="font-display text-4xl font-semibold text-foam sm:text-5xl">
        {display}
        <span className="text-tide">{stat.suffix}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-mist">{stat.label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <Section className="py-16">
      <div className="rounded-card border border-line bg-deep/40 px-6 py-12 sm:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
          {STATS.map((s) => (
            <Metric key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </Section>
  );
}
