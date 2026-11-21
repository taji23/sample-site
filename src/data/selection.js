// @ts-check
/**
 * Selection (セレクション) events. Fictional dates; `categoryId` links to the
 * category record, so eligibility copy stays consistent with the team data.
 *
 * @typedef {object} Selection
 * @property {string} id
 * @property {string} categoryId
 * @property {string} title
 * @property {string} date          ISO date.
 * @property {string} time
 * @property {string} venueId       Facility id.
 * @property {string} eligibility
 * @property {string} deadline      ISO date for applications.
 * @property {string[]} contents
 * @property {number} fee           Yen; 0 for free.
 */

/** @type {Selection[]} */
export const selections = [
  {
    id: 'u15-2027',
    categoryId: 'u15',
    title: '2027年度 U-15 セレクション',
    date: '2027-01-24',
    time: '13:00–16:00（受付 12:30）',
    venueId: 'central',
    eligibility: '2027年4月に中学1年生となる男女（経験は問いません）',
    deadline: '2027-01-10',
    contents: ['基礎技術の確認（ドリブル・パス）', 'ミニゲーム', '保護者・本人面談'],
    fee: 0,
  },
  {
    id: 'u18-2027',
    categoryId: 'u18',
    title: '2027年度 U-18 セレクション',
    date: '2027-02-07',
    time: '13:00–16:30（受付 12:30）',
    venueId: 'central',
    eligibility: '2027年4月に高校1年生となる方、および編入を希望する高校生',
    deadline: '2027-01-24',
    contents: ['ミニゲーム・11人制ゲーム', 'ポジション別の技術確認', '本人面談'],
    fee: 0,
  },
];

/** What to bring on the day. */
export const selectionBring = ['トレーニングウェア（上下）', 'サッカーシューズ', 'すね当て', '飲み物・タオル', '受験票（申込後にメールで送付）'];

/** Selection flow, in order. */
export const selectionFlow = [
  { title: '申込', text: 'お問い合わせフォームから、締切日までにお申し込みください。' },
  { title: '受験票の受け取り', text: '申込後、メールで受験票と当日の案内をお送りします。' },
  { title: 'セレクション当日', text: '受付後、技術確認とゲーム、面談を行います。' },
  { title: '結果のご連絡', text: '開催日から1週間以内に、メールでお知らせします。' },
];
