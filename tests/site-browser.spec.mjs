import { test, expect } from "@playwright/test";

const ROOT = process.env.QA_BASE_URL || "http://127.0.0.1:8765/";
const CATEGORIES = ["platform", "solutions", "marketplace", "developers", "resources", "company"];
const TEXT = {
  en: ["Platform", "Solutions", "Marketplace", "Developers", "Resources", "Company"],
  vi: ["Nền tảng", "Giải pháp", "Marketplace", "Nhà phát triển", "Tài nguyên", "Công ty"]
};
const ROUTES = {
  en: ["", "platform/", "marketplace/", "solutions/marketing/", "developers/", "resources/", "company/legal-entity/"],
  vi: ["vi/", "vi/platform/", "vi/marketplace/", "vi/solutions/marketing/", "vi/developers/", "vi/resources/", "vi/company/legal-entity/"]
};

test.describe("Desktop global menu", () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  for (const lang of ["en", "vi"]) {
    test("fixed header across " + lang + " pages", async ({ page }) => {
      for (const route of ROUTES[lang]) {
        const response = await page.goto(ROOT + route, { waitUntil: "domcontentloaded" });
        expect(response?.status(), route).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", lang);
        const desktop = page.locator(".desktop-nav a");
        const mobile = page.locator(".mobile-nav a");
        await expect(desktop).toHaveCount(6);
        await expect(mobile).toHaveCount(6);
        expect(await desktop.allTextContents()).toEqual(TEXT[lang]);
        expect(await mobile.allTextContents()).toEqual(TEXT[lang]);
        for (let i = 0; i < CATEGORIES.length; i++) {
          const target = "/" + (lang === "vi" ? "vi/" : "") + CATEGORIES[i] + "/";
          expect(new URL(await desktop.nth(i).getAttribute("href"), page.url()).pathname).toBe(target);
          expect(new URL(await mobile.nth(i).getAttribute("href"), page.url()).pathname).toBe(target);
        }
      }
    });
  }

  test("deep language switching retains page identity", async ({ page }) => {
    await page.goto(ROOT + "vi/solutions/marketing/");
    await page.locator(".language-switch a[lang=en]").click();
    await expect(page).toHaveURL(/\/solutions\/marketing\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await page.locator(".language-switch a[lang=vi]").click();
    await expect(page).toHaveURL(/\/vi\/solutions\/marketing\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "vi");
  });

  test("Vietnamese CTAs stay within Vietnamese locale", async ({ page }) => {
    for (const route of ["vi/marketplace/", "vi/solutions/marketing/", "vi/company/", "vi/resources/", "vi/legal/privacy/"]) {
      await page.goto(ROOT + route, { waitUntil: "domcontentloaded" });
      const selectors = [".header-cta", ".directory-back", ".directory-closing .button-outline-light"];
      const destinations = ["/vi/contact/", "/vi/", "/vi/"];
      for (let i = 0; i < selectors.length; i++) {
        const href = await page.locator(selectors[i]).getAttribute("href");
        expect(new URL(href, page.url()).pathname, route + " " + selectors[i]).toBe(destinations[i]);
      }
    }
  });

  test("Platform hero label is below back link in both languages", async ({ page }) => {
    for (const route of ["platform/", "vi/platform/"]) {
      await page.goto(ROOT + route);
      const back = await page.locator(".ph-copy > .ph-back").boundingBox();
      const kicker = await page.locator(".ph-copy > .section-kicker").boundingBox();
      expect(back).not.toBeNull();
      expect(kicker).not.toBeNull();
      expect(kicker.y, route + " kicker row").toBeGreaterThan(back.y + back.height);
    }
  });

  test("desktop layout and visual evidence", async ({ page }, info) => {
    for (const route of ["", "vi/", "platform/", "vi/platform/", "marketplace/", "vi/marketplace/", "company/", "vi/company/"]) {
      const response = await page.goto(ROOT + route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, route + " horizontal overflow").toBeLessThanOrEqual(2);
      await page.screenshot({ path: info.outputPath("desktop-" + (route ? route.replaceAll("/", "-") : "home") + ".png"), animations: "disabled", fullPage: true });
    }
  });
});

test.describe("Mobile layout and menu", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, deviceScaleFactor: 1 });
  for (const route of ["", "vi/", "platform/", "vi/platform/", "marketplace/", "vi/solutions/marketing/"]) {
    test("menu opens and closes: " + (route || "home EN"), async ({ page }, info) => {
      const response = await page.goto(ROOT + route);
      expect(response?.status()).toBe(200);
      const toggle = page.locator(".menu-toggle");
      const nav = page.locator("#mobile-menu");
      await expect(toggle).toBeVisible();
      await expect(nav).toBeHidden();
      await toggle.click();
      await expect(toggle).toHaveAttribute("aria-expanded", "true");
      await expect(nav).toBeVisible();
      await expect(nav.locator("a")).toHaveCount(6);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, route + " overflow").toBeLessThanOrEqual(2);
      await page.screenshot({ path: info.outputPath("mobile-" + (route ? route.replaceAll("/", "-") : "home") + ".png"), animations: "disabled", fullPage: true });
      await nav.locator("a").first().click();
      await expect(page.locator(".menu-toggle")).toHaveAttribute("aria-expanded", "false");
      await expect(page.locator("#mobile-menu")).toBeHidden();
    });
  }
});
