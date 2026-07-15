

(function () {
	"use strict";


	const sidebar = document.getElementById("sidebar");
	const overlay = document.getElementById("sidebarOverlay");
	const mobileMenuBtn = document.getElementById("mobileMenuBtn");
	const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
	const sidebarCollapseBtn = document.getElementById("sidebarCollapseBtn");
	const chatTextarea = document.getElementById("chatTextarea");
	const sendBtn = document.getElementById("sendBtn");
	const chatInputBox = document.getElementById("chatInputBox");


	function openSidebar() {
		sidebar.classList.add("is-open");
		overlay.classList.add("is-visible");
		sidebar.setAttribute("aria-hidden", "false");
		mobileMenuBtn.setAttribute("aria-expanded", "true");
		document.body.style.overflow = "hidden";
		const firstButton = sidebar.querySelector("button");
		if (firstButton) firstButton.focus();
	}

	function closeSidebar(restoreFocus) {
		sidebar.classList.remove("is-open");
		overlay.classList.remove("is-visible");
		sidebar.setAttribute("aria-hidden", "true");
		mobileMenuBtn.setAttribute("aria-expanded", "false");
		document.body.style.overflow = "";
		if (restoreFocus) mobileMenuBtn.focus();
	}

	if (mobileMenuBtn) {
		mobileMenuBtn.setAttribute("aria-controls", "sidebar");
		mobileMenuBtn.setAttribute("aria-expanded", "false");
		mobileMenuBtn.addEventListener("click", openSidebar);
	}
	if (sidebarCloseBtn) sidebarCloseBtn.addEventListener("click", function () { closeSidebar(true); });
	if (overlay) overlay.addEventListener("click", function () { closeSidebar(true); });
	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape" && sidebar.classList.contains("is-open")) closeSidebar(true);
	});


	let sidebarCollapsed = false;
	if (sidebarCollapseBtn) {
		sidebarCollapseBtn.addEventListener("click", function () {
			sidebarCollapsed = !sidebarCollapsed;
			if (sidebarCollapsed) {
				sidebar.style.width = "0";
				sidebar.style.padding = "0";
				sidebar.style.overflow = "hidden";
				sidebar.style.borderRight = "none";
			} else {
				sidebar.style.width = "";
				sidebar.style.padding = "";
				sidebar.style.overflow = "";
				sidebar.style.borderRight = "";
			}
			sidebarCollapseBtn.setAttribute("aria-expanded", String(!sidebarCollapsed));
		});
		sidebarCollapseBtn.setAttribute("aria-expanded", "true");
	}


	function updateTextarea() {
		if (!chatTextarea) return;
		chatTextarea.style.height = "auto";
		chatTextarea.style.height = Math.min(chatTextarea.scrollHeight, 200) + "px";

		const hasContent = chatTextarea.value.trim().length > 0;
		if (sendBtn) {
			sendBtn.disabled = !hasContent;
		}
	}

	if (chatTextarea) {
		chatTextarea.addEventListener("input", updateTextarea);


		chatTextarea.addEventListener("focus", function () {
			if (chatInputBox) chatInputBox.classList.add("focused");
		});
		chatTextarea.addEventListener("blur", function () {
			if (chatInputBox) chatInputBox.classList.remove("focused");
		});


		chatTextarea.addEventListener("keydown", function (e) {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				if (!sendBtn.disabled) {
					handleSend();
				}
			}
		});
	}


	function handleSend() {
		if (chatTextarea) {
			chatTextarea.value = "";
			updateTextarea();
		}
	}

	if (sendBtn) {
		sendBtn.addEventListener("click", handleSend);
	}


	const chips = document.querySelectorAll(".chat-action-chip");
	chips.forEach(function (chip) {
		chip.addEventListener("click", function () {
			if (chatTextarea) {
				chatTextarea.value = chip.textContent.trim();
				updateTextarea();
				chatTextarea.focus();
			}
		});
	});


	const navBtns = document.querySelectorAll(
		".sidebar-nav-btn, .sidebar-project-btn, .sidebar-chat-btn",
	);
	navBtns.forEach(function (btn) {
		btn.addEventListener("click", function () {
			const group = btn.classList.contains("sidebar-nav-btn")
				? ".sidebar-nav-btn"
				: btn.classList.contains("sidebar-project-btn")
					? ".sidebar-project-btn"
					: ".sidebar-chat-btn";
			document.querySelectorAll(group).forEach(function (b) {
				b.classList.remove("active");
			});
			btn.classList.add("active");
		});
	});


	updateTextarea();
})();
