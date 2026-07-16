import { motion } from "motion/react";
import { useEffect, useState } from "react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MESSAGES = ["Are you here?", "Yes, I am.", "Speak soon."];
const TYPING_SPEED_MS = 100;
const DELETING_SPEED_MS = 50;
const PAUSE_BEFORE_DELETE_MS = 2000;

function TypingMessages() {
	const [messageIndex, setMessageIndex] = useState(0);
	const [text, setText] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		const message = MESSAGES[messageIndex];
		let timeout: ReturnType<typeof setTimeout>;

		if (!isDeleting) {
			if (text.length < message.length) {
				timeout = setTimeout(
					() => setText(message.slice(0, text.length + 1)),
					TYPING_SPEED_MS,
				);
			} else {
				timeout = setTimeout(() => setIsDeleting(true), PAUSE_BEFORE_DELETE_MS);
			}
		} else if (text.length > 0) {
			timeout = setTimeout(
				() => setText(message.slice(0, text.length - 1)),
				DELETING_SPEED_MS,
			);
		} else {
			timeout = setTimeout(() => {
				setIsDeleting(false);
				setMessageIndex((i) => (i + 1) % MESSAGES.length);
			}, 0);
		}

		return () => clearTimeout(timeout);
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

const NAV_LINKS = ["Philosophy", "Trust", "Access", "Tribe"];

function Navbar() {
	return (
		<header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 pointer-events-none">
			<nav className="pointer-events-auto flex items-center justify-between backdrop-blur-md bg-transparent border border-black/10 rounded-full pl-7 pr-2.5 py-2.5">
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
					className="group relative overflow-hidden bg-[#0871E7] rounded-full text-white font-sans text-[14px] font-medium px-6 py-2.5 shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline-1 outline-[#0871E7] -outline-offset-1"
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

const VIDEO_SRC = `${import.meta.env.BASE_URL}assets/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4`;

function Hero() {
	return (
		<section
			id="access"
			className="relative min-h-screen bg-[#F3F4ED] pt-24 md:pt-32 flex flex-col items-center overflow-hidden"
		>
			<video
				className="absolute inset-0 z-0 w-full h-full object-cover"
				src={VIDEO_SRC}
				autoPlay
				loop
				muted
				playsInline
			/>
			<div className="absolute inset-0 z-10 bg-white/5" aria-hidden="true" />

			<div className="relative z-20 pointer-events-none text-center px-6">
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
		<div className="min-h-screen bg-[#F3F4ED]">
			<Navbar />
			<Hero />
		</div>
	);
}
