import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import webmanifest from "astro-webmanifest";
import { defineConfig } from "astro/config";

import { siteConfig } from "./src/site.config";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [
      icon(),
      tailwind({
          applyBaseStyles: false,
          nesting: true,
      }),
      sitemap(),
      robotsTxt(),
      webmanifest({
          name: siteConfig.title,
          description: siteConfig.description,
          lang: siteConfig.lang,
          icon: "public/icon.svg",
          icons: [
              {
                  src: "icons/apple-touch-icon.png",
                  sizes: "180x180",
                  type: "image/png",
              },
              {
                  src: "icons/icon-192.png",
                  sizes: "192x192",
                  type: "image/png",
              },
              {
                  src: "icons/icon-512.png",
                  sizes: "512x512",
                  type: "image/png",
              },
          ],
          start_url: "/",
          background_color: "#1d1f21",
          theme_color: "#2bbc8a",
          display: "standalone",
          config: {
              insertFaviconLinks: false,
              insertThemeColorMeta: false,
              insertManifestLink: false,
          },
      }),
  ],

  prefetch: true,

  site: "https://johannohler.com/",

  adapter: netlify()
});
