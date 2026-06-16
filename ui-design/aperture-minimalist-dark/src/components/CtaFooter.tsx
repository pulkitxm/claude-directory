import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button, Reveal } from "./Primitives";
import { Logo } from "./Logo";

const FOOTER_COLUMNS: { title: string; links: string[] }[] = [
  { title: "Product", links: ["Runtime", "Edge DB", "Traces", "Changelog"] },
  { title: "Developers", links: ["Docs", "CLI reference", "Status", "API"] },
  { title: "Company", links: ["About", "Careers", "Blog", "Contact"] },
];

function CtaCard() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || done) return;
    setDone(true);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-background-alt/60 px-6 py-14 text-center backdrop-blur-xl md:px-16 md:py-20">
      {/* inner ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.1] blur-[90px]" />
      <div className="grid-layer pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000,transparent)]" />

      <div className="relative">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Turn the lights down.
            <br />
            <span className="text-ember">Ship something tonight.</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Drop your email for the changelog, or skip it entirely and run{" "}
            <span className="font-mono text-foreground/80">npx aperture init</span>{" "}
            right now.
          </p>
        </Reveal>

        <Reveal delay={170}>
          <form
            onSubmit={onSubmit}
            className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="cta-email" className="sr-only">
              Email address
            </label>
            <input
              id="cta-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@after-midnight.dev"
              disabled={done}
              className="input flex-1"
            />
            <Button
              type="submit"
              variant="primary"
              className="shrink-0 sm:w-auto"
            >
              {done ? (
                <>
                  <Check size={16} strokeWidth={2} />
                  Subscribed
                </>
              ) : (
                <>
                  Notify me
                  <ArrowRight size={16} strokeWidth={2} />
                </>
              )}
            </Button>
          </form>
        </Reveal>

        <Reveal delay={230}>
          <p className="mt-5 font-mono text-xs tracking-wide text-muted-foreground/70">
            {done
              ? "✓ See you in your inbox. No spam, only changelogs."
              : "One email a month. Unsubscribe in one keystroke."}
          </p>
        </Reveal>
      </div>
    </div>
  );
}

export function CtaFooter() {
  return (
    <footer className="relative">
      <div className="container-x">
        <div className="section-y">
          <CtaCard />
        </div>

        <div className="hairline opacity-60" />

        <div className="grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* brand */}
          <div className="flex flex-col gap-4">
            <a
              href="#top"
              className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Logo className="h-7 w-7" />
              <span className="font-display text-lg font-semibold tracking-tight text-foreground">
                Aperture
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              The command surface for the quiet hours. Built by people who ship
              after midnight, for people who do the same.
            </p>
            <div className="mt-1 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              All systems operational
            </div>
          </div>

          {/* link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="nav-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-8 sm:flex-row">
          <p className="font-mono text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Aperture Labs — a fictional product for
            a design-system demo.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="nav-link">
              Privacy
            </a>
            <a href="#" className="nav-link">
              Terms
            </a>
            <a href="#" className="nav-link">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
