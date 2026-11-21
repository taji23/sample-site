// @ts-check
import { contactLink, joinNav, mainNav } from '../data/navigation.js';
import { sponsorsByTier } from '../data/sponsors.js';
import { html } from '../lib/html.js';
import { site } from '../site.config.js';
import { Icon } from './Icon.js';
import { SiteLogo } from './Logo.js';

/** Global footer: club info, sitemap, social, top partner, disclaimers. */
export function SiteFooter() {
  const groups = [...mainNav, joinNav];
  const topPartners = sponsorsByTier('top');
  const year = new Date().getFullYear();

  return html`<footer class="site-footer tone-navy" id="site-footer">
  <div class="container container--wide site-footer__inner">
    <div class="site-footer__brand">
      ${SiteLogo()}
      <address class="site-footer__address">
        <p>${site.contact.address}</p>
        <p><a href="mailto:${site.contact.email}">${site.contact.email}</a><span class="site-footer__hours">受付 ${site.contact.hours}</span></p>
      </address>
      <a class="site-footer__contact" href="${contactLink.href}">${Icon('mail', { size: 18 })}${contactLink.label}${Icon('arrow-right', { size: 16 })}</a>
      <ul class="social-links" role="list" aria-label="公式SNS">
        ${site.social
          .filter((s) => s.url)
          .map(
            (s) => html`<li><a class="social-links__item" href="${s.url}" rel="noopener" target="_blank">${Icon(s.id, {
              size: 22,
            })}<span class="visually-hidden">${s.label}（外部サイトが開きます）</span></a></li>`,
          )}
      </ul>
    </div>
    <nav class="site-footer__nav" id="site-footer-nav" aria-label="サイトマップ">
      ${groups.map(
        (g) => html`<div class="site-footer__col">
        <p class="site-footer__heading"><a href="${g.href}">${g.label}</a></p>
        ${
          g.children?.length &&
          html`<ul role="list">${g.children
            .filter((c) => c.href !== g.href)
            .map((c) => html`<li><a href="${c.href}">${c.label}</a></li>`)}</ul>`
        }
      </div>`,
      )}
    </nav>
  </div>
  ${
    topPartners.length > 0 &&
    html`<div class="container container--wide site-footer__partners">
    <p class="t-label">Official Top Partner</p>
    <ul class="site-footer__partner-list" role="list">${topPartners.map(
      (s) => html`<li><span lang="en" aria-hidden="true">${s.mark}</span><span class="visually-hidden">${s.name}</span></li>`,
    )}</ul>
    <a href="/partners/">パートナー一覧${Icon('arrow-right', { size: 16 })}</a>
  </div>`
  }
  <div class="container container--wide site-footer__bottom">
    <p class="site-footer__note">このサイトはデザインサンプルです。クラブ名・人物・試合・記事・企業名はすべて架空のもので、写真は AI で生成したイメージです。</p>
    <p class="site-footer__copy"><small lang="en">&copy; ${year} ${site.nameEn}</small></p>
  </div>
</footer>`;
}
