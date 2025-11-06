// lang.js
// Auto-detect + persistent bilingual toggle; accessible Pages dropdown support.
// Place this file in the same folder as the HTML files and include once before </body>.
(function () {
  const ID_CLASS = 'lang-id';
  const EN_CLASS = 'lang-en';
  const BTN_SELECTOR = '.lang-btn';
  const PAGES_TOGGLE = '.pages-toggle';
  const PAGES_MENU = '.pages-menu';
  const STORAGE_KEY = 'lang';

  function safeGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function safeSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { } }

  function detectBrowserLang() {
    try {
      const navs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || navigator.userLanguage || 'en'];
      const primary = (Array.isArray(navs) ? navs[0] : navs) || 'en';
      return String(primary).toLowerCase().startsWith('id') ? 'id' : 'en';
    } catch (e) {
      return 'en';
    }
  }

  function currentLang() {
    const saved = safeGet(STORAGE_KEY);
    if (saved === 'id' || saved === 'en') return saved;
    return detectBrowserLang();
  }

  function hideAllLanguages() {
    document.querySelectorAll('.' + ID_CLASS).forEach(el => { el.style.display = 'none'; });
    document.querySelectorAll('.' + EN_CLASS).forEach(el => { el.style.display = 'none'; });
  }

  function showLanguage(lang) {
    hideAllLanguages();
    if (lang === 'id') {
      document.querySelectorAll('.' + ID_CLASS).forEach(el => { el.style.display = ''; });
      document.documentElement.lang = 'id';
    } else {
      document.querySelectorAll('.' + EN_CLASS).forEach(el => { el.style.display = ''; });
      document.documentElement.lang = 'en';
    }

    document.querySelectorAll(BTN_SELECTOR).forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    safeSet(STORAGE_KEY, lang);
  }

  function initPagesDropdown() {
    const dd = document.querySelector('.pages-dropdown');
    if (!dd) return;
    const toggle = dd.querySelector(PAGES_TOGGLE);
    const menu = dd.querySelector(PAGES_MENU);
    if (!toggle || !menu) return;

    menu.style.display = 'none';
    toggle.setAttribute('aria-expanded', 'false');

    function setOpen(open) {
      menu.style.display = open ? 'block' : 'none';
      toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    document.addEventListener('click', function (e) {
      if (!dd.contains(e.target)) setOpen(false);
    });

    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { setOpen(false); toggle.focus(); }
      if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); const first = menu.querySelector('a'); if (first) first.focus(); }
    });
  }

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Defensive baseline
    hideAllLanguages();

    const lang = currentLang();
    showLanguage(lang);

    document.querySelectorAll(BTN_SELECTOR).forEach(btn => {
      btn.addEventListener('click', function () {
        const target = btn.dataset.lang;
        if (target === 'id' || target === 'en') showLanguage(target);
      });
    });

    initPagesDropdown();

    const obs = new MutationObserver(() => showLanguage(safeGet(STORAGE_KEY) || currentLang()));
    obs.observe(document.body, { childList: true, subtree: true });
  }

  try { init(); } catch (e) {
    try { document.querySelectorAll('.' + ID_CLASS).forEach(el => el.style.display = ''); document.querySelectorAll('.' + EN_CLASS).forEach(el => el.style.display = ''); } catch (err) {}
    console.error('lang.js error:', e);
  }
})();
