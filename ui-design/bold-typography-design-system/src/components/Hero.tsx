import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { hero } from "../data/content";
import { Button } from "./Button";
import { CRISP } from "../motion";

// ─────────────────────────────────────────────────────────────────────────────
// Hero — the manifesto opener. The headline is the visual centerpiece: it scales
// from text-4xl on mobile up to text-8xl on desktop, with one accent line. A huge
// "001" numeral drifts behind it on scroll for layered depth, and the load runs a
// crisp per-line reveal (no bounce). Edge-to-edge headline framed by generous space.
// ─────────────────────────────────────────────────────────────────────────────

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Decorative numeral parallax — drifts up and fades as you scroll past the hero.
  const numeralY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const numeralOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-32 md:pt-40 lg:pt-48">
      {/* Oversized decorative numeral behind the type (hidden on mobile to avoid
          overflow). Kept barely-there and pushed to the upper-right so it frames
          the headline rather than competing with it. */}
      <motion.span
        aria-hidden
        style={{ y: numeralY, opacity: numeralOpacity }}
        className="pointer-events-none absolute -right-6 -top-2 hidden select-none text-[16rem] font-extrabold leading-none tracking-tighter text-foreground/[0.035] md:block lg:text-[22rem]"
      >
        001
      </motion.span>

      <div className="container-bold relative pb-20 md:pb-28 lg:pb-32">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: CRISP, delay: 0.05 }}
          className="mb-8 flex items-center gap-3 label-mono"
        >
          <span aria-hidden className="h-px w-10 bg-accent" />
          {hero.kicker}
        </motion.div>

        {/* Headline — type as hero */}
        <h1 className="max-w-[14ch] text-[15vw] font-extrabold leading-[0.92] tracking-tighter sm:text-7xl md:text-8xl lg:text-[9rem]">
          {hero.headline.map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: CRISP, delay: 0.12 + i * 0.08 }}
              className={`block ${i === hero.accentLine ? "text-accent" : "text-foreground"}`}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Asymmetric lower row: lead + actions sit right of center (7/5 feel) */}
        <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: CRISP, delay: 0.4 }}
            className="lg:col-span-5 lg:col-start-1"
          >
            <span className="accent-bar mb-6" />
            <p className="max-w-md text-base leading-normal text-muted-foreground md:text-lg">{hero.lead}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: CRISP, delay: 0.5 }}
            className="flex flex-col items-start gap-6 sm:flex-row sm:items-center lg:col-span-5 lg:col-start-8 lg:justify-end"
          >
            <Button href="#manifesto" variant="primary" size="lg">
              {hero.primaryCta}
              <ArrowRight size={18} strokeWidth={1.5} />
            </Button>
            <Button href="#features" variant="outline" size="lg">
              {hero.secondaryCta}
            </Button>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 flex items-center gap-3 label-mono md:mt-24"
        >
          <motion.span
            aria-hidden
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-accent"
          >
            <ArrowDown size={18} strokeWidth={1.5} />
          </motion.span>
          Scroll to read
        </motion.div>
      </div>
    </section>
  );
}
