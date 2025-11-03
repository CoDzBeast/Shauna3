(function () {
  const body = document.body;
  body.classList.remove('no-js');

  const header = document.querySelector('[data-header]');
  const toggle = header?.querySelector('.menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  const setMenuState = (open) => {
    if (!toggle || !mobileMenu) return;
    toggle.setAttribute('aria-expanded', String(open));
    mobileMenu.hidden = !open;
    body.classList.toggle('mobile-open', open);
    if (open) {
      mobileMenu.querySelector('a')?.focus({ preventScroll: true });
    } else {
      toggle.focus({ preventScroll: true });
    }
  };

  toggle?.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  mobileMenu?.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.tagName === 'A') {
      setMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileMenu && toggle) {
      if (!mobileMenu.hidden) {
        setMenuState(false);
      }
    }
  });

  const scrollThreshold = 120;
  const updateScrollState = () => {
    if (window.scrollY >= scrollThreshold) {
      body.classList.add('scrolled');
    } else {
      body.classList.remove('scrolled');
    }
  };

  document.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();
})();
