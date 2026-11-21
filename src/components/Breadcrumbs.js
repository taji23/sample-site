// @ts-check
import { html } from '../lib/html.js';

/**
 * @param {{ items: { label: string, href?: string }[] }} props  Last item is the current page.
 */
export function Breadcrumbs({ items }) {
  return html`<nav class="breadcrumbs" aria-label="パンくずリスト">
  <ol role="list">
    ${items.map((item, i) =>
      i === items.length - 1 || !item.href
        ? html`<li><span aria-current="page">${item.label}</span></li>`
        : html`<li><a href="${item.href}">${item.label}</a></li>`,
    )}
  </ol>
</nav>`;
}
