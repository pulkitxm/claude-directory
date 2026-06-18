import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  Crosshair,
  Gauge,
  Magnet,
  Pause,
  Play,
  Sparkles,
  Waves,
} from "lucide-react";
import { PlasmaWeb } from "@/components/ui/cosmic-plasma-web";
import { cn } from "@/lib/utils";

/**
 * Cosmic Plasma Web — field resonance console.
 *
 * The brief's verbatim <PlasmaWeb> (OGL) is the full-viewport background. The
 * shader already lerps toward the cursor on its own; this console adds the
 * legible layer: a cursor-tracking reticle (so the interaction reads in a
 * silent screen recording, where no OS cursor is painted), faders wired to the
 * shader's props, named presets, and telemetry sampled from the live loop.
 *
 * Single, non-scrolling viewport on purpose — the demo recorder treats a
 * static page as a "hold + drive the pointer" capture, which is exactly the
 * cursor-gesture footage this shader wants.
 */

type Preset = {
  id: string;
  label: string;
  hueShift: number;
  density: number;
  glowIntensity: number;
  attractionStrength: number;
  energyFlow: number;
};

const PRESETS: Preset[] = [
  { id: "cyan", label: "Tidal Cyan", hueShift: 190, density: 1.2, glowIntensity: 1.0, attractionStrength: 2.0, energyFlow: 1.2 },
  { id: "ultra", label: "Ultraviolet", hueShift: 268, density: 1.0, glowIntensity: 0.85, attractionStrength: 2.6, energyFlow: 1.0 },
  { id: "rose", label: "Rose Nebula", hueShift: 322, density: 1.45, glowIntensity: 1.15, attractionStrength: 1.6, energyFlow: 1.5 },
  { id: "ember", label: "Solar Ember", hueShift: 32, density: 0.9, glowIntensity: 1.3, attractionStrength: 3.0, energyFlow: 0.8 },
];

function Fader({
  icon,
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="group block select-none">
      <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-[0.18em]">
        <span className="flex items-center gap-1.5 text-mist">
          <span className="text-plasma/80">{icon}</span>
          {label}
        </span>
        <span className="font-mono text-[11px] text-plasma">
          {value.toFixed(step < 1 ? 2 : 0)}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="h-1 w-full cursor-pointer appearance-none rounded-full outline-none
          [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-plasma
          [&::-webkit-slider-thumb]:shadow-[0_0_10px_2px_rgba(125,249,255,0.7)]
          [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-plasma"
        style={{
          background: `linear-gradient(90deg, rgba(125,249,255,0.85) ${pct}%, rgba(139,147,184,0.18) ${pct}%)`,
        }}
      />
    </label>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] uppercase tracking-[0.2em] text-mist/70">
        {label}
      </span>
      <span
        className={cn(
          "font-mono text-[13px] tabular-nums",
          accent ? "text-plasma" : "text-white/90",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export default function App() {
  const [hueShift, setHueShift] = useState(190);
  const [density, setDensity] = useState(1.2);
  const [glowIntensity, setGlow] = useState(1.0);
  const [attractionStrength, setAttract] = useState(2.0);
  const [energyFlow, setEnergy] = useState(1.2);
  const [speed, setSpeed] = useState(1.0);
  const [frozen, setFrozen] = useState(false);
  const [activePreset, setActivePreset] = useState("cyan");

  // Telemetry sampled from the live loop (throttled so we don't re-render at 60fps).
  const [tele, setTele] = useState({ fps: 60, mx: 50, my: 50, engage: 0 });

  // Cursor position is held in a ref and pushed straight to the reticle's
  // transform every frame — no React re-render, so the reticle tracks at 60fps.
  const reticleRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0, nx: 0.5, ny: 0.5, lastMove: -1e9 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.nx = e.clientX / window.innerWidth;
      mouse.current.ny = e.clientY / window.innerHeight;
      mouse.current.lastMove = performance.now();
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    let raf = 0;
    let frames = 0;
    let lastSample = performance.now();
    let engage = 0;

    const tick = (now: number) => {
      frames++;
      // Engagement decays unless the pointer moved in the last ~600ms.
      const moving = now - mouse.current.lastMove < 600;
      engage += ((moving ? 1 : 0) - engage) * 0.08;

      // Drive the reticle transform directly for smooth tracking.
      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
        reticleRef.current.style.opacity = String(0.35 + engage * 0.65);
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - engage * 1.6));
      }

      if (now - lastSample >= 200) {
        const fps = Math.round((frames * 1000) / (now - lastSample));
        setTele({
          fps: Math.min(fps, 120),
          mx: Math.round(mouse.current.nx * 100),
          my: Math.round(mouse.current.ny * 100),
          engage,
        });
        frames = 0;
        lastSample = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const applyPreset = (p: Preset) => {
    setActivePreset(p.id);
    setHueShift(p.hueShift);
    setDensity(p.density);
    setGlow(p.glowIntensity);
    setAttract(p.attractionStrength);
    setEnergy(p.energyFlow);
  };

  // Re-derive a hue swatch for the wordmark glow from the current hueShift.
  const hueCss = useMemo(() => `hsl(${hueShift} 90% 62%)`, [hueShift]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-abyss text-white">
      {/* Verbatim shader — the field itself */}
      <div className="absolute inset-0">
        <PlasmaWeb
          hueShift={hueShift}
          density={density}
          glowIntensity={glowIntensity}
          saturation={0.85}
          brightness={0.72}
          energyFlow={energyFlow}
          pulseIntensity={0.32}
          attractionStrength={attractionStrength}
          speed={speed}
          disableAnimation={frozen}
          mouseAttraction
          mouseInteraction
          transparent={false}
        />
      </div>

      {/* Readability scrim + faint instrument grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_30%,transparent_40%,rgba(4,3,10,0.72)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Corner brackets */}
      {[
        "left-5 top-5 border-l border-t",
        "right-5 top-5 border-r border-t",
        "left-5 bottom-5 border-l border-b",
        "right-5 bottom-5 border-r border-b",
      ].map((pos) => (
        <div
          key={pos}
          className={cn(
            "pointer-events-none absolute h-7 w-7 border-plasma/50 hairline-pulse",
            pos,
          )}
        />
      ))}

      {/* ── Wordmark / header ───────────────────────────────────── */}
      <header className="absolute left-8 top-8 z-10 max-w-sm">
        <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.34em] text-mist">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-plasma shadow-[0_0_8px_2px_rgba(125,249,255,0.8)]" />
          OGL · components/ui · live
        </div>
        <h1
          className="font-display text-[2.6rem] font-700 leading-[0.92] tracking-tight"
          style={{ textShadow: `0 0 26px ${hueCss}55` }}
        >
          COSMIC
          <br />
          PLASMA<span style={{ color: hueCss }}>WEB</span>
        </h1>
        <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-mist">
          A cursor-driven plasma lattice. Move the pointer to bend the field —
          nodes pull toward you, streams thicken, particles excite.
        </p>
      </header>

      {/* ── Top-right telemetry ─────────────────────────────────── */}
      <section className="absolute right-8 top-8 z-10 w-[208px] rounded-xl border border-white/10 bg-ink/55 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-mist">
          <Activity className="h-3 w-3 text-plasma" /> Field Telemetry
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <Stat label="Render" value={`${tele.fps} fps`} accent />
          <Stat
            label="Lattice"
            value={frozen ? "FROZEN" : "FLOWING"}
            accent={!frozen}
          />
          <Stat label="Cursor X" value={`${tele.mx}%`} />
          <Stat label="Cursor Y" value={`${tele.my}%`} />
        </div>
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-mist/70">
            <span>Engagement</span>
            <span className="font-mono text-plasma">
              {Math.round(tele.engage * 100)}%
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-plasma to-violet transition-[width] duration-150"
              style={{ width: `${Math.round(tele.engage * 100)}%` }}
            />
          </div>
        </div>
      </section>

      {/* ── Bottom-left control deck ────────────────────────────── */}
      <section className="absolute bottom-8 left-8 z-10 w-[286px] rounded-xl border border-white/10 bg-ink/55 p-4 backdrop-blur-md">
        <div className="mb-3 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-mist">
          <Sparkles className="h-3 w-3 text-plasma" /> Resonance Controls
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              className={cn(
                "rounded-md px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] transition",
                activePreset === p.id
                  ? "bg-plasma/90 text-abyss"
                  : "bg-white/5 text-mist hover:bg-white/10 hover:text-white",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="space-y-3.5">
          <Fader
            icon={<Crosshair className="h-3 w-3" />}
            label="Hue Shift"
            value={hueShift}
            min={0}
            max={360}
            step={1}
            unit="°"
            onChange={setHueShift}
          />
          <Fader
            icon={<Gauge className="h-3 w-3" />}
            label="Density"
            value={density}
            min={0.5}
            max={2}
            step={0.05}
            onChange={setDensity}
          />
          <Fader
            icon={<Sparkles className="h-3 w-3" />}
            label="Glow"
            value={glowIntensity}
            min={0.2}
            max={1.6}
            step={0.05}
            onChange={setGlow}
          />
          <Fader
            icon={<Magnet className="h-3 w-3" />}
            label="Attraction"
            value={attractionStrength}
            min={0}
            max={4}
            step={0.1}
            onChange={setAttract}
          />
          <Fader
            icon={<Waves className="h-3 w-3" />}
            label="Energy Flow"
            value={energyFlow}
            min={0}
            max={2}
            step={0.05}
            onChange={setEnergy}
          />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setFrozen((f) => !f)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-white/90 transition hover:bg-white/10"
          >
            {frozen ? (
              <>
                <Play className="h-3 w-3" /> Resume
              </>
            ) : (
              <>
                <Pause className="h-3 w-3" /> Freeze
              </>
            )}
          </button>
          <button
            onClick={() => setSpeed((s) => (s >= 1.8 ? 0.4 : s + 0.4))}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-plasma transition hover:bg-white/10"
            title="Cycle flow speed"
          >
            {speed.toFixed(1)}×
          </button>
        </div>
      </section>

      {/* ── Bottom-right caption ────────────────────────────────── */}
      <footer className="absolute bottom-8 right-8 z-10 max-w-[230px] text-right">
        <p className="text-[11px] leading-relaxed text-mist">
          <span className="font-mono text-plasma">{"<PlasmaWeb/>"}</span> dropped
          verbatim into{" "}
          <span className="text-white/80">@/components/ui</span>. Shadcn structure
          · Tailwind · TypeScript · OGL.
        </p>
      </footer>

      {/* ── Center hint (fades when engaged) ────────────────────── */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <p className="font-display text-xs uppercase tracking-[0.42em] text-white/70">
          move cursor to excite the lattice
        </p>
      </div>

      {/* ── Cursor reticle (the visible "pointer") ──────────────── */}
      <div
        ref={reticleRef}
        className="pointer-events-none fixed left-0 top-0 z-20 will-change-transform"
        style={{ mixBlendMode: "screen" }}
      >
        <div className="relative h-11 w-11">
          <div className="absolute inset-0 rounded-full border border-plasma/80" />
          <div className="absolute inset-[6px] rounded-full border border-plasma/40" />
          <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-plasma shadow-[0_0_12px_3px_rgba(125,249,255,0.9)]" />
          <div className="absolute left-1/2 top-[-9px] h-2 w-px -translate-x-1/2 bg-plasma/70" />
          <div className="absolute left-1/2 bottom-[-9px] h-2 w-px -translate-x-1/2 bg-plasma/70" />
          <div className="absolute top-1/2 left-[-9px] h-px w-2 -translate-y-1/2 bg-plasma/70" />
          <div className="absolute top-1/2 right-[-9px] h-px w-2 -translate-y-1/2 bg-plasma/70" />
        </div>
      </div>
    </main>
  );
}
