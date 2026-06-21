import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "../data/content";
import { Section, SectionLabel } from "./Primitives";

export function Faq() {
	const [open, setOpen] = useState<number | null>(0);

	return (
		<Section id="faq" className="bg-muted/40">
			<div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
				{/* left rail */}
				<div className="lg:sticky lg:top-28 lg:self-start">
					<SectionLabel align="left" className="mb-7">
						Enquiries
					</SectionLabel>
					<h2
						className="font-display leading-[1.14] tracking-[-0.01em] text-foreground"
						style={{ fontSize: "clamp(2rem, 4.4vw, 2.75rem)" }}
					>
						Questions,
						<br />
						answered plainly.
					</h2>
					<p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
						Anything we have not covered, we will gladly answer by hand. Write
						to the press and we will reply.
					</p>
					<a
						href="#correspond"
						className="small-caps link-underline mt-6 inline-block text-foreground"
					>
						Write to us
					</a>
				</div>

				{/* accordion */}
				<div className="border-t border-border">
					{faqs.map((item, i) => {
						const isOpen = open === i;
						return (
							<div key={item.q} className="border-b border-border">
								<h3>
									<button
										type="button"
										onClick={() => setOpen(isOpen ? null : i)}
										aria-expanded={isOpen}
										className="flex min-h-[44px] w-full touch-manipulation items-center justify-between gap-6 py-6 text-left transition-colors duration-200 hover:text-accent"
									>
										<span className="font-display text-xl text-foreground">
											{item.q}
										</span>
										<Plus
											size={20}
											strokeWidth={1.5}
											className={`shrink-0 text-accent transition-transform duration-300 ease-editorial ${
												isOpen ? "rotate-45" : "rotate-0"
											}`}
										/>
									</button>
								</h3>
								<div
									className="grid transition-all duration-300 ease-editorial"
									style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
								>
									<div className="overflow-hidden">
										<p className="max-w-xl pb-7 pr-8 text-[1.02rem] leading-relaxed text-muted-foreground">
											{item.a}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</Section>
	);
}
