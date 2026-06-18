// World-clock presets for the SPECTRA CLOCK lab. Each preset pairs a city with a
// vendored skyline still and a tuned set of the shader uniforms that the brief
// baked in (iterations / warpScale / spectralSpread / speed). Selecting a preset
// also sets the displayed location + a representative mock temperature so the
// component's TimeDisplay reads coherently against the chosen city.
import tokyo from "@/../assets/images/tokyo.jpg";
import newyork from "@/../assets/images/newyork.jpg";
import london from "@/../assets/images/london.jpg";
import dubai from "@/../assets/images/dubai.jpg";
import singapore from "@/../assets/images/singapore.jpg";
import reykjavik from "@/../assets/images/reykjavik.jpg";

export type WorldPreset = {
  id: string;
  city: string;
  zone: string;
  utc: string;
  image: string;
  /** mock temperature in °C shown for this city */
  tempC: number;
  uniforms: {
    iterations: number;
    warpScale: number;
    spectralSpread: number;
    speed: number;
  };
  note: string;
};

export const WORLD_PRESETS: WorldPreset[] = [
  {
    id: "tokyo",
    city: "Tokyo",
    zone: "Asia/Tokyo",
    utc: "+09:00",
    image: tokyo,
    tempC: 21,
    uniforms: { iterations: 8, warpScale: 2.0, spectralSpread: 50, speed: 1.0 },
    note: "The brief's exact defaults — eight folds, full spectral spread.",
  },
  {
    id: "newyork",
    city: "New York",
    zone: "America/New_York",
    utc: "-04:00",
    image: newyork,
    tempC: 17,
    uniforms: { iterations: 7, warpScale: 1.7, spectralSpread: 38, speed: 0.85 },
    note: "Wider plates, cooler spread — a slow blue-hour drift.",
  },
  {
    id: "london",
    city: "London",
    zone: "Europe/London",
    utc: "+01:00",
    image: london,
    tempC: 13,
    uniforms: { iterations: 6, warpScale: 1.4, spectralSpread: 26, speed: 0.7 },
    note: "Few folds, narrow spread — muted, overcast colour.",
  },
  {
    id: "dubai",
    city: "Dubai",
    zone: "Asia/Dubai",
    utc: "+04:00",
    image: dubai,
    tempC: 34,
    uniforms: { iterations: 9, warpScale: 2.3, spectralSpread: 64, speed: 1.15 },
    note: "Hot spread, more folds — molten amber turbulence.",
  },
  {
    id: "singapore",
    city: "Singapore",
    zone: "Asia/Singapore",
    utc: "+08:00",
    image: singapore,
    tempC: 29,
    uniforms: { iterations: 10, warpScale: 2.1, spectralSpread: 56, speed: 1.05 },
    note: "Dense folds — humid emerald interference.",
  },
  {
    id: "reykjavik",
    city: "Reykjavik",
    zone: "Atlantic/Reykjavik",
    utc: "+00:00",
    image: reykjavik,
    tempC: 6,
    uniforms: { iterations: 5, warpScale: 1.2, spectralSpread: 30, speed: 0.55 },
    note: "Slow, sparse folds — a cold aurora crawl.",
  },
];
