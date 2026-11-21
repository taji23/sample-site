// @ts-check
import { html } from '../lib/html.js';
import { Button } from './Button.js';

/**
 * Closing call-to-action band shared by every subpage.
 * @param {{
 *   id?: string,
 *   en: string,
 *   title: string,
 *   lead?: string,
 *   primary: import('./Button.js').ButtonProps,
 *   secondary?: import('./Button.js').ButtonProps,
 * }} props
 */
export function CtaBand({ id = 'cta-title', en, title, lead, primary, secondary }) {
  return html`<section class="cta-band tone-navy" aria-labelledby="${id}">
  <div class="container container--wide cta-band__inner">
    <div class="cta-band__text" data-reveal>
      <h2 class="cta-band__title" id="${id}"><span class="cta-band__en" lang="en">${en}</span><span class="cta-band__ja">${title}</span></h2>
      ${lead && html`<p class="cta-band__lead">${lead}</p>`}
    </div>
    <div class="cta-band__actions cluster" data-reveal>
      ${Button({ variant: 'accent', size: 'lg', ...primary })}
      ${secondary && Button({ variant: 'secondary', size: 'lg', ...secondary })}
    </div>
  </div>
</section>`;
}
