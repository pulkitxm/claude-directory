import { Reveal, SectionHeading } from "./Primitives";
import { cn } from "../lib/cn";

const STEPS = [
  {
    n: "01",
    title: "Point it at your repo",
    body: "Run npx aperture init. We detect the framework, the regions you care about, and your env in under a second.",
  },
  {
    n: "02",
    title: "Open the surface",
    body: "Hit ⌘K from anywhere — your editor, your terminal, your phone. The whole platform fits in one palette.",
  },
  {
    n: "03",
    title: "Ship, watch, sleep",
    body: "Deploy streams a live trace. If p99 drifts, Aperture pages you with the exact function — or rolls back itself.",
  },
];

/** A small, syntax-tinted code sample rendered as styled spans. */
function CodeSample() {
  return (
    <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed md:p-6 md:text-[13px]">
      <code className="block">
        <span className="text-muted-foreground/60"># aperture.config.ts</span>
        {"\n"}
        <span className="text-purple-300/90">import</span>{" "}
        <span className="text-foreground/90">{"{ defineRuntime }"}</span>{" "}
        <span className="text-purple-300/90">from</span>{" "}
        <span className="text-emerald-300/90">"aperture"</span>
        {"\n\n"}
        <span className="text-purple-300/90">export default</span>{" "}
        <span className="text-amber-300/90">defineRuntime</span>
        <span className="text-foreground/80">({"{"}</span>
        {"\n"}
        {"  "}
        <span className="text-sky-300/90">regions</span>
        <span className="text-foreground/80">: [</span>
        <span className="text-emerald-300/90">"iad"</span>
        <span className="text-foreground/80">, </span>
        <span className="text-emerald-300/90">"fra"</span>
        <span className="text-foreground/80">, </span>
        <span className="text-emerald-300/90">"hnd"</span>
        <span className="text-foreground/80">],</span>
        {"\n"}
        {"  "}
        <span className="text-sky-300/90">onDrift</span>
        <span className="text-foreground/80">: </span>
        <span className="text-amber-300/90">rollback</span>
        <span className="text-foreground/80">(</span>
        <span className="text-emerald-300/90">"last-green"</span>
        <span className="text-foreground/80">),</span>
        {"\n"}
        {"  "}
        <span className="text-sky-300/90">secrets</span>
        <span className="text-foreground/80">: </span>
        <span className="text-emerald-300/90">"edge"</span>
        <span className="text-foreground/80">,</span>
        {"\n"}
        <span className="text-foreground/80">{"})"}</span>
      </code>
    </pre>
  );
}

export function Workflow() {
  return (
    <section id="workflow" className="section-y relative">
      {/* faint top hairline to separate the section in the dark */}
      <div className="container-x">
        <div className="hairline mb-20 opacity-70 md:mb-28" />

        <SectionHeading
          align="left"
          eyebrow="The workflow"
          title="Three steps from clone to calm."
          lede="No YAML graveyards, no twelve-tab dashboards. A configuration you can read aloud and a surface you can drive blind."
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* steps */}
          <ol className="relative flex flex-col">
            {/* vertical guide line */}
            <span className="absolute left-[26px] top-2 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-accent/40 via-white/10 to-transparent" />
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 100} className="relative pb-10 last:pb-0">
                <div className="flex gap-6">
                  <span
                    className={cn(
                      "relative z-10 grid h-[54px] w-[54px] shrink-0 place-items-center rounded-xl border border-white/[0.1] bg-background-alt font-mono text-sm font-medium text-accent",
                      "shadow-glow-sm",
                    )}
                  >
                    {s.n}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-display text-xl font-medium tracking-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>

          {/* code panel */}
          <Reveal delay={120}>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent/[0.05] blur-3xl" />
              <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-background-alt/80 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
                  <span className="ml-3 font-mono text-[11px] tracking-wide text-muted-foreground">
                    aperture.config.ts
                  </span>
                </div>
                <CodeSample />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
