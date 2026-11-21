// @ts-check
import { escapeHtml, raw } from '../lib/html.js';

/**
 * Authored 24×24 stroke icons, 1.75 stroke, round joins. One family for the whole site.
 * @type {Record<string, string>}
 */
const PATHS = {
  'arrow-right': '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
  'arrow-up-right': '<path d="M7 17 17 7"/><path d="M8.5 7H17v8.5"/>',
  'chevron-right': '<path d="m9 5 7 7-7 7"/>',
  'chevron-down': '<path d="m5 9 7 7 7-7"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  'map-pin': '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.25"/>',
  users: '<circle cx="9" cy="8.5" r="3.25"/><path d="M3 19.5c.6-3.3 3-5.25 6-5.25s5.4 1.95 6 5.25"/><path d="M15.5 5.6a3.25 3.25 0 0 1 0 6.1M17.5 14.6c1.8.7 3 2.4 3.5 4.9"/>',
  menu: '<path d="M3.5 7h17M3.5 12h17M3.5 17h11"/>',
  close: '<path d="M5.5 5.5l13 13M18.5 5.5l-13 13"/>',
  play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
  mail: '<rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="m3.5 7 8.5 6 8.5-6"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="3.75"/><circle cx="17.1" cy="6.9" r="0.6" fill="currentColor"/>',
  youtube: '<path d="M21 8.2c-.2-1.4-1.1-2.4-2.5-2.5C16.4 5.5 12 5.5 12 5.5s-4.4 0-6.5.2C4.1 5.8 3.2 6.8 3 8.2 2.8 9.5 2.8 12 2.8 12s0 2.5.2 3.8c.2 1.4 1.1 2.4 2.5 2.5 2.1.2 6.5.2 6.5.2s4.4 0 6.5-.2c1.4-.1 2.3-1.1 2.5-2.5.2-1.3.2-3.8.2-3.8s0-2.5-.2-3.8Z"/><path d="m10.2 9.4 4.3 2.6-4.3 2.6z" fill="currentColor"/>',
  x: '<path d="M4.5 4h4.2l10.8 16h-4.2z"/><path d="M19.5 4l-6.3 7.2M4.5 20l6.3-7.2"/>',
};

/** @typedef {keyof typeof PATHS} IconName */

/**
 * Decorative by default (aria-hidden). Pass `label` only when the icon is the sole content.
 * @param {string} name
 * @param {{ size?: number, label?: string, className?: string }} [options]
 */
export function Icon(name, { size = 20, label, className = 'icon' } = {}) {
  const body = PATHS[name];
  if (!body) throw new Error(`Unknown icon: ${name}`);
  const a11y = label ? `role="img" aria-label="${escapeHtml(label)}"` : 'aria-hidden="true" focusable="false"';
  return raw(
    `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ${a11y}>${body}</svg>`,
  );
}

export const ICON_NAMES = Object.freeze(Object.keys(PATHS));
