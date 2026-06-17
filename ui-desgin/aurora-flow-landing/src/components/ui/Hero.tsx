import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Waves } from "lucide-react";
import { TideCanvas } from "@/components/ui/TideCanvas";
import { Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const SESSION_SECONDS = 50 * 60; // a 50-minute deep-work block

function fmt(total: number) {
  const m = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(total % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

/**
 * The session dial — a breathing ring with a live countdown. This is the hero's
 * thesis: starting a session is one tap, and the surface keeps your attention.
 */
function SessionDial() {
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(SESSION_SECONDS);
  const raf = useRef<number>(0);
  const last = useRef<number>(0);

  useEffect(() => {
    if (!running) return;
    last.current = performance.now();
    const tick = (now: number) => {
      const dt = (now - last.current) / 1000;
      last.current = now;
      setRemaining((r) => {
        const next = r - dt;
        if (next <= 0) {
          setRunning(false);
          return 0;
        }
        return next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);

  const progress = 1 - remaining / SESSION_SECONDS;
  const R = 132;
  const C = 2 * Math.PI * R;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative h-[300px] w-[300px]">
        {/* soft halo */}
        <div
          className={cn(
            "absolute inset-6 rounded-full blur-2xl transition-opacity duration-1000",
            running ? "opacity-70 animate-breathe" : "opacity-40"
          )}
          style={{
            background:
              "radial-gradient(circle, rgb(var(--tide) / 0.45), rgb(var(--coral) / 0.12) 60%, transparent 72%)",
          }}
        />
        <svg viewBox="0 0 300 300" className="absolute inset-0 -rotate-90">
          <defs>
            <linearGradient id="dial" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="rgb(var(--glow))" />
              <stop offset="0.55" stopColor="rgb(var(--tide))" />
              <stop offset="1" stopColor="rgb(var(--coral))" />
            </linearGradient>
          </defs>
          {/* track */}
          <circle
            cx="150"
            cy="150"
            r={R}
            fill="none"
            stroke="rgb(var(--line-bright) / 0.6)"
            strokeWidth="2"
          />
          {/* progress */}
          <circle
            cx="150"
            cy="150"
            r={R}
            fill="none"
            stroke="url(#dial)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.2s linear" }}
          />
          {/* tick marks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i / 60) * Math.PI * 2;
            const r1 = R + 12;
            const r2 = R + (i % 5 === 0 ? 20 : 16);
            return (
              <line
                key={i}
                x1={150 + Math.cos(a) * r1}
                y1={150 + Math.sin(a) * r1}
                x2={150 + Math.cos(a) * r2}
                y2={150 + Math.sin(a) * r2}
                stroke="rgb(var(--line-bright))"
                strokeWidth={i % 5 === 0 ? 1.5 : 1}
                opacity={i % 5 === 0 ? 0.8 : 0.4}
              />
            );
          })}
        </svg>

        {/* center readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="label mb-2 text-haze">
            {running ? "In the current" : "Ready"}
          </span>
          <span className="font-mono text-5xl font-medium tracking-tight text-foam tabular-nums">
            {fmt(remaining)}
          </span>
          <span className="mt-2 font-mono text-[0.6875rem] tracking-data text-mist">
            DEEP FOCUS · 50 MIN
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (remaining <= 0) setRemaining(SESSION_SECONDS);
          setRunning((v) => !v);
        }}
        className="group -mt-2 flex items-center gap-2.5 rounded-pill border border-line-bright bg-shelf/40 px-6 py-3 text-sm font-medium text-foam backdrop-blur-md transition-all duration-300 ease-tide hover:border-tide/60 hover:bg-shelf/60"
      >
        {running ? (
          <Pause className="h-4 w-4 text-tide" />
        ) : (
          <Play className="h-4 w-4 fill-tide text-tide" />
        )}
        {running ? "Pause the session" : remaining <= 0 ? "Begin again" : "Begin the session"}
      </button>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-20 pt-32 sm:px-8"
    >
      {/* the living tide */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <TideCanvas />
        {/* vignette + depth so text always reads */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,transparent_30%,rgb(var(--ink))_82%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* copy */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-pill border border-line-bright bg-shelf/30 py-1.5 pl-2 pr-4 backdrop-blur-md"
          >
            <span className="flex h-6 items-center gap-1.5 rounded-pill bg-tide/15 px-2.5 text-tide">
              <Waves className="h-3.5 w-3.5" />
              <span className="font-mono text-[0.625rem] font-medium tracking-data">
                NEW
              </span>
            </span>
            <span className="text-xs text-mist">
              Generative soundscapes that follow your focus
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="font-display mt-6 text-[clamp(2.75rem,6vw,4.75rem)] font-semibold leading-[0.98] tracking-tight text-foam"
          >
            Slip into the
            <br />
            current and{" "}
            <span className="text-tideink italic">stay there</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            className="mt-6 max-w-md text-base leading-relaxed text-mist sm:text-lg"
          >
            Tide turns deep work into a ritual. Set an intention, drift into a
            living soundscape, and let the rhythm of the session carry your
            attention long past where willpower runs out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button href="#cta" icon>
              Start your first session
            </Button>
            <Button href="#ritual" variant="ghost">
              See how a session flows
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-7 font-mono text-[0.6875rem] tracking-data text-haze"
          >
            FREE FOREVER FOR ONE INTENTION A DAY · NO CARD
          </motion.p>
        </div>

        {/* the dial */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <SessionDial />
        </motion.div>
      </div>
    </section>
  );
}
