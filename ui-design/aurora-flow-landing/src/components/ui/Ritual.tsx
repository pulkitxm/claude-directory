import { Compass, Waves, Sunrise } from "lucide-react";
import { motion } from "framer-motion";
import {
  Eyebrow,
  Reveal,
  Section,
  staggerChild,
  staggerParent,
} from "@/components/ui/primitives";

const STEPS = [
  {
    icon: Compass,
    marker: "01",
    title: "Set one intention",
    body: "Name the single thing this block is for. Tide hides everything else, picks a soundscape to match the work, and starts the clock — no setup, no decisions.",
    aside: "Average setup: 9 seconds",
  },
  {
    icon: Waves,
    marker: "02",
    title: "Drift into the current",
    body: "The soundscape breathes with your pace, gently masking interruptions. Look away and the surface keeps its rhythm; the only feedback is the ring, quietly filling.",
    aside: "Generative · never the same twice",
  },
  {
    icon: Sunrise,
    marker: "03",
    title: "Surface and log it",
    body: "When the tide goes out, you get a soft chime and a one-line prompt: what moved? Each session strings into a streak you can actually feel building.",
    aside: "One line, then you're done",
  },
];

export function Ritual() {
  return (
    <Section id="ritual" className="py-24 sm:py-32">
      <div className="max-w-2xl">
        <Eyebrow marker="§">The ritual</Eyebrow>
        <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight tracking-tight text-foam">
          A session has a shape.
          <br />
          <span className="text-mist">Three movements, every time.</span>
        </h2>
      </div>

      <motion.ol
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative mt-16 space-y-10"
      >
        {/* the flowing connector */}
        <span
          aria-hidden="true"
          className="absolute left-[27px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-tide/60 via-coral/30 to-transparent sm:block"
        />

        {STEPS.map((step) => (
          <motion.li
            key={step.marker}
            variants={staggerChild}
            className="group relative grid gap-6 sm:grid-cols-[56px_1fr] sm:gap-8"
          >
            <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line-bright bg-deep shadow-card transition-colors duration-300 group-hover:border-tide/50">
              <step.icon
                className="h-6 w-6 text-tide transition-transform duration-300 ease-tide group-hover:scale-110"
                strokeWidth={1.6}
              />
            </div>

            <div className="rounded-card border border-line bg-deep/40 p-6 transition-all duration-300 ease-tide group-hover:border-line-bright group-hover:bg-deep/70 sm:p-7">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs tracking-data text-tide">
                  {step.marker}
                </span>
                <h3 className="font-display text-2xl font-medium text-foam">
                  {step.title}
                </h3>
              </div>
              <p className="mt-3 max-w-xl text-[0.975rem] leading-relaxed text-mist">
                {step.body}
              </p>
              <Reveal className="mt-5">
                <span className="inline-flex items-center gap-2 rounded-pill bg-shelf/40 px-3 py-1.5 font-mono text-[0.6875rem] tracking-data text-foam/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-coral" />
                  {step.aside}
                </span>
              </Reveal>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
