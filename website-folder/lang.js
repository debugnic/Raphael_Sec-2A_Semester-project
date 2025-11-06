// lang.js
// Bilingual toggle with auto-detect and persistence across pages
(function() {
  const buttons = document.querySelectorAll('.lang-btn');

  function setButtonPressed(lang) {
    buttons.forEach(b => {
      const isActive = b.dataset.lang === lang;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-pressed', String(isActive));
    });
  }

  function applyLanguage(lang) {
    // Persist preference
    localStorage.setItem('lang', lang);

    // Toggle content visibility
    document.querySelectorAll('.lang-id, .lang-en').forEach(el => {
      el.style.display = el.classList.contains('lang-' + lang) ? '' : 'none';
    });

    // Update document language for accessibility
    document.documentElement.lang = lang;

    // Update toggle state
    setButtonPressed(lang);
  }

  // Determine initial language: load from storage, else auto-detect
  function initialLanguage() {
    const saved = localStorage.getItem('lang');
    if (saved === 'id' || saved === 'en') return saved;

    const navLangs = navigator.languages || [navigator.language || navigator.userLanguage || 'en'];
    const primary = (Array.isArray(navLangs) ? navLangs[0] : navLangs) || 'en';
    return String(primary).toLowerCase().startsWith('id') ? 'id' : 'en';
  }

  // Initialize
  const current = initialLanguage();
  applyLanguage(current);

  // Bind click handlers
  buttons.forEach(b => {
    b.addEventListener('click', () => {
      const lang = b.dataset.lang;
      if (lang === 'id' || lang === 'en') applyLanguage(lang);
    });
  });

  // Optional: observe dynamic content insertions (if any)
  // and re-apply visibility. Safe no-op for static pages.
  const observer = new MutationObserver(() => {
    const lang = localStorage.getItem('lang') || current;
    applyLanguage(lang);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
