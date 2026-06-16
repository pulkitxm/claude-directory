import type { LucideIcon } from "lucide-react";
import { Zap, Link, BarChart3, Globe, Shield, Headphones, Users } from "lucide-react";
import { features } from "../data/content";
import { Reveal, RevealGroup, RevealItem, SectionLabel } from "./Primitives";

// ─────────────────────────────────────────────────────────────────────────────
// Features — a 1 → 2 → 3 column grid of the system's principles. Icons map from
// each item's `icon` field (lucide, 1.5px stroke, accent, sitting *above* the
// label as the spec prescribes). Cards are borderless seams that fill with the
// muted surface and lighten their border on hover — no lift, no shadow.
// ─────────────────────────────────────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
  Users,
  Zap,
  BarChart3,
  Link,
  Shield,
  Headphones,
  Globe,
};

export function Features() {
  return (
    <section id="features" className="border-b border-border py-20 md:py-28 lg:py-32">
      <div className="container-bold">
        <Reveal className="max-w-3xl">
          <SectionLabel>The System</SectionLabel>
          <h2 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Six rules. <span className="text-accent">No exceptions.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-normal text-muted-foreground">
            Each principle is a constraint, and the constraints are the point. Together they make the type do all the
            talking.
          </p>
        </Reveal>

        {/* Collapsed-border grid: 1px gap reads as shared seams between cells */}
        <RevealGroup className="mt-14 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon] ?? Zap;
            return (
              <RevealItem
                key={f.title}
                as="div"
                className="group bg-background p-8 transition-colors duration-200 ease-crisp hover:bg-muted md:p-10"
              >
                <div className="flex items-start justify-between">
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className="text-accent transition-transform duration-200 ease-crisp group-hover:-translate-y-0.5 md:h-7 md:w-7"
                    aria-hidden
                  />
                  <span className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 text-2xl font-bold tracking-tight text-foreground">{f.title}</h3>
                <p className="mt-3 text-base leading-normal text-muted-foreground">{f.body}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
