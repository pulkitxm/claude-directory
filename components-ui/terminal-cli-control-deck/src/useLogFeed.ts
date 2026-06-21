import { useEffect, useRef, useState } from "react";
import { LOG_TEMPLATES, type LogLine } from "./data";

export interface FeedEntry extends LogLine {
	id: number;
	stamp: string;
}

const pad = (n: number) => n.toString().padStart(2, "0");
const clock = (d: Date) =>
	`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

/**
 * A self-driving log feed: appends a randomised line every `interval` ms and
 * keeps the most recent `max`. Paused while the tab is hidden so it doesn't
 * burn cycles. Seeds a few lines immediately so the pane is never empty.
 */
export function useLogFeed({
	interval = 1700,
	max = 9,
	running = true,
}: {
	interval?: number;
	max?: number;
	running?: boolean;
} = {}) {
	const [lines, setLines] = useState<FeedEntry[]>([]);
	const idRef = useRef(0);

	const push = () => {
		const tpl = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
		idRef.current += 1;
		setLines((prev) =>
			[...prev, { ...tpl, id: idRef.current, stamp: clock(new Date()) }].slice(
				-max,
			),
		);
	};

	// seed once
	useEffect(() => {
		for (let i = 0; i < 4; i += 1) push();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [push]);

	useEffect(() => {
		if (!running) return;
		let timer = 0;
		const tick = () => {
			if (!document.hidden) push();
		};
		timer = window.setInterval(tick, interval);
		return () => window.clearInterval(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [interval, running, push]);

	return lines;
}
