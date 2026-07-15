const faqAnswers = {
  "How secure is my financial data on your platform?": "We take the security and privacy of your financial data very seriously. Our platform employs industry-standard encryption protocols to safeguard your information during transmission and storage.",
  "Do you offer phone support?": "Yes, we offer phone support for all customers. Contact us during business hours for assistance.",
  "Can I use my own domain?": "Yes, you can use your own domain with all plans. Go to your account settings to set up your custom domain.",
  "Do you offer a discount for annual plans?": "Yes, we offer a 20% discount on all annual plans. Contact us for more information.",
  "Can I change my password?": "Yes, you can change your password at any time. Go to your account settings to update your password.",
  "Do you offer a free plan?": "Yes, we offer a free plan with limited features. Upgrade to a paid plan for full access to all features."
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return
    entry.target.classList.add("aos-animate")
    revealObserver.unobserve(entry.target)
  })
}, { threshold: 0.05 })

document.querySelectorAll("[data-aos]:not(.aos-animate)").forEach((element) => revealObserver.observe(element))

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
  trigger.addEventListener("click", () => trigger.parentElement.classList.toggle("active"))
})

document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const accordion = button.closest(".accordion")
    const panel = button.nextElementSibling
    const heading = button.querySelector("h5")?.textContent.trim()
    const answer = faqAnswers[heading]
    const opening = button.getAttribute("aria-expanded") !== "true"
    accordion?.parentElement?.parentElement?.querySelectorAll(".accordion-header[aria-expanded='true']").forEach((openButton) => {
      if (openButton === button) return
      openButton.setAttribute("aria-expanded", "false")
      openButton.nextElementSibling.style.height = "0px"
    })
    button.setAttribute("aria-expanded", String(opening))
    if (answer && panel && !panel.textContent.trim()) panel.innerHTML = `<div class="pt-4 pb-6 text-text">${answer}</div>`
    if (panel) panel.style.height = opening ? `${panel.scrollHeight}px` : "0px"
    button.querySelector("svg")?.classList.toggle("rotate-180", !opening)
    accordion?.classList.toggle("active", opening)
  })
})

document.querySelectorAll(".tab").forEach((tab) => {
  const controls = [...tab.querySelectorAll(".tab-nav-item")]
  const panels = [...tab.querySelectorAll(".tab-content")]
  controls.forEach((control, index) => {
    control.addEventListener("click", () => {
      controls.forEach((item, itemIndex) => {
        item.classList.toggle("active", itemIndex === index)
        item.tabIndex = itemIndex === index ? 0 : -1
      })
      panels.forEach((panel, panelIndex) => {
        panel.classList.toggle("block", panelIndex === index)
        panel.classList.toggle("hidden", panelIndex !== index)
      })
    })
  })
})

document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", (event) => event.preventDefault()))

document.querySelectorAll("lite-youtube").forEach((player) => {
  player.style.display = "block"
  player.style.aspectRatio = "16 / 9"
})

function sizeSliders() {
  document.querySelectorAll(".gallery-slider").forEach((slider) => {
    const gaps = innerWidth < 640 ? 1 : innerWidth < 1024 ? 3 : 4
    const width = (slider.clientWidth - gaps * 24) / (gaps + 1)
    slider.querySelectorAll(".swiper-slide").forEach((slide) => {
      slide.style.width = `${width}px`
      slide.style.marginRight = "24px"
    })
    const wrapper = slider.querySelector(".swiper-wrapper")
    if (wrapper) wrapper.style.transform = `translate3d(-${width + 24}px, 0px, 0px)`
  })
  document.querySelectorAll(".review-slider").forEach((slider) => {
    const width = slider.clientWidth
    slider.querySelectorAll(".swiper-slide").forEach((slide) => {
      slide.style.width = `${width}px`
      slide.style.marginRight = "24px"
    })
    const wrapper = slider.querySelector(".swiper-wrapper")
    const offset = innerWidth >= 1024 ? (width + 24) * 2 : width + 24
    if (wrapper) wrapper.style.transform = `translate3d(-${offset}px, 0px, 0px)`
  })
}

sizeSliders()
addEventListener("resize", sizeSliders)
