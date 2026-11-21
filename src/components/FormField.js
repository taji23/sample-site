// @ts-check
import { attr, cx, html } from '../lib/html.js';
import { Button } from './Button.js';
import { Icon } from './Icon.js';

/**
 * @typedef {object} FieldProps
 * @property {string} id
 * @property {string} name
 * @property {string} label
 * @property {'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea'} [type]
 * @property {boolean} [required]
 * @property {string} [hint]
 * @property {string} [autocomplete]
 * @property {string} [placeholder]
 * @property {{ value: string, label: string }[]} [options]   For select.
 * @property {number} [rows]                                   For textarea.
 * @property {string} [placeholderOption]                      First empty select option.
 * @property {string} [preset]                                 Query-string key that pre-fills this field.
 */

/** @param {string} id @param {string | undefined} hint */
const describedBy = (id, hint) => [hint ? `${id}-hint` : '', `${id}-error`].filter(Boolean).join(' ');

/** Visible label with a required marker that does not rely on color alone. @param {string} label @param {boolean | undefined} required */
function LabelText(label, required) {
  return html`${label}${required ? html`<span class="field__req">必須</span>` : html`<span class="field__opt">任意</span>`}`;
}

/** @param {FieldProps} props */
export function Field({ id, name, label, type = 'text', required = false, hint, autocomplete, placeholder, options = [], rows = 5, placeholderOption = '選択してください', preset }) {
  const common = html`id="${id}" name="${name}" aria-describedby="${describedBy(id, hint)}"${attr('required', required ? 'required' : null)}${attr('autocomplete', autocomplete)}${attr('data-preset', preset)}`;
  let control;
  if (type === 'select') {
    control = html`<span class="field__select"><select ${common}>
      <option value="">${placeholderOption}</option>
      ${options.map((o) => html`<option value="${o.value}">${o.label}</option>`)}
    </select>${Icon('chevron-down', { size: 18, className: 'field__select-icon' })}</span>`;
  } else if (type === 'textarea') {
    control = html`<textarea ${common} rows="${rows}"${attr('placeholder', placeholder)}></textarea>`;
  } else {
    control = html`<input type="${type}" ${common}${attr('placeholder', placeholder)}${attr('inputmode', type === 'tel' ? 'tel' : null)}>`;
  }
  return html`<div class="field" data-field>
  <label class="field__label" for="${id}">${LabelText(label, required)}</label>
  ${hint && html`<p class="field__hint" id="${id}-hint">${hint}</p>`}
  ${control}
  <p class="field__error" id="${id}-error" hidden data-error></p>
</div>`;
}

/**
 * Radio or checkbox group inside a fieldset.
 * @param {{ name: string, legend: string, options: { value: string, label: string }[], required?: boolean, type?: 'radio' | 'checkbox', hint?: string }} props
 */
export function ChoiceGroup({ name, legend, options, required = false, type = 'radio', hint }) {
  const id = `${name}-group`;
  return html`<fieldset class="field field--choices" data-field data-group${attr('data-required', required ? 'true' : null)} aria-describedby="${describedBy(id, hint)}">
  <legend class="field__label">${LabelText(legend, required)}</legend>
  ${hint && html`<p class="field__hint" id="${id}-hint">${hint}</p>`}
  <div class="field__choices">
    ${options.map(
      (o, i) => html`<label class="choice"><input type="${type}" name="${name}" value="${o.value}"${attr('id', i === 0 ? id : null)}><span class="choice__box" aria-hidden="true"></span><span class="choice__label">${o.label}</span></label>`,
    )}
  </div>
  <p class="field__error" id="${id}-error" hidden data-error></p>
</fieldset>`;
}

/** Required consent checkbox with rich label. @param {{ id: string, name: string, label: import('../lib/html.js').SafeHtml | string, required?: boolean }} props */
export function Consent({ id, name, label, required = true }) {
  return html`<div class="field field--consent" data-field>
  <label class="choice"><input type="checkbox" id="${id}" name="${name}" aria-describedby="${id}-error"${attr('required', required ? 'required' : null)}><span class="choice__box" aria-hidden="true"></span><span class="choice__label">${label}</span></label>
  <p class="field__error" id="${id}-error" hidden data-error></p>
</div>`;
}

/**
 * Clearly labelled prototype form: validates in the browser and shows a
 * confirmation, but never sends or stores anything.
 *
 * @param {{
 *   id: string,
 *   children: import('../lib/html.js').SafeHtml,
 *   submitLabel: string,
 *   successTitle: string,
 *   successText: string,
 *   className?: string,
 * }} props
 */
export function PrototypeForm({ id, children, submitLabel, successTitle, successText, className }) {
  return html`<div class="${cx('form-shell', className)}" data-form-shell>
  <form class="form" id="${id}" novalidate data-prototype-form aria-describedby="${id}-notice">
    <p class="form__notice" id="${id}-notice">${Icon('clock', { size: 18 })}<span><strong>試作版のフォームです。</strong>入力内容の検証だけを行い、送信・保存はされません。</span></p>
    <noscript><p class="form__noscript">このフォームの動作確認には JavaScript が必要です。お急ぎの場合は、事務局へ直接お問い合わせください。</p></noscript>
    <div class="form__errors" role="alert" tabindex="-1" hidden data-form-errors></div>
    <div class="form__fields">${children}</div>
    <div class="form__actions">${Button({ label: submitLabel, type: 'submit', variant: 'primary', size: 'lg', icon: 'arrow-right' })}</div>
  </form>
  <div class="form-success" tabindex="-1" hidden data-form-success>
    <h2 class="form-success__title">${successTitle}</h2>
    <p>${successText}</p>
    <p class="form-success__proto">※ これは試作版の画面です。実際には何も送信されていません。</p>
    <dl class="form-success__summary" data-form-summary></dl>
    ${Button({ label: '入力画面に戻る', variant: 'secondary', type: 'button', icon: false, data: { 'form-reset': 'true' } })}
  </div>
</div>`;
}
