import { motion } from "framer-motion";
import { Moon, CloudRain, Trees, Anchor } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Eyebrow,
  Section,
  staggerChild,
  staggerParent,
} from "@/components/ui/primitives";

type Scape = {
  name: string;
  icon: LucideIcon;
  mood: string;
  meta: string;
  from: string;
  to: string;
  span: string;
};

const SCAPES: Scape[] = [
  {
    name: "Night Harbor",
    icon: Anchor,
    mood: "Low water, distant hulls, a buoy bell every few minutes. For long, heads-down stretches.",
    meta: "Best for: writing",
    from: "rgb(var(--tide) / 0.20)",
    to: "rgb(var(--deep) / 0.2)",
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    name: "Rain on Glass",
    icon: CloudRain,
    mood: "A steady wash with no thunder, ever.",
    meta: "Best for: code",
    from: "rgb(var(--glow) / 0.16)",
    to: "rgb(var(--deep) / 0.2)",
    span: "",
  },
  {
    name: "Pine Static",
    icon: Trees,
    mood: "Wind through a treeline, dry and warm.",
    meta: "Best for: reading",
    from: "rgb(var(--amber) / 0.14)",
    to: "rgb(var(--deep) / 0.2)",
    span: "",
  },
  {
    name: "Slow Tide",
    icon: Moon,
    mood: "The house track. Bioluminescent swells that rise and fall on a six-minute breath — our most-played soundscape, three nights running.",
    meta: "Best for: anything",
    from: "rgb(var(--coral) / 0.16)",
    to: "rgb(var(--deep) / 0.2)",
    span: "sm:col-span-2",
  },
];

/** A tiny animated waveform that lives in the corner of each card. */
function Waveform() {
  return (
    <div className="flex items-end gap-[3px]" aria-hidden="true">
      {[10, 18, 8, 22, 14, 26, 12, 20, 9].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-foam/40"
          animate={{ height: [h, h * 0.4, h] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
          style={{ height: h }}
        />
      ))}
    </div>
  );
}

export function Soundscapes() {
  return (
    <Section id="soundscapes" className="py-24 sm:py-32">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <Eyebrow marker="♪">The soundscapes</Eyebrow>
          <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight tracking-tight text-foam">
            Sound that thinks
            <br />
            <span className="text-mist">in tides, not tracks.</span>
          </h2>
        </div>
        <p className="max-w-xs text-[0.975rem] leading-relaxed text-mist">
          Twelve generative beds, each tuned to a kind of work. They never loop,
          so your ear never learns the pattern — and never tunes them out.
        </p>
      </div>

      <motion.div
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="mt-14 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {SCAPES.map((s) => (
          <motion.article
            key={s.name}
            variants={staggerChild}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-card border border-line bg-deep/50 p-6 transition-all duration-300 ease-tide hover:-translate-y-1 hover:border-line-bright hover:shadow-lift ${s.span}`}
          >
            {/* mood wash */}
            <div
              className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(120% 90% at 100% 0%, ${s.from}, ${s.to} 70%)`,
              }}
            />
            <div className="relative flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-bright bg-ink/60 backdrop-blur-sm">
                <s.icon className="h-5 w-5 text-foam" strokeWidth={1.6} />
              </div>
              <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Waveform />
              </div>
            </div>

            <div className="relative">
              <h3 className="font-display text-2xl font-medium text-foam">
                {s.name}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-mist">
                {s.mood}
              </p>
              <span className="mt-4 inline-block font-mono text-[0.625rem] tracking-data text-foam/55">
                {s.meta.toUpperCase()}
              </span>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
}
