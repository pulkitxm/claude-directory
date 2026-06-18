import { Github, Heart, Twitter } from "lucide-react";

/** Closing glass footer with social links and a quiet build credit. */
export default function SiteFooter() {
	return (
		<footer className="relative z-10 border-t border-white/10 bg-[#040a1e]/40 backdrop-blur-sm">
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-white/55 sm:flex-row sm:px-6">
				<p className="flex items-center gap-1.5">
					Built with <Heart className="size-3.5 fill-rose-400/80 text-rose-400/80" /> for the
					component-craving web.
				</p>
				<div className="flex items-center gap-4">
					<a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
						<Github className="size-4" /> GitHub
					</a>
					<a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-white">
						<Twitter className="size-4" /> @sickui
					</a>
					<span className="text-white/35">© {new Date().getFullYear()} SickUI</span>
				</div>
			</div>
		</footer>
	);
}
