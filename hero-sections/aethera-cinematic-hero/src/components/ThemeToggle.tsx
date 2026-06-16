import { useState } from "react";

/**
 * Light/dark toggle. The initial class is set in index.html before paint;
 * this just reads it, flips `<html>.dark`, and persists the choice.
 */
export default function ThemeToggle() {
	const [dark, setDark] = useState(() =>
		document.documentElement.classList.contains("dark"),
	);

	const toggle = () => {
		const next = !dark;
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("aethera-theme", next ? "dark" : "light");
		setDark(next);
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
			data-theme-toggle
			className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-ink/10"
		>
			{dark ? (
				/* Sun — click to go light */
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
					aria-hidden="true"
				>
					<circle cx="12" cy="12" r="4" />
					<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
				</svg>
			) : (
				/* Moon — click to go dark */
				<svg
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
				</svg>
			)}
		</button>
	);
}
