import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_G6HFsn4e.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/404.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/data.astro.mjs');
const _page3 = () => import('./pages/og-image/_---slug_.png.astro.mjs');
const _page4 = () => import('./pages/posts/_---page_.astro.mjs');
const _page5 = () => import('./pages/posts/_---slug_.astro.mjs');
const _page6 = () => import('./pages/presentations.astro.mjs');
const _page7 = () => import('./pages/rss.xml.astro.mjs');
const _page8 = () => import('./pages/tags/_tag_/_---page_.astro.mjs');
const _page9 = () => import('./pages/tags.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/404.astro", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/data.astro", _page2],
    ["src/pages/og-image/[...slug].png.ts", _page3],
    ["src/pages/posts/[...page].astro", _page4],
    ["src/pages/posts/[...slug].astro", _page5],
    ["src/pages/presentations.astro", _page6],
    ["src/pages/rss.xml.ts", _page7],
    ["src/pages/tags/[tag]/[...page].astro", _page8],
    ["src/pages/tags/index.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "7d058416-3551-49dd-b2f8-8267efc423c9"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
