import {
  Zap,
  ShieldCheck,
  GitPullRequestArrow,
  Gauge,
  Layers,
  History,
  type LucideIcon,
} from "lucide-react";
import { GlassCard, Reveal, SectionHeading } from "./Primitives";
import { cn } from "../lib/cn";

type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
  /** spans two columns in the bento grid on large screens */
  wide?: boolean;
  mono?: string;
};

const FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "Keystroke deploys",
    body: "⌘K, type, ship. Aperture compiles, uploads, and warms every edge region before your coffee reheats.",
    wide: true,
    mono: "deploy · 11.4s",
  },
  {
    icon: History,
    title: "Instant rollback",
    body: "Every deploy is an immutable snapshot. Roll back a year of releases in a single, undramatic press.",
  },
  {
    icon: GitPullRequestArrow,
    title: "Preview per branch",
    body: "Push a branch, get a signed URL. Reviewers see the real thing, not a screenshot.",
  },
  {
    icon: Gauge,
    title: "Cold-start traces",
    body: "Flame graphs for the 2am mystery. Aperture pins the slow function and tells you why.",
  },
  {
    icon: ShieldCheck,
    title: "Quiet by default",
    body: "Secrets are encrypted at the edge, scoped per environment, and never printed to a log.",
  },
  {
    icon: Layers,
    title: "One runtime, six regions",
    body: "Write once. Aperture replicates state to iad, fra, hnd, gru, syd, and cdg — automatically.",
    wide: true,
    mono: "6 regions · 42ms p99",
  },
];

export function Features() {
  return (
    <section id="features" className="section-y relative">
      <div className="container-x">
        <SectionHeading
          eyebrow="The runtime"
          title={
            <>
              Everything you reach for at 2am,
              <br className="hidden sm:block" /> one keystroke away.
            </>
          }
          lede="Aperture collapses the dashboard, the CLI, and the on-call runbook into a single calm surface."
        />

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal
                key={f.title}
                delay={(i % 3) * 90}
                className={cn(f.wide && "lg:col-span-2")}
              >
                <GlassCard
                  interactive
                  className="group flex h-full flex-col gap-4 p-6 md:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/[0.08]">
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        className="text-muted-foreground transition-colors duration-300 group-hover:text-accent"
                      />
                    </span>
                    {f.mono && (
                      <span className="font-mono text-[11px] tracking-wide text-muted-foreground/70">
                        {f.mono}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-medium tracking-tight text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {f.body}
                  </p>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
