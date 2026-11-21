// @ts-check
import { ContentSection } from '../components/AnimatedSection.js';
import { FilterBar } from '../components/FilterBar.js';
import { MatchCard } from '../components/MatchCard.js';
import { StandingsTable } from '../components/StandingsTable.js';
import { categories, categoryById, sortedCategories } from '../data/categories.js';
import { photo } from '../data/images.js';
import { competitions, fixtures, results } from '../data/matches.js';
import { navGroup } from '../data/navigation.js';
import { formatMonth, todayIso } from '../lib/format.js';
import { html } from '../lib/html.js';
import { SubPage } from '../templates/SubPage.js';

const group = navGroup('matches');

/** @param {import('../types.js').Match} match */
const card = (match) => MatchCard({ match, categoryLabel: categoryById(match.categoryId)?.label });

/**
 * Groups matches by calendar month, preserving order.
 * @param {import('../types.js').Match[]} list
 */
function byMonth(list) {
  /** @type {Map<string, import('../types.js').Match[]>} */
  const map = new Map();
  for (const m of list) {
    const key = formatMonth(m.kickoff);
    map.set(key, [...(map.get(key) ?? []), m]);
  }
  return [...map.entries()];
}

/**
 * Month-grouped match list with category filtering.
 * @param {{ list: import('../types.js').Match[], empty: string, id: string }} props
 */
function MatchTimeline({ list, empty, id }) {
  const present = new Set(list.map((m) => m.categoryId));
  const options = sortedCategories()
    .filter((c) => present.has(c.id))
    .map((c) => ({ value: c.id, label: c.label }));
  if (list.length === 0) return html`<p class="empty-state">${empty}</p>`;
  return html`${FilterBar({ label: 'カテゴリーで絞り込む', options, target: id })}
<div data-filter-scope="${id}" class="stack stack--l">
  ${byMonth(list).map(
    ([month, items], gi) => html`<section class="match-month" aria-labelledby="${id}-m${gi}" data-filter-section>
    <h3 class="match-month__title tabular" id="${id}-m${gi}">${month}</h3>
    <ul class="match-list" role="list">${items.map((m) => html`<li data-filter-item="${m.categoryId}">${card(m)}</li>`)}</ul>
  </section>`,
  )}
</div>`;
}

function renderMatches() {
  const ref = todayIso();
  const upcoming = fixtures().filter((m) => m.status === 'postponed' || m.kickoff.slice(0, 10) >= ref);
  const [next, ...others] = upcoming.filter((m) => m.status === 'scheduled');
  const recent = results().slice(0, 3);
  const league = competitions[0];

  const main = html`${ContentSection({
    id: 'next-title',
    tone: 'navy',
    en: 'Next Match',
    title: '次の試合',
    action: { label: '試合日程をすべて見る', href: '/matches/fixtures/' },
    children: next
      ? html`<div class="match-hub" data-reveal>
        ${MatchCard({ match: next, categoryLabel: categoryById(next.categoryId)?.label, variant: 'feature', headingLevel: 3 })}
        ${others.length > 0 && html`<ul class="match-list" role="list">${others.slice(0, 2).map((m) => html`<li>${MatchCard({ match: m, categoryLabel: categoryById(m.categoryId)?.label, variant: 'feature', headingLevel: 3 })}</li>`)}</ul>`}
      </div>`
      : html`<p class="empty-state">現在、公開中の試合予定はありません。日程が決まり次第お知らせします。</p>`,
  })}
${ContentSection({
    id: 'recent-title',
    en: 'Latest Results',
    title: '最新の結果',
    action: { label: '試合結果をすべて見る', href: '/matches/results/' },
    children: html`<ul class="match-list" role="list" data-reveal-stagger>${recent.map((m, i) => html`<li style="--i:${i}">${card(m)}</li>`)}</ul>`,
  })}
${
  league &&
  ContentSection({
    id: 'table-title',
    tone: 'mist',
    en: 'Standings',
    title: 'リーグ順位',
    action: { label: '順位表をすべて見る', href: '/matches/standings/' },
    children: html`<div data-reveal>${StandingsTable({ competition: league, categoryLabel: categoryById(league.categoryId)?.label })}</div>`,
  })
}`;

  return SubPage({
    path: '/matches/',
    group,
    title: '試合',
    en: 'Matches',
    lead: '各カテゴリーの試合日程・結果・リーグ順位をご覧いただけます。（チーム名・スコアはすべて架空です）',
    image: photo('match', { position: '50% 40%' }),
    main,
  });
}

function renderFixtures() {
  const ref = todayIso();
  const list = fixtures().filter((m) => m.status === 'postponed' || m.kickoff.slice(0, 10) >= ref);
  const main = ContentSection({
    id: 'fixtures-title',
    en: 'Upcoming',
    title: '開催予定の試合',
    lead: '延期・中止となった試合は、その旨を表示します。会場・時間は変更になる場合があります。',
    children: MatchTimeline({ list, id: 'fixtures', empty: '現在、公開中の試合予定はありません。' }),
  });

  return SubPage({
    path: '/matches/fixtures/',
    group,
    title: '試合日程',
    en: 'Fixtures',
    lead: 'これからの試合予定です。応援にお越しください。',
    main,
  });
}

function renderResults() {
  const main = ContentSection({
    id: 'results-title',
    en: 'Past Matches',
    title: '過去の試合結果',
    children: MatchTimeline({ list: results(), id: 'results', empty: 'まだ試合結果はありません。' }),
  });

  return SubPage({
    path: '/matches/results/',
    group,
    title: '試合結果',
    en: 'Results',
    lead: '各カテゴリーの試合結果です。',
    main,
  });
}

function renderStandings() {
  const ordered = [...competitions].sort(
    (a, b) => (categories.find((c) => c.id === a.categoryId)?.order ?? 0) - (categories.find((c) => c.id === b.categoryId)?.order ?? 0),
  );
  const main = ContentSection({
    id: 'standings-title',
    en: 'League Tables',
    title: '各リーグの順位',
    lead: '各リーグの最新の順位です。表は横にスクロールできます。',
    children: html`<div class="stack stack--l">
      ${ordered.map((competition) => html`<div data-reveal>${StandingsTable({ competition, categoryLabel: categoryById(competition.categoryId)?.label })}</div>`)}
    </div>`,
  });

  return SubPage({
    path: '/matches/standings/',
    group,
    title: '順位表',
    en: 'Standings',
    lead: '参加しているリーグの順位表です。（チーム名・成績は架空です）',
    main,
  });
}

export const routes = [
  { path: '/matches/', render: renderMatches },
  { path: '/matches/fixtures/', render: renderFixtures },
  { path: '/matches/results/', render: renderResults },
  { path: '/matches/standings/', render: renderStandings },
];
