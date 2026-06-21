import { ArrowUp, Github, Star, Twitter } from "lucide-react";
import { NAV_LINKS } from "../content";

const COLUMNS = [
	{
		title: "System",
		links: ["Tokens", "Components", "Patterns", "Changelog"],
	},
	{
		title: "Resources",
		links: ["Docs", "Figma Kit", "Templates", "Showcase"],
	},
	{
		title: "Company",
		links: ["About", "Manifesto", "Careers", "Contact"],
	},
];

/* Yellow color-block footer (per the token spec: yellow as footer background).
   A loud wordmark, link columns, social sticker boxes, and a back-to-top. */
export function Footer() {
	function toTop() {
		document
			.getElementById("top")
			?.scrollIntoView({ behavior: "smooth", block: "start" });
	}

	return (
		<footer className="neo-noise relative overflow-hidden bg-neo-secondary">
			<div
				className="neo-halftone pointer-events-none absolute inset-0 opacity-10"
				aria-hidden="true"
			/>
			<div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
					{/* Wordmark */}
					<div className="lg:col-span-4">
						<a href="#top" className="flex items-center gap-2">
							<span className="flex h-11 w-11 items-center justify-center border-4 border-neo-ink bg-neo-accent neo-shadow-sm">
								<Star
									className="h-5 w-5 fill-neo-ink stroke-neo-ink"
									strokeWidth={3}
								/>
							</span>
							<span className="text-2xl font-bold uppercase tracking-tighter text-neo-ink">
								Loudhouse
							</span>
						</a>
						<p className="mt-5 max-w-xs text-base font-bold leading-snug text-neo-ink">
							A Neo-brutalist design system. Anti-corporate, anti-smooth,
							anti-boring. Built to be seen.
						</p>
						<div className="mt-6 flex gap-3">
							<a
								href="#top"
								aria-label="Twitter"
								className="flex h-12 w-12 items-center justify-center border-4 border-neo-ink bg-neo-bg neo-shadow-sm transition-all duration-100 ease-out hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-neo-accent active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
							>
								<Twitter
									className="h-5 w-5 fill-neo-ink stroke-neo-ink"
									strokeWidth={2}
								/>
							</a>
							<a
								href="#top"
								aria-label="GitHub"
								className="flex h-12 w-12 items-center justify-center border-4 border-neo-ink bg-neo-bg neo-shadow-sm transition-all duration-100 ease-out hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-neo-accent active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
							>
								<Github className="h-5 w-5 stroke-neo-ink" strokeWidth={2.5} />
							</a>
						</div>
					</div>

					{/* Link columns */}
					<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6">
						{COLUMNS.map((col) => (
							<div key={col.title}>
								<h3 className="text-xs font-bold uppercase tracking-[0.25em] text-neo-ink/60">
									{col.title}
								</h3>
								<ul className="mt-4 space-y-2.5">
									{col.links.map((link) => (
										<li key={link}>
											<a
												href="#top"
												className="inline-block text-sm font-bold uppercase tracking-wide text-neo-ink transition-colors duration-100 hover:bg-neo-ink hover:text-neo-secondary"
											>
												{link}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>

					{/* Back to top */}
					<div className="lg:col-span-2 lg:text-right">
						<button
							type="button"
							onClick={toTop}
							className="inline-flex items-center gap-2 border-4 border-neo-ink bg-neo-bg px-4 py-3 text-sm font-bold uppercase tracking-wide text-neo-ink neo-shadow-sm transition-all duration-100 ease-out hover:-translate-x-[2px] hover:-translate-y-[2px] hover:bg-neo-accent active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
						>
							Back To Top
							<ArrowUp className="h-4 w-4" strokeWidth={3} />
						</button>
						{/* Jump links for keyboard users */}
						<ul className="mt-6 flex flex-wrap gap-2 lg:justify-end">
							{NAV_LINKS.map((l) => (
								<li key={l.href}>
									<a
										href={l.href}
										className="inline-block border-2 border-neo-ink bg-neo-bg px-2 py-1 text-[11px] font-bold uppercase tracking-widest text-neo-ink transition-colors duration-100 hover:bg-neo-accent"
									>
										{l.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Baseline */}
				<div className="mt-14 flex flex-col items-center justify-between gap-4 border-t-4 border-neo-ink pt-6 sm:flex-row">
					<p className="text-xs font-bold uppercase tracking-widest text-neo-ink">
						© {new Date().getFullYear()} Loudhouse — Built To Be Seen
					</p>
					<p className="text-xs font-bold uppercase tracking-widest text-neo-ink/60">
						Made With Border-4 &amp; Bad Manners
					</p>
				</div>
			</div>
		</footer>
	);
}
