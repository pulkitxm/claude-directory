import { Canvas } from "@react-three/fiber";
import { VolumetricBeamsShader } from "@/components/ui/volumetric-beams";
import type { BeamParams } from "@/lib/presets";

interface BeamStageProps {
  params: BeamParams;
}

/**
 * The live background stage. Hosts the brief's named export
 * <VolumetricBeamsShader> inside its own r3f <Canvas> so the console can drive
 * every prop as a live uniform. Fixed and full-bleed; the scrollable console
 * floats above it. The wrapper id gives the telemetry probe a stable selector
 * (`#beam-stage canvas`) for its read-back.
 */
export function BeamStage({ params }: BeamStageProps) {
  return (
    <div
      id="beam-stage"
      className="pointer-events-none fixed inset-0 -z-10 bg-ink-950"
    >
      <Canvas
        dpr={[1, 1.75]}
        // preserveDrawingBuffer lets the telemetry probe read the composited
        // frame back off the canvas (drawImage of a WebGL canvas is empty
        // otherwise). The cost is one un-discarded backbuffer — negligible for a
        // single full-screen quad.
        gl={{ antialias: true, preserveDrawingBuffer: true }}
        className="pointer-events-auto h-full w-full touch-none"
      >
        <VolumetricBeamsShader {...params} />
      </Canvas>
      {/* Readability scrim so console panels sit cleanly over the volume. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/10 via-transparent to-ink-950/85" />
    </div>
  );
}
