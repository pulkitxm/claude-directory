import { useEffect, useRef, useState } from "react";

/**
 * A real-clock telemetry source for the observation deck.
 *
 * The verbatim `ShaderComponent` runs its field on `THREE.Clock`
 * (`performance.now()` under the hood) advanced once per `requestAnimationFrame`.
 * This hook samples the *same* clock surface so every number the console prints
 * — elapsed time, derived phase / frequency, FPS — moves in lockstep with the
 * shader rather than being faked on a detached timer.
 *
 * It self-throttles its React commits to ~12fps so the rapidly-changing
 * readouts stay legible (and cheap) while the underlying field still renders at
 * full rAF rate. The recorder freezes `performance.now` + `requestAnimationFrame`
 * during capture, so this advances deterministically there too.
 */
export interface SignalSample {
  /** Seconds since mount, on the rAF clock. */
  t: number;
  /** Smoothed frames-per-second. */
  fps: number;
  /** A 0..1 sawtooth standing in for the field's interference phase. */
  phase: number;
  /** A slow 0..1 oscillation standing in for dominant-band frequency. */
  freq: number;
  /** Total frames drawn since mount. */
  frames: number;
}

export function useSignalClock(): SignalSample {
  const [sample, setSample] = useState<SignalSample>({
    t: 0,
    fps: 60,
    phase: 0,
    freq: 0.5,
    frames: 0,
  });

  const raf = useRef(0);
  const start = useRef(0);
  const last = useRef(0);
  const frames = useRef(0);
  const fpsSmooth = useRef(60);
  const lastCommit = useRef(0);

  useEffect(() => {
    const loop = (now: number) => {
      if (!start.current) {
        start.current = now;
        last.current = now;
        lastCommit.current = now;
      }
      const dt = now - last.current;
      last.current = now;
      frames.current += 1;

      if (dt > 0) {
        const inst = 1000 / dt;
        // Exponential smoothing keeps the FPS readout from jittering.
        fpsSmooth.current = fpsSmooth.current * 0.9 + inst * 0.1;
      }

      // Commit at ~12fps so the printed numerals stay readable.
      if (now - lastCommit.current >= 80) {
        lastCommit.current = now;
        const t = (now - start.current) / 1000;
        setSample({
          t,
          fps: fpsSmooth.current,
          // Phase: a 1.6s sawtooth, matching the shader's slow `u_time * .2`
          // banding cadence closely enough to read as "in sync".
          phase: (t / 1.6) % 1,
          // Frequency: a calm cosine sweep across the band, 0..1.
          freq: 0.5 + 0.5 * Math.sin(t * 0.21),
          frames: frames.current,
        });
      }

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return sample;
}
