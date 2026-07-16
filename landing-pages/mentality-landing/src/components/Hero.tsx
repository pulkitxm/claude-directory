import { motion } from "motion/react";
import { useState } from "react";

const BASE_URL = (import.meta as ImportMeta & { env: { BASE_URL: string } }).env
	.BASE_URL;
const VIDEO_SRC = `${BASE_URL}assets/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4`;

function EyePill() {
	return (
		<span className="w-[16px] md:w-[42px] lg:w-[62px] h-[16px] md:h-[26px] lg:h-[34px] border-[2px] border-[#1a1a1a] rounded-full inline-flex items-center justify-center align-middle mx-1 md:mx-2 overflow-hidden">
			<motion.span
				aria-hidden="true"
				animate={{ scaleY: [1, 1, 0.12, 1] }}
				transition={{
					duration: 3.4,
					times: [0, 0.9, 0.95, 1],
					repeat: Infinity,
					ease: "easeInOut",
				}}
				className="w-2 h-2 rounded-full bg-black block"
			/>
		</span>
	);
}

function LanguagePill() {
	const [lang, setLang] = useState<"pl" | "en">("en");
	const option = (code: "pl" | "en") => (
		<button
			type="button"
			onClick={() => setLang(code)}
			aria-pressed={lang === code}
			className={`px-2.5 py-1 rounded-full lowercase transition-colors duration-300 ${
				lang === code
					? "bg-[#1a1a1a] text-white"
					: "text-zinc-600 hover:text-[#1a1a1a]"
			}`}
		>
			{code}
		</button>
	);

	return (
		<motion.div
			initial={{ opacity: 0, x: 12 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.7, delay: 0.5 }}
			className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex items-center gap-0.5 rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-sm p-1 text-[11px] tracking-wide"
			aria-label="Switch language"
		>
			{option("pl")}
			<span aria-hidden="true" className="text-zinc-500/70 select-none">
				&mdash;
			</span>
			{option("en")}
		</motion.div>
	);
}

export default function Hero() {
	const [question, setQuestion] = useState("");
	const [submitted, setSubmitted] = useState(false);

	function submitQuestion(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!question.trim()) return;
		setSubmitted(true);
	}

	return (
		<section
			id="home"
			className="relative min-h-[110vh] sm:min-h-[140vh] w-full flex flex-col items-center justify-start overflow-hidden bg-bg-base"
		>
			<div className="absolute top-[15vh] sm:top-[20vh] left-0 w-full h-[95vh] sm:h-[120vh] z-0 pointer-events-none">
				<video
					autoPlay
					loop
					muted
					playsInline
					src={VIDEO_SRC}
					className="w-full h-full object-cover opacity-100"
				/>
				<div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-bg-base to-transparent"></div>
			</div>

			<div className="max-w-7xl w-full mx-auto px-8 md:px-16 lg:px-20 relative z-10 grid grid-cols-12 gap-x-4 md:gap-x-8 pt-28 sm:pt-32 md:pt-44">
				<div className="col-span-12 md:col-span-10 md:col-start-2">
					<motion.h1
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="font-display font-medium tracking-[-0.02em] text-[clamp(30px,4.3vw,56px)] leading-[1.12]"
					>
						<span className="text-[#1a1a1a]">Remix: Mentality offers</span>{" "}
						<span className="text-[#8e8e8e]">information</span>
						<br />
						<span className="text-[#8e8e8e]">
							and resources to help you manage
						</span>
						<br />
						<span className="text-[#8e8e8e]">
							your <EyePill /> mental wellbeing.
						</span>
					</motion.h1>

					<motion.form
						onSubmit={submitQuestion}
						initial={{ opacity: 0, y: 15 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.15 }}
						className="bg-white rounded-[6px] border border-black/[0.05] p-1 pl-4 flex items-center shadow-sm mt-8 md:mt-10 w-full max-w-sm md:max-w-md focus-within:shadow-md transition-shadow duration-300"
					>
						<input
							type="text"
							value={question}
							onChange={(event) => {
								setQuestion(event.target.value);
								setSubmitted(false);
							}}
							placeholder="Ask me anything..."
							aria-label="Ask me anything"
							className="flex-1 min-w-0 bg-transparent outline-none border-none text-sm md:text-[15px] text-zinc-800 placeholder:text-zinc-400 py-2 pr-3"
						/>
						<button
							type="submit"
							aria-label="Submit question"
							className="bg-[#1a1a1a] text-white w-9 h-9 rounded-full relative shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="absolute inset-0 m-auto w-4 h-4"
								aria-hidden="true"
							>
								<path d="M9 6l6 6-6 6" />
							</svg>
						</button>
					</motion.form>
					<p aria-live="polite" className="mt-3 text-sm text-zinc-600 min-h-5">
						{submitted ? "Thanks. Your question is ready for review." : ""}
					</p>
				</div>
			</div>

			<LanguagePill />
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.7, delay: 0.6 }}
				className="absolute bottom-5 left-6 md:left-8 z-20 text-[11px] tracking-[0.18em] text-zinc-700/80 select-none"
			>
				2024
			</motion.span>
			<motion.span
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.7, delay: 0.6 }}
				className="absolute bottom-5 right-6 md:right-8 z-20 text-[11px] lowercase tracking-[0.18em] text-zinc-700/80 select-none"
			>
				mental health tools
			</motion.span>
		</section>
	);
}
