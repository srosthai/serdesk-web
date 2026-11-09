# ServerDesk Website

Marketing and download website for ServerDesk, a locally installed desktop application for managing VPS servers over SSH.

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
- Deployed to Cloudflare Pages

## Branch flow

- Feature branches merge into `dev`.
- `dev` merges into `main`.
- `main` is the production branch and triggers the deployment workflow.
- The `production` branch is not used.

## Deployment

The site is a static build served by Cloudflare Pages:

- Pages project: `serverdesk-web`
- Production branch: `main`
- Production domain: `https://serverdesk.srosthai.me`
- Build output: `dist/`

GitHub Actions runs `npm ci`, `npm run check`, and `npm run build` for every pull request and every push to `dev` or `main`.

Deployment runs on every push to `main`. Add these repository secrets before enabling production deploys:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

If the secrets are missing, the deployment workflow builds the site and skips the upload with a warning. Create the Pages project once with `npx wrangler@4 pages project create serverdesk-web` or through the Cloudflare dashboard.

## Project status

The implementation is tracked in the repository issues and milestones. The source specification is `ServerPilot_Website_MVP_Astro_Specification.pdf`.

The final review is recorded in [`MVP_ACCEPTANCE.md`](MVP_ACCEPTANCE.md). v0.1.0 is available as a GitHub pre-release; the Download page links to the published assets and lists their SHA-256 checksums.

The production domain is `https://serverdesk.srosthai.me`. Override it with `SITE_URL` at build time when needed.
