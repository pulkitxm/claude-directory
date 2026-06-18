/**
 * The signature instrument: a semicircular visibility gauge. The needle is
 * driven by the live "visibility" reading — the fraction of the stage the fog
 * actually leaves lit, sampled straight off the GPU framebuffer. It maps the
 * shader's distance-based opacity falloff into a meteorological 0–10 km scale.
 */
export function VisibilityGauge({ value }: { value: number }) {
  // value is 0..1 (lit fraction). Map to a 180° sweep from left (poor) to right (clear).
  const clamped = Math.max(0, Math.min(1, value));
  const angle = -90 + clamped * 180; // -90° .. +90°
  const km = (clamped * 10).toFixed(1);

  // Arc geometry (viewBox 0..120 wide, 0..70 tall — a half dial).
  const cx = 60;
  const cy = 60;
  const r = 46;
  const ticks = Array.from({ length: 11 }, (_, i) => i / 10);

  const band = (from: number, to: number, color: string, opacity: number) => {
    const a0 = Math.PI - from * Math.PI;
    const a1 = Math.PI - to * Math.PI;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy - r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy - r * Math.sin(a1);
    return (
      <path
        d={`M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`}
        fill="none"
        stroke={color}
        strokeOpacity={opacity}
        strokeWidth={3}
        strokeLinecap="round"
      />
    );
  };

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 74" className="w-full max-w-[230px]" role="img" aria-label={`Visibility ${km} kilometres`}>
        {/* Tonal bands: poor (caution) -> clear (signal). */}
        {band(0.0, 0.34, "#E9B24A", 0.5)}
        {band(0.34, 0.66, "#7FD4D1", 0.32)}
        {band(0.66, 1.0, "#7FD4D1", 0.7)}

        {/* Tick marks. */}
        {ticks.map((t) => {
          const a = Math.PI - t * Math.PI;
          const xo = cx + (r + 4) * Math.cos(a);
          const yo = cy - (r + 4) * Math.sin(a);
          const xi = cx + (r - (t % 0.5 === 0 ? 7 : 4)) * Math.cos(a);
          const yi = cy - (r - (t % 0.5 === 0 ? 7 : 4)) * Math.sin(a);
          return (
            <line
              key={t}
              x1={xi.toFixed(2)}
              y1={yi.toFixed(2)}
              x2={xo.toFixed(2)}
              y2={yo.toFixed(2)}
              stroke="#6B7177"
              strokeWidth={t % 0.5 === 0 ? 1.1 : 0.6}
            />
          );
        })}

        {/* Needle. */}
        <g transform={`rotate(${angle} ${cx} ${cy})`} className="transition-transform duration-300 ease-out">
          <line x1={cx} y1={cy} x2={cx} y2={cy - r + 3} stroke="#D7DEE6" strokeWidth={1.6} strokeLinecap="round" />
          <circle cx={cx} cy={cy - r + 6} r={1.6} fill="#A7E9E6" />
        </g>
        <circle cx={cx} cy={cy} r={4} fill="#10151C" stroke="#27313D" strokeWidth={1} />
      </svg>

      <div className="-mt-1 flex items-baseline gap-1.5 font-mono">
        <span className="tnum text-2xl font-semibold text-haze">{km}</span>
        <span className="text-[11px] uppercase tracking-[0.2em] text-ridge-dim">km vis</span>
      </div>
    </div>
  );
}
