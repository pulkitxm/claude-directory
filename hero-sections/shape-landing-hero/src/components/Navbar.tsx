import { motion } from "framer-motion";
import { Circle, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
	{ label: "Playground", href: "#playground" },
	{ label: "Features", href: "#features" },
	{ label: "Docs", href: "#docs" },
];

export default function Navbar() {
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<motion.header
			initial={{ y: -40, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.8, ease: [0.23, 0.86, 0.39, 0.96] }}
			className="fixed inset-x-0 top-0 z-50"
		>
			<div className="mx-auto max-w-6xl px-4 md:px-6">
				<nav
					className={cn(
						"mt-3 flex items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-500 md:px-5",
						scrolled
							? "border-white/[0.08] bg-[#070707]/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
							: "border-transparent bg-transparent",
					)}
				>
					{/* Brand */}
					<a href="#top" className="flex items-center gap-2">
						<span className="relative flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04]">
							<Circle className="h-2.5 w-2.5 fill-rose-500/90 text-rose-500/90" />
						</span>
						<span className="text-sm font-semibold tracking-tight text-white">
							Kokonut UI
						</span>
					</a>

					{/* Desktop links */}
					<div className="hidden items-center gap-1 md:flex">
						{NAV_LINKS.map((link) => (
							<a
								key={link.label}
								href={link.href}
								className="rounded-full px-3.5 py-2 text-sm text-white/55 transition-colors hover:text-white"
							>
								{link.label}
							</a>
						))}
					</div>

					{/* Desktop CTA */}
					<div className="hidden items-center gap-2 md:flex">
						<Button variant="ghost" size="sm">
							Sign in
						</Button>
						<Button size="sm">Get the kit</Button>
					</div>

					{/* Mobile toggle */}
					<button
						type="button"
						aria-label="Toggle menu"
						onClick={() => setOpen((v) => !v)}
						className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] text-white/80 md:hidden"
					>
						{open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
					</button>
				</nav>

				{/* Mobile menu */}
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -8 }}
						animate={{ opacity: 1, y: 0 }}
						className="mt-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#070707]/95 p-2 backdrop-blur-xl md:hidden"
					>
						{NAV_LINKS.map((link) => (
							<a
								key={link.label}
								href={link.href}
								onClick={() => setOpen(false)}
								className="block rounded-xl px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/[0.05] hover:text-white"
							>
								{link.label}
							</a>
						))}
						<div className="mt-2 grid grid-cols-2 gap-2 px-1 pb-1">
							<Button variant="outline" size="sm">
								Sign in
							</Button>
							<Button size="sm">Get the kit</Button>
						</div>
					</motion.div>
				)}
			</div>
		</motion.header>
	);
}
