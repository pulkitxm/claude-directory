import { Boxes, Container, Factory, Ship, Truck, Warehouse, } from "lucide-react";
const LOGOS = [
    { icon: Truck, label: "Workshop" },
    { icon: Warehouse, label: "Storage" },
    { icon: Container, label: "Logistics" },
    { icon: Factory, label: "Fabrication" },
    { icon: Ship, label: "Shipping" },
    { icon: Boxes, label: "Operations" },
];
export function TrustStrip() {
    return (<section className="w-full border-y border-border/70 bg-card/30">
			<div className="container mx-auto py-10">
				<p className="eyebrow text-center">
					Example workflows, shown with licensed generic icons
				</p>
				<div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
					{LOGOS.map(({ icon: Icon, label }) => (<div key={label} className="flex items-center justify-center gap-2 text-muted-foreground/70 transition-colors hover:text-foreground">
							<Icon className="h-5 w-5" strokeWidth={1.75}/>
							<span className="font-display text-sm font-medium tracking-tight">
								{label}
							</span>
						</div>))}
				</div>
			</div>
		</section>);
}
