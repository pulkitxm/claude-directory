import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

const VIDEO_URL = `${import.meta.env.BASE_URL}assets/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4`;

afterEach(cleanup);

describe("SkyElite hero — video background", () => {
	it("uses the exact CloudFront URL with autoplay, muted, loop, playsInline and object-cover", () => {
		const { container } = render(<App />);
		const video = container.querySelector("video") as HTMLVideoElement;

		expect(video).toBeTruthy();
		expect(video.getAttribute("src")).toBe(VIDEO_URL);
		expect(video.hasAttribute("autoplay")).toBe(true);
		expect(video.hasAttribute("loop")).toBe(true);
		expect(video.hasAttribute("playsinline")).toBe(true);
		expect(video.muted).toBe(true);
		expect(video.className).toContain("object-cover");
		expect(video.className).toContain("absolute");
		expect(video.className).toContain("inset-0");
		expect(video.className).toContain("h-full");
		expect(video.className).toContain("w-full");
	});
});

describe("SkyElite hero — navigation", () => {
	it("shows the SkyElite brand with the specified type treatment", () => {
		render(<App />);
		const brand = screen.getByText("SkyElite");
		expect(brand.className).toContain("text-2xl");
		expect(brand.className).toContain("font-semibold");
		expect(brand.className).toContain("text-gray-900");
	});

	it("renders the five desktop menu items inside a hidden md:flex list", () => {
		const { container } = render(<App />);
		const desktopList = container.querySelector(
			"ul.hidden",
		) as HTMLUListElement;
		expect(desktopList.className).toContain("md:flex");

		for (const item of ["Start", "Story", "Rates", "Benefits", "FAQ"]) {
			const link = Array.from(desktopList.querySelectorAll("a")).find(
				(a) => a.textContent === item,
			) as HTMLAnchorElement;
			expect(link).toBeTruthy();
			expect(link.className).toContain("text-gray-900");
			expect(link.className).toContain("hover:text-gray-700");
			expect(link.className).toContain("transition-colors");
		}
	});

	it("toggles the mobile dropdown via the Menu/X hamburger button", () => {
		const { container } = render(<App />);
		expect(container.querySelector("#mobile-menu")).toBeNull();

		const toggle = screen.getByRole("button", { name: "Open menu" });
		expect(toggle.getAttribute("aria-expanded")).toBe("false");

		fireEvent.click(toggle);
		const dropdown = container.querySelector("#mobile-menu") as HTMLDivElement;
		expect(dropdown).toBeTruthy();
		expect(dropdown.className).toContain("bg-white/95");
		expect(dropdown.className).toContain("backdrop-blur");
		expect(dropdown.className).toContain("rounded-2xl");
		expect(dropdown.className).toContain("shadow-xl");
		expect(toggle.getAttribute("aria-expanded")).toBe("true");
		expect(toggle.getAttribute("aria-label")).toBe("Close menu");

		fireEvent.click(toggle);
		expect(container.querySelector("#mobile-menu")).toBeNull();
	});

	it("closes the mobile dropdown when a menu link is clicked", () => {
		const { container } = render(<App />);
		fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

		const dropdown = container.querySelector("#mobile-menu") as HTMLDivElement;
		const faqLink = Array.from(dropdown.querySelectorAll("a")).find(
			(a) => a.textContent === "FAQ",
		) as HTMLAnchorElement;
		fireEvent.click(faqLink);

		expect(container.querySelector("#mobile-menu")).toBeNull();
	});

	it("constrains the nav to max-w-7xl with px-8 py-6", () => {
		const { container } = render(<App />);
		const nav = container.querySelector("nav") as HTMLElement;
		expect(nav.className).toContain("max-w-7xl");
		expect(nav.className).toContain("mx-auto");
		expect(nav.className).toContain("px-8");
		expect(nav.className).toContain("py-6");
	});
});

describe("SkyElite hero — content", () => {
	it("renders the PRIVATE JETS eyebrow label with the specified treatment", () => {
		render(<App />);
		const label = screen.getByText("Private Jets");
		for (const cls of [
			"text-sm",
			"font-semibold",
			"text-gray-600",
			"tracking-wider",
			"mb-4",
			"uppercase",
		]) {
			expect(label.className).toContain(cls);
		}
	});

	it("renders the overlapping two-line heading with exact sizes and colors", () => {
		render(<App />);
		const heading = screen.getByRole("heading", { level: 1 });
		for (const cls of [
			"text-6xl",
			"md:text-7xl",
			"lg:text-8xl",
			"font-normal",
			"leading-none",
			"tracking-tighter",
		]) {
			expect(heading.className).toContain(cls);
		}

		const lineOne = screen.getByText("Premium.");
		expect(lineOne.className).toContain("text-gray-500");

		const lineTwo = screen.getByText("Accessible.");
		expect(lineTwo.className).toContain("text-[#202A36]");
		expect((lineTwo as HTMLElement).style.marginTop).toBe("-12px");
	});

	it("renders the subtitle with the specified treatment", () => {
		render(<App />);
		const subtitle = screen.getByText("Your dedication deserves recognition.");
		for (const cls of [
			"text-lg",
			"md:text-xl",
			"text-gray-600",
			"mb-6",
			"max-w-2xl",
		]) {
			expect(subtitle.className).toContain(cls);
		}
	});

	it("renders both CTA buttons with pill shape, exact colors and transitions", () => {
		render(<App />);
		const discover = screen.getByRole("button", { name: "Discover" });
		for (const cls of [
			"px-4",
			"py-2",
			"rounded-full",
			"bg-gray-300",
			"text-gray-800",
			"font-medium",
			"hover:bg-gray-400",
			"transition-colors",
		]) {
			expect(discover.className).toContain(cls);
		}

		const bookNow = screen.getByRole("button", { name: "Book Now" });
		for (const cls of [
			"px-4",
			"py-2",
			"rounded-full",
			"text-white",
			"bg-[#202A36]",
			"hover:bg-[#1a2229]",
			"transition-colors",
		]) {
			expect(bookNow.className).toContain(cls);
		}
	});

	it("pulls the hero content up with -mt-80 inside a centered flex-1 main area", () => {
		const { container } = render(<App />);
		const main = container.querySelector("main") as HTMLElement;
		for (const cls of ["flex-1", "flex", "items-center", "justify-center"]) {
			expect(main.className).toContain(cls);
		}
		const content = main.firstElementChild as HTMLElement;
		expect(content.className).toContain("-mt-80");
	});
});

describe("SkyElite hero — layout structure", () => {
	it("uses min-h-screen bg-gray-50 outer, relative h-screen overflow-hidden hero, flex-col wrapper", () => {
		const { container } = render(<App />);
		const outer = container.firstElementChild as HTMLElement;
		expect(outer.className).toContain("min-h-screen");
		expect(outer.className).toContain("bg-gray-50");

		const section = outer.querySelector("section") as HTMLElement;
		for (const cls of ["relative", "h-screen", "overflow-hidden"]) {
			expect(section.className).toContain(cls);
		}

		const wrapper = section.querySelector(":scope > div") as HTMLElement;
		for (const cls of ["relative", "h-full", "flex", "flex-col"]) {
			expect(wrapper.className).toContain(cls);
		}
	});
});
