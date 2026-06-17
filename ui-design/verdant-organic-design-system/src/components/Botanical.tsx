// ─────────────────────────────────────────────────────────────────────────────
// Hand-drawn-feel botanical SVG illustrations, drawn entirely in the palette.
// These stand in for photography so the whole experience is offline, license-
// free, and unmistakably handcrafted — which suits the organic ethos better
// than stock imagery. Colours reference the design tokens directly.
// ─────────────────────────────────────────────────────────────────────────────

const MOSS = "#5D7052";
const MOSS_DEEP = "#475640";
const CLAY = "#C18C5D";
const SAND = "#E6DCCD";
const STONE = "#F0EBE5";
const PAPER = "#FDFCF8";
const CARD = "#FEFEFA";
const BARK = "#4A4A40";

type Props = { className?: string; title?: string };

/* A single calendula / daisy-like bloom used as a repeating motif. */
function Bloom({
  cx,
  cy,
  r,
  petals = 12,
  petal = CLAY,
  core = MOSS,
}: {
  cx: number;
  cy: number;
  r: number;
  petals?: number;
  petal?: string;
  core?: string;
}) {
  const els = [];
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    els.push(
      <ellipse
        key={i}
        cx={cx + Math.cos(a) * r * 0.62}
        cy={cy + Math.sin(a) * r * 0.62}
        rx={r * 0.5}
        ry={r * 0.22}
        fill={petal}
        transform={`rotate(${(a * 180) / Math.PI} ${cx + Math.cos(a) * r * 0.62} ${
          cy + Math.sin(a) * r * 0.62
        })`}
      />,
    );
  }
  return (
    <g>
      {els}
      <circle cx={cx} cy={cy} r={r * 0.4} fill={core} />
      <circle cx={cx} cy={cy} r={r * 0.4} fill={PAPER} opacity={0.12} />
    </g>
  );
}

/* A leafy sprig that arcs along a stem. */
function Sprig({
  d,
  leaves,
  color = MOSS,
  stroke = MOSS_DEEP,
}: {
  d: string;
  leaves: Array<{ x: number; y: number; rot: number; s: number }>;
  color?: string;
  stroke?: string;
}) {
  return (
    <g>
      <path d={d} fill="none" stroke={stroke} strokeWidth={2.4} strokeLinecap="round" />
      {leaves.map((l, i) => (
        <path
          key={i}
          d="M0 0 C 8 -10 22 -10 30 0 C 22 10 8 10 0 0 Z"
          fill={color}
          transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`}
        />
      ))}
    </g>
  );
}

/* ── Hero centrepiece — a tall apothecary jar brimming with botanicals,
   wreathed in blooms and sprigs, framed by an organic arch. ─────────────── */
export function HeroBotanical({ className, title = "An apothecary jar of foraged botanicals" }: Props) {
  return (
    <svg
      viewBox="0 0 460 520"
      className={className}
      role="img"
      aria-label={title}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* organic backing arch */}
      <path
        d="M230 18C330 18 412 96 412 220c0 150-70 282-182 282S48 370 48 220C48 96 130 18 230 18Z"
        fill={STONE}
      />
      <path
        d="M230 44C318 44 388 112 388 222c0 132-62 250-158 250S72 354 72 222C72 112 142 44 230 44Z"
        fill={CARD}
      />

      {/* back sprigs */}
      <Sprig
        d="M150 250 C 120 200 118 150 140 96"
        color={MOSS}
        stroke={MOSS_DEEP}
        leaves={[
          { x: 138, y: 210, rot: -150, s: 0.9 },
          { x: 124, y: 168, rot: -120, s: 1 },
          { x: 124, y: 128, rot: -100, s: 0.85 },
          { x: 138, y: 98, rot: -70, s: 0.8 },
        ]}
      />
      <Sprig
        d="M312 250 C 342 198 346 150 322 94"
        color={MOSS}
        stroke={MOSS_DEEP}
        leaves={[
          { x: 326, y: 208, rot: 150, s: 0.9 },
          { x: 340, y: 166, rot: 120, s: 1 },
          { x: 340, y: 126, rot: 100, s: 0.85 },
          { x: 324, y: 96, rot: 70, s: 0.8 },
        ]}
      />

      {/* the jar */}
      <g>
        {/* cork lid */}
        <rect x="184" y="150" width="92" height="30" rx="10" fill={CLAY} />
        <rect x="178" y="172" width="104" height="20" rx="9" fill="#A8743F" />
        {/* glass body */}
        <path
          d="M186 192h88c10 0 18 8 18 18 0 0 14 22 14 70v118c0 26-20 44-46 44h-72c-26 0-46-18-46-44V298c0-48 14-70 14-70 0-10 8-18 18-18Z"
          fill={MOSS}
          opacity="0.16"
        />
        <path
          d="M186 192h88c10 0 18 8 18 18 0 0 14 22 14 70v118c0 26-20 44-46 44h-72c-26 0-46-18-46-44V298c0-48 14-70 14-70 0-10 8-18 18-18Z"
          fill="none"
          stroke={MOSS}
          strokeWidth="3"
          opacity="0.5"
        />
        {/* contents — layered botanicals */}
        <clipPath id="jarClip">
          <path d="M150 300c0-48 14-70 14-70 0-10 8-18 18-18h96c10 0 18 8 18 18 0 0 14 22 14 70v98c0 26-20 44-46 44h-82c-26 0-46-18-46-44Z" />
        </clipPath>
        <g clipPath="url(#jarClip)">
          <rect x="148" y="300" width="164" height="160" fill={SAND} />
          <rect x="148" y="356" width="164" height="104" fill={CLAY} opacity="0.55" />
          <rect x="148" y="404" width="164" height="60" fill={MOSS} opacity="0.5" />
          {/* dried bits */}
          {Array.from({ length: 22 }).map((_, i) => (
            <circle
              key={i}
              cx={158 + ((i * 53) % 150)}
              cy={312 + ((i * 31) % 140)}
              r={2.4 + ((i * 7) % 4)}
              fill={i % 3 === 0 ? MOSS_DEEP : i % 3 === 1 ? "#8a5a2c" : "#b9a988"}
              opacity="0.7"
            />
          ))}
        </g>
        {/* label */}
        <rect x="178" y="312" width="104" height="58" rx="12" fill={PAPER} stroke={SAND} strokeWidth="2" />
        <Bloom cx={230} cy={332} r={13} petals={11} petal={CLAY} core={MOSS} />
        <rect x="198" y="350" width="64" height="4" rx="2" fill={BARK} opacity="0.35" />
        <rect x="210" y="358" width="40" height="3.4" rx="1.7" fill={BARK} opacity="0.22" />
        {/* glass highlight */}
        <path d="M198 214c-8 16-10 40-10 70v92" stroke={PAPER} strokeWidth="6" strokeLinecap="round" opacity="0.5" fill="none" />
      </g>

      {/* foreground blooms wreath */}
      <Bloom cx={120} cy={350} r={26} petals={13} petal={CLAY} core={MOSS} />
      <Bloom cx={344} cy={326} r={22} petals={12} petal="#d6a878" core={MOSS} />
      <Bloom cx={132} cy={430} r={18} petals={11} petal="#cf9a6a" core={MOSS_DEEP} />
      <Bloom cx={336} cy={418} r={16} petals={11} petal={CLAY} core={MOSS_DEEP} />

      {/* little leaves scattered */}
      {[
        { x: 96, y: 300, r: -30 },
        { x: 372, y: 360, r: 40 },
        { x: 100, y: 392, r: 20 },
        { x: 360, y: 280, r: -50 },
      ].map((l, i) => (
        <path
          key={i}
          d="M0 0 C 9 -12 26 -12 36 0 C 26 12 9 12 0 0 Z"
          fill={MOSS}
          transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
        />
      ))}
    </svg>
  );
}

/* ── A single product tin, shown rotated in a thick paper frame. ─────────── */
export function ProductTin({ className, title = "A tin of Morning Meadow tea" }: Props) {
  return (
    <svg viewBox="0 0 360 360" className={className} role="img" aria-label={title}>
      <rect width="360" height="360" rx="28" fill={STONE} />
      {/* tabletop wash */}
      <ellipse cx="180" cy="288" rx="150" ry="34" fill={MOSS} opacity="0.1" />

      {/* loose leaves around the tin */}
      {[
        { x: 70, y: 250, r: -28, c: MOSS },
        { x: 290, y: 250, r: 30, c: MOSS_DEEP },
        { x: 96, y: 110, r: -60, c: CLAY },
        { x: 280, y: 120, r: 50, c: MOSS },
      ].map((l, i) => (
        <path
          key={i}
          d="M0 0 C 10 -14 30 -14 42 0 C 30 14 10 14 0 0 Z"
          fill={l.c}
          opacity="0.9"
          transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}
        />
      ))}
      <Bloom cx={300} cy={278} r={20} petals={12} petal={CLAY} core={MOSS} />
      <Bloom cx={64} cy={300} r={15} petals={11} petal="#d6a878" core={MOSS_DEEP} />

      {/* tin */}
      <g transform="rotate(-3 180 180)">
        <rect x="106" y="92" width="148" height="184" rx="22" fill={MOSS} />
        <rect x="106" y="92" width="148" height="184" rx="22" fill={PAPER} opacity="0.04" />
        {/* lid seam */}
        <rect x="106" y="120" width="148" height="6" fill={MOSS_DEEP} opacity="0.5" />
        {/* paper label band */}
        <rect x="120" y="140" width="120" height="120" rx="14" fill={PAPER} />
        <Bloom cx={180} cy={176} r={22} petals={13} petal={CLAY} core={MOSS} />
        <text
          x="180"
          y="216"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontSize="17"
          fontWeight="700"
          fill={BARK}
        >
          Morning
        </text>
        <text
          x="180"
          y="236"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontSize="17"
          fontWeight="700"
          fill={BARK}
        >
          Meadow
        </text>
        {/* sun/moon caffeine mark */}
        <circle cx="150" cy="250" r="5" fill={CLAY} />
        <path d="M168 250a5 5 0 1 1-5-5 4 4 0 0 0 5 5Z" fill={MOSS} />
        {/* highlight */}
        <rect x="116" y="104" width="8" height="160" rx="4" fill={PAPER} opacity="0.3" />
      </g>
    </svg>
  );
}

/* ── Benefits image — a steaming cup on a saucer with rising sprig of steam,
   designed to sit inside a complex organic blob mask. ────────────────────── */
export function SteamingCup({ className, title = "A steaming cup of herbal tea" }: Props) {
  return (
    <svg viewBox="0 0 420 420" className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid slice">
      <rect width="420" height="420" fill={SAND} />
      <rect width="420" height="220" fill={STONE} />
      {/* sun */}
      <circle cx="312" cy="104" r="58" fill={CLAY} opacity="0.5" />
      <circle cx="312" cy="104" r="40" fill={CLAY} opacity="0.55" />

      {/* hill */}
      <path d="M0 300C120 250 210 270 300 246s120-18 120-18V420H0Z" fill={MOSS} opacity="0.7" />
      <path d="M0 340C140 300 240 322 330 300s90-8 90-8V420H0Z" fill={MOSS_DEEP} opacity="0.7" />

      {/* steam */}
      <g stroke={PAPER} strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.8">
        <path d="M188 196c-12-18 12-30 0-50s10-30 0-48" />
        <path d="M214 196c12-18-12-30 0-50s-10-30 0-48" />
      </g>

      {/* saucer + cup */}
      <ellipse cx="210" cy="320" rx="118" ry="26" fill={CARD} />
      <ellipse cx="210" cy="316" rx="118" ry="22" fill={PAPER} />
      <path d="M132 236h156l-12 70c-3 18-20 30-38 30h-56c-18 0-35-12-38-30l-12-70Z" fill={CARD} />
      <path d="M132 236h156l-12 70c-3 18-20 30-38 30h-56c-18 0-35-12-38-30l-12-70Z" fill="none" stroke={SAND} strokeWidth="3" />
      {/* tea surface */}
      <ellipse cx="210" cy="240" rx="76" ry="14" fill={CLAY} />
      <ellipse cx="210" cy="240" rx="76" ry="14" fill={MOSS} opacity="0.25" />
      {/* handle */}
      <path d="M288 252c34 0 40 44 6 50" fill="none" stroke={CARD} strokeWidth="14" strokeLinecap="round" />
      {/* floating petal in tea */}
      <path d="M0 0 C 7 -9 20 -9 27 0 C 20 9 7 9 0 0 Z" fill={CLAY} transform="translate(196 236) rotate(20)" />
    </svg>
  );
}

/* ── Small blog-card illustrations keyed by plant. ───────────────────────── */
export function PostArt({
  variant,
  className,
}: {
  variant: "elderflower" | "rosehip" | "chamomile";
  className?: string;
}) {
  const palettes = {
    elderflower: { bg: STONE, accent: "#E9E3D6", bloom: "#EFE9DD", core: MOSS },
    rosehip: { bg: "#E6DCCD", accent: "#DBCBB4", bloom: CLAY, core: "#A8743F" },
    chamomile: { bg: "#EAE7DC", accent: "#DDDac9", bloom: PAPER, core: CLAY },
  } as const;
  const p = palettes[variant];
  const label = {
    elderflower: "Elderflower sprig",
    rosehip: "Rosehip branch",
    chamomile: "Chamomile flowers",
  }[variant];

  return (
    <svg viewBox="0 0 400 260" className={className} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill={p.bg} />
      <circle cx="320" cy="56" r="120" fill={p.accent} opacity="0.6" />
      {/* main sprig */}
      <Sprig
        d="M120 250 C 150 180 150 110 130 56"
        color={MOSS}
        stroke={MOSS_DEEP}
        leaves={[
          { x: 142, y: 206, rot: -150, s: 1.1 },
          { x: 128, y: 162, rot: -120, s: 1.2 },
          { x: 132, y: 118, rot: -90, s: 1 },
          { x: 124, y: 78, rot: -60, s: 0.9 },
        ]}
      />
      <Sprig
        d="M250 250 C 230 190 240 130 260 80"
        color={MOSS}
        stroke={MOSS_DEEP}
        leaves={[
          { x: 244, y: 210, rot: 150, s: 1 },
          { x: 236, y: 168, rot: 120, s: 1.1 },
          { x: 248, y: 122, rot: 90, s: 0.95 },
        ]}
      />
      {/* blooms */}
      <Bloom cx={150} cy={70} r={26} petals={variant === "chamomile" ? 14 : 12} petal={p.bloom} core={p.core} />
      <Bloom cx={258} cy={92} r={22} petals={variant === "chamomile" ? 13 : 11} petal={p.bloom} core={p.core} />
      <Bloom cx={206} cy={132} r={18} petals={12} petal={p.bloom} core={p.core} />
      {variant === "rosehip" && (
        <>
          <circle cx="298" cy="150" r="13" fill={CLAY} />
          <circle cx="318" cy="176" r="10" fill="#A8743F" />
        </>
      )}
    </svg>
  );
}
