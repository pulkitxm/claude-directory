import { useEffect, useRef, useState } from "react";

export interface CanvasTelemetry {
  fps: number;
  clock: number;
  flux: number;
  cast: string;
}

/**
 * Reads the shader's per-frame state straight off the live <canvas>.
 *
 * The r3f Canvas is a sibling in the DOM; rather than thread refs through the
 * verbatim component we locate its <canvas> by selector and, once per ~120ms,
 * draw a downscaled copy into a 1x1-ish offscreen 2D context and read the pixel
 * back. `drawImage(canvas, …)` captures the *composited* result, so this works
 * regardless of the WebGL context's preserveDrawingBuffer setting. FPS + clock
 * come from a plain rAF accumulator.
 */
export function useCanvasTelemetry(selector: string): CanvasTelemetry {
  const [state, setState] = useState<CanvasTelemetry>({
    fps: 0,
    clock: 0,
    flux: 0,
    cast: "—",
  });

  const raf = useRef(0);
  const frames = useRef(0);
  const lastFpsT = useRef(performance.now());
  const start = useRef(performance.now());
  const lastSample = useRef(0);
  const sampler = useRef<HTMLCanvasElement | null>(null);
  const fpsRef = useRef(0);

  useEffect(() => {
    sampler.current = document.createElement("canvas");
    sampler.current.width = 24;
    sampler.current.height = 16;
    const sctx = sampler.current.getContext("2d", {
      willReadFrequently: true,
    });

    const tick = () => {
      raf.current = requestAnimationFrame(tick);
      const now = performance.now();

      // --- FPS accumulator -------------------------------------------------
      frames.current++;
      if (now - lastFpsT.current >= 500) {
        fpsRef.current = (frames.current * 1000) / (now - lastFpsT.current);
        frames.current = 0;
        lastFpsT.current = now;
      }

      // --- Flux read-back (throttled) -------------------------------------
      if (now - lastSample.current >= 120 && sctx) {
        lastSample.current = now;
        const canvas = document.querySelector<HTMLCanvasElement>(selector);
        let flux = 0;
        let cast = "—";
        if (canvas && canvas.width > 0) {
          try {
            sctx.drawImage(canvas, 0, 0, 24, 16);
            const { data } = sctx.getImageData(0, 0, 24, 16);
            let r = 0;
            let g = 0;
            let b = 0;
            const px = data.length / 4;
            for (let i = 0; i < data.length; i += 4) {
              r += data[i];
              g += data[i + 1];
              b += data[i + 2];
            }
            r /= px;
            g /= px;
            b /= px;
            // Rec. 601 luma, normalised.
            flux = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            if (max - min < 12) cast = "neutral";
            else if (r >= g && r >= b) cast = g > b ? "amber" : "magenta";
            else if (b >= r && b >= g) cast = g > r ? "cyan" : "indigo";
            else cast = "verdant";
          } catch {
            /* canvas not yet paintable */
          }
        }
        setState({
          fps: fpsRef.current,
          clock: (now - start.current) / 1000,
          flux,
          cast,
        });
      }
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [selector]);

  return state;
}
