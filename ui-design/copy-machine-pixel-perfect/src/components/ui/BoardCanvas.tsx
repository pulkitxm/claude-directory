import { motion } from "framer-motion";

export type LayerKey = "all" | "copper" | "mask" | "silk";

/**
 * A stylized but plausible board. Each Gerber-style layer (mask pour, copper
 * traces/pads, silkscreen) is a group whose opacity responds to the selected
 * layer, so the same artwork reads as "assembled" or as a single film.
 */
export function BoardCanvas({ layer }: { layer: LayerKey }) {
	const show = (l: Exclude<LayerKey, "all">) =>
		layer === "all" ? 1 : layer === l ? 1 : 0.06;

	return (
		<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#06100C] ring-1 ring-inset ring-black/40">
			<svg
				viewBox="0 0 480 360"
				className="h-full w-full"
				role="img"
				aria-label="Printed circuit board layer preview"
			>
				<defs>
					<linearGradient id="bc-mask" x1="0" y1="0" x2="1" y2="1">
						<stop offset="0" stopColor="#0E2A1C" />
						<stop offset="1" stopColor="#0A3A24" />
					</linearGradient>
					<radialGradient id="bc-glow" cx="0.5" cy="0.35" r="0.7">
						<stop offset="0" stopColor="#1FB66E" stopOpacity="0.18" />
						<stop offset="1" stopColor="#1FB66E" stopOpacity="0" />
					</radialGradient>
				</defs>

				{/* SOLDER MASK — the board body */}
				<motion.g
					animate={{ opacity: show("mask") }}
					transition={{ duration: 0.4 }}
				>
					<rect
						x="16"
						y="16"
						width="448"
						height="328"
						rx="14"
						fill="url(#bc-mask)"
					/>
					<rect
						x="16"
						y="16"
						width="448"
						height="328"
						rx="14"
						fill="none"
						stroke="#34D17F"
						strokeOpacity="0.35"
						strokeWidth="1.5"
					/>
					<rect
						x="16"
						y="16"
						width="448"
						height="328"
						rx="14"
						fill="url(#bc-glow)"
					/>
					{/* mounting holes */}
					{[
						[42, 42],
						[438, 42],
						[42, 318],
						[438, 318],
					].map(([x, y], i) => (
						<circle
							key={i}
							cx={x}
							cy={y}
							r="7"
							fill="#06100C"
							stroke="#34D17F"
							strokeOpacity="0.4"
							strokeWidth="1.5"
						/>
					))}
				</motion.g>

				{/* COPPER — traces, pours and pads */}
				<motion.g
					animate={{ opacity: show("copper") }}
					transition={{ duration: 0.4 }}
				>
					{/* ground pour hatch on the right */}
					<g stroke="#E8A24B" strokeOpacity="0.16" strokeWidth="1">
						{Array.from({ length: 14 }).map((_, i) => (
							<line
								key={i}
								x1={300 + i * 12}
								y1="40"
								x2={300 + i * 12}
								y2="320"
							/>
						))}
					</g>
					{/* routed traces (45°) */}
					<g
						fill="none"
						stroke="#E8A24B"
						strokeWidth="3"
						strokeLinejoin="round"
						strokeLinecap="round"
						strokeOpacity="0.92"
					>
						<path d="M70 90 H150 L186 126 H250" />
						<path d="M70 130 H120 L156 166 H250" />
						<path d="M70 180 H250" />
						<path d="M70 230 H140 L176 266 H260" />
						<path d="M260 126 L300 166 H400" />
						<path d="M250 180 H320 L356 144 H410" />
						<path d="M260 266 H360 L396 230 H430" />
					</g>
					{/* the QFP — central IC pads */}
					<g>
						<rect
							x="196"
							y="146"
							width="68"
							height="68"
							rx="4"
							fill="#0A1A12"
							stroke="#E8A24B"
							strokeWidth="2"
							strokeOpacity="0.7"
						/>
						{Array.from({ length: 6 }).map((_, i) => (
							<g key={i} fill="#F5B968">
								<rect x={204 + i * 10} y="138" width="5" height="10" rx="1" />
								<rect x={204 + i * 10} y="212" width="5" height="10" rx="1" />
								<rect x="188" y={154 + i * 10} width="10" height="5" rx="1" />
								<rect x="262" y={154 + i * 10} width="10" height="5" rx="1" />
							</g>
						))}
						<circle cx="206" cy="156" r="2.5" fill="#0A1014" />
					</g>
					{/* discrete pads */}
					{[
						[70, 90],
						[70, 130],
						[70, 180],
						[70, 230],
						[410, 144],
						[430, 230],
						[400, 166],
					].map(([x, y], i) => (
						<rect
							key={i}
							x={x - 6}
							y={y - 5}
							width="12"
							height="10"
							rx="1.5"
							fill="#F5B968"
						/>
					))}
				</motion.g>

				{/* VIAS — plated through-holes, visible on copper + assembled */}
				<motion.g
					animate={{ opacity: layer === "silk" || layer === "mask" ? 0.06 : 1 }}
					transition={{ duration: 0.4 }}
				>
					{[
						[250, 126],
						[250, 180],
						[300, 166],
						[360, 266],
					].map(([x, y], i) => (
						<circle
							key={i}
							cx={x}
							cy={y}
							r="4.5"
							fill="#06100C"
							stroke="#1FB66E"
							strokeWidth="2"
						/>
					))}
				</motion.g>

				{/* SILKSCREEN — designators + outlines */}
				<motion.g
					animate={{ opacity: show("silk") }}
					transition={{ duration: 0.4 }}
					fill="#EAF2EF"
					fillOpacity="0.92"
					fontFamily="JetBrains Mono, monospace"
					fontSize="11"
					fontWeight="600"
				>
					<text x="200" y="134">
						U1
					</text>
					<text x="58" y="80">
						R1
					</text>
					<text x="58" y="120">
						R2
					</text>
					<text x="58" y="170">
						C1
					</text>
					<text x="58" y="220">
						C2
					</text>
					<text x="402" y="138">
						D1
					</text>
					<text x="434" y="222">
						J1
					</text>
					{/* board name + rev */}
					<text x="34" y="332" fillOpacity="0.6" fontSize="10">
						FOUNDRY · rev_C
					</text>
					{/* part outline boxes */}
					<g fill="none" stroke="#EAF2EF" strokeOpacity="0.45" strokeWidth="1">
						<rect x="60" y="84" width="22" height="12" rx="1" />
						<rect x="60" y="124" width="22" height="12" rx="1" />
						<rect x="62" y="172" width="16" height="16" rx="1" />
						<rect x="62" y="222" width="16" height="16" rx="1" />
					</g>
				</motion.g>
			</svg>
		</div>
	);
}
