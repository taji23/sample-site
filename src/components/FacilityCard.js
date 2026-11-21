// @ts-check
import { cx, html } from '../lib/html.js';
import { Icon } from './Icon.js';
import { Media } from './Media.js';

/**
 * Editorial facility block: large photograph beside a specification list.
 * @param {{ facility: import('../data/facilities.js').Facility, reverse?: boolean }} props
 */
export function FacilityCard({ facility, reverse = false }) {
  return html`<article class="${cx('facility', reverse && 'facility--reverse')}" id="${facility.id}">
  <figure class="facility__media" data-reveal>${Media({ image: facility.image, ratio: 'landscape', sizes: '(min-width: 64em) 52vw, 100vw' })}</figure>
  <div class="facility__body" data-reveal>
    <p class="facility__type" lang="ja">${facility.type}</p>
    <h3 class="facility__name">${facility.name}</h3>
    <p class="facility__summary">${facility.summary}</p>
    <ul class="facility__features" role="list">${facility.features.map((f) => html`<li>${f}</li>`)}</ul>
    <dl class="facility__facts">
      <div><dt>${Icon('map-pin', { size: 16 })}<span class="visually-hidden">所在地</span></dt><dd>${facility.address}</dd></div>
      <div><dt>${Icon('arrow-right', { size: 16 })}<span class="visually-hidden">アクセス</span></dt><dd>${facility.access}</dd></div>
    </dl>
  </div>
</article>`;
}
