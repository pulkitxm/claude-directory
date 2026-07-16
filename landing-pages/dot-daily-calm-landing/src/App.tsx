import { motion } from "motion/react";
import { useEffect, useState } from "react";

const MESSAGES = ["Are you here?", "Yes, I am.", "Speak soon."];
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_BEFORE_DELETE = 2000;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const VIDEO_SRC = `${import.meta.env.BASE_URL}assets/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4`;

const NAV_LINKS = ["Philosophy", "Trust", "Access", "Tribe"];

function TypingMessages() {
	const [messageIndex, setMessageIndex] = useState(0);
	const [text, setText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const message = MESSAGES[messageIndex];

		if (!isDeleting && text === message) {
			const pause = setTimeout(() => setIsDeleting(true), PAUSE_BEFORE_DELETE);
			return () => clearTimeout(pause);
		}

		if (isDeleting && text === "") {
			setIsDeleting(false);
			setMessageIndex((index) => (index + 1) % MESSAGES.length);
			return;
		}

		const tick = setTimeout(
			() => {
				setText(
					isDeleting
						? message.slice(0, text.length - 1)
						: message.slice(0, text.length + 1),
				);
			},
			isDeleting ? DELETING_SPEED : TYPING_SPEED,
		);

		return () => clearTimeout(tick);
	}, [text, isDeleting, messageIndex]);

	return (
		<div className="absolute left-[48.5%] md:left-[47.5%] lg:left-[48.5%] -translate-x-1/2 bottom-[32%] z-30 w-[110px] sm:w-[130px] flex justify-start text-left">
			<p className="font-nokia text-[#2A3616] text-[10px] sm:text-[14px] leading-tight break-words min-h-[1.5em]">
				{text}
				<motion.span
					className="inline-block w-1.5 h-3 bg-[#2A3616] ml-1 align-middle"
					animate={{ opacity: [0, 1, 0] }}
					transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
				/>
			</p>
		</div>
	);
}

function Navbar() {
	return (
		<header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 pointer-events-none">
			<nav className="pointer-events-auto flex items-center justify-between rounded-full border border-black/10 bg-transparent backdrop-blur-md px-5 py-2.5 md:px-7">
				<a
					href="#"
					className="font-instrument text-[28px] tracking-tight text-[#1a1a1a] leading-none"
				>
					dot.
				</a>

				<div className="hidden md:flex items-center gap-10">
					{NAV_LINKS.map((link) => (
						<a
							key={link}
							href={`#${link.toLowerCase()}`}
							className="font-sans text-[14px] text-[#1a1a1a] transition-opacity duration-200 hover:opacity-50"
						>
							{link}
						</a>
					))}
				</div>

				<a
					href="#access"
					className="group relative overflow-hidden rounded-full bg-[#0871E7] px-5 py-2 font-sans text-[14px] text-white shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline-1 outline-[#0871E7] -outline-offset-1"
				>
					<span
						aria-hidden="true"
						className="absolute w-[80%] h-4 left-[10%] top-[1px] bg-gradient-to-b from-[#DEF0FC] to-transparent rounded-[12px] transition-transform duration-300 group-hover:scale-x-105"
					/>
					<span className="relative">Link up</span>
				</a>
			</nav>
		</header>
	);
}

function Hero() {
	return (
		<section
			id="access"
			className="relative min-h-screen bg-[#F3F4ED] pt-24 md:pt-32 flex flex-col items-center overflow-hidden"
		>
			<div className="absolute inset-0 z-0">
				<video
					className="h-full w-full object-cover"
					src={VIDEO_SRC}
					autoPlay
					loop
					muted
					playsInline
				/>
				<div className="absolute inset-0 bg-white/5" />
			</div>

			<div className="relative z-20 pointer-events-none flex flex-col items-center px-6 text-center">
				<motion.div
					initial={{ opacity: 0, scale: 0.95 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.5, ease: EASE_OUT_EXPO }}
				>
					<h1 className="font-instrument text-[38px] md:text-[56px] lg:text-[72px] leading-[0.85] tracking-tight text-[#1a1a1a] mb-6">
						Short notes. <br /> Daily calm.
					</h1>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1.2, delay: 0.3, ease: EASE_OUT_EXPO }}
				>
					<p className="font-sans text-[16px] md:text-[18px] text-[#1a1a1a]/70 leading-relaxed font-normal max-w-xl mx-auto">
						Linked with a single anonymous peer. One message every day. A quiet
						rhythm in the digital noise.
					</p>
				</motion.div>
			</div>

			<TypingMessages />
		</section>
	);
}

export default function App() {
	return (
		<main>
			<Navbar />
			<Hero />
		</main>
	);
}
