// @ts-check
import { html } from '../lib/html.js';
import { Breadcrumbs } from './Breadcrumbs.js';

/**
 * @typedef {object} PageHeroProps
 * @property {{ label: string, href?: string }[]} crumbs
 * @property {string} en                 English display title (the visual headline).
 * @property {string} title              Japanese page title.
 * @property {string} [lead]
 * @property {import('../types.js').ImageAsset} [image]  Photo behind the hero.
 * @property {import('../lib/html.js').SafeHtml} [side]  Extra content beside the title (e.g. a portrait).
 */

/**
 * Subpage hero. Navy by default; with an image it becomes a photographic band
 * that uses the same navy scrim as the homepage hero. Entrance motion is pure CSS.
 * @param {PageHeroProps} props
 */
export function PageHero({ crumbs, en, title, lead, image, side }) {
  const hasMedia = Boolean(image?.src);
  return html`<header class="page-hero tone-navy${hasMedia ? ' page-hero--photo' : ''}${side ? ' page-hero--split' : ''}">
  ${
    hasMedia &&
    image &&
    html`<div class="page-hero__media"><img src="${image.src}"${image.srcset ? html` srcset="${image.srcset}" sizes="100vw"` : ''} width="${image.width ?? ''}" height="${image.height ?? ''}" alt="${image.alt}" fetchpriority="high" decoding="async"${image.position ? html` style="object-position:${image.position}"` : ''}></div><div class="page-hero__scrim" aria-hidden="true"></div>`
  }
  <div class="container container--wide page-hero__inner">
    <div class="page-hero__text">
      ${Breadcrumbs({ items: crumbs })}
      <h1 class="page-hero__title"><span class="page-hero__en" lang="en">${en}</span><span class="page-hero__ja">${title}</span></h1>
      ${lead && html`<p class="page-hero__lead">${lead}</p>`}
    </div>
    ${side && html`<div class="page-hero__side">${side}</div>`}
  </div>
</header>`;
}
