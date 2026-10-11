# Kabin Agent | V5 public-homepage promotion

Release target: https://kabin.cloud/ (English), https://kabin.cloud/vi/ (Vietnamese).

## Promoted routes

The V5 site replaces the default landing pages at /, /vi/, platform/, solutions/, marketplace/, builders/, providers/, developers/ and company/, including Vietnamese counterparts. Navigation and footer are rendered from assets/v5.js; styling and original graphics from assets/v5.css and assets/mark.svg.

## Domain and indexing

Keep root CNAME: kabin.cloud. Canonical and hreflang for the 16 promoted routes use https://kabin.cloud/. Sitemap and robots point to kabin.cloud. Historical /v5/ is kept for rollback/visual reference with noindex. The user-selected custom DNS and GitHub Pages HTTPS configuration remain managed outside the repository.

## Compatibility

Previously shared links /build-solutions/, /provide-capacity/ and /use-kabin/ (and /vi/ counterparts) forward to /builders/, /providers/ and the homepage interactive example; all other deep educational routes are kept intact for reference. Other legacy pages still use the previous editorial layout and can be migrated later; they do not replace the new site entrance.

## Product truth

The website is an informational visual experience, **not** a live hosted agent, provider payment marketplace or automated capacity onboarding. The interactive intent preview, Solution diagrams and capacity search are browser-side demos. The Provider form opens a composed mailto:info@kabin.cloud proposal. Do not describe these as connected services.

## Release gates

- Static root launch check in scripts/validate-live-v5.mjs
- Legacy deep-link and editorial source integrity in scripts/validate-site.mjs
- Isolated V5 fallback archive check in v5/scripts/validate-v5.mjs
- Browser tests for desktop/mobile, language, navigation, category filters and aliases
- Confirm GitHub Pages deploy and actual public domain resolution separately
