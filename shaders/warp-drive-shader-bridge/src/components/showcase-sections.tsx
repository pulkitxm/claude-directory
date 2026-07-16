import {
	ArrowRight,
	Boxes,
	Cpu,
	FolderTree,
	Gauge,
	MousePointer2,
	Terminal,
} from "lucide-react";

/* ----------------------------------------------------------------------------
 * Shared chrome
 * ------------------------------------------------------------------------- */

function SectionEyebrow({ index, label }: { index: string; label: string }) {
	return (
		<div className="flex items-center gap-3">
			<span className="font-mono text-[11px] tabular-nums text-helm">
				{index}
			</span>
			<span className="h-px w-8 bg-helm/40" />
			<span className="font-mono text-[10px] uppercase tracking-[0.35em] text-haze">
				{label}
			</span>
		</div>
	);
}

function CodeBlock({ children }: { children: React.ReactNode }) {
	return (
		<pre className="min-w-0 max-w-full overflow-x-auto rounded-md border border-helm/15 bg-void-900/80 p-4 font-mono text-[12px] leading-relaxed text-frost/90 backdrop-blur-sm">
			{children}
		</pre>
	);
}

function Token({ children, c }: { children: React.ReactNode; c: string }) {
	return <span className={c}>{children}</span>;
}

/* ----------------------------------------------------------------------------
 * 01 — Bridge brief (what this component is + props it takes)
 * ------------------------------------------------------------------------- */

export function BriefSection() {
	return (
		<section
			id="integrate"
			className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-10"
		>
			<SectionEyebrow index="01" label="Mission Brief" />
			<h2 className="mt-6 max-w-3xl font-display text-3xl font-bold leading-tight text-frost sm:text-5xl">
				One file in <span className="text-helm">@/components/ui</span>, and the
				whole viewport jumps to warp.
			</h2>
			<p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-frost/70">
				<code className="rounded bg-void-700 px-1.5 py-0.5 font-mono text-[13px] text-warp">
					warp-drive-shader
				</code>{" "}
				mounts a fixed, pointer-steered WebGL tunnel behind your page — an
				orthographic full-screen quad running the brief's exact fragment shader.
				It ships as a single drop-in module: no provider, no global store, no
				required props. Move the pointer to steer the vanishing point; the
				RGB-split filaments are the shader's own red, green and blue tunnel
				layers, offset by one hundredth of a unit.
			</p>

			<div className="mt-12 grid gap-4 sm:grid-cols-3">
				{[
					{
						icon: Boxes,
						title: "Zero-config drop-in",
						body: "Self-contained. <WarpDriveShader /> renders the verbatim brief unchanged; every added prop is optional.",
					},
					{
						icon: MousePointer2,
						title: "Pointer-steered helm",
						body: "iMouse offsets the tunnel center on every mousemove, flipping Y so the origin sits bottom-left.",
					},
					{
						icon: Cpu,
						title: "GPU-only loop",
						body: "setAnimationLoop drives iTime each frame; disposal tears the canvas, material and geometry down on unmount.",
					},
				].map((c) => (
					<div
						key={c.title}
						className="rounded-md border border-helm/12 bg-void-800/50 p-5 backdrop-blur-sm transition-colors hover:border-helm/30"
					>
						<c.icon className="h-5 w-5 text-helm" strokeWidth={1.5} />
						<h3 className="mt-3 font-display text-sm font-semibold tracking-wide text-frost">
							{c.title}
						</h3>
						<p className="mt-2 text-[13px] leading-relaxed text-frost/60">
							{c.body}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}

/* ----------------------------------------------------------------------------
 * 02 — Project setup (shadcn / Tailwind / TypeScript) + why /components/ui
 * ------------------------------------------------------------------------- */

export function SetupSection() {
	return (
		<section className="relative z-10 border-t border-helm/10 bg-void-900/40">
			<div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
				<SectionEyebrow index="02" label="Pre-flight Setup" />
				<h2 className="mt-6 max-w-3xl font-display text-2xl font-bold leading-tight text-frost sm:text-4xl">
					Stand up a shadcn · Tailwind · TypeScript hull
				</h2>
				<p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-frost/70">
					The warp drive expects a TypeScript project with Tailwind and the
					shadcn conventions in place. If your codebase already has them, skip
					to step three — otherwise scaffold from scratch:
				</p>

				<div className="mt-10 grid min-w-0 gap-6 lg:grid-cols-2">
					<div className="min-w-0 space-y-6">
						<div>
							<div className="mb-2 flex items-center gap-2">
								<Terminal className="h-4 w-4 text-helm" strokeWidth={1.5} />
								<span className="font-mono text-[11px] uppercase tracking-[0.25em] text-haze">
									1 · Vite + React + TypeScript
								</span>
							</div>
							<CodeBlock>
								<Token c="text-haze"># new TypeScript project</Token>
								{"\n"}npm create vite@latest my-app{" "}
								<Token c="text-warp">--</Token>{" "}
								<Token c="text-warp">--template</Token> react-ts{"\n"}cd my-app
								&& npm install
							</CodeBlock>
						</div>

						<div>
							<div className="mb-2 flex items-center gap-2">
								<Terminal className="h-4 w-4 text-helm" strokeWidth={1.5} />
								<span className="font-mono text-[11px] uppercase tracking-[0.25em] text-haze">
									2 · Tailwind + shadcn/ui
								</span>
							</div>
							<CodeBlock>
								npm install <Token c="text-warp">-D</Token> tailwindcss postcss
								autoprefixer
								{"\n"}npx tailwindcss init <Token c="text-warp">-p</Token>
								{"\n"}
								{"\n"}
								<Token c="text-haze">
									# wire up shadcn (writes components.json)
								</Token>
								{"\n"}npx shadcn@latest init
							</CodeBlock>
						</div>

						<div>
							<div className="mb-2 flex items-center gap-2">
								<Terminal className="h-4 w-4 text-helm" strokeWidth={1.5} />
								<span className="font-mono text-[11px] uppercase tracking-[0.25em] text-haze">
									3 · The one runtime dependency
								</span>
							</div>
							<CodeBlock>
								npm install three{"\n"}npm install{" "}
								<Token c="text-warp">-D</Token> @types/three
							</CodeBlock>
						</div>
					</div>

					{/* Why /components/ui */}
					<div className="min-w-0 rounded-md border border-helm/15 bg-void-800/50 p-6 backdrop-blur-sm">
						<div className="flex items-center gap-2">
							<FolderTree className="h-5 w-5 text-warp" strokeWidth={1.5} />
							<h3 className="font-display text-base font-semibold text-frost">
								Why <span className="text-warp">/components/ui</span>?
							</h3>
						</div>
						<p className="mt-3 text-[13.5px] leading-relaxed text-frost/70">
							shadcn resolves the <code className="font-mono text-helm">@</code>{" "}
							alias to your source root and treats{" "}
							<code className="font-mono text-helm">components/ui</code> as the
							home for copy-in primitives. Because the brief imports{" "}
							<code className="break-all font-mono text-helm">
								@/components/ui/warp-drive-shader
							</code>{" "}
							literally, that exact path has to exist — otherwise the import
							resolves to nothing.
						</p>
						<p className="mt-3 text-[13.5px] leading-relaxed text-frost/70">
							Keeping it there also pays off: the CLI knows where to write,
							every other shadcn primitive lands beside it, and a future{" "}
							<code className="font-mono text-helm">npx shadcn@latest add</code>{" "}
							won't fight your layout. If your{" "}
							<code className="font-mono text-helm">components.json</code>{" "}
							points <code className="font-mono text-helm">ui</code> elsewhere,
							create the folder and align the alias before pasting.
						</p>

						<div className="mt-5 rounded border border-helm/15 bg-void-900/70 p-4 font-mono text-[12px] leading-relaxed">
							<div className="text-haze">src/</div>
							<div className="pl-3 text-frost/80">├─ components/</div>
							<div className="pl-6 text-frost/80">│ └─ ui/</div>
							<div className="pl-9 text-warp">
								│ &nbsp;&nbsp;└─ warp-drive-shader.tsx
							</div>
							<div className="pl-3 text-frost/80">├─ lib/</div>
							<div className="pl-6 text-frost/60">│ └─ utils.ts</div>
							<div className="pl-3 text-frost/80">└─ demo.tsx</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ----------------------------------------------------------------------------
 * 03 — Drop it in (verbatim usage)
 * ------------------------------------------------------------------------- */

export function UsageSection() {
	return (
		<section className="relative z-10 mx-auto max-w-6xl px-6 py-24 sm:px-10">
			<SectionEyebrow index="03" label="Engage" />
			<h2 className="mt-6 font-display text-2xl font-bold leading-tight text-frost sm:text-4xl">
				Paste the component, then engage
			</h2>
			<p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-frost/70">
				Drop <code className="font-mono text-helm">warp-drive-shader.tsx</code>{" "}
				into <code className="font-mono text-helm">components/ui</code> and
				render it behind your content. This page mounts the exact{" "}
				<code className="font-mono">DemoOne</code> from the brief — the helm
				gauge and telemetry above are an optional overlay reading the same loop.
			</p>

			<div className="mt-10 grid gap-6 lg:grid-cols-2">
				<CodeBlock>
					<Token c="text-haze">{"// demo.tsx — the brief, verbatim"}</Token>
					{"\n"}
					<Token c="text-alert">import</Token> WarpDriveShader{" "}
					<Token c="text-alert">from</Token>{" "}
					<Token c="text-warp">"@/components/ui/warp-drive-shader"</Token>;
					{"\n"}
					{"\n"}
					<Token c="text-alert">export default function</Token>{" "}
					<Token c="text-helm">DemoOne</Token>() {"{"}
					{"\n"} <Token c="text-alert">return</Token> ({"\n"} {"<"}
					<Token c="text-helm">div</Token> className=
					<Token c="text-warp">"app-container"</Token>
					{">"}
					{"\n"} &nbsp;&nbsp;{"<"}
					<Token c="text-helm">WarpDriveShader</Token> {"/>"}
					{"\n"} &nbsp;&nbsp;{"<"}
					<Token c="text-helm">div</Token> className=
					<Token c="text-warp">"overlay-content"</Token>
					{">"}
					{"\n"} &nbsp;&nbsp;&nbsp;&nbsp;{"<"}
					<Token c="text-helm">h1</Token>
					{">"}Warp Drive{"</"}
					<Token c="text-helm">h1</Token>
					{">"}
					{"\n"} &nbsp;&nbsp;&nbsp;&nbsp;{"<"}
					<Token c="text-helm">p</Token>
					{">"}An Interactive WebGL Shader{"</"}
					<Token c="text-helm">p</Token>
					{">"}
					{"\n"} &nbsp;&nbsp;{"</"}
					<Token c="text-helm">div</Token>
					{">"}
					{"\n"} {"</"}
					<Token c="text-helm">div</Token>
					{">"}
					{"\n"} );{"\n"}
					{"}"}
				</CodeBlock>

				<CodeBlock>
					<Token c="text-haze">{"// optional: read the live loop"}</Token>
					{"\n"}
					{"<"}
					<Token c="text-helm">WarpDriveShader</Token>
					{"\n"} &nbsp;warpSpeed={"{"}
					<Token c="text-warp">2.4</Token>
					{"}"}
					{"\n"} &nbsp;onFrame={"{"}(f) {"=>"} {"{"}
					{"\n"} &nbsp;&nbsp;&nbsp;
					<Token c="text-haze">{"// f.time, f.mouse,"}</Token>
					{"\n"} &nbsp;&nbsp;&nbsp;
					<Token c="text-haze">{"// f.size, f.fps"}</Token>
					{"\n"} &nbsp;&nbsp;&nbsp;setHud(f);
					{"\n"} &nbsp;{"}"}
					{"}"}
					{"\n"}
					{"/>"}
					{"\n"}
					{"\n"}
					<Token c="text-haze">{"// bare brief usage still works:"}</Token>
					{"\n"}
					{"<"}
					<Token c="text-helm">WarpDriveShader</Token> {"/>"}
				</CodeBlock>
			</div>
		</section>
	);
}

/* ----------------------------------------------------------------------------
 * 04 — Props & uniforms API
 * ------------------------------------------------------------------------- */

const PROPS = [
	{
		name: "warpSpeed?",
		type: "number",
		def: "1",
		body: "Multiplies the shader clock. 1 reproduces the brief's iTime · 0.5 cadence; 0 holds the field still.",
	},
	{
		name: "onFrame?",
		type: "(f: WarpDriveFrame) => void",
		def: "—",
		body: "Per-frame telemetry, throttled to ~20 Hz: { time, mouse, size, fps }. Lets a host render a HUD without re-running the shader.",
	},
	{
		name: "className?",
		type: "string",
		def: '"shader-container"',
		body: "Override the container class to re-layout the canvas (e.g. inset it inside a card instead of fixed full-screen).",
	},
	{
		name: "style?",
		type: "CSSProperties",
		def: "fixed · 100vw/vh · z-index -1",
		body: "Replace the default fixed full-bleed styling entirely when you need the tunnel contained.",
	},
];

const UNIFORMS = [
	{
		name: "iTime",
		type: "float",
		body: "Accumulated warp time, scaled by warpSpeed.",
	},
	{
		name: "iResolution",
		type: "vec2",
		body: "Drawing-buffer size; keeps the tunnel square on resize.",
	},
	{
		name: "iMouse",
		type: "vec2",
		body: "Steered vanishing point, Y-flipped to bottom-left origin.",
	},
];

export function ApiSection() {
	return (
		<section className="relative z-10 border-t border-helm/10 bg-void-900/40">
			<div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
				<SectionEyebrow index="04" label="Console Reference" />
				<h2 className="mt-6 font-display text-2xl font-bold leading-tight text-frost sm:text-4xl">
					Props &amp; shader uniforms
				</h2>

				<div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
					{/* Props table */}
					<div>
						<div className="mb-3 flex items-center gap-2">
							<Gauge className="h-4 w-4 text-helm" strokeWidth={1.5} />
							<span className="font-mono text-[10px] uppercase tracking-[0.3em] text-haze">
								Component props
							</span>
						</div>
						<div className="overflow-hidden rounded-md border border-helm/15">
							{PROPS.map((p, i) => (
								<div
									key={p.name}
									className={`grid grid-cols-1 gap-1 px-4 py-4 sm:grid-cols-[160px_1fr] ${
										i % 2 ? "bg-void-800/40" : "bg-void-900/40"
									}`}
								>
									<div className="flex flex-col gap-1">
										<code className="font-mono text-[12.5px] text-warp">
											{p.name}
										</code>
										<code className="font-mono text-[10.5px] text-helm/80">
											{p.type}
										</code>
										<span className="font-mono text-[10px] text-haze">
											default: {p.def}
										</span>
									</div>
									<p className="text-[13px] leading-relaxed text-frost/65">
										{p.body}
									</p>
								</div>
							))}
						</div>
					</div>

					{/* Uniforms */}
					<div>
						<div className="mb-3 flex items-center gap-2">
							<Cpu className="h-4 w-4 text-warp" strokeWidth={1.5} />
							<span className="font-mono text-[10px] uppercase tracking-[0.3em] text-haze">
								GLSL uniforms
							</span>
						</div>
						<div className="space-y-3">
							{UNIFORMS.map((u) => (
								<div
									key={u.name}
									className="rounded-md border border-helm/15 bg-void-800/40 p-4"
								>
									<div className="flex items-baseline justify-between">
										<code className="font-mono text-[13px] text-helm">
											{u.name}
										</code>
										<code className="font-mono text-[10px] text-haze">
											{u.type}
										</code>
									</div>
									<p className="mt-2 text-[12.5px] leading-relaxed text-frost/60">
										{u.body}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

/* ----------------------------------------------------------------------------
 * Footer
 * ------------------------------------------------------------------------- */

export function ConsoleFooter() {
	return (
		<footer className="relative z-10 border-t border-helm/10 bg-void-900/60">
			<div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center sm:px-10">
				<div>
					<div className="flex items-center gap-2">
						<span className="h-2 w-2 rounded-full border border-helm" />
						<span className="font-display text-sm font-bold tracking-[0.2em] text-frost">
							WARP&nbsp;DRIVE
						</span>
					</div>
					<p className="mt-2 max-w-md text-[12.5px] leading-relaxed text-frost/50">
						A shadcn/ui-ready WebGL tunnel shader. Three.js orthographic quad,
						one fragment program, fully offline — fonts vendored, no CDN at
						runtime.
					</p>
				</div>
				<a
					href="#top"
					className="group inline-flex items-center gap-2 rounded-md border border-helm/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-helm transition-colors hover:bg-helm/10"
				>
					Return to bridge
					<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
				</a>
			</div>
		</footer>
	);
}
