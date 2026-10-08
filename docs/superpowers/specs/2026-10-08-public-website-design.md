# Public Website Design Specification — 2026-10-08

Kabin Agent public corporate + product-education website. The site is informational, not a functional marketplace or login console. EN is the default language and VI has complete route parity.

## Navigation contract
The **main header NEVER changes its six-item architecture** on any route. EN: Platform, Solutions, Marketplace, Developers, Resources, Company. VI: Nền tảng, Giải pháp, Marketplace, Nhà phát triển, Tài nguyên, Công ty. Inner-page section tabs, breadcrumbs and related cards are separate from main header. The desktop and mobile header share the same six links in the same order. Every local link resolves within the current locale, and EN⇄VI preserves page intent.

## Product areas
Platform detail pages, Marketplace category/concept pages, Solutions, Developers, Resources, Company, Contact and legal notices. Each has its own EN and VI static HTML and corresponding `.en.md` and `.vi.md` under docs/content.

## Visual system and technology
Use existing green/cream, responsive sans-serif visual language. Static HTML + CSS + vanilla JS, no bundler or framework. Icons built in CSS/SVG, no invented brand artwork. GitHub Pages project URL is https://vulementor.github.io/kabin-cloud/.

## Authority and contact
Brand Kabin Agent, operating company Vietnamese: CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐẦU TƯ CÔNG NGHỆ XANH K’UNITY, EN displayed K’UNITY Green Technology Investment Company Limited as a working translation pending official certificate confirmation. Email info@kabin.cloud; phone 0974744299.

## Integrity
Do not show future Marketplace billing, API invocation, SDK publishing, real-time Capacity listing, user account or provider transaction as operational. No invented metrics, customer logos, certifications or legal registry IDs. Privacy and legal copy should be framed as site-specific informational drafts pending legal review.

## Verification
scripts/validate-site.mjs checks pairs, nav uniformity, document source, path resolution, asset references, active locale, canonical and hreflang metadata, and fails CI for regressions.
