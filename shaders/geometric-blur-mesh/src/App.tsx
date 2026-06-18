import { useCallback, useEffect, useRef, useState } from "react";
import { Crosshair, Aperture, MousePointer2, Command } from "lucide-react";
import ScopeShader, {
  SHAPE_COUNT,
  type Sample,
} from "@/components/ScopeShader";
import { SOLIDS } from "@/components/solids";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------------------
   Polyhedral Scope — a cursor-defocus specimen viewer.

   The verbatim Geometric Blur Mesh shader is the *specimen under the lens*. Its
   defining, counter-intuitive behaviour is that proximity throws the wireframe
   OUT of focus: the closer the cursor, the blurrier the solid. We frame that as
   an optical instrument. The cursor is a focusing reticle; the page derives a
   live DEFOCUS reading from how near it sits to the specimen, a registry snaps
   between the eight solids, and an autopilot performs the cursor choreography
   until a human takes the controls.
---------------------------------------------------------------------------- */

export default function App() {
  const [shape, setShape] = useState(0);
  const [engaged, setEngaged] = useState(false);

  // Live cursor + focus telemetry, held in a ref and mirrored to a few DOM
  // nodes by hand each frame. Driving React state at 60fps would thrash the
  // whole chrome; instead the reticle and the numeric readouts are updated
  // imperatively from the per-frame sample.
  const sampleRef = useRef<Sample>({ x: 0, y: 0, influence: 0, auto: true });
  const reticleRef = useRef<HTMLDivElement>(null);
  const dialRef = useRef<SVGCircleElement>(null);
  const defocusNumRef = useRef<HTMLSpanElement>(null);
  const stateWordRef = useRef<HTMLSpanElement>(null);

  const cycle = useCallback(() => setShape((s) => (s + 1) % SHAPE_COUNT), []);

  const onSample = useCallback((s: Sample) => {
    sampleRef.current = s;
    const ret = reticleRef.current;
    if (ret) {
      ret.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%)`;
      // The reticle tightens (rotates / shrinks) the more defocused we are —
      // it visually "loses focus" exactly where the specimen does.
      ret.style.setProperty("--infl", s.influence.toFixed(3));
    }
    const pct = Math.round(s.influence * 100);
    if (defocusNumRef.current)
      defocusNumRef.current.textContent = String(pct).padStart(2, "0");
    if (dialRef.current) {
      // Stroke dashoffset maps the focus ring: full ring = fully defocused.
      const C = 2 * Math.PI * 26;
      dialRef.current.style.strokeDashoffset = String(C * (1 - s.influence));
    }
    if (stateWordRef.current)
      stateWordRef.current.textContent = s.auto ? "AUTO SWEEP" : "MANUAL";
  }, []);

  // Number keys 1–8 jump straight to a solid (the prompt's keyboard contract).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "8") {
        const i = Number(e.key) - 1;
        if (i < SHAPE_COUNT) setShape(i);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const active = SOLIDS[shape];

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-ink text-frost">
      {/* The specimen stage fills the viewport. Registry clicks are forwarded
          to the shader's own click-to-cycle by ScopeShader. */}
      <ScopeShader
        shape={shape}
        onCycle={cycle}
        onSample={onSample}
        onEngage={() => setEngaged(true)}
      />

      {/* Optical vignette + faint bench grain so the chrome reads as housing. */}
      <div className="pointer-events-none absolute inset-0 z-10 [background:radial-gradient(120%_120%_at_50%_38%,transparent_42%,rgba(5,7,13,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-10 opacity-[0.05] [background-image:linear-gradient(rgba(168,180,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(168,180,255,0.6)_1px,transparent_1px)] [background-size:46px_46px]" />

      {/* ---- Focusing reticle (custom cursor) -------------------------------- */}
      <div
        ref={reticleRef}
        className="reticle pointer-events-none absolute left-0 top-0 z-30 will-change-transform"
        style={{ ["--infl" as string]: "0" }}
      >
        <Crosshair
          className="h-8 w-8 text-glass"
          style={{
            opacity: "calc(0.35 + var(--infl) * 0.55)",
            transform: "rotate(calc(var(--infl) * 45deg)) scale(calc(1 + var(--infl) * 0.5))",
            filter: "drop-shadow(0 0 6px rgba(168,180,255,0.5))",
          }}
          strokeWidth={1.2}
        />
      </div>

      {/* ---- Top instrument bar --------------------------------------------- */}
      <header className="scope-rise pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-6 py-5 sm:px-9 sm:py-7">
        <div className="flex items-center gap-3">
          <Aperture className="hairline-pulse h-5 w-5 text-glass" strokeWidth={1.4} />
          <div className="leading-tight">
            <div className="font-mono text-[10px] uppercase tracking-widest2 text-dim">
              Optical Geometry Bench
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-steel">
              Scope&nbsp;·&nbsp;<span className="text-frost">PLY-08</span>
            </div>
          </div>
        </div>
        <div className="hidden text-right sm:block">
          <div className="font-mono text-[10px] uppercase tracking-widest2 text-dim">
            Specimen
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-steel">
            <span ref={stateWordRef}>AUTO SWEEP</span>
          </div>
        </div>
      </header>

      {/* ---- Hero thesis ----------------------------------------------------- */}
      <section className="scope-fade pointer-events-none absolute left-6 top-1/2 z-20 -translate-y-1/2 sm:left-9">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-widest2 text-glass/80">
          Cursor&nbsp;=&nbsp;defocus
        </p>
        <h1 className="font-display text-[clamp(2.6rem,7vw,5.5rem)] font-medium leading-[0.92] tracking-tight text-frost">
          Bring it
          <br />
          <span className="italic text-glass">out of focus.</span>
        </h1>
        <p className="mt-5 max-w-xs font-body text-sm leading-relaxed text-steel">
          A wireframe specimen under a live lens. The nearer your cursor, the
          blurrier the solid — proximity defocuses instead of sharpening. Click
          anywhere to cycle the eight solids.
        </p>
      </section>

      {/* ---- Left specimen registry ----------------------------------------- */}
      <nav
        aria-label="Specimen registry"
        className="scope-rise absolute bottom-6 left-6 z-20 hidden w-[230px] sm:left-9 sm:block"
      >
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest2 text-dim">
          <span>Registry</span>
          <span className="text-steel">
            {String(shape + 1).padStart(2, "0")}/08
          </span>
        </div>
        <ul className="space-y-px border-t border-seam/70">
          {SOLIDS.map((s) => {
            const on = s.index === shape;
            return (
              <li key={s.index}>
                <button
                  type="button"
                  onClick={() => setShape(s.index)}
                  aria-pressed={on}
                  className={cn(
                    "group flex w-full items-center gap-3 border-b border-seam/40 py-1.5 text-left transition-colors duration-200 focus:outline-none focus-visible:bg-glass/10",
                    on ? "text-frost" : "text-steel hover:text-frost",
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-[11px] tabular-nums",
                      on ? "text-glass" : "text-dim",
                    )}
                  >
                    {String(s.index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "w-4 text-center font-mono text-sm transition-transform duration-200",
                      on ? "scale-110 text-glass" : "text-dim group-hover:text-steel",
                    )}
                    aria-hidden
                  >
                    {s.glyph}
                  </span>
                  <span className="flex-1 truncate font-mono text-[11px] uppercase tracking-[0.18em]">
                    {s.name}
                  </span>
                  <span
                    className={cn(
                      "h-3 w-px transition-all duration-200",
                      on ? "bg-glass" : "bg-transparent",
                    )}
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ---- Bottom-right: defocus dial + readouts -------------------------- */}
      <aside className="scope-rise absolute bottom-6 right-6 z-20 sm:right-9">
        <div className="flex items-end gap-5">
          {/* numeric readouts */}
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-widest2 text-dim">
              Active solid
            </div>
            <div className="font-display text-2xl leading-tight text-frost">
              {active.name}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
              <span className="text-dim">Vertices</span>
              <span className="text-right tabular-nums text-frost">
                {active.vertices ?? "—"}
              </span>
              <span className="text-dim">Edges</span>
              <span className="text-right tabular-nums text-frost">
                {active.edges ?? "—"}
              </span>
              <span className="text-dim">Defocus</span>
              <span className="text-right tabular-nums text-glass">
                <span ref={defocusNumRef} data-defocus>
                  00
                </span>
                %
              </span>
            </div>
            <div className="mt-2 max-w-[200px] text-right font-body text-[11px] leading-snug text-dim">
              {active.family}
            </div>
          </div>

          {/* the signature: a focus dial that fills with defocus */}
          <div className="relative h-[68px] w-[68px] shrink-0">
            <svg viewBox="0 0 68 68" className="h-full w-full -rotate-90">
              <circle
                cx="34"
                cy="34"
                r="26"
                fill="none"
                stroke="rgba(26,37,54,0.9)"
                strokeWidth="3"
              />
              <circle
                ref={dialRef}
                cx="34"
                cy="34"
                r="26"
                fill="none"
                stroke="#a8b4ff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 26}
                strokeDashoffset={2 * Math.PI * 26}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Crosshair className="h-4 w-4 text-glass/70" strokeWidth={1.4} />
            </div>
          </div>
        </div>
      </aside>

      {/* ---- Bottom-center interaction legend ------------------------------- */}
      <footer className="scope-fade pointer-events-none absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 sm:bottom-7 md:block">
        <div className="flex items-center gap-6 rounded-full border border-seam/70 bg-graphite/55 px-5 py-2 backdrop-blur-sm">
          <Legend icon={<MousePointer2 className="h-3.5 w-3.5" />} label="Move" hint="defocus" />
          <span className="h-3 w-px bg-seam" />
          <Legend icon={<Crosshair className="h-3.5 w-3.5" />} label="Click" hint="cycle solid" />
          <span className="h-3 w-px bg-seam" />
          <Legend icon={<Command className="h-3.5 w-3.5" />} label="1–8" hint="jump" />
        </div>
        {!engaged && (
          <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest2 text-glass/60">
            Autopilot sweeping — take the cursor anytime
          </p>
        )}
      </footer>
    </main>
  );
}

function Legend({
  icon,
  label,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  hint: string;
}) {
  return (
    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
      <span className="text-glass">{icon}</span>
      <span className="text-frost">{label}</span>
      <span className="text-dim">{hint}</span>
    </span>
  );
}
