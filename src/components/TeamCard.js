// @ts-check
import { html } from '../lib/html.js';
import { Icon } from './Icon.js';
import { Media } from './Media.js';

/**
 * Age-category card. Content comes entirely from the Category record, so new
 * categories appear without touching this component.
 * @param {{ category: import('../types.js').Category, href: string, headingLevel?: 2 | 3 }} props
 */
export function TeamCard({ category, href, headingLevel = 3 }) {
  const name = html`<a class="card__link" href="${href}"><span class="team-card__label" lang="en">${category.label}</span><span class="team-card__name">${category.name}</span></a>`;

  return html`<article class="card team-card">
  ${Media({
    image: category.image,
    ratio: 'portrait',
    sizes: '(min-width: 64em) 25vw, (min-width: 40em) 50vw, 100vw',
    className: 'card__media',
  })}
  <div class="team-card__overlay on-dark">
    ${
      headingLevel === 2
        ? html`<h2 class="team-card__title">${name}</h2>`
        : html`<h3 class="team-card__title">${name}</h3>`
    }
    <p class="team-card__grade">${category.grade}</p>
    ${category.summary && html`<p class="team-card__summary">${category.summary}</p>`}
    <span class="card__arrow team-card__arrow">${Icon('arrow-right', { size: 20 })}</span>
  </div>
</article>`;
}
