# Teeraphat Raksawong — Portfolio

Static portfolio for Teeraphat Raksawong, AI Lead Engineer at DMC Connect. The site is built with React, TypeScript, Vite, and GSAP, with no backend or runtime environment variables.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The deployable site is written to `dist/`.

## Deploy

### Cloudflare Pages

- Connect this GitHub repository.
- Build command: `npm run build`
- Build output directory: `dist`

### Netlify

Connect the repository; `netlify.toml` contains the build command and publish directory.

The site is a static build and can also be hosted on GitHub Pages or any static host. It does not require Vercel.

## Updating portfolio content

Edit the English copy and project entries in `src/content.ts`. Public project assets are in `public/`; the downloadable CV is in `public/files/`.

## Public case-study boundary

Employer-related experience is described in general terms. Omit employer product names, internal architecture, customer or supplier names, confidential data, and private screenshots.
