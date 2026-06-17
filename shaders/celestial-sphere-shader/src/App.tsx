import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Telescope,
  Orbit,
  CloudFog,
  Sparkles,
  Shuffle,
  RotateCcw,
  Gauge,
  Timer,
  Compass,
} from "lucide-react";
import ShaderCanvas, { type SphereTelemetry } from "@/components/ui/celestial-sphere-shader";
import { cn } from "@/lib/utils";

/**
 * STELLAR CARTOGRAPHY
 * -------------------
 * The verbatim celestial-sphere shader (@/components/ui) is catalogued here as
 * a live exoplanet "specimen". The instrument frames the sphere inside a brass
 * survey scope; the right deck is the catalog entry — colour chips, geometry
 * dials, preset worlds — and the bottom strip reads the shader's own per-frame
 * telemetry (its WebGL clock, render rate and accumulated spin) back as field
 * measurements. Every readout below is computed from the live shader state, so
 * the catalog card is a genuine description of what's on screen, not chrome.
 */

interface SphereProps {
  color1: string;
  color2: string;
  rotationSpeed: number;
  cloudDensity: number;
  glowIntensity: number;
}

const DEFAULT_PROPS: SphereProps = {
  color1: "#082f49", // Dark Blue
  color2: "#7dd3fc", // Light Blue
  rotationSpeed: 0.1,
  cloudDensity: 2.5,
  glowIntensity: 1.5,
};

const PRESETS: { name: string; designation: string; settings: SphereProps }[] = [
  {
    name: "Orion Nebula",
    designation: "M-42",
    settings: { color1: "#431478", color2: "#e879f9", rotationSpeed: 0.05, cloudDensity: 3.0, glowIntensity: 1.8 },
  },
  {
    name: "Crimson Gas Giant",
    designation: "HD-189",
    settings: { color1: "#4a044e", color2: "#be123c", rotationSpeed: 0.15, cloudDensity: 2.0, glowIntensity: 1.2 },
  },
  {
    name: "Ice Planet",
    designation: "OGLE-05",
    settings: { color1: "#ffffff", color2: "#67e8f9", rotationSpeed: 0.1, cloudDensity: 4.0, glowIntensity: 2.0 },
  },
];

// ── Cataloguing helpers — derive "survey" facts from the live shader props ──

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, "$1$1") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** A pseudo Morgan–Keenan spectral class from the brighter (color2) hue. */
function spectralClass(hex: string): { cls: string; label: string } {
  const [r, g, b] = hexToRgb(hex);
  if (b > r && b > g) return { cls: "O", label: "Blue giant" };
  if (b > 150 && g > 150) return { cls: "B", label: "Blue-white" };
  if (r > 200 && g > 200 && b > 200) return { cls: "A", label: "White dwarf" };
  if (r > 200 && g > 120 && b < 120) return { cls: "K", label: "Orange" };
  if (r > 180 && g < 120) return { cls: "M", label: "Red dwarf" };
  if (g > r && g > b) return { cls: "G", label: "Yellow-green" };
  return { cls: "F", label: "Yellow-white" };
}

/** Rotation period (hours) inferred from rotationSpeed, just for flavour. */
function rotationPeriod(speed: number): string {
  if (speed <= 0.0001) return "tidally locked";
  const hours = 2.4 / speed; // arbitrary but monotonic mapping
  return `${hours.toFixed(1)} h`;
}

function albedo(glow: number): string {
  return `${Math.min(99, Math.round(28 + glow * 22))}%`;
}

function atmosphere(density: number): string {
  if (density < 2) return "thin";
  if (density < 3.5) return "temperate";
  if (density < 5.5) return "dense";
  return "opaque";
}

function fmtClock(t: number): string {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  const cs = Math.floor((t % 1) * 100);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(cs).padStart(2, "0")}`;
}

export default function App() {
  const [props, setProps] = useState<SphereProps>(DEFAULT_PROPS);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [armed, setArmed] = useState(false);

  // Telemetry lives in a ref (updated 60×/s) and is flushed to React on a
  // throttle so the readouts feel live without re-rendering every frame.
  const teleRef = useRef<SphereTelemetry>({ elapsed: 0, fps: 60, rotation: 0 });
  const [tele, setTele] = useState<SphereTelemetry>(teleRef.current);

  const onFrame = useCallback((t: SphereTelemetry) => {
    teleRef.current = t;
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setTele({ ...teleRef.current }), 100);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setArmed(true), 90);
    return () => window.clearTimeout(id);
  }, []);

  const set = useCallback(<K extends keyof SphereProps>(key: K, value: SphereProps[K]) => {
    setProps((prev) => ({ ...prev, [key]: value }));
    setActivePreset(null);
  }, []);

  const applyPreset = useCallback((p: (typeof PRESETS)[number]) => {
    setProps(p.settings);
    setActivePreset(p.name);
  }, []);

  const randomize = useCallback(() => {
    setProps({
      color1: `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
      color2: `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`,
      rotationSpeed: Math.random() * 0.4,
      cloudDensity: 1.0 + Math.random() * 4.0,
      glowIntensity: 0.5 + Math.random() * 2.5,
    });
    setActivePreset(null);
  }, []);

  const reset = useCallback(() => {
    setProps(DEFAULT_PROPS);
    setActivePreset(null);
  }, []);

  const spectral = useMemo(() => spectralClass(props.color2), [props.color2]);
  const rotDeg = ((tele.rotation * 180) / Math.PI) % 360;
  const designation = activePreset
    ? PRESETS.find((p) => p.name === activePreset)!.designation
    : `CS-${props.color2.replace("#", "").toUpperCase()}`;

  return (
    <main className="relative min-h-screen w-full overflow-hidden font-body text-parchment">
      <div className="starfield" aria-hidden />
      <div className="deck-grid" aria-hidden />

      {/* Corner registration marks — engraved on the instrument deck. */}
      <CornerMarks armed={armed} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1320px] flex-col px-5 sm:px-8">
        {/* ── Masthead ─────────────────────────────────────────────────── */}
        <header
          className={cn(
            "flex shrink-0 items-center justify-between gap-4 border-b border-line py-4 sm:py-5",
            armed ? "reveal" : "opacity-0",
          )}
        >
          <div className="flex items-center gap-3">
            <Telescope className="h-5 w-5 text-brass" strokeWidth={1.5} />
            <div className="leading-none">
              <div className="font-mono text-[10px] uppercase tracking-survey text-brass-dim">
                Stellar Cartography
              </div>
              <div className="mt-1 font-display text-[15px] italic text-parchment">
                Procedural Sphere Survey
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-5 font-mono text-[10px] uppercase tracking-[0.22em] text-haze sm:flex">
            <span>three.js · webgl</span>
            <span className="h-3 w-px bg-line" />
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-coral"
                style={{ animation: "blip 1.7s ease-in-out infinite" }}
              />
              Observing
            </span>
          </div>
        </header>

        {/* ── Observation deck ─────────────────────────────────────────── */}
        <div className="grid flex-1 grid-cols-1 items-center gap-8 py-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Left: the scope, framing the live shader sphere */}
          <Scope props={props} onFrame={onFrame} armed={armed} rotDeg={rotDeg} designation={designation} />

          {/* Right: the catalog entry + control deck */}
          <section
            className={cn("flex flex-col gap-6", armed ? "reveal" : "opacity-0")}
            style={{ animationDelay: "0.18s" }}
          >
            {/* Catalog headline */}
            <div>
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] uppercase tracking-survey text-brass-dim">
                  Specimen
                </span>
                <span className="h-px flex-1 bg-line" />
                <span className="font-mono text-[11px] tabular-nums text-haze">{designation}</span>
              </div>
              <h1 className="mt-3 font-display text-[clamp(2.4rem,5.5vw,3.9rem)] font-medium leading-[0.98] text-parchment">
                {activePreset ?? "Celestial Sphere"}
              </h1>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-haze">
                A single procedural sphere — six-octave fractal noise for the cloud
                deck, a Fresnel rim for the atmosphere. Tune the two nebula colours
                and the sphere's geometry; the catalog updates from the live render.
              </p>
            </div>

            {/* Catalog facts derived from the live shader props */}
            <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-line bg-line text-center">
              <Fact label="Spectral" value={spectral.cls} sub={spectral.label} />
              <Fact label="Rotation" value={rotationPeriod(props.rotationSpeed)} sub="period" />
              <Fact label="Atmosphere" value={atmosphere(props.cloudDensity)} sub={`albedo ${albedo(props.glowIntensity)}`} />
            </dl>

            {/* Colour chips */}
            <div className="grid grid-cols-2 gap-4">
              <ColorField
                label="Nebula colour A"
                hint="core"
                value={props.color1}
                onChange={(v) => set("color1", v)}
              />
              <ColorField
                label="Nebula colour B"
                hint="rim · glow"
                value={props.color2}
                onChange={(v) => set("color2", v)}
              />
            </div>

            {/* Geometry dials */}
            <div className="space-y-4">
              <Dial
                icon={<Orbit className="h-3.5 w-3.5" strokeWidth={1.7} />}
                label="Rotation speed"
                value={props.rotationSpeed}
                min={0}
                max={0.5}
                step={0.01}
                onChange={(v) => set("rotationSpeed", v)}
                format={(v) => `${v.toFixed(2)} rad/s`}
              />
              <Dial
                icon={<CloudFog className="h-3.5 w-3.5" strokeWidth={1.7} />}
                label="Cloud density"
                value={props.cloudDensity}
                min={1}
                max={8}
                step={0.1}
                onChange={(v) => set("cloudDensity", v)}
                format={(v) => v.toFixed(2)}
              />
              <Dial
                icon={<Sparkles className="h-3.5 w-3.5" strokeWidth={1.7} />}
                label="Glow intensity"
                value={props.glowIntensity}
                min={0}
                max={3}
                step={0.01}
                onChange={(v) => set("glowIntensity", v)}
                format={(v) => v.toFixed(2)}
              />
            </div>

            {/* Preset specimens */}
            <div className="space-y-2.5">
              <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-brass-dim">
                Catalogued worlds
              </div>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => applyPreset(p)}
                    aria-pressed={activePreset === p.name}
                    className={cn(
                      "group rounded-md border px-2.5 py-2.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
                      activePreset === p.name
                        ? "border-brass/70 bg-brass/10"
                        : "border-line bg-white/[0.02] hover:border-brass/40 hover:bg-white/[0.04]",
                    )}
                  >
                    <span className="flex items-center gap-1.5">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          background: `radial-gradient(circle at 30% 30%, ${p.settings.color2}, ${p.settings.color1})`,
                          boxShadow: `0 0 8px ${p.settings.color2}55`,
                        }}
                      />
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-haze">
                        {p.designation}
                      </span>
                    </span>
                    <span className="mt-1.5 block font-display text-[13px] leading-tight text-parchment">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={randomize}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-coral/40 bg-coral/10 px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-coral transition hover:bg-coral/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral"
                >
                  <Shuffle className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Survey new
                </button>
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-white/[0.02] px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-haze transition hover:border-brass/40 hover:text-parchment focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Reset
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* ── Field telemetry — read straight off the running shader ─────── */}
        <footer
          className={cn(
            "grid shrink-0 grid-cols-2 gap-px overflow-hidden border-t border-line bg-line text-left sm:grid-cols-4",
            armed ? "reveal" : "opacity-0",
          )}
          style={{ animationDelay: "0.32s" }}
        >
          <Readout icon={<Gauge className="h-3.5 w-3.5 text-oxide" strokeWidth={1.7} />} label="Render rate" value={`${tele.fps.toFixed(0)} fps`} />
          <Readout icon={<Timer className="h-3.5 w-3.5 text-brass" strokeWidth={1.7} />} label="Survey clock" value={fmtClock(tele.elapsed)} />
          <Readout icon={<Compass className="h-3.5 w-3.5 text-coral" strokeWidth={1.7} />} label="Longitude" value={`${rotDeg.toFixed(1)}°`} />
          <Readout icon={<Orbit className="h-3.5 w-3.5 text-oxide" strokeWidth={1.7} />} label="Geometry" value={`64 × 64 seg`} />
        </footer>
      </div>
    </main>
  );
}

/* ── Scope: the circular viewport that frames the live shader sphere ─────── */
function Scope({
  props,
  onFrame,
  armed,
  rotDeg,
  designation,
}: {
  props: SphereProps;
  onFrame: (t: SphereTelemetry) => void;
  armed: boolean;
  rotDeg: number;
  designation: string;
}) {
  return (
    <div
      className={cn("relative mx-auto w-full max-w-[560px]", armed ? "scope-reveal" : "opacity-0")}
      style={{ animation: armed ? "scope-in 0.9s cubic-bezier(0.16,1,0.3,1) both" : undefined }}
    >
      {/* Brass bezel */}
      <div className="relative aspect-square overflow-hidden rounded-full border border-brass/35 bg-black shadow-[0_0_0_1px_rgba(10,12,22,0.9),0_30px_80px_-30px_rgba(0,0,0,0.9),inset_0_0_60px_rgba(0,0,0,0.6)]">
        {/* The verbatim shader, filling the scope */}
        <ShaderCanvas
          fill
          color1={props.color1}
          color2={props.color2}
          rotationSpeed={props.rotationSpeed}
          cloudDensity={props.cloudDensity}
          glowIntensity={props.glowIntensity}
          onFrame={onFrame}
        />

        {/* Reticle overlay */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full text-brass/40"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.25" />
          <circle cx="50" cy="50" r="33" fill="none" stroke="currentColor" strokeWidth="0.2" strokeDasharray="0.8 2" />
          <line x1="50" y1="2" x2="50" y2="14" stroke="currentColor" strokeWidth="0.3" />
          <line x1="50" y1="86" x2="50" y2="98" stroke="currentColor" strokeWidth="0.3" />
          <line x1="2" y1="50" x2="14" y2="50" stroke="currentColor" strokeWidth="0.3" />
          <line x1="86" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="0.3" />
          {/* azimuth ticks */}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i * 10 * Math.PI) / 180;
            const r1 = 48;
            const r2 = i % 9 === 0 ? 44 : 46.5;
            return (
              <line
                key={i}
                x1={50 + r1 * Math.cos(a)}
                y1={50 + r1 * Math.sin(a)}
                x2={50 + r2 * Math.cos(a)}
                y2={50 + r2 * Math.sin(a)}
                stroke="currentColor"
                strokeWidth="0.18"
              />
            );
          })}
        </svg>

        {/* Slow radar sweep tied to nothing but ambience */}
        <div
          className="radar-sweep pointer-events-none absolute inset-0"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(216,195,154,0.10) 26deg, transparent 30deg)",
            animation: "sweep 7s linear infinite",
          }}
          aria-hidden
        />

        {/* Vignette to seat the sphere in the bezel */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 50% 50%, transparent 52%, rgba(10,12,22,0.55) 100%)" }}
          aria-hidden
        />
      </div>

      {/* Caption plate under the scope */}
      <div className="mt-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-brass-dim">
        <span>Eyepiece · live feed</span>
        <span className="tabular-nums text-haze">az {rotDeg.toFixed(0)}° · {designation}</span>
      </div>
    </div>
  );
}

/* ── Small presentational pieces ─────────────────────────────────────────── */

function CornerMarks({ armed }: { armed: boolean }) {
  const base = "pointer-events-none fixed z-10 h-8 w-8 border-brass/45";
  const style = (i: number) =>
    ({
      animation: armed ? "corner-in 0.7s cubic-bezier(0.16,1,0.3,1) both" : "none",
      animationDelay: `${0.1 + i * 0.07}s`,
      opacity: armed ? undefined : 0,
    }) as const;
  return (
    <>
      <div className={cn(base, "left-3 top-3 border-l border-t")} style={style(0)} />
      <div className={cn(base, "right-3 top-3 border-r border-t")} style={style(1)} />
      <div className={cn(base, "bottom-3 left-3 border-b border-l")} style={style(2)} />
      <div className={cn(base, "bottom-3 right-3 border-b border-r")} style={style(3)} />
    </>
  );
}

function Fact({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-ink-2/80 px-3 py-3 backdrop-blur-sm">
      <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-brass-dim">{label}</div>
      <div className="mt-1.5 font-display text-lg leading-none text-parchment">{value}</div>
      <div className="mt-1 truncate font-mono text-[9px] lowercase tracking-wide text-haze">{sub}</div>
    </div>
  );
}

function ColorField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="group flex items-center gap-3 rounded-md border border-line bg-white/[0.02] px-3 py-2.5 transition hover:border-brass/40">
      <span
        className="relative h-9 w-9 shrink-0 overflow-hidden rounded"
        style={{ boxShadow: `0 0 14px ${value}66` }}
      >
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="chip absolute inset-0 h-full w-full"
        />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-mono text-[10px] uppercase tracking-[0.16em] text-haze">{label}</span>
        <span className="mt-0.5 flex items-center gap-2">
          <span className="font-mono text-[12px] uppercase tabular-nums text-parchment">{value}</span>
          <span className="font-mono text-[9px] lowercase tracking-wide text-brass-dim">{hint}</span>
        </span>
      </span>
    </label>
  );
}

function Dial({
  icon,
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-haze">
          <span className="text-brass">{icon}</span>
          {label}
        </span>
        <span className="font-mono text-[12px] tabular-nums text-parchment">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        aria-label={label}
        className="dial"
        style={{ ["--fill" as string]: `${fill}%` }}
      />
    </div>
  );
}

function Readout({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-ink-2/80 px-4 py-3.5 backdrop-blur-sm">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded border border-line-soft bg-white/[0.02]">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-brass-dim">{label}</div>
        <div className="truncate font-mono text-[14px] tabular-nums text-parchment">{value}</div>
      </div>
    </div>
  );
}
