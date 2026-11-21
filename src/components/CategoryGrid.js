// @ts-check
import { categoryHref } from '../data/categories.js';
import { html } from '../lib/html.js';
import { TeamCard } from './TeamCard.js';

/**
 * Renders any number of age categories in their configured order.
 * @param {{ categories: import('../types.js').Category[] }} props
 */
export function CategoryGrid({ categories }) {
  const ordered = [...categories].sort((a, b) => a.order - b.order);
  return html`<ul class="category-grid" role="list" data-reveal-stagger>
  ${ordered.map((category, i) => html`<li style="--i:${i}">${TeamCard({ category, href: categoryHref(category) })}</li>`)}
</ul>`;
}
