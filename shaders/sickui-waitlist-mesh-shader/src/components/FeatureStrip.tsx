import { Blocks, Palette, Wand2, type LucideIcon } from "lucide-react";

interface Capability {
	icon: LucideIcon;
	label: string;
	hint: string;
}

const CAPABILITIES: Capability[] = [
	{ icon: Blocks, label: "120+ components", hint: "copy-paste ready" },
	{ icon: Wand2, label: "Shader backdrops", hint: "like this page" },
	{ icon: Palette, label: "Themeable tokens", hint: "own every line" },
];

/**
 * A slim three-item capability row under the social proof. It communicates the
 * product at a glance while keeping the whole waitlist to a single viewport (so
 * the demo recorder captures it live on the static path, holding on the animated
 * mesh gradient).
 */
export default function FeatureStrip() {
	return (
		<ul className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
			{CAPABILITIES.map(({ icon: Icon, label, hint }) => (
				<li
					key={label}
					className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.06] px-3.5 py-3 text-left backdrop-blur-md sm:flex-col sm:items-start sm:gap-1.5"
				>
					<span className="inline-grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-sky-400/30 to-indigo-500/30 text-sky-100 ring-1 ring-inset ring-white/15">
						<Icon className="size-4.5" strokeWidth={2} />
					</span>
					<span className="min-w-0">
						<span className="block text-sm font-semibold leading-tight text-white">{label}</span>
						<span className="block text-xs text-white/55">{hint}</span>
					</span>
				</li>
			))}
		</ul>
	);
}
