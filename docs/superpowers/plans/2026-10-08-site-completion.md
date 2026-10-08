# Public Website Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete Kabin Agent's bilingual public informational sitemap and prevent navigation drift.

**Architecture:** Plain semantic HTML and localized Markdown source for every route. Shared CSS/vanilla JS from the established home design, with no runtime framework. Six-item global navigation is static, immutable in structure across routes; page-specific exploration remains within main content.

**Tech Stack:** HTML/CSS/JavaScript, Node.js builtin-only validation, GitHub Pages/Actions.

**Spec:** `docs/superpowers/specs/2026-10-08-public-website-design.md`

## Global Constraints
- EN default, VI under `vi/` with route parity and 2 documents for every layout.
- Main menu always: Platform, Solutions, Marketplace, Developers, Resources, Company.
- VI labels always: Nền tảng, Giải pháp, Marketplace, Nhà phát triển, Tài nguyên, Công ty.
- No simulated purchasing, login, API, SDK, provider testimonials or misleading live-state indicators.
- Company translation and legal-entity verification constraints from docs/website-architecture.md.
- Contact info@kabin.cloud, 0974744299.

## Review Focus
- Header never changes to contextual navigation between Homepage, Platform and child pages.
- Locale switching stays on same page in alternate language; nav stays within selected locale.
- No dead relative links even on deep pages or GitHub Pages project subpath.
- Sitemap canonical and hreflang list real Pages URLs only.
- Every route has both document sources and responsive styling.

## Tasks
- [x] Inventory current website and release branch head.
- [x] Author all sitemap informational pages and paired Markdown docs.
- [x] Keep fixed six-item main nav across all generated and existing pages, with locale-safe hrefs.
- [x] Add responsive public-site CSS and 404 page.
- [x] Update XML sitemap and robots to current Pages host.
- [x] Add repeatable Node.js contract validator and CI gate.
- [ ] Run validation in GitHub Actions and correct real failures.
- [ ] Merge reviewed release and verify Pages deployment for the exact merge commit.
- [ ] Inspect published EN/VI navigation visually before calling release complete.
