# AGENTS.md

## Project state

- Greenfield repo: the only file is `ServerPilot_Website_MVP_Astro_Specification.pdf`. There is no `package.json`, Astro scaffold, or git repo yet.
- The spec is the source of truth. Read it before building. Extract text with:
  `pdftotext -layout ServerPilot_Website_MVP_Astro_Specification.pdf -`
- Repo folder is named `Serverdesk-webiste`, but the product is **ServerPilot**. Use ServerPilot in all content and naming.

## What is being built

- Astro + TypeScript + Tailwind CSS marketing site for ServerPilot, a locally installed desktop app for managing VPS servers over SSH.
- Static pages rendered by Astro: Home, Features, Download, Documentation, Changelog, About.
- React islands only for genuinely interactive pieces (OS selector, screenshot gallery/lightbox). Do not build the site in React.
- Content Collections for documentation and changelog. Data files for features and releases (`src/data/features.ts`, `src/data/releases.ts`).
- Follow the structure in spec section 7 unless there is a concrete reason to deviate.
- Deployment target: Cloudflare Pages or Vercel, static output. Downloads point to GitHub Releases or another stable host.

## Content rules (strict)

- Only describe features present in the current build. Mark incomplete capabilities "Coming soon" or omit them.
- Never invent download counts, ratings, testimonials, customer logos, compatibility claims, or platform badges.
- Show only installers that actually exist for the current release, with real version, date, size, architecture, and checksum when available.
- OS detection may be a convenience, but explicit Windows/macOS/Linux choices must always be visible.
- Real application screenshots only. Never fabricate UI.
- Local-first claims must stay accurate: the app runs locally and connects directly over SSH, but data is exchanged with the remote server, so do not claim no data ever leaves the machine.
- "Free to use" refers to ServerPilot only. Do not imply VPS hosting is free.

## Design constraints

- Strict monochrome palette: `#FFFFFF`, `#F5F5F5`, `#737373`, `#E5E5E5`, `#111111`. No accent colors.
- Type: Inter or Geist Sans for text; Geist Mono or JetBrains Mono for technical labels. Content max width ~1200px.
- Thin borders and whitespace over shadows. Corner radius 10–16px, used consistently.
- Motion: short CSS transitions (150–500ms), IntersectionObserver for reveals, `prefers-reduced-motion` support. No parallax, constant motion, heavy 3D, or WebGL.
- Pages must remain readable without client-side JavaScript; keep main content server-rendered.
- Avoid fixed-width screenshot containers that cause horizontal overflow on mobile.

## Verification

- No commands exist yet. After scaffolding, add the real ones here (install, dev, build, typecheck, lint, test).
- Astro's type/content check is `astro check`; run it once the project exists.

## Out of scope

- User accounts, cloud dashboard, hosted monitoring backend, public forum/support portal, CMS, heavy 3D/WebGL, unverified marketing claims.
