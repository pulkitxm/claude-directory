import { Github, Hexagon } from "lucide-react";

/**
 * A slim glass nav pinned to the top. The wordmark pairs a lucide Hexagon with
 * the "SickUI" name; the right side carries a GitHub stat chip and a "Sign in"
 * affordance — the chrome you'd expect around a real launch waitlist.
 */
export default function SiteNav() {
	return (
		<header className="fixed inset-x-0 top-0 z-30">
			<nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
				<a href="#top" className="flex items-center gap-2 text-white">
					<span className="grid size-8 place-items-center rounded-lg bg-white/15 ring-1 ring-inset ring-white/25 backdrop-blur">
						<Hexagon className="size-4.5 fill-white/90 text-white" />
					</span>
					<span className="text-lg font-semibold tracking-tight">SickUI</span>
				</a>

				<div className="flex items-center gap-2 sm:gap-3">
					<a
						href="#top"
						className="hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/85 backdrop-blur transition-colors hover:bg-white/15 sm:inline-flex"
					>
						<Github className="size-4" />
						<span>12.4k</span>
					</a>
					<a
						href="#top"
						className="rounded-full bg-white/90 px-4 py-1.5 text-sm font-semibold text-slate-900 transition-colors hover:bg-white"
					>
						Sign in
					</a>
				</div>
			</nav>
		</header>
	);
}
