// @ts-check
/**
 * Sponsors and partners. All companies are fictional; tiles render a
 * typographic wordmark until real logo files are supplied via `logo`.
 *
 * @typedef {'top' | 'partner' | 'supporter'} SponsorTier
 *
 * @typedef {object} Sponsor
 * @property {string} id
 * @property {string} name        Display name (Japanese).
 * @property {string} mark        Wordmark text used until a logo exists.
 * @property {SponsorTier} tier
 * @property {string} [url]
 * @property {string} [logo]      Path to a supplied logo (SVG preferred).
 */

/** @type {Record<SponsorTier, string>} */
export const sponsorTierLabels = {
  top: 'オフィシャルトップパートナー',
  partner: 'オフィシャルパートナー',
  supporter: 'サポーター',
};

/** @type {Sponsor[]} */
export const sponsors = [
  { id: 's1', name: 'サンプル建設株式会社', mark: 'SAMPLE KENSETSU', tier: 'top' },
  { id: 's2', name: 'みなと信用金庫', mark: 'MINATO BANK', tier: 'partner' },
  { id: 's3', name: 'あおぞら整骨院', mark: 'AOZORA', tier: 'partner' },
  { id: 's4', name: 'サンプル電機', mark: 'SAMPLE DENKI', tier: 'partner' },
  { id: 's5', name: 'グリーンフィールド不動産', mark: 'GREENFIELD', tier: 'partner' },
  { id: 's6', name: 'ベーカリー麦の穂', mark: 'MUGINOHO', tier: 'supporter' },
  { id: 's7', name: 'さくら歯科', mark: 'SAKURA DENTAL', tier: 'supporter' },
  { id: 's8', name: 'まちの印刷所', mark: 'MACHI PRINT', tier: 'supporter' },
  { id: 's9', name: 'ひかり薬局', mark: 'HIKARI', tier: 'supporter' },
  { id: 's10', name: '川沿スポーツ', mark: 'KAWAZOI SPORTS', tier: 'supporter' },
  { id: 's11', name: 'サンプル運輸', mark: 'SAMPLE LOGI', tier: 'supporter' },
];

/** @param {SponsorTier} tier */
export const sponsorsByTier = (tier) => sponsors.filter((s) => s.tier === tier);

/**
 * Sponsorship plans (fictional). `price` is a placeholder string, never a real quote.
 * @type {{ tier: SponsorTier, price: string, benefits: string[] }[]}
 */
export const sponsorPlans = [
  {
    tier: 'top',
    price: 'ご相談（年額）',
    benefits: ['ユニフォーム胸・背面へのロゴ掲出', '公式サイトのトップページ掲載', 'ホームゲーム会場への看板掲出', 'イベントでのブース出展'],
  },
  {
    tier: 'partner',
    price: 'ご相談（年額）',
    benefits: ['ユニフォーム袖・パンツへのロゴ掲出', '公式サイトのパートナー欄に掲載', '会場の看板掲出'],
  },
  {
    tier: 'supporter',
    price: 'ご相談（年額）',
    benefits: ['公式サイトのサポーター欄に掲載', 'クラブからの感謝状と活動報告'],
  },
];

/** Plan matrix rows for the comparison table. */
export const sponsorBenefitMatrix = [
  { label: 'サイト掲載', values: { top: 'トップページ', partner: 'パートナー欄', supporter: 'サポーター欄' } },
  { label: 'ユニフォーム掲出', values: { top: '胸・背面', partner: '袖・パンツ', supporter: '—' } },
  { label: '会場での看板掲出', values: { top: '〇', partner: '〇', supporter: '—' } },
  { label: 'イベントブース', values: { top: '〇', partner: '—', supporter: '—' } },
  { label: '活動報告', values: { top: '年2回', partner: '年1回', supporter: '年1回' } },
];
