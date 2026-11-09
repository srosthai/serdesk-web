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
- [x] Download links point to real published installers (v0.1.0 GitHub pre-release).
- [x] Windows, macOS, and Linux are represented accurately.
- [x] All pages work across mobile, tablet, and desktop widths.
- [x] The monochrome design is consistent across the site.
- [x] Animations are restrained and respect reduced-motion preferences.
- [x] Navigation, buttons, screenshots, and internal links work.
- [x] SEO metadata, sitemap, robots.txt, and social preview are configured.
- [x] The site remains useful when client-side JavaScript is unavailable.
- [x] Light and dark themes are available and persisted.
- [x] A scroll-to-top control appears after scrolling down and hides near the top.
- [x] The Download page exposes package sizes, architectures, and SHA-256 checksums.
- [x] The hero is full-viewport and the hero screenshot opens in a dialog.
- [x] Every "Actual app view" caption on the Features page opens a dialog.
- [x] Minimum UI text size is 14px.
- [x] A custom no-index 404 page is present.
- [x] CI checks and the production deployment workflow are configured.

## Verification evidence

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: 13 pages built, 12 public pages in the sitemap plus the no-index 404.
- Lighthouse mobile homepage: performance 100, accessibility 100, best practices 100, SEO 100.
- Lighthouse desktop homepage: performance 100, accessibility 100, best practices 100, SEO 100.
- Lighthouse mobile Download page: performance 100, accessibility 100, best practices 100, SEO 100.
- Lighthouse accessibility, best practices, and SEO: 100 on home, Features, Download, About, and Documentation.
- Axe: zero critical or serious violations across every route in light mode and dark mode.
- Internal link audit: every internal route returns 200; every tested hash anchor exists.
- Release link audit: all v0.1.0 Windows, macOS, Linux, and SHA256SUMS asset URLs return 200.
- Dialog audit: hero screenshot and all four Features screenshots open native dialogs and close with Escape.
- Motion audit: section headings and download cards reveal on scroll; hover lifts and screenshot zoom respect reduced motion.
- Typography audit: no rendered UI text below 14px.
- Responsive audit: no horizontal overflow at 320, 390, 768, 1024, or 1440px.
- JavaScript-disabled audit: content, hero copy, gallery fallback, and mobile menu remain available; theme and scroll controls are hidden.
- Keyboard checks: skip link, mobile menu Escape and focus return, gallery tabs and lightbox, theme toggle, and scroll control.
- No console errors or failed network requests on any audited route.
- GitHub Actions CI passes on pull requests and on pushes to `dev` and `main`.
- Deployment workflow is configured for Cloudflare Pages project `serdesk-web`; it builds successfully and skips upload when credentials are absent.

## Accepted exceptions

1. **v0.1.0 is a pre-release, not a stable release.** The Download page labels it as a pre-release and links to the published GitHub assets.
2. **The source repository has no license file.** The About page states this plainly and does not grant redistribution rights.
3. **Cloudflare credentials are not configured in GitHub.** Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to deploy. The workflow emits a warning and skips the upload until then.
4. **Screenshots show honest disconnected or empty states.** The browser preview cannot open SSH sessions. Replace them with connected-state captures when those are available without fabricating data.
5. **The WebGL hero runs only at 1024px and above.** Mobile uses a lightweight CSS dot field, and reduced-motion users receive no nonessential motion.

## Release follow-up

1. Add the Cloudflare secrets, create the Pages project, and confirm `https://serdesk.srosthai.me`.
2. Promote the v0.1.0 GitHub pre-release to a stable release when it is ready.
3. Add a license file or update the About page if the source licensing changes.
4. Refresh the product screenshots when connected-state captures are available.
5. Re-run the acceptance checklist after the first stable release.
