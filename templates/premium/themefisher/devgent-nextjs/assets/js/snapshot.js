document.addEventListener('DOMContentLoaded', function () {
  var modal = document.querySelector('#searchModal');
  var searchTrigger = document.querySelector('[data-search-trigger]');
  var searchOverlay = document.querySelector('#searchModalOverlay');
  var searchInput = document.querySelector('#searchInput');

  function closeSearch() {
    if (modal) modal.classList.remove('show');
  }

  if (searchTrigger && modal) {
    searchTrigger.addEventListener('click', function () {
      modal.classList.add('show');
      if (searchInput) searchInput.focus();
    });
  }

  if (searchOverlay) searchOverlay.addEventListener('click', closeSearch);
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeSearch();
  });

  var answers = {
    'Do you offer a discount for annual plans?': 'Yes, we offer a 20% discount on all annual plans. Contact us for more information.',
    'Can I use my own domain?': 'Yes, you can use your own domain with all plans. Go to your account settings to set up your custom domain.',
    'Do you offer phone support?': 'Yes, we offer phone support for all customers. Contact us during business hours for assistance.',
    'How secure is my financial data on your platform?': 'We take the security and privacy of your financial data very seriously. Our platform employs industry-standard encryption protocols to safeguard your information during transmission and storage.',
    'Do you offer a free plan?': 'Yes, we offer a free plan with limited features. Upgrade to a paid plan for full access to all features.',
    'Can I change my password?': 'Yes, you can change your password at any time. Go to your account settings to update your password.'
  };

  function closeAccordion(button) {
    var panel = button.nextElementSibling;
    var icon = button.querySelector('.accordion-icon');
    var vertical = icon && icon.querySelector('line');
    panel.style.height = '0px';
    if (icon) icon.classList.remove('rotate-180', 'opacity-100');
    if (icon) icon.classList.add('opacity-50');
    if (vertical) vertical.classList.remove('opacity-0');
    if (vertical) vertical.classList.add('opacity-100');
    button.dataset.open = 'false';
  }

  document.querySelectorAll('.accordion-header').forEach(function (button) {
    var panel = button.nextElementSibling;
    var answer = answers[button.innerText.trim()];
    if (panel && answer && !panel.firstElementChild) {
      panel.innerHTML = '<div class="accordion-content [&amp;_*]:text-lg [&amp;_*]:m-0">' + answer + '</div>';
    }
    button.dataset.open = 'false';
    button.addEventListener('click', function () {
      var opening = button.dataset.open !== 'true';
      document.querySelectorAll('.accordion-header').forEach(closeAccordion);
      if (!opening || !panel) return;
      var icon = button.querySelector('.accordion-icon');
      var vertical = icon && icon.querySelector('line');
      panel.style.height = panel.scrollHeight + 'px';
      if (icon) icon.classList.remove('opacity-50');
      if (icon) icon.classList.add('rotate-180', 'opacity-100');
      if (vertical) vertical.classList.remove('opacity-100');
      if (vertical) vertical.classList.add('opacity-0');
      button.dataset.open = 'true';
    });
  });

  document.querySelectorAll('[data-modal-trigger]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var target = document.querySelector('[data-modal="' + trigger.dataset.modalTrigger + '"]');
      if (!target) return;
      target.style.display = 'flex';
      var overlay = target.querySelector('[data-modal-overlay]');
      if (overlay) overlay.style.display = 'block';
    });
  });

  document.querySelectorAll('[data-modal]').forEach(function (target) {
    function closeModal() {
      target.style.display = 'none';
      var overlay = target.querySelector('[data-modal-overlay]');
      if (overlay) overlay.style.display = 'none';
    }
    target.querySelectorAll('[data-modal-close], [data-modal-overlay]').forEach(function (element) {
      element.addEventListener('click', closeModal);
    });
  });

  var pricingSwitch = document.querySelector('#pricing-switch');
  if (pricingSwitch) {
    pricingSwitch.addEventListener('change', function () {
      var yearly = pricingSwitch.checked;
      document.querySelectorAll('.data-count').forEach(function (count) {
        count.textContent = yearly ? count.dataset.countYearly : count.dataset.countMonthly;
      });
      document.querySelectorAll('.text-monthly').forEach(function (element) {
        element.classList.toggle('hidden', yearly);
      });
      document.querySelectorAll('.text-yearly').forEach(function (element) {
        element.classList.toggle('hidden', !yearly);
      });
    });
  }

  var featureButtons = Array.from(document.querySelectorAll('.features-tab'));
  if (featureButtons.length && window.devgentFeaturePanels) {
    var panel = featureButtons[0].parentElement.parentElement.nextElementSibling;
    featureButtons.forEach(function (button, index) {
      button.addEventListener('click', function () {
        featureButtons.forEach(function (item) {
          item.classList.remove('active');
        });
        button.classList.add('active');
        if (panel && window.devgentFeaturePanels[index]) {
          panel.outerHTML = window.devgentFeaturePanels[index];
          panel = featureButtons[0].parentElement.parentElement.nextElementSibling;
        }
      });
    });
  }
});
