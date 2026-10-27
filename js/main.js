/* =========================================================
   PaDance: kleine, optionele verbeteringen.
   De site werkt ook zonder JavaScript.
   ========================================================= */

/* ----- INVULLEN: links voor inschrijven en tickets -----
   Laat leeg ('') zolang er nog geen link is: de knoppen springen dan
   naar het gemarkeerde vak "De ticketverkoop is nog niet open".
   Voorbeeld: registrationUrl: 'https://jouw-ticketplatform.be/padance-duo'  */
const CONFIG = {
  registrationUrl: '', // [INSCHRIJFLINK SPELERS]
  ticketUrl: ''        // [TICKETLINK SUPPORTERS]
};

(function () {
  'use strict';

  /* Ticketknoppen koppelen aan de echte links zodra die ingevuld zijn */
  var links = { registration: CONFIG.registrationUrl, ticket: CONFIG.ticketUrl || CONFIG.registrationUrl };
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var url = links[a.getAttribute('data-link')];
    if (url) {
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener';
    }
  });

  /* Zachte focus en markering als je naar het invulvak springt */
  var notice = document.getElementById('ticketlink');
  document.querySelectorAll('a[href="#ticketlink"]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (!notice) return;
      window.setTimeout(function () {
        notice.focus({ preventScroll: true });
        notice.classList.add('is-highlighted');
      }, 350);
    });
  });

  /* Mobiel menu */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* Lijntje onder de header zodra je scrolt */
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Scroll-animatie: blokken verschijnen zacht zodra ze in beeld komen.
     Zonder JavaScript of met "minder beweging" aan blijft alles gewoon zichtbaar. */
  var motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  if (motionOk && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.hero-visual, .section-head, .pillar, .wide-figure, .timeline li, .lineup, ' +
      '.ticket, .notice, .interest-form, .fact, .faq, .contact-list li'
    );
    targets.forEach(function (el) {
      el.classList.add('reveal');
      /* Elementen naast elkaar komen kort na elkaar binnen */
      var i = Array.prototype.indexOf.call(el.parentNode.children, el);
      el.style.setProperty('--reveal-delay', Math.min(i, 4) * 90 + 'ms');
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
    document.documentElement.classList.add('reveal-on');
  }

  /* Jaartal in de footer */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Interesseformulier (Netlify Forms) zonder pagina te verlaten */
  var form = document.querySelector('.interest-form');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.classList.remove('is-error');

      if (location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        status.textContent = 'Lokale voorbeeldweergave: het formulier werkt pas als de site op Netlify staat.';
        return;
      }

      var data = new URLSearchParams(new FormData(form)).toString();
      status.textContent = 'Even geduld...';
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = 'Bedankt! We laten je weten wanneer de inschrijvingen openen.';
      }).catch(function () {
        status.classList.add('is-error');
        status.textContent = 'Er ging iets mis. Probeer het later opnieuw.';
      });
    });
  }
})();
