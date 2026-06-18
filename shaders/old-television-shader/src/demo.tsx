import { useCallback, useRef, useState, type ReactNode } from "react";
import {
  Antenna,
  Tv,
  Radio,
  Power,
  Gauge,
  Boxes,
  Terminal,
  FolderTree,
  Package,
  Sparkles,
} from "lucide-react";
import { OldTelevisionShader } from "@/components/ui/old-television-shader";
import { CrtScreen } from "@/components/crt-screen";
import { SignalMeter, useFps } from "@/components/signal-meter";
import {
  Fader,
  ToggleSwitch,
  ColorChip,
} from "@/components/broadcast-controls";
import { CodeBlock } from "@/components/code-block";
import { ApiTable, PROP_ROWS } from "@/components/api-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTypewriter } from "@/hooks/use-typewriter";
import { CHANNELS, type Channel } from "@/lib/channels";
import { cn } from "@/lib/utils";

/**
 * DemoOne — the integration the brief asks for. The old-television shader is the
 * live picture tube of a "Cathode Vault" broadcast monitor; everything around it
 * is a calm control desk that drives the component's props and reads its real
 * per-frame signal back off the GPU. Below the fold is the full shadcn / Tailwind
 * / TypeScript integration story.
 */
export default function DemoOne() {
  const [channel, setChannel] = useState<Channel>(CHANNELS[0]);
  const [waveIntensity, setWave] = useState(channel.waveIntensity);
  const [grainIntensity, setGrain] = useState(channel.grainIntensity);
  const [brightnessPulse, setBright] = useState(channel.brightnessPulse);
  const [powered, setPowered] = useState(true);
  const [paused, setPaused] = useState(false);

  const [luminance, setLuminance] = useState(0);
  const fps = useFps();

  // Throttle React updates from the GPU probe to avoid churn.
  const lastLum = useRef(0);
  const handleSample = useCallback((lum: number) => {
    const now = performance.now();
    if (now - lastLum.current > 110) {
      lastLum.current = now;
      setLuminance(lum);
    }
  }, []);

  const tune = (c: Channel) => {
    setChannel(c);
    setWave(c.waveIntensity);
    setGrain(c.grainIntensity);
    setBright(c.brightnessPulse);
  };

  return (
    <div className="relative min-h-svh w-full overflow-x-hidden">
      <BroadcastBar channel={channel} powered={powered} fps={fps} />

      {/* ───────────────────────── HERO ───────────────────────── */}
      <header className="relative mx-auto max-w-[1240px] px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
        <div className="grid items-start gap-8 lg:grid-cols-[1.32fr_1fr]">
          {/* Left: title + live tube */}
          <div>
            <div className="flex animate-rise flex-wrap items-center gap-2.5">
              <Badge variant="phosphor">
                <Antenna className="h-3 w-3" />
                react-three-fiber · drei · three
              </Badge>
              <Badge variant="outline">@/components/ui</Badge>
            </div>

            <h1 className="mt-5 animate-rise font-slate text-[clamp(2.7rem,8vw,5.6rem)] uppercase leading-[0.86] tracking-[0.01em] text-bone-50 [animation-delay:80ms]">
              Old&nbsp;Television
              <span className="block text-phosphor-300 [text-shadow:0_0_30px_rgba(38,240,106,0.45)]">
                Shader
              </span>
            </h1>

            <p className="mt-5 max-w-xl animate-rise font-sans text-[15px] leading-relaxed text-bone-200/75 [animation-delay:160ms]">
              A flowing-sine + fractal-noise field that mixes two colours into
              analog snow — the brief's verbatim{" "}
              <code className="rounded bg-cabinet-800 px-1.5 py-0.5 font-mono text-[12px] text-phosphor-200">
                WaveShaderMaterial
              </code>
              , dropped into shadcn's <em>components/ui</em> and wired up as a
              tunable picture tube.
            </p>

            <div className="mt-7 animate-rise [animation-delay:220ms]">
              <CrtScreen
                powering={powered}
                tube={
                  powered ? (
                    <OldTelevisionShader
                      colorA={channel.colorA}
                      colorB={channel.colorB}
                      waveIntensity={waveIntensity}
                      grainIntensity={grainIntensity}
                      brightnessPulse={brightnessPulse}
                      paused={paused}
                      onSample={handleSample}
                    />
                  ) : (
                    <div className="h-full w-full bg-black" />
                  )
                }
              >
                {powered ? (
                  <ScreenOverlay channel={channel} paused={paused} />
                ) : (
                  <StandbyOverlay />
                )}
              </CrtScreen>
            </div>
          </div>

          {/* Right: tuning panel */}
          <aside className="animate-rise lg:sticky lg:top-24 [animation-delay:300ms]">
            <TuningPanel
              channel={channel}
              channels={CHANNELS}
              onTune={tune}
              wave={waveIntensity}
              grain={grainIntensity}
              bright={brightnessPulse}
              onWave={setWave}
              onGrain={setGrain}
              onBright={setBright}
              powered={powered}
              onPower={() => setPowered((p) => !p)}
              paused={paused}
              onPause={() => setPaused((p) => !p)}
              luminance={luminance}
              fps={fps}
            />
          </aside>
        </div>
      </header>

      <IntegrationStory />

      <SiteFooter />
    </div>
  );
}

/* ─────────────────────── Top broadcast bar ─────────────────────── */
function BroadcastBar({
  channel,
  powered,
  fps,
}: {
  channel: Channel;
  powered: boolean;
  fps: number;
}) {
  return (
    <div className="fixed inset-x-0 top-0 z-40 border-b border-cabinet-800/80 bg-cabinet-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-3 px-5 py-3 sm:px-8">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-sm border border-phosphor-400/40 bg-phosphor-500/10">
            <Tv className="h-4 w-4 text-phosphor-300" />
          </span>
          <div className="leading-tight">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-bone-100">
              Cathode Vault
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-300/55">
              Broadcast Component Lab
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-cabinet-700 bg-cabinet-900/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-200/70 md:flex">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                powered
                  ? "animate-rec-blink bg-signal-red"
                  : "bg-bone-300/40",
              )}
            />
            {powered ? "On Air" : "Standby"}
          </span>
          <span className="hidden items-center gap-2 rounded-full border border-cabinet-700 bg-cabinet-900/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-200/70 sm:flex">
            CH {channel.no} · {channel.band}
          </span>
          <span className="rounded-full border border-cabinet-700 bg-cabinet-900/60 px-3 py-1.5 font-mono text-[10px] tabular-nums text-phosphor-200">
            {fps} fps
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── On-screen display (over the tube) ─────────────────── */
function ScreenOverlay({
  channel,
  paused,
}: {
  channel: Channel;
  paused: boolean;
}) {
  const { rendered } = useTypewriter(
    [
      `> CATHODE VAULT  CH ${channel.no}`,
      `> BAND ${channel.band} · ${channel.name}`,
      `> SIGNAL LOCK ... OK`,
    ],
    { speed: 30, lineDelay: 420, startDelay: 600 },
  );

  return (
    <div className="relative h-full w-full font-crt text-phosphor-200">
      {/* Corner channel slate. */}
      <div className="absolute right-3 top-3 text-right leading-none">
        <span className="phosphor-text block text-[clamp(2.4rem,7vw,4.2rem)] leading-[0.8]">
          {channel.no}
        </span>
        <span className="phosphor-text block text-[clamp(0.7rem,1.8vw,1rem)] tracking-[0.2em]">
          {channel.band}
        </span>
      </div>

      {/* Top-left typed diagnostics. */}
      <div className="absolute left-3 top-3 space-y-0.5 text-[clamp(0.7rem,1.7vw,0.95rem)] leading-tight">
        {rendered.map((line, i) => (
          <p key={i} className="phosphor-text">
            {line}
            {i === rendered.length - 1 && (
              <span className="animate-caret">▮</span>
            )}
          </p>
        ))}
      </div>

      {/* Centre crosshair reticle. */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-phosphor-300/40" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-phosphor-300/40" />
      </div>

      {/* Bottom status ribbon. */}
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[clamp(0.65rem,1.6vw,0.9rem)] tracking-[0.12em]">
        <span className="phosphor-text">
          {paused ? "❚❚ HOLD" : "▶ LIVE"}
        </span>
        <span className="phosphor-text uppercase">{channel.name}</span>
      </div>
    </div>
  );
}

function StandbyOverlay() {
  return (
    <div className="grid h-full w-full place-items-center">
      <div className="text-center">
        <p className="font-crt text-[clamp(1.4rem,5vw,2.4rem)] text-bone-300/40">
          — STANDBY —
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-bone-300/30">
          press power
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────── Tuning panel (right rail) ─────────────────────── */
function TuningPanel(props: {
  channel: Channel;
  channels: Channel[];
  onTune: (c: Channel) => void;
  wave: number;
  grain: number;
  bright: number;
  onWave: (v: number) => void;
  onGrain: (v: number) => void;
  onBright: (v: number) => void;
  powered: boolean;
  onPower: () => void;
  paused: boolean;
  onPause: () => void;
  luminance: number;
  fps: number;
}) {
  const {
    channel,
    channels,
    onTune,
    wave,
    grain,
    bright,
    onWave,
    onGrain,
    onBright,
    powered,
    onPower,
    paused,
    onPause,
    luminance,
    fps,
  } = props;

  return (
    <div className="plate space-y-5 rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-phosphor-300" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-100">
            Tuner
          </span>
        </div>
        <Badge variant={powered ? "phosphor" : "outline"}>
          {powered ? "Powered" : "Off"}
        </Badge>
      </div>

      {/* Channel dial. */}
      <div>
        <p className="etched mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-200/60">
          Channel preset
        </p>
        <div className="grid grid-cols-3 gap-2">
          {channels.map((c) => {
            const active = c.id === channel.id;
            return (
              <button
                key={c.id}
                onClick={() => onTune(c)}
                className={cn(
                  "group flex flex-col items-start gap-1 rounded-sm border px-2.5 py-2 text-left transition-all",
                  active
                    ? "border-phosphor-400/70 bg-phosphor-500/10 shadow-[0_0_16px_-6px_rgba(38,240,106,0.8)]"
                    : "border-cabinet-700 bg-cabinet-950/40 hover:border-phosphor-400/40",
                )}
              >
                <span
                  className={cn(
                    "font-crt text-lg leading-none",
                    active ? "phosphor-text" : "text-bone-200/70",
                  )}
                >
                  {c.no}
                </span>
                <span className="font-mono text-[8px] uppercase leading-tight tracking-[0.12em] text-bone-200/55">
                  {c.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mix endpoints. */}
      <div className="flex items-center justify-between gap-3 rounded-sm border border-cabinet-700/70 bg-cabinet-950/40 px-3 py-2.5">
        <ColorChip label="colorA" value={channel.colorA} />
        <span className="font-mono text-[10px] text-bone-200/40">→</span>
        <ColorChip label="colorB" value={channel.colorB} />
      </div>

      {/* Faders → uniforms. */}
      <div className="space-y-4">
        <Fader
          label="Wave · uWave"
          value={wave}
          min={0}
          max={2}
          step={0.01}
          onChange={onWave}
        />
        <Fader
          label="Grain · uGrain"
          value={grain}
          min={0}
          max={2}
          step={0.01}
          onChange={onGrain}
        />
        <Fader
          label="Bright · uBright"
          value={bright}
          min={0}
          max={2}
          step={0.01}
          onChange={onBright}
        />
      </div>

      {/* Switches. */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cabinet-800/70 pt-4">
        <ToggleSwitch
          on={powered}
          onToggle={onPower}
          labelOn="Tube on"
          labelOff="Tube off"
        />
        <ToggleSwitch
          on={!paused}
          onToggle={onPause}
          labelOn="Running"
          labelOff="Held"
        />
      </div>

      {/* Live signal meter (real GPU readback). */}
      <div className="rounded-sm border border-cabinet-700/70 bg-cabinet-950/40 p-3">
        <SignalMeter luminance={powered ? luminance : 0} fps={fps} />
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={onPower}
      >
        <Power className="h-3.5 w-3.5" />
        {powered ? "Cut transmission" : "Resume transmission"}
      </Button>
    </div>
  );
}

/* ════════════════════════ Integration story ════════════════════════ */

const SETUP_CODE = `# 1 — scaffold a shadcn project (Vite + React + TypeScript)
npm create vite@latest cathode-vault -- --template react-ts
cd cathode-vault

# 2 — add Tailwind + the shadcn CLI, then init
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npx shadcn@latest init        # pick: TypeScript, CSS variables, neutral`;

const INSTALL_CODE = `npm install three @react-three/fiber @react-three/drei
npm install -D @types/three`;

const USAGE_CODE = `// demo.tsx — the brief's drop-in still works unchanged
import PolishedShader from "@/components/ui/old-television-shader"

export default function Home() {
  return <PolishedShader />
}

// …or drive it as a tunable component:
import { OldTelevisionShader } from "@/components/ui/old-television-shader"

<OldTelevisionShader
  colorA="#aaffc0"
  colorB="#02160a"
  waveIntensity={1.15}
  grainIntensity={0.85}
  onSample={(lum) => setSignal(lum)}
/>`;

function IntegrationStory() {
  return (
    <main className="relative mx-auto max-w-[1240px] space-y-20 px-5 pb-24 sm:px-8">
      <Anatomy />
      <UniformDeck />

      {/* Setup */}
      <Section
        kicker="00 · Project structure"
        icon={<FolderTree className="h-4 w-4" />}
        title="A shadcn / Tailwind / TypeScript home"
        lede="The component imports cn from @/lib/utils and renders an R3F canvas, so it expects exactly the shadcn project shape: an @ path alias, Tailwind for the chrome, and TypeScript. If your repo isn't set up that way yet, this gets you there."
      >
        <CodeBlock code={SETUP_CODE} lang="bash" title="setup.sh" />
        <WhyComponentsUi />
      </Section>

      {/* Install */}
      <Section
        kicker="01 · Dependencies"
        icon={<Package className="h-4 w-4" />}
        title="Install the 3D stack"
        lede="The shader is built on react-three-fiber with a drei shaderMaterial and three. No other runtime context, store or provider is required — all state lives in the component's own refs and the host's React state."
      >
        <CodeBlock code={INSTALL_CODE} lang="bash" title="install.sh" />
      </Section>

      {/* Place the file */}
      <Section
        kicker="02 · Drop it in"
        icon={<Terminal className="h-4 w-4" />}
        title="Paste into components/ui, then use it"
        lede="Save the component as src/components/ui/old-television-shader.tsx. The brief's original default export (PolishedShader) is preserved as a full-screen drop-in; the named OldTelevisionShader export adds the typed props below."
      >
        <CodeBlock code={USAGE_CODE} lang="tsx" title="usage.tsx" />
      </Section>

      {/* Props API */}
      <Section
        kicker="03 · API"
        icon={<Boxes className="h-4 w-4" />}
        title="Props & uniforms"
        lede="Every prop maps onto a shader uniform or a render setting. colorA / colorB are the verbatim mix endpoints; the three *Intensity props promote the shader's previously hard-coded constants to live controls; onSample reads the centre pixel back off the GPU."
      >
        <ApiTable rows={PROP_ROWS} />
        <IntegrationAnswers />
      </Section>
    </main>
  );
}

function Section({
  kicker,
  icon,
  title,
  lede,
  children,
}: {
  kicker: string;
  icon: ReactNode;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <Badge variant="amber">
          {icon}
          {kicker}
        </Badge>
        <h2 className="mt-4 font-slate text-[clamp(1.7rem,4vw,2.7rem)] uppercase leading-[0.95] tracking-[0.01em] text-bone-50">
          {title}
        </h2>
        <p className="mt-4 max-w-md font-sans text-[14px] leading-relaxed text-bone-200/70">
          {lede}
        </p>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function WhyComponentsUi() {
  return (
    <div className="panel rounded-md p-4">
      <div className="flex items-center gap-2">
        <FolderTree className="h-4 w-4 text-signal-amber" />
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-100">
          Why /components/ui specifically
        </p>
      </div>
      <p className="mt-3 font-sans text-[13px] leading-relaxed text-bone-200/70">
        shadcn's <code className="text-phosphor-200">components.json</code>{" "}
        resolves the{" "}
        <code className="text-phosphor-200">ui</code> alias to{" "}
        <code className="text-phosphor-200">@/components/ui</code>. Keeping
        primitives there means the <code className="text-phosphor-200">@</code>{" "}
        import in the brief —{" "}
        <code className="text-phosphor-200">
          @/components/ui/old-television-shader
        </code>{" "}
        — resolves with no extra config, the shadcn CLI can update siblings
        without touching your app code, and design-system files stay cleanly
        separated from feature components. If your default path isn't{" "}
        <code className="text-phosphor-200">/components/ui</code>, create it (or
        repoint the alias) before pasting the file.
      </p>
    </div>
  );
}

function IntegrationAnswers() {
  const qa = [
    {
      q: "What data / props will be passed?",
      a: "Two mix colours plus three scalar intensities, a paused flag, and an onSample callback — see the table above. No external data source.",
    },
    {
      q: "State-management requirements?",
      a: "None beyond React. Animation runs in the component's refs; the host holds prop state with useState (this demo uses a channel preset object).",
    },
    {
      q: "Required assets (images, icons)?",
      a: "Zero image assets — the visual is fully procedural GLSL. Icons here are lucide-react; fonts are vendored locally as woff2.",
    },
    {
      q: "Expected responsive behaviour?",
      a: "The canvas fills its container at any size and tracks window resolution; the tube holds a 4:3 face and the chrome reflows to one column on small screens.",
    },
    {
      q: "Best place to use it?",
      a: "As an ambient hero / login backdrop, a 404 or maintenance ‘dead-air’ screen, or — as here — the live surface of a media / broadcast product.",
    },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {qa.map((item) => (
        <div key={item.q} className="panel rounded-md p-3.5">
          <p className="font-mono text-[11px] uppercase leading-snug tracking-[0.12em] text-phosphor-200">
            {item.q}
          </p>
          <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-bone-200/70">
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── Anatomy of the fragment shader ── */
function Anatomy() {
  const steps = [
    {
      tag: "waves",
      title: "Flowing sine field",
      body: "Three offset sines on x, y and (x+y) roll the picture; their amplitude is scaled by uWave.",
    },
    {
      tag: "noise",
      title: "Value + fractal snow",
      body: "smoothNoise and a 4-octave fbm are mixed 0.6 and scaled by uGrain — the analog static.",
    },
    {
      tag: "mix",
      title: "Two-colour smoothstep",
      body: "waves + noise drive a smoothstep(0.2,0.8) that mixes uColorA → uColorB.",
    },
    {
      tag: "glow",
      title: "Centre bloom + breath",
      body: "A radial glow lifts the centre and a sin(uTime) term breathes brightness via uBright.",
    },
  ];
  return (
    <section className="pt-4">
      <div className="flex items-center gap-2">
        <Badge variant="phosphor">
          <Sparkles className="h-3 w-3" />
          Anatomy
        </Badge>
      </div>
      <h2 className="mt-4 max-w-2xl font-slate text-[clamp(1.7rem,4vw,2.7rem)] uppercase leading-[0.95] text-bone-50">
        How the picture is made
      </h2>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.tag} className="panel group rounded-md p-4">
            <div className="flex items-center justify-between">
              <span className="font-crt text-2xl text-phosphor-300/80">
                0{i + 1}
              </span>
              <code className="rounded bg-cabinet-800 px-1.5 py-0.5 font-mono text-[10px] text-signal-cyan/80">
                {s.tag}
              </code>
            </div>
            <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.08em] text-bone-100">
              {s.title}
            </p>
            <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-bone-200/65">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── A compact "uniform deck" reading the shader's own state ── */
function UniformDeck() {
  return (
    <section className="grid gap-5 rounded-xl border border-cabinet-700/70 bg-cabinet-900/40 p-5 sm:p-7 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Badge variant="amber">
          <Gauge className="h-3 w-3" />
          Uniforms
        </Badge>
        <h3 className="mt-3 font-slate text-[clamp(1.4rem,3vw,2rem)] uppercase leading-[0.95] text-bone-50">
          One quad, eight uniforms
        </h3>
        <p className="mt-3 font-sans text-[13px] leading-relaxed text-bone-200/70">
          The whole effect renders on a single 64×64 plane. These are the live
          uniform values being pushed to the GPU this frame.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-2">
        {[
          ["uTime", "clock"],
          ["uColorA", "mix hi"],
          ["uColorB", "mix lo"],
          ["uMouse", "vec2"],
          ["uWave", "amp"],
          ["uGrain", "snow"],
          ["uBright", "pulse"],
          ["uResolution", "vec2"],
        ].map(([name, note]) => (
          <div
            key={name}
            className="rounded-sm border border-cabinet-700/70 bg-cabinet-950/50 p-3"
          >
            <code className="font-mono text-[12px] text-phosphor-200">
              {name}
            </code>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-bone-200/50">
              {note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-cabinet-800/80 bg-cabinet-950/60">
      <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-3 px-5 py-7 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-2.5">
          <Tv className="h-4 w-4 text-phosphor-300" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bone-200/70">
            Cathode Vault · Old Television Shader
          </span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone-300/45">
          Procedural GLSL · react-three-fiber · shadcn/ui
        </p>
      </div>
    </footer>
  );
}
