// @ts-check
import { ContentSection } from '../components/AnimatedSection.js';
import { Badge } from '../components/Badge.js';
import { CategoryGrid } from '../components/CategoryGrid.js';
import { DataTable } from '../components/DataTable.js';
import { FilterBar } from '../components/FilterBar.js';
import { MatchCard } from '../components/MatchCard.js';
import { StaffCard, staffFilterValue } from '../components/StaffCard.js';
import { RuleList, SpecList } from '../components/SpecList.js';
import {
  adjacentCategories,
  categories,
  categoryHref,
  recruitStatusLabels,
  sortedCategories,
} from '../data/categories.js';
import { facilityById } from '../data/facilities.js';
import { photo } from '../data/images.js';
import { matchesForCategory } from '../data/matches.js';
import { navGroup } from '../data/navigation.js';
import { playersForCategory } from '../data/players.js';
import { staff, staffByGroup, staffForCategory, staffGroupLabels } from '../data/staff.js';
import { formatYen } from '../lib/format.js';
import { html } from '../lib/html.js';
import { ProgramDetail } from '../templates/ProgramDetail.js';
import { SubPage } from '../templates/SubPage.js';

const group = navGroup('teams');

function renderTeams() {
  const rows = sortedCategories().map((c) => [
    html`<a href="${categoryHref(c)}">${c.label} ${c.name}</a>`,
    c.grade,
    c.practice ?? '—',
    facilityById(c.locationId ?? '')?.name ?? '—',
    c.members ? `${c.members}名` : '—',
  ]);

  const main = html`${ContentSection({
    id: 'categories-title',
    en: 'Categories',
    title: 'カテゴリーから探す',
    lead: `${categories.length}つの年代別チームが、同じ理念のもとで活動しています。年代を選んで、詳しい内容をご覧ください。`,
    children: CategoryGrid({ categories }),
  })}
${ContentSection({
    id: 'overview-title',
    tone: 'mist',
    en: 'Overview',
    title: 'カテゴリー一覧',
    children: DataTable({
      caption: 'カテゴリー別の対象学年・練習日・会場・人数',
      columns: [{ label: 'カテゴリー', rowHeader: true }, { label: '対象学年' }, { label: '練習日' }, { label: '主な会場' }, { label: '在籍', numeric: true }],
      rows,
      note: '※ 人数・練習日・会場はサンプルです。',
    }),
  })}
${ContentSection({
    id: 'staff-teaser-title',
    en: 'Staff',
    title: 'スタッフ',
    lead: '全カテゴリーの指導・運営スタッフをご紹介します。',
    action: { label: 'スタッフ一覧', href: '/teams/staff/' },
    children: html`<ul class="grid-auto staff-grid" role="list" data-reveal-stagger style="--grid-min:18rem">
      ${staffByGroup('coach')
        .slice(0, 3)
        .map((p, i) => html`<li style="--i:${i}">${StaffCard({ person: p })}</li>`)}
    </ul>`,
  })}`;

  return SubPage({
    path: '/teams/',
    group,
    title: 'チーム',
    en: 'Teams',
    lead: 'U-8 から U-18 まで。年代に合わせたトレーニングとリーグ戦で、選手一人ひとりを育てます。',
    image: photo('join', { position: '50% 40%' }),
    main,
  });
}

/** @param {import('../types.js').Category} c */
function renderCategory(c) {
  const place = facilityById(c.locationId ?? '');
  const recruiting = c.recruiting ? recruitStatusLabels[c.recruiting.status] : undefined;
  const coaches = staffForCategory(c.id);
  const players = playersForCategory(c.id);
  const matchList = matchesForCategory(c.id)
    .sort((a, b) => b.kickoff.localeCompare(a.kickoff))
    .slice(0, 3);
  const { prev, next } = adjacentCategories(c.id);

  const sections = html`${ContentSection({
    id: 'goal-title',
    en: 'Season Goal',
    title: '年間の目標',
    children: html`<div class="split">
      <p class="statement" data-reveal>${c.goal}</p>
      <ul class="check-list" role="list" data-reveal-stagger>${(c.focus ?? []).map((f, i) => html`<li style="--i:${i}">${f}</li>`)}</ul>
    </div>`,
  })}
${
  c.curriculum &&
  ContentSection({
    id: 'curriculum-title',
    tone: 'mist',
    en: 'Training',
    title: 'トレーニングの柱',
    children: RuleList({ items: c.curriculum, numbered: true }),
  })
}
${ContentSection({
    id: 'details-title',
    en: 'Details',
    title: '活動の詳細',
    children: html`<div class="split split--even" data-reveal>
      ${SpecList({
        items: [
          { term: '対象', desc: c.grade },
          { term: '練習', desc: c.practice ?? '—' },
          { term: '会場', desc: place ? html`<a href="/about/facilities/#${place.id}">${place.name}</a>` : '—' },
          { term: '試合形式', desc: c.format ?? '—' },
          { term: '参加リーグ・大会', desc: (c.leagues ?? ['—']).join('、') },
          { term: '月会費', desc: c.monthlyFee ? `${formatYen(c.monthlyFee)}（サンプル）` : '—' },
        ],
      })}
      <div class="callout">
        <p class="callout__label">入団について</p>
        ${recruiting && html`<p>${Badge({ label: recruiting.label, tone: recruiting.tone })}</p>`}
        <p>${c.recruiting?.note ?? ''}</p>
        <p class="t-caption t-muted">体験練習・見学は、フォームからお申し込みください。</p>
      </div>
    </div>`,
  })}
${
  coaches.length > 0 &&
  ContentSection({
    id: 'coaches-title',
    tone: 'mist',
    en: 'Staff',
    title: '担当スタッフ',
    children: html`<ul class="grid-auto staff-grid" role="list" data-reveal-stagger style="--grid-min:18rem">${coaches.map((p, i) => html`<li style="--i:${i}">${StaffCard({ person: p })}</li>`)}</ul>`,
  })
}
${
  players.length > 0 &&
  ContentSection({
    id: 'players-title',
    en: 'Squad',
    title: '注目の選手',
    lead: '選手のプライバシーに配慮し、背番号・ポジション・学年・イニシャルのみ掲載しています（架空）。',
    children: DataTable({
      className: 'data-table--narrow',
      caption: `${c.label} 注目の選手`,
      columns: [{ label: '背番号' }, { label: 'ポジション' }, { label: '学年' }, { label: 'イニシャル' }],
      rows: players.map((p) => [p.number, p.position, p.grade, p.initials]),
    }),
  })
}
${
  matchList.length > 0 &&
  ContentSection({
    id: 'matches-title',
    tone: 'mist',
    en: 'Matches',
    title: '試合',
    action: { label: '試合日程・結果', href: '/matches/' },
    children: html`<ul class="match-list" role="list" data-reveal-stagger>${matchList.map((m, i) => html`<li style="--i:${i}">${MatchCard({ match: m, categoryLabel: c.label })}</li>`)}</ul>`,
  })
}`;

  return ProgramDetail({
    path: categoryHref(c),
    group,
    en: c.label,
    title: `${c.name}（${c.grade}）`,
    crumb: `${c.label} ${c.name}`,
    lead: c.summary ?? '',
    image: c.image,
    facts: [
      { label: '対象', value: c.grade },
      { label: '練習', value: c.practice?.split('／')[0].trim() ?? '—' },
      { label: '試合形式', value: c.format?.split('（')[0] ?? '—' },
      { label: '在籍（サンプル）', value: c.members ? `${c.members}名` : '—' },
    ],
    sections,
    pager: {
      label: 'カテゴリー間の移動',
      prev: prev && { title: `${prev.label} ${prev.name}`, href: categoryHref(prev) },
      next: next && { title: `${next.label} ${next.name}`, href: categoryHref(next) },
    },
  });
}

function renderStaff() {
  const groups = /** @type {const} */ (['management', 'coach', 'support']);
  const main = ContentSection({
    id: 'staff-title',
    en: 'Staff',
    title: '指導者・スタッフ',
    lead: '氏名・経歴はすべて架空のサンプルです。',
    children: html`${FilterBar({
      label: '担当カテゴリーで絞り込む',
      target: 'staff',
      options: sortedCategories().map((c) => ({ value: c.id, label: c.label })),
    })}
<div data-filter-scope="staff" class="stack stack--l">
  ${groups.map((g) => {
    const members = staff.filter((p) => p.group === g);
    return members.length === 0
      ? ''
      : html`<section class="staff-group" aria-labelledby="staff-${g}" data-filter-section>
    <h3 class="staff-group__title" id="staff-${g}">${staffGroupLabels[g]}</h3>
    <ul class="grid-auto staff-grid" role="list" style="--grid-min:18rem">${members.map((p) => html`<li data-filter-item="${staffFilterValue(p)}">${StaffCard({ person: p, headingLevel: 4 })}</li>`)}</ul>
  </section>`;
  })}
</div>`,
  });

  return SubPage({
    path: '/teams/staff/',
    group,
    title: 'スタッフ',
    en: 'Staff',
    lead: '選手一人ひとりの成長を支える、指導者とスタッフをご紹介します。',
    image: photo('academy', { position: '50% 40%' }),
    main,
  });
}

export const routes = [
  { path: '/teams/', render: renderTeams },
  ...categories.map((c) => ({ path: categoryHref(c), render: () => renderCategory(c) })),
  { path: '/teams/staff/', render: renderStaff },
];
