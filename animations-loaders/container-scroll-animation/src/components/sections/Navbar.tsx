import { Github, MoveUpRight } from "lucide-react";

/** Floating glass navbar — quiet, so the scrolling deck stays the hero. */
export function Navbar() {
	return (
		<header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
			<nav className="flex w-full max-w-5xl items-center gap-3 rounded-full border border-white/[0.08] bg-ink-soft/70 px-3 py-2 backdrop-blur-md sm:px-4">
				<a href="#top" className="flex items-center gap-2 pl-1">
					<span className="grid h-7 w-7 place-items-center rounded-lg bg-iris text-[#0b0c10]">
						{/* tilted-card glyph — the primitive itself */}
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
					<span className="font-display text-[15px] font-bold tracking-tight text-white">
						ContainerScroll
					</span>
					<span className="ml-1 hidden rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-white/45 sm:inline">
						ui/aceternity
					</span>
				</a>

				<div className="ml-auto hidden items-center gap-6 text-[13px] text-white/55 md:flex">
					<a href="#stages" className="transition hover:text-white">
						Stages
					</a>
					<a href="#install" className="transition hover:text-white">
						Install
					</a>
					<a href="#api" className="transition hover:text-white">
						API
					</a>
				</div>

				<a
					href="#install"
					className="ml-auto flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-[#0b0c10] transition hover:bg-iris-bright md:ml-3"
				>
					<Github className="h-3.5 w-3.5" />
					<span className="hidden sm:inline">Copy component</span>
					<MoveUpRight className="h-3.5 w-3.5" />
				</a>
			</nav>
		</header>
	);
}
