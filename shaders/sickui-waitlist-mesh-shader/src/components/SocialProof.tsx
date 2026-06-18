import { Star } from "lucide-react";
import { useCountUp } from "@/lib/useCountUp";
import { formatCount } from "@/lib/utils";
import avatar1 from "../../assets/avatars/avatar-1.svg?url";
import avatar2 from "../../assets/avatars/avatar-2.svg?url";
import avatar3 from "../../assets/avatars/avatar-3.svg?url";
import avatar4 from "../../assets/avatars/avatar-4.svg?url";
import avatar5 from "../../assets/avatars/avatar-5.svg?url";

const AVATARS = [
	{ src: avatar1, name: "Maya Okonkwo" },
	{ src: avatar2, name: "Diego Ramos" },
	{ src: avatar3, name: "Aisha Karim" },
	{ src: avatar4, name: "Lena Hoffmann" },
	{ src: avatar5, name: "Sora Tanaka" },
];

interface SocialProofProps {
	/** Target tally; the visible number eases up to this on mount. */
	count: number;
}

/**
 * Stacked roster + an animated signup tally + a 5-star rating line. The avatars
 * are vendored, self-contained SVGs (see scripts/gen-avatars.mjs for why we
 * synthesise them instead of hotlinking Unsplash, which this environment blocks).
 */
export default function SocialProof({ count }: SocialProofProps) {
	const live = useCountUp(count, 1800);

	return (
		<div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
			<div className="flex -space-x-3">
				{AVATARS.map((a) => (
					<img
						key={a.name}
						src={a.src}
						alt={a.name}
						width={40}
						height={40}
						loading="eager"
						className="size-10 rounded-full border-2 border-white/30 bg-slate-800 shadow-md"
					/>
				))}
			</div>
			<div className="text-center sm:text-left">
				<div className="flex items-center justify-center gap-1 sm:justify-start" aria-hidden="true">
					{Array.from({ length: 5 }).map((_, i) => (
						<Star key={i} className="size-3.5 fill-amber-300 text-amber-300" />
					))}
				</div>
				<p className="text-sm text-white/75">
					<span className="font-semibold tabular-nums text-white">{formatCount(live)}</span>{" "}
					builders already on the list
				</p>
			</div>
		</div>
	);
}
