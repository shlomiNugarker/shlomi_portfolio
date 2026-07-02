<div align="center">

<img src="./public/og-image.png" alt="Shlomi Nugarker — Full-Stack Developer" width="600" />

# Shlomi Nugarker — Portfolio

A fast, multilingual, accessible developer portfolio built with Next.js 16, React, TypeScript and Tailwind CSS v4.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![i18n](https://img.shields.io/badge/i18n-en%20%C2%B7%20he%20%C2%B7%20ar-2dd4bf)](#-internationalization)

**Live:** [www.shlomi.dev](https://www.shlomi.dev) · [Hebrew](https://www.shlomi.dev/he) · [Arabic](https://www.shlomi.dev/ar)

</div>

---

## Overview

This is my personal portfolio — a single-page site that introduces who I am, what I build, and the projects I've shipped. It's built to be **fast, discoverable and accessible**, and it speaks three languages out of the box (English, Hebrew, Arabic) with full right-to-left support.

The whole thing is content-driven: projects, services and skills live in typed config files, and every piece of copy is translatable.

## ✨ Features

- **🌍 Internationalization (en / he / ar)** — built-in Next.js locale routing with [next-i18next](https://github.com/i18next/next-i18next). English is served at `/`, Hebrew at `/he`, Arabic at `/ar`, with a language switcher in the menu.
- **↔️ Full RTL** — Hebrew and Arabic mirror the entire layout (not just text) using CSS logical properties; `<html dir>` is set per-locale at SSR.
- **🔍 Comprehensive SEO** — 5 JSON-LD schemas (Person, ProfessionalService, WebSite, Organization, ItemList), per-locale Open Graph & Twitter cards, `hreflang` alternates, canonical URLs, a dynamic `sitemap.xml`, `robots.txt` and a PWA `manifest.json`.
- **🛡️ Security headers** — HSTS, CSP, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` and more, configured in `next.config.js`.
- **🌗 Dark / light mode** — powered by [next-themes](https://github.com/pacocoursey/next-themes), with no flash on load; all colors route through semantic CSS design tokens.
- **📱 Responsive & accessible** — tuned for mobile, tablet and desktop; semantic markup, ARIA labels and keyboard-friendly controls.
- **🎞️ Motion** — subtle CSS-only scroll reveals and micro-interactions, with full `prefers-reduced-motion` support.
- **📈 Conversion analytics** — Google Analytics events on every lead path (WhatsApp, email, project and social clicks).
- **🖼️ Multi-image project cards** — featured work supports an image gallery with dot navigation.
- **⚡ Performance** — SSG pages, `next/image` optimization, modern AVIF/WebP output, and tree-shaken package imports.

## 🛠️ Tech Stack

| Area | Tools |
| --- | --- |
| **Framework** | Next.js 16 (Pages Router, SSG) |
| **Language** | TypeScript 5.3 |
| **UI** | React 18.3, Tailwind CSS 4, Radix UI primitives |
| **Animation** | CSS transitions + IntersectionObserver scroll reveals |
| **Theming** | next-themes + semantic CSS design tokens |
| **i18n** | next-i18next 16, i18next 26, react-i18next 17 |
| **Icons** | react-icons 5, lucide-react |
| **Tooling** | ESLint 9, Prettier 3 |

## 📂 Project Structure

```
.
├── pages/                  # Routes (Pages Router)
│   ├── index.tsx           # Home (the whole portfolio)
│   ├── _app.tsx            # Providers (Chakra, theme, i18n, direction)
│   ├── _document.tsx       # <html lang / dir> per locale
│   ├── sitemap.xml.tsx     # Dynamic, locale-aware sitemap
│   ├── 404.tsx / 500.tsx   # Custom error pages
├── components/
│   ├── Sidebar/            # Hero
│   ├── Menu/               # Nav + language switcher
│   ├── Sections/           # About, Services, FeaturedWorks, GetInTouch
│   ├── Misc/               # OpenGraphHead, StructuredData, ScrollMore…
│   └── ui/                 # Radix-based primitives + color-mode helpers
├── config/                 # Typed content & config
│   ├── seo.ts              # Canonical URLs + per-locale meta
│   ├── works.ts            # Featured projects (multi-image)
│   ├── services.ts, skills.ts, sidebar.ts, navigation.ts, theme.ts
├── public/
│   ├── locales/{en,he,ar}/common.json   # Translations
│   ├── works/              # Project cover images
│   ├── robots.txt, manifest.json, og-image.png
├── scripts/
│   └── generate-og-image.js  # Builds the 1200×630 OG image
├── hooks/                  # Custom React hooks
└── styles/                 # Global CSS
```

## 🚀 Getting Started

**Prerequisites:** Node ≥ 18.17 (Next.js 16 requirement); **v22 LTS recommended** — there's an `.nvmrc`, so `nvm use` picks the right version. This project uses **yarn**.

```bash
# clone
git clone https://github.com/shlomiNugarker/shlomi_portfolio.git
cd shlomi_portfolio

# install
yarn install

# run the dev server
yarn dev
```

Then open <http://localhost:3000>.

## 📜 Scripts

| Script | Description |
| --- | --- |
| `yarn dev` | Start the development server |
| `yarn build` | Production build |
| `yarn start` | Serve the production build |
| `yarn lint` | Run ESLint |
| `yarn typecheck` | Type-check with `tsc --noEmit` |
| `yarn format` | Format the codebase with Prettier |
| `yarn format:check` | Check formatting without writing |

## 🌍 Internationalization

All copy lives in `public/locales/<locale>/common.json` — one file per language (`en`, `he`, `ar`). To edit or translate text, change the matching key in each file.

- **Routing:** the default locale (`en`) is served unprefixed (`/`); others are prefixed (`/he`, `/ar`). Locale is auto-detected from the `Accept-Language` header and remembered via a `NEXT_LOCALE` cookie.
- **RTL:** `he` and `ar` render with `dir="rtl"`. Layout mirrors via logical CSS properties, so adding an RTL language is mostly a translation file plus marking it RTL in `config/seo.ts`.
- **Adding a language:** add the locale to `next-i18next.config.js` and `config/seo.ts`, then drop in `public/locales/<locale>/common.json`.

## 🔍 SEO & Assets

- Per-locale meta, canonical URLs and the site URL live in [`config/seo.ts`](./config/seo.ts).
- Head tags are emitted by [`components/Misc/OpenGraphHead.tsx`](./components/Misc/OpenGraphHead.tsx) and the JSON-LD by [`components/Misc/StructuredData.tsx`](./components/Misc/StructuredData.tsx).
- The social share image (`public/og-image.png`, 1200×630) is generated from the avatar:

  ```bash
  node scripts/generate-og-image.js
  ```

## ☁️ Deployment

The site is a standard Next.js app and deploys cleanly to any Next-capable host (Vercel recommended). For a self-hosted build:

```bash
yarn build
yarn start
```

> Note: `sitemap.xml` is rendered on-demand (`getServerSideProps`), so deploy in a server/SSR mode rather than a fully static export.

## 🙏 Acknowledgements

Originally forked from [`klawingco/kl_portfolio`](https://github.com/klawingco/kl_portfolio) — rebuilt and extensively customized: upgraded to Next 16, migrated from Chakra UI to Tailwind CSS v4 + Radix primitives, re-themed with semantic design tokens, and extended with multilingual support, RTL, a full SEO suite and new project content.

---

<div align="center">

Made with ❤ and ☕ by **Shlomi Nugarker**

[Website](https://www.shlomi.dev) · [GitHub](https://github.com/shlomiNugarker) · [LinkedIn](https://www.linkedin.com/in/shlomi-nugarker/)

</div>
