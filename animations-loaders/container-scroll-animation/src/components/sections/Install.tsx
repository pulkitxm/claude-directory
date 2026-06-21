import {
	Boxes,
	FileCode2,
	FolderTree,
	Package,
	Sparkles,
	Terminal,
} from "lucide-react";

const steps = [
	{
		n: "1",
		icon: Terminal,
		title: "Scaffold a shadcn-ready app",
		body: "If the codebase is not already TypeScript + Tailwind + shadcn, initialise it. The CLI wires up tailwind.config, global CSS tokens, the @/ path alias and components.json.",
		code: "npx create-next-app@latest .\nnpx shadcn@latest init",
	},
	{
		n: "2",
		icon: Package,
		title: "Install the one dependency",
		body: "The component only needs framer-motion for useScroll / useTransform. lucide-react is optional, for the icons used inside the demo screens.",
		code: "npm i framer-motion\nnpm i lucide-react   # optional, for demo icons",
	},
	{
		n: "3",
		icon: FileCode2,
		title: "Drop the file into components/ui",
		body: "Paste container-scroll-animation.tsx into components/ui/. Import it with the @/ alias exactly as written — no other wiring required.",
		code: 'import { ContainerScroll }\n  from "@/components/ui/container-scroll-animation";',
	},
];

function CodeBlock({ code }: { code: string }) {
	return (
		<pre className="mt-3 overflow-x-auto rounded-lg border border-white/[0.07] bg-[#08090d] p-3 font-mono text-[12px] leading-relaxed text-white/75">
			{code.split("\n").map((line, i) => (
				<div key={i} className="whitespace-pre">
					<span className="mr-3 select-none text-white/20">
						{line.startsWith("npm") ||
						line.startsWith("npx") ||
						line.startsWith("pnpm")
							? "$"
							: " "}
					</span>
					{line}
				</div>
			))}
		</pre>
	);
}

export function Install() {
	return (
		<section
			id="install"
			className="relative mx-auto max-w-5xl scroll-mt-24 px-6 py-24"
		>
			<div className="text-center">
				<p className="font-mono text-[11px] uppercase tracking-[0.28em] text-iris/80">
					Integration
				</p>
				<h2 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">
					Three steps to ship it
				</h2>
				<p className="mx-auto mt-3 max-w-xl text-pretty text-[15px] leading-relaxed text-white/55">
					Built for a shadcn project structure: TypeScript, Tailwind CSS, and
					components resolved through the{" "}
					<code className="font-mono text-iris-bright">@/</code> alias.
				</p>
			</div>

			<div className="mt-10 grid gap-4 md:grid-cols-3">
				{steps.map((s) => (
					<div
						key={s.n}
						className="flex min-w-0 flex-col rounded-2xl border border-white/[0.08] bg-ink-soft/60 p-5"
					>
						<div className="flex items-center gap-3">
							<span className="grid h-9 w-9 place-items-center rounded-xl bg-iris/15 text-iris-bright">
								<s.icon className="h-4 w-4" />
							</span>
							<span className="font-mono text-xs text-white/35">
								STEP {s.n}
							</span>
						</div>
						<h3 className="mt-4 font-display text-base font-semibold text-white">
							{s.title}
						</h3>
						<p className="mt-1.5 text-[13px] leading-relaxed text-white/50">
							{s.body}
						</p>
						<CodeBlock code={s.code} />
					</div>
				))}
			</div>

			{/* Why components/ui callout */}
			<div className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_1fr]">
				<div className="rounded-2xl border border-iris/20 bg-iris/[0.06] p-5">
					<div className="flex items-center gap-2 text-iris-bright">
						<FolderTree className="h-4 w-4" />
						<h3 className="font-display text-base font-semibold">
							Why the folder must be{" "}
							<code className="font-mono">/components/ui</code>
						</h3>
					</div>
					<p className="mt-2 text-[13px] leading-relaxed text-white/60">
						shadcn’s{" "}
						<code className="font-mono text-white/80">components.json</code>{" "}
						pins a <span className="text-white/80">ui</span> alias to{" "}
						<code className="font-mono text-white/80">@/components/ui</code>.
						Every generated primitive, and the import in the snippet above,
						resolves against that exact path. If the file lands anywhere else
						the{" "}
						<code className="font-mono text-iris-bright">
							@/components/ui/container-scroll-animation
						</code>{" "}
						import breaks and future{" "}
						<code className="font-mono text-white/80">shadcn add</code> commands
						write to a directory yours doesn’t match. Create{" "}
						<code className="font-mono text-white/80">/components/ui</code>{" "}
						first so the alias, the CLI, and the import all agree.
					</p>
				</div>

				<div className="rounded-2xl border border-white/[0.08] bg-ink-soft/60 p-5 font-mono text-[12px] leading-relaxed text-white/55">
					<p className="mb-2 flex items-center gap-1.5 text-white/40">
						<Boxes className="h-3.5 w-3.5" /> resolved layout
					</p>
					<div className="space-y-0.5">
						<p>src/</p>
						<p className="pl-3">components/</p>
						<p className="pl-6 text-iris-bright">ui/</p>
						<p className="pl-9 text-white/80">container-scroll-animation.tsx</p>
						<p className="pl-3 text-white/40">lib/utils.ts → cn()</p>
						<p className="pl-3 text-white/40">index.css → @tailwind base</p>
						<p className="text-white/40">components.json → aliases.ui</p>
						<p className="text-white/40">tailwind.config.js · tsconfig (@/*)</p>
					</div>
				</div>
			</div>

			{/* footnote: live-UI vs static screenshot */}
			<div className="mt-5 flex items-start gap-3 rounded-2xl border border-white/[0.08] bg-ink-soft/40 p-5">
				<span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ember/15 text-ember">
					<Sparkles className="h-4 w-4" />
				</span>
				<p className="text-[13px] leading-relaxed text-white/55">
					<span className="font-medium text-white/80">Assets note.</span> The
					original demo nested a single hosted screenshot via{" "}
					<code className="font-mono text-white/75">next/image</code>. This
					build keeps the integration fully offline by rendering three real,
					self-contained product UIs as the card{" "}
					<code className="font-mono text-white/75">children</code> instead —
					but you can pass any node: an{" "}
					<code className="font-mono text-white/75">{"<img>"}</code>, a video,
					or a live component.
				</p>
			</div>
		</section>
	);
}
