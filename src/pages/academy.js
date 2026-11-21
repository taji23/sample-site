// @ts-check
import { ContentSection } from '../components/AnimatedSection.js';
import { DataTable } from '../components/DataTable.js';
import { Media } from '../components/Media.js';
import { LinkList } from '../components/PageLinks.js';
import { Pathway } from '../components/Pathway.js';
import { StaffCard } from '../components/StaffCard.js';
import { RuleList, StepList } from '../components/SpecList.js';
import { categories, categoryHref, sortedCategories } from '../data/categories.js';
import { academy, careerOptions, developmentPrinciples, supportSteps } from '../data/club.js';
import { photo } from '../data/images.js';
import { navGroup } from '../data/navigation.js';
import { staffByGroup } from '../data/staff.js';
import { html } from '../lib/html.js';
import { SubPage } from '../templates/SubPage.js';

const group = navGroup('academy');

function renderAcademy() {
  const main = html`${ContentSection({
    id: 'academy-intro-title',
    en: 'Academy',
    title: '育成の考え方',
    children: html`<div class="split split--reverse">
      <figure data-reveal data-parallax="slow">${Media({ image: photo('academy'), ratio: 'landscape', sizes: '(min-width: 64em) 52vw, 100vw' })}</figure>
      <div class="stack" data-reveal>
        <p class="statement">${academy.lead}</p>
        <p class="prose">${academy.body}</p>
      </div>
    </div>`,
  })}
${ContentSection({
    id: 'academy-policy-title',
    tone: 'mist',
    en: 'Our Promise',
    title: '三つの約束',
    children: RuleList({ items: academy.policies, numbered: true }),
  })}
${ContentSection({
    id: 'academy-path-title',
    en: 'Career Pathway',
    title: '育成の道のり',
    children: Pathway({ categories, nextStage: academy.nextStage }),
  })}
${ContentSection({
    id: 'academy-links-title',
    tone: 'mist',
    en: 'Learn More',
    title: 'アカデミーをさらに知る',
    children: LinkList({
      items: [
        { title: '育成方針', text: '年代ごとの重点と、成長を支える仕組み。', href: '/academy/policy/' },
        { title: 'コーチ紹介', text: '各年代を担当する指導者のメッセージ。', href: '/academy/coaches/' },
        { title: '進路', text: '次のステージを見据えた進路サポート。', href: '/academy/career/' },
      ],
    }),
  })}`;

  return SubPage({
    path: '/academy/',
    group,
    title: 'アカデミー',
    en: 'Academy',
    lead: '年代ごとに分断しない、一貫した育成カリキュラムで、選手の10年先を見据えます。',
    image: photo('academy', { position: '50% 45%' }),
    main,
  });
}

function renderPolicy() {
  const rows = sortedCategories().map((c) => [
    html`<a href="${categoryHref(c)}">${c.label} ${c.name}</a>`,
    c.focus?.[0] ?? '—',
    c.goal ?? '—',
  ]);

  const main = html`${ContentSection({
    id: 'principles-title',
    en: 'Principles',
    title: '育成の五つの原則',
    children: RuleList({ items: developmentPrinciples, numbered: true }),
  })}
${ContentSection({
    id: 'focus-title',
    tone: 'mist',
    en: 'By Age',
    title: '年代別の重点',
    lead: '成長段階に合わせ、年代ごとにテーマを設定しています。',
    children: DataTable({
      caption: '年代別の指導の重点と目標',
      columns: [{ label: 'カテゴリー', rowHeader: true }, { label: '指導の重点' }, { label: '目標' }],
      rows,
    }),
  })}
${ContentSection({
    id: 'cycle-title',
    en: 'Growth Cycle',
    title: '成長を支える仕組み',
    children: StepList({
      items: [
        { title: '目標を決める', text: '選手と一緒に、次の数カ月の目標を言葉にします。' },
        { title: '練習・試合で試す', text: '日々のトレーニングと試合で、目標に向かって挑戦します。' },
        { title: '評価・面談', text: '年2回、成長記録をもとに個人面談を行います。' },
        { title: '次の目標へ', text: '面談の内容を指導者全員で共有し、次の課題を設定します。' },
      ],
    }),
  })}`;

  return SubPage({
    path: '/academy/policy/',
    group,
    title: '育成方針',
    en: 'Development Policy',
    lead: '全年代共通のプレー原則と評価基準で、選手の成長を一貫して支えます。',
    image: photo('academy', { position: '35% 40%' }),
    main,
  });
}

function renderCoaches() {
  const coaches = staffByGroup('coach');
  const main = ContentSection({
    id: 'coaches-title',
    en: 'Coaches',
    title: '指導者紹介',
    lead: '氏名・経歴はすべて架空のサンプルです。',
    children: html`<ul class="grid-auto staff-grid" role="list" data-reveal-stagger style="--grid-min:20rem">
      ${coaches.map((p, i) => html`<li style="--i:${i}">${StaffCard({ person: p })}${p.message && html`<blockquote class="staff-quote">${p.message}</blockquote>`}</li>`)}
    </ul>`,
  });

  return SubPage({
    path: '/academy/coaches/',
    group,
    title: 'コーチ紹介',
    en: 'Coaches',
    lead: '各年代を担当する指導者の紹介と、選手への想いです。',
    image: photo('academy', { position: '60% 35%' }),
    main,
  });
}

function renderCareer() {
  const main = html`${ContentSection({
    id: 'career-path-title',
    en: 'Career Path',
    title: 'クラブでの歩み',
    children: Pathway({ categories, nextStage: academy.nextStage }),
  })}
${ContentSection({
    id: 'options-title',
    tone: 'mist',
    en: 'Next Stage',
    title: '卒業後の選択肢',
    lead: '進路は一人ひとり異なります。選手の志向に合った道を、一緒に考えます。',
    children: RuleList({ items: careerOptions }),
  })}
${ContentSection({
    id: 'support-title',
    en: 'Support',
    title: '進路サポート',
    children: StepList({ items: supportSteps }),
  })}`;

  return SubPage({
    path: '/academy/career/',
    group,
    title: '進路',
    en: 'Career Paths',
    lead: 'U-8 から U-18 までの道のりと、その先の選択肢をご紹介します。',
    image: photo('hero', { position: '55% 45%' }),
    main,
  });
}

export const routes = [
  { path: '/academy/', render: renderAcademy },
  { path: '/academy/policy/', render: renderPolicy },
  { path: '/academy/coaches/', render: renderCoaches },
  { path: '/academy/career/', render: renderCareer },
];
