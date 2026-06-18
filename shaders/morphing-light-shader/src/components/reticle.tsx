/**
 * Fringe reticle — the signature overlay. The shader draws radially symmetric
 * interference rings centered on the optical axis, so the instrument's reticle
 * is itself concentric: measurement rings, a rotating radial sweep, and a tick
 * scale for reading fringe order. Purely decorative SVG over the live canvas.
 */
export function Reticle() {
  const ticks = Array.from({ length: 72 }, (_, i) => i);
  return (
    <svg
      viewBox="0 0 200 200"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[min(82vmin,640px)] w-[min(82vmin,640px)] -translate-x-1/2 -translate-y-1/2 text-cyan"
      fill="none"
      aria-hidden="true"
    >
      {/* Tick ring — 72 marks, every 5th longer (fringe-order graticule). */}
      <g className="origin-center animate-reticle-spin" opacity="0.45">
        {ticks.map((i) => {
          const major = i % 6 === 0;
          const a = (i / 72) * Math.PI * 2;
          const r1 = 96;
          const r2 = major ? 90 : 93;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * r1}
              y1={100 + Math.sin(a) * r1}
              x2={100 + Math.cos(a) * r2}
              y2={100 + Math.sin(a) * r2}
              stroke="currentColor"
              strokeWidth={major ? 0.7 : 0.3}
            />
          );
        })}
      </g>

      {/* Concentric measurement rings. */}
      <g stroke="currentColor" opacity="0.3">
        <circle cx="100" cy="100" r="82" strokeWidth="0.4" strokeDasharray="1 3" />
        <circle cx="100" cy="100" r="58" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="34" strokeWidth="0.4" strokeDasharray="1 3" />
      </g>

      {/* Rotating radial sweep — counter-rotates against the tick ring. */}
      <g className="origin-center animate-reticle-spin-rev">
        <line x1="100" y1="100" x2="100" y2="14" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
        <circle cx="100" cy="14" r="1.6" fill="currentColor" opacity="0.8" />
      </g>

      {/* Center crosshair on the optical axis. */}
      <g stroke="currentColor" opacity="0.6">
        <line x1="92" y1="100" x2="108" y2="100" strokeWidth="0.4" />
        <line x1="100" y1="92" x2="100" y2="108" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="2.4" strokeWidth="0.5" />
      </g>
    </svg>
  );
}
