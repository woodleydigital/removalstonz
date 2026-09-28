/* Removals to NZ — progressive enhancement only.
 * Everything below is optional: with JavaScript disabled the enquiry frame
 * still works at its reserved height, the calculator falls back to a published
 * volume table, and all navigation works. Playbook rule 01 — JS must never be the only source of
 * content or links. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * 1. IMC enquiry form frames — resize per step, report submissions
   *
   * IMC's embedded form posts { source: 'imc-enquiry', type, height } to its
   * host. Only messages from the configured IMC origin, sent by one of this
   * page's own frames, are acted on. The messages carry no personal data.
   * ------------------------------------------------------------------ */
  var frames = Array.prototype.slice.call(document.querySelectorAll('iframe[data-enquiry-frame]'));

  function track(name, detail) {
    // Vendor-neutral: dataLayer if present, plus a DOM event any tag can use.
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(Object.assign({ event: name }, detail || {}));
    } catch (e) {}
    document.dispatchEvent(new CustomEvent('rtnz:' + name, { detail: detail || {} }));
  }

  if (frames.length) {
    window.addEventListener('message', function (e) {
      var data = e.data;
      if (!data || data.source !== 'imc-enquiry') return;
      var frame = null;
      for (var i = 0; i < frames.length; i++) {
        if (frames[i].contentWindow === e.source && frames[i].dataset.origin === e.origin) frame = frames[i];
      }
      if (!frame) return;
      if (data.type === 'height' && typeof data.height === 'number' && data.height > 200 && data.height < 5000) {
        frame.style.height = Math.ceil(data.height) + 'px';
        frame.setAttribute('data-sized', '');
      } else if (data.type === 'sent') {
        track('quote_submit', { page: location.pathname, market: document.documentElement.dataset.market || '' });
      }
    });
  }

  /* ------------------------------------------------------------------ *
   * 2. Volume calculator — the page's centerpiece functional component
   * ------------------------------------------------------------------ */
  function enhanceCalculator(calc) {
    var out = calc.querySelector('[data-calc-total]');
    var outCbm = calc.querySelector('[data-calc-cbm]');
    var outLoad = calc.querySelector('[data-calc-load]');
    var noscript = calc.querySelector('.calc__noscript');
    if (!out) return;

    if (noscript) noscript.hidden = true;
    calc.querySelectorAll('[data-calc-controls]').forEach(function (el) { el.hidden = false; });

    // Load thresholds in cubic metres. These describe how a shipment is
    // consolidated, not a price. Sourced from src/data/calculator.js at build time.
    var loads = JSON.parse(calc.dataset.calcLoads || '[]');

    function describeLoad(cbm) {
      for (var i = 0; i < loads.length; i++) {
        if (cbm <= loads[i].max) return loads[i].label;
      }
      return loads.length ? loads[loads.length - 1].label : '';
    }

    function recalc() {
      var cbm = 0;

      // Per-room subtotals, so a collapsed room still shows what is in it.
      calc.querySelectorAll('.calc__room').forEach(function (room) {
        var roomCbm = 0;
        var items = 0;
        room.querySelectorAll('[data-cbm]').forEach(function (input) {
          var qty = parseFloat(input.value) || 0;
          if (qty > 0) items += qty;
          roomCbm += qty * parseFloat(input.dataset.cbm);
        });
        var badge = room.querySelector('[data-room-total]');
        if (badge) {
          badge.textContent = items
            ? items + (items === 1 ? ' item' : ' items') + ' · ' + (Math.round(roomCbm * 10) / 10).toFixed(1) + ' m³'
            : '';
        }
      });

      calc.querySelectorAll('[data-cbm]').forEach(function (input) {
        var qty = parseFloat(input.value) || 0;
        cbm += qty * parseFloat(input.dataset.cbm);
      });
      cbm = Math.round(cbm * 10) / 10;
      var cuft = Math.round(cbm * 35.315);

      out.textContent = cbm.toFixed(1) + ' m³';
      if (outCbm) outCbm.textContent = 'about ' + cuft.toLocaleString('en-GB') + ' cubic feet';
      if (outLoad) outLoad.textContent = cbm > 0 ? describeLoad(cbm) : 'Add items to see the likely load type';

      calc.dispatchEvent(new CustomEvent('rtnz:volume_change', { bubbles: true, detail: { cbm: cbm } }));
    }

    calc.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-step-delta]');
      if (!btn) return;
      e.preventDefault();
      var input = calc.querySelector('#' + btn.dataset.stepFor);
      if (!input) return;
      var delta = parseInt(btn.dataset.stepDelta, 10);
      var value = (parseInt(input.value, 10) || 0) + delta;
      input.value = Math.max(0, Math.min(99, value));
      recalc();
    });

    calc.addEventListener('input', function (e) {
      if (e.target.matches('[data-cbm]')) recalc();
    });

    recalc();
  }

  document.querySelectorAll('[data-calculator]').forEach(enhanceCalculator);

  /* ------------------------------------------------------------------ *
   * 3. Close the mobile nav when a link inside it is followed
   * ------------------------------------------------------------------ */
  var navToggle = document.getElementById('nav-toggle');
  if (navToggle) {
    document.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('click', function () { navToggle.checked = false; });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') navToggle.checked = false;
    });
  }
  /* ------------------------------------------------------------------ *
   * 4. Market suggestion — never a redirect
   *
   * If the browser's language or time zone points to a different origin
   * market than the page being read, offer that market's version of this
   * page. Crawlers never see it (it is empty in the HTML), nobody is moved
   * without clicking, and a dismissal is remembered. Fixed-position, so it
   * cannot shift the layout.
   * ------------------------------------------------------------------ */
  var banner = document.querySelector('[data-market-banner]');
  if (banner) {
    var KEY = 'rtnz-market-dismissed';
    var dismissed = false;
    try { dismissed = window.localStorage.getItem(KEY) === '1'; } catch (e) {}

    function guessMarket() {
      var langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || '']);
      var tz = '';
      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
      // A New Zealand visitor is already there — offer nothing.
      if (/^Pacific\/(Auckland|Chatham)$/.test(tz)) return null;
      for (var i = 0; i < langs.length; i++) {
        var l = String(langs[i]).toLowerCase();
        if (l === 'en-gb') return 'uk';
        if (l === 'en-us') return 'us';
        if (l === 'en-au') return 'au';
        if (l === 'en-ca' || l === 'fr-ca') return 'ca';
        if (l === 'en-nz') return null;
        if (/^(en-(ie|nl|be|lu|de|at|ch|fr|es|pt|it|dk|se|no|fi|pl)|de|fr|nl|es|it|pt|da|sv|nb|nn|no|fi|pl)(-|$)/.test(l)) return 'europe';
      }
      if (tz === 'Europe/London' || tz === 'Europe/Belfast') return 'uk';
      if (/^Europe\//.test(tz)) return 'europe';
      if (/^Australia\//.test(tz)) return 'au';
      if (/^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|Regina|St_Johns|Montreal)/.test(tz)) return 'ca';
      if (/^(America|US)\//.test(tz)) return 'us';
      return null;
    }

    var current = banner.getAttribute('data-current') || '';
    var guess = dismissed ? null : guessMarket();
    var links = {};
    var names = {};
    try {
      links = JSON.parse(banner.getAttribute('data-links') || '{}');
      names = JSON.parse(banner.getAttribute('data-names') || '{}');
    } catch (e) {}

    if (guess && guess !== current && links[guess]) {
      var p = document.createElement('p');
      var a = document.createElement('a');
      a.href = links[guess];
      a.textContent = 'See removals to New Zealand ' + names[guess];
      a.setAttribute('data-cta', 'market-banner');
      p.appendChild(document.createTextNode('Moving ' + names[guess] + '? '));
      p.appendChild(a);
      var close = document.createElement('button');
      close.type = 'button';
      close.className = 'market-banner__close';
      close.setAttribute('aria-label', 'Dismiss');
      close.textContent = '×';
      close.addEventListener('click', function () {
        banner.hidden = true;
        try { window.localStorage.setItem(KEY, '1'); } catch (e) {}
      });
      banner.appendChild(p);
      banner.appendChild(close);
      banner.hidden = false;
    }
  }
})();
