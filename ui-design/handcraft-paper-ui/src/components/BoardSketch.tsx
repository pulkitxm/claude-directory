/* The hero "whiteboard" — a fully hand-drawn SVG sketch of a brainstorm board.
   Self-contained (no external asset): sticky notes, a doodle arrow, a smiley,
   a lightbulb and a connector line, all in the system palette. */
export function BoardSketch({ className }: { className?: string }) {
	return (
		<svg
			viewBox="0 0 420 320"
			className={className}
			role="img"
			aria-label="A messy brainstorming board with sticky notes, doodles, and arrows"
		>
			{/* faint ruled guide lines */}
			<g stroke="#e5e0d8" strokeWidth="1.5">
				<line x1="0" y1="70" x2="420" y2="70" />
				<line x1="0" y1="140" x2="420" y2="140" />
				<line x1="0" y1="210" x2="420" y2="210" />
				<line x1="0" y1="280" x2="420" y2="280" />
			</g>

			{/* yellow sticky note */}
			<g transform="rotate(-5 92 92)">
				<rect x="36" y="44" width="112" height="96" fill="#fff9c4" stroke="#2d2d2d" strokeWidth="2.5" rx="6" />
				<line x1="52" y1="70" x2="132" y2="70" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
				<line x1="52" y1="88" x2="120" y2="88" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
				<line x1="52" y1="106" x2="128" y2="106" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
				<circle cx="92" cy="40" r="5" fill="#ff4d4d" stroke="#2d2d2d" strokeWidth="1.6" />
			</g>

			{/* blue sticky note */}
			<g transform="rotate(4 300 80)">
				<rect x="250" y="40" width="104" height="84" fill="#cfe0f5" stroke="#2d2d2d" strokeWidth="2.5" rx="6" />
				<path d="M268 84 l12 14 l22 -30" fill="none" stroke="#2d5da1" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
				<circle cx="300" cy="38" r="5" fill="#2d5da1" stroke="#2d2d2d" strokeWidth="1.6" />
			</g>

			{/* hand-drawn dashed arrow connecting the two notes */}
			<path d="M150 96 C 190 130, 220 70, 248 84" fill="none" stroke="#2d2d2d" strokeWidth="2.5" strokeDasharray="2 8" strokeLinecap="round" />
			<path d="M240 74 l12 12 l-15 4" fill="none" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

			{/* lightbulb idea doodle */}
			<g transform="translate(64 188)">
				<path d="M30 6 a26 26 0 0 1 16 46 q-3 4 -3 9 h-26 q0 -5 -3 -9 a26 26 0 0 1 16 -46Z" fill="#fff" stroke="#2d2d2d" strokeWidth="2.5" />
				<line x1="20" y1="70" x2="40" y2="70" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" />
				<line x1="23" y1="78" x2="37" y2="78" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" />
				<g stroke="#ff4d4d" strokeWidth="2.5" strokeLinecap="round">
					<line x1="30" y1="-10" x2="30" y2="-2" />
					<line x1="-6" y1="20" x2="2" y2="24" />
					<line x1="66" y1="20" x2="58" y2="24" />
				</g>
			</g>

			{/* speech-bubble doodle with a smiley */}
			<g transform="translate(232 176)">
				<path d="M8 8 h150 a14 14 0 0 1 14 14 v60 a14 14 0 0 1 -14 14 h-96 l-22 22 v-22 h-32 a14 14 0 0 1 -14 -14 v-60 a14 14 0 0 1 14 -14Z" fill="#fff" stroke="#2d2d2d" strokeWidth="2.5" />
				<circle cx="74" cy="52" r="22" fill="none" stroke="#2d2d2d" strokeWidth="2.5" />
				<circle cx="66" cy="46" r="2.5" fill="#2d2d2d" />
				<circle cx="82" cy="46" r="2.5" fill="#2d2d2d" />
				<path d="M62 58 q12 12 24 0" fill="none" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" />
				<g stroke="#2d5da1" strokeWidth="2.5" strokeLinecap="round">
					<line x1="112" y1="44" x2="150" y2="44" />
					<line x1="112" y1="58" x2="142" y2="58" />
				</g>
			</g>

			{/* scribble underline accent */}
			<path d="M40 300 q40 -12 80 0 t80 0 t80 0" fill="none" stroke="#ff4d4d" strokeWidth="3" strokeLinecap="round" />
		</svg>
	);
}
