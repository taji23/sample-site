// @ts-check
import { cx, html } from '../lib/html.js';

/**
 * Term / description pairs rendered as a hairline-ruled specification list.
 * @param {{ items: { term: string, desc: string | import('../lib/html.js').SafeHtml }[], className?: string }} props
 */
export function SpecList({ items, className }) {
  return html`<dl class="${cx('spec-list', className)}">
  ${items.map((i) => html`<div class="spec-list__row"><dt>${i.term}</dt><dd>${i.desc}</dd></div>`)}
</dl>`;
}

/**
 * Prominent fact strip (3–4 key facts) shown directly under a detail hero.
 * @param {{ items: { label: string, value: string }[] }} props
 */
export function FactStrip({ items }) {
  return html`<dl class="fact-strip">
  ${items.map((i) => html`<div class="fact-strip__item"><dt>${i.label}</dt><dd>${i.value}</dd></div>`)}
</dl>`;
}

/**
 * Titled rows (heading left, text right): the editorial alternative to a grid
 * of identical cards.
 * @param {{ items: { title: string, text: string }[], numbered?: boolean }} props
 */
export function RuleList({ items, numbered = false }) {
  return html`<ol class="rule-list${numbered ? ' rule-list--numbered' : ''}" role="list" data-reveal-stagger>
  ${items.map(
    (i, idx) => html`<li class="rule-list__item" style="--i:${idx}">
    ${numbered && html`<span class="rule-list__num tabular" aria-hidden="true">${String(idx + 1).padStart(2, '0')}</span>`}
    <h3 class="rule-list__title">${i.title}</h3>
    <p class="rule-list__text">${i.text}</p>
  </li>`,
  )}
</ol>`;
}

/**
 * Ordered steps with large numerals. Use only where the sequence matters.
 * @param {{ items: { title: string, text: string }[], tone?: 'light' | 'navy' }} props
 */
export function StepList({ items, tone = 'light' }) {
  return html`<ol class="step-list${tone === 'navy' ? ' on-dark' : ''}" role="list" data-reveal-stagger>
  ${items.map(
    (s, i) => html`<li class="step-list__item" style="--i:${i}">
    <span class="step-list__num tabular" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
    <h3 class="step-list__title">${s.title}</h3>
    <p class="step-list__text">${s.text}</p>
  </li>`,
  )}
</ol>`;
}
