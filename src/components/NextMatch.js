// @ts-check
import { formatMatchDay, formatTime } from '../lib/format.js';
import { cx, html } from '../lib/html.js';
import { Badge } from './Badge.js';
import { Button } from './Button.js';
import { Icon } from './Icon.js';

/** @param {import('../types.js').MatchTeam} team */
function Side(team) {
  return html`<div class="next-match__team">
  <span class="${cx('crest', team.isClub && 'crest--club')}" aria-hidden="true">${team.short}</span>
  <span class="next-match__team-name">${team.name}</span>
</div>`;
}

/**
 * Next Match strip that overlaps the bottom edge of the hero.
 * @param {{ match?: import('../types.js').Match, categoryLabel?: string, number?: number, href: string }} props
 */
export function NextMatch({ match, categoryLabel, number, href }) {
  const heading = html`<h2 class="next-match__heading" id="next-match-title">
    ${number !== undefined && html`<span class="next-match__number" aria-hidden="true">${String(number).padStart(2, '0')}</span>`}
    <span class="next-match__en" lang="en">Next Match</span><span class="next-match__ja">次の試合</span>
  </h2>`;

  if (!match) {
    return html`<section class="next-match" id="next-match" aria-labelledby="next-match-title">
  <div class="container container--wide"><div class="next-match__panel next-match__panel--empty" data-reveal>
    ${heading}
    <p class="next-match__empty">現在、公開中の試合予定はありません。日程が決まり次第お知らせします。</p>
    ${Button({ label: '試合日程', href, variant: 'text' })}
  </div></div>
</section>`;
  }

  const { day, weekday } = formatMatchDay(match.kickoff);
  const time = formatTime(match.kickoff);

  return html`<section class="next-match" id="next-match" aria-labelledby="next-match-title">
  <div class="container container--wide">
    <div class="next-match__panel">
      <div class="next-match__head">
        ${heading}
        <p class="next-match__competition">${categoryLabel && html`<span class="next-match__category" lang="en">${categoryLabel}</span>`}<span>${match.competition}${match.round && html`<span class="next-match__round">${match.round}</span>`}</span></p>
      </div>
      <div class="next-match__fixture">
        ${Side(match.home)}
        <span class="next-match__vs" lang="en">VS</span>
        ${Side(match.away)}
      </div>
      <dl class="next-match__info">
        <div class="next-match__date">
          <dt class="visually-hidden">日時</dt>
          <dd><time datetime="${match.kickoff}"><span class="next-match__day">${day}</span><span class="next-match__weekday">（${weekday}）</span>${time && html`<span class="next-match__time">${time} KICK OFF</span>`}</time></dd>
        </div>
        <div class="next-match__venue">
          <dt>${Icon('map-pin', { size: 18 })}<span class="visually-hidden">会場</span></dt>
          <dd>${match.venue}</dd>
        </div>
        <div class="next-match__status">
          <dt class="visually-hidden">状況</dt>
          <dd>${Badge({ label: '開催予定', tone: 'royal' })}<span class="next-match__countdown" data-countdown="${match.kickoff}" aria-live="off"></span></dd>
        </div>
      </dl>
      <div class="next-match__action">${Button({ label: '試合日程・結果', href, variant: 'text' })}</div>
    </div>
  </div>
</section>`;
}
