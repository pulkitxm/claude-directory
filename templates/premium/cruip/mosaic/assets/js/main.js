// Light switcher
const lightSwitches = document.querySelectorAll(".light-switch");
if (lightSwitches.length > 0) {
	lightSwitches.forEach((lightSwitch, i) => {
		if (localStorage.getItem("dark-mode") === "true") {
			// eslint-disable-next-line no-param-reassign
			lightSwitch.checked = true;
		}
		lightSwitch.addEventListener("change", () => {
			const { checked } = lightSwitch;
			lightSwitches.forEach((el, n) => {
				if (n !== i) {
					// eslint-disable-next-line no-param-reassign
					el.checked = checked;
				}
			});
			document.documentElement.classList.add("[&_*]:!transition-none");
			if (lightSwitch.checked) {
				document.documentElement.classList.add("dark");
				document.querySelector("html").style.colorScheme = "dark";
				localStorage.setItem("dark-mode", true);
				document.dispatchEvent(
					new CustomEvent("darkMode", { detail: { mode: "on" } }),
				);
			} else {
				document.documentElement.classList.remove("dark");
				document.querySelector("html").style.colorScheme = "light";
				localStorage.setItem("dark-mode", false);
				document.dispatchEvent(
					new CustomEvent("darkMode", { detail: { mode: "off" } }),
				);
			}
			setTimeout(() => {
				document.documentElement.classList.remove("[&_*]:!transition-none");
			}, 1);
		});
	});
}
