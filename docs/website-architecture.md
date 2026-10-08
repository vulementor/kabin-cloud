# Kabin Cloud | Website architecture & bilingual editorial workflow

## Published layout checkpoints
1. **Layout 01 / Homepage:** `index.html`, `vi/index.html`; editorial sources `docs/content/home.en.md` and `docs/content/home.vi.md`.
2. **Layout 02 / Platform:** `platform/index.html`, `vi/platform/index.html`; editorial sources `docs/content/platform.en.md` and `docs/content/platform.vi.md`.

## Development contract
- Static semantic HTML, shared vanilla JavaScript (`assets/app.js`) and CSS (`assets/styles.css`, `assets/platform.css`), no dependencies/build pipeline.
- Default language EN; every layout has dedicated translated HTML and paired `.en.md` / `.vi.md` editorial files.
- GitHub Pages project URL is `https://vulementor.github.io/kabin-cloud/`. Use path-relative internal links so previews work below `/kabin-cloud/`.
- Planned final domain is `kabin.cloud`. Canonical and sitemap values reflect the final intended domain, **not** an assertion that DNS or custom-domain hosting is configured.
- Each new layout gets its own review branch, scoped source and docs, compatibility checks and release gate. Merge to `main` updates GitHub Pages for human review.
- Recheck the deployed English and Vietnamese URL after each merge and stop for design/content review before starting a new layout.

## Naming, legal and contact
- Brand/product: **Kabin Agent**.
- Official user-supplied Vietnamese legal entity name: **CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐẦU TƯ CÔNG NGHỆ XANH K’UNITY**.
- English display translation: **K’UNITY Green Technology Investment Company Limited**; no public registry evidence has established whether this is the certificate's exact registered English name. Verify before any legal-purpose use.
- Corporate email: **info@kabin.cloud**.
- Corporate phone: **0974744299**; display **+84 974 744 299** in English, `tel:+84974744299` in HTML.
- No invented office address, tax ID, commercial claim, certification, actual provider marketplace or SDK availability.

## Product disclosure
- Marketplace and capacity contracts are **architectural vision** content until product endpoints/services are verified.
- User-facing public website CTAs must resolve to actual pages/anchors or `mailto:` and `tel:`. No dead landing page stubs.
- Future sections: Marketplace, Solutions, Developers, Resources, Company & Legal; each gains separately approved editorial copy and links when implemented.

## Local testing
`python -m http.server 8000` from repo root and open:
- `http://localhost:8000/`, `http://localhost:8000/vi/`
- `http://localhost:8000/platform/`, `http://localhost:8000/vi/platform/`

## GitHub Pages review URL
- EN: `https://vulementor.github.io/kabin-cloud/platform/`
- VI: `https://vulementor.github.io/kabin-cloud/vi/platform/`

## Complete public sitemap — 2026-10-08

- 54 route types (including the existing Homepage and Platform) with 108 English/Vietnamese HTML pages, and matching editorial Markdown sources under docs/content/.
- Main header must ALWAYS display the same six items, same order across ALL pages: Platform, Solutions, Marketplace, Developers, Resources, Company. Only the labels and selected state vary by language/page.
- Locale-specific navigation MUST remain within its locale. Inner-page links, breadcrumbs, overview links and related pages belong in main content and may vary, but never replace header menu.
- An automated contract test in scripts/validate-site.mjs enforces the header, link resolution, translation pairs, SEO metadata, and content docs.
- GitHub Pages review location: https://vulementor.github.io/kabin-cloud/. Canonical and sitemap URLs reflect this actual host until kabin.cloud is connected.
- Marketplace, publishing, billing, APIs and SDK are conceptual editorial material, not working commerce or product integrations.
- EN company display: K’UNITY Green Technology Investment Company Limited (translation pending certificate verification); VI: CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐẦU TƯ CÔNG NGHỆ XANH K’UNITY.
- Contact info@kabin.cloud; telephone +84 974 744 299.

## Browser QA correction / 2026-10-08

- Keep global Header unchanged. On every Vietnamese informational child page, the Contact CTA goes to `/vi/contact/`; Back home and final Home CTA go to `/vi/`.
- Homepage and Platform EN/VI now include Privacy, Terms and Cookies footer navigation.
- Official UI company navigation label: `Company` (EN), `Công ty` (VI); prose may use `doanh nghiệp` contextually.
- Platform hero back link and section label must occupy separate rows, including at 390px mobile.
- Automated static validator checks these locale boundaries and footer links, in addition to existing header invariants.

## Role-first product direction, 2026-10-09

Canonical product model: `docs/product/kabin-product-model.en.md` and `.vi.md`. Role-first sitemap and migration: `docs/website/role-first-sitemap.en.md` and `.vi.md`. These supersede vague technology-first marketing positioning, not the normative architecture contracts in `vulementor/kabin-agent`.

Homepage introduces Use Kabin, Build Solutions and Provide Capacity. Existing six global Header links stay fixed; all existing public pages remain accessible. Total localized pages now 114 (57 route pairs). Legacy deep pages need editorial rewriting by role, not another templated sitewide copy pass. Billing, provider publishing and Github auto-install remain roadmap concepts.
