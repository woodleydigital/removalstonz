/* Removals to NZ — progressive enhancement only.
 * Everything below is optional: with JavaScript disabled the lead form submits
 * in one page, the calculator falls back to a published volume table, and all
 * navigation works. Playbook rule 01 — JS must never be the only source of
 * content or links. */
(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   * 1. Lead form — multi-step pagination + validation + event tracking
   * ------------------------------------------------------------------ */
  function enhanceLeadForm(form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll('.step'));
    if (steps.length < 2) return;

    var root = form.closest('.lead') || form;
    root.setAttribute('data-enhanced', 'true');

    // Take over validation now that we can report it per step. Until this
    // point the browser's native validation is the safety net.
    form.setAttribute('novalidate', '');

    var index = 0;
    var progress = form.querySelector('.step__progress');

    function track(name, detail) {
      // Vendor-neutral: push to dataLayer if present, always emit a DOM event
      // so any tag manager or analytics snippet can subscribe.
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(Object.assign({ event: name }, detail || {}));
      } catch (e) {}
      form.dispatchEvent(new CustomEvent('rtnz:' + name, { bubbles: true, detail: detail || {} }));
    }

    function show(next, initial) {
      index = Math.max(0, Math.min(steps.length - 1, next));
      steps.forEach(function (s, i) {
        s.hidden = i !== index;
      });
      if (progress) {
        Array.prototype.forEach.call(progress.children, function (bar, i) {
          if (i <= index) bar.setAttribute('data-done', '');
          else bar.removeAttribute('data-done');
        });
      }
      // Move focus only when the reader asked to change step. Doing it on the
      // first render would drag focus into the form the moment the page loads.
      if (!initial) {
        var heading = steps[index].querySelector('h3, h4, .fieldset__legend, legend');
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.focus({ preventScroll: true });
        }
        var box = root.getBoundingClientRect();
        if (box.top < 0) root.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
      track('quote_step_view', { step: index + 1, stepName: steps[index].dataset.stepName || '' });
    }

    // A step is valid when every constrained control inside it reports valid.
    function stepValid(step) {
      var controls = step.querySelectorAll('input, select, textarea');
      var ok = true;
      Array.prototype.forEach.call(controls, function (c) {
        if (c.disabled || c.type === 'hidden') return;
        if (!c.checkValidity()) {
          if (ok) c.reportValidity();
          ok = false;
        }
      });
      return ok;
    }

    form.addEventListener('click', function (e) {
      var next = e.target.closest('[data-step-next]');
      var prev = e.target.closest('[data-step-prev]');
      if (next) {
        e.preventDefault();
        if (stepValid(steps[index])) show(index + 1);
        return;
      }
      if (prev) {
        e.preventDefault();
        show(index - 1);
      }
    });

    // Enter should advance a step rather than submit a partly-filled form.
    form.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter') return;
      if (e.target.tagName === 'TEXTAREA') return;
      if (index < steps.length - 1) {
        e.preventDefault();
        if (stepValid(steps[index])) show(index + 1);
      }
    });

    // Selecting a radio in a single-question step moves the user forward.
    form.addEventListener('change', function (e) {
      var step = e.target.closest('.step');
      if (!step || step.dataset.advanceOnSelect !== 'true') return;
      if (e.target.type !== 'radio') return;
      window.setTimeout(function () {
        if (stepValid(step)) show(steps.indexOf(step) + 1);
      }, 180);
    });

    form.addEventListener('submit', function (e) {
      // The visible step is the only one whose fields the user can fix, so
      // validate it before allowing the post. Earlier steps were validated on
      // the way through.
      for (var i = 0; i < steps.length; i++) {
        if (!stepValid(steps[i])) {
          e.preventDefault();
          show(i);
          stepValid(steps[i]); // re-report so the message appears on the visible step
          track('quote_invalid', { step: i + 1 });
          return;
        }
      }
      track('quote_submit', { steps: steps.length });
    });

    // First interaction is a useful CRO metric independent of completion.
    var started = false;
    form.addEventListener('input', function () {
      if (started) return;
      started = true;
      track('quote_start', {});
    }, { once: false });

    show(0, true);
  }

  document.querySelectorAll('form[data-lead-form]').forEach(enhanceLeadForm);

  /* ------------------------------------------------------------------ *
   * 2. Volume calculator — the page's centerpiece functional component
   * ------------------------------------------------------------------ */
  function enhanceCalculator(calc) {
    var out = calc.querySelector('[data-calc-total]');
    var outCbm = calc.querySelector('[data-calc-cbm]');
    var outLoad = calc.querySelector('[data-calc-load]');
    var noscript = calc.querySelector('.calc__noscript');
    var hidden = document.querySelectorAll('input[data-calc-target]');
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

      // Carry the estimate into the quote form so the user never retypes it.
      Array.prototype.forEach.call(hidden, function (h) { h.value = cbm.toFixed(1); });
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
