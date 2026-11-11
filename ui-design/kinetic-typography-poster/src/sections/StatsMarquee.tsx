import { KineticMarquee } from "../components/KineticMarquee";
import { STATS } from "../content";


export function StatsMarquee() {
	return (
		<section
			aria-label="Festival by the numbers"
			className="border-b-2 border-line bg-acid py-5 text-acid-foreground md:py-7"
		>
			<KineticMarquee speed={80} label="Festival statistics">
				{STATS.map((stat) => (
					<div key={stat.label} className="flex items-center">
						<div className="flex items-baseline gap-3 px-8 md:px-12">
							<span className="font-bold leading-none tracking-tighter text-4xl md:text-6xl">
								{stat.value}
							</span>
							<span className="text-sm font-bold uppercase tracking-tight md:text-base">
								{stat.label}
							</span>
						</div>
						<span aria-hidden="true" className="text-2xl font-bold md:text-4xl">
							✳
						</span>
					</div>
				))}
			</KineticMarquee>
		</section>
	);
}
