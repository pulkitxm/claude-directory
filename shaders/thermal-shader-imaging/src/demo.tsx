import { useMemo } from "react";
import { ThermalEffect } from "@/components/ui/thermal-shader";
import { buildThermalMasks, type ThermalMask } from "@/lib/logo-masks";
import { useTelemetry } from "@/lib/use-telemetry";
import { TelemetryHud } from "@/components/telemetry-hud";
import {
  HowToUseSection,
  IntegrationSection,
  PaletteSection,
  PropsSection,
  SiteFooter,
  WhyComponentsUiSection,
} from "@/components/showcase-sections";

/** A framed live viewport: corner brackets, reticle, label — and a real canvas. */
function Specimen({
  mask,
  size,
  className = "",
}: {
  mask: ThermalMask;
  size: number;
  className?: string;
}) {
  return (
    <figure className={`relative ${className}`} style={{ width: size, height: size }}>
      <div className="scanlines reticle relative h-full w-full overflow-hidden rounded-xl border border-line bg-[#03040a]">
        <span className="bracket bracket-tl" />
        <span className="bracket bracket-tr" />
        <span className="bracket bracket-bl" />
        <span className="bracket bracket-br" />
        {/* The verbatim component. Heat is painted inside the mask's alpha. */}
        <ThermalEffect logoUrl={mask.url} width={size} height={size} />
      </div>
      <figcaption className="absolute left-3 top-3 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70">
        {mask.label}
      </figcaption>
    </figure>
  );
}

export default function ThermalDemo() {
  // Build every mask once; the data URLs stay stable across renders so each
  // <ThermalEffect /> holds a single texture for its lifetime.
  const masks = useMemo(() => buildThermalMasks(), []);
  const telemetry = useTelemetry();

  return (
    <div className="bay-grain min-h-screen w-full bg-ink">
      {/* ----------------------------------------------------------------- */}
      {/* Above the fold: the brief's two-up usage, framed as an imaging bay. */}
      {/* ----------------------------------------------------------------- */}
      <header className="relative overflow-hidden border-b border-line/60">
        {/* Ambient thermal glow behind the bay. */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute left-1/4 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-ice/20 blur-[120px]" />
          <div className="absolute right-1/4 top-1/2 h-72 w-72 translate-x-1/2 rounded-full bg-ember/20 blur-[120px]" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-8">
          {/* Top bar. */}
          <div className="mb-12 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-sm tracking-tight text-cream">
              <span className="text-amber">▲</span> THERMA
              <span className="ml-2 rounded border border-line px-1.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-mist/60">
                Imaging Bay
              </span>
            </div>
            <TelemetryHud telemetry={telemetry} className="hidden sm:block" />
          </div>

          {/* Headline. */}
          <div className="mb-12 max-w-3xl">
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em] text-cyan/70">
              WebGL thermal imaging · shadcn / Tailwind / TypeScript
            </div>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] text-cream sm:text-6xl">
              Drop-in thermal imaging
              <br />
              for any logo.
            </h1>
            <p className="mt-5 max-w-xl text-mist">
              A single <code className="rounded bg-panel2 px-1 text-cyan">@/components/ui</code> file paints a live,
              pointer-reactive thermal gradient inside your logo’s alpha mask — built on three.js, ready to copy
              into any shadcn project.
            </p>
          </div>

          {/* The verbatim two-up: logo × logo. */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <Specimen mask={masks.flame} size={340} />
            <p className="font-display text-6xl font-thin text-mist/50 sm:text-7xl">×</p>
            <Specimen mask={masks.triangle} size={340} />
          </div>

          <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-mist/40">
            hold + drag a viewport to pump heat ↓
          </p>
        </div>
      </header>

      {/* ----------------------------------------------------------------- */}
      {/* Specimen tray — more masks, same drop-in component.               */}
      {/* ----------------------------------------------------------------- */}
      <section id="specimens" className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        <div className="mb-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan/70">Specimen tray</div>
          <h2 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
            Any alpha mask, instantly thermographic
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
          <Specimen mask={masks.aperture} size={210} />
          <Specimen mask={masks.spark} size={210} />
          <Specimen mask={masks.hexagon} size={210} />
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-sm text-mist/60">
          Every panel above is the same <code className="rounded bg-panel2 px-1 text-cyan">&lt;ThermalEffect /&gt;</code>{" "}
          — only the <code className="rounded bg-panel2 px-1 text-cyan">logoUrl</code> changes. Masks here are drawn
          on a canvas at runtime, so the whole bay runs offline.
        </p>
      </section>

      <IntegrationSection />
      <WhyComponentsUiSection />
      <PaletteSection />
      <PropsSection />
      <HowToUseSection />
      <SiteFooter />
    </div>
  );
}
