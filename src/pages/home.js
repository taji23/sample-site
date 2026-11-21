// @ts-check
import { Button } from '../components/Button.js';
import { CategoryGrid } from '../components/CategoryGrid.js';
import { HeroSection } from '../components/HeroSection.js';
import { MatchCard } from '../components/MatchCard.js';
import { Media } from '../components/Media.js';
import { NewsCard } from '../components/NewsCard.js';
import { NextMatch } from '../components/NextMatch.js';
import { Pathway } from '../components/Pathway.js';
import { RecruitmentBanner } from '../components/RecruitmentBanner.js';
import { SchoolCard } from '../components/SchoolCard.js';
import { SectionHeading } from '../components/SectionHeading.js';
import { SocialFeed } from '../components/SocialFeed.js';
import { SponsorGrid } from '../components/SponsorGrid.js';
import { StandingsTable } from '../components/StandingsTable.js';
import { categories, categoryById } from '../data/categories.js';
import { academy, philosophy, recruitment } from '../data/club.js';
import { photo } from '../data/images.js';
import { competitions, recentResults, upcomingMatches } from '../data/matches.js';
import { trialLink } from '../data/navigation.js';
import { latestNews, newsHref } from '../data/news.js';
import { locationById, schoolHref, schoolLocations, schools } from '../data/schools.js';
import { sponsorsByTier, sponsorTierLabels } from '../data/sponsors.js';
import { html } from '../lib/html.js';
import { todayIso } from '../lib/format.js';
import { site } from '../site.config.js';
import { PageLayout } from '../templates/PageLayout.js';

/** Converts "\n" in authored copy to line breaks (copy is escaped first). */
function lines(/** @type {string} */ text) {
  return text.split('\n').map((part, i) => (i === 0 ? html`${part}` : html`<br>${part}`));
}

function NewsSection() {
  const [lead, ...rest] = latestNews(4);
  if (!lead) return '';
  return html`<section class="section home-news" aria-labelledby="news-title">
  <div class="container container--wide">
    ${SectionHeading({
      number: 2,
      en: 'Latest News',
      title: '最新ニュース',
      id: 'news-title',
      lead: '試合結果、イベント、募集情報など、クラブの今をお届けします。',
      action: { label: 'ニュース一覧', href: '/news/' },
    })}
    <div class="home-news__grid">
      <div class="home-news__lead" data-reveal>${NewsCard({ news: lead, href: newsHref(lead), variant: 'lead' })}</div>
      <ul class="home-news__list" role="list" data-reveal-stagger>
        ${rest.map((item, i) => html`<li style="--i:${i}">${NewsCard({ news: item, href: newsHref(item), variant: 'compact' })}</li>`)}
      </ul>
    </div>
  </div>
</section>`;
}

function PhilosophySection() {
  return html`<section class="section philosophy" aria-labelledby="philosophy-title">
  <div class="container container--wide philosophy__grid">
    <div class="philosophy__text">
      ${SectionHeading({ number: 3, en: 'Philosophy', title: 'クラブ理念', id: 'philosophy-title' })}
      <p class="philosophy__statement" data-reveal>${lines(philosophy.statement)}</p>
      <p class="philosophy__body" data-reveal>${philosophy.body}</p>
      <ol class="philosophy__pillars" role="list" data-reveal-stagger>
        ${philosophy.pillars.map(
          (p, i) => html`<li class="philosophy__pillar" style="--i:${i}">
          <span class="philosophy__pillar-en" lang="en">${p.en}</span>
          <h3 class="philosophy__pillar-title">${p.title}</h3>
          <p>${p.text}</p>
        </li>`,
        )}
      </ol>
      ${Button({ label: 'クラブ理念を詳しく見る', href: '/about/philosophy/', variant: 'secondary' })}
    </div>
    <div class="philosophy__visual">
      <figure class="philosophy__main" data-parallax="slow">${Media({ image: photo('philosophy'), ratio: 'portrait', sizes: '(min-width: 64em) 36vw, 90vw' })}</figure>
      <figure class="philosophy__sub" data-parallax="fast">${Media({ image: photo('match'), ratio: 'landscape', sizes: '(min-width: 64em) 22vw, 60vw' })}</figure>
    </div>
  </div>
</section>`;
}

function TeamsSection() {
  return html`<section class="section tone-mist" aria-labelledby="teams-title">
  <div class="container container--wide">
    ${SectionHeading({
      number: 4,
      en: 'Our Teams',
      title: '年代別チーム',
      id: 'teams-title',
      lead: `${categories.length}つのカテゴリーで、年代に合わせたトレーニングとリーグ戦を行っています。`,
      action: { label: 'チーム・スタッフ一覧', href: '/teams/' },
    })}
    ${CategoryGrid({ categories })}
  </div>
</section>`;
}

function ResultsSection() {
  const results = recentResults(4);
  const competition = competitions[0];
  return html`<section class="section tone-navy home-results" aria-labelledby="results-title">
  <div class="container container--wide">
    ${SectionHeading({
      number: 5,
      en: 'Results',
      title: '試合結果・大会情報',
      id: 'results-title',
      lead: '各カテゴリーの最新の試合結果とリーグ順位です。',
      action: { label: '試合日程・結果', href: '/matches/' },
    })}
    <div class="home-results__grid">
      ${
        results.length > 0
          ? html`<ul class="home-results__list" role="list" data-reveal-stagger>
        ${results.map(
          (match, i) => html`<li style="--i:${i}">${MatchCard({ match, categoryLabel: categoryById(match.categoryId)?.label })}</li>`,
        )}
      </ul>`
          : html`<p>まだ試合結果はありません。</p>`
      }
      ${
        competition &&
        html`<div class="home-results__table" data-reveal>
        ${StandingsTable({ competition, categoryLabel: categoryById(competition.categoryId)?.label })}
        ${Button({ label: '順位表をすべて見る', href: '/matches/standings/', variant: 'text' })}
      </div>`
      }
    </div>
  </div>
</section>`;
}

function AcademySection() {
  return html`<section class="section academy" aria-labelledby="academy-title">
  <div class="container container--wide">
    ${SectionHeading({ number: 6, en: 'Academy', title: 'アカデミー', id: 'academy-title' })}
    <div class="academy__feature">
      <figure class="academy__media" data-parallax="slow">${Media({ image: photo('academy'), ratio: 'landscape', sizes: '(min-width: 64em) 62vw, 100vw' })}</figure>
      <div class="academy__panel" data-reveal>
        <p class="academy__lead">${academy.lead}</p>
        <p>${academy.body}</p>
        <ul class="academy__policies" role="list">
          ${academy.policies.map((p) => html`<li><span class="academy__policy-title">${p.title}</span><span>${p.text}</span></li>`)}
        </ul>
        ${Button({ label: '育成方針を見る', href: '/academy/policy/', variant: 'primary' })}
      </div>
    </div>
    <div class="academy__pathway">
      <h3 class="academy__pathway-title"><span lang="en">Career Pathway</span><span>育成の道のり</span></h3>
      ${Pathway({ categories, nextStage: academy.nextStage })}
    </div>
  </div>
</section>`;
}

function SchoolSection() {
  return html`<section class="section tone-mist school" aria-labelledby="school-title">
  <div class="container container--wide school__grid">
    <div class="school__intro">
      ${SectionHeading({ number: 7, en: 'Football School', title: 'サッカースクール', id: 'school-title' })}
      <p class="school__lead" data-reveal>チームに所属していなくても参加できるスクールです。初めてボールを蹴るお子さまも、少人数のクラスで安心してスタートできます。</p>
      <div class="school__locations" data-reveal>
        <h3 class="school__sub">会場</h3>
        <ul role="list">${schoolLocations.map((l) => html`<li><span class="school__loc-name">${l.name}</span><span class="t-caption">${l.address}</span></li>`)}</ul>
      </div>
      <div class="cluster" data-reveal>
        ${Button({ label: '無料体験に申し込む', href: trialLink.href, variant: 'accent' })}
        ${Button({ label: 'クラス・料金', href: '/school/classes/', variant: 'text' })}
      </div>
    </div>
    <ul class="school__list" role="list" data-reveal-stagger>
      ${schools.map(
        (school, i) => html`<li style="--i:${i}">${SchoolCard({ school, location: locationById(school.locationId), href: schoolHref(school) })}</li>`,
      )}
    </ul>
  </div>
</section>`;
}

function PartnersSection() {
  /** @type {import('../data/sponsors.js').SponsorTier[]} */
  const tiers = ['top', 'partner', 'supporter'];
  return html`<section class="section partners" aria-labelledby="partners-title">
  <div class="container container--wide">
    ${SectionHeading({
      number: 9,
      en: 'Partners',
      title: 'パートナー',
      id: 'partners-title',
      lead: 'サンプルFCの活動は、地域の企業・団体の皆さまのご支援に支えられています。（掲載企業はすべて架空です）',
      action: { label: 'スポンサー募集について', href: '/partners/sponsorship/' },
    })}
    ${SponsorGrid({ groups: tiers.map((tier) => ({ tier, label: sponsorTierLabels[tier], sponsors: sponsorsByTier(tier) })) })}
  </div>
</section>`;
}

function SocialSection() {
  const find = (/** @type {string} */ id) => site.social.find((s) => s.id === id);
  return html`<section class="section tone-mist" aria-labelledby="social-title">
  <div class="container container--wide">
    ${SectionHeading({
      number: 10,
      en: 'Follow Us',
      title: '公式SNS',
      id: 'social-title',
      lead: 'クラブの日常や活動の様子を発信する予定です。表示している投稿・動画はサンプルで、SNSアカウントは未設定です。',
    })}
    ${SocialFeed({
      instagram: find('instagram'),
      youtube: find('youtube'),
      video: { title: '【ハイライト】U-15 サンプル地区リーグ 第8節 vs 東川FC', image: photo('match'), duration: '4:12' },
      instagramImages: [
        photo('u12'),
        photo('academy', { position: '50% 40%' }),
        photo('hero', { position: '70% 50%' }),
        photo('school', { position: '20% 50%' }),
        photo('u15'),
        photo('join'),
      ],
      others: site.social.filter((s) => s.url && s.id !== 'instagram' && s.id !== 'youtube'),
    })}
  </div>
</section>`;
}

export function renderHome() {
  const next = upcomingMatches(todayIso())[0];
  const hero = photo('hero', { position: '68% 50%' });

  const main = html`${HeroSection({
    image: hero,
    lines: ['Raise', 'The Standard.'],
    title: '育成年代に、プロクラブ水準の環境を。',
    lead: 'U-8 から U-18 まで。一貫した育成理念と、本気で上を目指せる環境で、選手一人ひとりの未来を育てるフットボールクラブです。',
    primary: { label: trialLink.label, href: trialLink.href },
    secondary: { label: 'クラブを知る', href: '/about/' },
  })}
  ${NextMatch({ match: next, categoryLabel: next ? categoryById(next.categoryId)?.label : undefined, number: 1, href: '/matches/fixtures/' })}
  ${NewsSection()}
  ${PhilosophySection()}
  ${TeamsSection()}
  ${ResultsSection()}
  ${AcademySection()}
  ${SchoolSection()}
  ${RecruitmentBanner({
    image: photo('join', { position: '50% 60%' }),
    number: 8,
    headline: recruitment.headline,
    title: '選手募集',
    lead: recruitment.lead,
    body: recruitment.body,
    steps: recruitment.steps,
    primary: { label: trialLink.label, href: trialLink.href },
    secondary: { label: '募集要項を見る', href: '/join/recruitment/' },
  })}
  ${PartnersSection()}
  ${SocialSection()}`;

  return PageLayout({
    meta: {
      title: '育成年代に、プロクラブ水準の環境を。',
      path: '/',
      description: site.description,
      ogImage: '/images/photos/hero-1280.jpg',
      preloadImage: hero,
    },
    main,
    overlayHeader: true,
  });
}

