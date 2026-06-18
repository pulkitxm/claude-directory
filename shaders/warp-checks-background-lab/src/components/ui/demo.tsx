import Wrapper from "@/components/ui/background-shaders";

/**
 * DemoOne — the brief's verbatim example usage. With no props, `<Wrapper/>`
 * renders the prompt's exact component: the `shape="checks"` Warp shader as a
 * full-viewport fixed background with its empty rail/content slots. The lab's
 * `App` mounts the same `Wrapper` but feeds it live `config`, `rail` and
 * `children`; this file is kept as the canonical "drop-in" reference the prompt
 * asked for, and is exercised by the headless verifier.
 */
export default function DemoOne() {
	return <Wrapper />;
}
