import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { TideCanvas } from "@/components/ui/TideCanvas";
import { Section } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type State = "idle" | "error" | "done";

export function CTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setState(ok ? "done" : "error");
  };

  return (
    <Section id="cta" className="py-24 sm:py-32">
      <div className="relative overflow-hidden rounded-[28px] border border-line-bright bg-deep px-6 py-16 text-center sm:px-10 sm:py-24">
        {/* the tide returns, dimmer, behind the CTA */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <TideCanvas />
          <div className="absolute inset-0 bg-[radial-gradient(110%_120%_at_50%_120%,transparent_20%,rgb(var(--deep))_75%)]" />
        </div>

        <div className="relative mx-auto max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-foam"
          >
            Your next deep hour
            <br />
            is one tap away.
          </motion.h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-mist">
            Start free with one intention a day. No card, no trial countdown —
            just the tide whenever you need it.
          </p>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
            noValidate
          >
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state !== "idle") setState("idle");
                }}
                placeholder="you@studio.com"
                aria-label="Email address"
                aria-invalid={state === "error"}
                disabled={state === "done"}
                className={cn(
                  "h-12 w-full rounded-pill border bg-ink/70 px-5 text-sm text-foam placeholder:text-haze transition-colors duration-200 focus:outline-none focus-visible:border-tide focus-visible:ring-2 focus-visible:ring-tide/40 disabled:opacity-60",
                  state === "error" ? "border-coral" : "border-line-bright"
                )}
              />
            </div>
            <button
              type="submit"
              disabled={state === "done"}
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-pill bg-tide px-6 text-sm font-medium text-abyss shadow-glow transition-all duration-300 ease-tide hover:bg-glow disabled:bg-tide/80"
            >
              {state === "done" ? (
                <>
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                  You're in
                </>
              ) : (
                <>
                  Get started
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-tide group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </form>

          <p
            className={cn(
              "mt-4 min-h-[1.25rem] font-mono text-[0.6875rem] tracking-data transition-colors",
              state === "error" && "text-coral",
              state === "done" && "text-tide",
              state === "idle" && "text-haze"
            )}
            role={state === "error" ? "alert" : undefined}
            aria-live="polite"
          >
            {state === "error" && "THAT EMAIL DOESN'T LOOK RIGHT — TRY AGAIN"}
            {state === "done" && "CHECK YOUR INBOX FOR THE FIRST SESSION"}
            {state === "idle" && "FREE FOREVER · NO CARD · LEAVE ANY TIME"}
          </p>
        </div>
      </div>
    </Section>
  );
}
