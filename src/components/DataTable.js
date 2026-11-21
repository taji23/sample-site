// @ts-check
import { cx, html } from '../lib/html.js';

/**
 * Accessible, horizontally scrollable table. The scroll region is keyboard
 * focusable and labelled so narrow screens never clip data silently.
 *
 * @typedef {object} DataTableColumn
 * @property {string} label
 * @property {boolean} [numeric]
 * @property {boolean} [rowHeader]    First column that names the row.
 *
 * @param {{
 *   caption: string,
 *   columns: DataTableColumn[],
 *   rows: (string | number | import('../lib/html.js').SafeHtml)[][],
 *   note?: string,
 *   className?: string,
 * }} props
 */
export function DataTable({ caption, columns, rows, note, className }) {
  return html`<div class="${cx('data-table', className)}" role="region" aria-label="${caption}" tabindex="0">
  <table>
    <caption>${caption}</caption>
    <thead><tr>${columns.map((c) => html`<th scope="col"${c.numeric ? html` class="is-num"` : ''}>${c.label}</th>`)}</tr></thead>
    <tbody>
      ${rows.map(
        (row) => html`<tr>${row.map((cell, i) =>
          columns[i]?.rowHeader
            ? html`<th scope="row">${cell}</th>`
            : html`<td${columns[i]?.numeric ? html` class="is-num tabular"` : ''}>${cell}</td>`,
        )}</tr>`,
      )}
    </tbody>
  </table>
  ${note && html`<p class="data-table__note">${note}</p>`}
</div>`;
}
