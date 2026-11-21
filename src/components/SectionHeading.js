// @ts-check
import { attr, cx, html } from '../lib/html.js';
import { Button } from './Button.js';

/**
 * @typedef {object} SectionHeadingProps
 * @property {string} title               Japanese heading (always present, primary for assistive tech).
 * @property {string} [en]                English display line rendered large above the Japanese title.
 * @property {number | string} [number]   Section index; rendered as a two-digit decorative numeral.
 * @property {string} [lead]              Short supporting paragraph.
 * @property {import('./Button.js').ButtonProps} [action]  Usually a text button such as "一覧を見る".
 * @property {2 | 3} [level]
 * @property {string} [id]                id for the heading; pair with aria-labelledby on the section.
 * @property {'start' | 'center'} [align]
 * @property {string} [className]
 */

/** @param {number | string} value */
function formatNumber(value) {
  return String(value).padStart(2, '0');
}

/** @param {SectionHeadingProps} props */
export function SectionHeading({
  title,
  en,
  number,
  lead,
  action,
  level = 2,
  id,
  align = 'start',
  className,
}) {
  const tag = level === 3 ? 'h3' : 'h2';
  const hasAside = Boolean(lead || action);
  const heading = en
    ? html`<span class="section-heading__en" lang="en">${en}</span><span class="section-heading__ja">${title}</span>`
    : html`<span class="section-heading__ja section-heading__ja--primary">${title}</span>`;

  return html`<header class="${cx(
    'section-heading',
    align === 'center' && 'section-heading--center',
    hasAside && 'section-heading--has-aside',
    className,
  )}" data-reveal>
  ${
    number !== undefined &&
    html`<div class="section-heading__index" aria-hidden="true"><span class="section-heading__number">${formatNumber(
      number,
    )}</span><span class="section-heading__rule"></span></div>`
  }
  ${
    tag === 'h3'
      ? html`<h3 class="section-heading__title"${attr('id', id)}>${heading}</h3>`
      : html`<h2 class="section-heading__title"${attr('id', id)}>${heading}</h2>`
  }
  ${
    hasAside &&
    html`<div class="section-heading__aside">${lead && html`<p class="section-heading__lead">${lead}</p>`}${
      action && Button({ variant: 'text', ...action })
    }</div>`
  }
</header>`;
}
