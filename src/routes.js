// @ts-check
import { allNavPages } from './data/navigation.js';
import { routes as aboutRoutes } from './pages/about.js';
import { routes as academyRoutes } from './pages/academy.js';
import { routes as communityRoutes } from './pages/community.js';
import { routes as contactRoutes } from './pages/contact.js';
import { renderHome } from './pages/home.js';
import { routes as joinRoutes } from './pages/join.js';
import { routes as matchesRoutes } from './pages/matches.js';
import { routes as newsRoutes } from './pages/news.js';
import { routes as partnersRoutes } from './pages/partners.js';
import { routes as schoolRoutes } from './pages/school.js';
import { renderStub } from './pages/stub.js';
import { renderStyleguide } from './pages/styleguide.js';
import { routes as teamsRoutes } from './pages/teams.js';

/**
 * @typedef {object} Route
 * @property {string} path   Must start and end with '/'.
 * @property {() => import('./lib/html.js').SafeHtml} render
 * @property {boolean} [sitemap]  false to exclude (dev-only / placeholder pages).
 */

/** Pages with a real implementation. */
/** @type {Route[]} */
const built = [
  { path: '/', render: renderHome },
  { path: '/styleguide/', render: renderStyleguide, sitemap: false },
  ...aboutRoutes,
  ...teamsRoutes,
  ...matchesRoutes,
  ...newsRoutes,
  ...academyRoutes,
  ...schoolRoutes,
  ...joinRoutes,
  ...communityRoutes,
  ...partnersRoutes,
  ...contactRoutes,
];

const builtPaths = new Set(built.map((r) => r.path));
const duplicates = built.map((r) => r.path).filter((p, i, all) => all.indexOf(p) !== i);
if (duplicates.length > 0) throw new Error(`Duplicate route paths: ${duplicates.join(', ')}`);

/** Every navigation target without a real page yet gets an honest placeholder. */
/** @type {Route[]} */
const stubs = [...allNavPages()]
  .filter(([path]) => !builtPaths.has(path))
  .map(([path, page]) => ({ path, render: () => renderStub({ path, ...page }), sitemap: false }));

export const routes = [...built, ...stubs];
