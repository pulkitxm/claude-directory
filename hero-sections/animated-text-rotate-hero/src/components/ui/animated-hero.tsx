import { motion, useReducedMotion } from "framer-motion";
import { MoveRight, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
function Hero() {
    const [titleNumber, setTitleNumber] = useState(0);
    const [paused, setPaused] = useState(false);
    const reduce = useReducedMotion();
    const titles = useMemo(() => ["amazing", "new", "wonderful", "beautiful", "smart"], []);
    useEffect(() => {
        if (paused || reduce)
            return;
        const timeoutId = setTimeout(() => {
            if (titleNumber === titles.length - 1) {
                setTitleNumber(0);
            }
            else {
                setTitleNumber(titleNumber + 1);
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles, paused, reduce]);
    return (<div className="w-full">
			<div className="container mx-auto">
				<div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
					<div>
						<Button variant="secondary" size="sm" className="gap-4" onClick={() => document.getElementById("source")?.scrollIntoView()}>
							View component source <MoveRight className="w-4 h-4"/>
						</Button>
					</div>
					<div className="flex gap-4 flex-col">
						<h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
							<span className="text-spektr-cyan-50">Make your next idea</span>
							<span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
								&nbsp;
								{titles.map((title, index) => (<motion.span key={index} className="absolute font-semibold" initial={{ opacity: 0, y: "-100" }} transition={{ type: "spring", stiffness: 50 }} animate={titleNumber === index
                ? {
                    y: 0,
                    opacity: 1,
                }
                : {
                    y: titleNumber > index ? -150 : 150,
                    opacity: 0,
                }}>
										{title}
									</motion.span>))}
							</span>
						</h1>

    <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">A type study with a changing headline. Pause the sequence or step through the words to explore its rhythm.</p>
					</div>
					<div id="controls" className="flex w-full flex-row gap-3 sm:w-auto">
						<Button size="lg" className="min-w-0 flex-1 gap-2 !px-2 sm:flex-none sm:gap-4 sm:!px-8" variant="outline" onClick={() => setPaused(v => !v)} aria-pressed={paused}>
							{paused ? "Resume rotation" : "Pause rotation"} {paused ? <Play className="w-4 h-4"/> : <Pause className="w-4 h-4"/>}
						</Button>
						<Button size="lg" className="min-w-0 flex-1 gap-2 !px-2 sm:flex-none sm:gap-4 sm:!px-8" onClick={() => setTitleNumber(n => (n + 1) % titles.length)}>
							Next word <MoveRight className="w-4 h-4"/>
						</Button>
					</div>
				</div>
			</div>
		</div>);
}
export { Hero };
