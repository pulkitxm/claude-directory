import { useCallback, useRef, useState } from "react";
import { Activity, Gauge, Pause, Play, Timer } from "lucide-react";
import { ShaderBackground, type ShaderTelemetry } from "@/components/ui/shader-clock";
import type { WorldPreset } from "@/components/lab/presets";
import { LabClock } from "@/components/lab/LabClock";
import { SpectralFallback } from "@/components/lab/SpectralFallback";
import { ReticleCorners } from "@/components/lab/Chrome";

type Uniforms = {
  iterations: number;
  warpScale: number;
  spectralSpread: number;
  speed: number;
};

export function HeroStage({
  uniforms,
  preset,
  cityLabel,
  onCityChange,
}: {
  uniforms: Uniforms;
  preset: WorldPreset;
  cityLabel: string;
  onCityChange: (next: string) => void;
}) {
  const [paused, setPaused] = useState(false);
  const [webglOk, setWebglOk] = useState(true);
  const [tel, setTel] = useState<ShaderTelemetry>({ time: 0, fps: 0, rgb: [0, 0, 0] });
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const onTelemetry = useCallback((t: ShaderTelemetry) => setTel(t), []);
  const onReady = useCallback((ok: boolean) => setWebglOk(ok), []);

  const handleMove = (e: React.MouseEvent) => {
    const r = stageRef.current?.getBoundingClientRect();
    if (!r) return;
    setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const [r, g, b] = tel.rgb;
  const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
  // Approximate dominant wavelength label from the readback colour, for flavour.
  const band = r > g && r > b ? "long · red" : g >= r && g >= b ? "mid · green" : "short · blue";

  return (
    <section className="relative">
      <div
        ref={stageRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setCursor(null)}
        className="relative h-[82vh] min-h-[560px] w-full overflow-hidden rounded-3xl border border-edge bg-ink shadow-[0_30px_120px_-40px_rgba(123,44,255,0.45)]"
      >
        {/* Live shader (verbatim component) or CSS fallback. */}
        {webglOk ? (
          <ShaderBackground
            iterations={uniforms.iterations}
            warpScale={uniforms.warpScale}
            spectralSpread={uniforms.spectralSpread}
            speed={uniforms.speed}
            paused={paused}
            onTelemetry={onTelemetry}
            onReady={onReady}
          />
        ) : (
          <SpectralFallback />
        )}

        {/* Texture + legibility overlays. */}
        <div className="tex-scan pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_30%,rgba(5,6,15,0.55)_100%)]" />

        <ReticleCorners />

        {/* Cursor crosshair. */}
        {cursor && webglOk && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: cursor.x, top: cursor.y }}
          >
            <div className="relative size-12">
              <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-paper/70" />
              <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-paper/70" />
              <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-paper/70" />
              <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-paper/70" />
              <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-paper/80" />
            </div>
          </div>
        )}

        {/* Top chrome: wordmark + import path. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-5 sm:p-7">
          <div>
            <div className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.34em] text-paper/70">
              <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-spec-violet via-spec-cyan to-spec-rose" />
              Spectral-field timepiece
            </div>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight sm:text-3xl">
              <span className="text-spectral">SPECTRA</span>{" "}
              <span className="text-paper/95">CLOCK</span>
            </h1>
          </div>
          <code className="hidden rounded-lg border border-white/15 bg-black/35 px-3 py-1.5 font-mono text-[0.66rem] text-paper/80 backdrop-blur-sm sm:block">
            @/components/ui/shader-clock
          </code>
        </div>

        {/* Centre: the clock widget. */}
        <div className="absolute inset-0 z-10 grid place-items-center px-6">
          <div className="rounded-3xl border border-white/10 bg-black/20 px-8 py-9 shadow-2xl backdrop-blur-[3px] sm:px-12 sm:py-11">
            <LabClock city={cityLabel} zone={preset.zone} tempC={preset.tempC} onCityChange={onCityChange} />
            <p className="mt-5 text-center font-mono text-[0.62rem] uppercase tracking-[0.28em] text-paper/55">
              {preset.zone} · UTC {preset.utc}
            </p>
          </div>
        </div>

        {/* Bottom-left: hint + freeze control. */}
        <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 sm:left-7">
          <button
            onClick={() => setPaused((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/40 px-3 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-paper/85 backdrop-blur-sm transition hover:border-spec-cyan/60 hover:text-paper"
          >
            {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            {paused ? "Resume" : "Freeze"}
          </button>
          <span className="hidden font-mono text-[0.62rem] text-paper/45 sm:inline">
            click the city to rename · click the temp for °C/°F
          </span>
        </div>

        {/* Bottom-right: live telemetry HUD read off the GPU loop. */}
        <div className="absolute bottom-5 right-5 z-20 w-[200px] rounded-xl border border-white/12 bg-black/45 p-3 font-mono text-[0.66rem] text-paper/80 backdrop-blur-md sm:right-7">
          <div className="mb-2 flex items-center justify-between text-[0.58rem] uppercase tracking-[0.24em] text-paper/55">
            <span className="flex items-center gap-1.5">
              <Activity className="size-3 text-spec-green" /> Telemetry
            </span>
            <span className={paused ? "text-spec-amber" : "text-spec-green"}>{paused ? "FROZEN" : "LIVE"}</span>
          </div>
          <HudRow icon={<Timer className="size-3" />} label="iTime" value={`${tel.time.toFixed(1)}s`} />
          <HudRow icon={<Gauge className="size-3" />} label="FPS" value={webglOk ? `${tel.fps}` : "—"} />
          <div className="mt-1.5 flex items-center justify-between border-t border-white/10 pt-1.5">
            <span className="text-paper/55">centre</span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block size-3 rounded-sm ring-1 ring-white/25" style={{ background: hex }} />
              {hex}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-paper/55">band</span>
            <span>{band}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HudRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-0.5">
      <span className="flex items-center gap-1.5 text-paper/55">
        {icon}
        {label}
      </span>
      <span className="tabular-nums text-paper">{value}</span>
    </div>
  );
}
