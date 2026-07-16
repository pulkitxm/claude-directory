import {
	Boxes,
	Code2,
	Layers,
	MousePointer2,
	Palette,
	Wand2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------------------
   Reusable scroll-reveal wrapper.
--------------------------------------------------------------------------- */
function Reveal({
	children,
	className,
	delay = 0,
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}) {
	const ref = useRef<HTMLDivElement | null>(null);
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setShown(true);
					io.disconnect();
				}
			},
			{ threshold: 0.18 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			className={cn("reveal", shown && "is-visible", className)}
			style={{ transitionDelay: `${delay}ms` }}
		>
			{children}
		</div>
	);
}

/* ---------------------------------------------------------------------------
   Section heading kit.
--------------------------------------------------------------------------- */
function Eyebrow({ children }: { children: React.ReactNode }) {
	return (
		<span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.32em] text-cobalt-300">
			<span className="h-px w-6 bg-cobalt-300/50" />
			{children}
		</span>
	);
}

/* ---------------------------------------------------------------------------
   1. Anatomy of the shader — what the canvas is actually doing.
--------------------------------------------------------------------------- */
const ANATOMY = [
	{
		icon: Layers,
		title: "Instanced wave bars",
		body: "Up to 256 tapered bars are drawn in a single InstancedMesh. Two GSAP-keyframed sine waves (gain · frequency · wavelength) are blended per-instance in the vertex shader and skewed 23.4° for that leaning, audio-meter cadence.",
	},
	{
		icon: Wand2,
		title: "Bloom + film grain",
		body: "An EffectComposer stacks a RenderPass, an UnrealBloomPass that lets the additive cobalt filaments overexpose, and a custom film-grain ShaderPass so the dark field shimmers instead of banding.",
	},
	{
		icon: MousePointer2,
		title: "Cursor-reactive glow",
		body: "Pointer speed accumulates into a per-bar aGlow attribute with eased decay, while a clip-space proximity term pulses bars near the cursor — drag across the field and it lights up under your hand.",
	},
];

function AnatomySection() {
	return (
		<section className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
			<Reveal>
				<Eyebrow>Anatomy</Eyebrow>
				<h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
					A WebGL wavefield that listens to the cursor
				</h2>
				<p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist sm:text-base">
					The hero background is a single self-contained component — three.js
					for the render graph, GSAP for the timeline and per-frame ticker. No
					images, no CDN: just maths on the GPU.
				</p>
			</Reveal>

			<div className="mt-14 grid gap-5 md:grid-cols-3">
				{ANATOMY.map((item, i) => (
					<Reveal key={item.title} delay={i * 90}>
						<article className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-cobalt-300/40 hover:bg-cobalt/[0.06]">
							<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cobalt/15 text-cobalt-300 ring-1 ring-inset ring-cobalt-300/25">
								<item.icon className="h-5 w-5" strokeWidth={1.75} />
							</div>
							<h3 className="mt-5 font-display text-lg font-semibold text-white">
								{item.title}
							</h3>
							<p className="mt-2 text-sm leading-relaxed text-mist">
								{item.body}
							</p>
						</article>
					</Reveal>
				))}
			</div>
		</section>
	);
}

/* ---------------------------------------------------------------------------
   2. Integration story — shadcn / Tailwind / TypeScript, components/ui.
--------------------------------------------------------------------------- */
const INSTALL_SNIPPET = `# 1 — dependencies the component imports
npm i three gsap
npm i -D @types/three

# 2 — drop the files into the shadcn components/ui folder
src/components/ui/ai-input-hero.tsx   # the <HeroWave /> shader hero
src/components/ui/mini-navbar.tsx     # its <Navbar /> dependency`;

const USAGE_SNIPPET = `import { HeroWave } from "@/components/ui/ai-input-hero";

export default function Page() {
  return (
    <HeroWave
      title="Build with AI."
      subtitle="The AI Fullstack Engineer."
      onPromptSubmit={(value) => console.log(value)}
    />
  );
}`;

function CodeBlock({ label, code }: { label: string; code: string }) {
	return (
		<div className="code-shell min-w-0 max-w-full overflow-hidden rounded-2xl">
			<div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
				<span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
				<span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
				<span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
				<span className="ml-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mist/70">
					{label}
				</span>
			</div>
			<pre className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-cobalt-300/90">
				<code>{code}</code>
			</pre>
		</div>
	);
}

function IntegrationSection() {
	return (
		<section
			id="integrate"
			className="relative border-t border-white/5 bg-ink-900"
		>
			<div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
				<Reveal>
					<Eyebrow>Integration</Eyebrow>
					<h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
						Built for a shadcn · Tailwind · TypeScript project
					</h2>
					<p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist sm:text-base">
						shadcn components are owned source, not an npm black box — so they
						live in your repo under{" "}
						<code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-cobalt-300">
							components/ui
						</code>
						. That convention is what the{" "}
						<code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-cobalt-300">
							@/
						</code>{" "}
						alias resolves and what the CLI writes into. Keep the folder and the
						verbatim imports just work.
					</p>
				</Reveal>

				<div className="mt-12 grid gap-5 lg:grid-cols-2">
					<Reveal className="min-w-0">
						<CodeBlock label="install.sh" code={INSTALL_SNIPPET} />
					</Reveal>
					<Reveal className="min-w-0" delay={90}>
						<CodeBlock label="page.tsx" code={USAGE_SNIPPET} />
					</Reveal>
				</div>

				<Reveal delay={120}>
					<div className="mt-8 flex items-start gap-3 rounded-2xl border border-cobalt-300/20 bg-cobalt/[0.05] p-5">
						<Boxes
							className="mt-0.5 h-5 w-5 shrink-0 text-cobalt-300"
							strokeWidth={1.75}
						/>
						<p className="text-sm leading-relaxed text-mist">
							<span className="font-medium text-white">
								Why{" "}
								<code className="font-mono text-cobalt-300">components/ui</code>
								?
							</span>{" "}
							The alias in{" "}
							<code className="font-mono text-cobalt-300">tsconfig</code> and{" "}
							<code className="font-mono text-cobalt-300">vite.config.ts</code>{" "}
							maps <code className="font-mono text-cobalt-300">@/*</code> to{" "}
							<code className="font-mono text-cobalt-300">./src/*</code>.
							Because{" "}
							<code className="font-mono text-cobalt-300">
								ai-input-hero.tsx
							</code>{" "}
							imports{" "}
							<code className="font-mono text-cobalt-300">
								@/components/ui/mini-navbar
							</code>{" "}
							by path, both files must sit there together — exactly how this
							project ships them.
						</p>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

/* ---------------------------------------------------------------------------
   3. Props / API table.
--------------------------------------------------------------------------- */
const PROPS: Array<{ name: string; type: string; def: string; note: string }> =
	[
		{
			name: "title",
			type: "string",
			def: '"Build with AI."',
			note: "Headline above the prompt box.",
		},
		{
			name: "subtitle",
			type: "string",
			def: '"The AI Fullstack…"',
			note: "Supporting line under the title.",
		},
		{
			name: "buttonText",
			type: "string",
			def: '"Generate"',
			note: "Accessible label on the submit button.",
		},
		{
			name: "extendLeftPx",
			type: "number",
			def: "320",
			note: "How far the bars run off the left edge.",
		},
		{
			name: "onPromptSubmit",
			type: "(value: string) => void",
			def: "—",
			note: "Fires with the textarea value on submit.",
		},
		{
			name: "className / style",
			type: "string / CSSProperties",
			def: "—",
			note: "Passed straight to the root <section>.",
		},
	];

function PropsSection() {
	return (
		<section className="relative border-t border-white/5">
			<div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
				<Reveal>
					<Eyebrow>API</Eyebrow>
					<h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
						<code className="font-mono text-cobalt-300">HeroWave</code> props
					</h2>
				</Reveal>

				<Reveal delay={80}>
					<div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
						<table className="w-full border-collapse text-left text-sm">
							<thead className="bg-white/[0.03] font-mono text-[11px] uppercase tracking-[0.18em] text-mist/70">
								<tr>
									<th className="px-5 py-3 font-medium">Prop</th>
									<th className="px-5 py-3 font-medium">Type</th>
									<th className="hidden px-5 py-3 font-medium sm:table-cell">
										Default
									</th>
									<th className="hidden px-5 py-3 font-medium md:table-cell">
										Description
									</th>
								</tr>
							</thead>
							<tbody>
								{PROPS.map((p, i) => (
									<tr
										key={p.name}
										className={cn(
											"border-t border-white/5 align-top",
											i % 2 === 1 && "bg-white/[0.015]",
										)}
									>
										<td className="px-5 py-3 font-mono text-cobalt-300">
											{p.name}
										</td>
										<td className="px-5 py-3 font-mono text-[12px] text-mist">
											{p.type}
										</td>
										<td className="hidden px-5 py-3 font-mono text-[12px] text-mist/80 sm:table-cell">
											{p.def}
										</td>
										<td className="hidden px-5 py-3 text-mist/90 md:table-cell">
											{p.note}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Reveal>

				<Reveal delay={120}>
					<div className="mt-8 flex items-start gap-3 text-sm text-mist">
						<Code2
							className="mt-0.5 h-5 w-5 shrink-0 text-cobalt-300"
							strokeWidth={1.75}
						/>
						<p className="leading-relaxed">
							The placeholder is intentionally not driven by the{" "}
							<code className="font-mono text-cobalt-300">placeholder</code>{" "}
							prop — the component runs its own &ldquo;Make me a…&rdquo;
							typewriter loop while the textarea is empty. Type anything and the
							animation pauses; clear it and it resumes.
						</p>
					</div>
				</Reveal>
			</div>
		</section>
	);
}

function SiteFooter() {
	return (
		<footer className="border-t border-white/5 bg-ink-900">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
				<div className="flex items-center gap-2.5 font-display text-sm text-white/90">
					<Palette className="h-4 w-4 text-cobalt-300" strokeWidth={1.75} />
					Wavelength — AI Input Wave Hero
				</div>
				<p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-mist/60 sm:text-right">
					three.js · gsap · shadcn/ui · Tailwind · TypeScript
				</p>
			</div>
		</footer>
	);
}

export function ShowcaseSections() {
	return (
		<>
			<AnatomySection />
			<IntegrationSection />
			<PropsSection />
			<SiteFooter />
		</>
	);
}
