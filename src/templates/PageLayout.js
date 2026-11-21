// @ts-check
import { MobileNavigation } from '../components/MobileNavigation.js';
import { SiteFooter } from '../components/SiteFooter.js';
import { SiteHeader } from '../components/SiteHeader.js';
import { StickyCta } from '../components/StickyCta.js';
import { html } from '../lib/html.js';
import { BaseLayout } from './BaseLayout.js';

/** Pages that already are the trial / inquiry destination, so the docked CTA would be redundant. */
const NO_STICKY_CTA = new Set(['/contact/', '/school/trial/']);

/**
 * Standard page chrome: header, mobile nav, main, footer, sticky CTA.
 * @param {{
 *   meta: import('./BaseLayout.js').PageMeta,
 *   main: import('../lib/html.js').SafeHtml,
 *   overlayHeader?: boolean,
 *   styles?: string[],
 * }} props
 */
export function PageLayout({ meta, main, overlayHeader = false, styles }) {
  const body = html`${SiteHeader({ current: meta.path, overlay: overlayHeader })}
  ${MobileNavigation()}
  <main id="main" tabindex="-1">
    ${main}
  </main>
  ${SiteFooter()}
  ${!NO_STICKY_CTA.has(meta.path) && StickyCta()}`;

  return BaseLayout({ meta, body, styles, bodyClass: overlayHeader ? 'has-overlay-header' : undefined });
}
