/**
 * Logo masks for the ThermalEffect component.
 *
 * The verbatim <ThermalEffect /> reads the ALPHA channel of whatever image you
 * pass as `logoUrl` and uses it as the stencil the heat is painted inside
 * (`float mask = texture(maskMap, uv).a;` in the fragment shader). The original
 * prompt pointed `logoUrl` at remote PNG logos hosted on GitHub.
 *
 * To keep this experiment fully self-contained and offline — and to guarantee a
 * clean, predictable alpha channel — we render the masks ourselves on a 2D
 * canvas and hand the component a PNG **data URL**. A white, fully-opaque shape
 * on a transparent field means `alpha == shape coverage`, which is exactly what
 * the shader samples. No network, no broken links, no asset files to ship.
 *
 * Everything here runs in the browser only (this is a Vite SPA, `rsc: false`),
 * so `document` is always available at call time.
 */

const SIZE = 512;

type Pt = { x: number; y: number };

function makeCtx(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = "#ffffff";
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  return { canvas, ctx };
}

/** Regular polygon vertices around (cx, cy). `rotation` in radians. */
function polygon(cx: number, cy: number, radius: number, sides: number, rotation: number): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i < sides; i++) {
    const a = rotation + (i / sides) * Math.PI * 2;
    pts.push({ x: cx + Math.cos(a) * radius, y: cy + Math.sin(a) * radius });
  }
  return pts;
}

/** Star vertices alternating between outer and inner radius (2 * points). */
function star(cx: number, cy: number, outer: number, inner: number, points: number, rotation: number): Pt[] {
  const pts: Pt[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = rotation + (i / (points * 2)) * Math.PI * 2;
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
  }
  return pts;
}

/**
 * Trace a closed polygon with rounded corners. Starts at the midpoint of the
 * last edge, then arcs through every vertex to the next edge midpoint — the
 * canonical `arcTo` rounded-polygon recipe, robust for convex and star shapes.
 */
function roundedPath(ctx: CanvasRenderingContext2D, pts: Pt[], radius: number): void {
  const n = pts.length;
  const mid = (a: Pt, b: Pt): Pt => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  ctx.beginPath();
  const start = mid(pts[n - 1], pts[0]);
  ctx.moveTo(start.x, start.y);
  for (let i = 0; i < n; i++) {
    const curr = pts[i];
    const next = pts[(i + 1) % n];
    const m = mid(curr, next);
    ctx.arcTo(curr.x, curr.y, m.x, m.y, radius);
  }
  ctx.closePath();
}

function toUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/png");
}

/** Upward-pointing triangle with softly rounded corners (à la Vercel's mark). */
function triangle(): string {
  const { canvas, ctx } = makeCtx();
  roundedPath(ctx, polygon(256, 272, 220, 3, -Math.PI / 2), 38);
  ctx.fill();
  return toUrl(canvas);
}

/** Flat-topped hexagon — a clean engineering / sensor housing glyph. */
function hexagon(): string {
  const { canvas, ctx } = makeCtx();
  roundedPath(ctx, polygon(256, 256, 220, 6, 0), 30);
  ctx.fill();
  return toUrl(canvas);
}

/** Four-point sparkle / spark — sharp points read beautifully under heat. */
function spark(): string {
  const { canvas, ctx } = makeCtx();
  roundedPath(ctx, star(256, 256, 236, 70, 4, -Math.PI / 2), 8);
  ctx.fill();
  return toUrl(canvas);
}

/** Camera-iris aperture: a thick ring with a central sensor dot. */
function aperture(): string {
  const { canvas, ctx } = makeCtx();
  // Ring via even-odd fill (outer disc minus inner disc).
  ctx.beginPath();
  ctx.arc(256, 256, 220, 0, Math.PI * 2);
  ctx.arc(256, 256, 128, 0, Math.PI * 2);
  ctx.fill("evenodd");
  // Central sensor dot.
  ctx.beginPath();
  ctx.arc(256, 256, 40, 0, Math.PI * 2);
  ctx.fill();
  return toUrl(canvas);
}

/** Teardrop / flame silhouette — pointed top, rounded base. */
function flame(): string {
  const { canvas, ctx } = makeCtx();
  ctx.beginPath();
  ctx.moveTo(256, 70);
  ctx.bezierCurveTo(138, 214, 104, 300, 256, 448); // tip → left → base
  ctx.bezierCurveTo(408, 300, 374, 214, 256, 70); // base → right → tip
  ctx.closePath();
  ctx.fill();
  return toUrl(canvas);
}

export type MaskName = "triangle" | "flame" | "aperture" | "spark" | "hexagon";

export interface ThermalMask {
  name: MaskName;
  /** Human label for the specimen card. */
  label: string;
  /** PNG data URL — pass straight to <ThermalEffect logoUrl={...} />. */
  url: string;
}

/**
 * Build every mask once. Memoize at the call site (see demo.tsx) so the data
 * URLs are stable across renders and each <ThermalEffect /> keeps one texture.
 */
export function buildThermalMasks(): Record<MaskName, ThermalMask> {
  return {
    flame: { name: "flame", label: "Flame", url: flame() },
    triangle: { name: "triangle", label: "Delta", url: triangle() },
    aperture: { name: "aperture", label: "Aperture", url: aperture() },
    spark: { name: "spark", label: "Spark", url: spark() },
    hexagon: { name: "hexagon", label: "Hex", url: hexagon() },
  };
}
