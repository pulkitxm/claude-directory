import type { StatusKind } from "./design-system";

/** ASCII-art wordmark for ACME, rendered in a <pre> in the hero. */
export const ACME_LOGO = String.raw`
 █████╗  ██████╗███╗   ███╗███████╗
██╔══██╗██╔════╝████╗ ████║██╔════╝
███████║██║     ██╔████╔██║█████╗
██╔══██║██║     ██║╚██╔╝██║██╔══╝
██║  ██║╚██████╗██║ ╚═╝ ██║███████╗
╚═╝  ╚═╝ ╚═════╝╚═╝     ╚═╝╚══════╝
`.replace(/^\n/, "");

/** Cluster nodes shown in the topology pane. */
export interface Node {
	host: string;
	region: string;
	status: StatusKind;
	load: number;
}

export const NODES: Node[] = [
	{ host: "edge-ams-01", region: "eu-west-1", status: "ok", load: 41 },
	{ host: "edge-ams-02", region: "eu-west-1", status: "ok", load: 38 },
	{ host: "core-iad-07", region: "us-east-1", status: "run", load: 67 },
	{ host: "core-iad-08", region: "us-east-1", status: "warn", load: 82 },
	{ host: "gpu-sfo-03", region: "us-west-2", status: "run", load: 74 },
	{ host: "gpu-sfo-04", region: "us-west-2", status: "err", load: 96 },
	{ host: "cache-sin-02", region: "ap-se-1", status: "ok", load: 29 },
];

/** Live-feed log line templates. The feed picks from these at random. */
export interface LogLine {
	kind: StatusKind;
	text: string;
}

export const LOG_TEMPLATES: LogLine[] = [
	{ kind: "ok", text: "deploy: rollout v4.2.1 → core-iad-07 complete" },
	{ kind: "run", text: "scheduler: rebalancing 4 pods across us-east-1" },
	{ kind: "ok", text: "tls: certificate renewed for *.acme.sh (89d left)" },
	{ kind: "warn", text: "gpu-sfo-03: thermal envelope at 78% — throttling" },
	{ kind: "err", text: "gpu-sfo-04: heartbeat lost, draining connections" },
	{ kind: "ok", text: "backup: snapshot vol-9f2 written to cold storage" },
	{ kind: "run", text: "ingest: 1.4M events/s, queue depth nominal" },
	{ kind: "ok", text: "auth: rotated service token svc.deploy.acme" },
	{ kind: "warn", text: "core-iad-08: memory pressure 82%, gc paused 14ms" },
	{ kind: "ok", text: "mesh: sidecar handshake ok on cache-sin-02" },
	{ kind: "run", text: "migrate: applying 0042_add_audit_index (eta 3s)" },
	{ kind: "ok", text: "edge-ams-01: 0 5xx in last 300s window" },
];

/** Resource meters for the telemetry pane. */
export const METRICS = [
	{ label: "CPU // AGGREGATE", value: 63 },
	{ label: "MEMORY // RSS", value: 71 },
	{ label: "NETWORK // EGRESS", value: 44 },
	{ label: "DISK // IOPS", value: 88 },
	{ label: "GPU // UTIL", value: 92 },
];

/** Feature/spec rows for the manifest pane. */
export const MANIFEST = [
	{ flag: "--render", desc: "phosphor green @ #33ff00, amber @ #ffb000" },
	{ flag: "--radius", desc: "0px, no rounded corners anywhere" },
	{ flag: "--type", desc: "JetBrains Mono + VT323, vendored local" },
	{ flag: "--overlay", desc: "CRT scanlines, sweep, flicker (subtle)" },
	{ flag: "--a11y", desc: "AA+ contrast, real focus, semantic roles" },
];
