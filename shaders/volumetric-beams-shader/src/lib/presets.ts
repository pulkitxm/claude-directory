/**
 * Beacon presets + the live parameter model for the BEAMWORKS console.
 *
 * `BeamParams` is the full prop set the verbatim <VolumetricBeamsShader> accepts.
 * The console keeps one live `BeamParams` object in state; faders mutate single
 * fields and presets snap the whole object to a named regime. The first preset,
 * "Searchlight", is the exact configuration from the brief's demo.tsx.
 */

export type RGB = [number, number, number];

export interface BeamParams {
  // Motion
  speed: number;
  autoRotateSpeed: number;
  mouseInfluence: number;
  pointerSmoothing: number;

  // Camera
  cameraRadius: number;
  fov: number;

  // Beams
  beamCount: number;
  beamHalfAngle: number;
  beamEdgeSoft: number;
  beamRotation: number;
  twistDepth: number;

  // Volume / scatter
  density: number;
  falloff: number;
  anisotropy: number;
  lightIntensity: number;
  lightColor: RGB;
  tint: RGB;

  // Ribbing
  stripeFreq: number;
  stripeAmp: number;
  stripeSharp: number;
  stripeSpeed: number;
  stripeJitter: number;

  // Quality
  volSteps: number;
  stepMin: number;
  stepMax: number;
  maxDist: number;

  // Film / post
  exposure: number;
  gamma: number;
  grainAmount: number;
  vignette: number;
  bgColor: RGB;
}

export interface Preset {
  id: string;
  name: string;
  code: string;
  blurb: string;
  params: BeamParams;
}

/* The brief's demo.tsx, field-for-field. */
const SEARCHLIGHT: BeamParams = {
  speed: 2.95,
  autoRotateSpeed: 0.035,
  mouseInfluence: 0.35,
  pointerSmoothing: 0.28,
  cameraRadius: 4.8,
  fov: 1.25,

  beamCount: 5,
  beamHalfAngle: 0.065,
  beamEdgeSoft: 0.045,
  beamRotation: 0.7,
  twistDepth: 0.95,

  density: 0.95,
  falloff: 0.15,
  anisotropy: 0.86,
  lightIntensity: 1.4,
  lightColor: [0.54, 0.74, 1.0],
  tint: [0.55, 0.38, 0.95],

  stripeFreq: 800.0,
  stripeAmp: 0.07,
  stripeSharp: 0.08,
  stripeSpeed: 0.102,
  stripeJitter: 0.91,

  volSteps: 190,
  stepMin: 0.05,
  stepMax: 0.1,
  maxDist: 3.0,

  bgColor: [0.04, 0.035, 0.06],
  grainAmount: 0.005,
  vignette: 0.95,
  exposure: 0.5,
  gamma: 2.0,
};

export const PRESETS: Preset[] = [
  {
    id: "searchlight",
    name: "Searchlight",
    code: "SL-05",
    blurb: "The brief's reference patch — a tight five-arm violet beacon.",
    params: SEARCHLIGHT,
  },
  {
    id: "aurora-fan",
    name: "Aurora Fan",
    code: "AF-08",
    blurb: "A wide eight-blade cyan fan, soft-edged and slow-drifting.",
    params: {
      ...SEARCHLIGHT,
      speed: 1.4,
      autoRotateSpeed: 0.05,
      cameraRadius: 5.4,
      fov: 1.45,
      beamCount: 8,
      beamHalfAngle: 0.11,
      beamEdgeSoft: 0.08,
      beamRotation: 0.2,
      twistDepth: 0.45,
      density: 0.8,
      falloff: 0.1,
      anisotropy: 0.82,
      lightIntensity: 1.7,
      lightColor: [0.46, 0.86, 1.0],
      tint: [0.4, 0.7, 1.0],
      vignette: 0.7,
      exposure: 0.62,
      stripeJitter: 0.4,
    },
  },
  {
    id: "ember-cross",
    name: "Ember Cross",
    code: "EC-04",
    blurb: "A hot four-point amber crucifix with deep falloff and grain.",
    params: {
      ...SEARCHLIGHT,
      speed: 2.1,
      autoRotateSpeed: 0.02,
      cameraRadius: 4.2,
      fov: 1.3,
      beamCount: 4,
      beamHalfAngle: 0.085,
      beamEdgeSoft: 0.05,
      beamRotation: 0.0,
      twistDepth: 0.25,
      density: 1.15,
      falloff: 0.32,
      anisotropy: 0.9,
      lightIntensity: 1.55,
      lightColor: [1.0, 0.66, 0.34],
      tint: [1.0, 0.52, 0.26],
      bgColor: [0.05, 0.03, 0.025],
      grainAmount: 0.018,
      vignette: 0.9,
      exposure: 0.58,
    },
  },
  {
    id: "twist-drill",
    name: "Twist Drill",
    code: "TD-06",
    blurb: "Six arms wound hard over depth — a corkscrew of light.",
    params: {
      ...SEARCHLIGHT,
      speed: 3.4,
      autoRotateSpeed: 0.06,
      cameraRadius: 5.0,
      fov: 1.2,
      beamCount: 6,
      beamHalfAngle: 0.07,
      beamEdgeSoft: 0.04,
      beamRotation: 0.5,
      twistDepth: 2.4,
      density: 1.0,
      falloff: 0.12,
      anisotropy: 0.88,
      lightIntensity: 1.45,
      lightColor: [0.6, 0.7, 1.0],
      tint: [0.62, 0.45, 1.0],
      maxDist: 3.6,
      vignette: 0.92,
      exposure: 0.52,
    },
  },
  {
    id: "veil",
    name: "Veil",
    code: "VL-12",
    blurb: "Twelve hairline blades, near-grazing — a quiet diffraction veil.",
    params: {
      ...SEARCHLIGHT,
      speed: 0.9,
      autoRotateSpeed: 0.04,
      cameraRadius: 6.0,
      fov: 1.5,
      beamCount: 12,
      beamHalfAngle: 0.05,
      beamEdgeSoft: 0.06,
      beamRotation: 0.35,
      twistDepth: 0.6,
      density: 0.7,
      falloff: 0.08,
      anisotropy: 0.78,
      lightIntensity: 1.9,
      lightColor: [0.7, 0.8, 1.0],
      tint: [0.62, 0.6, 1.0],
      vignette: 0.6,
      exposure: 0.66,
      stripeJitter: 0.3,
    },
  },
  {
    id: "supernova",
    name: "Supernova",
    code: "SN-03",
    blurb: "Three fat blades, blown-out core — maximum exposure flare.",
    params: {
      ...SEARCHLIGHT,
      speed: 2.4,
      autoRotateSpeed: 0.025,
      cameraRadius: 4.0,
      fov: 1.35,
      beamCount: 3,
      beamHalfAngle: 0.13,
      beamEdgeSoft: 0.09,
      beamRotation: 0.9,
      twistDepth: 0.4,
      density: 1.05,
      falloff: 0.06,
      anisotropy: 0.84,
      lightIntensity: 2.1,
      lightColor: [0.95, 0.9, 1.0],
      tint: [0.8, 0.7, 1.0],
      vignette: 0.5,
      exposure: 0.78,
      grainAmount: 0.008,
    },
  },
];

export const DEFAULT_PRESET = PRESETS[0];

/* RGB float triplet -> #rrggbb for swatches/telemetry. */
export function rgbToHex([r, g, b]: RGB): string {
  const to = (v: number) =>
    Math.round(Math.max(0, Math.min(1, v)) * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}

/* CSS rgb() string for inline backgrounds. */
export function rgbToCss([r, g, b]: RGB, alpha = 1): string {
  const to = (v: number) => Math.round(Math.max(0, Math.min(1, v)) * 255);
  return `rgba(${to(r)}, ${to(g)}, ${to(b)}, ${alpha})`;
}
