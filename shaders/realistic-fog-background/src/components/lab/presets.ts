export interface FogParams {
  density: number;
  drift: number;
  octaves: number;
  accent: number;
  beam: number;
  warp: number;
  exposure: number;
}

export interface Fader {
  key: keyof FogParams;
  label: string;
  uniform: string;
  min: number;
  max: number;
  step: number;
  hint: string;
}

/** Faders promote the verbatim shader's baked constants to live uniforms. */
export const FADERS: Fader[] = [
  { key: "density", label: "Density", uniform: "u_density", min: 0, max: 1.6, step: 0.01, hint: "fog mix opacity" },
  { key: "drift", label: "Drift", uniform: "u_drift", min: 0, max: 2.5, step: 0.01, hint: "roll speed" },
  { key: "octaves", label: "Detail", uniform: "u_octaves", min: 1, max: 8, step: 1, hint: "fBm octaves" },
  { key: "warp", label: "Curl", uniform: "u_warp", min: 0, max: 2, step: 0.01, hint: "domain warp" },
  { key: "accent", label: "Cast", uniform: "u_accent", min: 0, max: 2, step: 0.01, hint: "cool accent lift" },
  { key: "beam", label: "Beam", uniform: "u_beam", min: 0, max: 2, step: 0.01, hint: "cursor glow" },
  { key: "exposure", label: "Exposure", uniform: "u_exposure", min: 0.6, max: 1.6, step: 0.01, hint: "post gain" },
];

export const DEFAULT_PARAMS: FogParams = {
  density: 1, drift: 1, octaves: 6, accent: 1, beam: 1, warp: 1, exposure: 1,
};

export interface Preset {
  id: string;
  name: string;
  blurb: string;
  params: FogParams;
}

export const PRESETS: Preset[] = [
  {
    id: "haar", name: "Sea Haar", blurb: "the verbatim component, unmodified",
    params: { ...DEFAULT_PARAMS },
  },
  {
    id: "souper", name: "Pea Souper", blurb: "dense, slow, near-blind",
    params: { density: 1.6, drift: 0.5, octaves: 4, accent: 0.2, beam: 0.6, warp: 0.5, exposure: 1.3 },
  },
  {
    id: "dryice", name: "Dry Ice", blurb: "thick rolling stage smoke",
    params: { density: 1.45, drift: 1.7, octaves: 5, accent: 0.4, beam: 1.4, warp: 0.7, exposure: 1.15 },
  },
  {
    id: "moor", name: "Moor Drift", blurb: "wispy, detailed, fast",
    params: { density: 0.85, drift: 1.2, octaves: 7, accent: 1.4, beam: 1.2, warp: 1.6, exposure: 0.95 },
  },
  {
    id: "dawn", name: "Clear Dawn", blurb: "thin veil burning off",
    params: { density: 0.45, drift: 0.7, octaves: 6, accent: 1.1, beam: 1.0, warp: 1.1, exposure: 1.05 },
  },
];
