// AI Chat Template — script.js

(function () {
	"use strict";

	// --- Elements ---
	const sidebar = document.getElementById("sidebar");
	const overlay = document.getElementById("sidebarOverlay");
	const mobileMenuBtn = document.getElementById("mobileMenuBtn");
	const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
	const sidebarCollapseBtn = document.getElementById("sidebarCollapseBtn");
	const chatTextarea = document.getElementById("chatTextarea");
	const sendBtn = document.getElementById("sendBtn");
	const chatInputBox = document.getElementById("chatInputBox");

	// --- Mobile sidebar toggle ---
	function openSidebar() {
		sidebar.classList.add("is-open");
		overlay.classList.add("is-visible");
		document.body.style.overflow = "hidden";
	}

	function closeSidebar() {
		sidebar.classList.remove("is-open");
		overlay.classList.remove("is-visible");
		document.body.style.overflow = "";
	}

	if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openSidebar);
	if (sidebarCloseBtn) sidebarCloseBtn.addEventListener("click", closeSidebar);
	if (overlay) overlay.addEventListener("click", closeSidebar);

	// --- Desktop sidebar collapse ---
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
		});
	}

	// --- Textarea auto-resize + send button enable ---
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

		// Focus border effect on the input box
		chatTextarea.addEventListener("focus", function () {
			if (chatInputBox) chatInputBox.classList.add("focused");
		});
		chatTextarea.addEventListener("blur", function () {
			if (chatInputBox) chatInputBox.classList.remove("focused");
		});

		// Submit on Enter (without Shift)
		chatTextarea.addEventListener("keydown", function (e) {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				if (!sendBtn.disabled) {
					handleSend();
				}
			}
		});
	}

	// --- Send action (demo — just clears the textarea) ---
	function handleSend() {
		if (chatTextarea) {
			chatTextarea.value = "";
			updateTextarea();
		}
	}

	if (sendBtn) {
		sendBtn.addEventListener("click", handleSend);
	}

	// --- Quick action chips fill in placeholder text ---
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

	// --- Sidebar nav button highlight ---
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

	// Initial setup
	updateTextarea();
})();
