// @ts-check
import { AnimatedSection, ContentSection } from '../components/AnimatedSection.js';
import { Badge } from '../components/Badge.js';
import { Button } from '../components/Button.js';
import { FilterBar } from '../components/FilterBar.js';
import { Media } from '../components/Media.js';
import { NewsCard } from '../components/NewsCard.js';
import { PagerNav } from '../components/PageLinks.js';
import { SectionHeading } from '../components/SectionHeading.js';
import { adjacentNews, news, newsCategories, newsHref, sortedNews } from '../data/news.js';
import { navGroup } from '../data/navigation.js';
import { formatLongDate } from '../lib/format.js';
import { html } from '../lib/html.js';
import { SubPage } from '../templates/SubPage.js';

const group = navGroup('news');

function renderNewsIndex() {
  const main = ContentSection({
    id: 'news-list-title',
    en: 'Latest News',
    title: 'ニュース一覧',
    lead: '試合結果、イベント、募集情報など、クラブの最新情報をお届けします。（記事の内容は架空のサンプルです）',
    children: html`${FilterBar({
      label: 'カテゴリーで絞り込む',
      target: 'news',
      options: newsCategories().map((c) => ({ value: c, label: c })),
    })}
<ul class="grid-auto news-grid" role="list" data-filter-scope="news" style="--grid-min:20rem">
  ${sortedNews().map((item, i) => html`<li data-filter-item="${item.category}" data-reveal style="--i:${i % 3}">${NewsCard({ news: item, href: newsHref(item) })}</li>`)}
</ul>`,
  });

  return SubPage({
    path: '/news/',
    group,
    title: 'ニュース',
    en: 'News',
    lead: 'クラブからのお知らせ、試合結果、イベント情報。',
    main,
  });
}

/** @param {import('../types.js').NewsItem} item */
function renderNewsDetail(item) {
  const { newer, older } = adjacentNews(item.slug);
  const related = sortedNews()
    .filter((n) => n.slug !== item.slug)
    .sort((a, b) => Number(b.category === item.category) - Number(a.category === item.category))
    .slice(0, 3);

  const main = html`<article class="section article" aria-labelledby="article-meta">
  <div class="container container--narrow">
    <div class="article__meta" id="article-meta">
      <time class="t-label" datetime="${item.date}">${formatLongDate(item.date)}</time>
      ${Badge({ label: item.category, tone: 'outline' })}
    </div>
    ${item.image && html`<figure class="article__figure">${Media({ image: item.image, ratio: 'wide', eager: true, sizes: '(min-width: 64em) 48rem, 100vw' })}</figure>`}
    <div class="prose article__body">${(item.body ?? [item.excerpt ?? '']).map((p) => html`<p>${p}</p>`)}</div>
    <div class="article__actions">${Button({ label: 'ニュース一覧へ戻る', href: '/news/', variant: 'text', icon: false })}</div>
    ${PagerNav({
      label: '前後の記事',
      prev: newer && { title: newer.title, href: newsHref(newer) },
      next: older && { title: older.title, href: newsHref(older) },
    })}
  </div>
</article>
${AnimatedSection({
    labelledBy: 'related-title',
    tone: 'mist',
    children: html`${SectionHeading({ id: 'related-title', en: 'Related', title: '関連ニュース' })}
<ul class="grid-auto news-grid" role="list" data-reveal-stagger style="--grid-min:20rem">${related.map((n, i) => html`<li style="--i:${i}">${NewsCard({ news: n, href: newsHref(n) })}</li>`)}</ul>`,
  })}`;

  return SubPage({
    path: newsHref(item),
    group,
    title: item.title,
    en: 'News',
    description: item.excerpt,
    image: undefined,
    main,
  });
}

export const routes = [
  { path: '/news/', render: renderNewsIndex },
  ...news.map((item) => ({ path: newsHref(item), render: () => renderNewsDetail(item) })),
];
