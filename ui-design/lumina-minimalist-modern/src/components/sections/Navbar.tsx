import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BrandMark } from "@/components/ui/BrandMark";
import { cn } from "@/lib/utils";

const LINKS = [
	{ label: "Features", href: "#features" },
	{ label: "How it works", href: "#how" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "Customers", href: "#testimonials" },
];

export function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 16);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<motion.header
			initial={{ y: -24, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
			className="fixed inset-x-0 top-0 z-50"
		>
			<div className="mx-auto max-w-6xl px-5 pt-4">
				<nav
					className={cn(
						"flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-300 sm:px-5",
						scrolled
							? "border-border bg-card/80 shadow-lg backdrop-blur-xl"
							: "border-transparent bg-transparent",
					)}
				>
					<BrandMark />

					<div className="hidden items-center gap-8 md:flex">
						{LINKS.map((l) => (
							<a
								key={l.href}
								href={l.href}
								className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
							>
								{l.label}
							</a>
						))}
					</div>

					<div className="hidden items-center gap-2 md:flex">
						<Button variant="ghost" size="md" className="h-10 px-4">
							Sign in
						</Button>
						<Button size="md" className="h-10 px-4">
							Start free
							<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
						</Button>
					</div>

					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
						aria-label={open ? "Close menu" : "Open menu"}
						aria-expanded={open}
					>
						{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</button>
				</nav>

				{open && (
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-2 rounded-2xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur-xl md:hidden"
					>
						<div className="flex flex-col">
							{LINKS.map((l) => (
								<a
									key={l.href}
									href={l.href}
									onClick={() => setOpen(false)}
									className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
								>
									{l.label}
								</a>
							))}
							<div className="mt-2 grid grid-cols-2 gap-2">
								<Button variant="outline" size="md" className="w-full">
									Sign in
								</Button>
								<Button size="md" className="w-full">
									Start free
								</Button>
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</motion.header>
	);
}
