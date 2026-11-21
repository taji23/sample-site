// @ts-check
import { cx, html } from '../lib/html.js';
import { Icon } from './Icon.js';

/**
 * Previous / next navigation between sibling records (age categories, news, classes).
 * @param {{ label: string, prev?: { title: string, href: string }, next?: { title: string, href: string } }} props
 */
export function PagerNav({ label, prev, next }) {
  if (!prev && !next) return '';
  return html`<nav class="pager" aria-label="${label}">
  ${prev ? html`<a class="pager__link pager__link--prev" href="${prev.href}" rel="prev">${Icon('arrow-right', { size: 18, className: 'pager__icon' })}<span><small>前へ</small><strong>${prev.title}</strong></span></a>` : html`<span></span>`}
  ${next ? html`<a class="pager__link pager__link--next" href="${next.href}" rel="next"><span><small>次へ</small><strong>${next.title}</strong></span>${Icon('arrow-right', { size: 18, className: 'pager__icon' })}</a>` : html`<span></span>`}
</nav>`;
}

/**
 * Compact list of links to related pages, with description and animated arrow.
 * @param {{ items: { title: string, text?: string, href: string }[], className?: string }} props
 */
export function LinkList({ items, className }) {
  return html`<ul class="${cx('link-list', className)}" role="list" data-reveal-stagger>
  ${items.map(
    (item, i) => html`<li style="--i:${i}"><a class="link-list__item" href="${item.href}"><span class="link-list__title">${item.title}</span>${item.text && html`<span class="link-list__text">${item.text}</span>`}${Icon('arrow-right', { size: 20, className: 'link-list__arrow' })}</a></li>`,
  )}
</ul>`;
}
