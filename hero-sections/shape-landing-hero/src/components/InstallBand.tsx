import { motion } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const STEPS = [
	{
		label: "1 — Dependencies",
		cmd: "npm install framer-motion lucide-react clsx tailwind-merge",
	},
	{
		label: "2 — Add the helper",
		cmd: "npx shadcn@latest init   # creates @/lib/utils with cn()",
	},
	{
		label: "3 — Drop in the hero",
		cmd: "# paste shape-landing-hero.tsx into @/components/ui",
	},
];

function CopyRow({ cmd }: { cmd: string }) {
	const [copied, setCopied] = useState(false);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(cmd);
		} catch {
			/* clipboard may be unavailable in headless contexts */
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};
	return (
		<div className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.08] bg-[#070707] px-4 py-3">
			<code className="truncate font-mono text-[13px] text-white/75">
				{cmd}
			</code>
			<button
				type="button"
				aria-label="Copy command"
				onClick={copy}
				className="shrink-0 rounded-lg border border-white/[0.1] p-1.5 text-white/50 transition-colors hover:text-white"
			>
				{copied ? (
					<Check className="h-4 w-4 text-emerald-400" />
				) : (
					<Copy className="h-4 w-4" />
				)}
			</button>
		</div>
	);
}

export default function InstallBand() {
	return (
		<section
			id="docs"
			className="relative border-t border-white/[0.06] bg-[#030303] py-24 md:py-32"
		>
			<div className="mx-auto max-w-4xl px-4 md:px-6">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.7 }}
					className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-12"
				>
					<div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
					<div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />

					<div className="relative">
						<span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs tracking-wide text-white/60">
							<Terminal className="h-3 w-3 text-emerald-300" />
							Ship in three steps
						</span>
						<h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
							Copy, paste, deploy.
						</h2>
						<p className="mt-3 max-w-xl text-pretty text-white/45">
							The hero follows the shadcn/ui convention, so it lands in{" "}
							<code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-white/70">
								@/components/ui
							</code>{" "}
							and just works.
						</p>

						<div className="mt-8 space-y-4">
							{STEPS.map((step) => (
								<div key={step.label}>
									<div className="mb-1.5 text-[11px] uppercase tracking-widest text-white/35">
										{step.label}
									</div>
									<CopyRow cmd={step.cmd} />
								</div>
							))}
						</div>

						<div className="mt-9 flex flex-col gap-3 sm:flex-row">
							<Button size="lg">Get the full kit</Button>
							<Button variant="outline" size="lg">
								Read the docs
							</Button>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
