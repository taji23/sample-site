// @ts-check
/**
 * Fictional fixtures for the design-system page only. Not club facts.
 * Real data modules live in src/data/ (added in the content step).
 */

/** @type {import('../types.js').NewsItem[]} */
export const sampleNews = [
  {
    slug: 'sample-winter-camp',
    title: '冬季強化合宿の実施について（U-12・U-15）',
    date: '2026-11-18',
    category: 'お知らせ',
    excerpt: '12月下旬に予定している冬季強化合宿の日程と持ち物をお知らせします。参加申込は所定のフォームから受け付けます（サンプル記事）。',
    image: { alt: '合宿でのトレーニング風景' },
  },
  {
    slug: 'sample-league-result',
    title: 'U-15 リーグ第8節 サンプル杯 試合結果',
    date: '2026-11-16',
    category: '試合結果',
    excerpt: 'ホームで行われた第8節は、後半の連続得点で逆転勝利しました（架空の試合結果です）。',
    image: { alt: 'ゴール後に喜ぶ選手たち' },
  },
  {
    slug: 'sample-school-trial',
    title: 'スクール無料体験会を開催します。年長〜小学2年生を募集',
    date: '2026-11-10',
    category: 'スクール',
    image: { alt: 'スクールでボールを蹴る子どもたち' },
  },
];

/** @type {import('../types.js').Category[]} */
export const sampleCategories = [
  { id: 'u8', label: 'U-8', name: 'キッズ', grade: '年長〜小学2年生', order: 1, image: { alt: 'U-8 の選手たち' } },
  { id: 'u10', label: 'U-10', name: 'ジュニア', grade: '小学3・4年生', order: 2, image: { alt: 'U-10 の選手たち' } },
  { id: 'u12', label: 'U-12', name: 'ジュニア', grade: '小学5・6年生', order: 3, image: { alt: 'U-12 の選手たち' } },
  { id: 'u15', label: 'U-15', name: 'ジュニアユース', grade: '中学1〜3年生', order: 4, image: { alt: 'U-15 の選手たち' } },
  { id: 'u18', label: 'U-18', name: 'ユース', grade: '高校1〜3年生', order: 5, image: { alt: 'U-18 の選手たち' } },
];

const club = { name: 'サンプルFC', short: 'SFC', isClub: true };

/** @type {import('../types.js').Match[]} */
export const sampleMatches = [
  {
    id: 'm-next',
    categoryId: 'u15',
    competition: 'サンプル地区リーグ',
    round: '第9節',
    kickoff: '2026-11-29T10:00',
    venue: 'サンプル市立総合グラウンド',
    home: club,
    away: { name: 'みなと台FC', short: 'MDF' },
    status: 'scheduled',
  },
  {
    id: 'm-win',
    categoryId: 'u12',
    competition: 'サンプル市少年サッカー大会',
    round: '準決勝',
    kickoff: '2026-11-16T13:30',
    venue: '河川敷第2グラウンド',
    home: { name: 'ひかりが丘SC', short: 'HSC' },
    away: club,
    status: 'finished',
    score: { home: 1, away: 3 },
  },
  {
    id: 'm-postponed',
    categoryId: 'u18',
    competition: 'サンプル県ユースリーグ',
    round: '第12節',
    kickoff: '2026-11-23T11:00',
    venue: 'サンプル学園グラウンド',
    home: club,
    away: { name: '北部ユナイテッド', short: 'NU' },
    status: 'postponed',
  },
];
