const navbarToggle = document.querySelector(".navbar-toggler")
const navbarWrapper = document.querySelector(".navbar-wrapper")

const metrics = [["Client Retention", "94"], ["Emails Per Month", "70"], ["Monthly Campaigns", "10"]]
metrics.forEach(([label, value]) => {
  const caption = [...document.querySelectorAll("p,span,div")].find((item) => item.textContent.trim() === label)
  const number = caption?.previousElementSibling?.querySelector("span")
  if (number) number.textContent = value
})

navbarToggle?.addEventListener("click", () => {
  navbarToggle.classList.toggle("open")
  navbarWrapper?.classList.toggle("open")
  navbarWrapper?.classList.toggle("hidden")
})

document.querySelector(".notice-close-btn")?.addEventListener("click", (event) => event.currentTarget.closest("section,div")?.remove())

document.querySelectorAll(".accordion-header").forEach((header) => header.addEventListener("click", () => {
  const accordion = header.closest(".accordion")
  accordion?.classList.toggle("active")
  const content = accordion?.querySelector(".accordion-content")
  if (content) content.style.maxHeight = accordion.classList.contains("active") ? `${content.scrollHeight}px` : "0px"
}))

document.querySelectorAll(".tab").forEach((tab) => {
  const controls = [...tab.querySelectorAll(".tab-nav-item")]
  const panels = [...tab.querySelectorAll(".tab-content")]
  controls.forEach((control, index) => control.addEventListener("click", () => {
    controls.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === index))
    panels.forEach((panel, panelIndex) => {
      panel.classList.toggle("block", panelIndex === index)
      panel.classList.toggle("hidden", panelIndex !== index)
    })
  }))
})

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))
