"use client";

import {
	Component,
	lazy,
	type ReactNode,
	Suspense,
	useEffect,
	useState,
} from "react";
import { OrbitalFallback } from "@/components/ui/orbital-fallback";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
	scene: string;
	className?: string;
	/**
	 * Optional override for the visual shown while loading / on failure. Defaults
	 * to the built-in <OrbitalFallback />. Kept optional so the documented call
	 * `<SplineScene scene=... className=... />` works unchanged.
	 */
	fallback?: ReactNode;
}

/**
 * Error boundary so a failed Spline load (blocked CDN, offline clone, WebGL
 * unavailable, runtime error) degrades to the fallback instead of crashing the
 * whole React tree.
 */
class SplineErrorBoundary extends Component<
	{ children: ReactNode; onError: () => void },
	{ hasError: boolean }
> {
	state = { hasError: false };
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch() {
		this.props.onError();
	}
	render() {
		if (this.state.hasError) return null;
		return this.props.children;
	}
}

export function SplineScene({ scene, className, fallback }: SplineSceneProps) {
	// `failed` flips on a thrown error or an unreachable scene; `loaded` flips
	// when Spline reports ready. `reachable` is a lightweight preflight: if the
	// scene URL can't be fetched (offline clone, blocked host) we render the
	// fallback WITHOUT mounting the runtime, which avoids a noisy network error.
	const [failed, setFailed] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [reachable, setReachable] = useState<boolean | null>(null);

	useEffect(() => {
		let cancelled = false;
		// `no-cors` keeps this an opaque, side-effect-free probe; any rejection
		// (network error, DNS, blocked host) means "treat as unreachable".
		const probe = fetch(scene, { method: "GET", mode: "no-cors" })
			.then(() => {
				if (!cancelled) setReachable(true);
			})
			.catch(() => {
				if (!cancelled) setReachable(false);
			});
		// Don't wait forever on a hung request.
		const timer = window.setTimeout(() => {
			if (!cancelled && reachable === null) setReachable(false);
		}, 4000);
		return () => {
			cancelled = true;
			window.clearTimeout(timer);
			void probe;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [scene, reachable]);

	// Safety net: even when reachable, if the scene never finishes loading, fall
	// back rather than hang on the spinner.
	useEffect(() => {
		if (loaded || failed || reachable !== true) return;
		const id = window.setTimeout(() => setFailed(true), 8000);
		return () => window.clearTimeout(id);
	}, [loaded, failed, reachable]);

	const fallbackNode = fallback ?? (
		<OrbitalFallback className="w-full h-full" />
	);

	// Render the fallback while probing or when the scene is unavailable.
	if (failed || reachable === false || reachable === null) {
		return <div className={className}>{fallbackNode}</div>;
	}

	return (
		<SplineErrorBoundary onError={() => setFailed(true)}>
			<Suspense
				fallback={
					<div className="w-full h-full flex items-center justify-center">
						<span className="loader"></span>
					</div>
				}
			>
				{/* While Spline streams the scene we keep the animated fallback visible
            underneath; once it loads, Spline paints on top and we drop it. */}
				<div className="relative w-full h-full">
					{!loaded && <div className="absolute inset-0">{fallbackNode}</div>}
					<Spline
						scene={scene}
						className={className}
						onLoad={() => setLoaded(true)}
					/>
				</div>
			</Suspense>
		</SplineErrorBoundary>
	);
}
