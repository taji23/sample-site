// @ts-check
import { contactLink, joinNav, mainNav, trialLink } from '../data/navigation.js';
import { html } from '../lib/html.js';
import { site } from '../site.config.js';
import { Button } from './Button.js';
import { Icon } from './Icon.js';
import { SiteLogo } from './Logo.js';

/** @param {import('../data/navigation.js').NavGroup} group */
function MobileGroup(group) {
  if (!group.children?.length) {
    return html`<li><a class="mobile-nav__link" href="${group.href}"><span>${group.label}</span><span class="mobile-nav__en" lang="en">${group.en}</span></a></li>`;
  }
  return html`<li>
  <details class="mobile-nav__group">
    <summary class="mobile-nav__link"><span>${group.label}</span><span class="mobile-nav__en" lang="en">${group.en}</span>${Icon('chevron-down', { size: 18, className: 'mobile-nav__chevron' })}</summary>
    <ul class="mobile-nav__sub" role="list">
      <li><a href="${group.href}">${group.label}トップ</a></li>
      ${group.children.map((child) => html`<li><a href="${child.href}">${child.label}</a></li>`)}
    </ul>
  </details>
</li>`;
}

/** Full-screen navigation for small screens. Opened by [data-menu-toggle]. */
export function MobileNavigation() {
  return html`<div class="mobile-nav tone-navy" id="mobile-nav" role="dialog" aria-modal="true" aria-label="メニュー" hidden data-mobile-nav>
  <div class="mobile-nav__head">
    ${SiteLogo()}
    <button class="menu-toggle menu-toggle--close" type="button" data-menu-close>
      ${Icon('close', { size: 22 })}<span class="menu-toggle__label" lang="en">Close</span>
    </button>
  </div>
  <nav class="mobile-nav__body" aria-label="メニュー">
    <ul class="mobile-nav__list" role="list">
      ${[...mainNav, joinNav].map(MobileGroup)}
      <li><a class="mobile-nav__link" href="${contactLink.href}"><span>${contactLink.label}</span><span class="mobile-nav__en" lang="en">Contact</span></a></li>
    </ul>
  </nav>
  <div class="mobile-nav__foot">
    ${Button({ label: trialLink.label, href: trialLink.href, variant: 'accent', block: true })}
    <ul class="social-links" role="list">
      ${site.social
        .filter((s) => s.url)
        .map(
          (s) => html`<li><a class="social-links__item" href="${s.url}" rel="noopener" target="_blank">${Icon(s.id, {
            size: 22,
          })}<span class="visually-hidden">${s.label}（外部サイトが開きます）</span></a></li>`,
        )}
    </ul>
  </div>
</div>`;
}
