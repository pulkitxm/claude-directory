import {
	Chrome,
	Circle,
	Eye,
	EyeOff,
	Github,
	type LucideIcon,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useState } from "react";

const BASE_URL = (import.meta as ImportMeta & { env: { BASE_URL: string } }).env
	.BASE_URL;
const VIDEO_SRC = `${BASE_URL}assets/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4`;

const heroContainer: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: { staggerChildren: 0.15, delayChildren: 0.2 },
	},
};

const heroItem: Variants = {
	hidden: { opacity: 0, y: 10 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function App() {
	const [showPassword, setShowPassword] = useState(false);
	const [formStatus, setFormStatus] = useState("");

	return (
		<main className="flex min-h-screen w-full bg-black selection:bg-white/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
			<section className="hidden lg:flex relative w-[52%] flex-col items-center justify-end pb-32 px-12 rounded-3xl overflow-hidden shadow-2xl h-full">
				<video
					className="absolute inset-0 w-full h-full object-cover"
					autoPlay
					muted
					loop
					playsInline
				>
					<source src={VIDEO_SRC} type="video/mp4" />
				</video>

				<motion.div
					variants={heroContainer}
					initial="hidden"
					animate="show"
					className="z-10 w-full max-w-xs space-y-8"
				>
					<motion.div
						variants={heroItem}
						className="flex items-center justify-center gap-2"
					>
						<Circle
							className="h-5 w-5 fill-white text-white"
							aria-hidden="true"
						/>
						<span className="text-xl font-semibold tracking-tight">Aurora</span>
					</motion.div>

					<motion.div variants={heroItem} className="space-y-3 text-center">
						<h1 className="text-4xl font-medium tracking-tight whitespace-nowrap">
							Join Aurora
						</h1>
						<p className="text-white/60 text-sm leading-relaxed px-4">
							Follow these 3 quick phases to activate your space.
						</p>
					</motion.div>

					<div className="space-y-3">
						<motion.div variants={heroItem}>
							<StepItem number={1} text="Register your identity" active />
						</motion.div>
						<motion.div variants={heroItem}>
							<StepItem number={2} text="Configure your studio" />
						</motion.div>
						<motion.div variants={heroItem}>
							<StepItem number={3} text="Finalize your profile" />
						</motion.div>
					</div>
				</motion.div>
			</section>

			<section className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
				>
					<header className="space-y-2">
						<h2 className="text-3xl font-medium tracking-tight">
							Create New Profile
						</h2>
						<p className="text-white/40 text-sm">
							Input your basic details to begin the journey.
						</p>
					</header>

					<div className="grid grid-cols-2 gap-4">
						<SocialButton
							icon={Chrome}
							label="Google"
							onClick={() => setFormStatus("Google sign-up selected.")}
						/>
						<SocialButton
							icon={Github}
							label="Github"
							onClick={() => setFormStatus("Github sign-up selected.")}
						/>
					</div>

					<div className="relative">
						<div
							className="absolute inset-0 flex items-center"
							aria-hidden="true"
						>
							<div className="w-full border-t border-white/10" />
						</div>
						<div className="relative flex justify-center">
							<span className="bg-black px-4 text-xs font-medium text-white/40 uppercase tracking-widest">
								Or
							</span>
						</div>
					</div>

					<form
						className="space-y-5"
						onSubmit={(event) => {
							event.preventDefault();
							setFormStatus("Account details are ready to submit.");
						}}
					>
						<div className="grid grid-cols-2 gap-4">
							<InputGroup label="First Name" placeholder="Ava" type="text" />
							<InputGroup label="Last Name" placeholder="Reyes" type="text" />
						</div>

						<InputGroup
							label="Email"
							placeholder="ava@studio.com"
							type="email"
						/>

						<div className="space-y-2">
							<label
								htmlFor="password"
								className="text-sm font-medium text-white"
							>
								Password
							</label>
							<div className="relative">
								<input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									minLength={8}
									required
									autoComplete="new-password"
									className="w-full bg-brand-gray border-none rounded-xl h-11 px-4 pr-12 text-sm text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-white/20 transition-shadow duration-200"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((visible) => !visible)}
									aria-label={showPassword ? "Hide password" : "Show password"}
									className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-200"
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4" aria-hidden="true" />
									) : (
										<Eye className="h-4 w-4" aria-hidden="true" />
									)}
								</button>
							</div>
							<p className="text-xs text-white/30">
								Requires at least 8 symbols.
							</p>
						</div>

						<button
							type="submit"
							className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] mt-4 text-sm transition-all duration-200"
						>
							Create Account
						</button>
					</form>

					<p
						className="min-h-5 text-center text-sm text-white/60"
						role="status"
					>
						{formStatus}
					</p>

					<p className="text-center text-sm text-white/40">
						Member of the team?{" "}
						<a
							href="#"
							className="font-medium text-white underline-offset-4 hover:underline"
						>
							Log in
						</a>
					</p>
				</motion.div>
			</section>
		</main>
	);
}

function StepItem({
	number,
	text,
	active = false,
}: {
	number: number;
	text: string;
	active?: boolean;
}) {
	return (
		<div
			className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition-colors duration-300 ${
				active
					? "bg-white text-black border border-white"
					: "bg-brand-gray text-white border-none"
			}`}
		>
			<span
				className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
					active ? "bg-black text-white" : "bg-white/10 text-white/40"
				}`}
			>
				{number}
			</span>
			{text}
		</div>
	);
}

function SocialButton({
	icon: Icon,
	label,
	onClick,
}: {
	icon: LucideIcon;
	label: string;
	onClick: () => void;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex h-12 items-center justify-center gap-2.5 bg-black border border-white/10 rounded-xl hover:bg-white/5 text-sm font-medium text-white transition-colors duration-200"
		>
			<Icon className="h-4 w-4" aria-hidden="true" />
			{label}
		</button>
	);
}

function InputGroup({
	label,
	placeholder,
	type,
}: {
	label: string;
	placeholder: string;
	type: string;
}) {
	const id = label.toLowerCase().replace(/\s+/g, "-");
	return (
		<div className="space-y-2">
			<label htmlFor={id} className="text-sm font-medium text-white">
				{label}
			</label>
			<input
				id={id}
				name={id}
				type={type}
				required
				placeholder={placeholder}
				className="w-full bg-brand-gray border-none rounded-xl h-11 px-4 text-sm text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-white/20 transition-shadow duration-200"
			/>
		</div>
	);
}
