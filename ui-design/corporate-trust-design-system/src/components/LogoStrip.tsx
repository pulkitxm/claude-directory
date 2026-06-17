import { Shell } from "./primitives";
import { TRUST_LOGOS } from "../lib/content";

/* Continuous, pure-CSS marquee of customer wordmarks. Duplicated once so the
   -50% translate loops seamlessly; masked at both edges. */
export function LogoStrip() {
	const row = [...TRUST_LOGOS, ...TRUST_LOGOS];
	return (
		<section aria-label="Trusted by leading teams" className="border-y border-slate-200/70 bg-white/60 py-10">
			<Shell>
				<p className="text-center text-sm font-medium text-slate-400">
					Trusted by operations teams at 12,000+ companies
				</p>
			</Shell>
			<div className="marquee-mask mt-6 overflow-hidden">
				<div className="marquee-track gap-12 px-6">
					{row.map((name, i) => (
						<span
							key={`${name}-${i}`}
							className="select-none whitespace-nowrap text-xl font-extrabold tracking-tight text-slate-300 transition-colors duration-200 hover:text-indigo-500"
							aria-hidden={i >= TRUST_LOGOS.length ? "true" : undefined}
						>
							{name}
						</span>
					))}
				</div>
			</div>
		</section>
	);
}
