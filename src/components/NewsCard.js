// @ts-check
import { formatDotDate } from '../lib/format.js';
import { cx, html } from '../lib/html.js';
import { Badge } from './Badge.js';
import { Icon } from './Icon.js';
import { Media } from './Media.js';

/**
 * @typedef {'default' | 'feature' | 'lead' | 'compact'} NewsCardVariant
 *   default: image above text · feature: wide image + overlapping panel
 *   lead: large editorial card · compact: small thumbnail row for lists
 *
 * @typedef {object} NewsCardProps
 * @property {import('../types.js').NewsItem} news
 * @property {string} href
 * @property {NewsCardVariant} [variant]
 * @property {2 | 3} [headingLevel]
 * @property {boolean} [eager]
 */

/** @type {Record<NewsCardVariant, { ratio: import('./Media.js').MediaRatio, sizes: string }>} */
const MEDIA = {
  default: { ratio: 'landscape', sizes: '(min-width: 64em) 30vw, (min-width: 40em) 50vw, 100vw' },
  feature: { ratio: 'wide', sizes: '(min-width: 64em) 60vw, 100vw' },
  lead: { ratio: 'landscape', sizes: '(min-width: 64em) 55vw, 100vw' },
  compact: { ratio: 'landscape', sizes: '10rem' },
};

/** @param {NewsCardProps} props */
export function NewsCard({ news, href, variant = 'default', headingLevel = 3, eager = false }) {
  const title = html`<a class="card__link" href="${href}">${news.title}</a>`;
  const showExcerpt = variant !== 'compact' && news.excerpt;

  return html`<article class="${cx('card', 'news-card', variant !== 'default' && `news-card--${variant}`)}">
  ${Media({ image: news.image, ...MEDIA[variant], eager, className: 'card__media' })}
  <div class="card__body">
    <div class="card__meta">
      <time class="t-label" datetime="${news.date}">${formatDotDate(news.date)}</time>
      ${Badge({ label: news.category, tone: 'outline' })}
    </div>
    ${
      headingLevel === 2
        ? html`<h2 class="card__title">${title}</h2>`
        : html`<h3 class="card__title">${title}</h3>`
    }
    ${showExcerpt && html`<p class="card__excerpt">${news.excerpt}</p>`}
    ${variant !== 'compact' && html`<span class="card__arrow">${Icon('arrow-right', { size: 20 })}</span>`}
  </div>
</article>`;
}
