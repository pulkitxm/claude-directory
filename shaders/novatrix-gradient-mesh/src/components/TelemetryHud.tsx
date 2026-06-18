import { useEffect, useRef, useState } from "react";

interface Telemetry {
  fps: number;
  frames: number;
  clock: number;
}

/**
 * A small live readout that runs its own rAF loop. It does not touch the
 * shader — it independently measures wall-clock FPS, counts frames and tracks
 * an uptime clock so the chrome has a visible heartbeat next to the GPU field.
 * Pauses with the global `paused` flag so the demo/verify can prove it freezes.
 */
export function TelemetryHud({ paused }: { paused: boolean }) {
  const [t, setT] = useState<Telemetry>({ fps: 0, frames: 0, clock: 0 });
  const raf = useRef(0);
  const last = useRef(performance.now());
  const acc = useRef(0);
  const frameWindow = useRef(0);
  const startedAt = useRef(performance.now());

  useEffect(() => {
    let mounted = true;
    function loop(now: number) {
      raf.current = requestAnimationFrame(loop);
      if (paused) {
        last.current = now;
        return;
      }
      const dt = now - last.current;
      last.current = now;
      acc.current += dt;
      frameWindow.current += 1;
      if (acc.current >= 400) {
        const fps = Math.round((frameWindow.current * 1000) / acc.current);
        acc.current = 0;
        frameWindow.current = 0;
        if (mounted) {
          setT((prev) => ({
            fps,
            frames: prev.frames + 1,
            clock: (now - startedAt.current) / 1000,
          }));
        }
      }
    }
    raf.current = requestAnimationFrame(loop);
    return () => {
      mounted = false;
      cancelAnimationFrame(raf.current);
    };
  }, [paused]);

  const rows: Array<[string, string]> = [
    ["fps", paused ? "—" : String(t.fps).padStart(2, "0")],
    ["frame", String(t.frames).padStart(4, "0")],
    ["time", `${t.clock.toFixed(2)}s`],
  ];

  return (
    <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-line text-center">
      {rows.map(([k, v]) => (
        <div key={k} className="glass px-3 py-2.5">
          <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-haze-dim">
            {k}
          </dt>
          <dd className="tnum mt-0.5 font-mono text-[13px] font-medium text-paper">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}
