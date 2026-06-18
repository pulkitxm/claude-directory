import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Aperture,
  Droplets,
  Gauge,
  Pause,
  Play,
  Shuffle,
  Sparkles,
  Spline,
  Wind,
} from "lucide-react";
import { FluidSwirl } from "@/components/ui/fluid-swirl-shader";
import { PigmentTrace } from "@/components/pigment-trace";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*  Presets — each one re-mixes the same shader into a different paint mood.   */
/*  "Prism" is the prompt's exact demo (its three pigments + 2.0 / 0.36 / 700).*/
/* -------------------------------------------------------------------------- */

interface Preset {
  name: string;
  one: string;
  two: string;
  three: string;
  contrast: number;
  spinAmount: number;
  spinSpeed: number;
  pixelFilter: number;
}

const PRESETS: readonly Preset[] = [
  {
    name: "Prism",
    one: "#e64d66",
    two: "#4d80e6",
    three: "#e6cc4d",
    contrast: 2.0,
    spinAmount: 0.36,
    spinSpeed: 1.0,
    pixelFilter: 700,
  },
  {
    name: "Oil Slick",
    one: "#1b2a4a",
    two: "#7b3fe4",
    three: "#16c79a",
    contrast: 2.6,
    spinAmount: 0.52,
    spinSpeed: 0.7,
    pixelFilter: 620,
  },
  {
    name: "Ember",
    one: "#2b0a14",
    two: "#ff5e3a",
    three: "#ffd166",
    contrast: 3.1,
    spinAmount: 0.28,
    spinSpeed: 1.3,
    pixelFilter: 540,
  },
  {
    name: "Glacier",
    one: "#0c2733",
    two: "#56cfe1",
    three: "#e8fbff",
    contrast: 2.2,
    spinAmount: 0.44,
    spinSpeed: 0.55,
    pixelFilter: 760,
  },
  {
    name: "Orchid",
    one: "#2a0d3a",
    two: "#ff5fa2",
    three: "#b388ff",
    contrast: 2.4,
    spinAmount: 0.6,
    spinSpeed: 0.9,
    pixelFilter: 680,
  },
  {
    name: "Mono Ink",
    one: "#05060a",
    two: "#9aa6c9",
    three: "#f4f6ff",
    contrast: 3.6,
    spinAmount: 0.2,
    spinSpeed: 0.8,
    pixelFilter: 480,
  },
];

export default function App() {
  // Live shader controls — these map 1:1 to the component's props.
  const [one, setOne] = useState(PRESETS[0].one);
  const [two, setTwo] = useState(PRESETS[0].two);
  const [three, setThree] = useState(PRESETS[0].three);
  const [contrast, setContrast] = useState(PRESETS[0].contrast);
  const [spinAmount, setSpinAmount] = useState(PRESETS[0].spinAmount);
  const [spinSpeed, setSpinSpeed] = useState(PRESETS[0].spinSpeed);
  const [pixelFilter, setPixelFilter] = useState(PRESETS[0].pixelFilter);
  const [polar, setPolar] = useState(false);
  const [activePreset, setActivePreset] = useState(0);

  // Live readouts driven by the shader.
  const [luma, setLuma] = useState(0);
  const [fps, setFps] = useState(60);

  const lastSpeedRef = useRef(PRESETS[0].spinSpeed);
  const paused = spinSpeed === 0;

  // Frame meter — counts rAF ticks, pushes to state a few times/sec so it never
  // churns the tree (and the heavy shader canvas) on every single frame.
  useEffect(() => {
    let raf = 0;
    let frames = 0;
    let acc = 0;
    let last = performance.now();
    const loop = (now: number) => {
      frames += 1;
      acc += now - last;
      last = now;
      if (acc >= 400) {
        setFps((frames * 1000) / acc);
        frames = 0;
        acc = 0;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const applyPreset = (i: number) => {
    const p = PRESETS[i];
    setOne(p.one);
    setTwo(p.two);
    setThree(p.three);
    setContrast(p.contrast);
    setSpinAmount(p.spinAmount);
    setSpinSpeed(p.spinSpeed);
    setPixelFilter(p.pixelFilter);
    lastSpeedRef.current = p.spinSpeed || 1;
    setActivePreset(i);
  };

  const togglePlay = () => {
    setSpinSpeed((s) => {
      if (s === 0) return lastSpeedRef.current || 1;
      lastSpeedRef.current = s;
      return 0;
    });
  };

  const randomise = () => {
    const rand = (min: number, max: number) => min + Math.random() * (max - min);
    const hue = () => Math.floor(rand(0, 360));
    setOne(hslHex(hue(), 60, 18));
    setTwo(hslHex(hue(), 80, 60));
    setThree(hslHex(hue(), 85, 65));
    setContrast(+rand(1.8, 3.6).toFixed(2));
    setSpinAmount(+rand(0.2, 0.7).toFixed(2));
    setSpinSpeed(+rand(0.5, 1.4).toFixed(2));
    setPixelFilter(Math.round(rand(440, 780)));
    lastSpeedRef.current = 1;
    setActivePreset(-1);
  };

  return (
    <div className="console-grade console-vignette relative flex min-h-screen flex-col overflow-hidden bg-ink text-flux-mist">
      {/* Live shader field — full-bleed behind everything */}
      <div className="fixed inset-0 z-0">
        <FluidSwirl
          fill
          colorOne={one}
          colorTwo={two}
          colorThree={three}
          contrast={contrast}
          spinAmount={spinAmount}
          spinSpeed={spinSpeed}
          pixelFilter={pixelFilter}
          polar={polar}
          onSample={setLuma}
          className="h-full w-full"
        />
      </div>

      <CornerTicks />

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between gap-4 border-b border-white/10 bg-ink-950/40 px-5 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-white/15 bg-white/5 text-flux-rose">
            <Droplets className="h-4 w-4" />
          </span>
          <div className="leading-none">
            <p className="font-display text-sm font-semibold tracking-[0.2em] text-flux-mist">
              FLUX<span className="text-flux-rose">·</span>LAB
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.3em] text-flux-mist/45">
              Pigment Swirl Console · WebGL
            </p>
          </div>
        </div>
        <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-flux-mist/65 sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-flux-rose shadow-[0_0_8px_#ff6f91]" />
          Mixing live · {Math.round(fps)} fps
        </div>
      </header>

      {/* Stage */}
      <main className="relative z-20 flex-1">
        {/* Wordmark — in flow on mobile, centred over the field on desktop */}
        <div className="relative z-10 flex min-h-[40vh] items-center justify-center px-6 py-12 text-center lg:pointer-events-none lg:absolute lg:inset-0 lg:min-h-0 lg:py-0">
          <Wordmark presetName={activePreset >= 0 ? PRESETS[activePreset].name : "Custom"} />
        </div>

        {/* Floating instruments (corners on desktop, stacked on mobile) */}
        <div className="relative z-20 flex flex-col gap-4 px-4 pb-6 lg:contents">
          <div className="lg:absolute lg:right-6 lg:top-6 lg:max-h-[calc(100vh-7.5rem)] lg:w-80 lg:overflow-y-auto lg:no-scrollbar">
            <MixingConsole
              one={one}
              two={two}
              three={three}
              contrast={contrast}
              spinAmount={spinAmount}
              spinSpeed={spinSpeed}
              pixelFilter={pixelFilter}
              polar={polar}
              paused={paused}
              activePreset={activePreset}
              onOne={(v) => mark(setOne, v, setActivePreset)}
              onTwo={(v) => mark(setTwo, v, setActivePreset)}
              onThree={(v) => mark(setThree, v, setActivePreset)}
              onContrast={(v) => mark(setContrast, v, setActivePreset)}
              onSpinAmount={(v) => mark(setSpinAmount, v, setActivePreset)}
              onSpinSpeed={(v) => mark(setSpinSpeed, v, setActivePreset)}
              onPixelFilter={(v) => mark(setPixelFilter, v, setActivePreset)}
              onPolar={() => mark(setPolar, !polar, setActivePreset)}
              onPreset={applyPreset}
              onToggle={togglePlay}
              onRandomise={randomise}
            />
          </div>

          <div className="lg:absolute lg:bottom-6 lg:left-6">
            <PigmentTrace
              luminance={luma}
              pigments={[one, two, three]}
              fps={fps}
              className="w-full lg:w-72"
            />
          </div>
        </div>
      </main>

      {/* Footer — live prop readout, doubling as the integration cheatsheet */}
      <footer className="relative z-20 flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 border-t border-white/10 bg-ink-950/40 px-5 py-3 font-mono text-[10px] text-flux-mist/55 backdrop-blur-md">
        <span className="tracking-[0.14em]">
          <span className="text-flux-rose/80">@/components/ui/</span>
          fluid-swirl-shader.tsx
        </span>
        <span className="hidden tracking-[0.1em] sm:inline">
          contrast=<b className="font-semibold text-flux-mist/90">{contrast.toFixed(1)}</b>{" "}
          · spin=<b className="font-semibold text-flux-mist/90">{spinAmount.toFixed(2)}</b>{" "}
          · flow=<b className="font-semibold text-flux-mist/90">{spinSpeed.toFixed(2)}</b>{" "}
          · px=<b className="font-semibold text-flux-mist/90">{pixelFilter}</b>
        </span>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Wordmark                                                                   */
/* -------------------------------------------------------------------------- */

function Wordmark({ presetName }: { presetName: string }) {
  return (
    <div className="animate-fade-in select-none">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.42em] text-flux-mist/75">
        Fluid Swirl · WebGL Pigment Field
      </p>
      <h1 className="iridescent pigment-glow animate-sheen font-display text-[clamp(3rem,12vw,9rem)] font-semibold uppercase leading-[0.84] tracking-tighter">
        Flux
      </h1>
      <p className="mx-auto mt-6 max-w-md font-mono text-[12px] leading-relaxed text-flux-mist/65">
        Three pigments folded into an endless paint vortex on the GPU — currently
        mixing the{" "}
        <span className="text-flux-mist/90">“{presetName}”</span> blend. Drag
        anywhere to steer the spin.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mixing console                                                            */
/* -------------------------------------------------------------------------- */

interface MixingConsoleProps {
  one: string;
  two: string;
  three: string;
  contrast: number;
  spinAmount: number;
  spinSpeed: number;
  pixelFilter: number;
  polar: boolean;
  paused: boolean;
  activePreset: number;
  onOne: (v: string) => void;
  onTwo: (v: string) => void;
  onThree: (v: string) => void;
  onContrast: (v: number) => void;
  onSpinAmount: (v: number) => void;
  onSpinSpeed: (v: number) => void;
  onPixelFilter: (v: number) => void;
  onPolar: () => void;
  onPreset: (i: number) => void;
  onToggle: () => void;
  onRandomise: () => void;
}

function MixingConsole(props: MixingConsoleProps) {
  const { one, two, three, paused, activePreset } = props;
  return (
    <section className="panel animate-rise rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-flux-mist/75">
          <Aperture className="h-3 w-3" />
          Mixing Console
        </h2>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={props.onRandomise}
            title="Randomise mix"
            aria-label="Randomise mix"
            className="grid h-7 w-7 place-items-center rounded-md border border-white/15 bg-white/5 text-flux-mist/80 transition-colors hover:border-flux-rose/60 hover:text-flux-rose"
          >
            <Shuffle className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={props.onToggle}
            className="flex items-center gap-1.5 rounded-md border border-white/15 bg-white/5 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-flux-mist/90 transition-colors hover:border-flux-rose/60"
          >
            {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            {paused ? "Flow" : "Hold"}
          </button>
        </div>
      </div>

      {/* Three pigments */}
      <Field icon={<Droplets className="h-3 w-3" />} label="Pigments">
        <div className="grid grid-cols-3 gap-2">
          <Swatch label="One" value={one} onChange={props.onOne} accent={one} />
          <Swatch label="Two" value={two} onChange={props.onTwo} accent={two} />
          <Swatch label="Three" value={three} onChange={props.onThree} accent={three} />
        </div>
      </Field>

      {/* Sliders */}
      <div className="mt-4 space-y-3.5">
        <Slider
          icon={<Sparkles className="h-3 w-3" />}
          label="Contrast"
          value={props.contrast}
          min={1.2}
          max={4}
          step={0.05}
          accent={one}
          format={(v) => v.toFixed(2)}
          onChange={props.onContrast}
        />
        <Slider
          icon={<Spline className="h-3 w-3" />}
          label="Spin amount"
          value={props.spinAmount}
          min={0.05}
          max={0.9}
          step={0.01}
          accent={two}
          format={(v) => v.toFixed(2)}
          onChange={props.onSpinAmount}
        />
        <Slider
          icon={<Wind className="h-3 w-3" />}
          label="Flow speed"
          value={props.spinSpeed}
          min={0}
          max={2}
          step={0.05}
          suffix="×"
          accent={three}
          format={(v) => v.toFixed(2)}
          onChange={props.onSpinSpeed}
        />
        <Slider
          icon={<Gauge className="h-3 w-3" />}
          label="Pixel filter"
          value={props.pixelFilter}
          min={200}
          max={900}
          step={10}
          accent={one}
          onChange={props.onPixelFilter}
        />
      </div>

      {/* Polar toggle */}
      <button
        type="button"
        onClick={props.onPolar}
        className={cn(
          "mt-4 flex w-full items-center justify-between rounded-md border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors",
          props.polar
            ? "border-flux-azure/60 bg-flux-azure/10 text-flux-mist"
            : "border-white/12 bg-white/5 text-flux-mist/65 hover:border-white/25",
        )}
      >
        <span className="flex items-center gap-1.5">
          <Aperture className="h-3 w-3" />
          Polar warp
        </span>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[9px]",
            props.polar ? "bg-flux-azure/20 text-flux-mist" : "bg-white/5 text-flux-mist/50",
          )}
        >
          {props.polar ? "ON" : "OFF"}
        </span>
      </button>

      {/* Presets */}
      <Field icon={<Sparkles className="h-3 w-3" />} label="Blends">
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => props.onPreset(i)}
              className={cn(
                "rounded-md border px-2.5 py-1 font-mono text-[10px] tracking-[0.06em] transition-colors",
                i === activePreset
                  ? "border-flux-rose/70 bg-flux-rose/15 text-flux-mist"
                  : "border-white/12 text-flux-mist/55 hover:border-white/30 hover:text-flux-mist/90",
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
      </Field>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                 */
/* -------------------------------------------------------------------------- */

function Field({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-4">
      <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-flux-mist/65">
        {icon}
        {label}
      </p>
      {children}
    </div>
  );
}

function Swatch({
  label,
  value,
  accent,
  onChange,
}: {
  label: string;
  value: string;
  accent: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="group relative block cursor-pointer">
      <span
        className="block h-12 w-full rounded-md border border-white/15 shadow-inner transition-transform group-hover:scale-[1.03]"
        style={{ backgroundColor: accent }}
      />
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        aria-label={`Pigment ${label}`}
      />
      <span className="mt-1 flex items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.12em] text-flux-mist/55">
        <span>{label}</span>
        <span className="tabular-nums">{value.replace("#", "")}</span>
      </span>
    </label>
  );
}

function Slider({
  icon,
  label,
  value,
  min,
  max,
  step,
  suffix,
  accent,
  format,
  onChange,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  accent: string;
  format?: (v: number) => string;
  onChange: (n: number) => void;
}) {
  const shown = format ? format(value) : String(value);
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-flux-mist/65">
          {icon}
          {label}
        </span>
        <span className="font-mono text-[11px] tabular-nums text-flux-mist/90">
          {shown}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="flux-range h-1.5 w-full cursor-pointer appearance-none rounded-full"
        style={
          {
            "--flux-accent": accent,
            "--flux-fill": `${fill}%`,
          } as React.CSSProperties
        }
        aria-label={label}
      />
    </div>
  );
}

function CornerTicks() {
  const base = "pointer-events-none fixed z-10 h-5 w-5 border-white/20";
  return (
    <>
      <span className={cn(base, "left-3 top-3 border-l border-t")} />
      <span className={cn(base, "right-3 top-3 border-r border-t")} />
      <span className={cn(base, "bottom-3 left-3 border-b border-l")} />
      <span className={cn(base, "bottom-3 right-3 border-b border-r")} />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Setter wrapper that also drops the project out of "preset" mode. */
function mark<T>(
  setter: (v: T) => void,
  value: T,
  setPreset: (i: number) => void,
) {
  setter(value);
  setPreset(-1);
}

/** HSL → #rrggbb, used for the randomiser. */
function hslHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}
