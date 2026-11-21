// @ts-check
import { Breadcrumbs } from '../components/Breadcrumbs.js';
import { Button } from '../components/Button.js';
import { html } from '../lib/html.js';
import { PageLayout } from '../templates/PageLayout.js';

/**
 * Honest placeholder for subpages not built yet: real chrome, breadcrumbs and
 * sibling links, with a clear "in preparation" message instead of fake content.
 * @param {{ path: string, title: string, group: import('../data/navigation.js').NavGroup }} props
 */
export function renderStub({ path, title, group }) {
  /** @type {{ label: string, href?: string }[]} */
  const crumbs = [{ label: 'ホーム', href: '/' }];
  if (group.href !== path) crumbs.push({ label: group.label, href: group.href });
  crumbs.push({ label: title });
  const siblings = (group.children ?? []).filter((c) => c.href !== path);

  const main = html`<header class="page-hero tone-navy">
  <div class="container container--wide">
    ${Breadcrumbs({ items: crumbs })}
    <h1 class="page-hero__title"><span class="page-hero__en" lang="en">${group.en}</span><span class="page-hero__ja">${title}</span></h1>
  </div>
</header>
<section class="section section--tight">
  <div class="container container--narrow stub">
    <p class="stub__status">このページは現在準備中です。</p>
    <p class="t-muted">公開まで、トップページや関連ページをご覧ください。</p>
    ${
      siblings.length > 0 &&
      html`<ul class="stub__links" role="list">${siblings.map(
        (c) => html`<li><a href="${c.href}">${c.label}</a></li>`,
      )}</ul>`
    }
    ${Button({ label: 'トップページへ戻る', href: '/', variant: 'secondary' })}
  </div>
</section>`;

  return PageLayout({ meta: { title, path, noindex: true }, main });
}
