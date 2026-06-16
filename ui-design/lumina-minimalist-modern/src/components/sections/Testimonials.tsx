import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface Quote {
	body: string;
	name: string;
	role: string;
	initials: string;
	offset?: boolean;
}

const QUOTES: Quote[] = [
	{
		body: "We replaced three tools with Lumina and our standups got 10 minutes shorter. Everyone finally looks at the same numbers.",
		name: "Priya Nair",
		role: "Head of Product, Northwind",
		initials: "PN",
	},
	{
		body: "The auto-insights caught a churn spike a full day before we would have. That single alert paid for the year.",
		name: "Marcus Lee",
		role: "Growth Lead, Quanta",
		initials: "ML",
		offset: true,
	},
	{
		body: "It's the rare analytics tool that feels calm. Beautiful, fast, and it never makes me hunt for the metric I need.",
		name: "Sofia Alvarez",
		role: "Founder, Helio",
		initials: "SA",
	},
];

function QuoteCard({ quote }: { quote: Quote }) {
	return (
		<RevealItem className={cn(quote.offset && "lg:-translate-y-8")}>
			<figure className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
				{/* Oversized decorative quote mark */}
				<span
					aria-hidden
					className="pointer-events-none absolute -right-2 -top-6 font-display text-[120px] leading-none text-accent/[0.08]"
				>
					&rdquo;
				</span>
				{/* Accent bar */}
				<span className="block h-1 w-10 rounded-full bg-gradient-to-r from-accent to-accent-secondary" />
				<blockquote className="relative mt-6 text-lg leading-relaxed text-foreground/90">
					{quote.body}
				</blockquote>
				<figcaption className="mt-7 flex items-center gap-3">
					<span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary text-sm font-semibold text-accent-foreground">
						{quote.initials}
					</span>
					<span>
						<span className="block text-sm font-semibold tracking-tight">
							{quote.name}
						</span>
						<span className="block text-sm text-muted-foreground">
							{quote.role}
						</span>
					</span>
				</figcaption>
			</figure>
		</RevealItem>
	);
}

export function Testimonials() {
	return (
		<section id="testimonials" className="relative py-28 md:py-36">
			<div className="mx-auto max-w-6xl px-5">
				<Reveal className="mx-auto max-w-2xl text-center">
					<RevealItem>
						<div className="flex justify-center">
							<SectionLabel>Customers</SectionLabel>
						</div>
					</RevealItem>
					<RevealItem>
						<h2 className="mt-5 font-display text-3xl leading-[1.15] tracking-tight sm:text-[3.25rem]">
							Loved by teams who{" "}
							<span className="gradient-text">sweat the details</span>.
						</h2>
					</RevealItem>
				</Reveal>

				<Reveal className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-start">
					{QUOTES.map((quote) => (
						<QuoteCard key={quote.name} quote={quote} />
					))}
				</Reveal>
			</div>
		</section>
	);
}
