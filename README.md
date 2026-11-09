# ServerPilot Website

Marketing and download website for ServerPilot, a locally installed desktop application for managing VPS servers over SSH.

> Your servers. One desktop. Full control.

## Requirements

- Node.js 24 LTS (see `.nvmrc`)
- npm 11 or newer

## Development

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321` by default.

## Build and check

```bash
npm run check
npm run build
npm run preview
```

`npm run build` writes the static site to `dist/`. `npm run check` runs Astro's TypeScript and content checks.

## Stack

- Astro with TypeScript
- Tailwind CSS
- React islands only for interactive components
- Astro Content Collections for documentation and changelog
- Deployed to Cloudflare Pages or Vercel

## Project status

The implementation is tracked in the repository issues and milestones. The source specification is `ServerPilot_Website_MVP_Astro_Specification.pdf`.

The `site` value in `astro.config.mjs` is a placeholder until the production domain is confirmed. Override it with `SITE_URL` at build time.
