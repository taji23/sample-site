// @ts-check
import { ContentSection } from '../components/AnimatedSection.js';
import { CtaBand } from '../components/CtaBand.js';
import { EventCard } from '../components/EventCard.js';
import { Media } from '../components/Media.js';
import { RuleList } from '../components/SpecList.js';
import { communityActivities } from '../data/club.js';
import { pastEvents, upcomingEvents } from '../data/events.js';
import { photo } from '../data/images.js';
import { navGroup } from '../data/navigation.js';
import { todayIso } from '../lib/format.js';
import { html } from '../lib/html.js';
import { SubPage } from '../templates/SubPage.js';

const group = navGroup('community');

/** @param {import('../data/events.js').ClubEvent[]} list @param {boolean} [past] */
const eventGrid = (list, past = false) =>
  html`<ul class="grid-auto event-grid" role="list" data-reveal-stagger style="--grid-min:21rem">${list.map((e, i) => html`<li style="--i:${i}">${EventCard({ event: e, past })}</li>`)}</ul>`;

function renderCommunity() {
  const upcoming = upcomingEvents(todayIso()).slice(0, 3);
  const main = html`${ContentSection({
    id: 'community-intro-title',
    en: 'Community',
    title: '地域とともに',
    children: html`<div class="split split--reverse">
      <figure data-reveal data-parallax="slow">${Media({ image: photo('school', { position: '30% 50%' }), ratio: 'landscape', sizes: '(min-width: 64em) 52vw, 100vw' })}</figure>
      <div class="stack" data-reveal>
        <p class="statement">サッカーを通じて、<br>まちの笑顔を増やす。</p>
        <p class="prose">サンプルFCは、地域の皆さまに支えられて活動しています。サッカー教室や清掃活動などを通じて、恩返しを続けていきます。</p>
      </div>
    </div>`,
  })}
${ContentSection({
    id: 'community-activities-title',
    tone: 'mist',
    en: 'Activities',
    title: '地域での活動',
    children: RuleList({ items: communityActivities, numbered: true }),
  })}
${ContentSection({
    id: 'community-events-title',
    en: 'Events',
    title: 'これからのイベント',
    action: { label: 'イベント一覧', href: '/community/events/' },
    children: upcoming.length > 0 ? eventGrid(upcoming) : html`<p class="empty-state">現在、公開中のイベントはありません。</p>`,
  })}`;

  return SubPage({
    path: '/community/',
    group,
    title: '地域とともに',
    en: 'Community',
    lead: '地域の皆さまとともに歩むクラブとして、さまざまな活動に取り組んでいます。',
    image: photo('school', { position: '50% 50%' }),
    main,
  });
}

function renderEvents() {
  const ref = todayIso();
  const upcoming = upcomingEvents(ref);
  const past = pastEvents(ref);
  const main = html`${ContentSection({
    id: 'events-upcoming-title',
    en: 'Upcoming',
    title: '開催予定のイベント',
    lead: '日程・内容はサンプルです。参加受付中のイベントは、フォームからお申し込みいただけます。',
    children: upcoming.length > 0 ? eventGrid(upcoming) : html`<p class="empty-state">現在、開催予定のイベントはありません。</p>`,
  })}
${
  past.length > 0 &&
  ContentSection({
    id: 'events-past-title',
    tone: 'mist',
    en: 'Past Events',
    title: '開催済みのイベント',
    children: eventGrid(past, true),
  })
}`;

  return SubPage({
    path: '/community/events/',
    group,
    title: 'イベント',
    en: 'Events',
    lead: '体験会や地域活動など、どなたでもご参加いただけるイベントです。',
    image: photo('match', { position: '50% 60%' }),
    main,
    cta: CtaBand({
      en: 'Contact',
      title: 'イベントについてのご相談',
      lead: '学校・自治会・企業の皆さまからの出張教室のご依頼も受け付けています。',
      primary: { label: 'お問い合わせ', href: '/contact/?type=event' },
      secondary: { label: '地域の活動を見る', href: '/community/' },
    }),
  });
}

export const routes = [
  { path: '/community/', render: renderCommunity },
  { path: '/community/events/', render: renderEvents },
];
