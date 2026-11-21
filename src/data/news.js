// @ts-check
import { photo } from './images.js';

/**
 * News articles (fictional). Newest first is not assumed; use latestNews().
 * @type {import('../types.js').NewsItem[]}
 */
export const news = [
  {
    slug: 'u12-cup-final',
    title: 'U-12 サンプル市少年サッカー大会、決勝進出が決まりました',
    date: '2026-11-17',
    category: '試合結果',
    excerpt: '準決勝はひかりが丘SCに3-1で勝利。12月6日の決勝に向けて、応援をよろしくお願いします。',
    body: [
      'U-12 は11月16日、サンプル市少年サッカー大会の準決勝でひかりが丘SCと対戦し、3-1で勝利しました。',
      '前半は相手の素早い攻撃に苦しみましたが、後半は中盤でボールを奪い返し、立て続けに3得点。選手たちが練習で取り組んできた切り替えの速さが結果につながりました。',
      '決勝は12月6日（日）13:00 から、河川敷第1グラウンドでキックオフです。会場でのご声援をよろしくお願いします。',
      '※本記事の内容は、すべて架空のサンプルです。',
    ],
    image: photo('match'),
  },
  {
    slug: 'winter-camp-2026',
    title: '冬季強化合宿（U-12・U-15）の実施について',
    date: '2026-11-14',
    category: 'お知らせ',
    excerpt: '12月下旬に予定している冬季強化合宿の日程と持ち物をお知らせします。',
    body: [
      '12月下旬に、U-12 と U-15 を対象とした冬季強化合宿を行います。',
      '期間中は、午前に技術トレーニング、午後にゲーム形式のトレーニングを予定しています。宿泊先・持ち物・費用については、各カテゴリーの保護者の皆さまへ、別途メールでご案内します。',
      'ご不明な点は、お問い合わせフォームよりご連絡ください。',
      '※本記事の内容は、すべて架空のサンプルです。',
    ],
    image: photo('academy'),
  },
  {
    slug: 'school-trial-december',
    title: '12月のスクール無料体験会、受付を開始しました',
    date: '2026-11-10',
    category: 'スクール',
    excerpt: '年長〜小学2年生を対象に、毎週土曜日に体験会を行います。',
    body: [
      '12月のサッカースクール無料体験会の受付を開始しました。対象は年長〜小学2年生で、毎週土曜日の9:00から開催します。',
      '初めてのお子さまでも安心してご参加いただけるよう、少人数のグループでボール遊びを中心に進めます。シューズは運動靴で構いません。',
      'お申し込みは、スクールの体験申込ページから受け付けています。',
      '※本記事の内容は、すべて架空のサンプルです。',
    ],
    image: photo('school'),
  },
  {
    slug: 'u15-selection-2027',
    title: '2027年度 U-15 セレクションの開催概要',
    date: '2026-11-05',
    category: '募集',
    excerpt: '新中学1年生を対象としたセレクションを1月に実施します。',
    body: [
      '2027年度 U-15 のセレクションを、2027年1月24日（日）に実施します。対象は、2027年4月に中学1年生となる男女です。',
      '当日は基礎技術の確認、ミニゲーム、保護者・本人面談を予定しています。経験の有無は問いません。申込締切は1月10日です。',
      '詳細は「入団案内」内のセレクションページをご覧ください。',
      '※本記事の内容は、すべて架空のサンプルです。',
    ],
    image: photo('join'),
  },
  {
    slug: 'community-clinic',
    title: '地域の小学校で親子サッカー教室を開催しました',
    date: '2026-10-28',
    category: 'コミュニティ',
    excerpt: '近隣の小学校で、保護者の皆さまとお子さまが一緒にボールを蹴る教室を開きました。',
    body: [
      '10月28日、サンプル小学校の校庭で親子サッカー教室を開催しました。約40組の親子が参加し、コーチと U-15 の選手たちが一緒に指導を行いました。',
      'ボールを止める・運ぶといった基本の練習のあとは、親子対抗のミニゲーム。校庭には終始、笑顔と歓声があふれました。',
      '次回の開催は12月13日です。詳しくはイベントページをご覧ください。',
      '※本記事の内容は、すべて架空のサンプルです。',
    ],
    image: photo('u8'),
  },
  {
    slug: 'u18-league-postponed',
    title: 'U-18 サンプル県ユースリーグ 第12節の延期について',
    date: '2026-11-19',
    category: 'お知らせ',
    excerpt: '11月23日開催予定だった第12節は、グラウンド整備のため延期となりました。',
    body: [
      '11月23日（月）に予定していた U-18 サンプル県ユースリーグ第12節（vs 北部ユナイテッド）は、会場グラウンドの整備のため延期となりました。',
      '振替日程が決まり次第、試合日程ページでお知らせします。',
      '※本記事の内容は、すべて架空のサンプルです。',
    ],
    image: photo('u18'),
  },
  {
    slug: 'new-coach-2027',
    title: '2027年度の指導体制について',
    date: '2026-11-12',
    category: 'お知らせ',
    excerpt: 'GKコーチとフィジカルコーチが加わり、U-12 以上のサポート体制を強化します。',
    body: [
      '2027年度より、GKコーチとフィジカルコーチを加えた指導体制で活動します。',
      'U-12 から U-18 まで、ポジション専門のトレーニングと、成長期に合わせたコンディショニングを強化します。',
      'スタッフの詳細は、チーム紹介のスタッフページをご覧ください。',
      '※本記事の内容は、すべて架空のサンプルです。',
    ],
    image: photo('academy', { position: '40% 50%' }),
  },
  {
    slug: 'new-partner',
    title: '新しいオフィシャルパートナーのお知らせ',
    date: '2026-11-01',
    category: 'パートナー',
    excerpt: '地域の企業・店舗の皆さまに、新たにクラブをご支援いただくことになりました。',
    body: [
      '新たに、地域の企業・店舗の皆さまがクラブのパートナー・サポーターに加わってくださいました。',
      '皆さまのご支援は、グラウンド環境の整備や、スクールの運営に活用させていただきます。',
      'スポンサー募集については、パートナーページをご覧ください。',
      '※掲載企業はすべて架空です。',
    ],
    image: photo('join', { position: '40% 50%' }),
  },
];

/** @param {number} limit */
export const latestNews = (limit) => [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);

/** @param {import('../types.js').NewsItem} item */
export const newsHref = (item) => `/news/${item.slug}/`;

export const sortedNews = () => latestNews(news.length);

/** Distinct categories in first-seen order of the sorted list. */
export const newsCategories = () => [...new Set(sortedNews().map((n) => n.category))];

/** @param {string} slug */
export const newsBySlug = (slug) => news.find((n) => n.slug === slug);

/** Neighbours in date order (newer = prev). @param {string} slug */
export function adjacentNews(slug) {
  const list = sortedNews();
  const i = list.findIndex((n) => n.slug === slug);
  return { newer: list[i - 1], older: list[i + 1] };
}
