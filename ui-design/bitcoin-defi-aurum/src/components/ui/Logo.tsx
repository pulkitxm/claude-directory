import { cn } from "@/lib/utils";

/**
 * AURUM mark — an orbital node: an inner gradient-filled hexagonal block
 * (a "block" in the chain) ringed by an orbiting dashed circle, echoing the
 * hero orb at glyph scale.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("shrink-0", className)}
      role="img"
      aria-label="AURUM logo"
    >
      <defs>
        <linearGradient id="aurum-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFD600" />
          <stop offset="0.55" stopColor="#F7931A" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      {/* orbiting ring */}
      <circle
        cx="24"
        cy="24"
        r="21"
        fill="none"
        stroke="url(#aurum-mark)"
        strokeWidth="1.5"
        strokeDasharray="3 5"
        opacity="0.7"
      />
      {/* hex block */}
      <path
        d="M24 8 L37 15.5 L37 32.5 L24 40 L11 32.5 L11 15.5 Z"
        fill="url(#aurum-mark)"
        opacity="0.16"
        stroke="url(#aurum-mark)"
        strokeWidth="1.5"
      />
      {/* A monogram */}
      <path
        d="M18.5 31 L24 17 L29.5 31 M20.7 26.4 L27.3 26.4"
        fill="none"
        stroke="url(#aurum-mark)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
