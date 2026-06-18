import { useEffect, useRef } from "react";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface PigmentTraceProps {
  /** Live framebuffer luminance (0–1), pushed in from the shader's onSample. */
  luminance: number;
  /** The three active pigments, drawn as a sampled gradient under the trace. */
  pigments: [string, string, string];
  fps: number;
  className?: string;
}

const SAMPLES = 96;

/**
 * The signature instrument: a rolling oscilloscope of the *actual* brightness
 * coming off the GL framebuffer (not an estimate). It draws to a small canvas
 * imperatively so the trace never re-renders the React tree under the shader.
 */
export function PigmentTrace({
  luminance,
  pigments,
  fps,
  className,
}: PigmentTraceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const historyRef = useRef<number[]>(new Array(SAMPLES).fill(0));
  const lumaRef = useRef(luminance);
  const pigRef = useRef(pigments);
  lumaRef.current = luminance;
  pigRef.current = pigments;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || 240;
    const cssH = canvas.clientHeight || 84;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    ctx.scale(dpr, dpr);

    let raf = 0;
    let last = 0;

    const draw = (now: number) => {
      // Push a new sample ~30/s so the trace scrolls smoothly but cheaply.
      if (now - last >= 33) {
        last = now;
        const h = historyRef.current;
        h.push(lumaRef.current);
        if (h.length > SAMPLES) h.shift();
      }

      const w = cssW;
      const hgt = cssH;
      ctx.clearRect(0, 0, w, hgt);

      // grid
      ctx.strokeStyle = "rgba(205, 210, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let gy = 0.25; gy < 1; gy += 0.25) {
        ctx.beginPath();
        ctx.moveTo(0, hgt * gy);
        ctx.lineTo(w, hgt * gy);
        ctx.stroke();
      }

      const hist = historyRef.current;
      const step = w / (SAMPLES - 1);
      const yOf = (v: number) => hgt - 6 - v * (hgt - 12);

      // filled area, tinted by the live pigments
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, pigRef.current[0]);
      grad.addColorStop(0.5, pigRef.current[2]);
      grad.addColorStop(1, pigRef.current[1]);

      ctx.beginPath();
      ctx.moveTo(0, hgt);
      for (let i = 0; i < hist.length; i++) {
        ctx.lineTo(i * step, yOf(hist[i]));
      }
      ctx.lineTo(w, hgt);
      ctx.closePath();
      ctx.globalAlpha = 0.18;
      ctx.fillStyle = grad;
      ctx.fill();

      // bright trace line
      ctx.globalAlpha = 1;
      ctx.beginPath();
      for (let i = 0; i < hist.length; i++) {
        const x = i * step;
        const y = yOf(hist[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.8;
      ctx.shadowBlur = 8;
      ctx.shadowColor = pigRef.current[0];
      ctx.stroke();
      ctx.shadowBlur = 0;

      // leading dot
      const lx = (hist.length - 1) * step;
      const ly = yOf(hist[hist.length - 1]);
      ctx.beginPath();
      ctx.arc(lx, ly, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = "#f6f7ff";
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className={cn("panel animate-rise rounded-xl p-4", className)}>
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-flux-mist/70">
          <Activity className="h-3 w-3" />
          Pigment Trace
        </h2>
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-flux-rose/70">
          {Math.round(fps)} fps
        </span>
      </div>

      <canvas
        ref={canvasRef}
        className="mt-3 h-[84px] w-full rounded-md bg-ink-950/60"
      />

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[10px]">
        <Stat label="Luma" value={luminance.toFixed(3)} />
        <Stat label="Frame" value={`${Math.round(fps)} Hz`} />
        <Stat
          label="Field"
          value={luminance > 0.0001 ? "painting" : "idle"}
          live={luminance > 0.0001}
        />
        <Stat label="Window" value={`${SAMPLES} smp`} />
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  live,
}: {
  label: string;
  value: string;
  live?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-1">
      <span className="uppercase tracking-[0.14em] text-flux-mist/45">{label}</span>
      <span className="flex items-center gap-1.5 tabular-nums text-flux-mist/90">
        {live && (
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-flux-rose shadow-[0_0_8px_#ff6f91]" />
        )}
        {value}
      </span>
    </div>
  );
}
