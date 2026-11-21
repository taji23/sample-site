// @ts-check
import { attr, cx, html } from '../lib/html.js';

/**
 * Local navigation across the pages of one site section (tabs on desktop,
 * a horizontally scrolling strip on phones).
 * @param {{ group: import('../data/navigation.js').NavGroup, current: string }} props
 */
export function SubNav({ group, current }) {
  const links = group.children ?? [];
  if (links.length === 0) return '';
  const items = [{ label: `${group.label}トップ`, href: group.href }, ...links.filter((l) => l.href !== group.href)];
  return html`<nav class="subnav" aria-label="${group.label}のページ">
  <div class="container container--wide">
    <ul class="subnav__list" role="list">
      ${items.map((item) => {
        const exact = item.href === current;
        const inside = !exact && item.href !== group.href && current.startsWith(item.href);
        return html`<li><a class="${cx('subnav__link', (exact || inside) && 'is-active')}" href="${item.href}"${attr('aria-current', exact ? 'page' : null)}>${item.label}</a></li>`;
      })}
    </ul>
  </div>
</nav>`;
}
