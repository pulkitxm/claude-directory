import { useCallback, useEffect, useRef, useState } from "react";
import {
  Rocket,
  Gauge,
  Power,
  Pause,
  FolderTree,
  HelpCircle,
  PackageCheck,
  Terminal,
  Radio,
  Crosshair,
} from "lucide-react";
import { Component, type StarshipProps } from "@/components/ui/starship-shader";
import {
  Bracket,
  VelocityLadder,
  Readout,
  Fader,
} from "@/components/helm-instruments";
import { CodeBlock } from "@/components/code-block";

/* ------------------------------------------------------------------ *
 * HELM-9 · FTL Navigation Console
 *
 * A faithful shadcn integration of @XorDev's "Starship" warp-streak shader,
 * reframed as a starship helm. The live field fills the viewport behind a
 * bezel'd reticle; a velocity ladder, throttle, and jump sequence drive the
 * shader's optional speed/intensity/paused props; a telemetry strip reads the
 * field's own clock + a brightness proxy straight off the per-frame callback.
 * ------------------------------------------------------------------ */

/* Speed regimes the throttle quantises toward — named like flight modes. */
const REGIMES = [
  { name: "STATION KEEPING", speed: 0.25, intensity: 0.85 },
  { name: "SUBLIGHT CRUISE", speed: 0.6, intensity: 1.0 },
  { name: "JUMP STANDBY", speed: 1.0, intensity: 1.15 },
  { name: "FTL TRANSIT", speed: 1.7, intensity: 1.35 },
  { name: "OVERDRIVE", speed: 2.6, intensity: 1.6 },
] as const;

function useFps() {
  const [fps, setFps] = useState(60);
  useEffect(() => {
    let raf = 0;
    let frames = 0;
    let last = performance.now();
    const tick = () => {
      frames++;
      const now = performance.now();
      if (now - last >= 500) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return fps;
}

export default function App() {
  const [speed, setSpeed] = useState(1.0);
  const [intensity, setIntensity] = useState(1.15);
  const [paused, setPaused] = useState(false);

  // Per-frame telemetry lands in a ref (full framerate); a 10Hz tick copies it
  // into state for the HUD so a fast GPU loop never thrashes React.
  const frame = useRef({ time: 0, brightness: 0.5, distance: 0 });
  const lastT = useRef(0);
  const [hud, setHud] = useState({ time: 0, brightness: 0.5, distance: 0 });

  const handleFrame = useCallback<NonNullable<StarshipProps["onFrame"]>>(
    ({ time, brightness }) => {
      const dt = Math.max(0, time - lastT.current);
      lastT.current = time;
      // Distance travelled, in arbitrary "light-seconds", scales with velocity.
      frame.current.distance += dt * (0.5 + brightness) * 1.2;
      frame.current.time = time;
      frame.current.brightness = brightness;
    },
    []
  );

  useEffect(() => {
    const id = window.setInterval(() => setHud({ ...frame.current }), 100);
    return () => window.clearInterval(id);
  }, []);

  const fps = useFps();

  // Snap the throttle to the nearest regime for the mode label.
  const regime = REGIMES.reduce((best, r) =>
    Math.abs(r.speed - speed) < Math.abs(best.speed - speed) ? r : best
  );

  const engageRegime = (r: (typeof REGIMES)[number]) => {
    setSpeed(r.speed);
    setIntensity(r.intensity);
    setPaused(false);
  };

  // Velocity readout (× c) climbs with the throttle; ladder caret rides the
  // field's brightness so it actually moves with the shader, not just the slider.
  const velMul = paused ? 0 : speed;
  const ladderValue = paused
    ? 0
    : Math.min(1, 0.18 + (speed / 2.6) * 0.62 + hud.brightness * 0.2);

  return (
    <div className="min-h-screen bg-void-900 font-sans text-chalk">
      {/* ===================== HELM VIEWPORT (above the fold) ============ */}
      <section className="relative flex min-h-screen flex-col">
        {/* Live Starship field */}
        <div className="absolute inset-0">
          <Component
            speed={speed}
            intensity={intensity}
            paused={paused}
            onFrame={handleFrame}
          />
        </div>
        {/* Vignette + readability scrims over the field */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_38%,rgba(2,3,8,0.55)_78%,rgba(2,3,8,0.92)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-void-900/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-void-900 via-void-900/70 to-transparent" />

        {/* Top instrument rail */}
        <header className="relative z-10 flex items-center justify-between gap-4 px-5 py-5 sm:px-9">
          <div className="flex items-center gap-3">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-sm border border-phosphor-400/40 bg-void-800/70">
              <Rocket className="h-4 w-4 text-phosphor-300" strokeWidth={1.5} />
              <span className="absolute inset-0 animate-pulse-ring rounded-sm border border-phosphor-300/40" />
            </span>
            <div className="leading-none">
              <div className="font-wordmark text-[1.05rem] font-bold tracking-[0.18em] text-chalk glow-phosphor">
                HELM<span className="text-phosphor-300">·</span>9
              </div>
              <div className="eyebrow mt-1.5">FTL NAVIGATION CONSOLE</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Radio className="h-3.5 w-3.5 text-phosphor-400/70" />
            <span className="eyebrow">
              SHADER · <span className="text-phosphor-300">STARSHIP</span> · @XORDEV
            </span>
          </div>
        </header>

        {/* Center stage: velocity ladder + title lockup */}
        <div className="relative z-10 flex flex-1 items-stretch px-5 sm:px-9">
          {/* Signature velocity ladder, left */}
          <div className="hidden w-[168px] shrink-0 py-6 md:block">
            <div className="h-full rounded-md bezel px-3 py-4 backdrop-blur-[2px]">
              <VelocityLadder
                value={ladderValue}
                vel={velMul.toFixed(2)}
                engaged={speed >= REGIMES[3].speed && !paused}
              />
            </div>
          </div>

          {/* Title block, centered over the field */}
          <div className="flex flex-1 flex-col items-center justify-center px-2 text-center">
            <div className="animate-fade-in mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-phosphor-400/50" />
              <span className="eyebrow">{paused ? "HOLD" : "UNDERWAY"} · {regime.name}</span>
              <span className="h-px w-8 bg-phosphor-400/50" />
            </div>
            <h1 className="animate-rise font-wordmark text-[clamp(2.6rem,8vw,6rem)] font-bold uppercase leading-[0.92] tracking-[0.06em] text-chalk [text-shadow:0_0_40px_rgba(52,198,232,0.35)]">
              Punch it
            </h1>
            <p className="animate-rise mt-5 max-w-md font-sans text-sm leading-relaxed text-slate [animation-delay:120ms]">
              You are looking straight down the warp corridor. Set the throttle,
              hold the field, or sequence a jump — every control below drives
              the same self-contained shader you drop into{" "}
              <code className="rounded bg-void-700 px-1.5 py-0.5 font-mono text-[0.75rem] text-phosphor-200">
                components/ui
              </code>
              .
            </p>

            {/* Primary controls */}
            <div className="animate-rise mt-8 flex flex-wrap items-center justify-center gap-3 [animation-delay:220ms]">
              <button
                type="button"
                onClick={() => engageRegime(REGIMES[3])}
                className="group inline-flex items-center gap-2 rounded-sm border border-caution-400/60 bg-caution-500/10 px-5 py-2.5 font-display text-sm font-medium uppercase tracking-wide2 text-caution-300 transition-all hover:bg-caution-500/20 focus-visible:outline focus-visible:outline-1 focus-visible:outline-caution-300"
              >
                <Power className="h-4 w-4" strokeWidth={1.6} />
                Engage jump
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="inline-flex items-center gap-2 rounded-sm border border-hairline bg-void-800/60 px-5 py-2.5 font-display text-sm font-medium uppercase tracking-wide2 text-phosphor-200 transition-all hover:border-phosphor-400/50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-phosphor-400"
              >
                {paused ? (
                  <Power className="h-4 w-4" strokeWidth={1.6} />
                ) : (
                  <Pause className="h-4 w-4" strokeWidth={1.6} />
                )}
                {paused ? "Resume" : "Hold field"}
              </button>
            </div>
          </div>

          {/* Reticle scope, right — frames the corridor center */}
          <div className="relative hidden w-[168px] shrink-0 py-6 lg:block">
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <div className="relative h-24 w-24">
                <span className="absolute inset-0 animate-reticle-spin rounded-full border border-dashed border-phosphor-400/30" />
                <Crosshair className="absolute inset-0 m-auto h-8 w-8 text-phosphor-300/70" strokeWidth={1} />
                <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-caution-400 glow-caution" />
              </div>
              <div className="text-center">
                <div className="eyebrow">HEADING LOCK</div>
                <div className="mt-1 font-mono text-xs text-phosphor-200">000·MARK·000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Throttle + telemetry strip */}
        <div className="relative z-10 px-5 pb-7 sm:px-9">
          <div className="rounded-md bezel px-5 py-4">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_auto_1.4fr] lg:items-center">
              {/* Throttle faders */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                <Fader
                  label="Throttle"
                  value={speed}
                  min={0.1}
                  max={2.6}
                  step={0.01}
                  display={`${speed.toFixed(2)}×`}
                  onChange={(v) => {
                    setSpeed(v);
                    setPaused(false);
                  }}
                />
                <Fader
                  label="Drive exposure"
                  value={intensity}
                  min={0.5}
                  max={1.8}
                  step={0.01}
                  display={intensity.toFixed(2)}
                  caution
                  onChange={setIntensity}
                />
              </div>

              {/* Divider */}
              <div className="hidden h-14 w-px justify-self-center bg-hairline lg:block" />

              {/* Live telemetry */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                <Readout
                  label="Field clock"
                  value={hud.time.toFixed(1)}
                  unit="s"
                />
                <Readout
                  label="Velocity"
                  value={velMul.toFixed(2)}
                  unit="×c"
                  tone={speed >= REGIMES[3].speed && !paused ? "caution" : "phosphor"}
                />
                <Readout
                  label="Distance"
                  value={hud.distance.toFixed(1)}
                  unit="ls"
                />
                <Readout
                  label="Render"
                  value={paused ? "HOLD" : String(fps)}
                  unit={paused ? "" : "fps"}
                  tone={paused ? "caution" : "phosphor"}
                  blink={paused}
                />
              </div>
            </div>

            {/* Regime selector */}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-hairline pt-4">
              <span className="eyebrow mr-1">DRIVE MODE</span>
              {REGIMES.map((r) => {
                const active = r.name === regime.name && !paused;
                return (
                  <button
                    key={r.name}
                    type="button"
                    onClick={() => engageRegime(r)}
                    className={
                      "rounded-sm border px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wide2 transition-colors " +
                      (active
                        ? "border-phosphor-400/60 bg-phosphor-500/10 text-phosphor-200"
                        : "border-hairline text-faint hover:border-phosphor-400/40 hover:text-phosphor-200")
                    }
                  >
                    {r.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Corner reticle brackets on the viewport */}
        <Bracket className="pointer-events-none absolute left-4 top-4 z-10 h-7 w-7 text-phosphor-400/40 sm:left-7 sm:top-7" />
        <Bracket className="pointer-events-none absolute right-4 top-4 z-10 h-7 w-7 -scale-x-100 text-phosphor-400/40 sm:right-7 sm:top-7" />
      </section>

      {/* ===================== INTEGRATION STORY ======================== */}
      <IntegrationStory />

      <footer className="border-t border-hairline px-5 py-8 sm:px-9">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 text-center">
          <div className="eyebrow">
            HELM-9 · STARSHIP SHADER · SHADCN INTEGRATION
          </div>
          <p className="font-sans text-xs text-faint">
            Shader “Starship” by @XorDev, adapted. Console chrome, telemetry, and
            controls built for this integration. Fonts vendored locally.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Integration story — the shadcn / Tailwind / TS setup, the "why
 * components/ui" note, the props/API, and the verbatim source. Code is passed
 * as plain strings so JSX never has to escape braces / angle brackets.
 * ------------------------------------------------------------------ */

const SETUP = [
  {
    icon: Terminal,
    name: "shadcn structure",
    have: "the @/ alias + src/components/ui",
    cmd: "npx shadcn@latest init",
  },
  {
    icon: PackageCheck,
    name: "Tailwind CSS",
    have: "utility classes + design tokens",
    cmd: "npm i -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p",
  },
  {
    icon: FolderTree,
    name: "TypeScript",
    have: "the .tsx component types",
    cmd: "npm i -D typescript @types/react @types/react-dom",
  },
];

const DEPS = `# Three.js + the React renderer the component is built on
npm i three @react-three/fiber

# (this repo pins React 18, so @react-three/fiber v8)
# dev types:
npm i -D @types/three`;

const TREE = `src/
  components/
    ui/
      starship-shader.tsx   # ← the brief's component
    demo.tsx                # reference usage
  lib/
    utils.ts                # cn() helper`;

const USAGE = `// The brief's demo.tsx — drop it in, fill the box.
import { Component } from "@/components/ui/starship-shader";

export default function Demo() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Component />   {/* self-contained R3F field */}
    </div>
  );
}`;

const PROPS_CODE = `// The brief's <Component /> takes NO props.
// This integration adds an optional, backward-
// compatible surface. Omit them → identical output.
import { Component } from "@/components/ui/starship-shader";

<Component
  speed={1.7}            // clock multiplier (1 = orig)
  intensity={1.35}       // post-tonemap exposure (1 = orig)
  paused={false}         // freeze the field's clock
  onFrame={(s) => setHud(s)}   // { time, brightness }
  className="rounded-xl"       // forwarded to wrapper
/>;`;

const QA: { icon: typeof HelpCircle; q: string; a: React.ReactNode }[] = [
  {
    icon: HelpCircle,
    q: "What props / data does it take?",
    a: (
      <>
        The brief's <Chip>Component</Chip> takes none — it is a self-contained,
        full-bleed WebGL field. This integration layers optional{" "}
        <Chip>speed</Chip>, <Chip>intensity</Chip>, <Chip>paused</Chip>,{" "}
        <Chip>onFrame</Chip> and <Chip>className</Chip>; every one defaults to
        the original behaviour.
      </>
    ),
  },
  {
    icon: Gauge,
    q: "State management?",
    a: (
      <>
        All internal. <code className="font-mono text-phosphor-200">@react-three/fiber</code>{" "}
        owns the render loop and WebGL context, and <Chip>useThree().size</Chip>{" "}
        tracks the canvas. The console only keeps its own throttle / telemetry
        state — nothing to wire into a store.
      </>
    ),
  },
  {
    icon: PackageCheck,
    q: "Required assets?",
    a: (
      <>
        None for the shader — the image and its noise channel are generated in
        GLSL and a procedural <Chip>DataTexture</Chip>. No photos, models, or
        external textures ship. (This showcase's chrome uses{" "}
        <Chip>lucide-react</Chip> icons + locally vendored fonts; no Unsplash
        images are needed.)
      </>
    ),
  },
  {
    icon: Crosshair,
    q: "Responsive behaviour?",
    a: (
      <>
        The canvas fills its positioned parent and re-reads{" "}
        <Chip>size</Chip> every frame, with <Chip>dpr=[1, 2]</Chip> clamping the
        device-pixel ratio so it stays crisp on retina without melting the GPU.
        Make the parent <Chip>h-screen</Chip> for a full-bleed warp view.
      </>
    ),
  },
  {
    icon: Rocket,
    q: "Where should it live?",
    a: (
      <>
        As an ambient background behind a hero, a loading / jump screen, or a
        full-bleed section divider. Keep it in <Chip>components/ui</Chip> so it's
        importable as <Chip>@/components/ui/starship-shader</Chip> everywhere.
      </>
    ),
  },
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-void-700 px-1.5 py-0.5 font-mono text-[0.72rem] text-phosphor-200">
      {children}
    </code>
  );
}

function SectionHead({
  index,
  kicker,
  title,
}: {
  index: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 border-b border-hairline pb-4">
      <div>
        <div className="eyebrow mb-2">{kicker}</div>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-chalk sm:text-3xl">
          {title}
        </h2>
      </div>
      <span className="font-mono text-sm text-phosphor-400/50">{index}</span>
    </div>
  );
}

function IntegrationStory() {
  return (
    <div className="panel-grid relative border-t border-hairline bg-void-900">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:px-9">
        {/* Why components/ui */}
        <SectionHead
          index="01 / 04"
          kicker="DEFAULT PATHS"
          title="Why the component lands in components/ui"
        />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-4 font-sans text-sm leading-relaxed text-slate">
            <p>
              shadcn's <Chip>components.json</Chip> resolves two aliases that
              matter here: <Chip>ui → @/components/ui</Chip> and{" "}
              <Chip>utils → @/lib/utils</Chip>. The brief's component imports{" "}
              <Chip>cn</Chip> from <Chip>@/lib/utils</Chip> and is meant to be
              imported from <Chip>@/components/ui/starship-shader</Chip>, so the
              file has to sit at that exact path for the alias to resolve.
            </p>
            <p>
              If your project's default UI path is{" "}
              <span className="text-phosphor-200">not</span>{" "}
              <Chip>components/ui</Chip>, create it (or repoint the{" "}
              <Chip>ui</Chip> alias in <Chip>components.json</Chip>). Keeping the
              one folder convention is what lets every shadcn component —
              including this one — be dropped in and imported the same way,
              without per-file path surgery. This repo is already wired that way.
            </p>
          </div>
          <CodeBlock label="src/ layout" lang="txt" code={TREE} />
        </div>

        {/* Setup */}
        <div className="mt-20">
          <SectionHead
            index="02 / 04"
            kicker="PREFLIGHT"
            title="Set up shadcn · Tailwind · TypeScript"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {SETUP.map((s) => (
              <div
                key={s.name}
                className="flex flex-col gap-3 rounded-lg border border-hairline bg-void-800/50 p-5"
              >
                <div className="flex items-center gap-2.5">
                  <s.icon className="h-4 w-4 text-phosphor-300" strokeWidth={1.5} />
                  <span className="font-display text-sm font-medium text-chalk">
                    {s.name}
                  </span>
                </div>
                <p className="font-sans text-xs leading-relaxed text-faint">
                  Provides {s.have}.
                </p>
                <pre className="whitespace-pre-wrap break-words rounded border border-hairline bg-void-900 px-3 py-2.5 font-mono text-[0.68rem] leading-relaxed text-phosphor-200">
                  {s.cmd}
                </pre>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <CodeBlock label="install dependencies" lang="bash" code={DEPS} />
          </div>
        </div>

        {/* Props / API */}
        <div className="mt-20">
          <SectionHead
            index="03 / 04"
            kicker="CONTROL SURFACE"
            title="Usage & props"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <CodeBlock label="demo.tsx · the brief verbatim" code={USAGE} />
              <CodeBlock label="optional props · this integration" code={PROPS_CODE} />
            </div>
            <div className="grid content-start gap-3">
              {QA.map((item) => (
                <div
                  key={item.q}
                  className="rounded-lg border border-hairline bg-void-800/40 p-4"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <item.icon className="h-3.5 w-3.5 text-caution-300" strokeWidth={1.6} />
                    <span className="font-display text-sm font-medium text-chalk">
                      {item.q}
                    </span>
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-slate">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Source */}
        <div className="mt-20">
          <SectionHead
            index="04 / 04"
            kicker="THE COMPONENT"
            title="components/ui/starship-shader.tsx"
          />
          <p className="mb-6 max-w-2xl font-sans text-sm leading-relaxed text-slate">
            The @XorDev “Starship” GLSL is preserved exactly — a 50-step
            accumulation loop folded through <Chip>exp(sin())</Chip> and divided
            by a noise-warped distance field, tonemapped with <Chip>tanh()</Chip>{" "}
            over a pure-black hull. The wrapper adds only the optional, opt-in
            control surface shown above.
          </p>
          <CodeBlock label="components/ui/starship-shader.tsx · GLSL" code={SHADER_SRC} />
        </div>
      </div>
    </div>
  );
}

/* The verbatim @XorDev fragment shader, shown in the source section. */
const SHADER_SRC = `precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform sampler2D iChannel0;

// "Starship" by @XorDev (adapted)
void mainImage(out vec4 O, vec2 I)
{
    vec2 r = iResolution.xy,
         p = (I+I-r) / r.y * mat2(3.,4.,4.,-3.) / 1e2;

    vec4 S = vec4(0.0);
    vec4 C = vec4(1.,2.,3.,0.);
    vec4 W;

    for(float t=iTime, T=.1*t+p.y, i=0.; i<50.; i+=1.){
        S += (cos(W=sin(i)*C)+1.)
             * exp(sin(i+i*T))
             / length(max(p,
               p / vec2(2.0, texture(iChannel0, p/exp(W.x)+vec2(i,t)/8.).r*40.0)
             )) / 1e4;

        p += .02 * cos(i*(C.xz+8.0+i) + T + T);
    }

    // Black background only; tanh tonemap.
    O = vec4(tanh((S*S).rgb), 1.0);
}`;
