import { useCallback, useEffect, useRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Component as MovingCirclesShader,
  type ShaderTelemetry,
} from "@/components/ui/moving-circles-shader";
import { PhaseConsole } from "@/components/phase-console";

const SPEEDS = [0.5, 1, 1.75, 3];

const EMPTY: ShaderTelemetry = {
  time: 0,
  axis: 0,
  phase: 0,
  direction: 0,
  fps: 0,
};

export default function App() {
  const [paused, setPaused] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(1);
  const [uiHidden, setUiHidden] = useState(false);

  // Telemetry is sampled every GPU frame; throttle React updates to ~12fps so
  // the readouts stay legible and we don't thrash the reconciler.
  const [telemetry, setTelemetry] = useState<ShaderTelemetry>(EMPTY);
  const latest = useRef<ShaderTelemetry>(EMPTY);
  const lastPush = useRef(0);

  const onSample = useCallback((t: ShaderTelemetry) => {
    latest.current = t;
    const now = performance.now();
    if (now - lastPush.current > 80) {
      lastPush.current = now;
      setTelemetry(t);
    }
  }, []);

  // Keyboard transport: space = freeze, h = hide UI.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        setPaused((v) => !v);
      } else if (e.key.toLowerCase() === "h") {
        setUiHidden((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-void">
      {/* The faithful shader, filling the viewport. */}
      <MovingCirclesShader
        paused={paused}
        speed={SPEEDS[speedIdx]}
        onSample={onSample}
      />

      {/* Subtle vignette so the floating chrome stays readable over the
          bright sphere shells without dimming the shader's center. */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, transparent 38%, rgba(4,6,10,0.55) 100%)",
        }}
      />

      <PhaseConsole
        telemetry={telemetry}
        paused={paused}
        onTogglePause={() => setPaused((v) => !v)}
        speed={SPEEDS[speedIdx]}
        onCycleSpeed={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)}
        hidden={uiHidden}
      />

      {/* Hide-UI toggle stays reachable even when chrome is hidden. */}
      <button
        type="button"
        onClick={() => setUiHidden((v) => !v)}
        aria-label={uiHidden ? "Show interface" : "Hide interface"}
        className="absolute right-5 top-5 z-30 flex h-9 w-9 items-center justify-center rounded-lg border border-hairline glass text-muted transition-colors hover:border-phosphor/60 hover:text-phosphor sm:right-8 sm:top-7"
      >
        {uiHidden ? (
          <Eye className="h-4 w-4" />
        ) : (
          <EyeOff className="h-4 w-4" />
        )}
      </button>
    </main>
  );
}
