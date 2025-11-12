// lang.js
(function () {
  const STORAGE_KEY = 'site-lang';
  const DEFAULT_LANG = detectDefaultLang();
  const qsLang = new URLSearchParams(window.location.search).get('lang');
  const initial = normalizeLang(qsLang || localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG);

  apply(initial);
  attachUI();

  function detectDefaultLang() {
    const nav = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
    return nav.toLowerCase().startsWith('id') ? 'id' : 'en';
  }

  function normalizeLang(val) {
    return val === 'id' ? 'id' : 'en';
  }

  function apply(lang) {
    // Mark JS ready so CSS reveals content
    document.body.classList.add('js-ready');

    // Toggle active buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });

    // Show chosen language blocks, hide the other
    const showSelector = `.lang-${lang}`;
    const hideSelector = `.lang-${lang === 'id' ? 'en' : 'id'}`;

    document.querySelectorAll(showSelector).forEach(el => el.style.display = '');
    document.querySelectorAll(hideSelector).forEach(el => el.style.display = 'none');

    // Persist
    localStorage.setItem(STORAGE_KEY, lang);

    // Update <html lang=""> for accessibility and SEO
    const html = document.documentElement;
    if (html) html.lang = lang;
  }

  function attachUI() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = normalizeLang(btn.dataset.lang);
        apply(lang);
      });
    });

    // Optional: keep dropdown a11y in sync
    const toggle = document.querySelector('.pages-toggle');
    const menu = document.querySelector('.pages-menu');
    if (toggle && menu) {
      toggle.addEventListener('mouseenter', () => toggle.setAttribute('aria-expanded', 'true'));
      toggle.addEventListener('mouseleave', () => toggle.setAttribute('aria-expanded', 'false'));
      menu.addEventListener('mouseenter', () => toggle.setAttribute('aria-expanded', 'true'));
      menu.addEventListener('mouseleave', () => toggle.setAttribute('aria-expanded', 'false'));
    }
  }
})();
