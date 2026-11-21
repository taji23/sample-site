// @ts-check
/**
 * Fixtures, results, and standings. All teams, scores, and dates are fictional.
 */

/** @type {import('../types.js').MatchTeam} */
const CLUB = { name: 'サンプルFC', short: 'SFC', isClub: true };

/** @type {import('../types.js').Match[]} */
export const matches = [
  {
    id: '2026-u15-l9',
    categoryId: 'u15',
    competition: 'サンプル地区リーグ',
    round: '第9節',
    kickoff: '2026-11-29T10:00',
    venue: 'サンプル市立総合グラウンド',
    home: CLUB,
    away: { name: 'みなと台FC', short: 'MDF' },
    status: 'scheduled',
  },
  {
    id: '2026-u12-cup-final',
    categoryId: 'u12',
    competition: 'サンプル市少年サッカー大会',
    round: '決勝',
    kickoff: '2026-12-06T13:00',
    venue: '河川敷第1グラウンド',
    home: CLUB,
    away: { name: 'あおば台SC', short: 'ASC' },
    status: 'scheduled',
  },
  {
    id: '2026-u18-l12',
    categoryId: 'u18',
    competition: 'サンプル県ユースリーグ',
    round: '第12節',
    kickoff: '2026-11-23T11:00',
    venue: 'サンプル学園グラウンド',
    home: CLUB,
    away: { name: '北部ユナイテッド', short: 'NU' },
    status: 'postponed',
  },
  {
    id: '2026-u15-l8',
    categoryId: 'u15',
    competition: 'サンプル地区リーグ',
    round: '第8節',
    kickoff: '2026-11-15T10:00',
    venue: 'サンプル市立総合グラウンド',
    home: CLUB,
    away: { name: '東川FC', short: 'HFC' },
    status: 'finished',
    score: { home: 2, away: 1 },
  },
  {
    id: '2026-u12-cup-sf',
    categoryId: 'u12',
    competition: 'サンプル市少年サッカー大会',
    round: '準決勝',
    kickoff: '2026-11-16T13:30',
    venue: '河川敷第2グラウンド',
    home: { name: 'ひかりが丘SC', short: 'HSC' },
    away: CLUB,
    status: 'finished',
    score: { home: 1, away: 3 },
  },
  {
    id: '2026-u18-l11',
    categoryId: 'u18',
    competition: 'サンプル県ユースリーグ',
    round: '第11節',
    kickoff: '2026-11-09T11:00',
    venue: '県立スポーツ公園',
    home: { name: '県央ユース', short: 'KY' },
    away: CLUB,
    status: 'finished',
    score: { home: 1, away: 1 },
  },
  {
    id: '2026-u10-tr',
    categoryId: 'u10',
    competition: 'U-10 交流戦',
    kickoff: '2026-11-08T09:30',
    venue: 'サンプル小学校',
    home: CLUB,
    away: { name: 'みどりFC', short: 'MFC' },
    status: 'finished',
    score: { home: 0, away: 2 },
  },
];

/**
 * @typedef {object} StandingRow
 * @property {string} team
 * @property {boolean} [isClub]
 * @property {number} played
 * @property {number} won
 * @property {number} drawn
 * @property {number} lost
 * @property {number} goalDiff
 * @property {number} points
 *
 * @typedef {object} Competition
 * @property {string} id
 * @property {string} name
 * @property {string} categoryId
 * @property {string} season
 * @property {string} asOf      ISO date the table reflects.
 * @property {StandingRow[]} standings  Already ordered by position.
 */

/** @type {Competition[]} */
export const competitions = [
  {
    id: 'u15-district-league',
    name: 'サンプル地区リーグ',
    categoryId: 'u15',
    season: '2026',
    asOf: '2026-11-15',
    standings: [
      { team: 'サンプルFC', isClub: true, played: 8, won: 6, drawn: 1, lost: 1, goalDiff: 14, points: 19 },
      { team: 'みなと台FC', played: 8, won: 5, drawn: 2, lost: 1, goalDiff: 9, points: 17 },
      { team: '東川FC', played: 8, won: 4, drawn: 2, lost: 2, goalDiff: 4, points: 14 },
      { team: 'さくら坂SC', played: 8, won: 3, drawn: 2, lost: 3, goalDiff: 0, points: 11 },
      { team: '西浜ユナイテッド', played: 8, won: 2, drawn: 1, lost: 5, goalDiff: -8, points: 7 },
      { team: '南郷FC', played: 8, won: 0, drawn: 2, lost: 6, goalDiff: -19, points: 2 },
    ],
  },
  {
    id: 'u18-youth-league',
    name: 'サンプル県ユースリーグ',
    categoryId: 'u18',
    season: '2026',
    asOf: '2026-11-09',
    standings: [
      { team: '県央ユース', played: 11, won: 8, drawn: 2, lost: 1, goalDiff: 16, points: 26 },
      { team: 'サンプルFC', isClub: true, played: 11, won: 7, drawn: 3, lost: 1, goalDiff: 12, points: 24 },
      { team: '北部ユナイテッド', played: 10, won: 6, drawn: 1, lost: 3, goalDiff: 5, points: 19 },
      { team: '湖畔SC', played: 11, won: 4, drawn: 3, lost: 4, goalDiff: 0, points: 15 },
      { team: '学園ユース', played: 11, won: 2, drawn: 2, lost: 7, goalDiff: -11, points: 8 },
      { team: '港北FC', played: 11, won: 1, drawn: 1, lost: 9, goalDiff: -22, points: 4 },
    ],
  },
];

/** All matches that are not finished, soonest first (postponed included). */
export function fixtures() {
  return matches
    .filter((m) => m.status !== 'finished')
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff));
}

/** Every finished match, newest first. */
export function results() {
  return matches.filter((m) => m.status === 'finished').sort((a, b) => b.kickoff.localeCompare(a.kickoff));
}

/** @param {string} categoryId */
export const matchesForCategory = (categoryId) => matches.filter((m) => m.categoryId === categoryId);

/** @param {string} ref ISO date (YYYY-MM-DD) used as "today". */
export function upcomingMatches(ref) {
  return matches
    .filter((m) => m.status === 'scheduled' && m.kickoff.slice(0, 10) >= ref)
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff));
}

export function recentResults(limit = 4) {
  return matches
    .filter((m) => m.status === 'finished')
    .sort((a, b) => b.kickoff.localeCompare(a.kickoff))
    .slice(0, limit);
}
