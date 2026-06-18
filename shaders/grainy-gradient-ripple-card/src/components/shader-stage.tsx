import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import GrainyGradient from "@/components/ui/gradient-shader-card";
import { DEFAULT_FIELD, type FieldParams } from "@/lib/field";

interface Ripple {
  id: number;
  x: number;
  y: number;
  startTime: number;
}

/** A short-lived DOM marker drawn where a ripple was cast, for tactile feedback. */
interface RippleMark {
  id: number;
  /** Percent of card width/height (so it survives responsive scaling). */
  left: number;
  top: number;
}

export interface ShaderStageHandle {
  /** Shader's own elapsed clock (seconds), read off the GPU loop. */
  getClock: () => number;
  /** Ripples currently animating in the shader (0–10). */
  activeRipples: () => number;
  /** Cast a ripple at the card centre (used by the auto-demonstrator). */
  castCentre: () => void;
}

interface ShaderStageProps {
  field: FieldParams;
  onTotalChange?: (total: number) => void;
}

/** Card geometry the verbatim shader normalizes ripple coordinates against. */
const CARD_W = 800;
const CARD_H = 600;
const RIPPLE_MS = 2000;

/**
 * The live specimen stage. Wraps the verbatim `GrainyGradient` component in its
 * R3F Canvas + framer-motion card exactly as the brief's demo does, and adds:
 *   - correct ripple coordinate mapping under any rendered size,
 *   - live uniform updates driven by the console's field controls,
 *   - an imperative handle exposing the shader's real clock + ripple count.
 */
export const ShaderStage = forwardRef<ShaderStageHandle, ShaderStageProps>(
  ({ field, onTotalChange }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const [marks, setMarks] = useState<RippleMark[]>([]);
    const cardRef = useRef<HTMLDivElement>(null);
    const rippleIdRef = useRef(0);
    const totalRef = useRef(0);

    // Imperative handle to the verbatim component (exposes uniforms + clock).
    const gradientRef = useRef<{
      getCurrentTime: () => number;
      uniforms: Record<string, { value: unknown }>;
    } | null>(null);

    const clockRef = useRef(0);

    // Keep the latest field in a ref so the per-frame callback can push it onto
    // the live uniforms without re-subscribing.
    const fieldRef = useRef(field);
    fieldRef.current = field;

    // Runs every frame from the shader's own loop, so the imperative ref and its
    // uniforms are guaranteed to exist here. We push the console's field values
    // onto the live uniforms (waveNoiseSpeed scales the three baked wave-speed
    // uniforms in the proportion they ship with) and cache the clock.
    const handleTimeUpdate = useCallback((time: number) => {
      clockRef.current = time;
      const u = gradientRef.current?.uniforms;
      if (!u) return;
      const f = fieldRef.current;
      u.noiseIntensity.value = f.noiseIntensity;
      u.noiseScale.value = f.noiseScale;
      u.noiseSpeed.value = f.noiseSpeed;
      u.waveNoiseIntensity.value = f.waveNoiseIntensity;
      const r = f.waveNoiseSpeed / DEFAULT_FIELD.waveNoiseSpeed;
      u.waveNoiseSpeed1.value = 0.24 * r;
      u.waveNoiseSpeed2.value = 0.2 * r;
      u.waveNoiseSpeed3.value = 0.3 * r;
      // Dev/verify seam: expose a live uniform read for headless assertions.
      (window as unknown as { __chromaUniform?: () => number }).__chromaUniform =
        () => Number(u.noiseIntensity.value);
    }, []);

    const castRipple = useCallback(
      (cardX: number, cardY: number, leftPct: number, topPct: number) => {
        const id = rippleIdRef.current++;
        const newRipple: Ripple = {
          id,
          x: cardX,
          y: cardY,
          startTime: clockRef.current,
        };
        setRipples((prev) => [...prev, newRipple]);
        setMarks((prev) => [...prev, { id, left: leftPct, top: topPct }]);
        totalRef.current += 1;
        onTotalChange?.(totalRef.current);

        window.setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== id));
          setMarks((prev) => prev.filter((m) => m.id !== id));
        }, RIPPLE_MS);
      },
      [onTotalChange],
    );

    // Click → ripple. Coordinates are scaled into the shader's 800×600 space so
    // ripples land correctly even when the card is rendered smaller (responsive).
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      castRipple(px * CARD_W, py * CARD_H, px * 100, py * 100);
    };

    useImperativeHandle(ref, () => ({
      getClock: () => clockRef.current,
      activeRipples: () => ripples.length,
      castCentre: () => {
        // Slight random offset so repeated auto-ripples feel organic.
        const jx = 0.5 + (Math.random() - 0.5) * 0.5;
        const jy = 0.5 + (Math.random() - 0.5) * 0.5;
        castRipple(jx * CARD_W, jy * CARD_H, jx * 100, jy * 100);
      },
    }));

    return (
      <motion.div
        ref={cardRef}
        className="relative aspect-[4/3] w-full max-w-[800px] cursor-pointer overflow-hidden"
        style={{
          borderRadius: "clamp(28px, 4vw, 48px)",
          filter:
            "drop-shadow(0px 120px 60px rgba(23, 14, 7, 0.04)) drop-shadow(0px 60px 40px rgba(23, 14, 7, 0.08)) drop-shadow(0px 24px 24px rgba(23, 14, 7, 0.10)) drop-shadow(0px 8px 16px rgba(23, 14, 7, 0.12))",
        }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Gradient specimen — click to cast a ripple"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const jx = 0.5;
            const jy = 0.5;
            castRipple(jx * CARD_W, jy * CARD_H, jx * 100, jy * 100);
          }
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 1] }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <GrainyGradient
            ref={gradientRef}
            ripples={ripples}
            onTimeUpdate={handleTimeUpdate}
          />
        </Canvas>

        {/* Tactile DOM markers at each ripple origin. */}
        {marks.map((m) => (
          <span
            key={m.id}
            className="pointer-events-none absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 animate-ping-ring"
            style={{ left: `${m.left}%`, top: `${m.top}%` }}
            aria-hidden="true"
          />
        ))}

        {/* Inner hairline frame so the plate reads as a mounted specimen. */}
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15"
          aria-hidden="true"
        />
      </motion.div>
    );
  },
);

ShaderStage.displayName = "ShaderStage";
