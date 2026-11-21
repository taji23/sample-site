// @ts-check
import { photo } from './images.js';

/**
 * Practice grounds and club facilities (fictional). Category and school
 * records reference these by `id`.
 *
 * @typedef {object} Facility
 * @property {string} id
 * @property {string} name
 * @property {string} type          Short label, e.g. '人工芝グラウンド'.
 * @property {string} summary
 * @property {string[]} features
 * @property {string} address
 * @property {string} access
 * @property {import('../types.js').ImageAsset} image
 */

/** @type {Facility[]} */
export const facilities = [
  {
    id: 'central',
    name: 'サンプル市立総合グラウンド',
    type: '人工芝グラウンド',
    summary: '平日夜と週末に使用する、クラブのメイン拠点です。ナイター照明を備え、年間を通じて安定した環境でトレーニングできます。',
    features: ['人工芝フルコート 1面', '少年用ハーフコート 1面', 'ナイター照明', '更衣室・シャワー'],
    address: 'サンプル市中央1-2-3（架空）',
    access: '最寄り駅から徒歩12分／無料駐車場あり（架空）',
    image: photo('hero', { alt: 'ナイター照明に照らされた人工芝グラウンド', position: '60% 50%' }),
  },
  {
    id: 'riverside',
    name: '河川敷第1グラウンド',
    type: '天然芝・土グラウンド',
    summary: '広いスペースを生かし、U-12 の公式戦やスクールのトレーニングに使用します。',
    features: ['11人制コート 1面', '少年用コート 2面', '観戦エリア', '仮設ベンチ'],
    address: 'サンプル市川沿町4-5（架空）',
    access: 'バス停「川沿公園前」から徒歩5分（架空）',
    image: photo('school', { alt: '広いグラウンドでトレーニングする子どもたち', position: '40% 50%' }),
  },
  {
    id: 'clubhouse',
    name: 'サンプルFC クラブハウス',
    type: 'クラブハウス',
    summary: 'ミーティングや映像分析、保護者の皆さまとの面談に使用する、クラブの事務局です。',
    features: ['ミーティングルーム', '映像分析スペース', '面談・相談室', '事務局窓口'],
    address: 'サンプル市中央1-2-4（架空）',
    access: 'サンプル市立総合グラウンドに隣接（架空）',
    image: photo('academy', { alt: '作戦ボードを使って説明するコーチ', position: '45% 50%' }),
  },
  {
    id: 'indoor',
    name: 'サンプル市民体育館（提携）',
    type: '屋内施設',
    summary: '雨天時やフィジカルトレーニングに利用する、提携の屋内施設です。',
    features: ['屋内コート', 'トレーニングルーム', '空調完備'],
    address: 'サンプル市東町7-8（架空）',
    access: '最寄り駅から徒歩8分（架空）',
    image: photo('join', { alt: '夜の照明の下で円陣を組む選手たち', position: '50% 55%' }),
  },
];

/** @param {string} id */
export const facilityById = (id) => facilities.find((f) => f.id === id);
