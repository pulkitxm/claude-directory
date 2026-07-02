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
			if (lightSwitch.checked) {
				document.documentElement.classList.add("dark");
				localStorage.setItem("dark-mode", true);
			} else {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("dark-mode", false);
			}
		});
	});
}
