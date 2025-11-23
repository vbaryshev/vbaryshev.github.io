// main.js
(function () {
  const root = document.documentElement;
  const body = document.body;
  const langToggle = document.getElementById("langToggle");
  const yearSpan = document.getElementById("year");

  function setYear() {
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  function getLangFromUrl() {
    try {
      const url = new URL(window.location.href);
      const param = (url.searchParams.get("lang") || "").toLowerCase();
      if (param === "ru" || param === "en") return param;
    } catch (_) {
      // ignore
    }
    return null;
  }

  function setLangInUrl(lang) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState(null, "", url.toString());
    } catch (_) {
      // ignore
    }
  }

  function applyLang(lang) {
    const normalized = lang === "en" ? "en" : "ru";
    root.lang = normalized;
    body.classList.toggle("lang-ru", normalized === "ru");
    body.classList.toggle("lang-en", normalized === "en");

    if (langToggle) {
      langToggle.textContent = normalized.toUpperCase();
    }

    setLangInUrl(normalized);

    try {
      localStorage.setItem("site-lang", normalized);
    } catch (_) {
      // ignore storage errors
    }
  }

  function initLang() {
    let lang = getLangFromUrl();

    if (!lang) {
      try {
        const stored = localStorage.getItem("site-lang");
        if (stored === "ru" || stored === "en") {
          lang = stored;
        }
      } catch (_) {
        // ignore
      }
    }

    if (!lang) {
      const browser = (navigator.language || navigator.userLanguage || "ru").toLowerCase();
      lang = browser.startsWith("ru") ? "ru" : "en";
    }

    applyLang(lang);
  }

  function initToggle() {
    if (!langToggle) return;
    langToggle.addEventListener("click", () => {
      const current = root.lang === "en" ? "en" : "ru";
      const next = current === "ru" ? "en" : "ru";
      applyLang(next);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLang();
    initToggle();
    setYear();
  });
})();

