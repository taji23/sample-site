// @ts-check
import { formatDotDate } from '../lib/format.js';
import { cx, html } from '../lib/html.js';

/**
 * League table with the club's row highlighted.
 * @param {{ competition: import('../data/matches.js').Competition, categoryLabel?: string, limit?: number }} props
 */
export function StandingsTable({ competition, categoryLabel, limit }) {
  const rows = limit ? competition.standings.slice(0, limit) : competition.standings;
  return html`<div class="standings">
  <table class="standings__table">
    <caption class="standings__caption"><span class="standings__caption-inner">
      <span class="standings__title">${categoryLabel && html`<span class="standings__category" lang="en">${categoryLabel}</span>`}${competition.name}</span>
      <span class="standings__asof">${formatDotDate(competition.asOf)} 時点</span>
    </span></caption>
    <thead>
      <tr>
        <th scope="col" class="standings__pos"><abbr title="順位">#</abbr></th>
        <th scope="col" class="standings__team">チーム</th>
        <th scope="col"><abbr title="試合数">試</abbr></th>
        <th scope="col"><abbr title="勝">勝</abbr></th>
        <th scope="col"><abbr title="引き分け">分</abbr></th>
        <th scope="col"><abbr title="敗">敗</abbr></th>
        <th scope="col"><abbr title="得失点差">差</abbr></th>
        <th scope="col" class="standings__pts"><abbr title="勝点">点</abbr></th>
      </tr>
    </thead>
    <tbody>
      ${rows.map(
        (row, i) => html`<tr class="${cx(row.isClub && 'is-club')}"${row.isClub ? html` aria-current="true"` : ''}>
        <td class="standings__pos">${i + 1}</td>
        <th scope="row" class="standings__team">${row.team}</th>
        <td>${row.played}</td>
        <td>${row.won}</td>
        <td>${row.drawn}</td>
        <td>${row.lost}</td>
        <td>${row.goalDiff > 0 ? `+${row.goalDiff}` : row.goalDiff}</td>
        <td class="standings__pts">${row.points}</td>
      </tr>`,
      )}
    </tbody>
  </table>
</div>`;
}
