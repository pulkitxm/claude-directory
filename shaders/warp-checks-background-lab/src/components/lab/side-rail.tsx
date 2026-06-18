import { Grid3x3 } from "lucide-react";
import type { WarpConfig } from "@/lib/warp";
import { fmt } from "@/lib/utils";

/**
 * Content for the prompt's `left-8 top-1/2 -translate-y-1/2 z-10` side rail —
 * a vertical, engraved spine that names the shader and reads its live
 * coordinates (shape · iterations · swirl). It is hidden on small viewports
 * where horizontal room is scarce, and decorative-only (aria-hidden).
 */
export function SideRail({ config }: { config: WarpConfig }) {
	return (
		<div
			className="hidden flex-col items-center gap-5 xl:flex"
			aria-hidden
		>
			<span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-black/40 backdrop-blur-md">
				<Grid3x3 className="h-4 w-4 text-white/75" />
			</span>

			<span className="h-16 w-px bg-gradient-to-b from-white/40 to-transparent" />

			<span
				className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/55"
				style={{ writingMode: "vertical-rl" }}
			>
				Warp&nbsp;·&nbsp;{config.shape}
			</span>

			<span className="h-16 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />

			<span
				className="font-mono text-[10px] tabular-nums tracking-[0.25em] text-white/45"
				style={{ writingMode: "vertical-rl" }}
			>
				it{config.swirlIterations} · sw{fmt(config.swirl)}
			</span>

			<span className="h-16 w-px bg-gradient-to-b from-white/30 to-transparent" />
		</div>
	);
}
