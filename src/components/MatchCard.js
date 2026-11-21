// @ts-check
import { formatMatchDay, formatTime } from '../lib/format.js';
import { cx, html } from '../lib/html.js';
import { Badge } from './Badge.js';
import { Icon } from './Icon.js';

/** @type {Record<import('../types.js').MatchStatus, { label: string, tone: import('./Badge.js').BadgeTone }>} */
const STATUS = {
  scheduled: { label: '開催予定', tone: 'royal' },
  finished: { label: '試合終了', tone: 'navy' },
  postponed: { label: '延期', tone: 'muted' },
  cancelled: { label: '中止', tone: 'muted' },
};

/** @param {import('../types.js').Match} match */
function clubResult(match) {
  if (match.status !== 'finished' || !match.score) return null;
  const clubIsHome = Boolean(match.home.isClub);
  const ours = clubIsHome ? match.score.home : match.score.away;
  const theirs = clubIsHome ? match.score.away : match.score.home;
  if (ours > theirs) return { label: '勝利', key: 'win' };
  if (ours < theirs) return { label: '敗戦', key: 'loss' };
  return { label: '引き分け', key: 'draw' };
}

/** @param {import('../types.js').MatchTeam} team */
function Crest(team) {
  return html`<span class="${cx('crest', team.isClub && 'crest--club')}" aria-hidden="true">${team.short}</span>`;
}

/**
 * @typedef {object} MatchCardProps
 * @property {import('../types.js').Match} match
 * @property {string} [categoryLabel]  e.g. 'U-12'; resolved by the caller from categoryId.
 * @property {string} [href]           Optional detail link.
 * @property {'default' | 'feature'} [variant]  feature: navy, larger, for Next Match.
 * @property {2 | 3} [headingLevel]
 */

/** @param {MatchCardProps} props */
export function MatchCard({ match, categoryLabel, href, variant = 'default', headingLevel = 3 }) {
  const status = STATUS[match.status];
  const result = clubResult(match);
  const { day, weekday } = formatMatchDay(match.kickoff);
  const time = formatTime(match.kickoff);
  const hasScore = match.status === 'finished' && match.score;
  const isFeature = variant === 'feature';

  const fixture = html`<span class="match-card__team match-card__team--home">${Crest(match.home)}<span class="match-card__team-name">${match.home.name}</span></span>
    <span class="match-card__center">${
      hasScore && match.score
        ? html`<span class="match-card__score tabular">${match.score.home}<span class="match-card__dash"> - </span>${match.score.away}</span>`
        : html`<span class="match-card__vs" lang="en"> VS </span>`
    }</span>
    <span class="match-card__team match-card__team--away">${Crest(match.away)}<span class="match-card__team-name">${match.away.name}</span></span>`;
  const fixtureContent = href ? html`<a class="card__link match-card__link" href="${href}">${fixture}</a>` : fixture;

  return html`<article class="${cx('card', 'match-card', isFeature && 'match-card--feature on-dark')}">
  <div class="match-card__head">
    <p class="match-card__competition">${categoryLabel && html`<span class="match-card__category" lang="en">${categoryLabel}</span>`}${match.competition}${match.round && html` <span class="match-card__round">${match.round}</span>`}</p>
    <div class="cluster match-card__badges">
      ${result && html`<span class="match-card__result match-card__result--${result.key}">${result.label}</span>`}
      ${Badge({ label: status.label, tone: isFeature && status.tone === 'royal' ? 'gold' : status.tone })}
    </div>
  </div>
  ${
    headingLevel === 2
      ? html`<h2 class="match-card__fixture">${fixtureContent}</h2>`
      : html`<h3 class="match-card__fixture">${fixtureContent}</h3>`
  }
  <dl class="match-card__details">
    <div><dt>${Icon('calendar', { size: 18 })}<span class="visually-hidden">日付</span></dt><dd><time datetime="${match.kickoff}"><span class="match-card__day tabular">${day}</span><span class="match-card__weekday">（${weekday}）</span>${time && html`<span class="tabular">${time}</span>`}</time></dd></div>
    <div><dt>${Icon('map-pin', { size: 18 })}<span class="visually-hidden">会場</span></dt><dd>${match.venue}</dd></div>
  </dl>
</article>`;
}
