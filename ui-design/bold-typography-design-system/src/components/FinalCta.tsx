import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { finalCta } from "../data/content";
import { Input } from "./Primitives";
import { Button } from "./Button";

// ─────────────────────────────────────────────────────────────────────────────
// Final CTA — the system's "inverted section". `.theme-invert` flips the tokens
// so this whole block renders as a warm-white poster while every component keeps
// using the same token names. The email field uses the inverted input treatment
// (transparent fill, semi-transparent border, accent focus). Input + button stack
// on mobile and sit side-by-side from sm up.
// ─────────────────────────────────────────────────────────────────────────────

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <section id="final-cta" className="theme-invert relative overflow-hidden bg-background py-24 md:py-32 lg:py-40">
      {/* Decorative oversized word behind the headline (hidden on mobile) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-6 bottom-0 hidden select-none text-[16rem] font-extrabold leading-none tracking-tighter text-foreground/[0.04] md:block lg:text-[24rem]"
      >
        SET
      </span>

      <div className="container-bold relative">
        <div className="flex items-center gap-3 label-mono">
          <span aria-hidden className="h-px w-10 bg-accent" />
          {finalCta.kicker}
        </div>

        <h2 className="mt-8 max-w-[12ch] text-5xl font-extrabold leading-[0.95] tracking-tighter text-foreground sm:text-7xl md:text-8xl">
          {finalCta.headline.map((line, i) => (
            <span key={line} className={`block ${i === finalCta.headline.length - 1 ? "text-accent" : ""}`}>
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12">
          <p className="max-w-md text-lg leading-normal text-muted-foreground lg:col-span-5">{finalCta.body}</p>

          <div className="lg:col-span-6 lg:col-start-7">
            {sent ? (
              <p className="flex items-center gap-3 text-lg font-semibold text-foreground" role="status">
                <Check size={20} strokeWidth={1.5} className="text-accent" aria-hidden />
                You're on the list. Check your inbox.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:flex-row">
                <label htmlFor="cta-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="cta-email"
                  name="email"
                  type="email"
                  inverted
                  required
                  placeholder={finalCta.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="sm:flex-1"
                  autoComplete="email"
                />
                {/* Outline button inverts against the white ground */}
                <Button type="submit" variant="outline" size="lg" className="shrink-0 justify-center">
                  {finalCta.button}
                  <ArrowRight size={18} strokeWidth={1.5} />
                </Button>
              </form>
            )}
            <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted-foreground">{finalCta.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
