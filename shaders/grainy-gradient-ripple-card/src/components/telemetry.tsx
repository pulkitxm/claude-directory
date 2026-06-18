import { useEffect, useRef, useState } from "react";

interface TelemetryProps {
  /** Reads the shader's own elapsed clock straight off the GPU loop. */
  getClock: () => number;
  /** Number of ripples currently live in the shader (0–10). */
  activeRipples: number;
  /** Total ripples cast since load. */
  totalRipples: number;
}

/**
 * Live telemetry strip. FPS + uptime run on the same requestAnimationFrame loop
 * the shader animates on, and the clock is sampled from the component's imperative
 * handle (`getCurrentTime`) — so every number here is the shader's real state,
 * not a faked counter.
 */
export function Telemetry({
  getClock,
  activeRipples,
  totalRipples,
}: TelemetryProps) {
  const [fps, setFps] = useState(0);
  const [clock, setClock] = useState(0);

  const frames = useRef(0);
  const last = useRef(performance.now());
  const raf = useRef<number>(0);

  useEffect(() => {
    const tick = () => {
      frames.current += 1;
      const now = performance.now();
      const dt = now - last.current;
      if (dt >= 500) {
        setFps(Math.round((frames.current * 1000) / dt));
        frames.current = 0;
        last.current = now;
        setClock(getClock());
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [getClock]);

  const rows: { label: string; value: string; accent?: boolean }[] = [
    { label: "shader clock", value: `${clock.toFixed(1)}s` },
    { label: "render", value: `${fps} fps` },
    {
      label: "ripples live",
      value: `${activeRipples} / 10`,
      accent: activeRipples > 0,
    },
    { label: "cast total", value: String(totalRipples) },
  ];

  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-mono text-[10px] uppercase tracking-wide2 text-ink-500">
          Telemetry
        </h2>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wide2 text-ink-400">
          <span className="h-1.5 w-1.5 rounded-full bg-pigment-ember animate-blink" />
          gpu loop
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-line-strong ring-1 ring-line-strong">
        {rows.map((r) => (
          <div key={r.label} className="bg-bone-50 px-3 py-2.5">
            <dt className="font-mono text-[9px] uppercase tracking-wide text-ink-400">
              {r.label}
            </dt>
            <dd
              className={[
                "mt-1 tabular font-mono text-[15px] leading-none",
                r.accent ? "text-pigment-ember" : "text-ink-800",
              ].join(" ")}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
