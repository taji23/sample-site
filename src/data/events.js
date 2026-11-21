// @ts-check
import { photo } from './images.js';

/**
 * Community events (fictional).
 *
 * @typedef {'open' | 'soon' | 'closed'} EventStatus
 *
 * @typedef {object} ClubEvent
 * @property {string} id
 * @property {string} title
 * @property {string} date        ISO date, 'YYYY-MM-DD'.
 * @property {string} time
 * @property {string} venue
 * @property {string} target
 * @property {string} type        e.g. '体験会', '地域活動'.
 * @property {EventStatus} status Registration state for upcoming events.
 * @property {string} summary
 * @property {import('../types.js').ImageAsset} image
 */

/** @type {Record<EventStatus, string>} */
export const eventStatusLabels = {
  open: '参加受付中',
  soon: '受付準備中',
  closed: '開催済み',
};

/** @type {ClubEvent[]} */
export const events = [
  {
    id: 'trial-december',
    title: '12月 無料体験会（年長〜小学2年生）',
    date: '2026-12-05',
    time: '9:00–10:30',
    venue: 'サンプル市立総合グラウンド',
    target: '年長〜小学2年生',
    type: '体験会',
    status: 'open',
    summary: 'ボールを使った遊びを中心に、サッカーの楽しさを体験できます。見学のみのご参加も歓迎です。',
    image: photo('u8', { position: '50% 35%' }),
  },
  {
    id: 'parent-child-clinic',
    title: '親子サッカー教室',
    date: '2026-12-13',
    time: '10:00–11:30',
    venue: 'サンプル小学校 校庭',
    target: '小学生と保護者',
    type: '地域活動',
    status: 'open',
    summary: '保護者の皆さまも一緒にボールを蹴ります。運動不足の解消にもぴったりです。',
    image: photo('school', { position: '30% 50%' }),
  },
  {
    id: 'winter-festival',
    title: 'サンプルFC ウィンターフェスティバル',
    date: '2027-01-17',
    time: '9:30–15:00',
    venue: 'サンプル市立総合グラウンド',
    target: 'どなたでも',
    type: 'クラブイベント',
    status: 'soon',
    summary: '全カテゴリーのミニゲームや、地域の方々との交流試合、出店ブースを予定しています。',
    image: photo('match', { position: '55% 50%' }),
  },
  {
    id: 'river-cleanup',
    title: '河川敷グラウンド クリーン活動',
    date: '2026-10-25',
    time: '8:00–10:00',
    venue: '河川敷第1グラウンド',
    target: '選手・保護者・地域の方',
    type: '地域活動',
    status: 'closed',
    summary: '日頃お世話になっているグラウンドを、選手と地域の皆さまで清掃しました。',
    image: photo('academy', { position: '70% 50%' }),
  },
  {
    id: 'school-visit',
    title: '地域の小学校でのサッカー体験授業',
    date: '2026-10-10',
    time: '10:30–12:00',
    venue: 'サンプル第二小学校',
    target: '小学校3・4年生',
    type: '地域活動',
    status: 'closed',
    summary: '体育の時間にコーチと U-15 選手が訪問し、サッカーの基本を一緒に学びました。',
    image: photo('u12', { position: '50% 40%' }),
  },
];

/** @param {string} ref ISO date used as "today". */
export const upcomingEvents = (ref) =>
  events.filter((e) => e.date >= ref).sort((a, b) => a.date.localeCompare(b.date));

/** @param {string} ref ISO date used as "today". */
export const pastEvents = (ref) =>
  events.filter((e) => e.date < ref).sort((a, b) => b.date.localeCompare(a.date));
