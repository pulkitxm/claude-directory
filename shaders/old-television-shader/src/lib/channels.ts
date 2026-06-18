/**
 * Channel presets — each one snaps the shader's props to a named "broadcast".
 * These are the exact prop bundles passed to <OldTelevisionShader />, so the
 * preset bank doubles as live API documentation.
 */
export interface Channel {
  id: string;
  no: string;
  name: string;
  band: string;
  colorA: string;
  colorB: string;
  waveIntensity: number;
  grainIntensity: number;
  brightnessPulse: number;
}

export const CHANNELS: Channel[] = [
  {
    id: "static",
    no: "03",
    name: "Dead Air",
    band: "VHF",
    // The brief's verbatim defaults: white → black analog snow.
    colorA: "#ffffff",
    colorB: "#000000",
    waveIntensity: 1,
    grainIntensity: 1,
    brightnessPulse: 1,
  },
  {
    id: "phosphor",
    no: "07",
    name: "Phosphor Net",
    band: "UHF",
    colorA: "#aaffc0",
    colorB: "#02160a",
    waveIntensity: 1.15,
    grainIntensity: 0.85,
    brightnessPulse: 1,
  },
  {
    id: "amber",
    no: "12",
    name: "Amber Test",
    band: "VHF",
    colorA: "#ffd9a0",
    colorB: "#160a00",
    waveIntensity: 0.7,
    grainIntensity: 0.6,
    brightnessPulse: 1.2,
  },
  {
    id: "inky",
    no: "21",
    name: "Cold Carrier",
    band: "SAT",
    colorA: "#bfe4ff",
    colorB: "#040a14",
    waveIntensity: 1.4,
    grainIntensity: 1.1,
    brightnessPulse: 0.6,
  },
  {
    id: "ember",
    no: "33",
    name: "Ember Burst",
    band: "UHF",
    colorA: "#ff8a5c",
    colorB: "#14030a",
    waveIntensity: 1.6,
    grainIntensity: 1.25,
    brightnessPulse: 1.4,
  },
  {
    id: "void",
    no: "00",
    name: "Lost Signal",
    band: "—",
    colorA: "#e8e8ff",
    colorB: "#000000",
    waveIntensity: 0.25,
    grainIntensity: 1.6,
    brightnessPulse: 0.3,
  },
];
