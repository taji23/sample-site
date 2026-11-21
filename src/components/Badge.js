// @ts-check
import { cx, html } from '../lib/html.js';

/**
 * @typedef {'navy' | 'royal' | 'gold' | 'outline' | 'muted'} BadgeTone
 */

/**
 * Small status/category label. Text always carries the meaning; color only reinforces it.
 * @param {{ label: string, tone?: BadgeTone, className?: string }} props
 */
export function Badge({ label, tone = 'outline', className }) {
  return html`<span class="${cx('badge', `badge--${tone}`, className)}">${label}</span>`;
}
