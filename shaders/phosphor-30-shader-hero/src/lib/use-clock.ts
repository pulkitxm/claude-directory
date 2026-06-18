import { useEffect, useState } from "react";

/**
 * useUptime — seconds elapsed since the component mounted, ticking ~4×/sec.
 * Used to drive the instrument's live "SESSION" readout without re-rendering
 * the shader (the canvas owns its own RAF loop).
 */
export function useUptime(): number {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const id = window.setInterval(() => {
      setSeconds((performance.now() - start) / 1000);
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  return seconds;
}

/** Format a second-count as `HH:MM:SS` for the readout. */
export function formatUptime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
