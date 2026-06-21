import { RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { cn } from "@/lib/utils";

const DEFAULTS = {
	title: "Interactive 3D",
	body: "Bring your UI to life with beautiful 3D scenes. Create immersive experiences that capture attention and enhance your design.",
	fill: "#ffffff",
	spotlight: true,
};

const FILLS: { label: string; value: string }[] = [
	{ label: "White", value: "#ffffff" },
	{ label: "Violet", value: "#a78bfa" },
	{ label: "Cyan", value: "#67e8f9" },
	{ label: "Amber", value: "#fbbf24" },
];

/**
 * A live, controlled twin of <SplineSceneBasic />. It exposes the props a real
 * integrator would wire up (headline copy, body copy, spotlight on/off and its
 * fill) so you can see exactly what data flows into the component.
 */
export function ScenePlayground() {
	const [title, setTitle] = useState(DEFAULTS.title);
	const [body, setBody] = useState(DEFAULTS.body);
	const [fill, setFill] = useState(DEFAULTS.fill);
	const [spotlight, setSpotlight] = useState(DEFAULTS.spotlight);

	const reset = () => {
		setTitle(DEFAULTS.title);
		setBody(DEFAULTS.body);
		setFill(DEFAULTS.fill);
		setSpotlight(DEFAULTS.spotlight);
	};

	return (
		<div className="grid gap-6 lg:grid-cols-[1fr_320px]">
			{/* Live preview */}
			<Card className="relative h-[460px] w-full overflow-hidden border-white/10 bg-black/[0.96]">
				{spotlight && (
					<Spotlight
						className="-top-40 left-0 md:-top-20 md:left-60"
						fill={fill}
					/>
				)}
				<div className="flex h-full flex-col md:flex-row">
					<div className="relative z-10 flex flex-1 flex-col justify-center p-8">
						<h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
							{title || " "}
						</h1>
						<p className="mt-4 max-w-lg text-neutral-300">{body}</p>
					</div>
					<div className="relative min-h-[180px] flex-1">
						<SplineScene
							scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
							className="h-full w-full"
						/>
					</div>
				</div>
			</Card>

			{/* Controls */}
			<div className="flex flex-col gap-5 rounded-xl border border-white/10 bg-white/[0.02] p-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 text-sm font-medium text-neutral-200">
						<Sparkles className="h-4 w-4 text-violet-300" /> Props
					</div>
					<button
						type="button"
						onClick={reset}
						className="flex items-center gap-1.5 rounded-md border border-white/10 px-2 py-1 text-[11px] text-neutral-400 transition hover:border-white/25 hover:text-neutral-200"
					>
						<RotateCcw className="h-3 w-3" /> Reset
					</button>
				</div>

				<label className="flex flex-col gap-1.5">
					<span className="font-mono text-[11px] uppercase tracking-wide text-neutral-500">
						title
					</span>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none transition focus:border-violet-400/60"
					/>
				</label>

				<label className="flex flex-col gap-1.5">
					<span className="font-mono text-[11px] uppercase tracking-wide text-neutral-500">
						description
					</span>
					<textarea
						value={body}
						rows={4}
						onChange={(e) => setBody(e.target.value)}
						className="resize-none rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-neutral-100 outline-none transition focus:border-violet-400/60"
					/>
				</label>

				<div className="flex flex-col gap-2">
					<span className="font-mono text-[11px] uppercase tracking-wide text-neutral-500">
						spotlight
					</span>
					<button
						type="button"
						role="switch"
						aria-checked={spotlight}
						onClick={() => setSpotlight((s) => !s)}
						className={cn(
							"flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition",
							spotlight
								? "border-violet-400/40 bg-violet-500/10 text-neutral-100"
								: "border-white/10 bg-black/40 text-neutral-400",
						)}
					>
						<span>{spotlight ? "Enabled" : "Disabled"}</span>
						<span
							className={cn(
								"relative h-5 w-9 rounded-full transition",
								spotlight ? "bg-violet-500" : "bg-neutral-700",
							)}
						>
							<span
								className={cn(
									"absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all",
									spotlight ? "left-[18px]" : "left-0.5",
								)}
							/>
						</span>
					</button>
				</div>

				<div className="flex flex-col gap-2">
					<span className="font-mono text-[11px] uppercase tracking-wide text-neutral-500">
						fill
					</span>
					<div className="grid grid-cols-4 gap-2">
						{FILLS.map((f) => (
							<button
								key={f.value}
								type="button"
								title={f.label}
								onClick={() => setFill(f.value)}
								disabled={!spotlight}
								className={cn(
									"h-9 rounded-lg border transition disabled:opacity-30",
									fill === f.value
										? "border-white/70 ring-2 ring-white/20"
										: "border-white/10 hover:border-white/30",
								)}
								style={{ background: f.value }}
							/>
						))}
					</div>
				</div>

				<p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
					Edits here re-render the exact{" "}
					<code className="text-neutral-300">
						Card + Spotlight + SplineScene
					</code>{" "}
					tree — the same props you'd pass in your app.
				</p>
			</div>
		</div>
	);
}
