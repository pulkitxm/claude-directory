const setExpanded = (trigger, expanded) => {
  trigger.setAttribute("aria-expanded", String(expanded))
  trigger.setAttribute("data-state", expanded ? "open" : "closed")
  const target = trigger.getAttribute("aria-controls")
  if (target) {
    const content = document.getElementById(target)
    content?.setAttribute("data-state", expanded ? "open" : "closed")
    content?.toggleAttribute("hidden", !expanded)
  } else {
    const item = trigger.closest("div[data-state]")
    const content = item?.querySelector('[data-slot="accordion-content"]')
    item?.setAttribute("data-state", expanded ? "open" : "closed")
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

const productLinks = `
  <a href="product/" class="flex items-center gap-3 rounded-sm p-3 transition-all hover:bg-accent">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v6l4 2"></path><circle cx="12" cy="12" r="10"></circle></svg>
    <span><strong class="block text-sm font-medium">Configurable Observability</strong><span class="text-muted-foreground block text-xs leading-snug">This is a subtext that explains a part of the item</span></span>
  </a>
  <a href="product/" class="flex items-center gap-3 rounded-sm p-3 transition-all hover:bg-accent">
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a5 5 0 0 0-5 5v4a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"></path><path d="M8 15v2a4 4 0 0 0 8 0v-2"></path></svg>
    <span><strong class="block text-sm font-medium">Plasma AI</strong><span class="text-muted-foreground block text-xs leading-snug">This is a subtext that explains a part of the item</span></span>
  </a>`

document.querySelectorAll('button[data-slot="navigation-menu-trigger"]').forEach((trigger) => trigger.addEventListener("click", () => {
  const item = trigger.closest("li")
  let menu = item?.querySelector('[data-slot="navigation-menu-content"]')
  if (trigger.getAttribute("aria-expanded") === "true") {
    if (!menu) {
      menu = document.createElement("div")
      menu.setAttribute("data-slot", "navigation-menu-content")
      menu.className = "bg-popover/95 text-popover-foreground absolute top-full left-0 z-50 mt-1.5 w-[263px] rounded-xl p-2 shadow"
      menu.innerHTML = productLinks
      item?.append(menu)
    }
  } else {
    menu?.remove()
  }
}))

document.querySelectorAll('button[data-slot="accordion-trigger"]').forEach((trigger) => {
  if (!trigger.textContent.trim().startsWith("Products")) return
  const content = trigger.closest("div[data-state]")?.querySelector('[data-slot="accordion-content"]')
  if (content) content.innerHTML = `<div class="grid gap-1 p-2">${productLinks}</div>`
})

document.querySelectorAll("button").forEach((button) => {
  if (!button.textContent.includes("Open main menu")) return
  const menu = button.parentElement?.nextElementSibling
  button.addEventListener("click", () => {
    const open = menu?.classList.contains("pointer-events-none")
    menu?.classList.toggle("pointer-events-none", !open)
    menu?.classList.toggle("translate-x-full", !open)
    menu?.classList.toggle("opacity-0", !open)
    menu?.classList.toggle("pointer-events-auto", open)
    menu?.classList.toggle("translate-x-0", open)
    menu?.classList.toggle("opacity-100", open)
    button.setAttribute("aria-expanded", String(open))
  })
  menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => button.click()))
})

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
