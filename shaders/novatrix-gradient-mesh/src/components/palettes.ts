export interface Palette {
  id: string;
  name: string;
  colors: [string, string, string];
}

/** Curated 3-stop palettes fed straight into <GradientMesh colors={...} />. */
export const PALETTES: Palette[] = [
  { id: "novatrix", name: "Novatrix", colors: ["#3b2a8d", "#aaa7d7", "#f75092"] },
  { id: "ultraviolet", name: "Ultraviolet", colors: ["#1a0b3d", "#7b2ff7", "#f0c1ff"] },
  { id: "ember", name: "Ember", colors: ["#2a0a18", "#ff5b4a", "#ffd166"] },
  { id: "abyss", name: "Abyss", colors: ["#04121f", "#1e88a8", "#7ef9e3"] },
  { id: "moss", name: "Moss", colors: ["#0e1f12", "#3a9d6b", "#d9f99d"] },
  { id: "sunset", name: "Sunset", colors: ["#2d1b4e", "#e85d75", "#ffb86c"] },
  { id: "mono", name: "Graphite", colors: ["#0a0a0f", "#5b5b6e", "#e8e8f2"] },
  { id: "candy", name: "Candy", colors: ["#3b1f5e", "#ff7ac6", "#a0f0ff"] },
];
