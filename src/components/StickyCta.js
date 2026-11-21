// @ts-check
import { contactLink, trialLink } from '../data/navigation.js';
import { html } from '../lib/html.js';
import { Icon } from './Icon.js';

/**
 * Persistent, unobtrusive trial / inquiry CTA. Revealed by JS after the first
 * viewport; without JS it simply stays docked.
 */
export function StickyCta() {
  return html`<aside class="sticky-cta" aria-label="体験・お問い合わせ" data-sticky-cta>
  <a class="sticky-cta__primary" href="${trialLink.href}">${Icon('users', { size: 18 })}<span>体験練習・見学</span>${Icon('arrow-right', { size: 16, className: 'sticky-cta__arrow' })}</a>
  <a class="sticky-cta__secondary" href="${contactLink.href}">${Icon('mail', { size: 18 })}<span>${contactLink.label}</span></a>
</aside>`;
}
