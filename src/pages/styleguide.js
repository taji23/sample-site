// @ts-check
import {
  AccentButton,
  Button,
  MatchCard,
  NewsCard,
  PrimaryButton,
  SecondaryButton,
  SectionHeading,
  TeamCard,
  TextButton,
} from '../components/index.js';
import { html } from '../lib/html.js';
import { BaseLayout } from '../templates/BaseLayout.js';
import { sampleCategories, sampleMatches, sampleNews } from './styleguide.fixtures.js';

/** Brand palette documentation; values mirror tokens.css. */
const SWATCHES = [
  { token: '--brand-white', hex: '#FFFFFF', role: 'メイン背景', note: '本文 #1E293B と 14.6:1' },
  { token: '--brand-mist', hex: '#F8FAFC', role: 'セカンダリ背景', note: '本文と 14.0:1' },
  { token: '--brand-navy', hex: '#00236A', role: 'ブランドダーク・見出し・帯', note: '白文字と 14.5:1', dark: true },
  { token: '--brand-royal', hex: '#0054A7', role: 'アクション（ボタン・リンク）', note: '白文字と 7.4:1', dark: true },
  { token: '--brand-gold', hex: '#BBAB54', role: 'アクセント（罫線・数字・JOIN US）', note: '白背景の文字には使用不可（2.3:1）／紺地で 6.3:1' },
  { token: '--brand-gold-ink', hex: '#7D7030', role: '白背景上のゴールド文字（派生色）', note: '白と 4.96:1', dark: true },
  { token: '--brand-ink', hex: '#1E293B', role: '本文テキスト', note: '白と 14.6:1', dark: true },
  { token: '--brand-slate', hex: '#64748B', role: '補足テキスト', note: '白と 4.8:1／#F8FAFC と 4.6:1', dark: true },
];

const TYPE_ROLES = [
  { cls: 't-display', name: 'Display', sample: 'Modern Football', lang: 'en' },
  { cls: 't-h1', name: 'H1', sample: '育成年代に、本物の環境を。' },
  { cls: 't-h2', name: 'H2', sample: 'クラブフィロソフィー' },
  { cls: 't-h3', name: 'H3', sample: 'U-12 ジュニアの年間スケジュール' },
  {
    cls: 't-lead',
    name: 'Lead',
    sample: '選手一人ひとりの成長段階に合わせ、技術・判断・人間性をバランスよく育てます。',
  },
  {
    cls: 't-body',
    name: 'Body',
    sample:
      '練習は週3回、サンプル市立総合グラウンドで行います。初めてサッカーに触れるお子さまでも安心して参加できるよう、少人数のグループに分けて指導します。見学はいつでも受け付けています。',
  },
  { cls: 't-small', name: 'Small', sample: '※掲載の内容はすべて架空のサンプルです。' },
  { cls: 't-label', name: 'Label', sample: 'Next Match · 2026.11.29', lang: 'en' },
  { cls: 't-numeral', name: 'Numeral', sample: '01 23 4-2', style: 'font-size:3.5rem;color:var(--brand-navy)' },
];

function ColorSection() {
  return html`<section class="section" aria-labelledby="sg-color">
  <div class="container">
    ${SectionHeading({ number: 1, en: 'Color', title: 'カラー', id: 'sg-color', lead: '仕様書で指定された7色のみを使用します。ゴールドの文字用に暗くした派生色を1色だけ追加し、そのほかの色はすべてこの範囲から算出します。' })}
    <ul class="sg-swatches" role="list">
      ${SWATCHES.map(
        (s) => html`<li class="sg-swatch">
        <span class="sg-swatch__chip" style="background:var(${s.token})"></span>
        <span class="sg-swatch__hex t-label">${s.hex}</span>
        <code class="sg-swatch__token">${s.token}</code>
        <span class="sg-swatch__role">${s.role}</span>
        <span class="t-caption">${s.note}</span>
      </li>`,
      )}
    </ul>
  </div>
</section>`;
}

function TypeSection() {
  return html`<section class="section tone-mist" aria-labelledby="sg-type">
  <div class="container">
    ${SectionHeading({ number: 2, en: 'Typography', title: 'タイポグラフィ', id: 'sg-type', lead: '欧文の見出し・数字は Archivo（コンデンス・極太）、和文は Zen Kaku Gothic New。サイズは画面幅 360px〜1440px で連続的に変化します。' })}
    <dl class="sg-type">
      ${TYPE_ROLES.map(
        (r) => html`<div class="sg-type__row">
        <dt class="t-label t-muted">${r.name}<br><code>.${r.cls}</code></dt>
        <dd class="${r.cls}"${r.lang ? html` lang="${r.lang}"` : ''}${r.style ? html` style="${r.style}"` : ''}>${r.sample}</dd>
      </div>`,
      )}
    </dl>
  </div>
</section>`;
}

function LayoutSection() {
  return html`<section class="section" aria-labelledby="sg-layout">
  <div class="container">
    ${SectionHeading({ number: 3, en: 'Layout', title: 'コンテナとグリッド', id: 'sg-layout', lead: '余白は画面幅に応じて 20px〜48px。本文の最大幅は 1280px、写真などの広い要素は 1472px、文章のみの部分は 768px です。' })}
  </div>
  <div class="sg-containers">
    <div class="container container--wide"><div class="sg-bar">.container--wide · 92rem</div></div>
    <div class="container"><div class="sg-bar">.container · 80rem</div></div>
    <div class="container container--narrow"><div class="sg-bar">.container--narrow · 48rem</div></div>
  </div>
  <div class="container sg-stack">
    <p class="t-label t-muted"><code>.grid-auto</code>：件数に応じて自動で折り返し</p>
    <div class="grid-auto" style="--grid-min:12rem">
      ${[1, 2, 3, 4, 5].map((n) => html`<div class="sg-cell">${n}</div>`)}
    </div>
    <p class="t-label t-muted"><code>.split .split--overlap</code>：7:5 の非対称、テキストが画像に重なる</p>
    <div class="split split--overlap">
      <div class="sg-cell sg-cell--tall">7 / 12</div>
      <div class="sg-cell sg-cell--panel">5 / 12 (overlap)</div>
    </div>
  </div>
</section>`;
}

function ButtonSection() {
  const row = html`<div class="cluster">
      ${PrimaryButton({ label: '体験練習に申し込む', href: '#' })}
      ${SecondaryButton({ label: 'クラブについて', href: '#' })}
      ${AccentButton({ label: 'JOIN US', href: '#', icon: false })}
      ${TextButton({ label: '一覧を見る', href: '#' })}
    </div>`;
  return html`<section class="section" aria-labelledby="sg-buttons">
  <div class="container">
    ${SectionHeading({ number: 4, en: 'Buttons', title: 'ボタン', id: 'sg-buttons', lead: 'ホバー時は塗りが左から広がり、矢印が前へ動きます。紺地では Primary がゴールドに切り替わります。タップ領域は 40px 以上を確保しています。' })}
    <div class="sg-stack">
      <p class="t-label t-muted">On light</p>
      ${row}
      <p class="t-label t-muted">Sizes</p>
      <div class="cluster">
        ${PrimaryButton({ label: '小 sm', href: '#', size: 'sm' })}
        ${PrimaryButton({ label: '標準 md', href: '#' })}
        ${PrimaryButton({ label: '大 lg', href: '#', size: 'lg' })}
      </div>
      <p class="t-label t-muted">States</p>
      <div class="cluster">
        ${PrimaryButton({ label: '受付終了', disabled: true })}
        ${PrimaryButton({ label: '送信中', loading: true })}
        ${SecondaryButton({ label: '公式 Instagram', href: '#', external: true })}
      </div>
      <div style="max-width:22rem">${PrimaryButton({ label: '幅いっぱい block', href: '#', block: true })}</div>
    </div>
  </div>
  <div class="tone-navy sg-band">
    <div class="container sg-stack">
      <p class="t-label t-muted">On navy</p>
      ${row}
      <div class="cluster">
        ${Button({ label: '受付終了', disabled: true })}
        ${Button({ label: '送信中', loading: true })}
      </div>
    </div>
  </div>
</section>`;
}

function HeadingSection() {
  return html`<section class="section tone-mist" aria-labelledby="sg-heading">
  <div class="container">
    ${SectionHeading({ number: 5, en: 'Section Heading', title: 'セクション見出し', id: 'sg-heading' })}
    <div class="sg-stack sg-stack--loose">
      ${SectionHeading({
        number: 3,
        en: 'Latest News',
        title: '最新ニュース',
        lead: 'クラブの活動報告、試合結果、イベント情報をお届けします。',
        action: { label: 'ニュース一覧', href: '#' },
        level: 3,
      })}
      ${SectionHeading({ title: '英語表記なしの見出し', lead: '英語表記を省くと、和文の見出しがそのまま大見出しになります。', level: 3 })}
      ${SectionHeading({ number: 8, en: 'Join Us', title: '選手募集', align: 'center', lead: '中央揃えは、募集の呼びかけなど単独で置く見出しに使います。', level: 3 })}
    </div>
  </div>
  <div class="tone-navy sg-band">
    <div class="container">
      ${SectionHeading({
        number: 2,
        en: 'Next Match',
        title: '次の試合',
        lead: '紺地では番号がゴールドになり、テキストは自動で白系に切り替わります。',
        action: { label: '日程をすべて見る', href: '#' },
        level: 3,
      })}
    </div>
  </div>
</section>`;
}

function CardSection() {
  return html`<section class="section" aria-labelledby="sg-cards">
  <div class="container">
    ${SectionHeading({ number: 6, en: 'Cards', title: 'カード', id: 'sg-cards', lead: 'カード全体がリンクになっています（リンクはタイトル1つだけ）。ホバー時は少し浮き上がり、写真が拡大し、タイトルに下線が引かれます。写真がない場合はデザイン済みのプレースホルダーを表示します。' })}
    <div class="sg-stack sg-stack--loose">
      <p class="t-label t-muted">NewsCard：feature</p>
      ${NewsCard({ news: sampleNews[0], href: '#', variant: 'feature' })}
      <p class="t-label t-muted sg-after-feature">NewsCard：default</p>
      <div class="grid-auto" style="--grid-min:20rem">
        ${sampleNews.map((news) => NewsCard({ news, href: '#' }))}
      </div>
      <p class="t-label t-muted">TeamCard：カテゴリーはデータから生成</p>
      <div class="grid-auto" style="--grid-min:14rem">
        ${[...sampleCategories]
          .sort((a, b) => a.order - b.order)
          .map((category) => TeamCard({ category, href: '#' }))}
      </div>
      <p class="t-label t-muted">MatchCard：default / feature</p>
      <div class="grid-auto" style="--grid-min:19rem">
        ${sampleMatches.map((match) =>
          MatchCard({
            match,
            categoryLabel: sampleCategories.find((c) => c.id === match.categoryId)?.label,
          }),
        )}
      </div>
      ${MatchCard({ match: sampleMatches[0], categoryLabel: 'U-15', variant: 'feature', href: '#' })}
    </div>
  </div>
</section>`;
}

export function renderStyleguide() {
  const body = html`<main id="main">
  <header class="tone-navy sg-hero">
    <div class="container">
      <h1 class="t-display" lang="en">Sample FC<br>Design System</h1>
      <p class="t-lead sg-hero__lead">サンプルFC 公式サイトのデザイントークンとコンポーネントの一覧です。開発用ページのため検索エンジンには表示されません。掲載しているチーム名・試合・記事はすべて架空のサンプルです。</p>
    </div>
  </header>
  ${ColorSection()}
  ${TypeSection()}
  ${LayoutSection()}
  ${ButtonSection()}
  ${HeadingSection()}
  ${CardSection()}
</main>`;

  return BaseLayout({
    meta: { title: 'デザインシステム', path: '/styleguide/', noindex: true },
    body,
    styles: ['/assets/styleguide.css'],
  });
}
