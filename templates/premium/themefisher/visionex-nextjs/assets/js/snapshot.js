const navToggle = document.querySelector("#nav-toggle")
const navMenu = document.querySelector("#nav-menu")
const showButton = document.querySelector("#show-button")
const hideButton = document.querySelector("#hide-button")

navToggle?.addEventListener("change", () => {
  navMenu?.classList.toggle("hidden", !navToggle.checked)
  showButton?.classList.toggle("hidden", navToggle.checked)
  hideButton?.classList.toggle("hidden", !navToggle.checked)
})

document.querySelectorAll(".nav-dropdown > .nav-link").forEach((trigger) => {
  trigger.addEventListener("click", () => trigger.nextElementSibling?.classList.toggle("hidden"))
})

document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => header.closest(".accordion")?.classList.toggle("active"))
})

const activate = (button) => {
  button.parentElement?.querySelectorAll(":scope > button").forEach((item) => item.classList.toggle("bg-primary", item === button))
}

document.querySelectorAll("button").forEach((button) => {
  const label = button.textContent.trim()
  if (["Select Writing", "Generate Content", "Describe Topic"].includes(label)) button.addEventListener("click", () => activate(button))
  if (["Monthly", "Yearly"].includes(label)) button.addEventListener("click", () => {
    activate(button)
    const prices = label === "Yearly" ? ["$199", "$499", "$1199"] : ["$19", "$49", "$119"]
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const matches = []
    while (walker.nextNode()) {
      if (/^\$(?:19|49|119|199|499|1199)$/.test(walker.currentNode.nodeValue.trim())) matches.push(walker.currentNode)
    }
    matches.slice(0, 3).forEach((node, index) => {
      node.nodeValue = node.nodeValue.replace(/\$\d+/, prices[index])
    })
  })
})

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))
document.querySelectorAll('button[type="submit"]').forEach((button) => button.addEventListener("click", (event) => event.preventDefault()))
