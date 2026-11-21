// @ts-check
import { html } from '../lib/html.js';
import { Icon } from './Icon.js';

/**
 * @typedef {object} SocialAccount
 * @property {string} id
 * @property {string} label
 * @property {string} handle
 * @property {string} [url]
 */

/**
 * Instagram feed + YouTube preview. Unset accounts remain non-interactive samples.
 * @param {{
 *   instagram?: SocialAccount,
 *   instagramWidgetFeedId?: string,
 *   youtube?: SocialAccount,
 *   instagramImages: import('../types.js').ImageAsset[],
 *   video?: { title: string, image: import('../types.js').ImageAsset, duration?: string },
 *   others?: SocialAccount[],
 * }} props
 */
export function SocialFeed({ instagram, instagramWidgetFeedId, youtube, instagramImages, video, others = [] }) {
  const videoContent =
    youtube &&
    video &&
    html`<span class="social-feed__thumb">
      <img src="${video.image.src}"${video.image.srcset ? html` srcset="${video.image.srcset}" sizes="(min-width: 64em) 55vw, 100vw"` : ''} width="${video.image.width ?? ''}" height="${video.image.height ?? ''}" alt="" loading="lazy" decoding="async">
      <span class="social-feed__play" aria-hidden="true">${Icon('play', { size: 28 })}</span>
      ${video.duration && html`<span class="social-feed__duration">${video.duration}</span>`}
    </span>
    <span class="social-feed__platform">${Icon('youtube', { size: 20 })}YouTube${!youtube.url && html`<span class="social-feed__sample">サンプル</span>`}</span>
    <span class="social-feed__title">${video.title}</span>
    ${!youtube.url && html`<span class="social-feed__notice">動画リンクは未設定です</span>`}
    ${youtube.url && html`<span class="visually-hidden">（YouTube が開きます）</span>`}`;

  const instagramContent =
    instagram &&
    html`<span class="social-feed__insta-head">${Icon('instagram', { size: 22 })}<span><span class="social-feed__handle" lang="en">${instagram.handle}</span><span class="social-feed__insta-label">${instagram.url ? 'Instagram をフォロー' : 'サンプルアカウント'}</span></span>${instagram.url && Icon('arrow-up-right', { size: 18, className: 'social-feed__ext' })}</span>
    <span class="social-feed__grid">${instagramImages.map(
      (img) => html`<img src="${img.src}"${img.srcset ? html` srcset="${img.srcset}" sizes="(min-width: 64em) 14vw, 33vw"` : ''} width="${img.width ?? ''}" height="${img.height ?? ''}" alt="" loading="lazy" decoding="async"${img.position ? html` style="object-position:${img.position}"` : ''}>`,
    )}</span>
    ${!instagram.url && html`<span class="social-feed__notice">SNSリンクは未設定です</span>`}
    ${instagram.url && html`<span class="visually-hidden">（Instagram が開きます）</span>`}`;

  return html`<div class="social-feed">
  ${
    youtube &&
    video &&
    html`<article class="social-feed__video" data-reveal>
    ${youtube.url ? html`<a class="social-feed__video-link" href="${youtube.url}" rel="noopener" target="_blank">${videoContent}</a>` : html`<div class="social-feed__video-preview">${videoContent}</div>`}
  </article>`
  }
  ${
    instagram &&
    html`<div class="social-feed__insta" data-reveal>
    ${
      instagramWidgetFeedId
        ? html`<div class="social-feed__insta-preview">
      <div class="social-feed__insta-head">${Icon('instagram', { size: 22 })}<span class="social-feed__handle" lang="en">Instagram</span></div>
      <behold-widget feed-id="${instagramWidgetFeedId}"></behold-widget>
      <p class="social-feed__notice" id="instagram-widget-error" hidden>Instagramの投稿を読み込めませんでした。時間をおいて再度お試しください。</p>
      <noscript><p class="social-feed__notice">Instagramの投稿を見るにはJavaScriptを有効にしてください。</p></noscript>
      <script type="module" src="https://w.behold.so/widget.js" onerror="document.getElementById('instagram-widget-error').hidden = false"></script>
    </div>`
        : instagram.url
          ? html`<a class="social-feed__insta-link" href="${instagram.url}" rel="noopener" target="_blank">${instagramContent}</a>`
          : html`<div class="social-feed__insta-preview">${instagramContent}</div>`
    }
  </div>`
  }
  ${
    others.length > 0 &&
    html`<ul class="social-feed__others" role="list">${others.map(
      (s) => html`<li><a href="${s.url}" rel="noopener" target="_blank">${Icon(s.id, { size: 20 })}<span lang="en">${s.label}</span><span class="t-muted">${s.handle}</span><span class="visually-hidden">（外部サイトが開きます）</span></a></li>`,
    )}</ul>`
  }
</div>`;
}
