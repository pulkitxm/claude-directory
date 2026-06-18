import { ScannerCardStream } from "@/components/ui/scanner-card-stream";

export default function App() {
	return (
		<ScannerCardStream
			showControls
			showSpeed
			initialSpeed={180}
			scanEffect="scramble"
		/>
	);
}
