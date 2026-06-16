import { Github, Twitter, Linkedin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "./Logo";
import { Shell, Blob } from "./primitives";

/* FOOTER — dark gray (Gray 900) color block to close the page. Flat link
   columns, geometric accents, no shadow. */
const COLUMNS: { title: string; links: string[] }[] = [
	{ title: "Product", links: ["Features", "Pricing", "Components", "Tokens", "Changelog"] },
	{ title: "Resources", links: ["Docs", "Guides", "Figma kit", "Showcase", "Status"] },
	{ title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
];

const SOCIAL: { icon: LucideIcon; label: string }[] = [
	{ icon: Twitter, label: "Twitter" },
	{ icon: Github, label: "GitHub" },
	{ icon: Linkedin, label: "LinkedIn" },
];

export function Footer() {
	return (
		<footer className="on-dark relative overflow-hidden bg-[var(--color-ink)] text-white">
			<Blob className="-right-24 -top-24 h-72 w-72 bg-white/[0.03]" />
			<Shell className="relative py-16 lg:py-20">
				<div className="grid gap-12 lg:grid-cols-12">
					<div className="lg:col-span-4">
						<Logo onDark />
						<p className="mt-5 max-w-xs leading-relaxed text-gray-400">
							A flat design system for people who'd rather show the work than
							hide it under a shadow.
						</p>
						<div className="mt-7 flex gap-3">
							{SOCIAL.map((s) => (
								<a
									key={s.label}
									href="#"
									aria-label={s.label}
									className="flex h-11 w-11 items-center justify-center rounded-md bg-white/10 text-white transition-all duration-200 hover:scale-105 hover:bg-[var(--color-brand)]"
								>
									<s.icon size={20} strokeWidth={2.25} />
								</a>
							))}
						</div>
					</div>

					<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
						{COLUMNS.map((col) => (
							<div key={col.title}>
								<h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
									{col.title}
								</h4>
								<ul className="mt-4 space-y-3">
									{col.links.map((l) => (
										<li key={l}>
											<a
												href="#"
												className="text-gray-300 transition-colors duration-200 hover:text-white"
											>
												{l}
											</a>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className="mt-14 flex flex-col items-start justify-between gap-4 border-t-2 border-white/10 pt-8 sm:flex-row sm:items-center">
					<p className="text-sm text-gray-400">
						© {new Date().getFullYear()} Flatline. A Fable 5 design-system
						experiment.
					</p>
					<div className="flex gap-6 text-sm text-gray-400">
						<a href="#" className="transition-colors duration-200 hover:text-white">
							Privacy
						</a>
						<a href="#" className="transition-colors duration-200 hover:text-white">
							Terms
						</a>
						<a href="#" className="transition-colors duration-200 hover:text-white">
							Cookies
						</a>
					</div>
				</div>
			</Shell>
		</footer>
	);
}
