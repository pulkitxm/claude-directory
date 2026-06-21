import { Star } from "lucide-react";
import { Marquee } from "../components/Marquee";
import { MARQUEE_TOP } from "../content";

/* A black band marquee directly under the nav — the "warning tape" trust strip.
   Repeated all-caps slogans separated by spinning stars, scrolling left. */
export function TopMarquee() {
	return (
		<div className="border-b-4 border-neo-ink bg-neo-ink">
			<Marquee speed={45} ariaLabel="Design system principles" className="py-3">
				{MARQUEE_TOP.map((word) => (
					<span key={word} className="flex items-center">
						<span className="px-6 text-base font-bold uppercase tracking-widest text-neo-white">
							{word}
						</span>
						<Star
							className="h-4 w-4 fill-neo-secondary stroke-neo-secondary"
							strokeWidth={3}
							aria-hidden="true"
						/>
					</span>
				))}
			</Marquee>
		</div>
	);
}
