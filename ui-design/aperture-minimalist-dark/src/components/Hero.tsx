import { ArrowRight, Play } from "lucide-react";
import { Badge, Button, Reveal } from "./Primitives";
import { CommandPalette } from "./CommandPalette";

const TRUSTED = [
  "Northwind",
  "Lumen Labs",
  "Vantatec",
  "Orbital",
  "Cinder",
  "Halcyon",
  "Drift",
  "Monolith",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40 lg:pt-44">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Left — copy */}
          <div className="flex flex-col items-start">
            <Reveal>
              <Badge>v4 — now with edge runtime</Badge>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-7 max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Ship software
                <br />
                in the <span className="text-ember">dark.</span>
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                Aperture is the command surface for the quiet hours — deploy,
                trace, and roll back from a single keystroke. No dashboards to
                hunt through. Just you, the work, and a warm light in the
                terminal.
              </p>
            </Reveal>

            <Reveal delay={250}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button variant="primary" href="#pricing" className="h-12 px-7">
                  Start building free
                  <ArrowRight size={17} strokeWidth={2} />
                </Button>
                <Button variant="secondary" href="#workflow" className="h-12 px-6">
                  <Play size={15} strokeWidth={1.5} className="text-accent" />
                  Watch the 90s tour
                </Button>
              </div>
            </Reveal>

            <Reveal delay={330}>
              <p className="mt-6 font-mono text-xs tracking-wide text-muted-foreground/80">
                <span className="text-accent">$</span> npx aperture init —{" "}
                <span className="text-foreground/70">no card required</span>
              </p>
            </Reveal>
          </div>

          {/* Right — command palette mock with ambient glow plinth */}
          <Reveal delay={200} className="relative">
            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-accent/[0.06] blur-3xl" />
              <div className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-accent/[0.1] blur-2xl" />
              <CommandPalette className="rotate-[0.4deg]" />
              {/* floating mono stat chip */}
              <div className="glass-card absolute -bottom-5 -left-4 hidden items-center gap-3 px-4 py-3 sm:flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <div className="font-mono text-[11px] leading-tight">
                  <div className="text-foreground">42ms p99 cold start</div>
                  <div className="text-muted-foreground">6 regions live</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* trusted-by marquee */}
        <Reveal delay={120} className="mt-24 md:mt-32">
          <p className="text-center font-mono text-xs uppercase tracking-wider text-muted-foreground/70">
            Trusted by teams that ship after midnight
          </p>
          <div className="mask-x-fade relative mt-8 flex overflow-hidden">
            <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14">
              {[...TRUSTED, ...TRUSTED].map((name, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap font-display text-lg font-medium tracking-tight text-muted-foreground/55 transition-colors hover:text-foreground/80"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
