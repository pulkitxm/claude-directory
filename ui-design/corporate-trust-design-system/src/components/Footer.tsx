import {
	Twitter,
	Github,
	Linkedin,
	Youtube,
	type LucideIcon,
} from "lucide-react";
import { Shell } from "./primitives";
import { Logo } from "./Logo";
import { FOOTER_COLUMNS } from "../lib/content";

const SOCIALS: { label: string; icon: LucideIcon; href: string }[] = [
	{ label: "Northwind on X", icon: Twitter, href: "#" },
	{ label: "Northwind on GitHub", icon: Github, href: "#" },
	{ label: "Northwind on LinkedIn", icon: Linkedin, href: "#" },
	{ label: "Northwind on YouTube", icon: Youtube, href: "#" },
];

/* Dark footer. Columns collapse 4 → 2 → 1 with the viewport. Social icons follow
   the spec's slate-400 → indigo-400 hover treatment. */
export function Footer() {
	return (
		<footer className="on-dark relative overflow-hidden bg-slate-900 text-slate-300">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
			/>
			<Shell className="py-14 lg:py-16">
				<div className="grid gap-10 lg:grid-cols-[1.4fr_2.6fr]">
					{/* Brand + newsletter */}
					<div>
						<Logo tone="dark" />
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
							The operations platform teams actually trust. Automate the
							busywork, unify your tools, and decide with confidence.
						</p>
						<form
							className="mt-6 flex max-w-xs gap-2"
							onSubmit={(e) => e.preventDefault()}
						>
							<label htmlFor="footer-email" className="sr-only">
								Email for product updates
							</label>
							<input
								id="footer-email"
								type="email"
								placeholder="Product updates"
								className="field !border-white/10 !bg-white/5 !text-white placeholder:!text-slate-500 focus:!border-indigo-400 focus:!shadow-none"
								autoComplete="email"
							/>
							<button type="submit" className="btn btn-primary shrink-0 !px-4">
								Join
							</button>
						</form>
					</div>

					{/* Link columns */}
					<div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
						{FOOTER_COLUMNS.map((col) => (
							<nav key={col.title} aria-label={col.title}>
								<h3 className="text-sm font-bold text-white">{col.title}</h3>
								<ul className="mt-4 space-y-2.5">
									{col.links.map((link) => (
										<li key={link}>
											<a
												href="#"
												className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
											>
												{link}
											</a>
										</li>
									))}
								</ul>
							</nav>
						))}
					</div>
				</div>

				{/* Bottom bar */}
				<div className="mt-12 flex flex-col items-center gap-5 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
					<p className="text-sm text-slate-500">
						© {new Date().getFullYear()} Northwind, Inc. All rights reserved.
					</p>
					<ul className="flex items-center gap-2">
						{SOCIALS.map((s) => (
							<li key={s.label}>
								<a
									href={s.href}
									aria-label={s.label}
									className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors duration-200 hover:bg-white/5 hover:text-indigo-400"
								>
									<s.icon className="h-5 w-5" aria-hidden="true" />
								</a>
							</li>
						))}
					</ul>
				</div>
			</Shell>
		</footer>
	);
}
