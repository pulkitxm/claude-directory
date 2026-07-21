import {
	BarChart3,
	BookOpen,
	Check,
	CheckCircle2,
	ChevronDown,
	Rocket,
	Star,
	Users,
} from "lucide-react";
import { useEffect, useState } from "react";

const TABS = [
	{ id: "analyse", label: "Analyse", icon: BarChart3 },
	{ id: "train", label: "Train", icon: BookOpen },
	{ id: "testing", label: "Testing", icon: Users },
	{ id: "deploy", label: "Deploy", icon: Rocket },
];

const VIDEO_SRC = `${import.meta.env.BASE_URL}assets/hf_20260319_165750_358b1e72-c921-48b7-aaac-f200994f32fb.mp4`;

function Navigation() {
	return (
		<header
			className="animate-fade-in-up"
			style={{ opacity: 0, animationDelay: "0.1s" }}
		>
			<nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
				<a href="#" className="flex items-center gap-2">
					<Star className="w-5 h-5 fill-black text-black" />
					<span className="text-lg font-semibold">Stellar.ai</span>
				</a>

				<div className="hidden md:flex items-center gap-8">
					<a
						href="#"
						className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors"
					>
						Solutions
						<ChevronDown className="w-4 h-4" />
					</a>
					<a
						href="#"
						className="flex items-center gap-1 text-sm text-gray-700 hover:text-black transition-colors"
					>
						For Teams
						<ChevronDown className="w-4 h-4" />
					</a>
					<a
						href="#"
						className="text-sm text-gray-700 hover:text-black transition-colors"
					>
						About Us
					</a>
					<a
						href="#"
						className="text-sm text-gray-700 hover:text-black transition-colors"
					>
						Learn Hub
					</a>
				</div>

				<div className="flex items-center gap-4">
					<a
						href="#"
						className="text-sm text-gray-700 hover:text-black transition-colors"
					>
						Login
					</a>
					<button className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
						Get started free
					</button>
				</div>
			</nav>
		</header>
	);
}

function AnalyseOverlay() {
	const steps = [
		{ label: "Connect your tools", state: "active" },
		{ label: "Import workspace data", state: "pending" },
		{ label: "Configure AI assistant", state: "pending" },
		{ label: "Invite your team", state: "pending" },
	];
	return (
		<OverlayCard>
			<div className="flex items-center justify-between mb-1">
				<h3 className="text-base font-semibold text-black">
					Set Up Your AI Workspace
				</h3>
				<span className="text-xs font-medium text-gray-500">Step 1 of 4</span>
			</div>
			<p className="text-xs text-gray-500 mb-4">
				A few quick steps and Stellar.ai is ready to work.
			</p>
			<div className="h-1.5 w-full bg-gray-100 rounded-full mb-5 overflow-hidden">
				<div className="h-full w-1/4 bg-purple-600 rounded-full" />
			</div>
			<ul className="space-y-3">
				{steps.map((step, i) => (
					<li key={step.label} className="flex items-center gap-3">
						<span
							className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
								step.state === "active"
									? "bg-purple-600 text-white"
									: "bg-gray-100 text-gray-400"
							}`}
						>
							{i + 1}
						</span>
						<span
							className={`text-sm ${
								step.state === "active"
									? "font-medium text-black"
									: "text-gray-500"
							}`}
						>
							{step.label}
						</span>
					</li>
				))}
			</ul>
		</OverlayCard>
	);
}

function TrainOverlay() {
	const metrics = [
		{ label: "Accuracy", value: "94.2%" },
		{ label: "Loss", value: "0.018" },
		{ label: "Epoch", value: "8 / 12" },
		{ label: "ETA", value: "14 min" },
	];
	return (
		<OverlayCard>
			<div className="flex items-center justify-between mb-1">
				<h3 className="text-base font-semibold text-black">
					AI Model Training
				</h3>
				<span className="flex items-center gap-1.5 text-xs font-medium text-orange-600">
					<span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
					Running
				</span>
			</div>
			<p className="text-xs text-gray-500 mb-4">
				Fine-tuning on your workspace data.
			</p>
			<div className="flex items-center justify-between text-xs font-medium mb-1.5">
				<span className="text-gray-500">Training progress</span>
				<span className="text-black">67%</span>
			</div>
			<div className="h-1.5 w-full bg-gray-100 rounded-full mb-5 overflow-hidden">
				<div className="h-full w-[67%] bg-orange-500 rounded-full" />
			</div>
			<div className="grid grid-cols-2 gap-3">
				{metrics.map((metric) => (
					<div
						key={metric.label}
						className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5"
					>
						<p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">
							{metric.label}
						</p>
						<p className="text-sm font-semibold text-black">{metric.value}</p>
					</div>
				))}
			</div>
		</OverlayCard>
	);
}

function TestingOverlay() {
	const suites = [
		{ label: "Unit", count: 84 },
		{ label: "Integration", count: 31 },
		{ label: "End-to-end", count: 12 },
	];
	return (
		<OverlayCard>
			<div className="flex items-center gap-3 mb-4">
				<span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
					<CheckCircle2 className="w-5 h-5 text-green-600" />
				</span>
				<div>
					<h3 className="text-base font-semibold text-black">
						Test Suite Results
					</h3>
					<p className="text-xs text-green-600 font-medium">All tests passed</p>
				</div>
			</div>
			<div className="flex items-end justify-between mb-1.5">
				<span className="text-2xl font-bold text-black leading-none">
					127<span className="text-gray-400 font-medium"> / 127</span>
				</span>
				<span className="text-xs font-medium text-gray-500">100% passing</span>
			</div>
			<div className="h-1.5 w-full bg-gray-100 rounded-full mb-5 overflow-hidden">
				<div className="h-full w-full bg-green-500 rounded-full" />
			</div>
			<ul className="space-y-2.5">
				{suites.map((suite) => (
					<li
						key={suite.label}
						className="flex items-center justify-between text-sm"
					>
						<span className="flex items-center gap-2 text-gray-600">
							<Check className="w-4 h-4 text-green-500" />
							{suite.label}
						</span>
						<span className="font-medium text-black">{suite.count} passed</span>
					</li>
				))}
			</ul>
		</OverlayCard>
	);
}

function DeployOverlay() {
	const checklist = [
		"Build completed in 42s",
		"All 127 tests passing",
		"Security scan clean",
		"Preview approved",
	];
	return (
		<OverlayCard>
			<h3 className="text-base font-semibold text-black mb-1">
				Deploy to Production
			</h3>
			<p className="text-xs text-gray-500 mb-4">
				Everything checks out. You are clear for launch.
			</p>
			<ul className="space-y-2.5 mb-5">
				{checklist.map((item) => (
					<li
						key={item}
						className="flex items-center gap-2.5 text-sm text-gray-700"
					>
						<span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
							<Check className="w-3 h-3 text-green-600" />
						</span>
						{item}
					</li>
				))}
			</ul>
			<button className="w-full bg-black text-white py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
				<Rocket className="w-4 h-4" />
				Deploy Now
			</button>
		</OverlayCard>
	);
}

function OverlayCard({ children }) {
	return (
		<div
			className="absolute inset-0 animate-fade-in-overlay"
			style={{ opacity: 0 }}
		>
			<div className="absolute inset-0 bg-black/30" />
			<div
				className="animate-slide-up-overlay absolute top-1/2 left-1/2 w-[calc(100%-3rem)] max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-left"
				style={{ opacity: 0 }}
			>
				{children}
			</div>
		</div>
	);
}

const OVERLAYS = {
	analyse: AnalyseOverlay,
	train: TrainOverlay,
	testing: TestingOverlay,
	deploy: DeployOverlay,
};

function TabBar({ activeTab, onSelect }) {
	const tabButton = (tab) => {
		const Icon = tab.icon;
		const active = activeTab === tab.id;
		return (
			<button
				key={tab.id}
				onClick={() => onSelect(tab.id)}
				className={`flex items-center justify-center gap-2 px-5 py-2 rounded-md text-sm font-medium transition-colors ${
					active ? "bg-white text-black shadow-sm" : "text-gray-600"
				}`}
			>
				<Icon className="w-4 h-4" />
				{tab.label}
			</button>
		);
	};

	return (
		<div
			className="animate-fade-in-up flex justify-center mb-8"
			style={{ opacity: 0, animationDelay: "0.6s" }}
		>
			{/* Mobile: 2x2 grid */}
			<div className="md:hidden grid grid-cols-2 gap-1 bg-gray-100 rounded-lg p-1">
				{TABS.map(tabButton)}
			</div>

			{/* Desktop: row with dividers */}
			<div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
				{TABS.map((tab, i) => (
					<div key={tab.id} className="flex items-center">
						{i > 0 && <div className="w-px h-5 bg-gray-300 mx-1" />}
						{tabButton(tab)}
					</div>
				))}
			</div>
		</div>
	);
}

function CompanyLogos() {
	return (
		<div
			className="animate-fade-in-up mt-24 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 text-gray-400"
			style={{ opacity: 0, animationDelay: "0.8s" }}
		>
			<span className="text-sm font-semibold tracking-[0.3em]">INTERSCOPE</span>

			<span className="text-sm font-bold tracking-[0.25em]">SPOTIFY</span>

			<span className="flex items-center gap-2">
				<span className="grid grid-cols-3 gap-0.5">
					{Array.from({ length: 9 }).map((_, i) => (
						<span key={i} className="w-1 h-1 rounded-full bg-gray-400" />
					))}
				</span>
				<span className="text-base font-semibold tracking-tight">Nexera</span>
			</span>

			<span className="font-serif italic text-2xl">M3</span>

			<span className="flex items-center gap-2">
				<span className="w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center text-[10px] font-semibold">
					LC
				</span>
				<span className="text-xs font-medium tracking-[0.25em]">
					LAURA COLE
				</span>
			</span>

			<span className="flex items-center gap-1.5">
				<span className="text-base font-semibold tracking-tight lowercase">
					vertex
				</span>
				<span className="flex gap-1">
					<span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
					<span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
				</span>
			</span>
		</div>
	);
}

export default function App() {
	const [activeTab, setActiveTab] = useState("analyse");

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveTab((current) => {
				const index = TABS.findIndex((tab) => tab.id === current);
				return TABS[(index + 1) % TABS.length].id;
			});
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	const ActiveOverlay = OVERLAYS[activeTab];

	return (
		<div className="bg-white min-h-screen text-black">
			<Navigation />

			<main className="px-6 pt-24 pb-32 max-w-7xl mx-auto text-center">
				{/* Reviews badge */}
				<div
					className="animate-fade-in-up inline-flex items-center gap-2 mb-8"
					style={{ opacity: 0, animationDelay: "0.2s" }}
				>
					<span className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
						<Star className="w-3.5 h-3.5 fill-black text-black" />
					</span>
					<span className="text-sm font-medium text-black">
						4.9 rating from 18.3K+ users
					</span>
				</div>

				{/* Main heading */}
				<h1
					className="animate-fade-in-up text-6xl md:text-7xl lg:text-[80px] font-normal leading-[1.1] tracking-tight mb-5"
					style={{ opacity: 0, animationDelay: "0.3s" }}
				>
					Work Smarter. Move Faster.
					<br />
					<span className="bg-gradient-to-r from-black via-gray-500 to-gray-400 bg-clip-text text-transparent">
						AI Powers You Up.
					</span>
				</h1>

				{/* Subheading */}
				<p
					className="animate-fade-in-up text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
					style={{ opacity: 0, animationDelay: "0.4s" }}
				>
					Intelligent automation syncs with the tools you love to streamline
					tasks, boost output, and save time.
				</p>

				{/* CTA */}
				<div
					className="animate-fade-in-up"
					style={{ opacity: 0, animationDelay: "0.5s" }}
				>
					<button className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors mb-12">
						Begin Free Trial
					</button>
				</div>

				{/* Tab bar */}
				<TabBar activeTab={activeTab} onSelect={setActiveTab} />

				{/* Video + overlay */}
				<div
					className="animate-fade-in-up relative rounded-3xl overflow-hidden h-[400px] md:h-[500px]"
					style={{ opacity: 0, animationDelay: "0.7s" }}
				>
					<video
						src={VIDEO_SRC}
						autoPlay
						loop
						muted
						playsInline
						className="w-full h-full object-cover"
					/>
					<ActiveOverlay key={activeTab} />
				</div>

				{/* Company logos */}
				<CompanyLogos />
			</main>
		</div>
	);
}
