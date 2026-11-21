// @ts-check
import { attr, html, raw } from '../lib/html.js';
import { site } from '../site.config.js';

/**
 * @typedef {object} PageMeta
 * @property {string} title           Page title without the site name.
 * @property {string} [description]
 * @property {string} path            Route path, e.g. '/teams/u12/'.
 * @property {boolean} [noindex]
 * @property {string} [ogImage]       Absolute or root-relative URL.
 * @property {import('../types.js').ImageAsset} [preloadImage]  LCP image to preload.
 */

/**
 * Document shell shared by every page.
 * @param {{ meta: PageMeta, body: import('../lib/html.js').SafeHtml, bodyClass?: string, styles?: string[] }} props
 */
export function BaseLayout({ meta, body, bodyClass, styles = [] }) {
  const fullTitle = meta.path === '/' ? `${site.name}｜${meta.title}` : `${meta.title}｜${site.name}`;
  const description = meta.description ?? site.description;
  const url = new URL(meta.path, site.origin).href;
  const ogImage = meta.ogImage ? new URL(meta.ogImage, site.origin).href : null;

  return html`${raw('<!DOCTYPE html>')}
<html lang="${site.lang}" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${raw('<script>document.documentElement.classList.replace("no-js","js")</script>')}
  <title>${fullTitle}</title>
  <meta name="description" content="${description}">
  ${meta.noindex && raw('<meta name="robots" content="noindex, nofollow">')}
  <link rel="canonical" href="${url}">
  <meta name="theme-color" content="${site.themeColor}">
  <meta property="og:type" content="${meta.path === '/' ? 'website' : 'article'}">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${fullTitle}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:locale" content="ja_JP">
  ${ogImage && html`<meta property="og:image" content="${ogImage}">`}
  <meta name="twitter:card" content="${ogImage ? 'summary_large_image' : 'summary'}">
  ${site.fonts.preload.map((href) => html`<link rel="preload" href="${href}" as="font" type="font/woff2" crossorigin>`)}
  ${
    meta.preloadImage?.src &&
    html`<link rel="preload" as="image" href="${meta.preloadImage.src}"${
      meta.preloadImage.srcset ? html` imagesrcset="${meta.preloadImage.srcset}" imagesizes="100vw"` : ''
    } fetchpriority="high">`
  }
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="${site.fonts.stylesheet}">
  <link rel="stylesheet" href="/assets/site.css">
  ${styles.map((href) => html`<link rel="stylesheet" href="${href}">`)}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script type="module" src="/assets/main.js"></script>
</head>
<body${attr('class', bodyClass)}>
  <a class="skip-link" href="#main">本文へスキップ</a>
  ${body}
</body>
</html>
`;
}
