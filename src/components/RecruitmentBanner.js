// @ts-check
import { html } from '../lib/html.js';
import { Button } from './Button.js';

/**
 * @typedef {object} RecruitmentBannerProps
 * @property {import('../types.js').ImageAsset} image
 * @property {number} [number]
 * @property {string} headline       English display word(s), e.g. 'JOIN US'.
 * @property {string} title          Japanese heading.
 * @property {string} lead
 * @property {string} body
 * @property {{ title: string, text: string }[]} steps
 * @property {import('./Button.js').ButtonProps} primary
 * @property {import('./Button.js').ButtonProps} [secondary]
 */

/** Full-bleed recruitment call to action over photography. @param {RecruitmentBannerProps} props */
export function RecruitmentBanner({ image, number, headline, title, lead, body, steps, primary, secondary }) {
  return html`<section class="recruit tone-navy" id="join" aria-labelledby="join-title">
  <div class="recruit__media" data-parallax>
    <img src="${image.src}"${image.srcset ? html` srcset="${image.srcset}" sizes="100vw"` : ''} width="${image.width ?? ''}" height="${image.height ?? ''}" alt="${image.alt}" loading="lazy" decoding="async">
  </div>
  <div class="recruit__scrim" aria-hidden="true"></div>
  <div class="container container--wide recruit__inner">
    <div class="recruit__head" data-reveal>
      ${number !== undefined && html`<div class="section-heading__index" aria-hidden="true"><span class="section-heading__number">${String(number).padStart(2, '0')}</span><span class="section-heading__rule"></span></div>`}
      <h2 class="recruit__title" id="join-title"><span class="recruit__en" lang="en">${headline}</span><span class="recruit__ja">${title}</span></h2>
    </div>
    <div class="recruit__body" data-reveal>
      <p class="recruit__lead">${lead}</p>
      <p class="recruit__text">${body}</p>
      <ol class="recruit__steps" role="list">
        ${steps.map(
          (s, i) => html`<li class="recruit__step"><span class="recruit__step-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span class="recruit__step-title">${s.title}</span><span class="recruit__step-text">${s.text}</span></li>`,
        )}
      </ol>
      <div class="cluster recruit__actions">
        ${Button({ variant: 'accent', size: 'lg', ...primary })}
        ${secondary && Button({ variant: 'secondary', size: 'lg', ...secondary })}
      </div>
    </div>
  </div>
</section>`;
}
