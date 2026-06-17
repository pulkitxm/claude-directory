import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CTA() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Enter your email to spin up a board.");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setError("That doesn't look like a valid email.");
      return;
    }
    setError(null);
    setDone(true);
  }

  return (
    <section id="cta" className="relative px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-copper/30 bg-substrate-900/70 px-6 py-14 text-center shadow-panel sm:px-12 sm:py-20">
          {/* copper-foil ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 80% at 50% -10%, rgba(232,162,75,0.16), transparent 60%)",
            }}
          />
          {/* routed trace flourish */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 h-px trace-line"
          />

          <p className="relative font-mono text-[11px] uppercase tracking-[0.3em] text-mask-bright">
            U9 · Ready to fab
          </p>
          <h2 className="relative mx-auto mt-4 max-w-2xl text-balance font-display text-3xl font-bold leading-[1.05] tracking-tightest text-silk sm:text-5xl">
            Your next board is one canvas away.
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-pretty text-base leading-relaxed text-silk-dim">
            Start routing in the browser today. No install, no card, no export
            dance — just copper and a clean DRC.
          </p>

          <div className="relative mx-auto mt-9 max-w-md">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2.5 rounded-full border border-mask/40 bg-mask/[0.08] px-5 py-3.5 text-sm font-medium text-mask-bright"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  You're in. Check {email} for your studio link.
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  noValidate
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <div className="flex-1 text-left">
                    <label htmlFor="cta-email" className="sr-only">
                      Work email
                    </label>
                    <input
                      id="cta-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@hardware.co"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      aria-invalid={!!error}
                      aria-describedby={error ? "cta-email-error" : undefined}
                      className={cn(
                        "w-full rounded-full border bg-substrate-800/80 px-5 py-3.5 text-sm text-silk placeholder:text-silk-faint transition-colors focus:outline-none",
                        error
                          ? "border-copper/70"
                          : "border-substrate-500 focus:border-copper/50",
                      )}
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-copper px-6 py-3.5 text-sm font-semibold text-substrate-900 transition-all hover:bg-copper-bright hover:shadow-pad"
                  >
                    Start a board
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
            {error && (
              <p
                id="cta-email-error"
                className="mt-3 text-left text-xs font-medium text-copper-bright"
              >
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
