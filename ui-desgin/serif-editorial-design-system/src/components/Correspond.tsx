import { useState } from "react";
import { hero } from "../data/content";
import { Button } from "./Button";
import { SectionLabel } from "./Primitives";

/* Reusable input following the Serif input spec: h-12, transparent ground,
   gold focus ring + border, 150ms ease-out, subtle placeholder. */
function Field({
  id,
  label,
  type = "text",
  placeholder,
  as = "input",
}: {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  as?: "input" | "textarea";
}) {
  const shared =
    "w-full rounded-md border border-border bg-transparent px-4 text-base text-foreground placeholder:text-muted-foreground/60 transition-all duration-150 ease-out hover:border-border-hover focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background";
  return (
    <div>
      <label htmlFor={id} className="small-caps mb-2.5 block text-muted-foreground">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea id={id} rows={4} placeholder={placeholder} className={`${shared} resize-none py-3`} />
      ) : (
        <input id={id} type={type} placeholder={placeholder} className={`${shared} h-12`} />
      )}
    </div>
  );
}

export function Correspond() {
  const [sent, setSent] = useState(false);

  return (
    <section id="correspond" className="relative z-10 overflow-hidden py-24 md:py-32">
      {/* full-bleed inverted panel for contrast — ivory ground breaks here */}
      <div className="container-reading">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground text-background shadow-lg">
          {/* ambient gold inside the dark panel */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          />
          <div className="relative grid grid-cols-1 gap-12 p-9 md:grid-cols-[1fr_1fr] md:gap-16 md:p-14">
            {/* invitation copy */}
            <div className="self-center">
              <div className="mb-7 flex items-center gap-4">
                <span className="small-caps text-accent-secondary">An Invitation</span>
                <span className="h-px w-16 bg-background/25" aria-hidden />
              </div>
              <h2
                className="font-display leading-[1.12] tracking-[-0.01em] text-background"
                style={{ fontSize: "clamp(2rem, 4.6vw, 3.1rem)" }}
              >
                Join the house, and read more slowly.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-background/70">
                {hero.lede}
              </p>
              <div className="mt-9 flex items-center gap-3 text-background/60">
                <span className="h-px w-8 bg-background/25" aria-hidden />
                <span className="small-caps">We reply to every letter, by hand</span>
              </div>
            </div>

            {/* request form */}
            <form
              className="rounded-xl border border-background/15 bg-background/5 p-7 md:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <SectionLabel align="left" tone="onDark" className="mb-7">
                Request an invitation
              </SectionLabel>
              <div className="grid gap-5">
                <Field id="name" label="Your name" placeholder="A. N. Author" />
                <Field id="email" label="Where to write" type="email" placeholder="you@example.com" />
                <Field
                  id="note"
                  label="A word on what you read"
                  as="textarea"
                  placeholder="The last book you finished, and why…"
                />
              </div>
              <Button type="submit" variant="primary" className="mt-7 w-full">
                {sent ? "Thank you — we'll be in touch" : "Send my request"}
              </Button>
              <p className="mt-4 text-center text-xs italic text-background/50">
                No newsletters. No spam. A single, considered reply.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
