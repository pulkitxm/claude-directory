interface TelemetryProps {
  time: number;
  fps: number;
  luma: number;
  rgb: [number, number, number];
  fringeOrder: number;
  channel: string;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-[10px] uppercase tracking-wider2 text-muted">
        {label}
      </span>
      <span className="font-mono text-[11px] tabular-nums text-chalk/90">
        {children}
      </span>
    </div>
  );
}

/** Live instrument readouts — every value is sampled off the GPU render loop. */
export function Telemetry({ time, fps, luma, rgb, fringeOrder, channel }: TelemetryProps) {
  const [r, g, b] = rgb;
  return (
    <div className="space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-wider2 text-cyan/80">
        Detector
      </p>

      <div className="space-y-2 rounded-[6px] border border-hairline/70 bg-bench-900/50 px-3.5 py-3">
        <Row label="Source">{channel}</Row>
        <Row label="Clock">{time.toFixed(2)}s</Row>
        <Row label="Render">
          {fps.toFixed(0)}
          <span className="ml-1 text-muted/70">fps</span>
        </Row>
        <Row label="Fringe order">m·{fringeOrder}</Row>

        {/* Center-pixel intensity — read back via gl.readPixels each tick. */}
        <div className="pt-1">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-wider2 text-muted">
              Intensity
            </span>
            <span className="font-mono text-[11px] tabular-nums text-chalk/90">
              {(luma * 100).toFixed(0)}%
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-bench-600">
            <div
              className="h-full rounded-full transition-[width] duration-150"
              style={{
                width: `${Math.min(100, luma * 100)}%`,
                background: "linear-gradient(90deg, #ff5fb0, #22e6ff)",
              }}
            />
          </div>
        </div>

        {/* Live spectral cast at the optical axis. */}
        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-[10px] uppercase tracking-wider2 text-muted">
            Axis cast
          </span>
          <div className="flex items-center gap-2">
            <span
              className="h-3.5 w-3.5 rounded-[3px] border border-white/15"
              style={{ background: `rgb(${r * 255},${g * 255},${b * 255})` }}
            />
            <span className="font-mono text-[10px] tabular-nums text-muted">
              {Math.round(r * 255)},{Math.round(g * 255)},{Math.round(b * 255)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
