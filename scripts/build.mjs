// @ts-check
/**
 * Zero-dependency static build: src/ → dist/
 *   - bundles CSS in a fixed cascade order into dist/assets/site.css
 *   - copies page-only CSS and public/ assets
 *   - renders every route to dist/<path>/index.html
 */
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const dist = join(root, 'dist');

/** Cascade order matters: tokens → base → layout → components. */
const SITE_CSS = [
  'styles/fonts.css',
  'styles/tokens.css',
  'styles/base.css',
  'styles/layout.css',
  'styles/components/button.css',
  'styles/components/section-heading.css',
  'styles/components/media.css',
  'styles/components/card.css',
  'styles/chrome.css',
  'styles/home.css',
  'styles/pages.css',
  'styles/forms.css',
  'styles/motion.css',
];

/** Browser scripts, copied as ES modules. */
const CLIENT_JS = { 'main.js': 'client/main.js' };

/** Stylesheets loaded only by specific pages. */
const PAGE_CSS = { 'styleguide.css': 'styles/pages/styleguide.css' };

async function bundleCss() {
  const parts = await Promise.all(
    SITE_CSS.map(async (file) => `/* ${file} */\n${await readFile(join(src, file), 'utf8')}`),
  );
  await mkdir(join(dist, 'assets'), { recursive: true });
  await writeFile(join(dist, 'assets', 'site.css'), parts.join('\n'));
  await Promise.all(
    Object.entries(PAGE_CSS).map(([out, file]) => cp(join(src, file), join(dist, 'assets', out))),
  );
  await Promise.all(
    Object.entries(CLIENT_JS).map(([out, file]) => cp(join(src, file), join(dist, 'assets', out))),
  );
}

async function renderRoutes() {
  const { routes } = await import('../src/routes.js');
  for (const route of routes) {
    if (!route.path.startsWith('/') || !route.path.endsWith('/')) {
      throw new Error(`Route path must start and end with "/": ${route.path}`);
    }
    const outDir = join(dist, route.path);
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, 'index.html'), String(route.render()));
  }
  return routes.length;
}

const started = performance.now();
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, 'public'), dist, { recursive: true });
await bundleCss();
const pageCount = await renderRoutes();
console.log(`Built ${pageCount} page(s) into dist/ in ${Math.round(performance.now() - started)}ms`);
