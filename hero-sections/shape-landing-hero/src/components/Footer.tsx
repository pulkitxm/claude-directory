import { Circle, ExternalLink, Link2 } from "lucide-react";
export default function Footer() {
    return (<footer id="source" className="relative border-t border-white/[0.06] bg-[#030303] py-12">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
				<div className="flex items-center gap-2">
					<span className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04]">
						<Circle className="h-2.5 w-2.5 fill-rose-500/90 text-rose-500/90"/>
					</span>
					<span className="text-sm font-semibold tracking-tight text-white">
						Geometric Study
					</span>
				</div>

				<p className="text-center text-xs text-white/35">
					HeroGeometric by Kokonut UI, used under MIT.
 <a className="underline" href="https://21st.dev/@kokonutd">21st.dev origin</a>
				</p>

				<div className="flex items-center gap-3">
					<a href="https://github.com/kokonut-labs/kokonutui/blob/d3e2d195bddbe7d7795989729831504b72c1bf07/components/kokonutui/hero-geometric.tsx" aria-label="Licensed component source" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] text-white/55 transition-colors hover:text-white">
						<ExternalLink className="h-4 w-4"/>
					</a>
					<a href="./THIRD_PARTY_NOTICES.txt" aria-label="Complete license notices" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] text-white/55 transition-colors hover:text-white">
						<Link2 className="h-4 w-4"/>
					</a>
				</div>
			</div>
		</footer>);
}
