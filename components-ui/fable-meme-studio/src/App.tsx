import { Download, Sparkles, Wallet } from "lucide-react";

function App() {
	return (
		<main className="app-shell">
			<header className="topbar">
				<a className="brand" href="#studio" aria-label="Fable Meme Studio home">
					<span className="brand-mark">F</span>
					<span>Fable Meme Studio</span>
				</a>
				<button className="wallet-button" type="button">
					<Wallet size={16} />
					Connect wallet
				</button>
			</header>

			<section className="intro" id="studio">
				<div>
					<p className="eyebrow">
						<Sparkles size={14} /> Community creative lab
					</p>
					<h1>Turn the timeline into your canvas.</h1>
					<p className="intro-copy">
						Pick a format, remix the message, and ship a crisp post in minutes.
					</p>
				</div>
				<div className="step-row" aria-label="Creation steps">
					<span>01 Pick</span>
					<span>02 Remix</span>
					<span>03 Post</span>
				</div>
			</section>

			<section className="studio-grid">
				<aside className="panel">
					<p className="panel-kicker">Templates</p>
					<h2>Choose a starting point</h2>
					<div className="template-placeholder">Template library</div>
				</aside>

				<div className="canvas-column">
					<div className="canvas-toolbar">
						<span>1080 x 1080</span>
						<span>Ready</span>
					</div>
					<div className="canvas-placeholder">
						<span className="canvas-label">YOUR MEME</span>
						<strong>STARTS HERE</strong>
					</div>
					<button className="export-button" type="button">
						<Download size={17} />
						Export PNG
					</button>
				</div>

				<aside className="panel">
					<p className="panel-kicker">Layers</p>
					<h2>Add your punchline</h2>
					<div className="template-placeholder">Text and stickers</div>
				</aside>
			</section>
		</main>
	);
}

export default App;
