const setExpanded = (trigger, expanded) => {
  trigger.setAttribute("aria-expanded", String(expanded))
  trigger.setAttribute("data-state", expanded ? "open" : "closed")
  const target = trigger.getAttribute("aria-controls")
  if (target) {
    const content = document.getElementById(target)
    content?.setAttribute("data-state", expanded ? "open" : "closed")
    content?.toggleAttribute("hidden", !expanded)
  }
}

document.querySelectorAll('[aria-label="Close banner"]').forEach((button) => button.addEventListener("click", () => {
  const banner = button.closest("div")
  banner?.remove()
}))

document.querySelectorAll('button[data-theme-toggle], button[aria-label="Toggle Theme"]').forEach((button) => button.addEventListener("click", () => {
  const dark = document.documentElement.classList.toggle("dark")
  document.documentElement.classList.toggle("light", !dark)
  document.documentElement.classList.add("theme-transition")
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
  localStorage.setItem("theme", dark ? "dark" : "light")
  setTimeout(() => document.documentElement.classList.remove("theme-transition"), 500)
}))

document.querySelectorAll('button[data-slot="navigation-menu-trigger"], button[data-slot="accordion-trigger"]').forEach((trigger) => trigger.addEventListener("click", () => {
  setExpanded(trigger, trigger.getAttribute("aria-expanded") !== "true")
}))

document.querySelectorAll('button[role="tab"]').forEach((tab) => tab.addEventListener("click", () => {
  const list = tab.closest('[role="tablist"]')
  list?.querySelectorAll('button[role="tab"]').forEach((item) => {
    const active = item === tab
    item.setAttribute("aria-selected", String(active))
    item.setAttribute("data-state", active ? "active" : "inactive")
    const panel = document.getElementById(item.getAttribute("aria-controls"))
    panel?.setAttribute("data-state", active ? "active" : "inactive")
    panel?.toggleAttribute("hidden", !active)
  })
}))

document.querySelectorAll('button[data-slot="carousel-next"], button[data-slot="carousel-previous"]').forEach((button) => button.addEventListener("click", () => {
  const viewport = button.closest("section")?.querySelector("[data-slot=carousel-content]")
  const track = viewport?.firstElementChild
  if (!track) return
  const current = Number(track.getAttribute("data-slide") || 0)
  const direction = button.getAttribute("data-slot") === "carousel-next" ? 1 : -1
  const count = track.children.length
  const next = Math.max(0, Math.min(count - 1, current + direction))
  track.setAttribute("data-slide", String(next))
  track.style.transform = `translate3d(-${next * 100}%, 0, 0)`
}))

document.querySelectorAll('button[aria-label="Open Sidebar"]').forEach((button) => button.addEventListener("click", () => document.body.classList.toggle("docs-sidebar-open")))
document.querySelectorAll('button[aria-label="Collapse Sidebar"]').forEach((button) => button.addEventListener("click", () => {
  const collapsed = button.getAttribute("data-collapsed") !== "true"
  button.setAttribute("data-collapsed", String(collapsed))
  document.body.classList.toggle("docs-sidebar-collapsed", collapsed)
}))

document.querySelectorAll('input[type="password"]').forEach((input) => {
  input.parentElement?.querySelector('button[type="button"]')?.addEventListener("click", () => {
    input.type = input.type === "password" ? "text" : "password"
  })
})

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))
