import { cn } from "../lib/cn";

/**
 * Aperture mark — a stylised camera iris. Six blades rotate around a warm
 * amber core, echoing the product name and the "light through darkness" idea.
 * Pure inline SVG so it stays crisp at any size and ships with the bundle.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn(className)}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ap-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>
      {/* outer ring */}
      <circle
        cx="16"
        cy="16"
        r="13"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.4"
      />
      {/* iris blades */}
      <g stroke="#f59e0b" strokeWidth="1.6" strokeLinejoin="round" opacity="0.92">
        <path d="M16 5 L24.5 10 L21 16 Z" />
        <path d="M27 16 L24.5 25 L18 22 Z" />
        <path d="M16 27 L7.5 22 L11 16 Z" />
        <path d="M5 16 L7.5 7 L14 10 Z" />
      </g>
      {/* glowing core */}
      <circle cx="16" cy="16" r="4.4" fill="url(#ap-core)" />
      <circle cx="16" cy="16" r="4.4" fill="none" stroke="rgba(253,230,138,0.5)" strokeWidth="0.8" />
    </svg>
  );
}
