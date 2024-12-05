import '@astrojs/internal-helpers/path';
import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_DZdpgdn2.mjs';
import 'clsx';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///workspaces/johann.github.io/","adapterName":"@astrojs/netlify","routes":[{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"data/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/data","isIndex":false,"type":"page","pattern":"^\\/data\\/?$","segments":[[{"content":"data","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/data.astro","pathname":"/data","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"presentations/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/presentations","isIndex":false,"type":"page","pattern":"^\\/presentations\\/?$","segments":[[{"content":"presentations","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/presentations.astro","pathname":"/presentations","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.ts","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tags/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tags","isIndex":true,"type":"page","pattern":"^\\/tags\\/?$","segments":[[{"content":"tags","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tags/index.astro","pathname":"/tags","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://matteopograxha.com/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/workspaces/johann.github.io/src/pages/posts/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["/workspaces/johann.github.io/src/pages/404.astro",{"propagation":"none","containsHead":true}],["/workspaces/johann.github.io/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/workspaces/johann.github.io/src/pages/data.astro",{"propagation":"in-tree","containsHead":true}],["/workspaces/johann.github.io/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/workspaces/johann.github.io/src/pages/posts/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/workspaces/johann.github.io/src/pages/presentations.astro",{"propagation":"in-tree","containsHead":true}],["/workspaces/johann.github.io/src/pages/tags/[tag]/[...page].astro",{"propagation":"in-tree","containsHead":true}],["/workspaces/johann.github.io/src/pages/tags/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/workspaces/johann.github.io/src/data/post.ts",{"propagation":"in-tree","containsHead":false}],["/workspaces/johann.github.io/src/components/blog/PostPreview.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/[tag]/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/data@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/johann.github.io/src/pages/og-image/[...slug].png.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/og-image/[...slug].png@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/presentations@_@astro",{"propagation":"in-tree","containsHead":false}],["/workspaces/johann.github.io/src/pages/rss.xml.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/tags/index@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/data@_@astro":"pages/data.astro.mjs","\u0000@astro-page:src/pages/og-image/[...slug].png@_@ts":"pages/og-image/_---slug_.png.astro.mjs","\u0000@astro-page:src/pages/posts/[...page]@_@astro":"pages/posts/_---page_.astro.mjs","\u0000@astro-page:src/pages/posts/[...slug]@_@astro":"pages/posts/_---slug_.astro.mjs","\u0000@astro-page:src/pages/presentations@_@astro":"pages/presentations.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@ts":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/tags/[tag]/[...page]@_@astro":"pages/tags/_tag_/_---page_.astro.mjs","\u0000@astro-page:src/pages/tags/index@_@astro":"pages/tags.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Cmhob1DD.mjs","/workspaces/johann.github.io/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DGvvC4Gn.mjs","/workspaces/johann.github.io/.astro/content-assets.mjs":"chunks/content-assets_B7QZwqnj.mjs","/workspaces/johann.github.io/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_DfY1Bvgq.mjs","/workspaces/johann.github.io/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.Cjip6cWn.js","/workspaces/johann.github.io/src/layouts/BlogPost.astro?astro&type=script&index=0&lang.ts":"_astro/BlogPost.astro_astro_type_script_index_0_lang.CSRpGidt.js","/workspaces/johann.github.io/src/components/layout/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.DuSsDY4R.js","/workspaces/johann.github.io/src/components/Search.astro?astro&type=script&index=0&lang.ts":"_astro/Search.astro_astro_type_script_index_0_lang.BwHVnhBO.js","/workspaces/johann.github.io/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeToggle.astro_astro_type_script_index_0_lang.CB-gjd7v.js","astro:scripts/page.js":"_astro/page.V2R8AmkL.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/workspaces/johann.github.io/src/pages/index.astro?astro&type=script&index=0&lang.ts","const t=document.getElementById(\"to-top-btn\");window.addEventListener(\"scroll\",()=>{window.scrollY>300?t.setAttribute(\"data-show\",\"true\"):t.setAttribute(\"data-show\",\"false\")});t.addEventListener(\"click\",()=>{window.scrollTo({top:0,behavior:\"smooth\"})});"],["/workspaces/johann.github.io/src/layouts/BlogPost.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"to-top-btn\"),n=document.getElementById(\"blog-hero\");function c(t){t.forEach(o=>{e.dataset.show=(!o.isIntersecting).toString()})}e.addEventListener(\"click\",()=>{document.documentElement.scrollTo({behavior:\"smooth\",top:0})});const r=new IntersectionObserver(c);r.observe(n);"],["/workspaces/johann.github.io/src/components/Search.astro?astro&type=script&index=0&lang.ts","class n extends HTMLElement{closeBtn;dialog;dialogFrame;openBtn;input;resultsContainer;closeModal=()=>{this.dialog.open&&(this.dialog.close(),window.removeEventListener(\"click\",this.onWindowClick))};onWindowClick=e=>{this.dialogFrame&&!this.dialogFrame.contains(e.target)&&this.closeModal()};openModal=()=>{this.dialog.showModal(),this.input.focus(),window.addEventListener(\"click\",this.onWindowClick)};constructor(){super(),this.openBtn=this.querySelector(\"button[data-open-modal]\"),this.closeBtn=this.querySelector(\"button[data-close-modal]\"),this.dialog=this.querySelector(\"dialog\"),this.dialogFrame=this.querySelector(\".dialog-frame\"),this.input=this.querySelector(\"input\"),this.resultsContainer=this.querySelector(\"#search-results\"),this.openBtn.addEventListener(\"click\",this.openModal),this.closeBtn.addEventListener(\"click\",this.closeModal),this.input.addEventListener(\"input\",this.handleSearch)}handleSearch=()=>{const e=this.input.value.toLowerCase();this.resultsContainer.innerHTML=\"\",[{title:\"Home\",url:\"/\"},{title:\"About\",url:\"/about\"},{title:\"Research\",url:\"/research\"}].filter(t=>t.title.toLowerCase().includes(e)).forEach(t=>{const i=document.createElement(\"li\");i.innerHTML=`<a href=\"${t.url}\" class=\"text-blue-600 hover:underline\">${t.title}</a>`,this.resultsContainer.appendChild(i)})};connectedCallback(){window.addEventListener(\"keydown\",e=>{e.key===\"/\"&&!this.dialog.open&&(this.openModal(),e.preventDefault())})}disconnectedCallback(){window.removeEventListener(\"keydown\",this.onWindowKeydown)}}customElements.define(\"site-search\",n);"]],"assets":["/_astro/ec.hhxsx.css","/_astro/ec.8zarh.js","/_astro/roboto-mono-700.CAZppuP3.ttf","/_astro/roboto-mono-regular.Ceay284C.ttf","/_astro/about-astro.0znnbM0P.png","/_astro/logo.ClSizu9I.png","/_astro/cover.C1CigIB6.png","/_astro/_slug_._WzjttYV.css","/WEBSITE_MP.jpg","/icon.svg","/social-card-V2.png","/_astro/Header.astro_astro_type_script_index_0_lang.DuSsDY4R.js","/_astro/ThemeToggle.astro_astro_type_script_index_0_lang.CB-gjd7v.js","/_astro/domElement.CpM5XNjJ.js","/_astro/page.V2R8AmkL.js","/_astro/page.V2R8AmkL.js","/404.html","/about/index.html","/data/index.html","/presentations/index.html","/rss.xml","/tags/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"holyCBHinX368Dkb23xAbhPPdlcbYd34U5unqPIwd5I=","envGetSecretEnabled":true});

export { manifest };
