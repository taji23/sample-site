// @ts-check
import { html } from '../lib/html.js';
import { Icon } from './Icon.js';
import { Media } from './Media.js';

/**
 * @param {{ school: import('../data/schools.js').School, location?: import('../data/schools.js').SchoolLocation, href: string }} props
 */
export function SchoolCard({ school, location, href }) {
  return html`<article class="card school-card">
  ${Media({ image: school.image, ratio: 'square', sizes: '(min-width: 40em) 12rem, 7rem', className: 'card__media' })}
  <div class="school-card__body">
    <p class="school-card__target">${school.target}</p>
    <h3 class="card__title"><a class="card__link" href="${href}">${school.name}</a></h3>
    <p class="school-card__summary">${school.summary}</p>
    <dl class="school-card__facts">
      <div><dt>${Icon('clock', { size: 16 })}<span class="visually-hidden">日時</span></dt><dd>${school.schedule}</dd></div>
      ${location && html`<div><dt>${Icon('map-pin', { size: 16 })}<span class="visually-hidden">会場</span></dt><dd>${location.name}</dd></div>`}
    </dl>
  </div>
  <span class="card__arrow">${Icon('arrow-right', { size: 20 })}</span>
</article>`;
}
