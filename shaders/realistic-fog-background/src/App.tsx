import { useCallback, useRef, useState } from "react";
import {
  Activity, ArrowDown, Check, Copy, FolderTree, Gauge, MousePointer2,
  Terminal, Waves, Wind,
} from "lucide-react";
import MistField, { type MistSample } from "@/components/ui/mist-field";
import VisibilityGauge from "@/components/lab/VisibilityGauge";
import ControlDeck from "@/components/lab/ControlDeck";
import { DEFAULT_PARAMS, type FogParams } from "@/components/lab/presets";
import demoSource from "@/components/ui/demo.tsx?raw";

const USAGE = `import MistBackground from "@/components/ui/demo";

export default function App() {
  return (
    <>
      {/* The fog mounts itself fixed + full-viewport at z-[-1] */}
      <MistBackground />

      <main className="relative z-10">
        {/* your content sits in front of the rolling fog */}
      </main>
    </>
  );
}`;

const SETUP = `# 1 · scaffold a Vite + React + TypeScript app
npm create vite@latest my-app -- --template react-ts
cd my-app

# 2 · add Tailwind CSS v4
npm i -D tailwindcss @tailwindcss/vite
# add @import "tailwindcss"; to your CSS, plug the vite plugin in

# 3 · wire up shadcn (creates components.json + the @/* alias)
npx shadcn@latest init

# 4 · drop the fog in — it has zero runtime dependencies
#    src/components/ui/demo.tsx`;

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  const tRef = useRef<number | undefined>(undefined);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      window.clearTimeout(tRef.current);
      tRef.current = window.setTimeout(() => setDone(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  };
  return (
    <button
      onClick={copy}
      className="data inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-[0.62rem] text-fog transition-colors hover:border-beam hover:text-beam"
    >
      {done ? <Check className="h-3 w-3 text-beam" /> : <Copy className="h-3 w-3" />}
      {done ? "Copied" : label}
    </button>
  );
}

function Code({ code, lang = "tsx" }: { code: string; lang?: string }) {
  return (
    <div className="glass min-w-0 overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-line px-3.5 py-2">
        <span className="data text-[0.58rem] uppercase tracking-[0.3em] text-ash">{lang}</span>
        <CopyButton text={code} />
      </div>
      <pre className="data overflow-x-auto px-3.5 py-3.5 text-[0.72rem] leading-relaxed text-fog/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="data text-[0.62rem] text-beam">{n}</span>
      <span className="hairline h-px w-8" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

const FIELD_NOTES = [
  {
    q: "What props does it take?",
    a: "None. The drop-in MistBackground is fully self-contained — mount it and the fog runs. The lab's MistField variant exposes density / drift / octaves / warp / accent / beam / exposure as live uniforms when you want control.",
  },
  {
    q: "State or context required?",
    a: "No providers, no store. A single useEffect owns the WebGL context, a requestAnimationFrame loop, and one window mousemove listener — all torn down on unmount.",
  },
  {
    q: "Any image or icon assets?",
    a: "Zero. The fog is procedural fBm noise generated on the GPU — nothing to download, nothing to host. No Unsplash, no sprites. Icons on this page are lucide-react.",
  },
  {
    q: "Responsive behaviour?",
    a: "The canvas is fixed inset-0 and resizes to window.innerWidth/Height every frame, so it always fills the viewport on any screen. Pointer events pass straight through to your UI.",
  },
  {
    q: "Where does it belong?",
    a: "At the app root, behind everything, on z-[-1]. Render it once near the top of your tree and let every route's content float over the same continuous fog.",
  },
];

const API = [
  ["density", "number", "1", "Fog mix opacity (u_density). 0 clears the air, 1.6 is a wall."],
  ["drift", "number", "1", "Roll speed of the field (u_drift)."],
  ["octaves", "number", "6", "fBm detail, 1–8 (u_octaves)."],
  ["warp", "number", "1", "Domain-warp curl (u_warp)."],
  ["accent", "number", "1", "Cool blue cast in the deep folds (u_accent)."],
  ["beam", "number", "1", "Cursor 'lighthouse' glow strength (u_beam)."],
  ["exposure", "number", "1", "Post-processing gain (u_exposure)."],
  ["paused", "boolean", "false", "Freeze the drift clock in place."],
  ["onSample", "(s) => void", "—", "Per-frame telemetry: time, fps, luminance, cursor."],
];

export default function App() {
  const [params, setParams] = useState<FogParams>({ ...DEFAULT_PARAMS });
  const [paused, setPaused] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>("haar");
  const [sample, setSample] = useState<MistSample>({ time: 0, fps: 60, lumAvg: 0.12, mouseX: 0, mouseY: 0 });

  // Throttle React updates to the readback cadence; the shader stays at 60fps.
  const onSample = useCallback((s: MistSample) => setSample(s), []);

  return (
    <div className="relative min-h-screen">
      <MistField {...params} paused={paused} onSample={onSample} />
      {/* legibility scrim — keeps content readable without hiding the fog */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(8,9,12,0.2), rgba(8,9,12,0.66) 70%), linear-gradient(180deg, rgba(8,9,12,0.1), rgba(8,9,12,0.55))",
        }}
      />

      <div className="relative z-10">
        {/* ── top bar ───────────────────────────────────────────── */}
        <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <Waves className="h-4 w-4 text-beam" strokeWidth={1.7} />
            <span className="data text-sm font-bold tracking-[0.34em] text-fog">HAAR</span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="data text-[0.62rem] text-ash">realistic-fog-background</span>
            <span className="data inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[0.6rem] text-beam">
              <span className="h-1.5 w-1.5 rounded-full bg-beam" style={{ boxShadow: "0 0 8px var(--beam)" }} />
              shader live
            </span>
          </div>
        </header>

        {/* ── hero ──────────────────────────────────────────────── */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pt-10 pb-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="eyebrow">WebGL fragment-shader fog · shadcn/ui</span>
            </div>
            <h1 className="wordmark text-[20vw] sm:text-[15vw] lg:text-[11rem]">HAAR</h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-fog/80">
              A realistic, generative fog background you drop behind any app — six octaves of
              domain-warped fBm noise rolling across a single full-screen quad, lit by a cursor
              that moves through it like a lighthouse beam.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="glass data flex max-w-full flex-wrap items-center gap-x-2 gap-y-0.5 rounded-lg px-3 py-2 text-[0.72rem] text-fog">
                <Terminal className="h-3.5 w-3.5 shrink-0 text-beam" />
                <span className="text-ash">import</span> MistBackground{" "}
                <span className="text-ash">from</span>{" "}
                <span className="text-beam">"@/components/ui/demo"</span>
              </div>
              <a
                href="#integrate"
                className="data inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[0.72rem] text-fog transition-colors hover:border-beam hover:text-beam"
              >
                Integration guide <ArrowDown className="h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <VisibilityGauge lum={sample.lumAvg} />
            <div className="grid grid-cols-2 gap-3">
              <Stat icon={<Activity className="h-3.5 w-3.5" />} label="render" value={`${Math.round(sample.fps)} fps`} />
              <Stat icon={<Wind className="h-3.5 w-3.5" />} label="drift clock" value={`${sample.time.toFixed(1)}s`} />
              <Stat icon={<Gauge className="h-3.5 w-3.5" />} label="octaves" value={`${params.octaves}`} />
              <Stat icon={<MousePointer2 className="h-3.5 w-3.5" />} label="cursor" value={`${Math.round(sample.mouseX)},${Math.round(sample.mouseY)}`} />
            </div>
          </div>
        </section>

        {/* ── control deck ──────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <Eyebrow n="01">Drive the fog</Eyebrow>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <p className="max-w-sm text-sm leading-relaxed text-fog/75">
                Every constant baked into the original shader is promoted to a live uniform here.
                The visibility gauge above is not faked — it reads the mean luminance of a 48×48 block
                sampled straight off the framebuffer with <span className="data text-beam">gl.readPixels</span>,
                so thicker fog genuinely drops your reported range.
              </p>
              <div className="glass rounded-xl p-4">
                <span className="eyebrow">Live telemetry</span>
                <dl className="mt-3 space-y-2">
                  <Row k="centre luminance" v={sample.lumAvg.toFixed(3)} />
                  <Row k="state" v={paused ? "held" : "drifting"} />
                  <Row k="active patch" v={activePreset ?? "custom"} />
                </dl>
              </div>
            </div>
            <ControlDeck
              params={params}
              setParams={setParams}
              paused={paused}
              setPaused={setPaused}
              activePreset={activePreset}
              setActivePreset={setActivePreset}
            />
          </div>
        </section>

        {/* ── integration ───────────────────────────────────────── */}
        <section id="integrate" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <Eyebrow n="02">Integrate into a shadcn project</Eyebrow>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-fog/75">
                The default shadcn component path is <span className="data text-beam">@/components/ui</span>.
                If your project doesn't have it yet, create it: the <span className="data text-fog">@/*</span> alias
                in <span className="data text-fog">tsconfig</span> + <span className="data text-fog">components.json</span>{" "}
                is what lets the fog's <span className="data text-fog">"@/lib/utils"</span> import resolve, and keeping every
                primitive under one <span className="data text-beam">ui/</span> folder is the convention the shadcn CLI
                writes and updates against — drift from it and <span className="data text-fog">npx shadcn add</span> stops
                finding your components.
              </p>
              <div className="glass rounded-xl p-4">
                <div className="mb-3 flex items-center gap-2">
                  <FolderTree className="h-3.5 w-3.5 text-beam" />
                  <span className="eyebrow">Where it lands</span>
                </div>
                <pre className="data overflow-x-auto text-[0.72rem] leading-relaxed text-fog/85">{`src/
├─ components/
│  └─ ui/
│     ├─ realistic-fog-background.tsx   ← Component
│     └─ demo.tsx                       ← MistBackground
└─ lib/
   └─ utils.ts                          ← cn()`}</pre>
              </div>
            </div>
            <Code code={SETUP} lang="bash" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Code code={USAGE} />
            <div className="glass rounded-xl p-5">
              <span className="eyebrow">Field notes</span>
              <dl className="mt-4 space-y-4">
                {FIELD_NOTES.map((n) => (
                  <div key={n.q}>
                    <dt className="text-sm font-semibold text-fog">{n.q}</dt>
                    <dd className="mt-1 text-[0.82rem] leading-relaxed text-fog/70">{n.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── API ───────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <Eyebrow n="03">Parameterized API</Eyebrow>
          <p className="mb-5 max-w-2xl text-sm leading-relaxed text-fog/75">
            The verbatim <span className="data text-beam">MistBackground</span> takes no props by design.
            For tuning, the <span className="data text-beam">MistField</span> variant accepts:
          </p>
          <div className="glass overflow-hidden rounded-xl">
            <div className="grid grid-cols-[1.1fr_1fr_0.7fr_2.4fr] gap-2 border-b border-line px-4 py-2.5 text-[0.58rem] uppercase tracking-[0.2em] text-ash">
              <span>prop</span><span>type</span><span>default</span><span>role</span>
            </div>
            {API.map(([prop, type, def, role]) => (
              <div key={prop} className="grid grid-cols-[1.1fr_1fr_0.7fr_2.4fr] gap-2 border-b border-line/50 px-4 py-2.5 last:border-0">
                <span className="data text-xs text-beam">{prop}</span>
                <span className="data text-xs text-fog/70">{type}</span>
                <span className="data text-xs text-ash">{def}</span>
                <span className="text-xs leading-snug text-fog/70">{role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── source ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <Eyebrow n="04">Copy the component</Eyebrow>
          <Code code={demoSource} />
        </section>

        {/* ── footer ────────────────────────────────────────────── */}
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 py-8 sm:flex-row sm:items-center sm:px-8">
            <div className="flex items-center gap-2.5">
              <Waves className="h-4 w-4 text-beam" strokeWidth={1.7} />
              <span className="data text-xs tracking-[0.3em] text-fog">HAAR</span>
              <span className="data text-[0.62rem] text-ash">· realistic fog background</span>
            </div>
            <span className="data text-[0.62rem] text-ash">
              WebGL · GLSL fBm · React · TypeScript · Tailwind · shadcn/ui
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass rounded-lg px-3.5 py-3">
      <div className="flex items-center gap-1.5 text-ash">
        {icon}
        <span className="eyebrow text-[0.56rem]">{label}</span>
      </div>
      <div className="data mt-1.5 text-base font-bold tabular-nums text-fog">{value}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-[0.72rem] text-ash">{k}</dt>
      <dd className="data text-[0.72rem] tabular-nums text-beam">{v}</dd>
    </div>
  );
}
