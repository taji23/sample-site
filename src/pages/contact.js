// @ts-check
import { ContentSection } from '../components/AnimatedSection.js';
import { Consent, Field, PrototypeForm } from '../components/FormField.js';
import { LinkList } from '../components/PageLinks.js';
import { SpecList } from '../components/SpecList.js';
import { contactLink } from '../data/navigation.js';
import { html } from '../lib/html.js';
import { site } from '../site.config.js';
import { SubPage } from '../templates/SubPage.js';

const inquiryTypes = [
  { value: 'join', label: '入団・見学について' },
  { value: 'school', label: 'サッカースクールについて' },
  { value: 'selection', label: 'セレクションについて' },
  { value: 'event', label: 'イベント・出張教室について' },
  { value: 'sponsor', label: 'スポンサー・協賛について' },
  { value: 'media', label: '取材・その他' },
];

function renderContact() {
  const form = PrototypeForm({
    id: 'contact-form',
    submitLabel: '送信する（試作）',
    successTitle: 'お問い合わせ内容を確認しました',
    successText: '実際の運用では、2営業日以内にご入力のメールアドレスへご連絡します。',
    children: html`${Field({ id: 'type', name: 'type', label: 'お問い合わせの種類', type: 'select', required: true, options: inquiryTypes, preset: 'type' })}
${Field({ id: 'name', name: 'name', label: 'お名前', required: true, autocomplete: 'name' })}
${Field({ id: 'email', name: 'email', label: 'メールアドレス', type: 'email', required: true, autocomplete: 'email', placeholder: 'example@example.com' })}
${Field({ id: 'tel', name: 'tel', label: '電話番号', type: 'tel', autocomplete: 'tel', hint: '日中に連絡が取れる番号をご記入ください。' })}
${Field({ id: 'message', name: 'message', label: 'お問い合わせ内容', type: 'textarea', required: true, rows: 7 })}
${Consent({ id: 'consent', name: 'consent', label: html`個人情報の取り扱いに同意します（試作版のため、実際には保存されません）` })}`,
  });

  const main = ContentSection({
    id: 'contact-title',
    title: '入力フォーム',
    children: html`<div class="form-layout">
      <div class="form-layout__aside stack" data-reveal>
        <p class="prose">入団・スクール・スポンサーなど、お気軽にご相談ください。見学は予約不要です。</p>
        ${SpecList({
          items: [
            { term: '所在地', desc: site.contact.address },
            { term: 'メール', desc: site.contact.email },
            { term: '受付時間', desc: site.contact.hours },
          ],
        })}
        <p class="t-caption t-muted">※ 連絡先はサンプルです。</p>
        ${LinkList({ items: [{ title: 'よくある質問', text: 'お問い合わせの前にご確認ください。', href: '/join/faq/' }] })}
      </div>
      <div class="form-layout__main" data-reveal>${form}</div>
    </div>`,
  });

  return SubPage({
    path: contactLink.href,
    title: contactLink.label,
    en: 'Contact',
    lead: '入団・スクール・スポンサーなど、お気軽にお問い合わせください。',
    main,
    cta: false,
  });
}

export const routes = [{ path: '/contact/', render: renderContact }];
