import { cn } from "@/lib/utils";

/**
 * A single corner bracket drawn at each edge of the observation window so the
 * live field reads as something under instrument framing rather than a stock
 * full-bleed hero. Rotation is applied by the caller per corner.
 */
export function Reticle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={cn("h-7 w-7 text-phosphor-400/70", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      aria-hidden="true"
    >
      <path d="M1 14 V1 H14" />
      <path d="M7 7 H7.01" strokeWidth="2" strokeLinecap="round" />
      <path d="M1 22 H6" className="opacity-50" />
      <path d="M22 1 V6" className="opacity-50" />
    </svg>
  );
}

/**
 * The four brackets positioned at the corners of a `relative` container.
 */
export function ReticleFrame() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Reticle className="absolute left-3 top-3" />
      <Reticle className="absolute right-3 top-3 rotate-90" />
      <Reticle className="absolute bottom-3 right-3 rotate-180" />
      <Reticle className="absolute bottom-3 left-3 -rotate-90" />
    </div>
  );
}
