import { Overline, Emphasis, EditorialImage } from "./Primitives";
import { Button } from "./Button";
import { posts } from "../data/content";

export function Blog() {
	return (
		<section
			id="journal"
			className="relative border-t border-foreground/10 py-20 md:py-32"
		>
			<div className="mx-auto max-w-[1600px] px-8 md:px-16">
				{/* Header — title left, link pushed right (asymmetric) */}
				<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<Overline>The Journal</Overline>
						<h2 className="mt-8 max-w-2xl font-serif text-4xl font-normal leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-7xl">
							Notes on <Emphasis>permanence.</Emphasis>
						</h2>
					</div>
					<Button variant="link">Read every entry</Button>
				</div>

				<div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<article key={post.title} className="group flex flex-col">
							<a href="#journal" className="block focus-visible:outline-none">
								<EditorialImage
									src={post.image}
									alt={post.alt}
									aspect="aspect-[4/5]"
									shadow="shadow-blog"
									hoverShadow="hover:shadow-blog-hover"
								/>
								<div className="mt-6">
									{/* Metadata row with decorative h-px divider between items */}
									<div className="flex items-center gap-3 font-sans text-[10px] uppercase tracking-overline text-muted-fg">
										<span>{post.category}</span>
										<span aria-hidden className="h-px w-8 bg-foreground/30" />
										<span>{post.date}</span>
									</div>
									<h3 className="mt-5 font-serif text-2xl font-normal leading-tight tracking-tight text-foreground transition-colors duration-500 ease-luxe group-hover:text-accent md:text-3xl">
										{post.title}
									</h3>
									<div className="mt-6 flex items-center gap-3">
										<span aria-hidden className="h-px w-6 bg-foreground" />
										<span className="font-sans text-[10px] uppercase tracking-overline text-muted-fg">
											{post.readTime} read
										</span>
									</div>
								</div>
							</a>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
