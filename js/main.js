/* =========================================================
   PaDance: kleine, optionele verbeteringen.
   De site werkt ook zonder JavaScript.
   ========================================================= */

/* ----- INVULLEN: deelnameprijs per duo -----
   Laat leeg ('') zolang de prijs niet definitief is: de site toont dan "volgt".
   Alleen het bedrag invullen, zonder euroteken. Voorbeeld: priceDuo: '30'
   De site zet er zelf "€" voor; "per duo, voor twee spelers samen" staat er al bij. */
const CONFIG = {
  priceDuo: '' // [DEELNAMEPRIJS PER DUO, nog niet bevestigd]
};

(function () {
  'use strict';

  /* Prijs per duo overal hetzelfde tonen */
  if (CONFIG.priceDuo) {
    document.querySelectorAll('[data-price-duo]').forEach(function (el) {
      el.textContent = '€' + String(CONFIG.priceDuo).replace(/^€\s*/, '');
    });
  }

  /* Teams: "oranje" en "groen" in de link (?team=...) worden de formulierwaarden hieronder */
  var TEAMS = { oranje: 'Oranje team', groen: 'Groen team' };
  var params = new URLSearchParams(window.location.search);
  var teamParam = (params.get('team') || '').toLowerCase();
  if (!TEAMS[teamParam]) teamParam = '';
  function teamKey(value) {
    for (var k in TEAMS) { if (TEAMS[k] === value) return k; }
    return '';
  }

  /* Na een klik op "Schrijf je duo in": teamknoppen even laten oplichten */
  var battle = document.querySelector('.team-battle');
  document.querySelectorAll('a[href="#inschrijven"]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (!battle) return;
      window.setTimeout(function () {
        battle.classList.add('is-highlighted');
        window.setTimeout(function () { battle.classList.remove('is-highlighted'); }, 1600);
      }, 400);
    });
  });

  var duoForm = document.querySelector('.duo-form');

  /* Teamkeuze (eilandjes): gekozen team markeren, ook in browsers zonder :has.
     De keuze zelf blijft een gewone, verplichte radioknop "team". */
  var teamInputs = document.querySelectorAll('.team input');
  var teamPick = document.querySelector('.team-pick');
  var teamOptions = document.querySelector('.team-options');
  function syncTeams() {
    var any = false;
    teamInputs.forEach(function (i) {
      i.closest('.team').classList.toggle('is-selected', i.checked);
      if (i.checked) any = true;
    });
    if (teamOptions) teamOptions.classList.toggle('has-choice', any);
    if (any && teamPick) teamPick.classList.remove('is-invalid');
    var checked = document.querySelector('.team input:checked');
    document.body.setAttribute('data-team', checked ? teamKey(checked.value) : '');
  }
  teamInputs.forEach(function (input) {
    input.addEventListener('change', syncTeams);
    /* Geen team gekozen bij versturen: duidelijke melding bij de eilandjes */
    input.addEventListener('invalid', function (e) {
      e.preventDefault();
      if (!teamPick) return;
      teamPick.classList.remove('is-invalid');
      void teamPick.offsetWidth; /* animatie opnieuw starten */
      teamPick.classList.add('is-invalid');
      teamPick.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  });

  /* Stap 2: team van de knop op de homepagina alvast aanduiden */
  if (teamParam) {
    teamInputs.forEach(function (i) { if (i.value === TEAMS[teamParam]) i.checked = true; });
  }
  if (teamInputs.length) syncTeams();

  /* Stap 3: gekozen team tonen op de betaalpagina */
  var badge = document.querySelector('[data-team-badge]');
  if (badge && teamParam) {
    badge.querySelector('[data-team-name]').textContent = TEAMS[teamParam];
    badge.hidden = false;
    document.body.setAttribute('data-team', teamParam);
  }

  /* Vaste inschrijfknop op mobiel: zichtbaar na de openingsbanner, weg bij het formulier */
  var mobileCta = document.querySelector('.mobile-cta');
  var heroCta = document.querySelector('.hero-cta');
  var register = document.getElementById('inschrijven');
  if (mobileCta && heroCta && register && 'IntersectionObserver' in window) {
    var heroVisible = true, registerVisible = false;
    var update = function () {
      var show = !heroVisible && !registerVisible;
      mobileCta.classList.toggle('is-shown', show);
      mobileCta.setAttribute('aria-hidden', String(!show));
      mobileCta.querySelector('a').tabIndex = show ? 0 : -1;
    };
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; update(); }).observe(heroCta);
    new IntersectionObserver(function (e) { registerVisible = e[0].isIntersecting; update(); }, { threshold: 0.05 }).observe(register);
  }

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
      '.team-card, .register-facts > *, .fact, .faq, .contact-list li'
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

  /* Duo-inschrijving (Netlify Forms) en daarna door naar stap 3 (betalen.html).
     Er is nog geen echte betaalstap gekoppeld: betalen.html is een duidelijke tussenpagina. */
  if (duoForm) {
    var status = duoForm.querySelector('.form-status');
    var nextUrl = function () {
      var checked = duoForm.querySelector('.team input:checked');
      var key = checked ? teamKey(checked.value) : '';
      return 'betalen.html' + (key ? '?team=' + key : '');
    };
    duoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      status.classList.remove('is-error');

      if (location.protocol === 'file:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        status.textContent = 'Lokale voorbeeldweergave: er wordt niets verstuurd. Je gaat zo door naar de betaalpagina.';
        window.setTimeout(function () { window.location.href = nextUrl(); }, 1400);
        return;
      }

      var data = new URLSearchParams(new FormData(duoForm)).toString();
      var button = duoForm.querySelector('button[type="submit"]');
      button.disabled = true;
      status.textContent = 'Even geduld...';
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data
      }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        window.location.href = nextUrl();
      }).catch(function () {
        button.disabled = false;
        status.classList.add('is-error');
        status.textContent = 'Er ging iets mis. Probeer het later opnieuw.';
      });
    });
  }
})();
