import {
  Layers,
  MousePointer2,
  Gauge,
  Palette,
  Accessibility,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";
import { SectionHeader } from "./SectionHeader";
import { RevealGroup, RevealItem } from "./Reveal";

interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
  /** Desktop grid placement — deliberately non-uniform (the bento variety). */
  span: string;
  feature?: "blobs" | "spotlight" | "shadow" | "none";
}

const FEATURES: Feature[] = [
  {
    icon: Layers,
    title: "Layered ambient lighting",
    body: "Four stacked gradients, fractal noise, and a technical grid compose genuine atmospheric depth — no single element dominates the canvas.",
    span: "lg:col-span-4 lg:row-span-2",
    feature: "blobs",
  },
  {
    icon: MousePointer2,
    title: "Cursor-aware surfaces",
    body: "Every interactive card tracks the pointer with a soft 320px radial spotlight at 15% accent.",
    span: "lg:col-span-2",
    feature: "spotlight",
  },
  {
    icon: Gauge,
    title: "Precision micro-interactions",
    body: "200–300ms expo-out easing. 4–8px movement. Nothing bounces or overshoots.",
    span: "lg:col-span-2",
  },
  {
    icon: Palette,
    title: "Tokens, not one-offs",
    body: "Color, radius, shadow, motion — all centralized so the system stays coherent as it grows.",
    span: "lg:col-span-3",
  },
  {
    icon: Sparkles,
    title: "Multi-layer shadows",
    body: "Border highlight + soft diffuse + ambient darkness + optional accent glow. Never a single shadow.",
    span: "lg:col-span-3",
    feature: "shadow",
  },
];

export function BentoFeatures() {
  return (
    <section id="features" className="container-page py-20 sm:py-28 lg:py-32">
      <SectionHeader
        eyebrow="The bold factor"
        title={
          <>
            Depth you can feel,
            <br className="hidden sm:block" /> not just see
          </>
        }
        lead="Six signature elements give the system its personality. Hover any surface to see the spotlight follow your cursor."
      />

      <RevealGroup
        className="mt-12 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6"
        stagger={0.07}
      >
        {FEATURES.map((f) => (
          <RevealItem key={f.title} className={f.span}>
            <SpotlightCard
              variant={f.feature === "blobs" ? "gradient" : "default"}
              className="h-full"
            >
              <FeatureBody f={f} />
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

function FeatureBody({ f }: { f: Feature }) {
  const Icon = f.icon;
  const isHero = f.feature === "blobs";

  return (
    <div className="flex h-full flex-col p-6 sm:p-7">
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent shadow-inner-hi">
        <Icon size={20} strokeWidth={1.75} />
      </div>

      <h3
        className={[
          "font-semibold tracking-tight text-fg",
          isHero ? "text-2xl" : "text-lg",
        ].join(" ")}
      >
        {f.title}
      </h3>
      <p
        className={[
          "mt-2 leading-relaxed text-fg-muted",
          isHero ? "max-w-md text-base" : "text-sm",
        ].join(" ")}
      >
        {f.body}
      </p>

      {/* The hero card gets a small live visualisation of floating light pools. */}
      {isHero && (
        <div className="relative mt-auto h-28 overflow-hidden rounded-xl border border-white/[0.06] bg-bg-deep/50">
          <div className="animate-float-a absolute -left-6 top-2 h-24 w-24 rounded-full bg-accent/30 blur-2xl" />
          <div className="animate-float-b absolute right-6 top-6 h-20 w-20 rounded-full bg-fuchsia-500/20 blur-2xl" />
          <div className="animate-float-c absolute bottom-0 left-1/2 h-16 w-28 -translate-x-1/2 rounded-full bg-blue-500/20 blur-2xl" />
          <div className="bg-grid absolute inset-0 opacity-[0.04]" />
        </div>
      )}

      {/* Accessibility micro-callout on the precision card. */}
      {f.feature === "shadow" && (
        <div className="mt-auto flex items-center gap-2 pt-4 font-mono text-[11px] text-fg-muted/70">
          <Accessibility size={13} className="text-accent" />
          honours prefers-reduced-motion
        </div>
      )}
    </div>
  );
}
