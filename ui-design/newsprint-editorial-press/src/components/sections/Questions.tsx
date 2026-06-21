import { useState } from "react";
import { Plus } from "lucide-react";
import { Kicker } from "@/components/ui/Kicker";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { cn } from "@/lib/utils";
import plateEditor from "@/assets/plate-editor.svg";

const FAQS = [
	{
		q: "Is Newsprint a real newspaper?",
		a: "It is a publication of record in the editorial sense — a daily edition that treats machine intelligence the way a broadsheet treats the world: sourced, dated, ranked, and printed without a single rounded corner. Every figure on this page is fictional, set to demonstrate the house style.",
	},
	{
		q: "Why does everything have sharp corners?",
		a: "Stark geometry is the spine of the design. Zero border radius, visible rules between columns, and collapsed grid borders make the page read as a printed object rather than a soft modern app. It is a deliberate rejection of blur, float, and gradient.",
	},
	{
		q: "What is the editorial red used for?",
		a: "Sparingly, and only with intent — breaking badges, the period after a headline, step numerals, a hovered underline. Ninety-nine percent of the edition is black on warm paper. The red is the front-page exclamation, never the body text.",
	},
	{
		q: "Do you publish corrections?",
		a: "Always, and in public. Corrections run on page two under their own standing head, dated and attributed. Authority is earned the old way: by being right on the record, and by owning it when we are not.",
	},
	{
		q: "Can I read it on my phone?",
		a: "Yes. On small screens the twelve-column grid collapses to a single column, the vertical rules become horizontal rules, and the masthead folds into a hamburger index — but the sharp corners, high contrast, and uppercase rubrics all hold.",
	},
];

/**
 * Letters & Questions: an accordion using the grid-rows-[0fr→1fr] height trick
 * for smooth, layout-stable expansion. The plus glyph rotates 45° to an ×.
 * Paired with an engraved editor portrait in an asymmetric 5/7 split.
 */
export function Questions() {
	const [open, setOpen] = useState<number | null>(0);

	return (
		<section className="newsprint-texture border-b-4 border-ink bg-paper">
			<div className="mx-auto max-w-screen-xl px-4 py-14 lg:py-16">
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
					{/* Portrait rail. */}
					<div className="lg:col-span-5 lg:border-r lg:border-ink lg:pr-10">
						<Kicker>Section 06 · Letters</Kicker>
						<h2 className="mt-4 font-serif text-4xl font-black uppercase leading-[0.95] tracking-tight lg:text-5xl">
							Questions to the editor
						</h2>
						<p className="mt-4 font-body text-sm leading-relaxed text-ink/70">
							What readers ask most, answered on the record by the desk that
							sets the day.
						</p>
						<div className="mt-7 max-w-sm">
							<EditorialImage
								src={plateEditor}
								alt="Engraved portrait of the editor in spectacles with a red tie"
								fig="Fig. 6.1"
								caption="The editor, at the desk. Letters may be addressed care of the colophon."
								imgClassName="aspect-[4/5]"
							/>
						</div>
					</div>

					{/* Accordion. */}
					<div className="lg:col-span-7">
						<ul className="border-t border-ink">
							{FAQS.map((item, i) => {
								const isOpen = open === i;
								return (
									<li key={item.q} className="border-b border-ink">
										<h3>
											<button
												type="button"
												aria-expanded={isOpen}
												onClick={() => setOpen(isOpen ? null : i)}
												className="group flex min-h-[64px] w-full items-center gap-5 py-5 text-left transition-colors duration-200 hover:bg-neutral-100"
											>
												<span className="font-mono text-xs font-semibold tabular-nums text-editorial">
													{String(i + 1).padStart(2, "0")}
												</span>
												<span className="flex-1 font-serif text-xl font-bold leading-snug lg:text-2xl">
													{item.q}
												</span>
												<span
													className={cn(
														"flex h-9 w-9 shrink-0 items-center justify-center border border-ink transition-all duration-300 group-hover:bg-ink group-hover:text-paper",
														isOpen && "rotate-45 bg-ink text-paper",
													)}
												>
													<Plus className="h-4 w-4" strokeWidth={1.75} />
												</span>
											</button>
										</h3>
										<div
											className={cn(
												"grid transition-all duration-300 ease-in-out",
												isOpen
													? "grid-rows-[1fr] opacity-100"
													: "grid-rows-[0fr] opacity-0",
											)}
										>
											<div className="overflow-hidden">
												<p className="max-w-2xl pb-6 pl-9 pr-2 text-justify font-body text-sm leading-relaxed text-ink/75">
													{item.a}
												</p>
											</div>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
