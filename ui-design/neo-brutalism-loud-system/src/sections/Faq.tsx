import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "../content";
import { SectionLabel } from "../components/Section";

/* Single-open accordion with full ARIA wiring: each trigger is a real <button>
   with aria-expanded + aria-controls pointing at a region that stays mounted
   (so no dangling idrefs). The plus icon rotates 45deg into an X when open.
   Opening one row closes the previously open one. The first row is open. */
export function Faq() {
	const [open, setOpen] = useState(0);
	const baseId = useId();

	return (
		<section
			id="faq"
			className="neo-noise relative overflow-hidden border-b-4 border-neo-ink bg-neo-accent"
		>
			<div
				className="neo-grid pointer-events-none absolute inset-0 opacity-30"
				aria-hidden="true"
			/>
			<div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:py-28">
				<div className="text-center">
					<SectionLabel bg="bg-neo-white">Loud Questions</SectionLabel>
					<h2 className="mt-5 text-5xl font-bold uppercase leading-[0.9] tracking-tighter text-neo-ink sm:text-7xl">
						Asked &amp; Answered
					</h2>
				</div>

				<div className="mt-14 space-y-5">
					{FAQS.map((faq, i) => {
						const isOpen = open === i;
						const btnId = `${baseId}-btn-${i}`;
						const panelId = `${baseId}-panel-${i}`;
						return (
							<div
								key={faq.q}
								className="border-4 border-neo-ink bg-neo-bg neo-shadow-md"
							>
								<h3 className="m-0">
									<button
										type="button"
										id={btnId}
										aria-expanded={isOpen}
										aria-controls={panelId}
										onClick={() => setOpen(isOpen ? -1 : i)}
										className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-lg font-bold uppercase tracking-tight text-neo-ink transition-colors duration-100 hover:bg-neo-secondary sm:px-6 sm:text-xl"
									>
										<span>{faq.q}</span>
										<span
											className={`flex h-9 w-9 flex-none items-center justify-center border-4 border-neo-ink bg-neo-secondary transition-transform duration-200 ease-out ${
												isOpen ? "rotate-45" : "rotate-0"
											}`}
											aria-hidden="true"
										>
											<Plus
												className="h-5 w-5 stroke-neo-ink"
												strokeWidth={4}
											/>
										</span>
									</button>
								</h3>
								<div
									id={panelId}
									role="region"
									aria-labelledby={btnId}
									hidden={!isOpen}
									className="border-t-4 border-neo-ink bg-neo-muted px-5 py-5 sm:px-6"
								>
									<p className="text-base font-bold leading-relaxed text-neo-ink">
										{faq.a}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
