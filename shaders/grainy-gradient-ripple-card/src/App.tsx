import { useEffect, useRef, useState } from "react";
import { Droplets, Crosshair, MousePointerClick, FlaskConical } from "lucide-react";
import { ShaderStage, type ShaderStageHandle } from "@/components/shader-stage";
import { FaderDeck } from "@/components/fader-deck";
import { PresetBank } from "@/components/preset-bank";
import { PaletteStrip } from "@/components/palette-strip";
import { Telemetry } from "@/components/telemetry";
import {
  DEFAULT_FIELD,
  PRESETS,
  fieldsEqual,
  type FieldParams,
  type FieldPreset,
} from "@/lib/field";

/** Corner reticle bracket so the live card reads as a specimen under analysis. */
function Bracket({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      aria-hidden="true"
    >
      <path d="M1 13 V1 H13" />
      <path d="M27 1 H39 V13" />
      <path d="M39 27 V39 H27" />
      <path d="M13 39 H1 V27" />
    </svg>
  );
}

export default function App() {
  const [field, setField] = useState<FieldParams>({ ...DEFAULT_FIELD });
  const [total, setTotal] = useState(0);
  const [activeRipples, setActiveRipples] = useState(0);

  const stage = useRef<ShaderStageHandle>(null);

  // Which preset (if any) the current field exactly matches.
  const activeCode =
    PRESETS.find((p) => fieldsEqual(p.values, field))?.code ?? null;
  const activeName =
    PRESETS.find((p) => p.code === activeCode)?.name ?? "Custom";

  const setChannel = (key: keyof FieldParams, value: number) =>
    setField((f) => ({ ...f, [key]: value }));

  const selectPreset = (p: FieldPreset) => setField({ ...p.values });

  // Poll the live ripple count off the shader for the telemetry strip.
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveRipples(stage.current?.activeRipples() ?? 0);
    }, 200);
    return () => window.clearInterval(id);
  }, []);

  // Auto-demonstrator: cast a ripple periodically so the field is always alive
  // (and so the headless demo recording shows the ripple behaviour without a
  // real click). Pauses when the user prefers reduced motion.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      stage.current?.castCentre();
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-bone-100 text-ink-800 lg:h-screen">
      {/* Paper grain over the whole console. */}
      <div className="pointer-events-none fixed inset-0 z-50 paper-grain opacity-[0.04] mix-blend-multiply" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1320px] flex-col lg:h-screen lg:min-h-0">
        {/* ── Masthead ──────────────────────────────────────────────── */}
        <header className="flex flex-shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-700 bg-ink-800 text-bone-50">
              <FlaskConical className="h-4 w-4" strokeWidth={1.6} />
            </span>
            <div className="leading-none">
              <p className="font-display text-[17px] font-semibold tracking-tight text-ink-900">
                Chroma&nbsp;Foundry
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wide2 text-ink-400">
                Grainy&nbsp;Gradient&nbsp;·&nbsp;Ripple&nbsp;Plate
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-6 font-mono text-[10px] uppercase tracking-wide2 text-ink-400 md:flex">
            <span className="flex items-center gap-1.5">
              <Droplets className="h-3 w-3 text-pigment-ember" strokeWidth={1.6} />
              fbm warp · grain
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-pigment-cobalt animate-blink" />
              webgl online
            </span>
            <span className="text-ink-400/70">v1.0</span>
          </div>
        </header>

        {/* ── Body: instrument rail + specimen stage ────────────────── */}
        <div className="flex flex-1 flex-col lg:min-h-0 lg:flex-row">
          {/* Instrument rail */}
          <aside className="flex w-full flex-col border-b border-line bg-bone-50/70 lg:w-[360px] lg:flex-shrink-0 lg:border-b-0 lg:border-r">
            <div className="border-b border-line px-5 py-5 sm:px-7">
              <p className="font-mono text-[10px] uppercase tracking-wide2 text-pigment-ember">
                Bench&nbsp;·&nbsp;01
              </p>
              <h1 className="mt-2 max-w-[20ch] font-display text-[27px] font-semibold leading-[1.05] tracking-tight text-ink-900">
                A pourable gradient, mixed live.
              </h1>
              <p className="mt-2.5 max-w-[42ch] font-sans text-[13px] leading-relaxed text-ink-500">
                A grainy multi-stop gradient rendered on a single Three.js quad.
                Tune the noise &amp; warp, recall a patch, then tap the plate to
                send ripples through the pigment.
              </p>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-7">
              <PaletteStrip />
              <div className="rule h-px" />
              <FaderDeck values={field} onChange={setChannel} />
              <div className="rule h-px" />
              <PresetBank activeCode={activeCode} onSelect={selectPreset} />
              <div className="rule h-px" />
              <Telemetry
                getClock={() => stage.current?.getClock() ?? 0}
                activeRipples={activeRipples}
                totalRipples={total}
              />
            </div>

            <div className="flex-shrink-0 border-t border-line px-5 py-3 sm:px-7">
              <p className="font-mono text-[9px] leading-relaxed text-ink-400">
                <span className="text-ink-600">
                  @/components/ui/gradient-shader-card
                </span>
                {" — "}drop-in GrainyGradient · r3f + three.js
              </p>
            </div>
          </aside>

          {/* Specimen stage */}
          <main className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-10 sm:px-8 lg:py-6">
            {/* Soft radial wash behind the plate. */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 40%, #fcfaf6 0%, #f6f2ea 55%, #efe9dd 100%)",
              }}
              aria-hidden="true"
            />

            {/* Faint registration grid. */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  "linear-gradient(#e4dccb 1px, transparent 1px), linear-gradient(90deg, #e4dccb 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage:
                  "radial-gradient(circle at 50% 45%, black 0%, transparent 75%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 45%, black 0%, transparent 75%)",
              }}
              aria-hidden="true"
            />

            <div
              className="relative w-full animate-rise"
              style={{
                // Cap the whole plate composition so it always fits the fold:
                // shrink with available height (rooms for caption + hint + chrome).
                maxWidth: "min(820px, calc((100vh - 290px) * 4 / 3))",
              }}
            >
              {/* Plate caption row. */}
              <div className="mb-3 flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-ultra text-ink-400">
                    Specimen&nbsp;·&nbsp;{activeName}
                  </p>
                  <h2 className="mt-1.5 font-display text-[clamp(1.9rem,4.4vw,3rem)] font-semibold leading-[0.95] tracking-tight text-ink-900">
                    Pigment&nbsp;Pour&nbsp;No.&nbsp;01
                  </h2>
                </div>
                <span className="hidden items-center gap-1.5 rounded-full border border-line-strong bg-bone-50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-ink-500 sm:flex">
                  <Crosshair className="h-3 w-3 text-pigment-ember" strokeWidth={1.6} />
                  800 × 600
                </span>
              </div>

              {/* The plate, framed with reticle brackets. */}
              <div className="relative mx-auto w-fit">
                <ShaderStage
                  ref={stage}
                  field={field}
                  onTotalChange={setTotal}
                />

                <Bracket className="pointer-events-none absolute -left-3 -top-3 h-7 w-7 text-ink-400" />
                <Bracket className="pointer-events-none absolute -right-3 -top-3 h-7 w-7 text-ink-400" />
                <Bracket className="pointer-events-none absolute -bottom-3 -left-3 h-7 w-7 text-ink-400" />
                <Bracket className="pointer-events-none absolute -bottom-3 -right-3 h-7 w-7 text-ink-400" />
              </div>

              {/* Interaction hint. */}
              <div className="mt-4 flex items-center justify-center">
                <span className="flex items-center gap-2 rounded-full border border-line-strong bg-bone-50/80 px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-ink-500 backdrop-blur-sm">
                  <MousePointerClick
                    className="h-3.5 w-3.5 text-pigment-ember"
                    strokeWidth={1.6}
                  />
                  click&nbsp;the&nbsp;plate&nbsp;to&nbsp;cast&nbsp;a&nbsp;ripple
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
