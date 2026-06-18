/** The tunable subset of the shader's uniforms, surfaced as console controls. */
export interface FringeState {
  speed: number;
  innerBands: number;
  outerBands: number;
  hueShift: number;
  colorA: [number, number, number];
  colorB: [number, number, number];
}

export interface FringePreset {
  id: string;
  name: string;
  /** A flavor caption shown under the patch — the "specimen" being measured. */
  note: string;
  state: FringeState;
}

const PINK: [number, number, number] = [1.0, 0.41, 0.71];
const CYAN: [number, number, number] = [0.0, 1.0, 1.0];

export const PRESETS: FringePreset[] = [
  {
    id: "calibration",
    name: "Calibration",
    note: "factory zero · pink↔cyan",
    // The brief's exact baked-in values — the reference fringe.
    state: { speed: 2.5, innerBands: 4.0, outerBands: 8.0, hueShift: 0, colorA: PINK, colorB: CYAN },
  },
  {
    id: "sodium",
    name: "Sodium-D",
    note: "warm doublet · slow drift",
    state: { speed: 1.2, innerBands: 3.0, outerBands: 6.0, hueShift: 28, colorA: [1.0, 0.55, 0.2], colorB: [1.0, 0.86, 0.3] },
  },
  {
    id: "argon",
    name: "Argon-Ion",
    note: "tight fringe · fast sweep",
    state: { speed: 4.2, innerBands: 7.0, outerBands: 14.0, hueShift: 0, colorA: [0.3, 0.6, 1.0], colorB: [0.1, 1.0, 0.8] },
  },
  {
    id: "ultraviolet",
    name: "Near-UV",
    note: "violet shift · dense rings",
    state: { speed: 2.0, innerBands: 5.0, outerBands: 11.0, hueShift: 70, colorA: [0.6, 0.3, 1.0], colorB: [0.9, 0.4, 1.0] },
  },
  {
    id: "monochrome",
    name: "He-Ne",
    note: "single line · broad fringe",
    state: { speed: 1.6, innerBands: 2.0, outerBands: 4.5, hueShift: 0, colorA: [1.0, 0.2, 0.2], colorB: [1.0, 0.5, 0.4] },
  },
];

/** Loose equality so a fader nudge de-selects the active patch. */
export function statesMatch(a: FringeState, b: FringeState): boolean {
  const f = (x: number, y: number) => Math.abs(x - y) < 1e-3;
  const c = (x: number[], y: number[]) => x.every((v, i) => f(v, y[i]));
  return (
    f(a.speed, b.speed) &&
    f(a.innerBands, b.innerBands) &&
    f(a.outerBands, b.outerBands) &&
    f(a.hueShift, b.hueShift) &&
    c(a.colorA, b.colorA) &&
    c(a.colorB, b.colorB)
  );
}
