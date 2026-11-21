// @ts-check
import { ContentSection } from '../components/AnimatedSection.js';
import { Button } from '../components/Button.js';
import { CtaBand } from '../components/CtaBand.js';
import { DataTable } from '../components/DataTable.js';
import { FacilityCard } from '../components/FacilityCard.js';
import { FaqList } from '../components/FaqList.js';
import { Consent, ChoiceGroup, Field, PrototypeForm } from '../components/FormField.js';
import { Media } from '../components/Media.js';
import { LinkList } from '../components/PageLinks.js';
import { RuleList, SpecList, StepList } from '../components/SpecList.js';
import { SchoolCard } from '../components/SchoolCard.js';
import { faqGroups } from '../data/faq.js';
import { facilityById } from '../data/facilities.js';
import { photo } from '../data/images.js';
import { navGroup, trialLink } from '../data/navigation.js';
import { locationById, schoolEntryFee, schoolHref, schoolInsuranceFee, schoolLocations, schools } from '../data/schools.js';
import { formatYen } from '../lib/format.js';
import { html } from '../lib/html.js';
import { ProgramDetail } from '../templates/ProgramDetail.js';
import { DefaultCta, SubPage } from '../templates/SubPage.js';

const group = navGroup('school');

const trialSteps = [
  { title: '体験を申し込む', text: '申込フォームから、希望のクラスと日程をお知らせください。' },
  { title: '体験に参加する', text: '動きやすい服装でお越しください。用具の貸し出しもあります。' },
  { title: '入会を決める', text: '体験後、ご希望の場合は入会手続きをご案内します。' },
];

function renderSchool() {
  const main = html`${ContentSection({
    id: 'school-intro-title',
    en: 'Football School',
    title: 'スクールの特長',
    children: html`<div class="split">
      <div class="stack" data-reveal>
        <p class="statement">はじめてのサッカーを、<br>最高の思い出に。</p>
        <p class="prose">チームに所属していなくても参加できるスクールです。少人数のクラスで、一人ひとりのペースに合わせて丁寧に指導します。</p>
        <div class="cluster">${Button({ label: trialLink.label, href: trialLink.href, variant: 'accent' })}${Button({ label: '料金を見る', href: '/school/fees/', variant: 'text' })}</div>
      </div>
      <figure data-reveal data-parallax="slow">${Media({ image: photo('school'), ratio: 'landscape', sizes: '(min-width: 64em) 40vw, 100vw' })}</figure>
    </div>`,
  })}
${ContentSection({
    id: 'school-classes-title',
    tone: 'mist',
    en: 'Classes',
    title: 'クラス紹介',
    action: { label: 'クラス一覧・比較', href: '/school/classes/' },
    children: html`<ul class="school__list school__list--page" role="list" data-reveal-stagger>${schools.map((school, i) => html`<li style="--i:${i}">${SchoolCard({ school, location: locationById(school.locationId), href: schoolHref(school) })}</li>`)}</ul>`,
  })}
${ContentSection({
    id: 'school-flow-title',
    en: 'Trial Flow',
    title: '体験から入会まで',
    children: StepList({ items: trialSteps }),
  })}
${ContentSection({
    id: 'school-links-title',
    tone: 'mist',
    en: 'Information',
    title: 'ご案内',
    children: LinkList({
      items: [
        { title: '会場', text: 'クラスを開催するグラウンドのご案内。', href: '/school/locations/' },
        { title: '料金', text: '月会費・入会金・保険について。', href: '/school/fees/' },
        { title: '無料体験申込', text: '体験のお申し込みはこちらから。', href: '/school/trial/' },
      ],
    }),
  })}`;

  return SubPage({
    path: '/school/',
    group,
    title: 'サッカースクール',
    en: 'School',
    lead: 'チームに所属していなくても参加できる、未就学児〜小学生のためのサッカースクールです。',
    image: photo('school', { position: '40% 50%' }),
    main,
    cta: DefaultCta(),
  });
}

function renderClasses() {
  const rows = schools.map((s) => [
    html`<a href="${schoolHref(s)}">${s.name}</a>`,
    s.target,
    s.schedule,
    locationById(s.locationId)?.name ?? '—',
    `${s.capacity}名`,
    formatYen(s.monthlyFee),
  ]);
  const main = html`${ContentSection({
    id: 'classes-title',
    en: 'Classes',
    title: 'クラス一覧',
    children: html`<ul class="school__list school__list--page" role="list" data-reveal-stagger>${schools.map((school, i) => html`<li style="--i:${i}">${SchoolCard({ school, location: locationById(school.locationId), href: schoolHref(school) })}</li>`)}</ul>`,
  })}
${ContentSection({
    id: 'classes-compare-title',
    tone: 'mist',
    en: 'Compare',
    title: 'クラスの比較',
    children: DataTable({
      caption: 'スクールのクラス比較',
      columns: [{ label: 'クラス', rowHeader: true }, { label: '対象' }, { label: '日時' }, { label: '会場' }, { label: '定員', numeric: true }, { label: '月会費', numeric: true }],
      rows,
      note: '※ 内容・料金はサンプルです。',
    }),
  })}`;

  return SubPage({
    path: '/school/classes/',
    group,
    title: 'クラス紹介',
    en: 'Classes',
    lead: '年齢・目的に合わせた3つのクラスを開講しています。',
    image: photo('school', { position: '25% 50%' }),
    main,
  });
}

/** @param {import('../data/schools.js').School} school */
function renderClass(school) {
  const location = locationById(school.locationId);
  const facility = facilityById(school.locationId);
  const idx = schools.findIndex((s) => s.id === school.id);
  const prev = schools[idx - 1];
  const next = schools[idx + 1];
  const others = schools.filter((s) => s.id !== school.id);

  const sections = html`${ContentSection({
    id: 'class-goal-title',
    en: 'Goal',
    title: 'このクラスの目標',
    children: html`<p class="statement statement--wide" data-reveal>${school.goal}</p>`,
  })}
${ContentSection({
    id: 'class-curriculum-title',
    tone: 'mist',
    en: 'Curriculum',
    title: '内容',
    children: RuleList({ items: school.curriculum, numbered: true }),
  })}
${ContentSection({
    id: 'class-flow-title',
    en: 'Session Flow',
    title: '1回の流れ',
    children: html`<div class="split split--even">
      <ol class="session-flow" role="list" data-reveal-stagger>${school.flow.map((f, i) => html`<li style="--i:${i}"><span class="session-flow__time tabular">${f.time}</span><span class="session-flow__title">${f.title}</span></li>`)}</ol>
      <div class="callout" data-reveal>
        <p class="callout__label">持ち物</p>
        <ul class="check-list" role="list">${school.bring.map((b) => html`<li>${b}</li>`)}</ul>
        ${facility && html`<p class="t-caption t-muted">会場：${facility.name}（${facility.address}）</p>`}
      </div>
    </div>`,
  })}
${ContentSection({
    id: 'class-others-title',
    tone: 'mist',
    en: 'Other Classes',
    title: '他のクラス',
    children: LinkList({ items: others.map((s) => ({ title: s.name, text: `${s.target}｜${s.schedule}`, href: schoolHref(s) })) }),
  })}`;

  return ProgramDetail({
    path: schoolHref(school),
    group,
    trail: [{ label: 'クラス紹介', href: '/school/classes/' }],
    en: 'Class',
    title: school.name,
    lead: school.summary,
    image: school.image,
    facts: [
      { label: '対象', value: school.target },
      { label: '日時', value: school.schedule },
      { label: '会場', value: location?.name ?? '—' },
      { label: '月会費（サンプル）', value: formatYen(school.monthlyFee) },
    ],
    sections,
    pager: {
      label: 'クラス間の移動',
      prev: prev && { title: prev.name, href: schoolHref(prev) },
      next: next && { title: next.name, href: schoolHref(next) },
    },
    cta: CtaBand({
      en: 'Free Trial',
      title: `${school.name}を体験する`,
      lead: '初回は無料です。動きやすい服装でお越しください。',
      primary: { label: trialLink.label, href: `${trialLink.href}?class=${school.id}` },
      secondary: { label: 'お問い合わせ', href: '/contact/?type=school' },
    }),
  });
}

function renderLocations() {
  const main = ContentSection({
    id: 'locations-title',
    en: 'Grounds',
    title: '開催グラウンド',
    lead: 'クラスごとに会場が異なります。お間違いのないようご確認ください。（所在地は架空です）',
    children: html`<div class="stack stack--l">
      ${schoolLocations.map((loc, i) => {
        const facility = facilityById(loc.id);
        const held = schools.filter((s) => s.locationId === loc.id);
        if (!facility) return '';
        return html`<div class="location-block">
          ${FacilityCard({ facility, reverse: i % 2 === 1 })}
          <p class="location-block__classes" data-reveal><strong>開催クラス：</strong>${held.map((s, k) => html`${k > 0 ? '、' : ''}<a href="${schoolHref(s)}">${s.name}</a>`)}</p>
        </div>`;
      })}
    </div>`,
  });

  return SubPage({
    path: '/school/locations/',
    group,
    title: '会場',
    en: 'Locations',
    lead: 'スクールを開催しているグラウンドのご案内です。',
    image: photo('hero', { position: '50% 60%' }),
    main,
  });
}

function renderFees() {
  const rows = schools.map((s) => [html`<a href="${schoolHref(s)}">${s.name}</a>`, formatYen(s.monthlyFee), formatYen(schoolEntryFee), formatYen(schoolInsuranceFee)]);
  const main = html`${ContentSection({
    id: 'fees-title',
    en: 'Monthly Fees',
    title: '月会費・入会金',
    lead: '以下はサンプルの金額です。実際の料金は、運営開始時に確定した内容へ差し替えてください。',
    children: html`${DataTable({
      caption: 'スクールの料金',
      columns: [{ label: 'クラス', rowHeader: true }, { label: '月会費', numeric: true }, { label: '入会金（初回のみ）', numeric: true }, { label: 'スポーツ保険（年額）', numeric: true }],
      rows,
    })}
<div class="split split--even fees-notes">
  ${SpecList({
    items: [
      { term: '月会費に含まれるもの', desc: '指導費・施設使用料' },
      { term: '別途必要なもの', desc: 'ウェア・シューズ・すね当て（用具の貸し出しあり）' },
      { term: '兄弟割引', desc: '2人目以降の月会費を10%割引（サンプル）' },
      { term: '体験', desc: '1回目は無料' },
    ],
  })}
  <div class="callout"><p class="callout__label">お支払い</p><p>月会費は、毎月の口座振替でお支払いいただきます（サンプル）。</p></div>
</div>`,
  })}
${ContentSection({
    id: 'fees-faq-title',
    tone: 'mist',
    en: 'FAQ',
    title: '費用についてのご質問',
    children: FaqList({ groups: faqGroups.filter((g) => g.id === 'fees' || g.id === 'school') }),
  })}`;

  return SubPage({
    path: '/school/fees/',
    group,
    title: '料金',
    en: 'Fees',
    lead: '月会費・入会金・保険について、わかりやすくまとめました。',
    image: photo('school', { position: '60% 50%' }),
    main,
  });
}

function renderTrial() {
  const gradeOptions = ['年中', '年長', '小学1年生', '小学2年生', '小学3年生', '小学4年生', '小学5年生', '小学6年生'].map((g) => ({ value: g, label: g }));
  const classOptions = [...schools.map((s) => ({ value: s.id, label: `${s.name}（${s.schedule}）` })), { value: 'undecided', label: 'まだ決めていない・相談したい' }];

  const form = PrototypeForm({
    id: 'trial-form',
    submitLabel: '体験を申し込む（試作）',
    successTitle: '体験の申込内容を確認しました',
    successText: '実際の運用では、2営業日以内に事務局からご連絡します。',
    children: html`${Field({ id: 'participant', name: 'participant', label: '参加するお子さまのお名前', required: true, autocomplete: 'off', placeholder: '例：サンプル 太郎' })}
${Field({ id: 'grade', name: 'grade', label: '学年', type: 'select', required: true, options: gradeOptions })}
${Field({ id: 'class', name: 'class', label: '希望クラス', type: 'select', required: true, options: classOptions, preset: 'class' })}
${Field({ id: 'date', name: 'date', label: '希望日', type: 'date', hint: '開催曜日の日付をお選びください。' })}
${ChoiceGroup({ name: 'experience', legend: 'サッカー経験', required: true, options: [{ value: 'none', label: 'はじめて' }, { value: 'some', label: '経験あり' }] })}
${Field({ id: 'guardian', name: 'guardian', label: '保護者の方のお名前', required: true, autocomplete: 'name' })}
${Field({ id: 'email', name: 'email', label: 'メールアドレス', type: 'email', required: true, autocomplete: 'email', placeholder: 'example@example.com' })}
${Field({ id: 'tel', name: 'tel', label: '電話番号', type: 'tel', autocomplete: 'tel', hint: 'ハイフンなしでも入力できます。' })}
${Field({ id: 'note', name: 'note', label: '備考・ご質問', type: 'textarea', rows: 4, hint: 'アレルギーやケガなど、事前に知っておいてほしいことがあればご記入ください。' })}
${Consent({ id: 'consent', name: 'consent', label: html`個人情報の取り扱いに同意します（試作版のため、実際には保存されません）` })}`,
  });

  const main = ContentSection({
    id: 'trial-title',
    title: '申込フォーム',
    children: html`<div class="form-layout">
      <div class="form-layout__aside stack" data-reveal>
        <p class="prose">初めてのお子さまも安心してご参加いただけます。ご希望のクラスと日程をお知らせください。</p>
        ${StepList({ items: trialSteps })}
      </div>
      <div class="form-layout__main" data-reveal>${form}</div>
    </div>`,
  });

  return SubPage({
    path: '/school/trial/',
    group,
    title: '無料体験申込',
    en: 'Free Trial',
    lead: 'サッカースクールの無料体験は、こちらからお申し込みください。',
    image: photo('u8', { position: '50% 30%' }),
    main,
    cta: false,
  });
}

export const routes = [
  { path: '/school/', render: renderSchool },
  { path: '/school/classes/', render: renderClasses },
  ...schools.map((s) => ({ path: schoolHref(s), render: () => renderClass(s) })),
  { path: '/school/locations/', render: renderLocations },
  { path: '/school/fees/', render: renderFees },
  { path: '/school/trial/', render: renderTrial },
];
