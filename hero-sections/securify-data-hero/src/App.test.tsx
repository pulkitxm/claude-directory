import { render, screen, within } from "@testing-library/react";
import App from "./App";

const VIDEO_SRC = `${import.meta.env.BASE_URL}assets/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4`;

describe("securify hero", () => {
	it("renders the section container with fullscreen classes", () => {
		const { container } = render(<App />);
		const section = container.querySelector("section");
		expect(section).not.toBeNull();
		for (const cls of [
			"relative",
			"h-screen",
			"w-full",
			"overflow-hidden",
			"bg-black",
		]) {
			expect(section?.classList.contains(cls)).toBe(true);
		}
	});

	it("renders the background video with exact src and playback attributes", () => {
		const { container } = render(<App />);
		const video = container.querySelector("video")!;
		expect(video).not.toBeNull();
		expect(video.getAttribute("src")).toBe(VIDEO_SRC);
		expect(video.autoplay).toBe(true);
		expect(video.loop).toBe(true);
		expect(video.muted).toBe(true);
		expect(video.playsInline).toBe(true);
		for (const cls of [
			"absolute",
			"inset-0",
			"w-full",
			"h-full",
			"object-cover",
		]) {
			expect(video.classList.contains(cls)).toBe(true);
		}
	});

	it("renders the brand pill with the custom logo and lowercase brand text", () => {
		const { container } = render(<App />);
		expect(screen.getByText("securify")).toBeDefined();
		const svg = container.querySelector("nav svg")!;
		expect(svg.getAttribute("viewBox")).toBe("0 0 256 256");
		const path = svg.querySelector("path")!;
		expect(path.getAttribute("fill")).toBe("#ffffff");
		expect(path.getAttribute("d")).toContain("M 128 192 L 128 256");
	});

	it("renders the four lowercase nav links with hover transitions", () => {
		render(<App />);
		for (const label of ["platform", "solutions", "company", "support"]) {
			const link = screen.getByText(label);
			expect(link.tagName).toBe("A");
			expect(link.className).toContain("text-neutral-300");
			expect(link.className).toContain("hover:text-white");
			expect(link.className).toContain("transition-colors");
		}
	});

	it("renders the get started button", () => {
		render(<App />);
		const button = screen.getByRole("button", { name: "get started" });
		expect(button.className).toContain("bg-white");
		expect(button.className).toContain("text-black");
		expect(button.className).toContain("rounded-full");
		expect(button.className).toContain("hover:bg-neutral-200");
	});

	it("renders the three staggered lowercase headline words as h1 hero-titles", () => {
		render(<App />);
		const headings = screen.getAllByRole("heading", { level: 1 });
		expect(headings.map((h) => h.textContent)).toEqual([
			"protect",
			"your",
			"data",
		]);
		for (const h of headings) {
			expect(h.classList.contains("hero-title")).toBe(true);
			expect(h.classList.contains("absolute")).toBe(true);
			expect(h.classList.contains("font-medium")).toBe(true);
		}
		const [protect, your, data] = headings;
		expect(protect.className).toContain("top-[18%]");
		expect(your.className).toContain("top-[38%]");
		expect(your.className).toContain("right-4");
		expect(data.className).toContain("top-[58%]");
		expect(data.className).toContain("left-[18%]");
	});

	it("renders the description paragraph verbatim", () => {
		render(<App />);
		const p = screen.getByText(
			/we can guarding your data with utmost care, empowering you with privacy everywhere/,
		);
		expect(p.className).toContain("max-w-[240px]");
		expect(p.className).toContain("text-white/90");
	});

	it("renders the three stat blocks with sublabels", () => {
		render(<App />);
		const stats: Array<[string, string]> = [
			["+65k", "startups use"],
			["+1.5b", "gb data was protected"],
			["+300k", "downloads"],
		];
		for (const [number, sublabel] of stats) {
			const numberEl = screen.getByText(number);
			expect(numberEl.className).toContain("font-medium");
			expect(numberEl.className).toContain("tracking-tight");
			const block = numberEl.closest("div")?.parentElement!;
			expect(within(block).getByText(sublabel).className).toContain(
				"text-white/70",
			);
		}
	});

	it("renders diagonal dividers hidden on mobile", () => {
		const { container } = render(<App />);
		const dividers = container.querySelectorAll("span.h-px.w-24");
		expect(dividers.length).toBe(3);
		for (const divider of dividers) {
			expect(divider.classList.contains("hidden")).toBe(true);
			expect(divider.classList.contains("md:block")).toBe(true);
			expect(divider.classList.contains("bg-white/40")).toBe(true);
		}
	});

	it("renders the bottom gradient overlay", () => {
		const { container } = render(<App />);
		const gradient = container.querySelector(".bg-gradient-to-b")!;
		expect(gradient).not.toBeNull();
		expect(gradient.className).toContain("pointer-events-none");
		expect(gradient.className).toContain("from-transparent");
		expect(gradient.className).toContain("to-black");
		expect(gradient.className).toContain("h-48");
	});

	it("uses only lowercase copy throughout", () => {
		const { container } = render(<App />);
		expect(container.textContent).toBe(container.textContent?.toLowerCase());
	});

	it("uses no purple or indigo classes anywhere", () => {
		const { container } = render(<App />);
		expect(container.innerHTML).not.toMatch(/purple|indigo|violet/);
	});
});
