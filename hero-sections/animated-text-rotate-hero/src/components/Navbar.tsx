import { Hexagon, MoveRight } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
const LINKS = [
    { label: "Preview", href: "#preview" },
    { label: "Sample ticker", href: "#trade" },
    { label: "Controls", href: "#controls" },
    { label: "Source", href: "#source" },
];
export function Navbar() {
    return (<header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/70 backdrop-blur-xl">
			<div className="container mx-auto flex h-16 items-center justify-between gap-4">
				<a href="#top" className="group flex items-center gap-2.5">
					<span className="relative grid h-9 w-9 place-items-center rounded-lg bg-primary/10 ring-1 ring-inset ring-primary/30">
						<Hexagon className="h-5 w-5 text-primary transition-transform duration-500 group-hover:rotate-90" strokeWidth={2.25}/>
						<span className="absolute h-1.5 w-1.5 rounded-full bg-primary"/>
					</span>
					<span className="font-display text-lg font-semibold tracking-tight">
						Motion Desk
					</span>
				</a>

				<nav className="hidden items-center gap-1 md:flex">
					{LINKS.map((link) => (<a key={link.label} href={link.href} className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
							{link.label}
						</a>))}
				</nav>

				<div className="flex items-center gap-2">
					<ThemeToggle />
					<Button variant="ghost" size="sm" onClick={() => document.getElementById("source")?.scrollIntoView()} className="hidden text-muted-foreground hover:text-foreground sm:inline-flex">
						Source notes
					</Button>
					<Button size="sm" className="gap-2" onClick={() => document.getElementById("controls")?.scrollIntoView()}>
						Try controls <MoveRight className="h-4 w-4"/>
					</Button>
				</div>
			</div>
		</header>);
}
