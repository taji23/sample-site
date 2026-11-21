// @ts-check

/** Marker for markup that must not be escaped again. */
export class SafeHtml {
  /** @param {string} value */
  constructor(value) {
    this.value = value;
  }

  toString() {
    return this.value;
  }
}

/** @type {Record<string, string>} */
const ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ESCAPES[ch]);
}

/**
 * Trusted markup (component output, authored SVG). Never pass data text here.
 * @param {string} value
 */
export function raw(value) {
  return new SafeHtml(value);
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function serialize(value) {
  if (value === null || value === undefined || value === false || value === true) return '';
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) return value.map(serialize).join('');
  return escapeHtml(value);
}

/**
 * Tagged template: interpolations are escaped unless they are SafeHtml (or arrays of it).
 * null / undefined / booleans render nothing, so `${cond && html`...`}` is safe.
 * @param {TemplateStringsArray} strings
 * @param {...unknown} values
 * @returns {SafeHtml}
 */
export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i += 1) {
    out += serialize(values[i]) + strings[i + 1];
  }
  return new SafeHtml(out);
}

/**
 * Joins truthy class names.
 * @param {...(string | false | null | undefined)} names
 */
export function cx(...names) {
  return names.filter(Boolean).join(' ');
}

/**
 * Renders an attribute only when it has a value. Escaped.
 * @param {string} name
 * @param {string | number | null | undefined | false} value
 */
export function attr(name, value) {
  if (value === null || value === undefined || value === false || value === '') return raw('');
  return raw(` ${name}="${escapeHtml(value)}"`);
}
