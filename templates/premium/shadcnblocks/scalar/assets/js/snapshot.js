const setExpanded = (trigger, expanded) => {
  trigger.setAttribute("aria-expanded", String(expanded))
  trigger.setAttribute("data-state", expanded ? "open" : "closed")
  const target = trigger.getAttribute("aria-controls")
  if (!target) return
  const content = document.getElementById(target)
  content?.setAttribute("data-state", expanded ? "open" : "closed")
  content?.toggleAttribute("hidden", !expanded)
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

const syncInvertedFooter = (dark) => {
  const footer = document.querySelector("footer.overflow-hidden")
  if (!footer) return
  footer.className = dark ? "overflow-hidden light bg-foreground text-background [&_*]:border-border/30" : "overflow-hidden dark bg-background text-foreground"
}

const syncThemeAssets = (dark) => {
  document.querySelectorAll("pre.shiki").forEach((block) => {
    block.classList.toggle("github-light-default", !dark)
    block.classList.toggle("github-dark-high-contrast", dark)
    block.setAttribute("style", dark ? "background-color:#0a0c10;color:#f0f3f6" : "background-color:#ffffff;color:#1f2328")
    const colors = {
      "#6E7781": "#BDC4CC",
      "#1F2328": "#F0F3F6",
      "#CF222E": "#FF9492",
      "#0A3069": "#ADDCFF",
      "#0550AE": "#91CBFF",
      "#8250DF": "#DBB7FF",
    }
    block.querySelectorAll("span[style]").forEach((span) => {
      const style = span.getAttribute("style")
      const match = style.match(/#[0-9A-Fa-f]{6}/)
      if (!match) return
      const light = Object.keys(colors).find((value) => value.toLowerCase() === match[0].toLowerCase())
      const darkColor = Object.entries(colors).find(([, value]) => value.toLowerCase() === match[0].toLowerCase())
      const next = dark ? colors[light] || match[0] : darkColor?.[0] || match[0]
      span.setAttribute("style", style.replace(match[0], next))
    })
  })
  document.querySelectorAll('img[src*="logo-wordmark.svg"]').forEach((image) => {
    image.classList.toggle("invert", !dark)
    image.classList.toggle("invert-0", dark)
  })
}

const storedTheme = localStorage.getItem("theme")
if (storedTheme) {
  document.documentElement.classList.toggle("dark", storedTheme === "dark")
  document.documentElement.classList.toggle("light", storedTheme === "light")
  document.documentElement.style.colorScheme = storedTheme
  syncInvertedFooter(storedTheme === "dark")
  syncThemeAssets(storedTheme === "dark")
}

document.querySelectorAll('[aria-label="Close banner"]').forEach((button) => button.addEventListener("click", () => button.closest("div")?.remove()))

document.querySelectorAll('button[data-theme-toggle], button[aria-label="Toggle Theme"]').forEach((button) => button.addEventListener("click", () => {
  const dark = document.documentElement.classList.toggle("dark")
  document.documentElement.classList.toggle("light", !dark)
  document.documentElement.classList.add("theme-transition")
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
  localStorage.setItem("theme", dark ? "dark" : "light")
  syncInvertedFooter(dark)
  syncThemeAssets(dark)
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

document.querySelectorAll('button[role="checkbox"]').forEach((checkbox) => checkbox.addEventListener("click", () => {
  const checked = checkbox.getAttribute("aria-checked") !== "true"
  checkbox.setAttribute("aria-checked", String(checked))
  checkbox.setAttribute("data-state", checked ? "checked" : "unchecked")
}))

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))
