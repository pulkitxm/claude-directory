import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button, ButtonLink, Shell } from "./primitives";

const LINKS = [
	{ label: "Features", href: "#features" },
	{ label: "How it works", href: "#how" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "FAQ", href: "#faq" },
];

export function Nav() {
	const [open, setOpen] = useState(false);

	// Lock scroll while the mobile sheet is open.
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<header className="sticky top-0 z-50 w-full bg-[var(--color-canvas)]">
			<Shell className="flex h-20 items-center justify-between">
				<a href="#top" className="flex items-center" aria-label="Flatline home">
					<Logo />
				</a>

				<nav className="hidden items-center gap-1 md:flex">
					{LINKS.map((l) => (
						<a
							key={l.href}
							href={l.href}
							className="rounded-md px-3.5 py-2 text-[0.95rem] font-medium text-[var(--color-ink)] transition-all duration-200 hover:bg-[var(--color-fog)]"
						>
							{l.label}
						</a>
					))}
				</nav>

				<div className="hidden items-center gap-2.5 md:flex">
					<a
						href="#"
						className="rounded-md px-3.5 py-2 text-[0.95rem] font-semibold text-[var(--color-ink)] transition-all duration-200 hover:bg-[var(--color-fog)]"
					>
						Sign in
					</a>
					<ButtonLink href="#pricing" className="!h-11 !px-5 text-[0.95rem]">
						Get started
					</ButtonLink>
				</div>

				<button
					type="button"
					className="flex h-11 w-11 items-center justify-center rounded-md bg-[var(--color-fog)] text-[var(--color-ink)] transition-all duration-200 hover:bg-[var(--color-hair)] md:hidden"
					aria-label={open ? "Close menu" : "Open menu"}
					aria-expanded={open}
					onClick={() => setOpen((v) => !v)}
				>
					{open ? (
						<X size={22} strokeWidth={2.5} />
					) : (
						<Menu size={22} strokeWidth={2.5} />
					)}
				</button>
			</Shell>

			{/* Mobile sheet — solid color block, no overlay blur. */}
			{open && (
				<div className="border-t-2 border-[var(--color-hair)] bg-[var(--color-canvas)] md:hidden">
					<Shell className="flex flex-col gap-1 py-4">
						{LINKS.map((l) => (
							<a
								key={l.href}
								href={l.href}
								onClick={() => setOpen(false)}
								className="rounded-md px-4 py-3 text-lg font-semibold text-[var(--color-ink)] transition-all duration-200 hover:bg-[var(--color-fog)]"
							>
								{l.label}
							</a>
						))}
						<div className="mt-2 flex flex-col gap-2.5">
							<Button
								variant="secondary"
								onClick={() => setOpen(false)}
								className="w-full"
							>
								Sign in
							</Button>
							<ButtonLink
								href="#pricing"
								onClick={() => setOpen(false)}
								className="w-full"
							>
								Get started
							</ButtonLink>
						</div>
					</Shell>
				</div>
			)}
		</header>
	);
}
