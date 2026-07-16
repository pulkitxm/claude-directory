import { motion } from "framer-motion";

interface ShinyTextProps {
	text: string;
	speed?: number;
	spread?: number;
	baseColor?: string;
	shineColor?: string;
	className?: string;
}

export default function ShinyText({
	text,
	speed = 3,
	spread = 100,
	baseColor = "#64CEFB",
	shineColor = "#ffffff",
	className = "",
}: ShinyTextProps) {
	return (
		<motion.span
			className={className}
			style={{
				backgroundImage: `linear-gradient(${spread}deg, ${baseColor} 35%, ${shineColor} 50%, ${baseColor} 65%)`,
				backgroundSize: "200% 100%",
				backgroundRepeat: "repeat",
				WebkitBackgroundClip: "text",
				backgroundClip: "text",
				WebkitTextFillColor: "transparent",
				color: "transparent",
			}}
			initial={{ backgroundPosition: "100% 0%" }}
			animate={{ backgroundPosition: "-100% 0%" }}
			transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
		>
			{text}
		</motion.span>
	);
}
