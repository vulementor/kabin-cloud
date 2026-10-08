# Browser QA | Kabin Agent

The website stays HTML/CSS/vanilla JS. Playwright/Chromium are installed only inside CI for navigation and visual smoke testing.

Checks: global six-link Header on representative desktop/mobile pages, VI contact and back-home link locality, EN⇄VI deep-page switch, Platform Hero label spacing, 390px mobile hamburger interaction and layout overflow.

Full-page screenshots from sample routes and failure traces are uploaded to GitHub Actions artifacts. The existing static validator checks all 108 HTML pages.

Source: visual QA of GitHub Pages on 2026-10-08 detected incorrect VI CTA links and concatenated Platform hero labels, motivating these regression tests.

To run locally after installing Playwright, start `python3 -m http.server 8765` and execute `npx playwright test --config=playwright.config.mjs`.
