import { Snowflake, RotateCcw, Pause, Play } from "lucide-react";
import { FADERS, PRESETS, DEFAULT_PARAMS, type FogParams } from "./presets";

interface Props {
  params: FogParams;
  setParams: (p: FogParams) => void;
  paused: boolean;
  setPaused: (b: boolean) => void;
  activePreset: string | null;
  setActivePreset: (id: string | null) => void;
}

export default function ControlDeck({
  params, setParams, paused, setPaused, activePreset, setActivePreset,
}: Props) {
  const update = (key: keyof FogParams, value: number) => {
    setParams({ ...params, [key]: value });
    setActivePreset(null);
  };

  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Snowflake className="h-3.5 w-3.5 text-beam" strokeWidth={1.6} />
          <span className="eyebrow">Fog control deck</span>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => setPaused(!paused)}
            className="data inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-[0.62rem] text-fog transition-colors hover:border-beam hover:text-beam"
          >
            {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            {paused ? "Resume" : "Hold"}
          </button>
          <button
            onClick={() => { setParams({ ...DEFAULT_PARAMS }); setActivePreset("haar"); setPaused(false); }}
            className="data inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-[0.62rem] text-ash transition-colors hover:border-fog hover:text-fog"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      {/* preset bank */}
      <div className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-5">
        {PRESETS.map((p) => {
          const active = activePreset === p.id;
          return (
            <button
              key={p.id}
              onClick={() => { setParams({ ...p.params }); setActivePreset(p.id); }}
              title={p.blurb}
              className={`group rounded-lg border px-2 py-2 text-left transition-colors ${
                active ? "border-beam bg-beam/10" : "border-line hover:border-fog/40"
              }`}
            >
              <span className={`data block text-[0.64rem] font-bold tracking-wide ${active ? "text-beam" : "text-fog"}`}>
                {p.name}
              </span>
              <span className="mt-0.5 block text-[0.56rem] leading-tight text-ash">{p.blurb}</span>
            </button>
          );
        })}
      </div>

      {/* faders */}
      <div className="mt-5 space-y-3.5">
        {FADERS.map((f) => {
          const v = params[f.key];
          return (
            <div key={f.key}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <label htmlFor={`fader-${f.key}`} className="flex items-baseline gap-2">
                  <span className="text-xs font-medium text-fog">{f.label}</span>
                  <span className="data text-[0.58rem] text-ash">{f.uniform}</span>
                </label>
                <span className="data text-xs tabular-nums text-beam">
                  {f.key === "octaves" ? v : v.toFixed(2)}
                </span>
              </div>
              <input
                id={`fader-${f.key}`}
                className="fader"
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={v}
                aria-label={`${f.label} — ${f.hint}`}
                onChange={(e) => update(f.key, parseFloat(e.target.value))}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
