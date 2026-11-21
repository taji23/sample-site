// @ts-check
import { attr, cx, html } from '../lib/html.js';
import { Icon } from './Icon.js';

/**
 * @typedef {'primary' | 'secondary' | 'accent' | 'text'} ButtonVariant
 * @typedef {'sm' | 'md' | 'lg'} ButtonSize
 *
 * @typedef {object} ButtonProps
 * @property {string} label            Visible text; names the action.
 * @property {string} [href]           Renders <a> when set, otherwise <button>.
 * @property {ButtonVariant} [variant]
 * @property {ButtonSize} [size]
 * @property {string | false} [icon]  Trailing icon name; false for none. Defaults to an arrow.
 * @property {boolean} [external]      Opens elsewhere; adds rel and a screen-reader note.
 * @property {'button' | 'submit' | 'reset'} [type]
 * @property {boolean} [block]         Full width.
 * @property {boolean} [disabled]
 * @property {boolean} [loading]       Busy state; keeps width, announces via aria-busy.
 * @property {string} [ariaLabel]      Only when the visible label lacks context.
 * @property {string} [className]
 * @property {Record<string, string>} [data]  data-* hooks for client behavior.
 */

/**
 * @param {Record<string, string> | undefined} data
 */
function dataAttrs(data) {
  if (!data) return '';
  return Object.entries(data).map(([key, value]) => attr(`data-${key}`, value));
}

/** @param {ButtonProps} props */
export function Button({
  label,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  external = false,
  type = 'button',
  block = false,
  disabled = false,
  loading = false,
  ariaLabel,
  className,
  data,
}) {
  const iconName = icon === false ? null : icon ?? (external ? 'arrow-up-right' : 'arrow-right');
  const classes = cx(
    'btn',
    `btn--${variant}`,
    size !== 'md' && `btn--${size}`,
    block && 'btn--block',
    external && 'btn--external',
    className,
  );
  const inner = html`<span class="btn__label">${label}</span>${
    external && html`<span class="visually-hidden">（外部サイトが開きます）</span>`
  }${iconName && Icon(iconName, { size: 18, className: 'btn__icon' })}`;

  if (href !== undefined) {
    // A disabled link has no href, so it is not focusable or activatable.
    return html`<a class="${classes}"${attr('href', disabled ? null : href)}${attr(
      'aria-disabled',
      disabled ? 'true' : null,
    )}${attr('role', disabled ? 'link' : null)}${attr('aria-label', ariaLabel)}${
      external && !disabled ? attr('rel', 'noopener') : ''
    }${external && !disabled ? attr('target', '_blank') : ''}${dataAttrs(data)}>${inner}</a>`;
  }

  return html`<button class="${classes}" type="${type}"${attr('aria-label', ariaLabel)}${attr(
    'aria-busy',
    loading ? 'true' : null,
  )}${attr('disabled', disabled ? 'disabled' : null)}${dataAttrs(data)}>${inner}</button>`;
}

/** @param {Omit<ButtonProps, 'variant'>} props */
export const PrimaryButton = (props) => Button({ ...props, variant: 'primary' });

/** @param {Omit<ButtonProps, 'variant'>} props */
export const SecondaryButton = (props) => Button({ ...props, variant: 'secondary' });

/** JOIN US / trial CTA. @param {Omit<ButtonProps, 'variant'>} props */
export const AccentButton = (props) => Button({ ...props, variant: 'accent' });

/** Inline "view all" style link with animated rule. @param {Omit<ButtonProps, 'variant'>} props */
export const TextButton = (props) => Button({ ...props, variant: 'text' });
