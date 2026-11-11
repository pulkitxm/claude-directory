export const mediaExtension =
	/\.(?:avif|apng|bmp|gif|ico|jpe?g|png|svg|webp|tiff?|heic|heif|psd|eps|woff2?|ttf|otf|eot|fnt|mp4|m4v|mov|webm|ogv|mkv|avi|flv|mp3|m4a|wav|ogg|flac|aac|aiff?|pdf|wasm|glb|gltf|obj|fbx|stl|blend|usdz|dds|ktx2?|hdr|exr|zip|tar|gz|tgz|7z|rar|bz2|xz)$/i;

export function hasMediaSignature(bytes) {
	const prefix = bytes.subarray(0, 512);
	const start = prefix.subarray(0, 4).toString("hex");
	if (
		[
			"89504e47",
			"47494638",
			"774f4646",
			"774f4632",
			"4f54544f",
			"74746366",
			"00010000",
			"4f676753",
			"664c6143",
			"504b0304",
			"504b0506",
			"504b0708",
			"0061736d",
			"676c5446",
			"25504446",
			"52417221",
		].includes(start) ||
		prefix.subarray(0, 3).toString("hex") === "ffd8ff" ||
		prefix.subarray(0, 3).toString("ascii") === "ID3" ||
		prefix.subarray(0, 2).toString("hex") === "1f8b" ||
		prefix.subarray(4, 8).toString("ascii") === "ftyp" ||
		(prefix.subarray(0, 4).toString("ascii") === "RIFF" &&
			/^(?:WEBP|WAVE|AVI )$/.test(prefix.subarray(8, 12).toString("ascii")))
	)
		return true;
	return /^\s*(?:<\?xml[^>]*>\s*)?<svg(?=[\s/>])/i.test(
		prefix.toString("utf8"),
	);
}
