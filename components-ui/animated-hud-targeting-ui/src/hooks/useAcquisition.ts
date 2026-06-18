import { useCallback, useEffect, useReducer, useRef } from "react";
import { TARGETS } from "@/data/targets";

/** Fire-control acquisition phases, in cycle order. */
export type Phase = "scanning" | "acquiring" | "tracking" | "locked";

export const PHASE_LABEL: Record<Phase, string> = {
	scanning: "SCANNING",
	acquiring: "ACQUIRING",
	tracking: "TRACKING",
	locked: "LOCKED",
};

/** Dwell time (ms) spent in each phase before advancing. */
const PHASE_MS: Record<Phase, number> = {
	scanning: 1700,
	acquiring: 1300,
	tracking: 1600,
	locked: 2400,
};

const ORDER: Phase[] = ["scanning", "acquiring", "tracking", "locked"];

interface State {
	targetIndex: number;
	phase: Phase;
	/** bumped every time a fresh acquisition begins, used to remount the reticle */
	cycle: number;
	paused: boolean;
	/** 0–100 lock confidence, ramps during acquiring/tracking, pins at 100 on lock */
	confidence: number;
}

type Action =
	| { type: "advance" }
	| { type: "tickConfidence"; value: number }
	| { type: "togglePause" }
	| { type: "selectTarget"; index: number }
	| { type: "rearm" };

const initial: State = {
	targetIndex: 0,
	phase: "scanning",
	cycle: 0,
	paused: false,
	confidence: 0,
};

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "advance": {
			const idx = ORDER.indexOf(state.phase);
			const nextPhase = ORDER[(idx + 1) % ORDER.length];
			// Completing a full cycle (locked -> scanning) hands off to the next target.
			if (nextPhase === "scanning") {
				return {
					...state,
					phase: "scanning",
					targetIndex: (state.targetIndex + 1) % TARGETS.length,
					cycle: state.cycle + 1,
					confidence: 0,
				};
			}
			return { ...state, phase: nextPhase };
		}
		case "tickConfidence":
			return { ...state, confidence: action.value };
		case "togglePause":
			return { ...state, paused: !state.paused };
		case "selectTarget":
			if (action.index === state.targetIndex) {
				return { ...state, phase: "scanning", cycle: state.cycle + 1, confidence: 0 };
			}
			return {
				...state,
				targetIndex: action.index,
				phase: "scanning",
				cycle: state.cycle + 1,
				confidence: 0,
			};
		case "rearm":
			return { ...state, phase: "scanning", cycle: state.cycle + 1, confidence: 0 };
		default:
			return state;
	}
}

export interface Acquisition extends State {
	togglePause: () => void;
	selectTarget: (index: number) => void;
	rearm: () => void;
}

export function useAcquisition(): Acquisition {
	const [state, dispatch] = useReducer(reducer, initial);
	const phaseStartRef = useRef<number>(performance.now());

	const { phase, paused, cycle } = state;

	// Reset the phase clock whenever a new phase or acquisition cycle begins.
	useEffect(() => {
		phaseStartRef.current = performance.now();
	}, [phase, cycle]);

	// Phase advance timer.
	useEffect(() => {
		if (paused) return;
		const elapsed = performance.now() - phaseStartRef.current;
		const remaining = Math.max(0, PHASE_MS[phase] - elapsed);
		const t = window.setTimeout(() => dispatch({ type: "advance" }), remaining);
		return () => window.clearTimeout(t);
	}, [phase, cycle, paused]);

	// Confidence ramp — climbs through acquiring/tracking, snaps to 100 on lock,
	// and sits near zero while scanning.
	useEffect(() => {
		if (paused) return;
		let raf = 0;
		const tick = () => {
			const target =
				phase === "scanning"
					? 0
					: phase === "acquiring"
						? 64
						: phase === "tracking"
							? 92
							: 100;
			dispatch({ type: "tickConfidence", value: target });
			// re-render handled by reducer; framer-motion eases the displayed value
			raf = window.requestAnimationFrame(tick);
		};
		raf = window.requestAnimationFrame(tick);
		return () => window.cancelAnimationFrame(raf);
	}, [phase, paused]);

	const togglePause = useCallback(() => dispatch({ type: "togglePause" }), []);
	const selectTarget = useCallback((index: number) => dispatch({ type: "selectTarget", index }), []);
	const rearm = useCallback(() => dispatch({ type: "rearm" }), []);

	return { ...state, togglePause, selectTarget, rearm };
}
