const applyTheme = (dark) => {
  document.documentElement.classList.toggle("dark", dark)
  document.documentElement.classList.toggle("light", !dark)
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
  localStorage.setItem("theme", dark ? "dark" : "light")
}

const projectRoot = new URL("../../", document.currentScript.src)

document.querySelectorAll('[href^="/"]').forEach((element) => {
  const href = element.getAttribute("href")
  if (href?.startsWith("//")) return
  element.setAttribute("href", new URL(href.slice(1), projectRoot).href)
})

document.querySelectorAll('[action^="/"]').forEach((element) => {
  const action = element.getAttribute("action")
  if (action?.startsWith("//")) return
  element.setAttribute("action", new URL(action.slice(1), projectRoot).href)
})

const storedTheme = localStorage.getItem("theme")
if (storedTheme) applyTheme(storedTheme === "dark")

document.querySelectorAll('[aria-label="Close banner"]').forEach((button) => button.addEventListener("click", () => button.closest("div")?.remove()))

document.querySelectorAll("button:has(.lucide-sun)").forEach((button) => button.addEventListener("click", () => applyTheme(!document.documentElement.classList.contains("dark"))))

document.querySelectorAll("button").forEach((button) => {
  if (!button.textContent.includes("Open main menu")) return
  button.addEventListener("click", () => {
    const panel = button.closest("header")?.querySelector(":scope > div.absolute.inset-x-0.top-full")
    if (!panel) return
    const open = panel.classList.contains("pointer-events-none")
    panel.classList.toggle("pointer-events-none", !open)
    panel.classList.toggle("-translate-y-full", !open)
    panel.classList.toggle("opacity-0", !open)
    panel.classList.toggle("pointer-events-auto", open)
    panel.classList.toggle("translate-y-0", open)
    panel.classList.toggle("opacity-100", open)
    button.setAttribute("aria-expanded", String(open))
  })
})

document.querySelectorAll('button[data-radix-collection-item][aria-expanded], button[aria-label="Product menu"]').forEach((trigger) => trigger.addEventListener("click", () => {
  const expanded = trigger.getAttribute("aria-expanded") !== "true"
  trigger.setAttribute("aria-expanded", String(expanded))
  trigger.setAttribute("data-state", expanded ? "open" : "closed")
  const target = trigger.getAttribute("aria-controls")
  if (target) {
    const content = document.getElementById(target)
    content?.setAttribute("data-state", expanded ? "open" : "closed")
    content?.toggleAttribute("hidden", !expanded)
  }
}))

document.querySelectorAll('button[role="tab"]').forEach((tab) => tab.addEventListener("click", () => {
  const list = tab.closest('[role="tablist"]') || tab.parentElement
  list?.querySelectorAll('button[role="tab"]').forEach((item) => {
    const active = item === tab
    item.setAttribute("aria-selected", String(active))
    item.setAttribute("data-state", active ? "active" : "inactive")
    item.tabIndex = active ? 0 : -1
    const panel = document.getElementById(item.getAttribute("aria-controls"))
    panel?.toggleAttribute("hidden", !active)
  })
}))

document.querySelectorAll('button[data-slot="accordion-trigger"]').forEach((trigger) => trigger.addEventListener("click", () => {
  const expanded = trigger.getAttribute("aria-expanded") !== "true"
  trigger.setAttribute("aria-expanded", String(expanded))
  trigger.setAttribute("data-state", expanded ? "open" : "closed")
  const content = document.getElementById(trigger.getAttribute("aria-controls"))
  content?.setAttribute("data-state", expanded ? "open" : "closed")
  content?.toggleAttribute("hidden", !expanded)
}))

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))
