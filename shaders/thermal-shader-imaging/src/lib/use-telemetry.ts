import { useEffect, useRef, useState } from "react";

export interface Telemetry {
  /** Seconds since the sensor came online. */
  clock: number;
  /** Smoothed frames-per-second of the page's render loop. */
  fps: number;
  /** Total frames observed. */
  frames: number;
}

/**
 * A tiny requestAnimationFrame clock that powers the instrument HUD.
 *
 * The verbatim <ThermalEffect /> exposes no per-frame callback, so rather than
 * reach into its internals we run an independent rAF loop here. It proves the
 * page is live (the clock advances), reports a real measured frame rate, and
 * gives the verification harness a deterministic "is the bay running?" readout.
 * Updates are throttled to ~4 Hz so React re-renders stay cheap.
 */
export function useTelemetry(): Telemetry {
  const [telemetry, setTelemetry] = useState<Telemetry>({ clock: 0, fps: 0, frames: 0 });

  const raf = useRef(0);
  const startTs = useRef(0);
  const lastTs = useRef(0);
  const frames = useRef(0);
  const windowFrames = useRef(0);
  const windowMs = useRef(0);

  useEffect(() => {
    let mounted = true;

    const loop = (now: number) => {
      if (!mounted) return;
      if (!startTs.current) startTs.current = now;
      const dt = now - (lastTs.current || now);
      lastTs.current = now;

      frames.current += 1;
      windowFrames.current += 1;
      windowMs.current += dt;

      if (windowMs.current >= 250) {
        const fps = Math.round((windowFrames.current * 1000) / windowMs.current);
        setTelemetry({
          clock: (now - startTs.current) / 1000,
          fps,
          frames: frames.current,
        });
        windowFrames.current = 0;
        windowMs.current = 0;
      }

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);
    return () => {
      mounted = false;
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return telemetry;
}
