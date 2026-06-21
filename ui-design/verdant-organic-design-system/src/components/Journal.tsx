import { ArrowUpRight, Clock } from "lucide-react";
import { posts } from "../lib/content";
import { PostArt } from "./Botanical";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * The Journal — three field notes. Each card crops a botanical illustration
 * behind a fade overlay that lifts on hover (group-hover) for a slow reveal,
 * with a category pill and a read-time. The whole card lifts gently on hover.
 */
export function Journal() {
	return (
		<section id="journal" className="relative px-4 py-32 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<SectionHeading
					align="left"
					eyebrow="From the journal"
					title={
						<>
							Notes from the{" "}
							<span className="italic text-primary">footpath.</span>
						</>
					}
					intro="Foraging guides, brewing rituals, and what it means to take only what's offered. Written slowly, between harvests."
				/>

				<div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post, i) => (
						<Reveal
							key={post.title}
							delay={i * 0.1}
							as="article"
							className="h-full"
						>
							<a
								href="#journal"
								className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border/50 bg-card shadow-soft transition-all duration-500 ease-organic hover:-translate-y-1.5 hover:shadow-soft-lg"
							>
								{/* illustration with fade overlay */}
								<div className="relative overflow-hidden">
									<PostArt
										variant={post.art}
										className="aspect-[16/10] h-auto w-full transition-transform duration-700 ease-organic group-hover:scale-105"
									/>
									{/* fade overlay that clears on hover */}
									<div className="absolute inset-0 bg-foreground/15 transition-colors duration-500 group-hover:bg-transparent" />
									<span className="absolute left-4 top-4 rounded-full border border-border/50 bg-card/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary backdrop-blur-sm">
										{post.category}
									</span>
								</div>

								<div className="flex flex-1 flex-col p-7">
									<h3 className="text-2xl font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
										{post.title}
									</h3>
									<p className="mt-3 flex-1 text-base leading-relaxed text-muted-foreground">
										{post.excerpt}
									</p>
									<div className="mt-6 flex items-center justify-between border-t border-border/50 pt-5">
										<span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
											<Clock size={15} />
											{post.read} read
										</span>
										<span className="inline-flex items-center gap-1 text-sm font-bold text-primary">
											Read
											<ArrowUpRight
												size={16}
												className="transition-transform duration-300 ease-organic group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
											/>
										</span>
									</div>
								</div>
							</a>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
