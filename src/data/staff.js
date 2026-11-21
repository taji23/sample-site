// @ts-check
/**
 * Staff (entirely fictional people). `categoryIds` ties each person to the
 * age categories in src/data/categories.js; nothing here hardcodes a category.
 *
 * @typedef {'management' | 'coach' | 'support'} StaffGroup
 *
 * @typedef {object} StaffMember
 * @property {string} id
 * @property {string} name
 * @property {string} romaji        Used for the monogram and a quiet sub-label.
 * @property {string} role
 * @property {StaffGroup} group
 * @property {string[]} categoryIds Categories this person works with; [] = club-wide.
 * @property {string} bio
 * @property {string} [message]     Short statement shown on the Academy coaches page.
 */

/** @type {Record<StaffGroup, string>} */
export const staffGroupLabels = {
  management: 'クラブ運営',
  coach: '指導スタッフ',
  support: 'サポートスタッフ',
};

/** @type {StaffMember[]} */
export const staff = [
  {
    id: 'saeki',
    name: '佐伯 健太',
    romaji: 'Saeki Kenta',
    role: 'クラブ代表・アカデミーダイレクター',
    group: 'management',
    categoryIds: [],
    bio: '全年代の育成方針と評価基準を統括します。「10年後も成長し続けられる選手」を育てることが信条です。',
    message: '勝敗よりも、毎日の積み重ねを大切にします。',
  },
  {
    id: 'morita',
    name: '森田 美咲',
    romaji: 'Morita Misaki',
    role: '事務局長',
    group: 'management',
    categoryIds: [],
    bio: '入団・スクールのご案内や保護者対応を担当します。初めての方も、まずはお気軽にご相談ください。',
  },
  {
    id: 'takahashi',
    name: '高橋 大地',
    romaji: 'Takahashi Daichi',
    role: 'U-18 監督',
    group: 'coach',
    categoryIds: ['u18'],
    bio: '選手の自立を促し、次のステージで通用する基準を日常に置くことを重視しています。',
    message: '「考えて、決めて、やり切る」。それが高校年代の学びです。',
  },
  {
    id: 'nakamura',
    name: '中村 直人',
    romaji: 'Nakamura Naoto',
    role: 'U-15 監督',
    group: 'coach',
    categoryIds: ['u15'],
    bio: '戦術理解とフィジカルの両面から、成長期の選手を段階的に伸ばします。',
    message: '一人ひとりの「今」に合った課題を一緒に見つけます。',
  },
  {
    id: 'kobayashi',
    name: '小林 里奈',
    romaji: 'Kobayashi Rina',
    role: 'U-12 コーチ',
    group: 'coach',
    categoryIds: ['u12'],
    bio: '判断のスピードとチームで戦う楽しさを、公式戦の経験を通して伝えます。',
    message: '失敗を次の挑戦に変える声かけを心がけています。',
  },
  {
    id: 'fujii',
    name: '藤井 恒一',
    romaji: 'Fujii Koichi',
    role: 'U-10 コーチ',
    group: 'coach',
    categoryIds: ['u10'],
    bio: 'ボールを自在に扱える技術の土台づくりに、長く携わってきました。',
    message: '「できた！」の瞬間を一番近くで見届けたいです。',
  },
  {
    id: 'ishikawa',
    name: '石川 翔',
    romaji: 'Ishikawa Sho',
    role: 'U-8 コーチ・スクールヘッドコーチ',
    group: 'coach',
    categoryIds: ['u8'],
    bio: '遊びの中でサッカーの楽しさを伝え、スクールのカリキュラムも担当します。',
    message: '最初のサッカー体験を、最高の思い出にします。',
  },
  {
    id: 'okamoto',
    name: '岡本 由紀',
    romaji: 'Okamoto Yuki',
    role: 'GKコーチ',
    group: 'coach',
    categoryIds: ['u12', 'u15', 'u18'],
    bio: 'ゴールキーパー専門のトレーニングを、U-12 から U-18 まで担当します。',
  },
  {
    id: 'matsuda',
    name: '松田 雄大',
    romaji: 'Matsuda Yudai',
    role: 'フィジカルコーチ',
    group: 'support',
    categoryIds: ['u15', 'u18'],
    bio: '成長期に配慮したコンディショニングとケガ予防のプログラムを設計します。',
  },
  {
    id: 'yamaguchi',
    name: '山口 優子',
    romaji: 'Yamaguchi Yuko',
    role: 'メディカルサポート（トレーナー）',
    group: 'support',
    categoryIds: ['u12', 'u15', 'u18'],
    bio: '練習・試合でのケア、ケガをした選手の復帰サポートを行います。',
  },
];

/** @param {string} categoryId */
export const staffForCategory = (categoryId) => staff.filter((s) => s.categoryIds.includes(categoryId));

/** @param {StaffGroup} group */
export const staffByGroup = (group) => staff.filter((s) => s.group === group);
