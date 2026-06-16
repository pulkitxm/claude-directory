/**
 * The Lumen mark — a soft light "aperture" rendered as an inline SVG so the
 * brand asset ships with the bundle (no external request). Concentric arcs
 * read as a lens iris catching ambient light.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role="img"
      aria-label="Lumen logo"
    >
      <defs>
        <linearGradient id="lumen-g" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0" stopColor="#8b95e6" />
          <stop offset="0.55" stopColor="#5E6AD2" />
          <stop offset="1" stopColor="#3a44a0" />
        </linearGradient>
        <radialGradient id="lumen-core" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#dfe3ff" />
          <stop offset="1" stopColor="#5E6AD2" />
        </radialGradient>
      </defs>
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        fill="url(#lumen-g)"
        opacity="0.18"
      />
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="7.5"
        stroke="url(#lumen-g)"
        strokeOpacity="0.55"
      />
      <path
        d="M16 6.5A9.5 9.5 0 1 0 25.5 16"
        stroke="url(#lumen-g)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M16 10.5A5.5 5.5 0 1 0 21.5 16"
        stroke="url(#lumen-g)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="16" cy="16" r="2.6" fill="url(#lumen-core)" />
    </svg>
  );
}
