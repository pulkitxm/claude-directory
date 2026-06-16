import { useEffect, useState } from "react";
import { Plus } from "./icons";

/* A Floating Action Button (MD3): tertiary fill, rounded-2xl (28px) square
   shape, 56x56, elevation-2 -> elevation-3 on hover, with a soft breathing
   halo. Appears once the hero is scrolled past; jumps back to the seed form. */
export function Fab() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 600);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<a
			href="#cta"
			aria-label="Seed a new theme"
			className={`focus-ring group fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-[var(--radius-md-xl)] bg-[var(--color-md-tertiary)] text-[var(--color-md-on-tertiary)] shadow-[var(--shadow-md-2)] transition-[transform,box-shadow,opacity] duration-300 ease-[cubic-bezier(0.2,0,0,1)] hover:shadow-[var(--shadow-md-3)] active:scale-95 ${
				visible
					? "translate-y-0 opacity-100"
					: "pointer-events-none translate-y-4 opacity-0"
			}`}
		>
			<span
				aria-hidden
				className="fab-halo absolute inset-0 rounded-[var(--radius-md-xl)] bg-[var(--color-md-tertiary)] blur-md"
			/>
			<Plus
				size={26}
				className="relative transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] group-hover:rotate-90"
			/>
		</a>
	);
}
