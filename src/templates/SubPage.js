// @ts-check
import { CtaBand } from '../components/CtaBand.js';
import { PageHero } from '../components/PageHero.js';
import { SubNav } from '../components/SubNav.js';
import { contactLink, trialLink } from '../data/navigation.js';
import { photo } from '../data/images.js';
import { html } from '../lib/html.js';
import { PageLayout } from './PageLayout.js';

/**
 * @typedef {object} SubPageProps
 * @property {string} path
 * @property {string} title                 Japanese page title (h1).
 * @property {string} [crumb]               Breadcrumb / <title> label when it differs from the h1.
 * @property {string} [en]                  English display title; defaults to the section's.
 * @property {string} [lead]
 * @property {string} [description]         Meta description; defaults to `lead`.
 * @property {import('../data/navigation.js').NavGroup} [group]  Site section this page belongs to.
 * @property {{ label: string, href?: string }[]} [trail]  Extra breadcrumb steps between the section and this page.
 * @property {import('../types.js').ImageAsset} [image]   Photographic hero background.
 * @property {import('../lib/html.js').SafeHtml} [side]   Hero side content (portrait).
 * @property {import('../lib/html.js').SafeHtml} main
 * @property {import('../lib/html.js').SafeHtml | false} [cta]  Closing band; default is the trial / contact CTA.
 * @property {boolean} [noindex]
 */

/** Default closing band: the path to a trial or inquiry is always one step away. */
export function DefaultCta() {
  return CtaBand({
    en: 'Join Us',
    title: 'まずは見学・体験から',
    lead: '練習の見学は予約不要です。体験練習やご質問は、フォームからお気軽にどうぞ。',
    primary: { label: trialLink.label, href: trialLink.href },
    secondary: { label: contactLink.label, href: contactLink.href },
  });
}

/**
 * The one template every subpage uses: page chrome, hero, section sub-navigation,
 * content, closing CTA. Pages supply content only.
 * @param {SubPageProps} props
 */
export function SubPage({ path, title, crumb, en, lead, description, group, trail = [], image, side, main, cta, noindex }) {
  const label = crumb ?? title;
  /** @type {{ label: string, href?: string }[]} */
  const crumbs = [{ label: 'ホーム', href: '/' }];
  if (group && group.href !== path) crumbs.push({ label: group.label, href: group.href });
  crumbs.push(...trail, { label });

  const body = html`${PageHero({ crumbs, en: en ?? group?.en ?? title, title, lead, image, side })}
${group && SubNav({ group, current: path })}
${main}
${cta === false ? '' : (cta ?? DefaultCta())}`;

  const og = image?.src ?? photo('hero').src;
  return PageLayout({ meta: { title: label, path, description: description ?? lead, noindex, ogImage: og }, main: body });
}
