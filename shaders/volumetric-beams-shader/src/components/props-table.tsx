import { Sliders } from "lucide-react";

interface Row {
  prop: string;
  type: string;
  def: string;
  desc: string;
}

interface Group {
  label: string;
  rows: Row[];
}

const GROUPS: Group[] = [
  {
    label: "Motion",
    rows: [
      { prop: "speed", type: "number", def: "0.25", desc: "Time-scale applied to the shader clock." },
      { prop: "autoRotateSpeed", type: "number", def: "0.015", desc: "Constant orbital yaw of the camera." },
      { prop: "mouseInfluence", type: "number", def: "0.45", desc: "How far the pointer steers azimuth / elevation." },
      { prop: "pointerSmoothing", type: "number", def: "0.18", desc: "Lerp factor easing the mouse uniform." },
    ],
  },
  {
    label: "Camera",
    rows: [
      { prop: "cameraRadius", type: "number", def: "3.8", desc: "Orbit distance from the glowing core." },
      { prop: "fov", type: "number", def: "1.65", desc: "Ray-direction spread (lower = longer lens)." },
    ],
  },
  {
    label: "Beams",
    rows: [
      { prop: "beamCount", type: "number", def: "4", desc: "Number of angular arms in the star." },
      { prop: "beamHalfAngle", type: "number", def: "0.085", desc: "Half-width of each beam, in radians." },
      { prop: "beamEdgeSoft", type: "number", def: "0.045", desc: "Soft angular falloff at beam edges." },
      { prop: "beamRotation", type: "number", def: "0.0", desc: "Global rotation of the whole star." },
      { prop: "twistDepth", type: "number", def: "0.06", desc: "Radians of twist applied per unit Z." },
    ],
  },
  {
    label: "Volume / Scatter",
    rows: [
      { prop: "density", type: "number", def: "1.15", desc: "Medium density feeding extinction + scatter." },
      { prop: "falloff", type: "number", def: "0.55", desc: "Radial brightness falloff from the core." },
      { prop: "anisotropy", type: "number", def: "0.76", desc: "Henyey–Greenstein g (forward scattering)." },
      { prop: "lightIntensity", type: "number", def: "2.2", desc: "Radiance of the central light source." },
      { prop: "lightColor", type: "[r,g,b]", def: "[.64,.74,1]", desc: "Colour of the in-scattered light." },
      { prop: "tint", type: "[r,g,b]", def: "[.55,.58,.95]", desc: "Post tint multiplied into the result." },
    ],
  },
  {
    label: "Ribbing",
    rows: [
      { prop: "stripeFreq", type: "number", def: "42.0", desc: "Striation frequency across beam thickness." },
      { prop: "stripeAmp", type: "number", def: "0.55", desc: "Strength of the striation modulation." },
      { prop: "stripeSharp", type: "number", def: "1.85", desc: "Contrast / sharpness of the stripes." },
      { prop: "stripeSpeed", type: "number", def: "0.12", desc: "Scroll speed of the striations." },
      { prop: "stripeJitter", type: "number", def: "0.25", desc: "Depth- and time-tied stripe jitter." },
    ],
  },
  {
    label: "Quality",
    rows: [
      { prop: "volSteps", type: "number", def: "110", desc: "Raymarch step budget (≤ 256)." },
      { prop: "stepMin", type: "number", def: "0.015", desc: "Near-field step size." },
      { prop: "stepMax", type: "number", def: "0.06", desc: "Far-field step size." },
      { prop: "maxDist", type: "number", def: "18.0", desc: "March cutoff distance." },
    ],
  },
  {
    label: "Film / Post",
    rows: [
      { prop: "exposure", type: "number", def: "1.05", desc: "Pre-tonemap exposure multiplier." },
      { prop: "gamma", type: "number", def: "2.0", desc: "Output gamma correction." },
      { prop: "grainAmount", type: "number", def: "0.045", desc: "Screen-space film grain strength." },
      { prop: "vignette", type: "number", def: "0.35", desc: "Edge darkening amount." },
      { prop: "bgColor", type: "[r,g,b]", def: "[.04,.035,.06]", desc: "Base colour behind the volume." },
    ],
  },
  {
    label: "Shell",
    rows: [
      { prop: "dpr", type: "[number,number]", def: "[1, 2]", desc: "Canvas device-pixel-ratio clamp." },
      { prop: "className", type: "string", def: '"fixed inset-0…"', desc: "Wrapper classes for the full-screen root." },
      { prop: "title", type: "string", def: '"Background Shader"', desc: "Heading rendered over the canvas." },
      { prop: "subtitle", type: "string", def: '"volumetric Beams"', desc: "Sub-heading under the title." },
    ],
  },
];

export function PropsTable() {
  return (
    <div className="rounded-xl border border-hairline bg-ink-800/70 p-6 backdrop-blur-sm">
      <div className="mb-5 flex items-center gap-2.5">
        <Sliders className="h-4 w-4 text-beam-400" />
        <h3 className="font-display text-sm font-bold uppercase tracking-wide2 text-chalk">
          Props &amp; Uniforms API
        </h3>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-wide2 text-dust">
          every prop maps 1:1 to a <span className="text-beam-300">u*</span> uniform
        </span>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">
        {GROUPS.map((g) => (
          <div key={g.label}>
            <div className="mb-2.5 border-b border-hairline/70 pb-1.5 font-mono text-[11px] uppercase tracking-wide2 text-beam-200/90">
              {g.label}
            </div>
            <table className="w-full border-collapse text-left">
              <tbody>
                {g.rows.map((r) => (
                  <tr key={r.prop} className="align-top">
                    <td className="py-1.5 pr-2">
                      <code className="font-mono text-[11.5px] text-beam-100">
                        {r.prop}
                      </code>
                    </td>
                    <td className="hidden py-1.5 pr-2 font-mono text-[10.5px] text-amber-glow/80 sm:table-cell">
                      {r.type}
                    </td>
                    <td className="py-1.5 pr-2 font-mono text-[10.5px] tabular-nums text-dust">
                      {r.def}
                    </td>
                    <td className="py-1.5 text-[11.5px] leading-snug text-dust">
                      {r.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
