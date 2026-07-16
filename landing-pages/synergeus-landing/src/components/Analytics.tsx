import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Info } from "lucide-react";
import { useRef } from "react";
import { useCountUp } from "../hooks/useCountUp";
import { ASSETS } from "../lib/assets";

const BARS = [
	{
		label: "Income",
		value: "$15,500",
		width: "75%",
		fill: "linear-gradient(90deg, #1DC47D 60.8%, rgba(29,196,125,0) 100%)",
	},
	{
		label: "Investment",
		value: "$4,250",
		width: "45%",
		fill: "linear-gradient(90deg, #B48F17 55.74%, rgba(180,143,23,0) 100%)",
	},
	{
		label: "Expenses",
		value: "$8,200",
		width: "60%",
		fill: "linear-gradient(90deg, #FFF 52.46%, rgba(255,255,255,0) 100%)",
	},
];

export default function Analytics() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const monthlyTotal = useCountUp(14250, isInView, 100);
	const dailyAmount = useCountUp(925, isInView, 10);

	return (
		<section
			className="overflow-hidden analytics-section"
			style={{ background: "#000", padding: "80px 48px" }}
		>
			{/* Header */}
			<div
				ref={ref}
				className="section-heading analytics-heading"
				style={{ textAlign: "center", marginBottom: 64 }}
			>
				<div
					className="font-heading"
					style={{
						fontSize: 12,
						fontWeight: 500,
						letterSpacing: 2,
						color: "rgba(255,255,255,0.50)",
						marginBottom: 16,
					}}
				>
					ANALYTICS
				</div>

				<motion.h2
					className="section-title"
					initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
					animate={
						isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined
					}
					transition={{ duration: 0.8, ease: "easeOut" }}
					style={{ margin: 0, color: "#fff" }}
				>
					<span
						className="font-heading"
						style={{
							display: "block",
							fontSize: 72,
							fontWeight: 400,
							lineHeight: 1,
							letterSpacing: "-1.02px",
						}}
					>
						Smarter cash flow
					</span>
					<span
						className="font-serif"
						style={{
							display: "block",
							fontSize: 72,
							fontWeight: 400,
							lineHeight: 1,
							letterSpacing: "-1.02px",
							fontStyle: "italic",
						}}
					>
						insights at a glance
					</span>
				</motion.h2>

				<motion.p
					initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
					animate={
						isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined
					}
					transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
					className="font-heading"
					style={{
						fontSize: 16,
						fontWeight: 400,
						color: "rgba(255,255,255,0.60)",
						marginTop: 16,
					}}
				>
					Keep your income and expense in sync with real-time AI
				</motion.p>
			</div>

			{/* Cards row */}
			<div
				className="analytics-grid"
				style={{
					display: "flex",
					gap: 16,
					alignItems: "stretch",
					maxWidth: 1200,
					margin: "0 auto",
				}}
			>
				{/* Card 1 — left (wider) */}
				<motion.div
					className="analytics-card"
					initial={{ opacity: 0, x: -60 }}
					animate={isInView ? { opacity: 1, x: 0 } : undefined}
					transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
					style={{
						flex: 1.4,
						borderRadius: 24,
						overflow: "hidden",
						position: "relative",
						minHeight: 480,
					}}
				>
					<img
						src={ASSETS.block1}
						alt=""
						className="absolute inset-0 h-full w-full object-cover"
						style={{ zIndex: 0 }}
					/>
					<div
						style={{
							position: "absolute",
							inset: 0,
							zIndex: 1,
							background: "rgba(0,0,0,0.35)",
						}}
					/>

					{/* Glass overview card */}
					<div
						style={{
							position: "absolute",
							top: 32,
							left: 32,
							right: 32,
							zIndex: 2,
							borderRadius: 20,
							border: "1px solid rgba(255,255,255,0.20)",
							background: "rgba(255,255,255,0.10)",
							backdropFilter: "blur(56px)",
							WebkitBackdropFilter: "blur(56px)",
							padding: "24px 28px",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginBottom: 8,
							}}
						>
							<span
								className="font-heading"
								style={{
									fontSize: 11,
									fontWeight: 500,
									letterSpacing: 1.5,
									color: "rgba(255,255,255,0.60)",
								}}
							>
								MONTHLY OVERVIEW
							</span>
							<span
								className="font-heading"
								style={{
									fontSize: 11,
									fontWeight: 500,
									letterSpacing: 1.5,
									color: "rgba(255,255,255,0.60)",
									textDecoration: "underline",
								}}
							>
								MONTHLY
							</span>
						</div>

						<div
							className="font-heading"
							style={{
								fontSize: 42,
								fontWeight: 400,
								letterSpacing: "-1px",
								color: "#fff",
								marginBottom: 24,
								fontVariantNumeric: "tabular-nums",
							}}
						>
							{monthlyTotal}
						</div>

						<div
							style={{
								width: "100%",
								borderTop: "1px dashed rgba(255,255,255,0.20)",
								marginBottom: 20,
							}}
						/>

						{BARS.map((bar) => (
							<div key={bar.label} style={{ marginBottom: 16 }}>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<span
										className="font-heading"
										style={{ fontSize: 13, color: "rgba(255,255,255,0.70)" }}
									>
										{bar.label}
									</span>
									<span
										className="font-heading"
										style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}
									>
										{bar.value}
									</span>
								</div>
								<div
									style={{
										height: 5,
										borderRadius: 5,
										width: "100%",
										marginTop: 6,
										position: "relative",
									}}
								>
									<div
										style={{
											position: "absolute",
											inset: 0,
											opacity: 0.13,
											borderRadius: 5,
											background:
												"linear-gradient(90deg, #040504 0%, rgba(4,5,4,0.50) 100%)",
										}}
									/>
									<div
										style={{
											position: "absolute",
											left: 0,
											top: 0,
											height: "100%",
											width: bar.width,
											borderRadius: 5,
											background: bar.fill,
										}}
									/>
								</div>
							</div>
						))}
					</div>

					{/* Bottom text block */}
					<div
						style={{
							position: "absolute",
							bottom: 22,
							left: 32,
							right: 32,
							zIndex: 2,
						}}
					>
						<h3
							className="font-serif"
							style={{
								fontStyle: "italic",
								fontSize: 26,
								fontWeight: 400,
								color: "#fff",
								marginBottom: 8,
								margin: 0,
								marginBlockEnd: 8,
							}}
						>
							See the full picture of your finances.
						</h3>
						<p
							className="font-heading"
							style={{
								fontSize: 13,
								fontWeight: 400,
								lineHeight: 1.6,
								color: "rgba(255,255,255,0.65)",
								margin: 0,
							}}
						>
							AI keeps your income, expenses, and goals effortlessly aligned
							giving you a clearer view of your financial rhythm, smarter
							decisions, and lasting stability.
						</p>
					</div>
				</motion.div>

				{/* Card 2 — right */}
				<motion.div
					className="analytics-card"
					initial={{ opacity: 0, x: 60 }}
					animate={isInView ? { opacity: 1, x: 0 } : undefined}
					transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
					style={{
						flex: 1,
						borderRadius: 24,
						overflow: "hidden",
						position: "relative",
						minHeight: 480,
					}}
				>
					<img
						src={ASSETS.block2}
						alt=""
						className="absolute inset-0 h-full w-full object-cover"
						style={{ zIndex: 0 }}
					/>
					<div
						style={{
							position: "absolute",
							inset: 0,
							zIndex: 1,
							background: "rgba(0,0,0,0.25)",
						}}
					/>

					{/* DAILY tag */}
					<span
						className="font-heading"
						style={{
							position: "absolute",
							top: 24,
							right: 24,
							zIndex: 2,
							fontSize: 11,
							fontWeight: 500,
							letterSpacing: 1.5,
							color: "rgba(255,255,255,0.70)",
							textDecoration: "underline",
						}}
					>
						DAILY
					</span>

					{/* White transaction card */}
					<div
						style={{
							position: "absolute",
							top: 32,
							left: 32,
							zIndex: 2,
							width: 200,
							borderRadius: 16,
							background: "#fff",
							padding: "16px 18px",
							boxShadow: "0 8px 32px rgba(0,0,0,0.20)",
						}}
					>
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<span
								className="font-heading"
								style={{
									fontSize: 22,
									fontWeight: 400,
									color: "#000",
									letterSpacing: "-0.5px",
									fontVariantNumeric: "tabular-nums",
								}}
							>
								{dailyAmount}
							</span>
							<Info size={16} color="rgba(0,0,0,0.35)" />
						</div>
						<div
							className="font-heading"
							style={{
								fontSize: 12,
								color: "rgba(0,0,0,0.45)",
								marginBottom: 14,
							}}
						>
							Sent today
						</div>
						<button
							type="button"
							className="font-heading"
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								background: "#000",
								color: "#fff",
								fontSize: 13,
								fontWeight: 500,
								padding: "10px 14px",
								borderRadius: 9999,
								width: "100%",
								border: "none",
								cursor: "pointer",
							}}
						>
							View transaction
							<span
								style={{
									width: 24,
									height: 24,
									borderRadius: "50%",
									background: "rgba(255,255,255,0.15)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<ArrowUpRight size={13} color="#fff" />
							</span>
						</button>
					</div>

					{/* Portrait */}
					<img
						src={ASSETS.person2}
						alt=""
						style={{
							position: "absolute",
							bottom: 140,
							left: "50%",
							transform: "translateX(-50%)",
							zIndex: 2,
							width: 200,
							height: 240,
							objectFit: "cover",
							objectPosition: "top center",
							borderRadius: 16,
						}}
					/>

					{/* Brand bar */}
					<div
						style={{
							position: "absolute",
							bottom: 160,
							right: 24,
							zIndex: 3,
							display: "flex",
							alignItems: "center",
							gap: 8,
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 8,
								background: "rgba(255,255,255,0.15)",
								backdropFilter: "blur(12px)",
								WebkitBackdropFilter: "blur(12px)",
								borderRadius: 9999,
								padding: "8px 16px 8px 10px",
							}}
						>
							<img
								src={ASSETS.logoLov}
								alt="Synergeus"
								style={{ height: 18, width: "auto" }}
							/>
						</div>
						<button
							type="button"
							style={{
								width: 36,
								height: 36,
								borderRadius: "50%",
								background: "rgba(255,255,255,0.15)",
								backdropFilter: "blur(12px)",
								WebkitBackdropFilter: "blur(12px)",
								border: "none",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								cursor: "pointer",
							}}
						>
							<ArrowUpRight size={16} color="#fff" />
						</button>
					</div>

					{/* Bottom text block */}
					<div
						style={{
							position: "absolute",
							bottom: 22,
							left: 32,
							right: 32,
							zIndex: 2,
						}}
					>
						<h3
							className="font-serif"
							style={{
								fontStyle: "italic",
								fontSize: 24,
								fontWeight: 400,
								color: "#fff",
								marginBottom: 8,
								margin: 0,
								marginBlockEnd: 8,
							}}
						>
							Your money, perfect transactions
						</h3>
						<p
							className="font-heading"
							style={{
								fontSize: 13,
								fontWeight: 400,
								lineHeight: 1.6,
								color: "rgba(255,255,255,0.65)",
								margin: 0,
							}}
						>
							Stay grounded with real-time visibility into where your
							money&rsquo;s going and growing.
						</p>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
