import { Hexagon } from "lucide-react";

/** Compact footer that closes the page. */
export function Footer() {
	return (
		<footer className="w-full border-t border-border/70 bg-background">
			<div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
				<div className="flex items-center gap-2 text-muted-foreground">
					<Hexagon className="h-4 w-4 text-primary" strokeWidth={2.25} />
					<span className="font-mono text-xs uppercase tracking-[0.28em]">
						Spektr Trade
					</span>
				</div>
				<p className="font-mono text-xs text-muted-foreground/80">
					Streamlining SMB trade — faster than ever.
				</p>
			</div>
		</footer>
	);
}
