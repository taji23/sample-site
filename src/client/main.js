// @ts-check
/**
 * Client enhancements. Every feature is optional: the HTML works without it.
 *  - header state (solid / hide on scroll), mega menu, mobile navigation
 *  - scroll reveal, hero entrance, sticky CTA, match countdown
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopNav = window.matchMedia('(min-width: 75em)');

/* ---------------------------------------------------------------- header */

function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!(header instanceof HTMLElement)) return;
  let lastY = window.scrollY;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle('is-solid', y > 24);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > 480) header.classList.add('is-hidden');
    else if (goingUp || y <= 480) header.classList.remove('is-hidden');
    lastY = y;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  header.addEventListener('focusin', () => header.classList.remove('is-hidden'));
  update();
}

/* ------------------------------------------------------------- mega menu */

function initMegaMenu() {
  const header = document.querySelector('[data-header]');
  const items = /** @type {HTMLElement[]} */ ([...document.querySelectorAll('[data-nav-item]')]);
  if (!header || items.length === 0) return;

  /** @type {number | undefined} */
  let hoverTimer;

  /** @param {HTMLElement} item @param {boolean} open */
  const setOpen = (item, open) => {
    const trigger = item.querySelector('[data-nav-trigger]');
    item.classList.toggle('is-open', open);
    trigger?.setAttribute('aria-expanded', String(open));
  };

  const closeAll = (/** @type {HTMLElement | null} */ except = null) => {
    for (const item of items) if (item !== except) setOpen(item, false);
    header.classList.toggle('is-menu-open', Boolean(except));
  };

  /** @param {HTMLElement} item */
  const open = (item) => {
    closeAll(item);
    setOpen(item, true);
  };

  for (const item of items) {
    const trigger = item.querySelector('[data-nav-trigger]');
    trigger?.addEventListener('click', () => {
      if (item.classList.contains('is-open')) closeAll();
      else open(item);
    });

    item.addEventListener('mouseenter', () => {
      if (!desktopNav.matches) return;
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => open(item), 90);
    });
    item.addEventListener('mouseleave', () => {
      window.clearTimeout(hoverTimer);
      hoverTimer = window.setTimeout(() => {
        if (!item.contains(document.activeElement)) {
          setOpen(item, false);
          syncHeader();
        }
      }, 160);
    });
    item.addEventListener('focusout', (event) => {
      const next = /** @type {FocusEvent} */ (event).relatedTarget;
      if (!(next instanceof Node) || !item.contains(next)) {
        setOpen(item, false);
        syncHeader();
      }
    });
  }

  const syncHeader = () => header.classList.toggle('is-menu-open', items.some((i) => i.classList.contains('is-open')));

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openItem = items.find((i) => i.classList.contains('is-open'));
    if (!openItem) return;
    closeAll();
    const trigger = openItem.querySelector('[data-nav-trigger]');
    if (trigger instanceof HTMLElement) trigger.focus();
  });

  document.addEventListener('click', (event) => {
    if (event.target instanceof Node && !header.contains(event.target)) closeAll();
  });
}

/* ------------------------------------------------------- mobile navigation */

function initMobileNav() {
  const panel = document.querySelector('[data-mobile-nav]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const close = panel?.querySelector('[data-menu-close]');
  if (!(panel instanceof HTMLElement) || !(toggle instanceof HTMLElement)) return;

  const outside = () =>
    /** @type {HTMLElement[]} */ ([...document.body.children]).filter((el) => el !== panel && el.tagName !== 'SCRIPT');

  const focusables = () =>
    /** @type {HTMLElement[]} */ ([
      ...panel.querySelectorAll('a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])'),
    ]).filter((el) => el.offsetParent !== null);

  const openNav = () => {
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add('is-open'));
    toggle.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    for (const el of outside()) el.inert = true;
    if (close instanceof HTMLElement) close.focus();
  };

  const closeNav = (restoreFocus = true) => {
    if (panel.hidden) return;
    panel.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    for (const el of outside()) el.inert = false;
    const finish = () => {
      panel.hidden = true;
    };
    if (reduceMotion.matches) finish();
    else window.setTimeout(finish, 320);
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener('click', openNav);
  close?.addEventListener('click', () => closeNav());

  panel.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
      return;
    }
    if (event.key !== 'Tab') return;
    const list = focusables();
    const first = list[0];
    const last = list[list.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  panel.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('a[href]')) closeNav(false);
  });

  desktopNav.addEventListener('change', (event) => {
    if (event.matches) closeNav(false);
  });
}

/* ------------------------------------------------------------ scroll reveal */

function initReveal() {
  const targets = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  targets.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------- hero */

function initHero() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) {
    document.body.classList.add('is-ready');
    return;
  }
  const img = hero.querySelector('img');
  const start = () =>
    requestAnimationFrame(() => {
      hero.classList.add('is-loaded');
      document.body.classList.add('is-ready');
    });
  const fallback = window.setTimeout(start, 1200);
  if (img && !img.complete) {
    img.decode().catch(() => {}).finally(() => {
      window.clearTimeout(fallback);
      start();
    });
  } else {
    window.clearTimeout(fallback);
    start();
  }
}

/* --------------------------------------------------------------- sticky CTA */

function initStickyCta() {
  const cta = document.querySelector('[data-sticky-cta]');
  if (!cta) return;
  const hero = document.querySelector('[data-hero]');
  const footer = document.querySelector('#site-footer');
  let pastHero = !hero;
  let atFooter = false;
  const sync = () => cta.classList.toggle('is-visible', pastHero && !atFooter);

  if (!('IntersectionObserver' in window)) {
    cta.classList.add('is-visible');
    return;
  }
  if (hero) {
    new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting;
      sync();
    }).observe(hero);
  } else {
    const onScroll = () => {
      pastHero = window.scrollY > 400;
      sync();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  if (footer) {
    new IntersectionObserver(([entry]) => {
      atFooter = entry.isIntersecting;
      sync();
    }).observe(footer);
  }
  sync();
}

/* ---------------------------------------------------------------- countdown */

function initCountdown() {
  const DAY = 86_400_000;
  for (const el of document.querySelectorAll('[data-countdown]')) {
    const value = el.getAttribute('data-countdown');
    if (!value) continue;
    const kickoff = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const day = new Date(kickoff);
    day.setHours(0, 0, 0, 0);
    const diff = Math.round((day.getTime() - today.getTime()) / DAY);
    if (diff > 0) el.textContent = `あと ${diff} 日`;
    else if (diff === 0) el.textContent = '本日開催';
  }
}

/* ------------------------------------------------------------------ filters */

/**
 * Chips ([data-filter-bar]) show or hide items ([data-filter-item]) inside the
 * matching [data-filter-scope]. An item may list several values, or 'all' to
 * always stay visible. Sections ([data-filter-section]) hide when empty.
 */
function initFilters() {
  for (const bar of document.querySelectorAll('[data-filter-bar]')) {
    const key = bar.getAttribute('data-filter-bar');
    const scope = document.querySelector(`[data-filter-scope="${key}"]`);
    const status = document.querySelector(`[data-filter-status="${key}"]`);
    if (!scope) continue;

    /** @param {string} value */
    const apply = (value) => {
      for (const chip of bar.querySelectorAll('[data-filter-value]')) {
        const active = chip.getAttribute('data-filter-value') === value;
        chip.classList.toggle('is-active', active);
        chip.setAttribute('aria-pressed', String(active));
      }
      let visible = 0;
      for (const item of /** @type {NodeListOf<HTMLElement>} */ (scope.querySelectorAll('[data-filter-item]'))) {
        const tokens = (item.getAttribute('data-filter-item') ?? '').split(/\s+/);
        const show = value === 'all' || tokens.includes(value) || tokens.includes('all');
        item.hidden = !show;
        if (show) visible += 1;
      }
      for (const section of /** @type {NodeListOf<HTMLElement>} */ (scope.querySelectorAll('[data-filter-section]'))) {
        section.hidden = !section.querySelector('[data-filter-item]:not([hidden])');
      }
      if (status) status.textContent = `${visible}件を表示しています`;
    };

    bar.addEventListener('click', (event) => {
      const chip = event.target instanceof Element ? event.target.closest('[data-filter-value]') : null;
      if (chip) apply(chip.getAttribute('data-filter-value') ?? 'all');
    });
  }
}

/* -------------------------------------------------------------------- forms */

/** @param {Element} field */
function fieldLabel(field) {
  const source = field.querySelector('.field__label');
  if (!source) return '';
  const clone = /** @type {HTMLElement} */ (source.cloneNode(true));
  clone.querySelectorAll('.field__req, .field__opt').forEach((el) => el.remove());
  return (clone.textContent ?? '').trim();
}

/**
 * Validates one [data-field]. Returns an error message or '' when valid.
 * @param {HTMLElement} field
 */
function validateField(field) {
  if (field.hasAttribute('data-group')) {
    const required = field.getAttribute('data-required') === 'true';
    const checked = field.querySelector('input:checked');
    return required && !checked ? 'いずれかを選択してください。' : '';
  }
  const control = field.querySelector('input, select, textarea');
  if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)) return '';
  if (control instanceof HTMLInputElement && control.type === 'checkbox') {
    return control.required && !control.checked ? 'ご同意いただく必要があります。' : '';
  }
  const value = control.value.trim();
  if (control.required && !value) return control instanceof HTMLSelectElement ? '選択してください。' : '入力してください。';
  if (value && control instanceof HTMLInputElement && control.type === 'email' && !control.validity.valid) {
    return 'メールアドレスの形式で入力してください（例：example@example.com）。';
  }
  return '';
}

/** @param {HTMLElement} field @param {string} message */
function showFieldError(field, message) {
  const output = field.querySelector('[data-error]');
  const controls = field.querySelectorAll('input, select, textarea');
  if (output) {
    output.textContent = message ? `エラー：${message}` : '';
    output.toggleAttribute('hidden', !message);
  }
  field.toggleAttribute('data-invalid', Boolean(message));
  const isGroup = field.hasAttribute('data-group');
  controls.forEach((c) => {
    if (message && (!isGroup || c === controls[0])) c.setAttribute('aria-invalid', 'true');
    else c.removeAttribute('aria-invalid');
  });
}

/** Human-readable value of a field for the confirmation summary. @param {HTMLElement} field */
function fieldDisplayValue(field) {
  if (field.hasAttribute('data-group')) {
    const checked = [...field.querySelectorAll('input:checked')].map((i) => i.closest('.choice')?.textContent?.trim() ?? '');
    return checked.join('、') || '—';
  }
  const control = field.querySelector('input, select, textarea');
  if (control instanceof HTMLSelectElement) return control.selectedOptions[0]?.textContent?.trim() || '—';
  if (control instanceof HTMLInputElement && control.type === 'checkbox') return control.checked ? '同意済み' : '—';
  return control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement ? control.value.trim() || '—' : '—';
}

/**
 * Prototype forms: validate in the browser and confirm on screen. Nothing is
 * ever sent or stored; the markup says so and so does the confirmation.
 */
function initForms() {
  for (const form of document.querySelectorAll('form[data-prototype-form]')) {
    if (!(form instanceof HTMLFormElement)) continue;
    const shell = form.closest('[data-form-shell]');
    const success = shell?.querySelector('[data-form-success]');
    const summary = shell?.querySelector('[data-form-summary]');
    const errorBox = form.querySelector('[data-form-errors]');
    const fields = /** @type {HTMLElement[]} */ ([...form.querySelectorAll('[data-field]')]);
    if (!(success instanceof HTMLElement) || !(errorBox instanceof HTMLElement)) continue;

    const params = new URLSearchParams(window.location.search);
    for (const el of form.querySelectorAll('[data-preset]')) {
      const value = params.get(el.getAttribute('data-preset') ?? '');
      if (value && el instanceof HTMLSelectElement && [...el.options].some((o) => o.value === value)) el.value = value;
    }

    for (const field of fields) {
      const revalidate = () => {
        if (field.hasAttribute('data-invalid')) showFieldError(field, validateField(field));
      };
      field.addEventListener('input', revalidate);
      field.addEventListener('change', revalidate);
    }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      /** @type {{ id: string, label: string, message: string }[]} */
      const problems = [];
      for (const field of fields) {
        const message = validateField(field);
        showFieldError(field, message);
        if (message) {
          const target = field.querySelector('input, select, textarea');
          problems.push({ id: target?.id ?? '', label: fieldLabel(field), message });
        }
      }

      if (problems.length > 0) {
        errorBox.replaceChildren();
        const title = document.createElement('p');
        title.className = 'form__errors-title';
        title.textContent = `入力内容をご確認ください（${problems.length}件）`;
        const list = document.createElement('ul');
        for (const p of problems) {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#${p.id}`;
          a.textContent = `${p.label}：${p.message}`;
          a.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById(p.id)?.focus();
          });
          li.append(a);
          list.append(li);
        }
        errorBox.append(title, list);
        errorBox.hidden = false;
        errorBox.focus();
        return;
      }

      errorBox.hidden = true;
      if (summary) {
        summary.replaceChildren();
        for (const field of fields) {
          const row = document.createElement('div');
          const dt = document.createElement('dt');
          const dd = document.createElement('dd');
          dt.textContent = fieldLabel(field);
          dd.textContent = fieldDisplayValue(field);
          row.append(dt, dd);
          summary.append(row);
        }
      }
      form.hidden = true;
      success.hidden = false;
      success.focus();
    });

    shell?.querySelector('[data-form-reset]')?.addEventListener('click', () => {
      form.reset();
      fields.forEach((f) => showFieldError(f, ''));
      success.hidden = true;
      form.hidden = false;
      /** @type {HTMLElement | null} */ (form.querySelector('input, select, textarea'))?.focus();
    });
  }
}

initHeader();
initMegaMenu();
initMobileNav();
initReveal();
initHero();
initStickyCta();
initCountdown();
initFilters();
initForms();
