// @ts-check
import { html } from '../lib/html.js';
import { Button } from './Button.js';

/**
 * @typedef {object} HeroSectionProps
 * @property {import('../types.js').ImageAsset} image
 * @property {string[]} lines              English display lines, revealed one by one.
 * @property {string} title                Japanese headline (part of the h1).
 * @property {string} lead
 * @property {import('./Button.js').ButtonProps} primary
 * @property {import('./Button.js').ButtonProps} [secondary]
 * @property {string} [credit]             Photo provenance note.
 */

/**
 * Full-bleed cinematic hero. The image sits on navy so it never flashes white,
 * and every motion is a progressive enhancement driven by `.is-loaded`.
 * @param {HeroSectionProps} props
 */
export function HeroSection({ image, lines, title, lead, primary, secondary, credit }) {
  return html`<section class="hero tone-navy" aria-labelledby="hero-title" data-hero>
  <div class="hero__media">
    <img src="${image.src}"${image.srcset ? html` srcset="${image.srcset}" sizes="100vw"` : ''} width="${image.width ?? ''}" height="${image.height ?? ''}" alt="${image.alt}" fetchpriority="high" decoding="async"${image.position ? html` style="object-position:${image.position}"` : ''}>
  </div>
  <div class="hero__scrim" aria-hidden="true"></div>
  <div class="container container--wide hero__content">
    <h1 class="hero__title" id="hero-title">
      <span class="hero__en" lang="en">${lines.map(
        (line, i) => html`<span class="hero__line"><span style="--i:${i}">${line}</span></span>`,
      )}</span>
      <span class="hero__ja">${title}</span>
    </h1>
    <p class="hero__lead">${lead}</p>
    <div class="hero__actions">
      ${Button({ variant: 'accent', size: 'lg', ...primary })}
      ${secondary && Button({ variant: 'secondary', size: 'lg', ...secondary })}
    </div>
  </div>
  ${credit && html`<p class="hero__credit">${credit}</p>`}
  <a class="hero__scroll" href="#next-match"><span lang="en">Scroll</span><span class="visually-hidden">次の試合へ移動</span><i aria-hidden="true"></i></a>
</section>`;
}
