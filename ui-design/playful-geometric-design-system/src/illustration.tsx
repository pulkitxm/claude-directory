/**
 * HeroScene — the "image" half of the hero, but authored as a self-contained
 * vector illustration in the system's own language (geometric primitives, hard
 * shadows, pattern fills) instead of a generic stock photo. It is clipped to a
 * blob mask and crowned with a small floating sticker. Decorative => aria-hidden.
 */
import { palette } from "./tokens.ts";

export function HeroScene() {
	const fg = palette.foreground;
	return (
		<svg
			viewBox="0 0 460 460"
			width="100%"
			height="100%"
			fill="none"
			role="img"
			aria-label="A playful geometric scene: a friendly character built from circles, triangles and squares, surrounded by floating shapes."
		>
			<defs>
				{/* Blob mask — organic asymmetric radius, the system's hero shape. */}
				<clipPath id="hero-blob">
					<path d="M230 8c92 0 150 38 188 96 30 46 28 118-4 174-34 60-92 96-184 96S64 442 26 380C-2 334-4 256 28 200 64 138 138 8 230 8Z" />
				</clipPath>
				<pattern id="hero-dots" width="20" height="20" patternUnits="userSpaceOnUse">
					<circle cx="3" cy="3" r="2.2" fill={fg} opacity="0.16" />
				</pattern>
				<pattern id="hero-stripes" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
					<rect width="6" height="12" fill={fg} opacity="0.85" />
				</pattern>
			</defs>

			{/* Clipped world */}
			<g clipPath="url(#hero-blob)">
				<rect width="460" height="460" fill={palette.accent} />
				<rect width="460" height="460" fill="url(#hero-dots)" />

				{/* Big amber sun arc top-right */}
				<circle cx="372" cy="92" r="58" fill={palette.tertiary} stroke={fg} strokeWidth="5" />
				<g stroke={fg} strokeWidth="5" strokeLinecap="round">
					<path d="M372 16v-2M430 50l2-1M312 50l-2-1M430 134l2 1M312 134l-2 1" opacity="0.0" />
				</g>

				{/* Striped column left */}
				<rect x="58" y="150" width="70" height="240" rx="10" fill={palette.quaternary} stroke={fg} strokeWidth="5" />
				<rect x="58" y="150" width="70" height="240" rx="10" fill="url(#hero-stripes)" opacity="0.25" />

				{/* Floating mint pill */}
				<rect x="300" y="300" width="120" height="46" rx="23" fill={palette.quaternary} stroke={fg} strokeWidth="5" transform="rotate(-12 360 323)" />

				{/* The friendly character — a stacked geometric mascot in a speech-bubble body */}
				{/* Body: speech-bubble blob */}
				<path
					d="M150 196h150c20 0 34 14 34 34v92c0 20-14 34-34 34h-86l-30 30v-30h-34c-20 0-34-14-34-34v-92c0-20 14-34 34-34Z"
					fill={palette.card}
					stroke={fg}
					strokeWidth="6"
					strokeLinejoin="round"
				/>
				{/* Eyes (circle + ring) */}
				<circle cx="206" cy="262" r="16" fill={palette.secondary} stroke={fg} strokeWidth="5" />
				<circle cx="206" cy="262" r="5" fill={fg} />
				<circle cx="270" cy="262" r="16" fill={palette.tertiary} stroke={fg} strokeWidth="5" />
				<circle cx="270" cy="262" r="5" fill={fg} />
				{/* Smile */}
				<path d="M196 300c12 16 56 16 84 0" stroke={fg} strokeWidth="6" strokeLinecap="round" fill="none" />
				{/* Cheek dots */}
				<circle cx="182" cy="292" r="6" fill={palette.secondary} opacity="0.7" />
				<circle cx="298" cy="292" r="6" fill={palette.secondary} opacity="0.7" />
				{/* Antenna: a little triangle hat */}
				<path d="M242 196l-26 0 13-30 13 30Z" fill={palette.secondary} stroke={fg} strokeWidth="5" strokeLinejoin="round" />
				<circle cx="229" cy="160" r="8" fill={palette.tertiary} stroke={fg} strokeWidth="4" />

				{/* Confetti inside the world */}
				<circle cx="110" cy="92" r="14" fill={palette.secondary} stroke={fg} strokeWidth="4" />
				<path d="M118 396l24 0-12-22-12 22Z" fill={palette.tertiary} stroke={fg} strokeWidth="4" strokeLinejoin="round" />
				<path d="M362 380v28M348 394h28" stroke={palette.card} strokeWidth="6" strokeLinecap="round" />
			</g>

			{/* Blob outline on top of the clipped content */}
			<path
				d="M230 8c92 0 150 38 188 96 30 46 28 118-4 174-34 60-92 96-184 96S64 442 26 380C-2 334-4 256 28 200 64 138 138 8 230 8Z"
				fill="none"
				stroke={fg}
				strokeWidth="6"
			/>
		</svg>
	);
}
