import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Theme = "light" | "dark";

const STORAGE_KEY = "spektr-theme";

function getInitialTheme(): Theme {
	if (typeof window === "undefined") return "dark";
	const saved = window.localStorage.getItem(STORAGE_KEY);
	if (saved === "light" || saved === "dark") return saved;
	return window.matchMedia("(prefers-color-scheme: light)").matches
		? "light"
		: "dark";
}

/** Persisted light/dark switch. Toggles the `.dark` class shadcn tokens key off. */
export function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>(getInitialTheme);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.toggle("dark", theme === "dark");
		window.localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	const next = theme === "dark" ? "light" : "dark";

	return (
		<Button
			variant="ghost"
			size="icon"
			aria-label={`Switch to ${next} mode`}
			title={`Switch to ${next} mode`}
			onClick={() => setTheme(next)}
			className="rounded-full border border-border/70 text-muted-foreground hover:text-foreground"
		>
			<Sun className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100" />
		</Button>
	);
}
