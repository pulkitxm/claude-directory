import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * CrtScreen — the vintage television cabinet that frames the live shader as a
 * curved picture tube. Children are layered *over* the tube (on-screen display,
 * channel slate, reticle…). The shader canvas itself is passed as `tube`.
 */
export function CrtScreen({
  tube,
  children,
  className,
  powering,
}: {
  tube: ReactNode;
  children?: ReactNode;
  className?: string;
  powering?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[26px] p-3 sm:p-4",
        // Moulded plastic cabinet.
        "bg-gradient-to-b from-cabinet-800 to-cabinet-950",
        "shadow-cabinet",
        className,
      )}
    >
      {/* Outer cabinet bevel highlight. */}
      <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/5" />

      {/* Tube well — inset, dark, rounded like a CRT face.
          NOTE: the live canvas wrapper is never transform-scaled — R3F sizes the
          canvas from this element via a ResizeObserver, so any scaleY() on an
          ancestor would latch a collapsed canvas height. The power-on flash is a
          pure overlay layered ABOVE the (correctly-sized) picture instead. */}
      <div className="relative overflow-hidden rounded-[18px] bg-black shadow-tube">
        {/* The live picture (shader canvas) — full-bleed, untransformed. */}
        <div className="absolute inset-0">{tube}</div>

        {/* Convex glass + scanline + shadow-mask stack. */}
        <div className="pointer-events-none absolute inset-0 scanlines opacity-70" />
        <div className="pointer-events-none absolute inset-0 shadow-mask opacity-40 mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 tube-vignette" />
        {/* A slow horizontal tracking bar drifting down the glass. */}
        <div className="pointer-events-none absolute inset-x-0 -top-1/2 h-1/2 animate-scan-drift bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
        {/* Glass glare. */}
        <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rotate-12 rounded-full bg-white/[0.04] blur-2xl" />

        {/* Power-on flash: a bright band that collapses to a line then fades —
            the classic CRT degauss, done as an overlay so it can't resize the
            canvas. Keyed so it replays whenever the tube is switched on. */}
        {powering && (
          <div
            key={String(powering)}
            className="pointer-events-none absolute inset-0 origin-center animate-power-on bg-white mix-blend-screen"
          />
        )}

        {/* Aspect spacer keeps the tube 4:3-ish regardless of width. */}
        <div className="aspect-[4/3] w-full" />

        {/* Overlaid UI (passed by the host). */}
        <div className="absolute inset-0">{children}</div>
      </div>

      {/* Cabinet underbar with a brand plate + tuning dial cluster. */}
      <div className="mt-3 flex items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-2">
          <span className="font-slate text-[13px] tracking-[0.18em] text-bone-200/90">
            CATHODE&nbsp;VAULT
          </span>
          <span className="hidden font-mono text-[9px] uppercase tracking-[0.28em] text-bone-300/50 sm:inline">
            Model OT-23
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Two tuning knobs. */}
          <Knob spinning />
          <Knob />
          {/* Speaker grille. */}
          <div className="hidden h-7 w-16 rounded-[3px] bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.06)_0_2px,transparent_2px_4px)] sm:block" />
        </div>
      </div>
    </div>
  );
}

function Knob({ spinning }: { spinning?: boolean }) {
  return (
    <span className="relative grid h-6 w-6 place-items-center rounded-full bg-gradient-to-b from-cabinet-700 to-cabinet-950 shadow-knob">
      <span
        className={cn(
          "absolute h-2.5 w-[2px] rounded-full bg-bone-200/70",
          spinning && "animate-dial-spin",
        )}
        style={{ transformOrigin: "center 9px", top: "3px" }}
      />
    </span>
  );
}
