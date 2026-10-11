# Kabin V5 · BytePlus-inspired, Kabin-native

Standalone bilingual HTML/CSS/vanilla JavaScript prototype inside `v5/`, designed to be reviewed without changing the existing `/` website.

## Preview

- English: https://vulementor.github.io/kabin-cloud/v5/
- Vietnamese: https://vulementor.github.io/kabin-cloud/v5/vi/
- Section pages: platform, solutions, marketplace, builders, providers, developers, company (English /v5/<route>/, Vietnamese /v5/vi/<route>/).

## Local preview

From repository root: `python -m http.server 8765`, then open `http://localhost:8765/v5/`.

## Architecture

- `assets/v5.css`: responsive visual system, motion, navigation and diagrams.
- `assets/v5.js`: consistent header/footer, language switching, Marketplace filter, three concept previews, Provider mailto.
- `docs/design-reference.md`: specific observations of BytePlus AI and the Kabin translation.
- `docs/product-facts.en.md` and `.vi.md`: documented product truths and roadmap boundaries.
- `docs/content/<page>.en.md` and `.vi.md`: bilingual editorial source for each page.

The website makes no live transaction, AI execution or SDK integration claims. The older site and all existing URLs are left intact. Main root sitemap excludes V5 until separately approved for default-site promotion.
