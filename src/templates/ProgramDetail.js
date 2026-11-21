// @ts-check
import { FactStrip } from '../components/SpecList.js';
import { Media } from '../components/Media.js';
import { PagerNav } from '../components/PageLinks.js';
import { html } from '../lib/html.js';
import { SubPage } from './SubPage.js';

/**
 * Shared template for a single record page (an age category or a school
 * class): portrait hero, key-fact strip, free sections, previous / next.
 *
 * @param {{
 *   path: string,
 *   group: import('../data/navigation.js').NavGroup,
 *   trail?: { label: string, href?: string }[],
 *   en: string,
 *   title: string,
 *   crumb?: string,
 *   lead: string,
 *   image?: import('../types.js').ImageAsset,
 *   facts: { label: string, value: string }[],
 *   sections: import('../lib/html.js').SafeHtml,
 *   pager?: { label: string, prev?: { title: string, href: string }, next?: { title: string, href: string } },
 *   cta?: import('../lib/html.js').SafeHtml | false,
 * }} props
 */
export function ProgramDetail({ path, group, trail, en, title, crumb, lead, image, facts, sections, pager, cta }) {
  const side = image
    ? html`<figure class="page-hero__portrait">${Media({ image, ratio: 'portrait', eager: true, sizes: '(min-width: 64em) 28vw, 70vw' })}</figure>`
    : undefined;

  const main = html`<div class="detail-facts"><div class="container container--wide">${FactStrip({ items: facts })}</div></div>
${sections}
${
  pager &&
  html`<div class="section section--tight"><div class="container container--wide">${PagerNav(pager)}</div></div>`
}`;

  return SubPage({ path, group, trail, en, title, crumb, lead, side, main, cta });
}
