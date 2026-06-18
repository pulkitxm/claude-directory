import { Aperture, Gauge, Orbit, Film, RotateCcw } from "lucide-react";
import type { BeamParams } from "@/lib/presets";
import { Fader } from "@/components/fader";

interface ControlDeckProps {
  params: BeamParams;
  onChange: <K extends keyof BeamParams>(key: K, value: BeamParams[K]) => void;
  onReset: () => void;
}

interface SectionDef {
  title: string;
  Icon: typeof Aperture;
  faders: {
    key: keyof BeamParams;
    label: string;
    min: number;
    max: number;
    step: number;
    unit?: string;
    precision?: number;
  }[];
}

const SECTIONS: SectionDef[] = [
  {
    title: "Optics",
    Icon: Aperture,
    faders: [
      { key: "beamCount", label: "Beams", min: 2, max: 16, step: 1, precision: 0 },
      { key: "beamHalfAngle", label: "Half-angle", min: 0.03, max: 0.16, step: 0.001, unit: "rad", precision: 3 },
      { key: "beamEdgeSoft", label: "Edge soft", min: 0.01, max: 0.12, step: 0.001, unit: "rad", precision: 3 },
      { key: "beamRotation", label: "Rotation", min: 0, max: 3.14, step: 0.01, unit: "rad" },
      { key: "twistDepth", label: "Twist / Z", min: 0, max: 3, step: 0.01, unit: "rad" },
    ],
  },
  {
    title: "Volume",
    Icon: Gauge,
    faders: [
      { key: "density", label: "Density", min: 0.2, max: 2, step: 0.01 },
      { key: "falloff", label: "Falloff", min: 0.04, max: 0.6, step: 0.01 },
      { key: "anisotropy", label: "Anisotropy", min: 0.4, max: 0.96, step: 0.01 },
      { key: "lightIntensity", label: "Light gain", min: 0.6, max: 2.4, step: 0.01 },
    ],
  },
  {
    title: "Camera / Motion",
    Icon: Orbit,
    faders: [
      { key: "speed", label: "Time scale", min: 0.4, max: 4, step: 0.01, unit: "x" },
      { key: "autoRotateSpeed", label: "Orbit yaw", min: 0, max: 0.12, step: 0.001, precision: 3 },
      { key: "cameraRadius", label: "Dolly", min: 3, max: 7, step: 0.01 },
      { key: "fov", label: "Field of view", min: 1, max: 2, step: 0.01 },
      { key: "mouseInfluence", label: "Mouse look", min: 0, max: 1, step: 0.01 },
    ],
  },
  {
    title: "Film",
    Icon: Film,
    faders: [
      { key: "exposure", label: "Exposure", min: 0.3, max: 1, step: 0.01 },
      { key: "vignette", label: "Vignette", min: 0, max: 1.2, step: 0.01 },
      { key: "grainAmount", label: "Grain", min: 0, max: 0.06, step: 0.001, precision: 3 },
      { key: "gamma", label: "Gamma", min: 1.4, max: 2.6, step: 0.01 },
    ],
  },
];

export function ControlDeck({ params, onChange, onReset }: ControlDeckProps) {
  return (
    <div className="rounded-xl border border-hairline bg-ink-800/70 p-5 backdrop-blur-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-beam-400 shadow-[0_0_10px_rgba(111,156,255,0.9)]" />
          <h3 className="font-display text-sm font-bold uppercase tracking-wide2 text-chalk">
            Calibration Deck
          </h3>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-md border border-hairline px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide2 text-dust transition-colors hover:border-beam-500/60 hover:text-beam-200"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {SECTIONS.map(({ title, Icon, faders }) => (
          <section key={title}>
            <div className="mb-3 flex items-center gap-2 border-b border-hairline/70 pb-2">
              <Icon className="h-3.5 w-3.5 text-beam-400" />
              <h4 className="font-mono text-[11px] uppercase tracking-wide2 text-beam-200/90">
                {title}
              </h4>
            </div>
            <div className="space-y-4">
              {faders.map((f) => (
                <Fader
                  key={String(f.key)}
                  label={f.label}
                  value={params[f.key] as number}
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  unit={f.unit}
                  precision={f.precision}
                  onChange={(v) => onChange(f.key, v as BeamParams[typeof f.key])}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
