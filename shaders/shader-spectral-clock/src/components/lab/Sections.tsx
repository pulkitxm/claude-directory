import { useEffect, useState } from "react";
import {
  Boxes,
  CircleHelp,
  Clock3,
  Code2,
  Languages,
  Layers,
  Monitor,
  Palette,
  Server,
  Smartphone,
  SquareStack,
  Thermometer,
  Waves,
} from "lucide-react";
import { SectionHead } from "@/components/lab/Chrome";
import { CodeTabs } from "@/components/lab/CodeTabs";
import { ShaderBackground, TimeDisplay } from "@/components/ui/shader-clock";
import { DEMO_TSX, INSTALL_SH, SHADER_CLOCK_TSX, USAGE_MIN_TSX } from "@/components/lab/sources";

/* ----------------------------------------------------------------- Anatomy -- */

const ANATOMY = [
  {
    icon: Waves,
    title: "Full-screen quad",
    glsl: "TRIANGLE_STRIP · 4 verts",
    body: "A single `aVertexPosition` quad fills clip space. There is no geometry — every pixel is computed in the fragment shader, so the whole field is one draw call.",
  },
  {
    icon: Layers,
    title: "Eight cosine/sine folds",
    glsl: "for (i < 8) p = …",
    body: "Normalised coords are scaled by 2.0 and pushed through eight iterations of a coupled cos/sin map driven by `iTime`. Each fold smears the domain, building the turbulent ribbon structure.",
  },
  {
    icon: Palette,
    title: "Wavelength → RGB",
    glsl: "spectral_colour(λ)",
    body: "The warped `p.y` is mapped into 400–700 nm and run through a piecewise spectral approximation, so colour reads as a real visible-light spectrum rather than an arbitrary palette.",
  },
  {
    icon: Clock3,
    title: "Live clock overlay",
    glsl: "TimeDisplay · setInterval",
    body: "Over the canvas, `TimeDisplay` ticks every second, derives the city from the browser timezone, and toggles °C/°F — all in local React state, no props or providers.",
  },
];

function AnatomySection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <SectionHead
        id="anatomy"
        eyebrow="Anatomy"
        title="How the spectral field is drawn"
        blurb="Four moving parts, top to bottom — from the single quad to the clock that floats over it."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {ANATOMY.map((a) => (
          <article
            key={a.title}
            className="group rounded-2xl border border-edge bg-panel/60 p-5 transition hover:border-edge-2"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-spec-violet/25 to-spec-cyan/15 ring-1 ring-white/10">
                <a.icon className="size-5 text-spec-cyan" strokeWidth={2} />
              </span>
              <div>
                <h3 className="text-base font-semibold text-paper">{a.title}</h3>
                <code className="font-mono text-[0.64rem] text-muted">{a.glsl}</code>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------- Brief questions / API -- */

const QA = [
  {
    icon: SquareStack,
    q: "What data / props are passed in?",
    a: "None are required. `ShaderBackground` and `TimeDisplay` are fully self-contained. This lab adds optional uniform props (iterations, warpScale, spectralSpread, speed, paused) plus telemetry callbacks — all default to the brief's exact values.",
  },
  {
    icon: Server,
    q: "Any state-management requirements?",
    a: "No store, context or provider. Everything is local React state: a 1 s clock interval, the editable-city string, the temperature value and its °C/°F unit. Drop it anywhere.",
  },
  {
    icon: Palette,
    q: "Any required assets (images, icons)?",
    a: "The widget itself needs none — colour is procedural GLSL. This lab vendors a skyline still per world preset and uses lucide-react for its own chrome icons, both shipped in-repo.",
  },
  {
    icon: Smartphone,
    q: "Expected responsive behaviour?",
    a: "The canvas fills its container and resizes on `window.resize`; the clock is centred with `flex` and scales with `clamp()`. No fixed widths, so it works from phone to ultrawide.",
  },
  {
    icon: Monitor,
    q: "Best place to use it?",
    a: "As an ambient hero / dashboard background, a “now” screen, a login or splash backdrop, or any full-bleed section that wants living colour behind a small amount of text.",
  },
];

const API_ROWS: { name: string; type: string; def: string; note: string }[] = [
  { name: "iterations", type: "number", def: "8", note: "warp folds — the brief bakes 8 (capped at 16)" },
  { name: "warpScale", type: "number", def: "2.0", note: "domain zoom — the brief bakes `p *= 2.0`" },
  { name: "spectralSpread", type: "number", def: "50", note: "wavelength gain — the brief bakes `p.y * 50.0`" },
  { name: "speed", type: "number", def: "1.0", note: "multiplier on the `iTime` clock" },
  { name: "paused", type: "boolean", def: "false", note: "freeze the clock without unmounting" },
  { name: "onTelemetry", type: "(t) => void", def: "—", note: "per-frame { time, fps, rgb } off the GPU" },
  { name: "onReady", type: "(ok) => void", def: "—", note: "false when WebGL is unavailable" },
];

function ApiSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <SectionHead
        id="api"
        eyebrow="Integration brief"
        title="The questions, answered"
        blurb="The five questions the integration brief asks — and the props this lab exposes on top of the verbatim component."
      />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-3">
          {QA.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-edge bg-panel/60 p-4 [&_summary]:cursor-pointer"
              open={item === QA[0]}
            >
              <summary className="flex list-none items-center gap-3 text-sm font-semibold text-paper marker:hidden">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-spec-violet/15 ring-1 ring-white/10">
                  <item.icon className="size-4 text-spec-cyan" />
                </span>
                <span className="flex items-center gap-2">
                  <CircleHelp className="size-3.5 shrink-0 text-muted" />
                  {item.q}
                </span>
              </summary>
              <p className="mt-3 pl-11 text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="rounded-2xl border border-edge bg-panel/60 p-5">
          <div className="mb-3 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted">
            <Boxes className="size-3.5 text-spec-cyan" /> ShaderBackground props
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-edge font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">
                  <th className="py-2 pr-3 font-medium">Prop</th>
                  <th className="py-2 pr-3 font-medium">Type</th>
                  <th className="py-2 pr-3 font-medium">Default</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[0.74rem]">
                {API_ROWS.map((r) => (
                  <tr key={r.name} className="border-b border-edge/50 align-top">
                    <td className="py-2 pr-3 text-spec-cyan">{r.name}</td>
                    <td className="py-2 pr-3 text-paper/80">{r.type}</td>
                    <td className="py-2 pr-3 text-paper/60">{r.def}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="mt-4 space-y-1.5 text-[0.72rem] leading-relaxed text-muted">
            {API_ROWS.map((r) => (
              <li key={r.name} className="flex gap-2">
                <code className="shrink-0 text-spec-cyan/80">{r.name}</code>
                <span>— {r.note}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-2 font-mono text-[0.66rem]">
            <div className="rounded-lg border border-edge bg-ink/50 px-3 py-2">
              <span className="flex items-center gap-1.5 text-muted">
                <Thermometer className="size-3 text-spec-amber" /> TimeDisplay
              </span>
              <span className="text-paper/70">no props · local state</span>
            </div>
            <div className="rounded-lg border border-edge bg-ink/50 px-3 py-2">
              <span className="flex items-center gap-1.5 text-muted">
                <Languages className="size-3 text-spec-green" /> Strict TS
              </span>
              <span className="text-paper/70">typed props + telemetry</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Install / usage -- */

function InstallSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <SectionHead
        id="install"
        eyebrow="Integration"
        title="Drop it into a shadcn project"
        blurb="Default component path is @/components/ui. If your project doesn't have it yet, create it — shadcn resolves every UI primitive through that folder via the components.json aliases, so the @/components/ui/shader-clock import only works when the file lives there."
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[
          { n: "01", t: "shadcn structure", d: "components.json maps @/components/ui → src/components/ui" },
          { n: "02", t: "Tailwind CSS", d: "@tailwindcss/vite + a single @import in index.css" },
          { n: "03", t: "TypeScript", d: "strict tsconfig with the @/* path alias to ./src" },
        ].map((s) => (
          <div key={s.n} className="rounded-xl border border-edge bg-panel/60 p-4">
            <div className="font-mono text-xs text-spec-cyan">{s.n}</div>
            <div className="mt-1 text-sm font-semibold text-paper">{s.t}</div>
            <div className="mt-1 text-[0.78rem] leading-relaxed text-muted">{s.d}</div>
          </div>
        ))}
      </div>

      <CodeTabs
        tabs={[
          { id: "install", label: "install.sh", lang: "bash", code: INSTALL_SH },
          { id: "component", label: "components/ui/shader-clock.tsx", lang: "tsx", code: SHADER_CLOCK_TSX },
          { id: "demo", label: "demo.tsx", lang: "tsx", code: DEMO_TSX },
          { id: "usage", label: "usage.tsx", lang: "tsx", code: USAGE_MIN_TSX },
        ]}
      />
    </section>
  );
}

/* ----------------------------------------------- Verbatim drop-in demo embed -- */

function DropInDemo() {
  // The brief's verbatim demo.tsx, embedded untouched in a framed device so you
  // can see the unmodified component running (its own info panel + fade-in).
  const [showInfo, setShowInfo] = useState(false);
  const [visible, setVisible] = useState(false);
  // mount-fade, matching the brief's demo.tsx
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <SectionHead
        id="demo"
        eyebrow="Drop-in demo"
        title="The verbatim component, untouched"
        blurb="Exactly what a host gets after copy-pasting shader-clock.tsx and demo.tsx — its own timezone-derived city, mock temperature, info toggle and mount fade, with nothing changed."
      />
      <div className="relative overflow-hidden rounded-3xl border border-edge bg-ink shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-edge bg-ink-2/80 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-spec-rose/80" />
          <span className="size-2.5 rounded-full bg-spec-amber/80" />
          <span className="size-2.5 rounded-full bg-spec-green/80" />
          <span className="ml-3 flex items-center gap-1.5 font-mono text-[0.66rem] text-muted">
            <Code2 className="size-3" /> App.tsx — &lt;ShaderBackground/&gt; + &lt;TimeDisplay/&gt;
          </span>
        </div>
        <div className="relative h-[440px] w-full overflow-hidden">
          <ShaderBackground className="absolute inset-0 size-full" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className={`rounded-2xl bg-black/20 px-8 py-10 shadow-xl backdrop-blur-sm transition-all duration-700 ${
                visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <TimeDisplay />
            </div>
            {showInfo && (
              <div className="animate-fadeIn absolute bottom-8 left-1/2 -translate-x-1/2 rounded-lg bg-black/40 px-6 py-4 text-sm text-white/80 shadow-lg backdrop-blur-md">
                <p>Click on the city name to edit your location.</p>
                <p className="mt-1">Click on the temperature to toggle between °C and °F.</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowInfo((p) => !p)}
            aria-label={showInfo ? "Close information" : "Show information"}
            className={`absolute bottom-6 right-6 grid size-10 place-items-center rounded-full text-white/70 backdrop-blur-md transition-all duration-300 hover:text-white ${
              showInfo ? "rotate-180 bg-black/40" : "bg-black/30"
            }`}
          >
            {showInfo ? "×" : "i"}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- Footer --- */

function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <div>
          <div className="text-lg font-bold">
            <span className="text-spectral">SPECTRA</span> <span className="text-paper/90">CLOCK</span>
          </div>
          <p className="mt-1 text-sm text-muted">
            A WebGL spectral-field timepiece for shadcn · React · TypeScript · Tailwind.
          </p>
        </div>
        <code className="rounded-lg border border-edge bg-panel/70 px-3 py-2 font-mono text-[0.68rem] text-muted">
          import Dashboard from "@/components/ui/shader-clock"
        </code>
      </div>
    </footer>
  );
}

export function ContentSections() {
  return (
    <>
      <AnatomySection />
      <ApiSection />
      <InstallSection />
      <DropInDemo />
      <Footer />
    </>
  );
}
