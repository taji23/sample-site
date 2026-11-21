// @ts-check
import { categoryById } from '../data/categories.js';
import { cx, html } from '../lib/html.js';
import { Badge } from './Badge.js';

/** @param {string} romaji */
function monogram(romaji) {
  return romaji
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

/** Space-separated filter tokens for a person; 'all' marks club-wide staff. @param {import('../data/staff.js').StaffMember} person */
export const staffFilterValue = (person) => (person.categoryIds.length ? person.categoryIds.join(' ') : 'all');

/**
 * Staff card. No photograph exists yet, so a typographic monogram stands in;
 * it is replaced automatically when `image` is supplied.
 * @param {{ person: import('../data/staff.js').StaffMember, headingLevel?: 2 | 3 | 4 }} props
 */
export function StaffCard({ person, headingLevel = 3 }) {
  const name = html`<span class="staff-card__name">${person.name}</span>`;
  const heading =
    headingLevel === 2
      ? html`<h2 class="staff-card__heading">${name}</h2>`
      : headingLevel === 4
        ? html`<h4 class="staff-card__heading">${name}</h4>`
        : html`<h3 class="staff-card__heading">${name}</h3>`;
  const cats = person.categoryIds.map((id) => categoryById(id)).filter(Boolean);

  return html`<article class="${cx('card', 'staff-card')}">
  <div class="staff-card__mono" aria-hidden="true"><span>${monogram(person.romaji)}</span></div>
  <div class="staff-card__body">
    <p class="staff-card__role">${person.role}</p>
    ${heading}
    <p class="staff-card__romaji" lang="en">${person.romaji}</p>
    <p class="staff-card__bio">${person.bio}</p>
    ${
      cats.length > 0 &&
      html`<ul class="staff-card__cats cluster" role="list" aria-label="担当カテゴリー">${cats.map((c) => html`<li>${Badge({ label: c?.label ?? '', tone: 'outline' })}</li>`)}</ul>`
    }
  </div>
</article>`;
}
