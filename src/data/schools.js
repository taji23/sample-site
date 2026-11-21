// @ts-check
import { photo } from './images.js';

/**
 * @typedef {object} SchoolLocation
 * @property {string} id
 * @property {string} name
 * @property {string} address
 *
 * @typedef {object} School
 * @property {string} id
 * @property {string} name
 * @property {string} target
 * @property {string} schedule
 * @property {string} locationId
 * @property {string} summary
 * @property {import('../types.js').ImageAsset} image
 * @property {number} monthlyFee      Yen per month (fictional).
 * @property {number} capacity        Class size limit.
 * @property {string} goal
 * @property {{ title: string, text: string }[]} curriculum
 * @property {{ time: string, title: string }[]} flow   A typical session, in order.
 * @property {string[]} bring
 */

/** One-time enrollment fee shared by every class (fictional). */
export const schoolEntryFee = 5500;

/** Annual sports-insurance fee (fictional). */
export const schoolInsuranceFee = 1800;

/** @type {SchoolLocation[]} */
export const schoolLocations = [
  { id: 'central', name: 'サンプル市立総合グラウンド', address: 'サンプル市中央1-2-3（架空）' },
  { id: 'riverside', name: '河川敷第1グラウンド', address: 'サンプル市川沿町4-5（架空）' },
];

/** @type {School[]} */
export const schools = [
  {
    id: 'kids',
    name: 'キッズクラス',
    target: '年中〜年長',
    schedule: '土曜 9:00–10:00',
    locationId: 'central',
    summary: '鬼ごっこやボール遊びを通して、走る・跳ぶ・蹴るの基礎を育てます。',
    image: photo('u8'),
    monthlyFee: 6600,
    capacity: 20,
    goal: 'ボールを触るのが好きになり、毎週のクラスを楽しみに待てるようになること。',
    curriculum: [
      { title: '遊びで身体を動かす', text: '鬼ごっこやサーキット遊びで、走る・跳ぶ・バランスをとる力を育てます。' },
      { title: 'ボールと仲良くなる', text: '運ぶ、止める、蹴る。ボールを使ったゲームで自然に身につけます。' },
      { title: 'みんなで楽しむ', text: '順番を待つ、道具を片づける。集団で活動するための基本を学びます。' },
    ],
    flow: [
      { time: '9:00', title: '集合・あいさつ' },
      { time: '9:10', title: '運動遊び（ウォーミングアップ）' },
      { time: '9:25', title: 'ボールを使ったゲーム' },
      { time: '9:50', title: 'ミニゲーム・ふりかえり' },
    ],
    bring: ['動きやすい服装', 'シューズ（運動靴で可）', '飲み物', 'タオル'],
  },
  {
    id: 'junior',
    name: 'ジュニアクラス',
    target: '小学1〜4年生',
    schedule: '水曜 17:00–18:30',
    locationId: 'riverside',
    summary: 'ドリブルとボールコントロールを中心に、少人数で丁寧に指導します。',
    image: photo('school'),
    monthlyFee: 7700,
    capacity: 24,
    goal: 'ボールを自在に扱い、友だちの前で自信を持ってドリブルできるようになること。',
    curriculum: [
      { title: 'ボールコントロール', text: '両足でのタッチ、ターン、止める・運ぶ技術を反復して身につけます。' },
      { title: 'ドリブルで仕掛ける', text: 'コーンやマーカーを使い、スピードと方向の変化を練習します。' },
      { title: 'ゲームで試す', text: '少人数のゲームで、練習した技術を実際の場面で使います。' },
    ],
    flow: [
      { time: '17:00', title: '集合・ウォーミングアップ' },
      { time: '17:15', title: 'ボールコントロール' },
      { time: '17:45', title: 'ドリブル・1対1' },
      { time: '18:10', title: 'ゲーム・ふりかえり' },
    ],
    bring: ['トレーニングウェア', 'サッカーシューズまたはトレーニングシューズ', 'すね当て（推奨）', '飲み物・タオル'],
  },
  {
    id: 'skill',
    name: 'スキルアップクラス',
    target: '小学3〜6年生',
    schedule: '金曜 17:30–19:00',
    locationId: 'central',
    summary: 'チーム所属の有無を問わず、個人技術を伸ばしたい選手のためのクラスです。',
    image: photo('u12'),
    monthlyFee: 8800,
    capacity: 20,
    goal: '所属チームの試合で「通用する」武器を、一つ手に入れること。',
    curriculum: [
      { title: '課題の見つけ方', text: '最初に現在地を一緒に確認し、伸ばしたい技術の目標を決めます。' },
      { title: '技術の深掘り', text: '止める・蹴る・運ぶ・かわすを、場面別に精度を上げて練習します。' },
      { title: '試合につなげる', text: '実戦に近い形式で、身につけた技術を使う判断を磨きます。' },
    ],
    flow: [
      { time: '17:30', title: '集合・ウォーミングアップ' },
      { time: '17:45', title: 'テーマ別の技術トレーニング' },
      { time: '18:20', title: '1対1・2対2' },
      { time: '18:40', title: 'ゲーム・個別フィードバック' },
    ],
    bring: ['トレーニングウェア', 'サッカーシューズ', 'すね当て（必須）', '飲み物・タオル'],
  },
];

/** @param {string} id */
export const locationById = (id) => schoolLocations.find((l) => l.id === id);

/** @param {string} id */
export const schoolById = (id) => schools.find((s) => s.id === id);

/** @param {School} school */
export const schoolHref = (school) => `/school/classes/${school.id}/`;
