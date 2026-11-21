// @ts-check
import { categoryHref } from '../data/categories.js';
import { html } from '../lib/html.js';

/**
 * Career pathway built from category data: each category is a stop on one line,
 * ending at the next stage beyond the club. The gold line draws in on reveal.
 * @param {{ categories: import('../types.js').Category[], nextStage: { label: string, text: string } }} props
 */
export function Pathway({ categories, nextStage }) {
  const ordered = [...categories].sort((a, b) => a.order - b.order);
  return html`<ol class="pathway" role="list" data-reveal="pathway">
  ${ordered.map(
    (c, i) => html`<li class="pathway__stop" style="--i:${i}">
    <a class="pathway__link" href="${categoryHref(c)}">
      <span class="pathway__label" lang="en">${c.label}</span>
      <span class="pathway__name">${c.name}</span>
      <span class="pathway__grade">${c.grade}</span>
    </a>
  </li>`,
  )}
  <li class="pathway__stop pathway__stop--next" style="--i:${ordered.length}">
    <span class="pathway__label" lang="en">${nextStage.label}</span>
    <span class="pathway__name">${nextStage.text}</span>
  </li>
</ol>`;
}
