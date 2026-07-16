import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { vendorAsset } from "@/lib/assets";

type NavItem = { label: string; description?: string; external?: boolean };
type NavColumn = { heading: string; items: NavItem[]; groups?: NavItem[][] };
type Announcement = {
	eyebrow: string;
	image: string;
	title: string;
	ctaLabel: string;
};
type NavLink = {
	label: string;
	active?: boolean;
	dropdown?: boolean;
	columns?: NavColumn[];
	extra?: NavColumn;
	announcement?: Announcement;
};

const navLinks: NavLink[] = [
	{
		label: "Solution",
		dropdown: true,
		columns: [
			{
				heading: "Who is it for?",
				items: [
					{ label: "Founders", description: "Ship before you pitch." },
					{ label: "Sales", description: "Build the demo live." },
					{ label: "Product managers", description: "Prototype, don't spec." },
					{ label: "Designers", description: "Your designs, built." },
					{ label: "Marketers", description: "Launch pages in minutes." },
					{ label: "Ops", description: "Tools that fit your flow." },
					{ label: "People", description: "HR tools your team loves." },
				],
			},
		],
		extra: {
			heading: "Use cases",
			items: [
				{ label: "Prototyping", description: "Proof of concept in hours." },
				{ label: "Internal tools", description: "Built for your team." },
			],
		},
	},
	{
		label: "Resources",
		dropdown: true,
		columns: [
			{
				heading: "Resources",
				items: [],
				groups: [
					[
						{ label: "Blog", description: "Ideas, updates, stories." },
						{ label: "Partners", description: "Build more together." },
						{ label: "Templates", description: "Begin with a template." },
						{ label: "Guides", description: "Learn as you build." },
					],
					[
						{
							label: "Connectors",
							description: "Build from what you already use.",
						},
						{ label: "Docs", description: "Everything under the hood." },
					],
				],
			},
		],
		announcement: {
			eyebrow: "Announcement",
			image: vendorAsset("announcement.jpg"),
			title: "Building is just the beginning: Introducing Discoverability",
			ctaLabel: "Learn more",
		},
	},
	{ label: "Community" },
	{ label: "Enterprise" },
	{ label: "Pricing" },
	{ label: "Security" },
];

const ARROW_SRC = vendorAsset("arrow-right.svg");

const ArrowButton = ({ children }: { children: React.ReactNode }) => (
	<button
		className="group relative inline-flex items-center justify-center overflow-hidden"
		style={{
			height: 38,
			padding: "12px 16px",
			gap: 10,
			borderRadius: 9,
			border: "1px solid rgba(250,250,250,0.20)",
			background: "#FFF",
			color: "#111111",
			fontFamily: '"Inter Tight", sans-serif',
			fontSize: 14,
			fontWeight: 500,
			cursor: "pointer",
		}}
	>
		<span>{children}</span>
		<span
			style={{
				position: "relative",
				width: 14,
				height: 14,
				overflow: "hidden",
				display: "inline-block",
			}}
		>
			<img
				src={ARROW_SRC}
				width={14}
				height={14}
				alt=""
				className="absolute inset-0 translate-x-0 group-hover:translate-x-[150%]"
				style={{ transition: "transform 500ms cubic-bezier(0.65,0,0.35,1)" }}
			/>
			<img
				src={ARROW_SRC}
				width={14}
				height={14}
				alt=""
				className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-0"
				style={{ transition: "transform 500ms cubic-bezier(0.65,0,0.35,1)" }}
			/>
		</span>
	</button>
);

const HeroNavbar = () => {
	const [aboutOpen, setAboutOpen] = useState(false);
	const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
	const currentDropdownLink = navLinks.find(
		(l) => l.label === activeDropdown,
	) as
		| (NavLink & {
				columns: NavColumn[];
				extra?: NavColumn;
				announcement?: Announcement;
		  })
		| undefined;
	const aboutLink = navLinks.find((l) => l.label === "Solution") as NavLink & {
		columns: NavColumn[];
		extra: NavColumn;
	};
	void aboutLink;

	return (
		<>
			<div
				aria-hidden
				style={{
					position: "fixed",
					inset: 0,
					zIndex: 40,
					pointerEvents: "none",
					backdropFilter: aboutOpen ? "blur(8px)" : "blur(0px)",
					WebkitBackdropFilter: aboutOpen ? "blur(8px)" : "blur(0px)",
					background: aboutOpen ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0)",
					transition:
						"backdrop-filter 280ms ease, -webkit-backdrop-filter 280ms ease, background 280ms ease",
				}}
			/>

			<nav
				className="fixed top-0 left-0 right-0 z-50 grid items-center hero-nav"
				style={{
					gridTemplateColumns: "1fr auto 1fr",
					background: "color-mix(in oklab, #1c1c1c 75%, transparent)",
					backdropFilter: "blur(12px)",
					WebkitBackdropFilter: "blur(12px)",
					borderBottom: "1px solid rgba(255,255,255,0.06)",
					padding: "0 clamp(1rem, 3vw, 2rem)",
					height: 70,
					fontFamily: '"Inter Tight", sans-serif',
				}}
			>
				<style>{`
          @media (max-width: 1024px) {
            .hero-nav-links { display: none !important; }
            .hero-nav { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 600px) {
            .hero-nav-contact { display: none !important; }
          }
          .about-panel { opacity: 0; pointer-events: none; transition: opacity 220ms ease; }
          .about-panel[data-open="true"] { opacity: 1; pointer-events: auto; }
          .about-panel-inner {
            opacity: 0;
            transform: translateY(-12px);
            transition: opacity 320ms ease, transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
          }
          .about-panel[data-open="true"] .about-panel-inner {
            opacity: 1;
            transform: translateY(0);
            transition-delay: 80ms;
          }
          .about-item {
            color: rgba(255,255,255,0.92);
            font-family: "Inter Tight", sans-serif;
            font-size: 15px;
            font-weight: 600;
            background: transparent;
            border: none;
            padding: 10px 0;
            cursor: pointer;
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            transition: color 180ms ease;
            break-inside: avoid;
          }
          .about-item:hover { color: #fff; }
          .about-item-desc {
            color: rgba(255,255,255,0.55);
            font-size: 13px;
            font-weight: 400;
          }
          .about-heading {
            color: rgba(255,255,255,0.45);
            font-family: "Inter Tight", sans-serif;
            font-size: 12px;
            font-weight: 500;
            margin-bottom: 14px;
            letter-spacing: 0.02em;
          }
          .logo-link {
            position: relative;
            display: inline-block;
            line-height: 0;
            cursor: pointer;
          }
          .logo-img {
            height: 1.1rem;
            width: auto;
            display: block;
          }
          .logo-overlay {
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: 0;
			-webkit-mask: url(${vendorAsset("logo.svg")}) no-repeat center / contain;
			mask: url(${vendorAsset("logo.svg")}) no-repeat center / contain;
            background-image: linear-gradient(
              90deg,
              #ffffff 0,
              #ffffff 33.33%,
              #82BCFF 40%,
              #2483FF 45%,
              #FF66F4 50%,
              #FF3029 55%,
              #FE7B02 60%,
              #ffffff 66.67%,
              #ffffff
            );
            background-size: 300% 100%;
            background-position: 100% 0;
          }
          .logo-link:hover .logo-overlay {
            opacity: 1;
            animation: gradient-sweep 1.2s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards;
          }
        `}</style>

				<div className="flex items-center">
					<a href="/" className="logo-link" aria-label="Lovable">
						<img
							src={vendorAsset("logo.svg")}
							alt="Lovable"
							className="logo-img"
						/>
						<span className="logo-overlay" aria-hidden="true" />
					</a>
				</div>

				<div
					className="flex items-center justify-center hero-nav-links"
					style={{ gap: 4, position: "relative" }}
				>
					{navLinks.map((link) => {
						const hasDropdown = !!link.dropdown;
						const isOpen = hasDropdown && activeDropdown === link.label;
						const highlighted = link.active || isOpen;
						return (
							<button
								key={link.label}
								className="flex items-center transition-colors duration-200"
								style={{
									gap: 4,
									fontFamily: '"Inter Tight", sans-serif',
									fontSize: "0.8rem",
									fontWeight: 500,
									padding: "6px 14px",
									cursor: "pointer",
									background: "transparent",
									border: "none",
									color: highlighted
										? "rgba(255,255,255,0.95)"
										: "rgba(255,255,255,0.65)",
								}}
								onMouseEnter={(e) => {
									if (hasDropdown) {
										setActiveDropdown(link.label);
										setAboutOpen(true);
									} else {
										setActiveDropdown(null);
										setAboutOpen(false);
									}
									if (!link.active)
										e.currentTarget.style.color = "rgba(255,255,255,0.95)";
								}}
								onMouseLeave={(e) => {
									if (!link.active && !isOpen)
										e.currentTarget.style.color = "rgba(255,255,255,0.65)";
								}}
							>
								{link.label}
								{link.dropdown && (
									<ChevronDown
										size={11}
										color="rgba(255,255,255,0.65)"
										style={{
											transition: "transform 220ms ease",
											transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
										}}
									/>
								)}
							</button>
						);
					})}
				</div>

				<div className="flex items-center justify-end" style={{ gap: "1rem" }}>
					<ArrowButton>Open Lovable</ArrowButton>
				</div>
			</nav>

			<div
				className="about-panel"
				data-open={aboutOpen}
				onMouseEnter={() => setAboutOpen(true)}
				onMouseLeave={() => {
					setAboutOpen(false);
					setActiveDropdown(null);
				}}
				style={{
					position: "fixed",
					top: 70,
					left: 0,
					right: 0,
					background: "rgba(15,15,15,0.85)",
					backdropFilter: "blur(18px)",
					WebkitBackdropFilter: "blur(18px)",
					padding: "32px 0 40px",
					zIndex: 60,
				}}
			>
				<div
					className="about-panel-inner"
					style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}
				>
					{currentDropdownLink && (
						<div
							style={{
								display: "grid",
								gridTemplateColumns: "2fr 1fr",
								gap: 64,
							}}
						>
							{currentDropdownLink.columns.map((col) => (
								<div
									key={col.heading}
									style={{
										display: "flex",
										flexDirection: "column",
										borderRight: "1px solid rgba(255,255,255,0.08)",
										paddingRight: 32,
									}}
								>
									<div className="about-heading">{col.heading}</div>
									{col.groups ? (
										<div
											style={{
												display: "grid",
												gridTemplateColumns: "1fr 1fr",
												gap: 48,
											}}
										>
											{col.groups.map((group, gi) => (
												<div
													key={gi}
													style={{ display: "flex", flexDirection: "column" }}
												>
													{group.map((it) => (
														<button
															key={it.label}
															className="about-item"
															style={{ width: "100%" }}
														>
															<span>{it.label}</span>
															{it.description && (
																<span className="about-item-desc">
																	{it.description}
																</span>
															)}
														</button>
													))}
												</div>
											))}
										</div>
									) : (
										<div style={{ columnCount: 2, columnGap: 48 }}>
											{col.items.map((it) => (
												<button
													key={it.label}
													className="about-item"
													style={{ width: "100%" }}
												>
													<span>{it.label}</span>
													{it.description && (
														<span className="about-item-desc">
															{it.description}
														</span>
													)}
												</button>
											))}
										</div>
									)}
								</div>
							))}
							{currentDropdownLink.announcement ? (
								<div style={{ display: "flex", flexDirection: "column" }}>
									<div className="about-heading">
										{currentDropdownLink.announcement.eyebrow}
									</div>
									<button
										className="about-item"
										style={{ padding: 0, gap: 14, alignItems: "stretch" }}
									>
										<div
											style={{
												width: "100%",
												aspectRatio: "16 / 9",
												borderRadius: 10,
												overflow: "hidden",
												background:
													"linear-gradient(135deg, #2a1530 0%, #1a1a1a 60%, #2a1a2a 100%)",
											}}
										>
											<img
												src={currentDropdownLink.announcement.image}
												alt=""
												onError={(e) => {
													(e.currentTarget as HTMLImageElement).style.display =
														"none";
												}}
												style={{
													width: "100%",
													height: "100%",
													objectFit: "cover",
													display: "block",
												}}
											/>
										</div>
										<span
											style={{
												fontSize: 15,
												fontWeight: 600,
												lineHeight: 1.35,
											}}
										>
											{currentDropdownLink.announcement.title}
										</span>
										<span
											style={{
												display: "inline-flex",
												alignItems: "center",
												gap: 6,
												color: "rgba(255,255,255,0.85)",
												fontSize: 13,
												fontWeight: 500,
											}}
										>
											{currentDropdownLink.announcement.ctaLabel}
											<span style={{ transform: "translateY(-1px)" }}>›</span>
										</span>
									</button>
								</div>
							) : currentDropdownLink.extra ? (
								<div style={{ display: "flex", flexDirection: "column" }}>
									<div className="about-heading">
										{currentDropdownLink.extra.heading}
									</div>
									{currentDropdownLink.extra.items.map((it) => (
										<button key={it.label} className="about-item">
											<span
												style={{
													display: "inline-flex",
													alignItems: "center",
													gap: 6,
												}}
											>
												{it.label}
												{it.external && (
													<span style={{ transform: "translateY(-1px)" }}>
														↗
													</span>
												)}
											</span>
											{it.description && (
												<span className="about-item-desc">
													{it.description}
												</span>
											)}
										</button>
									))}
								</div>
							) : null}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default HeroNavbar;
