// tailwind.config.js
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}",
    "!./src/pages/og-image/[slug].png.ts",
  ],
  corePlugins: {
    borderOpacity: false,
    fontVariantNumeric: false,
    ringOffsetColor: false,
    ringOffsetWidth: false,
    scrollSnapType: false,
    textOpacity: false,
    touchAction: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [
    require("@tailwindcss/typography"),
    plugin(({ addComponents }) => {
      addComponents({
        ".cactus-link": {
          "@apply underline underline-offset-2": {},
          "&:hover": {
            "@apply decoration-link decoration-2": {},
          },
        },
        ".title": {
          "@apply text-2xl font-semibold text-accent-2": {},
        },
        ".menu": {
          "@apply text-2xl font-semibold text-link": {},
        },
      });
    }),
  ],
  theme: {
    extend: {
      fontSize: {},
      colors: {
        accent: "hsl(var(--theme-accent) / <alpha-value>)",
        "accent-2": "hsl(var(--theme-accent-2) / <alpha-value>)",
        bgColor: "hsl(var(--theme-bg) / <alpha-value>)",
        link: "hsl(var(--theme-link) / <alpha-value>)",
        quote: "hsl(var(--theme-quote) / <alpha-value>)",
        textColor: "hsl(var(--theme-text) / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          '"Source Sans 3"',
          'Arial',
          'Helvetica',
          'sans-serif',
        ],
        serif: [...fontFamily.serif],
        mono: [
          '"SFMono-Regular"',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      spacing: {},
      container: {
        center: true,
        padding: '1rem', // Decrease container padding for a tighter layout
        screens: {
          sm: '100%',
          md: '100%',
          lg: '1124px',   // Larger width for large screens
          xl: '1400px',   // Expand width for extra-large screens
          '2xl': '1600px', // Ultra-wide screens
        },
      },
      transitionProperty: {
        height: "height",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontSize: theme("fontSize.base"), // Apply the base font size globally
            color: theme("colors.textColor"),
            fontFamily: theme("fontFamily.sans"),
            a: {
              "@apply cactus-link": "",
            },
            blockquote: {
              borderLeftWidth: "0",
            },
            code: {
              border: "1px dotted #666",
              borderRadius: "2px",
            },
            kbd: {
              "@apply dark:bg-textColor": "",
            },
            hr: {
              borderTopStyle: "dashed",
            },
            strong: {
              fontWeight: "700",
            },
            "tbody tr": {
              borderBottomWidth: "none",
            },
            tfoot: {
              borderTop: "1px dashed #666",
            },
            thead: {
              borderBottomWidth: "none",
            },
            "thead th": {
              borderBottom: "1px dashed #666",
              fontWeight: "700",
            },
            'th[align="center"], td[align="center"]': {
              textAlign: "center",
            },
            'th[align="right"], td[align="right"]': {
              textAlign: "right",
            },
            'th[align="left"], td[align="left"]': {
              textAlign: "left",
            },
          },
        },
      }),
    },
  },
} satisfies Config;

