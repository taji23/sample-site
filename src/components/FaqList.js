// @ts-check
import { html } from '../lib/html.js';
import { Icon } from './Icon.js';

/**
 * Native <details> accordion: works without JavaScript and is keyboard accessible.
 * @param {{ groups: import('../data/faq.js').FaqGroup[], headingLevel?: 2 | 3 }} props
 */
export function FaqList({ groups, headingLevel = 3 }) {
  return html`<div class="faq">
  ${groups.map((g) => {
    const title =
      headingLevel === 2 ? html`<h2 class="faq__group-title">${g.title}</h2>` : html`<h3 class="faq__group-title">${g.title}</h3>`;
    return html`<section class="faq__group" aria-label="${g.title}" data-reveal>
    ${title}
    <div class="faq__items">
      ${g.items.map(
        (item) => html`<details class="faq__item">
        <summary><span class="faq__q"><span class="faq__mark" lang="en" aria-hidden="true">Q</span>${item.q}</span>${Icon('chevron-down', { size: 20, className: 'faq__chevron' })}</summary>
        <p class="faq__a"><span class="faq__mark faq__mark--a" lang="en" aria-hidden="true">A</span>${item.a}</p>
      </details>`,
      )}
    </div>
  </section>`;
  })}
</div>`;
}
