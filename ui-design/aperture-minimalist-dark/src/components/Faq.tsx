import { useEffect, useLayoutEffect, useRef, useState, useId } from "react";
import { Plus } from "lucide-react";
import { Reveal, SectionHeading } from "./Primitives";
import { cn } from "../lib/cn";

const ITEMS = [
  {
    q: "Do I have to learn a new CLI?",
    a: "No. Aperture wraps the framework you already use. npx aperture init detects your setup, and ⌘K exposes every action without a single new command to memorise.",
  },
  {
    q: "What happens when a deploy goes bad at 3am?",
    a: "Aperture streams a live trace as it ships. If p99 latency or error rate drifts past your threshold, it pages you with the exact function — and, if you opted in, reverts to the last green snapshot automatically.",
  },
  {
    q: "Where does my data actually run?",
    a: "On the edge regions you choose — iad, fra, hnd, gru, syd, cdg, and more. Secrets are encrypted per environment and never printed to a log, even in verbose mode.",
  },
  {
    q: "Can my whole team use one keyboard surface?",
    a: "Yes. Roles, SSO, and audit logs are built in on Studio and Scale. Everyone drives the same ⌘K palette, scoped to what they’re allowed to touch.",
  },
  {
    q: "Is there really a free tier forever?",
    a: "Solo is free with no card, no expiry, and two edge regions. It’s the plan we use for our own side projects — we’d feel weird shipping anything less.",
  },
];

function FaqRow({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const id = useId();
  // Measure the answer's natural height so the max-height transition has an
  // exact target for any content length (no render-time layout read, no clip).
  const [contentH, setContentH] = useState(0);
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    setContentH(el.scrollHeight);
  }, [a]);
  useEffect(() => {
    const el = innerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setContentH(el.scrollHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="border-b border-white/[0.07]">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none"
        >
          <span
            className={cn(
              "font-display text-lg font-medium tracking-tight transition-colors duration-200 md:text-xl",
              open
                ? "text-foreground"
                : "text-foreground/80 group-hover:text-foreground group-focus-visible:text-accent",
            )}
          >
            {q}
          </span>
          <span
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ease-out-soft",
              open
                ? "rotate-45 border-accent/40 bg-accent/10 text-accent"
                : "border-white/10 text-muted-foreground group-hover:border-white/25 group-hover:text-foreground",
            )}
          >
            <Plus size={16} strokeWidth={1.75} />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        style={{ maxHeight: open ? `${contentH}px` : "0px" }}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out-soft",
          open ? "opacity-100" : "opacity-0",
        )}
      >
        <p
          ref={innerRef}
          className="max-w-2xl pb-6 pr-12 text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          {a}
        </p>
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-y relative">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title="Questions, answered."
            lede="Still curious? The docs go deeper, and a real human reads every email."
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <Reveal>
            <div className="flex flex-col">
              {ITEMS.map((it, i) => (
                <FaqRow
                  key={it.q}
                  q={it.q}
                  a={it.a}
                  open={open === i}
                  onToggle={() => setOpen((cur) => (cur === i ? null : i))}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
