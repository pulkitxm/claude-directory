/* All page copy + data in one place — components stay presentational, content
   is easy to scan and edit, and nothing is hard-coded mid-markup. Northwind is
   a fictional enterprise operations / workflow platform. */
import {
	Workflow,
	ShieldCheck,
	BarChart3,
	Zap,
	Users,
	Globe2,
	Boxes,
	GitBranch,
	Sparkles,
	type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
	{ label: "Platform", href: "#platform" },
	{ label: "Features", href: "#features" },
	{ label: "Pricing", href: "#pricing" },
	{ label: "FAQ", href: "#faq" },
] as const;

/* Trust strip — fictional customer logos rendered as wordmarks. */
export const TRUST_LOGOS = [
	"Vantstorm",
	"Helios",
	"Northpeak",
	"Quantana",
	"Lumen Labs",
	"Cedarworks",
	"Aerolux",
	"Mintwave",
] as const;

/* Stats band. */
export const STATS: { value: string; label: string }[] = [
	{ value: "12,000+", label: "Teams onboarded" },
	{ value: "99.99%", label: "Uptime SLA" },
	{ value: "4.9/5", label: "Avg. customer rating" },
	{ value: "180+", label: "Countries served" },
];

/* Compact feature grid (3-up cards). */
export const FEATURE_CARDS: {
	icon: LucideIcon;
	title: string;
	body: string;
}[] = [
	{
		icon: Workflow,
		title: "Visual workflow builder",
		body: "Compose multi-step operations on a drag-and-drop canvas. No glue code, no brittle scripts — just flows your whole team can read.",
	},
	{
		icon: ShieldCheck,
		title: "Enterprise-grade security",
		body: "SOC 2 Type II, SSO, SCIM, and granular roles out of the box. Audit every action with an immutable, exportable log.",
	},
	{
		icon: BarChart3,
		title: "Insight that compounds",
		body: "Live dashboards turn raw operational data into decisions, with anomaly alerts that reach the right person automatically.",
	},
	{
		icon: Boxes,
		title: "300+ native integrations",
		body: "Connect the stack you already run — Salesforce, Slack, Snowflake, Stripe — with first-party, fully-maintained connectors.",
	},
	{
		icon: GitBranch,
		title: "Versioned environments",
		body: "Branch, preview, and roll back any change. Ship to production with the same confidence your engineers expect from code.",
	},
	{
		icon: Globe2,
		title: "Built for global scale",
		body: "Regional data residency and edge execution keep latency low and compliance teams calm, wherever your people work.",
	},
];

/* Zig-zag feature deep-dives (alternating layout). */
export const ZIGZAG: {
	eyebrow: string;
	icon: LucideIcon;
	title: string;
	titleAccent: string;
	body: string;
	points: string[];
}[] = [
	{
		eyebrow: "Automate",
		icon: Zap,
		title: "Turn busywork into",
		titleAccent: "background work",
		body: "Northwind watches for the triggers that matter and runs the response in milliseconds. Approvals, provisioning, reconciliation — handled before anyone has to ask.",
		points: [
			"Event-driven triggers across every connected tool",
			"Branching logic with human-in-the-loop approvals",
			"Sub-second execution, fully observable end to end",
		],
	},
	{
		eyebrow: "Collaborate",
		icon: Users,
		title: "One workspace your",
		titleAccent: "whole company trusts",
		body: "Bring operators, analysts, and leadership onto a single shared surface. Comment in context, assign ownership, and keep a perfect record of who did what — and why.",
		points: [
			"Real-time presence and threaded discussion",
			"Role-based access down to the field level",
			"Immutable audit trail, exportable in one click",
		],
	},
];

/* Three-step "how it works" — uses glowing numbered badges. */
export const STEPS: { title: string; body: string }[] = [
	{
		title: "Connect your stack",
		body: "Authenticate the tools you already use. Northwind maps your data and surfaces opportunities to automate on day one.",
	},
	{
		title: "Design the flow",
		body: "Drag steps onto the canvas, add logic and approvals, then preview the run against real data before you ship.",
	},
	{
		title: "Ship & measure",
		body: "Promote to production, watch live dashboards, and let anomaly alerts close the loop while your team focuses on the work.",
	},
];

/* Pricing tiers — center tier is highlighted ("popular"). */
export const PRICING: {
	name: string;
	price: string;
	cadence: string;
	blurb: string;
	features: string[];
	cta: string;
	popular?: boolean;
}[] = [
	{
		name: "Starter",
		price: "$0",
		cadence: "/ month",
		blurb: "For small teams getting their first workflows off the ground.",
		features: [
			"Up to 5 members",
			"3 active workflows",
			"Standard integrations",
			"Community support",
		],
		cta: "Start for free",
	},
	{
		name: "Growth",
		price: "$49",
		cadence: "/ user / mo",
		blurb: "For scaling teams that need automation, insight, and control.",
		features: [
			"Unlimited members",
			"Unlimited workflows",
			"300+ integrations",
			"Live dashboards & alerts",
			"SSO + role-based access",
			"Priority support",
		],
		cta: "Start 14-day trial",
		popular: true,
	},
	{
		name: "Enterprise",
		price: "Custom",
		cadence: "",
		blurb: "For organizations with advanced security and scale requirements.",
		features: [
			"Everything in Growth",
			"SCIM + SAML provisioning",
			"Regional data residency",
			"Dedicated success manager",
			"99.99% uptime SLA",
		],
		cta: "Talk to sales",
	},
];

/* Testimonials. */
export const TESTIMONIALS: {
	quote: string;
	name: string;
	role: string;
	initials: string;
}[] = [
	{
		quote:
			"We replaced eleven internal scripts and a spreadsheet with one Northwind workspace. Our ops team got a full week back, every week.",
		name: "Priya Raman",
		role: "VP Operations, Helios",
		initials: "PR",
	},
	{
		quote:
			"The audit trail alone passed our SOC 2 review without a single follow-up. It felt like the product was designed by people who'd sat in our compliance meetings.",
		name: "Marcus Bell",
		role: "Head of Security, Quantana",
		initials: "MB",
	},
	{
		quote:
			"Onboarding took an afternoon, not a quarter. Two weeks in, leadership was making calls off live dashboards instead of stale exports.",
		name: "Lena Fischer",
		role: "COO, Northpeak",
		initials: "LF",
	},
];

/* FAQ — rendered with native details/summary. */
export const FAQS: { q: string; a: string }[] = [
	{
		q: "How long does it take to get started?",
		a: "Most teams connect their first integrations and ship a working workflow within a single afternoon. There's no implementation project and no professional-services contract required to see value.",
	},
	{
		q: "Is Northwind secure enough for regulated industries?",
		a: "Yes. Northwind is SOC 2 Type II certified, supports SSO and SCIM provisioning, offers regional data residency, and records an immutable audit log of every action that you can export at any time.",
	},
	{
		q: "Can I try it before committing to a plan?",
		a: "Absolutely. The Starter plan is free forever, and every paid plan includes a 14-day trial with full access to integrations, dashboards, and automation — no credit card needed to begin.",
	},
	{
		q: "What happens to my workflows if I downgrade?",
		a: "Your workflows are never deleted. If you exceed a lower plan's limits, extra workflows are paused rather than removed, so you can reactivate them the moment you upgrade again.",
	},
	{
		q: "Do you offer onboarding help for larger teams?",
		a: "Growth plans include priority support, and Enterprise customers get a dedicated success manager plus guided onboarding tailored to your security and scale requirements.",
	},
];

export const FOOTER_COLUMNS: { title: string; links: string[] }[] = [
	{
		title: "Product",
		links: ["Platform", "Integrations", "Security", "Changelog", "Roadmap"],
	},
	{
		title: "Company",
		links: ["About", "Careers", "Customers", "Blog", "Press"],
	},
	{
		title: "Resources",
		links: ["Documentation", "API reference", "Guides", "Status", "Support"],
	},
	{
		title: "Legal",
		links: ["Privacy", "Terms", "DPA", "Cookie settings"],
	},
];

export const HERO_HIGHLIGHT_ICON = Sparkles;
