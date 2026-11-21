// @ts-check
import { cx, html, raw } from '../lib/html.js';
import { site } from '../site.config.js';

/**
 * Placeholder club emblem (authored SVG shield). Replace with the real crest file.
 * @param {{ size?: number, className?: string }} [props]
 */
export function Crest({ size = 44, className } = {}) {
  return raw(`<svg class="${cx('crest-mark', className)}" width="${size}" height="${Math.round(size * 1.15)}" viewBox="0 0 40 46" aria-hidden="true" focusable="false">
  <path d="M20 1.5 37.5 6v16.5C37.5 33 30 40.5 20 44.5 10 40.5 2.5 33 2.5 22.5V6Z" fill="#00236a" stroke="#bbab54" stroke-width="2"/>
  <path d="M2.9 23.5 37.1 13v9.5c0 1-.05 2-.15 3L3.6 34.6a26 26 0 0 1-.7-4.3Z" fill="#0054a7"/>
  <text x="20" y="33" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-stretch="75%" font-size="11.5" letter-spacing="0.4" fill="#ffffff">SFC</text>
  <path d="M15 11.5h10" stroke="#bbab54" stroke-width="1.6" stroke-linecap="round"/>
</svg>`);
}

/**
 * Crest + wordmark, linking home.
 * @param {{ className?: string, current?: boolean }} [props]
 */
export function SiteLogo({ className, current = false } = {}) {
  return html`<a class="${cx('site-logo', className)}" href="/"${current ? raw(' aria-current="page"') : ''}>
  ${Crest()}
  <span class="site-logo__text">
    <span class="site-logo__en" lang="en">${site.nameEn}</span>
    <span class="site-logo__ja">${site.name}</span>
  </span>
</a>`;
}
