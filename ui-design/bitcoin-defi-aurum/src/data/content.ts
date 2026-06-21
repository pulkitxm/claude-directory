import {
	Activity,
	Bitcoin,
	Boxes,
	Cpu,
	Fingerprint,
	Gem,
	Globe,
	KeyRound,
	Layers,
	Lock,
	Network,
	ShieldCheck,
	TrendingUp,
	Wallet,
	Zap,
	type LucideIcon,
} from "lucide-react";

export const BRAND = {
	name: "AURUM",
	tagline: "Bitcoin DeFi Protocol",
};

export const NAV_LINKS = [
	{ label: "Protocol", href: "#features" },
	{ label: "How_It_Works", href: "#how" },
	{ label: "Vaults", href: "#pricing" },
	{ label: "Signal", href: "#testimonials" },
];

/* ── Hero floating stat cards (orbit the orb) ── */
export interface FloatStat {
	icon: LucideIcon;
	label: string;
	value: string;
	delta: string;
	tone: "orange" | "gold";
}

export const FLOAT_STATS: FloatStat[] = [
	{
		icon: TrendingUp,
		label: "Vault APY",
		value: "8.42%",
		delta: "+0.31",
		tone: "orange",
	},
	{
		icon: Wallet,
		label: "Your Yield",
		value: "₿ 0.0241",
		delta: "+12.4%",
		tone: "gold",
	},
	{
		icon: ShieldCheck,
		label: "Collateral",
		value: "187%",
		delta: "Healthy",
		tone: "orange",
	},
];

/* ── Stats ticker (scrolling marquee under hero) ── */
export interface TickerItem {
	label: string;
	value: string;
}

export const TICKER_ITEMS: TickerItem[] = [
	{ label: "BTC / USD", value: "$103,418.22" },
	{ label: "TVL", value: "$4.71B" },
	{ label: "Network Hashrate", value: "642 EH/s" },
	{ label: "Vaults Active", value: "128,940" },
	{ label: "Avg Vault APY", value: "8.42%" },
	{ label: "Block Height", value: "#874,201" },
	{ label: "Sats Secured", value: "41,200 BTC" },
	{ label: "Gas (Lightning)", value: "0.3 sat/vB" },
	{ label: "Uptime", value: "99.998%" },
];

/* ── Headline stats band (count-up) ── */
export interface BigStat {
	prefix?: string;
	value: number;
	suffix?: string;
	decimals?: number;
	label: string;
	tone: "orange" | "gold" | "white";
}

export const BIG_STATS: BigStat[] = [
	{
		prefix: "$",
		value: 4.71,
		suffix: "B",
		decimals: 2,
		label: "Total Value Locked",
		tone: "orange",
	},
	{ value: 128, suffix: "K+", label: "Active Vaults", tone: "gold" },
	{
		value: 99.99,
		suffix: "%",
		decimals: 2,
		label: "Protocol Uptime",
		tone: "white",
	},
	{
		value: 41200,
		suffix: " BTC",
		label: "Digital Gold Secured",
		tone: "orange",
	},
];

/* ── Features grid (background icon watermarks) ── */
export interface Feature {
	icon: LucideIcon;
	title: string;
	description: string;
	tag: string;
}

export const FEATURES: Feature[] = [
	{
		icon: KeyRound,
		title: "Non-Custodial Vaults",
		description:
			"Your keys, your coin. Sign every action from your own wallet — AURUM never touches your private keys or takes custody of a single sat.",
		tag: "self_sovereign",
	},
	{
		icon: Zap,
		title: "Lightning Settlement",
		description:
			"Deposits, swaps, and yield claims settle in milliseconds over the Lightning Network with sub-satoshi routing fees.",
		tag: "instant",
	},
	{
		icon: Lock,
		title: "Audited Smart Contracts",
		description:
			"Every contract is formally verified and audited by three independent firms. Reserves are provable on-chain, 24/7.",
		tag: "verified",
	},
	{
		icon: Layers,
		title: "Composable Yield Layers",
		description:
			"Stack staking, lending, and liquidity strategies into a single position. Rebalancing happens block-by-block, automatically.",
		tag: "composable",
	},
	{
		icon: Globe,
		title: "Borderless Access",
		description:
			"A permissionless protocol with no gatekeepers. Connect from anywhere on Earth and put your Bitcoin to work in seconds.",
		tag: "permissionless",
	},
	{
		icon: Cpu,
		title: "MEV-Resistant Engine",
		description:
			"A deterministic matching engine with encrypted mempool ordering shields every position from front-running and sandwich attacks.",
		tag: "protected",
	},
];

/* ── How It Works (blockchain timeline) ── */
export interface Step {
	icon: LucideIcon;
	title: string;
	description: string;
	hash: string;
}

export const STEPS: Step[] = [
	{
		icon: Wallet,
		title: "Connect Your Wallet",
		description:
			"Link any Bitcoin or Lightning wallet in one click. No sign-ups, no KYC, no email — your wallet is your identity.",
		hash: "0x9f2a…41be",
	},
	{
		icon: Boxes,
		title: "Open a Vault",
		description:
			"Deposit BTC into a non-custodial vault and pick a strategy. Your collateral is locked in an audited contract you can verify yourself.",
		hash: "0x3c7d…0a12",
	},
	{
		icon: Activity,
		title: "Earn On-Chain Yield",
		description:
			"Watch real, provable yield accrue every block. Strategies auto-compound while you stay in full control of your keys.",
		hash: "0xb14e…77fd",
	},
	{
		icon: Gem,
		title: "Withdraw Anytime",
		description:
			"Claim your principal and yield instantly over Lightning. No lockups, no withdrawal queues — your digital gold, on demand.",
		hash: "0x6a90…cc38",
	},
];

/* ── Pricing tiers ── */
export interface PricingTier {
	name: string;
	price: string;
	cadence: string;
	blurb: string;
	features: string[];
	cta: string;
	popular?: boolean;
	icon: LucideIcon;
}

export const PRICING: PricingTier[] = [
	{
		name: "Satoshi",
		price: "0%",
		cadence: "protocol fee",
		blurb: "For self-sovereign individuals putting their first sats to work.",
		icon: Bitcoin,
		features: [
			"Non-custodial vaults",
			"Up to ₿ 1 deposited",
			"Core yield strategies",
			"Lightning withdrawals",
			"Community support",
		],
		cta: "Start Stacking",
	},
	{
		name: "Sovereign",
		price: "0.4%",
		cadence: "on yield earned",
		blurb: "For active stackers compounding across multiple strategies.",
		icon: Network,
		popular: true,
		features: [
			"Everything in Satoshi",
			"Unlimited deposits",
			"Composable yield layers",
			"MEV-resistant routing",
			"Priority Lightning settlement",
			"Advanced position analytics",
		],
		cta: "Go Sovereign",
	},
	{
		name: "Treasury",
		price: "Custom",
		cadence: "institutional",
		blurb: "For funds & treasuries securing Bitcoin at institutional scale.",
		icon: Fingerprint,
		features: [
			"Everything in Sovereign",
			"Multi-sig & MPC vaults",
			"Dedicated yield desk",
			"SLA-backed 99.99% uptime",
			"On-chain proof-of-reserves API",
			"White-glove onboarding",
		],
		cta: "Talk to Desk",
	},
];

/* ── Testimonials ── */
export interface Testimonial {
	quote: string;
	name: string;
	role: string;
	initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
	{
		quote:
			"AURUM is the first DeFi protocol that actually respects Bitcoin's ethos. Non-custodial, provable reserves, and yield that doesn't keep me up at night.",
		name: "Satoshi Vega",
		role: "Independent Stacker",
		initials: "SV",
	},
	{
		quote:
			"We moved our entire treasury onto AURUM vaults. The proof-of-reserves API and multi-sig support made the risk committee comfortable in a single call.",
		name: "Lena Okafor",
		role: "CFO, Meridian Capital",
		initials: "LO",
	},
	{
		quote:
			"Lightning settlement is unreal. Yield claims hit my wallet before I can switch tabs. This is what on-chain finance was supposed to feel like.",
		name: "Hiro Tanaka",
		role: "Protocol Engineer",
		initials: "HT",
	},
	{
		quote:
			"I've audited a dozen yield protocols. AURUM's formally verified contracts and encrypted mempool ordering are genuinely best-in-class.",
		name: "Dmitri Volkov",
		role: "Smart Contract Auditor",
		initials: "DV",
	},
];

/* ── Trust / partner logos (text wordmarks, vendored-free) ── */
export const TRUST_BADGES = [
	"CertiK",
	"Trail of Bits",
	"OpenZeppelin",
	"Chainalysis",
	"Halborn",
];

export { Bitcoin, ShieldCheck };
