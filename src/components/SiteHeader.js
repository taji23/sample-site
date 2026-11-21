// @ts-check
import { contactLink, joinNav, mainNav } from '../data/navigation.js';
import { attr, cx, html } from '../lib/html.js';
import { Button } from './Button.js';
import { Icon } from './Icon.js';
import { SiteLogo } from './Logo.js';

/**
 * @param {string} href
 * @param {string} current
 */
const isCurrent = (href, current) => href === current;

/**
 * @param {string} href
 * @param {string} current
 */
const isInSection = (href, current) => href !== '/' && current.startsWith(href);

/**
 * @param {import('../data/navigation.js').NavGroup} group
 * @param {string} current
 */
function NavItem(group, current) {
  const active = isInSection(group.href, current);
  if (!group.children?.length) {
    return html`<li class="site-nav__item"><a class="${cx('site-nav__link', active && 'is-active')}" href="${group.href}"${attr(
      'aria-current',
      isCurrent(group.href, current) ? 'page' : null,
    )}>${group.label}</a></li>`;
  }
  const panelId = `mega-${group.id}`;
  return html`<li class="site-nav__item" data-nav-item>
  <button class="${cx('site-nav__link', 'site-nav__trigger', active && 'is-active')}" type="button" aria-expanded="false" aria-controls="${panelId}" data-nav-trigger>
    ${group.label}${Icon('chevron-down', { size: 14, className: 'site-nav__chevron' })}
  </button>
  <div class="mega" id="${panelId}" data-mega>
    <div class="container container--wide mega__inner">
      <div class="mega__intro">
        <p class="mega__en" lang="en">${group.en}</p>
        ${group.description && html`<p class="mega__desc">${group.description}</p>`}
        <a class="mega__overview" href="${group.href}">${group.label}トップ${Icon('arrow-right', { size: 16 })}</a>
      </div>
      <ul class="mega__links" role="list">
        ${group.children.map(
          (child) => html`<li><a class="mega__link" href="${child.href}"${attr(
            'aria-current',
            isCurrent(child.href, current) ? 'page' : null,
          )}><span>${child.label}</span>${Icon('arrow-right', { size: 16 })}</a></li>`,
        )}
      </ul>
    </div>
  </div>
</li>`;
}

/**
 * Global header. `overlay` renders it transparent over a full-bleed hero until scrolled.
 * @param {{ current: string, overlay?: boolean }} props
 */
export function SiteHeader({ current, overlay = false }) {
  return html`<header class="${cx('site-header', overlay && 'site-header--overlay')}" data-header>
  <div class="container container--wide site-header__bar">
    ${SiteLogo({ current: current === '/' })}
    <nav class="site-nav" aria-label="メインメニュー">
      <ul class="site-nav__list" role="list">
        ${mainNav.map((group) => NavItem(group, current))}
      </ul>
    </nav>
    <div class="site-header__actions">
      <a class="site-header__contact" href="${contactLink.href}">${Icon('mail', { size: 18 })}<span>${contactLink.label}</span></a>
      ${Button({ label: 'JOIN US', href: joinNav.href, variant: 'accent', size: 'sm', icon: false, className: 'site-header__join' })}
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-menu-toggle>
        ${Icon('menu', { size: 22 })}<span class="menu-toggle__label" lang="en">Menu</span>
      </button>
      <a class="menu-fallback" href="#site-footer-nav">${Icon('menu', { size: 22 })}<span class="menu-toggle__label">メニュー</span></a>
    </div>
  </div>
</header>`;
}
