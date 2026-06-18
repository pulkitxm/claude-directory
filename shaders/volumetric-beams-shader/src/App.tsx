import { useCallback, useState } from "react";
import { Github, Layers, Zap } from "lucide-react";
import {
  DEFAULT_PRESET,
  PRESETS,
  rgbToHex,
  type BeamParams,
  type Preset,
} from "@/lib/presets";
import { BeamStage } from "@/components/beam-stage";
import { Hero } from "@/components/hero";
import { ControlDeck } from "@/components/control-deck";
import { PresetBank } from "@/components/preset-bank";
import { Telemetry } from "@/components/telemetry";
import { PropsTable } from "@/components/props-table";
import { InstallStory } from "@/components/install-story";
import { VerbatimDemo } from "@/components/verbatim-demo";
import { useCanvasTelemetry } from "@/components/use-canvas-telemetry";

function SectionLabel({
  index,
  title,
  hint,
}: {
  index: string;
  title: string;
  hint: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-3 border-b border-hairline pb-4">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] text-beam-400">{index}</span>
        <h2 className="font-display text-xl font-bold uppercase tracking-wide2 text-chalk sm:text-2xl">
          {title}
        </h2>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-wide2 text-dust">
        {hint}
      </span>
    </div>
  );
}

export default function App() {
  const [params, setParams] = useState<BeamParams>(DEFAULT_PRESET.params);
  const [activePreset, setActivePreset] = useState<string>(DEFAULT_PRESET.id);

  const telemetry = useCanvasTelemetry("#beam-stage canvas");

  const handleFader = useCallback(
    <K extends keyof BeamParams>(key: K, value: BeamParams[K]) => {
      setParams((p) => ({ ...p, [key]: value }));
      setActivePreset("custom");
    },
    [],
  );

  const handlePreset = useCallback((preset: Preset) => {
    setParams(preset.params);
    setActivePreset(preset.id);
  }, []);

  const handleReset = useCallback(() => {
    const preset = PRESETS.find((p) => p.id === activePreset) ?? DEFAULT_PRESET;
    setParams(preset.params);
    if (activePreset === "custom") setActivePreset(DEFAULT_PRESET.id);
  }, [activePreset]);

  const activeName =
    activePreset === "custom"
      ? "Custom"
      : (PRESETS.find((p) => p.id === activePreset)?.name ?? "—");

  return (
    <div className="relative min-h-screen">
      {/* Live shader background, driven by the console params. */}
      <BeamStage params={params} />

      {/* Hero (first viewport) */}
      <Hero
        beamCount={Math.round(params.beamCount)}
        fps={telemetry.fps}
        presetName={activeName}
      />

      {/* Scrollable console */}
      <main className="relative">
        {/* CONSOLE: telemetry + presets + faders */}
        <section
          id="console"
          className="mx-auto max-w-6xl scroll-mt-6 px-5 py-20 sm:px-8 sm:py-24"
        >
          <SectionLabel
            index="01 /"
            title="Calibration Console"
            hint="faders & presets → live uniforms"
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <Telemetry
                fps={telemetry.fps}
                clock={telemetry.clock}
                flux={telemetry.flux}
                cast={telemetry.cast}
                beamCount={Math.round(params.beamCount)}
              />
              <PresetBank activeId={activePreset} onSelect={handlePreset} />
            </div>
            <div className="lg:col-span-7">
              <ControlDeck
                params={params}
                onChange={handleFader}
                onReset={handleReset}
              />
              {/* Live colour read-out strip */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-hairline bg-ink-800/70 px-5 py-4 backdrop-blur-sm">
                <span className="font-mono text-[10px] uppercase tracking-wide2 text-dust">
                  active spectrum
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded ring-1 ring-white/15"
                    style={{ background: rgbToHex(params.lightColor) }}
                  />
                  <span className="font-mono text-[11px] text-chalk">
                    core {rgbToHex(params.lightColor)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 rounded ring-1 ring-white/15"
                    style={{ background: rgbToHex(params.tint) }}
                  />
                  <span className="font-mono text-[11px] text-chalk">
                    tint {rgbToHex(params.tint)}
                  </span>
                </div>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-wide2 text-dust">
                  {Math.round(params.beamCount)} arms ·{" "}
                  {(params.beamHalfAngle * 2).toFixed(3)} rad spread
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="rule h-px" />
        </div>

        {/* VERBATIM */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionLabel
            index="02 /"
            title="Component, Unmodified"
            hint="the shipped drop-in, in a frame"
          />
          <VerbatimDemo />
        </section>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="rule h-px" />
        </div>

        {/* API */}
        <section
          id="api"
          className="mx-auto max-w-6xl scroll-mt-6 px-5 py-20 sm:px-8 sm:py-24"
        >
          <SectionLabel
            index="03 /"
            title="Props & Uniforms"
            hint="34 props · 1:1 uniform map"
          />
          <PropsTable />
        </section>

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="rule h-px" />
        </div>

        {/* INSTALL */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
          <SectionLabel
            index="04 /"
            title="Drop It In"
            hint="shadcn · tailwind · typescript"
          />
          <InstallStory />
        </section>

        {/* Footer */}
        <footer className="border-t border-hairline bg-ink-950/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-12 sm:flex-row sm:items-center sm:px-8">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-beam-400 shadow-[0_0_10px_rgba(111,156,255,0.9)]" />
                <span className="font-display text-sm font-bold uppercase tracking-wide2 text-chalk">
                  BEAMWORKS
                </span>
              </div>
              <p className="mt-2 max-w-md text-[12px] leading-relaxed text-dust">
                Volumetric light synthesizer · a single full-screen Three.js
                fragment raymarch dropped into shadcn{" "}
                <code className="font-mono text-beam-200">components/ui</code>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-5 font-mono text-[11px] text-dust">
              <span className="flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-beam-400" />
                Three.js · R3F
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-beam-400" />
                single-scatter raymarch
              </span>
              <a
                href="https://github.com/pulkitxm/claude-directory"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-beam-200"
              >
                <Github className="h-3.5 w-3.5" />
                source
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
