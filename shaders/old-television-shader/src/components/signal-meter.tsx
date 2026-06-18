import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * SignalMeter — a phosphor signal-strength gauge driven by the tube's true
 * centre-pixel luminance (sampled off the GPU by the shader's `onSample`).
 * Renders a rolling waveform on a tiny canvas plus a segmented bargraph, so the
 * surrounding chrome reflects the *actual* picture, not a faked animation.
 */
export function SignalMeter({
  luminance,
  fps,
}: {
  luminance: number;
  fps: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const history = useRef<number[]>([]);
  const lumRef = useRef(luminance);
  lumRef.current = luminance;

  // Continuous waveform trace on its own rAF (independent of React renders).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = (canvas.width = canvas.clientWidth * dpr);
    const H = (canvas.height = canvas.clientHeight * dpr);
    let raf = 0;

    const draw = () => {
      history.current.push(lumRef.current);
      if (history.current.length > 96) history.current.shift();

      ctx.clearRect(0, 0, W, H);

      // Faint baseline grid.
      ctx.strokeStyle = "rgba(38,240,106,0.10)";
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        const y = (H / 4) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Waveform.
      const pts = history.current;
      ctx.beginPath();
      ctx.lineWidth = 1.6 * dpr;
      ctx.strokeStyle = "rgba(38,240,106,0.95)";
      ctx.shadowColor = "rgba(38,240,106,0.8)";
      ctx.shadowBlur = 6 * dpr;
      pts.forEach((v, i) => {
        const x = (i / (pts.length - 1 || 1)) * W;
        const y = H - v * H * 0.92 - H * 0.04;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const segments = 16;
  const lit = Math.round(luminance * segments);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="etched font-mono text-[9px] uppercase tracking-[0.24em] text-bone-200/60">
          Signal · Centre Lum
        </span>
        <span className="phosphor-text font-mono text-[10px] tabular-nums">
          {(luminance * 100).toFixed(0)}%
        </span>
      </div>

      <canvas
        ref={canvasRef}
        className="h-12 w-full rounded-sm border border-cabinet-700/80 bg-cabinet-950/80"
      />

      {/* Segmented bargraph (VU style). */}
      <div className="flex items-end gap-[3px]">
        {Array.from({ length: segments }).map((_, i) => {
          const active = i < lit;
          const hot = i >= segments - 3;
          return (
            <span
              key={i}
              className={cn(
                "h-3.5 flex-1 rounded-[1px] transition-colors duration-150",
                !active && "bg-cabinet-800",
                active && !hot && "bg-phosphor-400",
                active && hot && "bg-signal-amber",
              )}
              style={
                active
                  ? {
                      boxShadow: hot
                        ? "0 0 6px rgba(255,179,71,0.8)"
                        : "0 0 6px rgba(38,240,106,0.7)",
                    }
                  : undefined
              }
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-0.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-bone-200/50">
          Render
        </span>
        <span className="font-mono text-[10px] tabular-nums text-bone-100">
          {fps} fps
        </span>
      </div>
    </div>
  );
}

/** A small hook that estimates a rolling FPS from rAF deltas. */
export function useFps() {
  const [fps, setFps] = useState(60);
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let frames = 0;
    const loop = (t: number) => {
      const dt = t - last;
      last = t;
      acc += dt;
      frames++;
      if (acc >= 500) {
        setFps(Math.round((frames * 1000) / acc));
        acc = 0;
        frames = 0;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return fps;
}
