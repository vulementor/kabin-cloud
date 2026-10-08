# Kabin Cloud website conventions

## Scope
Static bilingual marketing website. The first review is **Layout 01: Homepage only**.

## Source of truth
- `index.html`: English homepage (default).
- `vi/index.html`: Vietnamese homepage.
- `docs/content/home.en.md`: English editorial review copy.
- `docs/content/home.vi.md`: Vietnamese editorial review copy.
- `assets/styles.css`: shared responsive design system.
- `assets/app.js`: shared progressive enhancement, without dependencies.

## Review workflow
1. Finish one layout in a dedicated review branch.
2. Keep both HTML languages and both editorial Markdown files together.
3. Verify links, copy parity, keyboard interaction, responsive behavior, disclaimers and SEO metadata.
4. Request human review. Do not merge or develop the next layout until approval.

## URL contract
- English: `/` (default)
- Vietnamese: `/vi/`
- Canonical and hreflang metadata identify both variants.
- Page links inside the current standalone homepage use section anchors, not unbuilt routes.
- Future pages: `/platform/`, `/marketplace/`, `/solutions/`, `/developers/`, etc. and `/vi/...` equivalents.

## Publication & integrity
- The current page is a **concept preview**. No live Marketplace, Console, availability, pricing, transaction, real-time job execution or public SDK is asserted.
- Keep legal entity exactly: CÔNG TY TRÁCH NHIỆM HỮU HẠN ĐẦU TƯ CÔNG NGHỆ XANH K’UNITY.
- Never fabricate metrics, client logos, reviews, certifications, registration numbers or contact details.
- No frontend framework, build step or UI component library. Just HTML, CSS, and vanilla JS.

## Local preview
Serve the repository root using `python -m http.server 8000`, then open `http://localhost:8000/` and `http://localhost:8000/vi/`.

## Release gate
Preview branch is for review, not production. Do not merge without explicit approval.
