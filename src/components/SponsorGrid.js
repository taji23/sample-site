// @ts-check
import { html } from '../lib/html.js';

/** @param {import('../data/sponsors.js').Sponsor} sponsor */
function SponsorTile(sponsor) {
  const mark = sponsor.logo
    ? html`<img src="${sponsor.logo}" alt="${sponsor.name}" loading="lazy" decoding="async">`
    : html`<span class="sponsor__mark" lang="en" aria-hidden="true">${sponsor.mark}</span><span class="visually-hidden">${sponsor.name}</span>`;
  const inner = html`${mark}<span class="sponsor__name" aria-hidden="true">${sponsor.name}</span>`;
  return html`<li class="sponsor">${
    sponsor.url
      ? html`<a class="sponsor__tile" href="${sponsor.url}" rel="noopener" target="_blank">${inner}<span class="visually-hidden">（外部サイトが開きます）</span></a>`
      : html`<div class="sponsor__tile">${inner}</div>`
  }</li>`;
}

/**
 * Sponsors grouped by tier; tiers with no sponsors are omitted.
 * @param {{ groups: { tier: import('../data/sponsors.js').SponsorTier, label: string, sponsors: import('../data/sponsors.js').Sponsor[] }[] }} props
 */
export function SponsorGrid({ groups }) {
  return html`<div class="sponsor-grid">
  ${groups
    .filter((g) => g.sponsors.length > 0)
    .map(
      (g) => html`<section class="sponsor-grid__tier sponsor-grid__tier--${g.tier}" aria-label="${g.label}" data-reveal>
      <h3 class="sponsor-grid__label">${g.label}</h3>
      <ul class="sponsor-grid__list" role="list">${g.sponsors.map(SponsorTile)}</ul>
    </section>`,
    )}
</div>`;
}
