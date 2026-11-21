// @ts-check
import { photo } from './images.js';

/**
 * Age categories. Add, remove, or reorder here; every list, grid, menu, and
 * pathway on the site renders from this array.
 * @type {import('../types.js').Category[]}
 */
export const categories = [
  {
    id: 'u8',
    label: 'U-8',
    name: 'キッズ',
    grade: '年長〜小学2年生',
    summary: 'ボールに触れる楽しさを最優先に、運動の土台をつくります。',
    image: photo('u8', { alt: 'U-8：ボールを追いかけて走る小さな選手の後ろ姿' }),
    order: 1,
    format: '4〜5人制',
    practice: '火・木 17:00–18:30',
    locationId: 'central',
    members: 28,
    monthlyFee: 7700,
    goal: 'サッカーを「好き」になり、毎週の練習を楽しみに待つこと。',
    focus: ['ボールに触れる回数を最大化するゲーム形式', '走る・跳ぶ・バランスをとる運動遊び', '勝敗より「挑戦した」ことを認める声かけ'],
    curriculum: [
      { title: 'ボールと友だちになる', text: '両足でのボールタッチ、運ぶ、止める。遊びの中で自然に身につけます。' },
      { title: '体の使い方を覚える', text: '走る・跳ぶ・転がるなど、あらゆるスポーツの土台となる運動を取り入れます。' },
      { title: 'ルールと仲間を知る', text: '順番を守る、道具を片づける。チームで過ごす楽しさと約束を学びます。' },
    ],
    leagues: ['地域キッズフェスティバル（年4回）'],
    recruiting: { status: 'open', note: '随時受付。体験練習からご参加いただけます。' },
  },
  {
    id: 'u10',
    label: 'U-10',
    name: 'ジュニア',
    grade: '小学3・4年生',
    summary: '止める・蹴る・運ぶ。個人技術を集中的に磨く年代です。',
    image: photo('school', { alt: 'U-10：コーンの間をドリブルする選手たちの足元', position: '22% 50%' }),
    order: 2,
    format: '8人制',
    practice: '火・木 17:30–19:00',
    locationId: 'central',
    members: 32,
    monthlyFee: 8800,
    goal: '利き足でない足も含め、どんな状況でもボールを失わない技術の土台をつくる。',
    focus: ['ドリブル・トラップ・パスの基礎技術', '1対1で仕掛ける勇気を育てる', '少人数ゲームでの判断の繰り返し'],
    curriculum: [
      { title: '個人技術の反復', text: 'ボールを止める・運ぶ・蹴るを、毎回のトレーニングの冒頭で徹底します。' },
      { title: '1対1とフリープレー', text: '仕掛ける、奪う、守る。失敗を恐れず挑戦できる環境を整えます。' },
      { title: '少人数ゲーム', text: '3対3〜5対5で、見る・判断するタイミングを身につけます。' },
    ],
    leagues: ['サンプル市U-10交流戦', '地区ジュニアカップ'],
    recruiting: { status: 'open', note: '随時受付。体験練習からご参加いただけます。' },
  },
  {
    id: 'u12',
    label: 'U-12',
    name: 'ジュニア',
    grade: '小学5・6年生',
    summary: '8人制で判断のスピードを鍛え、11人制への移行に備えます。',
    image: photo('u12', { alt: 'U-12：ボールを足元に置く小学生選手の後ろ姿' }),
    order: 3,
    format: '8人制（11人制への移行準備）',
    practice: '月・水・金 18:00–20:00 ／ 土日 試合・練習',
    locationId: 'riverside',
    members: 30,
    monthlyFee: 9900,
    goal: '判断のスピードを上げ、11人制へスムーズに移行できる選手を育てる。',
    focus: ['認知・判断・実行を速くする攻守の切り替え', 'ポジションごとの役割理解', '公式戦を通じた勝負へのこだわり'],
    curriculum: [
      { title: '判断のスピード', text: '狭いスペースでのゲームを通じて、見てから動くまでの時間を縮めます。' },
      { title: 'チームの原則', text: '攻守の基本原則を共有し、ポジションごとの役割を理解します。' },
      { title: '公式戦での経験', text: '市大会・地区リーグに参加し、勝敗の悔しさと喜びを糧に成長します。' },
    ],
    leagues: ['サンプル市少年サッカー大会', '地区ジュニアリーグ'],
    recruiting: { status: 'limited', note: '若干名。体験練習のうえ、空き状況をご案内します。' },
  },
  {
    id: 'u15',
    label: 'U-15',
    name: 'ジュニアユース',
    grade: '中学1〜3年生',
    summary: '戦術理解とフィジカルを伸ばし、リーグ戦で経験を積みます。',
    image: photo('u15', { alt: 'U-15：ピッチへ歩き出す選手の後ろ姿' }),
    order: 4,
    format: '11人制',
    practice: '月〜金 18:30–20:30（週4日）／ 土日 リーグ戦',
    locationId: 'central',
    members: 36,
    monthlyFee: 11000,
    goal: '戦術理解とフィジカルを伸ばし、ユース・高校サッカーで活躍できる土台をつくる。',
    focus: ['チーム戦術と個人戦術の両立', '成長期に合わせたフィジカルトレーニング', '自己管理（睡眠・栄養・振り返り）の習慣化'],
    curriculum: [
      { title: '戦術の理解', text: 'ポジショニング、スペースの使い方、数的優位のつくり方を学びます。' },
      { title: 'フィジカルと身体づくり', text: '成長期の身体に配慮し、スピード・敏捷性・体幹を段階的に強化します。' },
      { title: '自己管理とリーダーシップ', text: '練習ノートで日々を振り返り、学年の垣根を越えて役割を担います。' },
    ],
    leagues: ['サンプル地区リーグ', 'サンプル県ジュニアユースカップ'],
    recruiting: { status: 'selection', note: '新中学1年生はセレクションあり（1月開催）。' },
  },
  {
    id: 'u18',
    label: 'U-18',
    name: 'ユース',
    grade: '高校1〜3年生',
    summary: '次のステージを見据え、トップレベルの基準で戦います。',
    image: photo('u18', { alt: 'U-18：雨の中でボールを蹴り込む選手' }),
    order: 5,
    format: '11人制',
    practice: '月〜金 19:00–21:00（週4日）／ 土日 リーグ戦',
    locationId: 'central',
    members: 34,
    monthlyFee: 11000,
    goal: '次のステージで通用する基準を日常に置き、自立した選手として送り出す。',
    focus: ['トップレベルを想定した強度と判断', '進学・就職を見据えた進路面談', '後輩を導く立場としての責任'],
    curriculum: [
      { title: '強度と再現性', text: '試合と同じ強度でのトレーニングを重ね、ミスの少ない実行力を養います。' },
      { title: '進路設計', text: '年2回の面談に加え、大学・社会人チームとの情報共有を行います。' },
      { title: '次世代への貢献', text: 'スクールやU-12の指導補助を通じて、サッカーへの恩返しを学びます。' },
    ],
    leagues: ['サンプル県ユースリーグ', '全国大会予選（サンプル県大会）'],
    recruiting: { status: 'selection', note: '新高校1年生・編入希望者はセレクションあり。' },
  },
];

export const sortedCategories = () => [...categories].sort((a, b) => a.order - b.order);

/** @type {Record<import('../types.js').RecruitStatus, { label: string, tone: import('../components/Badge.js').BadgeTone }>} */
export const recruitStatusLabels = {
  open: { label: '募集中', tone: 'royal' },
  limited: { label: '若干名', tone: 'gold' },
  selection: { label: 'セレクション', tone: 'navy' },
  closed: { label: '募集停止', tone: 'muted' },
};

/** Neighbours in age order, for previous / next navigation. @param {string} id */
export function adjacentCategories(id) {
  const list = sortedCategories();
  const i = list.findIndex((c) => c.id === id);
  return { prev: list[i - 1], next: list[i + 1] };
}

/** @param {string} id */
export const categoryById = (id) => categories.find((c) => c.id === id);

/** @param {import('../types.js').Category} category */
export const categoryHref = (category) => `/teams/${category.id}/`;
