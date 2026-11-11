import { Hexagon } from "lucide-react";
export function Footer() {
    return (<footer id="source" className="w-full border-t border-border/70 bg-background">
			<div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
				<div className="flex items-center gap-2 text-muted-foreground">
					<Hexagon className="h-4 w-4 text-primary" strokeWidth={2.25}/>
					<span className="font-mono text-xs uppercase tracking-[0.28em]">
						Motion Desk
					</span>
				</div>
				<p className="font-mono text-xs text-muted-foreground/80">
					Hero by Tommy Jepsen, MIT. <a className="underline" href="https://github.com/tommyjepsen/twblocks/blob/ff88cb951dab0dc01198b6570ec5f5cf21250d45/blocks/hero/hero5.tsx">Source</a> · <a className="underline" href="https://21st.dev/">21st.dev</a> · <a className="underline" href="./THIRD_PARTY_NOTICES.txt">Licenses</a>
				</p>
			</div>
		</footer>);
}
