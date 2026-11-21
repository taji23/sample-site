// @ts-check
import { dateBlock } from '../lib/format.js';
import { eventStatusLabels } from '../data/events.js';
import { html } from '../lib/html.js';
import { Badge } from './Badge.js';
import { Button } from './Button.js';
import { Icon } from './Icon.js';
import { Media } from './Media.js';

/** @type {Record<import('../data/events.js').EventStatus, import('./Badge.js').BadgeTone>} */
const TONE = { open: 'royal', soon: 'gold', closed: 'muted' };

/**
 * @param {{ event: import('../data/events.js').ClubEvent, past?: boolean, headingLevel?: 2 | 3 }} props
 */
export function EventCard({ event, past = false, headingLevel = 3 }) {
  const { month, day, weekday } = dateBlock(event.date);
  const title =
    headingLevel === 2 ? html`<h2 class="card__title">${event.title}</h2>` : html`<h3 class="card__title">${event.title}</h3>`;
  return html`<article class="card event-card${past ? ' is-past' : ''}">
  ${Media({ image: event.image, ratio: 'landscape', sizes: '(min-width: 64em) 28vw, (min-width: 40em) 45vw, 100vw', className: 'card__media' })}
  <div class="card__body">
    <div class="event-card__date" aria-hidden="true"><span class="event-card__month tabular">${month}<small>月</small></span><span class="event-card__day tabular">${day}</span><span class="event-card__weekday">${weekday}</span></div>
    <div class="card__meta">${Badge({ label: event.type, tone: 'outline' })}${Badge({ label: eventStatusLabels[event.status], tone: TONE[event.status] })}</div>
    ${title}
    <p class="card__excerpt">${event.summary}</p>
    <dl class="event-card__facts">
      <div><dt>${Icon('calendar', { size: 16 })}<span class="visually-hidden">日時</span></dt><dd><time datetime="${event.date}">${month}月${day}日（${weekday}）</time> ${event.time}</dd></div>
      <div><dt>${Icon('map-pin', { size: 16 })}<span class="visually-hidden">会場</span></dt><dd>${event.venue}</dd></div>
      <div><dt>${Icon('users', { size: 16 })}<span class="visually-hidden">対象</span></dt><dd>${event.target}</dd></div>
    </dl>
    ${
      !past &&
      event.status === 'open' &&
      html`<div class="event-card__action">${Button({ label: '参加を申し込む', href: '/contact/?type=event', variant: 'secondary', size: 'sm' })}</div>`
    }
  </div>
</article>`;
}
