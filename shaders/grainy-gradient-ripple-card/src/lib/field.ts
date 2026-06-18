/**
 * Field parameters for the Chroma Foundry console.
 *
 * The verbatim `gradient-shader-card` component bakes a set of noise / domain-
 * warp uniforms into `useMemo` defaults. This file mirrors that exact set so the
 * console can promote those constants to live, tunable values and push them back
 * onto the shader's uniform object (exposed via the component's imperative ref).
 */

export interface FieldParams {
  /** Simplex-noise grain strength (uniform: noiseIntensity). */
  noiseIntensity: number;
  /** Simplex-noise sampling scale (uniform: noiseScale). */
  noiseScale: number;
  /** Simplex-noise drift speed (uniform: noiseSpeed). */
  noiseSpeed: number;
  /** Domain-warp displacement amount (uniform: waveNoiseIntensity). */
  waveNoiseIntensity: number;
  /** Domain-warp flow speed — drives all three wave layers proportionally. */
  waveNoiseSpeed: number;
}

/** The component's own baked-in defaults, surfaced as the console's start state. */
export const DEFAULT_FIELD: FieldParams = {
  noiseIntensity: 1.55,
  noiseScale: 2.0,
  noiseSpeed: 0.15,
  waveNoiseIntensity: 1.2,
  waveNoiseSpeed: 0.24,
};

export interface FaderSpec {
  key: keyof FieldParams;
  label: string;
  hint: string;
  min: number;
  max: number;
  step: number;
}

/** Fader definitions, in console order, each wired to a real shader uniform. */
export const FADERS: FaderSpec[] = [
  {
    key: "noiseIntensity",
    label: "Grain",
    hint: "simplex amplitude",
    min: 0,
    max: 3,
    step: 0.01,
  },
  {
    key: "noiseScale",
    label: "Grain Scale",
    hint: "sampling density",
    min: 0.4,
    max: 5,
    step: 0.05,
  },
  {
    key: "noiseSpeed",
    label: "Grain Drift",
    hint: "z-axis speed",
    min: 0,
    max: 1,
    step: 0.01,
  },
  {
    key: "waveNoiseIntensity",
    label: "Warp",
    hint: "domain displacement",
    min: 0,
    max: 3,
    step: 0.01,
  },
  {
    key: "waveNoiseSpeed",
    label: "Flow",
    hint: "warp drift speed",
    min: 0,
    max: 1,
    step: 0.01,
  },
];

export interface FieldPreset {
  code: string;
  name: string;
  blurb: string;
  values: FieldParams;
}

/** Named regimes that snap the whole field to a stored uniform set. */
export const PRESETS: FieldPreset[] = [
  {
    code: "FND-00",
    name: "Foundry",
    blurb: "the component's baked defaults",
    values: { ...DEFAULT_FIELD },
  },
  {
    code: "SLK-01",
    name: "Silk",
    blurb: "calm, low-grain pour",
    values: {
      noiseIntensity: 0.55,
      noiseScale: 1.3,
      noiseSpeed: 0.06,
      waveNoiseIntensity: 0.7,
      waveNoiseSpeed: 0.12,
    },
  },
  {
    code: "MBL-02",
    name: "Marble",
    blurb: "high warp, slow veining",
    values: {
      noiseIntensity: 1.1,
      noiseScale: 0.9,
      noiseSpeed: 0.05,
      waveNoiseIntensity: 2.4,
      waveNoiseSpeed: 0.1,
    },
  },
  {
    code: "STC-03",
    name: "Static",
    blurb: "dense grain, fast churn",
    values: {
      noiseIntensity: 2.6,
      noiseScale: 3.6,
      noiseSpeed: 0.6,
      waveNoiseIntensity: 1.4,
      waveNoiseSpeed: 0.5,
    },
  },
  {
    code: "TID-04",
    name: "Tide",
    blurb: "broad, sweeping flow",
    values: {
      noiseIntensity: 0.9,
      noiseScale: 1.8,
      noiseSpeed: 0.18,
      waveNoiseIntensity: 1.9,
      waveNoiseSpeed: 0.7,
    },
  },
];

/** The 7-stop palette the shader's `multiColorGradient` actually mixes. */
export const PALETTE: { hex: string; name: string }[] = [
  { hex: "#fad4fb", name: "Lilac" },
  { hex: "#fac8e1", name: "Rose" },
  { hex: "#fab615", name: "Gold" },
  { hex: "#fc681e", name: "Ember" },
  { hex: "#0d5df4", name: "Cobalt" },
  { hex: "#0b4abb", name: "Indigo" },
  { hex: "#170e07", name: "Char" },
];

/** Compare two field states for preset-active detection. */
export function fieldsEqual(a: FieldParams, b: FieldParams): boolean {
  return (
    Math.abs(a.noiseIntensity - b.noiseIntensity) < 1e-4 &&
    Math.abs(a.noiseScale - b.noiseScale) < 1e-4 &&
    Math.abs(a.noiseSpeed - b.noiseSpeed) < 1e-4 &&
    Math.abs(a.waveNoiseIntensity - b.waveNoiseIntensity) < 1e-4 &&
    Math.abs(a.waveNoiseSpeed - b.waveNoiseSpeed) < 1e-4
  );
}
