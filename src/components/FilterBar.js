// @ts-check
import { html } from '../lib/html.js';

/**
 * Filter chips for client-side filtering. Without JavaScript the whole list
 * stays visible and the chips are hidden (they carry `data-js-only`).
 * @param {{ label: string, options: { value: string, label: string }[], allLabel?: string, target?: string }} props
 */
export function FilterBar({ label, options, allLabel = 'すべて', target = 'default' }) {
  return html`<div class="filter-bar" data-filter-bar="${target}" data-js-only role="group" aria-label="${label}">
  <button class="filter-bar__chip is-active" type="button" data-filter-value="all" aria-pressed="true">${allLabel}</button>
  ${options.map((o) => html`<button class="filter-bar__chip" type="button" data-filter-value="${o.value}" aria-pressed="false">${o.label}</button>`)}
</div>
<p class="visually-hidden" role="status" aria-live="polite" data-filter-status="${target}"></p>`;
}
