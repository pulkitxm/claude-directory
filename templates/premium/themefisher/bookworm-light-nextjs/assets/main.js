(function () {
  var searchTrigger = document.querySelector('[data-search-open]');
  var searchModal = document.querySelector('.search-modal');
  var searchClose = document.querySelector('.search-close');
  if (searchTrigger && searchModal) {
    searchTrigger.addEventListener('click', function () {
      searchModal.classList.add('open');
      var input = searchModal.querySelector('input');
      if (input) input.focus();
    });
  }
  if (searchClose && searchModal) {
    searchClose.addEventListener('click', function () {
      searchModal.classList.remove('open');
    });
  }
  if (searchModal) {
    searchModal.addEventListener('click', function (e) {
      if (e.target === searchModal) searchModal.classList.remove('open');
    });
  }

  var header = document.querySelector('header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
})();
