/** Vendored recon stills + their fictional fire-control track data. */
export interface Target {
	id: string;
	callsign: string;
	classify: string;
	image: string;
	/** baseline telemetry the acquisition loop animates toward */
	rangeKm: number;
	bearingDeg: number; // 0–359, compass
	azimuthDeg: number; // -30..30, off-boresight
	elevationM: number;
	speedKt: number;
	threat: "LOW" | "MED" | "HIGH";
	gridRef: string;
}

export const TARGETS: Target[] = [
	{
		id: "TGT-01",
		callsign: "VESPER",
		classify: "GROUND // STATIC INSTALLATION",
		image: "/assets/recon/target-alpha.jpg",
		rangeKm: 14.62,
		bearingDeg: 273,
		azimuthDeg: -6,
		elevationM: 312,
		speedKt: 0,
		threat: "MED",
		gridRef: "38S MC 4471 9023",
	},
	{
		id: "TGT-02",
		callsign: "HALYARD",
		classify: "SURFACE // FAST MOVER",
		image: "/assets/recon/target-bravo.jpg",
		rangeKm: 31.08,
		bearingDeg: 91,
		azimuthDeg: 11,
		elevationM: 4,
		speedKt: 47,
		threat: "HIGH",
		gridRef: "31U DQ 8830 1147",
	},
	{
		id: "TGT-03",
		callsign: "CINDER",
		classify: "TERRAIN // DEFILADE",
		image: "/assets/recon/target-charlie.jpg",
		rangeKm: 9.74,
		bearingDeg: 208,
		azimuthDeg: 3,
		elevationM: 1880,
		speedKt: 0,
		threat: "LOW",
		gridRef: "32T NS 0192 6634",
	},
	{
		id: "TGT-04",
		callsign: "OBELISK",
		classify: "STRUCTURE // HARDENED",
		image: "/assets/recon/target-delta.jpg",
		rangeKm: 22.41,
		bearingDeg: 344,
		azimuthDeg: -14,
		elevationM: 96,
		speedKt: 0,
		threat: "HIGH",
		gridRef: "30U XC 5567 0098",
	},
];

export const THREAT_COLOR: Record<Target["threat"], string> = {
	LOW: "var(--cyan)",
	MED: "var(--lock)",
	HIGH: "var(--alarm)",
};
