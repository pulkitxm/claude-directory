const applyTheme = (dark) => {
  document.documentElement.classList.toggle("dark", dark)
  document.documentElement.classList.toggle("light", !dark)
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
  localStorage.setItem("theme", dark ? "dark" : "light")
}

const storedTheme = localStorage.getItem("theme")
if (storedTheme) applyTheme(storedTheme === "dark")

document.querySelectorAll('[aria-label="Close banner"]').forEach((button) => button.addEventListener("click", () => button.closest("div")?.remove()))

document.querySelectorAll("button:has(.lucide-sun)").forEach((button) => button.addEventListener("click", () => applyTheme(!document.documentElement.classList.contains("dark"))))

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
