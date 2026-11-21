// @ts-check
import { categoryHref, sortedCategories } from './categories.js';

/**
 * @typedef {object} NavLink
 * @property {string} label
 * @property {string} href
 *
 * @typedef {object} NavGroup
 * @property {string} id
 * @property {string} label       Japanese label shown in menus.
 * @property {string} en          English display label for mega-menu panels.
 * @property {string} href        Overview page.
 * @property {string} [description]
 * @property {NavLink[]} [children]
 */

/** Primary navigation. Teams children are generated from category data. */
/** @type {NavGroup[]} */
export const mainNav = [
  {
    id: 'club',
    label: 'クラブ',
    en: 'Club',
    href: '/about/',
    description: 'サンプルFCの理念、歩み、活動拠点について。',
    children: [
      { label: 'クラブ概要', href: '/about/' },
      { label: 'クラブ理念', href: '/about/philosophy/' },
      { label: '沿革', href: '/about/history/' },
      { label: '施設', href: '/about/facilities/' },
    ],
  },
  {
    id: 'teams',
    label: 'チーム',
    en: 'Teams',
    href: '/teams/',
    description: '年代別チームとスタッフ。',
    children: [
      ...sortedCategories().map((c) => ({ label: `${c.label} ${c.name}`, href: categoryHref(c) })),
      { label: 'スタッフ', href: '/teams/staff/' },
    ],
  },
  {
    id: 'matches',
    label: '試合',
    en: 'Matches',
    href: '/matches/',
    description: '試合日程・結果・順位表。',
    children: [
      { label: '試合日程', href: '/matches/fixtures/' },
      { label: '試合結果', href: '/matches/results/' },
      { label: '順位表', href: '/matches/standings/' },
    ],
  },
  { id: 'news', label: 'ニュース', en: 'News', href: '/news/' },
  {
    id: 'academy',
    label: 'アカデミー',
    en: 'Academy',
    href: '/academy/',
    description: '一貫した育成方針と、指導者・進路について。',
    children: [
      { label: '育成方針', href: '/academy/policy/' },
      { label: 'コーチ紹介', href: '/academy/coaches/' },
      { label: '進路', href: '/academy/career/' },
    ],
  },
  {
    id: 'school',
    label: 'スクール',
    en: 'School',
    href: '/school/',
    description: '未就学児から参加できるサッカースクール。',
    children: [
      { label: 'クラス紹介', href: '/school/classes/' },
      { label: '会場', href: '/school/locations/' },
      { label: '料金', href: '/school/fees/' },
      { label: '無料体験申込', href: '/school/trial/' },
    ],
  },
  {
    id: 'community',
    label: '地域',
    en: 'Community',
    href: '/community/',
    description: '地域とともに歩む活動とイベント。',
    children: [{ label: 'イベント', href: '/community/events/' }],
  },
  {
    id: 'partners',
    label: 'パートナー',
    en: 'Partners',
    href: '/partners/',
    description: 'クラブを支えるパートナー企業。',
    children: [{ label: 'スポンサー募集', href: '/partners/sponsorship/' }],
  },
];

/** @type {NavGroup} */
export const joinNav = {
  id: 'join',
  label: '入団案内',
  en: 'Join Us',
  href: '/join/',
  description: '選手募集・セレクション・よくある質問。',
  children: [
    { label: '選手募集', href: '/join/recruitment/' },
    { label: 'セレクション', href: '/join/selection/' },
    { label: 'よくある質問', href: '/join/faq/' },
  ],
};

/** @type {NavLink} */
export const contactLink = { label: 'お問い合わせ', href: '/contact/' };

/** @param {string} id */
export const navGroup = (id) => /** @type {NavGroup} */ ([...mainNav, joinNav].find((g) => g.id === id));

/** @type {NavLink} */
export const trialLink = { label: '体験練習に申し込む', href: '/school/trial/' };

/** Every page reachable from navigation; used to generate routes. */
export function allNavPages() {
  /** @type {Map<string, { title: string, group: NavGroup }>} */
  const pages = new Map();
  for (const group of [...mainNav, joinNav]) {
    pages.set(group.href, { title: group.label, group });
    for (const child of group.children ?? []) {
      if (!pages.has(child.href)) pages.set(child.href, { title: child.label, group });
    }
  }
  pages.set(contactLink.href, {
    title: contactLink.label,
    group: { id: 'contact', label: contactLink.label, en: 'Contact', href: contactLink.href },
  });
  return pages;
}
