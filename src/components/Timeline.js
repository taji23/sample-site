// @ts-check
import { html } from '../lib/html.js';

/**
 * Vertical history timeline; the gold spine draws in on scroll.
 * @param {{ items: import('../data/history.js').Milestone[] }} props
 */
export function Timeline({ items }) {
  return html`<ol class="timeline" role="list" data-timeline>
  ${items.map(
    (m, i) => html`<li class="timeline__item" data-reveal style="--i:${i}">
    <span class="timeline__year tabular" lang="en">${m.year}</span>
    <div class="timeline__body"><h3 class="timeline__title">${m.title}</h3><p>${m.text}</p></div>
  </li>`,
  )}
</ol>`;
}
