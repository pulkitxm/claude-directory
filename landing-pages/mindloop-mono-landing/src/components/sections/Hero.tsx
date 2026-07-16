import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { type FormEvent, useState } from "react";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import { Input } from "@/components/ui/input";
import { fadeUp } from "@/lib/motion";

const HERO_VIDEO =
	"./assets/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4";

const AVATARS = [
	{ src: avatar1, alt: "Subscriber avatar" },
	{ src: avatar2, alt: "Subscriber avatar" },
	{ src: avatar3, alt: "Subscriber avatar" },
];

export function Hero() {
	const [email, setEmail] = useState("");
	const [subscribed, setSubscribed] = useState(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!email.trim()) return;
		setSubscribed(true);
	};

	return (
		<section
			id="home"
			className="relative flex min-h-screen items-center justify-center overflow-hidden"
		>
			<video
				className="absolute inset-0 h-full w-full object-cover"
				src={HERO_VIDEO}
				autoPlay
				loop
				muted
				playsInline
				aria-hidden
			/>
			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent" />

			<div className="relative z-10 flex w-full flex-col items-center px-6 pt-28 text-center md:pt-32">
				<motion.div {...fadeUp(0)} className="mb-8 flex items-center gap-3">
					<div className="flex -space-x-2">
						{AVATARS.map(({ src, alt }, i) => (
							<img
								key={i}
								src={src}
								alt={alt}
								width={32}
								height={32}
								className="h-8 w-8 rounded-full border-2 border-background object-cover"
							/>
						))}
					</div>
					<p className="text-sm text-muted-foreground">
						7,000+ people already subscribed
					</p>
				</motion.div>

				<motion.h1
					{...fadeUp(0.1)}
					className="text-5xl font-medium tracking-[-2px] md:text-7xl lg:text-8xl"
				>
					Get <em className="font-serif font-normal italic">Inspired</em> with
					Us
				</motion.h1>

				<motion.p
					{...fadeUp(0.2)}
					className="mt-6 max-w-xl text-lg text-hero-subtitle"
				>
					Join our feed for meaningful updates, news around technology and a
					shared journey toward depth and direction.
				</motion.p>

				<motion.form
					{...fadeUp(0.3)}
					onSubmit={handleSubmit}
					className="liquid-glass mt-10 flex w-full max-w-lg items-center gap-2 rounded-full p-2"
				>
					<label htmlFor="hero-email" className="sr-only">
						Email address
					</label>
					<Input
						id="hero-email"
						type="email"
						required
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setSubscribed(false);
						}}
						placeholder="Enter your email"
						className="h-auto flex-1 border-0 bg-transparent px-5 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
					/>
					<motion.button
						type="submit"
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.98 }}
						className="flex shrink-0 items-center gap-2 rounded-full bg-foreground px-8 py-3 text-sm font-semibold tracking-wide text-background"
					>
						{subscribed ? (
							<>
								<Check className="h-4 w-4" strokeWidth={3} aria-hidden />
								<span>SUBSCRIBED</span>
							</>
						) : (
							"SUBSCRIBE"
						)}
					</motion.button>
				</motion.form>
			</div>
		</section>
	);
}
