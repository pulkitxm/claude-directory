import { ArrowUp } from "lucide-react";

export function Footer() {
	return (
		<footer className="relative border-t border-white/[0.07] px-6 py-10">
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
				<div className="flex items-center gap-2">
					<span className="grid h-7 w-7 place-items-center rounded-lg bg-iris text-[#0b0c10]">
						<svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
							<rect
								x="4"
								y="6"
								width="16"
								height="12"
								rx="2.5"
								stroke="currentColor"
								strokeWidth="2"
								transform="rotate(-12 12 12)"
							/>
						</svg>
					</span>
					<span className="font-display text-sm font-bold text-white">
						ContainerScroll
					</span>
					<span className="font-mono text-[11px] text-white/35">
						· scroll-driven device primitive
					</span>
				</div>

				<p className="font-mono text-[11px] text-white/35">
					Component integration · framer-motion + shadcn/ui
				</p>

				<a
					href="#top"
					className="flex items-center gap-1.5 rounded-full border border-white/12 px-3.5 py-1.5 text-[12px] font-medium text-white/70 transition hover:border-white/30 hover:text-white"
				>
					Back to top <ArrowUp className="h-3.5 w-3.5" />
				</a>
			</div>
		</footer>
	);
}
