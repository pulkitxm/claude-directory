/* Specimen registry metadata for the eight solids the shader renders, in the
   shader's own index order. The numbers are real combinatorial facts about each
   wireframe (vertices / edges as drawn), used as instrument readouts — not
   decoration. "Morphing" is the shader's animated cube↔octahedron blend, so its
   counts are listed as a range. */
export type Solid = {
  index: number;
  name: string;
  glyph: string; // monospace registry glyph
  vertices: number | null;
  edges: number | null;
  family: string;
  note: string;
};

export const SOLIDS: Solid[] = [
  {
    index: 0,
    name: "Cube",
    glyph: "▢",
    vertices: 8,
    edges: 12,
    family: "Hexahedron · regular",
    note: "Six square faces; the reference orthoframe.",
  },
  {
    index: 1,
    name: "Tetrahedron",
    glyph: "△",
    vertices: 4,
    edges: 6,
    family: "Simplex · regular",
    note: "Self-dual; the minimal closed polyhedron.",
  },
  {
    index: 2,
    name: "Octahedron",
    glyph: "◇",
    vertices: 6,
    edges: 12,
    family: "Platonic · regular",
    note: "Dual of the cube; two square pyramids joined.",
  },
  {
    index: 3,
    name: "Icosahedron",
    glyph: "✦",
    vertices: 12,
    edges: 30,
    family: "Platonic · regular",
    note: "Twenty triangular faces; densest of the five.",
  },
  {
    index: 4,
    name: "Pyramid",
    glyph: "▲",
    vertices: 5,
    edges: 8,
    family: "Square pyramid · Johnson J1",
    note: "Four triangles over a square base.",
  },
  {
    index: 5,
    name: "Diamond",
    glyph: "◆",
    vertices: 6,
    edges: 12,
    family: "Square bipyramid",
    note: "Two pyramids back to back about a square girdle.",
  },
  {
    index: 6,
    name: "Hexagonal Prism",
    glyph: "⬡",
    vertices: 12,
    edges: 18,
    family: "Prism · uniform",
    note: "Two hexagons bridged by six rectangles.",
  },
  {
    index: 7,
    name: "Morphing",
    glyph: "✧",
    vertices: null,
    edges: null,
    family: "Cube ⇄ octahedron",
    note: "Live blend; edges fade across the dual pair.",
  },
];
