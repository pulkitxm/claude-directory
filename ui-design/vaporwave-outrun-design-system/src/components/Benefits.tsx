import { useState } from "react";
import { Folder, FileCode2, FileTerminal, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
	Eyebrow,
	Explorer,
	Reveal,
	Section,
	SectionHeading,
	Shell,
} from "./primitives";

type FileEntry = {
	icon: LucideIcon;
	name: string;
	size: string;
	title: string;
	desc: string;
};

const FILES: FileEntry[] = [
	{
		icon: FileCode2,
		name: "tokens.css",
		size: "4.2K",
		title: "One source of truth",
		desc: "Every color, font, glow and radius is a centralized token. Retheme the entire synthetic reality by editing a single sheet.",
	},
	{
		icon: FileTerminal,
		name: "primitives.tsx",
		size: "8.8K",
		title: "Composable by design",
		desc: "Buttons, cards, windows, fields and the diamond icon are reusable primitives — duplication-free, idiomatic React.",
	},
	{
		icon: FileText,
		name: "a11y.md",
		size: "2.1K",
		title: "Accessible neon",
		desc: "Semantic landmarks, focus-visible rings, reduced-motion fallbacks, and AA-contrast chrome text under all that glow.",
	},
	{
		icon: Folder,
		name: "responsive/",
		size: "dir",
		title: "Survives every screen",
		desc: "The grid, sun and scanlines hold from 320px to 4K. Mobile keeps the vibe; only the glow intensity eases off.",
	},
];

export function Benefits() {
	const [active, setActive] = useState(0);
	const current = FILES[active];

	return (
		<Section id="benefits" className="z-10 py-20 sm:py-32">
			<Shell>
				<Reveal className="mb-12 max-w-3xl sm:mb-16">
					<Eyebrow>C:\NEONWAVE\benefits</Eyebrow>
					<SectionHeading className="mt-5">The filesystem</SectionHeading>
					<p className="mt-5 font-mono text-lg text-[var(--color-chrome)]/70">
						Browse the system files. Select an entry to inspect why building on
						NEONWAVE OS leaves your codebase cleaner than you found it.
					</p>
				</Reveal>

				<Reveal>
					<Explorer
						title="file://neonwave/benefits"
						status={
							<>
								<span>{FILES.length} items</span>
								<span className="text-[var(--color-cyan)]/70">
									selected: {current.name}
								</span>
							</>
						}
					>
						<div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">
							{/* file list */}
							<ul className="border-b-2 border-[var(--color-chrome)]/10 md:border-b-0 md:border-r-2">
								{FILES.map((f, i) => {
									const selected = i === active;
									return (
										<li key={f.name}>
											<button
												type="button"
												onClick={() => setActive(i)}
												aria-pressed={selected}
												className={`flex w-full items-center gap-3 px-4 py-3 text-left font-mono text-sm transition-colors duration-200 ease-linear ${
													selected
														? "bg-[var(--color-cyan)]/10 text-[var(--color-cyan)]"
														: "text-[var(--color-chrome)]/70 hover:bg-[var(--color-magenta)]/10 hover:text-[var(--color-magenta)]"
												}`}
											>
												<f.icon
													size={16}
													className={
														selected
															? "text-[var(--color-cyan)]"
															: "text-[var(--color-magenta)]"
													}
												/>
												<span className="flex-1 truncate">{f.name}</span>
												<span className="text-[var(--color-chrome)]/40">{f.size}</span>
											</button>
										</li>
									);
								})}
							</ul>

							{/* preview pane */}
							<div className="dots min-h-[16rem] p-7">
								<div className="font-mono text-xs uppercase tracking-widest text-[var(--color-magenta)]">
									&gt; cat {current.name}
								</div>
								<h3 className="title-cyan mt-4 text-2xl font-semibold uppercase sm:text-3xl">
									{current.title}
								</h3>
								<p className="mt-4 max-w-lg font-mono text-base leading-relaxed text-[var(--color-chrome)]/75">
									{current.desc}
								</p>
								<div className="mt-6 inline-flex items-center gap-2 border border-[var(--color-cyan)]/40 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest text-[var(--color-cyan)]">
									<span className="pulse-dot inline-block h-2 w-2 rounded-full bg-[var(--color-cyan)] text-[var(--color-cyan)]" />
									verified · read-only
								</div>
							</div>
						</div>
					</Explorer>
				</Reveal>
			</Shell>
		</Section>
	);
}
