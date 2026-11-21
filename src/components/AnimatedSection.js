// @ts-check
import { attr, cx, html } from '../lib/html.js';
import { SectionHeading } from './SectionHeading.js';

/**
 * Content section with the standard rhythm and scroll reveal. `children` is
 * trusted markup produced by other components.
 *
 * @param {{
 *   labelledBy?: string,
 *   tone?: 'light' | 'mist' | 'navy',
 *   tight?: boolean,
 *   width?: 'wide' | 'default' | 'narrow',
 *   className?: string,
 *   children: import('../lib/html.js').SafeHtml,
 * }} props
 */
export function AnimatedSection({ labelledBy, tone = 'light', tight = false, width = 'wide', className, children }) {
  const container = width === 'wide' ? 'container container--wide' : width === 'narrow' ? 'container container--narrow' : 'container';
  return html`<section class="${cx('section', tight && 'section--tight', tone !== 'light' && `tone-${tone}`, className)}"${attr('aria-labelledby', labelledBy)}>
  <div class="${container}">${children}</div>
</section>`;
}

/**
 * Standard titled section: AnimatedSection + SectionHeading + content.
 * @param {{
 *   id: string,
 *   title: string,
 *   en?: string,
 *   lead?: string,
 *   number?: number,
 *   action?: import('./Button.js').ButtonProps,
 *   tone?: 'light' | 'mist' | 'navy',
 *   tight?: boolean,
 *   width?: 'wide' | 'default' | 'narrow',
 *   className?: string,
 *   children: import('../lib/html.js').SafeHtml,
 * }} props
 */
export function ContentSection({ id, title, en, lead, number, action, tone, tight, width, className, children }) {
  return AnimatedSection({
    labelledBy: id,
    tone,
    tight,
    width,
    className,
    children: html`${SectionHeading({ id, en, title, lead, number, action })}${children}`,
  });
}

/**
 * Wraps content in a scroll-reveal container.
 * @param {{ children: import('../lib/html.js').SafeHtml, stagger?: boolean, className?: string }} props
 */
export function Reveal({ children, stagger = false, className }) {
  return stagger
    ? html`<div class="${cx(className)}" data-reveal-stagger>${children}</div>`
    : html`<div class="${cx(className)}" data-reveal>${children}</div>`;
}
