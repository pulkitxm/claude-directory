/* ----------------------------------------------------------------------------
   Editorial "engraving plates" — bespoke inline SVG illustrations rendered in
   the Serif palette (ivory ground, rich-black line, burnished-gold accent).
   These are fully offline, crisp at any resolution, and serve as the
   layered-depth abstract graphics the design system calls for.

   Shared palette refs (keep in lock-step with the CSS tokens):
     ground  #FCFBF8   line  #2A2722   gold  #B8860B   gold-2 #D4A84B
---------------------------------------------------------------------------- */

const INK = "#2A2722";
const GOLD = "#B8860B";
const GOLD2 = "#D4A84B";

type PlateProps = { className?: string; title?: string };

/* A faint repeating hatch used to give plates printed texture. */
function Hatch({ id }: { id: string }) {
  return (
    <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="6" stroke={INK} strokeWidth="0.4" opacity="0.22" />
    </pattern>
  );
}

/* ---- The Standing Volumes — hero plate ---------------------------------- */
export function PlateVolumes({ className, title = "An engraving of bound volumes on a shelf" }: PlateProps) {
  return (
    <svg viewBox="0 0 420 520" className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
      <defs>
        <Hatch id="h-vol" />
        <linearGradient id="g-vol" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCFBF8" />
          <stop offset="1" stopColor="#F4F0E9" />
        </linearGradient>
        <radialGradient id="halo-vol" cx="0.5" cy="0.32" r="0.6">
          <stop offset="0" stopColor={GOLD2} stopOpacity="0.20" />
          <stop offset="1" stopColor={GOLD2} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="420" height="520" fill="url(#g-vol)" />
      <rect width="420" height="520" fill="url(#halo-vol)" />
      <circle cx="210" cy="170" r="120" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.35" />
      <circle cx="210" cy="170" r="150" fill="none" stroke={INK} strokeWidth="0.6" opacity="0.18" />

      {/* shelf */}
      <g stroke={INK} strokeWidth="1.4" fill="none">
        <line x1="58" y1="372" x2="362" y2="372" />
        <line x1="58" y1="378" x2="362" y2="378" opacity="0.5" />
      </g>

      {/* books */}
      <g>
        {[
          { x: 86, w: 30, h: 150, fill: "#EDE6DA", lean: 0 },
          { x: 120, w: 24, h: 168, fill: "url(#h-vol)", lean: 0 },
          { x: 148, w: 34, h: 158, fill: "#E8E0D2", lean: 0 },
          { x: 186, w: 22, h: 172, fill: "#EFE9DD", lean: 0 },
          { x: 212, w: 30, h: 150, fill: "url(#h-vol)", lean: 0 },
          { x: 246, w: 26, h: 164, fill: "#E6DECF", lean: 0 },
          { x: 276, w: 32, h: 154, fill: "#EFE8DB", lean: -10 },
        ].map((b, i) => (
          <g key={i} transform={`rotate(${b.lean} ${b.x + b.w / 2} 372)`}>
            <rect x={b.x} y={372 - b.h} width={b.w} height={b.h} fill={b.fill} stroke={INK} strokeWidth="1.2" />
            <line x1={b.x + 4} y1={372 - b.h + 16} x2={b.x + b.w - 4} y2={372 - b.h + 16} stroke={INK} strokeWidth="0.8" opacity="0.6" />
            <line x1={b.x + 4} y1={372 - 18} x2={b.x + b.w - 4} y2={372 - 18} stroke={INK} strokeWidth="0.8" opacity="0.6" />
            {i % 2 === 0 && (
              <rect x={b.x + 5} y={372 - b.h / 2 - 12} width={b.w - 10} height="24" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.8" />
            )}
          </g>
        ))}
      </g>

      {/* a single open volume resting on top */}
      <g transform="translate(300 300)">
        <path d="M0 36 Q34 18 70 36 L70 44 Q34 26 0 44 Z" fill="#FFFFFF" stroke={INK} strokeWidth="1.2" />
        <line x1="35" y1="27" x2="35" y2="40" stroke={INK} strokeWidth="1" />
        <g stroke={INK} strokeWidth="0.5" opacity="0.5">
          <line x1="8" y1="34" x2="30" y2="30" />
          <line x1="40" y1="30" x2="62" y2="34" />
        </g>
      </g>

      {/* gold ribbon bookmark */}
      <path d="M198 200 v92 l8 -10 l8 10 v-92 z" fill={GOLD} opacity="0.9" />
      <rect x="58" y="14" width="304" height="492" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

/* ---- The Quill & Inkwell — features / process plate --------------------- */
export function PlateQuill({ className, title = "An engraving of a quill resting in an inkwell" }: PlateProps) {
  return (
    <svg viewBox="0 0 320 320" className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="halo-q" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor={GOLD2} stopOpacity="0.18" />
          <stop offset="1" stopColor={GOLD2} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="320" fill="#FCFBF8" />
      <rect width="320" height="320" fill="url(#halo-q)" />
      <circle cx="160" cy="160" r="96" fill="none" stroke={INK} strokeWidth="0.7" opacity="0.2" />
      <circle cx="160" cy="160" r="118" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.4" strokeDasharray="2 6" />

      {/* inkwell */}
      <g>
        <ellipse cx="150" cy="232" rx="46" ry="12" fill="#ECE5D8" stroke={INK} strokeWidth="1.3" />
        <path d="M108 232 q0 34 14 44 q28 8 56 0 q14 -10 14 -44" fill="#F4EFE6" stroke={INK} strokeWidth="1.3" />
        <ellipse cx="150" cy="232" rx="30" ry="8" fill={INK} opacity="0.85" />
        <ellipse cx="150" cy="231" rx="30" ry="7.4" fill="#15120D" />
        <path d="M150 226 q10 4 0 10 q-10 -6 0 -10" fill={GOLD} opacity="0.7" />
      </g>

      {/* feather */}
      <g transform="rotate(18 168 150)">
        <path d="M168 232 C176 150 196 92 236 56" fill="none" stroke={INK} strokeWidth="2" />
        <path
          d="M236 56 C200 70 184 104 178 150 C190 132 214 110 244 96 C214 116 196 138 186 176 C200 162 222 148 250 142 C222 158 204 178 196 206 C176 218 168 232 168 232 Z"
          fill="#FBF8F1"
          stroke={INK}
          strokeWidth="1.3"
        />
        {[70, 96, 122, 150, 178].map((y, i) => (
          <line key={i} x1="176" y1={y} x2={228 - i * 4} y2={y - 14} stroke={INK} strokeWidth="0.5" opacity="0.5" />
        ))}
        <path d="M168 232 l4 -22 l5 4 z" fill={GOLD} />
      </g>
    </svg>
  );
}

/* ---- The Specimen — typographic letter plate ---------------------------- */
export function PlateSpecimen({ className, title = "A typographic specimen plate" }: PlateProps) {
  return (
    <svg viewBox="0 0 320 320" className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
      <rect width="320" height="320" fill="#FCFBF8" />
      <rect x="22" y="22" width="276" height="276" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.3" />
      <rect x="30" y="30" width="260" height="260" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.6" />
      <line x1="22" y1="74" x2="298" y2="74" stroke={INK} strokeWidth="0.6" opacity="0.3" />
      <line x1="22" y1="250" x2="298" y2="250" stroke={INK} strokeWidth="0.6" opacity="0.3" />
      <text
        x="160"
        y="214"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="190"
        fill={INK}
      >
        Aa
      </text>
      <text x="160" y="62" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="11" letterSpacing="5" fill={GOLD}>
        PLAYFAIR
      </text>
      <text x="160" y="276" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="10" letterSpacing="3" fill={INK} opacity="0.6">
        DISPLAY · 1738
      </text>
    </svg>
  );
}

/* ---- The Correspondence — folded letter & wax seal --------------------- */
export function PlateLetter({ className, title = "An engraving of a sealed letter" }: PlateProps) {
  return (
    <svg viewBox="0 0 320 320" className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="halo-l" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor={GOLD2} stopOpacity="0.16" />
          <stop offset="1" stopColor={GOLD2} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="320" fill="#FCFBF8" />
      <rect width="320" height="320" fill="url(#halo-l)" />
      <g transform="rotate(-6 160 160)">
        <rect x="64" y="92" width="192" height="136" rx="3" fill="#FFFFFF" stroke={INK} strokeWidth="1.4" />
        <path d="M64 96 L160 168 L256 96" fill="none" stroke={INK} strokeWidth="1.2" />
        <g stroke={INK} strokeWidth="0.6" opacity="0.4">
          <line x1="84" y1="196" x2="150" y2="196" />
          <line x1="84" y1="208" x2="190" y2="208" />
          <line x1="170" y1="196" x2="236" y2="196" />
        </g>
        {/* wax seal */}
        <circle cx="160" cy="158" r="22" fill={GOLD} />
        <circle cx="160" cy="158" r="22" fill="none" stroke={INK} strokeWidth="1" opacity="0.4" />
        <circle cx="160" cy="158" r="15" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.7" />
        <text x="160" y="165" textAnchor="middle" fontFamily="'Playfair Display', serif" fontStyle="italic" fontSize="20" fill="#FFFFFF">
          R
        </text>
      </g>
      <circle cx="160" cy="160" r="120" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.3" strokeDasharray="1 7" />
    </svg>
  );
}

/* ---- Portrait medallion — for editor/testimonial avatars --------------- */
export function PlatePortrait({
  className,
  seed = 0,
  title = "A portrait medallion",
}: PlateProps & { seed?: number }) {
  // seed varies hair / collar so each editor reads as a distinct person.
  const hair = ["#3A332A", "#5A4632", "#2C2622"][seed % 3];
  const collar = ["#E7DFCF", "#DED4C0", "#EBE3D4"][seed % 3];
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
      <circle cx="60" cy="60" r="58" fill="#F1EBDF" stroke={INK} strokeWidth="1.2" />
      <circle cx="60" cy="60" r="52" fill="#FBF8F1" stroke={GOLD} strokeWidth="1" />
      <clipPath id={`pc-${seed}`}>
        <circle cx="60" cy="60" r="52" />
      </clipPath>
      <g clipPath={`url(#pc-${seed})`}>
        {/* shoulders / collar */}
        <path d="M22 122 Q60 88 98 122 Z" fill={collar} stroke={INK} strokeWidth="1" />
        <path d="M52 96 L60 110 L68 96" fill="none" stroke={INK} strokeWidth="1" />
        {/* neck + head */}
        <rect x="52" y="78" width="16" height="16" fill="#E9D9C2" />
        <circle cx="60" cy="58" r="22" fill="#EEDFC8" stroke={INK} strokeWidth="1" />
        {/* hair */}
        <path d="M38 56 Q40 30 60 30 Q80 30 82 56 Q78 42 60 42 Q42 42 38 56 Z" fill={hair} />
        {seed % 2 === 0 ? (
          <path d="M38 56 Q36 70 40 78 L44 60 Z" fill={hair} />
        ) : (
          <path d="M82 56 Q84 70 80 78 L76 60 Z" fill={hair} />
        )}
        {/* features */}
        <g stroke={INK} strokeWidth="1" fill="none" opacity="0.7">
          <path d="M52 56 q3 -3 6 0" />
          <path d="M62 56 q3 -3 6 0" />
          <path d="M60 60 v6" />
          <path d="M55 70 q5 4 10 0" />
        </g>
      </g>
      <circle cx="60" cy="60" r="58" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.5" strokeDasharray="1 5" />
    </svg>
  );
}

/* ---- Bound journal — for the journal / blog cards ---------------------- */
export function PlateJournal({
  className,
  seed = 0,
  title = "An engraving of a bound journal",
}: PlateProps & { seed?: number }) {
  const cover = ["#E7DECF", "#E4D8C3", "#EAE2D2"][seed % 3];
  const motif = seed % 3;
  return (
    <svg viewBox="0 0 400 260" className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill="#F4EFE6" />
      <g transform="rotate(-4 200 130)">
        {/* pages stack behind */}
        <rect x="118" y="58" width="170" height="150" fill="#FFFFFF" stroke={INK} strokeWidth="1" />
        <rect x="124" y="52" width="170" height="150" fill="#FBF8F1" stroke={INK} strokeWidth="1" />
        {/* cover */}
        <rect x="112" y="46" width="176" height="156" rx="3" fill={cover} stroke={INK} strokeWidth="1.4" />
        <rect x="122" y="56" width="156" height="136" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.8" />
        {/* spine band */}
        <rect x="112" y="46" width="14" height="156" fill={INK} opacity="0.12" />
        {/* motif */}
        <g transform="translate(200 124)" stroke={GOLD} strokeWidth="1.4" fill="none">
          {motif === 0 && (
            <>
              <circle r="26" />
              <circle r="16" />
              <line x1="-26" y1="0" x2="26" y2="0" />
            </>
          )}
          {motif === 1 && (
            <>
              <rect x="-22" y="-22" width="44" height="44" transform="rotate(45)" />
              <circle r="10" />
            </>
          )}
          {motif === 2 && (
            <>
              <path d="M0 -28 L8 -8 L28 -8 L12 6 L18 26 L0 14 L-18 26 L-12 6 L-28 -8 L-8 -8 Z" />
            </>
          )}
        </g>
        <text x="200" y="186" textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="8" letterSpacing="3" fill={INK} opacity="0.55">
          No. {String(seed + 1).padStart(2, "0")}
        </text>
      </g>
    </svg>
  );
}

/* ---- Atelier scene — for the benefits asymmetric column ---------------- */
export function PlateAtelier({ className, title = "An engraving of a writing desk by a tall window" }: PlateProps) {
  return (
    <svg viewBox="0 0 360 460" className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCF7EC" />
          <stop offset="1" stopColor="#F3ECDD" />
        </linearGradient>
        <radialGradient id="halo-at" cx="0.42" cy="0.3" r="0.7">
          <stop offset="0" stopColor={GOLD2} stopOpacity="0.22" />
          <stop offset="1" stopColor={GOLD2} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="360" height="460" fill="#FBF8F1" />
      <rect width="360" height="460" fill="url(#halo-at)" />

      {/* tall arched window */}
      <g>
        <path d="M70 60 q70 -52 140 0 v210 H70 Z" fill="url(#win)" stroke={INK} strokeWidth="1.6" />
        <line x1="140" y1="22" x2="140" y2="270" stroke={INK} strokeWidth="1.1" />
        <line x1="70" y1="150" x2="210" y2="150" stroke={INK} strokeWidth="1.1" />
        <path d="M70 60 q70 -52 140 0" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.6" />
        {/* light rays */}
        <g stroke={GOLD} strokeWidth="1" opacity="0.18">
          <line x1="120" y1="120" x2="40" y2="300" />
          <line x1="150" y1="120" x2="90" y2="320" />
          <line x1="180" y1="120" x2="150" y2="320" />
        </g>
      </g>

      {/* desk */}
      <g stroke={INK} strokeWidth="1.6" fill="#EDE5D6">
        <rect x="40" y="300" width="280" height="20" />
        <rect x="58" y="320" width="14" height="96" fill="#E6DDCC" />
        <rect x="288" y="320" width="14" height="96" fill="#E6DDCC" />
      </g>

      {/* objects on the desk */}
      <g>
        {/* stacked books */}
        <rect x="74" y="276" width="70" height="12" fill="#E2D8C4" stroke={INK} strokeWidth="1.2" />
        <rect x="80" y="264" width="62" height="12" fill="#EAE1CF" stroke={INK} strokeWidth="1.2" />
        <rect x="86" y="252" width="54" height="12" fill="url(#win)" stroke={INK} strokeWidth="1.2" />
        {/* lamp */}
        <g stroke={INK} strokeWidth="1.4" fill="none">
          <line x1="250" y1="300" x2="250" y2="250" />
          <path d="M250 250 q0 -22 24 -22" />
          <path d="M260 226 q14 0 18 14 l-26 6 q-4 -14 8 -20" fill={GOLD} fillOpacity="0.85" />
        </g>
        <ellipse cx="276" cy="244" rx="2.5" ry="2.5" fill={GOLD} />
        {/* inkwell + page */}
        <rect x="168" y="286" width="40" height="14" fill="#FFFFFF" stroke={INK} strokeWidth="1.1" transform="rotate(-4 188 293)" />
        <ellipse cx="226" cy="292" rx="11" ry="7" fill="#15120D" />
      </g>
      <rect x="20" y="20" width="320" height="420" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}
