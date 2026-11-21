// @ts-check
import { ContentSection } from '../components/AnimatedSection.js';
import { Badge } from '../components/Badge.js';
import { Button } from '../components/Button.js';
import { DataTable } from '../components/DataTable.js';
import { FaqList } from '../components/FaqList.js';
import { LinkList } from '../components/PageLinks.js';
import { SpecList, StepList } from '../components/SpecList.js';
import { categoryById, categoryHref, recruitStatusLabels, sortedCategories } from '../data/categories.js';
import { recruitment } from '../data/club.js';
import { faqGroups } from '../data/faq.js';
import { facilityById } from '../data/facilities.js';
import { photo } from '../data/images.js';
import { navGroup, trialLink } from '../data/navigation.js';
import { selectionBring, selectionFlow, selections } from '../data/selection.js';
import { dateBlock, formatLongDate, formatYen } from '../lib/format.js';
import { html } from '../lib/html.js';
import { CtaBand } from '../components/CtaBand.js';
import { SubPage } from '../templates/SubPage.js';

const group = navGroup('join');

/** Recruitment status per category, derived from category data. */
function recruitRows() {
  return sortedCategories().map((c) => {
    const status = c.recruiting ? recruitStatusLabels[c.recruiting.status] : undefined;
    return [
      html`<a href="${categoryHref(c)}">${c.label} ${c.name}</a>`,
      c.grade,
      status ? Badge({ label: status.label, tone: status.tone }) : '—',
      c.recruiting?.note ?? '—',
      c.monthlyFee ? formatYen(c.monthlyFee) : '—',
    ];
  });
}

const recruitColumns = [
  { label: 'カテゴリー', rowHeader: true },
  { label: '対象学年' },
  { label: '募集状況' },
  { label: '入団方法' },
  { label: '月会費', numeric: true },
];

function renderJoin() {
  const main = html`${ContentSection({
    id: 'join-steps-title',
    en: 'How to Join',
    title: '入団までの流れ',
    children: StepList({ items: recruitment.steps }),
  })}
${ContentSection({
    id: 'join-status-title',
    tone: 'mist',
    en: 'Recruitment',
    title: 'カテゴリー別の募集状況',
    action: { label: '募集要項を見る', href: '/join/recruitment/' },
    children: DataTable({ caption: 'カテゴリー別の募集状況', columns: recruitColumns, rows: recruitRows(), note: '※ 募集状況・料金はサンプルです。' }),
  })}
${ContentSection({
    id: 'join-links-title',
    en: 'Information',
    title: '入団案内',
    children: LinkList({
      items: [
        { title: '選手募集', text: '募集要項と、入団までの手続き。', href: '/join/recruitment/' },
        { title: 'セレクション', text: 'U-15・U-18 のセレクション日程と内容。', href: '/join/selection/' },
        { title: 'よくある質問', text: '入団・費用・保護者の方へのご質問。', href: '/join/faq/' },
      ],
    }),
  })}`;

  return SubPage({
    path: '/join/',
    group,
    title: '入団案内',
    en: 'Join Us',
    lead: recruitment.body,
    image: photo('join', { position: '50% 50%' }),
    main,
  });
}

function renderRecruitment() {
  const main = html`${ContentSection({
    id: 'recruit-table-title',
    en: 'Requirements',
    title: '募集要項',
    lead: '全カテゴリーで新規メンバーを募集しています。途中入団もご相談ください。',
    children: DataTable({ caption: '選手募集の要項', columns: recruitColumns, rows: recruitRows(), note: '※ 募集状況・料金はサンプルです。' }),
  })}
${ContentSection({
    id: 'recruit-flow-title',
    tone: 'mist',
    en: 'Flow',
    title: '入団手続きの流れ',
    children: StepList({
      items: [
        { title: '見学・体験練習', text: '練習を見学し、体験練習で雰囲気を確かめます。' },
        { title: '面談', text: '本人・保護者の方とお話しし、ご希望をうかがいます。' },
        { title: '入団申込', text: '申込書と必要書類をご提出いただきます。' },
        { title: '入団・練習開始', text: 'ユニフォームの準備後、練習に参加できます。' },
      ],
    }),
  })}
${ContentSection({
    id: 'recruit-costs-title',
    en: 'Costs',
    title: '費用について',
    children: html`<div data-reveal>${SpecList({
      items: [
        { term: '入会金', desc: '11,000円（初回のみ・サンプル）' },
        { term: '月会費', desc: 'カテゴリーごとに異なります（上の表をご覧ください）' },
        { term: 'スポーツ保険', desc: '年額 1,800円（サンプル）' },
        { term: 'ユニフォーム', desc: '一式 20,000円前後（サンプル）' },
      ],
    })}</div>`,
  })}`;

  return SubPage({
    path: '/join/recruitment/',
    group,
    title: '選手募集',
    en: 'Recruitment',
    lead: 'U-8 から U-18 まで、新しい仲間を募集しています。',
    image: photo('join', { position: '50% 40%' }),
    main,
    cta: CtaBand({
      en: 'Join Us',
      title: 'まずは見学・体験から',
      lead: '練習の見学は予約不要です。',
      primary: { label: trialLink.label, href: trialLink.href },
      secondary: { label: '入団について相談する', href: '/contact/?type=join' },
    }),
  });
}

function renderSelection() {
  const main = html`${ContentSection({
    id: 'selection-list-title',
    en: 'Selection',
    title: 'セレクション日程',
    lead: '日程・内容はサンプルです。申込はお問い合わせフォームから受け付けます。',
    children: html`<div class="stack stack--l">
      ${selections.map((s) => {
        const c = categoryById(s.categoryId);
        const venue = facilityById(s.venueId);
        const { month, day, weekday } = dateBlock(s.date);
        return html`<article class="selection" data-reveal aria-labelledby="sel-${s.id}">
          <div class="selection__date" aria-hidden="true"><span class="selection__month tabular">${month}月</span><span class="selection__day tabular">${day}</span><span class="selection__weekday">${weekday}</span></div>
          <div class="selection__body">
            <h3 class="selection__title" id="sel-${s.id}">${s.title}</h3>
            ${SpecList({
              items: [
                { term: '対象', desc: s.eligibility },
                { term: '日時', desc: `${formatLongDate(s.date)} ${s.time}` },
                { term: '会場', desc: venue?.name ?? '—' },
                { term: '申込締切', desc: formatLongDate(s.deadline) },
                { term: '参加費', desc: s.fee === 0 ? '無料' : formatYen(s.fee) },
                { term: '内容', desc: s.contents.join('／') },
              ],
            })}
            <div class="cluster">${Button({ label: `${c?.label ?? ''} セレクションに申し込む`, href: '/contact/?type=selection', variant: 'primary' })}${c && Button({ label: `${c.label} のチーム紹介`, href: categoryHref(c), variant: 'text' })}</div>
          </div>
        </article>`;
      })}
    </div>`,
  })}
${ContentSection({
    id: 'selection-flow-title',
    tone: 'mist',
    en: 'Flow',
    title: '申込から結果まで',
    children: StepList({ items: selectionFlow }),
  })}
${ContentSection({
    id: 'selection-bring-title',
    en: 'Bring',
    title: '当日の持ち物',
    children: html`<ul class="check-list check-list--grid" role="list" data-reveal-stagger>${selectionBring.map((b, i) => html`<li style="--i:${i}">${b}</li>`)}</ul>`,
  })}`;

  return SubPage({
    path: '/join/selection/',
    group,
    title: 'セレクション',
    en: 'Selection',
    lead: 'U-15・U-18 のセレクションについてご案内します。経験の有無は問いません。',
    image: photo('u15', { position: '50% 40%' }),
    main,
  });
}

function renderFaq() {
  const main = ContentSection({
    id: 'faq-title',
    en: 'Q & A',
    title: 'ご質問と回答',
    lead: '解決しない場合は、お気軽にお問い合わせください。',
    children: FaqList({ groups: faqGroups }),
  });

  return SubPage({
    path: '/join/faq/',
    group,
    title: 'よくある質問',
    en: 'FAQ',
    lead: '入団・スクール・費用・保護者の方へのご質問にお答えします。',
    main,
    cta: CtaBand({
      en: 'Contact',
      title: 'ご不明な点はお気軽に',
      lead: '事務局が丁寧にお答えします。',
      primary: { label: 'お問い合わせ', href: '/contact/' },
      secondary: { label: trialLink.label, href: trialLink.href },
    }),
  });
}

export const routes = [
  { path: '/join/', render: renderJoin },
  { path: '/join/recruitment/', render: renderRecruitment },
  { path: '/join/selection/', render: renderSelection },
  { path: '/join/faq/', render: renderFaq },
];
