import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { Container, Panel, SectionHeading } from "./primitives";

const ITEMS = [
	{
		q: "What buses and protocols does the SX-1 bridge speak?",
		a: "Out of the box: Modbus RTU/TCP, CAN / CANopen, RS-485, RS-232, OPC-UA and MQTT. Anything exotic can be handled by a hot-swappable I/O module without taking the line down.",
	},
	{
		q: "Can it run air-gapped or on-prem?",
		a: "Yes. The Plant tier deploys fully on-prem or air-gapped. The control plane, signal history and firmware registry all run inside your network with no outbound dependencies.",
	},
	{
		q: "How do the fail-safe interlocks actually work?",
		a: "Interlocks run on a hardware-isolated safety core, independent of the main MCU. Rules are evaluated locally so an emergency stop fires in under 12ms even if the network link is down.",
	},
	{
		q: "What happens to a unit if it loses connection?",
		a: "It keeps executing its last signed program autonomously. When the link returns, the unit reconciles its state with the deck and replays any buffered telemetry so nothing is lost.",
	},
	{
		q: "How is firmware kept safe during a rollout?",
		a: "Every image is signed and rolled out in waves. Each node verifies the signature, boots into the new image, and confirms healthy telemetry before the next wave begins. Any fault triggers an automatic rollback.",
	},
];

function Item({
	q,
	a,
	open,
	onToggle,
}: {
	q: string;
	a: string;
	open: boolean;
	onToggle: () => void;
}) {
	const id = useId();
	return (
		<Panel className="overflow-hidden">
			<h3>
				<button
					type="button"
					aria-expanded={open}
					aria-controls={`${id}-panel`}
					id={`${id}-btn`}
					onClick={onToggle}
					className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
				>
					<span className="text-[1.02rem] font-semibold text-ink">{q}</span>
					<span
						className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-chassis text-accent"
						style={{
							boxShadow: open
								? "var(--shadow-pressed)"
								: "var(--shadow-floating)",
						}}
					>
						<Plus
							size={18}
							strokeWidth={2.5}
							className="transition-transform duration-300 ease-mech"
							style={{
								transform: open ? "rotate(45deg)" : "rotate(0deg)",
							}}
						/>
					</span>
				</button>
			</h3>
			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						id={`${id}-panel`}
						role="region"
						aria-labelledby={`${id}-btn`}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.28, ease: "easeOut" }}
						className="overflow-hidden"
					>
						<p className="max-w-[62ch] px-6 pb-6 text-[0.95rem] leading-relaxed text-label">
							{a}
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</Panel>
	);
}

export function Faq() {
	const [open, setOpen] = useState<number | null>(0);
	return (
		<section id="faq" className="scroll-mt-24">
			<Container className="!max-w-3xl">
				<SectionHeading
					eyebrow="SPEC SHEET · FAQ"
					tone="alert"
					title="The fine print, machined flat"
				/>
				<div className="mt-12 flex flex-col gap-4">
					{ITEMS.map((it, i) => (
						<Item
							key={it.q}
							q={it.q}
							a={it.a}
							open={open === i}
							onToggle={() => setOpen(open === i ? null : i)}
						/>
					))}
				</div>
			</Container>
		</section>
	);
}
