// @ts-check
import { attr, cx, html } from '../lib/html.js';

/**
 * @typedef {'landscape' | 'portrait' | 'wide' | 'square'} MediaRatio
 *
 * @typedef {object} MediaProps
 * @property {import('../types.js').ImageAsset} [image]
 * @property {MediaRatio} [ratio]
 * @property {string} [sizes]            Responsive sizes hint for srcset.
 * @property {boolean} [eager]           Above-the-fold images only.
 * @property {string} [className]
 */

/**
 * Fixed-ratio image frame. Reserves space (no layout shift), lazy by default,
 * and falls back to a designed placeholder when no photograph exists yet.
 * @param {MediaProps} props
 */
export function Media({ image, ratio = 'landscape', sizes, eager = false, className } = {}) {
  const classes = cx('media', `media--${ratio}`, className);

  if (!image?.src) {
    const label = image?.alt ? `写真準備中：${image.alt}` : '写真準備中';
    return html`<div class="${cx(classes, 'media--placeholder')}" role="img" aria-label="${label}">
  <svg class="media__pitch" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="20" y="20" width="360" height="220"/>
      <path d="M200 20v220"/>
      <circle cx="200" cy="130" r="34"/>
      <rect x="20" y="78" width="54" height="104"/>
      <rect x="326" y="78" width="54" height="104"/>
    </g>
  </svg>
  <span class="media__placeholder-label" aria-hidden="true">Photo</span>
</div>`;
  }

  return html`<div class="${classes}"><img src="${image.src}" alt="${image.alt}"${attr(
    'width',
    image.width,
  )}${attr('height', image.height)}${attr('srcset', image.srcset)}${attr(
    'sizes',
    image.srcset ? sizes : null,
  )} loading="${eager ? 'eager' : 'lazy'}" decoding="async"${attr(
    'fetchpriority',
    eager ? 'high' : null,
  )}${attr('style', image.position ? `object-position:${image.position}` : null)}></div>`;
}
