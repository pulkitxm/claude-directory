import { ArrowDownRight, ArrowUpRight } from "lucide-react";
type Tick = {
    code: string;
    value: string;
    delta: number;
};
const TICKS: Tick[] = [
    { code: "SAMPLE INVOICES", value: "12,408", delta: 4.2 },
    { code: "AVG SETTLEMENT", value: "1.4 days", delta: -38.0 },
    { code: "SAMPLE PROJECTS", value: "9,210", delta: 2.1 },
    { code: "EXAMPLE VOLUME", value: "$3.1M", delta: 6.7 },
    { code: "DISPUTES OPEN", value: "0.4%", delta: -1.9 },
    { code: "ROUTES AUTOMATED", value: "847", delta: 12.5 },
];
function TickRow() {
    return (<>
			{TICKS.map((t) => {
            const up = t.delta >= 0;
            return (<span key={t.code} className="inline-flex items-center gap-2 px-6 font-mono text-xs">
						<span className="text-muted-foreground">{t.code}</span>
						<span className="font-medium text-foreground">{t.value}</span>
						<span className={up
                    ? "inline-flex items-center gap-0.5 text-primary"
                    : "inline-flex items-center gap-0.5 text-muted-foreground"}>
							{up ? (<ArrowUpRight className="h-3 w-3"/>) : (<ArrowDownRight className="h-3 w-3"/>)}
							{Math.abs(t.delta).toFixed(1)}%
						</span>
						<span className="text-border">/</span>
					</span>);
        })}
		</>);
}
export function TradeTicker() {
    return (<div id="trade" aria-label="Simulated example metrics" className="w-full border-b border-border/70 bg-card/40">
			<div className="ticker-mask container mx-auto overflow-hidden py-2.5">
				<div className="flex w-max animate-ticker items-center whitespace-nowrap">
					<TickRow />
					<TickRow />
				</div>
			</div>
		</div>);
}
