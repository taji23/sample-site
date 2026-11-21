// @ts-check
import { ContentSection, Reveal } from '../components/AnimatedSection.js';
import { Button } from '../components/Button.js';
import { CategoryGrid } from '../components/CategoryGrid.js';
import { DataTable } from '../components/DataTable.js';
import { FacilityCard } from '../components/FacilityCard.js';
import { Media } from '../components/Media.js';
import { LinkList } from '../components/PageLinks.js';
import { RuleList, SpecList } from '../components/SpecList.js';
import { Timeline } from '../components/Timeline.js';
import { categories, sortedCategories } from '../data/categories.js';
import { clubProfile, philosophy, principles, promises } from '../data/club.js';
import { facilities, facilityById } from '../data/facilities.js';
import { history } from '../data/history.js';
import { photo } from '../data/images.js';
import { navGroup } from '../data/navigation.js';
import { html } from '../lib/html.js';
import { SubPage } from '../templates/SubPage.js';

const group = navGroup('club');

/** Converts "\n" in authored copy to line breaks. @param {string} text */
const lines = (text) => text.split('\n').map((part, i) => (i === 0 ? html`${part}` : html`<br>${part}`));

function renderAbout() {
  const main = html`${ContentSection({
    id: 'profile-title',
    en: 'Club Profile',
    title: 'クラブの基本情報',
    children: html`<div class="split">
      <div class="stack" data-reveal>
        <p class="statement">${lines(philosophy.statement)}</p>
        <p class="prose">${philosophy.body}</p>
        ${Button({ label: 'クラブ理念を詳しく見る', href: '/about/philosophy/', variant: 'secondary' })}
      </div>
      <div data-reveal>${SpecList({ items: clubProfile })}
        <p class="t-caption t-muted note">※ 掲載内容はすべて架空のサンプルです。</p>
      </div>
    </div>`,
  })}
${ContentSection({
    id: 'about-guide-title',
    tone: 'mist',
    en: 'Our Club',
    title: 'サンプルFCを知る',
    children: LinkList({
      items: [
        { title: 'クラブ理念', text: '育成の考え方と、大切にしている三つの柱。', href: '/about/philosophy/' },
        { title: '沿革', text: '2012年の設立から、現在までの歩み。', href: '/about/history/' },
        { title: '施設', text: '練習場所とクラブハウスのご案内。', href: '/about/facilities/' },
      ],
    }),
  })}
${ContentSection({
    id: 'about-teams-title',
    en: 'Our Teams',
    title: '年代別チーム',
    lead: `${categories.length}つのカテゴリーが、同じ理念のもとで活動しています。`,
    action: { label: 'チーム・スタッフ一覧', href: '/teams/' },
    children: CategoryGrid({ categories }),
  })}`;

  return SubPage({
    path: '/about/',
    group,
    title: 'クラブ概要',
    en: 'About',
    lead: 'U-8 から U-18 まで。一貫した育成で、選手と地域の未来を育てるフットボールクラブです。',
    image: photo('hero', { position: '62% 50%' }),
    main,
  });
}

function renderPhilosophy() {
  const main = html`<section class="section tone-navy philosophy-statement" aria-labelledby="statement-title">
  <div class="container container--wide split">
    <div class="stack" data-reveal>
      <h2 class="visually-hidden" id="statement-title">クラブ理念</h2>
      <p class="statement statement--xl">${lines(philosophy.statement)}</p>
      <p class="prose">${philosophy.body}</p>
    </div>
    <figure class="philosophy-statement__media" data-parallax="slow">${Media({ image: photo('philosophy'), ratio: 'portrait', sizes: '(min-width: 64em) 34vw, 90vw' })}</figure>
  </div>
</section>
${ContentSection({
    id: 'pillars-title',
    en: 'Three Pillars',
    title: '育てる三つの力',
    lead: '年代を通じて、同じ三つの力を育てます。',
    children: RuleList({ items: philosophy.pillars.map((p) => ({ title: `${p.title}（${p.en}）`, text: p.text })), numbered: true }),
  })}
${ContentSection({
    id: 'principles-title',
    tone: 'mist',
    en: 'Principles',
    title: '行動指針',
    children: RuleList({ items: principles }),
  })}
${ContentSection({
    id: 'promises-title',
    en: 'For Families',
    title: '保護者の皆さまへの約束',
    children: RuleList({ items: promises }),
  })}`;

  return SubPage({
    path: '/about/philosophy/',
    group,
    title: 'クラブ理念',
    en: 'Philosophy',
    lead: '勝つことより、勝ち続けられる選手を。技術・判断・人間性を、年代を通じて一貫した基準で育てます。',
    image: photo('philosophy', { position: '50% 65%' }),
    main,
  });
}

function renderHistory() {
  const main = ContentSection({
    id: 'history-title',
    en: 'History',
    title: 'クラブの歩み',
    lead: '小さな1チームから、U-8 から U-18 までの総合クラブへ。（年表はサンプルです）',
    children: html`<div class="split split--reverse">
      <figure class="history__media" data-reveal data-parallax="slow">${Media({ image: photo('match'), ratio: 'portrait', sizes: '(min-width: 64em) 34vw, 90vw' })}</figure>
      ${Timeline({ items: history })}
    </div>`,
  });

  return SubPage({
    path: '/about/history/',
    group,
    title: '沿革',
    en: 'History',
    lead: '2012年の設立から、現在までの歩みをご紹介します。',
    image: photo('join', { position: '50% 45%' }),
    main,
  });
}

function renderFacilities() {
  const rows = sortedCategories().map((c) => {
    const place = facilityById(c.locationId ?? '');
    return [html`<a href="/teams/${c.id}/">${c.label} ${c.name}</a>`, c.practice ?? '—', place ? html`<a href="#${place.id}">${place.name}</a>` : '—'];
  });

  const main = html`${ContentSection({
    id: 'facilities-title',
    en: 'Facilities',
    title: '練習施設',
    lead: '年間を通じて、安全に練習できる環境を整えています。（施設情報はサンプルです）',
    children: html`<div class="stack stack--l">${facilities.map((f, i) => FacilityCard({ facility: f, reverse: i % 2 === 1 }))}</div>`,
  })}
${ContentSection({
    id: 'usage-title',
    tone: 'mist',
    en: 'Usage',
    title: 'カテゴリー別の使用場所',
    children: Reveal({
      children: DataTable({
        caption: 'カテゴリー別の練習日と使用場所',
        columns: [{ label: 'カテゴリー', rowHeader: true }, { label: '練習日' }, { label: '主な使用場所' }],
        rows,
      }),
    }),
  })}`;

  return SubPage({
    path: '/about/facilities/',
    group,
    title: '施設',
    en: 'Facilities',
    lead: 'ナイター照明つきのグラウンドとクラブハウスで、選手の成長を支えます。',
    image: photo('hero', { position: '40% 55%' }),
    main,
  });
}

export const routes = [
  { path: '/about/', render: renderAbout },
  { path: '/about/philosophy/', render: renderPhilosophy },
  { path: '/about/history/', render: renderHistory },
  { path: '/about/facilities/', render: renderFacilities },
];
