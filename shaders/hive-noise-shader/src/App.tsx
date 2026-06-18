import ShaderDemo from "@/components/ui/hive";
import { TopBar } from "@/components/lab/TopBar";
import { HeroPanel } from "@/components/lab/HeroPanel";
import { SpecHud } from "@/components/lab/SpecHud";
import { IntegrationTicker } from "@/components/lab/IntegrationTicker";
import { Docs } from "@/components/lab/sections";

/**
 * HIVE — the shader lab. The dropped-in `@/components/ui/hive` component is the
 * star: it is mounted once as a fixed, full-viewport backdrop, and the entire
 * lab UI (hero, spec HUD, docs) floats over it on higher z-layers. The
 * component is used unedited, exactly as a consumer would drop it in.
 */
export default function App() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden">
      {/* Live shader — fixed, full-viewport, behind everything. */}
      <div className="fixed inset-0 z-0">
        <ShaderDemo />
      </div>

      {/* Legibility + instrument overlays (never intercept pointer events). */}
      <div className="vignette pointer-events-none fixed inset-0 z-0" />
      <div className="grain pointer-events-none fixed inset-0 z-0" />
      <div className="scanlines pointer-events-none fixed inset-0 z-0 opacity-40" />

      <TopBar />

      {/* HERO — the live viewport screen */}
      <section className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1280px] flex-col justify-between gap-8 px-4 pb-10 pt-24 sm:px-6 sm:pt-28">
        <div className="flex flex-1 items-start justify-between gap-6 pt-2 lg:pt-10">
          <HeroPanel />
          <div className="hidden shrink-0 lg:block">
            <SpecHud />
          </div>
        </div>

        <a
          href="#docs"
          className="group mx-auto flex flex-col items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-foreground"
        >
          scroll to integrate
          <span className="block h-7 w-[18px] rounded-full border border-[rgba(228,200,255,0.3)] p-1">
            <span className="mx-auto block h-1.5 w-1 animate-bounce rounded-full bg-amber" />
          </span>
        </a>
      </section>

      <IntegrationTicker />

      {/* DOCS — opaque, scrolls over the shader */}
      <Docs />
    </div>
  );
}
