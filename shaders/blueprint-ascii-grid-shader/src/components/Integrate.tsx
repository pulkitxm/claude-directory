import { FolderTree, HelpCircle, PackageCheck, Terminal } from "lucide-react";
import type { ReactNode } from "react";

import { Reveal } from "@/components/Reveal";

/* A small monospace code surface — content is passed as a plain string so we
   never fight JSX escaping for braces / angle brackets / quotes. */
function Code({ label, children }: { label: string; children: string }) {
	return (
		<div className="min-w-0 max-w-full overflow-hidden rounded-lg border border-[var(--line-strong)] bg-[var(--abyss)]">
			<div className="flex items-center gap-2 border-b border-[var(--line)] bg-[var(--panel-solid)] px-4 py-2">
				<span className="h-2.5 w-2.5 rounded-full bg-[var(--line-strong)]" />
				<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
					{label}
				</span>
			</div>
			<pre className="overflow-x-auto px-4 py-4 text-[12.5px] leading-relaxed">
				<code className="font-mono text-cobalt-bright">{children}</code>
			</pre>
		</div>
	);
}

const REQS: { name: string; have: string; cmd: string }[] = [
	{
		name: "shadcn structure",
		have: "the @/ alias + src/components/ui",
		cmd: "npx shadcn@latest init",
	},
	{
		name: "Tailwind CSS",
		have: "utility classes + tokens",
		cmd: "npm i -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p",
	},
	{
		name: "TypeScript",
		have: "the .tsx component types",
		cmd: "npm i -D typescript @types/react @types/react-dom",
	},
];

const COPY = `# 1 · drop the component into the shadcn UI folder
src/
  components/
    ui/
      asd.tsx        # ← paste the brief's component here, verbatim`;

const MOUNT = `// 2 · mount it — it's a self-contained, full-screen background
import Component from "@/components/ui/asd";

export default function Page() {
  return (
    <main>
      <Component />        {/* fixed inset-0 WebGL2 shader */}
      {/* ...your hero / content sits on top */}
    </main>
  );
}`;

const PROPS = `// The brief's asd.tsx takes NO props — it's a fixed full-screen field.
// This repo also ships a parametric variant for live control:
import GridShader from "@/components/ui/grid-shader";

<GridShader
  params={{ asciiAmt: 0.4, gridScale: 24 }}  // Partial<GridParams>
  onTelemetry={(t) => setHud(t)}             // iTime / fps / res / mouse
  fixed={true}                               // false → fills its parent
/>;`;

const QA: { q: string; a: ReactNode }[] = [
	{
		q: "What data / props does it take?",
		a: (
			<>
				None. The brief's <code className="code-chip">asd.tsx</code> is
				self-contained — no required props, no data. The parametric{" "}
				<code className="code-chip">grid-shader.tsx</code> adds optional{" "}
				<code className="code-chip">params</code> and an{" "}
				<code className="code-chip">onTelemetry</code> callback.
			</>
		),
	},
	{
		q: "State management?",
		a: (
			<>
				All internal. It owns its{" "}
				<code className="code-chip">requestAnimationFrame</code> loop, the
				WebGL2 context, and a <code className="code-chip">ResizeObserver</code>,
				and cleans every one up on unmount. Nothing to wire into a store.
			</>
		),
	},
	{
		q: "Required assets?",
		a: (
			<>
				Zero. The whole image is generated in GLSL — no photos, icons, fonts, or
				models ship with the component. (This showcase's chrome uses{" "}
				<code className="code-chip">lucide-react</code> + locally vendored
				fonts.)
			</>
		),
	},
	{
		q: "Responsive behaviour?",
		a: (
			<>
				It fills its positioned parent and tracks size via{" "}
				<code className="code-chip">ResizeObserver</code>, with the device-pixel
				ratio clamped to 1–2 so it stays crisp on retina without melting the
				GPU.
			</>
		),
	},
	{
		q: "Where should it live?",
		a: (
			<>
				As a fixed, negative-<code className="code-chip">z-index</code>{" "}
				background behind a hero or landing page — exactly like this one. For a
				card or panel, render the parametric variant with{" "}
				<code className="code-chip">fixed={"{false}"}</code>.
			</>
		),
	},
];

export function Integrate() {
	return (
		<section
			id="integrate"
			className="relative border-t border-[var(--line)] px-5 py-24 sm:px-8"
		>
			<div className="mx-auto max-w-6xl">
				<Reveal className="mb-12 max-w-2xl">
					<span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
						04 / integrate
					</span>
					<h2 className="mt-3 font-display text-[clamp(1.9rem,4.5vw,3.1rem)] font-bold leading-[0.98] tracking-[-0.02em] text-ink">
						Copy one file. Mount one component.
					</h2>
					<p className="mt-4 font-body text-ink-dim">
						It's a drop-in for any{" "}
						<span className="text-cobalt-bright">
							shadcn · Tailwind · TypeScript
						</span>{" "}
						project. If yours is missing a piece, the commands below add it.
					</p>
				</Reveal>

				{/* Requirements */}
				<Reveal>
					<div className="grid gap-px overflow-hidden rounded-xl border border-[var(--line-strong)] bg-[var(--line)] md:grid-cols-3">
						{REQS.map((req) => (
							<div
								key={req.name}
								className="min-w-0 bg-[var(--panel-solid)] p-6"
							>
								<div className="flex items-center gap-2">
									<PackageCheck className="h-4 w-4 text-cyan" />
									<h3 className="font-display text-base font-bold text-ink">
										{req.name}
									</h3>
								</div>
								<p className="mt-2 font-body text-sm text-ink-dim">
									Gives you {req.have}.
								</p>
								<pre className="mt-4 overflow-x-auto rounded-md border border-[var(--line)] bg-[var(--abyss)] px-3 py-2">
									<code className="font-mono text-[11px] leading-relaxed text-cobalt-bright">
										{req.cmd}
									</code>
								</pre>
							</div>
						))}
					</div>
				</Reveal>

				{/* Why components/ui */}
				<Reveal delay={60}>
					<div className="mt-5 flex flex-col gap-4 rounded-xl border border-[var(--line-strong)] bg-[var(--panel)] p-6 backdrop-blur sm:flex-row sm:items-start sm:p-7">
						<span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[var(--line-strong)] bg-[var(--navy)] text-cobalt-bright">
							<FolderTree className="h-5 w-5" />
						</span>
						<div>
							<h3 className="font-display text-lg font-bold text-ink">
								Why <code className="code-chip">components/ui</code>?
							</h3>
							<p className="mt-2 max-w-3xl font-body text-sm leading-relaxed text-ink-dim">
								shadcn maps the <code className="code-chip">ui</code> alias to{" "}
								<code className="code-chip">@/components/ui</code> in{" "}
								<code className="code-chip">components.json</code>. Dropping the
								file there means the brief's import —{" "}
								<code className="code-chip">
									{'import Component from "@/components/ui/asd"'}
								</code>{" "}
								— resolves with no path edits, the CLI can update or add
								siblings later without clobbering your own components, and every
								generated UI primitive lives in one predictable, reviewable
								place. If that folder doesn't exist yet, create it: the alias is
								convention, and breaking it means rewriting every example import
								by hand.
							</p>
						</div>
					</div>
				</Reveal>

				{/* Steps */}
				<div className="mt-5 grid gap-5 lg:grid-cols-2">
					<Reveal>
						<div className="flex h-full flex-col gap-4">
							<div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink">
								<FolderTree className="h-4 w-4 text-cobalt-bright" />
								Place it
							</div>
							<Code label="project structure">{COPY}</Code>
						</div>
					</Reveal>
					<Reveal delay={80}>
						<div className="flex h-full flex-col gap-4">
							<div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink">
								<Terminal className="h-4 w-4 text-cobalt-bright" />
								Mount it
							</div>
							<Code label="app/page.tsx">{MOUNT}</Code>
						</div>
					</Reveal>
				</div>

				{/* Props / API */}
				<Reveal delay={60}>
					<div className="mt-5">
						<div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-ink">
							<PackageCheck className="h-4 w-4 text-cobalt-bright" />
							Props &amp; uniforms
						</div>
						<Code label="api">{PROPS}</Code>
					</div>
				</Reveal>

				{/* Questions answered */}
				<Reveal delay={60}>
					<div className="mt-12">
						<div className="mb-5 flex items-center gap-2">
							<HelpCircle className="h-4 w-4 text-cyan" />
							<h3 className="font-display text-lg font-bold text-ink">
								Questions worth asking first
							</h3>
						</div>
						<div className="grid gap-px overflow-hidden rounded-xl border border-[var(--line-strong)] bg-[var(--line)] sm:grid-cols-2">
							{QA.map((item) => (
								<div key={item.q} className="bg-[var(--panel-solid)] p-6">
									<h4 className="font-mono text-sm font-bold text-cobalt-bright">
										{item.q}
									</h4>
									<p className="mt-2 font-body text-sm leading-relaxed text-ink-dim">
										{item.a}
									</p>
								</div>
							))}
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
