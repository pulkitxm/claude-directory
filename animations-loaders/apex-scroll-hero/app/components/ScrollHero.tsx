"use client";

import { useEffect, useRef } from "react";
const TOP_SPEED = 100;
export default function ScrollHero() {
  const trackRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const gearRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    const scene = sceneRef.current;
    if (!track || !scene) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let trackTop = 0;
    let trackLen = 1;
    const measure = () => {
      trackTop = track.getBoundingClientRect().top + window.scrollY;
      trackLen = Math.max(track.offsetHeight - window.innerHeight, 1);
    };
    measure();
    window.addEventListener("resize", measure);
    let target = 0;
    const onScroll = () => {
      target = Math.min(1, Math.max(0, (window.scrollY - trackTop) / trackLen));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    let raf = 0;
    let current = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const next = current + (target - current) * 0.14;
      current = Math.abs(target - next) < 0.0004 ? target : next;
      const p = current;
      scene.style.setProperty("--progress", String(reduced ? target : p));
      const speed = Math.round(TOP_SPEED * (1 - (1 - p) ** 1.8));
      if (speedRef.current) {
        speedRef.current.textContent = String(speed).padStart(3, "0");
      }
      if (gearRef.current) {
        gearRef.current.textContent = speed < 5 ? "N" : String(Math.min(7, Math.floor(speed / 36) + 1));
      }
      if (railRef.current) {
        railRef.current.style.transform = `scaleY(${p})`;
      }
      if (introRef.current) {
        const k = Math.min(1, p / 0.22);
        introRef.current.style.opacity = String(1 - k);
        introRef.current.style.transform = `translateY(${-k * 60}px)`;
        introRef.current.style.visibility = k >= 1 ? "hidden" : "visible";
      }
      if (cueRef.current) {
        cueRef.current.style.opacity = String(Math.max(0, 1 - p / 0.08));
      }
      if (outroRef.current) {
        const k = Math.min(1, Math.max(0, (p - 0.78) / 0.18));
        outroRef.current.style.opacity = String(k);
        outroRef.current.style.transform = `translateY(${(1 - k) * 40}px)`;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return <section ref={trackRef} className="sh-track" aria-label="Scroll through light">
			<div className="sh-sticky">
				<div ref={sceneRef} className="sh-scene" aria-hidden><div className="sh-orbit" /><div className="sh-light" /></div>
				<div className="sh-shade" aria-hidden />

				<div ref={introRef} className="sh-intro">
					<p className="sh-kicker">Apex · Original Gradient Study</p>
					<h1 className="sh-title display">
						Scroll through light
						<span className="accent">one frame at a time.</span>
					</h1>
				</div>

				<div ref={outroRef} className="sh-outro" aria-hidden>
					<div>
						<h2 className="display">Chase the light.</h2>
						<p>The next frame follows your scroll</p>
					</div>
				</div>

				<div className="sh-hud" aria-hidden>
					<div className="sh-speed">
						<span ref={speedRef}>000</span>
						<em>% explored</em>
					</div>
					<div className="sh-gear">
						Phase <span ref={gearRef}>N</span>
					</div>
				</div>

				<div className="sh-rail" aria-hidden>
					<div ref={railRef} className="sh-rail-fill" />
				</div>

				<div ref={cueRef} className="sh-cue" aria-hidden>
					Scroll to explore
				</div>
			</div>
		</section>;
}
