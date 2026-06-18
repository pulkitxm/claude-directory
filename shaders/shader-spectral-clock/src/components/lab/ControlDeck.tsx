import { RotateCcw, Sliders } from "lucide-react";
import { SectionHead } from "@/components/lab/Chrome";
import { WORLD_PRESETS, type WorldPreset } from "@/components/lab/presets";

export type Uniforms = {
  iterations: number;
  warpScale: number;
  spectralSpread: number;
  speed: number;
};

export const DEFAULT_UNIFORMS: Uniforms = {
  iterations: 8,
  warpScale: 2.0,
  spectralSpread: 50,
  speed: 1.0,
};

const FADERS: {
  key: keyof Uniforms;
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
  baked: string;
  hint: string;
}[] = [
  { key: "iterations", label: "Warp folds", min: 1, max: 16, step: 1, baked: "for(i<8)", hint: "GLSL loop iterations" },
  { key: "warpScale", label: "Field zoom", min: 0.5, max: 4, step: 0.05, baked: "p *= 2.0", hint: "domain scale" },
  { key: "spectralSpread", label: "Spectral spread", min: 8, max: 90, step: 1, unit: "nm", baked: "p.y * 50.0", hint: "wavelength gain" },
  { key: "speed", label: "Clock speed", min: 0, max: 3, step: 0.05, unit: "×", baked: "iTime", hint: "time multiplier" },
];

export function ControlDeck({
  uniforms,
  onChange,
  onReset,
  activePreset,
  onPreset,
}: {
  uniforms: Uniforms;
  onChange: (next: Uniforms) => void;
  onReset: () => void;
  activePreset: string;
  onPreset: (p: WorldPreset) => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <SectionHead
        id="controls"
        eyebrow="Control deck"
        title="Promote the baked constants to live uniforms"
        blurb="The brief's shader hard-codes four numbers in its GLSL. Here each one is wired to a live uniform you can drive — the default render is byte-for-byte the original. Pick a world preset to snap the field and the readout to a city at once."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        {/* Faders */}
        <div className="rounded-2xl border border-edge bg-panel/70 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted">
              <Sliders className="size-3.5 text-spec-cyan" /> Uniforms
            </div>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-md border border-edge px-2.5 py-1 font-mono text-[0.64rem] uppercase tracking-[0.18em] text-muted transition hover:border-spec-cyan/60 hover:text-paper"
            >
              <RotateCcw className="size-3" /> Reset
            </button>
          </div>

          <div className="space-y-5">
            {FADERS.map((f) => {
              const value = uniforms[f.key];
              return (
                <div key={f.key}>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <label htmlFor={`fader-${f.key}`} className="text-sm font-medium text-paper">
                      {f.label}
                      <span className="ml-2 font-mono text-[0.62rem] text-muted">{f.hint}</span>
                    </label>
                    <span className="font-mono text-sm tabular-nums text-spec-cyan">
                      {f.step < 1 ? value.toFixed(2) : value}
                      {f.unit ?? ""}
                    </span>
                  </div>
                  <input
                    id={`fader-${f.key}`}
                    type="range"
                    className="spec-range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={value}
                    onChange={(e) => onChange({ ...uniforms, [f.key]: Number(e.target.value) })}
                  />
                  <div className="mt-1 flex justify-between font-mono text-[0.58rem] text-muted/70">
                    <span>{f.min}</span>
                    <span className="rounded bg-edge/60 px-1.5 text-muted">baked: {f.baked}</span>
                    <span>{f.max}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* World preset bank */}
        <div className="rounded-2xl border border-edge bg-panel/70 p-6">
          <div className="mb-5 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted">
            <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-spec-amber to-spec-rose" />
            World presets
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {WORLD_PRESETS.map((p) => {
              const active = p.id === activePreset;
              return (
                <button
                  key={p.id}
                  onClick={() => onPreset(p)}
                  aria-pressed={active}
                  className={`group relative overflow-hidden rounded-xl border text-left transition ${
                    active
                      ? "border-spec-cyan/70 ring-2 ring-spec-cyan/30"
                      : "border-edge hover:border-edge-2"
                  }`}
                >
                  <img
                    src={p.image}
                    alt={`${p.city} skyline`}
                    loading="lazy"
                    className="h-20 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-2">
                    <div className="text-xs font-semibold text-paper">{p.city}</div>
                    <div className="font-mono text-[0.56rem] text-paper/60">UTC {p.utc}</div>
                  </div>
                  {active && (
                    <span className="absolute right-1.5 top-1.5 rounded-full bg-spec-cyan px-1.5 py-0.5 font-mono text-[0.5rem] font-bold uppercase text-ink">
                      live
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="mt-4 rounded-lg border border-edge bg-ink/50 px-3 py-2 font-mono text-[0.66rem] leading-relaxed text-muted">
            {WORLD_PRESETS.find((p) => p.id === activePreset)?.note}
          </p>
        </div>
      </div>
    </section>
  );
}
