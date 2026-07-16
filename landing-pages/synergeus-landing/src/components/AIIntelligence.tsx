import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ASSETS } from "../lib/assets";
import CategorizationTree from "./CategorizationTree";

const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

const QUESTIONS = [
	{
		q: "Can I afford to invest $500 this month?",
		a: "Based on your current income and expenses, you'll have around $620 in available balance after bills. Investing $500 is within reach - but consider saving at least $200 as an emergency buffer.",
	},
	{
		q: "When will I reach my savings goal?",
		a: "At your current savings rate of $850/month, you'll reach your $10,000 goal in approximately 8 months. Cutting discretionary spending by 15% could shave off 3 weeks.",
	},
	{
		q: "How much did I spend on food last month?",
		a: "You spent $643 on food in March - $421 on groceries and $222 on dining out. That's 18% above your monthly food budget of $545.",
	},
];

// Shared bottom title/description block for every card.
function CardBottom({ title, desc }: { title: string; desc: string }) {
	return (
		<div
			style={{
				position: "absolute",
				bottom: 28,
				left: 24,
				right: 24,
				zIndex: 2,
			}}
		>
			<h3
				style={{
					fontFamily: '"Instrument Serif", serif',
					fontStyle: "italic",
					fontSize: 26,
					fontWeight: 400,
					color: "#fff",
					marginBottom: 8,
					margin: 0,
					marginBlockEnd: 8,
				}}
			>
				{title}
			</h3>
			<p
				style={{
					fontFamily: '"Inter Tight", sans-serif',
					fontSize: 13,
					color: "rgba(255,255,255,0.65)",
					lineHeight: 1.6,
					margin: 0,
				}}
			>
				{desc}
			</p>
		</div>
	);
}

export default function AIIntelligence() {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const [qIdx, setQIdx] = useState(0);
	useEffect(() => {
		const interval = setInterval(() => {
			setQIdx((i) => (i + 1) % QUESTIONS.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	const current = QUESTIONS[qIdx];

	return (
		<section
			className="intelligence-section"
			style={{
				background: "#000",
				padding: "80px 48px 80px",
				overflow: "hidden",
			}}
		>
			{/* Header */}
			<div
				ref={ref}
				className="section-heading intelligence-heading"
				style={{ textAlign: "center", marginBottom: 64 }}
			>
				<div
					style={{
						fontFamily: '"Inter Tight", sans-serif',
						fontSize: 12,
						fontWeight: 500,
						letterSpacing: 2,
						color: "rgba(255,255,255,0.50)",
						marginBottom: 16,
					}}
				>
					AI INTELLIGENCE
				</div>

				<motion.h2
					className="section-title intelligence-title"
					initial={{ opacity: 0, filter: "blur(12px)", y: 30 }}
					animate={
						isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined
					}
					transition={{ duration: 0.8, ease: "easeOut" }}
					style={{ margin: 0, color: "#fff" }}
				>
					<span
						style={{
							fontFamily: '"Inter Tight", sans-serif',
							fontSize: 72,
							fontWeight: 400,
							letterSpacing: "-1.02px",
							color: "#fff",
						}}
					>
						Your personal{" "}
					</span>
					<span
						style={{
							fontFamily: '"Instrument Serif", serif',
							fontStyle: "italic",
							fontSize: 72,
							fontWeight: 400,
							letterSpacing: "-1.02px",
							color: "#fff",
						}}
					>
						AI advisor
					</span>
				</motion.h2>

				<motion.p
					initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
					animate={
						isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined
					}
					transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
					style={{
						fontFamily: '"Inter Tight", sans-serif',
						fontSize: 16,
						fontWeight: 400,
						color: "rgba(255,255,255,0.60)",
						lineHeight: 1.6,
						textAlign: "center",
						marginTop: 16,
					}}
				>
					Experience the power of artificial intelligence working for your
					financial well being
				</motion.p>
			</div>

			{/* Cards row */}
			<div
				className="intelligence-grid"
				style={{
					display: "flex",
					gap: 16,
					alignItems: "stretch",
					maxWidth: 1200,
					margin: "0 auto",
				}}
			>
				{/* ---------- CARD 1 — Natural Language Queries ---------- */}
				<motion.div
					className="intelligence-card"
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : undefined}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
					style={{
						flex: 1,
						minHeight: 560,
						borderRadius: 24,
						overflow: "hidden",
						position: "relative",
					}}
				>
					<img
						src={ASSETS.back31}
						alt=""
						style={{
							position: "absolute",
							inset: 0,
							width: "100%",
							height: "100%",
							objectFit: "cover",
							zIndex: 0,
						}}
					/>
					<div
						style={{
							position: "absolute",
							inset: 0,
							zIndex: 1,
							background: "rgba(0,0,0,0.30)",
						}}
					/>

					{/* Glass UI card */}
					<div
						style={{
							position: "absolute",
							top: 32,
							left: 24,
							right: 24,
							zIndex: 2,
							borderRadius: 20,
							border: "1px solid rgba(255,255,255,0.20)",
							background: "rgba(255,255,255,0.10)",
							backdropFilter: "blur(56px)",
							WebkitBackdropFilter: "blur(56px)",
							padding: 20,
						}}
					>
						{/* Header row */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 10,
								marginBottom: 16,
							}}
						>
							<div
								style={{
									width: 40,
									height: 40,
									background: "#fff",
									borderRadius: 12,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<img
									src={ASSETS.logoLov}
									alt=""
									style={{ width: 22, filter: "invert(1)" }}
								/>
							</div>
							<span
								style={{
									fontFamily: '"Inter Tight", sans-serif',
									fontSize: 16,
									fontWeight: 500,
									color: "#fff",
								}}
							>
								Synergeus
							</span>
						</div>

						{/* Divider */}
						<div
							style={{
								borderTop: "1px dashed rgba(255,255,255,0.20)",
								marginBottom: 16,
							}}
						/>

						{/* Rotating Q/A */}
						<div style={{ position: "relative", height: 160 }}>
							<AnimatePresence mode="wait">
								<motion.div
									key={qIdx}
									initial={{ opacity: 0, filter: "blur(8px)", y: 8 }}
									animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
									exit={{ opacity: 0, filter: "blur(8px)", y: -6 }}
									transition={{ duration: 0.6, ease: EASE_SOFT }}
									style={{ position: "absolute", inset: 0 }}
								>
									<div
										style={{
											fontFamily: '"Inter Tight", sans-serif',
											fontSize: 16,
											fontWeight: 500,
											color: "#fff",
											marginBottom: 12,
											lineHeight: 1.4,
										}}
									>
										{current.q}
									</div>
									<div
										style={{
											display: "flex",
											gap: 8,
											alignItems: "flex-start",
										}}
									>
										<div
											style={{
												width: 20,
												height: 20,
												borderRadius: 6,
												background: "rgba(255,255,255,0.15)",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												flexShrink: 0,
											}}
										>
											<img
												src={ASSETS.logoLov}
												alt=""
												style={{ width: 12, opacity: 0.8 }}
											/>
										</div>
										<div
											style={{
												fontFamily: '"Inter Tight", sans-serif',
												fontSize: 12,
												fontWeight: 400,
												lineHeight: 1.6,
												color: "rgba(255,255,255,0.55)",
											}}
										>
											{current.a}
										</div>
									</div>
								</motion.div>
							</AnimatePresence>
						</div>

						{/* Bottom row */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								marginTop: 16,
							}}
						>
							<button
								type="button"
								style={{
									display: "flex",
									alignItems: "center",
									gap: 8,
									background: "#fff",
									color: "#000",
									fontFamily: '"Inter Tight", sans-serif',
									fontSize: 13,
									fontWeight: 500,
									padding: "6px 6px 6px 16px",
									borderRadius: 9999,
									border: "none",
									cursor: "pointer",
								}}
							>
								View transaction
								<span
									style={{
										width: 22,
										height: 22,
										borderRadius: "50%",
										background: "#000",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<ArrowUpRight size={12} color="#fff" />
								</span>
							</button>
							<a
								href="#"
								style={{
									fontFamily: '"Inter Tight", sans-serif',
									fontSize: 13,
									fontWeight: 500,
									color: "rgba(255,255,255,0.80)",
									textDecoration: "underline",
									cursor: "pointer",
								}}
							>
								ASK YOURS
							</a>
						</div>
					</div>

					<CardBottom
						title="Natural Language Queries"
						desc="Ask questions about your finances in plain English and get instant, accurate answers."
					/>
				</motion.div>

				{/* ---------- CARD 2 — Predictive Analysis ---------- */}
				<motion.div
					className="intelligence-card"
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : undefined}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
					style={{
						flex: 1,
						minHeight: 560,
						borderRadius: 24,
						overflow: "hidden",
						position: "relative",
					}}
				>
					<img
						src={ASSETS.back32}
						alt=""
						style={{
							position: "absolute",
							inset: 0,
							width: "100%",
							height: "100%",
							objectFit: "cover",
							zIndex: 0,
						}}
					/>
					<div
						style={{
							position: "absolute",
							inset: 0,
							zIndex: 1,
							background: "rgba(0,0,0,0.20)",
						}}
					/>

					{/* White info block */}
					<div
						style={{
							position: "absolute",
							top: 32,
							left: 24,
							right: 24,
							zIndex: 2,
						}}
					>
						<div
							style={{
								borderRadius: 20,
								background: "rgba(255,255,255,0.92)",
								padding: "24px 20px 20px",
								textAlign: "center",
							}}
						>
							<div
								style={{
									fontFamily: '"Inter Tight", sans-serif',
									fontSize: 12,
									fontWeight: 400,
									color: "rgba(0,0,0,0.50)",
									lineHeight: 1.5,
									marginBottom: 4,
								}}
							>
								Expenses
								<br />
								expected to rise
							</div>

							<div
								style={{
									fontFamily: '"Instrument Serif", serif',
									fontStyle: "italic",
									fontSize: 52,
									fontWeight: 400,
									color: "#000",
									letterSpacing: "-1px",
									lineHeight: 1,
								}}
							>
								3%
							</div>

							<div style={{ height: 16 }} />

							{/* Chart */}
							<div
								style={{
									width: 280,
									maxWidth: "100%",
									height: 145,
									position: "relative",
									overflow: "visible",
									margin: "0 auto",
								}}
							>
								<svg
									viewBox="60 -25 220 145"
									width="100%"
									height="100%"
									preserveAspectRatio="none"
									style={{ overflow: "visible" }}
								>
									<defs>
										<linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor="rgba(180,210,80,0.85)" />
											<stop offset="100%" stopColor="rgba(180,210,80,0.10)" />
										</linearGradient>
										<clipPath id="reveal">
											<motion.rect
												x={60}
												y={-25}
												height={145}
												initial={{ width: 0 }}
												animate={isInView ? { width: 220 } : undefined}
												transition={{
													duration: 1.4,
													ease: "easeOut",
													delay: 0.3,
												}}
											/>
										</clipPath>
									</defs>

									<g clipPath="url(#reveal)">
										{/* Filled area */}
										<path
											d="M 60 75 L 150 20 L 280 28 L 280 120 L 60 120 Z"
											fill="url(#areaFill)"
										/>
										{/* Top stroke */}
										<path
											d="M 60 75 L 150 20 L 280 28"
											stroke="#8DB800"
											strokeWidth={3}
											strokeLinejoin="round"
											strokeLinecap="round"
											fill="none"
										/>
										{/* Dashed guides */}
										<line
											x1={60}
											y1={75}
											x2={60}
											y2={120}
											stroke="#8DB800"
											strokeWidth={1}
											strokeDasharray="3 3"
											opacity={0.6}
										/>
										<line
											x1={280}
											y1={28}
											x2={280}
											y2={120}
											stroke="#8DB800"
											strokeWidth={1}
											strokeDasharray="3 3"
											opacity={0.6}
										/>
									</g>

									{/* Connector dot -> peak */}
									<motion.line
										x1={150}
										y1={-15}
										x2={150}
										y2={20}
										stroke="#1DC47D"
										strokeWidth={1.2}
										initial={{ pathLength: 0 }}
										animate={isInView ? { pathLength: 1 } : undefined}
										transition={{ duration: 0.5, ease: "easeOut", delay: 1.4 }}
									/>

									{/* Floating green dot */}
									<motion.circle
										cx={150}
										cy={-15}
										r={4.5}
										fill="#1DC47D"
										initial={{ scale: 0 }}
										animate={isInView ? { scale: 1 } : undefined}
										transition={{ duration: 0.3, ease: "easeOut", delay: 1.7 }}
										style={{ transformOrigin: "150px -15px" }}
									/>
								</svg>
							</div>

							{/* Tip pill */}
							<div
								style={{
									borderRadius: 9999,
									border: "1px solid rgba(0,0,0,0.12)",
									background: "rgba(255,255,255,0.80)",
									backdropFilter: "blur(8px)",
									WebkitBackdropFilter: "blur(8px)",
									padding: "8px 16px",
									marginTop: 16,
									display: "inline-block",
									fontFamily: '"Inter Tight", sans-serif',
									fontSize: 11,
									color: "rgba(0,0,0,0.60)",
									textAlign: "center",
								}}
							>
								Tip: Reduce subscriptions to maintain savings target.
							</div>
						</div>
					</div>

					<CardBottom
						title="Predictive Analysis"
						desc="AI algorithms analyze patterns to forecast future expenses and income trends."
					/>
				</motion.div>

				{/* ---------- CARD 3 — Smart Categorization ---------- */}
				<motion.div
					className="intelligence-card"
					initial={{ opacity: 0, y: 40 }}
					animate={isInView ? { opacity: 1, y: 0 } : undefined}
					transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
					style={{
						flex: 1,
						minHeight: 560,
						borderRadius: 24,
						overflow: "hidden",
						position: "relative",
					}}
				>
					<img
						src={ASSETS.back33}
						alt=""
						style={{
							position: "absolute",
							inset: 0,
							width: "100%",
							height: "100%",
							objectFit: "cover",
							zIndex: 0,
						}}
					/>
					<div
						style={{
							position: "absolute",
							inset: 0,
							zIndex: 1,
							background: "rgba(0,0,0,0.30)",
						}}
					/>

					{/* Categorization tree */}
					<div
						style={{
							position: "absolute",
							top: 32,
							left: 16,
							right: 16,
							bottom: 110,
							zIndex: 2,
						}}
					>
						<CategorizationTree isInView={isInView} />
					</div>

					<CardBottom
						title="Smart Categorization"
						desc="Automatically categorize transactions with machine learning that improves over time."
					/>
				</motion.div>
			</div>
		</section>
	);
}
