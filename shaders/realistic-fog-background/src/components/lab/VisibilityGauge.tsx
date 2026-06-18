/**
 * VisibilityGauge — HAAR's signature instrument. Reads the live mean luminance
 * sampled off the shader's own framebuffer and resolves it to a meteorological
 * visibility distance (denser/brighter fog → shorter range), the way a real
 * transmissometer reports runway visual range. The dial is driven by the GPU,
 * not a timer.
 */

interface Props {
  /** Mean centre-block luminance from MistField, 0–1. */
  lum: number;
}

// Empirically the fog field's centre luminance lives in roughly [0.095, 0.175]
// across the patch bank; the cursor beam can push it higher (fog lit up close →
// less you can see through), which sweeps the needle toward the dense end.
const LUM_LO = 0.095;
const LUM_HI = 0.175;
const VIS_MAX = 1500; // metres at clearest
const VIS_MIN = 25; // metres in the thickest bank

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, v));
}

export function visibilityFromLum(lum: number) {
  const t = clamp((lum - LUM_LO) / (LUM_HI - LUM_LO), 0, 1); // 0 clear → 1 dense
  const metres = Math.round((VIS_MAX - (VIS_MAX - VIS_MIN) * Math.pow(t, 0.85)) / 5) * 5;
  return { metres, density: t };
}

function category(metres: number) {
  if (metres < 50) return { label: "DENSE FOG", code: "CAT IIIb", hazard: true };
  if (metres < 200) return { label: "THICK FOG", code: "CAT IIIa", hazard: true };
  if (metres < 500) return { label: "FOG", code: "CAT II", hazard: false };
  if (metres < 1000) return { label: "MIST", code: "CAT I", hazard: false };
  return { label: "HAZE", code: "CLEAR", hazard: false };
}

// Polar helper for the 180° dial (180° = left, 0° = right).
function polar(cx: number, cy: number, r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
}

export default function VisibilityGauge({ lum }: Props) {
  const { metres, density } = visibilityFromLum(lum);
  const cat = category(metres);
  // density 0 → needle at 180° (clear/left), density 1 → 0° (dense/right).
  const angle = 180 - density * 180;
  const cx = 130;
  const cy = 124;
  const r = 96;
  const [nx, ny] = polar(cx, cy, r - 12, angle);
  const ticks = Array.from({ length: 11 }, (_, i) => 180 - i * 18);
  const accent = cat.hazard ? "var(--amber)" : "var(--beam)";

  return (
    <div className="glass relative overflow-hidden rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="eyebrow">Visibility · transmissometer</span>
        <span className="data text-[0.6rem] text-ash">RVR / m</span>
      </div>

      <div className="relative mx-auto mt-1 w-full max-w-[260px]">
        <svg viewBox="0 0 260 150" className="w-full" role="img"
             aria-label={`Visibility ${metres} metres, ${cat.label}`}>
          {/* dial arc */}
          <path
            d={`M ${polar(cx, cy, r, 180).join(" ")} A ${r} ${r} 0 0 1 ${polar(cx, cy, r, 0).join(" ")}`}
            fill="none" stroke="var(--line)" strokeWidth="2"
          />
          {/* hazard band (dense end) */}
          <path
            d={`M ${polar(cx, cy, r, 45).join(" ")} A ${r} ${r} 0 0 1 ${polar(cx, cy, r, 0).join(" ")}`}
            fill="none" stroke="var(--amber)" strokeWidth="2" opacity="0.55"
          />
          {ticks.map((deg, i) => {
            const [x1, y1] = polar(cx, cy, r, deg);
            const [x2, y2] = polar(cx, cy, r - (i % 5 === 0 ? 13 : 7), deg);
            return (
              <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="var(--ash)" strokeWidth={i % 5 === 0 ? 1.6 : 1}
                    opacity={i % 5 === 0 ? 0.8 : 0.4} />
            );
          })}
          {/* end labels */}
          <text x="26" y="146" className="data" fontSize="8" fill="var(--ash)">1.5k</text>
          <text x="210" y="146" className="data" fontSize="8" fill="var(--ash)">0</text>
          {/* needle */}
          <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={accent} strokeWidth="2.4"
                strokeLinecap="round" style={{ transition: "all 0.4s cubic-bezier(.4,1.2,.4,1)" }} />
          <circle cx={cx} cy={cy} r="5" fill="var(--void)" stroke={accent} strokeWidth="1.6" />
        </svg>

        <div className="-mt-6 text-center">
          <div className="data text-4xl font-bold tracking-tight" style={{ color: accent }}>
            {metres >= 1000 ? `${(metres / 1000).toFixed(2)}` : metres}
            <span className="ml-1 text-sm font-normal text-ash">{metres >= 1000 ? "km" : "m"}</span>
          </div>
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="data text-xs font-bold tracking-[0.2em]" style={{ color: accent }}>
              {cat.label}
            </span>
            <span className="data rounded border border-line px-1.5 py-0.5 text-[0.55rem] text-ash">
              {cat.code}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
