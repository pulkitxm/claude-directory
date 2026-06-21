import {
	FolderTree,
	HelpCircle,
	ListChecks,
	Package,
	Terminal,
} from "lucide-react";
import type { ReactNode } from "react";
import { Glass, Kicker } from "@/components/lab/primitives";

/** A copy-friendly command line styled as a terminal row. */
function Cmd({ children }: { children: ReactNode }) {
	return (
		<code className="block rounded-lg border border-white/10 bg-black/50 px-3 py-2 font-mono text-[12px] text-emerald-200/90">
			<span className="select-none text-white/30">$ </span>
			{children}
		</code>
	);
}

function Section({
	icon,
	title,
	children,
}: {
	icon: ReactNode;
	title: string;
	children: ReactNode;
}) {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center gap-2">
				<span className="text-white/70">{icon}</span>
				<h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">
					{title}
				</h3>
			</div>
			{children}
		</div>
	);
}

/**
 * The shadcn integration write-up the brief asks for, rendered in the UI:
 * the prerequisites, why `components/ui` is the path that matters, the install
 * step, the steps-to-integrate, and answers to the brief's "Questions to Ask".
 */
export function IntegrationNotes() {
	return (
		<Glass as="section" className="flex flex-col gap-8 p-6 md:p-8">
			<header className="flex flex-col gap-2">
				<Kicker>Integration brief</Kicker>
				<h2 className="text-2xl font-medium text-white">
					Dropping the Warp background into a shadcn app
				</h2>
				<p className="max-w-2xl text-sm leading-relaxed text-white/65">
					This page <em>is</em> the integration. The component lives at the
					canonical{" "}
					<code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-white/90">
						src/components/ui/background-shaders.tsx
					</code>{" "}
					and is consumed exactly as the brief's{" "}
					<code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-white/90">
						demo.tsx
					</code>{" "}
					shows. Everything below documents how to reproduce it from scratch.
				</p>
			</header>

			<div className="grid gap-8 md:grid-cols-2">
				<Section
					icon={<Terminal className="h-4 w-4" aria-hidden />}
					title="Prerequisites — Vite + TS + Tailwind + shadcn"
				>
					<p className="text-sm leading-relaxed text-white/65">
						If the codebase doesn't already have a TypeScript + Tailwind +
						shadcn setup, scaffold one:
					</p>
					<div className="flex flex-col gap-2">
						<Cmd>npm create vite@latest my-app -- --template react-ts</Cmd>
						<Cmd>npm i tailwindcss @tailwindcss/vite</Cmd>
						<Cmd>npx shadcn@latest init</Cmd>
					</div>
					<p className="text-sm leading-relaxed text-white/65">
						Add the Tailwind plugin to{" "}
						<code className="font-mono text-[12px] text-white/90">
							vite.config.ts
						</code>{" "}
						and the{" "}
						<code className="font-mono text-[12px] text-white/90">@/</code> →{" "}
						<code className="font-mono text-[12px] text-white/90">./src</code>{" "}
						path alias in{" "}
						<code className="font-mono text-[12px] text-white/90">
							tsconfig.json
						</code>{" "}
						— this project does both.
					</p>
				</Section>

				<Section
					icon={<FolderTree className="h-4 w-4" aria-hidden />}
					title="Why components/ui matters"
				>
					<p className="text-sm leading-relaxed text-white/65">
						shadcn's CLI resolves component paths from{" "}
						<code className="font-mono text-[12px] text-white/90">
							components.json
						</code>
						. Its default install target is{" "}
						<code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-white/90">
							@/components/ui
						</code>
						. Putting the file there means:
					</p>
					<ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-white/65">
						<li>
							the registry's{" "}
							<code className="font-mono text-[12px] text-white/90">
								@/components/ui/&hellip;
							</code>{" "}
							imports resolve with no edits;
						</li>
						<li>
							future{" "}
							<code className="font-mono text-[12px] text-white/90">
								npx shadcn add
							</code>{" "}
							components land beside it and compose cleanly;
						</li>
						<li>
							UI primitives stay separate from app/feature code — the convention
							every shadcn project shares.
						</li>
					</ul>
				</Section>

				<Section
					icon={<Package className="h-4 w-4" aria-hidden />}
					title="Install the dependency"
				>
					<p className="text-sm leading-relaxed text-white/65">
						The component's one external dependency is the paper-design shader
						runtime:
					</p>
					<Cmd>npm i @paper-design/shaders-react</Cmd>
					<p className="text-sm leading-relaxed text-white/65">
						No context providers or extra hooks are required —{" "}
						<code className="font-mono text-[12px] text-white/90">Warp</code> is
						a self-contained WebGL component. Icons here come from{" "}
						<code className="font-mono text-[12px] text-white/90">
							lucide-react
						</code>
						.
					</p>
				</Section>

				<Section
					icon={<ListChecks className="h-4 w-4" aria-hidden />}
					title="Steps to integrate"
				>
					<ol className="flex list-decimal flex-col gap-1.5 pl-5 text-sm leading-relaxed text-white/65">
						<li>
							Copy{" "}
							<code className="font-mono text-[12px] text-white/90">
								background-shaders.tsx
							</code>{" "}
							and{" "}
							<code className="font-mono text-[12px] text-white/90">
								demo.tsx
							</code>{" "}
							into{" "}
							<code className="font-mono text-[12px] text-white/90">
								src/components/ui/
							</code>
							.
						</li>
						<li>Install the external dependency above.</li>
						<li>
							Render{" "}
							<code className="font-mono text-[12px] text-white/90">
								&lt;Wrapper /&gt;
							</code>{" "}
							at the app root so its{" "}
							<code className="font-mono text-[12px] text-white/90">
								fixed inset-0 -z-10
							</code>{" "}
							layer sits behind every route.
						</li>
						<li>
							Use{" "}
							<code className="font-mono text-[12px] text-white/90">
								lucide-react
							</code>{" "}
							for any icons/logos, and real Unsplash URLs for any imagery.
						</li>
					</ol>
				</Section>
			</div>

			{/* Questions to ask, answered */}
			<Section
				icon={<HelpCircle className="h-4 w-4" aria-hidden />}
				title="Questions to ask — answered"
			>
				<div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
					{QA.map((qa) => (
						<div key={qa.q} className="flex flex-col gap-1">
							<p className="text-sm font-medium text-white/85">{qa.q}</p>
							<p className="text-sm leading-relaxed text-white/60">{qa.a}</p>
						</div>
					))}
				</div>
			</Section>
		</Glass>
	);
}

const QA: Array<{ q: string; a: string }> = [
	{
		q: "What props will be passed?",
		a: "The verbatim Warp props — proportion, softness, distortion, swirl, swirlIterations, shape, shapeScale, scale, rotation, speed and a four-stop HSL colour array. Here they're lifted into a typed WarpConfig the deck drives live.",
	},
	{
		q: "Any state management requirements?",
		a: "None beyond local React state. The lab holds one WarpConfig in useState and threads it into the background component; no global store, context or provider is needed.",
	},
	{
		q: "Any required assets?",
		a: "The shader is fully procedural — no images or textures. Geist Sans/Mono are vendored locally as woff2, and icons come from lucide-react. Optional photography would use real Unsplash URLs.",
	},
	{
		q: "Expected responsive behaviour?",
		a: "The fixed inset-0 background fills any viewport at 100% × 100% and the canvas re-fits on resize; foreground content reflows above it (the deck docks on large screens and stacks on small ones).",
	},
	{
		q: "Best place to use it?",
		a: "As an app-wide animated background layer mounted once at the root — landing/hero shells, auth screens, marketing pages — anywhere a living backdrop should sit behind legible, glassy content.",
	},
];
