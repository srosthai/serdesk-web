# MVP Acceptance Review

Date: 9 November 2026

Build under review: static production build from `npm ci && npm run check && npm run build`.

Verified in Chrome headless against the local production preview at 1440px, 1024px, 768px, 390px, and 320px widths, in both light and dark themes.

## Specification checklist

- [x] The site identifies ServerDesk as a desktop VPS management application.
- [x] The local-first and direct SSH model is explained accurately.
- [x] The homepage has a clear hero and download action.
- [x] Screenshots come from the current desktop application.
- [x] Only implemented features are described as available.
- [ ] Download links point to real published installers.
- [x] Windows, macOS, and Linux are represented accurately.
- [x] All pages work across mobile, tablet, and desktop widths.
- [x] The monochrome design is consistent across the site.
- [x] Animations are restrained and respect reduced-motion preferences.
- [x] Navigation, buttons, screenshots, and internal links work.
- [x] SEO metadata, sitemap, robots.txt, and social preview are configured.
- [x] The site remains useful when client-side JavaScript is unavailable.
- [x] Light and dark themes are available and persisted.
- [x] A scroll-to-top control appears at the bottom of long pages.
- [x] A custom no-index 404 page is present.
- [x] CI checks and the production deployment workflow are configured.

## Verification evidence

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 13 pages built, 12 public pages in the sitemap plus the no-index 404.
- Lighthouse mobile homepage: performance 100, accessibility 100, best practices 100, SEO 100.
- Lighthouse desktop homepage: performance 100, accessibility 100, best practices 100, SEO 100.
- Lighthouse accessibility, best practices, and SEO: 100 on home, Features, Download, About, and Documentation.
- Axe: zero critical or serious violations across every route in light mode and dark mode.
- Internal link audit: every internal route returns 200; every tested hash anchor exists.
- Responsive audit: no horizontal overflow at 320, 390, 768, 1024, or 1440px.
- JavaScript-disabled audit: content, hero copy, gallery fallback, and mobile menu remain available; theme and scroll controls are hidden.
- Keyboard checks: skip link, mobile menu Escape and focus return, gallery tabs and lightbox, theme toggle, and scroll control.
- No console errors or failed network requests on any audited route.
- GitHub Actions CI passes on pull requests and on pushes to `dev` and `main`.
- Deployment workflow is configured for Cloudflare Pages project `serverdesk-web`; it builds successfully and skips upload when credentials are absent.

## Accepted exceptions

1. **No public installers exist yet.** The Download page shows an explicit no-public-installers state and links to GitHub Releases. When a release is published, populate `src/data/releases.ts` with the real URLs, sizes, architectures, and checksums.
2. **The source repository has no license file.** The About page states this plainly and does not grant redistribution rights.
3. **Cloudflare credentials are not configured in GitHub.** Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to deploy. The workflow emits a warning and skips the upload until then.
4. **Screenshots show honest disconnected or empty states.** The browser preview cannot open SSH sessions. Replace them with connected-state captures when those are available without fabricating data.
5. **The WebGL hero runs only at 1024px and above.** Mobile uses a lightweight CSS dot field, and reduced-motion users receive no nonessential motion.

## Release follow-up

1. Add the Cloudflare secrets, create the Pages project, and confirm `https://serverdesk.srosthai.me`.
2. Publish release assets and populate the release data model.
3. Add a license file or update the About page if the source licensing changes.
4. Refresh the product screenshots when connected-state captures are available.
5. Re-run the acceptance checklist after the first public release.
