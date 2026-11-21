// @ts-check
import { ContentSection } from '../components/AnimatedSection.js';
import { CtaBand } from '../components/CtaBand.js';
import { DataTable } from '../components/DataTable.js';
import { SponsorGrid } from '../components/SponsorGrid.js';
import { RuleList, StepList } from '../components/SpecList.js';
import { photo } from '../data/images.js';
import { navGroup } from '../data/navigation.js';
import { sponsorBenefitMatrix, sponsorPlans, sponsorsByTier, sponsorTierLabels } from '../data/sponsors.js';
import { html } from '../lib/html.js';
import { SubPage } from '../templates/SubPage.js';

const group = navGroup('partners');

/** @type {import('../data/sponsors.js').SponsorTier[]} */
const tiers = ['top', 'partner', 'supporter'];

function renderPartners() {
  const main = html`${ContentSection({
    id: 'partners-list-title',
    en: 'Our Partners',
    title: 'パートナー企業',
    lead: 'サンプルFCの活動は、地域の企業・団体の皆さまのご支援に支えられています。（掲載企業はすべて架空です）',
    children: SponsorGrid({ groups: tiers.map((tier) => ({ tier, label: sponsorTierLabels[tier], sponsors: sponsorsByTier(tier) })) }),
  })}
${ContentSection({
    id: 'partners-value-title',
    tone: 'mist',
    en: 'Why Partner',
    title: 'パートナーになるということ',
    children: RuleList({
      items: [
        { title: '地域の育成を支える', text: 'ご支援は、グラウンド環境の整備や、スクールの運営に活用されます。' },
        { title: '選手・保護者に伝わる', text: 'ユニフォームや会場、公式サイトで、貴社・貴店の名前をお伝えします。' },
        { title: '地域とのつながり', text: 'イベントやクリニックを通じて、地域の皆さまとの接点が生まれます。' },
      ],
    }),
  })}`;

  return SubPage({
    path: '/partners/',
    group,
    title: 'パートナー',
    en: 'Partners',
    lead: 'クラブの活動を支えてくださっている、地域のパートナーの皆さまをご紹介します。',
    image: photo('hero', { position: '70% 50%' }),
    main,
    cta: CtaBand({
      en: 'Sponsorship',
      title: 'スポンサーを募集しています',
      lead: 'プランの内容や、ご支援の方法をご案内します。',
      primary: { label: 'スポンサー募集について', href: '/partners/sponsorship/' },
      secondary: { label: 'お問い合わせ', href: '/contact/?type=sponsor' },
    }),
  });
}

function renderSponsorship() {
  const matrixRows = sponsorBenefitMatrix.map((row) => [row.label, ...tiers.map((t) => row.values[t])]);

  const main = html`${ContentSection({
    id: 'plans-title',
    en: 'Plans',
    title: 'スポンサープラン',
    lead: 'プランの内容・金額はサンプルです。実際の募集条件に合わせて差し替えてください。',
    children: html`<ul class="plan-list" role="list" data-reveal-stagger>
      ${sponsorPlans.map(
        (p, i) => html`<li class="plan plan--${p.tier}" style="--i:${i}">
        <h3 class="plan__name">${sponsorTierLabels[p.tier]}</h3>
        <p class="plan__price">${p.price}</p>
        <ul class="check-list" role="list">${p.benefits.map((b) => html`<li>${b}</li>`)}</ul>
      </li>`,
      )}
    </ul>`,
  })}
${ContentSection({
    id: 'matrix-title',
    tone: 'mist',
    en: 'Comparison',
    title: 'プランの比較',
    children: DataTable({
      caption: 'スポンサープランの比較',
      columns: [{ label: '内容', rowHeader: true }, ...tiers.map((t) => ({ label: sponsorTierLabels[t] }))],
      rows: matrixRows,
    }),
  })}
${ContentSection({
    id: 'sponsor-flow-title',
    en: 'Flow',
    title: 'ご支援までの流れ',
    children: StepList({
      items: [
        { title: 'ご相談', text: 'お問い合わせフォームから、ご希望をお聞かせください。' },
        { title: 'ご提案', text: '目的や予算に合わせて、プランをご提案します。' },
        { title: 'ご契約', text: '内容にご納得いただけましたら、契約を結びます。' },
        { title: '掲出開始', text: 'ロゴの掲出と、サイトへの掲載を開始します。' },
      ],
    }),
  })}`;

  return SubPage({
    path: '/partners/sponsorship/',
    group,
    title: 'スポンサー募集',
    en: 'Sponsorship',
    lead: '地域の企業・店舗の皆さまとともに、育成年代の環境を支えていきたいと考えています。',
    image: photo('match', { position: '45% 50%' }),
    main,
    cta: CtaBand({
      en: 'Contact',
      title: 'スポンサーについてのご相談',
      lead: '資料のご請求や、プランのご相談はこちらから。',
      primary: { label: 'お問い合わせ', href: '/contact/?type=sponsor' },
      secondary: { label: 'パートナー一覧', href: '/partners/' },
    }),
  });
}

export const routes = [
  { path: '/partners/', render: renderPartners },
  { path: '/partners/sponsorship/', render: renderSponsorship },
];
